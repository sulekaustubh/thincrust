"use client";

import { getFontClass } from "@/lib/fonts";
import { applyElementStyles, getElementText } from "@/lib/utils";
import { ElementProps } from "@/lib/types";

interface HeroV1Props {
	heading?: string;
	subheading?: string;
	ctaLabel?: string;
	ctaSecondaryLabel?: string;
	headingFont?: string;
	bodyFont?: string;
	backgroundColor?: string;
	textColor?: string;
	image?: string;
	sectionId?: string;
	elementProps?: Record<string, ElementProps>;
	selectedElementPath?: string;
}

export default function HeroV1({
	heading = "Build Amazing Landing Pages",
	subheading = "Create beautiful, responsive landing pages with our no-code builder. Drag, drop, and customize to your heart's content.",
	ctaLabel = "Get Started",
	ctaSecondaryLabel = "Learn More",
	headingFont = "outfit",
	bodyFont = "outfit",
	backgroundColor = "bg-gradient-to-br from-gray-900 to-black",
	textColor = "text-white",
	image = "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80",
	sectionId = "",
	elementProps = {},
	selectedElementPath,
}: HeroV1Props) {
	const headingFontClass = getFontClass(headingFont);
	const bodyFontClass = getFontClass(bodyFont);

	// Helper function to check if an element is selected
	const isElementSelected = (elementPath: string) => {
		return selectedElementPath === `${sectionId}.${elementPath}`;
	};

	return (
		<div
			className={`relative min-h-screen flex items-center justify-center ${backgroundColor} overflow-hidden`}
			data-element-path="div:0"
		>
			{/* Background Image */}
			<div
				className="absolute inset-0 opacity-20"
				data-element-path="div:1"
			>
				<img
					src={image}
					alt="Hero background"
					className="w-full h-full object-cover"
					data-element-path="img:0"
				/>
			</div>

			{/* Content */}
			<div
				className="relative z-10 max-w-4xl mx-auto text-center px-6 lg:px-8"
				data-element-path="div:2"
			>
				<h1
					className={`${applyElementStyles(
						"h1:0",
						sectionId,
						elementProps,
						`text-4xl md:text-6xl lg:text-7xl font-bold ${headingFontClass} ${textColor} mb-6`
					)} ${isElementSelected("h1:0") ? "selected-element" : ""}`}
					data-element-path="h1:0"
				>
					{getElementText("h1:0", elementProps, heading)}
				</h1>
				<p
					className={`${applyElementStyles(
						"p:0",
						sectionId,
						elementProps,
						`text-lg md:text-xl ${bodyFontClass} ${textColor.replace(
							"text-white",
							"text-gray-300"
						)} mb-8 max-w-2xl mx-auto`
					)} ${isElementSelected("p:0") ? "selected-element" : ""}`}
					data-element-path="p:0"
				>
					{getElementText("p:0", elementProps, subheading)}
				</p>
				<div
					className="flex flex-col sm:flex-row gap-4 justify-center"
					data-element-path="div:3"
				>
					<button
						className={`${applyElementStyles(
							"button:0",
							sectionId,
							elementProps,
							"bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
						)} ${
							isElementSelected("button:0")
								? "selected-element"
								: ""
						}`}
						data-element-path="button:0"
					>
						{getElementText("button:0", elementProps, ctaLabel)}
					</button>
					<button
						className={`${applyElementStyles(
							"button:1",
							sectionId,
							elementProps,
							"border border-gray-300 hover:border-gray-400 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
						)} ${
							isElementSelected("button:1")
								? "selected-element"
								: ""
						}`}
						data-element-path="button:1"
					>
						{getElementText(
							"button:1",
							elementProps,
							ctaSecondaryLabel
						)}
					</button>
				</div>
			</div>
		</div>
	);
}
