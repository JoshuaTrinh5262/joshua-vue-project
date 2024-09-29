<template>
  <div>
    <page-title-component :heading="heading" :subheading="subheading" :icon="icon">
      <template v-slot:actions>
        <button type="button" @click="toggleModal" class="btn-shadow d-inline-flex align-items-center btn btn-primary">
          Add New Talent
        </button>
      </template>
    </page-title-component>

    <notification-component v-model:notification="notification"></notification-component>

    <modal-component :title="isUpdateMode ? 'Update Talent' : 'Add New Talent'" :isOpen="showModal"
      @closeModal="toggleModal">
      <template #body>
        <div class="form-row">
          <div class="col-md-6">
            <div class="position-relative form-group">
              <label for="talent_name">Talent Name</label>
              <input name="talent_name" id="talent_name" placeholder="Talent Name" type="text"
                v-model="currentTalent.name" class="form-control">
            </div>
          </div>
          <div class="col-md-6">
            <div class="position-relative form-group">
              <label for="original_name">Original Name</label>
              <input name="original_name" id="original_name" placeholder="Original Name"
                v-model=currentTalent.original_name type="text" class="form-control">
            </div>
          </div>
        </div>
        <div class="form-row">
          <div class="col-md-6">
            <div class="position-relative form-group">
              <label for="talent_gender">Gender</label>
              <select name="talent_gender" id="talent_gender" v-model=currentTalent.gender class="form-control">
                <option value="male">Male</option>
                <option value="female">female</option>
              </select>
            </div>
          </div>
          <div class="col-md-6">
            <div class="position-relative form-group">
              <label for="date_of_birth">Date Of Birth</label>
              <input name="date_of_birth" id="date_of_birth" placeholder="Date Of Birth"
                v-model=currentTalent.date_of_birth type="date" class="form-control">
            </div>
          </div>
        </div>
        <div class="form-row">
          <div class="col-md-6">
            <div class="position-relative form-group">
              <label for="agency">Agency</label>
              <select name="select" id="agency" v-model=currentTalent.agency_id class="form-control" required>
                <option v-for="agency in agencies" :key="agency.id" :value="agency.id">
                  {{ agency.agency_name }}
                </option>
              </select>
            </div>
          </div>
          <div class="col-md-6">
            <div class="position-relative form-group">
              <label for="talent_status">Talent Status</label>
              <select name="talent_status" id="talent_status" v-model=currentTalent.talent_status class="form-control">
                <option value="active">Active</option>
                <option value="graduation">Graduation</option>
                <option value="terminated">Terminated</option>
              </select>
            </div>
          </div>
        </div>
        <div class="form-row">
          <div class="col-md-6">
            <div class="position-relative form-group">
              <label for="debut_date">Debut Date</label>
              <input name="debut_date" id="debut_date" placeholder="Debut Date" type="date"
                v-model=currentTalent.debut_date class="form-control">
            </div>
          </div>
          <div class="col-md-6">
            <div class="position-relative form-group" v-if="showRetirementDate()">
              <label for="retirement_date">Retirement Date</label>
              <input name="retirement_date" id="retirement_date" placeholder="Retirement Date" type="date"
                v-model=currentTalent.retirement_date class="form-control">
            </div>
          </div>
        </div>
        <div class="form-row">
          <div class="col-md-6">
            <div class="position-relative form-group">
              <label for="height">Height</label>
              <input name="height" id="height" placeholder="Height" type="number" v-model=currentTalent.height
                class="form-control">
            </div>
          </div>
          <div class="col-md-6">
            <div class="position-relative form-group">
              <label for="emoji">Emoji</label>
              <input name="emoji" id="emoji" placeholder="Emoji" v-model=currentTalent.emoji type="text"
                class="form-control">
            </div>
          </div>
        </div>
      </template>
      <template #footer>
        <button class="btn btn-primary" @click="toggleModal">Cancel</button>
        <button-spinner :isLoading="onSubmit" buttonClass="btn btn-primary" @click="handleSubmitTalent"
          :normalText="isUpdateMode ? 'Update Talent' : 'Add New Talent'" />
      </template>
    </modal-component>

    <table-component :footer="true" :fields="fields" :items="items" @search="onSearchChange"
      @changeOrder="handleChangeOrder" @deleteRow="deleteTalent" @updateRow="handleUpdateRow" />

    <pagination-component :currentPage="currentPage" :perPage="itemsPerPage" :totalItems="totalItems"
      :totalPages="totalPages" @load-page="loadPage" @change-page-size="changePageSize" />
  </div>
</template>

<script>
import { defineComponent, ref, reactive, onMounted } from "vue";
import ModalComponent from "../../Layout/Components/ModalComponent.vue";
import TableComponent from "../../Layout/Components/TableComponent.vue";
import PageTitleComponent from "../../Layout/Components/PageTitleComponent.vue";
import PaginationComponent from "../../Layout/Components/PaginationComponent.vue";
import ButtonSpinner from "../../Layout/Components/ButtonSpinner.vue";
import NotificationComponent from "../../Layout/Components/NotificationComponent.vue";
import { apiService } from "../../supabase/apiService";

export default defineComponent({
  name: "TalentsPage",
  components: {
    ModalComponent,
    PageTitleComponent,
    TableComponent,
    PaginationComponent,
    ButtonSpinner,
    NotificationComponent,
  },

  setup() {
    const heading = ref("Talents");
    const subheading = ref("Explore the Profiles of Emerging and Established Talents.");
    const icon = ref("pe-7s-user icon-gradient bg-premium-dark");

    const isUpdateMode = ref(false);
    const showModal = ref(false);
    const currentPage = ref(1);
    const itemsPerPage = ref(20);
    const totalItems = ref(0);
    const totalPages = ref(0);
    const orderBy = ref("id");
    const orderDirection = ref("asc");
    const search = ref("");
    const onSubmit = ref(false);
    const notification = ref(null);

    const currentTalent = reactive({
      name: null,
      original_name: null,
      gender: null,
      date_of_birth: null,
      agency_id: null,
      talent_status: "active",
      debut_date: null,
      retirement_date: null,
      height: null,
      emoji: null,
    });

    const fields = ref([
      { key: "name", value: "Name" },
      { key: "original_name", value: "Original Name" },
      { key: "agency", value: "Agency" },
      { key: "talent_status", value: "Status" },
      { key: "debut_date", value: "Debut Date" },
    ]);
    const items = ref([]);
    const agencies = ref([]);

    const toggleModal = () => {
      isUpdateMode.value = false;
      cleanCurrentTalent();
      showModal.value = !showModal.value;
    };

    const cleanCurrentTalent = () => {
      Object.assign(currentTalent, {
        name: null,
        original_name: null,
        gender: null,
        date_of_birth: null,
        agency_id: null,
        talent_status: "active",
        debut_date: null,
        retirement_date: null,
        height: null,
        emoji: null,
      });

      if (currentTalent.id) {
        delete currentTalent.id;
      }
    };

    const showRetirementDate = () => {
      return currentTalent.talent_status === "terminated" || currentTalent.talent_status === "graduation";
    };

    const getAgencyData = async () => {
      try {
        const response = await apiService.getAgencies();
        agencies.value = response;
      } catch (error) {
        console.error("Error fetching agency data:", error);
      }
    };

    const getTalentsData = async (newPage, newPageSize) => {
      const result = await apiService.getTalentsWithPaging(newPage, newPageSize, orderBy.value, orderDirection.value, search.value);
      if (!result.error) {
        items.value = result.items;
        totalItems.value = result.totalItems;
        totalPages.value = result.totalPages;
        itemsPerPage.value = newPageSize;
      }
    };

    const handleSubmitTalent = async () => {
      onSubmit.value = true;
      if (isUpdateMode.value) {
        updateTalent();
      } else {
        createTalent();
      }
    };

    const createTalent = async () => {
      try {
        await apiService.createTalent(currentTalent);
        cleanCurrentTalent();
        toggleModal();
        onSubmit.value = false;
        notification.value = { title: "Success", content: "Talent created successfully!", type: "success" };
        getTalentsData(currentPage.value, itemsPerPage.value);
      } catch (error) {
        onSubmit.value = false;
        notification.value = { title: "Error", content: `Error when submitting talent: ${error}`, type: "danger" };
      }
    }

    const updateTalent = async () => {
      try {
        await apiService.updateTalent(currentTalent);
        cleanCurrentTalent();
        toggleModal();
        onSubmit.value = false;
        notification.value = {
          title: "Success",
          content: "Talent updated successfully!",
          type: "success",
        };
        getTalentsData(currentPage.value, itemsPerPage.value);
        isUpdateMode.value = false;
      } catch (error) {
        onSubmit.value = false;
        notification.value = {
          title: "Error",
          content: `Error when updating Talent: ${error}`,
          type: "danger",
        };
        isUpdateMode.value = false;
      }
    };

    const deleteTalent = async (id) => {
      const confirmDelete = confirm(`Are you sure you want to delete talent ${id}?`);
      if (confirmDelete) {
        try {
          await apiService.deleteTalent(id);
          notification.value = { title: "Success", content: "Talent deleted successfully!", type: "success" };
          getTalentsData(1, itemsPerPage.value);
        } catch (error) {
          notification.value = { title: "Error", content: `Error when deleting talent: ${error}`, type: "danger" };
        }
      }
    };

    const handleUpdateRow = (updateId) => {
      isUpdateMode.value = true;
      const selectedItem = items.value.find(x => x.id === updateId);

      if (selectedItem) {
        Object.assign(currentTalent, selectedItem);
      }

      showModal.value = true;
    };

    const onSearchChange = (searchTerm) => {
      search.value = searchTerm;
      getTalentsData(1, itemsPerPage.value);
    };

    const handleChangeOrder = async ({ orderDirection: newOrderDirection, orderBy: newOrderBy }) => {
      orderDirection.value = newOrderDirection;
      orderBy.value = newOrderBy;
      await getTalentsData(currentPage.value, itemsPerPage.value);
    };

    const loadPage = async (page) => {
      currentPage.value = page;
      await getTalentsData(currentPage.value, itemsPerPage.value);
    };

    const changePageSize = async (newPageSize) => {
      itemsPerPage.value = newPageSize;
      await getTalentsData(1, itemsPerPage.value);
    };

    onMounted(() => {
      getTalentsData(currentPage.value, itemsPerPage.value);
      getAgencyData();
    });

    return {
      heading,
      subheading,
      icon,
      search,
      isUpdateMode,
      showModal,
      currentPage,
      itemsPerPage,
      totalItems,
      totalPages,
      orderBy,
      orderDirection,
      onSubmit,
      notification,
      currentTalent,
      fields,
      items,
      agencies,
      toggleModal,
      showRetirementDate,
      getAgencyData,
      getTalentsData,
      handleSubmitTalent,
      createTalent,
      updateTalent,
      deleteTalent,
      handleChangeOrder,
      handleUpdateRow,
      loadPage,
      changePageSize,
      onSearchChange,
    };
  },
});
</script>
