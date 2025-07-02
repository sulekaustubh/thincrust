import React from "react";
import { useCurrentFrame, interpolate, useVideoConfig } from "remotion";

// Style mapping for common Tailwind-like classes
const styleMap = {
	// Text colors
	"text-white": { color: "#FFFFFF" },
	"text-yellow-300": { color: "#FCD34D" },
	"text-yellow-400": { color: "#FBBF24" },
	"text-blue-500": { color: "#3B82F6" },
	"text-red-500": { color: "#EF4444" },

	// Font sizes
	"text-lg": { fontSize: "1.125rem" },
	"text-xl": { fontSize: "1.25rem" },
	"text-2xl": { fontSize: "1.5rem" },
	"text-3xl": { fontSize: "1.875rem" },
	"text-4xl": { fontSize: "2.25rem" },
	"text-5xl": { fontSize: "3rem" },
	"text-6xl": { fontSize: "3.75rem" },
	"text-7xl": { fontSize: "4.5rem" },
	"text-8xl": { fontSize: "6rem" },

	// Font weights
	"font-normal": { fontWeight: 400 },
	"font-medium": { fontWeight: 500 },
	"font-semibold": { fontWeight: 600 },
	"font-bold": { fontWeight: 700 },

	// Text alignment
	"text-center": { textAlign: "center" },
	"text-left": { textAlign: "left" },
	"text-right": { textAlign: "right" },

	// Padding
	"p-1": { padding: "0.25rem" },
	"p-2": { padding: "0.5rem" },
	"p-3": { padding: "0.75rem" },
	"p-4": { padding: "1rem" },
	"p-5": { padding: "1.25rem" },

	// Margin
	"mb-1": { marginBottom: "0.25rem" },
	"mb-2": { marginBottom: "0.5rem" },
	"mb-4": { marginBottom: "1rem" },

	// Width
	"w-full": { width: "100%" },
	"w-1/2": { width: "50%" },
	"w-auto": { width: "auto" },

	// Background
	"bg-black": { backgroundColor: "black" },
	"bg-white": { backgroundColor: "white" },
	"bg-transparent": { backgroundColor: "transparent" },
	"bg-opacity-50": { backgroundColor: "rgba(0,0,0,0.5)" },

	// Shadow
	shadow: {
		boxShadow:
			"0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
	},
	"shadow-lg": {
		boxShadow:
			"0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
	},

	// Text shadow
	"text-shadow": { textShadow: "0 2px 4px rgba(0, 0, 0, 0.5)" },
	"text-shadow-lg": { textShadow: "0 4px 8px rgba(0, 0, 0, 0.8)" },

	// Border radius
	rounded: { borderRadius: "0.25rem" },
	"rounded-lg": { borderRadius: "0.5rem" },
	"rounded-full": { borderRadius: "9999px" },
};

// Parse Tailwind-like classes and convert to inline styles
const parseTailwindClasses = (classNames) => {
	if (!classNames) return {};

	const classes = classNames.split(" ");
	let styles = {};

	classes.forEach((className) => {
		if (styleMap[className]) {
			styles = { ...styles, ...styleMap[className] };
		}
	});

	return styles;
};

// StyledCaption component
export const StyledCaption = ({
	children,
	classNames = "",
	style = {},
	startTime,
	endTime,
	avgScore = 0.5,
	frame,
	fps,
}) => {
	// Calculate duration in frames
	const durationInFrames = Math.ceil((endTime - startTime) * fps);

	// For very short groups, ensure valid interpolation points
	const point1 = 0;
	const point2 = Math.max(1, Math.floor(durationInFrames * 0.25));
	const point3 = Math.max(point2 + 1, Math.floor(durationInFrames * 0.75));
	const point4 = Math.max(point3 + 1, durationInFrames);

	// Calculate opacity
	const opacity = interpolate(
		frame,
		[point1, point2, point3, point4],
		[0, 1, 1, 0],
		{
			extrapolateLeft: "clamp",
			extrapolateRight: "clamp",
		}
	);

	// Calculate font size based on confidence score if not explicitly set
	let fontSize = style.fontSize;
	if (!fontSize) {
		fontSize = `${interpolate(avgScore, [0, 1], [60, 80])}px`;
	}

	// Convert Tailwind classes to inline styles
	const tailwindStyles = parseTailwindClasses(classNames);

	// Combine all styles
	const combinedStyles = {
		...tailwindStyles,
		...style,
		// opacity,
		fontSize,
	};

	return <div style={combinedStyles}>{children}</div>;
};

// Word Group with StyledCaption
export const StyledWordGroup = ({
	words,
	startTime,
	endTime,
	avgScore,
	classNames = "",
	style = {},
}) => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	return (
		<StyledCaption
			startTime={startTime}
			endTime={endTime}
			avgScore={avgScore}
			frame={frame}
			fps={fps}
			classNames={`text-center w-full text-yellow-300 text-shadow font-bold ${classNames}`}
			style={{
				padding: "10px",
				lineHeight: "1.3",
				...style,
			}}
		>
			{words.join(" ")}
		</StyledCaption>
	);
};
