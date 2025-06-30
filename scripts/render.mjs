#!/usr/bin/env node

import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition } from "@remotion/renderer";
import path from "path";
import { fileURLToPath } from "url";

// Set the environment variable to acknowledge Remotion license
process.env.REMOTION_LICENSE_ACKNOWLEDGED = "true";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const main = async () => {
	// Parse command-line arguments
	const args = process.argv.slice(2);
	const outputFile = args[0] || "output.mp4";

	console.log("🎬 Starting Remotion video render...");

	// Create a bundler to convert React to a bundled format
	console.log("📦 Bundling project...");
	const bundled = await bundle({
		entryPoint: path.resolve(__dirname, "../components/Root.jsx"),
		webpackOverride: (config) => config,
	});

	// Get all compositions
	console.log("🔍 Finding compositions...");
	const compositions = await selectComposition({
		serveUrl: bundled.bundleUrl,
		bundleUrl: bundled.bundleUrl,
		imageFormat: "jpeg",
	});

	// Select the default composition
	const composition = compositions.find((c) => c.id === "VideoWithCaptions");

	if (!composition) {
		console.error(
			'❌ Could not find composition "VideoWithCaptions". Available compositions:'
		);
		compositions.forEach((c) => console.log(`- ${c.id}`));
		process.exit(1);
	}

	console.log(`🎯 Selected composition: ${composition.id}`);
	console.log(`⏱️  Duration: ${composition.durationInFrames} frames`);
	console.log(`🖼️  Dimensions: ${composition.width}x${composition.height}`);

	// Start the rendering
	console.log("🎥 Starting render...");
	const outputPath = path.resolve(process.cwd(), outputFile);

	await renderMedia({
		composition,
		serveUrl: bundled.bundleUrl,
		bundleUrl: bundled.bundleUrl,
		outputFile: outputPath,
		imageFormat: "jpeg",
		codec: "h264",
		parallelism: Math.max(1, Math.floor(require("os").cpus().length / 2)),
		verbose: true,
	});

	console.log(`✅ Render complete! File saved to: ${outputPath}`);
};

main().catch((err) => {
	console.error("❌ Render failed with error:", err);
	process.exit(1);
});
