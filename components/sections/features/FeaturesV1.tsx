"use client";

import { getFontClass } from "@/lib/fonts";
import { ElementProps } from "@/lib/types";
import { applyElementStyles, getElementText } from "@/lib/utils";

interface Feature {
	title: string;
	description: string;
	icon?: string;
}

interface FeaturesV1Props {
	heading?: string;
	subheading?: string;
	features?: Feature[];
	headingFont?: string;
	bodyFont?: string;
	backgroundColor?: string;
	textColor?: string;
	sectionId?: string;
	elementProps?: Record<string, ElementProps>;
	selectedElementPath?: string | null;
}

export default function FeaturesV1({
	heading = "Why Choose Our Platform",
	subheading = "Discover the features that make us the best choice for your business.",
	features = [
		{
			title: "Lightning Fast",
			description:
				"Built for speed with optimized performance and instant loading.",
			icon: "⚡",
		},
		{
			title: "Secure by Default",
			description:
				"Enterprise-grade security with built-in protection and encryption.",
			icon: "🔒",
		},
		{
			title: "Easy to Use",
			description:
				"Intuitive interface designed for users of all skill levels.",
			icon: "✨",
		},
	],
	headingFont = "outfit",
	bodyFont = "outfit",
	backgroundColor = "bg-white",
	textColor = "text-gray-900",
	sectionId,
	elementProps = {},
	selectedElementPath,
}: FeaturesV1Props) {
	const headingFontClass = getFontClass(headingFont);
	const bodyFontClass = getFontClass(bodyFont);

	return (
		<div className={`${backgroundColor} py-24 sm:py-32`}>
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mx-auto max-w-2xl text-center">
					<h2
						data-element-path="main-heading"
						className={`${applyElementStyles(
							`text-3xl font-bold tracking-tight ${headingFontClass} ${textColor} sm:text-4xl`,
							elementProps["main-heading"]
						)} ${
							selectedElementPath === `${sectionId}.main-heading`
								? "selected-element"
								: ""
						}`}
					>
						{getElementText(heading, elementProps["main-heading"])}
					</h2>
					<p
						data-element-path="subheading"
						className={`${applyElementStyles(
							`mt-4 text-lg leading-8 ${bodyFontClass} ${textColor.replace(
								"text-gray-900",
								"text-gray-600"
							)}`,
							elementProps["subheading"]
						)} ${
							selectedElementPath === `${sectionId}.subheading`
								? "selected-element"
								: ""
						}`}
					>
						{getElementText(subheading, elementProps["subheading"])}
					</p>
				</div>
				<div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
					<dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3 lg:gap-y-16">
						{features.map((feature, index) => (
							<div
								key={index}
								data-element-path={`feature-${index}`}
								className={`${applyElementStyles(
									"relative",
									elementProps[`feature-${index}`]
								)} ${
									selectedElementPath ===
									`${sectionId}.feature-${index}`
										? "selected-element"
										: ""
								}`}
							>
								<dt
									data-element-path={`feature-title-${index}`}
									className={`${applyElementStyles(
										`text-base font-semibold leading-7 ${textColor} ${headingFontClass}`,
										elementProps[`feature-title-${index}`]
									)} ${
										selectedElementPath ===
										`${sectionId}.feature-title-${index}`
											? "selected-element"
											: ""
									}`}
								>
									<div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
										<span
											data-element-path={`feature-icon-${index}`}
											className={`${applyElementStyles(
												"text-white text-xl",
												elementProps[
													`feature-icon-${index}`
												]
											)} ${
												selectedElementPath ===
												`${sectionId}.feature-icon-${index}`
													? "selected-element"
													: ""
											}`}
										>
											{getElementText(
												feature.icon,
												elementProps[
													`feature-icon-${index}`
												]
											)}
										</span>
									</div>
									{getElementText(
										feature.title,
										elementProps[`feature-title-${index}`]
									)}
								</dt>
								<dd
									data-element-path={`feature-desc-${index}`}
									className={`${applyElementStyles(
										`mt-2 text-base leading-7 ${textColor.replace(
											"text-gray-900",
											"text-gray-600"
										)} ${bodyFontClass}`,
										elementProps[`feature-desc-${index}`]
									)} ${
										selectedElementPath ===
										`${sectionId}.feature-desc-${index}`
											? "selected-element"
											: ""
									}`}
								>
									{getElementText(
										feature.description,
										elementProps[`feature-desc-${index}`]
									)}
								</dd>
							</div>
						))}
					</dl>
				</div>
			</div>
		</div>
	);
}
