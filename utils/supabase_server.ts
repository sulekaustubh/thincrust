import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
	throw new Error("Missing Supabase environment variables");
}

const supabase_server = createClient(supabaseUrl, supabaseServiceRoleKey);

export default supabase_server;
