<template>
    <div class="form-inline">
        <div class="input-group mb-2">
            <input placeholder="Searching..." @input="onSearch" v-model="search" type="text" class="form-control"
                name="search" />
            <div class="input-group-append">
                <button class="btn btn-primary">
                    <i class="pe-7s-search"></i>
                </button>
            </div>
        </div>
    </div>
    <table class="table table-sm table-bordered">
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
            <template v-for="(item, index) in items" :key="index">
                <tr>
                    <td><input type="checkbox" name="checkbox" /></td>
                    <td><a :href="`talent/${item.id}`">{{ item.name }}</a></td>
                    <td>{{ item.original_name }}</td>
                    <td><a :href="`agency/${item.agency_id}`">{{ item.agency }}</a></td>
                    <td>{{ item.talent_status }}</td>
                    <td>{{ item.debut_date }}</td>
                    <td>
                        <button type="button" class="btn btn-sm btn-success" @click="handleUpdate(item)">
                            <i class="pe-7s-file"></i>
                        </button>
                        <button type="button" class="btn btn-sm btn-warning" @click="handleDelete(item.id)">
                            <i class="pe-7s-trash"></i>
                        </button>
                        <button type="button" @click="toggleDetails(index)" class="btn btn-sm btn-info">
                            <i :class="['pe-7s-angle-right', expandedRows[index] ? 'rotate-icon' : '']"></i>
                        </button>
                    </td>
                </tr>
                <tr v-if="expandedRows[index]" class="details-row">
                    <td colspan="9">
                        <div>
                            <p>Talent Id: {{ item.id }}</p>
                            <p>Discography Count: {{ item.discography_count }}</p>
                            <p>Album Count: {{ item.album_count }}</p>
                        </div>
                    </td>
                </tr>
            </template>
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
    name: "TalentTable",

    components: {
        ModalComponent,
        TableComponent,
        PaginationComponent,
        NotificationComponent,
        ButtonSpinner
    },

    emits: ['handleUpdate'],

    setup(props, { emit }) {
        const isUpdateMode = ref(false);
        const showModal = ref(false);
        const onSubmit = ref(false);
        const orderBy = ref('debut_date');
        const orderDirection = ref('asc');
        const currentPage = ref(1);
        const itemsPerPage = ref(20);
        const totalItems = ref(0);
        const totalPages = ref(0);
        const search = ref('');
        const notification = ref(null);
        const expandedRows = ref([]);

        const currentTalent = reactive({
            id: null,
            name: null,
            original_name: null,
            gender: null,
            date_of_birth: null,
            talent_status: "active",
            debut_date: null,
            retirement_date: null,
            height: null,
            emoji: null,
        });

        const fields = ref([
            { key: "name", value: "Name" },
            { key: "original_name", value: "Original Name" },
            { key: "agency", value: "Agency" },
            { key: "talent_status", value: "Status" },
            { key: "debut_date", value: "Debut Date" },
        ]);
        const items = ref([]);

        const toggleModal = () => {
            isUpdateMode.value = false;
            cleanCurrentTalent();
            showModal.value = !showModal.value;
        };

        const getTalentsData = async () => {
            const response = await apiService.getTalentsWithPaging(currentPage.value, itemsPerPage.value, orderBy.value, orderDirection.value, search.value);

            if (!response.error) {
                items.value = response.items;
                totalItems.value = response.totalItems;
                totalPages.value = response.totalPages;
                itemsPerPage.value = itemsPerPage.value;
            }
        };

        const handleSubmit = async () => {
            onSubmit.value = true;
            if (isUpdateMode.value) {
                updateTalent();
            } else {
                createTalent();
            }
        };

        const createTalent = async () => {
            try {
                await apiService.createTalent(currentTalent);
                cleanCurrentTalent();
                toggleModal();
                onSubmit.value = false;
                notification.value = { title: 'Success', content: 'Talent created successfully!', type: 'success' };
                getTalentsData();
            } catch (error) {
                onSubmit.value = false;
                notification.value = { title: 'Error', content: `Error when submitting talent: ${error}`, type: 'danger' };
            }
        }

        const updateTalent = async () => {
            try {
                await apiService.updateTalent(currentTalent);
                cleanCurrentTalent();
                toggleModal();
                onSubmit.value = false;
                notification.value = {
                    title: 'Success',
                    content: 'Talent updated successfully!',
                    type: 'success',
                };
                getTalentsData();
                isUpdateMode.value = false;
            } catch (error) {
                onSubmit.value = false;
                notification.value = {
                    title: 'Error',
                    content: `Error when updating Talent: ${error}`,
                    type: 'danger',
                };
                isUpdateMode.value = false;
            }
        };

        const handleUpdate = (updateData) => {
            emit('handleUpdate', updateData);
        }

        const handleDelete = async (id) => {
            const confirmDelete = confirm(`Are you sure you want to delete Talent ${id}?`);
            if (confirmDelete) {
                try {
                    await apiService.deleteTalent(id);
                    notification.value = { title: 'Success', content: 'Talent deleted successfully!', type: 'success' };
                    currentPage.value = 1;
                    getTalentsData();
                } catch (error) {
                    notification.value = { title: 'Error', content: `Error when deleting talent: ${error}`, type: 'danger' };
                }
            }
        };

        const cleanCurrentTalent = () => {
            Object.assign(currentTalent, {
                name: null,
                original_name: null,
                gender: null,
                date_of_birth: null,
                agency_id: null,
                talent_status: "active",
                debut_date: null,
                retirement_date: null,
                height: null,
                emoji: null,
            });

            if (currentTalent.id) {
                delete currentTalent.id;
            }
        };

        const loadPage = (page) => {
            currentPage.value = page;
            getTalentsData();
        };

        const onSearch = () => {
            currentPage.value = 1;
            getTalentsData();
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
            getTalentsData();
        };

        const changePageSize = async (newPageSize) => {
            itemsPerPage.value = newPageSize;
            currentPage.value = 1;
            await getTalentsData();
        };

        const toggleDetails = (index) => {
            expandedRows.value[index] = !expandedRows.value[index];
        };

        onMounted(() => {
            getTalentsData();
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
            currentTalent,
            notification,
            search,
            orderBy,
            orderDirection,
            expandedRows,
            toggleModal,
            loadPage,
            changePageSize,
            onSearch,
            changeOrder,
            handleSubmit,
            handleDelete,
            handleUpdate,
            createTalent,
            updateTalent,
            getTalentsData,
            toggleDetails
        };
    }
});
</script>
<style>
.rotate-icon {
    transform: rotate(90deg);
}
</style>
