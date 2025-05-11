import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client with server-side env variables
const supabaseUrl =
	process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey =
	process.env.SUPABASE_ANON_KEY ||
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Create a single instance of the Supabase client to be reused
const supabase = createClient(supabaseUrl, supabaseKey);

export { supabase };
