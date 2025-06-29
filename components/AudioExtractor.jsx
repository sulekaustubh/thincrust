"use client";

import React, { useState, useEffect, useRef } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";

// Cache keys
const FFMPEG_VERSION = "0.12.10";
const WASM_CACHE_KEY = `ffmpeg-wasm-${FFMPEG_VERSION}`;
const JS_CACHE_KEY = `ffmpeg-js-${FFMPEG_VERSION}`;

// Custom caching layer using the browser's cache API
const FFmpegCache = {
	async init() {
		// Only initialize in browser environment
		if (typeof window === "undefined") return false;

		try {
			// Feature detection
			if (!("caches" in window)) {
				console.log("Cache API not supported");
				return false;
			}

			// Create a cache just for FFmpeg files
			const cache = await caches.open("ffmpeg-cache-v1");
			return !!cache;
		} catch (err) {
			console.error("Failed to initialize cache:", err);
			return false;
		}
	},

	async cacheFile(url, type) {
		try {
			if (typeof window === "undefined") return null;
			const cache = await caches.open("ffmpeg-cache-v1");

			// Check if it's already cached
			const match = await cache.match(url);
			if (match) {
				console.log(`Found ${type} in cache`);
				return match;
			}

			// Fetch and cache
			console.log(`Fetching ${type} from CDN`);
			const response = await fetch(url, { cache: "force-cache" });
			const clonedResponse = response.clone();
			await cache.put(url, clonedResponse);
			return response;
		} catch (err) {
			console.error(`Failed to cache ${type}:`, err);
			return null;
		}
	},

	async createBlobUrl(url, type) {
		try {
			const response = await this.cacheFile(url, type);
			if (!response) {
				// Fallback to direct URL if caching fails
				return url;
			}

			const blob = await response.blob();
			return URL.createObjectURL(blob);
		} catch (err) {
			console.error(`Failed to create ${type} blob URL:`, err);
			return url; // Fallback to original URL
		}
	},
};

// FFmpeg config with minimal size
const FFmpegConfig = {
	corePath: `https://unpkg.com/@ffmpeg/core@${FFMPEG_VERSION}/dist/umd/ffmpeg-core.js`,
	wasmPath: `https://unpkg.com/@ffmpeg/core@${FFMPEG_VERSION}/dist/umd/ffmpeg-core.wasm`,
	// Use a smaller pre-built version if available in the future
};

export default function AudioExtractor() {
	const [audioUrl, setAudioUrl] = useState(null);
	const [loading, setLoading] = useState(false);
	const [ffmpeg, setFfmpeg] = useState(null);
	const [loadingStatus, setLoadingStatus] = useState("");
	const [errorMsg, setErrorMsg] = useState("");
	const [loadingProgress, setLoadingProgress] = useState(0);
	const ffmpegRef = useRef(null);
	const isMounted = useRef(true);

	// Initialize FFmpeg with caching
	useEffect(() => {
		// Check if we're in the browser
		if (typeof window === "undefined") return;

		// Set up cleanup
		isMounted.current = true;

		const loadFFmpeg = async () => {
			try {
				// Already loaded in this session
				if (ffmpegRef.current) {
					setFfmpeg(ffmpegRef.current);
					setLoadingStatus("FFmpeg ready");
					setLoadingProgress(100);
					return;
				}

				setLoadingStatus("Preparing audio extraction...");
				setLoadingProgress(5);

				// Initialize the cache
				await FFmpegCache.init();

				// Create a new FFmpeg instance
				const instance = new FFmpeg();

				// Log messages from FFmpeg
				instance.on("log", ({ message }) => {
					console.log("FFmpeg log:", message);
				});

				// Progress indicator
				instance.on("progress", ({ progress }) => {
					if (!isMounted.current) return;
					const percent = Math.floor(progress * 100);
					setLoadingProgress(Math.max(percent, loadingProgress));
					if (percent < 100) {
						setLoadingStatus(
							`Loading audio extraction module: ${percent}%`
						);
					}
				});

				if (!isMounted.current) return;
				setLoadingStatus("Loading audio extraction module...");
				setLoadingProgress(10);

				// Try to get cached files first
				console.log("Attempting to use cached FFmpeg files");
				const coreURL = await FFmpegCache.createBlobUrl(
					FFmpegConfig.corePath,
					"core.js"
				);

				if (!isMounted.current) return;
				setLoadingProgress(30);

				const wasmURL = await FFmpegCache.createBlobUrl(
					FFmpegConfig.wasmPath,
					"core.wasm"
				);

				if (!isMounted.current) return;
				setLoadingProgress(60);

				console.log("Loading FFmpeg...");

				// Load FFmpeg with cached URLs
				await instance.load({
					coreURL,
					wasmURL,
				});

				console.log("FFmpeg loaded successfully");

				if (!isMounted.current) return;
				setLoadingStatus("Ready to extract audio");
				setLoadingProgress(100);

				// Store reference
				ffmpegRef.current = instance;
				setFfmpeg(instance);
			} catch (error) {
				console.error("Failed to load FFmpeg:", error);
				if (isMounted.current) {
					setErrorMsg(
						`Failed to load audio extraction module: ${
							error.message || "Unknown error"
						}`
					);
					setLoadingStatus("");
				}
			}
		};

		// Start loading
		loadFFmpeg();

		// Cleanup function
		return () => {
			isMounted.current = false;
			if (audioUrl) {
				URL.revokeObjectURL(audioUrl);
			}
		};
	}, []);

	const handleFileChange = async (e) => {
		const file = e.target.files?.[0];
		if (!file) return;

		if (!ffmpeg) {
			setErrorMsg(
				"Audio extraction module is not ready yet. Please wait."
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
			console.log("Processing video file");
			const fileData = await fetchFile(file);
			await ffmpeg.writeFile("input.mp4", fileData);

			// Run FFmpeg command to extract audio - optimized for smaller output
			setLoadingStatus("Extracting audio...");
			console.log("Extracting audio track");

			// More efficient command targeting only audio extraction
			await ffmpeg.exec([
				"-i",
				"input.mp4", // Input file
				"-vn", // No video
				"-acodec",
				"libmp3lame", // MP3 codec
				"-ac",
				"2", // 2 channels (stereo)
				"-q:a",
				"4", // Medium quality (0-9, lower is better)
				"-ar",
				"44100", // Sample rate
				"-y", // Overwrite output
				"output.mp3", // Output file
			]);

			// Read the output file
			setLoadingStatus("Finalizing...");
			console.log("Processing extracted audio");
			const data = await ffmpeg.readFile("output.mp3");

			// Create a URL for the output file
			const blob = new Blob([data.buffer], { type: "audio/mpeg" });
			const url = URL.createObjectURL(blob);
			console.log("Audio extraction complete");
			setAudioUrl(url);
			setLoadingStatus("");
		} catch (err) {
			console.error("Audio extraction error:", err);
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

			{(!ffmpeg || loadingProgress < 100) && (
				<div className="mb-4">
					<div className="w-full bg-gray-200 rounded-full h-2.5">
						<div
							className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
							style={{ width: `${loadingProgress}%` }}
						></div>
					</div>
					<p className="text-sm text-gray-600 mt-1">
						{loadingStatus || "Setting up audio extraction..."}
					</p>
					<p className="text-xs text-gray-500 mt-2">
						{loadingProgress < 100
							? "Loading audio extraction module (this will be faster next time)"
							: "Audio extraction module ready"}
					</p>
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
				{loading && loadingStatus && (
					<p className="text-sm text-gray-500 mt-1">
						{loadingStatus}
					</p>
				)}
			</div>

			{loading && (
				<div className="my-4 flex items-center">
					<div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900 mr-2"></div>
					<p>Extracting audio... please wait</p>
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
