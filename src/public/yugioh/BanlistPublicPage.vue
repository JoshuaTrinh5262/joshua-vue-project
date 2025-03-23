<template>
  <div>
    <breadcrumb-component></breadcrumb-component>

    <div v-for="(item, index) in items" :key="index">
      {{ item.id }} {{ item.name }}
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import BreadcrumbComponent from "../../Layout/Components/BreadcrumbComponent.vue";
import TableComponent from "../../Layout/Components/TableComponent.vue";
import PaginationComponent from "../../Layout/Components/PaginationComponent.vue";
import ModalComponent from "../../Layout/Components/ModalComponent.vue";
import ButtonSpinner from "../../Layout/Components/ButtonSpinner.vue";
import { apiService } from "../../supabase/apiService";

export default defineComponent({
  name: "YugiohBanlistPublicPage",

  components: {
    BreadcrumbComponent,
    TableComponent,
    PaginationComponent,
    ModalComponent,
    ButtonSpinner,
  },

  setup() {
    const currentPage = ref(1);
    const itemsPerPage = ref(20);
    const totalItems = ref(0);
    const totalPages = ref(0);
    const orderBy = ref("id");
    const orderDirection = ref("asc");
    const search = ref("");

    const fields = ref([
      {
        key: "id",
        value: "Id",
      },
      {
        key: "name",
        value: "Name",
      },
      {
        key: "effective_date",
        value: "Effective Date",
      },
    ]);
    const items = ref([]);

    const onSearch = (newSearchTerm) => {
      search.value = newSearchTerm;
      getYugiohBanlistsData(1, itemsPerPage.value);
    };

    const getYugiohBanlistsData = async (newPage, newPageSize) => {
      const result = await apiService.getYugiohBanlistsWithPaging(
        newPage,
        newPageSize,
        orderBy.value,
        orderDirection.value,
        search.value
      );
      if (!result.error) {
        items.value = result.items;
        totalItems.value = result.totalItems;
        totalPages.value = result.totalPages;
        itemsPerPage.value = newPageSize;
      }
    };

    const changePageSize = async (newPageSize) => {
      await getYugiohBanlistsData(1, newPageSize);
    };

    const changeCurrentPage = async (newPage) => {
      currentPage.value = newPage;
      await getYugiohBanlistsData(currentPage.value, itemsPerPage.value);
    };

    onMounted(async () => {
      await getYugiohBanlistsData(currentPage.value, itemsPerPage.value);
    });

    return {
      currentPage,
      itemsPerPage,
      totalItems,
      totalPages,
      fields,
      items,
      onSearch,
      changePageSize,
      changeCurrentPage,
    };
  },
});
</script>
