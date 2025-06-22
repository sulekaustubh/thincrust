"use client";

import { getFontClass } from "@/lib/fonts";
import { applyElementStyles, getElementText } from "@/lib/utils";
import { ElementProps } from "@/lib/types";

interface HeroV2Props {
	heading?: string;
	subheading?: string;
	ctaLabel?: string;
	headingFont?: string;
	bodyFont?: string;
	backgroundColor?: string;
	textColor?: string;
	features?: string[];
	sectionId?: string;
	elementProps?: Record<string, ElementProps>;
}

export default function HeroV2({
	heading = "The Future of Web Development",
	subheading = "Join thousands of developers who are building faster, smarter, and more efficiently.",
	ctaLabel = "Start Building Now",
	headingFont = "outfit",
	bodyFont = "outfit",
	backgroundColor = "bg-gray-900",
	textColor = "text-white",
	features = ["No Code Required", "Instant Deploy", "Built-in Analytics"],
	sectionId = "",
	elementProps = {},
}: HeroV2Props) {
	const headingFontClass = getFontClass(headingFont);
	const bodyFontClass = getFontClass(bodyFont);

	return (
		<div
			className={`${backgroundColor} py-24 sm:py-32`}
			data-element-path="div:0"
		>
			<div
				className="mx-auto max-w-7xl px-6 lg:px-8"
				data-element-path="div:1"
			>
				<div
					className="mx-auto max-w-2xl text-center"
					data-element-path="div:2"
				>
					<h1
						className={applyElementStyles(
							"h1:0",
							sectionId,
							elementProps,
							`text-4xl font-bold tracking-tight ${headingFontClass} ${textColor} sm:text-6xl`
						)}
						data-element-path="h1:0"
					>
						{getElementText("h1:0", elementProps, heading)}
					</h1>
					<p
						className={applyElementStyles(
							"p:0",
							sectionId,
							elementProps,
							`mt-6 text-lg leading-8 ${bodyFontClass} ${textColor.replace(
								"text-white",
								"text-gray-300"
							)}`
						)}
						data-element-path="p:0"
					>
						{getElementText("p:0", elementProps, subheading)}
					</p>
					<div
						className="mt-10 flex items-center justify-center gap-x-6"
						data-element-path="div:3"
					>
						<button
							className={applyElementStyles(
								"button:0",
								sectionId,
								elementProps,
								"rounded-md bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							)}
							data-element-path="button:0"
						>
							{getElementText("button:0", elementProps, ctaLabel)}
						</button>
					</div>
				</div>

				{/* Features list */}
				<div
					className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl"
					data-element-path="div:4"
				>
					<dl
						className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3 lg:gap-y-16"
						data-element-path="dl:0"
					>
						{features.map((feature, index) => (
							<div
								key={index}
								className="relative pl-16"
								data-element-path={`div:${5 + index}`}
							>
								<dt
									className={applyElementStyles(
										`dt:${index}`,
										sectionId,
										elementProps,
										`text-base font-semibold leading-7 ${textColor} ${headingFontClass}`
									)}
									data-element-path={`dt:${index}`}
								>
									<div
										className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600"
										data-element-path={`div:${
											5 + features.length + index
										}`}
									>
										<div
											className="h-6 w-6 text-white"
											data-element-path={`div:${
												5 + features.length * 2 + index
											}`}
										>
											✓
										</div>
									</div>
									{getElementText(
										`dt:${index}`,
										elementProps,
										feature
									)}
								</dt>
							</div>
						))}
					</dl>
				</div>
			</div>
		</div>
	);
}
