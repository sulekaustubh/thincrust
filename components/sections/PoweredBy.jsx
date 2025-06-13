import React from "react";
import { TextReveal } from "../magicui/text-reveal";

function PoweredBy() {
	return (
		<div className="bg-matteBlack">
			<TextReveal>
				Your secret backend weapon powered by supabase
				{/* ⚡️ */}
			</TextReveal>
		</div>
	);
}

export default PoweredBy;
