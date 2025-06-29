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

// Subtitle style options interface
export interface SubtitleStyleOptions {
	fontName?: string;
	fontSize?: number;
	fontColor?: string;
	borderColor?: string;
	borderWidth?: number;
	position?: "center" | "bottom";
	boxColor?: string;
	boxOpacity?: number;
}

// Default subtitle styles
const defaultSubtitleStyles: SubtitleStyleOptions = {
	fontName: "Arial",
	fontSize: 24,
	fontColor: "white",
	borderColor: "black",
	borderWidth: 1.5,
	position: "bottom",
	boxColor: "000000",
	boxOpacity: 20, // Increased for better visibility
};

// Convert color name to FFmpeg compatible format (supporting common colors)
const getColorCode = (color: string): string => {
	const colorMap: Record<string, string> = {
		white: "ffffff",
		yellow: "ffff00",
		cyan: "00ffff",
		black: "000000",
		red: "ff0000",
		green: "00ff00",
		blue: "0000ff",
	};

	// If it's a recognized color name, return the hex code
	if (color.toLowerCase() in colorMap) {
		return colorMap[color.toLowerCase()];
	}

	// If it looks like a hex color code already, return it
	if (/^[0-9A-Fa-f]{6}$/.test(color)) {
		return color;
	}

	// Default to white if color is not recognized
	return "ffffff";
};

// Create a customized SRT file with styling for better compatibility
async function createStyledSrtFile(
	subtitlePath: string,
	styles: SubtitleStyleOptions
): Promise<string> {
	const tempDir = ensureTempDir();
	const outputSrtPath = path.join(
		tempDir,
		`styled_${path.basename(subtitlePath)}`
	);

	try {
		// Read the original SRT file
		const content = fs.readFileSync(subtitlePath, "utf-8");

		// Write to new file with same content (we'll use styling parameters in the filter)
		fs.writeFileSync(outputSrtPath, content);

		return outputSrtPath;
	} catch (error) {
		console.error("Error creating styled SRT file:", error);
		// Fall back to original file
		return subtitlePath;
	}
}

// Burn subtitles into video with custom styling
export async function burnSubtitlesWithStyle(
	videoPath: string,
	subtitlePath: string,
	styles: SubtitleStyleOptions = defaultSubtitleStyles
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
		fs.accessSync(tempDir, fs.constants.W_OK);
	} catch (err) {
		console.error("Temp directory is not writable:", err);
		throw new Error(`Temp directory is not writable: ${tempDir}`);
	}

	// Merge provided styles with defaults
	const mergedStyles = { ...defaultSubtitleStyles, ...styles };

	// Process colors to ensure proper format
	const fontColor = getColorCode(mergedStyles.fontColor || "white");
	const borderColor = getColorCode(mergedStyles.borderColor || "black");
	const boxColor = getColorCode(mergedStyles.boxColor || "000000");

	// Other style elements
	const fontSize = mergedStyles.fontSize || 24;
	const borderWidth = mergedStyles.borderWidth || 1.5;
	const fontName = mergedStyles.fontName || "Arial";
	const boxOpacity = mergedStyles.boxOpacity || 60;

	// Position adjustment
	let alignment = "2"; // Bottom center (default)
	if (mergedStyles.position === "center") {
		alignment = "10"; // Middle center
	}

	// First approach: Create a more visible subtitle style
	const subtitleStyle = `subtitles=${srtTempPath}:force_style='FontName=${fontName},FontSize=${fontSize},PrimaryColour=&H${fontColor},OutlineColour=&H${borderColor},BackColour=&H${boxColor},Bold=1,BorderStyle=4,Outline=${borderWidth},Shadow=0,Alignment=${alignment}'`;

	// Alternative approach: Use drawtext filter for more control (fallback)
	const drawTextFilter = `drawtext=fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf:text='%{subtitles:${srtTempPath}}':force_style='Fontname=${fontName},Fontsize=${fontSize},PrimaryColour=${fontColor}':fontcolor=white:fontsize=${fontSize}:bordercolor=black:borderw=3:x=(w-text_w)/2:y=h-th-24`;

	console.log("Input paths:", {
		videoPath,
		srtTempPath,
		outputPath,
	});
	console.log("Using subtitle style:", subtitleStyle);

	// Try direct command first with more reliable parameters
	try {
		const command = `ffmpeg -i "${videoPath}" -vf "${subtitleStyle}" -c:v libx264 -c:a aac "${outputPath}"`;
		console.log("Executing direct command:", command);

		await execPromise(command);
		console.log("Direct command completed successfully");
		return outputPath;
	} catch (directError) {
		console.error(
			"Direct command failed, trying fluent-ffmpeg approach:",
			directError
		);

		// Try the fluent-ffmpeg approach
		try {
			return await new Promise<string>((resolve, reject) => {
				ffmpeg(videoPath)
					.outputOptions([
						"-c:v libx264",
						"-c:a aac",
						`-vf ${subtitleStyle}`,
					])
					.output(outputPath)
					.on("start", (commandLine) => {
						console.log("FFmpeg command:", commandLine);
					})
					.on("progress", (progress) => {
						console.log(
							`Processing: ${Math.floor(
								progress.percent || 0
							)}% done`
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
				"Fluent-FFmpeg approach failed, trying fallback method:",
				fluentError
			);

			// Last resort: Try a different subtitle rendering approach
			try {
				const fallbackCommand = `ffmpeg -i "${videoPath}" -vf "ass=${srtTempPath}" -c:v libx264 -c:a aac "${outputPath}"`;
				console.log("Executing fallback command:", fallbackCommand);

				await execPromise(fallbackCommand);
				console.log("Fallback command completed successfully");
				return outputPath;
			} catch (fallbackError) {
				console.error(
					"All subtitle burning approaches failed:",
					fallbackError
				);
				throw fallbackError;
			}
		}
	}
}

// Legacy function for backward compatibility
export async function burnSubtitles(
	videoPath: string,
	subtitlePath: string
): Promise<string> {
	return burnSubtitlesWithStyle(videoPath, subtitlePath);
}

// Alternative method using filters for subtitle hardcoding
export async function burnSubtitlesWithFilter(
	videoPath: string,
	subtitlePath: string,
	styles: SubtitleStyleOptions = defaultSubtitleStyles
): Promise<string> {
	return burnSubtitlesWithStyle(videoPath, subtitlePath, styles);
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
