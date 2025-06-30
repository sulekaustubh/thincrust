import React from "react";
import {
	AbsoluteFill,
	useCurrentFrame,
	useVideoConfig,
	Sequence,
} from "remotion";
import { StyledWordGroup } from "./StyledCaption";

// Helper function to group words into clusters of specified size
const groupWords = (words, groupSize = 3) => {
	const groups = [];
	let currentGroup = [];
	let currentStartTime = null;
	let totalScore = 0;

	words.forEach((wordData, index) => {
		// Start a new group if this is the first word or if max group size reached
		if (currentGroup.length === 0) {
			currentStartTime = wordData.start;
			totalScore = 0;
		}

		currentGroup.push(wordData.word);
		totalScore += wordData.score;

		// Complete the group if we've reached the desired size or it's the last word
		if (currentGroup.length === groupSize || index === words.length - 1) {
			groups.push({
				words: [...currentGroup],
				startTime: currentStartTime,
				endTime: wordData.end,
				avgScore: totalScore / currentGroup.length,
			});

			currentGroup = [];
		}
	});

	return groups;
};

// Main component that displays groups of words in the transcription
export const RemotionVideo = (props) => {
	const { words = [], captionStyle = null } = props;
	const { fps, durationInFrames, width, height } = useVideoConfig();

	// Group words into clusters of 3-4 for better readability
	const wordGroups = groupWords(words, 3);

	// Default caption style if none is provided
	const defaultCaptionStyle = {
		classNames: "text-blue-300 text-shadow-lg text-6xl",
		containerStyle: {
			bottom: "20%",
			top: "auto",
		},
	};

	// Use provided style or default
	const { classNames, containerStyle } = captionStyle || defaultCaptionStyle;

	return (
		<AbsoluteFill style={{ backgroundColor: "red" }}>
			{/* Background element */}
			<div
				style={{
					position: "absolute",
					top: 0,
					left: 0,
					width: "100%",
					height: "100%",
					background:
						"linear-gradient(180deg, #111111 0%, #000000 100%)",
				}}
			/>

			{/* Words container */}
			<div
				style={{
					position: "absolute",
					width: "100%",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					textAlign: "center",
					...containerStyle,
				}}
			>
				{wordGroups.map((group, index) => {
					const {
						words: groupWords,
						startTime,
						endTime,
						avgScore,
					} = group;
					const startFrame = Math.floor(startTime * fps);
					const endFrame = Math.ceil(endTime * fps);

					// Make sure we have at least 5 frames of duration for readability
					const duration = Math.max(5, endFrame - startFrame);

					return (
						<Sequence
							key={`group-${index}`}
							from={startFrame}
							durationInFrames={duration}
						>
							<StyledWordGroup
								words={groupWords}
								startTime={startTime}
								endTime={endTime}
								avgScore={avgScore}
								classNames={classNames}
							/>
						</Sequence>
					);
				})}
			</div>
		</AbsoluteFill>
	);
};
