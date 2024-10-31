import { supabase } from "../supabase";
import { getUserRoles } from "../api/userRoleApi"

export async function getAuthUsers(newPage, newPageSize) {
    const { data, error } = await supabase.auth.admin.listUsers({
        page: newPage,
        perPage: newPageSize,
    });

    if (error) {
        return [];
    }

    const userRoleData = await getUserRoles();
    const rolesMap = {};
    userRoleData.forEach(role => {
        rolesMap[role.user_id] = role.role;
    });

    // Combine users with their user roles
    const usersWithRoles = data.users.map(user => ({
        ...user,
        user_role: rolesMap[user.id] || null,
    }));


    return {
        items: usersWithRoles,
    };
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
