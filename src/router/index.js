import Vue from 'vue';
import Router from 'vue-router';
import {supabase} from "@/supabase/supabase";

Vue.use(Router);

const router = new Router({
    scrollBehavior() {
        return window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    mode: 'history',
    routes: [
        {
            path: '/admin',
            name: 'admin',
            meta: {
                layout: 'admin',
                requiresAuth: true
            },
            component: () => import('../DemoPages/Dashboards/AnalyticsComponent.vue'),
        },
        {
            path: '/admin/dashboard',
            name: 'dashboard',
            meta: {
                layout: 'admin',
                requiresAuth: true
            },
            component: () => import('../DemoPages/Dashboards/AnalyticsComponent.vue'),
        },
        // Dashboards
        {
            path: '/admin',
            name: 'analytics',
            meta: {
                layout: 'admin',
                requiresAuth: true
            },
            component: () => import('../DemoPages/Dashboards/AnalyticsComponent.vue'),
        },
        {
            path: '/admin/word-counter',
            name: 'word-counter',
            meta: {
                layout: 'admin',
                requiresAuth: true
            },
            component: () => import('../Pages/WordCounter/WordCounterPage.vue'),
        },
        {
            path: '/admin/calculator',
            name: 'calculator',
            meta: {
                layout: 'admin',
                requiresAuth: true
            },
            component: () => import('../Pages/CalculatorPage.vue'),
        },
        // DataSet
        {
            path: '/admin/users',
            name: 'users',
            meta: {
                layout: 'admin',
                requiresAuth: true
            },
            component: () => import('../Pages/Datasets/UserPage.vue'),
        },
        {
            path: '/admin/dataset',
            name: 'dataset',
            meta: {
                layout: 'admin',
                requiresAuth: true
            },
            component: () => import('../Pages/Datasets/DatasetPage.vue'),
        },
        {
            path: '/admin/translations',
            name: 'translations',
            meta: {
                layout: 'admin',
                requiresAuth: true
            },
            component: () => import('../Pages/Datasets/LanguaguePage.vue'),
        },

        // Vtubers Data
        {
            path: '/admin/talents',
            name: 'talents',
            meta: {
                layout: 'admin',
                requiresAuth: true
            },
            component: () => import('../Pages/Vtubers/TalentsPage.vue'),
        },
        {
            path: '/admin/agencies',
            name: 'agencies',
            meta: {
                layout: 'admin',
                requiresAuth: true
            },
            component: () => import('../Pages/Vtubers/AgenciesPage.vue'),
        },
        {
            path: '/admin/albums',
            name: 'albums',
            meta: {
                layout: 'admin',
                requiresAuth: true
            },
            component: () => import('../Pages/Vtubers/AlbumsPage.vue'),
        },
        {
            path: '/admin/discographies',
            name: 'Discographies',
            meta: {
                layout: 'admin',
                requiresAuth: true
            },
            component: () => import('../Pages/Vtubers/DiscographiesPage.vue'),
        },
        {
            path: '/admin/galleries',
            name: 'galleries',
            meta: {
                layout: 'admin',
                requiresAuth: true
            },
            component: () => import('../Pages/Vtubers/GalleriesPage.vue'),
        },
        {
            path: '/admin/events',
            name: 'events',
            meta: {
                layout: 'admin',
                requiresAuth: true
            },
            component: () => import('../Pages/Vtubers/EventsPage.vue'),
        },
        // Settings
        {
            path: '/admin/settings',
            name: 'settings',
            meta: {
                layout: 'admin',
                requiresAuth: true
            },
            component: () => import('../Pages/Settings/SettingPage.vue'),
        },
        {
            path: '/admin/tabs',
            name: 'tabs',
            meta: {
                layout: 'admin',
                requiresAuth: true
            },
            component: () => import('../Pages/TabsPage.vue'),
        },
        // Elements
        {
            path: '/admin/elements/buttons-standard',
            name: 'buttons-standard',
            meta: {
                layout: 'admin',
                requiresAuth: true
            },
            component: () => import('../DemoPages/Elements/Buttons/StandardComponent.vue'),
        },
        {
            path: '/admin/elements/icons',
            name: 'icons',
            meta: {
                layout: 'admin',
                requiresAuth: true
            },
            component: () => import('../DemoPages/Elements/IconsComponent.vue'),
        },
        {
            path: '/admin/elements/badges-labels',
            name: 'badges',
            meta: {
                layout: 'admin',
                requiresAuth: true
            },
            component: () => import('../DemoPages/Elements/BadgesComponent.vue'),
        },
        {
            path: '/admin/elements/cards',
            name: 'cards',
            meta: {
                layout: 'admin',
                requiresAuth: true
            },
            component: () => import('../DemoPages/Elements/CardsComponent.vue'),
        },
        {
            path: '/admin/elements/list-group',
            name: 'list-group',
            meta: {
                layout: 'admin',
                requiresAuth: true
            },
            component: () => import('../DemoPages/Elements/ListGroupsComponent.vue'),
        },
        {
            path: '/admin/elements/timelines',
            name: 'timeline',
            meta: {
                layout: 'admin',
                requiresAuth: true
            },
            component: () => import('../DemoPages/Elements/TimelineComponent.vue'),
        },
        {
            path: '/admin/elements/utilities',
            name: 'utilities',
            meta: {
                layout: 'admin',
                requiresAuth: true
            },
            component: () => import('../DemoPages/Elements/UtilitiesComponent.vue'),
        },
        // Components
        {
            path: '/admin/components/accordions',
            name: 'accordions',
            meta: {
                layout: 'admin',
                requiresAuth: true
            },
            component: () => import('../DemoPages/Components/AccordionsComponent.vue'),
        },
        {
            path: '/admin/components/modals',
            name: 'modals',
            meta: {
                layout: 'admin',
                requiresAuth: true
            },
            component: () => import('../DemoPages/Components/ModalsComponent.vue'),
        },
        {
            path: '/admin/components/progress-bar',
            name: 'progress-bar',
            meta: {
                layout: 'admin',
                requiresAuth: true
            },
            component: () => import('../DemoPages/Components/ProgressBarComponent.vue'),
        },
        {
            path: '/admin/components/tooltips-popovers',
            name: 'tooltips-popovers',
            meta: {
                layout: 'admin',
                requiresAuth: true
            },
            component: () => import('../DemoPages/Components/TooltipsPopoversComponent.vue'),
        },
        {
            path: '/admin/components/carousel',
            name: 'carousel',
            meta: {
                layout: 'admin',
                requiresAuth: true
            },
            component: () => import('../DemoPages/Components/CarouselComponent.vue'),
        },
        {
            path: '/admin/components/maps',
            name: 'maps',
            component: () => import('../DemoPages/Components/MapsComponent.vue'),
        },
        // Tables
        {
            path: '/admin/tables/regular-tables',
            name: 'regular-tables',
            meta: {
                layout: 'admin',
                requiresAuth: true
            },
            component: () => import('../DemoPages/Tables/RegularTables.vue'),
        },
        // Dashboard Widgets
        {
            path: '/admin/widgets/chart-boxes-3',
            name: 'chart-boxes-3',
            meta: {
                layout: 'admin',
                requiresAuth: true
            },
            component: () => import('../DemoPages/Widgets/ChartBoxes3.vue'),
        },
        // Forms
        {
            path: '/admin/forms/controls',
            name: 'controls',
            meta: {
                layout: 'admin',
                requiresAuth: true
            },
            component: () => import('../DemoPages/Forms/Elements/ControlsComponent.vue'),
        },
        {
            path: '/admin/forms/layouts',
            name: 'layouts',
            meta: {
                layout: 'admin',
                requiresAuth: true
            },
            component: () => import('../DemoPages/Forms/Elements/LayoutsComponent.vue'),
        },
        // Kanban
        {
            path: '/admin/kanban',
            name: 'kanban',
            meta: {
                layout: 'admin',
                requiresAuth: true
            },
            component: () => import('../Pages/Kanban/KanbanComponent.vue'),
        },
        // Chatbox
        {
            path: '/admin/chatbox',
            name: 'chatbox',
            meta: {
                layout: 'admin',
                requiresAuth: true
            },
            component: () => import('../DemoPages/ChatBox/ChatBox.vue'),
        },
        {
            path: '/admin/chatgroup',
            name: 'chatgroup',
            meta: {
                layout: 'admin',
                requiresAuth: true
            },
            component: () => import('../DemoPages/ChatBox/ChatGroup.vue'),
        },
        // Pages
        {
            path: '/login',
            name: 'login',
            component: () => import('../DemoPages/UserPages/LoginPage.vue'),
        },
        {
            path: '/pages/register',
            name: 'register',
            meta: {
                layout: 'userpages',
            },
            component: () => import('../DemoPages/UserPages/RegisterBoxed.vue'),
        },
        {
            path: '/pages/forgot-password',
            name: 'forgot-password',
            meta: {
                layout: 'userpages',
            },
            component: () => import('../DemoPages/UserPages/ForgotPasswordBoxed.vue'),
        },
        {
            path: '/',
            name: 'Home',
            component: () => import('../Pages/HomePage.vue'),
        },
        {
            path: '*',
            name: 'not-found',
            meta: {
                layout: 'userpages',
            },
            component: () => import('../Pages/NotFoundPage.vue'),
        },
    ]
})

router.beforeEach(async (to, from, next) => {
    const { data: { user } } = await supabase.auth.getUser();
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    if(requiresAuth && !user) {
        next('/login');
        console.log("login")
    } else if(!requiresAuth && user) {
        next("/admin");
        console.log("admin")
    } else {
        console.log("in")
        next();
    }
  })
export default router;