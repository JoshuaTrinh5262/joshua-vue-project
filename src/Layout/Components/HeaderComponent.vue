<template>
    <div class="app-header header-shadow">
        <div class="app-header__content">
            <div class="app-header-left">
                <SearchBox />
            </div>
            <div class="app-header-right">
                <UserArea />
            </div>
        </div>
        <div class="app-header__mobile-menu">
            <div>
                <button type="button" class="hamburger close-sidebar-btn hamburger--elastic"
                    :class="{ 'is-active': isOpen }" @click="toggleMobile('closed-sidebar-open')">
                    <span class="hamburger-box">
                        <span class="hamburger-inner"></span>
                    </span>
                </button>
            </div>
        </div>
        <div class="app-header__menu">
            <span>
                <button class="btn btn-primary btn-sm btn-icon btn-icon-only" :class="{ 'active': isOpenMobileMenu }"
                    @click="toggleMobile2('header-menu-open')">
                    <div class="btn-icon-wrapper">
                        <i class="pe-7s-more"></i>
                    </div>
                </button>
            </span>
        </div>
    </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import SearchBox from "./Header/SearchBox";
import UserArea from "./Header/HeaderUserArea";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faEllipsisV);

export default defineComponent({
    name: "HeaderComponent",
    components: {
        SearchBox,
        UserArea,
        FontAwesomeIcon,
    },

    setup() {
        const isOpen = ref(false);
        const isOpenMobileMenu = ref(false);

        const toggleMobile = (className) => {
            const el = document.body;
            isOpen.value = !isOpen.value;

            if (isOpen.value) {
                el.classList.add(className);
            } else {
                el.classList.remove(className);
            }
        };

        const toggleMobile2 = (className) => {
            const el = document.body;
            isOpenMobileMenu.value = !isOpenMobileMenu.value;

            if (isOpenMobileMenu.value) {
                el.classList.add(className);
            } else {
                el.classList.remove(className);
            }
        };

        return {
            isOpen,
            isOpenMobileMenu,
            toggleMobile,
            toggleMobile2,
        };
    },
});
</script>