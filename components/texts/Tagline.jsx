import React from "react";

function Tagline({ text }) {
	return (
		<div>
			<div className="inline-flex gap-x-2 items-center px-4 py-2 rounded-full bg-indigo-500/10 border-0 border-indigo-500/20 mb-4">
				<p className="w-1.5 h-1.5 mt-[1px] rounded-full bg-indigo-400" />
				<p className="text-sm tracking-wide text-indigo-400">{text}</p>
			</div>
		</div>
	);
}

export default Tagline;
