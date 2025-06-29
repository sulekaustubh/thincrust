import type { Metadata } from "next";
import "./globals.css";
// Server-only code runs at build time and doesn't affect client-side bundle
import { setupApplication } from "./utils/setup";

// Run setup on server-side only
if (typeof window === "undefined") {
	setupApplication();
}

export const metadata: Metadata = {
	title: "Video Subtitler - Lemonfox.ai",
	description: "Add subtitles to videos using Lemonfox.ai speech-to-text API",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className="antialiased">{children}</body>
		</html>
	);
}
