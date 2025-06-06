"use client";

import { ArrowRightIcon } from "@heroicons/react/20/solid";

export default function CTA() {
	return (
		<div className="bg-[#0a0a0a] relative overflow-hidden">
			{/* Background gradient */}
			<div
				aria-hidden="true"
				className="absolute inset-x-0 top-1/2 -z-10 transform-gpu overflow-hidden blur-3xl"
			>
				<div
					style={{
						clipPath:
							"polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
					}}
					className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#0f2362] via-[#5a41dab8] to-[#2e73ff] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
				/>
			</div>

			<div className="py-24 sm:py-32">
				<div className="mx-auto max-w-7xl px-6 lg:px-8">
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
							Ready to build your next API?
						</h2>
						<p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
							Join thousands of developers who are building faster
							with ThinCrust. Start free, no credit card required.
						</p>
						<div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
							<a
								href="/builder/tables"
								className="group relative inline-flex items-center justify-center rounded-md bg-indigo-500 px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-400 transition-all duration-200"
							>
								Start building for free
								<ArrowRightIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
							</a>
							<a
								href="#"
								className="inline-flex items-center justify-center rounded-md bg-white/10 px-8 py-3 text-sm font-semibold text-white hover:bg-white/20 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-white transition-all duration-200"
							>
								View documentation
							</a>
						</div>
						<div className="mt-8 flex items-center justify-center gap-x-6 text-sm text-gray-400">
							<div className="flex items-center gap-x-2">
								<svg
									className="h-5 w-5 text-green-400"
									fill="currentColor"
									viewBox="0 0 20 20"
								>
									<path
										fillRule="evenodd"
										d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
										clipRule="evenodd"
									/>
								</svg>
								No credit card required
							</div>
							<div className="flex items-center gap-x-2">
								<svg
									className="h-5 w-5 text-green-400"
									fill="currentColor"
									viewBox="0 0 20 20"
								>
									<path
										fillRule="evenodd"
										d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
										clipRule="evenodd"
									/>
								</svg>
								Deploy in minutes
							</div>
							<div className="flex items-center gap-x-2">
								<svg
									className="h-5 w-5 text-green-400"
									fill="currentColor"
									viewBox="0 0 20 20"
								>
									<path
										fillRule="evenodd"
										d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
										clipRule="evenodd"
									/>
								</svg>
								Cancel anytime
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
