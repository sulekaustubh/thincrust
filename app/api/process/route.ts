import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { randomUUID } from "crypto";
import { extractAudio } from "@/app/utils/ffmpeg";
import { transcribeAudio, convertVerboseJsonToSrt } from "@/app/utils/lemonfox";
import { burnSubtitlesWithFilter, cleanupTempFiles } from "@/app/utils/ffmpeg";
import { debugEnvironment } from "@/app/debug-env";

// Ensure temp directory exists
const ensureTempDir = () => {
	const tempDir = path.join(process.cwd(), "temp");
	if (!fs.existsSync(tempDir)) {
		fs.mkdirSync(tempDir, { recursive: true });
	}
	return tempDir;
};

export async function POST(req: NextRequest) {
	try {
		// Run environment diagnostics
		console.log("Running environment diagnostics...");
		const diagnostics = debugEnvironment();

		// Check API key first
		const apiKey =
			process.env.LEMONFOX_API_KEY ||
			process.env.NEXT_PUBLIC_LEMONFOX_API_KEY;
		if (!apiKey) {
			console.error("API key is missing");
			return NextResponse.json(
				{
					error: "Configuration error",
					details:
						"API key is not set. Please check your environment variables.",
				},
				{ status: 500 }
			);
		}
		console.log("API key check passed"); // Debug log

		const tempDir = ensureTempDir();
		console.log("Temp directory:", tempDir); // Debug log

		const tempFiles = [];

		// 1. Save uploaded video file
		const uuid = randomUUID();
		const videoPath = path.join(tempDir, `${uuid}.mp4`);
		tempFiles.push(videoPath);

		try {
			// Store incoming file
			const arrayBuffer = await req.arrayBuffer();
			const buffer = Buffer.from(arrayBuffer);
			fs.writeFileSync(videoPath, buffer);
			console.log("Video saved to:", videoPath); // Debug log
		} catch (writeError) {
			console.error("Error writing file:", writeError);
			return NextResponse.json(
				{
					error: "File write error",
					details: `Could not save uploaded file: ${
						writeError instanceof Error
							? writeError.message
							: String(writeError)
					}`,
				},
				{ status: 500 }
			);
		}

		// 2. Extract audio from video
		console.log("Extracting audio from video");
		let audioPath;
		try {
			audioPath = await extractAudio(videoPath);
			tempFiles.push(audioPath);
			console.log("Audio extracted to:", audioPath); // Debug log
		} catch (extractError) {
			console.error("Error extracting audio:", extractError);
			return NextResponse.json(
				{
					error: "Audio extraction failed",
					details: `Could not extract audio: ${
						extractError instanceof Error
							? extractError.message
							: String(extractError)
					}`,
				},
				{ status: 500 }
			);
		}

		// 3. Get transcription from Lemonfox API
		console.log("Sending audio to Lemonfox API");
		let transcription;
		try {
			// Explicitly request verbose_json format
			transcription = await transcribeAudio(
				audioPath,
				"english",
				"verbose_json"
			);

			// Debug: Check if we received word-level timestamps
			const hasWords =
				transcription.segments &&
				transcription.segments.length > 0 &&
				transcription.segments[0].words &&
				Array.isArray(transcription.segments[0].words);

			console.log(
				`Transcription received successfully. Has word timestamps: ${
					hasWords ? "Yes" : "No"
				}`
			);

			// If no words found, log the structure
			if (!hasWords) {
				console.log(
					"Response format structure:",
					JSON.stringify(Object.keys(transcription), null, 2)
				);
				if (
					transcription.segments &&
					transcription.segments.length > 0
				) {
					console.log(
						"First segment structure:",
						JSON.stringify(
							Object.keys(transcription.segments[0]),
							null,
							2
						)
					);
				}
			}
		} catch (transcribeError) {
			console.error("Error transcribing audio:", transcribeError);
			return NextResponse.json(
				{
					error: "Transcription failed",
					details: `API error: ${
						transcribeError instanceof Error
							? transcribeError.message
							: String(transcribeError)
					}`,
				},
				{ status: 500 }
			);
		}

		// 4. Convert to SRT format and save file
		console.log("Converting to SRT format");
		let srtPath;
		try {
			const srtContent = convertVerboseJsonToSrt(transcription);
			srtPath = path.join(tempDir, `${uuid}.srt`);
			tempFiles.push(srtPath);
			fs.writeFileSync(srtPath, srtContent);
			console.log("SRT file created at:", srtPath); // Debug log

			// Write the raw transcription to a file for debugging
			const debugPath = path.join(tempDir, `${uuid}_transcription.json`);
			fs.writeFileSync(debugPath, JSON.stringify(transcription, null, 2));
			console.log("Debug transcription saved to:", debugPath);
		} catch (srtError) {
			console.error("Error creating SRT file:", srtError);
			return NextResponse.json(
				{
					error: "SRT conversion failed",
					details: `Could not create subtitles file: ${
						srtError instanceof Error
							? srtError.message
							: String(srtError)
					}`,
				},
				{ status: 500 }
			);
		}

		// 5. Burn subtitles into video
		console.log("Adding subtitles to video");
		let outputPath;
		try {
			outputPath = await burnSubtitlesWithFilter(videoPath, srtPath);
			console.log("Subtitles added, output at:", outputPath); // Debug log
		} catch (burnError) {
			console.error("Error burning subtitles:", burnError);
			return NextResponse.json(
				{
					error: "Subtitle burning failed",
					details: `Could not add subtitles to video: ${
						burnError instanceof Error
							? burnError.message
							: String(burnError)
					}`,
				},
				{ status: 500 }
			);
		}

		// 6. Return output path for client-side video playing
		const outputFileName = path.basename(outputPath);
		const videoUrl = `/api/video/${outputFileName}`;
		console.log("Process completed successfully, video URL:", videoUrl); // Debug log

		// Cleanup temporary files (keep the output video)
		// We're commenting this out for now to avoid cleaning up files too early
		// cleanupTempFiles([videoPath, audioPath, srtPath]);

		return NextResponse.json({
			success: true,
			videoUrl,
			fileName: outputFileName,
			videoId: uuid,
		});
	} catch (error) {
		console.error("Unhandled error during processing:", error);
		return NextResponse.json(
			{
				error: "Processing failed",
				details: error instanceof Error ? error.message : String(error),
			},
			{ status: 500 }
		);
	}
}
