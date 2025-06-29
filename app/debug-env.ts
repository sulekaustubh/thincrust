// Debug environment variables and setup
import path from "path";
import fs from "fs";
import os from "os";
import { NextRequest } from "next/server";

export const isDebugMode = (): boolean => {
	return process.env.DEBUG === "true";
};

export const getBaseUrl = (request: NextRequest): string => {
	const host = request.headers.get("host") || "localhost:3000";
	const protocol = host.includes("localhost") ? "http" : "https";
	return `${protocol}://${host}`;
};

// Gather information about the environment for debugging
export function debugEnvironment() {
	const envInfo = {
		node: process.version,
		platform: process.platform,
		arch: process.arch,
		cpu: os.cpus()[0]?.model || "unknown",
		memory: `${Math.round(os.totalmem() / (1024 * 1024 * 1024))} GB`,
		apiKey: process.env.LEMONFOX_API_KEY ? "✓ Set" : "✗ Missing",
	};

	console.log("Environment information:");
	console.log(JSON.stringify(envInfo, null, 2));

	return envInfo;
}
