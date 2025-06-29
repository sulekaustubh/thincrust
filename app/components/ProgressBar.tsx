"use client";

import React from "react";

interface ProgressBarProps {
	progress: number;
	status: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, status }) => {
	return (
		<div className="w-full mt-4">
			<div className="mb-2 flex justify-between">
				<span className="text-sm font-medium text-gray-700">
					{status}
				</span>
				<span className="text-sm font-medium text-gray-700">
					{Math.round(progress)}%
				</span>
			</div>
			<div className="w-full bg-gray-200 rounded-full h-2.5">
				<div
					className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
					style={{ width: `${progress}%` }}
				></div>
			</div>
		</div>
	);
};

export default ProgressBar;
