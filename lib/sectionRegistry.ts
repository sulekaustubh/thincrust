import { SectionVariant } from "./types";
import HeroV1 from "@/components/sections/hero/HeroV1";
import HeroV2 from "@/components/sections/hero/HeroV2";
import FeaturesV1 from "@/components/sections/features/FeaturesV1";
import Features from "@/components/sections/Features";
import About from "@/components/sections/About";
import CTA from "@/components/sections/CTA";
import FAQ from "@/components/sections/FAQ";
import Pricing from "@/components/sections/Pricing";
import Testimonials from "@/components/sections/Testimonials";

export const SECTION_REGISTRY: SectionVariant[] = [
	{
		id: "hero-v1",
		section: "hero",
		name: "Hero - Image Background",
		component: HeroV1,
		defaultProps: {
			heading: "Build Amazing Landing Pages",
			subheading:
				"Create beautiful, responsive landing pages with our no-code builder. Drag, drop, and customize to your heart's content.",
			ctaLabel: "Get Started",
			ctaSecondaryLabel: "Learn More",
			headingFont: "outfit",
			bodyFont: "outfit",
			backgroundColor: "bg-gradient-to-br from-gray-900 to-black",
			textColor: "text-white",
			image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80",
		},
	},
	{
		id: "hero-v2",
		section: "hero",
		name: "Hero - Feature List",
		component: HeroV2,
		defaultProps: {
			heading: "The Future of Web Development",
			subheading:
				"Join thousands of developers who are building faster, smarter, and more efficiently.",
			ctaLabel: "Start Building Now",
			headingFont: "outfit",
			bodyFont: "outfit",
			backgroundColor: "bg-gray-900",
			textColor: "text-white",
			features: [
				"No Code Required",
				"Instant Deploy",
				"Built-in Analytics",
			],
		},
	},
	{
		id: "features-v1",
		section: "features",
		name: "Features - Grid Layout",
		component: FeaturesV1,
		defaultProps: {
			heading: "Why Choose Our Platform",
			subheading:
				"Discover the features that make us the best choice for your business.",
			features: [
				{
					title: "Lightning Fast",
					description:
						"Built for speed with optimized performance and instant loading.",
					icon: "⚡",
				},
				{
					title: "Secure by Default",
					description:
						"Enterprise-grade security with built-in protection and encryption.",
					icon: "🔒",
				},
				{
					title: "Easy to Use",
					description:
						"Intuitive interface designed for users of all skill levels.",
					icon: "✨",
				},
			],
			headingFont: "outfit",
			bodyFont: "outfit",
			backgroundColor: "bg-white",
			textColor: "text-gray-900",
		},
	},
	{
		id: "features-advanced",
		section: "features",
		name: "Features - Advanced Grid",
		component: Features,
		defaultProps: {},
	},
	{
		id: "about-v1",
		section: "about",
		name: "About - Story Layout",
		component: About,
		defaultProps: {},
	},
	{
		id: "cta-v1",
		section: "cta",
		name: "Call to Action - Simple",
		component: CTA,
		defaultProps: {},
	},
	{
		id: "faq-v1",
		section: "faq",
		name: "FAQ - Accordion",
		component: FAQ,
		defaultProps: {},
	},
	{
		id: "pricing-v1",
		section: "pricing",
		name: "Pricing - Three Tiers",
		component: Pricing,
		defaultProps: {},
	},
	{
		id: "testimonials-v1",
		section: "testimonials",
		name: "Testimonials - Masonry Grid",
		component: Testimonials,
		defaultProps: {},
	},
];

export const getSectionVariantById = (
	id: string
): SectionVariant | undefined => {
	return SECTION_REGISTRY.find((variant) => variant.id === id);
};

export const getSectionVariantsByType = (
	sectionType: string
): SectionVariant[] => {
	return SECTION_REGISTRY.filter(
		(variant) => variant.section === sectionType
	);
};

export const getAllSectionTypes = (): string[] => {
	const types = new Set(SECTION_REGISTRY.map((variant) => variant.section));
	return Array.from(types);
};
