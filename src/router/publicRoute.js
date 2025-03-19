const publicRoutes = [
    {
        path: "/",
        name: "Home",
        component: () => import("../Public/HomePage.vue"),
    },
    {
        path: "/yugioh/card",
        name: "Public Card",
        component: () => import("../Public/Yugioh/CardPublicPage.vue"),
    },
    {
        path: "/yugioh/banlist",
        name: "Public Banlist",
        component: () => import("../Public/Yugioh/BanlistPublicPage.vue"),
    },
    {
        path: "/yugioh/tournament",
        name: "Public Tournament",
        component: () => import("../Public/Yugioh/TournamentPublicPage.vue"),
    },
    {
        path: "/:pathMatch(.*)*",
        name: "not-found",
        meta: {
            layout: "userpages",
        },
        component: () => import("../Public/NotFoundPage.vue"),
    },
];

export default publicRoutes;
