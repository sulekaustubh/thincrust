import { FontOption } from "./types";

export const AVAILABLE_FONTS: FontOption[] = [
	{
		id: "inter",
		name: "Inter",
		cssClass: "font-sans",
		family: "Inter, ui-sans-serif, system-ui",
	},
	{
		id: "outfit",
		name: "Outfit",
		cssClass: "font-outfit",
		family: "var(--font-outfit)",
	},
	{
		id: "playfair",
		name: "Playfair Display",
		cssClass: "font-playfair",
		family: "Playfair Display, serif",
	},
	{
		id: "montserrat",
		name: "Montserrat",
		cssClass: "font-montserrat",
		family: "Montserrat, sans-serif",
	},
	{
		id: "roboto",
		name: "Roboto",
		cssClass: "font-roboto",
		family: "Roboto, sans-serif",
	},
	{
		id: "poppins",
		name: "Poppins",
		cssClass: "font-poppins",
		family: "Poppins, sans-serif",
	},
	{
		id: "lora",
		name: "Lora",
		cssClass: "font-lora",
		family: "Lora, serif",
	},
	{
		id: "geist-mono",
		name: "Geist Mono",
		cssClass: "font-geist-mono",
		family: "var(--font-geist-mono)",
	},
];

export const getFontById = (id: string): FontOption | undefined => {
	return AVAILABLE_FONTS.find((font) => font.id === id);
};

export const getFontClass = (fontId?: string): string => {
	if (!fontId) return "font-outfit"; // default
	const font = getFontById(fontId);
	return font?.cssClass || "font-outfit";
};
