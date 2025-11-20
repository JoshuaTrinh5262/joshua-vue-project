import { supabase } from "./supabase";
import { jwtDecode } from "../helpers/jwtHelper.js";

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
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });

    // Extract the session data
    const session = data?.session;
    if (!session) {
        return { error: "No session returned." };
    }

    // Get the JWT token
    const token = session.access_token;

    // Decode the token
    const decoded = jwtDecode(token);

    localStorage.setItem("jwt_token", token);
    localStorage.setItem("jwt_user", JSON.stringify(decoded));

    if (error) {
        return { error: error.message };
    } else {
        return data;
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
