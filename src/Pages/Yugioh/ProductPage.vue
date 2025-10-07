<template>
  <div>
    <page-title-component :heading=heading :subheading=subheading :icon=icon>
      <template v-slot:actions>
        <button type="button" @click="toggleModal" class="btn btn-primary">
          Add New Product
        </button>
      </template>
    </page-title-component>
    <notification-component v-model:notification="notification"></notification-component>
    <table-component :footer=true :fields="fields" :items="items" urlType="product" @search="onSearch"
      @deleteRow="handleDelete">
    </table-component>
    <modal-component title="Add New Product" :isOpen="showModal" @closeModal="toggleModal">
      <template #body>
        <div class="form">
          <div class="position-relative form-group">
            <label for="name">Name</label>
            <input name="name" id="name" placeholder="Enter product name" type="text" v-model=currentProduct.name
              class="form-control">
            <small class="text-danger"></small>
          </div>
        </div>
        <div class="form-row">
          <div class="col-md-6">
            <div class="position-relative form-group">
              <label for="category">Category</label>
              <select name="category" id="category" v-model=currentProduct.category class="form-control">
                <option value="structure_deck">Structure Deck</option>
                <option value="starter_deck">Starter Deck</option>
                <option value="prize_card">Prize Card</option>
                <option value="tactical_try_deck">Tactical Try Deck</option>
                <option value="dual_set">Dual Set</option>
                <option value="booster_pack">Booster Pack</option>
              </select>
              <small class="text-danger"></small>
            </div>
          </div>
          <div class="col-md-6">
            <div class="position-relative form-group">
              <label for="number_of_cards">Number Of Cards</label>
              <input name="number_of_cards" id="number_of_cards" type="number" v-model=currentProduct.number_of_cards
                class="form-control">
              <small class="text-danger"></small>
            </div>
          </div>
        </div>
        <div class="form-row">
          <div class="col-md-6">
            <div class="position-relative form-group">
              <label for="prefix">Prefix</label>
              <input name="prefix" id="prefix" placeholder="prefix" type="text" v-model=currentProduct.prefix
                class="form-control">
              <small class="text-danger"></small>
            </div>
          </div>
          <div class="col-md-6">
            <div class="position-relative form-group">
              <label for="release_date">Release Date</label>
              <input name="release_date" id="release_date" placeholder="Release Date" type="date" v-model=currentProduct.release_date class="form-control">
              <small class="text-danger"></small>
            </div>
          </div>
        </div>
        <div class="form-row">
          <div class="col-md-6">
            <div class="position-relative form-group">
              <label for="format">Format</label>
              <input name="format" id="format" placeholder="Format" type="text" v-model=currentProduct.format
                class="form-control">
              <small class="text-danger"></small>
            </div>
          </div>
          <div class="col-md-6">
          </div>
        </div>
      </template>
      <template #footer>
        <button class="btn btn-primary" @click="toggleModal">Cancel</button>
        <button-spinner :isLoading="onSubmit" buttonClass="btn btn-primary" @click="handleSubmit" normalText="Save" />
      </template>
    </modal-component>
    <pagination-component :currentPage="currentPage" :perPage="itemsPerPage" :totalItems="totalItems"
      :totalPages="totalPages" @load-page="changeCurrentPage" @change-page-size="changePageSize"></pagination-component>
  </div>
</template>

<script>
import { defineComponent, ref, reactive, onMounted } from "vue";
import PageTitleComponent from "@/Layout/Components/PageTitleComponent.vue";
import NotificationComponent from "@/Layout/Components/NotificationComponent.vue";
import TableComponent from "@/Layout/Components/TableComponent.vue";
import PaginationComponent from "@/Layout/Components/PaginationComponent.vue";
import ModalComponent from "@/Layout/Components/ModalComponent.vue";
import ButtonSpinner from "@/Layout/Components/ButtonSpinner.vue";
import { apiService } from "@/supabase/apiService";

export default defineComponent({
  name: "YugiohProductPage",

  components: {
    PageTitleComponent,
    NotificationComponent,
    TableComponent,
    PaginationComponent,
    ModalComponent,
    ButtonSpinner
  },

  setup() {
    const heading = ref("Yu-Gi-Oh Product");
    const subheading = ref("Yu-Gi-Oh Product page");
    const icon = ref("pe-7s-copy-file icon-gradient bg-tempting-azure");

    const currentPage = ref(1);
    const itemsPerPage = ref(20);
    const totalItems = ref(0);
    const totalPages = ref(0);
    const orderBy = ref("release_date");
    const orderDirection = ref("desc");
    const search = ref("");
    const notification = ref(null);
    const onSubmit = ref(false);
    const currentProduct = reactive({
      name: null,
      release_date: null,
      number_of_cards: null,
      prefix: null,
      category: null,
    });
    const showModal = ref(false);

    const fields = ref([
      {
        key: "id",
        value: "Id"
      },
      {
        key: "name",
        value: "Name"
      },
      {
        key: "release_date",
        value: "release_date"
      },
      {
        key: "category",
        value: "Category"
      },
      {
        key: "format",
        value: "format"
      },
      {
        key: "prefix",
        value: "prefix"
      },
    ]);
    const items = ref([]);

    const onSearch = (newSearchTerm) => {
      search.value = newSearchTerm;
      getYugiohProductsData(1, itemsPerPage.value);
    };

    const getYugiohProductsData = async (newPage, newPageSize) => {
      const result = await apiService.getYugiohProductsWithPaging(newPage, newPageSize, orderBy.value, orderDirection.value, search.value);
      if (!result.error) {
        items.value = result.items;
        totalItems.value = result.totalItems;
        totalPages.value = result.totalPages;
        itemsPerPage.value = newPageSize;
      }
    };

    const changePageSize = async (newPageSize) => {
      await getYugiohProductsData(1, newPageSize);
    };

    const changeCurrentPage = async (newPage) => {
      currentPage.value = newPage;
      await getYugiohProductsData(currentPage.value, itemsPerPage.value);
    };

    const toggleModal = () => {
      showModal.value = !showModal.value;
    };

    const handleSubmit = async () => {
      onSubmit.value = true;
      createProduct();
    };

    const createProduct = async () => {
      try {
        var response = await apiService.createYugiohProduct(currentProduct);
        cleanCurrentProduct();
        toggleModal();
        onSubmit.value = false;

        if (response && response.error) {
          notification.value = {
            title: "Error",
            content: response.error,
            type: "danger"
          };
        } else {
          notification.value = {
            title: "Success",
            content: "Product created successfully!",
            type: "success"
          };
          reloadProductTable();
        }
      } catch (error) {
        onSubmit.value = false;
        notification.value = {
          title: "Error",
          content: `Error when submitting product: ${error.message}`,
          type: "danger"
        };
      }
    }

    const handleDelete = async (id) => {
      try {
        var response = await apiService.deleteYugiohProduct(id);

        if (response && response.error) {
          notification.value = {
            title: 'Error',
            content: response.error,
            type: 'danger'
          };
        } else {
          notification.value = {
            title: 'Success',
            content: 'Product deleted successfully!',
            type: 'success'
          };
          reloadProductTable();
        }
      } catch (error) {
        notification.value = {
          title: 'Error',
          content: `Error when deleting Product: ${error}`,
          type: 'danger'
        };
      }
    };

    const cleanCurrentProduct = () => {
      Object.assign(currentProduct, {
        name: null,
        release_date: null,
        number_of_cards: null,
        prefix: null,
        category: null,
        format: null
      });

      if (currentProduct.id) {
        delete currentProduct.id;
      }
    };

    const reloadProductTable = () => {
      getYugiohProductsData(1, itemsPerPage.value);
    };

    onMounted(async () => {
      await getYugiohProductsData(currentPage.value, itemsPerPage.value);
    });

    return {
      heading,
      subheading,
      icon,
      currentPage,
      itemsPerPage,
      totalItems,
      totalPages,
      fields,
      items,
      notification,
      showModal,
      onSubmit,
      currentProduct,
      onSearch,
      changePageSize,
      changeCurrentPage,
      toggleModal,
      handleSubmit,
      handleDelete
    };
  },
});
</script>
