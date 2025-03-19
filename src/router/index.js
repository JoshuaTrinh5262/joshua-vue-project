import { createRouter, createWebHistory } from "vue-router";
import authGuard from "./authGuard";
import publicRoutes from "./publicRoute";
import adminRoutes from "./adminRoute";

const routes = [
    ...publicRoutes,
    ...adminRoutes,
];

const router = new createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
        return { top: 0, behavior: "smooth" };
    },
});

router.beforeEach(authGuard);

export default router;
