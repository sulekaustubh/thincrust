import { exec } from "child_process";
import path from "path";
import fs from "fs";
import { promisify } from "util";
import ffmpeg from "fluent-ffmpeg";

// Promisify exec for async/await use
const execPromise = promisify(exec);

// Ensure temp directory exists
const ensureTempDir = () => {
	const tempDir = path.join(process.cwd(), "temp");
	if (!fs.existsSync(tempDir)) {
		fs.mkdirSync(tempDir, { recursive: true });
	}
	return tempDir;
};

// Check if ffmpeg is available and use system ffmpeg
const checkFFmpeg = async () => {
	try {
		const { stdout } = await execPromise("which ffmpeg");
		if (stdout.trim()) {
			console.log("Using system FFmpeg:", stdout.trim());
			ffmpeg.setFfmpegPath(stdout.trim());
			return true;
		}
	} catch (error) {
		console.error(
			"System FFmpeg not found, will try to use fallback methods"
		);
		return false;
	}
};

// Call the check function
checkFFmpeg().catch(console.error);

// Extract audio from video file
export async function extractAudio(videoPath: string): Promise<string> {
	const tempDir = ensureTempDir();
	const outputPath = path.join(tempDir, `${path.parse(videoPath).name}.mp3`);

	return new Promise((resolve, reject) => {
		ffmpeg(videoPath)
			.output(outputPath)
			.audioCodec("libmp3lame")
			.on("start", (commandLine) => {
				console.log("FFmpeg extraction command:", commandLine);
			})
			.on("end", () => {
				console.log("Audio extraction completed");
				resolve(outputPath);
			})
			.on("error", (err) => {
				console.error("Error during audio extraction:", err);
				reject(err);
			})
			.run();
	});
}

// Burn subtitles into video
export async function burnSubtitles(
	videoPath: string,
	subtitlePath: string
): Promise<string> {
	const tempDir = ensureTempDir();
	const outputPath = path.join(
		tempDir,
		`${path.parse(videoPath).name}_subtitled.mp4`
	);

	// Escape paths for FFmpeg
	const escapedSubtitlePath = subtitlePath
		.replace(/\\/g, "\\\\")
		.replace(/:/g, "\\:");

	return new Promise((resolve, reject) => {
		ffmpeg(videoPath)
			.outputOptions([
				"-c:v libx264",
				"-c:a aac",
				"-crf 23",
				"-preset veryfast",
				`-vf subtitles=${escapedSubtitlePath}`,
			])
			.output(outputPath)
			.on("start", (commandLine) => {
				console.log("FFmpeg subtitle command:", commandLine);
			})
			.on("end", () => {
				console.log("Subtitle burning completed");
				resolve(outputPath);
			})
			.on("error", (err) => {
				console.error("Error during subtitle burning:", err);
				reject(err);
			})
			.run();
	});
}

// Alternative method using filters for subtitle hardcoding
export async function burnSubtitlesWithFilter(
	videoPath: string,
	subtitlePath: string
): Promise<string> {
	// Make sure both input files exist
	if (!fs.existsSync(videoPath)) {
		throw new Error(`Video file does not exist: ${videoPath}`);
	}

	if (!fs.existsSync(subtitlePath)) {
		throw new Error(`Subtitle file does not exist: ${subtitlePath}`);
	}

	const tempDir = ensureTempDir();

	// Create a copy of the SRT file in the temp directory with a simpler name
	const srtFileName = "subtitles.srt";
	const srtTempPath = path.join(tempDir, srtFileName);
	fs.copyFileSync(subtitlePath, srtTempPath);

	const outputFileName = `${path.parse(videoPath).name}_subtitled.mp4`;
	const outputPath = path.join(tempDir, outputFileName);

	// Make sure the output directory exists and is writable
	try {
		// Check if temp directory is writable
		fs.accessSync(tempDir, fs.constants.W_OK);
	} catch (err) {
		console.error("Temp directory is not writable:", err);
		throw new Error(`Temp directory is not writable: ${tempDir}`);
	}

	console.log("Input paths:", {
		videoPath,
		srtTempPath,
		outputPath,
	});

	// Try using direct ffmpeg command if fluent-ffmpeg fails
	try {
		return await new Promise<string>((resolve, reject) => {
			ffmpeg(videoPath)
				.outputOptions([
					"-c:v libx264",
					"-c:a aac",
					`-vf subtitles=${srtTempPath}`,
				])
				.output(outputPath)
				.on("start", (commandLine) => {
					console.log("FFmpeg command:", commandLine);
				})
				.on("progress", (progress) => {
					console.log(
						`Processing: ${Math.floor(progress.percent || 0)}% done`
					);
				})
				.on("end", () => {
					console.log("Subtitle burning completed");
					resolve(outputPath);
				})
				.on("error", (err, stdout, stderr) => {
					console.error("Error during subtitle burning:", err);
					console.error("FFmpeg stderr:", stderr);
					reject(err);
				})
				.run();
		});
	} catch (fluentError) {
		console.error(
			"Fluent-FFmpeg failed, falling back to direct command:",
			fluentError
		);

		// Fallback to direct command
		const command = `ffmpeg -i "${videoPath}" -vf subtitles="${srtTempPath}" -c:v libx264 -c:a aac "${outputPath}"`;
		console.log("Executing fallback command:", command);

		try {
			await execPromise(command);
			console.log("Fallback command completed successfully");
			return outputPath;
		} catch (execError) {
			console.error("Fallback command failed:", execError);
			throw execError;
		}
	}
}

// Clean up temporary files
export function cleanupTempFiles(filePaths: string[]) {
	filePaths.forEach((filePath) => {
		if (fs.existsSync(filePath)) {
			fs.unlinkSync(filePath);
			console.log(`Deleted temporary file: ${filePath}`);
		}
	});
}
