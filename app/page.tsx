"use client";

import dynamic from "next/dynamic";
import AudioExtractor from "@/components/AudioExtractor";
import { words } from "./data/words";

// Import VideoRemotion dynamically with SSR disabled
const VideoRemotion = dynamic(() => import("@/components/VideoRemotion"), {
	ssr: false,
});

export default function Home() {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
			<h1 className="text-3xl font-bold text-blue-600 mb-6">
				ThinCrust Video Generator
			</h1>
			<AudioExtractor />
			<div className="w-full max-w-4xl mt-8">
				<VideoRemotion words={words} />
			</div>
		</div>
	);
}
