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
          <input name="lyricist" id="lyricist" placeholder="lyricist"
            v-model="currentDiscography.lyricist" type="text" class="form-control">
        </div>
        <div class="position-relative form-group">
          <label for="composer">Composer</label>
          <input name="composer" id="composer" placeholder="Composer"
            v-model="currentDiscography.composer" type="text" class="form-control">
        </div>
        <div class="position-relative form-group">
          <label for="arrangement">Arrangement</label>
          <input name="arrangement" id="arrangement" placeholder="Arrangement"
            v-model="currentDiscography.arrangement" type="text" class="form-control">
        </div>
        <div class="position-relative form-group">
          <label for="ensemble_as">ensemble_as</label>
          <input name="ensemble_as" id="ensemble_as" placeholder="Ensemble As"
            v-model="currentDiscography.ensemble_as" type="text" class="form-control">
        </div>
        <div class="position-relative form-group">
          <label for="album">Album</label>
          <select name="select" id="album" v-model="currentDiscography.album_id" class="form-control">
            <option :value=null></option>
            <option v-for="album in albumOptions" :key="album.id" :value="album.id">
              {{ album.name }}
            </option>
          </select>
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
          :normalText="isUpdateMode ? 'Update Discography' : 'Add New Discography'" />
      </template>
    </modal-component>
    <DiscographyTable></DiscographyTable>
    <table-component :footer="true" :fields="fields" :items="items" @search="onSearchChange"
      @changeOrder="handleChangeOrder" @deleteRow="handleDelete" @updateRow="handleUpdate"></table-component>

    <pagination-component :currentPage="currentPage" :perPage="itemsPerPage" :totalItems="totalItems"
      :totalPages="totalPages" @load-page="loadPage" @change-page-size="changePageSize">
    </pagination-component>
  </div>
</template>

<script>
import { ref, onMounted, reactive, defineComponent } from "vue";
import ModalComponent from "../../Layout/Components/ModalComponent.vue";
import TableComponent from "../../Layout/Components/TableComponent.vue";
import PageTitleComponent from "../../Layout/Components/PageTitleComponent.vue";
import PaginationComponent from "../../Layout/Components/PaginationComponent.vue";
import ButtonSpinner from "../../Layout/Components/ButtonSpinner.vue";
import NotificationComponent from "../../Layout/Components/NotificationComponent.vue";
import TagSelectorComponent from "../../Layout/Components/TagSelectorComponent.vue";
import DiscographyTable from "../../Pages/Vtubers/Table/DiscographyTable.vue";
import { apiService } from "../../supabase/apiService";

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
    const icon = ref("pe-7s-musiclist icon-gradient bg-premium-dark");

    const isUpdateMode = ref(false);
    const showModal = ref(false);
    const orderBy = ref("created_at");
    const orderDirection = ref("desc");
    const search = ref("");
    const currentPage = ref(1);
    const itemsPerPage = ref(40);
    const totalItems = ref(0);
    const totalPages = ref(0);
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

    const fields = ref([
      { key: "id", value: "ID" },
      { key: "name", value: "Name" },
      { key: "original_name", value: "original Name" },
      { key: "released_date", value: "Released Date" },
      { key: "album", value: "album" },
      { key: "talents", value: "talent" },
    ]);

    const items = ref([]);
    const albumOptions = ref([]);
    const talentOptions = ref([]);
    const selectedTalents = ref([]);

    const getDiscographiesData = async (newPage, newPageSize) => {
      const result = await apiService.getDiscographiesWithPaging(newPage, newPageSize, orderBy.value, orderDirection.value, search.value);
      if (!result.error) {
        items.value = result.items;
        totalItems.value = result.totalItems;
        totalPages.value = result.totalPages;
        itemsPerPage.value = newPageSize;
      }
    };

    const getAlbumsData = async () => {
      const result = await apiService.getAlbums();
      albumOptions.value = result;
    };

    const getTalentsData = async () => {
      const result = await apiService.getTalents();
      talentOptions.value = result;
    };

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
        cleanCurrentDiscography();
        toggleModal();
        onSubmit.value = false;
        notification.value = { title: "Success", content: "Discography created successfully!", type: "success" };
        getDiscographiesData(currentPage.value, itemsPerPage.value);
      } catch (error) {
        onSubmit.value = false;
        notification.value = { title: "Error", content: `Error when submitting talent: ${error}`, type: "danger" };
      }
    }

    const updateDiscography = async () => {
      try {
        await apiService.updateDiscography(currentDiscography, selectedTalents.value);
        cleanCurrentDiscography();
        toggleModal();
        onSubmit.value = false;
        notification.value = {
          title: "Success",
          content: "Discography updated successfully!",
          type: "success",
        };
        getDiscographiesData(currentPage.value, itemsPerPage.value);
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

    const handleUpdate = (updateId) => {
      isUpdateMode.value = true;
      const { album, talents, discography_talent, ...selectedItem } = items.value.find(x => x.id === updateId);

      if (selectedItem) {
        Object.assign(currentDiscography, selectedItem);
      }

      if (discography_talent && discography_talent.length > 0) {
        selectedTalents.value = discography_talent.map(t => t.talent);
      } else {
        selectedTalents.value = [];
      }

      showModal.value = true;
    };

    const handleDelete = async (id) => {
      const confirmDelete = confirm(`Are you sure you want to delete Discography ${id}?`);
      if (confirmDelete) {
        try {
          await apiService.deleteDiscography(id);
          notification.value = { title: "Success", content: "Discography deleted successfully!", type: "success" };
          getDiscographiesData(1, itemsPerPage.value);
        } catch (error) {
          notification.value = { title: "Error", content: `Error when deleting discography: ${error}`, type: "danger" };
        }
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

    const onSearchChange = (searchTerm) => {
      search.value = searchTerm;
      getDiscographiesData(1, itemsPerPage.value);
    };

    const handleChangeOrder = ({ orderDirection: newOrderDirection, orderBy: newOrderBy }) => {
      orderDirection.value = newOrderDirection;
      orderBy.value = newOrderBy;
      getDiscographiesData(currentPage.value, itemsPerPage.value);
    };

    const loadPage = (page) => {
      currentPage.value = page;
      getDiscographiesData(currentPage.value, itemsPerPage.value);
    };

    const changePageSize = async (newPageSize) => {
      itemsPerPage.value = newPageSize;
      await getDiscographiesData(1, itemsPerPage.value);
    };

    const handleselectedTalentsChange = (newSelection) => {
      selectedTalents.value = newSelection;
    };

    onMounted(() => {
      getDiscographiesData(currentPage.value, itemsPerPage.value);
      getAlbumsData();
      getTalentsData();
    });

    return {
      heading,
      subheading,
      icon,
      isUpdateMode,
      showModal,
      onSubmit,
      orderBy,
      orderDirection,
      search,
      currentPage,
      itemsPerPage,
      totalItems,
      totalPages,
      fields,
      items,
      albumOptions,
      talentOptions,
      selectedTalents,
      currentDiscography,
      notification,
      toggleModal,
      loadPage,
      getAlbumsData,
      getTalentsData,
      handleSubmit,
      handleUpdate,
      handleDelete,
      cleanCurrentDiscography,
      changePageSize,
      onSearchChange,
      handleChangeOrder,
      handleselectedTalentsChange
    };
  }
});
</script>
