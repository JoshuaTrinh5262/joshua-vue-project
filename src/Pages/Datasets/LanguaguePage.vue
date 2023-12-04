<template>
    <div>
        <page-title-component :heading=heading :subheading=subheading :icon=icon></page-title-component>
        <table-component></table-component>
    </div>
</template>
<script>
import TableComponent from '../../Layout/Components/TableComponent.vue';
import PageTitleComponent from "../../Layout/Components/PageTitleComponent.vue";

export default {
    name: "Languague Page",

    components: {
        PageTitleComponent,
        TableComponent
    },

    data: () => ({
      heading: 'Languague',
      subheading: 'Languague.',
      icon: 'pe-7s-phone icon-gradient bg-premium-dark',
    }),
};
</script>
  