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
		name: "Freelancer",
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
				name: "API testing environment",
				tiers: { Hobbyist: true, Freelancer: true, Startup: true },
			},
			{
				name: "Export SQL queries",
				tiers: { Hobbyist: true, Freelancer: true, Startup: true },
			},
			{
				name: "Export CURL requests",
				tiers: { Hobbyist: true, Freelancer: true, Startup: true },
			},
			{
				name: "AI-powered React Fetch export",
				tiers: {
					Hobbyist: "5 AI calls/month",
					Freelancer: "Unlimited",
					Startup: "Unlimited",
				},
			},
			{
				name: "Endpoints",
				tiers: {
					Hobbyist: "Up to 7",
					Freelancer: "Unlimited",
					Startup: "Unlimited",
				},
			},
			{
				name: "Supabase connections",
				tiers: { Hobbyist: "1", Freelancer: "3", Startup: "5" },
			},
			{
				name: "Flow visualisation",
				tiers: { Hobbyist: "1", Freelancer: "Yes", Startup: "Yes" },
			},
			{
				name: "Automated test runs",
				tiers: {
					Hobbyist: "3/month",
					Freelancer: "Unlimited",
					Startup: "Unlimited",
				},
			},
			{
				name: "Schema/endpoint flow visualiser",
				tiers: { Hobbyist: false, Freelancer: true, Startup: true },
			},
			{
				name: "Invite teammates",
				tiers: {
					Hobbyist: false,
					Freelancer: "2 (Developer, QA)",
					Startup: "10",
				},
			},
			{
				name: "Role-based access (Admin, QA, Dev)",
				tiers: { Hobbyist: false, Freelancer: false, Startup: true },
			},
		],
	},
];

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

export default function Pricing() {
	return (
		<div className="bg-matteBlack br py-24 sm:py-32">
			<div className="mx-auto max-w-7xl px-8 lg:px-8">
				<Section_Header
					tagline="Pricing"
					// title="Why burn $400/month on infra when $7 gets you all?"
					title={`Stop burning $200 on infra. \n > npm uninstall express`}
					aurora="> npm uninstall express"
					description="Ditch servers, skip the boilerplate. Build production backends in minutes — not months."
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
				<div className="isolate mt-20 hidden lg:block">
					<div className="relative -mx-8">
						{tiers.some((tier) => tier.mostPopular) ? (
							<div className="absolute inset-x-4 inset-y-0 -z-10 flex">
								<div
									style={{
										marginLeft: `${
											(tiers.findIndex(
												(tier) => tier.mostPopular
											) +
												1) *
											25
										}%`,
									}}
									aria-hidden="true"
									className="flex w-1/4 px-4"
								>
									<div className="w-full rounded-t-xl border-x border-t border-white/10 bg-white/5" />
								</div>
							</div>
						) : null}
						<table className="w-full table-fixed border-separate border-spacing-x-8 text-left">
							<caption className="sr-only">
								Pricing plan comparison
							</caption>
							<colgroup>
								<col className="w-1/4" />
								<col className="w-1/4" />
								<col className="w-1/4" />
								<col className="w-1/4" />
							</colgroup>
							<thead>
								<tr>
									<td />
									{tiers.map((tier) => (
										<th
											key={tier.id}
											scope="col"
											className="px-6 bg-neutral-900 rounded-t-xl pt-6 xl:px-6 xl:pt-6"
										>
											<div className="text-sm font-semibold leading-7 text-white">
												{tier.name}
											</div>
										</th>
									))}
								</tr>
							</thead>
							<tbody>
								<tr>
									<th scope="row">
										<span className="sr-only text-white">
											Price
										</span>
									</th>
									{tiers.map((tier) => (
										<td
											key={tier.id}
											className="px-6 bg-neutral-900 rounded-b-xl pt-2 pb-6 xl:px-6"
										>
											<div className="flex items-baseline gap-x-1 text-white">
												<span className="text-4xl font-bold">
													{tier.priceMonthly}
												</span>
												<span className="text-sm font-semibold leading-6">
													/ month
												</span>
											</div>
											<div
												// href={tier.href}
												className="mt-4 block cursor-pointer bg-indigo-500 text-white rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline-offset-2"
											>
												Buy plan
											</div>
										</td>
									))}
								</tr>
								{sections.map((section, sectionIdx) => (
									<Fragment key={section.name}>
										<tr>
											<th
												scope="colgroup"
												colSpan={4}
												className={classNames(
													sectionIdx === 0
														? "pt-8"
														: "pt-16",
													"pb-4 text-sm font-semibold leading-6 text-white"
												)}
											>
												{section.name}
												<div className="absolute inset-x-8 mt-4 h-px bg-white/10 rounded-t-xl" />
											</th>
										</tr>
										{section.features.map((feature) => (
											<tr key={feature.name}>
												<th
													scope="row"
													className="py-4 text-sm font-normal leading-6 text-white"
												>
													{feature.name}
													<div className="absolute inset-x-8 mt-4 h-px bg-white/5" />
												</th>
												{tiers.map((tier) => (
													<td
														key={tier.id}
														className="px-6 py-4 xl:px-8"
													>
														{typeof feature.tiers[
															tier.name
														] === "string" ? (
															<div className="text-center text-sm leading-6 text-gray-300">
																{
																	feature
																		.tiers[
																		tier
																			.name
																	]
																}
															</div>
														) : (
															<>
																{feature.tiers[
																	tier.name
																] === true ? (
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

																<span className="sr-only">
																	{feature
																		.tiers[
																		tier
																			.name
																	] === true
																		? "Included"
																		: "Not included"}{" "}
																	in{" "}
																	{tier.name}
																</span>
															</>
														)}
													</td>
												))}
											</tr>
										))}
									</Fragment>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
}
