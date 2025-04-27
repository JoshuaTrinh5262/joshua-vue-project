<template>
  <div class="filter-section">
    <h3 class="card-title">Talent Filter</h3>
    <div class="row">
      <div class="col-md-2">
        <div class="position-relative form-group">
          <label for="agency-selector">Search By Name</label>
          <input placeholder="Searching..." v-model="search" type="text" class="form-control" name="search" />
        </div>
      </div>
      <div class="col-md-2">
        <div class="position-relative form-group">
          <label for="agency-selector">Select Agency</label>
          <select id="agency-selector" v-model="selectedAgency" class="custom-select">
            <option :value="null"></option>
            <option v-for="agency in vtuberStore?.agencyOptions" :key="agency.id" :value="agency.id">
              {{ agency.agency_name }}
            </option>
          </select>
        </div>
      </div>
      <div class="col-md-2">
        <div class="position-relative form-group">
          <label for="talent_status">Select Status</label>
          <select name="talent_status" id="talent_status" v-model="selectedStatus" class="form-control">
            <option :value="null"></option>
            <option value="active">Active</option>
            <option value="graduation">Graduation</option>
            <option value="terminated">Terminated</option>
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
            <input type="checkbox" class="checkbox" name="checkbox" @change="
                selectedItems = $event.target.checked
                  ? items.map((item) => item.id)
                  : []
              " />
          </div>
        </th>
        <th>Avatar</th>
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
                <input type="checkbox" class="checkbox" name="checkbox" :value="item.id" v-model="selectedItems" />
              </div>
            </td>
            <td>
              <img :src="`/storage/talents/${item.id}.png`" @error="onImageError" alt="Talent Image" width="50"
                height="50" />
            </td>
            <td>
              <a :href="`talent/${item.id}`">{{ item.name }}</a>
            </td>
            <td>{{ item.original_name }}</td>
            <td>
              <a :href="`agency/${item.agency_id}`">{{ item.agency }}</a>
            </td>
            <td>{{ item.talent_status }}</td>
            <td>{{ item.debut_date }}</td>
            <td>{{ item.retirement_date }}</td>
            <td class="action">
              <button type="button" class="btn btn-sm btn-success" @click="handleUpdate(item)">
                <i class="pe-7s-file"></i>
              </button>
              <button type="button" class="btn btn-sm btn-warning" @click="handleDelete(item.id)">
                <i class="pe-7s-trash"></i>
              </button>
              <button type="button" @click="toggleDetails(index)" class="btn btn-sm btn-info">
                <i :class="[
                    'pe-7s-angle-right',
                    expandedRows[index] ? 'rotate-icon' : '',
                  ]"></i>
              </button>
            </td>
          </tr>
          <tr v-if="expandedRows[index]" class="details-row">
            <td :colspan="fields.length + 2">
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
        <td :colspan="fields.length + 2" class="text-center">
          No records found
        </td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <th>
          <input type="checkbox" class="checkbox" name="checkbox" @change="
              selectedItems = $event.target.checked
                ? items.map((item) => item.id)
                : []
            " />
        </th>
        <th>Avatar</th>
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
import { defineComponent, ref, onMounted } from "vue";
import ModalComponent from "@/Layout/Components/ModalComponent.vue";
import TableComponent from "@/Layout/Components/TableComponent.vue";
import NotificationComponent from "@/Layout/Components/NotificationComponent.vue";
import PaginationComponent from "@/Layout/Components/PaginationComponent.vue";
import ButtonSpinner from "@/Layout/Components/ButtonSpinner.vue";
import { apiService } from "@/supabase/apiService";
import { useVtuberStore } from "@/stores/useVtuberStore";

export default defineComponent({
  name: "TalentTable",

  components: {
    ModalComponent,
    TableComponent,
    PaginationComponent,
    NotificationComponent,
    ButtonSpinner,
  },

  emits: ["handleUpdate", "handleDelete"],

  setup(props, { emit }) {
    const vtuberStore = useVtuberStore();

    const orderBy = ref("debut_date");
    const orderDirection = ref("asc");
    const currentPage = ref(1);
    const itemsPerPage = ref(10);
    const totalItems = ref(0);
    const totalPages = ref(0);
    const search = ref(null);
    const expandedRows = ref([]);
    const selectedItems = ref([]);
    const selectedCount = ref(0);
    const selectedAgency = ref(null);
    const selectedStatus = ref(null);

    const fields = ref([
      {
        key: "name",
        value: "Name",
      },
      {
        key: "original_name",
        value: "Original Name",
      },
      {
        key: "agency",
        value: "Agency",
      },
      {
        key: "talent_status",
        value: "Status",
      },
      {
        key: "debut_date",
        value: "Debut Date",
      },
      {
        key: "retirement_date",
        value: "Retirement Date",
      },
    ]);
    const items = ref([]);

    const getTalentsData = async () => {
      const response = await apiService.getTalentsWithPaging(
        currentPage.value,
        itemsPerPage.value,
        orderBy.value,
        orderDirection.value,
        search.value,
        selectedAgency.value,
        selectedStatus.value
      );

      if (!response.error) {
        items.value = response.items ? response.items : [];
        totalItems.value = response.totalItems;
        totalPages.value = response.totalPages;
      }
    };

    const handleUpdate = (updateData) => {
      emit("handleUpdate", updateData);
    };

    const handleDelete = async (id) => {
      const confirmDelete = confirm(
        `Are you sure you want to delete Talent ${id}?`
      );
      if (confirmDelete) {
        emit("handleDelete", id);
      }
    };

    const handleFilter = () => {
      getTalentsData();
    };

    const cleanFilter = () => {
      search.value = null;
      selectedAgency.value = null;
      selectedStatus.value = null;
      if (
        search.value == null &&
        selectedAgency.value == null &&
        selectedStatus.value == null
      ) {
        currentPage.value = 1;
        getTalentsData();
      }
    };

    const showCleanFilter = () => {
      return (
        search.value != null ||
        selectedAgency.value != null ||
        selectedStatus.value != null
      );
    };

    const loadPage = (page) => {
      currentPage.value = page;
      getTalentsData();
    };

    const changeOrder = (field) => {
      if (field === orderBy.value) {
        if (orderDirection.value === "asc") {
          orderDirection.value = "desc";
        } else if (orderDirection.value === "desc") {
          orderDirection.value = "";
        } else {
          orderDirection.value = "asc";
        }
      } else {
        orderBy.value = field;
        orderDirection.value = "asc";
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

    const onImageError = (e) => {
      e.target.src = "/default.jpg";
    };

    onMounted(async () => {
      vtuberStore.fetchAgencies();
      await getTalentsData();
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
      selectedItems,
      selectedCount,
      selectedAgency,
      selectedStatus,
      vtuberStore,
      loadPage,
      changePageSize,
      changeOrder,
      handleDelete,
      handleUpdate,
      handleFilter,
      cleanFilter,
      showCleanFilter,
      getTalentsData,
      toggleDetails,
      onImageError,
    };
  },
});
</script>
<style>
.rotate-icon {
  transform: rotate(90deg);
}
</style>
