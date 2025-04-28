<template>
    <div class="filter-section">
        <h3 class="card-title">Album Filter</h3>
        <div class="row">
            <div class="col-md-2">
                <div class="position-relative form-group">
                    <label for="agency-selector">Search By Title</label>
                    <input placeholder="Searching..." v-model="search" type="text" class="form-control" name="search" />
                </div>
            </div>
            <div class="col-md-2">
                <div class="position-relative form-group">
                    <label for="agency-selector">Select Talent</label>
                    <select id="talent-selector" v-model="selectedTalent" class="custom-select">
                        <option :value="null"></option>
                        <option v-for="talent in vtuberStore?.talentOptions" :key="talent.id" :value="talent.id">
                            {{ talent.name }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="col-md-2">
                <div class="position-relative form-group">
                    <label for="agency-selector">Album Type</label>
                    <select id="talent-selector" v-model="selectedType" class="custom-select">
                        <option :value="null"></option>
                        <option value="single">Single</option>
                        <option value="extended_play">Extended Play</option>
                        <option value="album">Album</option>
                    </select>
                </div>
            </div>
            <div class="col-md-4">
                <div class="position-relative form-group">
                    <label for="btn">Action</label>
                    <div class="form-inline">
                        <button-spinner buttonClass="btn btn-primary mr-2" @click="handleFilter" normalText="Filter" />
                        <button v-if="showCleanFilter()" class="btn btn-primary" @click="cleanFilter">
                            Clean Filter
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <table class="table table-hover table-sm table-bordered">
        <thead>
            <tr>
                <th class="checkbox">
                    <div class="center-cell">
                        <input type="checkbox" name="checkbox" class="checkbox" />
                    </div>
                </th>
                <th class="avatar">Avatar</th>
                <th v-for="field in fields" :key="field.key" :id="field.key" @click="changeOrder(field.key)">
                    {{ field.value }}
                    <span v-if="orderBy === field.key && orderDirection === 'asc'">&#9660;</span>
                    <span v-else-if="orderBy === field.key && orderDirection === 'desc'">&#9650;</span>
                    <span v-else>&#9670;</span>
                </th>
                <th class="action">Action</th>
            </tr>
        </thead>
        <tbody>
            <template v-if="items.length > 0">
                <template v-for="(item, index) in items" :key="index">
                    <tr>
                        <td class="checkbox">
                            <div class="center-cell"><input type="checkbox" name="checkbox" class="checkbox" /></div>
                        </td>
                        <td><img :src="`/storage/albums/${item.id}.png`" @error="onImageError" alt="Album Image"
                                width="50" height="50" /></td>
                        <td><a :href="`album/${item.id}`">{{ item.name }}</a></td>
                        <td>{{ item.album_type }}</td>
                        <td>{{ item.released_date }}</td>
                        <td>{{ item.tracklist }}</td>
                        <td class="action">
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
                        <td :colspan="fields.length + 3">
                            <div>Id: {{ item.id }}</div>
                            <div>
                                Talents:
                                <span v-for="(talent, index) in item.album_talent" :key="talent.id">
                                    <a :href="`talent/${talent.id}`">{{ talent.name }}</a><span
                                        v-if="index < item.album_talent.length - 1">, </span>
                                </span>
                            </div>
                            <div>Album Description: {{ item.album_description }}</div>
                        </td>
                    </tr>
                </template>
            </template>
            <tr v-else>
                <td :colspan="fields.length + 2" class="text-center">No records found</td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <th class="checkbox">
                    <div class="center-cell"><input type="checkbox" name="checkbox" class="checkbox" /></div>
                </th>
                <th class="avatar">Avatar</th>
                <th v-for="field in fields" :key="field.key" :id="field.key" @click="changeOrder(field.key)">
                    {{ field.value }}
                    <span v-if="orderBy === field.key && orderDirection === 'asc'">&#9660;</span>
                    <span v-else-if="orderBy === field.key && orderDirection === 'desc'">&#9650;</span>
                    <span v-else>&#9670;</span>
                </th>
                <th class="action">Action</th>
            </tr>
        </tfoot>
    </table>
    <pagination-component :currentPage="currentPage" :perPage="itemsPerPage" :totalItems="totalItems"
        :totalPages="totalPages" @load-page="loadPage" @change-page-size="changePageSize">
    </pagination-component>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import ModalComponent from '@/Layout/Components/ModalComponent.vue';
import TableComponent from '@/Layout/Components/TableComponent.vue';
import NotificationComponent from '@/Layout/Components/NotificationComponent.vue';
import PaginationComponent from '@/Layout/Components/PaginationComponent.vue';
import ButtonSpinner from "@/Layout/Components/ButtonSpinner.vue";
import { apiService } from '@/supabase/apiService';
import { useVtuberStore } from "@/stores/useVtuberStore";

export default defineComponent({
    name: "AlbumTable",

    components: {
        ModalComponent,
        TableComponent,
        PaginationComponent,
        NotificationComponent,
        ButtonSpinner
    },

    emits: ['handleUpdate', 'handleDelete'],

    setup(props, { emit }) {
        const vtuberStore = useVtuberStore();

        const orderBy = ref('released_date');
        const orderDirection = ref('desc');
        const currentPage = ref(1);
        const itemsPerPage = ref(20);
        const totalItems = ref(0);
        const totalPages = ref(0);

        const search = ref('');
        const selectedTalent = ref(null);
        const selectedType = ref(null);

        const expandedRows = ref([]);
        const fields = [
            {
                key: 'name',
                value: 'Album Name'
            },
            {
                key: 'album_type',
                value: 'Album Type'
            },
            {
                key: 'released_date',
                value: 'Released Date'
            },
            {
                key: 'tracklist',
                value: 'tracklist'
            },
        ];
        const items = ref([]);

        const getAlbumsData = async () => {
            if (search.value) {
                currentPage.value = 1;
            }

            const response = await apiService.getAlbumsWithPaging(
                currentPage.value,
                itemsPerPage.value,
                orderBy.value,
                orderDirection.value,
                search.value,
                selectedTalent.value,
                selectedType.value
            );

            if (!response.error) {
                items.value = response.items ? response.items : [];
                totalItems.value = response.totalItems;
                totalPages.value = response.totalPages;
                itemsPerPage.value = itemsPerPage.value;
            }
        };


        const handleUpdate = (updateData) => {
            emit('handleUpdate', updateData);
        }

        const handleDelete = async (id) => {
            const confirmDelete = confirm(`Are you sure you want to delete Album ${id}?`);
            if (confirmDelete) {
                emit('handleDelete', id);
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

        const onImageError = (e) => {
            e.target.src = '/default.jpg';
        }

        const handleFilter = () => {
            currentPage.value = 1;
            getAlbumsData();
        };

        const cleanFilter = () => {
            search.value = null;
            selectedTalent.value = null;
            selectedType.value = null;

            if (search.value == null && selectedTalent.value == null && selectedType.value == null) {
                currentPage.value = 1;
                getAlbumsData();
            }
        };

        const showCleanFilter = () => {
            return search.value != null || selectedTalent.value != null || selectedType.value != null;
        };

        onMounted(() => {
            getAlbumsData();
        });

        return {
            vtuberStore,
            currentPage,
            itemsPerPage,
            totalItems,
            totalPages,
            fields,
            items,
            search,
            selectedTalent,
            selectedType,
            orderBy,
            orderDirection,
            expandedRows,
            loadPage,
            changePageSize,
            onSearch,
            changeOrder,
            handleDelete,
            handleUpdate,
            getAlbumsData,
            toggleDetails,
            onImageError,
            handleFilter,
            cleanFilter,
            showCleanFilter
        };
    }
});
</script>
<style>
.rotate-icon {
    transform: rotate(90deg);
}
</style>
