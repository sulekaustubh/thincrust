"use client";

import {
	CircleStackIcon,
	CogIcon,
	BoltIcon,
	ShieldCheckIcon,
	CloudIcon,
	ChartBarIcon,
	CodeBracketIcon,
	ArrowPathIcon,
} from "@heroicons/react/24/outline";

const features = [
	{
		name: "Visual API Builder",
		description:
			"Create powerful APIs with our drag-and-drop interface. No coding required - just connect your data sources and define your logic visually.",
		icon: CogIcon,
		size: "large",
		highlight: true,
	},
	{
		name: "Database Management",
		description:
			"Design and manage your database schemas with ease. Create tables, define relationships, and handle migrations automatically.",
		icon: CircleStackIcon,
		size: "medium",
	},
	{
		name: "Lightning Fast Deployment",
		description:
			"Deploy your APIs instantly to our global edge network. Changes are live in seconds, not hours.",
		icon: BoltIcon,
		size: "medium",
		highlight: true,
	},
	{
		name: "Enterprise Security",
		description:
			"Built-in authentication, rate limiting, and encryption. Your APIs are secure by default with enterprise-grade protection.",
		icon: ShieldCheckIcon,
		size: "small",
	},
	{
		name: "Auto-Scaling Infrastructure",
		description:
			"Never worry about server management. Our platform automatically scales based on your traffic and usage patterns.",
		icon: CloudIcon,
		size: "medium",
	},
	{
		name: "Real-time Analytics",
		description:
			"Monitor your API performance with detailed analytics, error tracking, and usage insights in real-time.",
		icon: ChartBarIcon,
		size: "large",
		visual: true,
	},
	{
		name: "Code Export",
		description:
			"Need to migrate? Export your API configurations as clean, production-ready code in multiple frameworks.",
		icon: CodeBracketIcon,
		size: "small",
	},
	{
		name: "Version Control",
		description:
			"Track changes, rollback deployments, and manage multiple environments with built-in version control.",
		icon: ArrowPathIcon,
		size: "small",
	},
];

export default function Features() {
	return (
		<div className="bg-contentPrimary py-24 sm:py-32 relative overflow-hidden">
			{/* Background gradient */}
			<div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-transparent to-purple-900/20"></div>

			<div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
				<div className="mx-auto max-w-2xl text-center mb-16">
					<div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-6">
						<span className="text-sm font-medium text-indigo-400">
							Everything you need
						</span>
					</div>
					<h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
						Build APIs like{" "}
						<span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
							never before
						</span>
					</h2>
					<p className="mt-6 text-xl leading-8 text-gray-300 max-w-3xl mx-auto">
						ThinCrust provides all the tools you need to create,
						deploy, and manage production-ready APIs without writing
						a single line of code.
					</p>
				</div>

				{/* Bento Grid */}
				<div className="grid grid-cols-12 gap-6 auto-rows-[200px]">
					{/* Visual API Builder - Large card */}
					<div className="col-span-12 md:col-span-8 lg:col-span-6 row-span-2 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 rounded-2xl p-8 border border-indigo-500/20 relative overflow-hidden group hover:border-indigo-400/40 transition-all duration-300">
						<div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
						<div className="relative z-10">
							<div className="flex items-center gap-4 mb-6">
								<div className="p-3 rounded-xl bg-indigo-500/20 border border-indigo-400/30">
									<CogIcon className="h-8 w-8 text-indigo-300" />
								</div>
								<h3 className="text-2xl font-bold text-white">
									Visual API Builder
								</h3>
							</div>
							<p className="text-gray-300 text-lg leading-relaxed mb-6">
								Create powerful APIs with our drag-and-drop
								interface. No coding required - just connect
								your data sources and define your logic
								visually.
							</p>
							{/* Placeholder for visual element */}
							<div className="w-full h-20 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-lg border border-indigo-400/20 flex items-center justify-center">
								<span className="text-indigo-300 text-sm">
									Visual Builder Preview
								</span>
							</div>
						</div>
					</div>

					{/* Lightning Fast Deployment */}
					<div className="col-span-12 md:col-span-4 lg:col-span-3 row-span-2 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 rounded-2xl p-6 border border-indigo-500/20 relative overflow-hidden group hover:border-indigo-400/40 transition-all duration-300">
						<div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
						<div className="relative z-10 h-full flex flex-col">
							<div className="p-3 rounded-xl bg-indigo-500/20 border border-indigo-400/30 w-fit mb-4">
								<BoltIcon className="h-6 w-6 text-indigo-300" />
							</div>
							<h3 className="text-xl font-bold text-white mb-3">
								Lightning Fast Deployment
							</h3>
							<p className="text-gray-300 text-sm leading-relaxed flex-1">
								Deploy your APIs instantly to our global edge
								network. Changes are live in seconds.
							</p>
							{/* Speed indicator placeholder */}
							<div className="mt-4 p-4 bg-indigo-500/10 rounded-lg border border-indigo-400/20">
								<div className="flex items-center justify-center">
									<div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 flex items-center justify-center">
										<span className="text-white font-bold">
											⚡
										</span>
									</div>
								</div>
								<p className="text-center text-indigo-300 text-xs mt-2">
									Sub-second deployment
								</p>
							</div>
						</div>
					</div>

					{/* Real-time Analytics - Large visual card */}
					<div className="col-span-12 lg:col-span-3 row-span-2 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-6 border border-gray-700/50 relative overflow-hidden group hover:border-indigo-500/40 transition-all duration-300">
						<div className="relative z-10 h-full flex flex-col">
							<div className="p-3 rounded-xl bg-indigo-500/20 border border-indigo-400/30 w-fit mb-4">
								<ChartBarIcon className="h-6 w-6 text-indigo-300" />
							</div>
							<h3 className="text-xl font-bold text-white mb-3">
								Real-time Analytics
							</h3>
							<p className="text-gray-300 text-sm leading-relaxed mb-4">
								Monitor performance with detailed analytics and
								insights.
							</p>
							{/* Analytics chart placeholder */}
							<div className="flex-1 bg-gray-800/50 rounded-lg border border-gray-600/30 p-4 flex flex-col justify-end">
								<div className="flex items-end gap-2 h-16">
									<div className="w-4 bg-indigo-500 rounded-t-sm h-8"></div>
									<div className="w-4 bg-indigo-400 rounded-t-sm h-12"></div>
									<div className="w-4 bg-purple-400 rounded-t-sm h-6"></div>
									<div className="w-4 bg-indigo-400 rounded-t-sm h-16"></div>
									<div className="w-4 bg-indigo-500 rounded-t-sm h-10"></div>
								</div>
								<p className="text-xs text-gray-400 mt-2">
									API Performance
								</p>
							</div>
						</div>
					</div>

					{/* Database Management */}
					<div className="col-span-6 md:col-span-4 lg:col-span-4 bg-gray-800/30 rounded-2xl p-6 border border-gray-700/50 relative overflow-hidden group hover:border-indigo-500/40 transition-all duration-300">
						<div className="flex items-start gap-4">
							<div className="p-2 rounded-lg bg-indigo-500/20 border border-indigo-400/30">
								<CircleStackIcon className="h-5 w-5 text-indigo-300" />
							</div>
							<div>
								<h3 className="text-lg font-bold text-white mb-2">
									Database Management
								</h3>
								<p className="text-gray-300 text-sm">
									Design and manage schemas with ease.
								</p>
							</div>
						</div>
					</div>

					{/* Enterprise Security */}
					<div className="col-span-6 md:col-span-4 lg:col-span-4 bg-gray-800/30 rounded-2xl p-6 border border-gray-700/50 relative overflow-hidden group hover:border-indigo-500/40 transition-all duration-300">
						<div className="flex items-start gap-4">
							<div className="p-2 rounded-lg bg-green-500/20 border border-green-400/30">
								<ShieldCheckIcon className="h-5 w-5 text-green-300" />
							</div>
							<div>
								<h3 className="text-lg font-bold text-white mb-2">
									Enterprise Security
								</h3>
								<p className="text-gray-300 text-sm">
									Built-in authentication and encryption.
								</p>
							</div>
						</div>
					</div>

					{/* Auto-Scaling Infrastructure */}
					<div className="col-span-6 md:col-span-4 lg:col-span-4 bg-gray-800/30 rounded-2xl p-6 border border-gray-700/50 relative overflow-hidden group hover:border-indigo-500/40 transition-all duration-300">
						<div className="flex items-start gap-4">
							<div className="p-2 rounded-lg bg-blue-500/20 border border-blue-400/30">
								<CloudIcon className="h-5 w-5 text-blue-300" />
							</div>
							<div>
								<h3 className="text-lg font-bold text-white mb-2">
									Auto-Scaling
								</h3>
								<p className="text-gray-300 text-sm">
									Automatic scaling based on traffic.
								</p>
							</div>
						</div>
					</div>

					{/* Code Export */}
					<div className="col-span-6 md:col-span-4 lg:col-span-4 bg-gray-800/30 rounded-2xl p-6 border border-gray-700/50 relative overflow-hidden group hover:border-indigo-500/40 transition-all duration-300">
						<div className="flex items-start gap-4">
							<div className="p-2 rounded-lg bg-orange-500/20 border border-orange-400/30">
								<CodeBracketIcon className="h-5 w-5 text-orange-300" />
							</div>
							<div>
								<h3 className="text-lg font-bold text-white mb-2">
									Code Export
								</h3>
								<p className="text-gray-300 text-sm">
									Export as production-ready code.
								</p>
							</div>
						</div>
					</div>

					{/* Version Control */}
					<div className="col-span-6 md:col-span-4 lg:col-span-4 bg-gray-800/30 rounded-2xl p-6 border border-gray-700/50 relative overflow-hidden group hover:border-indigo-500/40 transition-all duration-300">
						<div className="flex items-start gap-4">
							<div className="p-2 rounded-lg bg-teal-500/20 border border-teal-400/30">
								<ArrowPathIcon className="h-5 w-5 text-teal-300" />
							</div>
							<div>
								<h3 className="text-lg font-bold text-white mb-2">
									Version Control
								</h3>
								<p className="text-gray-300 text-sm">
									Track changes and manage environments.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
