"use client";

import { useEffect, useState } from "react";

export type SaveState = "idle" | "saving" | "saved" | "error";

interface SaveStatusProps {
	saveState: SaveState;
	className?: string;
}

export default function SaveStatus({
	saveState,
	className = "",
}: SaveStatusProps) {
	const [showSaved, setShowSaved] = useState(false);

	useEffect(() => {
		if (saveState === "saved") {
			setShowSaved(true);
			const timer = setTimeout(() => {
				setShowSaved(false);
			}, 2000);
			return () => clearTimeout(timer);
		}
	}, [saveState]);

	const getStatusConfig = () => {
		switch (saveState) {
			case "saving":
				return {
					text: "Saving...",
					icon: "⏳",
					bgColor: "bg-yellow-100 dark:bg-yellow-900",
					textColor: "text-yellow-800 dark:text-yellow-200",
					borderColor: "border-yellow-200 dark:border-yellow-700",
				};
			case "saved":
				return {
					text: "Saved ✅",
					icon: "✅",
					bgColor: "bg-green-100 dark:bg-green-900",
					textColor: "text-green-800 dark:text-green-200",
					borderColor: "border-green-200 dark:border-green-700",
				};
			case "error":
				return {
					text: "Error saving",
					icon: "❌",
					bgColor: "bg-red-100 dark:bg-red-900",
					textColor: "text-red-800 dark:text-red-200",
					borderColor: "border-red-200 dark:border-red-700",
				};
			default:
				return null;
		}
	};

	const config = getStatusConfig();

	if (!config || (!showSaved && saveState === "saved")) {
		return null;
	}

	return (
		<div
			className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${config.bgColor} ${config.textColor} ${config.borderColor} ${className}`}
		>
			<span className="mr-1">{config.icon}</span>
			{config.text}
		</div>
	);
}
