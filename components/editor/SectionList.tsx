"use client";

import { useState } from "react";
import { ProjectSection } from "@/lib/types";
import { getSectionVariantById, SECTION_REGISTRY } from "@/lib/sectionRegistry";

interface SectionListProps {
	sections: ProjectSection[];
	selectedSectionId: string | null;
	onSelectSection: (sectionId: string) => void;
	onAddSection: (variantId: string) => void;
	onRemoveSection: (sectionId: string) => void;
	onReorderSections: (sections: ProjectSection[]) => void;
}

export default function SectionList({
	sections,
	selectedSectionId,
	onSelectSection,
	onAddSection,
	onRemoveSection,
	onReorderSections,
}: SectionListProps) {
	const [showAddMenu, setShowAddMenu] = useState(false);

	const handleAddSection = (variantId: string) => {
		onAddSection(variantId);
		setShowAddMenu(false);
	};

	return (
		<div className="w-80 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex flex-col">
			{/* Header */}
			<div className="p-4 border-b border-gray-200 dark:border-gray-700">
				<div className="flex items-center justify-between">
					<h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
						Sections
					</h2>
					<div className="relative">
						<button
							onClick={() => setShowAddMenu(!showAddMenu)}
							className="px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
						>
							+ Add
						</button>

						{/* Add section dropdown */}
						{showAddMenu && (
							<div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-10">
								<div className="py-2">
									{SECTION_REGISTRY.map((variant) => (
										<button
											key={variant.id}
											onClick={() =>
												handleAddSection(variant.id)
											}
											className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none"
										>
											<div className="font-medium">
												{variant.name}
											</div>
											<div className="text-xs text-gray-500 dark:text-gray-400 capitalize">
												{variant.section}
											</div>
										</button>
									))}
								</div>
							</div>
						)}
					</div>
				</div>
			</div>

			{/* Section List */}
			<div className="flex-1 overflow-y-auto">
				{sections.length === 0 ? (
					<div className="p-8 text-center text-gray-500 dark:text-gray-400">
						<div className="text-4xl mb-4">📄</div>
						<p className="text-sm">No sections yet</p>
						<p className="text-xs mt-1">
							Click "Add" to get started
						</p>
					</div>
				) : (
					<div className="p-2 space-y-2">
						{sections.map((section, index) => {
							const variant = getSectionVariantById(
								section.variantId
							);
							const isSelected = section.id === selectedSectionId;

							return (
								<div
									key={section.id}
									onClick={() => onSelectSection(section.id)}
									className={`
                    p-3 rounded-lg border cursor-pointer transition-colors
                    ${
						isSelected
							? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
							: "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
					}
                  `}
								>
									<div className="flex items-center justify-between">
										<div className="flex-1">
											<div className="font-medium text-sm text-gray-900 dark:text-gray-100">
												{variant?.name ||
													"Unknown Section"}
											</div>
											<div className="text-xs text-gray-500 dark:text-gray-400 capitalize">
												{section.section}
											</div>
										</div>
										<button
											onClick={(e) => {
												e.stopPropagation();
												onRemoveSection(section.id);
											}}
											className="ml-2 p-1 text-gray-400 hover:text-red-500 focus:outline-none"
											title="Remove section"
										>
											<svg
												className="w-4 h-4"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M6 18L18 6M6 6l12 12"
												/>
											</svg>
										</button>
									</div>
								</div>
							);
						})}
					</div>
				)}
			</div>
		</div>
	);
}
