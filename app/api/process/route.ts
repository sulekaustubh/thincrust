import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { randomUUID } from "crypto";
import {
	extractAudio,
	burnSubtitlesWithStyle,
	SubtitleStyleOptions,
} from "@/app/utils/ffmpeg";
import { transcribeAudio, convertVerboseJsonToSrt } from "@/app/utils/lemonfox";
import { isDebugMode, getBaseUrl } from "@/app/debug-env";

// Global settings
const TEMP_DIR = path.join(process.cwd(), "temp");

// Create directory if it doesn't exist
async function ensureTempDir() {
	try {
		if (!fs.existsSync(TEMP_DIR)) {
			fs.mkdirSync(TEMP_DIR, { recursive: true });
		}
	} catch (error) {
		console.error("Error creating temp directory:", error);
	}
}

// Handle file upload and process video
export async function POST(request: NextRequest) {
	console.log("Received process request");

	try {
		await ensureTempDir();

		// Get form data
		const formData = await request.formData();
		const videoFile = formData.get("video") as File;
		const language = (formData.get("language") as string) || "english";

		// Get and parse subtitle styles
		let subtitleStyles: SubtitleStyleOptions = {
			fontColor: "white", // Default to yellow for better visibility
			fontSize: 30,
			borderWidth: 2.5,
			position: "bottom",
			boxOpacity: 20,
		};

		const stylesJson = formData.get("subtitleStyles") as string;
		if (stylesJson) {
			try {
				const parsedStyles = JSON.parse(stylesJson);
				subtitleStyles = { ...subtitleStyles, ...parsedStyles };
				console.log("Using custom subtitle styles:", subtitleStyles);
			} catch (error) {
				console.error("Error parsing subtitle styles:", error);
			}
		}

		if (!videoFile) {
			return NextResponse.json(
				{ details: "No video file provided" },
				{ status: 400 }
			);
		}

		// Generate unique ID for this processing job
		const jobId = randomUUID();
		console.log(`Processing job ${jobId}`);

		// Set paths
		const videoPath = path.join(TEMP_DIR, `${jobId}.mp4`);
		const audioPath = path.join(TEMP_DIR, `${jobId}.mp3`);
		const srtPath = path.join(TEMP_DIR, `${jobId}.srt`);
		const subtitledVideoPath = path.join(
			TEMP_DIR,
			`${jobId}_subtitled.mp4`
		);
		const transcriptionJsonPath = path.join(
			TEMP_DIR,
			`${jobId}_transcription.json`
		);

		// Save uploaded video
		const videoBuffer = Buffer.from(await videoFile.arrayBuffer());
		fs.writeFileSync(videoPath, videoBuffer);
		console.log(`Saved video to ${videoPath}`);

		// Extract audio from video
		console.log("Extracting audio...");
		await extractAudio(videoPath);
		console.log(`Audio extracted to ${audioPath}`);

		// Transcribe audio with word-level timestamps
		console.log(`Transcribing audio in ${language}...`);
		const transcription = await transcribeAudio(
			audioPath,
			language,
			"verbose_json"
		);

		// Save transcription for debugging
		if (isDebugMode()) {
			fs.writeFileSync(
				transcriptionJsonPath,
				JSON.stringify(transcription, null, 2)
			);
			console.log(`Saved transcription to ${transcriptionJsonPath}`);
		}

		// Generate SRT file from transcription
		console.log("Generating subtitles...");
		const srtContent = convertVerboseJsonToSrt(transcription);
		fs.writeFileSync(srtPath, srtContent);
		console.log(`Subtitles generated to ${srtPath}`);

		// Add subtitles to the video with enhanced styling
		console.log("Adding subtitles with custom styling...");
		console.log("Subtitle styles:", subtitleStyles);
		const outputPath = await burnSubtitlesWithStyle(
			videoPath,
			srtPath,
			subtitleStyles
		);
		console.log(`Subtitled video saved to ${outputPath}`);

		// Get base URL for the video
		const baseUrl = getBaseUrl(request);
		const videoUrl = `${baseUrl}/api/video/${jobId}_subtitled.mp4`;

		return NextResponse.json({
			videoUrl,
			details: "Video processed successfully",
		});
	} catch (error) {
		console.error("Error processing video:", error);

		// Try to stringify error object to get a better error message
		let errorMessage = "Unknown error";
		try {
			if (error instanceof Error) {
				errorMessage = error.message;
			} else {
				errorMessage = JSON.stringify(error);
			}
		} catch (e) {
			errorMessage = "Could not stringify error";
		}

		return NextResponse.json(
			{ details: `Error processing video: ${errorMessage}` },
			{ status: 500 }
		);
	}
}
