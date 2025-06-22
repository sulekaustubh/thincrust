import type { Metadata } from "next";
import {
	Geist,
	Geist_Mono,
	Outfit,
	Playfair_Display,
	Montserrat,
	Roboto,
	Poppins,
	Lora,
} from "next/font/google";
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

const playfair = Playfair_Display({
	variable: "--font-playfair",
	subsets: ["latin"],
	weight: ["400", "500", "600", "700", "800", "900"],
});

const montserrat = Montserrat({
	variable: "--font-montserrat",
	subsets: ["latin"],
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const roboto = Roboto({
	variable: "--font-roboto",
	subsets: ["latin"],
	weight: ["100", "300", "400", "500", "700", "900"],
});

const poppins = Poppins({
	variable: "--font-poppins",
	subsets: ["latin"],
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const lora = Lora({
	variable: "--font-lora",
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
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
				className={`${outfit.variable} ${geistMono.variable} ${playfair.variable} ${montserrat.variable} ${roboto.variable} ${poppins.variable} ${lora.variable} antialiased bg-[#111010]`}
			>
				{children}
			</body>
		</html>
	);
}
