"use client";

import React from "react";
import { SubtitleStyleOptions } from "@/app/utils/ffmpeg";

interface SubtitleStyleSelectorProps {
	styles: SubtitleStyleOptions;
	onStyleChange: (styles: SubtitleStyleOptions) => void;
}

const SubtitleStyleSelector: React.FC<SubtitleStyleSelectorProps> = ({
	styles,
	onStyleChange,
}) => {
	const handleChange = (key: keyof SubtitleStyleOptions, value: any) => {
		onStyleChange({
			...styles,
			[key]: value,
		});
	};

	return (
		<div className="w-full mb-4">
			<h3 className="text-sm font-medium text-gray-700 mb-2">
				Subtitle Styling
			</h3>

			<div className="grid grid-cols-2 gap-3">
				{/* Position */}
				<div>
					<label
						htmlFor="subtitle-position"
						className="block text-xs text-gray-500 mb-1"
					>
						Position
					</label>
					<select
						id="subtitle-position"
						value={styles.position || "bottom"}
						onChange={(e) =>
							handleChange("position", e.target.value)
						}
						className="block w-full px-2 py-1 text-sm bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
					>
						<option value="bottom">Bottom</option>
						<option value="center">Center</option>
					</select>
				</div>

				{/* Font Size */}
				<div>
					<label
						htmlFor="subtitle-size"
						className="block text-xs text-gray-500 mb-1"
					>
						Font Size
					</label>
					<select
						id="subtitle-size"
						value={styles.fontSize || 24}
						onChange={(e) =>
							handleChange("fontSize", parseInt(e.target.value))
						}
						className="block w-full px-2 py-1 text-sm bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
					>
						<option value="18">Small</option>
						<option value="24">Medium</option>
						<option value="30">Large</option>
						<option value="36">Extra Large</option>
					</select>
				</div>

				{/* Font Color */}
				<div>
					<label
						htmlFor="subtitle-color"
						className="block text-xs text-gray-500 mb-1"
					>
						Font Color
					</label>
					<select
						id="subtitle-color"
						value={styles.fontColor || "white"}
						onChange={(e) =>
							handleChange("fontColor", e.target.value)
						}
						className="block w-full px-2 py-1 text-sm bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
					>
						<option value="white">White</option>
						<option value="yellow">Yellow</option>
						<option value="cyan">Cyan</option>
						<option value="ff00ff">Hot Pink</option>
						<option value="00ff00">Bright Green</option>
					</select>
				</div>

				{/* Border Width */}
				<div>
					<label
						htmlFor="subtitle-border"
						className="block text-xs text-gray-500 mb-1"
					>
						Border
					</label>
					<select
						id="subtitle-border"
						value={styles.borderWidth || 1.5}
						onChange={(e) =>
							handleChange(
								"borderWidth",
								parseFloat(e.target.value)
							)
						}
						className="block w-full px-2 py-1 text-sm bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
					>
						<option value="0">None</option>
						<option value="1">Thin</option>
						<option value="1.5">Medium</option>
						<option value="2.5">Thick</option>
						<option value="3.5">Very Thick</option>
					</select>
				</div>
			</div>

			{/* Preview Example */}
			<div
				className="mt-3 p-2 rounded text-center relative"
				style={{
					backgroundColor: "rgba(0,0,0,0.6)",
					border: `${styles.borderWidth || 1.5}px solid black`,
				}}
			>
				<span
					style={{
						color: styles.fontColor || "white",
						fontSize: `${Math.min(
							16,
							(styles.fontSize || 24) / 1.5
						)}px`,
						fontWeight: "bold",
						textShadow: "1px 1px 1px rgba(0,0,0,0.8)",
					}}
				>
					Preview Text (Approximate)
				</span>
			</div>
		</div>
	);
};

export default SubtitleStyleSelector;
