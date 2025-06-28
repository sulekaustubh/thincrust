import { NextResponse } from "next/server";
import { readFile, access } from "fs/promises";
import { join } from "path";

export async function GET(request) {
	try {
		const { searchParams } = new URL(request.url);
		const name = searchParams.get("name");
		const checkOnly = searchParams.get("check") === "true";

		if (!name) {
			return NextResponse.json(
				{ error: "Component name is required" },
				{ status: 400 }
			);
		}

		const projectRoot = process.cwd();
		const filePath = join(
			projectRoot,
			"components",
			"Preview_Components",
			`${name}.jsx`
		);

		// Check if file exists
		try {
			await access(filePath);
		} catch (error) {
			return NextResponse.json(
				{ error: "Component file not found", exists: false },
				{ status: 404 }
			);
		}

		// If only checking existence, return early
		if (checkOnly) {
			return NextResponse.json({ exists: true });
		}

		// Read and return file contents
		const source = await readFile(filePath, "utf8");
		return new Response(source, {
			headers: { "Content-Type": "text/plain" },
		});
	} catch (error) {
		console.error("Error reading component source:", error);
		return NextResponse.json(
			{ error: "Failed to read component source", exists: false },
			{ status: 500 }
		);
	}
}
