"use client";

import { applyElementStyles, getElementText } from "@/lib/utils";

const testimonials = [
	{
		body: "ThinCrust transformed how we build APIs. What used to take weeks now takes hours. The visual interface is intuitive, and the generated code is production-ready.",
		author: {
			name: "Sarah Chen",
			handle: "sarahchen",
			title: "CTO at StartupXYZ",
			imageUrl:
				"https://images.unsplash.com/photo-1494790108755-2616b612b429?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
		},
	},
	{
		body: "As a non-technical founder, ThinCrust gave me the power to validate my MVP without hiring a full development team. The learning curve was minimal.",
		author: {
			name: "Michael Rodriguez",
			handle: "mrodriguez",
			title: "Founder at InnovateLab",
			imageUrl:
				"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
		},
	},
	{
		body: "The combination of visual design and code export is brilliant. We prototype fast with the UI, then customize the exported code for complex business logic.",
		author: {
			name: "Emily Watson",
			handle: "emilywatson",
			title: "Lead Developer at TechCorp",
			imageUrl:
				"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
		},
	},
];

export default function Testimonials({
	sectionId,
	elementProps = {},
	selectedElementPath,
}) {
	return (
		<div className="bg-white py-24 sm:py-32">
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mx-auto max-w-xl text-center">
					<h2
						data-element-path="main-heading"
						className={`${applyElementStyles(
							"text-lg font-semibold leading-8 tracking-tight text-indigo-600",
							elementProps["main-heading"]
						)} ${
							selectedElementPath === `${sectionId}.main-heading`
								? "selected-element"
								: ""
						}`}
					>
						{getElementText(
							"Testimonials",
							elementProps["main-heading"]
						)}
					</h2>
					<p
						data-element-path="sub-heading"
						className={`${applyElementStyles(
							"mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl",
							elementProps["sub-heading"]
						)} ${
							selectedElementPath === `${sectionId}.sub-heading`
								? "selected-element"
								: ""
						}`}
					>
						{getElementText(
							"Trusted by founders and developers worldwide",
							elementProps["sub-heading"]
						)}
					</p>
				</div>
				<div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
					<div className="-mt-8 sm:-mx-4 sm:columns-1 sm:text-[0] lg:columns-3">
						{testimonials.map((testimonial, index) => (
							<div
								key={index}
								data-element-path={`testimonial-${index}`}
								className={`${applyElementStyles(
									"pt-8 sm:inline-block sm:w-full sm:px-4",
									elementProps[`testimonial-${index}`]
								)} ${
									selectedElementPath ===
									`${sectionId}.testimonial-${index}`
										? "selected-element"
										: ""
								}`}
							>
								<figure className="rounded-2xl bg-gray-50 p-8 text-sm leading-6">
									<blockquote
										data-element-path={`testimonial-body-${index}`}
										className={`${applyElementStyles(
											"text-gray-900",
											elementProps[
												`testimonial-body-${index}`
											]
										)} ${
											selectedElementPath ===
											`${sectionId}.testimonial-body-${index}`
												? "selected-element"
												: ""
										}`}
									>
										<p>
											"
											{getElementText(
												testimonial.body,
												elementProps[
													`testimonial-body-${index}`
												]
											)}
											"
										</p>
									</blockquote>
									<figcaption className="mt-6 flex items-center gap-x-4">
										<img
											className="h-10 w-10 rounded-full bg-gray-50"
											src={testimonial.author.imageUrl}
											alt=""
										/>
										<div>
											<div
												data-element-path={`author-name-${index}`}
												className={`${applyElementStyles(
													"font-semibold text-gray-900",
													elementProps[
														`author-name-${index}`
													]
												)} ${
													selectedElementPath ===
													`${sectionId}.author-name-${index}`
														? "selected-element"
														: ""
												}`}
											>
												{getElementText(
													testimonial.author.name,
													elementProps[
														`author-name-${index}`
													]
												)}
											</div>
											<div
												data-element-path={`author-title-${index}`}
												className={`${applyElementStyles(
													"text-gray-600",
													elementProps[
														`author-title-${index}`
													]
												)} ${
													selectedElementPath ===
													`${sectionId}.author-title-${index}`
														? "selected-element"
														: ""
												}`}
											>
												{getElementText(
													testimonial.author.title,
													elementProps[
														`author-title-${index}`
													]
												)}
											</div>
										</div>
									</figcaption>
								</figure>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
