<template>
  <div>
    <page-title-component :heading=heading :subheading=subheading :icon=icon>
      <template v-slot:actions>
        <button type="button" @click="openModal" class="btn-shadow d-inline-flex align-items-center btn btn-primary">
          Add New Talent
        </button>
        <modal-component title="Add New Talent" :isOpen="showModal" @closeModal="closeModal">
          <template #body>
            <form class="">
              <div class="form-row">
                <div class="col-md-6">
                  <div class="position-relative form-group">
                    <label for="name">Name</label>
                    <input name="name" id="name" placeholder="Name" type="text" v-model=newTalent.name
                      class="form-control">
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="position-relative form-group">
                    <label for="original_name">Original Name</label>
                    <input name="original_name" id="original_name" placeholder="Original Name"
                      v-model=newTalent.original_name type="text" class="form-control">
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
                    <input name="date_of_birth" id="date_of_birth" placeholder="Date Of Birth"
                      v-model=newTalent.date_of_birth type="date" class="form-control">
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
                    <select name="talent_status" id="talent_status" v-model=newTalent.talent_status
                      class="form-control">
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
                      v-model=newTalent.debut_date class="form-control">
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
            </form>
          </template>
          <template #footer>
            <button-spinner :isLoading="onSubmit" buttonClass="btn btn-primary" @click="submitTalent"
              normalText="Submit" />
          </template>
        </modal-component>
      </template>
    </page-title-component>
    <table-component :footer=true :fields="fields" :items="items" @changeOrder="handleChangeOrder"
      @deleteRow="deleteTalent" />
    <pagination-component :currentPage="currentPage" :perPage="itemsPerPage" :totalItems="totalItems"
      :totalPages="totalPages" @load-page="loadPage" @change-page-size="changePageSize" />
  </div>
</template>
<script>
import ModalComponent from '../../DemoPages/Components/ModalComponent.vue';
import TableComponent from '../../Layout/Components/TableComponent.vue';
import PageTitleComponent from "../../Layout/Components/PageTitleComponent.vue";
import PaginationComponent from "../../Layout/Components/PaginationComponent.vue";
import ButtonSpinner from "../../Layout/Components/ButtonSpinner.vue";
import { apiService } from '../../supabase/apiService';

export default {
  name: "TalentsPage",
  components: {
    ModalComponent,
    PageTitleComponent,
    TableComponent,
    PaginationComponent,
    ButtonSpinner,
  },

  data() {
    return {
      heading: 'Talents',
      subheading: 'Explore the Profiles of Emerging and Established Talents.',
      icon: 'pe-7s-phone icon-gradient bg-premium-dark',
      showModal: false,
      currentPage: 1,
      itemsPerPage: 20,
      totalItems: 0,
      totalPages: 0,
      orderBy: 'id',
      orderDirection: 'asc',
      onSubmit: false,
      newTalent: {
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
      },
      fields: [
        {
          key: 'id',
          value: 'Id'
        },
        {
          key: 'name',
          value: 'Name'
        },
        {
          key: 'original_name',
          value: 'Original Name'
        },
        {
          key: 'agency',
          value: 'Agency'
        },
        {
          key: 'talent_status',
          value: 'Status'
        },
        {
          key: 'debut_date',
          value: 'Debut Date'
        },
      ],
      items: [],
      agencies: []
    }
  },

  created() {
    this.getTalentsData(this.currentPage, this.itemsPerPage);
    this.getAgencyData();
  },

  methods: {
    openModal() {
      this.showModal = true;
    },

    closeModal() {
      this.showModal = false;
    },

    showRetirementDate() {
      return this.newTalent.talent_status === 'terminated' || this.newTalent.talent_status === 'graduation';
    },

    async getAgencyData() {
      try {
        const response = await apiService.getAgencies();
        this.agencies = response;
      } catch (error) {
        console.error("Error fetching agency data:", error);
      }
    },

    async getTalentsData(newPage, newPageSize) {
      const result = await apiService.getTalents(newPage, newPageSize, this.orderBy, this.orderDirection);

      if (!result.error) {
        this.items = result.items;
        this.totalItems = result.totalItems;
        this.totalPages = result.totalPages;
      } else {
        console.error('Error:', result.error);
      }
    },

    async submitTalent() {
      this.onSubmit = true;
      apiService.createTalent(this.newTalent)
        .then(() => {
          this.newTalent = {
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
          };
          this.successMessage = 'Talent created successfully!';
          this.getTalentsData(this.currentPage, this.itemsPerPage);
          this.onSubmit = false;
        })
        .catch(err => {
          console.error('Error submitting talent:', err);
        });
    },

    async deleteTalent(id) {
      console.log(id);
      const confirmDelete = confirm("Are you sure you want to delete this talent?");
      if (confirmDelete) {
        await apiService.deleteTalent(id).then(async () => {
          alert("Talent deleted successfully");
          await this.getTalentsData(1, this.itemsPerPage);
        })
          .catch(err => {
            console.error('Error delete talent:', err);
          });;
      }
    },

    async handleChangeOrder({ orderDirection, orderBy }) {
      this.orderDirection = orderDirection;
      this.orderBy = orderBy;

      await this.getTalentsData(this.currentPage, this.itemsPerPage);
    },

    loadPage(page) {
      this.currentPage = page;
      this.getTalentsData(this.currentPage, this.itemsPerPage);
    },

    async changePageSize(newPageSize) {
      this.itemsPerPage = newPageSize;
      await this.getTalentsData(1, this.itemsPerPage);
    },
  },
}
</script>