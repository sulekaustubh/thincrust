import React from "react";
import { FunnelIcon, PlusIcon } from "@heroicons/react/24/outline";

const FilteringSection = ({ config, updateConfig, tables = [] }) => {
	const operators = [
		{ value: "eq", label: "Equals (=)", description: "Exact match" },
		{ value: "neq", label: "Not Equals (!=)", description: "Not equal to" },
		{ value: "gt", label: "Greater Than (>)", description: "Greater than" },
		{
			value: "gte",
			label: "Greater Than Equal (>=)",
			description: "Greater than or equal",
		},
		{ value: "lt", label: "Less Than (<)", description: "Less than" },
		{
			value: "lte",
			label: "Less Than Equal (<=)",
			description: "Less than or equal",
		},
		{
			value: "like",
			label: "Like (LIKE)",
			description: "Pattern matching with %",
		},
		{
			value: "ilike",
			label: "Case Insensitive Like",
			description: "Case insensitive pattern matching",
		},
		{ value: "in", label: "In (IN)", description: "Value in list" },
		{
			value: "not_in",
			label: "Not In (NOT IN)",
			description: "Value not in list",
		},
		{ value: "is_null", label: "Is Null", description: "Field is null" },
		{
			value: "is_not_null",
			label: "Is Not Null",
			description: "Field is not null",
		},
		{
			value: "between",
			label: "Between",
			description: "Value between two values",
		},
		{
			value: "not_between",
			label: "Not Between",
			description: "Value not between two values",
		},
	];

	const logicalOperators = [
		{ value: "and", label: "AND" },
		{ value: "or", label: "OR" },
	];

	const valueTypes = [
		{ value: "static", label: "Static Value" },
		{ value: "parameter", label: "Query Parameter" },
		{ value: "function", label: "Function (NOW(), etc.)" },
	];

	const handleFilterChange = (index, field, value) => {
		const newFilters = [...(config.filters || [])];
		newFilters[index] = { ...newFilters[index], [field]: value };
		updateConfig("filters", newFilters);
	};

	const addFilter = () => {
		const newFilters = [
			...(config.filters || []),
			{
				column: "",
				operator: "eq",
				valueType: "static",
				value: "",
				secondValue: "", // For BETWEEN operations
				logicalOperator: "and",
				groupId: null,
				enabled: true,
			},
		];
		updateConfig("filters", newFilters);
	};

	const removeFilter = (index) => {
		const newFilters = config.filters.filter((_, i) => i !== index);
		updateConfig("filters", newFilters);
	};

	const addFilterGroup = () => {
		const groupId = Date.now().toString();
		const newFilters = [
			...(config.filters || []),
			{
				column: "",
				operator: "eq",
				valueType: "static",
				value: "",
				logicalOperator: "and",
				groupId: groupId,
				enabled: true,
				isGroupStart: true,
			},
		];
		updateConfig("filters", newFilters);
	};

	const toggleFilter = (index) => {
		const newFilters = [...config.filters];
		newFilters[index].enabled = !newFilters[index].enabled;
		updateConfig("filters", newFilters);
	};

	// Get available columns from selected table
	const getTableColumns = (tableName) => {
		// Mock columns - in real implementation, this would come from Supabase introspection
		const mockColumns = {
			thryl_users: [
				"id",
				"name",
				"email",
				"age",
				"created_at",
				"updated_at",
				"status",
				"savings",
			],
			thryl_products: [
				"id",
				"name",
				"price",
				"category",
				"created_at",
				"stock_quantity",
			],
			thryl_orders: [
				"id",
				"user_id",
				"product_id",
				"quantity",
				"total_amount",
				"order_date",
				"status",
			],
		};
		return mockColumns[tableName] || [];
	};

	const availableColumns = config.primaryTable
		? getTableColumns(config.primaryTable)
		: [];

	return (
		<div className="bg-white shadow rounded-lg p-6">
			<div className="flex items-center justify-between mb-6">
				<div className="flex items-center">
					<FunnelIcon className="h-5 w-5 text-indigo-500 mr-2" />
					<h3 className="text-lg font-medium text-gray-900">
						Filtering & Conditions
					</h3>
				</div>
				<div className="flex space-x-2">
					<button
						type="button"
						onClick={addFilter}
						className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
					>
						<PlusIcon className="h-4 w-4 mr-1" />
						Add Filter
					</button>
					<button
						type="button"
						onClick={addFilterGroup}
						className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
					>
						Add Group
					</button>
				</div>
			</div>

			{!config.primaryTable && (
				<div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-6">
					<p className="text-sm text-yellow-800">
						Please select a primary table in the Table Configuration
						section to enable filtering options.
					</p>
				</div>
			)}

			{config.filters && config.filters.length > 0 ? (
				<div className="space-y-4">
					{config.filters.map((filter, index) => (
						<div
							key={index}
							className={`border rounded-lg p-4 ${
								filter.enabled
									? "border-gray-200 bg-white"
									: "border-gray-100 bg-gray-50"
							}`}
						>
							<div className="flex items-center justify-between mb-4">
								<div className="flex items-center space-x-2">
									<input
										type="checkbox"
										checked={filter.enabled}
										onChange={() => toggleFilter(index)}
										className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
									/>
									<span className="text-sm font-medium text-gray-700">
										Filter {index + 1}
										{filter.groupId && (
											<span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
												Group
											</span>
										)}
									</span>
								</div>
								<button
									type="button"
									onClick={() => removeFilter(index)}
									className="text-red-600 hover:text-red-800 text-sm"
								>
									Remove
								</button>
							</div>

							{index > 0 && (
								<div className="mb-4">
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Logical Operator
									</label>
									<select
										value={filter.logicalOperator}
										onChange={(e) =>
											handleFilterChange(
												index,
												"logicalOperator",
												e.target.value
											)
										}
										className="block w-32 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
									>
										{logicalOperators.map((op) => (
											<option
												key={op.value}
												value={op.value}
											>
												{op.label}
											</option>
										))}
									</select>
								</div>
							)}

							<div className="grid grid-cols-3 gap-4 mb-4">
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Column
									</label>
									<select
										value={filter.column}
										onChange={(e) =>
											handleFilterChange(
												index,
												"column",
												e.target.value
											)
										}
										disabled={!config.primaryTable}
										className="block w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100"
									>
										<option value="">
											Select column...
										</option>
										{availableColumns.map((column) => (
											<option
												key={column}
												value={column}
											>
												{column}
											</option>
										))}
									</select>
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Operator
									</label>
									<select
										value={filter.operator}
										onChange={(e) =>
											handleFilterChange(
												index,
												"operator",
												e.target.value
											)
										}
										className="block w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
									>
										{operators.map((op) => (
											<option
												key={op.value}
												value={op.value}
												title={op.description}
											>
												{op.label}
											</option>
										))}
									</select>
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Value Type
									</label>
									<select
										value={filter.valueType}
										onChange={(e) =>
											handleFilterChange(
												index,
												"valueType",
												e.target.value
											)
										}
										className="block w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
									>
										{valueTypes.map((type) => (
											<option
												key={type.value}
												value={type.value}
											>
												{type.label}
											</option>
										))}
									</select>
								</div>
							</div>

							{/* Value input(s) */}
							{!["is_null", "is_not_null"].includes(
								filter.operator
							) && (
								<div className="mb-4">
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Value{" "}
										{filter.operator === "between" ||
										filter.operator === "not_between"
											? "(From)"
											: ""}
									</label>
									{filter.valueType === "parameter" ? (
										<select
											value={filter.value}
											onChange={(e) =>
												handleFilterChange(
													index,
													"value",
													e.target.value
												)
											}
											className="block w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
										>
											<option value="">
												Select parameter...
											</option>
											{(config.queryParams || []).map(
												(param) => (
													<option
														key={param.name}
														value={`{{${param.name}}}`}
													>
														{param.name} (
														{param.type})
													</option>
												)
											)}
										</select>
									) : filter.valueType === "function" ? (
										<select
											value={filter.value}
											onChange={(e) =>
												handleFilterChange(
													index,
													"value",
													e.target.value
												)
											}
											className="block w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
										>
											<option value="">
												Select function...
											</option>
											<option value="NOW()">
												NOW() - Current timestamp
											</option>
											<option value="TODAY()">
												TODAY() - Current date
											</option>
											<option value="CURRENT_USER()">
												CURRENT_USER() - Current user ID
											</option>
										</select>
									) : (
										<input
											type="text"
											value={filter.value}
											onChange={(e) =>
												handleFilterChange(
													index,
													"value",
													e.target.value
												)
											}
											placeholder={
												filter.operator === "in" ||
												filter.operator === "not_in"
													? "Enter comma-separated values"
													: "Enter value"
											}
											className="block w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black/75 placeholder:text-gray-600"
										/>
									)}
								</div>
							)}

							{/* Second value for BETWEEN operations */}
							{(filter.operator === "between" ||
								filter.operator === "not_between") && (
								<div className="mb-4">
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Value (To)
									</label>
									<input
										type="text"
										value={filter.secondValue || ""}
										onChange={(e) =>
											handleFilterChange(
												index,
												"secondValue",
												e.target.value
											)
										}
										placeholder="Enter second value"
										className="block w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black/75 placeholder:text-gray-600"
									/>
								</div>
							)}

							{/* Filter preview */}
							{filter.column && filter.operator && (
								<div className="bg-gray-50 border border-gray-200 rounded-md p-3">
									<p className="text-xs font-mono text-gray-600">
										Preview: {filter.column}{" "}
										{operators
											.find(
												(op) =>
													op.value === filter.operator
											)
											?.label.toLowerCase()}{" "}
										{filter.value || "?"}
										{filter.secondValue &&
											` AND ${filter.secondValue}`}
									</p>
								</div>
							)}
						</div>
					))}
				</div>
			) : (
				<div className="text-center py-6">
					<p className="text-sm text-gray-500">No filters defined</p>
					<p className="text-xs text-gray-400 mt-1">
						Add filters to control which records are returned by
						your endpoint
					</p>
				</div>
			)}
		</div>
	);
};

export default FilteringSection;
