<template>
    <div>
        <page-title
            :heading=heading
            :subheading=subheading
            :icon=icon
            :clickCreateBtn="toggleCreateData"
            :showImport=true
            :showExport=true
            ></page-title>
            <div v-if="showCreateData" class="main-card">
                <div class="card-head">
                    <div class="card-title">Create New Chat Data</div>
                </div>
                <div class="card-body">

                </div>
            </div>
        <table-component 
            :footer=true
            :small=true
            :fields="fields"
            :items="items"
            @deleteRow="handleDeleteRow"
            @updateRow="handleUpdateRow">
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
        showCreateData: false,
        fields: ['Id', 'Source Text', 'Target Text'],
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
            axios.get('http://127.0.0.1:5000/api/conversations')
            .then(response => {
            this.items = response.data;
                console.log(response);
            })
            .catch(error => {
                console.error(error);
            });
        },

        handleDeleteRow(id) {
            axios.delete('http://127.0.0.1:5000/api/conversations/' + id)
            .then(response => {
                this.getDatasetData();
                console.log(response);
            })
            .catch(error => {
                console.error(error);
            });
        },

        handleUpdateRow() {
            console.log("update")
        },

        toggleCreateData(){
            console.log(this.showCreateData)
            this.showCreateData = !this.showCreateData;
        }
    }
};
</script>
  