"use client";

import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { applyElementStyles, getElementText } from "@/lib/utils";

export default function FAQ({
	sectionId,
	elementProps = {},
	selectedElementPath,
}) {
	const [activeIndex, setActiveIndex] = useState(null);

	const faqs = [
		{
			question: "How does ThinCrust work?",
			answer: "ThinCrust provides a visual interface where you can design your database schema, define API endpoints, and set business logic without writing code. Simply drag and drop components, configure relationships, and deploy instantly to our global edge network.",
		},
		{
			question: "Do I need coding knowledge to use ThinCrust?",
			answer: "Not at all! ThinCrust is designed for non-technical users. However, if you're a developer, you can always export clean, production-ready code and extend it further.",
		},
		{
			question: "What databases does ThinCrust support?",
			answer: "Currently, ThinCrust integrates seamlessly with Supabase (PostgreSQL). We're working on supporting more databases like MySQL, MongoDB, and others based on user demand.",
		},
		{
			question: "Can I customize the generated APIs?",
			answer: "Yes! You can configure authentication, set up custom validation rules, define relationships, and even add custom business logic through our visual interface. For advanced use cases, you can export the code.",
		},
		{
			question: "Is there a free plan available?",
			answer: "We offer a generous free tier that includes up to 3 APIs and 1K requests per month. Perfect for trying out the platform and building small projects.",
		},
		{
			question: "How secure are the APIs created with ThinCrust?",
			answer: "Security is our top priority. All APIs come with built-in authentication, rate limiting, and encryption. We follow industry best practices and regularly update our security measures.",
		},
	];

	return (
		<div className="bg-gray-900">
			<div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
				<div className="mx-auto max-w-4xl divide-y divide-white/10">
					<h2
						data-element-path="main-heading"
						className={`${applyElementStyles(
							"text-2xl font-bold leading-10 tracking-tight text-white",
							elementProps["main-heading"]
						)} ${
							selectedElementPath === `${sectionId}.main-heading`
								? "selected-element"
								: ""
						}`}
					>
						{getElementText(
							"Frequently asked questions",
							elementProps["main-heading"]
						)}
					</h2>
					<dl className="mt-10 space-y-6 divide-y divide-white/10">
						{faqs.map((faq, index) => (
							<div
								key={index}
								className="pt-6"
							>
								<dt>
									<button
										data-element-path={`faq-question-${index}`}
										className={`${applyElementStyles(
											"flex w-full items-start justify-between text-left text-white",
											elementProps[
												`faq-question-${index}`
											]
										)} ${
											selectedElementPath ===
											`${sectionId}.faq-question-${index}`
												? "selected-element"
												: ""
										}`}
										onClick={() =>
											setActiveIndex(
												activeIndex === index
													? null
													: index
											)
										}
									>
										<span className="text-base font-semibold leading-7">
											{getElementText(
												faq.question,
												elementProps[
													`faq-question-${index}`
												]
											)}
										</span>
										<span className="ml-6 flex h-7 items-center">
											<ChevronDownIcon
												className={`h-6 w-6 transform transition-transform ${
													activeIndex === index
														? "rotate-180"
														: ""
												}`}
												aria-hidden="true"
											/>
										</span>
									</button>
								</dt>
								{activeIndex === index && (
									<dd className="mt-2 pr-12">
										<p
											data-element-path={`faq-answer-${index}`}
											className={`${applyElementStyles(
												"text-base leading-7 text-gray-300",
												elementProps[
													`faq-answer-${index}`
												]
											)} ${
												selectedElementPath ===
												`${sectionId}.faq-answer-${index}`
													? "selected-element"
													: ""
											}`}
										>
											{getElementText(
												faq.answer,
												elementProps[
													`faq-answer-${index}`
												]
											)}
										</p>
									</dd>
								)}
							</div>
						))}
					</dl>
				</div>
			</div>
		</div>
	);
}
