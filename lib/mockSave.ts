import { Project, ProjectSection } from "./types";

// Simulated delay for realistic save experience
const SAVE_DELAY = 500;

export const mockSaveSectionData = async (
	projectId: string,
	sectionId: string,
	props: Record<string, unknown>
): Promise<void> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			const project = getProjectFromStorage(projectId);
			if (project) {
				const sectionIndex = project.sections.findIndex(
					(s) => s.id === sectionId
				);
				if (sectionIndex !== -1) {
					project.sections[sectionIndex].props = {
						...project.sections[sectionIndex].props,
						...props,
					};
					project.updatedAt = new Date().toISOString();
					saveProjectToStorage(project);
				}
			}
			resolve();
		}, SAVE_DELAY);
	});
};

export const mockSaveProject = async (project: Project): Promise<void> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			project.updatedAt = new Date().toISOString();
			saveProjectToStorage(project);
			resolve();
		}, SAVE_DELAY);
	});
};

export const mockLoadProject = async (
	projectId: string
): Promise<Project | null> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			const project = getProjectFromStorage(projectId);
			resolve(project);
		}, 200);
	});
};

export const mockAddSection = async (
	projectId: string,
	newSection: ProjectSection
): Promise<void> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			const project = getProjectFromStorage(projectId);
			if (project) {
				project.sections.push(newSection);
				project.updatedAt = new Date().toISOString();
				saveProjectToStorage(project);
			}
			resolve();
		}, SAVE_DELAY);
	});
};

export const mockRemoveSection = async (
	projectId: string,
	sectionId: string
): Promise<void> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			const project = getProjectFromStorage(projectId);
			if (project) {
				project.sections = project.sections.filter(
					(s) => s.id !== sectionId
				);
				project.updatedAt = new Date().toISOString();
				saveProjectToStorage(project);
			}
			resolve();
		}, SAVE_DELAY);
	});
};

// Local storage helpers
const getProjectFromStorage = (projectId: string): Project | null => {
	if (typeof window === "undefined") return null;

	const stored = localStorage.getItem(`project-${projectId}`);
	return stored ? JSON.parse(stored) : null;
};

const saveProjectToStorage = (project: Project): void => {
	if (typeof window === "undefined") return;

	localStorage.setItem(`project-${project.id}`, JSON.stringify(project));
};

// Initialize a default project if none exists
export const getOrCreateProject = async (
	projectId: string
): Promise<Project> => {
	const existing = await mockLoadProject(projectId);

	if (existing) {
		return existing;
	}

	// Create a new project with default sections
	const newProject: Project = {
		id: projectId,
		name: `Project ${projectId}`,
		sections: [
			{
				id: "section-1",
				section: "hero",
				variantId: "hero-v1",
				props: {},
			},
		],
		globalFonts: {
			headingFont: "outfit",
			bodyFont: "outfit",
		},
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	};

	await mockSaveProject(newProject);
	return newProject;
};
