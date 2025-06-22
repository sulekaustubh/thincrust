"use client";

import { CheckIcon } from "@heroicons/react/20/solid";
import { applyElementStyles, getElementText } from "@/lib/utils";

const tiers = [
	{
		name: "Hobby",
		id: "tier-hobby",
		href: "#",
		priceMonthly: "$9",
		description: "Perfect for side projects and MVPs",
		features: [
			"Up to 5 APIs",
			"10K requests/month",
			"Basic templates",
			"Community support",
		],
		featured: false,
	},
	{
		name: "Pro",
		id: "tier-pro",
		href: "#",
		priceMonthly: "$29",
		description: "Built for growing startups",
		features: [
			"Unlimited APIs",
			"100K requests/month",
			"Custom templates",
			"Priority support",
			"Advanced analytics",
			"Team collaboration",
		],
		featured: true,
	},
	{
		name: "Enterprise",
		id: "tier-enterprise",
		href: "#",
		priceMonthly: "$99",
		description: "For high-scale applications",
		features: [
			"Unlimited everything",
			"10M+ requests/month",
			"White-label options",
			"24/7 dedicated support",
			"Custom integrations",
			"SLA guarantee",
		],
		featured: false,
	},
];

export default function Pricing({
	sectionId,
	elementProps = {},
	selectedElementPath,
}) {
	return (
		<div className="bg-gray-900 py-24 sm:py-32">
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mx-auto max-w-4xl text-center">
					<h2
						data-element-path="tagline"
						className={`${applyElementStyles(
							"text-base font-semibold leading-7 text-indigo-400",
							elementProps["tagline"]
						)} ${
							selectedElementPath === `${sectionId}.tagline`
								? "selected-element"
								: ""
						}`}
					>
						{getElementText("Pricing", elementProps["tagline"])}
					</h2>
					<p
						data-element-path="main-heading"
						className={`${applyElementStyles(
							"mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl",
							elementProps["main-heading"]
						)} ${
							selectedElementPath === `${sectionId}.main-heading`
								? "selected-element"
								: ""
						}`}
					>
						{getElementText(
							"Choose the right plan for&nbsp;you",
							elementProps["main-heading"]
						)}
					</p>
				</div>
				<p
					data-element-path="description"
					className={`${applyElementStyles(
						"mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-300",
						elementProps["description"]
					)} ${
						selectedElementPath === `${sectionId}.description`
							? "selected-element"
							: ""
					}`}
				>
					{getElementText(
						"Choose an affordable plan that's packed with the best features for engaging your audience, creating customer loyalty, and driving sales.",
						elementProps["description"]
					)}
				</p>
				<div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 xl:gap-x-12">
					{tiers.map((tier, index) => (
						<div
							key={tier.id}
							data-element-path={`tier-${index}`}
							className={`${applyElementStyles(
								tier.featured
									? "lg:z-10 lg:rounded-b-none"
									: "lg:mt-8",
								elementProps[`tier-${index}`]
							)} ${
								selectedElementPath ===
								`${sectionId}.tier-${index}`
									? "selected-element"
									: ""
							} rounded-3xl bg-white p-8 ring-1 ring-gray-200 xl:p-10 lg:rounded-t-none`}
						>
							<div className="flex items-center justify-between gap-x-4">
								<h3
									data-element-path={`tier-name-${index}`}
									className={`${applyElementStyles(
										tier.featured
											? "text-indigo-600"
											: "text-gray-900",
										elementProps[`tier-name-${index}`]
									)} ${
										selectedElementPath ===
										`${sectionId}.tier-name-${index}`
											? "selected-element"
											: ""
									} text-lg font-semibold leading-8`}
								>
									{getElementText(
										tier.name,
										elementProps[`tier-name-${index}`]
									)}
								</h3>
								{tier.featured ? (
									<p
										data-element-path={`tier-badge-${index}`}
										className={`${applyElementStyles(
											"rounded-full bg-indigo-600/10 px-2.5 py-1 text-xs font-semibold leading-5 text-indigo-600",
											elementProps[`tier-badge-${index}`]
										)} ${
											selectedElementPath ===
											`${sectionId}.tier-badge-${index}`
												? "selected-element"
												: ""
										}`}
									>
										{getElementText(
											"Most popular",
											elementProps[`tier-badge-${index}`]
										)}
									</p>
								) : null}
							</div>
							<p
								data-element-path={`tier-desc-${index}`}
								className={`${applyElementStyles(
									"mt-4 text-sm leading-6 text-gray-600",
									elementProps[`tier-desc-${index}`]
								)} ${
									selectedElementPath ===
									`${sectionId}.tier-desc-${index}`
										? "selected-element"
										: ""
								}`}
							>
								{getElementText(
									tier.description,
									elementProps[`tier-desc-${index}`]
								)}
							</p>
							<p className="mt-6 flex items-baseline gap-x-1">
								<span
									data-element-path={`tier-price-${index}`}
									className={`${applyElementStyles(
										"text-4xl font-bold tracking-tight text-gray-900",
										elementProps[`tier-price-${index}`]
									)} ${
										selectedElementPath ===
										`${sectionId}.tier-price-${index}`
											? "selected-element"
											: ""
									}`}
								>
									{getElementText(
										tier.priceMonthly,
										elementProps[`tier-price-${index}`]
									)}
								</span>
								<span className="text-sm font-semibold leading-6 text-gray-600">
									/month
								</span>
							</p>
							<a
								href={tier.href}
								data-element-path={`tier-cta-${index}`}
								className={`${applyElementStyles(
									tier.featured
										? "bg-indigo-600 text-white shadow-sm hover:bg-indigo-500"
										: "text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300",
									elementProps[`tier-cta-${index}`]
								)} ${
									selectedElementPath ===
									`${sectionId}.tier-cta-${index}`
										? "selected-element"
										: ""
								} mt-10 block w-full rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
							>
								{getElementText(
									"Get started today",
									elementProps[`tier-cta-${index}`]
								)}
							</a>
							<ul className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
								{tier.features.map((feature, featureIndex) => (
									<li
										key={feature}
										className="flex gap-x-3"
									>
										<CheckIcon
											className="h-6 w-5 flex-none text-indigo-600"
											aria-hidden="true"
										/>
										<span
											data-element-path={`tier-${index}-feature-${featureIndex}`}
											className={`${applyElementStyles(
												"",
												elementProps[
													`tier-${index}-feature-${featureIndex}`
												]
											)} ${
												selectedElementPath ===
												`${sectionId}.tier-${index}-feature-${featureIndex}`
													? "selected-element"
													: ""
											}`}
										>
											{getElementText(
												feature,
												elementProps[
													`tier-${index}-feature-${featureIndex}`
												]
											)}
										</span>
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
