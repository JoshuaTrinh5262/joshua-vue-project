const publicRoutes = [
    {
        path: "/",
        name: "Home",
        meta: {
            layout: "public",
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
            layout: "public",
            breadcrumb: "yugioh",
        },
    },
    {
        path: "/yugioh/card",
        name: "Card",
        component: () => import("../public/yugioh/CardPublicPage.vue"),
        meta: {
            layout: "public",
            breadcrumb: "Cards",
        },
    },
    {
        path: "/yugioh/banlist",
        name: "Banlist",
        component: () => import("../public/yugioh/BanlistPublicPage.vue"),
        meta: {
            layout: "public",
            breadcrumb: "Banlist",
        },
    },
    {
        path: "/yugioh/product",
        name: "Product",
        component: () => import("../public/yugioh/ProductPublicPage.vue"),
        meta: {
            layout: "public",
            breadcrumb: "Product",
        },
    },
    {
        path: "/yugioh/tournament",
        name: "Tournament",
        meta: {
            layout: "public",
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
            layout: "public",
            breadcrumb: "Vtuber",
        },
    },
    {
        path: "/vtuber/event",
        name: "event",
        component: () => import("../public/vtuber/EventPublicPage.vue"),
        meta: {
            layout: "public",
            breadcrumb: "Event",
        },
    },
    {
        path: "/:pathMatch(.*)*",
        name: "not-found",
        meta: {
            layout: "empty",
        },
        component: () => import("../public/NotFoundPage.vue"),
    },
    // Other
    {
        path: "/master_rule",
        name: "Master Rule",
        component: () => import("../public/MasterRulePage.vue"),
        meta: {
            layout: "public",
            breadcrumb: "master_rule",
        },
    },
        {
        path: "/draft",
        name: "Draft",
        component: () => import("../public/yugioh/DraftPage.vue"),
        meta: {
            layout: "public",
            breadcrumb: "draft",
        },
    },
    {
        path: "/contact",
        name: "Contact",
        component: () => import("../public/ContactPage.vue"),
        meta: {
            layout: "public",
            breadcrumb: "contact",
        },
    },
        {
        path: "/terms-and-conditions",
        name: "Terms And Conditions",
        component: () => import("../public/TermsAndConditions.vue"),
        meta: {
            layout: "public",
        },
    },
];

export default publicRoutes;
