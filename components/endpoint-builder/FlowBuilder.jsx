import React, { useCallback, useState, useMemo } from "react";
import ReactFlow, {
	Background,
	Controls,
	MiniMap,
	addEdge,
	useNodesState,
	useEdgesState,
	Handle,
	Position,
	NodeToolbar,
	Panel,
} from "reactflow";
import "reactflow/dist/style.css";
import {
	CircleStackIcon,
	CogIcon,
	FunnelIcon,
	ArrowsUpDownIcon,
	DocumentTextIcon,
	LinkIcon,
	PlusIcon,
	TrashIcon,
	BeakerIcon,
	SparklesIcon,
} from "@heroicons/react/24/outline";

// Custom Node Components
const TableNode = ({ data, isConnectable }) => {
	return (
		<div className="px-4 py-3 shadow-lg rounded-lg bg-white border-2 border-blue-200 min-w-[200px] hover:shadow-xl transition-shadow">
			<NodeToolbar
				isVisible={data.toolbarVisible}
				position={Position.Top}
			>
				<button
					className="p-1 rounded bg-red-500 text-white hover:bg-red-600"
					onClick={() => data.onDelete(data.id)}
				>
					<TrashIcon className="w-4 h-4" />
				</button>
			</NodeToolbar>

			<div className="flex items-center mb-2">
				<CircleStackIcon className="w-5 h-5 text-blue-600 mr-2" />
				<div className="font-bold text-sm text-gray-900">
					{data.label}
				</div>
			</div>

			{data.fields && (
				<div className="text-xs text-gray-600 space-y-1">
					{data.fields.slice(0, 4).map((field, idx) => (
						<div
							key={idx}
							className="flex items-center"
						>
							<div className="w-2 h-2 bg-gray-400 rounded-full mr-2"></div>
							<span className="font-mono">{field}</span>
						</div>
					))}
					{data.fields.length > 4 && (
						<div className="text-gray-500 italic">
							+{data.fields.length - 4} more fields...
						</div>
					)}
				</div>
			)}

			<Handle
				type="source"
				position={Position.Right}
				id="output"
				style={{ background: "#3b82f6", width: "12px", height: "12px" }}
				isConnectable={isConnectable}
			/>
			<Handle
				type="target"
				position={Position.Left}
				id="input"
				style={{ background: "#3b82f6", width: "12px", height: "12px" }}
				isConnectable={isConnectable}
			/>
		</div>
	);
};

const FilterNode = ({ data, isConnectable }) => {
	return (
		<div className="px-4 py-3 shadow-lg rounded-lg bg-white border-2 border-green-200 min-w-[180px] hover:shadow-xl transition-shadow">
			<NodeToolbar
				isVisible={data.toolbarVisible}
				position={Position.Top}
			>
				<button
					className="p-1 rounded bg-red-500 text-white hover:bg-red-600"
					onClick={() => data.onDelete(data.id)}
				>
					<TrashIcon className="w-4 h-4" />
				</button>
			</NodeToolbar>

			<div className="flex items-center mb-2">
				<FunnelIcon className="w-5 h-5 text-green-600 mr-2" />
				<div className="font-bold text-sm text-gray-900">Filter</div>
			</div>

			<div className="text-xs text-gray-600 space-y-1">
				<div className="font-mono bg-gray-50 p-1 rounded">
					{data.column}{" "}
					<span className="text-green-600 font-semibold">
						{data.operator}
					</span>{" "}
					{data.value}
				</div>
			</div>

			<Handle
				type="source"
				position={Position.Right}
				id="output"
				style={{ background: "#10b981", width: "12px", height: "12px" }}
				isConnectable={isConnectable}
			/>
			<Handle
				type="target"
				position={Position.Left}
				id="input"
				style={{ background: "#10b981", width: "12px", height: "12px" }}
				isConnectable={isConnectable}
			/>
		</div>
	);
};

const EndpointNode = ({ data, isConnectable }) => {
	return (
		<div className="px-4 py-3 shadow-lg rounded-lg bg-white border-2 border-purple-200 min-w-[200px] hover:shadow-xl transition-shadow">
			<div className="flex items-center mb-2">
				<CogIcon className="w-5 h-5 text-purple-600 mr-2" />
				<div className="font-bold text-sm text-gray-900">
					{data.method} Endpoint
				</div>
			</div>

			<div className="text-xs text-gray-600 space-y-1">
				<div className="font-mono bg-gray-50 p-1 rounded">
					Path: {data.path || "/api/endpoint"}
				</div>
				<div className="flex items-center justify-between">
					<span>Returns: {data.returnType || "JSON"}</span>
					<span
						className={`px-2 py-1 rounded-full text-xs font-medium ${
							data.method === "GET"
								? "bg-green-100 text-green-800"
								: data.method === "POST"
								? "bg-blue-100 text-blue-800"
								: data.method === "PUT"
								? "bg-yellow-100 text-yellow-800"
								: "bg-red-100 text-red-800"
						}`}
					>
						{data.method}
					</span>
				</div>
			</div>

			<Handle
				type="target"
				position={Position.Left}
				id="input"
				style={{ background: "#8b5cf6", width: "12px", height: "12px" }}
				isConnectable={isConnectable}
			/>
		</div>
	);
};

const JoinNode = ({ data, isConnectable }) => {
	return (
		<div className="px-4 py-3 shadow-lg rounded-lg bg-white border-2 border-orange-200 min-w-[160px] hover:shadow-xl transition-shadow">
			<NodeToolbar
				isVisible={data.toolbarVisible}
				position={Position.Top}
			>
				<button
					className="p-1 rounded bg-red-500 text-white hover:bg-red-600"
					onClick={() => data.onDelete(data.id)}
				>
					<TrashIcon className="w-4 h-4" />
				</button>
			</NodeToolbar>

			<div className="flex items-center mb-2">
				<LinkIcon className="w-5 h-5 text-orange-600 mr-2" />
				<div className="font-bold text-sm text-gray-900">
					{data.joinType} JOIN
				</div>
			</div>

			<div className="text-xs text-gray-600">
				<div className="font-mono bg-gray-50 p-1 rounded text-xs">
					{data.condition || "ON condition"}
				</div>
			</div>

			<Handle
				type="source"
				position={Position.Right}
				id="output"
				style={{ background: "#f97316", width: "12px", height: "12px" }}
				isConnectable={isConnectable}
			/>
			<Handle
				type="target"
				position={Position.Left}
				id="input-left"
				style={{ background: "#f97316", width: "12px", height: "12px" }}
				isConnectable={isConnectable}
			/>
			<Handle
				type="target"
				position={Position.Top}
				id="input-top"
				style={{ background: "#f97316", width: "12px", height: "12px" }}
				isConnectable={isConnectable}
			/>
		</div>
	);
};

const SortNode = ({ data, isConnectable }) => {
	return (
		<div className="px-4 py-3 shadow-lg rounded-lg bg-white border-2 border-yellow-200 min-w-[160px] hover:shadow-xl transition-shadow">
			<NodeToolbar
				isVisible={data.toolbarVisible}
				position={Position.Top}
			>
				<button
					className="p-1 rounded bg-red-500 text-white hover:bg-red-600"
					onClick={() => data.onDelete(data.id)}
				>
					<TrashIcon className="w-4 h-4" />
				</button>
			</NodeToolbar>

			<div className="flex items-center mb-2">
				<ArrowsUpDownIcon className="w-5 h-5 text-yellow-600 mr-2" />
				<div className="font-bold text-sm text-gray-900">Sort</div>
			</div>

			<div className="text-xs text-gray-600">
				<div className="font-mono bg-gray-50 p-1 rounded">
					{data.column}{" "}
					<span className="text-yellow-600 font-semibold">
						{data.direction}
					</span>
				</div>
			</div>

			<Handle
				type="source"
				position={Position.Right}
				id="output"
				style={{ background: "#eab308", width: "12px", height: "12px" }}
				isConnectable={isConnectable}
			/>
			<Handle
				type="target"
				position={Position.Left}
				id="input"
				style={{ background: "#eab308", width: "12px", height: "12px" }}
				isConnectable={isConnectable}
			/>
		</div>
	);
};

const nodeTypes = {
	table: TableNode,
	filter: FilterNode,
	endpoint: EndpointNode,
	join: JoinNode,
	sort: SortNode,
};

const FlowBuilder = ({ config, updateConfig }) => {
	const [nodes, setNodes, onNodesChange] = useNodesState([]);
	const [edges, setEdges, onEdgesChange] = useEdgesState([]);
	const [nodeIdCounter, setNodeIdCounter] = useState(1);

	// Demo data for impressive showcase
	const loadDemoFlow = () => {
		const demoNodes = [
			{
				id: "users-table",
				type: "table",
				position: { x: 100, y: 150 },
				data: {
					label: "users",
					fields: [
						"id",
						"email",
						"name",
						"created_at",
						"status",
						"role",
					],
					id: "users-table",
					onDelete: handleDeleteNode,
				},
			},
			{
				id: "orders-table",
				type: "table",
				position: { x: 100, y: 350 },
				data: {
					label: "orders",
					fields: ["id", "user_id", "total", "status", "created_at"],
					id: "orders-table",
					onDelete: handleDeleteNode,
				},
			},
			{
				id: "user-order-join",
				type: "join",
				position: { x: 400, y: 250 },
				data: {
					joinType: "LEFT",
					condition: "users.id = orders.user_id",
					id: "user-order-join",
					onDelete: handleDeleteNode,
				},
			},
			{
				id: "status-filter",
				type: "filter",
				position: { x: 650, y: 150 },
				data: {
					column: "users.status",
					operator: "=",
					value: "active",
					id: "status-filter",
					onDelete: handleDeleteNode,
				},
			},
			{
				id: "amount-filter",
				type: "filter",
				position: { x: 650, y: 280 },
				data: {
					column: "orders.total",
					operator: ">",
					value: "100",
					id: "amount-filter",
					onDelete: handleDeleteNode,
				},
			},
			{
				id: "date-sort",
				type: "sort",
				position: { x: 900, y: 200 },
				data: {
					column: "orders.created_at",
					direction: "DESC",
					id: "date-sort",
					onDelete: handleDeleteNode,
				},
			},
			{
				id: "endpoint",
				type: "endpoint",
				position: { x: 1150, y: 250 },
				data: {
					method: "GET",
					path: "/api/users/active-with-orders",
					returnType: "JSON",
				},
			},
		];

		const demoEdges = [
			{
				id: "users-to-join",
				source: "users-table",
				target: "user-order-join",
				targetHandle: "input-top",
				style: { stroke: "#3b82f6", strokeWidth: 2 },
			},
			{
				id: "orders-to-join",
				source: "orders-table",
				target: "user-order-join",
				targetHandle: "input-left",
				style: { stroke: "#3b82f6", strokeWidth: 2 },
			},
			{
				id: "join-to-status-filter",
				source: "user-order-join",
				target: "status-filter",
				style: { stroke: "#f97316", strokeWidth: 2 },
			},
			{
				id: "join-to-amount-filter",
				source: "user-order-join",
				target: "amount-filter",
				style: { stroke: "#f97316", strokeWidth: 2 },
			},
			{
				id: "status-filter-to-sort",
				source: "status-filter",
				target: "date-sort",
				style: { stroke: "#10b981", strokeWidth: 2 },
			},
			{
				id: "amount-filter-to-sort",
				source: "amount-filter",
				target: "date-sort",
				style: { stroke: "#10b981", strokeWidth: 2 },
			},
			{
				id: "sort-to-endpoint",
				source: "date-sort",
				target: "endpoint",
				style: { stroke: "#eab308", strokeWidth: 2 },
			},
		];

		setNodes(demoNodes);
		setEdges(demoEdges);
		setNodeIdCounter(demoNodes.length + 1);
	};

	// Initialize flow with existing config or load demo
	React.useEffect(() => {
		if (config.primaryTable || (config.joins && config.joins.length > 0)) {
			// Initialize from existing config
			const initialNodes = [];
			const initialEdges = [];
			let yOffset = 100;

			// Add primary table if exists
			if (config.primaryTable) {
				initialNodes.push({
					id: "primary-table",
					type: "table",
					position: { x: 100, y: yOffset },
					data: {
						label: config.primaryTable,
						fields: ["id", "name", "email", "created_at"], // Mock fields
						id: "primary-table",
						onDelete: handleDeleteNode,
					},
				});
				yOffset += 150;
			}

			// Add joins
			config.joins?.forEach((join, index) => {
				if (join.enabled && join.table) {
					const joinNodeId = `join-${index}`;
					const tableNodeId = `table-${join.table}`;

					initialNodes.push({
						id: tableNodeId,
						type: "table",
						position: { x: 100, y: yOffset },
						data: {
							label: join.table,
							fields: ["id", "foreign_key", "data"], // Mock fields
							id: tableNodeId,
							onDelete: handleDeleteNode,
						},
					});

					initialNodes.push({
						id: joinNodeId,
						type: "join",
						position: { x: 400, y: yOffset },
						data: {
							joinType: join.joinType,
							condition: `${join.leftColumn} = ${join.rightColumn}`,
							id: joinNodeId,
							onDelete: handleDeleteNode,
						},
					});

					initialEdges.push({
						id: `edge-${tableNodeId}-${joinNodeId}`,
						source: tableNodeId,
						target: joinNodeId,
						targetHandle: "input-left",
						style: { stroke: "#3b82f6", strokeWidth: 2 },
					});

					if (config.primaryTable) {
						initialEdges.push({
							id: `edge-primary-${joinNodeId}`,
							source: "primary-table",
							target: joinNodeId,
							targetHandle: "input-top",
							style: { stroke: "#3b82f6", strokeWidth: 2 },
						});
					}

					yOffset += 150;
				}
			});

			// Add filters
			config.filters?.forEach((filter, index) => {
				if (filter.enabled && filter.column) {
					const filterId = `filter-${index}`;
					initialNodes.push({
						id: filterId,
						type: "filter",
						position: { x: 700, y: 100 + index * 100 },
						data: {
							column: filter.column,
							operator: filter.operator,
							value: filter.value,
							id: filterId,
							onDelete: handleDeleteNode,
						},
					});
				}
			});

			// Add sorting
			config.sorting?.forEach((sort, index) => {
				if (sort.enabled && sort.column) {
					const sortId = `sort-${index}`;
					initialNodes.push({
						id: sortId,
						type: "sort",
						position: { x: 1000, y: 100 + index * 100 },
						data: {
							column: sort.column,
							direction: sort.direction,
							id: sortId,
							onDelete: handleDeleteNode,
						},
					});
				}
			});

			// Add endpoint node
			initialNodes.push({
				id: "endpoint",
				type: "endpoint",
				position: { x: 1300, y: 200 },
				data: {
					method: config.method,
					path: config.path,
					returnType: "JSON",
				},
			});

			setNodes(initialNodes);
			setEdges(initialEdges);
			setNodeIdCounter(initialNodes.length + 1);
		} else {
			// Load demo flow for better showcase
			loadDemoFlow();
		}
	}, []);

	const onConnect = useCallback(
		(params) =>
			setEdges((eds) =>
				addEdge(
					{
						...params,
						style: { strokeWidth: 2 },
					},
					eds
				)
			),
		[setEdges]
	);

	const handleDeleteNode = useCallback(
		(nodeId) => {
			setNodes((nodes) => nodes.filter((node) => node.id !== nodeId));
			setEdges((edges) =>
				edges.filter(
					(edge) => edge.source !== nodeId && edge.target !== nodeId
				)
			);
		},
		[setNodes, setEdges]
	);

	const addNewNode = (type) => {
		const newNodeId = `${type}-${nodeIdCounter}`;
		const newNode = {
			id: newNodeId,
			type: type,
			position: {
				x: Math.random() * 500 + 200,
				y: Math.random() * 300 + 200,
			},
			data: {
				id: newNodeId,
				onDelete: handleDeleteNode,
				...getDefaultNodeData(type),
			},
		};

		setNodes((nodes) => [...nodes, newNode]);
		setNodeIdCounter((prev) => prev + 1);
	};

	const getDefaultNodeData = (type) => {
		switch (type) {
			case "table":
				return {
					label: "new_table",
					fields: ["id", "column1", "column2", "created_at"],
				};
			case "filter":
				return {
					column: "table.column",
					operator: "=",
					value: "value",
				};
			case "join":
				return {
					joinType: "INNER",
					condition: "table1.id = table2.foreign_id",
				};
			case "sort":
				return {
					column: "table.column",
					direction: "ASC",
				};
			default:
				return {};
		}
	};

	const nodeToolbarItems = [
		{
			type: "table",
			icon: CircleStackIcon,
			label: "Add Table",
			color: "blue",
		},
		{ type: "join", icon: LinkIcon, label: "Add Join", color: "orange" },
		{
			type: "filter",
			icon: FunnelIcon,
			label: "Add Filter",
			color: "green",
		},
		{
			type: "sort",
			icon: ArrowsUpDownIcon,
			label: "Add Sort",
			color: "yellow",
		},
	];

	return (
		<div className="w-full h-[800px] bg-gray-50 rounded-lg border shadow-inner">
			<ReactFlow
				nodes={nodes}
				edges={edges}
				onNodesChange={onNodesChange}
				onEdgesChange={onEdgesChange}
				onConnect={onConnect}
				nodeTypes={nodeTypes}
				fitView
				attributionPosition="bottom-left"
				defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
			>
				<Background
					color="#f3f4f6"
					gap={20}
				/>
				<Controls />
				<MiniMap
					nodeColor={(node) => {
						switch (node.type) {
							case "table":
								return "#3b82f6";
							case "filter":
								return "#10b981";
							case "join":
								return "#f97316";
							case "sort":
								return "#eab308";
							case "endpoint":
								return "#8b5cf6";
							default:
								return "#6b7280";
						}
					}}
					style={{
						height: 120,
						backgroundColor: "#f9fafb",
						border: "1px solid #e5e7eb",
					}}
				/>

				{/* Floating Toolbar */}
				<Panel position="top-left">
					<div className="bg-white shadow-lg rounded-lg p-4 space-y-2 border">
						<h3 className="font-medium text-sm text-gray-900 mb-3 flex items-center">
							<SparklesIcon className="w-4 h-4 mr-2" />
							Add Components
						</h3>
						{nodeToolbarItems.map((item) => {
							const Icon = item.icon;
							return (
								<button
									key={item.type}
									onClick={() => addNewNode(item.type)}
									className="w-full flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 bg-gray-50 hover:bg-blue-50 hover:text-blue-700 transition-colors border border-gray-200 hover:border-blue-300"
								>
									<Icon className="w-4 h-4 mr-2" />
									{item.label}
								</button>
							);
						})}
					</div>
				</Panel>

				{/* Demo and Actions Panel */}
				<Panel position="top-right">
					<div className="bg-white shadow-lg rounded-lg p-4 max-w-xs border">
						<h3 className="font-medium text-sm text-gray-900 mb-2 flex items-center">
							<BeakerIcon className="w-4 h-4 mr-2" />
							Flow Builder
						</h3>
						<p className="text-xs text-gray-600 mb-3">
							Drag components from the left panel and connect them
							to build your endpoint flow.
						</p>
						<div className="space-y-2 mb-3">
							<button
								onClick={loadDemoFlow}
								className="w-full px-3 py-2 text-xs font-medium rounded-md text-purple-700 bg-purple-50 hover:bg-purple-100 transition-colors border border-purple-200"
							>
								Load Demo Flow
							</button>
							<button
								onClick={() => {
									setNodes([]);
									setEdges([]);
								}}
								className="w-full px-3 py-2 text-xs font-medium rounded-md text-gray-700 bg-gray-50 hover:bg-gray-100 transition-colors border border-gray-200"
							>
								Clear Canvas
							</button>
						</div>
						<div className="text-xs text-gray-500 space-y-1">
							<div>
								• <span className="text-blue-600">Tables:</span>{" "}
								Data sources
							</div>
							<div>
								•{" "}
								<span className="text-orange-600">Joins:</span>{" "}
								Connect tables
							</div>
							<div>
								•{" "}
								<span className="text-green-600">Filters:</span>{" "}
								Add conditions
							</div>
							<div>
								• <span className="text-yellow-600">Sort:</span>{" "}
								Order results
							</div>
						</div>
					</div>
				</Panel>
			</ReactFlow>
		</div>
	);
};

export default FlowBuilder;
