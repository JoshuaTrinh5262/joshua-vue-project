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

    const usersWithRoles = data.users.map(user => ({
        ...user,
        user_role: rolesMap[user.id] || null,
    }));

    return {
        items: usersWithRoles,
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

export async function createAuthUser(userdata) {
    try {
        const { data, error } = await supabase.auth.admin.createUser({
            email: userdata.email,
            password: userdata.password,
            email_confirm: userdata.email_confirm
        });

        if (error) {
            throw new Error(error.message);
        }

        return data;
    } catch (error) {
        throw new Error(error.message);
    }
}


export async function deleteAuthUser(userId) {
    try {
        const { error } = await supabase.auth.admin.deleteUser(userId);

        if (error) {
            throw new Error(error.message);
        }

        return 'User successfully deleted';

    } catch (error) {
        // Catch and throw a more descriptive error message
        throw new Error(`Failed to delete user: ${error.message}`);
    }
}