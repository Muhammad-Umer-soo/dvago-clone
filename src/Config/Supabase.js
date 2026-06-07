import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  "https://tfkcybpvipmumphagwnd.supabase.co",
  "sb_publishable_snZjEAAh1yrEGPAUxQsUFw_wqoIvavf"
);
