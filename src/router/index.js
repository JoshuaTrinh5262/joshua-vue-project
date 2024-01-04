import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
    scrollBehavior() {
        return window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    mode: 'history',
    routes: [

        // Dashboards

        {
            path: '/',
            name: 'analytics',
            component: () => import('../DemoPages/Dashboards/AnalyticsComponent.vue'),
        },
        {
            path: '/word-counter',
            name: 'word-counter',
            component: () => import('../Pages/WordCounter/WordCounterPage.vue'),
        },
        {
            path: '/calculator',
            name: 'calculator',
            component: () => import('../Pages/CalculatorPage.vue'),
        },
        // Pages

        {
            path: '/pages/login-boxed',
            name: 'login-boxed',
            meta: {layout: 'userpages'},
            component: () => import('../DemoPages/UserPages/LoginBoxed.vue'),
        },
        {
            path: '/pages/register-boxed',
            name: 'register-boxed',
            meta: {layout: 'userpages'},
            component: () => import('../DemoPages/UserPages/RegisterBoxed.vue'),
        },
        {
            path: '/pages/forgot-password-boxed',
            name: 'forgot-password-boxed',
            meta: {layout: 'userpages'},
            component: () => import('../DemoPages/UserPages/ForgotPasswordBoxed.vue'),
        },

        // DataSet
        {
            path: '/users',
            name: 'users',
            component: () => import('../Pages/Datasets/UserPage.vue'),
        },
        {
            path: '/dataset',
            name: 'dataset',
            component: () => import('../Pages/Datasets/DatasetPage.vue'),
        },
        {
            path: '/translations',
            name: 'translations',
            component: () => import('../Pages/Datasets/LanguaguePage.vue'),
        },

        // Settings
        {
            path: '/settings',
            name: 'settings',
            component: () => import('../Pages/Settings/SettingPage.vue'),
        },
        {
            path: '/tabs',
            name: 'tabs',
            component: () => import('../Pages/TabsPage.vue'),
        },
        

        // Elements

        {
            path: '/elements/buttons-standard',
            name: 'buttons-standard',
            component: () => import('../DemoPages/Elements/Buttons/StandardComponent.vue'),
        },
        {
            path: '/elements/dropdowns',
            name: 'dropdowns',
            component: () => import('../DemoPages/Elements/DropdownsComponent.vue'),
        },
        {
            path: '/elements/icons',
            name: 'icons',
            component: () => import('../DemoPages/Elements/IconsComponent.vue'),
        },
        {
            path: '/elements/badges-labels',
            name: 'badges',
            component: () => import('../DemoPages/Elements/BadgesComponent.vue'),
        },
        {
            path: '/elements/cards',
            name: 'cards',
            component: () => import('../DemoPages/Elements/CardsComponent.vue'),
        },
        {
            path: '/elements/list-group',
            name: 'list-group',
            component: () => import('../DemoPages/Elements/ListGroupsComponent.vue'),
        },
        {
            path: '/elements/timelines',
            name: 'timeline',
            component: () => import('../DemoPages/Elements/TimelineComponent.vue'),
        },
        {
            path: '/elements/utilities',
            name: 'utilities',
            component: () => import('../DemoPages/Elements/UtilitiesComponent.vue'),
        },

        // Components

        {
            path: '/components/tabs',
            name: 'tabs',
            component: () => import('../DemoPages/Components/TabsComponent.vue'),
        },
        {
            path: '/components/accordions',
            name: 'accordions',
            component: () => import('../DemoPages/Components/AccordionsComponent.vue'),
        },
        {
            path: '/components/modals',
            name: 'modals',
            component: () => import('../DemoPages/Components/ModalsComponent.vue'),
        },
        {
            path: '/components/progress-bar',
            name: 'progress-bar',
            component: () => import('../DemoPages/Components/ProgressBarComponent.vue'),
        },
        {
            path: '/components/tooltips-popovers',
            name: 'tooltips-popovers',
            component: () => import('../DemoPages/Components/TooltipsPopoversComponent.vue'),
        },
        {
            path: '/components/carousel',
            name: 'carousel',
            component: () => import('../DemoPages/Components/CarouselComponent.vue'),
        },
        {
            path: '/components/pagination',
            name: 'pagination',
            component: () => import('../DemoPages/Components/PaginationPage.vue'),
        },
        {
            path: '/components/maps',
            name: 'maps',
            component: () => import('../DemoPages/Components/MapsComponent.vue'),
        },

        // Tables

        {
            path: '/tables/regular-tables',
            name: 'regular-tables',
            component: () => import('../DemoPages/Tables/RegularTables.vue'),
        },

        // Dashboard Widgets

        {
            path: '/widgets/chart-boxes-3',
            name: 'chart-boxes-3',
            component: () => import('../DemoPages/Widgets/ChartBoxes3.vue'),
        },

        // Forms

        {
            path: '/forms/controls',
            name: 'controls',
            component: () => import('../DemoPages/Forms/Elements/ControlsComponent.vue'),
        },
        {
            path: '/forms/layouts',
            name: 'layouts',
            component: () => import('../DemoPages/Forms/Elements/LayoutsComponent.vue'),
        },

        // Kanban

        {
            path: '/kanban',
            name: 'kanban',
            component: () => import('../Pages/Kanban/KanbanComponent.vue'),
        },
    ]
})
