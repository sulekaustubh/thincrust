"use client"; // Require for using hooks like useState, useEffect

import Image from "next/image";
import { useState } from "react";

export default function Home() {
	const [apiResponse, setApiResponse] = useState<object | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [tableName, setTableName] = useState<string>("");
	const [isCreatingTable, setIsCreatingTable] = useState(false);
	const [tableCreationResponse, setTableCreationResponse] = useState<
		object | null
	>(null);
	const [fetchTableName, setFetchTableName] = useState<string>("");
	const [tableData, setTableData] = useState<object | null>(null);
	const [isFetchingTable, setIsFetchingTable] = useState(false);

	const fetchUsersViaEdge = async () => {
		setIsLoading(true);
		setError(null);
		setApiResponse(null);

		try {
			const response = await fetch("/api/users");
			const data = await response.json();

			if (!response.ok) {
				throw new Error(
					data && typeof data.error === "string"
						? data.error
						: "Failed to fetch users from API"
				);
			}

			setApiResponse(data);
		} catch (err: unknown) {
			if (err instanceof Error) {
				setError(err.message);
			} else {
				setError("An unexpected error occurred.");
			}
		} finally {
			setIsLoading(false);
		}
	};

	const createTable = async () => {
		if (!tableName.trim()) {
			setError("Please enter a table name");
			return;
		}

		setIsCreatingTable(true);
		setError(null);
		setTableCreationResponse(null);

		try {
			const response = await fetch("/api/create-table", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					tableName: `thryl_${tableName}`,
					columns: [
						{
							name: "id",
							type: "uuid",
							isPrimaryKey: true,
							defaultValue: "uuid_generate_v4()",
						},
						{ name: "title", type: "text", isNullable: false },
						{
							name: "created_at",
							type: "timestamp",
							defaultValue: "now()",
						},
					],
				}),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(
					data && typeof data.error === "string"
						? data.error
						: "Failed to create table"
				);
			}

			setTableCreationResponse(data);
		} catch (err: unknown) {
			if (err instanceof Error) {
				setError(err.message);
			} else {
				setError("An unexpected error occurred.");
			}
		} finally {
			setIsCreatingTable(false);
		}
	};

	const fetchTableData = async () => {
		if (!fetchTableName.trim()) {
			setError("Please enter a table name to fetch");
			return;
		}

		setIsFetchingTable(true);
		setError(null);
		setTableData(null);

		try {
			const res = await fetch(`/api/get-table?table=${fetchTableName}`);
			const data = await res.json();

			if (!res.ok) {
				throw new Error(
					data && typeof data.error === "string"
						? data.error
						: "Failed to fetch table data"
				);
			}

			setTableData(data);
		} catch (err: unknown) {
			if (err instanceof Error) {
				setError(err.message);
			} else {
				setError("An unexpected error occurred.");
			}
		} finally {
			setIsFetchingTable(false);
		}
	};

	console.log(tableData, apiResponse);

	return (
		<div className="grid grid-rows-[22px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
			<main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
				<div className="mt-10 p-6 border border-gray-300 dark:border-gray-700 rounded-lg w-full max-w-md">
					<h2 className="text-xl font-semibold mb-4 text-center sm:text-left">
						Fetch Users from Supabase
					</h2>
					<div className="flex flex-col gap-3">
						<button
							onClick={fetchUsersViaEdge}
							disabled={isLoading}
							className="w-full rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 disabled:opacity-50"
						>
							{isLoading ? "Loading..." : "Via Edge Function"}
						</button>
					</div>
					{error && (
						<div className="mt-4 p-3 bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 rounded">
							<p className="font-semibold">Error:</p>
							<p>{error}</p>
						</div>
					)}
				</div>

				<div className="mt-4 p-6 border border-gray-300 dark:border-gray-700 rounded-lg w-full max-w-md">
					<h2 className="text-xl font-semibold mb-4 text-center sm:text-left">
						Create Custom Table
					</h2>
					<div className="flex flex-col gap-4">
						<div>
							<label
								htmlFor="tableName"
								className="block text-sm font-medium mb-1"
							>
								Table Identifier
							</label>
							<div className="flex items-center gap-2">
								<span className="text-sm text-gray-500 dark:text-gray-400">
									thryl_
								</span>
								<input
									id="tableName"
									type="text"
									value={tableName}
									onChange={(e) =>
										setTableName(e.target.value)
									}
									placeholder="xyz"
									className="flex-1 rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
								/>
							</div>
							<p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
								Final table name: thryl_{tableName}
							</p>
						</div>

						<button
							onClick={createTable}
							disabled={isCreatingTable || !tableName.trim()}
							className="w-full rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:opacity-50"
						>
							{isCreatingTable ? "Creating..." : "Create Table"}
						</button>
					</div>

					{tableCreationResponse && (
						<div className="mt-4 p-3 bg-green-100 dark:bg-green-900 border border-green-400 dark:border-green-700 rounded">
							<p className="font-semibold">Table Created:</p>
							<pre className="text-sm overflow-x-auto">
								{JSON.stringify(tableCreationResponse, null, 2)}
							</pre>
						</div>
					)}
				</div>

				<div className="mt-4 p-6 border border-gray-300 dark:border-gray-700 rounded-lg w-full max-w-md">
					<h2 className="text-xl font-semibold mb-4 text-center sm:text-left">
						Fetch Table Data
					</h2>
					<div className="flex flex-col gap-4">
						<div>
							<label
								htmlFor="fetchTableName"
								className="block text-sm font-medium mb-1"
							>
								Table to Fetch
							</label>
							<div className="flex items-center gap-2">
								<span className="text-sm text-gray-500 dark:text-gray-400">
									thryl_
								</span>
								<input
									id="fetchTableName"
									type="text"
									value={fetchTableName}
									onChange={(e) =>
										setFetchTableName(e.target.value)
									}
									placeholder="table_name"
									className="flex-1 rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
								/>
							</div>
							<p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
								Will fetch from: thryl_{fetchTableName}
							</p>
						</div>

						<button
							onClick={fetchTableData}
							disabled={isFetchingTable || !fetchTableName.trim()}
							className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
						>
							{isFetchingTable ? "Fetching..." : "Fetch Data"}
						</button>
					</div>
				</div>
			</main>
			<footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
				<a
					className="flex items-center gap-2 hover:underline hover:underline-offset-4"
					href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
					target="_blank"
					rel="noopener noreferrer"
				>
					<Image
						aria-hidden
						src="/file.svg"
						alt="File icon"
						width={16}
						height={16}
					/>
					Learn
				</a>
				<a
					className="flex items-center gap-2 hover:underline hover:underline-offset-4"
					href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
					target="_blank"
					rel="noopener noreferrer"
				>
					<Image
						aria-hidden
						src="/window.svg"
						alt="Window icon"
						width={16}
						height={16}
					/>
					Examples
				</a>
				<a
					className="flex items-center gap-2 hover:underline hover:underline-offset-4"
					href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
					target="_blank"
					rel="noopener noreferrer"
				>
					<Image
						aria-hidden
						src="/globe.svg"
						alt="Globe icon"
						width={16}
						height={16}
					/>
					Go to nextjs.org →
				</a>
			</footer>
		</div>
	);
}
