import React from "react";
import {
	AbsoluteFill,
	useCurrentFrame,
	useVideoConfig,
	Sequence,
	staticFile,
	Video,
} from "remotion";
import { StyledWordGroup } from "./StyledCaption";

// Helper function to group words into clusters of specified size
const groupWords = (words, groupSize = 3) => {
	const groups = [];
	let currentGroup = [];
	let currentStartTime = null;
	let totalScore = 0;

	words.forEach((wordData, index) => {
		// Ensure wordData is an object and has the required properties
		if (!wordData || typeof wordData !== "object" || !wordData.word) {
			console.warn("Invalid word data:", wordData);
			return;
		}

		// Start a new group if this is the first word or if max group size reached
		if (currentGroup.length === 0) {
			currentStartTime = wordData.start;
			totalScore = 0;
		}

		// Explicitly extract only the word text (string)
		const wordText = String(wordData.word).trim();
		currentGroup.push(wordText);
		totalScore += wordData.score || 0;

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
		classNames: "text-yellow-300 text-shadow-lg text-6xl",
		containerStyle: {
			bottom: "20%",
			top: "auto",
		},
	};

	// Use provided style or default
	const { classNames, containerStyle } = captionStyle || defaultCaptionStyle;

	// Use remote video with proper timeout handling
	const videoSrc =
		"https://oueryxgfpeqrrljyggyg.supabase.co/storage/v1/object/public/videos/user_input/F99.mp4";

	return (
		<AbsoluteFill>
			{/* Background video */}
			<Video
				src={videoSrc}
				style={{
					width: "100%",
					height: "100%",
					objectFit: "cover",
				}}
				muted={false}
				// Add timeout and loading properties for better rendering
				preload="metadata"
				playsInline
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
