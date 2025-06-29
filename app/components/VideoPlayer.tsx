"use client";

import React from "react";

interface VideoPlayerProps {
	videoUrl: string;
	fileName: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl, fileName }) => {
	return (
		<div className="w-full max-w-md mx-auto bg-white rounded-lg shadow p-6">
			<div className="border rounded-lg p-4">
				<video
					controls
					className="w-full rounded shadow-sm"
					src={videoUrl}
					autoPlay={false}
				>
					Your browser does not support the video tag.
				</video>

				<div className="mt-4 flex justify-center">
					<a
						href={videoUrl}
						download={fileName}
						className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 flex items-center"
					>
						<svg
							className="h-5 w-5 mr-2"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
							/>
						</svg>
						Download Video
					</a>
				</div>
			</div>
		</div>
	);
};

export default VideoPlayer;
