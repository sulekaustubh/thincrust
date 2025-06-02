import React from "react";
import { DocumentTextIcon } from "@heroicons/react/24/outline";

const BasicInfoSection = ({ config, updateConfig }) => {
	return (
		<div className="bg-white shadow rounded-lg p-3">
			<div className="flex items-center mb-6">
				<DocumentTextIcon className="h-5 w-5 text-indigo-500 mr-2" />
				<h3 className="text-lg font-medium text-gray-900">
					Basic Information
				</h3>
			</div>

			<div className="space-y-4">
				<div>
					<label
						htmlFor="endpoint-name"
						className="block text-sm font-medium text-gray-700"
					>
						Endpoint Name
					</label>
					<input
						type="text"
						id="endpoint-name"
						value={config.name}
						onChange={(e) => updateConfig("name", e.target.value)}
						placeholder="Get Users with Financial Data"
						className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
					/>
				</div>

				<div>
					<label
						htmlFor="endpoint-description"
						className="block text-sm font-medium text-gray-700"
					>
						Description
					</label>
					<textarea
						id="endpoint-description"
						rows={3}
						value={config.description}
						onChange={(e) =>
							updateConfig("description", e.target.value)
						}
						placeholder="Detailed description of what this endpoint does and returns..."
						className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
					/>
				</div>
			</div>
		</div>
	);
};

export default BasicInfoSection;
