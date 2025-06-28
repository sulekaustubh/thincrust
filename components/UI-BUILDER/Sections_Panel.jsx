import React, { useState } from "react";
import useVariantStore from "../../zustand/array_preview";

function Sections_Panel({ isChanged, setIsChanged }) {
	const [activeSection, setActiveSection] = useState(null);
	const { addVariant } = useVariantStore();

	// Simplified function - no more string manipulation needed
	const createComponentFile = async (variant) => {
		try {
			const response = await fetch("/api/create-component", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					fileName: variant.fileName,
					filePath: variant.filePath,
					code: variant.code,
					componentName: variant.componentName,
				}),
			});

			if (!response.ok) {
				throw new Error(
					`Failed to create component file: ${response.statusText}`
				);
			}

			const result = await response.json();
			console.log(
				`✅ Created component file: ${variant.fileName}`,
				result
			);

			return {
				success: true,
				componentName: variant.componentName,
				filePath: variant.filePath,
				message: result.message,
			};
		} catch (error) {
			console.error("❌ Error creating component file:", error);
			return {
				success: false,
				error: error.message,
			};
		}
	};

	const sections = [
		{
			id: 1,
			name: "Hero",
			variants: [
				{
					name: "default",
					componentName: "Hero_Default",
					fileName: "Hero_Default.jsx",
					filePath: "components/Preview_Components/Hero_Default.jsx",
					code: `import React from "react";

function Hero_Default() {
	return (
		<div className="h-[80vh] flex flex-col justify-center items-center bg-blue-200 p-8 text-center">
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

export default Hero_Default;`,
				},
				{
					name: "variant-1",
					props: { title: "titl", subtitle: "subttle", cta: "ctaz" },
					componentName: "Hero_Variant1",
					fileName: "Hero_Variant1.jsx",
					filePath: "components/Preview_Components/Hero_Variant1.jsx",
					code: `import React from "react";

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

export default Hero_Variant1;`,
				},
				{
					name: "variant-2",
					props: {
						title: "titl",
						subtitle: "subttle",
						cta1: "cta1",
						cta2: "cta2",
					},
					componentName: "Hero_Variant2",
					fileName: "Hero_Variant2.jsx",
					filePath: "components/Preview_Components/Hero_Variant2.jsx",
					code: `import React from "react";

function Hero_Variant2({props}) {
    const {title, subtitle, cta1, cta2} = props;
	return (
		<div className="h-[70vh] flex items-center justify-between bg-gray-900 p-12">
			<div className="flex-1 text-left">
				<h1 className="text-4xl font-bold text-white mb-4">
					{title}
				</h1>
				<p className="text-lg text-gray-300 mb-8 max-w-md">
					{subtitle}
				</p>
				<div className="flex gap-4">
					<button className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
						{cta1}
					</button>
					<button className="px-6 py-3 border border-white text-white rounded hover:bg-white hover:text-gray-900 transition">
						{cta2}
					</button>
				</div>
			</div>
			<div className="flex-1 flex justify-center">
				<div className="w-64 h-64 bg-blue-500 rounded-lg"></div>
			</div>
		</div>
	);
}

export default Hero_Variant2;`,
				},
			],
			description: "Hero section",
		},
	];

	const handleAddVariant = async (section, variant) => {
		console.log(`🚀 Creating component: ${variant.componentName}`);

		const result = await createComponentFile(variant);

		if (result.success) {
			console.log(
				`✅ File created successfully: ${result.componentName}`
			);

			// Clear cache to ensure fresh imports
			try {
				await fetch("/api/clear-cache", { method: "POST" });
			} catch (cacheError) {
				console.warn("Could not clear cache:", cacheError);
			}

			// Add a small delay to ensure file is fully written before adding to store
			await new Promise((resolve) => setTimeout(resolve, 200));

			addVariant({
				sectionName: section.name,
				variantName: variant.name,
				props: variant.props,
				// code: variant.code,
				componentName: result.componentName,
				filePath: result.filePath,
			});
			setIsChanged(isChanged + 1);
		} else {
			console.error(
				`❌ Failed to create component file: ${result.error}`
			);
			alert(`Failed to create component: ${result.error}`);
		}
	};

	return (
		<div>
			<div>
				{sections.map((section) => (
					<div
						key={section.id}
						className="mb-2"
					>
						<button
							onClick={() =>
								setActiveSection(
									activeSection === section.id
										? null
										: section.id
								)
							}
							className="text-left w-full p-2 hover:bg-gray-800 rounded"
						>
							{section.name}
						</button>
						{activeSection === section.id && (
							<div className="ml-4 mt-1 space-y-1">
								{section.variants.map((variant) => (
									<div
										key={variant.name}
										className="p-1 bg-red-500"
									>
										<div className="flex justify-between">
											<div>{variant.name}</div>
											<button
												onClick={() =>
													handleAddVariant(
														section,
														variant
													)
												}
												className="text-white"
											>
												+
											</button>
										</div>
									</div>
								))}
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
}

export default Sections_Panel;
