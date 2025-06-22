"use client";

import { AVAILABLE_FONTS, FontOption } from "@/lib/fonts";

interface FontPickerProps {
	value: string;
	onChange: (fontId: string) => void;
	label?: string;
	className?: string;
}

export default function FontPicker({
	value,
	onChange,
	label = "Font Family",
	className = "",
}: FontPickerProps) {
	return (
		<div className={`space-y-2 ${className}`}>
			<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
				{label}
			</label>
			<select
				value={value}
				onChange={(e) => onChange(e.target.value)}
				className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
			>
				{AVAILABLE_FONTS.map((font: FontOption) => (
					<option
						key={font.id}
						value={font.id}
					>
						{font.name}
					</option>
				))}
			</select>
			<div className="text-xs text-gray-500 dark:text-gray-400">
				Preview:{" "}
				<span
					className={`${
						AVAILABLE_FONTS.find((f) => f.id === value)?.cssClass
					}`}
				>
					The quick brown fox jumps over the lazy dog
				</span>
			</div>
		</div>
	);
}
