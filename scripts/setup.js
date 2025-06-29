const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

// Create temp directory if it doesn't exist
const tempDir = path.join(process.cwd(), "temp");
if (!fs.existsSync(tempDir)) {
	fs.mkdirSync(tempDir, { recursive: true });
	console.log("✓ Created temporary directory:", tempDir);
}

// Check if FFmpeg is installed
try {
	const ffmpegVersion = execSync("ffmpeg -version").toString();
	console.log("✓ FFmpeg is installed:", ffmpegVersion.split("\n")[0]);
} catch (error) {
	console.error("\n❌ FFmpeg is not installed or not in PATH");
	console.error("Please install FFmpeg to use this application:");
	console.error("  - macOS: brew install ffmpeg");
	console.error("  - Ubuntu/Debian: apt-get install ffmpeg");
	console.error("  - Windows: https://ffmpeg.org/download.html\n");
	process.exit(1);
}

// Check for environment variables
if (
	!process.env.LEMONFOX_API_KEY &&
	!process.env.NEXT_PUBLIC_LEMONFOX_API_KEY
) {
	console.warn(
		"\n⚠️  Warning: Lemonfox API key not found in environment variables"
	);
	console.warn("Please create a .env.local file with your Lemonfox API key:");
	console.warn("LEMONFOX_API_KEY=your_api_key_here\n");
}

console.log("✓ Setup completed successfully\n");
