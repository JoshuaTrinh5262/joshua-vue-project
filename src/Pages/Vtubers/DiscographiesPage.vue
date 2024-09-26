<template>
  <div>
    <page-title-component :heading="heading" :subheading="subheading" :icon="icon">
      <template v-slot:actions>
        <button type="button" @click="openModal" class="btn-shadow d-inline-flex align-items-center btn btn-primary">
          Create New
        </button>
        <modal-component title="Create New Discography" :isOpen="showModal" @closeModal="closeModal">
          <template #body>
            <div class="position-relative form-group">
              <label for="discography_name">Discography Name</label>
              <input name="discography_name" id="discography_name" placeholder="Discography Name" type="text"
                class="form-control">
            </div>
            <div class="position-relative form-group">
              <label for="original_name">Original Name</label>
              <input name="original_name" id="original_name" placeholder="Original Name" type="text"
                class="form-control">
            </div>
            <div class="position-relative form-group">
              <label for="date_of_birth">Date Of Birth</label>
              <input name="date_of_birth" id="date_of_birth" placeholder="Date Of Birth" type="date"
                class="form-control">
            </div>
            <div class="position-relative form-group">
              <label for="album">Album</label>
              <select name="select" id="album" class="form-control" required>
                <option v-for="album in albums" :key="album.album_id" :value="album.album_id">
                  {{ album.name }}
                </option>
              </select>
            </div>
          </template>
          <template #footer>
            <button @click="closeModal" class="btn btn-primary">Cancel</button>
            <button @click="closeModal" class="btn btn-primary">Submit</button>
          </template>
        </modal-component>
      </template>
    </page-title-component>
    <table-component :footer="true" :fields="fields" :items="items"></table-component>
    <pagination-component :currentPage="currentPage" :perPage="itemsPerPage" :totalItems="totalItems"
      :totalPages="totalPages" @load-page="loadPage" @change-page-size="changePageSize">
    </pagination-component>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import ModalComponent from '../../DemoPages/Components/ModalComponent.vue';
import TableComponent from '../../Layout/Components/TableComponent.vue';
import PageTitleComponent from "../../Layout/Components/PageTitleComponent.vue";
import PaginationComponent from "../../Layout/Components/PaginationComponent.vue";
import { apiService } from '../../supabase/apiService';

export default {
  name: "DiscographiesPage",

  components: {
    ModalComponent,
    TableComponent,
    PageTitleComponent,
    PaginationComponent
  },

  setup() {
    const showModal = ref(false);
    const heading = ref('Discographies');
    const subheading = ref('Dive into the Musical Journeys of Talented Artists Across Generations');
    const icon = ref('pe-7s-phone icon-gradiant');
    const orderBy = ref('id');
    const orderDirection = ref('asc');
    const search = ref('');
    const currentPage = ref(1);
    const itemsPerPage = ref(20);
    const totalItems = ref(0);
    const totalPages = ref(0);
    const fields = ref([
      { key: 'id', value: 'ID' },
      { key: 'name', value: 'Name' },
      { key: 'original_name', value: 'original Name' },
      { key: 'released_date', value: 'Released Date' },
      { key: 'album', value: 'Album' },
    ]);
    const items = ref([]);
    const albums = ref([]);
    const openModal = () => {
      showModal.value = true;
    };

    const closeModal = () => {
      showModal.value = false;
    };

    const getDiscographiesData = async (newPage, newPageSize) => {
      const result = await apiService.getDiscographiesWithPaging(newPage, newPageSize, orderBy.value, orderDirection.value, search.value);
      if (!result.error) {
        items.value = result.items;
        totalItems.value = result.totalItems;
        totalPages.value = result.totalPages;
        itemsPerPage.value = newPageSize;
      } else {
        console.error('Error:', result.error);
      }
    };

    const getAlbumsData = async () => {
      const result = await apiService.getAlbums();
      albums.value = result;
    };

    const loadPage = (page) => {
      currentPage.value = page;
      getDiscographiesData(currentPage.value, itemsPerPage.value);
    };

    const changePageSize = async (newPageSize) => {
      itemsPerPage.value = newPageSize;
      await getDiscographiesData(1, itemsPerPage.value);
    };

    onMounted(() => {
      getDiscographiesData(currentPage.value, itemsPerPage.value);
      getAlbumsData();
    });

    return {
      showModal,
      heading,
      subheading,
      icon,
      orderBy,
      orderDirection,
      search,
      currentPage,
      itemsPerPage,
      totalItems,
      totalPages,
      fields,
      items,
      albums,
      openModal,
      closeModal,
      loadPage,
      changePageSize
    };
  }
};
</script>
