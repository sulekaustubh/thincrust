"use client";

import React, { memo } from "react";

interface AuroraBorderProps {
	children: React.ReactNode;
	className?: string;
	colors?: string[];
	speed?: number;
	borderWidth?: number;
	borderRadius?: string;
}

export const AuroraBorder = memo(
	({
		children,
		className = "",
		colors = ["#f97316", "#ec4899", "#8b5cf6", "#6366f1"],
		speed = 1,
		borderWidth = 2,
		borderRadius = "0.5rem",
	}: AuroraBorderProps) => {
		const gradientStyle = {
			background: `linear-gradient(135deg, ${colors.join(", ")}, ${
				colors[0]
			})`,
			animationDuration: `${10 / speed}s`,
		};

		return (
			<div
				className={`relative inline-block p-[${borderWidth}px] ${className}`}
				style={{
					borderRadius,
					...gradientStyle,
					backgroundSize: "200% auto",
				}}
			>
				<div
					className="relative bg-background h-full w-full animate-aurora"
					style={{
						borderRadius: `calc(${borderRadius} - ${borderWidth}px)`,
					}}
				>
					{children}
				</div>
			</div>
		);
	}
);

AuroraBorder.displayName = "AuroraBorder";
