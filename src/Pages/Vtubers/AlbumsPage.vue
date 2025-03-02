<template>
  <div>
    <PageTitleComponent :heading="heading" :subheading="subheading" :icon="icon">
      <template #actions>
        <button type="button" @click="toggleModal" class="btn-shadow d-inline-flex align-items-center btn btn-primary">
          Create New
        </button>
      </template>
    </PageTitleComponent>

    <notification-component v-model:notification="notification"></notification-component>

    <ModalComponent :title="isUpdateMode ? 'Update Album' : 'Add New Album'" :isOpen="showModal"
      @closeModal="toggleModal">
      <template #body>
        <div class="position-relative form-group">
          <label for="name">Album Name</label>
          <input name="album_name" placeholder="Album Name" v-model="currentAlbum.name" type="text"
            class="form-control" />
        </div>
        <div class="position-relative form-group">
          <label for="album_type">Album Type</label>
          <select id="album_type" v-model="currentAlbum.album_type" class="form-control">
            <option value="single">Single</option>
            <option value="extended_play">Extended Play</option>
            <option value="album">Album</option>
          </select>
        </div>
        <div class="position-relative form-group">
          <label for="ensemble_as">Ensemble As</label>
          <input type="text" name="ensemble_as" placeholder="Ensemble As" v-model="currentAlbum.ensemble_as"
            class="form-control" />
        </div>
        <div class="position-relative form-group">
          <label for="name">Release Date</label>
          <input type="date" name="release_date" placeholder="Album Release Date" v-model="currentAlbum.released_date"
            class="form-control" />
        </div>
        <div class="position-relative form-group">
          <label for="talent">Talent</label>
          <TagSelectorComponent :items="talentOptions" :model-value="selectedTalents"
            @update:modelValue="handleselectedTalentsChange"></TagSelectorComponent>
        </div>
      </template>
      <template #footer>
        <button class="btn btn-primary" @click="toggleModal">Cancel</button>
        <button-spinner :isLoading="onSubmit" buttonClass="btn btn-primary" @click="handleSubmit"
          :normalText="isUpdateMode ? 'Update Album' : 'Add New Album'" />
      </template>
    </ModalComponent>

    <AlbumTable ref="albumTable" @handleUpdate="handleUpdateClick" @handleDelete="handleDeleteClick"></AlbumTable>
  </div>
</template>

<script>
import { ref, onMounted, defineComponent, reactive } from 'vue';
import ModalComponent from '../../Layout/Components/ModalComponent.vue';
import PageTitleComponent from '../../Layout/Components/PageTitleComponent.vue';
import NotificationComponent from '../../Layout/Components/NotificationComponent.vue';
import ButtonSpinner from '../../Layout/Components/ButtonSpinner.vue';
import TagSelectorComponent from '../../Layout/Components/TagSelectorComponent.vue';
import AlbumTable from "../../Pages/Vtubers/Table/AlbumTable.vue";
import { apiService } from '../../supabase/apiService';

export default defineComponent({
  name: "AlbumsPage",

  components: {
    ModalComponent,
    PageTitleComponent,
    NotificationComponent,
    ButtonSpinner,
    TagSelectorComponent,
    AlbumTable,
  },

  setup() {
    const heading = ref('Albums');
    const subheading = ref('Albums Pages');
    const icon = ref('pe-7s-album icon-gradient bg-tempting-azure');

    const isUpdateMode = ref(false);
    const showModal = ref(false);
    const onSubmit = ref(false);
    const notification = ref(null);

    const currentAlbum = reactive({
      name: null,
      album_type: null,
      ensemble_as: null,
      released_date: null,
    });

    const albumTable = ref(null);
    const talentOptions = ref([]);
    const selectedTalents = ref([]);

    const getTalentsData = async () => {
      const result = await apiService.getTalents();
      talentOptions.value = result;
    };

    const handleSubmit = async () => {
      onSubmit.value = true;
      if (isUpdateMode.value) {
        updateAlbum();
      } else {
        createAlbum();
      }
    };

    const createAlbum = async () => {
      try {
        await apiService.createAlbum(currentAlbum, selectedTalents.value);
        cleanCurrentAlbum();
        toggleModal();
        reloadAlbumTable();
        onSubmit.value = false;
        notification.value = { title: 'Success', content: 'Album created successfully!', type: 'success' };
        reloadAlbumTable();
      } catch (error) {
        onSubmit.value = false;
        notification.value = { title: 'Error', content: `Error when submitting talent: ${error}`, type: 'danger' };
      }
    }

    const updateAlbum = async () => {
      try {
        await apiService.updateAlbum(currentAlbum, selectedTalents.value);
        cleanCurrentAlbum();
        toggleModal();
        reloadAlbumTable();
        onSubmit.value = false;
        notification.value = {
          title: 'Success',
          content: 'Album updated successfully!',
          type: 'success',
        };
        reloadAlbumTable();
        isUpdateMode.value = false;
      } catch (error) {
        onSubmit.value = false;
        notification.value = {
          title: 'Error',
          content: `Error when updating Album: ${error}`,
          type: 'danger',
        };
        isUpdateMode.value = false;
      }
    };

    const cleanCurrentAlbum = () => {
      Object.assign(currentAlbum, {
        name: null,
        album_type: null,
        ensemble_as: null,
        released_date: null,
      });

      if (currentAlbum.id) {
        delete currentAlbum.id;
      }
      selectedTalents.value = [];
    };

    const toggleModal = () => {
      isUpdateMode.value = false;
      cleanCurrentAlbum();
      showModal.value = !showModal.value;
    };

    const reloadAlbumTable = () => {
      if (albumTable.value) {
        albumTable.value.getAlbumsData();
      }
    };

    const handleUpdateClick = (updateData) => {
      isUpdateMode.value = true;

      if (updateData) {
        currentAlbum.id = updateData.id;
        currentAlbum.name = updateData.name;
        currentAlbum.album_type = updateData.album_type;
        currentAlbum.ensemble_as = updateData.ensemble_as;
        currentAlbum.released_date = updateData.released_date;
        selectedTalents.value = updateData.album_talent.map(item => ({
          id: item.talent.id,
          name: item.talent.name
        }));
      }

      showModal.value = true;
    };

    const handleDeleteClick = async (id) => {
      try {
        await apiService.deleteAlbum(id);
        notification.value = {
          title: 'Success',
          content: 'Album deleted successfully!',
          type: 'success'
        };
        reloadAlbumTable();
      } catch (error) {
        notification.value = {
          title: 'Error',
          content: `Error when deleting Album: ${error}`,
          type: 'danger'
        };
      }
    };

    const handleselectedTalentsChange = (newSelection) => {
      selectedTalents.value = newSelection;
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
      talentOptions,
      selectedTalents,
      notification,
      currentAlbum,
      albumTable,
      toggleModal,
      createAlbum,
      getTalentsData,
      handleSubmit,
      handleUpdateClick,
      handleDeleteClick,
      handleselectedTalentsChange
    };
  }
});
</script>
