<template>
  <div>
    <breadcrumb-component></breadcrumb-component>
    <table-component
      :showAction="false"
      :footer="true"
      :fields="fields"
      :items="items"
      @search="onSearch"
    >
    </table-component>
    <pagination-component
      :currentPage="currentPage"
      :perPage="itemsPerPage"
      :totalItems="totalItems"
      :totalPages="totalPages"
      @load-page="changeCurrentPage"
      @change-page-size="changePageSize"
    ></pagination-component>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import BreadcrumbComponent from "@/Layout/Components/BreadcrumbComponent.vue";
import TableComponent from "@/Layout/Components/TableComponent.vue";
import PaginationComponent from "@/Layout/Components/PaginationComponent.vue";
import ModalComponent from "@/Layout/Components/ModalComponent.vue";
import ButtonSpinner from "@/Layout/Components/ButtonSpinner.vue";
import { apiService } from "@/supabase/apiService";

export default defineComponent({
  name: "Yugioh Public Card Page",

  components: {
    BreadcrumbComponent,
    TableComponent,
    PaginationComponent,
    ModalComponent,
    ButtonSpinner,
  },

  setup() {
    const currentPage = ref(1);
    const itemsPerPage = ref(60);
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
        key: "passcode",
        value: "Passcode",
      },
      {
        key: "name",
        value: "Name",
      },
      {
        key: "icon",
        value: "Properties",
      },
      {
        key: "category",
        value: "Category",
      },
      {
        key: "type",
        value: "Type",
      },
      {
        key: "attribute",
        value: "Attribute",
      },
    ]);
    const items = ref([]);

    const onSearch = (newSearchTerm) => {
      search.value = newSearchTerm;
      getYugiohCardsData(1, itemsPerPage.value);
    };

    const getYugiohCardsData = async (newPage, newPageSize) => {
      const result = await apiService.getYugiohCardsWithPaging(
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
      await getYugiohCardsData(1, newPageSize);
    };

    const changeCurrentPage = async (newPage) => {
      currentPage.value = newPage;
      await getYugiohCardsData(currentPage.value, itemsPerPage.value);
    };

    onMounted(async () => {
      await getYugiohCardsData(currentPage.value, itemsPerPage.value);
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
