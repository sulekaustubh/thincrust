import React from "react";

function Hero_Default() {
	return (
		<div className="h-[80vh] flex flex-col justify-center items-center bg-blue-200 p-8 text-center border-2 border-red-500">
			<h1 className="text-5xl font-bold text-white mb-4">
				Your Big Title Here
			</h1>
			<p className="text-xl text-white mb-8">
				Your small subtitle goes here
			</p>
			<div className="flex gap-4">
				<button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition">
					Primary CTA
				</button>
				<button className="px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition">
					Secondary CTA
				</button>
			</div>
		</div>
	);
}

export default Hero_Default;