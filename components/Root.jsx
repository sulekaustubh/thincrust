import React from "react";
import { Composition, registerRoot, getInputProps } from "remotion";
import { RemotionVideo } from "./RemotionVideo";
// import { words } from "../app/data/words";

// Default words if no props are provided
const defaultWords = [
	{
		word: "This",
		start: 0,
		end: 0.54,
		score: 0.53,
	},
	{
		word: "is",
		start: 0.54,
		end: 0.9,
		score: 0.9,
	},
	{
		word: "India's",
		start: 0.9,
		end: 1.6,
		score: 0.98,
	},
	{
		word: "first",
		start: 1.6,
		end: 1.86,
		score: 0.95,
	},
	{
		word: "ever",
		start: 1.86,
		end: 2.3,
		score: 0.97,
	},
	{
		word: "superbike.",
		start: 2.3,
		end: 3.28,
		score: 0.24,
	},
	{
		word: "This",
		start: 9.56,
		end: 9.78,
		score: 0.17,
	},
	{
		word: "is",
		start: 9.78,
		end: 10.26,
		score: 0.96,
	},
	{
		word: "the",
		start: 10.26,
		end: 10.76,
		score: 0.92,
	},
	{
		word: "fastest",
		start: 10.76,
		end: 11.26,
		score: 0.88,
	},
	{
		word: "Indian",
		start: 11.26,
		end: 11.76,
		score: 0.99,
	},
	{
		word: "made",
		start: 11.76,
		end: 12.06,
		score: 0.49,
	},
	{
		word: "motorcycle",
		start: 12.06,
		end: 12.56,
		score: 0.96,
	},
	{
		word: "ever.",
		start: 12.56,
		end: 13.38,
		score: 0.88,
	},
	{
		word: "It",
		start: 13.62,
		end: 13.7,
		score: 0.97,
	},
	{
		word: "has",
		start: 13.7,
		end: 14,
		score: 0.99,
	},
	{
		word: "reached",
		start: 14,
		end: 14.26,
		score: 0.99,
	},
	{
		word: "a",
		start: 14.26,
		end: 14.5,
		score: 0.94,
	},
	{
		word: "top",
		start: 14.5,
		end: 14.74,
		score: 0.99,
	},
	{
		word: "speed",
		start: 14.74,
		end: 14.94,
		score: 0.98,
	},
	{
		word: "of",
		start: 14.94,
		end: 15.34,
		score: 0.99,
	},
	{
		word: "258",
		start: 15.34,
		end: 16.58,
		score: 0.65,
	},
	{
		word: "kilometers",
		start: 16.58,
		end: 16.92,
		score: 0.23,
	},
	{
		word: "an",
		start: 16.92,
		end: 17.18,
		score: 0.1,
	},
	{
		word: "hour.",
		start: 17.18,
		end: 17.44,
		score: 0.93,
	},
	{
		word: "It",
		start: 17.66,
		end: 17.68,
		score: 0.98,
	},
	{
		word: "can",
		start: 17.68,
		end: 17.92,
		score: 1,
	},
	{
		word: "do",
		start: 17.92,
		end: 18.2,
		score: 0.99,
	},
	{
		word: "the",
		start: 18.2,
		end: 18.4,
		score: 0.99,
	},
	{
		word: "quarter",
		start: 18.4,
		end: 18.64,
		score: 0.8,
	},
	{
		word: "mile",
		start: 18.64,
		end: 18.86,
		score: 0.98,
	},
	{
		word: "in",
		start: 18.86,
		end: 19.2,
		score: 0.88,
	},
	{
		word: "10.7",
		start: 19.2,
		end: 20.24,
		score: 0.88,
	},
	{
		word: "seconds",
		start: 20.24,
		end: 20.84,
		score: 0.97,
	},
	{
		word: "and",
		start: 20.84,
		end: 21.22,
		score: 0.28,
	},
	{
		word: "it's",
		start: 21.22,
		end: 21.46,
		score: 0.9,
	},
	{
		word: "called",
		start: 21.46,
		end: 21.84,
		score: 0.98,
	},
	{
		word: "the",
		start: 21.84,
		end: 22.22,
		score: 0.88,
	},
	{
		word: "Ultra",
		start: 22.22,
		end: 22.44,
		score: 0.2,
	},
	{
		word: "Violet",
		start: 22.44,
		end: 22.86,
		score: 0.82,
	},
	{
		word: "F99.",
		start: 22.86,
		end: 23.9,
		score: 0.71,
	},
	{
		word: "This",
		start: 24.1,
		end: 24.3,
		score: 0.98,
	},
	{
		word: "particular",
		start: 24.3,
		end: 24.66,
		score: 0.99,
	},
	{
		word: "bike",
		start: 24.66,
		end: 24.96,
		score: 1,
	},
	{
		word: "is",
		start: 24.96,
		end: 25.2,
		score: 0.99,
	},
	{
		word: "a",
		start: 25.2,
		end: 25.46,
		score: 0.95,
	},
	{
		word: "proper",
		start: 25.46,
		end: 25.84,
		score: 0.99,
	},
	{
		word: "race",
		start: 25.84,
		end: 26.2,
		score: 0.88,
	},
	{
		word: "bike.",
		start: 26.2,
		end: 26.62,
		score: 0.78,
	},
	{
		word: "It's",
		start: 26.68,
		end: 26.72,
		score: 0.96,
	},
	{
		word: "fully",
		start: 26.72,
		end: 26.94,
		score: 0.99,
	},
	{
		word: "kitted",
		start: 26.94,
		end: 27.22,
		score: 0.26,
	},
	{
		word: "out",
		start: 27.22,
		end: 27.44,
		score: 0.98,
	},
	{
		word: "with",
		start: 27.44,
		end: 27.68,
		score: 0.99,
	},
	{
		word: "carbon",
		start: 27.68,
		end: 27.94,
		score: 0.88,
	},
	{
		word: "fiber",
		start: 27.94,
		end: 28.3,
		score: 0.9,
	},
	{
		word: "but",
		start: 28.3,
		end: 28.52,
		score: 0.56,
	},
	{
		word: "it's",
		start: 28.52,
		end: 28.74,
		score: 0.95,
	},
	{
		word: "totally",
		start: 28.74,
		end: 28.74,
		score: 0.01,
	},
	{
		word: "fine.",
		start: 28.74,
		end: 28.74,
		score: 0.43,
	},
	{
		word: "basically",
		start: 28.82,
		end: 29.62,
		score: 0.45,
	},
	{
		word: "based",
		start: 29.62,
		end: 30.08,
		score: 0.9,
	},
	{
		word: "on",
		start: 30.08,
		end: 30.3,
		score: 0.98,
	},
	{
		word: "this",
		start: 30.3,
		end: 30.54,
		score: 0.83,
	},
	{
		word: "road",
		start: 30.54,
		end: 30.76,
		score: 0.93,
	},
	{
		word: "going",
		start: 30.76,
		end: 30.98,
		score: 0.42,
	},
	{
		word: "motorcycle",
		start: 30.98,
		end: 31.42,
		score: 0.91,
	},
	{
		word: "which",
		start: 31.42,
		end: 31.8,
		score: 0.86,
	},
	{
		word: "Ultraviolet",
		start: 31.8,
		end: 32.38,
		score: 0.34,
	},
	{
		word: "makes",
		start: 32.38,
		end: 32.64,
		score: 0.94,
	},
	{
		word: "which",
		start: 32.64,
		end: 32.96,
		score: 0.83,
	},
	{
		word: "is",
		start: 32.96,
		end: 33.36,
		score: 0.98,
	},
	{
		word: "the",
		start: 33.36,
		end: 33.52,
		score: 0.96,
	},
	{
		word: "actual",
		start: 33.52,
		end: 33.9,
		score: 0.97,
	},
	{
		word: "F99.",
		start: 33.9,
		end: 35,
		score: 0.44,
	},
	{
		word: "But",
		start: 35.22,
		end: 35.22,
		score: 0.47,
	},
	{
		word: "as",
		start: 35.22,
		end: 35.38,
		score: 0.97,
	},
	{
		word: "you",
		start: 35.38,
		end: 35.5,
		score: 0.97,
	},
	{
		word: "can",
		start: 35.5,
		end: 35.6,
		score: 1,
	},
	{
		word: "see",
		start: 35.6,
		end: 35.84,
		score: 1,
	},
	{
		word: "this",
		start: 35.84,
		end: 36.06,
		score: 0.83,
	},
	{
		word: "particular",
		start: 36.06,
		end: 36.36,
		score: 0.99,
	},
	{
		word: "one",
		start: 36.36,
		end: 36.58,
		score: 0.96,
	},
	{
		word: "has",
		start: 36.58,
		end: 36.84,
		score: 0.99,
	},
	{
		word: "a",
		start: 36.84,
		end: 37.08,
		score: 0.97,
	},
	{
		word: "fairing,",
		start: 37.08,
		end: 37.98,
		score: 0.61,
	},
	{
		word: "proper",
		start: 37.98,
		end: 38.14,
		score: 0.82,
	},
	{
		word: "clip-on",
		start: 38.14,
		end: 38.68,
		score: 0.67,
	},
	{
		word: "handlebars,",
		start: 38.68,
		end: 39.42,
		score: 0.84,
	},
	{
		word: "full-on",
		start: 40,
		end: 40.42,
		score: 0.86,
	},
	{
		word: "carbon",
		start: 40.42,
		end: 40.66,
		score: 0.61,
	},
	{
		word: "fiber",
		start: 40.66,
		end: 40.98,
		score: 0.65,
	},
	{
		word: "bodywork",
		start: 40.98,
		end: 41.6,
		score: 0.78,
	},
	{
		word: "and",
		start: 41.6,
		end: 41.9,
		score: 0.72,
	},
	{
		word: "yeah",
		start: 41.9,
		end: 42.22,
		score: 0.55,
	},
	{
		word: "it",
		start: 42.22,
		end: 42.66,
		score: 0.48,
	},
	{
		word: "looks",
		start: 42.66,
		end: 42.88,
		score: 0.99,
	},
	{
		word: "pretty",
		start: 42.88,
		end: 43.12,
		score: 0.97,
	},
	{
		word: "crazy.",
		start: 43.12,
		end: 43.7,
		score: 0.95,
	},
	{
		word: "The",
		start: 43.82,
		end: 44,
		score: 0.7,
	},
	{
		word: "UV",
		start: 44,
		end: 44.2,
		score: 0.84,
	},
	{
		word: "F99",
		start: 44.2,
		end: 44.96,
		score: 0.66,
	},
	{
		word: "makes",
		start: 44.96,
		end: 45.32,
		score: 0.99,
	},
	{
		word: "roughly",
		start: 45.32,
		end: 45.68,
		score: 0.91,
	},
	{
		word: "120",
		start: 45.68,
		end: 46.5,
		score: 0.9,
	},
	{
		word: "horsepower",
		start: 46.5,
		end: 47.08,
		score: 0.25,
	},
	{
		word: "and",
		start: 47.08,
		end: 47.44,
		score: 0.87,
	},
	{
		word: "200",
		start: 47.44,
		end: 47.96,
		score: 0.92,
	},
	{
		word: "Newton",
		start: 47.96,
		end: 48.32,
		score: 0.14,
	},
	{
		word: "meters",
		start: 48.32,
		end: 48.68,
		score: 0.91,
	},
	{
		word: "of",
		start: 48.68,
		end: 48.98,
		score: 0.85,
	},
	{
		word: "torque",
		start: 48.98,
		end: 49.28,
		score: 0.98,
	},
	{
		word: "from",
		start: 49.28,
		end: 49.88,
		score: 0.95,
	},
	{
		word: "the",
		start: 49.88,
		end: 50.16,
		score: 0.98,
	},
	{
		word: "motor.",
		start: 50.16,
		end: 50.58,
		score: 0.74,
	},
	{
		word: "But",
		start: 50.84,
		end: 50.92,
		score: 0.85,
	},
	{
		word: "if",
		start: 50.92,
		end: 51.1,
		score: 0.99,
	},
	{
		word: "you",
		start: 51.1,
		end: 51.32,
		score: 0.99,
	},
	{
		word: "apply",
		start: 51.32,
		end: 51.58,
		score: 0.99,
	},
	{
		word: "fancy",
		start: 51.58,
		end: 52.02,
		score: 0.98,
	},
	{
		word: "EV",
		start: 52.02,
		end: 52.38,
		score: 0.98,
	},
	{
		word: "mathematics",
		start: 52.38,
		end: 52.88,
		score: 0.78,
	},
	{
		word: "it",
		start: 52.88,
		end: 53.48,
		score: 0.44,
	},
	{
		word: "makes",
		start: 53.48,
		end: 53.76,
		score: 0.98,
	},
	{
		word: "972",
		start: 53.98,
		end: 56.08,
		score: 0.46,
	},
	{
		word: "Newton",
		start: 56.08,
		end: 56.42,
		score: 0.18,
	},
	{
		word: "meters",
		start: 56.42,
		end: 56.78,
		score: 0.91,
	},
	{
		word: "of",
		start: 56.78,
		end: 57.12,
		score: 0.7,
	},
	{
		word: "torque",
		start: 57.12,
		end: 57.42,
		score: 0.99,
	},
	{
		word: "at",
		start: 57.42,
		end: 57.96,
		score: 0.91,
	},
	{
		word: "the",
		start: 57.96,
		end: 58.18,
		score: 0.96,
	},
	{
		word: "wheel.",
		start: 58.18,
		end: 58.74,
		score: 0.82,
	},
	{
		word: "This",
		start: 58.88,
		end: 58.94,
		score: 0.95,
	},
	{
		word: "is",
		start: 58.94,
		end: 59.28,
		score: 0.97,
	},
	{
		word: "all",
		start: 59.28,
		end: 59.5,
		score: 0.99,
	},
	{
		word: "done",
		start: 59.5,
		end: 59.72,
		score: 0.99,
	},
	{
		word: "thanks",
		start: 59.72,
		end: 60.04,
		score: 0.61,
	},
	{
		word: "to",
		start: 60.04,
		end: 60.2,
		score: 0.98,
	},
	{
		word: "a",
		start: 60.2,
		end: 60.3,
		score: 0.8,
	},
	{
		word: "carbon",
		start: 60.3,
		end: 60.62,
		score: 0.9,
	},
	{
		word: "fiber",
		start: 60.62,
		end: 60.92,
		score: 0.66,
	},
	{
		word: "battery",
		start: 60.92,
		end: 61.3,
		score: 0.97,
	},
	{
		word: "pack",
		start: 61.3,
		end: 61.62,
		score: 0.76,
	},
	{
		word: "which",
		start: 61.9,
		end: 62.1,
		score: 0.96,
	},
	{
		word: "operates",
		start: 62.1,
		end: 62.36,
		score: 0.98,
	},
	{
		word: "on",
		start: 62.36,
		end: 62.7,
		score: 0.95,
	},
	{
		word: "a",
		start: 62.7,
		end: 62.88,
		score: 0.97,
	},
	{
		word: "400",
		start: 62.88,
		end: 63.06,
		score: 0.95,
	},
	{
		word: "volt",
		start: 63.06,
		end: 63.5,
		score: 0.52,
	},
	{
		word: "architecture",
		start: 63.5,
		end: 64.02,
		score: 0.97,
	},
	{
		word: "and",
		start: 64.02,
		end: 64.62,
		score: 0.9,
	},
	{
		word: "is",
		start: 64.62,
		end: 64.78,
		score: 0.97,
	},
	{
		word: "liquid",
		start: 64.78,
		end: 65.02,
		score: 0.99,
	},
	{
		word: "cooled",
		start: 65.02,
		end: 65.36,
		score: 0.1,
	},
	{
		word: "as",
		start: 65.36,
		end: 65.58,
		score: 0.97,
	},
	{
		word: "well.",
		start: 65.58,
		end: 65.88,
		score: 0.99,
	},
	{
		word: "The",
		start: 65.96,
		end: 66.08,
		score: 0.94,
	},
	{
		word: "bike",
		start: 66.08,
		end: 66.26,
		score: 0.97,
	},
	{
		word: "can",
		start: 66.26,
		end: 66.46,
		score: 0.99,
	},
	{
		word: "go",
		start: 66.46,
		end: 66.58,
		score: 0.99,
	},
	{
		word: "from",
		start: 66.58,
		end: 66.8,
		score: 0.99,
	},
	{
		word: "0",
		start: 66.8,
		end: 67.04,
		score: 0.69,
	},
	{
		word: "to",
		start: 67.04,
		end: 67.3,
		score: 0.85,
	},
	{
		word: "100",
		start: 67.3,
		end: 67.58,
		score: 0.96,
	},
	{
		word: "kilometers",
		start: 67.58,
		end: 67.94,
		score: 0.47,
	},
	{
		word: "an",
		start: 67.94,
		end: 68.22,
		score: 0.16,
	},
	{
		word: "hour",
		start: 68.22,
		end: 68.54,
		score: 0.98,
	},
	{
		word: "in",
		start: 68.54,
		end: 68.62,
		score: 0.76,
	},
	{
		word: "under",
		start: 68.62,
		end: 68.92,
		score: 0.97,
	},
	{
		word: "3",
		start: 68.92,
		end: 69.24,
		score: 0.6,
	},
	{
		word: "seconds",
		start: 69.24,
		end: 69.7,
		score: 0.98,
	},
	{
		word: "and",
		start: 69.88,
		end: 70.14,
		score: 0.95,
	},
	{
		word: "weighs",
		start: 70.14,
		end: 70.36,
		score: 0.86,
	},
	{
		word: "only",
		start: 70.36,
		end: 70.72,
		score: 0.99,
	},
	{
		word: "180",
		start: 70.72,
		end: 71.52,
		score: 0.94,
	},
	{
		word: "kilos.",
		start: 71.52,
		end: 72.18,
		score: 0.83,
	},
	{
		word: "What",
		start: 72.54,
		end: 72.72,
		score: 0.95,
	},
	{
		word: "do",
		start: 72.72,
		end: 72.9,
		score: 1,
	},
	{
		word: "you",
		start: 72.9,
		end: 72.94,
		score: 0.99,
	},
	{
		word: "think",
		start: 72.94,
		end: 73.16,
		score: 1,
	},
	{
		word: "of",
		start: 73.16,
		end: 73.42,
		score: 0.97,
	},
	{
		word: "India's",
		start: 73.42,
		end: 73.86,
		score: 0.93,
	},
	{
		word: "first",
		start: 73.86,
		end: 74.1,
		score: 0.98,
	},
	{
		word: "ever",
		start: 74.1,
		end: 74.46,
		score: 1,
	},
	{
		word: "superbike?",
		start: 74.46,
		end: 75,
		score: 0.72,
	},
	{
		word: "Comment",
		start: 75.1,
		end: 75.42,
		score: 0.98,
	},
	{
		word: "down",
		start: 75.42,
		end: 75.66,
		score: 0.99,
	},
	{
		word: "below.",
		start: 75.66,
		end: 76.08,
		score: 0.92,
	},
];

export const RemotionRoot = () => {
	// Get input props if available, otherwise use defaults
	let inputProps = {};
	try {
		inputProps = getInputProps();
	} catch (e) {
		// getInputProps might not be available in all contexts
		inputProps = {};
	}

	const words = inputProps.words || defaultWords;
	const captionStyle = inputProps.captionStyle || {
		classNames: "text-yellow-300 text-shadow-lg text-6xl",
		containerStyle: { bottom: "20%", top: "auto" },
	};

	// Calculate the total duration from the words array
	const lastWord = words[words.length - 1];
	const lastEndTime = lastWord.end;
	const durationInSeconds = Math.ceil(lastEndTime + 2); // Add a 2-second buffer
	const fps = 30;
	const durationInFrames = durationInSeconds * fps;

	console.log(
		`🎬 Composition setup - ${words.length} words, ${durationInFrames} frames`
	);

	return (
		<>
			<Composition
				id="VideoWithCaptions"
				component={RemotionVideo}
				durationInFrames={durationInFrames}
				fps={fps}
				width={1080}
				height={1920}
				defaultProps={{
					words,
					// Include captionStyle with provided or default values
					captionStyle,
				}}
			/>
		</>
	);
};

registerRoot(RemotionRoot);
