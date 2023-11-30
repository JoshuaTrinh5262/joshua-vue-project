<template>
    <div>
        <page-title :heading=heading :subheading=subheading :icon=icon></page-title>
        <table-component 
            :footer=true
            :fields="fields"
            :items="items">
        </table-component>
    </div>
</template>
<script>
import TableComponent from '../../DemoPages/Tables/TableComponent.vue';
import PageTitle from "../../Layout/Components/PageTitle.vue";
import axios from 'axios';

export default {
    name: "DatasetPageComponent",

    components: {
        PageTitle,
        TableComponent
    },

    data: () => ({
        fields: ['Source Text', 'Target Text'],
        items: [],
        heading: 'Chatbot Dataset',
        subheading: 'Chatbot Dataset',
        icon: 'pe-7s-phone icon-gradient bg-premium-dark',
    }),

    created() {
        this.getDatasetData();
    },
    methods: {
        getDatasetData() {
            axios.get('http://127.0.0.1:8080/api/conversations')
            .then(response => {
            this.items = response.data;
                console.log(response);
            })
            .catch(error => {
                console.error(error);
            });
        }
    }
};
</script>
  