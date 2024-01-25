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
        <notification-component :notification.sync="notification"></notification-component>
        <div class="main-card mb-3 card" v-if="showCreate">
            <div class="card-header">
                <h5 class="card-title">Add New Data</h5>
            </div>
            <div class="card-body">
                <form @submit.prevent="handleCreate">
                    <div class="position-relative form-group">
                        <div class="form-inline">
                            <input name="source" v-model="sourceText" required id="source_text" placeholder="Source Text" type="text" class="form-control">
                            <input name="target" v-model="targetText" required id="target_text" placeholder="Target Text" type="text" class="form-control">
                        </div>
                    </div>
                    <div class="position-relative form-group">
                        <button type="submit" class="btn-primary btn">Submit</button>
                    </div>
                </form>
            </div>
        </div>
        <div class="main-card mb-3 card" v-if="showImport">
            <div class="card-header">
                <h5 class="card-title">Import Data</h5>
            </div>
            <div class="card-body">
                <div class="position-relative form-group">
                    <label for="fileInput" class="">File</label>
                    <input name="file" id="fileInput" type="file" @change="handleFileChange" class="form-control-file">
                </div>
                <div class="position-relative form-group">
                    <button class="btn-success btn"  @click="handleImport">Import</button>
                </div>
            </div>
        </div>
        <div class="main-card mb-3 card" v-if="showExport">
            <div class="card-header">
                <h5 class="card-title">Export Data</h5>
            </div>
            <div class="card-body">
                <div class="position-relative form-group">
                    <div class="form-group">
                        <label for="file_name" class="">File Name</label>
                        <input name="file_name" v-model="file_name" id="file_name" placeholder="file name" type="text" class="form-control">
                    </div>
                </div>
                <div class="position-relative form-group">
                    <button class="btn-primary btn"  @click="handleExport">Export</button>
                </div>
            </div>
        </div>
        <div class="input-group">
            <input placeholder="Searching..." @input="onSearchChange" v-model="search" type="text" class="form-control">
            <div class="input-group-append">
                <button class="btn btn-primary">Search</button>
            </div>
        </div>
        <br>
        <table-component 
            :footer=true
            :fields="fields"
            :items="items"
            @changeOrder="handleChangeOrder"
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
        <base-dialog-component :active.sync="show">
            <h1>Test Big Black Xoc</h1>
            <button type="button" class="btn btn-primary">Save</button>
            <button type="button" class="btn btn-warning" @click="toggleDialog()">Close</button>
        </base-dialog-component>
        <button type="button" @click="toggleDialog()">Toggle</button>
    </div>

</template>
<script>
import axios from 'axios';
import TableComponent from '../../Layout/Components/TableComponent.vue';
import PageTitleComponent from '../../Layout/Components/PageTitleComponent.vue';
import PaginationComponent from '../../Layout/Components/PaginationComponent.vue';
import BaseDialogComponent from '../../Layout/Components/BaseDialogComponent.vue';
import NotificationComponent from '../../Layout/Components/NotificationComponent.vue';

export default {
    name: "DatasetPage",

    components: {
        PageTitleComponent,
        PaginationComponent,
        TableComponent,
        BaseDialogComponent,
        NotificationComponent
    },

    data() {
        return {
            show: false,
            currentPage: 1,
            itemsPerPage: 20,
            totalItems: 0,
            totalPages: 0,
            orderBy: '',
            orderDirection: '',
            sourceText: '',
            targetText: '',
            search: '',
            selectedFile: null,
            showCreate: false,
            showImport: false,
            showExport: false,
            fields: [
                {
                    key:'id',
                    value:'Id'
                },
                {
                    key:'source_text',
                    value:'Source Text'
                },
                {
                    key:'target_text',
                    value:'Target Text'
                },
                {
                    key:'intense',
                    value:'Intense'
                },
            ],
            items: [],
            heading: 'Chatbot Dataset',
            subheading: 'Chatbot Dataset',
            icon: 'pe-7s-phone icon-gradient bg-premium-dark',
            notification: null
        }
    },

    created() {
        this.getDatasetData(this.currentPage, this.itemsPerPage);
    },

    methods: {
        toggleDialog() {
            console.log(this.show);
            return this.show = !this.show;
        },

        getDatasetData(newPage, newPageSize) {
            axios.get('http://127.0.0.1:5000/api/conversations', {
                params: {
                    page: newPage,
                    pagesize: newPageSize,
                    search: this.search,
                    orderby: this.orderBy,
                    orderdirection: this.orderDirection,
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

        onSearchChange() {
            this.getDatasetData(1, this.itemsPerPage);
        },

        handleCreate() {
            const postData = [{
                source_text: this.sourceText,
                target_text: this.targetText,
                language: 'en',
            }];
            
            if(this.sourceText && this.targetText) {
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

                this.sourceText = '';
                this.targetText = '';
            } else {
                this.notification = {
                        title: 'Error',
                        content: 'Please enter data before submitting.',
                        type: 'error'
                    };
            }
        },
        handleFileChange(event) {
            this.selectedFile = event.target.files[0];
        },

        handleImport() {
            const formData = new FormData();
            formData.append('file', this.selectedFile);

            axios.post('http://127.0.0.1:5000/api/import', formData, {
                headers: {
                'Content-Type': 'multipart/form-data',
                },
            })
            .then(response => {
                this.selectedFile = null;
                this.notification = {
                        title: 'Success',
                        content: response.data.message,
                        type: 'success'
                    };
            })
            .catch(error => {
                console.error(error);
            });
        },

        handleExport() {
            axios({
                method: 'get',
                url: 'http://127.0.0.1:5000/api/export',
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
                .then(response => {
                    this.getDatasetData(this.currentPage, this.itemsPerPage);
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
            }
        },

        handleChangeOrder({ orderDirection, orderBy }) {
            this.orderDirection = orderDirection;
            this.orderBy = orderBy;

            this.getDatasetData(this.currentPage, this.itemsPerPage);
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
  