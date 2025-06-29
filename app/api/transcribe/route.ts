import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { transcribeAudio, convertVerboseJsonToSrt } from "@/app/utils/lemonfox";

export async function POST(req: NextRequest) {
	try {
		const { audioPath } = await req.json();

		if (!audioPath || !fs.existsSync(audioPath)) {
			return NextResponse.json(
				{ error: "Audio file not found" },
				{ status: 404 }
			);
		}

		// Get transcription from Lemonfox API
		const transcription = await transcribeAudio(audioPath);

		// Convert to SRT format
		const srtContent = convertVerboseJsonToSrt(transcription);

		// Save SRT file
		const srtPath = audioPath.replace(/\.[^/.]+$/, ".srt");
		fs.writeFileSync(srtPath, srtContent);

		return NextResponse.json({
			success: true,
			transcription,
			srtPath,
		});
	} catch (error) {
		console.error("Error during transcription:", error);
		return NextResponse.json(
			{
				error: "Transcription failed",
				details: error instanceof Error ? error.message : String(error),
			},
			{ status: 500 }
		);
	}
}
