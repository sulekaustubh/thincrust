import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { burnSubtitlesWithFilter } from "@/app/utils/ffmpeg";

export async function POST(req: NextRequest) {
	try {
		const { videoPath, srtPath } = await req.json();

		if (!videoPath || !fs.existsSync(videoPath)) {
			return NextResponse.json(
				{ error: "Video file not found" },
				{ status: 404 }
			);
		}

		if (!srtPath || !fs.existsSync(srtPath)) {
			return NextResponse.json(
				{ error: "SRT file not found" },
				{ status: 404 }
			);
		}

		// Burn subtitles into video
		const outputPath = await burnSubtitlesWithFilter(videoPath, srtPath);

		// Create a unique ID for the file that can be accessed via web
		const outputFileName = path.basename(outputPath);

		return NextResponse.json({
			success: true,
			outputPath,
			fileName: outputFileName,
		});
	} catch (error) {
		console.error("Error during subtitle burning:", error);
		return NextResponse.json(
			{
				error: "Subtitle burning failed",
				details: error instanceof Error ? error.message : String(error),
			},
			{ status: 500 }
		);
	}
}
