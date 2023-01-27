import { assertEnv } from "~/lib/env";

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

assertEnv(supabaseUrl, "SUPABASE_URL");
assertEnv(supabaseKey, "SUPABASE_KEY");

const supabase = createClient(supabaseUrl, supabaseKey);

export { supabase };
