<template>
  <div>
    <page-title-component :heading="heading" :subheading="subheading" :icon="icon">
      <template v-slot:actions>
        <button type="button" @click="toggleModal" class="btn-shadow d-inline-flex align-items-center btn btn-primary">
          Create New
        </button>
      </template>
    </page-title-component>

    <NotificationComponent v-model:notification="notification"></NotificationComponent>

    <modal-component :title="isUpdateMode ? 'Update Agency' : 'Add New Agency'" :isOpen="showModal"
      @closeModal="toggleModal">
      <template #body>
        <div class="position-relative form-group">
          <label for="agency_name">Agency Name</label>
          <input name="agency_name" id="agency_name" placeholder="Agency Name" type="text"
            v-model="currentAgency.agency_name" class="form-control">
        </div>
        <div class="position-relative form-group">
          <label for="agency_status">Agency Status</label>
          <input name="agency_status" id="agency_status" placeholder="Agency Status" type="text"
            v-model="currentAgency.agency_status" class="form-control">
        </div>
        <div class="position-relative form-group">
          <label for="agency_description">Agency Description</label>
          <textarea name="agency_description" id="agency_description" placeholder="Agency Description" type="text"
            v-model="currentAgency.agency_description" class="form-control"></textarea>
        </div>
      </template>
      <template #footer>
        <button class="btn btn-primary" @click="toggleModal">Cancel</button>
        <button-spinner :isLoading="onSubmit" buttonClass="btn btn-primary" @click="handleSubmit"
          :normalText="isUpdateMode ? 'Update Agency' : 'Add New Agency'" />
      </template>
    </modal-component>

    <AgencyTable @updateRow="handleUpdate"></AgencyTable>

    <table-component :footer="true" :fields="fields" :items="items" @search="onSearchChange"
      @changeOrder="handleChangeOrder" @deleteRow="handleDelete" @updateRow="handleUpdate"></table-component>

    <pagination-component :currentPage="currentPage" :perPage="itemsPerPage" :totalItems="totalItems"
      :totalPages="totalPages" @load-page="loadPage" @change-page-size="changePageSize">
    </pagination-component>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, reactive } from 'vue';
import ModalComponent from '../../Layout/Components/ModalComponent.vue';
import TableComponent from '../../Layout/Components/TableComponent.vue';
import NotificationComponent from '../../Layout/Components/NotificationComponent.vue';
import PageTitleComponent from '../../Layout/Components/PageTitleComponent.vue';
import PaginationComponent from '../../Layout/Components/PaginationComponent.vue';
import ButtonSpinner from "../../Layout/Components/ButtonSpinner.vue";
import AgencyTable from "../../Pages/Vtubers/Table/AgencyTable.vue";

import { apiService } from '../../supabase/apiService';

export default defineComponent({
  name: "AgenciesPage",

  components: {
    ModalComponent,
    TableComponent,
    PageTitleComponent,
    PaginationComponent,
    NotificationComponent,
    ButtonSpinner,
    AgencyTable
  },

  setup() {
    const heading = ref('Agencies');
    const subheading = ref('Explore the Profiles of Emerging and Established Agencys.');
    const icon = ref('pe-7s-home icon-gradient bg-premium-dark');

    const isUpdateMode = ref(false);
    const showModal = ref(false);
    const onSubmit = ref(false);
    const orderBy = ref('agency_id');
    const orderDirection = ref('asc');
    const currentPage = ref(1);
    const itemsPerPage = ref(20);
    const totalItems = ref(0);
    const totalPages = ref(0);
    const search = ref('');
    const notification = ref(null);
    const currentAgency = reactive({
      agency_name: null,
      agency_status: null,
      agency_description: null
    });

    const fields = [
      {
        key: 'id',
        value: 'Id'
      },
      {
        key: 'agency_name',
        value: 'Agency Name'
      },
      {
        key: 'talent_count',
        value: 'Agency Count'
      },
    ];
    const items = ref([]);

    const toggleModal = () => {
      isUpdateMode.value = false;
      cleanCurrentAgency();
      showModal.value = !showModal.value;
    };

    const getAgenciesData = async (newPage, newPageSize) => {
      const response = await apiService.getAgenciesWithPaging(newPage, newPageSize, orderBy.value, orderDirection.value, search.value);

      if (!response.error) {
        items.value = response.items;
        totalItems.value = response.totalItems;
        totalPages.value = response.totalPages;
        itemsPerPage.value = newPageSize;
      }
    };

    const handleSubmit = async () => {
      onSubmit.value = true;
      if (isUpdateMode.value) {
        updateAgency();
      } else {
        createAgency();
      }
    };

    const createAgency = async () => {
      try {
        await apiService.createAgency(currentAgency);
        cleanCurrentAgency();
        toggleModal();
        onSubmit.value = false;
        notification.value = { title: 'Success', content: 'Agency created successfully!', type: 'success' };
        getAgenciesData(currentPage.value, itemsPerPage.value);
      } catch (error) {
        onSubmit.value = false;
        notification.value = { title: 'Error', content: `Error when submitting talent: ${error}`, type: 'danger' };
      }
    }

    const updateAgency = async () => {
      try {
        await apiService.updateAgency(currentAgency);
        cleanCurrentAgency();
        toggleModal();
        onSubmit.value = false;
        notification.value = {
          title: 'Success',
          content: 'Agency updated successfully!',
          type: 'success',
        };
        getAgenciesData(currentPage.value, itemsPerPage.value);
        isUpdateMode.value = false;
      } catch (error) {
        onSubmit.value = false;
        notification.value = {
          title: 'Error',
          content: `Error when updating Agency: ${error}`,
          type: 'danger',
        };
        isUpdateMode.value = false;
      }
    };

    const handleUpdate = (updateId) => {
      isUpdateMode.value = true;
      // Create a new object, excluding `talent` and `talent_count`
      const { talent, talent_count, ...selectedItem } = items.value.find(x => x.id === updateId);

      if (selectedItem) {

        Object.assign(currentAgency, selectedItem);
      }

      showModal.value = true;
    };

    const handleDelete = async (id) => {
      const confirmDelete = confirm(`Are you sure you want to delete Agency ${id}?`);
      if (confirmDelete) {
        try {
          await apiService.deleteAgency(id);
          notification.value = { title: 'Success', content: 'Agency deleted successfully!', type: 'success' };
          getAgenciesData(1, itemsPerPage.value);
        } catch (error) {
          notification.value = { title: 'Error', content: `Error when deleting talent: ${error}`, type: 'danger' };
        }
      }
    };

    const cleanCurrentAgency = () => {
      Object.assign(currentAgency, {
        agency_name: null,
        agency_status: null,
        agency_description: null,
      });

      if (currentAgency.id) {
        delete currentAgency.id;
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

    const handleChangeOrder = ({ orderDirection: newOrderDirection, orderBy: newOrderBy }) => {
      orderDirection.value = newOrderDirection;
      orderBy.value = newOrderBy;
      getAgenciesData(currentPage.value, itemsPerPage.value);
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
      isUpdateMode,
      onSubmit,
      currentPage,
      itemsPerPage,
      totalItems,
      totalPages,
      fields,
      items,
      currentAgency,
      notification,
      toggleModal,
      loadPage,
      changePageSize,
      onSearchChange,
      handleChangeOrder,
      handleSubmit,
      handleDelete,
      handleUpdate,
      createAgency,
      updateAgency,
    };
  }
});
</script>
