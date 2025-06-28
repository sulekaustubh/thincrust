"use client";
import React, { useState } from "react";
import Sections_Panel from "@/components/UI-BUILDER/Sections_Panel";
import Components_Panel from "@/components/UI-BUILDER/Components_Panel";
import Preview_Panel from "@/components/UI-BUILDER/Preview_Panel";
import Props_Panel from "@/components/UI-BUILDER/Props_Panel";

function page() {
	const [activeTab, setActiveTab] = useState("sections");
	const [isChanged, setIsChanged] = useState(0);
	return (
		<div className="text-white">
			<div>
				<div className="br c h-12">
					Top Panel for Publish, Deploy, Save, etc
				</div>
			</div>
			<div className="flex pt-2  h-[calc(100vh-48px)] gap-x-4">
				<div className="bb w-1/6">
					{/* toggle button or tabs to switch between sections and components */}
					<div className="br flex justify-between gap-x-2">
						<span
							onClick={() => setActiveTab("sections")}
							className="text-sm bg w-1/2 cursor-pointer text-center"
						>
							Sections
						</span>
						<span
							onClick={() => setActiveTab("components")}
							className="text-sm bg w-1/2 cursor-pointer text-center"
						>
							Components
						</span>
					</div>
					{/* conditional rendering of list of sections or components  */}
					<div>
						{activeTab === "sections" ? (
							<Sections_Panel isChanged={isChanged} setIsChanged={setIsChanged} />
						) : (
							<Components_Panel />
						)}
					</div>
				</div>
				<div className="bb h-full overflow-y-scroll w-4/6">
					<Preview_Panel isChanged={isChanged} setIsChanged={setIsChanged} />
				</div>
				<div className="bb w-1/6">
					<Props_Panel />
				</div>
			</div>
		</div>
	);
}

export default page;
