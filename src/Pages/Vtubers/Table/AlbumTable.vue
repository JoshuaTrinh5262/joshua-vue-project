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
                    <td><a :href="`album/${item.id}`">{{ item.name }}</a></td>
                    <td>{{ item.album_type }}</td>
                    <td>{{ item.discography_count }}</td>
                    <td>{{ item.released_date }}</td>
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
                            <p>Talens: </p>
                            <p>{{ item.talents }}</p>
                        </div>
                        <div>
                            <p>Album Description: </p>
                            <p>{{ item.album_description }}</p>
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
    name: "AlbumTable",

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
        const orderBy = ref('released_date');
        const orderDirection = ref('desc');
        const currentPage = ref(1);
        const itemsPerPage = ref(20);
        const totalItems = ref(0);
        const totalPages = ref(0);
        const search = ref('');
        const notification = ref(null);
        const currentAlbum = reactive({
            album_name: null,
            album_status: null,
            album_description: null
        });
        const expandedRows = ref([]);
        const fields = [
            { key: 'id', value: 'ID' },
            { key: 'name', value: 'Album Name' },
            { key: 'album_type', value: 'Album Type' },
            { key: 'discography_count', value: 'Discography' },
            { key: 'released_date', value: 'Released Date' },
        ];
        const items = ref([]);

        const toggleModal = () => {
            isUpdateMode.value = false;
            cleanCurrentAlbum();
            showModal.value = !showModal.value;
        };

        const getAlbumsData = async () => {
            const response = await apiService.getAlbumsWithPaging(currentPage.value, itemsPerPage.value, orderBy.value, orderDirection.value, search.value);

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
                updateAlbum();
            } else {
                createAlbum();
            }
        };

        const createAlbum = async () => {
            try {
                await apiService.createAlbum(currentAlbum);
                cleanCurrentAlbum();
                toggleModal();
                onSubmit.value = false;
                notification.value = { title: 'Success', content: 'Album created successfully!', type: 'success' };
                getAlbumsData();
            } catch (error) {
                onSubmit.value = false;
                notification.value = { title: 'Error', content: `Error when create album: ${error}`, type: 'danger' };
            }
        }

        const updateAlbum = async () => {
            try {
                await apiService.updateAlbum(currentAlbum);
                cleanCurrentAlbum();
                toggleModal();
                onSubmit.value = false;
                notification.value = {
                    title: 'Success',
                    content: 'Album updated successfully!',
                    type: 'success',
                };
                getAlbumsData();
                isUpdateMode.value = false;
            } catch (error) {
                onSubmit.value = false;
                notification.value = {
                    title: 'Error',
                    content: `Error when updating Album: ${error}`,
                    type: 'danger',
                };
                isUpdateMode.value = false;
            }
        };

        const handleUpdate = (updateData) => {
            emit('handleUpdate', updateData);
        }

        const handleDelete = async (id) => {
            const confirmDelete = confirm(`Are you sure you want to delete Album ${id}?`);
            if (confirmDelete) {
                try {
                    await apiService.deleteAlbum(id);
                    notification.value = { title: 'Success', content: 'Album deleted successfully!', type: 'success' };
                    currentPage.value = 1;
                    getAlbumsData();
                } catch (error) {
                    notification.value = { title: 'Error', content: `Error when deleting album: ${error}`, type: 'danger' };
                }
            }
        };

        const cleanCurrentAlbum = () => {
            Object.assign(currentAlbum, {
                album_name: null,
                album_status: null,
                album_description: null,
            });

            if (currentAlbum.id) {
                delete currentAlbum.id;
            }
        };

        const loadPage = (page) => {
            currentPage.value = page;
            getAlbumsData();
        };

        const onSearch = () => {
            currentPage.value = 1;
            getAlbumsData();
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
            getAlbumsData();
        };

        const changePageSize = async (newPageSize) => {
            itemsPerPage.value = newPageSize;
            currentPage.value = 1;
            await getAlbumsData();
        };

        const toggleDetails = (index) => {
            expandedRows.value[index] = !expandedRows.value[index];
        };

        onMounted(() => {
            getAlbumsData();
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
            currentAlbum,
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
            createAlbum,
            updateAlbum,
            getAlbumsData,
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
