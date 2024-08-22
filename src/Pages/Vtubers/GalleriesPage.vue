<template>
  <div>
    <div>
    <button @click="openModal">Open Modal</button>

    <modal-component :isOpen="showModal" @closeModal="closeModal" >
      <template #body>
        <p>This is the content of the modal body.</p>
      </template>
      <template #footer>
        <button @click="doSomething">Cancel</button>
        <button @click="doSomething">Cancel</button>
      </template></modal-component>
  </div>
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
import ModalComponent from '../../DemoPages/Components/ModalComponent.vue';
import TableComponent from '../../Layout/Components/TableComponent.vue';
import PaginationComponent from "../../Layout/Components/PaginationComponent.vue";
import { supabase } from '../../supabase/supabase';

export default {
  name: "GalleriesPage",

  components: {
    ModalComponent,
    TableComponent,
    PaginationComponent
  },

  data() {
    return {
      showModal:false,
      currentPage: 1,
      itemsPerPage: 20,
      totalItems: 0,
      totalPages: 0,
      fields: [
                {
                    key:'agency_id',
                    value:'agency_id'
                },
                {
                    key:'agency_name',
                    value:'agency_name'
                },
                {
                    key:'description',
                    value:'description'
                },
            ],
      items: [],
    }
  },

  created() {
        this.getAgenciesData(this.currentPage, this.itemsPerPage);
    },

  methods: {
    openModal() {
      console.log("open");
      this.showModal = true;
    },
    closeModal() {
      console.log("close");
      this.showModal = false;
    },
     async getAgenciesData(newPage, newPageSize) {
      const start = (newPage- 1) * newPageSize;
      const end = start + newPageSize - 1;

      const { data, error } = await supabase
        .from('agency')
        .select('*')
        .range(start, end);

        if (!error) {
          this.totalItems = data.length;
          this.items = data;
        }
      },

      async handleChangeOrder({ orderDirection, orderBy }) {
          this.orderDirection = orderDirection;
          this.orderBy = orderBy;

          await this.getAgenciesData(this.currentPage, this.itemsPerPage);
      },
        loadPage(page) {
          this.currentPage = page;
            this.getAgenciesData(this.currentPage, this.itemsPerPage);
      },

      async changePageSize(newPageSize) {
          this.itemsPerPage = newPageSize;
          await this.getAgenciesData(1, this.itemsPerPage);
      },
    },
  }
</script>