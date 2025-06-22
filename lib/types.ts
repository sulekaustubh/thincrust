export type SectionType =
	| "hero"
	| "features"
	| "pricing"
	| "footer"
	| "cta"
	| "testimonials";

export interface SectionVariant {
	id: string;
	section: SectionType;
	name: string;
	component: React.ComponentType<Record<string, unknown>>;
	defaultProps: Record<string, unknown>;
	previewImage?: string;
}

export interface ElementProps {
	text?: string;
	color?: string;
	backgroundColor?: string;
	fontSize?: string;
	fontWeight?: string;
	textAlign?: string;
	padding?: string;
	margin?: string;
	borderRadius?: string;
	border?: string;
	display?: string;
	visibility?: string;
}

export interface ProjectSection {
	id: string;
	section: SectionType;
	variantId: string;
	props: Record<string, unknown>;
	elementProps?: Record<string, ElementProps>;
	position?: {
		x: number;
		y: number;
	};
}

export interface Project {
	id: string;
	name: string;
	sections: ProjectSection[];
	globalFonts?: {
		headingFont?: string;
		bodyFont?: string;
	};
	createdAt: string;
	updatedAt: string;
}

export type FontOption = {
	id: string;
	name: string;
	cssClass: string;
	family: string;
};
