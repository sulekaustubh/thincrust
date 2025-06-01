"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
	TableCellsIcon,
	CodeBracketIcon,
	PlusIcon,
} from "@heroicons/react/24/outline";

export default function BuilderLayout({ children }) {
	const router = useRouter();
	const pathname = usePathname();
	const [activeTab, setActiveTab] = useState("tables");

	// Mock data for counts
	const tables = [
		{ id: 1, name: "thryl_users", records: 156, created: "2024-01-15" },
		{ id: 2, name: "thryl_products", records: 89, created: "2024-01-18" },
		{ id: 3, name: "thryl_orders", records: 234, created: "2024-01-20" },
	];

	const apis = [
		{
			id: 1,
			name: "Get All Users",
			endpoint: "/api/users",
			method: "GET",
			table: "thryl_users",
			lastUsed: "2024-01-22",
		},
		{
			id: 2,
			name: "Create Product",
			endpoint: "/api/products",
			method: "POST",
			table: "thryl_products",
			lastUsed: "2024-01-21",
		},
		{
			id: 3,
			name: "Update Order Status",
			endpoint: "/api/orders/:id",
			method: "PUT",
			table: "thryl_orders",
			lastUsed: "2024-01-20",
		},
	];

	const sidebarItems = [
		{
			id: "tables",
			name: "Tables",
			icon: TableCellsIcon,
			count: tables.length,
			path: "/builder/tables",
		},
		{
			id: "apis",
			name: "APIs",
			icon: CodeBracketIcon,
			count: apis.length,
			path: "/builder/apis",
		},
		{
			id: "create-endpoint",
			name: "Create Endpoint",
			icon: PlusIcon,
			count: 0,
			path: "/builder/create-endpoint",
		},
	];

	// Set active tab based on current route
	useEffect(() => {
		if (pathname.includes("/tables")) {
			setActiveTab("tables");
		} else if (pathname.includes("/apis")) {
			setActiveTab("apis");
		} else if (pathname.includes("/create-endpoint")) {
			setActiveTab("create-endpoint");
		} else {
			// Default redirect to tables if on base /builder route
			router.push("/builder/tables");
		}
	}, [pathname, router]);

	const handleNavigation = (item) => {
		setActiveTab(item.id);
		router.push(item.path);
	};

	return (
		<div className="min-h-screen bg-gray-50">
			<div className="flex">
				{/* Persistent Sidebar */}
				<div className="w-48 bg-white shadow-sm border-r border-gray-200 fixed h-full">
					<div className="p-6">
						<h1 className="text-lg font-bold text-gray-900">
							ThinCrust Builder
						</h1>
					</div>

					<nav className="mt-6">
						<div className="px-3">
							{sidebarItems.map((item) => {
								const Icon = item.icon;
								return (
									<button
										key={item.id}
										onClick={() => handleNavigation(item)}
										className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md mb-1 ${
											activeTab === item.id
												? "bg-indigo-100 text-indigo-700"
												: "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
										}`}
									>
										<Icon className="mr-2 h-4 w-4" />
										<span className="truncate">
											{item.name}
										</span>
										{item.count > 0 && (
											<span
												className={`ml-auto inline-block py-0.5 px-2 text-xs rounded-full ${
													activeTab === item.id
														? "bg-indigo-200 text-indigo-800"
														: "bg-gray-200 text-gray-600"
												}`}
											>
												{item.count}
											</span>
										)}
									</button>
								);
							})}
						</div>
					</nav>
				</div>

				{/* Main Content Area */}
				<div className="flex-1 ml-48">
					<div className="p-8">{children}</div>
				</div>
			</div>
		</div>
	);
}
