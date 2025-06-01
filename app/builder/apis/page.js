"use client";

import React, { useState } from "react";
import {
	PlusIcon,
	PlayIcon,
	DocumentDuplicateIcon,
	TrashIcon,
	EyeIcon,
	CodeBracketIcon,
} from "@heroicons/react/24/outline";

export default function ApisPage() {
	const [apis, setApis] = useState([
		{
			id: 1,
			name: "Get All Users",
			endpoint: "/api/users",
			method: "GET",
			table: "thryl_users",
			lastUsed: "2024-01-22",
			description: "Retrieve all users from the database",
			responseTime: "45ms",
			status: "active",
		},
		{
			id: 2,
			name: "Create Product",
			endpoint: "/api/products",
			method: "POST",
			table: "thryl_products",
			lastUsed: "2024-01-21",
			description: "Add a new product to the inventory",
			responseTime: "78ms",
			status: "active",
		},
		{
			id: 3,
			name: "Update Order Status",
			endpoint: "/api/orders/:id",
			method: "PUT",
			table: "thryl_orders",
			lastUsed: "2024-01-20",
			description: "Update the status of an existing order",
			responseTime: "52ms",
			status: "active",
		},
		{
			id: 4,
			name: "Delete User",
			endpoint: "/api/users/:id",
			method: "DELETE",
			table: "thryl_users",
			lastUsed: "2024-01-19",
			description: "Remove a user from the system",
			responseTime: "34ms",
			status: "inactive",
		},
		{
			id: 5,
			name: "Get Product by ID",
			endpoint: "/api/products/:id",
			method: "GET",
			table: "thryl_products",
			lastUsed: "2024-01-22",
			description: "Retrieve a specific product by its ID",
			responseTime: "23ms",
			status: "active",
		},
	]);

	const [selectedAPI, setSelectedAPI] = useState(null);

	const getMethodBadgeColor = (method) => {
		switch (method) {
			case "GET":
				return "bg-blue-100 text-blue-800";
			case "POST":
				return "bg-green-100 text-green-800";
			case "PUT":
				return "bg-yellow-100 text-yellow-800";
			case "DELETE":
				return "bg-red-100 text-red-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	const getStatusBadge = (status) => {
		return status === "active"
			? "bg-green-100 text-green-800"
			: "bg-gray-100 text-gray-800";
	};

	const handleAPISelect = (api) => {
		setSelectedAPI(selectedAPI?.id === api.id ? null : api);
	};

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<h2 className="text-2xl font-bold text-gray-900">Your APIs</h2>
				<button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
					<PlusIcon className="h-4 w-4 mr-2" />
					Create API
				</button>
			</div>

			{/* API Statistics */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
				<div className="bg-white p-4 rounded-lg shadow">
					<div className="flex items-center">
						<div className="flex-shrink-0">
							<CodeBracketIcon className="h-6 w-6 text-indigo-600" />
						</div>
						<div className="ml-3">
							<p className="text-sm font-medium text-gray-500">
								Total APIs
							</p>
							<p className="text-lg font-semibold text-gray-900">
								{apis.length}
							</p>
						</div>
					</div>
				</div>
				<div className="bg-white p-4 rounded-lg shadow">
					<div className="flex items-center">
						<div className="flex-shrink-0">
							<div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
								<div className="w-2 h-2 bg-green-600 rounded-full"></div>
							</div>
						</div>
						<div className="ml-3">
							<p className="text-sm font-medium text-gray-500">
								Active
							</p>
							<p className="text-lg font-semibold text-gray-900">
								{
									apis.filter(
										(api) => api.status === "active"
									).length
								}
							</p>
						</div>
					</div>
				</div>
				<div className="bg-white p-4 rounded-lg shadow">
					<div className="flex items-center">
						<div className="flex-shrink-0">
							<PlayIcon className="h-6 w-6 text-blue-600" />
						</div>
						<div className="ml-3">
							<p className="text-sm font-medium text-gray-500">
								Avg Response
							</p>
							<p className="text-lg font-semibold text-gray-900">
								46ms
							</p>
						</div>
					</div>
				</div>
				<div className="bg-white p-4 rounded-lg shadow">
					<div className="flex items-center">
						<div className="flex-shrink-0">
							<EyeIcon className="h-6 w-6 text-purple-600" />
						</div>
						<div className="ml-3">
							<p className="text-sm font-medium text-gray-500">
								This Month
							</p>
							<p className="text-lg font-semibold text-gray-900">
								2.4k calls
							</p>
						</div>
					</div>
				</div>
			</div>

			{/* API List */}
			<div className="bg-white shadow rounded-lg">
				<div className="px-6 py-4 border-b border-gray-200">
					<h3 className="text-lg font-medium text-gray-900">
						API Endpoints
					</h3>
				</div>
				<div className="divide-y divide-gray-200">
					{apis.map((api) => (
						<div key={api.id}>
							<div
								className={`p-6 hover:bg-gray-50 cursor-pointer transition-colors ${
									selectedAPI?.id === api.id
										? "bg-indigo-50 border-l-4 border-indigo-500"
										: ""
								}`}
								onClick={() => handleAPISelect(api)}
							>
								<div className="flex items-center justify-between">
									<div className="flex-1">
										<div className="flex items-center space-x-3">
											<span
												className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getMethodBadgeColor(
													api.method
												)}`}
											>
												{api.method}
											</span>
											<h3 className="text-lg font-medium text-gray-900">
												{api.name}
											</h3>
											<span
												className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(
													api.status
												)}`}
											>
												{api.status}
											</span>
										</div>
										<p className="mt-1 text-sm text-gray-600 font-mono">
											{api.endpoint}
										</p>
										<p className="mt-1 text-sm text-gray-500">
											{api.description}
										</p>
										<div className="mt-2 flex items-center space-x-4 text-xs text-gray-500">
											<span>
												Table:{" "}
												<span className="font-medium">
													{api.table}
												</span>
											</span>
											<span>
												Last used:{" "}
												<span className="font-medium">
													{api.lastUsed}
												</span>
											</span>
											<span>
												Response:{" "}
												<span className="font-medium text-green-600">
													{api.responseTime}
												</span>
											</span>
										</div>
									</div>

									<div className="flex items-center space-x-2">
										<button className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
											<PlayIcon className="h-4 w-4 mr-1" />
											Test
										</button>
										<button className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
											<DocumentDuplicateIcon className="h-4 w-4 mr-1" />
											Clone
										</button>
										<button className="text-gray-400 hover:text-red-600">
											<TrashIcon className="h-4 w-4" />
										</button>
									</div>
								</div>
							</div>

							{/* Expanded API Details */}
							{selectedAPI?.id === api.id && (
								<div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
									<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
										<div>
											<h4 className="text-sm font-medium text-gray-900 mb-3">
												Request Details
											</h4>
											<div className="space-y-2 text-sm">
												<div className="flex justify-between">
													<span className="text-gray-500">
														Method:
													</span>
													<span className="font-medium">
														{api.method}
													</span>
												</div>
												<div className="flex justify-between">
													<span className="text-gray-500">
														Endpoint:
													</span>
													<span className="font-mono text-sm">
														{api.endpoint}
													</span>
												</div>
												<div className="flex justify-between">
													<span className="text-gray-500">
														Source Table:
													</span>
													<span className="font-medium">
														{api.table}
													</span>
												</div>
												<div className="flex justify-between">
													<span className="text-gray-500">
														Authentication:
													</span>
													<span className="font-medium">
														API Key Required
													</span>
												</div>
											</div>
										</div>

										<div>
											<h4 className="text-sm font-medium text-gray-900 mb-3">
												Performance
											</h4>
											<div className="space-y-2 text-sm">
												<div className="flex justify-between">
													<span className="text-gray-500">
														Avg Response Time:
													</span>
													<span className="font-medium text-green-600">
														{api.responseTime}
													</span>
												</div>
												<div className="flex justify-between">
													<span className="text-gray-500">
														Calls Today:
													</span>
													<span className="font-medium">
														24
													</span>
												</div>
												<div className="flex justify-between">
													<span className="text-gray-500">
														Success Rate:
													</span>
													<span className="font-medium text-green-600">
														99.2%
													</span>
												</div>
												<div className="flex justify-between">
													<span className="text-gray-500">
														Last Call:
													</span>
													<span className="font-medium">
														{api.lastUsed}
													</span>
												</div>
											</div>
										</div>
									</div>

									<div className="mt-4 pt-4 border-t border-gray-200">
										<h4 className="text-sm font-medium text-gray-900 mb-2">
											Quick Actions
										</h4>
										<div className="flex space-x-3">
											<button className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
												<EyeIcon className="h-4 w-4 mr-1" />
												View Logs
											</button>
											<button className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
												<CodeBracketIcon className="h-4 w-4 mr-1" />
												View Code
											</button>
											<button className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
												Configure
											</button>
										</div>
									</div>
								</div>
							)}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
