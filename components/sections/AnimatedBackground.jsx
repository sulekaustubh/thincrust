import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const AnimatedBackground = ({ children }) => {
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

	useEffect(() => {
		const handleMouseMove = (e) => {
			setMousePosition({
				x: e.clientX / window.innerWidth,
				y: e.clientY / window.innerHeight,
			});
		};

		window.addEventListener("mousemove", handleMouseMove);

		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
		};
	}, []);

	return (
		<div className="relative overflow-hidden min-h-screen">
			{/* Background blur elements */}
			<div className="fixed inset-0 -z-10 overflow-hidden bg-[#060818]">
				{/* Code pattern overlay - subtle hints of a programming environment */}
				<div
					className="absolute inset-0 opacity-[0.02]"
					style={{
						backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M35 15 L65 15 L65 35 L85 35 L85 65 L65 65 L65 85 L35 85 L35 65 L15 65 L15 35 L35 35 Z' stroke='%23FFFFFF' fill='none' stroke-width='0.5'/%3E%3C/svg%3E")`,
						backgroundSize: "60px 60px",
					}}
				></div>

				<motion.div
					className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-[130px] opacity-60"
					animate={{
						x: mousePosition.x * 20,
						y: mousePosition.y * 20,
					}}
					transition={{ type: "spring", damping: 50 }}
				/>
				<motion.div
					className="absolute top-1/4 right-1/4 w-96 h-96 bg-indigo-700 rounded-full mix-blend-multiply filter blur-[150px] opacity-50"
					animate={{
						x: mousePosition.x * -30,
						y: mousePosition.y * -30,
					}}
					transition={{ type: "spring", damping: 50 }}
				/>
				<motion.div
					className="absolute bottom-1/3 left-1/3 w-80 h-80 bg-cyan-700 rounded-full mix-blend-multiply filter blur-[120px] opacity-50"
					animate={{
						x: mousePosition.y * 40,
						y: mousePosition.x * 40,
					}}
					transition={{ type: "spring", damping: 50 }}
				/>
				<motion.div
					className="absolute -bottom-20 -right-20 w-72 h-72 bg-blue-800 rounded-full mix-blend-multiply filter blur-[100px] opacity-60"
					animate={{
						x: mousePosition.y * -20,
						y: mousePosition.x * -20,
					}}
					transition={{ type: "spring", damping: 50 }}
				/>

				{/* Additional tech-inspired elements */}
				<motion.div
					className="absolute top-1/2 left-1/5 w-40 h-40 border border-blue-400/10 rounded-md"
					style={{ rotate: 15 }}
					animate={{
						rotate: [15, 20, 15],
						opacity: [0.05, 0.07, 0.05],
					}}
					transition={{
						duration: 8,
						repeat: Infinity,
						ease: "easeInOut",
					}}
				/>

				<motion.div
					className="absolute bottom-1/4 right-1/4 w-60 h-60 border border-cyan-400/10 rounded-md"
					style={{ rotate: -10 }}
					animate={{
						rotate: [-10, -15, -10],
						opacity: [0.05, 0.08, 0.05],
					}}
					transition={{
						duration: 10,
						repeat: Infinity,
						ease: "easeInOut",
					}}
				/>

				{/* Dark overlay */}
				<div className="absolute inset-0 bg-[#060818] opacity-30 mix-blend-multiply"></div>

				{/* Gradient overlay */}
				<div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#060818] opacity-80"></div>

				{/* Noise texture */}
				<div className="absolute inset-0 bg-noise opacity-[0.03]"></div>

				{/* Fine grain overlay */}
				<div className="absolute inset-0 bg-grid-pattern opacity-[0.03]"></div>

				{/* API-inspired dots pattern */}
				<div
					className="absolute inset-0"
					style={{
						backgroundImage: `radial-gradient(circle, rgba(59, 130, 246, 0.1) 1px, transparent 1px)`,
						backgroundSize: "30px 30px",
						opacity: 0.05,
					}}
				></div>
			</div>

			{children}
		</div>
	);
};

export default AnimatedBackground;
