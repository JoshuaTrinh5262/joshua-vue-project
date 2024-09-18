<template>
  <div>
    <page-title-component :heading=heading :subheading=subheading :icon=icon></page-title-component>
    <table-component :footer=true :fields="fields" :items="items"></table-component>
    <pagination-component :currentPage="currentPage" :perPage="itemsPerPage" :totalItems="totalItems"
      :totalPages="totalPages"></pagination-component>
  </div>
</template>
<script>
import TableComponent from '../../Layout/Components/TableComponent.vue';
import PageTitleComponent from "../../Layout/Components/PageTitleComponent.vue";
import PaginationComponent from "../../Layout/Components/PaginationComponent.vue";
import { apiService } from '../../supabase/apiService';

export default {
  name: "UserPage",

  components: {
    PageTitleComponent,
    TableComponent,
    PaginationComponent
  },

  data() {
    return {
      heading: 'User',
      subheading: 'User.',
      icon: 'pe-7s-phone icon-gradient bg-premium-dark',
      currentPage: 1,
      itemsPerPage: 20,
      totalItems: 0,
      totalPages: 0,
      fields: [
        {
          key: 'id',
          value: 'Id'
        },
        {
          key: 'email',
          value: 'email'
        },
        {
          key: 'last_sign_in_at',
          value: 'last Sign In'
        },
      ],
      items: [],
    }
  },

  created() {
    this.getUsersData(this.currentPage, this.itemsPerPage);
  },

  methods: {
    async getUsersData(newPage, newPageSize) {
      const result = await apiService.getAuthUsers(newPage, newPageSize)
      if (!result.error) {
        this.items = result.items;
        this.totalItems = result.totalItems;
        this.totalPages = result.totalPages;
        this.itemsPerPage = newPageSize;
      } else {
        console.error('Error:', result.error);
      }
    },
  }
};
</script>