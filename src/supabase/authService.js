import { supabase } from "./supabase";

export async function signup(email, password) {
    const { user, error } = await supabase.auth.signUp({
        email: email,
        password: password,
    });

    if (error) {
        this.error = error.message;
    } else {
        this.error = null;
        return user;
    }
}

export async function login(email, password) {
    const { user, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });

    if (error) {
        return { error: error.message };
    } else {
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

export async function getUser() {
    const {
        data: { user },
    } = await supabase.auth.getUser();
    return user;
}

export async function getSession() {
    const {
        data: { session },
    } = await supabase.auth.getSession();
    return session;
}
