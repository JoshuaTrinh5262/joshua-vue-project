<template>
  <div>
      <table-component
        :footer=true
        :fields="fields"
        :items="items"></table-component>
        <pagination-component
            :currentPage="currentPage"
            :perPage="itemsPerPage"
            :totalItems="totalItems"
            :totalPages="totalPages"
            @load-page="loadPage"
            @change-page-size="changePageSize"
          ></pagination-component>
  </div>
</template>
<script>
import TableComponent from '../../Layout/Components/TableComponent.vue';
import PaginationComponent from "../../Layout/Components/PaginationComponent.vue";
import { supabase } from '../../supabase/supabase';

export default {
  name: "TalentsPage",

  components: {
      TableComponent,
      PaginationComponent
  },

  data() {
    return {
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
                    key:'name',
                    value:'Name'
                },
                {
                    key:'original_name',
                    value:'original name'
                },
                {
                    key:'debut_date',
                    value:'debut date'
                },
            ],
      items: [],
    }
  },

  created() {
        this.getTalentsData(this.currentPage, this.itemsPerPage);
    },

  methods: {
     async getTalentsData(newPage, newPageSize) {
      const start = (newPage- 1) * newPageSize;
      const end = start + newPageSize - 1;

      const { data, count, error } = await supabase
        .from('talent')
        .select('*', { count: 'exact' })
        .range(start, end);

        if (!error) {
          this.totalItems = count;
          this.items = data;
          this.totalPages = Math.ceil(count / newPageSize);
        }
      },

      async handleChangeOrder({ orderDirection, orderBy }) {
          this.orderDirection = orderDirection;
          this.orderBy = orderBy;

          await this.getTalentsData(this.currentPage, this.itemsPerPage);
      },
        loadPage(page) {
          this.currentPage = page;
          this.getTalentsData(this.currentPage, this.itemsPerPage);
      },

      async changePageSize(newPageSize) {
          this.itemsPerPage = newPageSize;
          await this.getTalentsData(1, this.itemsPerPage);
      },
    },
  }
</script>