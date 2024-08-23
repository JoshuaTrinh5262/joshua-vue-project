<template>
  <div>
    <page-title-component :heading=heading :subheading=subheading :icon=icon>
      <template v-slot:actions>
        <button type="button" @click=openModal class="btn-shadow d-inline-flex align-items-center btn btn-primary">
          Create New
        </button>
        <modal-component title="Create New" :isOpen="showModal" @closeModal="closeModal">
          <template #body>
            <p>This is the content of the modal body.</p>
          </template>
          <template #footer>
            <button @click="closeModal">Cancel</button>
            <button @click="closeModal">Submit</button>
          </template>
        </modal-component>
      </template>
    </page-title-component>
    <table-component :footer=true :fields="fields" :items="items"></table-component>
    <pagination-component :currentPage="currentPage" :perPage="itemsPerPage" :totalItems="totalItems"
      :totalPages="totalPages" @load-page="loadPage" @change-page-size="changePageSize"></pagination-component>
  </div>
</template>
<script>
import ModalComponent from '../../DemoPages/Components/ModalComponent.vue';
import TableComponent from '../../Layout/Components/TableComponent.vue';
import PageTitleComponent from "../../Layout/Components/PageTitleComponent.vue";
import PaginationComponent from "../../Layout/Components/PaginationComponent.vue";
import { supabase } from '../../supabase/supabase';

export default {
  name: "AgenciesPage",

  components: {
    ModalComponent,
    TableComponent,
    PageTitleComponent,
    PaginationComponent
  },

  data() {
    return {
      showModal: false,
      heading: 'Agencies',
      subheading: 'Explore the Profiles of Emerging and Established Talents.',
      icon: 'pe-7s-user icon-gradient bg-premium-dark',
      currentPage: 1,
      itemsPerPage: 20,
      totalItems: 0,
      totalPages: 0,
      fields: [
        {
          key: 'agency_id',
          value: 'agency_id'
        },
        {
          key: 'agency_name',
          value: 'agency_name'
        },
        {
          key: 'description',
          value: 'description'
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
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    async getAgenciesData(newPage, newPageSize) {
      const start = (newPage - 1) * newPageSize;
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