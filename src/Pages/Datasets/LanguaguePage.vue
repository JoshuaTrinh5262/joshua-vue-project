<template>
    <div>
        <page-title-component :heading=heading :subheading=subheading :icon=icon></page-title-component>
        <table-component
            :footer=true
            :fields="fields"
            :items="items"></table-component>
    </div>
</template>
<script>
import TableComponent from '../../Layout/Components/TableComponent.vue';
import PageTitleComponent from "../../Layout/Components/PageTitleComponent.vue";

export default {
    name: "LanguaguePage",

    components: {
        PageTitleComponent,
        TableComponent
    },

    data() {
        return {
            heading: 'Languague',
            subheading: 'Languague.',
            icon: 'pe-7s-phone icon-gradient bg-premium-dark',
            fields: [
                    {
                        key:'id',
                        value: 'Id'
                    },
                    {
                        key:'source_text',
                        value: 'Source Text'
                    },
                    {
                        key:'target_text',
                        value: 'Target Text'
                    },
                    {
                        key:'created_date',
                        value: 'Created Date'
                    },
                ],
                items: [],
            }
    },
};
</script>
  