"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function BuilderPage() {
	const router = useRouter();

	// useEffect(() => {
	// 	// Redirect to tables as default
	// 	router.push("/builder/tables");
	// }, [router]);

	return (
		<div className="text-center py-12">
			<h2 className="text-xl font-semibold text-gray-900">
				Redirecting to Tables...
			</h2>
		</div>
	);
}
