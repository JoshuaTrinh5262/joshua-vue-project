import { supabase } from "@/supabase/supabase";

const authGuard = async (to, from, next) => {
    const {
        data: { user },
    } = await supabase.auth.getUser();
    const requiresAuth = to.matched.some((route) => route.meta.requiresAuth);

    const cleanAndRedirect = async () => {
        await supabase.auth.signOut();
        sessionStorage.clear();
        next("/login");
    };

    if (requiresAuth && !user) {
        await cleanAndRedirect();
    } else if (to.path.startsWith("/admin") && !user) {
        await cleanAndRedirect();
    } else if (!requiresAuth && user && to.path === "/login") {
        next("/admin");
    } else {
        next();
    }
};

export default authGuard;
