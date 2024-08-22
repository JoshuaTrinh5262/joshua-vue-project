import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://wtogyxxhemugevdrilkc.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind0b2d5eHhoZW11Z2V2ZHJpbGtjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTk1NDM0NTgsImV4cCI6MjAzNTExOTQ1OH0.E8R9RJ-HAR7bkj0EhnXD_RKu8rNwwFH4sfG1D6luSzo";

export const supabase = createClient(supabaseUrl, supabaseKey);

