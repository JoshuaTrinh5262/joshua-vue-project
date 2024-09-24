<template>
  <div>
    <PageTitleComponent :heading="heading" :subheading="subheading" :icon="icon">
      <template #actions>
        <button type="button" @click="openModal" class="btn-shadow d-inline-flex align-items-center btn btn-primary">
          Create New
        </button>
        <ModalComponent title="Create New" :isOpen="showModal" @closeModal="closeModal">
          <template #body>
            <div class="position-relative form-group">
              <label for="name">Album Name</label>
              <input name="album_name" placeholder="Album Name" v-model="albumName" type="text" class="form-control" />
            </div>
            <div class="position-relative form-group">
              <label for="name">Release Date</label>
              <input type="date" name="release_date" placeholder="Album Release Date" v-model="albumDate"
                class="form-control" />
            </div>
          </template>
          <template #footer>
            <button @click="closeModal" class="btn btn-primary">Cancel</button>
            <button @click="createAlbum" class="btn btn-primary">Submit</button>
          </template>
        </ModalComponent>
      </template>
    </PageTitleComponent>

    <TableComponent :footer="true" :fields="fields" :items="items" @search="onSearchChange"></TableComponent>

    <PaginationComponent :currentPage="currentPage" :perPage="itemsPerPage" :totalItems="totalItems"
      :totalPages="totalPages" @load-page="loadPage" @change-page-size="changePageSize" />
  </div>
</template>

<script>
import { ref, onMounted, defineComponent } from 'vue';
import ModalComponent from '../../DemoPages/Components/ModalComponent.vue';
import TableComponent from '../../Layout/Components/TableComponent.vue';
import PageTitleComponent from '../../Layout/Components/PageTitleComponent.vue';
import PaginationComponent from '../../Layout/Components/PaginationComponent.vue';
import { supabase } from '../../supabase/supabase';

export default defineComponent({
  name: "AlbumsPage",

  components: {
    ModalComponent,
    TableComponent,
    PageTitleComponent,
    PaginationComponent
  },

  setup() {
    const showModal = ref(false);
    const heading = ref('Albums');
    const subheading = ref('Albums');
    const icon = ref('pe-7s-phone icon-gradient bg-premium-dark');
    const currentPage = ref(1);
    const itemsPerPage = ref(20);
    const totalItems = ref(0);
    const totalPages = ref(0);
    const albumName = ref('');
    const fields = ref([
      { key: 'id', value: 'ID' },
      { key: 'name', value: 'Name' },
    ]);
    const items = ref([]);

    const getAlbumsData = async (newPage, newPageSize) => {
      const start = (newPage - 1) * newPageSize;
      const end = start + newPageSize - 1;

      const { data, error } = await supabase
        .from('album')
        .select('*')
        .range(start, end);

      if (!error) {
        totalItems.value = data.length;
        items.value = data.map(item => ({
          ...item,
          album: item.album?.name,
          talent: item.talent?.name,
        }));
      }
    };

    const createAlbum = async () => {
      try {
        const { error } = await supabase
          .from('album')
          .insert([{ name: albumName.value }]);

        if (error) {
          console.error(`Error: ${error.message}`);
        } else {
          albumName.value = '';
          getAlbumsData(currentPage.value, itemsPerPage.value);
        }
      } catch (error) {
        console.error(`Unexpected error: ${error.message}`);
      }
    };

    const openModal = () => {
      showModal.value = true;
    };

    const closeModal = () => {
      showModal.value = false;
    };

    const loadPage = (page) => {
      currentPage.value = page;
      getAlbumsData(currentPage.value, itemsPerPage.value);
    };
    const onSearchChange = (searchTerm) => {
      search.value = searchTerm;
      getAlbumsData(1, itemsPerPage.value);
    };
    const changePageSize = async (newPageSize) => {
      itemsPerPage.value = newPageSize;
      await getAlbumsData(1, itemsPerPage.value);
    };

    onMounted(() => {
      getAlbumsData(currentPage.value, itemsPerPage.value);
    });

    return {
      showModal,
      heading,
      subheading,
      icon,
      albumName,
      fields,
      items,
      currentPage,
      itemsPerPage,
      totalItems,
      totalPages,
      openModal,
      closeModal,
      createAlbum,
      loadPage,
      changePageSize,
      getAlbumsData,
      onSearchChange,
    };
  }
});
</script>
