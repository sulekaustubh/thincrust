"use client";

import React, { memo } from "react";

interface AuroraTextProps {
	children: React.ReactNode;
	className?: string;
	colors?: string[];
	speed?: number;
}

export const AuroraText = memo(
	({
		children,
		className = "",
		colors = ["#f97316", "#ec4899", "#8b5cf6", "#6366f1"],
		// colors = ["#ffffff"],
		speed = 1,
	}: AuroraTextProps) => {
		const gradientStyle = {
			backgroundImage: `linear-gradient(135deg, ${colors.join(", ")}, ${
				colors[0]
			})`,
			WebkitBackgroundClip: "text",
			WebkitTextFillColor: "transparent",
			animationDuration: `${10 / speed}s`,
		};

		return (
			<span className={`relative inline-block font-bold ${className}`}>
				<span className="sr-only">{children}</span>
				<span
					className="relative animate-aurora bg-[length:200%_auto] bg-clip-text text-transparent"
					style={gradientStyle}
					aria-hidden="true"
				>
					{children}
				</span>
			</span>
		);
	}
);

AuroraText.displayName = "AuroraText";
