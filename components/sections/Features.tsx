"use client";

import { AuroraText } from "../magicui/aurora-text";
import * as Icons from "lucide-react";
import Tagline from "../texts/Tagline";

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

export default function Features() {
	return (
		<div className="bg-matteBlack py-24 sm:py-32 relative overflow-hidden">
			{/* Background gradient */}
			<div className="absolute "></div>

			<div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
				<div className="mx-auto max-w-2xl text-center mb-12">
					<Tagline text="Everything you need" />

					<h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
						Dev <AuroraText>workflow</AuroraText> so fast ⚡️
						{/* <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
							never before
						</span> */}
					</h2>
					<h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
						- it feels like cheating
					</h2>
					{/* <p className="mt-6 text-xl leading-8 text-gray-300 max-w-3xl mx-auto">
						ThinCrust provides all the tools you need to create,
						deploy, and manage production-ready APIs without writing
						a single line of code.
					</p> */}
				</div>

				<section className=" bg-[#0f0f0f]">
					<div className=" mx-auto text-white grid grid-cols-2 gap-4">
						<div className="">
							<div className="grid grid-cols-2 auto-rows-[minmax(180px,_1fr)] gap-4">
								{features
									.slice(0, 3)
									.map(
										({
											icon,
											title,
											description,
											className,
										}) => {
											const LucideIcon = Icons[
												icon as keyof typeof Icons
											] as React.ComponentType<any>;

											return (
												<div
													key={title}
													className={`bg-[#141414] rounded-2xl p-6 shadow-sm border border-white/5 hover:border-[#A075F0]/50 transition duration-300 ${className}`}
												>
													<div className="flex space-x-3 ">
														<LucideIcon className="h-6 w-6 text-[#A075F0] mb-4" />
														<h3 className="text-lg font-semibold text-white">
															{title}
														</h3>
													</div>
													{title ===
														"Visual API Builder" && (
														<div className="h-[70%] w-full bg-[#A075F0] mb-4 rounded-lg"></div>
													)}
													<p className="text-sm text-gray-400 mt-1">
														{description}
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
										({
											icon,
											title,
											description,
											className,
										}) => {
											const LucideIcon = Icons[
												icon as keyof typeof Icons
											] as React.ComponentType<any>;

											return (
												<div
													key={title}
													className={`bg-[#141414] rounded-2xl p-6 shadow-sm border border-white/5 hover:border-[#A075F0]/50 transition duration-300 ${className}`}
												>
													<div className="flex space-x-3 ">
														<LucideIcon className="h-6 w-6 text-[#A075F0] mb-4" />
														<h3 className="text-lg font-semibold text-white">
															{title}
														</h3>
													</div>
													{title ===
														"Auto-Scaling APIs" && (
														<div className="h-[70%] w-full bg-[#A075F0] mb-4 rounded-lg"></div>
													)}
													
													<p className="text-sm text-gray-400 mt-1">
														{description}
													</p>
												</div>
											);
										}
									)}
							</div>
						</div>
						{/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[minmax(180px,_1fr)] gap-6">
							{features2.map(
								({ icon, title, description, className }) => {
									const LucideIcon = Icons[
										icon as keyof typeof Icons
									] as React.ComponentType<any>;

									return (
										<div
											key={title}
											className={`bg-[#141414] rounded-2xl p-6 shadow-sm border border-white/5 hover:border-[#A075F0]/50 transition ${className}`}
										>
											<LucideIcon className="h-6 w-6 text-[#A075F0] mb-4" />
											<h3 className="text-lg font-semibold text-white">
												{title}
											</h3>
											<p className="text-sm text-gray-400 mt-1">
												{description}
											</p>
										</div>
									);
								}
							)}
						</div> */}
					</div>
				</section>
			</div>
		</div>
	);
}
