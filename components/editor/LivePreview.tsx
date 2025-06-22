"use client";

import { useCallback, useEffect, useState } from "react";
import { ProjectSection } from "@/lib/types";
import { getSectionVariantById } from "@/lib/sectionRegistry";
import ReactFlow, {
	Background,
	Controls,
	MiniMap,
	useNodesState,
	useEdgesState,
	Node,
	NodeProps,
} from "reactflow";
import "reactflow/dist/style.css";
import {
	Square3Stack3DIcon,
	DevicePhoneMobileIcon,
	ComputerDesktopIcon,
} from "@heroicons/react/24/outline";

// Main Website Preview Container Node
const WebsitePreviewNode = ({ data }: NodeProps) => {
	const {
		sections,
		selectedSectionId,
		onSelectSection,
		viewMode,
		selectedElementPath,
		onSelectElement,
	} = data;

	const containerWidth = viewMode === "mobile" ? 375 : 1200;

	return (
		<div
			className="bg-white shadow-2xl rounded-lg overflow-hidden border border-gray-200"
			style={{ width: containerWidth, pointerEvents: "all" }}
		>
			{/* Website Header/Title */}
			<div className="bg-gray-100 border-b border-gray-200 px-4 py-2 flex items-center justify-between">
				<div className="flex items-center space-x-2">
					<div className="flex space-x-1">
						<div className="w-3 h-3 bg-red-400 rounded-full"></div>
						<div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
						<div className="w-3 h-3 bg-green-400 rounded-full"></div>
					</div>
					<div className="text-xs text-gray-600 font-mono">
						{viewMode === "mobile"
							? "📱 Mobile Preview"
							: "💻 Desktop Preview"}
					</div>
				</div>
				<div className="text-xs text-gray-500">
					{sections.length} sections
				</div>
			</div>

			{/* Website Content */}
			<div
				className="relative"
				style={{ pointerEvents: "all" }}
			>
				{sections.length === 0 ? (
					<div className="flex items-center justify-center py-32 text-center">
						<div className="text-gray-400">
							<div className="text-4xl mb-4">📄</div>
							<h3 className="text-lg font-medium mb-2">
								Empty Website
							</h3>
							<p className="text-sm">
								Add sections from the left panel
							</p>
						</div>
					</div>
				) : (
					<div className="relative">
						{sections.map((section: ProjectSection) => {
							const variant = getSectionVariantById(
								section.variantId
							);
							const isSelected = section.id === selectedSectionId;

							if (!variant) {
								return (
									<div
										key={section.id}
										className="p-8 bg-red-50 border border-red-200 text-red-600"
									>
										<p>
											Unknown section variant:{" "}
											{section.variantId}
										</p>
									</div>
								);
							}

							const SectionComponent = variant.component;
							const mergedProps = {
								...variant.defaultProps,
								...section.props,
								sectionId: section.id,
								elementProps: section.elementProps || {},
								selectedElementPath: selectedElementPath,
							};

							return (
								<div
									key={section.id}
									className={`
											relative transition-all duration-200 border-2
											${
												isSelected
													? "border-blue-500 bg-blue-50"
													: "border-transparent hover:border-gray-300"
											}
										`}
									style={{ pointerEvents: "all" }}
								>
									{/* Selection indicator */}
									{isSelected && (
										<div className="absolute top-2 left-2 z-10 px-3 py-1 text-xs font-medium text-white bg-blue-500 rounded shadow-md">
											✓ {variant.name}
										</div>
									)}

									{/* Debug button for testing selection */}
									<button
										className="absolute top-2 right-2 z-10 px-2 py-1 text-xs bg-red-500 text-white rounded"
										onClick={(e) => {
											e.stopPropagation();
											e.preventDefault();
											console.log(
												"DEBUG: Direct button click for section:",
												section.id
											);
											onSelectSection(section.id);
										}}
									>
										Select {variant.name}
									</button>

									{/* Element selection overlay */}
									<div
										className="relative group cursor-pointer"
										onMouseDown={(e) => {
											e.stopPropagation();
											console.log(
												"Section clicked:",
												section.id
											);
											onSelectSection(section.id);
										}}
										style={{ pointerEvents: "all" }}
									>
										{/* Render the actual section with element selection */}
										<div
											className={`${
												viewMode === "mobile"
													? "scale-90 origin-top"
													: ""
											} relative`}
											onClick={(e) => {
												// Handle element-level selection only if section is already selected
												if (isSelected) {
													const target =
														e.target as HTMLElement;

													// Only handle elements with data-element-path
													if (
														target.hasAttribute(
															"data-element-path"
														)
													) {
														const elementPath =
															target.getAttribute(
																"data-element-path"
															);

														if (
															elementPath &&
															onSelectElement
														) {
															e.stopPropagation();
															e.preventDefault();
															const fullPath = `${section.id}.${elementPath}`;
															onSelectElement(
																fullPath
															);
														}
													}
												}
											}}
											style={{ pointerEvents: "all" }}
										>
											{/* Element hover highlights when section is selected */}
											{isSelected && (
												<style jsx>{`
													[data-element-path] {
														cursor: pointer;
														transition: all 0.2s
															ease;
														position: relative;
													}
													[data-element-path]:hover {
														outline: 2px solid
															#3b82f6;
														outline-offset: 2px;
														background-color: rgba(
															59,
															130,
															246,
															0.1
														) !important;
													}
													[data-element-path].selected-element {
														outline: 3px solid
															#10b981;
														outline-offset: 2px;
														background-color: rgba(
															16,
															185,
															129,
															0.1
														) !important;
													}
												`}</style>
											)}
											<SectionComponent
												{...mergedProps}
											/>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				)}
			</div>
		</div>
	);
};

const nodeTypes = {
	websitePreview: WebsitePreviewNode,
};

interface LivePreviewProps {
	sections: ProjectSection[];
	selectedSectionId: string | null;
	onSelectSection: (sectionId: string) => void;
	selectedElementPath?: string | null;
	onSelectElement?: (elementPath: string | null) => void;
}

export default function LivePreview({
	sections,
	selectedSectionId,
	onSelectSection,
	selectedElementPath,
	onSelectElement,
}: LivePreviewProps) {
	const [nodes, setNodes, onNodesChange] = useNodesState([]);
	const [edges, ,] = useEdgesState([]);
	const [viewMode, setViewMode] = useState<"desktop" | "mobile">("desktop");

	// Create the main website preview node
	useEffect(() => {
		const websiteNode: Node = {
			id: "website-preview",
			type: "websitePreview",
			position: { x: 100, y: 100 },
			data: {
				sections,
				selectedSectionId,
				onSelectSection,
				viewMode,
				selectedElementPath,
				onSelectElement,
			},
			draggable: false, // Main container shouldn't be draggable
			selectable: false,
			focusable: false,
			style: {
				pointerEvents: "all",
			},
		};

		setNodes([websiteNode]);
	}, [
		sections,
		selectedSectionId,
		onSelectSection,
		viewMode,
		selectedElementPath,
		onSelectElement,
		setNodes,
	]);

	// Handle canvas click to deselect sections
	const handlePaneClick = useCallback(() => {
		onSelectSection("");
		onSelectElement?.(null);
	}, [onSelectSection, onSelectElement]);

	return (
		<div className="flex-1 bg-gray-50 dark:bg-gray-800 h-full">
			{/* Preview Header */}
			<div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-4">
				<div className="flex items-center justify-between">
					<div className="flex items-center space-x-2">
						<Square3Stack3DIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
						<h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
							Canvas Preview
						</h2>
						<div className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
							{sections.length} sections
						</div>
						{selectedElementPath && (
							<div className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded flex items-center space-x-2">
								<span>
									Element:{" "}
									{selectedElementPath.split(".").pop()}
								</span>
								<button
									onClick={() => onSelectElement?.(null)}
									className="ml-2 text-red-500 hover:text-red-700 font-bold"
									title="Clear element selection"
								>
									×
								</button>
							</div>
						)}
					</div>
					<div className="flex items-center space-x-2">
						<button
							onClick={() => setViewMode("desktop")}
							className={`px-3 py-1 text-xs font-medium rounded border flex items-center space-x-1 ${
								viewMode === "desktop"
									? "bg-blue-100 text-blue-700 border-blue-300"
									: "text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 border-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
							}`}
						>
							<ComputerDesktopIcon className="w-3 h-3" />
							<span>Desktop</span>
						</button>
						<button
							onClick={() => setViewMode("mobile")}
							className={`px-3 py-1 text-xs font-medium rounded border flex items-center space-x-1 ${
								viewMode === "mobile"
									? "bg-blue-100 text-blue-700 border-blue-300"
									: "text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-900 border-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
							}`}
						>
							<DevicePhoneMobileIcon className="w-3 h-3" />
							<span>Mobile</span>
						</button>
					</div>
				</div>
			</div>

			{/* ReactFlow Canvas */}
			<div className="h-full">
				<ReactFlow
					nodes={nodes}
					edges={edges}
					onNodesChange={onNodesChange}
					onPaneClick={handlePaneClick}
					nodeTypes={nodeTypes}
					fitView={true}
					fitViewOptions={{ padding: 50 }}
					defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
					minZoom={0.2}
					maxZoom={1.5}
					attributionPosition="bottom-left"
					className="bg-black"
					nodesDraggable={false}
					nodesConnectable={false}
					elementsSelectable={false}
					panOnScroll={true}
					zoomOnScroll={false}
					zoomOnPinch={true}
					panOnDrag={true}
					selectNodesOnDrag={false}
					nodesFocusable={false}
					edgesFocusable={false}
					disableKeyboardA11y={true}
				>
					{/* Solid black background */}
					<Background
						color="transparent"
						gap={0}
						size={0}
					/>

					{/* Zoom and pan controls */}
					<Controls
						position="bottom-right"
						className="bg-white shadow-lg border border-gray-200"
						showInteractive={false}
					/>

					{/* MiniMap for navigation */}
					<MiniMap
						nodeColor={() => "#f3f4f6"}
						style={{
							height: 120,
							backgroundColor: "#ffffff",
							border: "1px solid #e5e7eb",
							borderRadius: "8px",
						}}
						position="bottom-left"
					/>

					{/* Info Panel */}
					{/* <Panel position="top-left">
						<div className="bg-white shadow-lg rounded-lg p-4 border border-gray-200 max-w-xs">
							<div className="flex items-center space-x-2 mb-2">
								<EyeIcon className="w-4 h-4 text-gray-600" />
								<h3 className="font-medium text-sm text-gray-900">
									Canvas Navigation
								</h3>
							</div>
							<div className="text-xs text-gray-600 space-y-1">
								<div>• Drag canvas to pan around</div>
								<div>• Pinch to zoom in/out</div>
								<div>• Click sections to select them</div>
								<div>
									• Click elements within selected sections
								</div>
								<div>• Switch between desktop/mobile</div>
							</div>
						</div>
					</Panel> */}
				</ReactFlow>
			</div>
		</div>
	);
}
