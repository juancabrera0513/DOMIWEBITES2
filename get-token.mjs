import { createClient } from "@supabase/supabase-js";

const url = process.env.SUPABASE_URL;
const anon = process.env.SUPABASE_ANON;
const email = process.env.EMAIL;
const password = process.env.PASSWORD;

if (!url || !anon || !email || !password) {
  console.error("Missing env: SUPABASE_URL SUPABASE_ANON EMAIL PASSWORD");
  process.exit(1);
}

const sb = createClient(url, anon);
const { data, error } = await sb.auth.signInWithPassword({ email, password });
if (error) {
  console.error(error);
  process.exit(1);
}

console.log(data.session.access_token);
