<template>
  <div>
    <page-title-component :heading=heading :subheading=subheading :icon=icon></page-title-component>

    <table-component :footer=true :fields="fields" :items="items" @search="onSearch">
    </table-component>

    <pagination-component :currentPage="currentPage" :perPage="itemsPerPage" :totalItems="totalItems"
      :totalPages="totalPages" @load-page="changeCurrentPage" @change-page-size="changePageSize"></pagination-component>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import PageTitleComponent from "../../Layout/Components/PageTitleComponent.vue";
import TableComponent from "../../Layout/Components/TableComponent.vue";
import PaginationComponent from "../../Layout/Components/PaginationComponent.vue";
import ModalComponent from "../../Layout/Components/ModalComponent.vue";
import ButtonSpinner from "../../Layout/Components/ButtonSpinner.vue";
import { apiService } from "../../supabase/apiService";

export default defineComponent({
  name: "YugiohDuelistPage",

  components: {
    PageTitleComponent,
    TableComponent,
    PaginationComponent,
    ModalComponent,
    ButtonSpinner
  },

  setup() {
    const heading = ref("Yu-Gi-Oh Duelist");
    const subheading = ref("Yu-Gi-Oh Duelist page");
    const icon = ref("pe-7s-copy-file icon-gradient bg-tempting-azure");

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
        value: "Id"
      },
      {
        key: "name",
        value: "Name"
      },

    ]);
    const items = ref([]);

    const onSearch = (newSearchTerm) => {
      search.value = newSearchTerm;
      getYugiohDuelistsData(1, itemsPerPage.value);
    };

    const getYugiohDuelistsData = async (newPage, newPageSize) => {
      const result = await apiService.getYugiohDuelistsWithPaging(newPage, newPageSize, orderBy.value, orderDirection.value, search.value);
      if (!result.error) {
        items.value = result.items;
        totalItems.value = result.totalItems;
        totalPages.value = result.totalPages;
        itemsPerPage.value = newPageSize;
      }
    };

    const changePageSize = async (newPageSize) => {
      await getYugiohDuelistsData(1, newPageSize);
    };

    const changeCurrentPage = async (newPage) => {
      currentPage.value = newPage;
      await getYugiohDuelistsData(currentPage.value, itemsPerPage.value);
    };

    onMounted(async () => {
      await getYugiohDuelistsData(currentPage.value, itemsPerPage.value);
    });

    return {
      heading,
      subheading,
      icon,
      currentPage,
      itemsPerPage,
      totalItems,
      totalPages,
      fields,
      items,
      onSearch,
      changePageSize,
      changeCurrentPage
    };
  },
});
</script>
