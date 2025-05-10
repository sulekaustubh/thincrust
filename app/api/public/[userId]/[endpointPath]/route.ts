import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

// IMPORTANT: Set the runtime to edge
export const runtime = "edge";

// Initialize Supabase client
// Ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are in your .env file
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function GET(
	request: NextRequest,
	{ params }: { params: { userId: string; endpointPath: string } }
) {
	const { userId, endpointPath } = params;

	if (!userId || !endpointPath) {
		return NextResponse.json(
			{ error: "User ID and endpoint path are required" },
			{ status: 400 }
		);
	}

	try {
		// 1. Fetch endpoint configuration from 'user_api_endpoint_configs'
		const { data: config, error: configError } = await supabase
			.from("user_api_endpoint_configs")
			.select("target_table_name")
			.eq("user_id", userId)
			.eq("endpoint_path", endpointPath)
			.single(); // Expect only one config per user/path

		if (configError) {
			console.error("Error fetching endpoint config:", configError);
			if (configError.code === "PGRST116") {
				// PGRST116: "The result contains 0 rows"
				return NextResponse.json(
					{ error: "API endpoint not found or access denied." },
					{ status: 404 }
				);
			}
			return NextResponse.json(
				{ error: "Failed to fetch endpoint configuration." },
				{ status: 500 }
			);
		}

		if (!config || !config.target_table_name) {
			return NextResponse.json(
				{
					error: "Endpoint configuration is invalid or missing target table.",
				},
				{ status: 404 }
			);
		}

		const targetTable = config.target_table_name;

		// 2. Fetch data from the dynamically determined target_table_name,
		//    filtering by the userId to ensure data isolation.
		//    This assumes the target_table_name itself has a 'user_id' column.
		const { data: apiData, error: apiDataError } = await supabase
			.from(targetTable)
			.select("*") // You might want to allow users to configure specific columns
			.eq("user_id", userId); // CRUCIAL: Ensures multi-tenancy

		if (apiDataError) {
			console.error(
				`Error fetching data from ${targetTable}:`,
				apiDataError
			);
			return NextResponse.json(
				{ error: `Failed to fetch data for endpoint: ${endpointPath}` },
				{ status: 500 }
			);
		}

		return NextResponse.json(apiData, { status: 200 });
	} catch (error) {
		console.error("Unexpected error in API route:", error);
		return NextResponse.json(
			{ error: "An unexpected error occurred." },
			{ status: 500 }
		);
	}
}
