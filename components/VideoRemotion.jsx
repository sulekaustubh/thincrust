import React, { useState, useEffect } from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
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
	const [isRendering, setIsRendering] = useState(false);
	const [renderProgress, setRenderProgress] = useState(0);
	const [renderJobId, setRenderJobId] = useState(null);
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

	// Handle server-side rendering
	const handleRender = async () => {
		try {
			setIsRendering(true);
			setRenderProgress(0);

			// Call the API to start rendering
			const response = await fetch("/api/render", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					width: videoData.width,
					height: videoData.height,
					fps: fps,
					durationInFrames: durationInFrames,
					format: "mp4",
					captionStyle,
				}),
			});

			const data = await response.json();

			if (data.success) {
				setRenderJobId(data.jobId);

				// Simulate progress updates (in a real app, you'd poll the server for status)
				const interval = setInterval(() => {
					setRenderProgress((prev) => {
						const newProgress = prev + 5;
						if (newProgress >= 100) {
							clearInterval(interval);
							// Simulate a delay before redirecting to the render page
							setTimeout(() => {
								window.location.href = `/render?jobId=${data.jobId}`;
							}, 1000);
							return 100;
						}
						return newProgress;
					});
				}, 300);
			} else {
				throw new Error(data.message || "Rendering failed");
			}
		} catch (error) {
			console.error("Render error:", error);
			alert(`Rendering error: ${error.message}`);
			setIsRendering(false);
		}
	};

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
		<div className="w-full p-4 bg-white rounded-lg shadow-md">
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

			<div className="aspect-[9/16] w-full relative bg-black overflow-hidden mb-4">
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

			{isRendering ? (
				<div className="mt-4">
					<h3 className="text-lg font-semibold mb-2">
						Rendering in progress...
					</h3>
					<div className="w-full bg-gray-200 rounded-full h-4 mb-2">
						<div
							className="bg-blue-600 h-4 rounded-full transition-all duration-300"
							style={{ width: `${renderProgress}%` }}
						/>
					</div>
					<p className="text-center text-sm text-gray-600">
						{renderProgress}% complete
					</p>
				</div>
			) : (
				<div className="flex flex-col gap-4 mt-4">
					<div className="p-4 bg-gray-100 rounded-md">
						<h3 className="font-semibold mb-2">
							CLI Rendering Options
						</h3>

						<div className="mb-4">
							<p className="text-sm font-semibold text-gray-700 mb-1">
								✅ Recommended: Simple Render Script
							</p>
							<pre className="bg-gray-800 text-white p-3 rounded-md text-xs overflow-x-auto">
								{getRenderCommand()}
							</pre>
							<p className="text-xs text-gray-500 mt-1">
								This will generate the video with your selected
								styles and automatically open it when complete.
							</p>
						</div>

						<div className="mb-4">
							<p className="text-sm font-semibold text-gray-700 mb-1">
								Option 2: Using Remotion Studio
							</p>
							<pre className="bg-gray-800 text-white p-3 rounded-md text-xs overflow-x-auto">
								npm run studio
							</pre>
							<p className="text-xs text-gray-500 mt-1">
								Opens the Remotion Studio in browser where you
								can preview and render videos with a UI.
							</p>
						</div>

						<div>
							<p className="text-sm font-semibold text-gray-700 mb-1">
								Option 3: Direct CLI Command
							</p>
							<pre className="bg-gray-800 text-white p-3 rounded-md text-xs overflow-x-auto">
								npm run render
							</pre>
						</div>
					</div>

					<div className="flex justify-end">
						<button
							className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
							onClick={handleRender}
							disabled={isRendering}
						>
							Simulate Web Rendering
						</button>
					</div>
				</div>
			)}
		</div>
	);
}

export default VideoRemotion;
