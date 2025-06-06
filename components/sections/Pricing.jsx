"use client";

import { CheckIcon } from "@heroicons/react/20/solid";

const tiers = [
	{
		name: "Free",
		id: "free",
		price: { monthly: "$0", annually: "$0" },
		description: "Perfect for learning and prototyping",
		features: [
			"Up to 3 APIs",
			"10,000 requests/month",
			"Basic database (1GB)",
			"Community support",
			"Basic analytics",
			"Standard security",
		],
		notIncluded: [
			"Custom domains",
			"Team collaboration",
			"Advanced analytics",
			"Priority support",
		],
		cta: "Get started",
		highlighted: false,
	},
	{
		name: "Pro",
		id: "pro",
		price: { monthly: "$29", annually: "$290" },
		description: "For growing teams and production apps",
		features: [
			"Unlimited APIs",
			"1M requests/month",
			"Advanced database (10GB)",
			"Email support",
			"Advanced analytics",
			"Custom domains",
			"Team collaboration (5 users)",
			"Version control",
			"Code export",
			"Rate limiting",
		],
		notIncluded: ["24/7 phone support", "Custom integrations"],
		cta: "Start free trial",
		highlighted: true,
	},
	{
		name: "Enterprise",
		id: "enterprise",
		price: { monthly: "Custom", annually: "Custom" },
		description: "For large teams with advanced needs",
		features: [
			"Everything in Pro",
			"Unlimited requests",
			"Unlimited database storage",
			"24/7 priority support",
			"Custom integrations",
			"SSO & advanced security",
			"Dedicated infrastructure",
			"SLA guarantees",
			"White-label options",
			"Training & onboarding",
		],
		notIncluded: [],
		cta: "Contact sales",
		highlighted: false,
	},
];

export default function Pricing() {
	return (
		<div className="bg-[#0a0a0a] py-24 sm:py-32">
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mx-auto max-w-4xl text-center">
					<h2 className="text-base font-semibold leading-7 text-indigo-400">
						Pricing
					</h2>
					<p className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
						Choose the perfect plan for you
					</p>
				</div>
				<p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-300">
					Start free and scale as you grow. All plans include our
					visual API builder and core features.
				</p>
				<div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 xl:gap-x-12">
					{tiers.map((tier) => (
						<div
							key={tier.id}
							className={`rounded-3xl p-8 xl:p-10 ${
								tier.highlighted
									? "bg-gradient-to-b from-indigo-500/10 to-purple-500/10 ring-2 ring-indigo-500"
									: "bg-gray-900/80 ring-1 ring-gray-700"
							}`}
						>
							<div className="flex items-center justify-between gap-x-4">
								<h3
									id={tier.id}
									className="text-lg font-semibold leading-8 text-white"
								>
									{tier.name}
								</h3>
								{tier.highlighted && (
									<p className="rounded-full bg-indigo-500 px-2.5 py-1 text-xs font-semibold leading-5 text-white">
										Most popular
									</p>
								)}
							</div>
							<p className="mt-4 text-sm leading-6 text-gray-300">
								{tier.description}
							</p>
							<p className="mt-6 flex items-baseline gap-x-1">
								<span className="text-4xl font-bold tracking-tight text-white">
									{tier.price.monthly}
								</span>
								{tier.price.monthly !== "Custom" && (
									<span className="text-sm font-semibold leading-6 text-gray-300">
										/month
									</span>
								)}
							</p>
							<a
								href="#"
								aria-describedby={tier.id}
								className={`mt-6 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
									tier.highlighted
										? "bg-indigo-500 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline-indigo-500"
										: "bg-white/10 text-white hover:bg-white/20 focus-visible:outline-white"
								}`}
							>
								{tier.cta}
							</a>
							<ul
								role="list"
								className="mt-8 space-y-3 text-sm leading-6 text-gray-300"
							>
								{tier.features.map((feature) => (
									<li
										key={feature}
										className="flex gap-x-3"
									>
										<CheckIcon
											aria-hidden="true"
											className="h-6 w-5 flex-none text-indigo-400"
										/>
										{feature}
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
