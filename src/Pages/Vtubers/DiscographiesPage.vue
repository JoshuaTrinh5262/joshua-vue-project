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
  name: "DiscographiesPage",

  components: {
    ModalComponent,
    TableComponent,
    PageTitleComponent,
    PaginationComponent
  },

  data() {
    return {
      showModal: false,
      heading: 'Discographies',
      subheading: 'Explore the Profiles of Emerging and Established Talents.',
      icon: 'pe-7s-phone icon-gradient bg-premium-dark',
      currentPage: 1,
      itemsPerPage: 20,
      totalItems: 0,
      totalPages: 0,
      fields: [
        {
          key: 'id',
          value: 'id'
        },
        {
          key: 'name',
          value: 'name'
        },
        {
          key: 'original_name',
          value: 'original_name'
        },
        {
          key: 'talent',
          value: 'talent'
        },
        {
          key: 'album',
          value: 'album'
        },
      ],
      items: [],
    }
  },

  created() {
    this.getDiscographiesData(this.currentPage, this.itemsPerPage);
  },

  methods: {
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    async getDiscographiesData(newPage, newPageSize) {
      const start = (newPage - 1) * newPageSize;
      const end = start + newPageSize - 1;

      const { data, error } = await supabase
        .from('discography')
        .select('*, album(name), talent(name)')
        .range(start, end);

      if (!error) {
        this.totalItems = data.length;
        const transformedData = data.map(item => ({
          ...item,
          album: item.album?.name,
          talent: item.talent?.name,
        }));
        this.items = transformedData;
      }
    },

    async handleChangeOrder({ orderDirection, orderBy }) {
      this.orderDirection = orderDirection;
      this.orderBy = orderBy;

      await this.getDiscographiesData(this.currentPage, this.itemsPerPage);
    },
    loadPage(page) {
      this.currentPage = page;
      this.getDiscographiesData(this.currentPage, this.itemsPerPage);
    },

    async changePageSize(newPageSize) {
      this.itemsPerPage = newPageSize;
      await this.getDiscographiesData(1, this.itemsPerPage);
    },
  },
}
</script>