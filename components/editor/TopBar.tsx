"use client";

import SaveStatus, { SaveState } from "@/components/ui/SaveStatus";

interface TopBarProps {
	projectName: string;
	saveState: SaveState;
	onProjectNameChange?: (name: string) => void;
}

export default function TopBar({
	projectName,
	saveState,
	onProjectNameChange,
}: TopBarProps) {
	return (
		<div className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-6">
			<div className="flex items-center space-x-4">
				<h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
					Landing Page Builder
				</h1>
				{onProjectNameChange ? (
					<input
						type="text"
						value={projectName}
						onChange={(e) => onProjectNameChange(e.target.value)}
						className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
						placeholder="Project Name"
					/>
				) : (
					<span className="text-gray-600 dark:text-gray-400">
						{projectName}
					</span>
				)}
			</div>

			<div className="flex items-center space-x-4">
				<SaveStatus saveState={saveState} />
				<div className="flex space-x-2">
					<button className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
						Preview
					</button>
					<button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
						Publish
					</button>
				</div>
			</div>
		</div>
	);
}
