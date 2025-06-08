import type { Metadata } from "next";
import { Geist, Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
	variable: "--font-outfit",
	subsets: ["latin"],
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
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
				className={`${outfit.variable} ${geistMono.variable} antialiased bg-[#111010]`}
			>
				{children}
			</body>
		</html>
	);
}
