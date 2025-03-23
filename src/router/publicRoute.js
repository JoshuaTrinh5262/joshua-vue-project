const publicRoutes = [
    {
        path: "/",
        name: "Home",
        meta: {
            breadcrumb: "Home",
        },
        component: () => import("../public/HomePage.vue"),
    },
    {
        path: "/yugioh",
        name: "yugioh",
        component: () => import("../public/YugiohPage.vue"),
        meta: {
            breadcrumb: "yugioh",
        },
    },
    {
        path: "/yugioh/card",
        name: "Card",
        component: () => import("../public/yugioh/CardPublicPage.vue"),
        meta: {
            breadcrumb: "Cards",
        },
    },
    {
        path: "/yugioh/banlist",
        name: "Banlist",
        component: () => import("../public/yugioh/BanlistPublicPage.vue"),
        meta: {
            breadcrumb: "Banlist",
        },
    },
    {
        path: "/yugioh/tournament",
        name: "Tournament",
        meta: {
            breadcrumb: "Tournament",
        },
        component: () => import("../public/yugioh/TournamentPublicPage.vue"),
    },
    {
        path: "/:pathMatch(.*)*",
        name: "not-found",
        meta: {
            layout: "userpages",
        },
        component: () => import("../public/NotFoundPage.vue"),
    },
];

export default publicRoutes;
