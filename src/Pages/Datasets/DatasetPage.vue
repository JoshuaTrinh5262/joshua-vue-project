<template>
    <div>
        <page-title-component
            :heading=heading
            :subheading=subheading
            :icon=icon
            @click-create-btn="toggleCreate"
            @click-import-btn="toggleImport"
            @click-export-btn="toggleExport"
            :showImport=true
            :showExport=true
            ></page-title-component>
            <notification-component :notification="notification"></notification-component>
            <div class="main-card mb-3 card" v-if="showCreate">
                <div class="card-header">
                    <h5 class="card-title">Add New Data</h5>
                </div>
                <div class="card-body">
                    <div class="position-relative form-group">
                        <div class="form-inline">
                            <input name="source" v-model="source_text" id="source_text" placeholder="Source Text" type="text" class="form-control">
                            <input name="target" v-model="target_text" id="target_text" placeholder="Target Text" type="text" class="form-control">
                        </div>
                    </div>
                    <div class="position-relative form-group">
                        <button class="btn-primary btn"  @click="handleCreate">Submit</button>
                    </div>
                </div>
            </div>
            <div class="main-card mb-3 card" v-if="showImport">
                <div class="card-header">
                    <h5 class="card-title">Import</h5>
                </div>
                <div class="card-body">
                    <div class="position-relative form-group">
                        <label for="exampleFile" class="">File</label>
                        <input name="file" id="exampleFile" type="file" class="form-control-file">
                    </div>
                    <div class="position-relative form-group">
                        <button class="btn-primary btn"  @click="handleImport">Import</button>
                    </div>
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
import TableComponent from '../../Layout/Components/TableComponent.vue';
import PageTitleComponent from "../../Layout/Components/PageTitleComponent.vue";
import PaginationComponent from "../../Layout/Components/PaginationComponent.vue";
import NotificationComponent from '../../Layout/Components/NotificationComponent.vue';
import axios from 'axios';

export default {
    name: "DatasetPage",

    components: {
        PageTitleComponent,
        PaginationComponent,
        TableComponent,
        NotificationComponent
    },

    data: () => ({
        currentPage: 1,
        itemsPerPage: 20,
        totalItems: 0,
        totalPages: 0,
        source_text: '',
        target_text: '',
        showCreate: false,
        showImport: false,
        showExport: false,
        fields: [
            {
                key:'Id',
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
        heading: 'Chatbot Dataset',
        subheading: 'Chatbot Dataset',
        icon: 'pe-7s-phone icon-gradient bg-premium-dark',
        notification: {}
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
                .then((response) => {
                    this.getDatasetData(this.currentPage, this.itemsPerPage);
                    this.source_text = '';
                    this.target_text = '';
                    this.notification = {
                        title: 'Success',
                        content: response.data.message,
                        type: 'success'
                    };
                })
                .catch(error => {
                    this.notification = {
                        title: 'Error',
                        content: error,
                        type: 'error'
                    };
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

        handleImport() {
            
        },

        handleExport() {
            axios({
                method: 'get',
                url: 'http://127.0.0.1:5000/api/export/csv',
                responseType: 'blob',
            })
            .then(response => {
                const blob = new Blob([response.data], { type: response.headers['content-type'] });

                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);

                link.download = 'conversations.csv';
                link.click();
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

        toggleCreate(){
            this.showImport = false;
            this.showExport = false;
            this.showCreate = !this.showCreate;
        },

        toggleImport(){
            this.showImport = !this.showImport;
            this.showExport = false;
            this.showCreate = false;
        },

        toggleExport(){
            this.showImport = false;
            this.showExport = !this.showExport;
            this.showCreate = false;
        },

        loadPage(page) {
            this.currentPage = page;
            this.getDatasetData(this.currentPage, this.itemsPerPage);
        },

        changePageSize(newPageSize) {
            this.itemsPerPage = newPageSize;
            this.getDatasetData(1, this.itemsPerPage);
        },
    }
};
</script>
  