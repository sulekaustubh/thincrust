"use client";

import React, { useState, useEffect } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";

export default function AudioExtractor() {
	const [audioUrl, setAudioUrl] = useState(null);
	const [loading, setLoading] = useState(false);
	const [ffmpeg, setFfmpeg] = useState(null);
	const [loadingStatus, setLoadingStatus] = useState("");
	const [errorMsg, setErrorMsg] = useState("");

	// Initialize FFmpeg on component mount
	useEffect(() => {
		const loadFFmpeg = async () => {
			try {
				setLoadingStatus("Loading FFmpeg...");
				const ffmpegInstance = new FFmpeg();

				// Log messages from FFmpeg
				ffmpegInstance.on("log", ({ message }) => {
					console.log("FFmpeg log:", message);
				});

				// Load ffmpeg core and WASM
				const baseURL =
					"https://unpkg.com/@ffmpeg/core@0.12.10/dist/umd";

				console.log("Loading FFmpeg WASM...");
				setLoadingStatus("Loading FFmpeg WASM...");

				await ffmpegInstance.load({
					coreURL: await toBlobURL(
						`${baseURL}/ffmpeg-core.js`,
						"text/javascript"
					),
					wasmURL: await toBlobURL(
						`${baseURL}/ffmpeg-core.wasm`,
						"application/wasm"
					),
				});

				console.log("FFmpeg loaded successfully");
				setLoadingStatus("FFmpeg ready");
				setFfmpeg(ffmpegInstance);
			} catch (error) {
				console.error("Failed to load FFmpeg:", error);
				setErrorMsg(`Failed to load FFmpeg: ${error.message}`);
				setLoadingStatus("");
			}
		};

		loadFFmpeg();

		// Cleanup
		return () => {
			if (audioUrl) {
				URL.revokeObjectURL(audioUrl);
			}
		};
	}, []);

	const handleFileChange = async (e) => {
		const file = e.target.files?.[0];
		if (!file) {
			console.log("No file selected");
			return;
		}

		if (!ffmpeg) {
			setErrorMsg(
				"FFmpeg is not loaded yet. Please wait or refresh the page."
			);
			return;
		}

		console.log("Processing file:", file.name);
		setLoading(true);
		setAudioUrl(null);
		setErrorMsg("");
		setLoadingStatus("Starting audio extraction...");

		try {
			// Write input file to memory
			setLoadingStatus("Reading video file...");
			console.log("Writing file to FFmpeg");
			const fileData = await fetchFile(file);
			await ffmpeg.writeFile("input.mp4", fileData);

			// Run FFmpeg command to extract audio
			setLoadingStatus("Extracting audio...");
			console.log("Running FFmpeg command to extract audio");
			await ffmpeg.exec([
				"-i",
				"input.mp4",
				"-q:a",
				"0",
				"-map",
				"a",
				"output.mp3",
			]);

			// Read the output file
			setLoadingStatus("Processing output...");
			console.log("Reading output file");
			const data = await ffmpeg.readFile("output.mp3");

			// Create a URL for the output file
			console.log("Creating blob URL");
			const blob = new Blob([data.buffer], { type: "audio/mpeg" });
			const url = URL.createObjectURL(blob);
			console.log("Audio extraction complete");
			setAudioUrl(url);
			setLoadingStatus("");
		} catch (err) {
			console.error("FFmpeg error:", err);
			setErrorMsg(`Failed to extract audio: ${err.message}`);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="p-5 max-w-md mx-auto">
			<h2 className="text-xl font-bold mb-4">Video to Audio Extractor</h2>

			{errorMsg && (
				<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
					{errorMsg}
				</div>
			)}

			<div className="mb-4">
				<label className="block text-sm font-medium mb-2">
					Upload video file
				</label>
				<input
					type="file"
					accept="video/*"
					onChange={handleFileChange}
					disabled={loading || !ffmpeg}
					className="block w-full text-sm border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none p-2.5"
				/>
				{loadingStatus && (
					<p className="text-sm text-gray-500 mt-1">
						{loadingStatus}
					</p>
				)}
				{!ffmpeg && !errorMsg && (
					<p className="text-sm text-gray-500 mt-1">
						Loading FFmpeg WASM...
					</p>
				)}
			</div>

			{loading && (
				<div className="my-4 flex items-center">
					<div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900 mr-2"></div>
					<p>Processing... please wait</p>
				</div>
			)}

			{audioUrl && (
				<div className="my-4">
					<h3 className="font-medium mb-2">Audio Preview</h3>
					<audio
						controls
						className="w-full mb-3"
					>
						<source
							src={audioUrl}
							type="audio/mpeg"
						/>
						Your browser does not support the audio element.
					</audio>
					<a
						href={audioUrl}
						download="extracted_audio.mp3"
						className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded inline-block"
					>
						Download MP3
					</a>
				</div>
			)}
		</div>
	);
}
