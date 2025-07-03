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

	// Check if there's a temporary words file to use
	let propsString = "";
	let maxFrames = 900; // Default frame count
	const tempWordsPath = path.join(process.cwd(), "temp-words.json");
	if (fs.existsSync(tempWordsPath)) {
		try {
			const tempWords = JSON.parse(
				fs.readFileSync(tempWordsPath, "utf-8")
			);
			console.log(`📖 Found ${tempWords.length} words from UI`);

			// Calculate dynamic frame count based on last word end time
			if (tempWords.length > 0) {
				const lastWord = tempWords[tempWords.length - 1];
				const lastEndTime = lastWord.end;
				const durationInSeconds = Math.ceil(lastEndTime + 2); // Add 2-second buffer
				const fps = 30;
				maxFrames = durationInSeconds * fps;
				console.log(
					`📏 Calculated ${maxFrames} frames (${durationInSeconds}s) based on audio duration`
				);
			}

			let props = {
				words: tempWords,
			};

			// Add caption style if provided
			if (styleParam) {
				props.captionStyle = {
					classNames: styleParam,
				};
			}

			// Use JSON.stringify and escape properly for shell
			const propsJson = JSON.stringify(props);
			// Escape double quotes and wrap in single quotes to avoid shell parsing issues
			const escapedProps = propsJson.replace(/"/g, '\\"');
			propsString = `--props="${escapedProps}"`;
			console.log(
				`📝 Created props string with ${tempWords.length} words`
			);
		} catch (error) {
			console.warn("Could not parse temporary words file:", error);
		}
	} else if (styleParam) {
		// Only style param provided
		const props = {
			captionStyle: {
				classNames: styleParam,
			},
		};
		const propsJson = JSON.stringify(props);
		const escapedProps = propsJson.replace(/"/g, '\\"');
		propsString = `--props="${escapedProps}"`;
	}

	// Build the command - let Remotion automatically determine frame range
	let command = `npx remotion render components/Root.jsx VideoWithCaptions "${outputFile}" --log=verbose --timeout=120000 --concurrency=1`;

	// Add props if we have any
	if (propsString) {
		command += ` ${propsString}`;
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
