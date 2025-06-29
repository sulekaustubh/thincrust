import fs from "fs";
import path from "path";

// Ensure temp directory exists on startup
export function setupApplication() {
	const tempDir = path.join(process.cwd(), "temp");

	// Create temp directory if it doesn't exist
	if (!fs.existsSync(tempDir)) {
		fs.mkdirSync(tempDir, { recursive: true });
		console.log("Created temporary directory:", tempDir);
	}

	// Verify API key is set
	const apiKey =
		process.env.LEMONFOX_API_KEY ||
		process.env.NEXT_PUBLIC_LEMONFOX_API_KEY;
	if (!apiKey) {
		console.warn(
			"⚠️ Lemonfox API key is not set. Please set LEMONFOX_API_KEY in your environment variables."
		);
	} else {
		console.log("✓ Lemonfox API key is set");
	}

	// Return information about the setup
	return {
		tempDir,
		apiKeySet: !!apiKey,
	};
}
