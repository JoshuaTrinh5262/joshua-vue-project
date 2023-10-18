<template>
    <div>
        <page-title :heading=heading :subheading=subheading :icon=icon></page-title>
        <table-component></table-component>
    </div>
</template>
<script>
import TableComponent from '../../DemoPages/Tables/TableComponent.vue';
import PageTitle from "../../Layout/Components/PageTitle.vue";

export default {
    name: "LanguagueComponent",

    components: {
        PageTitle,
        TableComponent
    },

    data: () => ({
      heading: 'Languague',
      subheading: 'Languague.',
      icon: 'pe-7s-phone icon-gradient bg-premium-dark',
    }),
};
</script>
  