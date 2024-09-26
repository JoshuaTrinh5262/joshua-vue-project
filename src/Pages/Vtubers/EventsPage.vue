<template>
  <div>
    <PageTitleComponent :heading="heading" :subheading="subheading" :icon="icon">
      <template #actions>
        <button type="button" @click="openModal" class="btn-shadow d-inline-flex align-items-center btn btn-primary">
          Create New
        </button>
      </template>
    </PageTitleComponent>
    <NotificationComponent v-model:notification="notification"></NotificationComponent>
    <ModalComponent title="Create New Event" :isOpen="showModal" @closeModal="closeModal">
      <template #body>
        <div class="position-relative form-group">
          <label for="event_title">Event Title</label>
          <input name="event_title" id="event_title" placeholder="Event Title" type="text"
            v-model="newEvent.event_title" class="form-control">
        </div>
        <div class="position-relative form-group">
          <label for="event_summary">Event Summary</label>
          <input name="event_summary" id="event_summary" placeholder="Event Summary" type="text"
            v-model="newEvent.event_summary" class="form-control">
        </div>
        <div class="position-relative form-group">
          <label for="event_hashtag">Event Hashtag</label>
          <input name="event_hashtag" id="event_hashtag" placeholder="Event Hashtag" type="text"
            v-model="newEvent.event_hashtag" class="form-control">
        </div>
        <div class="position-relative form-group">
          <label for="event_date">Event Date</label>
          <input name="event_date" id="event_date" placeholder="Event Date" type="date" v-model="newEvent.event_date"
            class="form-control">
        </div>
      </template>
      <template #footer>
        <button class="btn btn-primary" @click="closeModal">Cancel</button>
        <button class="btn btn-primary" @click="closeModal">Submit</button>
      </template>
    </ModalComponent>

    <TableComponent :footer="true" :fields="fields" :items="items" @search="onSearchChange"
      @changeOrder="handleChangeOrder" @deleteRow="handleDeleteEvent"></TableComponent>

    <PaginationComponent :currentPage="currentPage" :perPage="itemsPerPage" :totalItems="totalItems"
      :totalPages="totalPages" @load-page="loadPage" @change-page-size="changePageSize"></PaginationComponent>
  </div>
</template>

<script>
import { ref, onMounted, defineComponent } from 'vue';
import ModalComponent from '../../DemoPages/Components/ModalComponent.vue';
import TableComponent from '../../Layout/Components/TableComponent.vue';
import PageTitleComponent from "../../Layout/Components/PageTitleComponent.vue";
import PaginationComponent from "../../Layout/Components/PaginationComponent.vue";
import NotificationComponent from "../../Layout/Components/NotificationComponent.vue";
import { apiService } from '../../supabase/apiService';

export default defineComponent({
  name: "EventsPage",

  components: {
    ModalComponent,
    TableComponent,
    PageTitleComponent,
    PaginationComponent,
    NotificationComponent
  },

  setup() {
    const heading = ref('Events');
    const subheading = ref('Events');
    const icon = ref('pe-7s-phone icon-gradient bg-premium-dark');
    const showModal = ref(false);
    const orderBy = ref('id');
    const orderDirection = ref('asc');
    const currentPage = ref(1);
    const itemsPerPage = ref(20);
    const totalItems = ref(0);
    const totalPages = ref(0);
    const search = ref('');
    const notification = ref(null);
    const newEvent = ref({ name: null });
    const fields = ref([
      { key: 'id', value: 'ID' },
      { key: 'event_title', value: 'title' },
      { key: 'event_summary', value: 'summary' },
      { key: 'event_date', value: 'Date' },
      { key: 'event_hashtag', value: 'Hashtag' }
    ]);
    const items = ref([]);

    const getEventData = async (newPage, newPageSize) => {
      const result = await apiService.getEvents(newPage, newPageSize, orderBy.value, orderDirection.value, search.value);

      if (!result.error) {
        items.value = result.items;
        totalItems.value = result.totalItems;
        totalPages.value = result.totalPages;
        itemsPerPage.value = newPageSize;
      }
    };

    const openModal = () => {
      showModal.value = true;
    };

    const closeModal = () => {
      showModal.value = false;
    };

    const onSearchChange = (searchTerm) => {
      search.value = searchTerm;
      getEventData(1, itemsPerPage.value);
    };

    const handleChangeOrder = ({ orderDirection: newOrderDirection, orderBy: newOrderBy }) => {
      orderDirection.value = newOrderDirection;
      orderBy.value = newOrderBy;
      getEventData(currentPage.value, itemsPerPage.value);
    };

    const handleDeleteEvent = async (id) => {
      const confirmDelete = confirm(`Are you sure you want to delete event ${id}?`);
      if (confirmDelete) {
        await apiService.deleteEvent(id).then(async () => {
          notification.value = {
            title: 'Success',
            content: 'event deleted successfully!',
            type: 'success'
          };
          await getEventData(1, this.itemsPerPage);
        })
          .catch(error => {
            notification.value = {
              title: 'Error',
              content: `Error when event dataset: ${error}`,
              type: 'danger'
            };
          });
      }
    };

    const loadPage = (page) => {
      currentPage.value = page;
      getEventData(currentPage.value, itemsPerPage.value);
    };

    const changePageSize = async (newPageSize) => {
      itemsPerPage.value = newPageSize;
      await getEventData(1, itemsPerPage.value);
    };

    onMounted(() => {
      getEventData(currentPage.value, itemsPerPage.value);
    });

    return {
      showModal,
      heading,
      subheading,
      icon,
      fields,
      items,
      currentPage,
      itemsPerPage,
      totalItems,
      totalPages,
      notification,
      newEvent,
      openModal,
      closeModal,
      onSearchChange,
      handleChangeOrder,
      handleDeleteEvent,
      loadPage,
      changePageSize,
      getEventData
    };
  }
});
</script>
