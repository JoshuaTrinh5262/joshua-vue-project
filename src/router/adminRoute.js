const adminRoutes = [
    {
        path: "/admin",
        name: "admin",
        meta: {
            layout: "admin",
            requiresAuth: true,
        },
        component: () => import("../Pages/DashboardPage.vue"),
    },
    // Dashboards
    {
        path: "/admin/word-counter",
        name: "word-counter",
        meta: {
            layout: "admin",
            requiresAuth: true,
        },
        component: () => import("../Pages/Tools/WordCounterPage.vue"),
    },
    {
        path: "/admin/json-compare",
        name: "json-compare",
        meta: {
            layout: "admin",
            requiresAuth: true,
        },
        component: () => import("../Pages/Tools/JsonComparePage.vue"),
    },
    {
        path: "/admin/calculator",
        name: "calculator",
        meta: {
            layout: "admin",
            requiresAuth: true,
        },
        component: () => import("../Pages/Tools/CalculatorPage.vue"),
    },
        {
        path: "/admin/timer",
        name: "timer",
        meta: {
            layout: "admin",
            requiresAuth: true,
        },
        component: () => import("../Pages/Tools/TimerPage.vue"),
    },
    // DataSet
    {
        path: "/admin/user",
        name: "user",
        meta: {
            layout: "admin",
            requiresAuth: true,
        },
        component: () => import("../Pages/Datasets/UserPage.vue"),
    },
    {
        path: "/admin/task",
        name: "task",
        meta: {
            layout: "admin",
            requiresAuth: true,
        },
        component: () => import("../Pages/Datasets/TaskPage.vue"),
    },
    {
        path: "/admin/dataset",
        name: "dataset",
        meta: {
            layout: "admin",
            requiresAuth: true,
        },
        component: () => import("../Pages/Datasets/DatasetPage.vue"),
    },
    {
        path: "/admin/dataset-unprocess",
        name: "dataset-unprocess",
        meta: {
            layout: "admin",
            requiresAuth: true,
        },
        component: () => import("../Pages/Datasets/DatasetUnprocessPage.vue"),
    },

    // Vtubers Data
    {
        path: "/admin/talent",
        name: "talents",
        meta: {
            layout: "admin",
            requiresAuth: true,
        },
        component: () => import("../Pages/Vtubers/TalentsPage.vue"),
    },
    {
        path: "/admin/talent/:id",
        name: "talent detail",
        meta: {
            layout: "admin",
            requiresAuth: true,
        },
        props: true,
        component: () => import("../Pages/Vtubers/TalentDetailPage.vue"),
    },
    {
        path: "/admin/agency",
        name: "agencies",
        meta: {
            layout: "admin",
            requiresAuth: true,
        },
        component: () => import("../Pages/Vtubers/AgenciesPage.vue"),
    },
    {
        path: "/admin/agency/:id",
        name: "agency detail",
        meta: {
            layout: "admin",
            requiresAuth: true,
        },
        props: true,
        component: () => import("../Pages/Vtubers/AgencyDetailPage.vue"),
    },
    {
        path: "/admin/album",
        name: "albums",
        meta: {
            layout: "admin",
            requiresAuth: true,
        },
        props: true,
        component: () => import("../Pages/Vtubers/AlbumsPage.vue"),
    },
    {
        path: "/admin/album/:id",
        name: "album detail",
        meta: {
            layout: "admin",
            requiresAuth: true,
        },
        props: true,
        component: () => import("../Pages/Vtubers/AlbumDetailPage.vue"),
    },
    {
        path: "/admin/discography",
        name: "Discographies",
        meta: {
            layout: "admin",
            requiresAuth: true,
        },
        component: () => import("../Pages/Vtubers/DiscographiesPage.vue"),
    },
    {
        path: "/admin/discography/:id",
        name: "discography detail",
        meta: {
            layout: "admin",
            requiresAuth: true,
        },
        props: true,
        component: () => import("../Pages/Vtubers/DiscographyDetailPage.vue"),
    },
    {
        path: "/admin/gallery",
        name: "galleries",
        meta: {
            layout: "admin",
            requiresAuth: true,
        },
        component: () => import("../Pages/Vtubers/GalleriesPage.vue"),
    },
    {
        path: "/admin/event",
        name: "events",
        meta: {
            layout: "admin",
            requiresAuth: true,
        },
        component: () => import("../Pages/Vtubers/EventsPage.vue"),
    },
    {
        path: "/admin/event/:id",
        name: "event detail",
        meta: {
            layout: "admin",
            requiresAuth: true,
        },
        props: true,
        component: () => import("../Pages/Vtubers/EventDetailPage.vue"),
    },
    // Yu-gi-oh
    {
        path: "/admin/banlist",
        name: "banlist",
        meta: {
            layout: "admin",
            requiresAuth: true,
        },
        component: () => import("../Pages/Yugioh/BanlistPage.vue"),
    },
    {
        path: "/admin/card",
        name: "card",
        meta: {
            layout: "admin",
            requiresAuth: true,
        },
        component: () => import("../Pages/Yugioh/CardPage.vue"),
    },
    {
        path: "/admin/deck",
        name: "Deck",
        meta: {
            layout: "admin",
            requiresAuth: true,
        },
        component: () => import("../Pages/Yugioh/DeckPage.vue"),
    },
    // {
    //     path: "/admin/deck/:id",
    //     name: "deck detail",
    //     meta: {
    //         layout: "admin",
    //         requiresAuth: true,
    //     },
    //     props: true,
    //     component: () => import("../Pages/Yugioh/Detail/DeckDetailPage.vue"),
    // },
    {
        path: "/admin/deck/:id",
        name: "deck detail",
        meta: {
            layout: "admin",
            requiresAuth: true,
        },
        props: true,
        component: () => import("../Pages/Yugioh/Detail/DeckDetailPage.vue"),
    },
    {
        path: "/admin/duelist",
        name: "duelist",
        meta: {
            layout: "admin",
            requiresAuth: true,
        },
        component: () => import("../Pages/Yugioh/DuelistPage.vue"),
    },
    {
        path: "/admin/product",
        name: "product",
        meta: {
            layout: "admin",
            requiresAuth: true,
        },
        component: () => import("../Pages/Yugioh/ProductPage.vue"),
    },
    {
        path: "/admin/tournament",
        name: "tournament",
        meta: {
            layout: "admin",
            requiresAuth: true,
        },
        component: () => import("../Pages/Yugioh/TournamentPage.vue"),
    },
    // Settings
    {
        path: "/admin/setting",
        name: "settings",
        meta: {
            layout: "admin",
            requiresAuth: true,
        },
        component: () => import("../Pages/Settings/SettingPage.vue"),
    },
    {
        path: "/admin/translation",
        name: "translations",
        meta: {
            layout: "admin",
            requiresAuth: true,
        },
        component: () => import("../Pages/TranslationPage.vue"),
    },
    {
        path: "/admin/tabs",
        name: "tabs",
        meta: {
            layout: "admin",
            requiresAuth: true,
        },
        component: () => import("../Pages/TabsPage.vue"),
    },
    // Elements
    {
        path: "/admin/elements/icons",
        name: "icons",
        meta: {
            layout: "admin",
            requiresAuth: true,
        },
        component: () => import("../DemoPages/Elements/IconsComponent.vue"),
    },
    {
        path: "/admin/elements/badges-labels",
        name: "badges",
        meta: {
            layout: "admin",
            requiresAuth: true,
        },
        component: () => import("../DemoPages/Elements/BadgesComponent.vue"),
    },
    {
        path: "/admin/elements/cards",
        name: "cards",
        meta: {
            layout: "admin",
            requiresAuth: true,
        },
        component: () => import("../DemoPages/Elements/CardsComponent.vue"),
    },
    {
        path: "/admin/elements/list-group",
        name: "list-group",
        meta: {
            layout: "admin",
            requiresAuth: true,
        },
        component: () =>
            import("../DemoPages/Elements/ListGroupsComponent.vue"),
    },
    {
        path: "/admin/elements/timelines",
        name: "timeline",
        meta: {
            layout: "admin",
            requiresAuth: true,
        },
        component: () => import("../DemoPages/Elements/TimelineComponent.vue"),
    },
    {
        path: "/admin/elements/utilities",
        name: "utilities",
        meta: {
            layout: "admin",
            requiresAuth: true,
        },
        component: () => import("../DemoPages/Elements/UtilitiesComponent.vue"),
    },
    {
        path: "/admin/elements/progress-bar",
        name: "progress-bar",
        meta: {
            layout: "admin",
            requiresAuth: true,
        },
        component: () =>
            import("../DemoPages/Components/ProgressBarComponent.vue"),
    },
    // Tables
    {
        path: "/admin/tables/regular-tables",
        name: "regular-tables",
        meta: {
            layout: "admin",
            requiresAuth: true,
        },
        component: () => import("../DemoPages/Tables/RegularTables.vue"),
    },
    {
        path: "/admin/tables/advance-tables",
        name: "advance-tables",
        meta: {
            layout: "admin",
            requiresAuth: true,
        },
        component: () => import("../DemoPages/Tables/AdvanceTables.vue"),
    },
    // Dashboard Widgets
    {
        path: "/admin/widgets/chart-boxes-3",
        name: "chart-boxes-3",
        meta: {
            layout: "admin",
            requiresAuth: true,
        },
        component: () => import("../DemoPages/Widgets/ChartBoxes3.vue"),
    },
    // Forms
    {
        path: "/admin/forms/controls",
        name: "controls",
        meta: {
            layout: "admin",
            requiresAuth: true,
        },
        component: () => import("../DemoPages/Forms/ControlsComponent.vue"),
    },
    {
        path: "/admin/forms/layouts",
        name: "layouts",
        meta: {
            layout: "admin",
            requiresAuth: true,
        },
        component: () => import("../DemoPages/Forms/LayoutsComponent.vue"),
    },
    // Kanban
    {
        path: "/admin/kanban",
        name: "kanban",
        meta: {
            layout: "admin",
            requiresAuth: true,
        },
        component: () => import("../Pages/Kanban/KanbanPage.vue"),
    },
    {
        path: "/admin/chatgroup",
        name: "chatgroup",
        meta: {
            layout: "admin",
            requiresAuth: true,
        },
        component: () => import("../Pages/Datasets/ChatGroupPage.vue"),
    },
    // Pages
    {
        path: "/login",
        name: "login",
        component: () => import("../DemoPages/UserPages/LoginPage.vue"),
    },
    {
        path: "/admin/register",
        name: "register",
        meta: {
            layout: "admin",
            requiresAuth: true,
        },
        component: () => import("../DemoPages/UserPages/RegisterBoxed.vue"),
    },
    {
        path: "/admin/forgot-password",
        name: "forgot-password",
        meta: {
            layout: "admin",
            requiresAuth: true,
        },
        component: () =>
            import("../DemoPages/UserPages/ForgotPasswordBoxed.vue"),
    },
];

export default adminRoutes;
