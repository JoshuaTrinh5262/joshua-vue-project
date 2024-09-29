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
          <label for="name">Release Date</label>
          <input type="date" name="release_date" placeholder="Album Release Date" v-model="currentAlbum.released_date"
            class="form-control" />
        </div>
        <div class="position-relative form-group">
          <label for="name">Release Date</label>
          <div class="tag-container">
            <div class="tags">
              <span v-for="talent in selectedTalents" :key="talent.id" class="tag">
                {{ talent.name }}
                <button class="remove-tag" @click="removeTalent(talent)">x</button>
              </span>
            </div>
          </div>
          <select id="talents" v-model="selectedTalents" multiple class="form-control">
            <option v-for="talent in talents" :key="talent.id" :value="talent">{{ talent.name }}</option>
          </select>
        </div>
      </template>
      <template #footer>
        <button class="btn btn-primary" @click="toggleModal">Cancel</button>
        <button-spinner :isLoading="onSubmit" buttonClass="btn btn-primary" @click="handleSubmit"
          :normalText="isUpdateMode ? 'Update Album' : 'Add New Album'" />
      </template>
    </ModalComponent>

    <TableComponent :footer="true" :fields="fields" :items="items" @search="onSearchChange"
      @changeOrder="handleChangeOrder" @deleteRow="handleDelete" @updateRow="handleUpdate"></TableComponent>

    <PaginationComponent :currentPage="currentPage" :perPage="itemsPerPage" :totalItems="totalItems"
      :totalPages="totalPages" @load-page="loadPage" @change-page-size="changePageSize" />
  </div>
</template>

<script>
import { ref, onMounted, defineComponent, reactive } from 'vue';
import ModalComponent from '../../Layout/Components/ModalComponent.vue';
import TableComponent from '../../Layout/Components/TableComponent.vue';
import PageTitleComponent from '../../Layout/Components/PageTitleComponent.vue';
import PaginationComponent from '../../Layout/Components/PaginationComponent.vue';
import NotificationComponent from '../../Layout/Components/NotificationComponent.vue';
import ButtonSpinner from '../../Layout/Components/ButtonSpinner.vue';
import { apiService } from '../../supabase/apiService';

export default defineComponent({
  name: "AlbumsPage",

  components: {
    ModalComponent,
    TableComponent,
    PageTitleComponent,
    PaginationComponent,
    NotificationComponent,
    ButtonSpinner
  },

  setup() {
    const heading = ref('Albums');
    const subheading = ref('Albums Pages');
    const icon = ref('pe-7s-album icon-gradient bg-premium-dark');

    const isUpdateMode = ref(false);
    const showModal = ref(false);
    const onSubmit = ref(false);
    const search = ref('');
    const orderBy = ref('id');
    const orderDirection = ref('asc');
    const currentPage = ref(1);
    const itemsPerPage = ref(20);
    const totalItems = ref(0);
    const totalPages = ref(0);
    const notification = ref(null);

    const currentAlbum = reactive({
      name: null,
      released_date: null,
    });

    const fields = ref([
      { key: 'id', value: 'ID' },
      { key: 'name', value: 'Album Name' },
      { key: 'released_date', value: 'Album Released Date' },
      { key: 'talents', value: 'talent' }
    ]);
    const items = ref([]);
    const talents = ref([]);
    const selectedTalents = ref([]);

    const getAlbumsData = async (newPage, newPageSize) => {
      const result = await apiService.getAlbumsWithPaging(newPage, newPageSize, orderBy.value, orderDirection.value, search.value);

      if (!result.error) {
        items.value = result.items;
        totalItems.value = result.totalItems;
        totalPages.value = result.totalPages;
        itemsPerPage.value = newPageSize;
      }
    };

    const getTalentsData = async () => {
      const result = await apiService.getTalents();
      talents.value = result;
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
        console.log(selectedTalents.value);
        await apiService.createAlbum(currentAlbum, selectedTalents.value);
        cleanCurrentAlbum();
        toggleModal();
        onSubmit.value = false;
        notification.value = { title: 'Success', content: 'Album created successfully!', type: 'success' };
        getAlbumsData(currentPage.value, itemsPerPage.value);
      } catch (error) {
        onSubmit.value = false;
        notification.value = { title: 'Error', content: `Error when submitting talent: ${error}`, type: 'danger' };
      }
    }

    const updateAlbum = async () => {
      try {
        await apiService.updateAlbum(currentAlbum);
        cleanCurrentAlbum();
        toggleModal();
        onSubmit.value = false;
        notification.value = {
          title: 'Success',
          content: 'Album updated successfully!',
          type: 'success',
        };
        getAlbumsData(currentPage.value, itemsPerPage.value);
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

    const handleUpdate = (updateId) => {
      isUpdateMode.value = true;
      const { album_talent, talents, ...selectedItem } = items.value.find(x => x.id === updateId);

      if (selectedItem) {
        Object.assign(currentAlbum, selectedItem);
      }

      showModal.value = true;
    };

    const handleDelete = async (id) => {
      const confirmDelete = confirm(`Are you sure you want to delete Album ${id}?`);
      if (confirmDelete) {
        try {
          await apiService.deleteAlbum(id);
          notification.value = { title: 'Success', content: 'Album deleted successfully!', type: 'success' };
          getAlbumsData(1, itemsPerPage.value);
        } catch (error) {
          notification.value = { title: 'Error', content: `Error when deleting talent: ${error}`, type: 'danger' };
        }
      }
    };

    const cleanCurrentAlbum = () => {
      Object.assign(currentAlbum, {
        name: null,
        released_date: null,
      });

      if (currentAlbum.id) {
        delete currentAlbum.id;
      }
    };

    const toggleModal = () => {
      isUpdateMode.value = false;
      cleanCurrentAlbum();
      showModal.value = !showModal.value;
    };

    const loadPage = (page) => {
      currentPage.value = page;
      getAlbumsData(currentPage.value, itemsPerPage.value);
    };

    const onSearchChange = (searchTerm) => {
      search.value = searchTerm;
      getAlbumsData(1, itemsPerPage.value);
    };

    const handleChangeOrder = ({ orderDirection: newOrderDirection, orderBy: newOrderBy }) => {
      orderDirection.value = newOrderDirection;
      orderBy.value = newOrderBy;
      getAlbumsData(currentPage.value, itemsPerPage.value);
    };

    const changePageSize = async (newPageSize) => {
      itemsPerPage.value = newPageSize;
      await getAlbumsData(1, itemsPerPage.value);
    };

    onMounted(() => {
      getAlbumsData(currentPage.value, itemsPerPage.value);
      getTalentsData();
    });

    const removeTalent = (talent) => {
      selectedTalents.value = selectedTalents.value.filter(item => item.id !== talent.id);
    };

    return {
      heading,
      subheading,
      icon,
      isUpdateMode,
      showModal,
      onSubmit,
      search,
      orderBy,
      orderDirection,
      fields,
      items,
      talents,
      selectedTalents,
      removeTalent,
      notification,
      currentAlbum,
      currentPage,
      itemsPerPage,
      totalItems,
      totalPages,
      toggleModal,
      createAlbum,
      loadPage,
      changePageSize,
      getAlbumsData,
      getTalentsData,
      onSearchChange,
      handleSubmit,
      handleUpdate,
      handleDelete,
      handleChangeOrder,
    };
  }
});
</script>

<style scoped>
.tag-container {
  margin-top: 10px;
}

.tags {
  display: flex;
  flex-wrap: wrap;
}

.tag {
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  padding: 5px 10px;
  margin: 5px;
  display: flex;
  align-items: center;
}

.remove-tag {
  background: none;
  border: none;
  color: white;
  margin-left: 5px;
  cursor: pointer;
}
</style>