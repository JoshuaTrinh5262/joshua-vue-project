<template>
  <div>
    <page-title-component :heading="heading" :subheading="subheading" :icon="icon">
      <template v-slot:actions>
        <button type="button" @click="openModal" class="btn-shadow d-inline-flex align-items-center btn btn-primary">
          Create New
        </button>
        <modal-component title="Create New Agency" :isOpen="showModal" @closeModal="closeModal">
          <template #body>
            <div class="position-relative form-group">
              <label for="agency_name">Agency Name</label>
              <input name="agency_name" id="agency_name" placeholder="Agency Name" type="text" v-model="newAgency.name"
                class="form-control">
            </div>
            <div class="position-relative form-group">
              <label for="agency_description">Agency Description</label>
              <textarea name="agency_description" id="agency_description" placeholder="Agency Description" type="text"
                v-model="newAgency.description" class="form-control"></textarea>
            </div>
          </template>
          <template #footer>
            <button class="btn btn-primary" @click="closeModal">Cancel</button>
            <button class="btn btn-primary" @click="closeModal">Submit</button>
          </template>
        </modal-component>
      </template>
    </page-title-component>

    <table-component :footer="true" :fields="fields" :items="items" @search="onSearchChange"></table-component>

    <pagination-component :currentPage="currentPage" :perPage="itemsPerPage" :totalItems="totalItems"
      :totalPages="totalPages" @load-page="loadPage" @change-page-size="changePageSize">
    </pagination-component>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import ModalComponent from '../../DemoPages/Components/ModalComponent.vue';
import TableComponent from '../../Layout/Components/TableComponent.vue';
import PageTitleComponent from '../../Layout/Components/PageTitleComponent.vue';
import PaginationComponent from '../../Layout/Components/PaginationComponent.vue';
import { apiService } from '../../supabase/apiService';

export default defineComponent({
  name: "AgenciesPage",

  components: {
    ModalComponent,
    TableComponent,
    PageTitleComponent,
    PaginationComponent
  },

  setup() {
    const showModal = ref(false);
    const heading = 'Agencies';
    const subheading = 'Explore the Profiles of Emerging and Established Talents.';
    const icon = 'pe-7s-user';
    const orderBy = ref('agency_id');
    const orderDirection = ref('asc');
    const currentPage = ref(1);
    const itemsPerPage = ref(20);
    const totalItems = ref(0);
    const totalPages = ref(0);
    const search = ref('');
    const notification = ref(null);
    const newAgency = ref({ name: null, description: null });
    const fields = [
      {
        key: 'agency_id',
        value: 'Id'
      },
      {
        key: 'agency_name',
        value: 'Agency Name'
      },
      {
        key: 'talent_count',
        value: 'Talent Count'
      },
    ];
    const items = ref([]);

    const openModal = () => {
      showModal.value = true;
    };

    const closeModal = () => {
      showModal.value = false;
    };

    const getAgenciesData = async (newPage, newPageSize) => {
      const result = await apiService.getAgenciesWithPaging(newPage, newPageSize, orderBy.value, orderDirection.value, search.value);

      if (!result.error) {
        items.value = result.items;
        totalItems.value = result.totalItems;
        totalPages.value = result.totalPages;
        itemsPerPage.value = newPageSize;
      }
    };

    const loadPage = (page) => {
      currentPage.value = page;
      getAgenciesData(currentPage.value, itemsPerPage.value);
    };

    const onSearchChange = (searchTerm) => {
      search.value = searchTerm;
      getAgenciesData(1, itemsPerPage.value);
    };
    const changePageSize = async (newPageSize) => {
      itemsPerPage.value = newPageSize;
      await getAgenciesData(1, itemsPerPage.value);
    };

    onMounted(() => {
      getAgenciesData(currentPage.value, itemsPerPage.value);
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
      newAgency,
      notification,
      openModal,
      closeModal,
      loadPage,
      changePageSize,
      onSearchChange,
    };
  }
});
</script>
