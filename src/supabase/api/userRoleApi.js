import { supabase } from "../supabase";

export const getUserRoles = async () => {
    const { data: rolesData, error: rolesError } = await supabase
        .from('user_role')
        .select('*')

    if (rolesError) {
        return [];
    }

    return rolesData;
}