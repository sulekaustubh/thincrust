"use client";

import { useState, useEffect } from "react";
import { ProjectSection, ElementProps } from "@/lib/types";
import { getSectionVariantById } from "@/lib/sectionRegistry";
import FontPicker from "@/components/ui/FontPicker";

interface PropsPanelProps {
	selectedSection: ProjectSection | null;
	onUpdateProps: (sectionId: string, props: Record<string, unknown>) => void;
	selectedElementPath?: string | null;
	onUpdateElementProps?: (
		sectionId: string,
		elementPath: string,
		props: Record<string, unknown>
	) => void;
}

export default function PropsPanel({
	selectedSection,
	onUpdateProps,
	selectedElementPath,
	onUpdateElementProps,
}: PropsPanelProps) {
	const [localProps, setLocalProps] = useState<Record<string, unknown>>({});
	const [localElementProps, setLocalElementProps] = useState<ElementProps>(
		{}
	);

	// Update local props when selected section changes
	useEffect(() => {
		if (selectedSection) {
			const variant = getSectionVariantById(selectedSection.variantId);
			const mergedProps = {
				...variant?.defaultProps,
				...selectedSection.props,
			};
			setLocalProps(mergedProps);
		}
	}, [selectedSection]);

	// Update local element props when selected element changes
	useEffect(() => {
		if (selectedSection && selectedElementPath) {
			// Extract just the element path part (e.g., "h1:0" from "section-123.h1:0")
			const elementPath = selectedElementPath
				.split(".")
				.slice(1)
				.join(".");
			const elementProps =
				selectedSection.elementProps?.[elementPath] || {};
			setLocalElementProps(elementProps);
		} else {
			setLocalElementProps({});
		}
	}, [selectedSection, selectedElementPath]);

	// Debounced update function for section props
	useEffect(() => {
		if (!selectedSection || selectedElementPath) return;

		const timer = setTimeout(() => {
			onUpdateProps(selectedSection.id, localProps);
		}, 500);

		return () => clearTimeout(timer);
	}, [localProps, selectedSection, onUpdateProps, selectedElementPath]);

	// Debounced update function for element props
	useEffect(() => {
		if (!selectedSection || !selectedElementPath || !onUpdateElementProps)
			return;

		// Extract just the element path part
		const elementPath = selectedElementPath.split(".").slice(1).join(".");

		const timer = setTimeout(() => {
			onUpdateElementProps(
				selectedSection.id,
				elementPath,
				localElementProps
			);
		}, 500);

		return () => clearTimeout(timer);
	}, [
		localElementProps,
		selectedSection,
		selectedElementPath,
		onUpdateElementProps,
	]);

	const updateProp = (key: string, value: unknown) => {
		setLocalProps((prev) => ({ ...prev, [key]: value }));
	};

	const updateElementProp = (key: string, value: unknown) => {
		setLocalElementProps((prev) => ({ ...prev, [key]: value }));
	};

	const updateFeature = (index: number, field: string, value: string) => {
		const features = [...(localProps.features || [])];
		features[index] = { ...features[index], [field]: value };
		updateProp("features", features);
	};

	const addFeature = () => {
		const features = [...(localProps.features || [])];
		features.push({
			title: "New Feature",
			description: "Feature description",
			icon: "✨",
		});
		updateProp("features", features);
	};

	const removeFeature = (index: number) => {
		const features = [...(localProps.features || [])];
		features.splice(index, 1);
		updateProp("features", features);
	};

	if (!selectedSection) {
		return (
			<div className="w-80 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700 flex items-center justify-center">
				<div className="text-center text-gray-500 dark:text-gray-400">
					<div className="text-4xl mb-4">⚙️</div>
					<p className="text-sm">Select a section to edit</p>
				</div>
			</div>
		);
	}

	const variant = getSectionVariantById(selectedSection.variantId);
	const isElementSelected =
		selectedElementPath !== null && selectedElementPath !== undefined;

	return (
		<div className="w-80 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700 flex flex-col">
			{/* Header */}
			<div className="p-4 border-b border-gray-200 dark:border-gray-700">
				<h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
					{isElementSelected ? "Edit Element" : "Edit Section"}
				</h2>
				<p className="text-sm text-gray-500 dark:text-gray-400">
					{isElementSelected
						? `${variant?.name} > ${selectedElementPath
								?.split(".")
								.slice(1)
								.join(".")
								.replace(":", " ")}`
						: variant?.name}
				</p>
				{isElementSelected && (
					<div className="mt-2 text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
						Element:{" "}
						{selectedElementPath?.split(".").slice(1).join(".")}
					</div>
				)}
			</div>

			{/* Props Form */}
			<div className="flex-1 overflow-y-auto p-4 space-y-6">
				{isElementSelected ? (
					/* Element-level editing */
					<>
						{/* Text Content */}
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								Text Content
							</label>
							<textarea
								value={localElementProps.text || ""}
								onChange={(e) =>
									updateElementProp("text", e.target.value)
								}
								className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
								rows={3}
								placeholder="Override element text..."
							/>
						</div>

						{/* Typography */}
						<div className="space-y-4">
							<h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
								Typography
							</h3>

							<div>
								<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
									Font Size
								</label>
								<select
									value={localElementProps.fontSize || ""}
									onChange={(e) =>
										updateElementProp(
											"fontSize",
											e.target.value
										)
									}
									className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
								>
									<option value="">Default</option>
									<option value="text-xs">Extra Small</option>
									<option value="text-sm">Small</option>
									<option value="text-base">Base</option>
									<option value="text-lg">Large</option>
									<option value="text-xl">Extra Large</option>
									<option value="text-2xl">2X Large</option>
									<option value="text-3xl">3X Large</option>
									<option value="text-4xl">4X Large</option>
									<option value="text-5xl">5X Large</option>
									<option value="text-6xl">6X Large</option>
								</select>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
									Font Weight
								</label>
								<select
									value={localElementProps.fontWeight || ""}
									onChange={(e) =>
										updateElementProp(
											"fontWeight",
											e.target.value
										)
									}
									className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
								>
									<option value="">Default</option>
									<option value="font-thin">Thin</option>
									<option value="font-light">Light</option>
									<option value="font-normal">Normal</option>
									<option value="font-medium">Medium</option>
									<option value="font-semibold">
										Semibold
									</option>
									<option value="font-bold">Bold</option>
									<option value="font-extrabold">
										Extra Bold
									</option>
								</select>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
									Text Align
								</label>
								<select
									value={localElementProps.textAlign || ""}
									onChange={(e) =>
										updateElementProp(
											"textAlign",
											e.target.value
										)
									}
									className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
								>
									<option value="">Default</option>
									<option value="text-left">Left</option>
									<option value="text-center">Center</option>
									<option value="text-right">Right</option>
									<option value="text-justify">
										Justify
									</option>
								</select>
							</div>
						</div>

						{/* Colors */}
						<div className="space-y-4">
							<h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
								Colors
							</h3>

							<div>
								<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
									Text Color
								</label>
								<select
									value={localElementProps.color || ""}
									onChange={(e) =>
										updateElementProp(
											"color",
											e.target.value
										)
									}
									className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
								>
									<option value="">Default</option>
									<option value="text-black">Black</option>
									<option value="text-white">White</option>
									<option value="text-gray-500">Gray</option>
									<option value="text-gray-700">
										Dark Gray
									</option>
									<option value="text-blue-600">Blue</option>
									<option value="text-green-600">
										Green
									</option>
									<option value="text-red-600">Red</option>
									<option value="text-yellow-600">
										Yellow
									</option>
									<option value="text-purple-600">
										Purple
									</option>
									<option value="text-indigo-600">
										Indigo
									</option>
								</select>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
									Background Color
								</label>
								<select
									value={
										localElementProps.backgroundColor || ""
									}
									onChange={(e) =>
										updateElementProp(
											"backgroundColor",
											e.target.value
										)
									}
									className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
								>
									<option value="">Default</option>
									<option value="bg-transparent">
										Transparent
									</option>
									<option value="bg-white">White</option>
									<option value="bg-black">Black</option>
									<option value="bg-gray-100">
										Light Gray
									</option>
									<option value="bg-gray-800">
										Dark Gray
									</option>
									<option value="bg-blue-600">Blue</option>
									<option value="bg-green-600">Green</option>
									<option value="bg-red-600">Red</option>
									<option value="bg-yellow-600">
										Yellow
									</option>
									<option value="bg-purple-600">
										Purple
									</option>
									<option value="bg-indigo-600">
										Indigo
									</option>
								</select>
							</div>
						</div>

						{/* Spacing */}
						<div className="space-y-4">
							<h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
								Spacing
							</h3>

							<div>
								<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
									Padding
								</label>
								<select
									value={localElementProps.padding || ""}
									onChange={(e) =>
										updateElementProp(
											"padding",
											e.target.value
										)
									}
									className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
								>
									<option value="">Default</option>
									<option value="p-0">None</option>
									<option value="p-1">Small</option>
									<option value="p-2">Medium</option>
									<option value="p-4">Large</option>
									<option value="p-6">Extra Large</option>
									<option value="p-8">2X Large</option>
								</select>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
									Margin
								</label>
								<select
									value={localElementProps.margin || ""}
									onChange={(e) =>
										updateElementProp(
											"margin",
											e.target.value
										)
									}
									className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
								>
									<option value="">Default</option>
									<option value="m-0">None</option>
									<option value="m-1">Small</option>
									<option value="m-2">Medium</option>
									<option value="m-4">Large</option>
									<option value="m-6">Extra Large</option>
									<option value="m-8">2X Large</option>
								</select>
							</div>
						</div>

						{/* Border & Effects */}
						<div className="space-y-4">
							<h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
								Border & Effects
							</h3>

							<div>
								<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
									Border Radius
								</label>
								<select
									value={localElementProps.borderRadius || ""}
									onChange={(e) =>
										updateElementProp(
											"borderRadius",
											e.target.value
										)
									}
									className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
								>
									<option value="">Default</option>
									<option value="rounded-none">None</option>
									<option value="rounded-sm">Small</option>
									<option value="rounded">Medium</option>
									<option value="rounded-lg">Large</option>
									<option value="rounded-xl">
										Extra Large
									</option>
									<option value="rounded-full">Full</option>
								</select>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
									Border
								</label>
								<select
									value={localElementProps.border || ""}
									onChange={(e) =>
										updateElementProp(
											"border",
											e.target.value
										)
									}
									className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
								>
									<option value="">Default</option>
									<option value="border-0">None</option>
									<option value="border">Thin</option>
									<option value="border-2">Medium</option>
									<option value="border-4">Thick</option>
									<option value="border border-gray-300">
										Gray Border
									</option>
									<option value="border border-blue-500">
										Blue Border
									</option>
									<option value="border border-red-500">
										Red Border
									</option>
								</select>
							</div>
						</div>

						{/* Reset Button */}
						<div className="pt-4 border-t border-gray-200 dark:border-gray-700">
							<button
								onClick={() => {
									setLocalElementProps({});
									if (
										selectedSection &&
										selectedElementPath &&
										onUpdateElementProps
									) {
										// Extract just the element path part
										const elementPath = selectedElementPath
											.split(".")
											.slice(1)
											.join(".");
										onUpdateElementProps(
											selectedSection.id,
											elementPath,
											{}
										);
									}
								}}
								className="w-full px-3 py-2 text-sm font-medium text-red-600 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md hover:bg-red-100 dark:hover:bg-red-900/40"
							>
								Reset Element Styles
							</button>
						</div>
					</>
				) : (
					/* Section-level editing (existing code) */
					<>
						{/* Text Properties */}
						{localProps.heading !== undefined && (
							<div>
								<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
									Heading
								</label>
								<textarea
									value={localProps.heading || ""}
									onChange={(e) =>
										updateProp("heading", e.target.value)
									}
									className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
									rows={2}
								/>
							</div>
						)}

						{localProps.subheading !== undefined && (
							<div>
								<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
									Subheading
								</label>
								<textarea
									value={localProps.subheading || ""}
									onChange={(e) =>
										updateProp("subheading", e.target.value)
									}
									className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
									rows={3}
								/>
							</div>
						)}

						{localProps.ctaLabel !== undefined && (
							<div>
								<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
									CTA Button Text
								</label>
								<input
									type="text"
									value={localProps.ctaLabel || ""}
									onChange={(e) =>
										updateProp("ctaLabel", e.target.value)
									}
									className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
								/>
							</div>
						)}

						{localProps.ctaSecondaryLabel !== undefined && (
							<div>
								<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
									Secondary CTA Text
								</label>
								<input
									type="text"
									value={localProps.ctaSecondaryLabel || ""}
									onChange={(e) =>
										updateProp(
											"ctaSecondaryLabel",
											e.target.value
										)
									}
									className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
								/>
							</div>
						)}

						{/* Font Properties */}
						{localProps.headingFont !== undefined && (
							<FontPicker
								value={localProps.headingFont || "outfit"}
								onChange={(fontId) =>
									updateProp("headingFont", fontId)
								}
								label="Heading Font"
							/>
						)}

						{localProps.bodyFont !== undefined && (
							<FontPicker
								value={localProps.bodyFont || "outfit"}
								onChange={(fontId) =>
									updateProp("bodyFont", fontId)
								}
								label="Body Font"
							/>
						)}

						{/* Features Array */}
						{localProps.features &&
							Array.isArray(localProps.features) && (
								<div>
									<div className="flex items-center justify-between mb-3">
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
											Features
										</label>
										<button
											onClick={addFeature}
											className="px-2 py-1 text-xs font-medium text-blue-600 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/40"
										>
											+ Add
										</button>
									</div>
									<div className="space-y-3">
										{(
											localProps.features as Array<{
												title: string;
												description: string;
												icon: string;
											}>
										).map((feature, index: number) => (
											<div
												key={index}
												className="p-3 border border-gray-200 dark:border-gray-700 rounded-md"
											>
												<div className="flex items-center justify-between mb-2">
													<span className="text-sm font-medium text-gray-700 dark:text-gray-300">
														Feature {index + 1}
													</span>
													<button
														onClick={() =>
															removeFeature(index)
														}
														className="text-red-500 hover:text-red-700 text-sm"
													>
														Remove
													</button>
												</div>
												<div className="space-y-2">
													<input
														type="text"
														value={
															feature.icon || ""
														}
														onChange={(e) =>
															updateFeature(
																index,
																"icon",
																e.target.value
															)
														}
														placeholder="Icon (emoji)"
														className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
													/>
													<input
														type="text"
														value={
															feature.title || ""
														}
														onChange={(e) =>
															updateFeature(
																index,
																"title",
																e.target.value
															)
														}
														placeholder="Feature title"
														className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
													/>
													<textarea
														value={
															feature.description ||
															""
														}
														onChange={(e) =>
															updateFeature(
																index,
																"description",
																e.target.value
															)
														}
														placeholder="Feature description"
														rows={2}
														className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
													/>
												</div>
											</div>
										))}
									</div>
								</div>
							)}

						{/* Image URL */}
						{localProps.image !== undefined && (
							<div>
								<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
									Background Image URL
								</label>
								<input
									type="url"
									value={localProps.image || ""}
									onChange={(e) =>
										updateProp("image", e.target.value)
									}
									className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
									placeholder="https://..."
								/>
							</div>
						)}

						{/* Style Properties */}
						<div className="pt-4 border-t border-gray-200 dark:border-gray-700">
							<h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
								Styling
							</h3>

							{localProps.backgroundColor !== undefined && (
								<div className="mb-4">
									<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
										Background
									</label>
									<select
										value={localProps.backgroundColor || ""}
										onChange={(e) =>
											updateProp(
												"backgroundColor",
												e.target.value
											)
										}
										className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
									>
										<option value="bg-white">White</option>
										<option value="bg-gray-50">
											Light Gray
										</option>
										<option value="bg-gray-900">
											Dark Gray
										</option>
										<option value="bg-gradient-to-br from-gray-900 to-black">
											Dark Gradient
										</option>
										<option value="bg-gradient-to-r from-blue-600 to-purple-600">
											Blue to Purple
										</option>
										<option value="bg-gradient-to-r from-green-400 to-blue-500">
											Green to Blue
										</option>
									</select>
								</div>
							)}

							{localProps.textColor !== undefined && (
								<div>
									<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
										Text Color
									</label>
									<select
										value={localProps.textColor || ""}
										onChange={(e) =>
											updateProp(
												"textColor",
												e.target.value
											)
										}
										className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
									>
										<option value="text-gray-900">
											Dark Text
										</option>
										<option value="text-white">
											White Text
										</option>
										<option value="text-gray-600">
											Gray Text
										</option>
										<option value="text-blue-600">
											Blue Text
										</option>
									</select>
								</div>
							)}
						</div>
					</>
				)}
			</div>
		</div>
	);
}
