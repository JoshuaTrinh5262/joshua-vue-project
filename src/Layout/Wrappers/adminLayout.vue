<template>
    <div class="app-container" :class="isDark ? 'app-theme-dark' : 'app-theme-white'">
        <transition name="fade" mode="out-in" appear>
            <HeaderComponent />
        </transition>
        <transition name="fade" mode="out-in" appear>
            <SidebarComponent />
        </transition>
        <div class="app-main__outer">
            <div class="app-main__inner">
                <slot></slot>
            </div>
            <transition name="fade" mode="out-in" appear>
                <FooterComponent />
            </transition>
        </div>
    </div>
</template>

<script>
import { defineComponent } from "vue";
import HeaderComponent from "../Components/HeaderComponent";
import SidebarComponent from "../Components/SidebarComponent";
import FooterComponent from "../Components/FooterComponent";
import { useDark } from "@vueuse/core";

export default defineComponent({
    name: "AdminLayout",

    components: {
        HeaderComponent,
        SidebarComponent,
        FooterComponent,
    },

    setup() {
        const isDark = useDark();

        return {
            isDark,
        };
    },
});
</script>
