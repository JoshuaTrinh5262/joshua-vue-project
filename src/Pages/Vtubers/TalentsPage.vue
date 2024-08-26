<template>
  <div>
    <page-title-component :heading=heading :subheading=subheading :icon=icon>
      <template v-slot:actions>
        <button type="button" @click="openModal" class="btn-shadow d-inline-flex align-items-center btn btn-primary">
          Create New
        </button>
        <modal-component title="Create New" :isOpen="showModal" @closeModal="closeModal">
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
                    <label for="agency">Agency</label>
                    <select name="select" id="agency" v-model=newTalent.agency_id class="form-control">
                      <option v-for="agency in agencies" :key="agency.agency_id" :value="agency.agency_id">
                        {{ agency.agency_name }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="position-relative form-group">
                    <label for="talent_status">Talent Status</label>
                    <select name="select" id="talent_status" v-model=newTalent.talent_status class="form-control">
                      <option value="active">Active</option>
                      <option value="graduation">Graduation</option>
                      <option value="terminated">Terminated</option>
                    </select>
                  </div>
                </div>
              </div>
            </form>
          </template>
          <template #footer>
            <button @click="closeModal" class="btn btn-outline-primary">Cancel</button>
            <button @click="submitTalent" class="btn btn-primary">Submit</button>
          </template>
        </modal-component>
      </template>
    </page-title-component>
    <table-component :footer=true :fields="fields" :items="items" @changeOrder="handleChangeOrder" />
    <pagination-component :currentPage="currentPage" :perPage="itemsPerPage" :totalItems="totalItems"
      :totalPages="totalPages" @load-page="loadPage" @change-page-size="changePageSize" />
  </div>
</template>
<script>
import ModalComponent from '../../DemoPages/Components/ModalComponent.vue';
import TableComponent from '../../Layout/Components/TableComponent.vue';
import PageTitleComponent from "../../Layout/Components/PageTitleComponent.vue";
import PaginationComponent from "../../Layout/Components/PaginationComponent.vue";
import { supabase } from '../../supabase/supabase';
import { getAgencies } from '../../supabase/api/agencyApi';
import { createTalent } from '../../supabase/api/talentApi';


export default {
  name: "TalentsPage",
  components: {
    ModalComponent,
    PageTitleComponent,
    TableComponent,
    PaginationComponent
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
      newTalent: {
        name: '',
        original_name: "",
        agency_id: "",
        talent_status: "",
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
          value: 'debut date'
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

    async getAgencyData() {
      try {
        const response = await getAgencies();
        this.agencies = response;
      } catch (error) {
        console.error("Error fetching agency data:", error);
      }
    },

    async getTalentsData(newPage, newPageSize) {
      const start = (newPage - 1) * newPageSize;
      const end = start + newPageSize - 1;

      const { data, count, error } = await supabase
        .from('talent')
        .select('*, agency(agency_name)', { count: 'exact' })
        .order(this.orderBy, { ascending: this.orderDirection === 'asc' })
        .range(start, end);

      if (!error) {
        this.totalItems = count;
        const transformedData = data.map(item => ({
          ...item,
          agency: item.agency?.agency_name,
        }));
        this.items = transformedData;
        this.totalPages = Math.ceil(count / newPageSize);
      }
    },

    async submitTalent() {
      createTalent(this.newTalent)
        .then(() => {
            this.newTalent = {
              name: '',
              original_name: '',
              agency: '',
              status: '',
            };
            this.successMessage = 'Talent created successfully!';
            this.showModal = false;
            this.getTalentsData(this.currentPage, this.itemsPerPage);
        })
        .catch(err => {
          console.error('Error submitting talent:', err);
          this.error = 'An unexpected error occurred.';
        });
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