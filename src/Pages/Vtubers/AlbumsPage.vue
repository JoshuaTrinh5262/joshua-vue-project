<template>
  <div>
    <page-title-component :heading=heading :subheading=subheading :icon=icon>
      <template v-slot:actions>
        <button type="button" @click=openModal class="btn-shadow d-inline-flex align-items-center btn btn-primary">
          Create New
        </button>
        <modal-component title="Create New" :isOpen="showModal" @closeModal="closeModal">
          <template #body>
              <div class="position-relative form-group">
                <label for="name">Albumn Name</label>
                <input name="album_name" placeholder="Albumn Name" v-model="albumName" type="text" class="form-control">
              </div>
          </template>
          <template #footer>
            <button @click="closeModal" class="btn btn-primary">Cancel</button>
            <button @click="createAlbum" class="btn btn-primary">Submit</button>
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
  name: "AlbumsPage",

  components: {
    ModalComponent,
    TableComponent,
    PageTitleComponent,
    PaginationComponent
  },

  data() {
    return {
      showModal: false,
      heading: 'Albums',
      subheading: 'Albums',
      icon: 'pe-7s-phone icon-gradient bg-premium-dark',
      currentPage: 1,
      itemsPerPage: 20,
      totalItems: 0,
      totalPages: 0,
      albumName: '',
      fields: [
        {
          key: 'id',
          value: 'id'
        },
        {
          key: 'name',
          value: 'name'
        },
      ],
      items: [],
    }
  },

  created() {
    this.getAlbumsData(this.currentPage, this.itemsPerPage);
  },

  methods: {
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    async getAlbumsData(newPage, newPageSize) {
      const start = (newPage - 1) * newPageSize;
      const end = start + newPageSize - 1;

      const { data, error } = await supabase
        .from('album')
        .select('*')
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

    async createAlbum() {
      try {
        const { error } = await supabase
          .from('album')
          .insert([{ name: this.albumName }]);

        if (error) {
          this.errorMessage = `Error: ${error.message}`;
        } else {
          this.talentName = '';
        }
        this.getAlbumsData(this.currentPage, this.itemsPerPage);
        this.albumName = '';
      } catch (error) {
        this.errorMessage = `Unexpected error: ${error.message}`;
      }
    },

    async handleChangeOrder({ orderDirection, orderBy }) {
        this.orderDirection = orderDirection;
        this.orderBy = orderBy;

        await this.getAlbumsData(this.currentPage, this.itemsPerPage);
      },
      loadPage(page) {
        this.currentPage = page;
        this.getAlbumsData(this.currentPage, this.itemsPerPage);
      },

    async changePageSize(newPageSize) {
        this.itemsPerPage = newPageSize;
        await this.getAlbumsData(1, this.itemsPerPage);
      },
    },
  }
</script>