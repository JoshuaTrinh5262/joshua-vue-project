<template>
    <div>
        <page-title
            :heading=heading
            :subheading=subheading
            :icon=icon
            @click-create-btn="toggleCreateData"
            @click-export-btn="handleExport"
            :showImport=true
            :showExport=true
            ></page-title>
            <div class="main-card mb-3 card" v-if="showCreateData">
                <div class="card-body">
                    <h5 class="card-title">Add New Data</h5>
                    <div class="position-relative form-group">
                        <label for="source_text" class="">Source Text</label>
                        <input name="source_text"
                            v-model="source_text"
                            id="source_text"
                            placeholder="with a placeholder"
                            type="text"
                            class="form-control">
                    </div>
                    <div class="position-relative form-group">
                        <label for="target_text" class="">Target Text</label>
                        <input name="target_text"
                            v-model="target_text"
                            id="target_text"
                            placeholder="with a placeholder"
                            type="text"
                            class="form-control">
                    </div>
                    <button class="btn-primary btn-sm"  @click="handleCreate">Submit</button>
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
        <pagination-component
            :currentPage="currentPage"
            :perPage="itemsPerPage"
            :totalItems="totalItems"
            :totalPages="totalPages"
            @load-page="loadPage"
            @change-page-size="changePageSize"></pagination-component>
    </div>
</template>
<script>
import TableComponent from '../../DemoPages/Tables/TableComponent.vue';
import PageTitle from "../../Layout/Components/PageTitle";
import PaginationComponent from "../../DemoPages/Components/PaginationComponent.vue";
import axios from 'axios';

export default {
    name: "DatasetPageComponent",

    components: {
        PageTitle,
        PaginationComponent,
        TableComponent
    },

    data: () => ({
        currentPage: 1,
        itemsPerPage: 20,
        totalItems: 0,
        totalPages: 0,
        source_text: '',
        target_text: '',
        showCreateData: false,
        fields: ['Id', 'Source Text', 'Target Text', 'Created Date'],
        items: [],
        heading: 'Chatbot Dataset',
        subheading: 'Chatbot Dataset',
        icon: 'pe-7s-phone icon-gradient bg-premium-dark',
    }),

    created() {
        this.getDatasetData(this.currentPage, this.itemsPerPage);
    },
    methods: {
        handleCreate() {
            const postData = {
                source_text: this.source_text,
                target_text: this.target_text,
                language: 'en',
            };
            
            if(this.source_text && this.target_text) {
                axios.post('http://127.0.0.1:5000/api/conversations', postData)
                .then(() => {
                    this.getDatasetData(this.currentPage, this.itemsPerPage);
                    this.source_text = '';
                    this.target_text = '';
                })
                .catch(error => {
                    console.error(error);
                });
            } else {
                alert('Please enter data before submitting.');
            }
        },

        getDatasetData(newPage, newPageSize) {
            axios.get('http://127.0.0.1:5000/api/conversations', {
                params: {
                    page: newPage,
                    pagesize: newPageSize,
                },
            })
            .then(response => {
                this.items = response.data.data;
                this.currentPage = response.data.current_page;
                this.totalPages = response.data.total_pages;
                this.totalItems = response.data.total_items;
            })
            .catch(error => {
                console.error(error);
            });
        },

        handleExport() {
            axios.get('http://127.0.0.1:5000/api/export/csv')
            .then(() => {
            })
            .catch(error => {
                console.error(error);
            });
        },

        handleDeleteRow(id) {
            const isConfirmed = window.confirm('Are you sure you want to delete?');
            if(isConfirmed) {
                axios.delete('http://127.0.0.1:5000/api/conversations/' + id)
                .then(() => {
                    this.getDatasetData(this.currentPage, this.itemsPerPage);
                })
                .catch(error => {
                    console.error(error);
                });
            }
        },

        handleUpdateRow() {
            console.log("update")
        },

        toggleCreateData(){
            console.log(this.showCreateData)
            this.showCreateData = !this.showCreateData;
        },
        loadPage(page) {
            this.currentPage = page;
            this.getDatasetData(this.currentPage, this.itemsPerPage);
        },

        changePageSize(newPageSize) {
            this.itemsPerPage = newPageSize;
            this.getDatasetData(this.currentPage, this.itemsPerPage);
        },
    }
};
</script>
  