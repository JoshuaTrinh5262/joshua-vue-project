<template>
    <div>
        <page-title :heading=heading :subheading=subheading :icon=icon></page-title>
    </div>
</template>
<script>
import PageTitle from "../../Layout/Components/PageTitle.vue";

export default {
    name: "SettingComponent",

    components: {
        PageTitle
    },

    data: () => ({
      heading: 'Settings',
      subheading: 'Settings.',
      icon: 'pe-7s-phone icon-gradient bg-premium-dark',
    }),
};
</script>
  