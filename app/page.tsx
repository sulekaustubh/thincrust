"use client";

import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import About from "@/components/sections/About";
import Pricing from "@/components/sections/Pricing";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/sections/Footer";
import Footer2 from "@/components/sections/Footer2";
import { useState } from "react";
import Features2 from "@/components/sections/Features2";
import PoweredBy from "@/components/sections/PoweredBy";

export default function Home() {
	return (
		<div>
			<Hero />
			<Features />
			<PoweredBy />
			{/* <Features2 /> */}
			{/* <About /> */}
			{/* <Testimonials /> */}
			<Pricing />
			<FAQ />
			<CTA />
			{/* <Footer /> */}
			<Footer2 />
		</div>
	);
}
