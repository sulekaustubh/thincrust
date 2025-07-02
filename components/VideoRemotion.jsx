import React, { useState, useEffect } from "react";
import { RemotionVideo } from "./RemotionVideo";
import { CaptionStyleControls } from "./CaptionStyleControls";

function VideoRemotion({ words }) {
	const [playing, setPlaying] = useState(false);
	const [durationInFrames, setDurationInFrames] = useState(300);
	const [fps, setFps] = useState(30);
	const [videoData, setVideoData] = useState({
		width: 1080,
		height: 1920,
	});

	const [Player, setPlayer] = useState(null);
	const [captionStyle, setCaptionStyle] = useState({
		classNames:
			"text-yellow-300 text-6xl text-shadow-lg font-bold text-center w-full",
		containerStyle: { bottom: "20%", top: "auto" },
	});

	// Use the words array from props or default to an empty array
	const wordsToUse = words || [];

	// Dynamically import the Player component on the client side
	useEffect(() => {
		import("@remotion/player").then((module) => {
			setPlayer(module.Player);
		});
	}, []);

	// Calculate maximum duration from the words array
	React.useEffect(() => {
		if (wordsToUse.length > 0) {
			const lastWord = wordsToUse[wordsToUse.length - 1];
			const lastEndTime = lastWord.end;
			// Add 2 seconds buffer at the end and convert to frames
			const calculatedDuration = Math.ceil((lastEndTime + 2) * fps);
			setDurationInFrames(calculatedDuration);
		}
	}, [wordsToUse, fps]);

	// Handle caption style change
	const handleCaptionStyleChange = (newStyle) => {
		setCaptionStyle(newStyle);
	};

	// Generate the command with style parameters
	const getRenderCommand = () => {
		const styleParam = encodeURIComponent(captionStyle.classNames);
		return `npm run render:simple my-video.mp4 -- --style="${styleParam}"`;
	};

	return (
		<div className="w-full p-4 bg-emerald-400 rounded-lg shadow-md">
			<h2 className="text-2xl font-bold mb-4">Video Preview</h2>

			<div className="flex flex-col md:flex-row gap-4 mb-4">
				<div className="w-full md:w-1/2">
					<label className="block text-sm font-medium text-gray-700 mb-1">
						Video Width
					</label>
					<input
						type="number"
						value={videoData.width}
						onChange={(e) =>
							setVideoData({
								...videoData,
								width: Number(e.target.value),
							})
						}
						className="w-full p-2 border border-gray-300 rounded-md"
					/>
				</div>
				<div className="w-full md:w-1/2">
					<label className="block text-sm font-medium text-gray-700 mb-1">
						Video Height
					</label>
					<input
						type="number"
						value={videoData.height}
						onChange={(e) =>
							setVideoData({
								...videoData,
								height: Number(e.target.value),
							})
						}
						className="w-full p-2 border border-gray-300 rounded-md"
					/>
				</div>
			</div>

			<div className="flex flex-col md:flex-row gap-4 mb-4">
				<div className="w-full md:w-1/2">
					<label className="block text-sm font-medium text-gray-700 mb-1">
						FPS
					</label>
					<input
						type="number"
						value={fps}
						onChange={(e) => setFps(Number(e.target.value))}
						className="w-full p-2 border border-gray-300 rounded-md"
					/>
				</div>
				<div className="w-full md:w-1/2">
					<label className="block text-sm font-medium text-gray-700 mb-1">
						Duration (frames)
					</label>
					<input
						type="number"
						value={durationInFrames}
						onChange={(e) =>
							setDurationInFrames(Number(e.target.value))
						}
						className="w-full p-2 border border-gray-300 rounded-md"
					/>
				</div>
			</div>

			{/* Caption Style Controls */}
			<CaptionStyleControls onStyleChange={handleCaptionStyleChange} />

			<div className="aspect-video w-full relative bg-blue-400 overflow-hidden mb-4">
				{Player ? (
					<Player
						component={RemotionVideo}
						inputProps={{
							words: wordsToUse,
							captionStyle: captionStyle,
						}}
						durationInFrames={durationInFrames}
						compositionWidth={videoData.width}
						compositionHeight={videoData.height}
						fps={fps}
						style={{
							width: "100%",
							height: "100%",
						}}
						controls
						autoPlay={playing}
						loop
						acknowledgeRemotionLicense={true}
					/>
				) : (
					<div className="w-full h-full flex items-center justify-center text-white">
						Loading player...
					</div>
				)}
			</div>

			{/* <div className="flex flex-col gap-4 mt-4">
				<div className="p-4 bg-gray-100 rounded-md">
					<div className="mb-4">
						<pre className="bg-gray-800 text-white p-3 rounded-md text-xs overflow-x-auto">
							{getRenderCommand()}
						</pre>
					</div>
				</div>
			</div> */}
		</div>
	);
}

export default VideoRemotion;
