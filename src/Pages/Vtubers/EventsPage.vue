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

    <EventTable ref="eventTable" @handleUpdate="handleUpdateClick" @handleDelete="handleDeleteClick"></EventTable>

  </div>
</template>

<script>
import { ref, onMounted, defineComponent, reactive } from 'vue';
import ModalComponent from '../../Layout/Components/ModalComponent.vue';
import PageTitleComponent from "../../Layout/Components/PageTitleComponent.vue";
import NotificationComponent from "../../Layout/Components/NotificationComponent.vue";
import ButtonSpinner from '../../Layout/Components/ButtonSpinner.vue';
import TagSelectorComponent from '../../Layout/Components/TagSelectorComponent.vue';
import { apiService } from '../../supabase/apiService';
import SetlistComponent from '../../Layout/Components/SetlistComponent.vue';
import EventTable from './Table/EventTable.vue';

export default defineComponent({
  name: "EventsPage",

  components: {
    ModalComponent,
    PageTitleComponent,
    NotificationComponent,
    ButtonSpinner,
    TagSelectorComponent,
    SetlistComponent,
    EventTable
  },

  setup() {
    const heading = ref('Events');
    const subheading = ref('Events');
    const icon = ref('pe-7s-date icon-gradient bg-tempting-azure');

    const isUpdateMode = ref(false);
    const showModal = ref(false);
    const onSubmit = ref(false);
    const notification = ref(null);
    const eventTable = ref(null);
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
    };

    const createEvent = async () => {
      try {
        await apiService.createEvent(currentEvent, selectedTalents.value);
        toggleModal();
        onSubmit.value = false;
        notification.value = {
          title: 'Success',
          content: 'Event created successfully!',
          type: 'success'
        };
        reloadEventTable();
      } catch (error) {
        onSubmit.value = false;
        notification.value = {
          title: 'Error',
          content: `Error when submitting talent: ${error}`,
          type: 'danger'
        };
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
        reloadEventTable();
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

    const reloadEventTable = () => {
      if (eventTable.value) {
        eventTable.value.getEventsData();
      }
    };


    const handleSelectedTalentsChange = (newSelection) => {
      selectedTalents.value = newSelection;
    };

    const handleUpdateTrackList = (updatedTracks) => {
      currentEvent.event_setlist = updatedTracks;
    };

    const handleUpdateClick = (updateData) => {
      isUpdateMode.value = true;

      if (updateData) {
        currentEvent.id = updateData.id;
        currentEvent.event_title = updateData.event_title;
        currentEvent.event_summary = updateData.event_summary;
        currentEvent.event_hashtag = updateData.event_hashtag;
        currentEvent.event_url = updateData.event_url;
        currentEvent.event_date = updateData.event_date;
        currentEvent.event_type = updateData.event_type;
        currentEvent.event_status = updateData.event_status;
        currentEvent.event_setlist = updateData.event_setlist;
        selectedTalents.value = updateData.event_talent.map(item => ({
          id: item.talent.id,
          name: item.talent.name
        }));
      }

      showModal.value = true;
    };

    const handleDeleteClick = async (id) => {
      try {
        await apiService.deleteEvent(id);
        notification.value = {
          title: 'Success',
          content: 'Event deleted successfully!',
          type: 'success'
        };
        reloadEventTable();
      } catch (error) {
        notification.value = {
          title: 'Error',
          content: `Error when deleting Event: ${error}`,
          type: 'danger'
        };
      }
    };

    onMounted(async () => {
      await getTalentsData();
    });

    return {
      heading,
      subheading,
      icon,
      isUpdateMode,
      showModal,
      onSubmit,
      notification,
      talentOptions,
      selectedTalents,
      currentEvent,
      eventTable,
      handleSelectedTalentsChange,
      handleUpdateTrackList,
      toggleModal,
      handleSubmit,
      handleUpdateClick,
      handleDeleteClick
    };
  }
});
</script>
