import React from "react";

function Hero_Variant1({props}) {
    const {title, subtitle, cta} = props;
	console.log(props);
	return (
		<div className="h-[60vh] flex flex-col justify-center items-center bg-gradient-to-r from-purple-600 to-pink-600 p-8 text-center">
			<h1 className="text-6xl font-extrabold text-white mb-6">
				{title}
			</h1>
			<p className="text-2xl text-white mb-10 max-w-2xl">
				{subtitle}
			</p>
			<button className="px-8 py-4 bg-white text-purple-600 font-bold text-lg rounded-full hover:bg-gray-100 transition transform hover:scale-105">
				{cta}
			</button>
		</div>
	);
}

export default Hero_Variant1;