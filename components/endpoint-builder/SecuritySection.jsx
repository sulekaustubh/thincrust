import React from "react";
import { ShieldCheckIcon } from "@heroicons/react/24/outline";

const SecuritySection = ({ config, updateConfig }) => {
	return (
		<div className="bg-white shadow rounded-lg p-6">
			<div className="flex items-center mb-6">
				<ShieldCheckIcon className="h-5 w-5 text-indigo-500 mr-2" />
				<h3 className="text-lg font-medium text-gray-900">
					Security & Performance
				</h3>
			</div>

			<div className="space-y-4">
				<div className="flex items-center">
					<input
						id="authentication"
						type="checkbox"
						checked={config.authentication}
						onChange={(e) =>
							updateConfig("authentication", e.target.checked)
						}
						className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
					/>
					<label
						htmlFor="authentication"
						className="ml-2 block text-sm text-gray-900"
					>
						Require Authentication
					</label>
				</div>

				<div className="flex items-center">
					<input
						id="rate-limiting"
						type="checkbox"
						checked={config.rateLimiting}
						onChange={(e) =>
							updateConfig("rateLimiting", e.target.checked)
						}
						className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
					/>
					<label
						htmlFor="rate-limiting"
						className="ml-2 block text-sm text-gray-900"
					>
						Enable Rate Limiting
					</label>
				</div>

				<div className="flex items-center">
					<input
						id="caching"
						type="checkbox"
						checked={config.caching}
						onChange={(e) =>
							updateConfig("caching", e.target.checked)
						}
						className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
					/>
					<label
						htmlFor="caching"
						className="ml-2 block text-sm text-gray-900"
					>
						Enable Response Caching
					</label>
				</div>
			</div>
		</div>
	);
};

export default SecuritySection;
