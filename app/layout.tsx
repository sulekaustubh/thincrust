import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "Next.js with Tailwind CSS",
	description: "A clean Next.js project with Tailwind CSS",
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
