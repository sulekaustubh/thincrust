import React from "react";
import { ArrowsUpDownIcon } from "@heroicons/react/24/outline";

const PaginationSection = ({ config, updateConfig }) => {
	const sortDirections = [
		{ value: "asc", label: "Ascending (A-Z, 1-9)" },
		{ value: "desc", label: "Descending (Z-A, 9-1)" },
	];

	const handleSortChange = (index, field, value) => {
		const newSorts = [...(config.sorting || [])];
		newSorts[index] = { ...newSorts[index], [field]: value };
		updateConfig("sorting", newSorts);
	};

	const addSort = () => {
		const newSorts = [
			...(config.sorting || []),
			{
				column: "",
				direction: "asc",
				enabled: true,
			},
		];
		updateConfig("sorting", newSorts);
	};

	const removeSort = (index) => {
		const newSorts = config.sorting.filter((_, i) => i !== index);
		updateConfig("sorting", newSorts);
	};

	const toggleSort = (index) => {
		const newSorts = [...config.sorting];
		newSorts[index].enabled = !newSorts[index].enabled;
		updateConfig("sorting", newSorts);
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

	return (
		<div className="bg-white shadow rounded-lg p-6">
			<div className="flex items-center mb-6">
				<ArrowsUpDownIcon className="h-5 w-5 text-indigo-500 mr-2" />
				<h3 className="text-lg font-medium text-gray-900">
					Pagination & Sorting
				</h3>
			</div>

			<div className="space-y-6">
				{/* Pagination Settings */}
				<div>
					<h4 className="text-sm font-medium text-gray-900 mb-4">
						Pagination Configuration
					</h4>
					<div className="grid grid-cols-3 gap-4">
						<div>
							<label className="flex items-center">
								<input
									type="checkbox"
									checked={
										config.pagination?.enabled || false
									}
									onChange={(e) =>
										updateConfig("pagination", {
											...config.pagination,
											enabled: e.target.checked,
										})
									}
									className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
								/>
								<span className="ml-2 text-sm text-gray-700">
									Enable Pagination
								</span>
							</label>
						</div>

						<div>
							<label
								htmlFor="default-limit"
								className="block text-sm font-medium text-gray-700"
							>
								Default Limit
							</label>
							<input
								type="number"
								id="default-limit"
								min="1"
								max="1000"
								value={config.pagination?.defaultLimit || 10}
								onChange={(e) =>
									updateConfig("pagination", {
										...config.pagination,
										defaultLimit:
											parseInt(e.target.value) || 10,
									})
								}
								disabled={!config.pagination?.enabled}
								className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100 text-black/75 placeholder:text-gray-600"
							/>
						</div>

						<div>
							<label
								htmlFor="max-limit"
								className="block text-sm font-medium text-gray-700"
							>
								Maximum Limit
							</label>
							<input
								type="number"
								id="max-limit"
								min="1"
								max="10000"
								value={config.pagination?.maxLimit || 100}
								onChange={(e) =>
									updateConfig("pagination", {
										...config.pagination,
										maxLimit:
											parseInt(e.target.value) || 100,
									})
								}
								disabled={!config.pagination?.enabled}
								className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100 text-black/75 placeholder:text-gray-600"
							/>
						</div>
					</div>

					{config.pagination?.enabled && (
						<div className="mt-4 grid grid-cols-2 gap-4">
							<div>
								<label className="flex items-center">
									<input
										type="checkbox"
										checked={
											config.pagination
												?.allowCustomLimit || false
										}
										onChange={(e) =>
											updateConfig("pagination", {
												...config.pagination,
												allowCustomLimit:
													e.target.checked,
											})
										}
										className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
									/>
									<span className="ml-2 text-sm text-gray-700">
										Allow custom limit parameter
									</span>
								</label>
							</div>

							<div>
								<label className="flex items-center">
									<input
										type="checkbox"
										checked={
											config.pagination?.includeTotal ||
											false
										}
										onChange={(e) =>
											updateConfig("pagination", {
												...config.pagination,
												includeTotal: e.target.checked,
											})
										}
										className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
									/>
									<span className="ml-2 text-sm text-gray-700">
										Include total count in response
									</span>
								</label>
							</div>
						</div>
					)}
				</div>

				{/* Sorting Configuration */}
				<div>
					<div className="flex items-center justify-between mb-4">
						<h4 className="text-sm font-medium text-gray-900">
							Default Sorting
						</h4>
						<button
							type="button"
							onClick={addSort}
							disabled={availableColumns.length === 0}
							className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
						>
							Add Sort
						</button>
					</div>

					{availableColumns.length === 0 && (
						<div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-4">
							<p className="text-sm text-yellow-800">
								Please configure tables in the Table
								Configuration section to enable sorting options.
							</p>
						</div>
					)}

					{config.sorting && config.sorting.length > 0 ? (
						<div className="space-y-3">
							{config.sorting.map((sort, index) => (
								<div
									key={index}
									className={`border rounded-lg p-4 ${
										sort.enabled
											? "border-gray-200 bg-white"
											: "border-gray-100 bg-gray-50"
									}`}
								>
									<div className="flex items-center justify-between mb-3">
										<div className="flex items-center space-x-2">
											<input
												type="checkbox"
												checked={sort.enabled}
												onChange={() =>
													toggleSort(index)
												}
												className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
											/>
											<span className="text-sm font-medium text-gray-700">
												Sort {index + 1}
											</span>
										</div>
										<button
											type="button"
											onClick={() => removeSort(index)}
											className="text-red-600 hover:text-red-800 text-sm"
										>
											Remove
										</button>
									</div>

									<div className="grid grid-cols-2 gap-4">
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">
												Column
											</label>
											<select
												value={sort.column}
												onChange={(e) =>
													handleSortChange(
														index,
														"column",
														e.target.value
													)
												}
												className="block w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
											>
												<option value="">
													Select column...
												</option>
												{availableColumns.map(
													(column) => (
														<option
															key={column.value}
															value={column.value}
														>
															{column.label}
														</option>
													)
												)}
											</select>
										</div>

										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">
												Direction
											</label>
											<select
												value={sort.direction}
												onChange={(e) =>
													handleSortChange(
														index,
														"direction",
														e.target.value
													)
												}
												className="block w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
											>
												{sortDirections.map(
													(direction) => (
														<option
															key={
																direction.value
															}
															value={
																direction.value
															}
														>
															{direction.label}
														</option>
													)
												)}
											</select>
										</div>
									</div>

									{sort.column && (
										<div className="mt-3 bg-gray-50 border border-gray-200 rounded-md p-3">
											<p className="text-xs font-mono text-gray-600">
												Preview: ORDER BY {sort.column}{" "}
												{sort.direction.toUpperCase()}
											</p>
										</div>
									)}
								</div>
							))}
						</div>
					) : (
						<div className="text-center py-6">
							<p className="text-sm text-gray-500">
								No sorting rules defined
							</p>
							<p className="text-xs text-gray-400 mt-1">
								Add sorting to control the order of returned
								records
							</p>
						</div>
					)}
				</div>

				{/* Advanced Options */}
				<div>
					<h4 className="text-sm font-medium text-gray-900 mb-4">
						Advanced Options
					</h4>
					<div className="space-y-3">
						<div>
							<label className="flex items-center">
								<input
									type="checkbox"
									checked={config.allowCustomSorting || false}
									onChange={(e) =>
										updateConfig(
											"allowCustomSorting",
											e.target.checked
										)
									}
									className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
								/>
								<span className="ml-2 text-sm text-gray-700">
									Allow custom sorting via query parameters
								</span>
							</label>
							{config.allowCustomSorting && (
								<p className="ml-6 text-xs text-gray-500 mt-1">
									Users can add
									?sort=column_name&order=asc|desc to
									customize sorting
								</p>
							)}
						</div>

						<div>
							<label className="flex items-center">
								<input
									type="checkbox"
									checked={config.enableDistinct || false}
									onChange={(e) =>
										updateConfig(
											"enableDistinct",
											e.target.checked
										)
									}
									className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
								/>
								<span className="ml-2 text-sm text-gray-700">
									Enable DISTINCT results
								</span>
							</label>
							{config.enableDistinct && (
								<p className="ml-6 text-xs text-gray-500 mt-1">
									Removes duplicate rows from the result set
								</p>
							)}
						</div>

						<div>
							<label
								htmlFor="result-limit"
								className="block text-sm font-medium text-gray-700"
							>
								Hard Result Limit (Safety)
							</label>
							<input
								type="number"
								id="result-limit"
								min="1"
								max="50000"
								value={config.hardLimit || 10000}
								onChange={(e) =>
									updateConfig(
										"hardLimit",
										parseInt(e.target.value) || 10000
									)
								}
								className="mt-1 block w-32 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black/75 placeholder:text-gray-600"
							/>
							<p className="text-xs text-gray-500 mt-1">
								Maximum number of records that can be returned
								regardless of pagination settings
							</p>
						</div>
					</div>
				</div>

				{/* Query Preview */}
				{(config.sorting?.filter((s) => s.enabled && s.column).length >
					0 ||
					config.pagination?.enabled) && (
					<div className="bg-gray-50 border border-gray-200 rounded-md p-4">
						<h5 className="text-sm font-medium text-gray-900 mb-2">
							Query Modifiers Preview
						</h5>
						<div className="text-xs font-mono text-gray-600 space-y-1">
							{config.sorting?.filter(
								(s) => s.enabled && s.column
							).length > 0 && (
								<div>
									ORDER BY{" "}
									{config.sorting
										.filter((s) => s.enabled && s.column)
										.map(
											(s) =>
												`${
													s.column
												} ${s.direction.toUpperCase()}`
										)
										.join(", ")}
								</div>
							)}
							{config.pagination?.enabled && (
								<div>
									LIMIT {config.pagination.defaultLimit}{" "}
									OFFSET {"{{offset}}"}
								</div>
							)}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default PaginationSection;
