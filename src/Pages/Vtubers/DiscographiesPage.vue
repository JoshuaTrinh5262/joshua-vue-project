<template>
  <div>
    <page-title-component :heading="heading" :subheading="subheading" :icon="icon">
      <template v-slot:actions>
        <button type="button" @click="openModal" class="btn-shadow d-inline-flex align-items-center btn btn-primary">
          Create New
        </button>
        <modal-component title="Create New" :isOpen="showModal" @closeModal="closeModal">
          <template #body>
            <p>This is the content of the modal body.</p>
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
import { supabase } from '../../supabase/supabase';

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
    const icon = ref('pe-7s-phone icon-gradient bg-premium-dark');
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

    const openModal = () => {
      showModal.value = true;
    };

    const closeModal = () => {
      showModal.value = false;
    };

    const getDiscographiesData = async (newPage, newPageSize) => {
      const start = (newPage - 1) * newPageSize;
      const end = start + newPageSize - 1;

      const { data, error } = await supabase
        .from('discography')
        .select('*, album(name), talent(name)')
        .range(start, end);

      if (!error) {
        totalItems.value = data.length;
        const transformedData = data.map(item => ({
          ...item,
          album: item.album?.name,
          talent: item.talent?.name,
        }));
        items.value = transformedData;
      }
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
    });

    return {
      showModal,
      heading,
      subheading,
      icon,
      currentPage,
      itemsPerPage,
      totalItems,
      totalPages,
      fields,
      items,
      openModal,
      closeModal,
      loadPage,
      changePageSize
    };
  }
};
</script>
