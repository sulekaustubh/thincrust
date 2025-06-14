"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Section_Header from "../texts/Section_Header";

// const faqs = [
// 	{
// 		question: "How does ThinCrust work with my existing Supabase project?",
// 		answer: "ThinCrust connects directly to your Supabase database and lets you build sophisticated API endpoints visually. You can connect up to 5 Supabase projects (depending on your plan), and ThinCrust will read your table schemas to help you build complex queries with JOINs, filtering, and aggregations without writing SQL.",
// 	},
// 	// {
// 	// 	question: "What makes ThinCrust different from basic API builders?",
// 	// 	answer: "ThinCrust specializes in complex database operations. While other tools offer simple CRUD, we provide advanced query building with multi-table JOINs, complex filtering with AND/OR logic, aggregation functions, custom expressions, and real-time SQL preview. You can build queries that would normally require advanced SQL knowledge.",
// 	// },
// 	{
// 		question: "Can I export my work and avoid vendor lock-in?",
// 		answer: "Absolutely! ThinCrust generates clean SQL queries and CURL requests that you can export and use anywhere. You can also export frontend integration code powered by AI. This means you can always take your work with you or use ThinCrust as a development tool even if you host elsewhere.",
// 	},
// 	// {
// 	// 	question: "What's included in the free Hobbyist plan?",
// 	// 	answer: "The Hobbyist plan includes up to 7 endpoints, CURL request exports, 5 AI-generated frontend integrations per month, and connection to 1 Supabase project. It's perfect for personal projects, learning, and prototyping. No credit card required to get started.",
// 	// },
// 	{
// 		question: "How sophisticated can my API endpoints be?",
// 		answer: "Very sophisticated! You can build endpoints with multiple table JOINs (INNER, LEFT, RIGHT, FULL OUTER), complex WHERE conditions with grouping, aggregation functions (COUNT, SUM, AVG, etc.), custom field aliases, pagination, sorting, and dynamic parameters. Think of it as a visual SQL query builder that generates REST APIs.",
// 	},
// 	{
// 		question: "Do you support team collaboration?",
// 		answer: "Yes! Pro plans support up to 2 teammates, while Startup plans support up to 10. Startup plans also include role-based access control with Admin, Developer, and QA roles. You'll also get additional features like endpoint flow visualizer and schema visualizer for better team coordination.",
// 	},
// 	{
// 		question: "What happens when I hit endpoint limits?",
// 		answer: "You can upgrade anytime to get more endpoints. Hobbyist plans have 7 endpoints, Pro plans have 50, and Startup plans have unlimited endpoints. All your existing work is preserved when you upgrade, and you get additional features like SQL query exports and schema visualization tools.",
// 	},
// 	{
// 		question: "How does the AI frontend integration feature work?",
// 		answer: "Our AI analyzes your API endpoints and generates ready-to-use integration code for popular frontend frameworks. Hobbyist plans get 5 AI calls per month, while Pro and Startup plans get unlimited AI-generated integrations. This saves hours of writing fetch logic and state management code.",
// 	},
// 	{
// 		question: "Can I test my endpoints before deploying?",
// 		answer: "Yes! ThinCrust includes automated test runs - monthly for Hobbyist, weekly for Pro, and daily for Startup plans. You also get real-time query previews as you build, so you can see exactly what SQL will be generated before creating your endpoint.",
// 	},
// 	{
// 		question: "Is ThinCrust suitable for production applications?",
// 		answer: "Absolutely! ThinCrust is designed for production use. Your endpoints connect directly to your Supabase database with full security and performance optimization. Many users start with prototyping and then scale to production, taking advantage of the export features when needed.",
// 	},
// ];

const faqs = [
	{
		question: "Can Thincrust plug into my existing Supabase project?",
		answer: "Absolutely. Just connect your Supabase URL, and Thincrust will auto-detect your schema. You can build complex APIs with joins, filters, and aggregations — without writing a single line of SQL.",
	},
	{
		question: "Am I locked in forever if I use Thincrust?",
		answer: "Nope. You can export your SQL queries, CURLs, and even AI-generated frontend code. Use Thincrust to build fast — host wherever you like.",
	},
	{
		question: "How powerful are these APIs really?",
		answer: "Imagine building REST endpoints with nested joins, grouped filters, sort, pagination, and even aliases — visually. If SQL was a boss fight, Thincrust is your cheat code.",
	},
	{
		question: "Can I work with my team?",
		answer: "Totally. Pro lets you invite 2 teammates. Startup lets you invite up to 10 with proper roles like Admin, QA, and Dev. Share the flow, not the chaos.",
	},
	{
		question: "What if I hit my endpoint limit?",
		answer: "We won’t block your work. Just upgrade when you're ready. You keep everything, and your cap gets lifted instantly.",
	},
	{
		question: "How does that AI frontend magic work?",
		answer: "Hit 'Generate Fetch Code' — and our AI gives you clean, paste-ready frontend logic tailored to your endpoint. React hooks, axios, error handling — boom. Done.",
	},
	{
		question: "Can I test APIs before shipping them?",
		answer: "Yes! We auto-run tests and show you the SQL behind every API before it’s even saved. Hobby users get monthly test runs, Pro weekly, Startup daily.",
	},
	{
		question: "Is this really safe for production apps?",
		answer: "Yes. Your data stays on your Supabase instance. We just make the API-building part ridiculously easy and exportable. You can go from MVP to production without switching tools.",
	},
];

function AccordionItem({ faq, index, isOpen, onToggle }) {
	const contentRef = useRef(null);
	const [height, setHeight] = useState(0);

	useEffect(() => {
		if (contentRef.current) {
			const contentHeight = contentRef.current.scrollHeight;
			setHeight(isOpen ? contentHeight : 0);
		}
	}, [isOpen]);

	return (
		<div
			className={`rounded-lg bg-neutral-900/50 backdrop-blur ring-1 ${
				isOpen ? "ring-indigo-500/20" : "ring-neutral-900/50"
			} overflow-hidden`}
		>
			<dt>
				<button
					className="flex cursor-pointer w-full items-center justify-between px-6 py-4 text-left transition-all duration-200 ease-out "
					onClick={() => onToggle(index)}
				>
					<span className="text-base tracking-wide text-white/90">
						{faq.question}
					</span>
					<span className="ml-6 flex h-7 items-center">
						<ChevronDownIcon
							className={`h-6 w-6 transform transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
								isOpen ? "rotate-180" : "rotate-0"
							} text-gray-400`}
							aria-hidden="true"
						/>
					</span>
				</button>
			</dt>
			<dd
				ref={contentRef}
				style={{ height: `${height}px` }}
				className="transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] overflow-hidden"
			>
				<div
					className={`px-6 pb-4 transition-opacity duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
						isOpen ? "opacity-100 delay-100" : "opacity-0"
					}`}
				>
					<p className="text-base leading-7 text-gray-300">
						{faq.answer}
					</p>
				</div>
			</dd>
		</div>
	);
}

export default function FAQ() {
	const [openIndex, setOpenIndex] = useState(null);

	const toggleFAQ = (index) => {
		setOpenIndex(openIndex === index ? null : index);
	};

	return (
		<div className="bg-matteBlack py-24 sm:py-32">
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<Section_Header
					className="opacity-90"
					title={`Still got questions?💡`}
					description="Shoot us an email if you don't find what you're looking for below."
				/>
				<div className="mx-auto mt-16 max-w-4xl">
					<dl className="space-y-4">
						{faqs.map((faq, index) => (
							<AccordionItem
								key={index}
								faq={faq}
								index={index}
								isOpen={openIndex === index}
								onToggle={toggleFAQ}
							/>
						))}
					</dl>
				</div>
			</div>
		</div>
	);
}
