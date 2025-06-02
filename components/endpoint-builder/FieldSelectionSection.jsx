import React, { useState } from "react";
import {
	RectangleGroupIcon,
	PlusIcon,
	PencilIcon,
	XMarkIcon,
} from "@heroicons/react/24/outline";

const FieldSelectionSection = ({ config, updateConfig }) => {
	const [advancedFieldIndex, setAdvancedFieldIndex] = useState(null);

	const aggregationFunctions = [
		{ value: "none", label: "No Aggregation" },
		{ value: "count", label: "COUNT()" },
		{ value: "sum", label: "SUM()" },
		{ value: "avg", label: "AVG()" },
		{ value: "min", label: "MIN()" },
		{ value: "max", label: "MAX()" },
		{ value: "group_concat", label: "GROUP_CONCAT()" },
		{ value: "count_distinct", label: "COUNT(DISTINCT)" },
	];

	const handleFieldChange = (index, field, value) => {
		const newFields = [...(config.selectedFields || [])];
		newFields[index] = { ...newFields[index], [field]: value };
		updateConfig("selectedFields", newFields);
	};

	const addField = () => {
		const newFields = [
			...(config.selectedFields || []),
			{
				column: "",
				alias: "",
				aggregation: "none",
				enabled: true,
				expression: "",
			},
		];
		updateConfig("selectedFields", newFields);
	};

	const removeField = (index) => {
		const newFields = config.selectedFields.filter((_, i) => i !== index);
		updateConfig("selectedFields", newFields);
	};

	const toggleField = (index) => {
		const newFields = [...config.selectedFields];
		newFields[index].enabled = !newFields[index].enabled;
		updateConfig("selectedFields", newFields);
	};

	const selectAllFields = () => {
		const allColumns = getAvailableColumns();
		const newFields = allColumns.map((col) => ({
			column: col.value,
			alias: "",
			aggregation: "none",
			enabled: true,
			expression: "",
		}));
		updateConfig("selectedFields", newFields);
	};

	const clearAllFields = () => {
		updateConfig("selectedFields", []);
	};

	const initializeWithAllColumns = () => {
		const allColumns = getAvailableColumns();
		const newFields = allColumns.map((col) => ({
			column: col.value,
			alias: "",
			aggregation: "none",
			enabled: true,
			expression: "",
		}));
		updateConfig("selectedFields", newFields);
	};

	// Get available columns from primary table and joins
	const getAvailableColumns = () => {
		const columns = [];

		// Primary table columns
		if (config.primaryTable) {
			const primaryColumns = getTableColumns(config.primaryTable);
			const prefix = config.primaryTableAlias || config.primaryTable;
			primaryColumns.forEach((col) => {
				columns.push({
					value: `${prefix}.${col}`,
					label: `${prefix}.${col}`,
					table: config.primaryTable,
					column: col,
				});
			});
		}

		// Joined table columns
		if (config.joins) {
			config.joins
				.filter((j) => j.enabled && j.table)
				.forEach((join) => {
					const joinColumns = getTableColumns(join.table);
					const prefix = join.alias || join.table;
					joinColumns.forEach((col) => {
						columns.push({
							value: `${prefix}.${col}`,
							label: `${prefix}.${col}`,
							table: join.table,
							column: col,
						});
					});
				});
		}

		return columns;
	};

	const getTableColumns = (tableName) => {
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
			thryl_savings_account: [
				"id",
				"user_id",
				"account_type",
				"balance",
				"created_at",
				"updated_at",
			],
			thryl_investment_account: [
				"id",
				"user_id",
				"portfolio_value",
				"risk_level",
				"created_at",
				"updated_at",
			],
		};
		return mockColumns[tableName] || [];
	};

	const availableColumns = getAvailableColumns();

	const buildFieldExpression = (field) => {
		if (field.expression) {
			return field.expression;
		}

		if (field.aggregation === "none") {
			return field.column;
		}

		switch (field.aggregation) {
			case "count":
				return field.column ? `COUNT(${field.column})` : "COUNT(*)";
			case "count_distinct":
				return `COUNT(DISTINCT ${field.column})`;
			case "group_concat":
				return `GROUP_CONCAT(${field.column})`;
			default:
				return `${field.aggregation.toUpperCase()}(${field.column})`;
		}
	};

	const hasAdvancedConfig = (field) => {
		return field.aggregation !== "none" || field.expression;
	};

	const toggleSelectAll = () => {
		const allEnabled = config.selectedFields?.every((f) => f.enabled);
		const newFields = [...(config.selectedFields || [])];
		newFields.forEach((field) => {
			field.enabled = !allEnabled;
		});
		updateConfig("selectedFields", newFields);
	};

	return (
		<div className="bg-white shadow rounded-lg p-6">
			<div className="flex items-center justify-between mb-6">
				<div className="flex items-center">
					<RectangleGroupIcon className="h-5 w-5 text-indigo-500 mr-2" />
					<h3 className="text-lg font-medium text-gray-900">
						Field Selection
					</h3>
				</div>
			</div>

			{/* Field Selection Mode */}
			<div className="mb-6">
				<h4 className="text-sm font-medium text-gray-900 mb-3">
					Selection Mode
				</h4>
				<div className="space-y-2">
					<label className="flex items-center">
						<input
							type="radio"
							name="selectionMode"
							checked={
								!config.selectedFields ||
								config.selectedFields.length === 0
							}
							onChange={() => updateConfig("selectedFields", [])}
							className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
						/>
						<span className="ml-2 text-sm text-gray-700">
							Select all fields (SELECT *)
						</span>
					</label>
					<label className="flex items-center">
						<input
							type="radio"
							name="selectionMode"
							checked={
								config.selectedFields &&
								config.selectedFields.length > 0
							}
							onChange={() => {
								if (
									!config.selectedFields ||
									config.selectedFields.length === 0
								) {
									initializeWithAllColumns();
								}
							}}
							className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
						/>
						<span className="ml-2 text-sm text-gray-700">
							Select specific fields
						</span>
					</label>
				</div>
			</div>

			{availableColumns.length === 0 && (
				<div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-6">
					<p className="text-sm text-yellow-800">
						Please configure tables in the Table Configuration
						section to enable field selection.
					</p>
				</div>
			)}

			{config.selectedFields && config.selectedFields.length > 0 ? (
				<div>
					{/* Table Header */}
					<div className="mb-4 flex justify-between items-center">
						<div className="flex space-x-2">
							<button
								type="button"
								onClick={toggleSelectAll}
								className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
							>
								{config.selectedFields?.every((f) => f.enabled)
									? "Deselect All"
									: "Select All"}
							</button>
							<button
								type="button"
								onClick={addField}
								className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
							>
								<PlusIcon className="h-4 w-4 mr-1" />
								Add Custom Field
							</button>
						</div>
					</div>

					{/* Table Structure */}
					<div className="border border-gray-200 rounded-lg overflow-hidden">
						<table className="min-w-full divide-y divide-gray-200">
							<thead className="bg-gray-50">
								<tr>
									<th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-20">
										Selected
									</th>
									<th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Column Name
									</th>
									<th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Alias (Optional)
									</th>
									<th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">
										Advanced
									</th>
									<th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16">
										Actions
									</th>
								</tr>
							</thead>
							<tbody className="bg-white divide-y divide-gray-200">
								{config.selectedFields.map((field, index) => (
									<tr
										key={index}
										className={
											field.enabled
												? ""
												: "bg-gray-50 opacity-60"
										}
									>
										{/* Selected Checkbox */}
										<td className="px-4 py-3 whitespace-nowrap">
											<input
												type="checkbox"
												checked={field.enabled}
												onChange={() =>
													toggleField(index)
												}
												className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
											/>
										</td>

										{/* Column Name */}
										<td className="px-4 py-3">
											{field.column ? (
												<div>
													<div className="text-sm font-medium text-gray-900">
														{field.column}
													</div>
													{hasAdvancedConfig(
														field
													) && (
														<div className="text-xs text-indigo-600 mt-1">
															{field.aggregation !==
																"none" && (
																<span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800 mr-1">
																	{field.aggregation.toUpperCase()}
																</span>
															)}
															{field.expression && (
																<span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800">
																	Custom
																	Expression
																</span>
															)}
														</div>
													)}
												</div>
											) : (
												<select
													value={field.column}
													onChange={(e) =>
														handleFieldChange(
															index,
															"column",
															e.target.value
														)
													}
													className="block w-full border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
												>
													<option value="">
														Select column...
													</option>
													{availableColumns.map(
														(column) => (
															<option
																key={
																	column.value
																}
																value={
																	column.value
																}
															>
																{column.label}
															</option>
														)
													)}
												</select>
											)}
										</td>

										{/* Alias */}
										<td className="px-4 py-3">
											<input
												type="text"
												value={field.alias}
												onChange={(e) =>
													handleFieldChange(
														index,
														"alias",
														e.target.value
													)
												}
												placeholder="e.g., user_count"
												className="block w-full border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black/75 placeholder:text-gray-600"
											/>
										</td>

										{/* Advanced */}
										<td className="px-4 py-3 whitespace-nowrap">
											<button
												type="button"
												onClick={() =>
													setAdvancedFieldIndex(index)
												}
												className={`inline-flex items-center p-1 border border-gray-300 shadow-sm text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
													hasAdvancedConfig(field)
														? "bg-indigo-100 text-indigo-700 border-indigo-300"
														: "bg-white text-gray-700 hover:bg-gray-50"
												}`}
											>
												<PencilIcon className="h-4 w-4" />
											</button>
										</td>

										{/* Actions */}
										<td className="px-4 py-3 whitespace-nowrap">
											<button
												type="button"
												onClick={() =>
													removeField(index)
												}
												className="text-red-600 hover:text-red-800"
											>
												<XMarkIcon className="h-4 w-4" />
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>

					{/* Advanced Configuration Modal */}
					{advancedFieldIndex !== null && (
						<div
							className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
							onClick={() => setAdvancedFieldIndex(null)}
						>
							<div
								className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white"
								onClick={(e) => e.stopPropagation()}
							>
								<div className="mt-3">
									<div className="flex items-center justify-between mb-4">
										<h3 className="text-lg font-medium text-gray-900">
											Advanced Field Configuration
										</h3>
										<button
											onClick={() =>
												setAdvancedFieldIndex(null)
											}
											className="text-gray-400 hover:text-gray-600"
										>
											<XMarkIcon className="h-5 w-5" />
										</button>
									</div>

									<div className="space-y-4">
										{/* Aggregation */}
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">
												Aggregation Function
											</label>
											<select
												value={
													config.selectedFields[
														advancedFieldIndex
													]?.aggregation || "none"
												}
												onChange={(e) =>
													handleFieldChange(
														advancedFieldIndex,
														"aggregation",
														e.target.value
													)
												}
												className="block w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
											>
												{aggregationFunctions.map(
													(func) => (
														<option
															key={func.value}
															value={func.value}
														>
															{func.label}
														</option>
													)
												)}
											</select>
										</div>

										{/* Custom Expression */}
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">
												Custom Expression
												<span className="text-xs text-gray-500 ml-1">
													Overrides column and
													aggregation
												</span>
											</label>
											<textarea
												value={
													config.selectedFields[
														advancedFieldIndex
													]?.expression || ""
												}
												onChange={(e) =>
													handleFieldChange(
														advancedFieldIndex,
														"expression",
														e.target.value
													)
												}
												placeholder="e.g., CASE WHEN age >= 18 THEN 'adult' ELSE 'minor' END"
												rows={3}
												className="block w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black/75 placeholder:text-gray-600"
											/>
										</div>

										{/* Preview */}
										{(config.selectedFields[
											advancedFieldIndex
										]?.column ||
											config.selectedFields[
												advancedFieldIndex
											]?.expression) && (
											<div className="bg-gray-50 border border-gray-200 rounded-md p-3">
												<p className="text-xs font-mono text-gray-600">
													Preview:{" "}
													{buildFieldExpression(
														config.selectedFields[
															advancedFieldIndex
														]
													)}
													{config.selectedFields[
														advancedFieldIndex
													]?.alias &&
														` AS ${config.selectedFields[advancedFieldIndex].alias}`}
												</p>
											</div>
										)}
									</div>

									<div className="flex justify-end space-x-3 mt-6">
										<button
											onClick={() =>
												setAdvancedFieldIndex(null)
											}
											className="px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
										>
											Done
										</button>
									</div>
								</div>
							</div>
						</div>
					)}

					{/* Aggregation Warning */}
					{config.selectedFields.some(
						(f) => f.enabled && f.aggregation !== "none"
					) && (
						<div className="bg-blue-50 border border-blue-200 rounded-md p-4 mt-4">
							<p className="text-sm text-blue-800">
								<strong>Note:</strong> When using aggregation
								functions, you may need to add GROUP BY clauses
								in the filtering section or configure
								appropriate grouping.
							</p>
						</div>
					)}
				</div>
			) : (
				<div className="text-center py-6">
					<p className="text-sm text-gray-500">
						All fields will be selected (SELECT *)
					</p>
					<p className="text-xs text-gray-400 mt-1">
						Choose "Select specific fields" to customize the
						response structure
					</p>
				</div>
			)}

			{/* Query Preview */}
			{config.selectedFields && config.selectedFields.length > 0 && (
				<div className="mt-6 bg-gray-50 border border-gray-200 rounded-md p-4">
					<h5 className="text-sm font-medium text-gray-900 mb-2">
						SELECT Clause Preview
					</h5>
					<div className="text-xs font-mono text-gray-600">
						SELECT{" "}
						{config.selectedFields
							.filter(
								(f) => f.enabled && (f.column || f.expression)
							)
							.map((f) => {
								const expr = buildFieldExpression(f);
								return f.alias ? `${expr} AS ${f.alias}` : expr;
							})
							.join(", ") || "*"}
					</div>
				</div>
			)}

			{/* Advanced Options */}
			<div className="mt-6">
				<h4 className="text-sm font-medium text-gray-900 mb-4">
					Advanced Options
				</h4>
				<div className="space-y-3">
					<div>
						<label className="flex items-center">
							<input
								type="checkbox"
								checked={config.allowFieldSelection || false}
								onChange={(e) =>
									updateConfig(
										"allowFieldSelection",
										e.target.checked
									)
								}
								className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
							/>
							<span className="ml-2 text-sm text-gray-700">
								Allow dynamic field selection via query
								parameters
							</span>
						</label>
						{config.allowFieldSelection && (
							<p className="ml-6 text-xs text-gray-500 mt-1">
								Users can add ?fields=column1,column2 to
								customize response fields
							</p>
						)}
					</div>

					<div>
						<label className="flex items-center">
							<input
								type="checkbox"
								checked={config.excludeNullFields || false}
								onChange={(e) =>
									updateConfig(
										"excludeNullFields",
										e.target.checked
									)
								}
								className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
							/>
							<span className="ml-2 text-sm text-gray-700">
								Exclude null fields from response
							</span>
						</label>
					</div>

					<div>
						<label className="flex items-center">
							<input
								type="checkbox"
								checked={config.flattenNestedObjects || false}
								onChange={(e) =>
									updateConfig(
										"flattenNestedObjects",
										e.target.checked
									)
								}
								className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
							/>
							<span className="ml-2 text-sm text-gray-700">
								Flatten nested JSON objects
							</span>
						</label>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FieldSelectionSection;
