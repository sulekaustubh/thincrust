"use client";

import React, { useState, useRef } from "react";
import ProgressBar from "./ProgressBar";
import LanguageSelector, { SUPPORTED_LANGUAGES } from "./LanguageSelector";
import SubtitleStyleSelector from "./SubtitleStyleSelector";
import { SubtitleStyleOptions } from "@/app/utils/ffmpeg";

interface VideoUploadProps {
	onUploadComplete: (videoUrl: string) => void;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB for better safety

const VideoUpload: React.FC<VideoUploadProps> = ({ onUploadComplete }) => {
	const [file, setFile] = useState<File | null>(null);
	const [uploading, setUploading] = useState(false);
	const [progress, setProgress] = useState(0);
	const [status, setStatus] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [language, setLanguage] = useState<string>("english");
	const [subtitleStyles, setSubtitleStyles] = useState<SubtitleStyleOptions>({
		position: "center",
		fontSize: 30,
		fontColor: "white",
		borderWidth: 2.5,
		boxOpacity: 20,
	});
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFile = e.target.files?.[0];
		if (selectedFile) {
			// Check if file is mp4
			if (!selectedFile.type.includes("video/mp4")) {
				setError("Please select an MP4 video file.");
				setFile(null);
				return;
			}

			// Check if file is less than MAX_FILE_SIZE
			if (selectedFile.size > MAX_FILE_SIZE) {
				setError(
					`Please select a video smaller than ${Math.round(
						MAX_FILE_SIZE / 1024 / 1024
					)}MB (approximately 30 seconds).`
				);
				setFile(null);
				return;
			}

			console.log(
				`Selected file: ${selectedFile.name}, size: ${selectedFile.size} bytes`
			);
			setFile(selectedFile);
			setError(null);
		}
	};

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		const droppedFile = e.dataTransfer.files?.[0];
		if (droppedFile) {
			// Check if file is mp4
			if (!droppedFile.type.includes("video/mp4")) {
				setError("Please select an MP4 video file.");
				return;
			}

			// Check if file is less than MAX_FILE_SIZE
			if (droppedFile.size > MAX_FILE_SIZE) {
				setError(
					`Please select a video smaller than ${Math.round(
						MAX_FILE_SIZE / 1024 / 1024
					)}MB (approximately 30 seconds).`
				);
				return;
			}

			console.log(
				`Dropped file: ${droppedFile.name}, size: ${droppedFile.size} bytes`
			);
			setFile(droppedFile);
			setError(null);
		}
	};

	const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
	};

	const handleUpload = async () => {
		if (!file) return;

		try {
			setUploading(true);
			setProgress(0);
			setStatus("Uploading video...");
			setError(null);

			// Create form data with all our settings
			const formData = new FormData();
			formData.append("video", file);
			formData.append("language", language);
			formData.append("subtitleStyles", JSON.stringify(subtitleStyles));

			setProgress(10);
			setStatus(`Processing video with ${language} transcription...`);

			console.log("Sending file to API for processing:", file.name);
			console.log("Using language:", language);
			console.log("Using subtitle styles:", subtitleStyles);

			const response = await fetch("/api/process", {
				method: "POST",
				body: formData,
			});

			// Try to parse the response as JSON, but handle the case where it might not be JSON
			let errorData = null;
			try {
				if (!response.ok) {
					const contentType = response.headers.get("content-type");
					if (
						contentType &&
						contentType.includes("application/json")
					) {
						errorData = await response.json();
						throw new Error(
							errorData.details || "Failed to process video"
						);
					} else {
						const text = await response.text();
						throw new Error(
							`Failed with status ${
								response.status
							}: ${text.substring(0, 100)}...`
						);
					}
				}
			} catch (parseError) {
				console.error("Error parsing response:", parseError);
				if (errorData) {
					throw new Error(
						errorData.details || "Failed to process video"
					);
				} else {
					throw new Error(
						`Server error (${response.status}): Could not process video`
					);
				}
			}

			setProgress(50);
			setStatus(
				`Transcribing audio in ${
					SUPPORTED_LANGUAGES.find((l) => l.code === language)
						?.displayName || language
				}...`
			);

			// Wait for processing to complete
			await new Promise((resolve) => setTimeout(resolve, 1000));

			setProgress(80);
			setStatus("Adding subtitles...");

			// Wait again to simulate processing time
			await new Promise((resolve) => setTimeout(resolve, 1000));

			// Only try to parse JSON if we haven't errored out yet
			let data;
			try {
				data = await response.json();
				console.log("Received successful response:", data);
			} catch (jsonError) {
				console.error("Error parsing JSON response:", jsonError);
				throw new Error("Invalid response from server");
			}

			setProgress(100);
			setStatus("Complete!");

			// Call the callback with the video URL
			if (data.videoUrl) {
				onUploadComplete(data.videoUrl);
			} else {
				throw new Error("No video URL returned");
			}
		} catch (err) {
			console.error("Upload error:", err);
			setError(
				`Error: ${err instanceof Error ? err.message : String(err)}`
			);
			setProgress(0);
		} finally {
			setUploading(false);
		}
	};

	const handleReset = () => {
		setFile(null);
		setError(null);
		setProgress(0);
		setStatus("");
		if (fileInputRef.current) {
			fileInputRef.current.value = "";
		}
	};

	return (
		<div className="w-full max-w-md mx-auto bg-white rounded-lg shadow p-6">
			{/* Language selection */}
			<LanguageSelector
				selectedLanguage={language}
				onLanguageChange={setLanguage}
			/>

			{/* Subtitle style options */}
			<SubtitleStyleSelector
				styles={subtitleStyles}
				onStyleChange={setSubtitleStyles}
			/>

			{/* File upload area */}
			{!file ? (
				<div
					className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 cursor-pointer transition-all"
					onDrop={handleDrop}
					onDragOver={handleDragOver}
					onClick={() => fileInputRef.current?.click()}
				>
					<svg
						className="mx-auto h-12 w-12 text-gray-400"
						stroke="currentColor"
						fill="none"
						viewBox="0 0 48 48"
						aria-hidden="true"
					>
						<path
							d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4h-12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
							strokeWidth={2}
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
					<p className="mt-2 text-sm font-medium text-gray-700">
						Drag and drop your MP4 video here, or click to browse
					</p>
					<p className="mt-1 text-xs text-gray-500">
						MP4 format only, max{" "}
						{Math.round(MAX_FILE_SIZE / 1024 / 1024)}MB (~30s or
						less)
					</p>
					<input
						type="file"
						className="hidden"
						onChange={handleFileChange}
						accept="video/mp4"
						ref={fileInputRef}
					/>
				</div>
			) : (
				<div className="border rounded-lg p-4">
					<div className="flex items-center justify-between mb-2">
						<div className="flex items-center">
							<svg
								className="h-8 w-8 text-blue-500 mr-2"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M7 4v16M17 4v16M3 8h18M3 16h18"
								/>
							</svg>
							<div>
								<p className="text-sm font-medium truncate">
									{file.name}
								</p>
								<p className="text-xs text-gray-500">
									{Math.round(file.size / 1024)} KB
								</p>
							</div>
						</div>
						<button
							onClick={handleReset}
							className="text-red-500 hover:text-red-700"
							disabled={uploading}
						>
							<svg
								className="h-5 w-5"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</button>
					</div>

					{uploading && (
						<ProgressBar
							progress={progress}
							status={status}
						/>
					)}

					{!uploading && (
						<button
							onClick={handleUpload}
							className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
						>
							Process Video
						</button>
					)}
				</div>
			)}

			{error && <div className="mt-3 text-red-500 text-sm">{error}</div>}
		</div>
	);
};

export default VideoUpload;
