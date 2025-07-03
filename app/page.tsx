"use client";

import dynamic from "next/dynamic";
import AudioExtractor from "@/components/AudioExtractor";
import { useState } from "react";
import { useWordsStore } from "@/store/useWordsStore";

// Import VideoRemotion dynamically with SSR disabled
const VideoRemotion = dynamic(() => import("@/components/VideoRemotion"), {
	ssr: false,
});

export default function Home() {
	const { words } = useWordsStore();
	const [isRendering, setIsRendering] = useState(false);
	const [renderStatus, setRenderStatus] = useState("");
	const [renderError, setRenderError] = useState("");

	const handleRenderVideo = async () => {
		setIsRendering(true);
		setRenderStatus("🎬 Rendering video...");
		setRenderError("");

		try {
			const response = await fetch("/api/render", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					outputFile: "my-videok.mp4",
					words: words,
				}),
			});

			const result = await response.json();

			if (result.success) {
				setRenderStatus("✅ Video rendered successfully!");
			} else {
				setRenderError(`❌ Render failed: ${result.error}`);
				setRenderStatus("");
			}
		} catch (error: any) {
			setRenderError(`❌ Network error: ${error.message}`);
			setRenderStatus("");
		} finally {
			setIsRendering(false);
		}
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
			<h1 className="text-3xl font-bold text-blue-600 mb-6">
				ThinCrust Video Generator
			</h1>
			<AudioExtractor />

			{/* Simple Render Button */}
			<div className="w-full max-w-4xl mt-6 p-6 bg-white rounded-lg shadow-md">
				<button
					onClick={handleRenderVideo}
					disabled={isRendering || words.length === 0}
					className={`w-full px-6 py-3 rounded-lg font-medium text-white transition-colors ${
						isRendering || words.length === 0
							? "bg-gray-400 cursor-not-allowed"
							: "bg-blue-600 hover:bg-blue-700"
					}`}
				>
					{isRendering ? "🎬 Rendering Video..." : "🎥 Render Video"}
				</button>

				{renderStatus && (
					<div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
						<p className="text-green-800 text-sm">{renderStatus}</p>
					</div>
				)}

				{renderError && (
					<div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
						<p className="text-red-800 text-sm">{renderError}</p>
					</div>
				)}
			</div>

			<div className="w-full max-w-4xl mt-8">
				<VideoRemotion />
			</div>
		</div>
	);
}
