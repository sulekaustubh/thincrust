import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "thincrust.io | Build APIs without the complexity",
	description:
		"Create production-ready RESTful endpoints in minutes with our no-code API builder. No infrastructure to manage, no backend code to write.",
	icons: {
		icon: "/thincrust-logo.svg",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#060818]`}
			>
				{children}
			</body>
		</html>
	);
}
