import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { randomUUID } from "crypto";
import formidable from "formidable";
import { extractAudio } from "@/app/utils/ffmpeg";

// Disable body parser to handle file uploads
export const config = {
	api: {
		bodyParser: false,
	},
};

// Ensure temp directory exists
const ensureTempDir = () => {
	const tempDir = path.join(process.cwd(), "temp");
	if (!fs.existsSync(tempDir)) {
		fs.mkdirSync(tempDir, { recursive: true });
	}
	return tempDir;
};

// Parse form data with formidable
const parseFormData = async (
	req: NextRequest
): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
	const tempDir = ensureTempDir();

	return new Promise((resolve, reject) => {
		const form = formidable({
			uploadDir: tempDir,
			keepExtensions: true,
			maxFileSize: 100 * 1024 * 1024, // 100MB max size
			filter: (part) => {
				return (
					part.name === "video" &&
					(part.mimetype?.includes("video/mp4") || false)
				);
			},
		});

		const chunks = [];
		req.body
			?.getReader()
			.read()
			.then(function processText({ done, value }) {
				if (done) {
					const buffer = Buffer.concat(chunks);
					form.parse(buffer, (err, fields, files) => {
						if (err) reject(err);
						else resolve({ fields, files });
					});
					return;
				}

				chunks.push(Buffer.from(value));
				return req.body?.getReader().read().then(processText);
			});
	});
};

export async function POST(req: NextRequest) {
	try {
		const tempDir = ensureTempDir();

		// Generate unique filename
		const uuid = randomUUID();
		const videoPath = path.join(tempDir, `${uuid}.mp4`);

		// Store incoming file
		const arrayBuffer = await req.arrayBuffer();
		const buffer = Buffer.from(arrayBuffer);
		fs.writeFileSync(videoPath, buffer);

		// Extract audio from video
		const audioPath = await extractAudio(videoPath);

		return NextResponse.json({
			success: true,
			videoId: uuid,
			videoPath,
			audioPath,
		});
	} catch (error) {
		console.error("Error during upload:", error);
		return NextResponse.json(
			{
				error: "File upload failed",
				details: error instanceof Error ? error.message : String(error),
			},
			{ status: 500 }
		);
	}
}
