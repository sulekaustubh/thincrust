// Debug environment variables and setup
import path from "path";
import fs from "fs";
import os from "os";

export function debugEnvironment() {
	console.log("----- Environment Debug -----");
	console.log("Node version:", process.version);
	console.log("Operating system:", os.platform(), os.release());
	console.log("Working directory:", process.cwd());

	// Check temp directory
	const tempDir = path.join(process.cwd(), "temp");
	console.log("Temp directory:", tempDir);
	if (fs.existsSync(tempDir)) {
		console.log("✓ Temp directory exists");
		try {
			const testFile = path.join(tempDir, "test-write.txt");
			fs.writeFileSync(testFile, "Test write permission");
			console.log("✓ Temp directory is writable");
			fs.unlinkSync(testFile);
		} catch (err) {
			console.error("✗ Temp directory is not writable:", err);
		}

		// List all files in temp directory
		try {
			const files = fs.readdirSync(tempDir);
			console.log(`Temp directory contains ${files.length} files:`);
			files.forEach((file) => {
				try {
					const stats = fs.statSync(path.join(tempDir, file));
					console.log(
						`- ${file} (${
							stats.size
						} bytes, created ${stats.birthtime.toISOString()})`
					);
				} catch (err) {
					console.log(`- ${file} (unable to get stats)`);
				}
			});
		} catch (err) {
			console.error("Unable to list temp directory files:", err);
		}
	} else {
		console.error("✗ Temp directory does not exist");
	}

	// Check environment variables
	console.log("\nEnvironment variables:");
	const apiKey =
		process.env.LEMONFOX_API_KEY ||
		process.env.NEXT_PUBLIC_LEMONFOX_API_KEY;
	if (apiKey) {
		const maskedKey =
			apiKey.substring(0, 4) +
			"..." +
			apiKey.substring(apiKey.length - 4);
		console.log("✓ LEMONFOX_API_KEY is set:", maskedKey);
	} else {
		console.error("✗ LEMONFOX_API_KEY is not set");
	}

	console.log("\nNext.js environment:");
	console.log("NODE_ENV:", process.env.NODE_ENV);
	console.log("----- End Environment Debug -----");

	return {
		apiKeySet: !!apiKey,
		tempDirExists: fs.existsSync(tempDir),
		nodeVersion: process.version,
	};
}
