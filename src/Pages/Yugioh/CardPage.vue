<template>
  <div>
    <page-title-component :heading=heading :subheading=subheading :icon=icon></page-title-component>
    <tabs-component>
      <tab-component title="Card">
        <table-component :footer=true :fields="fields" :items="items" @search="onSearch">
        </table-component>
        <pagination-component :currentPage="currentPage" :perPage="itemsPerPage" :totalItems="totalItems"
          :totalPages="totalPages" @load-page="changeCurrentPage"
          @change-page-size="changePageSize"></pagination-component>
      </tab-component>
      <tab-component :title="`No Passcode Card`">
        <table-component :footer=true :fields="fields" :items="items_b" @search="onSearch">
        </table-component>
      </tab-component>
    </tabs-component>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import PageTitleComponent from "@/Layout/Components/PageTitleComponent.vue";
import TableComponent from "@/Layout/Components/TableComponent.vue";
import PaginationComponent from "@/Layout/Components/PaginationComponent.vue";
import ModalComponent from "@/Layout/Components/ModalComponent.vue";
import ButtonSpinner from "@/Layout/Components/ButtonSpinner.vue";
import TabComponent from "@/Layout/Components/Tabs/TabComponent.vue";
import TabsComponent from "@/Layout/Components/Tabs/TabsComponent.vue";
import { apiService } from "@/supabase/apiService";

export default defineComponent({
  name: "YugiohCardPage",

  components: {
    PageTitleComponent,
    TableComponent,
    PaginationComponent,
    ModalComponent,
    ButtonSpinner,
    TabComponent,
    TabsComponent
  },

  setup() {
    const heading = ref("Yu-Gi-Oh Card");
    const subheading = ref("Yu-Gi-Oh Card page");
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
        key: "passcode",
        value: "Passcode"
      },
      {
        key: "name",
        value: "Name"
      },
      {
        key: "icon",
        value: "Properties"
      },
      {
        key: "category",
        value: "Category"
      },
      {
        key: "type",
        value: "Type"
      },
      {
        key: "attribute",
        value: "Attribute"
      },
    ]);
    const items = ref([]);
    const items_b = ref([]);

    const onSearch = (newSearchTerm) => {
      search.value = newSearchTerm;
      getYugiohCardsData(1, itemsPerPage.value);
    };

    const getYugiohCardsData = async (newPage, newPageSize) => {
      const result = await apiService.getYugiohCardsWithPaging(newPage, newPageSize, orderBy.value, orderDirection.value, search.value);
      if (!result.error) {
        items.value = result.items;
        totalItems.value = result.totalItems;
        totalPages.value = result.totalPages;
        itemsPerPage.value = newPageSize;
      }
    };

    const getNullPasscodeCards = async () => {
      const result = await apiService.getNullPasscodeCards();
      if (!result.error) {
        items_b.value = result;
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
      await getNullPasscodeCards();
      await getYugiohCardsData(currentPage.value, itemsPerPage.value);
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
      items_b,
      onSearch,
      changePageSize,
      changeCurrentPage
    };
  },
});
</script>
