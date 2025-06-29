const publicRoutes = [
    {
        path: "/",
        name: "Home",
        meta: {
            breadcrumb: "Home",
        },
        component: () => import("../public/HomePage.vue"),
    },
    // YUGIOH
    {
        path: "/yugioh",
        name: "Yugioh",
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
        path: "/yugioh/product",
        name: "Product",
        component: () => import("../public/yugioh/ProductPublicPage.vue"),
        meta: {
            breadcrumb: "Product",
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
    // VTUBER
    {
        path: "/vtuber",
        name: "Vtuber",
        component: () => import("../public/VtuberPage.vue"),
        meta: {
            breadcrumb: "Vtuber",
        },
    },
    {
        path: "/vtuber/event",
        name: "event",
        component: () => import("../public/vtuber/EventPublicPage.vue"),
        meta: {
            breadcrumb: "Event",
        },
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
