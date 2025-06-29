import axios from "axios";
import fs from "fs";
import FormData from "form-data";

const LEMONFOX_API_URL = "https://api.lemonfox.ai/v1/audio/transcriptions";

export async function transcribeAudio(
	audioFilePath: string,
	language = "english",
	responseFormat = "verbose_json"
) {
	console.log(
		`Starting transcription of audio file: ${audioFilePath} with format ${responseFormat}`
	);

	// Check if the audio file exists
	if (!fs.existsSync(audioFilePath)) {
		throw new Error(`Audio file does not exist: ${audioFilePath}`);
	}

	// Get API key from server environment variables
	const apiKey =
		process.env.LEMONFOX_API_KEY ||
		process.env.NEXT_PUBLIC_LEMONFOX_API_KEY;

	if (!apiKey) {
		console.error("Lemonfox API key not found in environment variables");
		throw new Error(
			"Lemonfox API key is not set. Please set LEMONFOX_API_KEY environment variable."
		);
	} else {
		// Log a masked version of the API key for debugging
		const maskedKey =
			apiKey.substring(0, 4) +
			"..." +
			apiKey.substring(apiKey.length - 4);
		console.log(`Using API key: ${maskedKey}`);
	}

	// Create form data for the API request
	const form = new FormData();
	try {
		// Use the exact parameter names from the Lemonfox API documentation
		form.append("file", fs.createReadStream(audioFilePath));
		form.append("language", language);
		// Force verbose_json format
		form.append("response_format", "verbose_json");
		// Add speaker_labels which may help with word-level timestamps
		form.append("speaker_labels", "true");
		// IMPORTANT: Add timestamp_granularities[] parameter for word-level timestamps
		form.append("timestamp_granularities[]", "word");

		console.log(
			"Form data created successfully with the following parameters:"
		);
		console.log(`- Language: ${language}`);
		console.log(`- Response format: verbose_json (enforced)`);
		console.log(`- Speaker labels: true`);
		console.log(`- Timestamp granularities: word`);
	} catch (formError) {
		console.error("Error creating form data:", formError);
		throw new Error(
			`Failed to prepare request: ${
				formError instanceof Error
					? formError.message
					: String(formError)
			}`
		);
	}

	try {
		console.log(`Sending request to ${LEMONFOX_API_URL}`);

		// Make the API request with exact headers as per documentation
		const response = await axios.post(LEMONFOX_API_URL, form, {
			headers: {
				...form.getHeaders(),
				Authorization: `Bearer ${apiKey}`,
				Accept: "application/json",
			},
			maxBodyLength: Infinity,
			maxContentLength: Infinity,
		});

		console.log("Received successful response from Lemonfox API");

		if (!response.data) {
			console.error("API returned empty response");
			throw new Error("Transcription returned empty data");
		}

		// Log transcription statistics
		if (response.data.segments) {
			console.log(
				`Received ${response.data.segments.length} segments in transcription`
			);

			// Check if we have word-level timestamps
			const firstSegment = response.data.segments[0];
			if (
				firstSegment &&
				firstSegment.words &&
				Array.isArray(firstSegment.words)
			) {
				console.log(
					`First segment has ${firstSegment.words.length} words with timestamps`
				);
				console.log(
					"Sample word timestamps:",
					JSON.stringify(firstSegment.words.slice(0, 2), null, 2)
				);
			} else {
				console.warn("No word-level timestamps found in the response");
				// Log structure to understand the response
				console.log(
					"First segment keys:",
					firstSegment ? Object.keys(firstSegment) : "No segments"
				);
			}
		}

		return response.data;
	} catch (error) {
		console.error("Error transcribing audio:", error);

		// More detailed error logging for Axios errors
		if (axios.isAxiosError(error)) {
			console.error("Axios error details:");
			console.error(`- Response status: ${error.response?.status}`);
			console.error(`- Response data:`, error.response?.data);
			console.error(`- Request URL: ${error.config?.url}`);
			console.error(`- Request method: ${error.config?.method}`);

			// Handle API-specific error responses
			if (error.response?.status === 401) {
				throw new Error("API key is invalid or expired");
			} else if (error.response?.status === 400) {
				throw new Error(
					`Bad request: ${JSON.stringify(error.response.data)}`
				);
			} else if (error.response?.status === 413) {
				throw new Error("File too large for processing");
			}
		}

		throw new Error(
			`Transcription failed: ${
				error instanceof Error ? error.message : String(error)
			}`
		);
	}
}

// Format timestamp for SRT (00:00:00,000)
const formatTime = (seconds: number): string => {
	const hours = Math.floor(seconds / 3600);
	const minutes = Math.floor((seconds % 3600) / 60);
	const secs = Math.floor(seconds % 60);
	const milliseconds = Math.floor((seconds % 1) * 1000);

	return `${hours.toString().padStart(2, "0")}:${minutes
		.toString()
		.padStart(2, "0")}:${secs.toString().padStart(2, "0")},${milliseconds
		.toString()
		.padStart(3, "0")}`;
};

// Convert Lemonfox verbose JSON to SRT format with word-level timestamps
export function convertVerboseJsonToSrt(verboseJson: any): string {
	console.log(
		"Converting verbose JSON to SRT format with word-level grouping"
	);

	if (!verboseJson) {
		throw new Error("No transcription data provided");
	}

	if (!verboseJson.segments || !Array.isArray(verboseJson.segments)) {
		console.error("Invalid transcription format:", verboseJson);
		throw new Error("Invalid verbose JSON format");
	}

	// Debug: log a sample of the response
	console.log(
		"Transcription response sample:",
		JSON.stringify(verboseJson.segments.slice(0, 1), null, 2)
	);

	// Check if word-level timestamps are available
	let hasWordTimestamps = false;
	for (const segment of verboseJson.segments) {
		if (
			segment.words &&
			Array.isArray(segment.words) &&
			segment.words.length > 0
		) {
			hasWordTimestamps = true;
			console.log(`Found word timestamps in segment ${segment.id}`);
			console.log("Example words:", segment.words.slice(0, 3));
			break;
		}
	}

	if (!hasWordTimestamps) {
		console.warn(
			"No word-level timestamps found, falling back to segment-level timestamps"
		);
		return convertSegmentLevelToSrt(verboseJson);
	}

	console.log(
		"Using word-level timestamps for more natural subtitle grouping"
	);

	// Constants for subtitle grouping
	const MAX_WORDS_PER_GROUP = 3; // Maximum words per subtitle (reduced from 4 to 3)
	const MAX_DURATION = 2.0; // Maximum duration for a subtitle in seconds (reduced from 2.5 to 2.0)

	let srtContent = "";
	let index = 1;
	let wordGroups: { text: string; start: number; end: number }[] = [];

	// Group words across all segments
	for (const segment of verboseJson.segments) {
		if (!segment.words || !Array.isArray(segment.words)) continue;

		let currentGroup: { words: string[]; start: number; end: number } = {
			words: [],
			start: 0,
			end: 0,
		};

		for (const word of segment.words) {
			// If this is the first word in the group, set the start time
			if (currentGroup.words.length === 0) {
				currentGroup.start = word.start;
			}

			// Add word to current group
			currentGroup.words.push(word.word);
			currentGroup.end = word.end;

			// Check if we should close this group and start a new one
			const groupDuration = currentGroup.end - currentGroup.start;

			if (
				currentGroup.words.length >= MAX_WORDS_PER_GROUP ||
				groupDuration >= MAX_DURATION ||
				word.word.includes(".") ||
				word.word.includes("!") ||
				word.word.includes("?") ||
				word.word.includes(",")
			) {
				wordGroups.push({
					text: currentGroup.words.join(" "),
					start: currentGroup.start,
					end: currentGroup.end,
				});

				currentGroup = {
					words: [],
					start: 0,
					end: 0,
				};
			}
		}

		// Add any remaining words in the current group
		if (currentGroup.words.length > 0) {
			wordGroups.push({
				text: currentGroup.words.join(" "),
				start: currentGroup.start,
				end: currentGroup.end,
			});
		}
	}

	console.log(`Created ${wordGroups.length} word groups for subtitles`);

	// Generate SRT content from word groups
	for (const group of wordGroups) {
		srtContent += `${index}\n`;
		srtContent += `${formatTime(group.start)} --> ${formatTime(
			group.end
		)}\n`;
		srtContent += `${group.text.trim()}\n\n`;
		index++;
	}

	console.log(
		`Successfully created SRT content with ${index - 1} subtitle entries`
	);
	return srtContent;
}

// Original segment-level SRT conversion (fallback)
function convertSegmentLevelToSrt(verboseJson: any): string {
	console.log(`Processing ${verboseJson.segments.length} segments`);

	let srtContent = "";
	let index = 1;

	for (const segment of verboseJson.segments) {
		const { start, end, text } = segment;

		srtContent += `${index}\n`;
		srtContent += `${formatTime(start)} --> ${formatTime(end)}\n`;
		srtContent += `${text.trim()}\n\n`;

		index++;
	}

	console.log(`Successfully created SRT content with ${index - 1} segments`);
	return srtContent;
}
