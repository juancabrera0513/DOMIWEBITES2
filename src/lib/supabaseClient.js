import { createClient } from "@supabase/supabase-js";

// These are public client identifiers, not privileged credentials. Environment
// variables still take priority so previews or future projects can override them.
const SUPABASE_URL =
  process.env.REACT_APP_SUPABASE_URL ||
  "https://anyngvsepgjsvilmafhl.supabase.co";

const SUPABASE_ANON_KEY =
  process.env.REACT_APP_SUPABASE_ANON_KEY ||
  "sb_publishable_Y--66fQH7gRaDw9ghTJfpg_5RNXvTvw";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});
