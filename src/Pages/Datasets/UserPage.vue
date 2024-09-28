<template>
  <div>
    <page-title-component :heading=heading :subheading=subheading :icon=icon></page-title-component>

    <table-component :footer=true :fields="fields" :items="items"></table-component>

    <pagination-component :currentPage="currentPage" :perPage="itemsPerPage" :totalItems="totalItems"
      :totalPages="totalPages"></pagination-component>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import TableComponent from "../../Layout/Components/TableComponent.vue";
import PageTitleComponent from "../../Layout/Components/PageTitleComponent.vue";
import PaginationComponent from "../../Layout/Components/PaginationComponent.vue";
import { apiService } from "../../supabase/apiService";

export default defineComponent({
  name: "UserPage",

  components: {
    PageTitleComponent,
    TableComponent,
    PaginationComponent
  },

  setup() {
    const heading = ref("User");
    const subheading = ref("User");
    const icon = ref("pe-7s-users icon-gradient bg-premium-dark");

    const currentPage = ref(0);
    const itemsPerPage = ref(20);
    const totalItems = ref(0);
    const totalPages = ref(0);
    const fields = ref([
      {
        key: "id",
        value: "Id"
      },
      {
        key: "email",
        value: "email"
      },
      {
        key: "last_sign_in_at",
        value: "last Sign In"
      },
    ]);
    const items = ref([]);

    const getUsersData = async (newPage, newPageSize) => {
      const result = await apiService.getAuthUsers(newPage, newPageSize);
      if (!result.error) {
        items.value = result.items;
        totalItems.value = result.totalItems;
        totalPages.value = result.totalPages;
        itemsPerPage.value = newPageSize;
      }
    };

    onMounted(() => {
      getUsersData(currentPage.value, itemsPerPage.value);
    });

    return {
      currentPage,
      itemsPerPage,
      totalItems,
      totalPages,
      fields,
      items,
      heading,
      subheading,
      icon,
    };
  },
});
</script>