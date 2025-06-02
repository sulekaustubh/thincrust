import React from "react";
import { TableCellsIcon, PlusIcon } from "@heroicons/react/24/outline";

const TableConfigSection = ({ config, updateConfig, tables = [] }) => {
	const joinTypes = [
		{
			value: "inner",
			label: "INNER JOIN",
			description:
				"Returns records that have matching values in both tables",
		},
		{
			value: "left",
			label: "LEFT JOIN",
			description:
				"Returns all records from the left table, and matching records from the right table",
		},
		{
			value: "right",
			label: "RIGHT JOIN",
			description:
				"Returns all records from the right table, and matching records from the left table",
		},
		{
			value: "full",
			label: "FULL OUTER JOIN",
			description:
				"Returns all records when there is a match in either left or right table",
		},
	];

	// Mock tables data with column information
	const mockTables = [
		{
			id: 1,
			name: "thryl_users",
			records: 156,
			columns: [
				"id",
				"name",
				"email",
				"age",
				"created_at",
				"updated_at",
				"status",
				"savings",
			],
		},
		{
			id: 2,
			name: "thryl_products",
			records: 89,
			columns: [
				"id",
				"name",
				"price",
				"category",
				"created_at",
				"stock_quantity",
			],
		},
		{
			id: 3,
			name: "thryl_orders",
			records: 234,
			columns: [
				"id",
				"user_id",
				"product_id",
				"quantity",
				"total_amount",
				"order_date",
				"status",
			],
		},
		{
			id: 4,
			name: "thryl_savings_account",
			records: 134,
			columns: [
				"id",
				"user_id",
				"account_type",
				"balance",
				"created_at",
				"updated_at",
			],
		},
		{
			id: 5,
			name: "thryl_investment_account",
			records: 89,
			columns: [
				"id",
				"user_id",
				"portfolio_value",
				"risk_level",
				"created_at",
				"updated_at",
			],
		},
	];

	const availableTables = tables.length > 0 ? tables : mockTables;

	const handleJoinChange = (index, field, value) => {
		const newJoins = [...(config.joins || [])];
		newJoins[index] = { ...newJoins[index], [field]: value };
		updateConfig("joins", newJoins);
	};

	const addJoin = () => {
		const newJoins = [
			...(config.joins || []),
			{
				table: "",
				alias: "",
				joinType: "inner",
				leftColumn: "",
				rightColumn: "",
				condition: "on",
				customCondition: "",
				enabled: true,
			},
		];
		updateConfig("joins", newJoins);
	};

	const removeJoin = (index) => {
		const newJoins = config.joins.filter((_, i) => i !== index);
		updateConfig("joins", newJoins);
	};

	const toggleJoin = (index) => {
		const newJoins = [...config.joins];
		newJoins[index].enabled = !newJoins[index].enabled;
		updateConfig("joins", newJoins);
	};

	const getTableColumns = (tableName) => {
		const table = availableTables.find((t) => t.name === tableName);
		return table ? table.columns : [];
	};

	const getPrimaryTableColumns = () => {
		return config.primaryTable ? getTableColumns(config.primaryTable) : [];
	};

	return (
		<div className="bg-white shadow rounded-lg p-6">
			<div className="flex items-center mb-6">
				<TableCellsIcon className="h-5 w-5 text-indigo-500 mr-2" />
				<h3 className="text-lg font-medium text-gray-900">
					Table Configuration
				</h3>
			</div>

			<div className="space-y-6">
				{/* Primary Table Selection */}
				<div>
					<h4 className="text-sm font-medium text-gray-900 mb-4">
						Primary Table
					</h4>
					<div className="grid grid-cols-2 gap-4">
						<div>
							<label
								htmlFor="primary-table"
								className="block text-sm font-medium text-gray-700"
							>
								Source Table
							</label>
							<select
								id="primary-table"
								value={config.primaryTable || ""}
								onChange={(e) =>
									updateConfig("primaryTable", e.target.value)
								}
								className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
							>
								<option value="">Select a table...</option>
								{availableTables.map((table) => (
									<option
										key={table.id}
										value={table.name}
									>
										{table.name} ({table.records} records)
									</option>
								))}
							</select>
						</div>

						<div>
							<label
								htmlFor="table-alias"
								className="block text-sm font-medium text-gray-700"
							>
								Table Alias (Optional)
							</label>
							<input
								type="text"
								id="table-alias"
								value={config.primaryTableAlias || ""}
								onChange={(e) =>
									updateConfig(
										"primaryTableAlias",
										e.target.value
									)
								}
								placeholder="e.g., u, users"
								className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black/75 placeholder:text-gray-600"
							/>
						</div>
					</div>

					{config.primaryTable && (
						<div className="mt-4">
							<p className="text-sm text-gray-600">
								<span className="font-medium">
									Available columns:
								</span>{" "}
								{getPrimaryTableColumns().join(", ")}
							</p>
						</div>
					)}
				</div>

				{/* Table Joins */}
				<div>
					<div className="flex items-center justify-between mb-4">
						<h4 className="text-sm font-medium text-gray-900">
							Table Joins
						</h4>
						<button
							type="button"
							onClick={addJoin}
							disabled={!config.primaryTable}
							className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
						>
							<PlusIcon className="h-4 w-4 mr-1" />
							Add Join
						</button>
					</div>

					{!config.primaryTable && (
						<div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-4">
							<p className="text-sm text-yellow-800">
								Please select a primary table first to enable
								joins.
							</p>
						</div>
					)}

					{config.joins && config.joins.length > 0 ? (
						<div className="space-y-4">
							{config.joins.map((join, index) => (
								<div
									key={index}
									className={`border rounded-lg p-4 ${
										join.enabled
											? "border-gray-200 bg-white"
											: "border-gray-100 bg-gray-50"
									}`}
								>
									<div className="flex items-center justify-between mb-4">
										<div className="flex items-center space-x-2">
											<input
												type="checkbox"
												checked={join.enabled}
												onChange={() =>
													toggleJoin(index)
												}
												className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
											/>
											<span className="text-sm font-medium text-gray-700">
												Join {index + 1}
											</span>
										</div>
										<button
											type="button"
											onClick={() => removeJoin(index)}
											className="text-red-600 hover:text-red-800 text-sm"
										>
											Remove
										</button>
									</div>

									<div className="grid grid-cols-2 gap-4 mb-4">
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">
												Join Type
											</label>
											<select
												value={join.joinType}
												onChange={(e) =>
													handleJoinChange(
														index,
														"joinType",
														e.target.value
													)
												}
												className="block w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
											>
												{joinTypes.map((type) => (
													<option
														key={type.value}
														value={type.value}
														title={type.description}
													>
														{type.label}
													</option>
												))}
											</select>
										</div>

										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">
												Table to Join
											</label>
											<select
												value={join.table}
												onChange={(e) =>
													handleJoinChange(
														index,
														"table",
														e.target.value
													)
												}
												className="block w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
											>
												<option value="">
													Select table...
												</option>
												{availableTables
													.filter(
														(table) =>
															table.name !==
															config.primaryTable
													)
													.map((table) => (
														<option
															key={table.id}
															value={table.name}
														>
															{table.name} (
															{table.records}{" "}
															records)
														</option>
													))}
											</select>
										</div>
									</div>

									<div className="mb-4">
										<label className="block text-sm font-medium text-gray-700 mb-2">
											Table Alias (Optional)
										</label>
										<input
											type="text"
											value={join.alias}
											onChange={(e) =>
												handleJoinChange(
													index,
													"alias",
													e.target.value
												)
											}
											placeholder="e.g., o, orders"
											className="block w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black/75 placeholder:text-gray-600"
										/>
									</div>

									{/* Join Condition */}
									<div className="grid grid-cols-2 gap-4 mb-4">
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">
												Left Column (
												{config.primaryTableAlias ||
													config.primaryTable}
												)
											</label>
											<select
												value={join.leftColumn}
												onChange={(e) =>
													handleJoinChange(
														index,
														"leftColumn",
														e.target.value
													)
												}
												className="block w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
											>
												<option value="">
													Select column...
												</option>
												{getPrimaryTableColumns().map(
													(column) => (
														<option
															key={column}
															value={column}
														>
															{column}
														</option>
													)
												)}
											</select>
										</div>

										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">
												Right Column (
												{join.alias || join.table})
											</label>
											<select
												value={join.rightColumn}
												onChange={(e) =>
													handleJoinChange(
														index,
														"rightColumn",
														e.target.value
													)
												}
												disabled={!join.table}
												className="block w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100"
											>
												<option value="">
													Select column...
												</option>
												{join.table &&
													getTableColumns(
														join.table
													).map((column) => (
														<option
															key={column}
															value={column}
														>
															{column}
														</option>
													))}
											</select>
										</div>
									</div>

									{/* Custom Join Condition */}
									<div className="mb-4">
										<label className="block text-sm font-medium text-gray-700 mb-2">
											Custom Join Condition (Optional)
										</label>
										<input
											type="text"
											value={join.customCondition}
											onChange={(e) =>
												handleJoinChange(
													index,
													"customCondition",
													e.target.value
												)
											}
											placeholder="e.g., AND orders.status = 'active'"
											className="block w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black/75 placeholder:text-gray-600"
										/>
									</div>

									{/* Join Preview */}
									{join.table &&
										join.leftColumn &&
										join.rightColumn && (
											<div className="bg-gray-50 border border-gray-200 rounded-md p-3">
												<p className="text-xs font-mono text-gray-600">
													Preview:{" "}
													{join.joinType.toUpperCase()}{" "}
													JOIN {join.table}{" "}
													{join.alias &&
														`AS ${join.alias}`}{" "}
													ON{" "}
													{config.primaryTableAlias ||
														config.primaryTable}
													.{join.leftColumn} ={" "}
													{join.alias || join.table}.
													{join.rightColumn}
													{join.customCondition &&
														` ${join.customCondition}`}
												</p>
											</div>
										)}

									{join.table && (
										<div className="mt-4">
											<p className="text-sm text-gray-600">
												<span className="font-medium">
													Available columns in{" "}
													{join.table}:
												</span>{" "}
												{getTableColumns(
													join.table
												).join(", ")}
											</p>
										</div>
									)}
								</div>
							))}
						</div>
					) : (
						<div className="text-center py-6">
							<p className="text-sm text-gray-500">
								No joins configured
							</p>
							<p className="text-xs text-gray-400 mt-1">
								Add joins to combine data from multiple tables
							</p>
						</div>
					)}
				</div>

				{/* Query Example */}
				{config.primaryTable && (
					<div className="bg-gray-50 border border-gray-200 rounded-md p-4">
						<h5 className="text-sm font-medium text-gray-900 mb-2">
							Query Structure Preview
						</h5>
						<div className="text-xs font-mono text-gray-600 space-y-1">
							<div>
								SELECT * FROM {config.primaryTable}{" "}
								{config.primaryTableAlias &&
									`AS ${config.primaryTableAlias}`}
							</div>
							{config.joins &&
								config.joins
									.filter(
										(j) =>
											j.enabled &&
											j.table &&
											j.leftColumn &&
											j.rightColumn
									)
									.map((join, index) => (
										<div
											key={index}
											className="ml-2"
										>
											{join.joinType.toUpperCase()} JOIN{" "}
											{join.table}{" "}
											{join.alias && `AS ${join.alias}`}{" "}
											ON{" "}
											{config.primaryTableAlias ||
												config.primaryTable}
											.{join.leftColumn} ={" "}
											{join.alias || join.table}.
											{join.rightColumn}
											{join.customCondition &&
												` ${join.customCondition}`}
										</div>
									))}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default TableConfigSection;
