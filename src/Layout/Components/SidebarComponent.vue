<template>
    <div class="app-sidebar sidebar-shadow" @mouseover="toggleSidebarHover('add', 'closed-sidebar-open')"
        @mouseleave="toggleSidebarHover('remove', 'closed-sidebar-open')">
        <div class="app-header__logo">
            <div class="logo-src"></div>
            <div class="header__pane ml-auto">
                <button type="button" class="hamburger close-sidebar-btn hamburger--elastic"
                    :class="{ 'is-active': isOpen }" @click="toggleBodyClass('closed-sidebar')">
                    <span class="hamburger-box">
                        <span class="hamburger-inner"></span>
                    </span>
                </button>
            </div>
        </div>
        <div class="app-sidebar-content">
            <PerfectScrollbar class="app-sidebar-scroll" v-once>
                <SidebarMenu showOneChild :menu="menu"></SidebarMenu>
            </PerfectScrollbar>
        </div>
    </div>
</template>

<script>
import { defineComponent, onMounted, onBeforeUnmount, ref } from 'vue';
import { PerfectScrollbar } from 'vue3-perfect-scrollbar';
import SidebarMenu from './Sidebar/SidebarMenu.vue';

export default defineComponent({
    name: 'SidebarComponent',

    components: {
        SidebarMenu,
        PerfectScrollbar,
    },

    props: {
        sidebarbg: String,
    },

    setup() {
        const isOpen = ref(false);
        const sidebarActive = ref(false);
        const windowWidth = ref(0);

        const menu = ref([
            { header: true, title: 'Main Navigation' },
            { title: 'Dashboards', icon: 'pe-7s-menu', href: '/admin', },
            { title: 'User', icon: 'pe-7s-users', href: '/admin/user' },
            { title: 'Task', icon: 'pe-7s-notebook', href: '/admin/task' },
            {
                title: 'Tools',
                icon: 'pe-7s-tools',
                child: [
                    { title: 'Word Counter', href: '/admin/word-counter' },
                    { title: 'Calculator', href: '/admin/calculator' },
                ],
            },
            { title: 'Setting', icon: 'pe-7s-settings', href: '/admin/setting' },
            { title: 'Translations', icon: 'pe-7s-file', href: '/admin/translation' },
            { title: 'Tabs', icon: 'pe-7s-rocket', href: '/admin/tabs' },
            { title: 'Kanban', icon: 'pe-7s-notebook', href: '/admin/kanban' },
            {
                title: 'Pages',
                icon: 'pe-7s-browser',
                child: [
                    { title: 'Register Boxed', href: '/admin/register' },
                    { title: 'Forgot Password Boxed', href: '/admin/forgot-password' },
                    { title: 'Not Found Boxed', href: '/admin/notfound' },
                    { title: 'Reset Password Boxed', href: '/admin/notfound' },
                ],
            },
            { header: true, title: 'Vtuber Data' },
            { title: 'Talent', icon: 'pe-7s-user-female', href: '/admin/talent' },
            { title: 'Agency', icon: 'pe-7s-home', href: '/admin/agency' },
            { title: 'Discography', icon: 'pe-7s-musiclist', href: '/admin/discography' },
            { title: 'Album', icon: 'pe-7s-album', href: '/admin/album' },
            { title: 'Event', icon: 'pe-7s-date', href: '/admin/event' },
            { title: 'Gallery', icon: 'pe-7s-photo-gallery', href: '/admin/gallery' },
            { header: true, title: 'DataSet' },
            { title: 'Dataset', icon: 'pe-7s-server', href: '/admin/dataset' },
            { title: 'Chatgroup', icon: 'pe-7s-chat', href: '/admin/Chatgroup' },
            { header: true, title: 'Other Components' },
            {
                title: 'Elements',
                icon: 'pe-7s-diamond',
                child: [
                    { title: 'Icons', href: '/admin/elements/icons' },
                    { title: 'Badges', href: '/admin/elements/badges-labels' },
                    { title: 'Cards', href: '/admin/elements/cards' },
                    { title: 'List Groups', href: '/admin/elements/list-group' },
                    { title: 'Timeline', href: '/admin/elements/timelines' },
                    { title: 'Utilities', href: '/admin/elements/utilities' },
                    { title: 'Progress Bar', href: '/admin/elements/progress-bar' },
                ],
            },
            {
                title: 'Tables',
                icon: 'pe-7s-display2',
                child: [
                    { title: 'Regular Tables', href: '/admin/tables/regular-tables' },
                    { title: 'Advance Tables', href: '/admin/tables/advance-tables' },
                ],
            },
            { title: 'Chart Boxes', icon: 'pe-7s-graph2', href: '/admin/widgets/chart-boxes-3' },
            {
                title: 'Elements',
                icon: 'pe-7s-light',
                child: [
                    { title: 'Controls', href: '/admin/forms/controls' },
                    { title: 'Layouts', href: '/admin/forms/layouts' },
                ],
            },
        ]);

        const toggleBodyClass = (className) => {
            const el = document.body;
            isOpen.value = !isOpen.value;
            if (isOpen.value) {
                el.classList.add(className);
            } else {
                el.classList.remove(className);
            }
        };

        const toggleSidebarHover = (action, className) => {
            const el = document.body;
            sidebarActive.value = !sidebarActive.value;
            windowWidth.value = document.documentElement.clientWidth;

            if (windowWidth.value > 992) {
                if (action === 'add') {
                    el.classList.add(className);
                } else {
                    el.classList.remove(className);
                }
            }
        };

        const getWindowWidth = () => {
            const el = document.body;
            windowWidth.value = document.documentElement.clientWidth;

            if (windowWidth.value < 1350) {
                el.classList.add('closed-sidebar', 'closed-sidebar-md');
            } else {
                el.classList.remove('closed-sidebar', 'closed-sidebar-md');
            }
        };

        onMounted(() => {
            window.addEventListener('resize', getWindowWidth);
            getWindowWidth();
        });

        onBeforeUnmount(() => {
            window.removeEventListener('resize', getWindowWidth);
        });

        return {
            isOpen,
            sidebarActive,
            windowWidth,
            menu,
            toggleBodyClass,
            toggleSidebarHover,
            getWindowWidth,
        };
    },
});
</script>