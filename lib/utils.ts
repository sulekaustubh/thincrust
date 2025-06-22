import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ElementProps } from "./types";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// Apply element-specific styles to an element based on its path and section's elementProps
export function applyElementStyles(
	elementPath: string,
	sectionId: string,
	elementProps: Record<string, ElementProps> = {},
	defaultClasses: string = ""
): string {
	const styles = elementProps[elementPath] || {};

	const classNames = [defaultClasses];

	// Apply element-specific styling
	if (styles.fontSize) classNames.push(styles.fontSize);
	if (styles.fontWeight) classNames.push(styles.fontWeight);
	if (styles.textAlign) classNames.push(styles.textAlign);
	if (styles.color) classNames.push(styles.color);
	if (styles.backgroundColor) classNames.push(styles.backgroundColor);
	if (styles.padding) classNames.push(styles.padding);
	if (styles.margin) classNames.push(styles.margin);
	if (styles.borderRadius) classNames.push(styles.borderRadius);
	if (styles.border) classNames.push(styles.border);
	if (styles.display) classNames.push(styles.display);
	if (styles.visibility) classNames.push(styles.visibility);

	return cn(...classNames);
}

// Get the text content for an element, with override support
export function getElementText(
	elementPath: string,
	elementProps: Record<string, ElementProps> = {},
	defaultText: string
): string {
	const styles = elementProps[elementPath] || {};
	return styles.text || defaultText;
}
