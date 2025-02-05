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
                    <td>{{ item.id }}</td>
                    <td>{{ item.event_title }}</td>
                    <td>{{ item.event_summary}}</td>
                    <td>{{ item.event_date}}</td>
                    <td>{{ item.event_hashtag}}</td>
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
                    <td colspan="6">
                        <div>
                            <p>Talents : </p>
                            <p>{{ item.talents }}</p>
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
    name: "EventTable",

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
        const orderBy = ref('event_date');
        const orderDirection = ref('desc');
        const currentPage = ref(1);
        const itemsPerPage = ref(20);
        const totalItems = ref(0);
        const totalPages = ref(0);
        const search = ref('');
        const notification = ref(null);
        const currentEvent = reactive({
            agency_name: null,
            agency_status: null,
            agency_description: null
        });
        const expandedRows = ref([]);
        const fields = [
            { key: 'id', value: 'ID' },
            { key: 'event_title', value: 'Title' },
            { key: 'event_summary', value: 'Summary' },
            { key: 'event_date', value: 'Date' },
            { key: 'event_hashtag', value: 'Hashtag' },
        ];
        const items = ref([]);

        const toggleModal = () => {
            isUpdateMode.value = false;
            cleanCurrentEvent();
            showModal.value = !showModal.value;
        };

        const getEventsData = async () => {
            const response = await apiService.getEventsWithPaging(currentPage.value, itemsPerPage.value, orderBy.value, orderDirection.value, search.value);

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
                updateEvent();
            } else {
                createEvent();
            }
        };

        const createEvent = async () => {
            try {
                await apiService.createEvent(currentEvent);
                cleanCurrentEvent();
                toggleModal();
                onSubmit.value = false;
                notification.value = { title: 'Success', content: 'Event created successfully!', type: 'success' };
                getEventsData();
            } catch (error) {
                onSubmit.value = false;
                notification.value = { title: 'Error', content: `Error when submitting event: ${error}`, type: 'danger' };
            }
        }

        const updateEvent = async () => {
            try {
                await apiService.updateEvent(currentEvent);
                cleanCurrentEvent();
                toggleModal();
                onSubmit.value = false;
                notification.value = {
                    title: 'Success',
                    content: 'Event updated successfully!',
                    type: 'success',
                };
                getEventsData();
                isUpdateMode.value = false;
            } catch (error) {
                onSubmit.value = false;
                notification.value = {
                    title: 'Error',
                    content: `Error when updating Event: ${error}`,
                    type: 'danger',
                };
                isUpdateMode.value = false;
            }
        };

        const handleUpdate = (updateData) => {
            emit('handleUpdate', updateData);
        }

        const handleDelete = async (id) => {
            const confirmDelete = confirm(`Are you sure you want to delete Event ${id}?`);
            if (confirmDelete) {
                try {
                    await apiService.deleteEvent(id);
                    notification.value = { title: 'Success', content: 'Event deleted successfully!', type: 'success' };
                    currentPage.value = 1;
                    getEventsData();
                } catch (error) {
                    notification.value = { title: 'Error', content: `Error when deleting event: ${error}`, type: 'danger' };
                }
            }
        };

        const cleanCurrentEvent = () => {
            Object.assign(currentEvent, {
                agency_name: null,
                agency_status: null,
                agency_description: null,
            });

            if (currentEvent.id) {
                delete currentEvent.id;
            }
        };

        const loadPage = (page) => {
            currentPage.value = page;
            getEventsData();
        };

        const onSearch = () => {
            currentPage.value = 1;
            getEventsData();
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
            getEventsData();
        };

        const changePageSize = async (newPageSize) => {
            itemsPerPage.value = newPageSize;
            currentPage.value = 1;
            await getEventsData();
        };

        const toggleDetails = (index) => {
            expandedRows.value[index] = !expandedRows.value[index];
        };

        onMounted(() => {
            getEventsData();
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
            currentEvent,
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
            createEvent,
            updateEvent,
            getEventsData,
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
