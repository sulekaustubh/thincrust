import React from "react";
import { GlobeAltIcon } from "@heroicons/react/24/outline";

const HTTPConfigSection = ({ config, updateConfig }) => {
	const httpMethods = ["GET", "POST", "PUT", "DELETE", "PATCH"];

	const handleHeaderChange = (index, field, value) => {
		const newHeaders = [...(config.headers || [])];
		newHeaders[index] = { ...newHeaders[index], [field]: value };
		updateConfig("headers", newHeaders);
	};

	const addHeader = () => {
		const newHeaders = [
			...(config.headers || []),
			{ key: "", value: "", required: false },
		];
		updateConfig("headers", newHeaders);
	};

	const removeHeader = (index) => {
		const newHeaders = config.headers.filter((_, i) => i !== index);
		updateConfig("headers", newHeaders);
	};

	return (
		<div className="bg-white shadow rounded-lg p-6">
			<div className="flex items-center mb-6">
				<GlobeAltIcon className="h-5 w-5 text-indigo-500 mr-2" />
				<h3 className="text-lg font-medium text-gray-900">
					HTTP Configuration
				</h3>
			</div>

			<div className="space-y-6">
				<div className="grid grid-cols-2 gap-4">
					<div>
						<label
							htmlFor="http-method"
							className="block text-sm font-medium text-gray-700"
						>
							HTTP Method
						</label>
						<select
							id="http-method"
							value={config.method}
							onChange={(e) =>
								updateConfig("method", e.target.value)
							}
							className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
						>
							{httpMethods.map((method) => (
								<option
									key={method}
									value={method}
								>
									{method}
								</option>
							))}
						</select>
					</div>

					<div>
						<label
							htmlFor="endpoint-path"
							className="block text-sm font-medium text-gray-700"
						>
							Endpoint Path
						</label>
						<div className="mt-1 flex rounded-md shadow-sm">
							<span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
								/api/
							</span>
							<input
								type="text"
								id="endpoint-path"
								value={config.path}
								onChange={(e) =>
									updateConfig("path", e.target.value)
								}
								placeholder="users"
								className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 text-black/75 placeholder:text-gray-600"
							/>
						</div>
					</div>
				</div>

				{/* Custom Headers */}
				<div>
					<div className="flex items-center justify-between mb-4">
						<h4 className="text-sm font-medium text-gray-900">
							Custom Headers
						</h4>
						<button
							type="button"
							onClick={addHeader}
							className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							Add Header
						</button>
					</div>

					{config.headers && config.headers.length > 0 ? (
						<div className="space-y-3">
							{config.headers.map((header, index) => (
								<div
									key={index}
									className="flex items-center space-x-3"
								>
									<input
										type="text"
										placeholder="Header name"
										value={header.key}
										onChange={(e) =>
											handleHeaderChange(
												index,
												"key",
												e.target.value
											)
										}
										className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black/75 placeholder:text-gray-600"
									/>
									<input
										type="text"
										placeholder="Header value"
										value={header.value}
										onChange={(e) =>
											handleHeaderChange(
												index,
												"value",
												e.target.value
											)
										}
										className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black/75 placeholder:text-gray-600"
									/>
									<label className="flex items-center">
										<input
											type="checkbox"
											checked={header.required}
											onChange={(e) =>
												handleHeaderChange(
													index,
													"required",
													e.target.checked
												)
											}
											className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
										/>
										<span className="ml-2 text-sm text-gray-600">
											Required
										</span>
									</label>
									<button
										type="button"
										onClick={() => removeHeader(index)}
										className="text-red-600 hover:text-red-800 text-sm"
									>
										Remove
									</button>
								</div>
							))}
						</div>
					) : (
						<p className="text-sm text-gray-500">
							No custom headers defined
						</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default HTTPConfigSection;
