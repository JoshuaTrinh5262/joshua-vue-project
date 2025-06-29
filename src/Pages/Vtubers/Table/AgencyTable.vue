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
                <th class="checkbox">
                    <div class="center-cell">
                        <input type="checkbox" class="checkbox" />
                    </div>
                </th>
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
                            <div class="center-cell">
                                <input type="checkbox" class="checkbox" />
                            </div>
                        </td>
                        <td>{{ item.id }}</td>
                        <td><a :href="`agency/${item.id}`">{{ item.agency_name }}</a></td>
                        <td>{{ item.agency_status }}</td>
                        <td>{{ item.talent_count }}</td>
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
                        <td colspan="6">
                            <div>
                                <p>Agency Description: </p>
                                <p>{{ item.agency_description }}</p>
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
                <th class="checkbox">
                    <div class="center-cell">
                        <input type="checkbox" class="checkbox" />
                    </div>
                </th>
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
import { defineComponent, ref, onMounted, reactive } from 'vue';
import ModalComponent from '@/Layout/Components/ModalComponent.vue';
import TableComponent from '@/Layout/Components/TableComponent.vue';
import NotificationComponent from '@/Layout/Components/NotificationComponent.vue';
import PaginationComponent from '@/Layout/Components/PaginationComponent.vue';
import ButtonSpinner from "@/Layout/Components/ButtonSpinner.vue";
import { apiService } from '@/supabase/apiService';

export default defineComponent({
    name: "AgencyTable",

    components: {
        ModalComponent,
        TableComponent,
        PaginationComponent,
        NotificationComponent,
        ButtonSpinner
    },

    emits: ['handleUpdate', 'handleDelete'],

    setup(props, { emit }) {
        const orderBy = ref('agency_id');
        const orderDirection = ref('asc');
        const currentPage = ref(1);
        const itemsPerPage = ref(10);
        const totalItems = ref(0);
        const totalPages = ref(0);
        const search = ref('');
        const notification = ref(null);
        const currentAgency = reactive({
            agency_name: null,
            agency_status: null,
            agency_description: null
        });
        const expandedRows = ref([]);
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
                key: 'agency_status',
                value: 'Agency Status'
            },
            {
                key: 'talent_count',
                value: 'Agency Count'
            },
        ];
        const items = ref([]);

        const getAgenciesData = async () => {
            if (search.value) {
                currentPage.value = 1;
            }

            const response = await apiService.getAgenciesWithPaging(currentPage.value, itemsPerPage.value, orderBy.value, orderDirection.value, search.value);

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
            const confirmDelete = confirm(`Are you sure you want to delete Agency ${id}?`);
            if (confirmDelete) {
                emit('handleDelete', id);
            }
        };

        const loadPage = (page) => {
            currentPage.value = page;
            getAgenciesData();
        };

        const onSearch = () => {
            currentPage.value = 1;
            getAgenciesData();
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
            getAgenciesData();
        };

        const changePageSize = async (newPageSize) => {
            itemsPerPage.value = newPageSize;
            currentPage.value = 1;
            await getAgenciesData();
        };

        const toggleDetails = (index) => {
            expandedRows.value[index] = !expandedRows.value[index];
        };

        onMounted(() => {
            getAgenciesData();
        });

        return {
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
            expandedRows,
            loadPage,
            changePageSize,
            onSearch,
            changeOrder,
            handleDelete,
            handleUpdate,
            getAgenciesData,
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
