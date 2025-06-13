import { Fragment } from "react";
import { CheckIcon, MinusIcon } from "@heroicons/react/20/solid";
import Section_Header from "../texts/Section_Header";

const tiers = [
	{
		name: "Hobbyist",
		id: "tier-basic",
		href: "#",
		priceMonthly: "$0",
		description: "Quis suspendisse ut fermentum neque vivamus non tellus.",
		mostPopular: false,
	},
	{
		name: "Pro",
		id: "tier-essential",
		href: "#",
		priceMonthly: "$9",
		description: "Quis eleifend a tincidunt pellentesque. A tempor in sed.",
		mostPopular: false,
	},
	{
		name: "Startup",
		id: "tier-premium",
		href: "#",
		priceMonthly: "$13",
		description:
			"Orci volutpat ut sed sed neque, dui eget. Quis tristique non.",
		mostPopular: false,
	},
];
const sections = [
	{
		name: "Features",
		features: [
			{
				name: "Visually build APIs",
				tiers: { Hobbyist: true, Pro: true, Startup: true },
			},
			{
				name: "Number of Endpoints",
				tiers: {
					Hobbyist: "Up to 7",
					Pro: "50",
					Startup: "Unlimited",
				},
			},
			{
				name: "Automated test runs",
				tiers: {
					Hobbyist: "Monthly",
					Pro: "Weekly",
					Startup: "Daily",
				},
			},
			{
				name: "Export SQL queries",
				tiers: { Hobbyist: false, Pro: true, Startup: true },
			},
			{
				name: "Export CURL requests",
				tiers: { Hobbyist: true, Pro: true, Startup: true },
			},
			{
				name: "AI generated Frontend integrations",
				tiers: {
					Hobbyist: "5 AI calls/month",
					Pro: "Unlimited",
					Startup: "Unlimited",
				},
			},
			{
				name: "Supabase project connections",
				tiers: { Hobbyist: "1", Pro: "3", Startup: "5" },
			},
			{
				name: "Endpoint flow visualiser",
				tiers: { Hobbyist: false, Pro: true, Startup: true },
			},
			{
				name: "Schema visualiser",
				tiers: { Hobbyist: false, Pro: true, Startup: true },
			},
			{
				name: "Invite teammates",
				tiers: {
					Hobbyist: false,
					Pro: "2",
					Startup: "10",
				},
			},
			{
				name: "Role-based access (Admin, Dev, QA)",
				tiers: { Hobbyist: false, Pro: false, Startup: true },
			},
		],
	},
];

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

export default function Pricing() {
	return (
		<div className="bg-matteBlack py-24 sm:py-32">
			<div className="mx-auto max-w-7xl px-8 lg:px-8">
				<Section_Header
					tagline="Pricing"
					// title="Why burn $400/month on infra when $7 gets you all?"
					title={`Stop burning $200 on infra. \n > npm uninstall express`}
					aurora="> npm uninstall express"
					// description="Ditch servers, skip the boilerplate. Build production backends in minutes — not months."
					description="No more server setups or AWS bills. Just build and ship"
					// description="Start your backend journey with $9 and zero config."
				/>

				{/* xs to lg */}
				<div className="mx-auto mt-12 max-w-md space-y-8 sm:mt-16 lg:hidden">
					{tiers.map((tier) => (
						<section
							key={tier.id}
							className={classNames(
								tier.mostPopular
									? "rounded-xl bg-white/5 ring-1 ring-inset ring-white/10"
									: "",
								"p-8"
							)}
						>
							<h3
								id={tier.id}
								className="text-sm font-semibold leading-6 text-white"
							>
								{tier.name}
							</h3>
							<p className="mt-2 flex items-baseline gap-x-1">
								<span className="text-4xl font-bold text-white">
									{tier.priceMonthly}
								</span>
								<span className="text-sm font-semibold text-gray-300">
									/month
								</span>
							</p>
							<a
								href={tier.href}
								aria-describedby={tier.id}
								className={classNames(
									tier.mostPopular
										? "bg-indigo-500 text-white hover:bg-indigo-400 focus-visible:outline-indigo-500"
										: "bg-white/10 text-white hover:bg-white/20 focus-visible:outline-white",
									"mt-8 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-offset-2"
								)}
							>
								Buy plan
							</a>
							<ul
								role="list"
								className="mt-10 space-y-4 text-sm leading-6 text-white"
							>
								{sections.map((section) => (
									<li key={section.name}>
										<ul
											role="list"
											className="space-y-4"
										>
											{section.features.map((feature) =>
												feature.tiers[tier.name] ? (
													<li
														key={feature.name}
														className="flex gap-x-3"
													>
														<CheckIcon
															aria-hidden="true"
															className="h-6 w-5 flex-none text-indigo-400"
														/>
														<span>
															{feature.name}{" "}
															{typeof feature
																.tiers[
																tier.name
															] === "string" ? (
																<span className="text-sm leading-6 text-gray-400">
																	(
																	{
																		feature
																			.tiers[
																			tier
																				.name
																		]
																	}
																	)
																</span>
															) : null}
														</span>
													</li>
												) : null
											)}
										</ul>
									</li>
								))}
							</ul>
						</section>
					))}
				</div>

				{/* laptops and up */}
				<div className="mt-20 hidden lg:block">
					<div className="overflow-hidden rounded-lg border-0 border-white/10">
						<table className="w-full">
							<thead>
								<tr className=" my-6 ">
									<th className="py-4  px-0  text-left text-sm font-semibold text-white">
										<div className=" c text-6xl text-neutral-900/70 select-none" >thincrust</div>
									</th>
									{tiers.map((tier) => (
										<th
											key={tier.id}
											className=" pl-6 text-center text-sm font-semibold text-white "
										>
											<div className="bg-gradient-to-b from-neutral-900 to-neutral-900/50 rounded-xl p-6">
												<div className="mb-0">
													{tier.name}
												</div>
												<div className="text-3xl font-bold mb-0">
													{tier.priceMonthly}
													<span className="text-sm font-normal">
														{""}/ month
													</span>
												</div>
												<button className="w-full mt-6 bg-indigo-500 hover:bg-indigo-600 text-white rounded-md px-4 py-2 text-sm font-semibold">
													Buy plan
												</button>
											</div>
										</th>
									))}
								</tr>
							</thead>
							<tbody className="">
								<tr>
									<td className="invisible">...</td>
								</tr>
							</tbody>
							<tbody>
								{sections[0].features.map((feature, index) => (
									<tr
										key={feature.name}
										className={
											index % 2 === 0
												? "bg-neutral-900/30"
												: " "
										}
									>
										<td
											className={`py-4 px-6 text-sm text-white font-medium ${
												index % 2 === 0
													? "rounded-l-lg"
													: ""
											}`}
										>
											{feature.name}
										</td>
										{tiers.map((tier, tierIndex) => (
											<td
												key={tier.id}
												className={`py-4 px-6 text-center ${
													index % 2 === 0 &&
													tierIndex ===
														tiers.length - 1
														? "rounded-r-lg"
														: ""
												}`}
											>
												{typeof feature.tiers[
													tier.name
												] === "string" ? (
													<span className="text-sm text-gray-300">
														{
															feature.tiers[
																tier.name
															]
														}
													</span>
												) : feature.tiers[tier.name] ===
												  true ? (
													<CheckIcon
														aria-hidden="true"
														className="mx-auto h-5 w-5 text-indigo-400"
													/>
												) : (
													<MinusIcon
														aria-hidden="true"
														className="mx-auto h-5 w-5 text-gray-500"
													/>
												)}
											</td>
										))}
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
}
