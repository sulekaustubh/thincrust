import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

// Specify edge runtime
export const runtime = "edge";

// Initialize Supabase client with server-side env variables
const supabaseUrl =
	process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey =
	process.env.SUPABASE_SERVICE_ROLE_KEY ||
	process.env.SUPABASE_ANON_KEY ||
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET(request) {
	try {
		// Extract request URL to get any query parameters
		const { searchParams } = new URL(request.url);

		// Initialize query builder
		let query = supabase.from("users").select("*");

		// Apply optional filters if provided in query parameters
		// For example: /api/users?limit=10
		const limit = searchParams.get("limit");
		if (limit && !isNaN(parseInt(limit))) {
			query = query.limit(parseInt(limit));
		}

		// Execute the query
		const { data, error } = await query;

		if (error) {
			console.error("Error fetching users:", error);
			return NextResponse.json(
				{ error: "Failed to fetch users" },
				{ status: 500 }
			);
		}

		// Return the data with proper headers
		return NextResponse.json(data, {
			status: 200,
			headers: {
				"Cache-Control":
					"max-age=0, s-maxage=60, stale-while-revalidate=300",
			},
		});
	} catch (error) {
		console.error("Unexpected error in users API route:", error);
		return NextResponse.json(
			{ error: "An unexpected error occurred" },
			{ status: 500 }
		);
	}
}
