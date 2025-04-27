<template>
  <div class="filter-section">
    <h3 class="card-title">Event Filter</h3>
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
      <template v-if="items && items.length > 0">
        <template v-for="(item, index) in items" :key="index">
          <tr>
            <td class="checkbox">
              <div class="center-cell">
                <input type="checkbox" class="checkbox" />
              </div>
            </td>
            <td>{{ item.id }}</td>
            <td>{{ item.event_title }}</td>
            <td>{{ item.event_summary }}</td>
            <td>{{ item.event_date }}</td>
            <td>{{ item.event_hashtag }}</td>
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
            <td colspan="6">
              <div>
                <p>Id: {{ item.id }}</p>
                <p>Talents :</p>
                <p>{{ item.event_talent }}</p>
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
import { defineComponent, ref, onMounted } from "vue";
import ModalComponent from "@/Layout/Components/ModalComponent.vue";
import TableComponent from "@/Layout/Components/TableComponent.vue";
import NotificationComponent from "@/Layout/Components/NotificationComponent.vue";
import PaginationComponent from "@/Layout/Components/PaginationComponent.vue";
import ButtonSpinner from "@/Layout/Components/ButtonSpinner.vue";
import { apiService } from "@/supabase/apiService";
import { useVtuberStore } from "@/stores/useVtuberStore";

export default defineComponent({
  name: "EventTable",

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

    const orderBy = ref("event_date");
    const orderDirection = ref("desc");
    const currentPage = ref(1);
    const itemsPerPage = ref(20);
    const totalItems = ref(0);
    const totalPages = ref(0);

    const search = ref(null);
    const selectedTalent = ref(null);

    const expandedRows = ref([]);
    const fields = [
      {
        key: "id",
        value: "ID",
      },
      {
        key: "event_title",
        value: "Title",
      },
      {
        key: "event_summary",
        value: "Summary",
      },
      {
        key: "event_date",
        value: "Date",
      },
      {
        key: "event_hashtag",
        value: "Hashtag",
      },
    ];
    const items = ref([]);

    const getEventsData = async () => {
      const response = await apiService.getEventsWithPaging(
        currentPage.value,
        itemsPerPage.value,
        orderBy.value,
        orderDirection.value,
        search.value,
        selectedTalent.value
      );

      if (!response.error) {
        items.value = response.items;
        totalItems.value = response.totalItems;
        totalPages.value = response.totalPages;
        itemsPerPage.value = itemsPerPage.value;
      }
    };

    const handleUpdate = (updateData) => {
      emit("handleUpdate", updateData);
    };

    const handleDelete = async (id) => {
      const confirmDelete = confirm(
        `Are you sure you want to delete Event ${id}?`
      );
      if (confirmDelete) {
        emit("handleDelete", id);
      }
    };

    const loadPage = (page) => {
      currentPage.value = page;
      getEventsData();
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

    const handleFilter = () => {
      getEventsData();
    };

    const cleanFilter = () => {
      search.value = null;
      selectedTalent.value = null;
      if (
        search.value == null &&
        selectedTalent.value == null
      ) {
        currentPage.value = 1;
        getEventsData();
      }
    };

    const showCleanFilter = () => {
      return (
        search.value != null ||
        selectedTalent.value != null
      );
    };

    onMounted(async () => {
      await getEventsData();
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
      orderBy,
      orderDirection,
      expandedRows,
      selectedTalent,
      loadPage,
      changePageSize,
      changeOrder,
      handleDelete,
      handleUpdate,
      getEventsData,
      toggleDetails,
      handleFilter,
      cleanFilter,
      showCleanFilter
    };
  },
});
</script>
<style>
.rotate-icon {
  transform: rotate(90deg);
}
</style>
