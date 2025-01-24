<template>
  <div>
    <PageTitleComponent :heading="heading" :subheading="subheading" :icon="icon">
      <template #actions>
        <button type="button" @click="toggleModal" class="btn-shadow d-inline-flex align-items-center btn btn-primary">
          Create New
        </button>
      </template>
    </PageTitleComponent>
    <NotificationComponent v-model:notification="notification"></NotificationComponent>
    <ModalComponent :title="isUpdateMode ? 'Update Event' : 'Add New Event'" :isOpen="showModal"
      @closeModal="toggleModal">
      <template #body>
        <div class="position-relative form-group">
          <label for="event_title">Event Title</label>
          <input name="event_title" id="event_title" placeholder="Event Title" type="text"
            v-model="currentEvent.event_title" class="form-control">
        </div>
        <div class="position-relative form-group">
          <label for="event_summary">Event Summary</label>
          <input name="event_summary" id="event_summary" placeholder="Event Summary" type="text"
            v-model="currentEvent.event_summary" class="form-control">
        </div>
        <div class="position-relative form-group">
          <label for="event_hashtag">Event Hashtag</label>
          <input name="event_hashtag" id="event_hashtag" placeholder="Event Hashtag" type="text"
            v-model="currentEvent.event_hashtag" class="form-control">
        </div>
        <div class="form-row">
          <div class="col-md-6">
            <div class="position-relative form-group">
              <label for="event_url">Event Url</label>
              <input name="event_url" id="event_url" placeholder="Event Url" type="text"
                v-model="currentEvent.event_url" class="form-control">
            </div>
          </div>
          <div class="col-md-6">
            <div class="position-relative form-group">
              <label for="event_date">Event Date</label>
              <input name="event_date" id="event_date" placeholder="Event Date" type="date"
                v-model="currentEvent.event_date" class="form-control">
            </div>
          </div>
        </div>
        <div class="form-row">
          <div class="col-md-6">
            <div class="position-relative form-group">
              <label for="event_type">Event Type</label>
              <input name="event_type" id="event_type" placeholder="Event Type" type="text"
                v-model="currentEvent.event_type" class="form-control">
            </div>
          </div>
          <div class="col-md-6">
            <div class="position-relative form-group">
              <label for="event_status">Event Status</label>
              <input name="event_status" id="event_status" placeholder="Event Status" type="text"
                v-model="currentEvent.event_status" class="form-control">
            </div>
          </div>
        </div>
        <div class="position-relative form-group">
          <label for="setlist">Setlist</label>
          <SetlistComponent :tracksData="currentEvent.event_setlist" @updateTracks="handleUpdateTrackList" />
        </div>
        <div class="position-relative form-group">
          <label for="event_status">Talent</label>
          <TagSelectorComponent :items="talentOptions" :model-value="selectedTalents"
            @update:modelValue="handleSelectedTalentsChange" />
        </div>

      </template>
      <template #footer>
        <button class="btn btn-primary" @click="toggleModal">Cancel</button>
        <button-spinner :isLoading="onSubmit" buttonClass="btn btn-primary" @click="handleSubmit"
          :normalText="isUpdateMode ? 'Update Event' : 'Add New Event'" />
      </template>
    </ModalComponent>

    <TableComponent :footer="true" :fields="fields" :items="items" @search="onSearchChange"
      @changeOrder="handleChangeOrder" @deleteRow="handleDelete" @updateRow="handleUpdate"></TableComponent>

    <PaginationComponent :currentPage="currentPage" :perPage="itemsPerPage" :totalItems="totalItems"
      :totalPages="totalPages" @load-page="loadPage" @change-page-size="changePageSize"></PaginationComponent>
  </div>
</template>

<script>
import { ref, onMounted, defineComponent, reactive } from 'vue';
import ModalComponent from '../../Layout/Components/ModalComponent.vue';
import TableComponent from '../../Layout/Components/TableComponent.vue';
import PageTitleComponent from "../../Layout/Components/PageTitleComponent.vue";
import PaginationComponent from "../../Layout/Components/PaginationComponent.vue";
import NotificationComponent from "../../Layout/Components/NotificationComponent.vue";
import ButtonSpinner from '../../Layout/Components/ButtonSpinner.vue';
import TagSelectorComponent from '../../Layout/Components/TagSelectorComponent.vue';
import { apiService } from '../../supabase/apiService';
import SetlistComponent from '../../Layout/Components/SetlistComponent.vue';

export default defineComponent({
  name: "EventsPage",

  components: {
    ModalComponent,
    TableComponent,
    PageTitleComponent,
    PaginationComponent,
    NotificationComponent,
    ButtonSpinner,
    TagSelectorComponent,
    SetlistComponent
  },

  setup() {
    const heading = ref('Events');
    const subheading = ref('Events');
    const icon = ref('pe-7s-date icon-gradient bg-tempting-azure');

    const isUpdateMode = ref(false);
    const showModal = ref(false);
    const onSubmit = ref(false);
    const orderBy = ref('event_date');
    const orderDirection = ref('desc');
    const currentPage = ref(1);
    const itemsPerPage = ref(20);
    const totalItems = ref(0);
    const totalPages = ref(0);
    const search = ref('');
    const notification = ref(null);
    const talentOptions = ref([]);
    const selectedTalents = ref([]);
    const currentEvent = reactive({
      event_title: null,
      event_summary: null,
      event_hashtag: null,
      event_url: null,
      event_date: null,
      event_type: null,
      event_status: null,
      event_setlist: null,
    });

    const fields = ref([
      { key: 'id', value: 'ID' },
      { key: 'event_title', value: 'title' },
      { key: 'event_summary', value: 'summary' },
      { key: 'event_date', value: 'Date' },
      { key: 'event_hashtag', value: 'Hashtag' },
      { key: 'talents', value: 'talent' }
    ]);
    const items = ref([]);

    const getEventsData = async (newPage, newPageSize) => {
      if(search.value != '') {
        newPage = 1;
      }

      const result = await apiService.getEventsWithPaging(newPage, newPageSize, orderBy.value, orderDirection.value, search.value);

      if (!result.error) {
        items.value = result.items;
        totalItems.value = result.totalItems;
        totalPages.value = result.totalPages;
        itemsPerPage.value = newPageSize;
      }
    };

    const getTalentsData = async () => {
      const result = await apiService.getTalents();
      talentOptions.value = result;
    };

    const handleSubmit = async () => {
      onSubmit.value = true;
      if (isUpdateMode.value) {
        updateEvent();
      } else {
        createEvent();
      }
      getEventsData(currentPage.value, itemsPerPage.value);
    };

    const createEvent = async () => {
      try {
        await apiService.createEvent(currentEvent, selectedTalents.value);
        toggleModal();
        onSubmit.value = false;
        notification.value = { title: 'Success', content: 'Event created successfully!', type: 'success' };
        getEventsData(currentPage.value, itemsPerPage.value);
      } catch (error) {
        onSubmit.value = false;
        notification.value = { title: 'Error', content: `Error when submitting talent: ${error}`, type: 'danger' };
      }
    };

    const updateEvent = async () => {
      try {
        await apiService.updateEvent(currentEvent, selectedTalents.value);
        toggleModal();
        onSubmit.value = false;
        notification.value = {
          title: 'Success',
          content: 'Event updated successfully!',
          type: 'success',
        };
        getEventsData(currentPage.value, itemsPerPage.value);
        isUpdateMode.value = false;
      } catch (error) {
        onSubmit.value = false;
        notification.value = {
          title: 'Error',
          content: `Error when updating Event: ${error}`,
          type: 'danger',
        };
        isUpdateMode.value = false;
      }
    };

    const handleUpdate = (updateId) => {
      isUpdateMode.value = true;
      const { talents, event_talent, ...selectedItem } = items.value.find(x => x.id === updateId);

      if (selectedItem) {
        Object.assign(currentEvent, selectedItem);
      }

      if (event_talent && event_talent.length > 0) {
        selectedTalents.value = event_talent.map(t => t.talent);
      } else {
        selectedTalents.value = [];
      }

      showModal.value = true;
    };

    const handleDelete = async (id) => {
      const confirmDelete = confirm(`Are you sure you want to delete Event ${id}?`);
      if (confirmDelete) {
        try {
          await apiService.deleteEvent(id);
          notification.value = { title: 'Success', content: 'Event deleted successfully!', type: 'success' };
          getEventsData(1, itemsPerPage.value);
        } catch (error) {
          notification.value = { title: 'Error', content: `Error when deleting talent: ${error}`, type: 'danger' };
        }
      }
    };

    const cleanCurrentEvent = () => {
      Object.assign(currentEvent, {
        event_title: null,
        event_summary: null,
        event_hashtag: null,
        event_url: null,
        event_date: null,
        event_type: null,
        event_status: null,
        event_setlist: null,
      });

      if (currentEvent.id) {
        delete currentEvent.id;
      }
      selectedTalents.value = [];
    };

    const toggleModal = () => {
      cleanCurrentEvent();
      showModal.value = !showModal.value;
    };

    const onSearchChange = (searchTerm) => {
      search.value = searchTerm;
      getEventsData(1, itemsPerPage.value);
    };

    const handleChangeOrder = ({ orderDirection: newOrderDirection, orderBy: newOrderBy }) => {
      orderDirection.value = newOrderDirection;
      orderBy.value = newOrderBy;
      getEventsData(currentPage.value, itemsPerPage.value);
    };

    const loadPage = (page) => {
      currentPage.value = page;
      getEventsData(currentPage.value, itemsPerPage.value);
    };

    const changePageSize = async (newPageSize) => {
      itemsPerPage.value = newPageSize;
      await getEventsData(1, itemsPerPage.value);
    };

    const handleSelectedTalentsChange = (newSelection) => {
      selectedTalents.value = newSelection;
    };

    const handleUpdateTrackList = (updatedTracks) => {
      currentEvent.event_setlist = updatedTracks;
    };

    onMounted(async () => {
      await getEventsData(currentPage.value, itemsPerPage.value);
      await getTalentsData();
    });

    return {
      heading,
      subheading,
      icon,
      isUpdateMode,
      showModal,
      onSubmit,
      fields,
      items,
      currentPage,
      itemsPerPage,
      totalItems,
      totalPages,
      notification,
      talentOptions,
      selectedTalents,
      currentEvent,
      handleSelectedTalentsChange,
      handleUpdateTrackList,
      toggleModal,
      onSearchChange,
      handleChangeOrder,
      handleSubmit,
      handleUpdate,
      handleDelete,
      loadPage,
      changePageSize,
      getEventsData,
      getTalentsData,
    };
  }
});
</script>
