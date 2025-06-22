"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import { Project, ProjectSection } from "@/lib/types";
import {
	getOrCreateProject,
	mockSaveSectionData,
	mockAddSection,
	mockRemoveSection,
} from "@/lib/mockSave";
import { getSectionVariantById } from "@/lib/sectionRegistry";
import { SaveState } from "@/components/ui/SaveStatus";
import TopBar from "@/components/editor/TopBar";
import SectionList from "@/components/editor/SectionList";
import LivePreview from "@/components/editor/LivePreview";
import PropsPanel from "@/components/editor/PropsPanel";

export default function BuilderPage() {
	const params = useParams();
	const projectId = params.projectId as string;

	const [project, setProject] = useState<Project | null>(null);
	const [selectedSectionId, setSelectedSectionId] = useState<string | null>(
		null
	);
	const [selectedElementPath, setSelectedElementPath] = useState<
		string | null
	>(null);
	const [saveState, setSaveState] = useState<SaveState>("idle");
	const [loading, setLoading] = useState(true);

	// Load project on mount
	useEffect(() => {
		const loadProject = async () => {
			try {
				const loadedProject = await getOrCreateProject(projectId);
				setProject(loadedProject);

				// Auto-select first section if available
				if (loadedProject.sections.length > 0) {
					setSelectedSectionId(loadedProject.sections[0].id);
				}
			} catch (error) {
				console.error("Failed to load project:", error);
				setSaveState("error");
			} finally {
				setLoading(false);
			}
		};

		loadProject();
	}, [projectId]);

	// Update section props with auto-save
	const handleUpdateProps = useCallback(
		async (sectionId: string, updatedProps: Record<string, unknown>) => {
			if (!project) return;

			setSaveState("saving");

			try {
				// Update local state immediately for responsive UI
				setProject((prev) => {
					if (!prev) return prev;
					return {
						...prev,
						sections: prev.sections.map((section) =>
							section.id === sectionId
								? {
										...section,
										props: {
											...section.props,
											...updatedProps,
										},
								  }
								: section
						),
					};
				});

				// Save to "backend"
				await mockSaveSectionData(projectId, sectionId, updatedProps);
				setSaveState("saved");
			} catch (error) {
				console.error("Failed to save section data:", error);
				setSaveState("error");
			}
		},
		[project, projectId]
	);

	// Update element props with auto-save
	const handleUpdateElementProps = useCallback(
		async (
			sectionId: string,
			elementPath: string,
			updatedElementProps: Record<string, unknown>
		) => {
			if (!project) return;

			setSaveState("saving");

			try {
				// Update local state immediately for responsive UI
				setProject((prev) => {
					if (!prev) return prev;
					return {
						...prev,
						sections: prev.sections.map((section) =>
							section.id === sectionId
								? {
										...section,
										elementProps: {
											...section.elementProps,
											[elementPath]: {
												...section.elementProps?.[
													elementPath
												],
												...updatedElementProps,
											},
										},
								  }
								: section
						),
					};
				});

				// TODO: Add backend call for element props
				// await mockSaveElementData(projectId, sectionId, elementPath, updatedElementProps);
				setSaveState("saved");
			} catch (error) {
				console.error("Failed to save element data:", error);
				setSaveState("error");
			}
		},
		[project]
	);

	// Handle element selection
	const handleSelectElement = useCallback((elementPath: string | null) => {
		setSelectedElementPath(elementPath);
	}, []);

	// Clear element selection when section changes
	const handleSelectSection = useCallback((sectionId: string) => {
		setSelectedSectionId(sectionId);
		setSelectedElementPath(null);
	}, []);

	// Add new section
	const handleAddSection = useCallback(
		async (variantId: string) => {
			if (!project) return;

			const variant = getSectionVariantById(variantId);
			if (!variant) return;

			const newSection: ProjectSection = {
				id: `section-${Date.now()}`,
				section: variant.section,
				variantId: variantId,
				props: {},
			};

			setSaveState("saving");

			try {
				// Update local state
				setProject((prev) => {
					if (!prev) return prev;
					return {
						...prev,
						sections: [...prev.sections, newSection],
					};
				});

				// Save to "backend"
				await mockAddSection(projectId, newSection);

				// Auto-select the new section
				setSelectedSectionId(newSection.id);
				setSaveState("saved");
			} catch (error) {
				console.error("Failed to add section:", error);
				setSaveState("error");
			}
		},
		[project, projectId]
	);

	// Remove section
	const handleRemoveSection = useCallback(
		async (sectionId: string) => {
			if (!project) return;

			setSaveState("saving");

			try {
				// Update local state
				setProject((prev) => {
					if (!prev) return prev;
					return {
						...prev,
						sections: prev.sections.filter(
							(s) => s.id !== sectionId
						),
					};
				});

				// Clear selection if removing selected section
				if (selectedSectionId === sectionId) {
					setSelectedSectionId(null);
				}

				// Save to "backend"
				await mockRemoveSection(projectId, sectionId);
				setSaveState("saved");
			} catch (error) {
				console.error("Failed to remove section:", error);
				setSaveState("error");
			}
		},
		[project, projectId, selectedSectionId]
	);

	// Reorder sections (placeholder for drag and drop)
	const handleReorderSections = useCallback(
		(reorderedSections: ProjectSection[]) => {
			if (!project) return;

			setProject((prev) => {
				if (!prev) return prev;
				return {
					...prev,
					sections: reorderedSections,
				};
			});
		},
		[project]
	);

	// Get selected section object
	const selectedSection =
		project?.sections.find((s) => s.id === selectedSectionId) || null;

	if (loading) {
		return (
			<div className="h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
				<div className="text-center">
					<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
					<p className="text-gray-600 dark:text-gray-400">
						Loading project...
					</p>
				</div>
			</div>
		);
	}

	if (!project) {
		return (
			<div className="h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
				<div className="text-center">
					<p className="text-red-600 mb-4">Failed to load project</p>
					<button
						onClick={() => window.location.reload()}
						className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
					>
						Retry
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
			{/* Top Bar */}
			<TopBar
				projectName={project.name}
				saveState={saveState}
			/>

			{/* Main Content */}
			<div className="flex-1 flex overflow-hidden">
				{/* Left Panel - Section List */}
				<SectionList
					sections={project.sections}
					selectedSectionId={selectedSectionId}
					onSelectSection={handleSelectSection}
					onAddSection={handleAddSection}
					onRemoveSection={handleRemoveSection}
					onReorderSections={handleReorderSections}
				/>

				{/* Center Panel - Live Preview */}
				<LivePreview
					sections={project.sections}
					selectedSectionId={selectedSectionId}
					onSelectSection={handleSelectSection}
					selectedElementPath={selectedElementPath}
					onSelectElement={handleSelectElement}
				/>

				{/* Right Panel - Props Editor */}
				<PropsPanel
					selectedSection={selectedSection}
					onUpdateProps={handleUpdateProps}
					selectedElementPath={selectedElementPath}
					onUpdateElementProps={handleUpdateElementProps}
				/>
			</div>
		</div>
	);
}
