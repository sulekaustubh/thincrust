"use client";

import React, { useState } from "react";
import {
	PlusIcon,
	DocumentTextIcon,
	CogIcon,
	PlayIcon,
} from "@heroicons/react/24/outline";
import HTTPConfigSection from "../../../components/endpoint-builder/HTTPConfigSection";
import QueryParamsSection from "../../../components/endpoint-builder/QueryParamsSection";
import TableConfigSection from "../../../components/endpoint-builder/TableConfigSection";
import FilteringSection from "../../../components/endpoint-builder/FilteringSection";
import FieldSelectionSection from "../../../components/endpoint-builder/FieldSelectionSection";
import PaginationSection from "../../../components/endpoint-builder/PaginationSection";
import FlowBuilder from "../../../components/endpoint-builder/FlowBuilder";
import ViewModeToggle from "../../../components/endpoint-builder/ViewModeToggle";
import BasicInfoSection from "../../../components/endpoint-builder/BasicInfoSection";
import SecuritySection from "../../../components/endpoint-builder/SecuritySection";
import { motion, AnimatePresence } from "framer-motion";

export default function CreateEndpointPage() {
	const [endpointConfig, setEndpointConfig] = useState({
		// Basic Info
		name: "",
		description: "",

		// HTTP Configuration
		method: "GET",
		path: "",
		headers: [],

		// Query Parameters
		queryParams: [],

		// Table Configuration
		primaryTable: "",
		primaryTableAlias: "",
		joins: [],

		// Field Selection
		selectedFields: [],
		allowFieldSelection: false,
		excludeNullFields: false,
		flattenNestedObjects: false,

		// Filtering
		filters: [],

		// Pagination & Sorting
		pagination: {
			enabled: true,
			defaultLimit: 10,
			maxLimit: 100,
			allowCustomLimit: true,
			includeTotal: true,
		},
		sorting: [],
		allowCustomSorting: true,
		enableDistinct: false,
		hardLimit: 10000,

		// Security & Performance
		authentication: true,
		rateLimiting: true,
		caching: false,
	});

	const [isCreating, setIsCreating] = useState(false);
	const [activeTab, setActiveTab] = useState("basic");
	const [viewMode, setViewMode] = useState("form"); // 'form' or 'flow'
	const [isTransitioning, setIsTransitioning] = useState(false);

	const updateConfig = (field, value) => {
		setEndpointConfig((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	const handleViewModeChange = (newMode) => {
		if (newMode === viewMode) return;

		setIsTransitioning(true);
		setTimeout(() => {
			setViewMode(newMode);
			setIsTransitioning(false);
		}, 150);
	};

	const handleCreateEndpoint = async () => {
		setIsCreating(true);
		// Mock API creation
		setTimeout(() => {
			setIsCreating(false);
			// Reset form or redirect
			alert(`Endpoint ${endpointConfig.name} created successfully!`);
		}, 2000);
	};

	// Helper functions
	const generatePreview = () => {
		const baseUrl = "https://api.thincrust.io";
		const fullPath = `${baseUrl}/api${endpointConfig.path}`;

		// Build a comprehensive query example
		let allParams = [];

		// Add custom query parameters
		if (
			endpointConfig.queryParams &&
			endpointConfig.queryParams.length > 0
		) {
			const customParams = endpointConfig.queryParams
				.filter((p) => p.name)
				.map((p) => {
					let value = p.defaultValue || "example";
					if (p.type === "number") value = "123";
					if (p.type === "boolean") value = "true";
					if (p.type === "date") value = "2024-01-01";
					if (
						p.type === "enum" &&
						p.enumValues &&
						p.enumValues.length > 0
					) {
						value = p.enumValues[0] || "enum_value";
					}
					return `${p.name}=${value}`;
				});
			allParams.push(...customParams);
		}

		// Add automatic pagination parameters
		if (endpointConfig.pagination?.enabled) {
			allParams.push(`page=1`);

			if (endpointConfig.pagination?.allowCustomLimit) {
				allParams.push(
					`limit=${endpointConfig.pagination?.defaultLimit || 10}`
				);
			}

			if (endpointConfig.pagination?.includeTotal) {
				// This would be a response field, not a query param, but showing for completeness
			}
		}

		// Add automatic sorting parameters
		if (endpointConfig.allowCustomSorting) {
			allParams.push(`sort=id`);
			allParams.push(`order=asc`);
		}

		// Add field selection parameters
		if (endpointConfig.allowFieldSelection) {
			const exampleFields =
				endpointConfig.selectedFields &&
				endpointConfig.selectedFields.length > 0
					? endpointConfig.selectedFields
							.filter((f) => f.enabled && f.column)
							.slice(0, 2) // Show first 2 fields as example
							.map((f) => f.alias || f.column.split(".").pop())
							.join(",")
					: "id,name";
			allParams.push(`fields=${exampleFields}`);
		}

		// Add filter examples based on configured filters
		if (endpointConfig.filters && endpointConfig.filters.length > 0) {
			const enabledFilters = endpointConfig.filters.filter(
				(f) => f.enabled && f.column
			);
			if (enabledFilters.length > 0) {
				// Show first filter as an example
				const firstFilter = enabledFilters[0];
				if (firstFilter.valueType === "parameter") {
					// Skip parameter-based filters in URL preview
				} else {
					const columnName = firstFilter.column.split(".").pop();
					const exampleValue = firstFilter.value || "value";
					allParams.push(`${columnName}=${exampleValue}`);
				}
			}
		}

		const queryExample =
			allParams.length > 0 ? "?" + allParams.join("&") : "";

		// Build example response based on configuration
		const buildExampleResponse = () => {
			const baseResponse = {
				status: endpointConfig.method === "POST" ? 201 : 200,
				data: endpointConfig.method === "GET" ? [] : { id: 123 },
				meta: {},
			};

			if (endpointConfig.method === "GET") {
				// Sample data structure
				const sampleRecord = {};

				if (
					endpointConfig.selectedFields &&
					endpointConfig.selectedFields.length > 0
				) {
					// Use selected fields
					endpointConfig.selectedFields.forEach((field) => {
						if (
							field.enabled &&
							(field.column || field.expression)
						) {
							const fieldName =
								field.alias ||
								field.column?.split(".").pop() ||
								"field";
							sampleRecord[fieldName] =
								field.aggregation !== "none"
									? 42
									: "sample_value";
						}
					});
				} else {
					// Default fields based on primary table
					if (endpointConfig.primaryTable) {
						sampleRecord.id = 1;
						sampleRecord.name = "Sample Record";
						sampleRecord.created_at = "2024-01-22T10:30:00Z";
					}
				}

				baseResponse.data = [sampleRecord];

				// Add pagination meta if enabled
				if (endpointConfig.pagination?.enabled) {
					baseResponse.meta = {
						total: endpointConfig.pagination.includeTotal
							? 150
							: undefined,
						page: 1,
						limit: endpointConfig.pagination.defaultLimit,
						pages: endpointConfig.pagination.includeTotal
							? 15
							: undefined,
					};
				}
			}

			return baseResponse;
		};

		return {
			url: fullPath + queryExample,
			method: endpointConfig.method,
			response: buildExampleResponse(),
		};
	};

	const buildFullQuery = () => {
		let query = [];

		// SELECT clause
		if (
			endpointConfig.selectedFields &&
			endpointConfig.selectedFields.length > 0
		) {
			const fields = endpointConfig.selectedFields
				.filter((f) => f.enabled && (f.column || f.expression))
				.map((f) => {
					let expr = f.expression || f.column;
					if (f.aggregation && f.aggregation !== "none") {
						expr =
							f.aggregation === "count" && !f.column
								? "COUNT(*)"
								: `${f.aggregation.toUpperCase()}(${f.column})`;
					}
					return f.alias ? `${expr} AS ${f.alias}` : expr;
				});
			query.push(`SELECT ${fields.join(", ")}`);
		} else {
			query.push(`SELECT *`);
		}

		// FROM clause
		if (endpointConfig.primaryTable) {
			query.push(
				`FROM ${endpointConfig.primaryTable}${
					endpointConfig.primaryTableAlias
						? ` AS ${endpointConfig.primaryTableAlias}`
						: ""
				}`
			);
		}

		// JOIN clauses
		if (endpointConfig.joins) {
			endpointConfig.joins
				.filter(
					(j) => j.enabled && j.table && j.leftColumn && j.rightColumn
				)
				.forEach((join) => {
					query.push(
						`${join.joinType.toUpperCase()} JOIN ${join.table}${
							join.alias ? ` AS ${join.alias}` : ""
						} ON ${
							endpointConfig.primaryTableAlias ||
							endpointConfig.primaryTable
						}.${join.leftColumn} = ${join.alias || join.table}.${
							join.rightColumn
						}${
							join.customCondition
								? ` ${join.customCondition}`
								: ""
						}`
					);
				});
		}

		// WHERE clause
		if (endpointConfig.filters && endpointConfig.filters.length > 0) {
			const conditions = endpointConfig.filters
				.filter((f) => f.enabled && f.column && f.operator)
				.map((f, index) => {
					let condition = "";
					if (index > 0) {
						condition += ` ${f.logicalOperator.toUpperCase()} `;
					}
					condition += `${f.column} ${f.operator.toUpperCase()}`;
					if (!["is_null", "is_not_null"].includes(f.operator)) {
						condition += ` ${f.value || "?"}`;
						if (
							f.secondValue &&
							["between", "not_between"].includes(f.operator)
						) {
							condition += ` AND ${f.secondValue}`;
						}
					}
					return condition;
				});

			if (conditions.length > 0) {
				query.push(`WHERE ${conditions.join("")}`);
			}
		}

		// ORDER BY clause
		if (endpointConfig.sorting && endpointConfig.sorting.length > 0) {
			const sorts = endpointConfig.sorting
				.filter((s) => s.enabled && s.column)
				.map((s) => `${s.column} ${s.direction.toUpperCase()}`);

			if (sorts.length > 0) {
				query.push(`ORDER BY ${sorts.join(", ")}`);
			}
		}

		// LIMIT clause
		if (endpointConfig.pagination?.enabled) {
			query.push(`LIMIT ${endpointConfig.pagination.defaultLimit}`);
		}

		return query.join("\n");
	};

	const preview = generatePreview();

	const tabs = [
		{ id: "basic", name: "Basic Info", icon: DocumentTextIcon },
		{ id: "http", name: "HTTP Config", icon: CogIcon },
		{ id: "params", name: "Parameters", icon: CogIcon },
		{ id: "tables", name: "Tables & Joins", icon: CogIcon },
		{ id: "fields", name: "Field Selection", icon: CogIcon },
		{ id: "filters", name: "Filtering", icon: CogIcon },
		{ id: "pagination", name: "Pagination", icon: CogIcon },
		{ id: "security", name: "Security", icon: CogIcon },
	];

	const isFormValid = () => {
		return (
			endpointConfig.name &&
			endpointConfig.path &&
			endpointConfig.primaryTable
		);
	};

	return (
		<div className="space-y-6">
			{/* Tabs */}
			<nav className=" flex justify-between overflow-x-auto">
				{tabs.map((tab) => {
					const Icon = tab.icon;
					return (
						<button
							key={tab.id}
							onClick={() => setActiveTab(tab.id)}
							className={`${
								activeTab === tab.id
									? "bg-[#1d1b1b] rounded-lg px-2 text-gray-200"
									: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
							} whitespace-nowrap cursor-pointer px-4 py-2 font-semibold text-sm flex items-center`}
						>
							<Icon className="h-4 w-4 mr-2" />
							{tab.name}
						</button>
					);
				})}
			</nav>

			{/* Endpoint Preview */}
			<div className="flex  gap-x-4 justify-between">
				<div className="bg-white w-full shadow rounded-lg p-3">
					<div className="space-y-4">
						<div className="flex space-x-4 items-center ">
							<p className="block text-sm font-medium text-gray-700 ">
								Endpoint URL
							</p>
							<p
								className={` items-center px-3 py-1 rounded-full text-xs font-semibold ${
									endpointConfig.method === "GET"
										? "bg-emerald-100 text-emerald-500"
										: endpointConfig.method === "POST"
										? "bg-blue-100 text-blue-800"
										: endpointConfig.method === "PUT"
										? "bg-yellow-100 text-yellow-800"
										: "bg-red-100 text-red-800"
								}`}
							>
								{endpointConfig.method}
							</p>
						</div>
						<div className="bg-gray-50 transition-all duration-500 ease-in-out border border-gray-200 rounded-md p-3 overflow-hidden">
							<code className="text-sm font-mono text-gray-800 break-all block transition-all duration-500 ease-in-out min-w-0 w-full">
								{preview.url || "Configure endpoint path above"}
							</code>
						</div>
					</div>
				</div>

				{/* View Mode Toggle */}
				<div className=" space-y-2.5 ">
					<div className="h-1/2 invisible">...</div>
					<ViewModeToggle
						viewMode={viewMode}
						onViewModeChange={handleViewModeChange}
						isAnimating={isTransitioning}
					/>
				</div>
			</div>

			{/* Endpoint Configuration */}
			<AnimatePresence mode="wait">
				{viewMode === "form" && (
					<motion.div
						key="form-view"
						// initial={{ opacity: 1, filter: "blur(10px)" }}
						// animate={{ opacity: 1, filter: "blur(0px)" }}
						// exit={{ opacity: 0, filter: "blur(10px)" }}
						// transition={{ duration: 0.3 }}
						className="grid grid-cols-1 lg:grid-cols-3 gap-6"
					>
						{/* Configuration Tabs */}
						<div className="lg:col-span-2  space-y-6">
							{/* Tab Navigation */}

							{/* Tab Content */}
							<div>
								<AnimatePresence mode="wait">
									{activeTab === "basic" && (
										<motion.div
											key="basic-tab"
											initial={{ opacity: 0, y: 0 }}
											animate={{ opacity: 1, y: 0 }}
											exit={{ opacity: 0, y: 0 }}
											transition={{
												duration: 0.2,
												ease: "easeInOut",
											}}
										>
											<BasicInfoSection
												config={endpointConfig}
												updateConfig={updateConfig}
											/>
										</motion.div>
									)}

									{activeTab === "http" && (
										<motion.div
											key="http-tab"
											initial={{ opacity: 0, y: 0 }}
											animate={{ opacity: 1, y: 0 }}
											exit={{ opacity: 0, y: 0 }}
											transition={{
												duration: 0.2,
												ease: "easeInOut",
											}}
										>
											<HTTPConfigSection
												config={endpointConfig}
												updateConfig={updateConfig}
											/>
										</motion.div>
									)}

									{activeTab === "params" && (
										<motion.div
											key="params-tab"
											initial={{ opacity: 0, y: 0 }}
											animate={{ opacity: 1, y: 0 }}
											exit={{ opacity: 0, y: 0 }}
											transition={{
												duration: 0.2,
												ease: "easeInOut",
											}}
										>
											<QueryParamsSection
												config={endpointConfig}
												updateConfig={updateConfig}
											/>
										</motion.div>
									)}

									{activeTab === "tables" && (
										<motion.div
											key="tables-tab"
											initial={{ opacity: 0, y: 0 }}
											animate={{ opacity: 1, y: 0 }}
											exit={{ opacity: 0, y: 0 }}
											transition={{
												duration: 0.2,
												ease: "easeInOut",
											}}
										>
											<TableConfigSection
												config={endpointConfig}
												updateConfig={updateConfig}
											/>
										</motion.div>
									)}

									{activeTab === "fields" && (
										<motion.div
											key="fields-tab"
											initial={{ opacity: 0, y: 0 }}
											animate={{ opacity: 1, y: 0 }}
											exit={{ opacity: 0, y: 0 }}
											transition={{
												duration: 0.2,
												ease: "easeInOut",
											}}
										>
											<FieldSelectionSection
												config={endpointConfig}
												updateConfig={updateConfig}
											/>
										</motion.div>
									)}

									{activeTab === "filters" && (
										<motion.div
											key="filters-tab"
											initial={{ opacity: 0, y: 0 }}
											animate={{ opacity: 1, y: 0 }}
											exit={{ opacity: 0, y: 0 }}
											transition={{
												duration: 0.2,
												ease: "easeInOut",
											}}
										>
											<FilteringSection
												config={endpointConfig}
												updateConfig={updateConfig}
											/>
										</motion.div>
									)}

									{activeTab === "pagination" && (
										<motion.div
											key="pagination-tab"
											initial={{ opacity: 0, y: 0 }}
											animate={{ opacity: 1, y: 0 }}
											exit={{ opacity: 0, y: 0 }}
											transition={{
												duration: 0.2,
												ease: "easeInOut",
											}}
										>
											<PaginationSection
												config={endpointConfig}
												updateConfig={updateConfig}
											/>
										</motion.div>
									)}

									{activeTab === "security" && (
										<motion.div
											key="security-tab"
											initial={{ opacity: 0, y: 0 }}
											animate={{ opacity: 1, y: 0 }}
											exit={{ opacity: 0, y: 0 }}
											transition={{
												duration: 0.2,
												ease: "easeInOut",
											}}
										>
											<SecuritySection
												config={endpointConfig}
												updateConfig={updateConfig}
											/>
										</motion.div>
									)}
								</AnimatePresence>
							</div>
						</div>

						{/* Preview Panel */}
						<div className="space-y-4">
							{/* SQL Query Preview */}
							{endpointConfig.primaryTable && (
								<div className="bg-white shadow  rounded-lg p-3">
									<div className="flex items-center  mb-2">
										{/* <CogIcon className="h-5 w-5 text-gray-400 mr-2" /> */}
										<h3 className=" font-medium text-black/80">
											Generated Query
										</h3>
									</div>

									<div className="bg-[#1d1b1b] rounded-lg p-3 overflow-x-auto">
										<pre className="text-sm text-emerald-400 whitespace-pre-wrap">
											{buildFullQuery()}
										</pre>
									</div>
								</div>
							)}

							{/* Example Response */}
							<div className="bg-white shadow rounded-lg p-3">
								<div className="flex items-center mb-1">
									{/* <CogIcon className="h-5 w-5 text-gray-400 mr-2" /> */}
									<h3 className="font-semibold text-sm text-black/85">
										Response
									</h3>
								</div>

								<div className="bg-[#1d1b1b] rounded-lg p-4 overflow-x-auto">
									<pre className="text-sm text-green-400">
										{JSON.stringify(
											preview.response,
											null,
											2
										)}
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
									Test your endpoint once it's created to
									ensure it works as expected.
								</p>

								<button
									disabled={!isFormValid()}
									className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
								>
									<PlayIcon className="h-4 w-4 mr-2" />
									Test Endpoint
								</button>
							</div>
						</div>
					</motion.div>
				)}

				{viewMode === "flow" && (
					<motion.div
						key="flow-view"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						transition={{ duration: 0.3 }}
						className="space-y-6"
					>
						{/* Flow Builder Header */}
						<div className="bg-white shadow rounded-lg p-6">
							<div className="flex justify-between items-center">
								<div>
									<h3 className="text-lg font-medium text-gray-900">
										Visual Flow Builder
									</h3>
									<p className="text-sm text-gray-600 mt-1">
										Drag and connect components to build
										your endpoint visually
									</p>
								</div>
								<div className="flex space-x-2">
									<button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
										Save Flow
									</button>
									<button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
										Auto Layout
									</button>
								</div>
							</div>
						</div>

						{/* Flow Builder Component */}
						<FlowBuilder
							config={endpointConfig}
							updateConfig={updateConfig}
						/>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
