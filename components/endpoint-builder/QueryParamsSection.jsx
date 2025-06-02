import React from "react";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";

const QueryParamsSection = ({ config, updateConfig }) => {
	const paramTypes = [
		{ value: "string", label: "String" },
		{ value: "number", label: "Number" },
		{ value: "boolean", label: "Boolean" },
		{ value: "date", label: "Date" },
		{ value: "array", label: "Array" },
		{ value: "enum", label: "Enum" },
	];

	const handleParamChange = (index, field, value) => {
		const newParams = [...(config.queryParams || [])];
		newParams[index] = { ...newParams[index], [field]: value };
		updateConfig("queryParams", newParams);
	};

	const addParam = () => {
		const newParams = [
			...(config.queryParams || []),
			{
				name: "",
				type: "string",
				required: false,
				description: "",
				defaultValue: "",
				enumValues: [],
				validation: {
					min: "",
					max: "",
					pattern: "",
				},
			},
		];
		updateConfig("queryParams", newParams);
	};

	const removeParam = (index) => {
		const newParams = config.queryParams.filter((_, i) => i !== index);
		updateConfig("queryParams", newParams);
	};

	const handleEnumValueChange = (paramIndex, enumIndex, value) => {
		const newParams = [...config.queryParams];
		if (!newParams[paramIndex].enumValues) {
			newParams[paramIndex].enumValues = [];
		}
		newParams[paramIndex].enumValues[enumIndex] = value;
		updateConfig("queryParams", newParams);
	};

	const addEnumValue = (paramIndex) => {
		const newParams = [...config.queryParams];
		if (!newParams[paramIndex].enumValues) {
			newParams[paramIndex].enumValues = [];
		}
		newParams[paramIndex].enumValues.push("");
		updateConfig("queryParams", newParams);
	};

	const removeEnumValue = (paramIndex, enumIndex) => {
		const newParams = [...config.queryParams];
		newParams[paramIndex].enumValues = newParams[
			paramIndex
		].enumValues.filter((_, i) => i !== enumIndex);
		updateConfig("queryParams", newParams);
	};

	const handleValidationChange = (paramIndex, field, value) => {
		const newParams = [...config.queryParams];
		if (!newParams[paramIndex].validation) {
			newParams[paramIndex].validation = {};
		}
		newParams[paramIndex].validation[field] = value;
		updateConfig("queryParams", newParams);
	};

	return (
		<div className="bg-white shadow rounded-lg p-6">
			<div className="flex items-center justify-between mb-6">
				<div className="flex items-center">
					<AdjustmentsHorizontalIcon className="h-5 w-5 text-indigo-500 mr-2" />
					<h3 className="text-lg font-medium text-gray-900">
						Query Parameters
					</h3>
				</div>
				<button
					type="button"
					onClick={addParam}
					className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
				>
					Add Parameter
				</button>
			</div>

			{config.queryParams && config.queryParams.length > 0 ? (
				<div className="space-y-6">
					{config.queryParams.map((param, index) => (
						<div
							key={index}
							className="border border-gray-200 rounded-lg p-4"
						>
							<div className="grid grid-cols-2 gap-4 mb-4">
								<div>
									<label className="block text-sm font-medium text-gray-700">
										Parameter Name
									</label>
									<input
										type="text"
										value={param.name}
										onChange={(e) =>
											handleParamChange(
												index,
												"name",
												e.target.value
											)
										}
										placeholder="e.g., age, limit, status"
										className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black/75 placeholder:text-gray-600"
									/>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700">
										Type
									</label>
									<select
										value={param.type}
										onChange={(e) =>
											handleParamChange(
												index,
												"type",
												e.target.value
											)
										}
										className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
									>
										{paramTypes.map((type) => (
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

							<div className="mb-4">
								<label className="block text-sm font-medium text-gray-700">
									Description
								</label>
								<input
									type="text"
									value={param.description}
									onChange={(e) =>
										handleParamChange(
											index,
											"description",
											e.target.value
										)
									}
									placeholder="Brief description of what this parameter does"
									className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black/75 placeholder:text-gray-600"
								/>
							</div>

							<div className="grid grid-cols-2 gap-4 mb-4">
								<div>
									<label className="block text-sm font-medium text-gray-700">
										Default Value
									</label>
									<input
										type="text"
										value={param.defaultValue}
										onChange={(e) =>
											handleParamChange(
												index,
												"defaultValue",
												e.target.value
											)
										}
										placeholder="Optional default value"
										className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black/75 placeholder:text-gray-600"
									/>
								</div>
								<div className="flex items-center">
									<label className="flex items-center">
										<input
											type="checkbox"
											checked={param.required}
											onChange={(e) =>
												handleParamChange(
													index,
													"required",
													e.target.checked
												)
											}
											className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
										/>
										<span className="ml-2 text-sm text-gray-700">
											Required Parameter
										</span>
									</label>
								</div>
							</div>

							{/* Enum Values */}
							{param.type === "enum" && (
								<div className="mb-4">
									<div className="flex items-center justify-between mb-2">
										<label className="block text-sm font-medium text-gray-700">
											Enum Values
										</label>
										<button
											type="button"
											onClick={() => addEnumValue(index)}
											className="text-sm text-indigo-600 hover:text-indigo-800"
										>
											Add Value
										</button>
									</div>
									{param.enumValues &&
										param.enumValues.map(
											(enumValue, enumIndex) => (
												<div
													key={enumIndex}
													className="flex items-center space-x-2 mb-2"
												>
													<input
														type="text"
														value={enumValue}
														onChange={(e) =>
															handleEnumValueChange(
																index,
																enumIndex,
																e.target.value
															)
														}
														placeholder="Enum value"
														className="flex-1 border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black/75 placeholder:text-gray-600"
													/>
													<button
														type="button"
														onClick={() =>
															removeEnumValue(
																index,
																enumIndex
															)
														}
														className="text-red-600 hover:text-red-800 text-sm"
													>
														Remove
													</button>
												</div>
											)
										)}
								</div>
							)}

							{/* Validation Rules */}
							{(param.type === "string" ||
								param.type === "number") && (
								<div className="mb-4">
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Validation Rules
									</label>
									<div className="grid grid-cols-3 gap-2">
										{param.type === "number" && (
											<>
												<input
													type="number"
													value={
														param.validation?.min ||
														""
													}
													onChange={(e) =>
														handleValidationChange(
															index,
															"min",
															e.target.value
														)
													}
													placeholder="Min value"
													className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black/75 placeholder:text-gray-600"
												/>
												<input
													type="number"
													value={
														param.validation?.max ||
														""
													}
													onChange={(e) =>
														handleValidationChange(
															index,
															"max",
															e.target.value
														)
													}
													placeholder="Max value"
													className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black/75 placeholder:text-gray-600"
												/>
											</>
										)}
										{param.type === "string" && (
											<>
												<input
													type="number"
													value={
														param.validation?.min ||
														""
													}
													onChange={(e) =>
														handleValidationChange(
															index,
															"min",
															e.target.value
														)
													}
													placeholder="Min length"
													className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black/75 placeholder:text-gray-600"
												/>
												<input
													type="number"
													value={
														param.validation?.max ||
														""
													}
													onChange={(e) =>
														handleValidationChange(
															index,
															"max",
															e.target.value
														)
													}
													placeholder="Max length"
													className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black/75 placeholder:text-gray-600"
												/>
												<input
													type="text"
													value={
														param.validation
															?.pattern || ""
													}
													onChange={(e) =>
														handleValidationChange(
															index,
															"pattern",
															e.target.value
														)
													}
													placeholder="Regex pattern"
													className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black/75 placeholder:text-gray-600"
												/>
											</>
										)}
									</div>
								</div>
							)}

							<div className="flex justify-end">
								<button
									type="button"
									onClick={() => removeParam(index)}
									className="text-red-600 hover:text-red-800 text-sm"
								>
									Remove Parameter
								</button>
							</div>
						</div>
					))}
				</div>
			) : (
				<div className="text-center py-6">
					<p className="text-sm text-gray-500">
						No query parameters defined
					</p>
					<p className="text-xs text-gray-400 mt-1">
						Add parameters to make your endpoint more flexible and
						queryable
					</p>
				</div>
			)}
		</div>
	);
};

export default QueryParamsSection;
