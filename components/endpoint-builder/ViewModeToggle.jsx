import React from "react";
import {
	Squares2X2Icon,
	DocumentTextIcon,
	ArrowPathIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

const ViewModeToggle = ({
	viewMode,
	onViewModeChange,
	isAnimating = false,
}) => {
	const modes = [
		{
			id: "form",
			name: "Form ",
			icon: DocumentTextIcon,
			description: "Step-by-step configuration",
			activeClasses: "bg-indigo-100 text-indigo-700 shadow-sm",
			buttonClasses: "text-indigo-700 bg-indigo-50 hover:bg-indigo-100",
		},
		{
			id: "flow",
			name: "Visual",
			icon: Squares2X2Icon,
			description: "Drag & drop visual builder",
			activeClasses: "bg-purple-100 text-purple-700 shadow-sm",
			buttonClasses: "text-purple-700 bg-purple-50 hover:bg-purple-100",
		},
	];

	return (
		<div className="bg-white rounded-lg shadow-sm border-gray-900 p-1 inline-flex">
			{modes.map((mode) => {
				const Icon = mode.icon;
				const isActive = viewMode === mode.id;

				return (
					<motion.button
						key={mode.id}
						onClick={() => onViewModeChange(mode.id)}
						disabled={isAnimating}
						className={`
              relative flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all duration-200
              ${
					isActive
						? mode.activeClasses
						: "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
				}
              ${
					isAnimating
						? "opacity-50 cursor-not-allowed"
						: "cursor-pointer"
				}
            `}
						whileHover={!isAnimating ? { scale: 1.02 } : {}}
						whileTap={!isAnimating ? { scale: 0.98 } : {}}
					>
						{isAnimating && isActive ? (
							<ArrowPathIcon className="w-4 h-4 mr-2 animate-spin" />
						) : (
							<Icon className="w-4 h-4 mr-2" />
						)}
						<div className="text-left">
							<div className="font-medium">{mode.name}</div>
							{/* <div className="text-xs opacity-75">
								{mode.description}
							</div> */}
						</div>

						{isActive && (
							<motion.div
								layoutId="activeBackground"
								className={`absolute inset-0 ${
									isActive ? mode.activeClasses : ""
								} rounded-md -z-10`}
								initial={false}
								transition={{
									type: "spring",
									bounce: 0.2,
									duration: 0.6,
								}}
							/>
						)}
					</motion.button>
				);
			})}
		</div>
	);
};

export default ViewModeToggle;
