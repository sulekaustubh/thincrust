// app/api/get-table/route.ts
import { NextRequest, NextResponse } from "next/server";
import supabase from "@/utils/supabase/server";

export async function GET(req: NextRequest) {
	try {
		const { searchParams } = new URL(req.url);
		const tableName = searchParams.get("table");

		if (!tableName || !/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(tableName)) {
			return NextResponse.json(
				{ error: "Invalid table name" },
				{ status: 400 }
			);
		}

		const { data, error } = await supabase.rpc("get_table_data", {
			table_name: tableName,
		});

		if (error) {
			console.error("RPC Error:", error);
			return NextResponse.json({ error: error.message }, { status: 500 });
		}

		return NextResponse.json({ data });
	} catch (err: unknown) {
		return NextResponse.json(
			{ error: (err as Error).message || "Unexpected error" },
			{ status: 500 }
		);
	}
}
