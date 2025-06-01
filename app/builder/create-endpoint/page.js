"use client";

import React, { useState } from "react";
import {
	PlusIcon,
	DocumentTextIcon,
	CogIcon,
	PlayIcon,
} from "@heroicons/react/24/outline";

export default function CreateEndpointPage() {
	const [endpointForm, setEndpointForm] = useState({
		name: "",
		method: "GET",
		path: "",
		table: "",
		description: "",
		authentication: true,
		rateLimiting: true,
		caching: false,
	});

	const [isCreating, setIsCreating] = useState(false);

	// Mock tables data
	const tables = [
		{ id: 1, name: "thryl_users", records: 156 },
		{ id: 2, name: "thryl_products", records: 89 },
		{ id: 3, name: "thryl_orders", records: 234 },
	];

	const httpMethods = ["GET", "POST", "PUT", "DELETE"];

	const handleInputChange = (field, value) => {
		setEndpointForm((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	const handleCreateEndpoint = async () => {
		setIsCreating(true);
		// Mock API creation
		setTimeout(() => {
			setIsCreating(false);
			// Reset form or redirect
			alert(`Endpoint ${endpointForm.name} created successfully!`);
		}, 2000);
	};

	const generatePreview = () => {
		const baseUrl = "https://api.thincrust.io";
		const fullPath = `${baseUrl}${endpointForm.path}`;

		const exampleResponses = {
			GET: {
				status: 200,
				data: [
					{
						id: 1,
						name: "Example Record",
						created_at: "2024-01-22T10:30:00Z",
					},
				],
				meta: {
					total: 1,
					page: 1,
					limit: 10,
				},
			},
			POST: {
				status: 201,
				data: {
					id: 123,
					message: "Record created successfully",
				},
			},
			PUT: {
				status: 200,
				data: {
					id: 123,
					message: "Record updated successfully",
				},
			},
			DELETE: {
				status: 200,
				data: {
					message: "Record deleted successfully",
				},
			},
		};

		return {
			url: fullPath,
			method: endpointForm.method,
			response: exampleResponses[endpointForm.method] || {},
		};
	};

	const preview = generatePreview();

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<h2 className="text-2xl font-bold text-gray-900">
					Create New Endpoint
				</h2>
				<button
					onClick={handleCreateEndpoint}
					disabled={
						isCreating ||
						!endpointForm.name ||
						!endpointForm.path ||
						!endpointForm.table
					}
					className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
				>
					<PlusIcon className="h-4 w-4 mr-2" />
					{isCreating ? "Creating..." : "Create Endpoint"}
				</button>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{/* Configuration Form */}
				<div className="bg-white shadow rounded-lg p-6">
					<h3 className="text-lg font-medium text-gray-900 mb-6">
						Endpoint Configuration
					</h3>

					<div className="space-y-6">
						{/* Basic Information */}
						<div>
							<h4 className="text-sm font-medium text-gray-900 mb-4">
								Basic Information
							</h4>
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
										value={endpointForm.name}
										onChange={(e) =>
											handleInputChange(
												"name",
												e.target.value
											)
										}
										placeholder="e.g., Get All Users"
										className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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
										value={endpointForm.description}
										onChange={(e) =>
											handleInputChange(
												"description",
												e.target.value
											)
										}
										placeholder="Brief description of what this endpoint does..."
										className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
									/>
								</div>
							</div>
						</div>

						{/* HTTP Configuration */}
						<div>
							<h4 className="text-sm font-medium text-gray-900 mb-4">
								HTTP Configuration
							</h4>
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
										value={endpointForm.method}
										onChange={(e) =>
											handleInputChange(
												"method",
												e.target.value
											)
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
											value={endpointForm.path}
											onChange={(e) =>
												handleInputChange(
													"path",
													e.target.value
												)
											}
											placeholder="users"
											className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
										/>
									</div>
								</div>
							</div>
						</div>

						{/* Data Source */}
						<div>
							<h4 className="text-sm font-medium text-gray-900 mb-4">
								Data Source
							</h4>
							<div>
								<label
									htmlFor="source-table"
									className="block text-sm font-medium text-gray-700"
								>
									Source Table
								</label>
								<select
									id="source-table"
									value={endpointForm.table}
									onChange={(e) =>
										handleInputChange(
											"table",
											e.target.value
										)
									}
									className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
								>
									<option value="">Select a table...</option>
									{tables.map((table) => (
										<option
											key={table.id}
											value={table.name}
										>
											{table.name} ({table.records}{" "}
											records)
										</option>
									))}
								</select>
							</div>
						</div>

						{/* Security & Performance */}
						<div>
							<h4 className="text-sm font-medium text-gray-900 mb-4">
								Security & Performance
							</h4>
							<div className="space-y-3">
								<div className="flex items-center">
									<input
										id="authentication"
										type="checkbox"
										checked={endpointForm.authentication}
										onChange={(e) =>
											handleInputChange(
												"authentication",
												e.target.checked
											)
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
										checked={endpointForm.rateLimiting}
										onChange={(e) =>
											handleInputChange(
												"rateLimiting",
												e.target.checked
											)
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
										checked={endpointForm.caching}
										onChange={(e) =>
											handleInputChange(
												"caching",
												e.target.checked
											)
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
					</div>
				</div>

				{/* Preview and Testing */}
				<div className="space-y-6">
					{/* Live Preview */}
					<div className="bg-white shadow rounded-lg p-6">
						<div className="flex items-center mb-4">
							<DocumentTextIcon className="h-5 w-5 text-gray-400 mr-2" />
							<h3 className="text-lg font-medium text-gray-900">
								Live Preview
							</h3>
						</div>

						<div className="space-y-4">
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Endpoint URL
								</label>
								<div className="bg-gray-50 border border-gray-200 rounded-md p-3">
									<code className="text-sm font-mono text-gray-800">
										{preview.url ||
											"Configure endpoint path above"}
									</code>
								</div>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									HTTP Method
								</label>
								<span
									className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
										endpointForm.method === "GET"
											? "bg-green-100 text-green-800"
											: endpointForm.method === "POST"
											? "bg-blue-100 text-blue-800"
											: endpointForm.method === "PUT"
											? "bg-yellow-100 text-yellow-800"
											: "bg-red-100 text-red-800"
									}`}
								>
									{endpointForm.method}
								</span>
							</div>

							{endpointForm.table && (
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Data Source
									</label>
									<p className="text-sm text-gray-600">
										{endpointForm.table}
									</p>
								</div>
							)}
						</div>
					</div>

					{/* Example Response */}
					<div className="bg-white shadow rounded-lg p-6">
						<div className="flex items-center mb-4">
							<CogIcon className="h-5 w-5 text-gray-400 mr-2" />
							<h3 className="text-lg font-medium text-gray-900">
								Example Response
							</h3>
						</div>

						<div className="bg-gray-900 rounded-md p-4 overflow-x-auto">
							<pre className="text-sm text-green-400">
								{JSON.stringify(preview.response, null, 2)}
							</pre>
						</div>
					</div>

					{/* Test Endpoint */}
					<div className="bg-white shadow rounded-lg p-6">
						<div className="flex items-center mb-4">
							<PlayIcon className="h-5 w-5 text-gray-400 mr-2" />
							<h3 className="text-lg font-medium text-gray-900">
								Test Endpoint
							</h3>
						</div>

						<p className="text-sm text-gray-600 mb-4">
							Test your endpoint once it's created to ensure it
							works as expected.
						</p>

						<button
							disabled={
								!endpointForm.name ||
								!endpointForm.path ||
								!endpointForm.table
							}
							className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
						>
							<PlayIcon className="h-4 w-4 mr-2" />
							Test Endpoint
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
