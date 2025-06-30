"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function RenderPage() {
	const searchParams = useSearchParams();
	const jobId = searchParams.get("jobId");

	const [status, setStatus] = useState<
		"checking" | "rendering" | "done" | "error"
	>("checking");
	const [videoUrl, setVideoUrl] = useState("");
	const [error, setError] = useState("");
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		if (!jobId) {
			setStatus("error");
			setError("No job ID provided");
			return;
		}

		// Simulate checking job status
		setStatus("rendering");

		// Set up polling for job status
		const checkStatus = async () => {
			try {
				// In a real app, you'd call your API
				// const response = await fetch(`/api/render?jobId=${jobId}`);
				// const data = await response.json();

				// For demo, just simulate progress
				const interval = setInterval(() => {
					setProgress((prev) => {
						if (prev >= 100) {
							clearInterval(interval);
							setStatus("done");
							setVideoUrl(`/api/render/download?jobId=${jobId}`);
							return 100;
						}
						return prev + 5;
					});
				}, 500);

				return () => clearInterval(interval);
			} catch (err) {
				setStatus("error");
				setError(
					err instanceof Error
						? err.message
						: "Failed to check render status"
				);
			}
		};

		checkStatus();
	}, [jobId]);

	return (
		<div className="max-w-4xl mx-auto p-4">
			<div className="flex items-center justify-between mb-8">
				<h1 className="text-3xl font-bold">Render Status</h1>
				<Link
					href="/"
					className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
				>
					Back to Editor
				</Link>
			</div>

			{status === "checking" && (
				<div className="bg-white p-6 rounded-lg shadow-md">
					<p className="text-center">Checking render status...</p>
				</div>
			)}

			{status === "rendering" && (
				<div className="bg-white p-6 rounded-lg shadow-md">
					<h2 className="text-xl font-bold mb-4">
						Rendering in Progress
					</h2>
					<div className="w-full bg-gray-200 rounded-full h-4 mb-2">
						<div
							className="bg-blue-600 h-4 rounded-full transition-all duration-300"
							style={{ width: `${progress}%` }}
						/>
					</div>
					<p className="text-center text-sm text-gray-600">
						{progress}% complete
					</p>
					<p className="mt-4">
						Job ID:{" "}
						<span className="font-mono bg-gray-100 px-2 py-1 rounded">
							{jobId}
						</span>
					</p>
				</div>
			)}

			{status === "done" && (
				<div className="bg-white p-6 rounded-lg shadow-md">
					<h2 className="text-xl font-bold mb-4 text-green-600">
						Rendering Complete!
					</h2>

					<div className="aspect-video w-full bg-black mb-6">
						{/* In a real app, this would be a video preview */}
						<div className="w-full h-full flex items-center justify-center text-white">
							Video Preview (placeholder)
						</div>
					</div>

					<div className="flex flex-col gap-4">
						<a
							href={videoUrl}
							download
							className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-center"
						>
							Download Video
						</a>

						<button
							onClick={() => window.open(videoUrl, "_blank")}
							className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 text-center"
						>
							Open in New Tab
						</button>
					</div>
				</div>
			)}

			{status === "error" && (
				<div className="bg-white p-6 rounded-lg shadow-md">
					<h2 className="text-xl font-bold mb-4 text-red-600">
						Rendering Error
					</h2>
					<p className="mb-4 text-red-500">{error}</p>

					<Link
						href="/"
						className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 inline-block"
					>
						Back to Editor
					</Link>
				</div>
			)}
		</div>
	);
}
