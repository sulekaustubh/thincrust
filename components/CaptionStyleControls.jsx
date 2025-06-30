import React, { useState } from "react";

const colorOptions = [
	{ name: "Yellow", value: "text-yellow-300", preview: "#FCD34D" },
	{ name: "White", value: "text-white", preview: "#FFFFFF" },
	{ name: "Blue", value: "text-blue-500", preview: "#3B82F6" },
	{ name: "Red", value: "text-red-500", preview: "#EF4444" },
];

const textSizeOptions = [
	{ name: "XL", value: "text-xl" },
	{ name: "2XL", value: "text-2xl" },
	{ name: "3XL", value: "text-3xl" },
	{ name: "4XL", value: "text-4xl" },
	{ name: "5XL", value: "text-5xl" },
	{ name: "6XL", value: "text-6xl" },
	{ name: "7XL", value: "text-7xl" },
	{ name: "8XL", value: "text-8xl" },
];

const shadowOptions = [
	{ name: "None", value: "" },
	{ name: "Standard", value: "text-shadow" },
	{ name: "Large", value: "text-shadow-lg" },
];

const fontWeightOptions = [
	{ name: "Normal", value: "font-normal" },
	{ name: "Medium", value: "font-medium" },
	{ name: "Semibold", value: "font-semibold" },
	{ name: "Bold", value: "font-bold" },
];

const positionOptions = [
	{ name: "Bottom", value: "bottom" },
	{ name: "Center", value: "center" },
	{ name: "Top", value: "top" },
];

export const CaptionStyleControls = ({ onStyleChange }) => {
	const [selectedColor, setSelectedColor] = useState("text-yellow-300");
	const [selectedSize, setSelectedSize] = useState("text-6xl");
	const [selectedShadow, setSelectedShadow] = useState("text-shadow-lg");
	const [selectedWeight, setSelectedWeight] = useState("font-bold");
	const [selectedPosition, setSelectedPosition] = useState("bottom");

	const updateStyles = (type, value) => {
		let newStyles = {
			color: selectedColor,
			size: selectedSize,
			shadow: selectedShadow,
			weight: selectedWeight,
			position: selectedPosition,
		};

		switch (type) {
			case "color":
				newStyles.color = value;
				setSelectedColor(value);
				break;
			case "size":
				newStyles.size = value;
				setSelectedSize(value);
				break;
			case "shadow":
				newStyles.shadow = value;
				setSelectedShadow(value);
				break;
			case "weight":
				newStyles.weight = value;
				setSelectedWeight(value);
				break;
			case "position":
				newStyles.position = value;
				setSelectedPosition(value);
				break;
		}

		// Generate the className string
		const classNames = `${newStyles.color} ${newStyles.size} ${newStyles.shadow} ${newStyles.weight} text-center w-full`;

		// Generate the position style object
		const positionStyle = {};
		if (newStyles.position === "bottom") {
			positionStyle.bottom = "20%";
			positionStyle.top = "auto";
		} else if (newStyles.position === "center") {
			positionStyle.bottom = "auto";
			positionStyle.top = "50%";
			positionStyle.transform = "translateY(-50%)";
		} else if (newStyles.position === "top") {
			positionStyle.bottom = "auto";
			positionStyle.top = "20%";
		}

		onStyleChange({
			classNames,
			containerStyle: positionStyle,
		});
	};

	return (
		<div className="mb-4 bg-gray-100 p-4 rounded-md">
			<h3 className="font-bold text-lg mb-3">Caption Style</h3>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
				{/* Text color */}
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Text Color
					</label>
					<div className="flex flex-wrap gap-2">
						{colorOptions.map((color) => (
							<button
								key={color.value}
								onClick={() =>
									updateStyles("color", color.value)
								}
								className={`w-8 h-8 rounded-full border ${
									selectedColor === color.value
										? "ring-2 ring-blue-500"
										: ""
								}`}
								style={{ backgroundColor: color.preview }}
								title={color.name}
							/>
						))}
					</div>
				</div>

				{/* Text size */}
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Text Size
					</label>
					<select
						className="w-full p-2 border border-gray-300 rounded-md"
						value={selectedSize}
						onChange={(e) => updateStyles("size", e.target.value)}
					>
						{textSizeOptions.map((size) => (
							<option
								key={size.value}
								value={size.value}
							>
								{size.name}
							</option>
						))}
					</select>
				</div>

				{/* Text shadow */}
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Text Shadow
					</label>
					<select
						className="w-full p-2 border border-gray-300 rounded-md"
						value={selectedShadow}
						onChange={(e) => updateStyles("shadow", e.target.value)}
					>
						{shadowOptions.map((shadow) => (
							<option
								key={shadow.value}
								value={shadow.value}
							>
								{shadow.name}
							</option>
						))}
					</select>
				</div>

				{/* Font weight */}
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Font Weight
					</label>
					<select
						className="w-full p-2 border border-gray-300 rounded-md"
						value={selectedWeight}
						onChange={(e) => updateStyles("weight", e.target.value)}
					>
						{fontWeightOptions.map((weight) => (
							<option
								key={weight.value}
								value={weight.value}
							>
								{weight.name}
							</option>
						))}
					</select>
				</div>

				{/* Position */}
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Position
					</label>
					<select
						className="w-full p-2 border border-gray-300 rounded-md"
						value={selectedPosition}
						onChange={(e) =>
							updateStyles("position", e.target.value)
						}
					>
						{positionOptions.map((position) => (
							<option
								key={position.value}
								value={position.value}
							>
								{position.name}
							</option>
						))}
					</select>
				</div>
			</div>

			<div className="p-3 bg-gray-200 rounded text-sm">
				<p>
					Current Style:{" "}
					<code className="bg-gray-800 text-white px-2 py-1 rounded">
						{selectedColor} {selectedSize} {selectedShadow}{" "}
						{selectedWeight}
					</code>
				</p>
			</div>
		</div>
	);
};
