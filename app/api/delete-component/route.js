import { NextResponse } from "next/server";
import { unlink } from "fs/promises";
import { join } from "path";

export async function DELETE(request) {
	try {
		const { filePath } = await request.json();

		if (!filePath) {
			return NextResponse.json(
				{ error: "Missing required field: filePath" },
				{ status: 400 }
			);
		}

		// Get the absolute path to the project root
		const projectRoot = process.cwd();
		const fullPath = join(projectRoot, filePath);

		// Delete the component file
		await unlink(fullPath);

		console.log(`🗑️ Component file deleted: ${fullPath}`);

		return NextResponse.json({
			success: true,
			message: `Component file deleted successfully`,
			filePath,
		});
	} catch (error) {
		console.error("❌ Error deleting component file:", error);

		return NextResponse.json(
			{
				error: "Failed to delete component file",
				details: error.message,
			},
			{ status: 500 }
		);
	}
}
