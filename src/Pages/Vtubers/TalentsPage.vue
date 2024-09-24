<template>
  <div>
    <page-title-component :heading="heading" :subheading="subheading" :icon="icon">

      <template v-slot:actions>
        <button type="button" @click="openModal" class="btn-shadow d-inline-flex align-items-center btn btn-primary">
          Add New Talent
        </button>

      </template>
    </page-title-component>
    <notification-component v-model:notification="notification"></notification-component>
    <modal-component title="Add New Talent" :isOpen="showModal" @closeModal="closeModal">
      <template #body>
        <div class="form-row">
          <div class="col-md-6">
            <div class="position-relative form-group">
              <label for="name">Name</label>
              <input name="name" id="name" placeholder="Name" type="text" v-model="newTalent.name" class="form-control">
            </div>
          </div>
          <div class="col-md-6">
            <div class="position-relative form-group">
              <label for="original_name">Original Name</label>
              <input name="original_name" id="original_name" placeholder="Original Name" v-model=newTalent.original_name
                type="text" class="form-control">
            </div>
          </div>
        </div>
        <div class="form-row">
          <div class="col-md-6">
            <div class="position-relative form-group">
              <label for="name">Gender</label>
              <select name="gender" id="gender" v-model=newTalent.gender class="form-control">
                <option value="male">Male</option>
                <option value="female">female</option>
              </select>
            </div>
          </div>
          <div class="col-md-6">
            <div class="position-relative form-group">
              <label for="date_of_birth">Date Of Birth</label>
              <input name="date_of_birth" id="date_of_birth" placeholder="Date Of Birth" v-model=newTalent.date_of_birth
                type="date" class="form-control">
            </div>
          </div>
        </div>
        <div class="form-row">
          <div class="col-md-6">
            <div class="position-relative form-group">
              <label for="agency">Agency</label>
              <select name="select" id="agency" v-model=newTalent.agency_id class="form-control" required>
                <option v-for="agency in agencies" :key="agency.agency_id" :value="agency.agency_id">
                  {{ agency.agency_name }}
                </option>
              </select>
            </div>
          </div>
          <div class="col-md-6">
            <div class="position-relative form-group">
              <label for="talent_status">Talent Status</label>
              <select name="talent_status" id="talent_status" v-model=newTalent.talent_status class="form-control">
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
              <input name="debut_date" id="debut_date" placeholder="Debut Date" type="date" v-model=newTalent.debut_date
                class="form-control">
            </div>
          </div>
          <div class="col-md-6">
            <div class="position-relative form-group" v-if="showRetirementDate()">
              <label for="retirement_date">Retirement Date</label>
              <input name="retirement_date" id="retirement_date" placeholder="Retirement Date" type="date"
                v-model=newTalent.retirement_date class="form-control">
            </div>
          </div>
        </div>
        <div class="form-row">
          <div class="col-md-6">
            <div class="position-relative form-group">
              <label for="height">Height</label>
              <input name="height" id="height" placeholder="Height" type="number" v-model=newTalent.height
                class="form-control">
            </div>
          </div>
          <div class="col-md-6">
            <div class="position-relative form-group">
              <label for="emoji">Emoji</label>
              <input name="emoji" id="emoji" placeholder="Emoji" v-model=newTalent.emoji type="text"
                class="form-control">
            </div>
          </div>
        </div>
      </template>
      <template #footer>
        <button class="btn-primary btn" @click="closeModal">Cancel</button>
        <button-spinner :isLoading="onSubmit" buttonClass="btn btn-primary" @click="submitTalent" normalText="Submit" />
      </template>
    </modal-component>
    <table-component :footer="true" :fields="fields" :items="items" @search="onSearchChange"
      @changeOrder="handleChangeOrder" @deleteRow="deleteTalent" />
    <pagination-component :currentPage="currentPage" :perPage="itemsPerPage" :totalItems="totalItems"
      :totalPages="totalPages" @load-page="loadPage" @change-page-size="changePageSize" />
  </div>
</template>

<script>
import { defineComponent, ref, reactive, onMounted } from 'vue';
import ModalComponent from '../../DemoPages/Components/ModalComponent.vue';
import TableComponent from '../../Layout/Components/TableComponent.vue';
import PageTitleComponent from '../../Layout/Components/PageTitleComponent.vue';
import PaginationComponent from '../../Layout/Components/PaginationComponent.vue';
import ButtonSpinner from '../../Layout/Components/ButtonSpinner.vue';
import NotificationComponent from '../../Layout/Components/NotificationComponent.vue';
import { apiService } from '../../supabase/apiService';

export default defineComponent({
  name: 'TalentsPage',
  components: {
    ModalComponent,
    PageTitleComponent,
    TableComponent,
    PaginationComponent,
    ButtonSpinner,
    NotificationComponent,
  },

  setup() {
    const heading = ref('Talents');
    const subheading = ref('Explore the Profiles of Emerging and Established Talents.');
    const icon = ref('pe-7s-phone icon-gradient bg-premium-dark');
    const showModal = ref(false);
    const currentPage = ref(1);
    const itemsPerPage = ref(100);
    const totalItems = ref(0);
    const totalPages = ref(0);
    const orderBy = ref('id');
    const orderDirection = ref('asc');
    const search = ref('');
    const onSubmit = ref(false);
    const notification = ref(null);
    const newTalent = reactive({
      name: null,
      original_name: null,
      gender: null,
      date_of_birth: null,
      agency_id: null,
      talent_status: 'active',
      debut_date: null,
      retirement_date: null,
      height: null,
      emoji: null,
    });
    const fields = ref([
      { key: 'id', value: 'Id' },
      { key: 'name', value: 'Name' },
      { key: 'original_name', value: 'Original Name' },
      { key: 'agency', value: 'Agency' },
      { key: 'talent_status', value: 'Status' },
      { key: 'debut_date', value: 'Debut Date' },
    ]);
    const items = ref([]);
    const agencies = ref([]);

    const openModal = () => {
      showModal.value = true;
    };

    const closeModal = () => {
      showModal.value = false;
    };

    const showRetirementDate = () => {
      return newTalent.talent_status === 'terminated' || newTalent.talent_status === 'graduation';
    };

    const getAgencyData = async () => {
      try {
        const response = await apiService.getAgencies();
        agencies.value = response;
      } catch (error) {
        console.error('Error fetching agency data:', error);
      }
    };

    const getTalentsData = async (newPage, newPageSize) => {
      const result = await apiService.getTalents(newPage, newPageSize, orderBy.value, orderDirection.value, search.value);
      if (!result.error) {
        items.value = result.items;
        totalItems.value = result.totalItems;
        totalPages.value = result.totalPages;
        itemsPerPage.value = newPageSize;
      } else {
        console.error('Error:', result.error);
      }
    };

    const submitTalent = async () => {
      onSubmit.value = true;
      try {
        await apiService.createTalent(newTalent);
        notification.value = { title: 'Success', content: 'Talent created successfully!', type: 'success' };
        getTalentsData(currentPage.value, itemsPerPage.value);
        onSubmit.value = false;
        Object.assign(newTalent, {
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
      } catch (error) {
        notification.value = { title: 'Error', content: `Error when submitting talent: ${error}`, type: 'danger' };
      }
    };

    const deleteTalent = async (id) => {
      const confirmDelete = confirm(`Are you sure you want to delete talent ${id}?`);
      if (confirmDelete) {
        try {
          await apiService.deleteTalent(id);
          notification.value = { title: 'Success', content: 'Talent deleted successfully!', type: 'success' };
          getTalentsData(1, itemsPerPage.value);
        } catch (error) {
          notification.value = { title: 'Error', content: `Error when deleting talent: ${error}`, type: 'danger' };
        }
      }
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
      showModal,
      currentPage,
      itemsPerPage,
      totalItems,
      totalPages,
      orderBy,
      orderDirection,
      onSubmit,
      notification,
      newTalent,
      fields,
      items,
      agencies,
      openModal,
      closeModal,
      showRetirementDate,
      getAgencyData,
      getTalentsData,
      submitTalent,
      deleteTalent,
      handleChangeOrder,
      loadPage,
      changePageSize,
      onSearchChange,
    };
  },
});
</script>
