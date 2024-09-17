<template>
    <div>
        <page-title-component :heading=heading :subheading=subheading :icon=icon>
            <template v-slot:actions>
                <button type="button" @click=toggleCreateModal class="btn btn-primary mr-2">
                    Create New
                </button>
                <button @click=toggleImport type="button" class="btn btn-info mr-2">
                    Import
                </button>
                <button @click=toggleExport type="button" class=" btn btn-info mr-2">
                    Export
                </button>
            </template>
        </page-title-component>
        <notification-component v-model:notification="notification"></notification-component>
        <modal-component :title="isUpdateMode ? 'Update Dataset' : 'Add New Dataset'" :isOpen="showCreateModal"
            @closeModal="toggleCreateModal">
            <template #body>
                <div class="position-relative form-group">
                    <label for="source_text">Source Text</label>
                    <input name="source_text" placeholder="Source Text" v-model="currentDataset.source_text" type="text"
                        class="form-control">
                </div>
                <div class="position-relative form-group">
                    <label for="target_text">Target Text</label>
                    <input name="target_text" placeholder="Source Text" v-model="currentDataset.target_text" type="text"
                        class="form-control">
                </div>
                <div class="position-relative form-group">
                    <label for="category">Category</label>
                    <input name="category" placeholder="category" v-model="currentDataset.category" type="text"
                        class="form-control">
                </div>
            </template>
            <template #footer>
                <button type="text" class="btn-primary btn" @click="toggleCreateModal">Cancel</button>
                <button-spinner :isLoading="onSubmit" buttonClass="btn btn-primary" @click="handleSubmit"
                    :normalText="isUpdateMode ? 'Update Dataset' : 'Add New Dataset'" />
            </template>
        </modal-component>
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
                    <button class="btn-success btn" @click="handleImport">Import</button>
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
                        <label for="fileName" class="">File Name</label>
                        <input name="fileName" v-model="fileName" id="fileName" placeholder="File Name" type="text"
                            class="form-control">
                    </div>
                    <div class="form-group">
                        <label for="source_text_max_length" class="">Source Text Max Length</label>
                        <input name="source_text_max_length" v-model="sourceTextMaxLength" type="number"
                            placeholder="Source Text Max Length" class="form-control">
                    </div>
                    <div class="form-group">
                        <label for="target_text_max_length" class="">Target Text Max Length</label>
                        <input name="target_text_max_length" v-model="targetTextMaxLength" type="number"
                            placeholder="Target Text Max Length" class="form-control">
                    </div>
                </div>
                <div class="position-relative form-group">
                    <button class="btn-primary btn" @click="toggleCreateModal">Cancel</button>
                    <button class="btn-primary btn" @click="handleExport">Export</button>
                </div>
            </div>
        </div>
        <table-component :footer=true :fields="fields" :items="items" custom-class="datase-table"
            @search="onSearchChange" @changeOrder="handleChangeOrder" @deleteRow="handleDeleteDataset"
            @updateRow="handleUpdateRow">
        </table-component>
        <pagination-component :currentPage="currentPage" :perPage="itemsPerPage" :totalItems="totalItems"
            :totalPages="totalPages" @load-page="loadPage" @change-page-size="changePageSize" />
    </div>
</template>
<script>
import axios from 'axios';
import TableComponent from '../../Layout/Components/TableComponent.vue';
import PageTitleComponent from '../../Layout/Components/PageTitleComponent.vue';
import PaginationComponent from '../../Layout/Components/PaginationComponent.vue';
import NotificationComponent from '../../Layout/Components/NotificationComponent.vue';
import ModalComponent from '../../DemoPages/Components/ModalComponent.vue';
import ButtonSpinner from "../../Layout/Components/ButtonSpinner.vue";
import { apiService } from '../../supabase/apiService';

export default {
    name: "DatasetPage",

    components: {
        PageTitleComponent,
        PaginationComponent,
        TableComponent,
        NotificationComponent,
        ModalComponent,
        ButtonSpinner
    },

    data() {
        return {
            onSubmit: false,
            currentPage: 1,
            itemsPerPage: 100,
            totalItems: 0,
            totalPages: 0,
            orderBy: 'id',
            orderDirection: 'asc',
            fileName: '',
            sourceTextMaxLength: 0,
            targetTextMaxLength: 0,
            search: '',
            selectedFile: null,
            showCreateModal: false,
            showImport: false,
            showExport: false,
            isUpdateMode: false,
            currentDataset: {
                source_text: null,
                target_text: null,
                category: null,
                language: 'en',
            },
            fields: [
                {
                    key: 'id',
                    value: 'Id'
                },
                {
                    key: 'source_text',
                    value: 'Source Text'
                },
                {
                    key: 'target_text',
                    value: 'Target Text'
                },
                {
                    key: 'category',
                    value: 'category'
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
        async getDatasetData(newPage, newPageSize) {
            const result = await apiService.getDatasets(newPage, newPageSize, this.orderBy, this.orderDirection, this.search);
            if (!result.error) {
                this.items = result.items;
                this.totalItems = result.totalItems;
                this.totalPages = result.totalPages;
                this.itemsPerPage = newPageSize;
            } else {
                console.error('Error:', result.error);
            }
        },

        onSearchChange(searchTerm) {
            this.search = searchTerm;
            this.getDatasetData(1, this.itemsPerPage);
        },

        handleSubmit() {
            if (this.currentDataset.source_text && this.currentDataset.target_text) {
                if (this.isUpdateMode) {
                    this.updateDataset();
                } else {
                    this.createDataset();
                }
            } else {
                this.notification = {
                    title: 'Error',
                    content: 'Please enter data before submitting.',
                    type: 'danger'
                };
            }
        },

        handleFileChange(event) {
            this.selectedFile = event.target.files[0];
        },

        async createDataset() {
            apiService.createDataset(this.currentDataset)
                .then(() => {
                    this.cleanCurrentDataset();
                    this.toggleCreateModal();
                    this.notification = {
                        title: 'Success',
                        content: 'Dataset created successfully!',
                        type: 'success'
                    };
                    this.getDatasetData(this.currentPage, this.itemsPerPage);
                    this.isUpdateMode = false;
                })
                .catch(error => {
                    this.notification = {
                        title: 'Error',
                        content: `Error when submitting dataset: ${error}`,
                        type: 'danger'
                    };
                    this.isUpdateMode = false;
                });
        },

        async updateDataset() {
            apiService.updateDataset(this.currentDataset)
                .then(() => {
                    this.cleanCurrentDataset();
                    this.toggleCreateModal();
                    this.notification = {
                        title: 'Success',
                        content: 'Dataset updated successfully!',
                        type: 'success'
                    };
                    this.getDatasetData(this.currentPage, this.itemsPerPage);
                    this.isUpdateMode = false;
                })
                .catch(error => {
                    this.notification = {
                        title: 'Error',
                        content: `Error when updating dataset: ${error}`,
                        type: 'danger'
                    };
                    this.isUpdateMode = false;
                });
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
            axios.get('http://127.0.0.1:5000/api/export', {
                params: {
                    targetTextMaxLength: this.targetTextMaxLength,
                    sourceTextMaxLength: this.sourceTextMaxLength
                },
                responseType: 'blob'
            })
                .then(response => {
                    const blob = new Blob([response.data], { type: response.headers['content-type'] });

                    const link = document.createElement('a');
                    link.href = window.URL.createObjectURL(blob);

                    link.download = this.fileName ? this.fileName + '.csv' : 'chatbot_dataset.csv';
                    link.click();
                })
                .catch(error => {
                    console.error(error);
                });
        },

        async handleDeleteDataset(id) {
            const confirmDelete = confirm(`Are you sure you want to delete dataset ${id}?`);
            if (confirmDelete) {
                await apiService.deleteDataset(id).then(async () => {
                    this.notification = {
                        title: 'Success',
                        content: 'Dataset deleted successfully!',
                        type: 'success'
                    };
                    await this.getDatasetData(1, this.itemsPerPage);
                })
                    .catch(error => {
                        this.notification = {
                            title: 'Error',
                            content: `Error when deleting dataset: ${error}`,
                            type: 'danger'
                        };
                    });
            }
        },

        handleChangeOrder({ orderDirection, orderBy }) {
            this.orderDirection = orderDirection;
            this.orderBy = orderBy;
            this.getDatasetData(this.currentPage, this.itemsPerPage);
        },

        handleUpdateRow(updateId) {
            this.isUpdateMode = true;
            const selectedItem = this.items.find(x => x.id === updateId);
            this.currentDataset = JSON.parse(JSON.stringify(selectedItem));
            this.showCreateModal = true;
        },

        toggleCreateModal() {
            this.isUpdateMode = false;
            this.showImport = false;
            this.showExport = false;
            this.showCreateModal = !this.showCreateModal;
        },

        toggleImport() {
            this.showImport = !this.showImport;
            this.showExport = false;
            this.showCreate = false;
        },

        toggleExport() {
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

        cleanCurrentDataset() {
            this.currentDataset = {
                source_text: null,
                target_text: null,
                category: null,
                language: 'en',
            };
        }
    }
};
</script>