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
    <table class="table table-hover table-sm table-bordered">
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
            <template v-if="items.length > 0">
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
            </template>
            <tr v-else>
                <td :colspan="fields.length + 2" class="text-center">No records found</td>
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
import { defineComponent, ref, onMounted } from 'vue';
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

    emits: ['handleUpdate', 'handleDelete'],

    setup(props, { emit }) {
        const orderBy = ref('debut_date');
        const orderDirection = ref('asc');
        const currentPage = ref(1);
        const itemsPerPage = ref(20);
        const totalItems = ref(0);
        const totalPages = ref(0);
        const search = ref('');
        const expandedRows = ref([]);

        const fields = ref([
            {
                key: "name",
                value: "Name"
            },
            {
                key: "original_name",
                value: "Original Name"
            },
            {
                key: "agency",
                value: "Agency"
            },
            {
                key: "talent_status",
                value: "Status"
            },
            {
                key: "debut_date",
                value: "Debut Date"
            },
        ]);
        const items = ref([]);

        const getTalentsData = async () => {
            if (search.value) {
                currentPage.value = 1;
            }

            const response = await apiService.getTalentsWithPaging(currentPage.value, itemsPerPage.value, orderBy.value, orderDirection.value, search.value);

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
            const confirmDelete = confirm(`Are you sure you want to delete Talent ${id}?`);
            if (confirmDelete) {
                emit('handleDelete', id);
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
            currentPage,
            itemsPerPage,
            totalItems,
            totalPages,
            fields,
            items,
            search,
            orderBy,
            orderDirection,
            expandedRows,
            loadPage,
            changePageSize,
            onSearch,
            changeOrder,
            handleDelete,
            handleUpdate,
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
