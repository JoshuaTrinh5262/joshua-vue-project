<template>
  <div>
      <page-title-component :heading=heading :subheading=subheading :icon=icon></page-title-component>
      <table-component
        :footer=true
        :fields="fields"
        :items="items"></table-component>
        <pagination-component
            :currentPage="currentPage"
            :perPage="itemsPerPage"
            :totalItems="totalItems"
            :totalPages="totalPages"
          ></pagination-component>
  </div>
</template>
<script>
import axios from 'axios';
import TableComponent from '../../Layout/Components/TableComponent.vue';
import PageTitleComponent from "../../Layout/Components/PageTitleComponent.vue";
import PaginationComponent from "../../Layout/Components/PaginationComponent.vue";

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
                    key:'id',
                    value:'Id'
                },
                {
                    key:'first_name',
                    value:'First Name'
                },
                {
                    key:'middle_name',
                    value:'Middle Name'
                },
                {
                    key:'last_name',
                    value:'Last Name'
                },
            ],
      items: [],
    }
  },

  created() {
        this.getUsersData(this.currentPage, this.itemsPerPage);
    },

  methods: {
    getUsersData(newPage, newPageSize) {
      axios.get('http://127.0.0.1:5000/api/users', {
          params: {
              page: newPage,
              pagesize: newPageSize,
          },
      })
      .then(response => {
          this.items = response.data.data;
          this.currentPage = response.data.current_page;
          this.totalPages = response.data.total_pages;
          this.totalItems = response.data.total_items;
      })
      .catch(error => {
          console.error(error);
      });
    },
  }
};
</script>