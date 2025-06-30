#!/usr/bin/env node

const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

// Parse command line arguments
const args = process.argv.slice(2);
const outputFile = args[0] || "output.mp4";

// Parse any additional arguments
let styleParam = "";
for (let i = 1; i < args.length; i++) {
	if (args[i].startsWith("--style=")) {
		styleParam = args[i].replace("--style=", "");
	}
}

console.log(`🎬 Rendering video to ${outputFile}`);
if (styleParam) {
	console.log(`🎨 Using custom style: ${styleParam}`);
}

try {
	// Make sure output directory exists
	const outputDir = path.dirname(outputFile);
	if (outputDir !== "." && !fs.existsSync(outputDir)) {
		fs.mkdirSync(outputDir, { recursive: true });
	}

	// Build the command
	let command = `npx remotion render components/Root.jsx VideoWithCaptions "${outputFile}" --frames=1-900 --log=verbose`;

	// Add style parameter if provided
	if (styleParam) {
		command += ` --props='{"captionStyle":{"classNames":"${styleParam}"}}'`;
	}

	console.log(`Executing: ${command}`);
	execSync(command, { stdio: "inherit" });

	console.log(`✅ Render complete!`);
	console.log(`📁 Video saved to: ${path.resolve(outputFile)}`);

	// Open the file with the default video player (macOS)
	if (process.platform === "darwin") {
		console.log(`🎥 Opening video...`);
		execSync(`open "${outputFile}"`);
	}
} catch (error) {
	console.error(`❌ Render failed!`);
	process.exit(1);
}
