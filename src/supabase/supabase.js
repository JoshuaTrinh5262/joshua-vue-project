import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.VUE_APP_SUPABASE_URL;
const supabaseKey = process.env.VUE_APP_SUPABASE_KEY;
const serviceRoleKey = process.env.VUE_APP_SERVICE_ROLE_KEY;
export const supabase = createClient(supabaseUrl, serviceRoleKey);

// supabase.auth.onAuthStateChange((event, session) => {
//     if (event === 'SIGNED_IN') {
//         console.log('User signed in:');
//     } else if (event === 'SIGNED_OUT') {
//         console.log('User signed out.');
//     } else if (event === 'USER_UPDATED') {
//         console.log('User updated:');
//     }
// });
