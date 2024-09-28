import { supabase } from "../supabase";

export async function getAuthUsers(newPage, newPageSize) {
    const { data, error } = await supabase.auth.admin.listUsers({
        page: newPage,
        perPage: newPageSize,
    });

    if (error) {
        return [];
    }

    return {
        items: data.users,
    };
}

export async function getAuthUserById(id) {
    const { data, error } = await supabase.auth.admin.getUserById(id);

    if (error) {
        return [];
    }

    return {
        items: data.users,
    };
}
