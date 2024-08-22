import { supabase } from "./supabase";

export async function signup(email, password) {
    const { user, error } = await supabase.auth.signUp({
        email: email,
        password: password,
    });

    if (error) {
        console.log(error);
        this.error = error.message;
    } else {
        this.error = null;
        return user;
    }
}

export async function logout() {
    const { error } = await supabase.auth.signOut();
    if (error) {
        return { error: error.message };
    } else {
        return {};
    }
}
