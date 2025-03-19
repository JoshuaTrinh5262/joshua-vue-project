const publicRoutes = [
    {
        path: "/",
        name: "Home",
        component: () => import("../public/HomePage.vue"),
    },
    {
        path: "/yugioh/card",
        name: "Public Card",
        component: () => import("../public/yugioh/CardPublicPage.vue"),
    },
    {
        path: "/yugioh/banlist",
        name: "Public Banlist",
        component: () => import("../public/yugioh/BanlistPublicPage.vue"),
    },
    {
        path: "/yugioh/tournament",
        name: "Public Tournament",
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
