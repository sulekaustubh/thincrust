import { NextRequest, NextResponse } from "next/server";
import { debugEnvironment } from "@/app/debug-env";
import os from "os";
import path from "path";
import fs from "fs";

export async function GET(req: NextRequest) {
	try {
		// Run environment diagnostics
		const diagnostics = debugEnvironment();

		// Get system information
		const systemInfo = {
			platform: os.platform(),
			release: os.release(),
			hostname: os.hostname(),
			cpus: os.cpus().length,
			totalMemory:
				Math.round(os.totalmem() / (1024 * 1024 * 1024)) + "GB",
			freeMemory: Math.round(os.freemem() / (1024 * 1024 * 1024)) + "GB",
		};

		// Check environment variables (mask sensitive data)
		const apiKey =
			process.env.LEMONFOX_API_KEY ||
			process.env.NEXT_PUBLIC_LEMONFOX_API_KEY;
		const envInfo = {
			nodeEnv: process.env.NODE_ENV,
			hasApiKey: !!apiKey,
			apiKeyPrefix: apiKey ? apiKey.substring(0, 4) + "..." : "not set",
		};

		// Check temp directory
		const tempDir = path.join(process.cwd(), "temp");
		let tempFiles = [];
		if (fs.existsSync(tempDir)) {
			try {
				tempFiles = fs.readdirSync(tempDir).map((file) => {
					try {
						const stats = fs.statSync(path.join(tempDir, file));
						return {
							name: file,
							size: stats.size,
							created: stats.birthtime.toISOString(),
						};
					} catch (err) {
						return {
							name: file,
							error: "Could not read file stats",
						};
					}
				});
			} catch (err) {
				tempFiles = [{ error: "Could not read temp directory" }];
			}
		}

		// Return comprehensive diagnostic info
		return NextResponse.json({
			timestamp: new Date().toISOString(),
			system: systemInfo,
			environment: envInfo,
			tempDirectory: {
				path: tempDir,
				exists: fs.existsSync(tempDir),
				writable: diagnostics.tempDirExists, // This was tested in debugEnvironment()
				files: tempFiles,
			},
			nextjs: {
				version: "15.3.2", // Update if version changes
				isDevelopment: process.env.NODE_ENV === "development",
			},
		});
	} catch (error) {
		console.error("Error in diagnostics route:", error);
		return NextResponse.json(
			{
				error: "Diagnostics failed",
				details: error instanceof Error ? error.message : String(error),
			},
			{ status: 500 }
		);
	}
}
