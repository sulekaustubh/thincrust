import React from "react";
import { Composition, registerRoot } from "remotion";
import { RemotionVideo } from "./RemotionVideo";
import { words } from "../app/data/words";

export const RemotionRoot = () => {
	// Calculate the total duration from the words array
	const lastWord = words[words.length - 1];
	const lastEndTime = lastWord.end;
	const durationInSeconds = Math.ceil(lastEndTime + 2); // Add a 2-second buffer
	const fps = 30;
	const durationInFrames = durationInSeconds * fps;

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
					// Include captionStyle with default values
					captionStyle: {
						classNames: "text-yellow-300 text-shadow-lg text-6xl",
						containerStyle: { bottom: "20%", top: "auto" },
					},
				}}
			/>
		</>
	);
};

registerRoot(RemotionRoot);
