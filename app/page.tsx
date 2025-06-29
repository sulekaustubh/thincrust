"use client";

import { useState } from "react";
import VideoUpload from "./components/VideoUpload";
import VideoPlayer from "./components/VideoPlayer";

export default function Home() {
	const [videoUrl, setVideoUrl] = useState<string | null>(null);
	const [fileName, setFileName] = useState<string>("");

	const handleUploadComplete = (url: string) => {
		setVideoUrl(url);
		// Extract filename from URL
		const parts = url.split("/");
		setFileName(parts[parts.length - 1]);
	};

	const handleReset = () => {
		setVideoUrl(null);
		setFileName("");
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen py-12 px-4 bg-gray-50">
			<div className="w-full max-w-md space-y-6">
				<div className="text-center">
					<h1 className="text-3xl font-bold text-gray-900">
						Video Subtitler
					</h1>
					<p className="mt-2 text-sm text-gray-600">
						Upload a video, we'll add subtitles using Lemonfox.ai
					</p>
				</div>

				{!videoUrl ? (
					<VideoUpload onUploadComplete={handleUploadComplete} />
				) : (
					<>
						<VideoPlayer
							videoUrl={videoUrl}
							fileName={fileName}
						/>
						<div className="flex justify-center mt-4">
							<button
								onClick={handleReset}
								className="text-blue-600 hover:text-blue-800 font-medium"
							>
								← Process another video
							</button>
						</div>
					</>
				)}

				<div className="text-center text-xs text-gray-500 mt-8">
					<p>Powered by Lemonfox.ai API and ffmpeg</p>
				</div>
			</div>
		</div>
	);
}
