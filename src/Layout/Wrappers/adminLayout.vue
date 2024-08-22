<template>
    <div class="app-container app-theme-dark">
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
                <FooterComponent/>
            </transition>
        </div>
    </div>
</template>

<script>
    import HeaderComponent from "../Components/HeaderComponent";
    import SidebarComponent from "../Components/SidebarComponent";

    export default {
        name: 'app',
        components: {
            HeaderComponent,
            SidebarComponent,
        },
        methods: {
        },
    }
</script>
