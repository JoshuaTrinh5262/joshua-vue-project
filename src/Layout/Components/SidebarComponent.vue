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
            <VuePerfectScrollbar class="app-sidebar-scroll" v-once>
                <sidebar-menu showOneChild :menu="menu"></sidebar-menu>
            </VuePerfectScrollbar>
        </div>
    </div>
</template>

<script>

    import VuePerfectScrollbar from 'vue-perfect-scrollbar';
    import SidebarMenu from './Sidebar/SidebarMenu.vue';
    export default {
        name: "sidebar-componenent",

        components: {
            SidebarMenu,
            VuePerfectScrollbar
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
                        title: 'Dashboards',
                        icon: 'pe-7s-rocket',
                        child: [
                            {
                                href: '/',
                                title: 'Analytics',
                            },
                            {
                                href: '/word-counter',
                                title: 'Word Counter',
                            },
                            {
                                href: '/calculator',
                                title: 'Calculator',
                            },
                        ]
                    },
                    {
                        title: 'DataSet',
                        icon: 'pe-7s-rocket',
                        child: [
                            {
                                href: '/users',
                                title: 'Users',
                            },
                            {
                                href: '/dataset',
                                title: 'Dataset',
                            },
                            {
                                title: 'Chatgroup',
                                href: '/Chatgroup',
                            },
                            {
                                href: '/translations',
                                title: 'Translations',
                            },
                        ]
                    },
                    {
                        title: 'Settings',
                        icon: 'pe-7s-rocket',
                        child: [
                            {
                                href: '/settings',
                                title: 'Settings',
                            },
                        ]
                    },
                    {
                        title: 'Generals',
                        icon: 'pe-7s-rocket',
                        child: [
                            {
                                href: '/tabs',
                                title: 'Tabs',
                            },
                        ]
                    },
                    {
                        title: 'Pages',
                        icon: 'pe-7s-browser',
                        child: [
                            {
                                href: '/pages/login-boxed',
                                title: 'Login Boxed',
                            },
                            {
                                href: '/pages/register-boxed',
                                title: 'Register Boxed',
                            },
                            {
                                href: '/pages/forgot-password-boxed',
                                title: 'Forgot Password Boxed',
                            },
                        ]
                    },
                    {
                        header: true,
                        title: 'Vtuber Data',
                    },
                    {
                        title: 'Talents',
                        icon: 'pe-7s-rocket',
                        href: '/talents',

                    },
                    {
                        title: 'Agencies',
                        icon: 'pe-7s-rocket',
                        href: '/agencies',
                    },
                    {
                        title: 'Discographies',
                        icon: 'pe-7s-rocket',
                        href: '/discographies',
                    },
                    {
                        title: 'Events',
                        icon: 'pe-7s-rocket',
                        href: '/events',
                    },
                    {
                        title: 'Galleries',
                        icon: 'pe-7s-rocket',
                        href: '/galleries',
                    },
                    {
                        header: true,
                        title: 'UI Components',
                    },
                    {
                        icon: 'pe-7s-diamond',
                        title: 'Elements',
                        child: [
                            {
                                title: 'Buttons',
                                href: '/elements/buttons-standard',
                            },
                            {
                                title: 'Dropdowns',
                                href: '/elements/dropdowns',
                            },
                            {
                                title: 'Icons',
                                href: '/elements/icons',
                            },
                            {
                                title: 'Badges',
                                href: '/elements/badges-labels',
                            },
                            {
                                title: 'Cards',
                                href: '/elements/cards',
                            },
                            {
                                title: 'List Groups',
                                href: '/elements/list-group',
                            },
                            {
                                title: 'Timeline',
                                href: '/elements/timelines',
                            },
                            {
                                title: 'Utilities',
                                href: '/elements/utilities',
                            },
                        ],
                    },
                    {
                        icon: 'pe-7s-car',
                        title: 'Components',
                        child: [
                            {
                                title: 'Tabs',
                                href: '/components/tabs',
                            },
                            {
                                title: 'Accordions',
                                href: '/components/accordions',
                            },
                            {
                                title: 'Modals',
                                href: '/components/modals',
                            },
                            {
                                title: 'Progress Bar',
                                href: '/components/progress-bar',
                            },
                            {
                                title: 'Tooltips & Popovers',
                                href: '/components/tooltips-popovers',
                            },
                            {
                                title: 'Carousel',
                                href: '/components/carousel',
                            },
                            {
                                title: 'Pagination',
                                href: '/components/pagination',
                            },
                            {
                                title: 'Maps',
                                href: '/components/maps',
                            },
                        ],
                    },
                    {
                        icon: 'pe-7s-display2',
                        title: 'Tables',
                        child: [
                            {
                                title: 'Regular Tables',
                                href: '/tables/regular-tables',
                            },
                        ]
                    },
                    {
                        icon: 'pe-7s-display2',
                        title: 'Kanban',
                        child: [
                            {
                                title: 'Kanban',
                                href: '/kanban',
                            },
                        ]
                    },
                    {
                        icon: 'pe-7s-display2',
                        title: 'Chatbox',
                        child: [
                            {
                                title: 'Chatbox',
                                href: '/Chatbox',
                            },
                        ]
                    },
                    {
                        header: true,
                        title: 'Dashboard Boxes',
                    },
                    {
                        icon: 'pe-7s-graph2',
                        title: 'Chart Boxes',
                        href: '/widgets/chart-boxes-3',
                    },
                    {
                        header: true,
                        title: 'Forms',
                    },
                    {
                        icon: 'pe-7s-light',
                        title: 'Elements',
                        child: [
                            {
                                title: 'Controls',
                                href: '/forms/controls',
                            },
                            {
                                title: 'Layouts',
                                href: '/forms/layouts',
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
            this.$nextTick(function () {
                window.addEventListener('resize', this.getWindowWidth);

                //Init
                this.getWindowWidth()
            })
        },

        beforeDestroy() {
            window.removeEventListener('resize', this.getWindowWidth);
        }
    }
</script>
