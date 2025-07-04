"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { MorphingText } from "@/components/magicui/morphing-text";
import { AuroraText } from "../magicui/aurora-text";
import Tagline from "../texts/Tagline";
import Section_Header from "../texts/Section_Header";

const navigation = [
	{ name: "Features", href: "#" },
	{ name: "Pricing", href: "#" },
	{ name: "Docs", href: "#" },
	{ name: "Blog", href: "#" },
];

export default function Hero() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	// Animation for background gradients
	useEffect(() => {
		const normalGradients = document.querySelectorAll(
			".bg-gradient-element:not(.animated-gradient-alt)"
		);
		const altGradients = document.querySelectorAll(
			".bg-gradient-element.animated-gradient-alt"
		);

		normalGradients.forEach((gradient) => {
			gradient.style.animation = "gradientFlow 15s ease infinite";
		});

		altGradients.forEach((gradient) => {
			gradient.style.animation = "gradientFlowAlt 18s ease infinite";
		});
	}, []);

	return (
		<div className="bg-matteBlack relative overflow-hidden">
			<style jsx>{`
				@keyframes gradientFlow {
					0% {
						transform: rotate(0deg) scale(1) translate(0%, 0%);
					}
					25% {
						transform: rotate(8deg) scale(1.25) translate(8%, -8%);
					}
					50% {
						transform: rotate(0deg) scale(1.4) translate(0%, 0%);
					}
					75% {
						transform: rotate(-8deg) scale(1.25) translate(-8%, 8%);
					}
					100% {
						transform: rotate(0deg) scale(1) translate(0%, 0%);
					}
				}
				@keyframes gradientFlowAlt {
					0% {
						transform: rotate(0deg) scale(1.1) translate(0%, 0%);
					}
					25% {
						transform: rotate(-8deg) scale(1.4) translate(-8%, 8%);
					}
					50% {
						transform: rotate(0deg) scale(1.5) translate(0%, 0%);
					}
					75% {
						transform: rotate(8deg) scale(1.4) translate(8%, -8%);
					}
					100% {
						transform: rotate(0deg) scale(1.1) translate(0%, 0%);
					}
				}
				/* Only apply these animations to specific gradient elements */
				.bg-gradient-element {
					will-change: transform;
					transition: transform 0.3s ease;
				}
				.bg-gradient-element.animated-gradient {
					animation: gradientFlow 15s ease infinite;
				}
				.bg-gradient-element.animated-gradient-alt {
					animation: gradientFlowAlt 18s ease infinite;
				}
			`}</style>

			<header className="absolute text-white inset-x-0 top-0 z-50">
				<nav
					aria-label="Global"
					className="flex items-center justify-between p-6 lg:px-8"
				>
					<div className="flex lg:flex-1">
						<a
							href="#"
							className="-m-1.5 p-1.5"
						>
							<span className="sr-only">ThinCrust</span>
							<img
								alt="ThinCrust"
								src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
								className="h-8 w-auto"
							/>
						</a>
					</div>
					<div className="flex lg:hidden">
						<button
							type="button"
							onClick={() => setMobileMenuOpen(true)}
							className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
						>
							<span className="sr-only">Open main menu</span>
							<Bars3Icon
								aria-hidden="true"
								className="h-6 w-6"
							/>
						</button>
					</div>
					<div className="hidden lg:flex lg:gap-x-12">
						{navigation.map((item) => (
							<a
								key={item.name}
								href={item.href}
								className="text-sm font-semibold leading-6 text-white"
							>
								{item.name}
							</a>
						))}
					</div>
					<div className="hidden lg:flex lg:flex-1 lg:justify-end">
						<a
							href="/builder/tables"
							className="text-sm font-semibold leading-6 text-white"
						>
							Log in <span aria-hidden="true">&rarr;</span>
						</a>
					</div>
				</nav>
				<Dialog
					open={mobileMenuOpen}
					onClose={setMobileMenuOpen}
					className="lg:hidden"
				>
					<div className="fixed inset-0 z-50" />
					<DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-white/10">
						<div className="flex items-center justify-between">
							<a
								href="#"
								className="-m-1.5 p-1.5"
							>
								<span className="sr-only">ThinCrust</span>
								<img
									alt="ThinCrust"
									src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
									className="h-8 w-auto"
								/>
							</a>
							<button
								type="button"
								onClick={() => setMobileMenuOpen(false)}
								className="-m-2.5 rounded-md p-2.5 text-gray-400"
							>
								<span className="sr-only">Close menu</span>
								<XMarkIcon
									aria-hidden="true"
									className="h-6 w-6"
								/>
							</button>
						</div>
						<div className="mt-6 flow-root">
							<div className="-my-6 divide-y divide-gray-500/25">
								<div className="space-y-2 py-6">
									{navigation.map((item) => (
										<a
											key={item.name}
											href={item.href}
											className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-gray-800"
										>
											{item.name}
										</a>
									))}
								</div>
								<div className="py-6">
									<a
										href="/builder/tables"
										className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white hover:bg-gray-800"
									>
										Log in
									</a>
								</div>
							</div>
						</div>
					</DialogPanel>
				</Dialog>
			</header>

			<div className="relative isolate pt-14">
				{/* Main center-top gradient */}
				<div
					aria-hidden="true"
					className="absolute inset-x-0 top-1/4 -z-10 transform-gpu overflow-hidden blur-3xl"
				>
					<div
						style={{
							clipPath:
								"polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
						}}
						className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#0f2362] via-[#5a41dab8] to-[#2e73ff] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem] bg-gradient-element animated-gradient"
					/>
				</div>

				{/* Additional center gradient element */}
				<div
					aria-hidden="true"
					className="absolute inset-x-0 top-1/3 -z-10 transform-gpu overflow-hidden blur-3xl"
				>
					<div
						style={{
							clipPath:
								"polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
						}}
						className="relative left-[calc(50%+5rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[45deg] bg-gradient-to-r from-[#3b82f6] via-[#1dd89d] to-[#8b5cf6] opacity-20 sm:left-[calc(50%+10rem)] sm:w-[72.1875rem] bg-gradient-element animated-gradient-alt"
					/>
				</div>
				<div className="py-24 sm:py-32 lg:pb-40">
					<div className="mx-auto max-w-7xl px-6 lg:px-8">
						<div className="mx-auto max-w-3xl text-center">
							
							<Section_Header
								tagline="Supabase on steroids"
								title="Scalable APIs without writing a single line of backend code"
								aurora="backend"
								description="Skip the boilerplate. Connect supabase & go from DB to endpoints instantly."
							/>
							
							<div className="text-8xl uppercase font-bold tracking-tight text-white relative">
								{/* <MorphingText
									texts={[
										"backend",
										"APIs",
										"database",
										"server",
										"endpoints",
										"schemas",
										"auth",
										"security",
									]}
									className="text-8xl uppercase text-center font-bold tracking-tight text-white h-24 w-full"
								/> */}
							</div>
							{/* Workflow so fast, it might just replace your dev stack ! */}
							{/* <p className="mt-6 text-lg leading-8 text-gray-300">
								Create powerful, production-ready APIs in
								minutes with zero code. ThinCrust handles your
								database, hosting, and deployments while you
								focus on building what matters.
							</p> */}
							<div className="mt-10 flex items-center justify-center gap-x-6">
								<div
									href="/builder/tables"
									className="rounded-md font-semibold px-6 py-2 text-white bg-indigo-600 "
								>
									Start building
								</div>
								<div
									href="/builder/tables"
									className="text-sm cursor-pointer font-semibold leading-6 text-white"
								>
									See how it works{" "}
									<span aria-hidden="true">→</span>
								</div>
							</div>
						</div>
						<img
							alt="ThinCrust API Builder interface"
							src="https://tailwindcss.com/plus-assets/img/component-images/dark-project-app-screenshot.png"
							width={2432}
							height={1442}
							className="mt-16 rounded-md bg-white/5 shadow-2xl ring-1 ring-white/10 sm:mt-24"
						/>
					</div>
				</div>
				{/* <div
					aria-hidden="true"
					className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
				>
					<div
						style={{
							clipPath:
								"polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
						}}
						className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#0f2362] via-[#5b41da] to-[#2e73ff] opacity-40 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem] bg-gradient-element animated-gradient"
					/>
				</div> */}

				{/* Additional bottom gradient element */}
				{/* <div
					aria-hidden="true"
					className="absolute inset-x-0 top-[calc(100%-40rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
				>
					<div
						style={{
							clipPath:
								"polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
						}}
						className="relative left-[calc(50%-15rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[-15deg] bg-gradient-to-r from-[#4f46e5] via-[#3730a3] to-[#312e81] opacity-35 sm:left-[calc(50%-20rem)] sm:w-[72.1875rem] bg-gradient-element animated-gradient-alt"
					/>
				</div> */}
			</div>
		</div>
	);
}
