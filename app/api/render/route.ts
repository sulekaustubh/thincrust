import { NextRequest, NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";
import path from "path";
import fs from "fs";

const execAsync = promisify(exec);

export async function POST(request: NextRequest) {
	try {
		const {
			outputFile = "my-videok.mp4",
			styleParam,
			words,
		} = await request.json();

		console.log(`🎬 Starting video render for ${outputFile}`);

		// Save words to temporary file for the render script to use
		if (words && words.length > 0) {
			const wordsFilePath = path.join(process.cwd(), "temp-words.json");
			fs.writeFileSync(wordsFilePath, JSON.stringify(words, null, 2));
			console.log(`📝 Saved ${words.length} words to temporary file`);
		}

		// Build the command
		let command = `node render-video.js "${outputFile}"`;

		// Add style parameter if provided
		if (styleParam) {
			command += ` --style="${styleParam}"`;
		}

		console.log(`Executing: ${command}`);

		// Execute the render command
		const { stdout, stderr } = await execAsync(command, {
			cwd: process.cwd(),
			maxBuffer: 1024 * 1024 * 10, // 10MB buffer for large outputs
		});

		console.log("Render stdout:", stdout);
		if (stderr) {
			console.log("Render stderr:", stderr);
		}

		// Clean up temporary words file
		const wordsFilePath = path.join(process.cwd(), "temp-words.json");
		if (fs.existsSync(wordsFilePath)) {
			fs.unlinkSync(wordsFilePath);
			console.log("🧹 Cleaned up temporary words file");
		}

		const outputPath = path.resolve(process.cwd(), outputFile);

		return NextResponse.json({
			success: true,
			message: "Video rendered successfully!",
			outputFile: outputPath,
			stdout,
			stderr,
		});
	} catch (error: any) {
		console.error("Render error:", error);

		// Clean up temporary words file in case of error
		const wordsFilePath = path.join(process.cwd(), "temp-words.json");
		if (fs.existsSync(wordsFilePath)) {
			fs.unlinkSync(wordsFilePath);
		}

		return NextResponse.json(
			{
				success: false,
				error: error.message,
				stdout: error.stdout || "",
				stderr: error.stderr || "",
			},
			{ status: 500 }
		);
	}
}
