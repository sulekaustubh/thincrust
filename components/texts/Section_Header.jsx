import React from "react";
import { AuroraText } from "../magicui/aurora-text";
import Tagline from "./Tagline";

const Section_Header = ({
	tagline = "",
	title = "",
	aurora = "",
	description = "",
	className = "",
}) => {
	const renderTitle = () => {
		if (!title) return null;

		// Split title by newlines first
		const lines = title.split("\n");

		return (
			<h1 className="text-6xl font-outfit text-center font-semibold tracking-tight text-white">
				{lines.map((line, lineIndex) => {
					if (aurora && line.includes(aurora)) {
						const parts = line.split(aurora);
						return (
							<div key={lineIndex}>
								{parts.map((part, i) => (
									<React.Fragment key={i}>
										{part}
										{i < parts.length - 1 && (
											<AuroraText>{aurora}</AuroraText>
										)}
									</React.Fragment>
								))}
							</div>
						);
					} else {
						return <div key={lineIndex}>{line}</div>;
					}
				})}
			</h1>
		);
	};

	return (
		<div className={`mx-auto max-w-3xl text-center ${className}`}>
			{tagline && <Tagline text={tagline} />}
			{renderTitle()}
			{description && (
				<h1 className="tracking-wider text-lg font-extralight mt-2 text-center text-white/95">
					{description}
				</h1>
			)}
		</div>
	);
};

export default Section_Header;
