import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export async function GET(
	request: NextRequest,
	{ params }: { params: { filename: string } }
) {
	try {
		const filename = params.filename;
		console.log(`Attempting to serve video file: ${filename}`);

		// Security check to prevent directory traversal
		if (filename.includes("..") || !filename.includes("_subtitled.mp4")) {
			console.error(`Invalid file request: ${filename}`);
			return NextResponse.json(
				{ error: "Invalid file request" },
				{ status: 400 }
			);
		}

		const tempDir = path.join(process.cwd(), "temp");
		const filePath = path.join(tempDir, filename);

		console.log(`Looking for file at path: ${filePath}`);

		if (!fs.existsSync(filePath)) {
			console.error(`File not found: ${filePath}`);
			return NextResponse.json(
				{ error: "File not found" },
				{ status: 404 }
			);
		}

		console.log(`File exists, size: ${fs.statSync(filePath).size} bytes`);

		const fileBuffer = fs.readFileSync(filePath);

		// Create response with proper headers
		const response = new NextResponse(fileBuffer);
		response.headers.set("Content-Type", "video/mp4");
		response.headers.set(
			"Content-Disposition",
			`attachment; filename=${filename}`
		);
		response.headers.set("Cache-Control", "public, max-age=300"); // Cache for 5 minutes

		console.log(`Successfully serving video file: ${filename}`);
		return response;
	} catch (error) {
		console.error("Error serving video file:", error);
		return NextResponse.json(
			{
				error: "Failed to serve video file",
				details: error instanceof Error ? error.message : String(error),
			},
			{ status: 500 }
		);
	}
}
