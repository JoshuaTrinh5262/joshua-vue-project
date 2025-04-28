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

    <modal-component :title="isUpdateMode ? 'Update Discography' : 'Add New Discography'" :isOpen="showModal"
      @closeModal="toggleModal">
      <template #body>
        <div class="position-relative form-group">
          <label for="discography_name">Discography Name</label>
          <input name="discography_name" id="discography_name" placeholder="Discography Name"
            v-model="currentDiscography.name" type="text" class="form-control">
        </div>
        <div class="position-relative form-group">
          <label for="original_name">Original Name</label>
          <input name="original_name" id="original_name" placeholder="Original Name"
            v-model="currentDiscography.original_name" type="text" class="form-control">
        </div>
        <div class="position-relative form-group">
          <label for="released_date">Released Date</label>
          <input name="released_date" id="released_date" placeholder="Released Date"
            v-model="currentDiscography.released_date" type="date" class="form-control">
        </div>
        <div class="position-relative form-group">
          <label for="lyricist">Lyricist</label>
          <input name="lyricist" id="lyricist" placeholder="lyricist" v-model="currentDiscography.lyricist" type="text"
            class="form-control">
        </div>
        <div class="position-relative form-group">
          <label for="composer">Composer</label>
          <input name="composer" id="composer" placeholder="Composer" v-model="currentDiscography.composer" type="text"
            class="form-control">
        </div>
        <div class="position-relative form-group">
          <label for="arrangement">Arrangement</label>
          <input name="arrangement" id="arrangement" placeholder="Arrangement" v-model="currentDiscography.arrangement"
            type="text" class="form-control">
        </div>
        <div class="position-relative form-group">
          <label for="ensemble_as">ensemble_as</label>
          <input name="ensemble_as" id="ensemble_as" placeholder="Ensemble As" v-model="currentDiscography.ensemble_as"
            type="text" class="form-control">
        </div>
        <div class="position-relative form-group">
          <label for="album">Album</label>
          <select name="select" id="album" v-model="currentDiscography.album_id" class="form-control">
            <option :value=null></option>
            <option v-for="album in vtuberStore.albumOptions" :key="album.id" :value="album.id">
              {{ album.name }}
            </option>
          </select>
        </div>
        <div class="position-relative form-group">
          <label for="talent">Talent</label>
          <TagSelectorComponent :items="vtuberStore.talentOptions" :model-value="selectedTalents"
            @update:modelValue="handleselectedTalentsChange"></TagSelectorComponent>
        </div>
      </template>
      <template #footer>
        <button class="btn btn-primary" @click="toggleModal">Cancel</button>
        <button-spinner :isLoading="onSubmit" buttonClass="btn btn-primary" @click="handleSubmit"
          :normalText="isUpdateMode ? 'Update Discography' : 'Add New Discography'" />
      </template>
    </modal-component>
    <DiscographyTable ref="discographyTable" @handleUpdate="handleUpdateClick" @handleDelete="handleDeleteClick">
    </DiscographyTable>
  </div>
</template>

<script>
import { ref, onMounted, reactive, defineComponent } from "vue";
import ModalComponent from "@/Layout/Components/ModalComponent.vue";
import TableComponent from "@/Layout/Components/TableComponent.vue";
import PageTitleComponent from "@/Layout/Components/PageTitleComponent.vue";
import PaginationComponent from "@/Layout/Components/PaginationComponent.vue";
import ButtonSpinner from "@/Layout/Components/ButtonSpinner.vue";
import NotificationComponent from "@/Layout/Components/NotificationComponent.vue";
import TagSelectorComponent from "@/Layout/Components/TagSelectorComponent.vue";
import DiscographyTable from "@/Pages/Vtubers/Table/DiscographyTable.vue";
import { apiService } from "@/supabase/apiService";
import { useVtuberStore } from "@/stores/useVtuberStore";

export default defineComponent({
  name: "DiscographiesPage",

  components: {
    ModalComponent,
    TableComponent,
    PageTitleComponent,
    PaginationComponent,
    NotificationComponent,
    ButtonSpinner,
    TagSelectorComponent,
    DiscographyTable
  },

  setup() {
    const heading = ref("Discographies");
    const subheading = ref("Dive into the Musical Journeys of Talented Artists Across Generations");
    const icon = ref("pe-7s-musiclist icon-gradient bg-tempting-azure");

    const vtuberStore = useVtuberStore();

    const isUpdateMode = ref(false);
    const showModal = ref(false);
    const notification = ref(null);
    const onSubmit = ref(false);

    const currentDiscography = reactive({
      name: null,
      original_name: null,
      released_date: null,
      album_id: null,
      lyricist: null,
      composer: null,
      arrangement: null,
      ensemble_as: null
    });

    const discographyTable = ref(null);
    const selectedTalents = ref([]);

    const handleSubmit = async () => {
      onSubmit.value = true;
      if (isUpdateMode.value) {
        updateDiscography();
      } else {
        createDiscography();
      }
    };

    const createDiscography = async () => {
      try {
        await apiService.createDiscography(currentDiscography, selectedTalents.value);
        toggleModal();
        reloadDiscographyTable();
        onSubmit.value = false;
        notification.value = { title: "Success", content: "Discography created successfully!", type: "success" };
      } catch (error) {
        onSubmit.value = false;
        notification.value = { title: "Error", content: `Error when submitting talent: ${error}`, type: "danger" };
      }
    }

    const updateDiscography = async () => {
      try {
        await apiService.updateDiscography(currentDiscography, selectedTalents.value);
        toggleModal();
        reloadDiscographyTable();
        onSubmit.value = false;

        notification.value = {
          title: "Success",
          content: "Discography updated successfully!",
          type: "success",
        };
        isUpdateMode.value = false;
      } catch (error) {
        onSubmit.value = false;
        notification.value = {
          title: "Error",
          content: `Error when updating Discography: ${error}`,
          type: "danger",
        };
        isUpdateMode.value = false;
      }
    };

    const handleUpdateClick = (updateData) => {
      isUpdateMode.value = true;

      if (updateData) {
        currentDiscography.id = updateData.id;
        currentDiscography.name = updateData.name;
        currentDiscography.original_name = updateData.original_name;
        currentDiscography.agency_description = updateData.agency_description;
        currentDiscography.released_date = updateData.released_date;
        currentDiscography.album_id = updateData.album_id;
        currentDiscography.lyricist = updateData.lyricist;
        currentDiscography.composer = updateData.composer;
        currentDiscography.arrangement = updateData.arrangement;
        currentDiscography.ensemble_as = updateData.ensemble_as;
        selectedTalents.value = updateData.discography_talent.map(item => ({
          id: item.id,
          name: item.name
        }));
      }

      showModal.value = true;
    };

    const handleDeleteClick = async (id) => {
      try {
        await apiService.deleteDiscography(id);
        notification.value = {
          title: 'Success',
          content: 'Discography deleted successfully!',
          type: 'success'
        };
        reloadDiscographyTable();
      } catch (error) {
        notification.value = {
          title: 'Error',
          content: `Error when deleting Discography: ${error}`,
          type: 'danger'
        };
      }
    };

    const cleanCurrentDiscography = () => {
      Object.assign(currentDiscography, {
        name: null,
        original_name: null,
        released_date: null,
        album_id: null,
        lyricist: null,
        composer: null,
        arrangement: null,
        ensemble_as: null
      });

      if (currentDiscography.id) {
        delete currentDiscography.id;
      }
      selectedTalents.value = [];
    };

    const toggleModal = () => {
      isUpdateMode.value = false;
      cleanCurrentDiscography();
      showModal.value = !showModal.value;
    };

    const reloadDiscographyTable = () => {
      if (discographyTable.value) {
        discographyTable.value.getDiscographiesData();
      }
    };

    const handleselectedTalentsChange = (newSelection) => {
      selectedTalents.value = newSelection;
    };

    onMounted(async () => {
      vtuberStore.fetchTalents();
      vtuberStore.fetchAlbums();
    });

    return {
      heading,
      subheading,
      icon,
      vtuberStore,
      isUpdateMode,
      showModal,
      onSubmit,
      selectedTalents,
      currentDiscography,
      notification,
      discographyTable,
      toggleModal,
      handleSubmit,
      handleUpdateClick,
      handleDeleteClick,
      cleanCurrentDiscography,
      handleselectedTalentsChange
    };
  }
});
</script>
