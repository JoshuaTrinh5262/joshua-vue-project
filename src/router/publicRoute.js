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
            title: "Product | Joshua Trinh",
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
            title: "Not Found | Joshua Trinh",
            layout: "empty",
        },
        component: () => import("../public/NotFoundPage.vue"),
    },
    // Tools
    {
        path: "/timer",
        name: "Timer",
        component: () => import("../public/TimerPage.vue"),
        meta: {
            title: "Timer | Joshua Trinh",
            layout: "public",
            breadcrumb: "timer",
        },
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
        path: "/edison",
        name: "Edison",
        component: () => import("../public/Edison.vue"),
        meta: {
            title: "Edison | Joshua Trinh",
            layout: "public",
            breadcrumb: "edison",
        },
    },
    {
        path: "/genesys",
        name: "Genesys",
        component: () => import("../public/Genesys.vue"),
        meta: {
            title: "Genesys | Joshua Trinh",
            layout: "public",
            breadcrumb: "genesys",
        },
    },
    {
        path: "/deckbuild",
        name: "DeckBuild",
        component: () => import("../public/DeckBuild.vue"),
        meta: {
            title: "Deckbuild | Joshua Trinh",
            layout: "public",
        },
    },
    {
        path: "/contact",
        name: "Contact",
        component: () => import("../public/ContactPage.vue"),
        meta: {
            title: "Contact | Joshua Trinh",
            layout: "public",
            breadcrumb: "contact",
        },
    },
    {
        path: "/terms-and-conditions",
        name: "Terms And Conditions",
        component: () => import("../public/TermsAndConditions.vue"),
        meta: {
            title: "Terms And Conditions | Joshua Trinh",
            layout: "public",
        },
    },
];

export default publicRoutes;
