import { NextResponse } from "next/server";
import { writeFile, mkdir, access } from "fs/promises";
import { join } from "path";

export async function POST(request) {
	try {
		const { fileName, filePath, code, componentName } =
			await request.json();

		if (!fileName || !code || !componentName) {
			return NextResponse.json(
				{
					error: "Missing required fields: fileName, code, componentName",
				},
				{ status: 400 }
			);
		}

		// Get the absolute path to the project root
		const projectRoot = process.cwd();
		const fullPath = join(projectRoot, filePath);

		// Ensure the Preview_Components directory exists
		const dirPath = join(projectRoot, "components", "Preview_Components");
		try {
			await mkdir(dirPath, { recursive: true });
		} catch (error) {
			// Directory might already exist, that's okay
			console.log("Directory exists or created:", dirPath);
		}

		// Write the component file
		await writeFile(fullPath, code, "utf8");

		// Verify the file was written successfully
		try {
			await access(fullPath);
			console.log(`✅ Component file created and verified: ${fullPath}`);
		} catch (verifyError) {
			throw new Error(
				`File was not created successfully: ${verifyError.message}`
			);
		}

		return NextResponse.json({
			success: true,
			message: `Component ${componentName} created successfully`,
			filePath,
			fileName,
		});
	} catch (error) {
		console.error("❌ Error creating component file:", error);

		return NextResponse.json(
			{
				error: "Failed to create component file",
				details: error.message,
			},
			{ status: 500 }
		);
	}
}
