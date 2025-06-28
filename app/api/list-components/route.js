// unused api file delete later
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
	try {
		const componentsDir = path.join(
			process.cwd(),
			"components",
			"Preview_Components"
		);

		// Check if directory exists
		if (!fs.existsSync(componentsDir)) {
			return NextResponse.json({ components: [] });
		}

		// Read all files in the directory
		const files = fs.readdirSync(componentsDir);

		// Filter for .jsx and .js files and extract component names
		const components = files
			.filter((file) => file.endsWith(".jsx") || file.endsWith(".js"))
			.map((file) => {
				const name = file.replace(/\.(jsx|js)$/, "");
				return {
					name,
					file,
				};
			});

		return NextResponse.json({ components });
	} catch (error) {
		console.error("Error listing components:", error);
		return NextResponse.json(
			{ error: "Failed to list components" },
			{ status: 500 }
		);
	}
}
