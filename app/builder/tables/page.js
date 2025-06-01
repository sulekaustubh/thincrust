"use client";

import React, { useState } from "react";
import {
	PlusIcon,
	EyeIcon,
	TrashIcon,
	TableCellsIcon,
} from "@heroicons/react/24/outline";

export default function TablesPage() {
	const [selectedTable, setSelectedTable] = useState("");
	const [tables, setTables] = useState([
		{ id: 1, name: "thryl_users", records: 156, created: "2024-01-15" },
		{ id: 2, name: "thryl_products", records: 89, created: "2024-01-18" },
		{ id: 3, name: "thryl_orders", records: 234, created: "2024-01-20" },
	]);

	// Mock table data for different tables
	const tableData = {
		thryl_users: {
			columns: ["id", "name", "email", "role", "created_at"],
			rows: [
				{
					id: "1",
					name: "John Doe",
					email: "john@example.com",
					role: "admin",
					created_at: "2024-01-15 10:30:00",
				},
				{
					id: "2",
					name: "Jane Smith",
					email: "jane@example.com",
					role: "user",
					created_at: "2024-01-16 14:22:00",
				},
				{
					id: "3",
					name: "Bob Johnson",
					email: "bob@example.com",
					role: "user",
					created_at: "2024-01-17 09:15:00",
				},
				{
					id: "4",
					name: "Alice Brown",
					email: "alice@example.com",
					role: "moderator",
					created_at: "2024-01-18 16:45:00",
				},
				{
					id: "5",
					name: "Charlie Wilson",
					email: "charlie@example.com",
					role: "user",
					created_at: "2024-01-19 11:30:00",
				},
			],
		},
		thryl_products: {
			columns: ["id", "name", "price", "category", "stock", "created_at"],
			rows: [
				{
					id: "1",
					name: "Laptop Pro",
					price: "$1299",
					category: "Electronics",
					stock: "15",
					created_at: "2024-01-18 10:00:00",
				},
				{
					id: "2",
					name: "Wireless Mouse",
					price: "$29",
					category: "Electronics",
					stock: "50",
					created_at: "2024-01-18 10:30:00",
				},
				{
					id: "3",
					name: "Office Chair",
					price: "$199",
					category: "Furniture",
					stock: "8",
					created_at: "2024-01-19 14:15:00",
				},
				{
					id: "4",
					name: "Monitor 4K",
					price: "$449",
					category: "Electronics",
					stock: "12",
					created_at: "2024-01-20 09:45:00",
				},
			],
		},
		thryl_orders: {
			columns: [
				"id",
				"user_id",
				"product_id",
				"quantity",
				"status",
				"total",
				"created_at",
			],
			rows: [
				{
					id: "1",
					user_id: "1",
					product_id: "1",
					quantity: "1",
					status: "completed",
					total: "$1299",
					created_at: "2024-01-20 15:30:00",
				},
				{
					id: "2",
					user_id: "2",
					product_id: "2",
					quantity: "2",
					status: "pending",
					total: "$58",
					created_at: "2024-01-21 10:15:00",
				},
				{
					id: "3",
					user_id: "3",
					product_id: "3",
					quantity: "1",
					status: "shipped",
					total: "$199",
					created_at: "2024-01-21 14:22:00",
				},
				{
					id: "4",
					user_id: "1",
					product_id: "4",
					quantity: "1",
					status: "pending",
					total: "$449",
					created_at: "2024-01-22 09:30:00",
				},
			],
		},
	};

	const selectedTableInfo = tables.find(
		(table) => table.name === selectedTable
	);
	const currentTableData = tableData[selectedTable];

	const getStatusBadge = (status) => {
		const statusColors = {
			completed: "bg-green-100 text-green-800",
			pending: "bg-yellow-100 text-yellow-800",
			shipped: "bg-blue-100 text-blue-800",
			admin: "bg-purple-100 text-purple-800",
			moderator: "bg-indigo-100 text-indigo-800",
			user: "bg-gray-100 text-gray-800",
		};

		return statusColors[status] || "bg-gray-100 text-gray-800";
	};

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<h2 className="text-2xl font-bold text-gray-900">
					Database Tables
				</h2>
				<button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
					<PlusIcon className="h-4 w-4 mr-2" />
					Create Table
				</button>
			</div>

			{/* Horizontal Layout */}
			<div className="flex gap-6 h-[calc(100vh-200px)]">
				{/* Left Sidebar - Table List */}
				<div className="w-80 bg-white shadow rounded-lg p-6 overflow-y-auto">
					<h3 className="text-lg font-medium text-gray-900 mb-4">
						Select Table
					</h3>
					<div className="space-y-2">
						{tables.map((table) => (
							<button
								key={table.id}
								onClick={() => setSelectedTable(table.name)}
								className={`w-full text-left p-4 rounded-lg border transition-colors ${
									selectedTable === table.name
										? "border-indigo-500 bg-indigo-50 text-indigo-700"
										: "border-gray-200 bg-white text-gray-900 hover:bg-gray-50"
								}`}
							>
								<div className="flex items-center">
									<TableCellsIcon className="h-5 w-5 mr-3 text-gray-400" />
									<div className="flex-1">
										<div className="flex items-center justify-between">
											<h4 className="text-sm font-medium">
												{table.name}
											</h4>
											<span className="text-xs text-gray-500">
												{table.records} records
											</span>
										</div>
										<p className="text-xs text-gray-500 mt-1">
											Created: {table.created}
										</p>
									</div>
								</div>
							</button>
						))}
					</div>
				</div>

				{/* Right Content Area */}
				<div className="flex-1">
					{selectedTable && currentTableData ? (
						<div className="bg-white shadow rounded-lg h-full flex flex-col">
							<div className="px-6 py-4 border-b border-gray-200">
								<div className="flex justify-between items-center">
									<div>
										<h3 className="text-lg font-medium text-gray-900">
											{selectedTable}
										</h3>
										{selectedTableInfo && (
											<p className="text-sm text-gray-500 mt-1">
												{selectedTableInfo.records}{" "}
												records • Created{" "}
												{selectedTableInfo.created}
											</p>
										)}
									</div>
									<div className="flex space-x-2">
										<button className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
											<EyeIcon className="h-4 w-4 mr-1" />
											View Schema
										</button>
										<button className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
											<PlusIcon className="h-4 w-4 mr-1" />
											Add Record
										</button>
									</div>
								</div>
							</div>

							<div className="flex-1 overflow-auto">
								<table className="min-w-full divide-y divide-gray-200">
									<thead className="bg-gray-50 sticky top-0">
										<tr>
											{currentTableData.columns.map(
												(column) => (
													<th
														key={column}
														className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
													>
														{column}
													</th>
												)
											)}
											<th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
												Actions
											</th>
										</tr>
									</thead>
									<tbody className="bg-white divide-y divide-gray-200">
										{currentTableData.rows.map(
											(row, index) => (
												<tr
													key={index}
													className="hover:bg-gray-50"
												>
													{currentTableData.columns.map(
														(column) => (
															<td
																key={column}
																className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
															>
																{column ===
																	"status" ||
																column ===
																	"role" ? (
																	<span
																		className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(
																			row[
																				column
																			]
																		)}`}
																	>
																		{
																			row[
																				column
																			]
																		}
																	</span>
																) : column ===
																  "created_at" ? (
																	<span className="text-gray-500">
																		{
																			row[
																				column
																			]
																		}
																	</span>
																) : (
																	row[column]
																)}
															</td>
														)
													)}
													<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
														<div className="flex justify-end space-x-2">
															<button className="text-indigo-600 hover:text-indigo-900">
																Edit
															</button>
															<button className="text-red-600 hover:text-red-900">
																<TrashIcon className="h-4 w-4" />
															</button>
														</div>
													</td>
												</tr>
											)
										)}
									</tbody>
								</table>
							</div>

							{/* Pagination */}
							<div className="bg-white px-6 py-3 border-t border-gray-200">
								<div className="flex items-center justify-between">
									<p className="text-sm text-gray-700">
										Showing{" "}
										<span className="font-medium">1</span>{" "}
										to{" "}
										<span className="font-medium">
											{currentTableData.rows.length}
										</span>{" "}
										of{" "}
										<span className="font-medium">
											{selectedTableInfo?.records || 0}
										</span>{" "}
										results
									</p>
									<div className="flex space-x-1">
										<button
											className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50"
											disabled
										>
											Previous
										</button>
										<button className="px-3 py-1 text-sm bg-indigo-600 text-white rounded">
											1
										</button>
										<button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700">
											2
										</button>
										<button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700">
											Next
										</button>
									</div>
								</div>
							</div>
						</div>
					) : (
						<div className="bg-white shadow rounded-lg h-full">
							<div className="flex items-center justify-center h-full">
								<div className="text-center">
									<div className="mx-auto h-12 w-12 text-gray-400">
										<svg
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={1}
												d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
											/>
										</svg>
									</div>
									<h3 className="mt-2 text-sm font-medium text-gray-900">
										No table selected
									</h3>
									<p className="mt-1 text-sm text-gray-500">
										Choose a table from the list on the left
										to view its data
									</p>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
