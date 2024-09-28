<template>
    <div>
        <page-title-component :heading=heading :subheading=subheading :icon=icon>
            <template v-slot:actions>
                <button type="button" @click=toggleModal class="btn btn-primary mr-2">
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
            @closeModal="toggleModal">
            <template #body>
                <div class="position-relative form-group">
                    <label for="source_text">Source Text</label>
                    <input name="source_text" id="source_text" placeholder="Source Text"
                        v-model="currentDataset.source_text" type="text" class="form-control">
                </div>
                <div class="position-relative form-group">
                    <label for="target_text">Target Text</label>
                    <input name="target_text" id="target_text" placeholder="Source Text"
                        v-model="currentDataset.target_text" type="text" class="form-control">
                </div>
                <div class="position-relative form-group">
                    <label for="source">Source</label>
                    <input name="source" id="source" placeholder="source" v-model="currentDataset.source" type="text"
                        class="form-control">
                </div>
                <div class="position-relative form-group">
                    <label for="category">Category</label>
                    <input name="category" id="category" placeholder="category" v-model="currentDataset.category"
                        type="text" class="form-control">
                </div>
            </template>
            <template #footer>
                <button type="text" class="btn btn-primary" @click="toggleModal">Cancel</button>
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
                        <label for="file_name" class="">File Name</label>
                        <input name="file_name" id="file_name" v-model="fileName" placeholder="File Name" type="text"
                            class="form-control">
                    </div>
                    <div class="form-group">
                        <label for="source_text_max_length" class="">Source Text Max Length</label>
                        <input name="source_text_max_length" id="source_text_max_length" v-model="sourceTextMaxLength"
                            type="number" placeholder="Source Text Max Length" class="form-control">
                    </div>
                    <div class="form-group">
                        <label for="target_text_max_length" class="">Target Text Max Length</label>
                        <input name="target_text_max_length" id="target_text_max_length" v-model="targetTextMaxLength"
                            type="number" placeholder="Target Text Max Length" class="form-control">
                    </div>
                </div>
                <div class="position-relative form-group">
                    <button class="btn btn-primary" @click="toggleModal">Cancel</button>
                    <button class="btn btn-primary" @click="handleExport">Export</button>
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
import { ref, reactive, onMounted, defineComponent } from 'vue';
import TableComponent from '../../Layout/Components/TableComponent.vue';
import PageTitleComponent from '../../Layout/Components/PageTitleComponent.vue';
import PaginationComponent from '../../Layout/Components/PaginationComponent.vue';
import NotificationComponent from '../../Layout/Components/NotificationComponent.vue';
import ModalComponent from '../../DemoPages/Components/ModalComponent.vue';
import ButtonSpinner from "../../Layout/Components/ButtonSpinner.vue";
import { apiService } from '../../supabase/apiService';

export default defineComponent({
    name: "DatasetPage",
    components: {
        PageTitleComponent,
        PaginationComponent,
        TableComponent,
        NotificationComponent,
        ModalComponent,
        ButtonSpinner
    },
    setup() {
        const heading = ref('Chatbot Dataset');
        const subheading = ref('Chatbot Dataset Page for admin.');
        const icon = ref('pe-7s-server icon-gradient bg-premium-dark');

        const onSubmit = ref(false);
        const currentPage = ref(1);
        const itemsPerPage = ref(100);
        const totalItems = ref(0);
        const totalPages = ref(0);
        const orderBy = ref('id');
        const orderDirection = ref('asc');
        const fileName = ref(null);
        const sourceTextMaxLength = ref(0);
        const targetTextMaxLength = ref(0);
        const search = ref('');
        const selectedFile = ref(null);
        const showCreateModal = ref(false);
        const showImport = ref(false);
        const showExport = ref(false);
        const isUpdateMode = ref(false);

        const currentDataset = reactive({
            source_text: null,
            target_text: null,
            source: null,
            category: null,
            language: 'en',
        });

        const fields = [
            { key: 'id', value: 'Id' },
            { key: 'source_text', value: 'Source Text' },
            { key: 'target_text', value: 'Target Text' },
            { key: 'source', value: 'Source' },
            { key: 'category', value: 'Category' }
        ];

        const items = ref([]);
        const notification = ref(null);

        const getDatasetData = async (newPage, newPageSize) => {
            const result = await apiService.getDatasets(newPage, newPageSize, orderBy.value, orderDirection.value, search.value);
            if (!result.error) {
                items.value = result.items;
                totalItems.value = result.totalItems;
                totalPages.value = result.totalPages;
                itemsPerPage.value = newPageSize;
            }
        };

        const onSearchChange = (searchTerm) => {
            search.value = searchTerm;
            getDatasetData(1, itemsPerPage.value);
        };

        const handleSubmit = () => {
            if (currentDataset.source_text && currentDataset.target_text) {
                if (isUpdateMode.value) {
                    updateDataset();
                } else {
                    createDataset();
                }
            } else {
                notification.value = {
                    title: 'Error',
                    content: 'Please enter data before submitting.',
                    type: 'danger'
                };
            }
        };

        const createDataset = async () => {
            try {
                await apiService.createDataset(currentDataset);
                cleanCurrentDataset();
                toggleModal();
                notification.value = {
                    title: 'Success',
                    content: 'Dataset created successfully!',
                    type: 'success'
                };
                getDatasetData(currentPage.value, itemsPerPage.value);
                isUpdateMode.value = false;
            } catch (error) {
                notification.value = {
                    title: 'Error',
                    content: `Error when submitting dataset: ${error}`,
                    type: 'danger'
                };
                isUpdateMode.value = false;
            }
        };

        const updateDataset = async () => {
            try {
                await apiService.updateDataset(currentDataset);
                cleanCurrentDataset();
                toggleModal();
                notification.value = {
                    title: 'Success',
                    content: 'Dataset updated successfully!',
                    type: 'success'
                };
                getDatasetData(currentPage.value, itemsPerPage.value);
                isUpdateMode.value = false;
            } catch (error) {
                notification.value = {
                    title: 'Error',
                    content: `Error when updating dataset: ${error}`,
                    type: 'danger'
                };
                isUpdateMode.value = false;
            }
        };

        const handleDeleteDataset = async (id) => {
            if (confirm(`Are you sure you want to delete dataset ${id}?`)) {
                try {
                    await apiService.deleteDataset(id);
                    notification.value = {
                        title: 'Success',
                        content: 'Dataset deleted successfully!',
                        type: 'success'
                    };
                    getDatasetData(1, itemsPerPage.value);
                } catch (error) {
                    notification.value = {
                        title: 'Error',
                        content: `Error when deleting dataset: ${error}`,
                        type: 'danger'
                    };
                }
            }
        };

        const handleChangeOrder = ({ orderDirection: newOrderDirection, orderBy: newOrderBy }) => {
            orderDirection.value = newOrderDirection;
            orderBy.value = newOrderBy;
            getDatasetData(currentPage.value, itemsPerPage.value);
        };

        const handleUpdateRow = (updateId) => {
            isUpdateMode.value = true;
            const selectedItem = items.value.find(x => x.id === updateId);

            if (selectedItem) {
                Object.assign(currentDataset, selectedItem);
            }

            showCreateModal.value = true;
        };

        const toggleModal = () => {
            isUpdateMode.value = false;
            cleanCurrentDataset();
            showCreateModal.value = !showCreateModal.value;
            showImport.value = false;
            showExport.value = false;
        };

        const toggleImport = () => {
            showImport.value = !showImport.value;
            showExport.value = false;
        };

        const toggleExport = () => {
            showImport.value = false;
            showExport.value = !showExport.value;
        };

        const loadPage = (page) => {
            currentPage.value = page;
            getDatasetData(currentPage.value, itemsPerPage.value);
        };

        const changePageSize = (newPageSize) => {
            itemsPerPage.value = newPageSize;
            getDatasetData(1, itemsPerPage.value);
        };

        const cleanCurrentDataset = () => {
            Object.assign(currentDataset, {
                source_text: null,
                target_text: null,
                source: null,
                category: null,
                language: 'en',
            });
        };

        onMounted(() => {
            getDatasetData(currentPage.value, itemsPerPage.value);
        });

        return {
            onSubmit,
            currentPage,
            itemsPerPage,
            totalItems,
            totalPages,
            orderBy,
            orderDirection,
            fileName,
            sourceTextMaxLength,
            targetTextMaxLength,
            search,
            selectedFile,
            showCreateModal,
            showImport,
            showExport,
            isUpdateMode,
            currentDataset,
            fields,
            items,
            heading,
            subheading,
            icon,
            notification,
            getDatasetData,
            onSearchChange,
            handleSubmit,
            createDataset,
            updateDataset,
            handleDeleteDataset,
            handleChangeOrder,
            handleUpdateRow,
            toggleModal,
            toggleImport,
            toggleExport,
            loadPage,
            changePageSize,
            cleanCurrentDataset
        };
    }
});
</script>
