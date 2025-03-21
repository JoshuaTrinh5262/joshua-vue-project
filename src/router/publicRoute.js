const publicRoutes = [
    {
        path: "/",
        name: "Home",
        meta: {
            breadcrumb: 'Home'
        },
        component: () => import("../public/HomePage.vue"),
    },
    {
        path: "/yugioh",
        name: "Yugioh",
        meta: {
            breadcrumb: 'Yugioh'
        },
        component: () => import("../public/YugiohPage.vue"),
        children: [
            {
                path: 'card',
                name: 'Card',
                component: () => import("../public/yugioh/CardPublicPage.vue"),
                meta: {
                    breadcrumb: 'Cards'
                }
            },
            {
                path: 'banlist',
                name: 'Banlist',
                component: () => import("../public/yugioh/BanlistPublicPage.vue"),
                meta: {
                    breadcrumb: 'Banlist'
                }
            },
            {
                path: "tournament",
                name: "Tournament",
                meta: {
                    breadcrumb: 'Tournament'
                },
                component: () => import("../public/yugioh/TournamentPublicPage.vue"),
            },
        ],
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
