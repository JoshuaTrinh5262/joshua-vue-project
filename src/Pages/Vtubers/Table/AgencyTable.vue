<template>
    <div class="input-group mb-2">
        <input placeholder="Searching..." @input="onSearch" v-model="search" type="text" class="form-control"
            name="search" />
        <div class="input-group-append">
            <button class="btn btn-primary">
                <i class="pe-7s-search"></i>
            </button>
        </div>
    </div>
    <table class="table table-dark table-sm table-bordered">
        <thead>
            <tr>
                <th><input type="checkbox" class="" name="checkbox" /></th>
                <th v-for="field in fields" :key="field.key" :id="field.key" @click="changeOrder(field.key)">
                    {{ field.value }}
                    <span v-if="orderBy === field.key && orderDirection === 'asc'">&#9660;</span>
                    <span v-else-if="orderBy === field.key && orderDirection === 'desc'">&#9650;</span>
                    <span v-else>&#9670;</span>
                </th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in items" :key="index">
                <td><input type="checkbox" name="checkbox" /></td>
                <td>{{ item.id }}</td>
                <td><a :href="`agency/${item.id}`">{{ item.agency_name }}</a></td>
                <td>{{ item.talent_count }}</td>
                <td>
                    <button type="button" class="btn btn-sm btn-success" @click="updateRow(item.id)">
                        <i class="pe-7s-file"></i>
                    </button>
                    <button type="button" class="btn btn-sm btn-warning" @click="handleDelete(item.id)">
                        <i class="pe-7s-trash"></i>
                    </button>
                </td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <th><input type="checkbox" name="checkbox" /></th>
                <th v-for="field in fields" :key="field.key" :id="field.key" @click="changeOrder(field.key)">
                    {{ field.value }}
                    <span v-if="orderBy === field.key && orderDirection === 'asc'">&#9660;</span>
                    <span v-else-if="orderBy === field.key && orderDirection === 'desc'">&#9650;</span>
                    <span v-else>&#9670;</span>
                </th>
                <th>Action</th>
            </tr>
        </tfoot>
    </table>
    <pagination-component :currentPage="currentPage" :perPage="itemsPerPage" :totalItems="totalItems"
        :totalPages="totalPages" @load-page="loadPage" @change-page-size="changePageSize">
    </pagination-component>
</template>

<script>
import { defineComponent, ref, onMounted, reactive } from 'vue';
import ModalComponent from '../../../Layout/Components/ModalComponent.vue';
import TableComponent from '../../../Layout/Components/TableComponent.vue';
import NotificationComponent from '../../../Layout/Components/NotificationComponent.vue';
import PaginationComponent from '../../../Layout/Components/PaginationComponent.vue';
import ButtonSpinner from "../../../Layout/Components/ButtonSpinner.vue";
import { apiService } from '../../../supabase/apiService';

export default defineComponent({
    name: "AgenctTable",

    components: {
        ModalComponent,
        TableComponent,
        PaginationComponent,
        NotificationComponent,
        ButtonSpinner
    },

    setup() {
        const isUpdateMode = ref(false);
        const showModal = ref(false);
        const onSubmit = ref(false);
        const orderBy = ref('agency_id');
        const orderDirection = ref('asc');
        const currentPage = ref(1);
        const itemsPerPage = ref(20);
        const totalItems = ref(0);
        const totalPages = ref(0);
        const search = ref('');
        const notification = ref(null);
        const currentAgency = reactive({
            agency_name: null,
            agency_status: null,
            agency_description: null
        });

        const fields = [
            {
                key: 'id',
                value: 'Id'
            },
            {
                key: 'agency_name',
                value: 'Agency Name'
            },
            {
                key: 'talent_count',
                value: 'Agency Count'
            },
        ];
        const items = ref([]);

        const toggleModal = () => {
            isUpdateMode.value = false;
            cleanCurrentAgency();
            showModal.value = !showModal.value;
        };

        const getAgenciesData = async (newPage, newPageSize) => {
            const response = await apiService.getAgenciesWithPaging(newPage, newPageSize, orderBy.value, orderDirection.value, search.value);

            if (!response.error) {
                items.value = response.items;
                totalItems.value = response.totalItems;
                totalPages.value = response.totalPages;
                itemsPerPage.value = newPageSize;
            }
        };

        const handleSubmit = async () => {
            onSubmit.value = true;
            if (isUpdateMode.value) {
                updateAgency();
            } else {
                createAgency();
            }
        };

        const createAgency = async () => {
            try {
                await apiService.createAgency(currentAgency);
                cleanCurrentAgency();
                toggleModal();
                onSubmit.value = false;
                notification.value = { title: 'Success', content: 'Agency created successfully!', type: 'success' };
                getAgenciesData(currentPage.value, itemsPerPage.value);
            } catch (error) {
                onSubmit.value = false;
                notification.value = { title: 'Error', content: `Error when submitting talent: ${error}`, type: 'danger' };
            }
        }

        const updateAgency = async () => {
            try {
                await apiService.updateAgency(currentAgency);
                cleanCurrentAgency();
                toggleModal();
                onSubmit.value = false;
                notification.value = {
                    title: 'Success',
                    content: 'Agency updated successfully!',
                    type: 'success',
                };
                getAgenciesData(currentPage.value, itemsPerPage.value);
                isUpdateMode.value = false;
            } catch (error) {
                onSubmit.value = false;
                notification.value = {
                    title: 'Error',
                    content: `Error when updating Agency: ${error}`,
                    type: 'danger',
                };
                isUpdateMode.value = false;
            }
        };

        const handleUpdate = (updateId) => {
            isUpdateMode.value = true;
            const { talent, talent_count, ...selectedItem } = items.value.find(x => x.id === updateId);

            if (selectedItem) {

                Object.assign(currentAgency, selectedItem);
            }

            showModal.value = true;
        };

        const handleDelete = async (id) => {
            const confirmDelete = confirm(`Are you sure you want to delete Agency ${id}?`);
            if (confirmDelete) {
                try {
                    await apiService.deleteAgency(id);
                    notification.value = { title: 'Success', content: 'Agency deleted successfully!', type: 'success' };
                    getAgenciesData(1, itemsPerPage.value);
                } catch (error) {
                    notification.value = { title: 'Error', content: `Error when deleting talent: ${error}`, type: 'danger' };
                }
            }
        };

        const cleanCurrentAgency = () => {
            Object.assign(currentAgency, {
                agency_name: null,
                agency_status: null,
                agency_description: null,
            });

            if (currentAgency.id) {
                delete currentAgency.id;
            }

        };

        const loadPage = (page) => {
            currentPage.value = page;
            getAgenciesData(currentPage.value, itemsPerPage.value);
        };

        const onSearch = () => {
            getAgenciesData(1, itemsPerPage.value);
        };

        const changeOrder = (field) => {
            if (field === orderBy.value) {
                if (orderDirection.value === 'asc') {
                    orderDirection.value = 'desc';
                } else if (orderDirection.value === 'desc') {
                    orderDirection.value = '';
                } else {
                    orderDirection.value = 'asc';
                }
            } else {
                orderBy.value = field;
                orderDirection.value = 'asc';
            }
            getAgenciesData(currentPage.value, itemsPerPage.value);
        };

        const changePageSize = async (newPageSize) => {
            itemsPerPage.value = newPageSize;
            await getAgenciesData(1, itemsPerPage.value);
        };

        onMounted(() => {
            getAgenciesData(currentPage.value, itemsPerPage.value);
        });

        return {
            showModal,
            isUpdateMode,
            onSubmit,
            currentPage,
            itemsPerPage,
            totalItems,
            totalPages,
            fields,
            items,
            currentAgency,
            notification,
            search,
            orderBy,
            orderDirection,
            toggleModal,
            loadPage,
            changePageSize,
            onSearch,
            changeOrder,
            handleSubmit,
            handleDelete,
            handleUpdate,
            createAgency,
            updateAgency,
        };
    }
});
</script>