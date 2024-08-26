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
                    <label for="name" class="">Name</label>
                    <input name="name" id="name" placeholder="Name" type="text" class="form-control">
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="position-relative form-group">
                    <label for="original_name" class="">Original Name</label>
                    <input name="original_name" id="original_name" placeholder="Original Name" type="text"
                      class="form-control">
                  </div>
                </div>
              </div>
              <div class="form-row">
                <div class="col-md-6">
                  <div class="position-relative form-group">
                    <label for="exampleSelect" class="">Agency</label>
                    <select name="select" id="exampleSelect" class="form-control">
                      <option value="0">Zero</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                      <option value="4">Four</option>
                      <option value="5">Five</option>
                      <option value="6">Six</option>
                      <option value="7">Seven</option>
                      <option value="8">Eight</option>
                      <option value="9">Nine</option>
                    </select>
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="container">
                    <div class="form-group">
                      <div class='input-group date' id='datetimepicker1'>
                        <input type='text' class="form-control" />
                        <span class="input-group-addon">
                          <span class="glyphicon glyphicon-calendar"></span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="position-relative form-group">
                <label for="exampleAddress" class="">Address</label>
                <input name="address" id="exampleAddress" placeholder="1234 Main St" type="text" class="form-control">
              </div>
              <div class="position-relative form-group">
                <label for="exampleAddress2" class="">Address 2</label>
                <input name="address2" id="exampleAddress2" placeholder="Apartment, studio, or floor" type="text"
                  class="form-control">
              </div>
              <div class="form-row">
                <div class="col-md-6">
                  <div class="position-relative form-group">
                    <label for="exampleCity" class="">City</label>
                    <input name="city" id="exampleCity" type="text" class="form-control">
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="position-relative form-group"><label for="exampleState" class="">State</label>
                    <input name="state" id="exampleState" type="text" class="form-control">
                  </div>
                </div>
                <div class="col-md-2">
                  <div class="position-relative form-group"><label for="exampleZip" class="">Zip</label>
                    <input name="zip" id="exampleZip" type="text" class="form-control">
                  </div>
                </div>
              </div>
            </form>
          </template>
          <template #footer>
            <button @click="closeModal" class="btn btn-outline-primary">Cancel</button>
            <button @click="closeModal" class="btn btn-primary">Submit</button>
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
        agency: "",

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
    }
  },

  created() {
    this.getTalentsData(this.currentPage, this.itemsPerPage);
  },

  methods: {
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
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