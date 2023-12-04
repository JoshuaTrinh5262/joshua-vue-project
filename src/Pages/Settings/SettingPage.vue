<template>
    <div>
        <page-title-component :heading=heading :subheading=subheading :icon=icon></page-title-component>
    </div>
</template>
<script>
import PageTitleComponent from "../../Layout/Components/PageTitleComponent.vue";

export default {
    name: "SettingComponent",

    components: {
        PageTitleComponent
    },

    data: () => ({
      heading: 'Settings',
      subheading: 'Settings.',
      icon: 'pe-7s-phone icon-gradient bg-premium-dark',
    }),
};
</script>
  