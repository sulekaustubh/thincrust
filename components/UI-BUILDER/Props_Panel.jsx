import React from "react";
import useActiveElementStore from "@/zustand/active_element";
import useVariantStore from "@/zustand/array_preview";

function Props_Panel() {
	const { activeVariant, setActiveVariant } = useActiveElementStore();
	const { updateVariant } = useVariantStore();

	const handlePropChange = (propKey, newValue) => {
		if (!activeVariant) return;

		// Update the active variant with new prop value
		const updatedActiveVariant = {
			...activeVariant,
			props: {
				...activeVariant.props,
				[propKey]: newValue,
			},
		};

		// Update the active variant in the active element store
		setActiveVariant(updatedActiveVariant);

		// Update the variant in the variants array using the efficient method
		updateVariant(activeVariant.componentName, updatedActiveVariant);
	};

	return (
		<div className="p-4">
			{/* <h2 className="text-lg font-semibold mb-4">Active Variant</h2> */}
			{activeVariant ? (
				<div className="space-y-4">
					<div className="p-3 bg-blue-50 border border-blue-200 rounded">
						<h3 className="font-medium text-blue-900 mb-2">
							Component Name
						</h3>
						<p className="text-blue-800 font-mono">
							{activeVariant.componentName}
						</p>
					</div>

					{/* <div className="p-3 bg-gray-50 border border-gray-200 rounded">
						<h3 className="font-medium text-gray-900 mb-2">
							Section
						</h3>
						<p className="text-gray-700">
							{activeVariant.sectionName}
						</p>
					</div> */}

					{/* <div className="p-3 bg-gray-50 border border-gray-200 rounded">
						<h3 className="font-medium text-gray-900 mb-2">
							Variant
						</h3>
						<p className="text-gray-700">
							{activeVariant.variantName}
						</p>
					</div> */}

					{activeVariant.props &&
					Object.keys(activeVariant.props).length > 0 ? (
						<div className="p-3 bg-green-50 border border-green-200 rounded">
							<h3 className="font-medium text-green-900 mb-3">
								Props ({Object.keys(activeVariant.props).length}
								)
							</h3>
							<div className="space-y-3">
								{Object.entries(activeVariant.props).map(
									([key, value]) => (
										<div
											key={key}
											className="space-y-1"
										>
											<label
												htmlFor={`prop-${key}`}
												className="block text-sm font-medium text-green-800 capitalize"
											>
												{key}
											</label>
											<input
												id={`prop-${key}`}
												type="text"
												value={value || ""}
												onChange={(e) =>
													handlePropChange(
														key,
														e.target.value
													)
												}
												className="w-full text-black px-2 py-2 text-sm border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
												placeholder={`Enter ${key}...`}
											/>
										</div>
									)
								)}
							</div>
						</div>
					) : (
						<div className="p-3 bg-gray-50 border border-gray-200 rounded">
							<p className="text-gray-600 text-sm">
								No props available for this component
							</p>
						</div>
					)}

					{/* <div className="p-3 bg-gray-100 border border-gray-300 rounded">
						<h3 className="font-medium text-gray-900 mb-2">
							File Path
						</h3>
						<p className="text-xs text-gray-600 font-mono break-all">
							{activeVariant.filePath}
						</p>
					</div> */}
				</div>
			) : (
				<div className="text-center py-8">
					<p className="text-gray-500 mb-2">No variant selected</p>
					<p className="text-sm text-gray-400">
						Click on a component in the preview to select it
					</p>
				</div>
			)}
		</div>
	);
}

export default Props_Panel;
