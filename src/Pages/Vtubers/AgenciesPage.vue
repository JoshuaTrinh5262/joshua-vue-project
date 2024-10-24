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
          <small v-if="validationErrors.agency_name" class="text-danger">{{ validationErrors.agency_name }}</small>

        </div>
        <div class="position-relative form-group">
          <label for="agency_status">Agency Status</label>
          <input name="agency_status" id="agency_status" placeholder="Agency Status" type="text"
            v-model="currentAgency.agency_status" class="form-control">
        </div>
        <div class="position-relative form-group">
          <label for="agency_description">Agency Description</label>
          <textarea rows="5" name="agency_description" id="agency_description" placeholder="Agency Description"
            type="text" v-model="currentAgency.agency_description" class="form-control"></textarea>
        </div>
      </template>
      <template #footer>
        <button class="btn btn-primary" @click="toggleModal">Cancel</button>
        <button-spinner :isLoading="onSubmit" buttonClass="btn btn-primary" @click="handleSubmit"
          :normalText="isUpdateMode ? 'Update Agency' : 'Add New Agency'" />
      </template>
    </modal-component>
    <AgencyTable ref="agencyTable" @handleUpdate="handleUpdateClick"></AgencyTable>
  </div>
</template>

<script>
import { defineComponent, ref, reactive } from 'vue';
import ModalComponent from '../../Layout/Components/ModalComponent.vue';
import TableComponent from '../../Layout/Components/TableComponent.vue';
import NotificationComponent from '../../Layout/Components/NotificationComponent.vue';
import PageTitleComponent from '../../Layout/Components/PageTitleComponent.vue';
import ButtonSpinner from "../../Layout/Components/ButtonSpinner.vue";
import AgencyTable from "../../Pages/Vtubers/Table/AgencyTable.vue";
import { validateAgencyForm } from '../../utils/validations';
import { apiService } from '../../supabase/apiService';

export default defineComponent({
  name: "AgenciesPage",

  components: {
    ModalComponent,
    TableComponent,
    PageTitleComponent,
    NotificationComponent,
    ButtonSpinner,
    AgencyTable
  },

  setup() {
    const heading = ref('Agencies');
    const subheading = ref('Explore the Profiles of Emerging and Established Agencys.');
    const icon = ref('pe-7s-home icon-gradient bg-premium-dark');
    const agencyTable = ref(null);
    const isUpdateMode = ref(false);
    const showModal = ref(false);
    const onSubmit = ref(false);
    const currentPage = ref(1);
    const itemsPerPage = ref(20);
    const totalItems = ref(0);
    const totalPages = ref(0);
    const notification = ref(null);
    const currentAgency = reactive({
      agency_name: null,
      agency_status: null,
      agency_description: null
    });
    const validationErrors = ref({});

    const toggleModal = () => {
      isUpdateMode.value = false;
      cleanCurrentAgency();
      showModal.value = !showModal.value;
    };

    const reloadTable = () => {
      if (agencyTable.value) {
        agencyTable.value.getAgenciesData();
      }
    };
    const handleSubmit = async () => {
      onSubmit.value = true;
      validationErrors.value = validateAgencyForm(currentAgency);
      if (Object.keys(validationErrors.value).length === 0) {
        if (isUpdateMode.value) {
          updateAgency();
        } else {
          createAgency();
        }
      } else {
        onSubmit.value = false;
        return;
      }

    };

    const createAgency = async () => {
      try {
        await apiService.createAgency(currentAgency);
        cleanCurrentAgency();
        toggleModal();
        onSubmit.value = false;
        notification.value = {
          title: 'Success',
          content: 'Agency created successfully!',
          type: 'success'
        };
        reloadTable();
      } catch (error) {
        onSubmit.value = false;
        notification.value = {
          title: 'Error',
          content: `Error when submitting talent:${error}`,
          type: 'danger'
        };
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
        reloadTable();
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

    const handleUpdateClick = (updateData) => {
      isUpdateMode.value = true;

      if (updateData) {
        currentAgency.id = updateData.id;
        currentAgency.agency_name = updateData.agency_name
        currentAgency.agency_status = updateData.agency_status
        currentAgency.agency_description = updateData.agency_description
      }
      showModal.value = true;
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
      currentAgency,
      notification,
      agencyTable,
      validationErrors,
      toggleModal,
      reloadTable,
      handleSubmit,
      handleUpdateClick,
      createAgency,
      updateAgency,
    };
  }
});
</script>
