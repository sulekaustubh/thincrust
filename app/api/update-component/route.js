import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request) {
	try {
		const { componentName, updates } = await request.json();

		// Construct the file path
		const filePath = path.join(
			process.cwd(),
			"components",
			"Preview_Components",
			`${componentName}.jsx`
		);

		// Check if file exists
		if (!fs.existsSync(filePath)) {
			return NextResponse.json(
				{ error: "Component file not found" },
				{ status: 404 }
			);
		}

		// Read the current file content
		let fileContent = fs.readFileSync(filePath, "utf8");
		console.log("📄 Original file content:", fileContent);

		// Apply updates to the file content
		updates.forEach((update) => {
			const { selector, newText, newClassName } = update;
			console.log("🔄 Processing update:", update);

			if (newText) {
				const originalContent = fileContent;
				fileContent = updateTextInJSX(fileContent, selector, newText);
				console.log(
					"📝 Text update - Changed:",
					originalContent !== fileContent
				);
			}

			if (newClassName) {
				const originalContent = fileContent;
				fileContent = updateClassNameInJSX(
					fileContent,
					selector,
					newClassName
				);
				console.log(
					"🎨 ClassName update - Changed:",
					originalContent !== fileContent
				);
			}
		});

		console.log("📄 Updated file content:", fileContent);

		// Write the updated content back to the file
		fs.writeFileSync(filePath, fileContent, "utf8");

		return NextResponse.json({
			success: true,
			message: `Component ${componentName} updated successfully`,
			filePath,
		});
	} catch (error) {
		console.error("Error updating component:", error);
		return NextResponse.json(
			{ error: "Failed to update component" },
			{ status: 500 }
		);
	}
}

// Helper function to update text content in JSX
function updateTextInJSX(content, selector, newText) {
	console.log("🔍 Looking for text content:", selector.textContent);
	console.log("🔍 Looking for prop:", selector.propName);

	// First, try to update prop patterns if propName exists
	if (selector.propName) {
		// Try both patterns: {props.title} and {title}
		const propsPattern = new RegExp(`{props\\.${selector.propName}}`, "g");
		const destructuredPattern = new RegExp(`{${selector.propName}}`, "g");

		console.log("🔍 Trying props pattern:", propsPattern);
		console.log("🔍 Trying destructured pattern:", destructuredPattern);

		// Replace {props.title} pattern
		if (content.match(propsPattern)) {
			console.log("✅ Found props pattern, replacing...");
			content = content.replace(propsPattern, `"${newText}"`);
			return content;
		}

		// Replace {title} pattern
		if (content.match(destructuredPattern)) {
			console.log("✅ Found destructured pattern, replacing...");
			content = content.replace(destructuredPattern, `"${newText}"`);
			return content;
		}
	}

	// If no prop pattern found, try to replace direct text content
	if (selector.textContent) {
		console.log(
			"🔍 Trying direct text replacement for:",
			selector.textContent
		);

		// Escape special regex characters in the text content
		const escapedText = selector.textContent.replace(
			/[.*+?^${}()|[\]\\]/g,
			"\\$&"
		);

		// Create pattern to match the text content within JSX tags
		// This will match text that appears between > and < tags
		const directTextPattern = new RegExp(
			`(>\\s*)${escapedText}(\\s*<)`,
			"g"
		);

		console.log("🔍 Direct text pattern:", directTextPattern);

		if (content.match(directTextPattern)) {
			console.log("✅ Found direct text pattern, replacing...");
			content = content.replace(directTextPattern, `$1${newText}$2`);
			return content;
		}

		// Also try pattern for text within quotes (in case it's already quoted)
		const quotedTextPattern = new RegExp(`"${escapedText}"`, "g");
		if (content.match(quotedTextPattern)) {
			console.log("✅ Found quoted text pattern, replacing...");
			content = content.replace(quotedTextPattern, `"${newText}"`);
			return content;
		}
	}

	console.log("❌ No matching pattern found for text update");
	return content;
}

// Helper function to update className in JSX
function updateClassNameInJSX(content, selector, newClassName) {
	console.log(
		"🎨 Updating className from:",
		selector.originalClassName,
		"to:",
		newClassName
	);

	if (selector.tagName && selector.originalClassName) {
		// Escape special characters in className for regex
		const escapedClassName = selector.originalClassName.replace(
			/[.*+?^${}()|[\]\\]/g,
			"\\$&"
		);
		const classPattern = new RegExp(`className="${escapedClassName}"`, "g");

		console.log("🔍 ClassName pattern:", classPattern);

		if (content.match(classPattern)) {
			console.log("✅ Found className pattern, replacing...");
			content = content.replace(
				classPattern,
				`className="${newClassName}"`
			);
		} else {
			console.log("❌ ClassName pattern not found in content");
		}
	}

	return content;
}
