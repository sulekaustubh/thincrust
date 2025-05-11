import { NextRequest, NextResponse } from "next/server";
import supabase_server from "../../../utils/supabase_server";
// import supabase from "@/utils/supabase_server";

export async function POST(req: NextRequest) {
	try {
		const { tableName, columns } = await req.json();

		// Validate table name
		if (!tableName || !/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(tableName)) {
			return NextResponse.json(
				{ error: "Invalid table name" },
				{ status: 400 }
			);
		}

		if (!Array.isArray(columns) || columns.length === 0) {
			return NextResponse.json(
				{ error: "Invalid columns array" },
				{ status: 400 }
			);
		}

		// Validate and sanitize columns
		const columnStrings = columns.map((col) => {
			const { name, type, isPrimaryKey, isNullable, defaultValue } = col;
			if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(name)) {
				throw new Error("Invalid column name");
			}

			let str = `${name} ${type}`;
			if (defaultValue) str += ` default ${defaultValue}`;
			if (isPrimaryKey) str += " primary key";
			else str += isNullable ? "" : " not null";

			return str;
		});

		// Call stored function via RPC
		const { error } = await supabase_server.rpc("create_user_table", {
			table_name: tableName,
			columns_json: columnStrings,
		});

		if (error) {
			console.error("RPC Error:", error);
			return NextResponse.json({ error: error.message }, { status: 500 });
		}

		return NextResponse.json({ success: true });
	} catch (err: unknown) {
		return NextResponse.json(
			{ error: (err as Error).message || "Unexpected error" },
			{ status: 500 }
		);
	}
}
