<template>
    <div class="app-sidebar sidebar-shadow" @mouseover="toggleSidebarHover('add','closed-sidebar-open')" @mouseleave="toggleSidebarHover('remove','closed-sidebar-open')">
        <div class="app-header__logo">
            <div class="logo-src"></div>
            <div class="header__pane ml-auto">
                <button type="button" class="hamburger close-sidebar-btn hamburger--elastic" v-bind:class="{ 'is-active' : isOpen }" @click="toggleBodyClass('closed-sidebar')">
                    <span class="hamburger-box">
                        <span class="hamburger-inner"></span>
                    </span>
                </button>
            </div>
        </div>
        <div class="app-sidebar-content">
            <PerfectScrollbar class="app-sidebar-scroll" v-once>
                <sidebar-menu showOneChild :menu="menu"></sidebar-menu>
            </PerfectScrollbar>
        </div>
    </div>
</template>

<script>
    import PerfectScrollbar from 'vue3-perfect-scrollbar';
    import SidebarMenu from './Sidebar/SidebarMenu.vue';

    export default {
        name: "sidebar-componenent",

        components: {
            SidebarMenu,
            PerfectScrollbar
        },
        data() {
            return {
                isOpen: false,
                sidebarActive: false,

                menu: [
                    {
                        header: true,
                        title: 'Main Navigation',
                    },
                    {
                        href: '/admin',
                        title: 'Dashboards',
                        icon: 'pe-7s-rocket',
                    },
                    {
                        href: '/admin/users',
                        title: 'Users',
                        icon: 'pe-7s-users',
                    },
                    {
                        title: 'Tools',
                        icon: 'pe-7s-rocket',
                        child: [
                            {
                                href: '/admin/word-counter',
                                title: 'Word Counter',
                            },
                            {
                                href: '/admin/calculator',
                                title: 'Calculator',
                            },
                        ]
                    },
                    {
                        title: 'Settings',
                        icon: 'pe-7s-settings',
                        href: '/admin/settings',
                    },
                    {
                        title: 'Tabs',
                        icon: 'pe-7s-rocket',
                        href: '/admin/tabs',
                    },
                    {
                        title: 'Pages',
                        icon: 'pe-7s-browser',
                        child: [
                            {
                                href: '/pages/register',
                                title: 'Register Boxed',
                            },
                            {
                                href: '/pages/forgot-password',
                                title: 'Forgot Password Boxed',
                            },
                        ]
                    },
                    // Vtuber
                    {
                        header: true,
                        title: 'Vtuber Data',
                    },
                    {
                        title: 'Talents',
                        icon: 'pe-7s-user-female',
                        href: '/admin/talents',

                    },
                    {
                        title: 'Agencies',
                        icon: 'pe-7s-rocket',
                        href: '/admin/agencies',
                    },
                    {
                        title: 'Discographies',
                        icon: 'pe-7s-rocket',
                        href: '/admin/discographies',
                    },
                    {
                        title: 'Albums',
                        icon: 'pe-7s-rocket',
                        href: '/admin/albums',
                    },
                    {
                        title: 'Events',
                        icon: 'pe-7s-rocket',
                        href: '/admin/events',
                    },
                    {
                        title: 'Galleries',
                        icon: 'pe-7s-rocket',
                        href: '/admin/galleries',
                    },
                    // Dataset
                    {
                        header: true,
                        title: 'DataSet',
                    },
                    {
                        href: '/admin/dataset',
                        title: 'Dataset',
                        icon: 'pe-7s-rocket',
                    },
                    {
                        title: 'Chatgroup',
                        href: '/admin/Chatgroup',
                        icon: 'pe-7s-rocket',
                    },
                    {
                        href: '/admin/translations',
                        title: 'Translations',
                        icon: 'pe-7s-rocket',
                    },
                    {
                        header: true,
                        title: 'Other Components',
                    },
                    {
                        icon: 'pe-7s-diamond',
                        title: 'Elements',
                        child: [
                            {
                                title: 'Icons',
                                href: '/admin/elements/icons',
                            },
                            {
                                title: 'Badges',
                                href: '/admin/elements/badges-labels',
                            },
                            {
                                title: 'Cards',
                                href: '/admin/elements/cards',
                            },
                            {
                                title: 'List Groups',
                                href: '/admin/elements/list-group',
                            },
                            {
                                title: 'Timeline',
                                href: '/admin/elements/timelines',
                            },
                            {
                                title: 'Utilities',
                                href: '/admin/elements/utilities',
                            },
                            {
                                title: 'Progress Bar',
                                href: '/admin/elements/progress-bar',
                            },
                        ],
                    },
                    {
                        icon: 'pe-7s-display2',
                        title: 'Tables',
                        child: [
                            {
                                title: 'Regular Tables',
                                href: '/admin/tables/regular-tables',
                            },
                        ]
                    },
                    {
                        icon: 'pe-7s-display2',
                        title: 'Kanban',
                        href: '/admin/kanban',
                    },
                    {
                        icon: 'pe-7s-display2',
                        title: 'Chatbox',
                        href: '/admin/Chatbox',
                    },
                    {
                        icon: 'pe-7s-graph2',
                        title: 'Chart Boxes',
                        href: '/admin/widgets/chart-boxes-3',
                    },
                    {
                        icon: 'pe-7s-light',
                        title: 'Elements',
                        child: [
                            {
                                title: 'Controls',
                                href: '/admin/forms/controls',
                            },
                            {
                                title: 'Layouts',
                                href: '/admin/forms/layouts',
                            },
                        ],
                    },
                ],
                collapsed: true,

                windowWidth: 0,

            }
        },
        props: {
            sidebarbg: String,
        },
        methods: {

            toggleBodyClass(className) {
                const el = document.body;
                this.isOpen = !this.isOpen;

                if (this.isOpen) {
                    el.classList.add(className);
                } else {
                    el.classList.remove(className);
                }
            },
            toggleSidebarHover(add, className) {
                const el = document.body;
                this.sidebarActive = !this.sidebarActive;

                this.windowWidth = document.documentElement.clientWidth;

                if (this.windowWidth > '992') {
                    if (add === 'add') {
                        el.classList.add(className);
                    } else {
                        el.classList.remove(className);
                    }
                }
            },
            getWindowWidth() {
                const el = document.body;

                this.windowWidth = document.documentElement.clientWidth;

                if (this.windowWidth < '1350') {
                    el.classList.add('closed-sidebar', 'closed-sidebar-md');
                } else {
                    el.classList.remove('closed-sidebar', 'closed-sidebar-md');
                }
            },
        },
        mounted() {
            window.addEventListener('resize', this.getWindowWidth);
            this.getWindowWidth()
        },

        beforeUnmount() {
            window.removeEventListener('resize', this.getWindowWidth);
        }
    }
</script>
