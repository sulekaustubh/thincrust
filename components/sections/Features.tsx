"use client";

import * as Icons from "lucide-react";
import Section_Header from "../texts/Section_Header";
import { ElementProps } from "@/lib/types";
import { applyElementStyles, getElementText } from "@/lib/utils";

const features = [
	{
		icon: "Wand2",
		title: "Visual API Builder",
		description:
			"Design powerful APIs with our drag-and-drop interface. No code, no hassle—connect your data and define logic visually.",
		className: "col-span-2 row-span-2", // wide tile
	},
	{
		icon: "Zap",
		title: "Deploy Instantly",
		description:
			"Push changes live in seconds using our global edge network. No redeploys, no wait time.",
		className: "col-span-1 row-span-1",
	},
	{
		icon: "BarChart2",
		title: "Live Analytics",
		description:
			"Monitor your API usage, performance, and logs in real time with detailed visual insights.",
		className: "col-span-1 row-span-1",
	},
	{
		icon: "Database",
		title: "Schema Designer",
		description:
			"Create, edit, and manage your database schema with a visual editor.",
		className: "col-span-1 row-span-1",
	},
	{
		icon: "ShieldCheck",
		title: "Built-in Auth & Security",
		description:
			"Secure your endpoints with built-in authentication, access rules, and encryption.",
		className: "col-span-1 row-span-1",
	},
	{
		icon: "TrendingUp",
		title: "Auto-Scaling APIs",
		description:
			"Traffic spikes? No problem. Your APIs scale automatically to handle demand without lifting a finger. Full Supabase support out of the box. Full Supabase support.",
		className: "col-span-2 row-span-2", // wide tile
	},
];

interface FeaturesProps {
	sectionId?: string;
	elementProps?: Record<string, ElementProps>;
	selectedElementPath?: string | null;
}

export default function Features({
	sectionId,
	elementProps = {},
	selectedElementPath,
}: FeaturesProps) {
	return (
		<div className="bg-matteBlack py-24 sm:py-32 relative overflow-hidden">
			{/* Background gradient */}
			<div className="absolute "></div>

			<div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
				<Section_Header
					tagline="Everything you need"
					title={`Dev workflow so fast⚡️ \n - it feels like cheating`}
					aurora="workflow"
				/>

				<section className=" mt-12 bg-[#0f0f0f]">
					<div className=" mx-auto text-white grid grid-cols-2 gap-4">
						<div className="">
							<div className="grid grid-cols-2 auto-rows-[minmax(180px,_1fr)] gap-4">
								{features
									.slice(0, 3)
									.map(
										(
											{
												icon,
												title,
												description,
												className,
											},
											index
										) => {
											const LucideIcon = Icons[
												icon as keyof typeof Icons
											] as React.ComponentType<
												Record<string, unknown>
											>;

											const elementPath = `feature-${index}`;
											const isSelected =
												selectedElementPath ===
												`${sectionId}.${elementPath}`;

											return (
												<div
													key={title}
													data-element-path={
														elementPath
													}
													className={`${applyElementStyles(
														`bg-[#141414] rounded-2xl p-6 shadow-sm border border-white/5 hover:border-[#A075F0]/50 transition duration-300 ${className}`,
														elementProps[
															elementPath
														]
													)} ${
														isSelected
															? "selected-element"
															: ""
													}`}
												>
													<div className="flex space-x-3 ">
														<LucideIcon className="h-6 w-6 text-[#A075F0] mb-4" />
														<h3
															data-element-path={`feature-title-${index}`}
															className={`${applyElementStyles(
																"text-lg font-semibold text-white",
																elementProps[
																	`feature-title-${index}`
																]
															)} ${
																selectedElementPath ===
																`${sectionId}.feature-title-${index}`
																	? "selected-element"
																	: ""
															}`}
														>
															{getElementText(
																title,
																elementProps[
																	`feature-title-${index}`
																]
															)}
														</h3>
													</div>
													{title ===
														"Visual API Builder" && (
														<div className="h-[70%] w-full bg-neutral-900 mb-4 rounded-lg"></div>
													)}
													<p
														data-element-path={`feature-desc-${index}`}
														className={`${applyElementStyles(
															"text-sm text-gray-400 mt-1",
															elementProps[
																`feature-desc-${index}`
															]
														)} ${
															selectedElementPath ===
															`${sectionId}.feature-desc-${index}`
																? "selected-element"
																: ""
														}`}
													>
														{getElementText(
															description,
															elementProps[
																`feature-desc-${index}`
															]
														)}
													</p>
												</div>
											);
										}
									)}
							</div>
						</div>
						<div className="">
							<div className="grid grid-cols-2 auto-rows-[minmax(180px,_1fr)] gap-4">
								{features
									.slice(-3)
									.map(
										(
											{
												icon,
												title,
												description,
												className,
											},
											index
										) => {
											const LucideIcon = Icons[
												icon as keyof typeof Icons
											] as React.ComponentType<
												Record<string, unknown>
											>;

											const featureIndex = index + 3; // Offset for second group
											const elementPath = `feature-${featureIndex}`;
											const isSelected =
												selectedElementPath ===
												`${sectionId}.${elementPath}`;

											return (
												<div
													key={title}
													data-element-path={
														elementPath
													}
													className={`${applyElementStyles(
														`bg-[#141414] rounded-2xl p-6 shadow-sm border border-white/5 hover:border-[#A075F0]/50 transition duration-300 ${className}`,
														elementProps[
															elementPath
														]
													)} ${
														isSelected
															? "selected-element"
															: ""
													}`}
												>
													<div className="flex space-x-3 ">
														<LucideIcon className="h-6 w-6 text-[#A075F0] mb-4" />
														<h3
															data-element-path={`feature-title-${featureIndex}`}
															className={`${applyElementStyles(
																"text-lg font-semibold text-white",
																elementProps[
																	`feature-title-${featureIndex}`
																]
															)} ${
																selectedElementPath ===
																`${sectionId}.feature-title-${featureIndex}`
																	? "selected-element"
																	: ""
															}`}
														>
															{getElementText(
																title,
																elementProps[
																	`feature-title-${featureIndex}`
																]
															)}
														</h3>
													</div>
													{title ===
														"Auto-Scaling APIs" && (
														<div className="h-[70%] w-full bg-neutral-900 mb-4 rounded-lg"></div>
													)}

													<p
														data-element-path={`feature-desc-${featureIndex}`}
														className={`${applyElementStyles(
															"text-sm text-gray-400 mt-1",
															elementProps[
																`feature-desc-${featureIndex}`
															]
														)} ${
															selectedElementPath ===
															`${sectionId}.feature-desc-${featureIndex}`
																? "selected-element"
																: ""
														}`}
													>
														{getElementText(
															description,
															elementProps[
																`feature-desc-${featureIndex}`
															]
														)}
													</p>
												</div>
											);
										}
									)}
							</div>
						</div>
					</div>
				</section>
			</div>
		</div>
	);
}
