import React from "react";

// Placeholder icons - in a real app, these would be actual SVG icons or image components
const PlusIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		strokeWidth={1.5}
		stroke="currentColor"
		className="w-5 h-5 text-gray-400"
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M12 4.5v15m7.5-7.5h-15"
		/>
	</svg>
);
const DraggableIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		strokeWidth={1.5}
		stroke="currentColor"
		className="w-4 h-4 text-gray-500 mr-2"
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M3.75 9h16.5m-16.5 6.75h16.5"
		/>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 6.75h16.5M3.75 15h16.5"
		/>
	</svg>
);

function Features2() {
	// State for the toggle switch
	const [isMembershipActive, setIsMembershipActive] = React.useState(true);

	return (
		<div className="min-h-screen bg-[#0D0F19] text-white p-6 font-sans">
			<div className="max-w-6xl mx-auto">
				{/* Header Section */}
				<div className="text-center mb-8">
					<span className="inline-block bg-[#2C2A43] text-[#A075F0] px-3 py-1 rounded-full text-xs font-medium mb-3">
						Benefits
					</span>
					<h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 leading-tight">
						Only design agency, you'll{" "}
						<span className="text-[#A075F0] underline">
							ever need
						</span>
					</h1>
					<p className="text-sm md:text-base text-gray-400 max-w-xl mx-auto">
						Our simple 3 step process designed to take all design
						operations
						<br />
						from your plate We have worked with 40+ happy clients.
					</p>
				</div>

				{/* Bento Grid Section */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[600px]">
					{/* Left Column */}
					<div className="flex flex-col gap-4">
						{/* Design board card - Large */}
						<div className="bg-[#171A2C] p-5 rounded-xl flex-1">
							<h2 className="text-lg font-semibold mb-1 text-white">
								Design board
							</h2>
							<p className="text-gray-400 mb-4 text-xs">
								Add as many design requests to your board as
								you'd like.
							</p>
							<div className="bg-[#0D0F19] p-3 rounded-lg flex-1 flex flex-col">
								<div className="flex justify-between items-center mb-3">
									<span className="text-gray-300 font-medium text-sm">
										Todo
									</span>
									<PlusIcon />
								</div>
								<div className="space-y-2 flex-1">
									<div className="flex items-center bg-[#2C2A43] p-2.5 rounded-md">
										<DraggableIcon />
										<span className="text-white text-xs">
											Create "About Us" webpage
										</span>
									</div>
									<div className="flex items-center bg-[#2C2A43] p-2.5 rounded-md">
										<DraggableIcon />
										<span className="text-white text-xs">
											Create Visuals for Social Media
										</span>
									</div>
								</div>
							</div>
						</div>

						{/* Bottom row - 3 small cards */}
						<div className="grid grid-cols-3 gap-4 h-32">
							{/* Top-notch quality card */}
							<div className="bg-[#171A2C] p-4 rounded-xl flex flex-col">
								<h3 className="text-sm font-semibold mb-1 text-white">
									Top- notch quality
								</h3>
								<p className="text-gray-400 text-xs mb-2 flex-1">
									Insane design quality at your fingertips
									whenever you need it.
								</p>
								<div className="bg-[#0D0F19] rounded-lg flex items-center justify-center h-8">
									<span className="text-2xl">💎</span>
								</div>
							</div>

							{/* Fixed Monthly Rate card */}
							<div className="bg-[#171A2C] p-4 rounded-xl flex flex-col">
								<h3 className="text-sm font-semibold mb-1 text-white">
									Fixed Monthly Rate
								</h3>
								<p className="text-gray-400 text-xs mb-2 flex-1">
									No surprises here! Pay the same fixed price
									each month
								</p>
								<div className="bg-[#0D0F19] rounded-lg flex items-center justify-center h-8">
									<span className="text-2xl">🔄</span>
								</div>
							</div>

							{/* Unique and all yours card */}
							<div className="bg-[#171A2C] p-4 rounded-xl flex flex-col">
								<h3 className="text-sm font-semibold mb-1 text-white">
									Unique and all yours
								</h3>
								<p className="text-gray-400 text-xs mb-2 flex-1">
									Each of your designs is made especially for
									you and is 100% yours
								</p>
								<div className="bg-[#0D0F19] rounded-lg flex items-center justify-center h-8">
									<span className="text-2xl">🖐️</span>
								</div>
							</div>
						</div>
					</div>

					{/* Right Column */}
					<div className="flex flex-col gap-4">
						{/* Lightning Fast Delivery card */}
						<div className="bg-[#171A2C] p-5 rounded-xl flex flex-col flex-1">
							<h2 className="text-lg font-semibold mb-1 text-white">
								Lightning Fast Delivery
							</h2>
							<p className="text-gray-400 mb-4 text-xs">
								Get your design one at a time in just a few days
								on average.
							</p>
							<div className="bg-[#0D0F19] rounded-lg flex items-center justify-center flex-1">
								<span className="text-6xl">⚡️</span>
							</div>
						</div>

						{/* Flexible and scalable card */}
						<div className="bg-[#171A2C] p-5 rounded-xl h-32">
							<h2 className="text-sm font-semibold mb-1 text-white">
								Flexible and scalable
							</h2>
							<p className="text-gray-400 mb-4 text-xs">
								Scale up or down as needed, and pause or cancel
								at anytime.
							</p>

							<div className="bg-[#0D0F19] p-2.5 rounded-lg flex items-center justify-between">
								<div className="flex items-center">
									<div
										className={`w-2 h-2 rounded-full mr-2 ${
											isMembershipActive
												? "bg-[#A075F0]"
												: "bg-gray-600"
										}`}
									></div>
									<span className="text-white text-xs font-medium">
										Your Membership is active
									</span>
								</div>
								<button
									onClick={() =>
										setIsMembershipActive(
											!isMembershipActive
										)
									}
									className={`w-9 h-5 flex items-center rounded-full p-0.5 duration-300 ease-in-out ${
										isMembershipActive
											? "bg-[#A075F0]"
											: "bg-gray-700"
									}`}
								>
									<div
										className={`w-4 h-4 bg-white rounded-full shadow-md transform duration-300 ease-in-out ${
											isMembershipActive
												? "translate-x-4"
												: "translate-x-0"
										}`}
									></div>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Features2;
