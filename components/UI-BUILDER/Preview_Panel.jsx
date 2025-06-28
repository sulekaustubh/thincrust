import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import useVariantStore from "../../zustand/array_preview";
import useActiveElementStore from "../../zustand/active_element";

// Dynamic component renderer
const DynamicComponent = ({
	componentName,
	variant,
	onSelect,
	isActive,
	props,
}) => {
	const [Component, setComponent] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [componentSource, setComponentSource] = useState("");
	const [retryCount, setRetryCount] = useState(0);

	useEffect(() => {
		const loadComponent = async () => {
			try {
				setLoading(true);
				setError(null);

				console.log(
					`🔄 Loading component: ${componentName} (attempt ${
						retryCount + 1
					})`
				);

				// Add a small delay to ensure file is written to disk
				if (retryCount === 0) {
					await new Promise((resolve) => setTimeout(resolve, 100));
				}

				// First check if file exists
				try {
					const checkResponse = await fetch(
						`/api/get-component-source?name=${componentName}&check=true`
					);
					if (!checkResponse.ok) {
						throw new Error(
							`Component file not found: ${componentName}`
						);
					}
				} catch (checkError) {
					throw new Error(
						`Component file not found: ${componentName}`
					);
				}

				// Dynamic import from Preview_Components folder with cache busting for new components
				const cacheBuster = retryCount > 0 ? `?t=${Date.now()}` : "";
				const module = await import(
					`../Preview_Components/${componentName}.jsx${cacheBuster}`
				);
				setComponent(() => module.default);

				// Also fetch the source code as text for prop extraction
				try {
					const response = await fetch(
						`/api/get-component-source?name=${componentName}`
					);
					if (response.ok) {
						const source = await response.text();
						setComponentSource(source);
					}
				} catch (err) {
					console.warn("Could not fetch component source:", err);
				}

				console.log(
					`✅ Successfully loaded component: ${componentName}`
				);
				setRetryCount(0); // Reset retry count on success
			} catch (err) {
				console.error(
					`❌ Failed to load component ${componentName} (attempt ${
						retryCount + 1
					}):`,
					err
				);

				// Retry logic for newly created components
				if (
					retryCount < 3 &&
					(err.message.includes("Cannot find module") ||
						err.message.includes("unknown"))
				) {
					console.log(
						`🔄 Retrying to load ${componentName} in 500ms...`
					);
					setTimeout(() => {
						setRetryCount((prev) => prev + 1);
					}, 500);
					return; // Don't set error state yet, we're retrying
				}

				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		if (componentName) {
			loadComponent();
		}
	}, [componentName, retryCount]);

	// Function to find prop name based on rendered text content
	const findPropNameForContent = (textContent) => {
		if (!textContent || !props) return null;

		// Find which prop value matches the text content
		for (const [propKey, propValue] of Object.entries(props)) {
			if (
				propValue &&
				propValue.toString().trim() === textContent.trim()
			) {
				return propKey;
			}
		}
		return null;
	};

	// Function to update element content and styles
	const updateElement = (element, newText, newClassName) => {
		if (newText !== undefined) {
			element.textContent = newText;
			console.log(`✏️ Updated textContent to: "${newText}"`);
		}
		if (newClassName !== undefined) {
			element.className = newClassName;
			console.log(`🎨 Updated className to: "${newClassName}"`);
		}
	};

	// Function to write changes to the actual JSX file
	const writeChangesToFile = async (
		element,
		componentName,
		newText,
		newClassName
	) => {
		const tagName = element.tagName.toLowerCase();
		const originalClassName = element.className;
		const textContent = element.textContent?.trim();
		const propName = findPropNameForContent(textContent);

		try {
			const response = await fetch("/api/update-component", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					componentName: componentName,
					updates: [
						{
							selector: {
								tagName,
								originalClassName,
								propName,
								textContent,
							},
							newText,
							newClassName,
						},
					],
				}),
			});

			const result = await response.json();

			if (result.success) {
				console.log(
					`💾 Successfully wrote changes to file: ${result.message}`
				);

				// Also update the DOM for immediate visual feedback
				updateElement(element, newText, newClassName);
			} else {
				console.error("❌ Failed to write to file:", result.error);
			}
		} catch (error) {
			console.error("❌ API call failed:", error);
		}
	};

	// Test function to demonstrate file writing
	const testFileUpdate = async (element, componentName) => {
		const tagName = element.tagName.toLowerCase();

		// Example updates that will be written to the actual file
		if (tagName === "h1") {
			await writeChangesToFile(
				element,
				componentName,
				"🚀 PERMANENTLY UPDATED TITLE!",
				element.className + " animate-pulse"
			);
		} else if (tagName === "p") {
			await writeChangesToFile(
				element,
				componentName,
				"This text was permanently changed!",
				element.className + " text-rose-400"
			);
		} else if (tagName === "button") {
			await writeChangesToFile(
				element,
				componentName,
				"SAVED!",
				element.className.replace("bg-blue-500", "bg-green-500")
			);
		} else {
			// For other elements, just update className
			await writeChangesToFile(
				element,
				componentName,
				undefined,
				element.className + " border-2 border-red-500"
			);
		}
	};

	if (loading) {
		return (
			<div className="p-8 flex items-center justify-center bg-gray-50">
				<div className="text-center">
					<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
					<p className="text-gray-600">
						Loading {componentName}...
						{retryCount > 0 && ` (attempt ${retryCount + 1})`}
					</p>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="p-4 bg-red-100 border border-red-400 rounded">
				<p className="text-red-700">Error loading {componentName}</p>
				<p className="text-sm text-red-600">{error}</p>
			</div>
		);
	}

	if (!Component) {
		return (
			<div className="p-4 bg-yellow-100 border border-yellow-400 rounded">
				<p className="text-yellow-700">
					Component {componentName} not found
				</p>
			</div>
		);
	}

	return (
		<div
			className={`cursor-pointer transition-all duration-200 ${
				isActive
					? "ring-1 ring-blue-500 "
					: "hover:ring-1 hover:ring-gray-300"
			}`}
			onClick={(e) => {
				// Handle className extraction for any element with className
				if (e.target.className) {
					const tagName = e.target.tagName.toLowerCase();
					const textContent = e.target.textContent?.trim() || "";
					// const innerHTML = e.target.innerHTML;
					const propName = findPropNameForContent(textContent);

					console.log(`🎯 Clicked ${tagName}:`);
					console.log(`   className: ${e.target.className}`);
					console.log(`   textContent: "${textContent}"`);
					if (propName) {
						console.log(`   propName: ${propName}`);
					}
					// console.log(`   innerHTML: "${innerHTML}"`);

					// DEMONSTRATE DYNAMIC UPDATING
					console.log(`🔄 Applying dynamic update...`);
					testFileUpdate(e.target, componentName);

					e.stopPropagation(); // Prevent variant selection when clicking on inner elements
					return; // Exit early to avoid variant selection
				}

				// Handle variant selection (only if no className was found)
				onSelect(variant);
			}}
			onMouseOver={(e) => {
				// Add blue outline to hovered element with className
				if (e.target.className && e.target !== e.currentTarget) {
					e.target.style.outline = "2px solid #3b82f6";
					e.target.style.outlineOffset = "1px";
					e.stopPropagation();
				}
			}}
			onMouseOut={(e) => {
				// Remove blue outline when mouse leaves
				if (e.target.className && e.target !== e.currentTarget) {
					e.target.style.outline = "";
					e.target.style.outlineOffset = "";
					e.stopPropagation();
				}
			}}
		>
			<Component props={props} />
		</div>
	);
};

function Preview_Panel({ isChanged, setIsChanged }) {
	const { variants, clearAllVariants } = useVariantStore();
	const { activeVariant, setActiveVariant } = useActiveElementStore();

	// console.log(variants);

	const handleVariantSelect = (variant) => {
		setActiveVariant(variant);
		console.log("Selected variant:", variant);
	};

	return (
		<div className="p-4 space-y-4">
			<div className="flex sticky top-4  justify-between items-center mb-4">
				<h2 className="text-lg font-semibold">Preview Components</h2>
				<button
					onClick={clearAllVariants}
					className="px-3 py-1 text-sm bg-rose-500 text-white rounded hover:bg-rose-600 transition"
				>
					Clear All
				</button>
			</div>

			{variants.length === 0 ? (
				<div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
					<p className="text-gray-500 mb-2">No components found</p>
					<p className="text-sm text-gray-400">
						Add some components to see them here
					</p>
				</div>
			) : (
				<div className="space-y-0 ">
					{variants.map((variant, index) => (
						<div
							key={`${variant.componentName}-${index}`}
							className=""
						>
							<div className="">
								<DynamicComponent
									props={variant.props}
									componentName={variant.componentName}
									variant={variant}
									onSelect={handleVariantSelect}
									isActive={
										activeVariant?.componentName ===
										variant.componentName
									}
								/>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}

export default Preview_Panel;
