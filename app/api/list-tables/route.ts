import { NextRequest, NextResponse } from "next/server";
import supabase from "@/utils/supabase/server";

export async function GET(req: NextRequest) {
	try {
		const { searchParams } = new URL(req.url);
		const prefix = searchParams.get("prefix") || "";

		// Validate prefix to prevent SQL injection
		if (!/^[a-zA-Z0-9_]*$/.test(prefix)) {
			return NextResponse.json(
				{ error: "Invalid prefix format" },
				{ status: 400 }
			);
		}

		console.log(
			`Calling RPC get_table_names_by_prefix with prefix: ${prefix}`
		);

		// Call the RPC function
		const response = await supabase.rpc("get_table_names_by_prefix", {
			prefix,
		});

		console.log("Full RPC response:", JSON.stringify(response));

		const { data, error } = response;

		if (error) {
			console.error("RPC Error:", error);
			return NextResponse.json({ error: error.message }, { status: 500 });
		}

		console.log("RPC response data:", JSON.stringify(data));

		// Return the data as is - we'll handle the structure in the frontend
		return NextResponse.json({ tables: data?.tables || [] });
	} catch (err: unknown) {
		console.error("Unexpected error:", err);
		return NextResponse.json(
			{ error: (err as Error).message || "Unexpected error" },
			{ status: 500 }
		);
	}
}
