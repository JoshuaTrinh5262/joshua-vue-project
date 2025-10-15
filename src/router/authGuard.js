import { supabase } from "@/supabase/supabase";

const authGuard = async (to, from, next) => {
    const {
        data: { user },
    } = await supabase.auth.getUser();
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
    console.log("user data getUser", user);
    // Check if the route requires authentication and user is not logged in
    if (requiresAuth && !user) {
        if (to.path.startsWith("/admin")) {
            next("/admin/login");
            console.log(
                "Redirecting to admin login because user is not authenticated."
            );
        } else {
            next("/login");
            console.log(
                "Redirecting to login because authentication is required."
            );
        }
    }
    // Check if the route is for /admin and user is not logged in
    else if (to.path.startsWith("/admin") && !user) {
        next("/login");
        console.log(
            "Redirecting to login because user is not authenticated for admin route."
        );
    }
    // If user is logged in and trying to access a public route, redirect to /admin
    else if (!requiresAuth && user && to.path === "/login") {
        next("/admin");
        console.log(
            "Redirecting to admin dashboard because user is already logged in."
        );
    }
    // Allow access to the route
    else {
        console.log("Allowing access to the route.");
        next();
    }
};

export default authGuard;
