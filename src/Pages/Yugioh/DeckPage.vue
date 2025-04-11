<template>
  <div>
    <page-title-component
      :heading="heading"
      :subheading="subheading"
      :icon="icon"
    >
      <template v-slot:actions>
        <button
          @click="toggleModal('import')"
          type="button"
          class="btn btn-info mr-2"
        >
          Import
        </button>
        <button
          @click="toggleModal('export')"
          type="button"
          class="btn btn-info"
        >
          Export
        </button>
      </template>
    </page-title-component>
    <deck-import-component
      :showModal="isImport"
      @closeModal="closeImportModal()"
    ></deck-import-component>
    <deck-export-component :showModal="isExport"></deck-export-component>
    <table-component
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
import PageTitleComponent from "../../Layout/Components/PageTitleComponent.vue";
import TableComponent from "../../Layout/Components/TableComponent.vue";
import PaginationComponent from "../../Layout/Components/PaginationComponent.vue";
import ModalComponent from "../../Layout/Components/ModalComponent.vue";
import ButtonSpinner from "../../Layout/Components/ButtonSpinner.vue";
import { apiService } from "../../supabase/apiService";
import DeckImportComponent from "./Component/DeckImportComponent.vue";
import DeckExportComponent from "./Component/DeckExportComponent.vue";

export default defineComponent({
  name: "YugiohDeckPage",

  components: {
    PageTitleComponent,
    TableComponent,
    PaginationComponent,
    ModalComponent,
    ButtonSpinner,
    DeckImportComponent,
    DeckExportComponent,
  },

  setup() {
    const heading = ref("Yu-Gi-Oh Deck");
    const subheading = ref("Yu-Gi-Oh Deck page");
    const icon = ref("pe-7s-portfolio icon-gradient bg-tempting-azure");

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
    ]);
    const items = ref([]);
    const isImport = ref(false);
    const isExport = ref(false);

    const onSearch = (newSearchTerm) => {
      search.value = newSearchTerm;
      getYugiohDecksData(1, itemsPerPage.value);
    };

    const getYugiohDecksData = async (newPage, newPageSize) => {
      const result = await apiService.getYugiohDecksWithPaging(
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
      await getYugiohDecksData(1, newPageSize);
    };

    const changeCurrentPage = async (newPage) => {
      currentPage.value = newPage;
      await getYugiohDecksData(currentPage.value, itemsPerPage.value);
    };

    onMounted(async () => {
      await getYugiohDecksData(currentPage.value, itemsPerPage.value);
    });

    const toggleModal = (modalType) => {
      switch (modalType) {
        case "import":
          isImport.value = true;
          break;
        case "export":
          isExport.value = true;
          break;
      }
    };
    const closeImportModal = () => {
      isImport.value = false;
    };
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
      isExport,
      isImport,
      onSearch,
      changePageSize,
      changeCurrentPage,
      toggleModal,
      closeImportModal,
    };
  },
});
</script>
