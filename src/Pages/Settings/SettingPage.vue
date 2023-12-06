<template>
    <div>
        <page-title-component :heading=heading :subheading=subheading :icon=icon></page-title-component>
        <div>
            <button :style="{ backgroundColor: dynamicColor }" @click="changeColor">
            My Custom Button
            </button>
        </div>
    </div>
</template>
<script>
import PageTitleComponent from "../../Layout/Components/PageTitleComponent.vue";

export default {
    name: "SettingComponent",

    components: {
        PageTitleComponent
    },

    data() {
        return {
            heading: 'Settings',
            subheading: 'Settings.',
            icon: 'pe-7s-phone icon-gradient bg-premium-dark',
            dynamicColor: '#00ff00', // Default color from your SCSS
        }
    },

    methods: {
        changeColor() {
            this.dynamicColor = '#ff0000';
        },
    },
};
</script>