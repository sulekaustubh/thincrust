"use client";

import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const faqs = [
	{
		question: "Do I need coding experience to use ThinCrust?",
		answer: "Not at all! ThinCrust is designed for both technical and non-technical users. Our visual interface lets you build APIs by dragging and dropping components. However, if you want to customize or export code, having some technical knowledge is helpful.",
	},
	{
		question: "How quickly can I deploy an API?",
		answer: "You can have a working API deployed in minutes. Our platform automatically handles hosting, security, and scaling. Complex APIs with multiple tables and relationships typically take 30-60 minutes to set up and deploy.",
	},
	{
		question: "What databases do you support?",
		answer: "ThinCrust provides managed PostgreSQL databases by default. For enterprise customers, we also support connections to existing MySQL, PostgreSQL, and MongoDB databases. We're continuously adding support for more database types.",
	},
	{
		question: "Can I export my APIs to my own infrastructure?",
		answer: "Yes! One of our key features is code export. You can generate clean, production-ready code in Node.js, Python (FastAPI), or Go. This ensures you're never locked into our platform and can migrate whenever needed.",
	},
	{
		question: "How do you handle security and authentication?",
		answer: "Security is built into every API by default. We provide JWT-based authentication, API key management, rate limiting, and encryption. Enterprise plans include SSO, advanced role-based access control, and compliance features for GDPR, HIPAA, and SOC 2.",
	},
	{
		question: "What happens if my app grows beyond the platform limits?",
		answer: "ThinCrust is designed to scale with you. Our infrastructure auto-scales based on demand. If you need to migrate, our code export feature ensures a smooth transition. Many customers continue using ThinCrust even at enterprise scale due to the convenience and performance.",
	},
	{
		question: "Can I customize the generated APIs?",
		answer: "Absolutely! You can customize everything from HTTP methods and endpoints to complex business logic using our visual workflow builder. For advanced customizations, you can add custom functions or export the code for manual modifications.",
	},
	{
		question: "Do you offer support for teams and collaboration?",
		answer: "Yes, our Pro and Enterprise plans include team collaboration features. Multiple developers can work on the same project with version control, commenting, and real-time collaboration. We also provide role-based permissions and project sharing.",
	},
	{
		question: "What's included in the free plan?",
		answer: "The free plan includes up to 3 APIs, 10,000 requests per month, 1GB database storage, and access to our visual builder. It's perfect for learning, prototyping, and small personal projects. No credit card required to get started.",
	},
	{
		question: "How reliable is the hosting infrastructure?",
		answer: "We guarantee 99.9% uptime with our enterprise-grade infrastructure. Your APIs run on a global CDN with automatic failover and redundancy. We provide real-time monitoring, automated backups, and 24/7 infrastructure monitoring.",
	},
];

export default function FAQ() {
	const [openIndex, setOpenIndex] = useState(null);

	const toggleFAQ = (index) => {
		setOpenIndex(openIndex === index ? null : index);
	};

	return (
		<div className="bg-[#111010] py-24 sm:py-32">
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mx-auto max-w-4xl text-center">
					<h2 className="text-base font-semibold leading-7 text-indigo-400">
						Support
					</h2>
					<p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
						Frequently asked questions
					</p>
					<p className="mt-6 text-lg leading-8 text-gray-300">
						Have a different question and can't find the answer
						you're looking for? Reach out to our support team by{" "}
						<a
							href="#"
							className="font-semibold text-indigo-400 hover:text-indigo-300"
						>
							sending us an email
						</a>{" "}
						and we'll get back to you as soon as we can.
					</p>
				</div>
				<div className="mx-auto mt-16 max-w-4xl">
					<dl className="space-y-4">
						{faqs.map((faq, index) => (
							<div
								key={index}
								className="rounded-lg bg-gray-900/50 backdrop-blur ring-1 ring-gray-700/50"
							>
								<dt>
									<button
										className="flex w-full items-center justify-between px-6 py-4 text-left"
										onClick={() => toggleFAQ(index)}
									>
										<span className="text-base font-semibold leading-7 text-white">
											{faq.question}
										</span>
										<span className="ml-6 flex h-7 items-center">
											<ChevronDownIcon
												className={`h-6 w-6 transform transition-transform duration-200 ${
													openIndex === index
														? "rotate-180"
														: "rotate-0"
												} text-gray-400`}
												aria-hidden="true"
											/>
										</span>
									</button>
								</dt>
								{openIndex === index && (
									<dd className="px-6 pb-4">
										<p className="text-base leading-7 text-gray-300">
											{faq.answer}
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
