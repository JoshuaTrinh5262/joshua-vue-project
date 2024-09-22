import { createRouter, createWebHistory } from 'vue-router';
import {supabase} from "@/supabase/supabase";

const routes = [
    {
        path: '/admin',
        name: 'admin',
        meta: {
            layout: 'admin',
            requiresAuth: true
        },
        component: () => import('../DemoPages/Dashboards/DashboardComponent.vue'),
    },
    // Dashboards
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
    {
        path: '/admin/elements/progress-bar',
        name: 'progress-bar',
        meta: {
            layout: 'admin',
            requiresAuth: true
        },
        component: () => import('../DemoPages/Components/ProgressBarComponent.vue'),
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
        component: () => import('../DemoPages/Forms/ControlsComponent.vue'),
    },
    {
        path: '/admin/forms/layouts',
        name: 'layouts',
        meta: {
            layout: 'admin',
            requiresAuth: true
        },
        component: () => import('../DemoPages/Forms/LayoutsComponent.vue'),
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
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        meta: {
            layout: 'userpages',
        },
        component: () => import('../Pages/NotFoundPage.vue'),
    },
]

const router = new createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
        return { top: 0, behavior: 'smooth' };
    },

})

router.beforeEach(async (to, from, next) => {
    const { data: { user } } = await supabase.auth.getUser();
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

    // Check if the route requires authentication and user is not logged in
    if (requiresAuth && !user) {
        next('/login');
        console.log("Redirecting to login because authentication is required.");
    }
    // Check if the route is for /admin and user is not logged in
    else if (to.path.startsWith('/admin') && !user) {
        next('/login');
        console.log("Redirecting to login because user is not authenticated for admin route.");
    }
    // If user is logged in and trying to access a public route, redirect to /admin
    else if (!requiresAuth && user && to.path === '/login') {
        next("/admin");
        console.log("Redirecting to admin dashboard because user is already logged in.");
    } 
    // Allow access to the route
    else {
        console.log("Allowing access to the route.");
        next();
    }
});

export default router;