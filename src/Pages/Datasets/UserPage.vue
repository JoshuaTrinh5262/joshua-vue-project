<template>
  <div>
    <page-title-component :heading=heading :subheading=subheading :icon=icon>
      <template v-slot:actions>
        <button type="button" @click="toggleModal" class="btn-shadow d-inline-flex align-items-center btn btn-primary">
          Add New User
        </button>
      </template>
    </page-title-component>

    <NotificationComponent v-model:notification="notification"></NotificationComponent>

    <modal-component title="Add New User" :isOpen="showModal" @closeModal="toggleModal">
      <template #body>
        <div class="form">
          <div class="position-relative form-group">
            <label for="user_email">User Email</label>
            <input name="user_email" id="user_email" placeholder="Enter email..." type="email" class="form-control" autocomplete="off"
              v-model="currentUser.email">
            <small v-if="validationErrors.email" class="text-danger">{{ validationErrors.email }}</small>
          </div>
          <div class="position-relative form-group">
            <label for="user_password">User Password</label>
            <div class="input-group">
              <input name="user_password" :type="isPasswordVisible ? 'text' : 'password'" class="form-control" id="user_password" autocomplete="off"
                v-model="currentUser.password" placeholder="Enter password...">
              <div class="input-group-append" @click="togglePassword">
                <span class="input-group-text">Show</span>
              </div>
            </div>
            <small v-if="validationErrors.password" class="text-danger">{{ validationErrors.password }}</small>
          </div>
          <div class="position-relative form-group">
            <label for="confirm_user_password">Confirm User Password</label>
            <div class="input-group">
              <input :type="isConfirmPasswordVisible ? 'text' : 'password'" class="form-control"
                id="confirm_user_password" v-model="currentUser.confirm_password"
                placeholder="Enter confirm password..." />
              <div class="input-group-append" @click="toggleConfirmPassword">
                <span class="input-group-text">Show</span>
              </div>
            </div>
            <small v-if="validationErrors.confirm_password" class="text-danger">{{ validationErrors.confirm_password
              }}</small>
          </div>
          <div class="position-relative form-check">
            <label class="form-check-label"><input type="checkbox" class="form-check-input"
                v-model="currentUser.email_confirm">Auto Confirm User ?</label>
          </div>
        </div>
      </template>
      <template #footer>
        <button class="btn btn-primary" @click="toggleModal">Cancel</button>
        <button-spinner :isLoading="onSubmit" buttonClass="btn btn-primary" @click="handleSubmitUser"
          normalText="Add New Talent" />
      </template>
    </modal-component>
    <table-component :footer=true :fields="fields" :items="items" @deleteRow="handleDeleteUser"></table-component>

    <pagination-component :currentPage="currentPage" :perPage="itemsPerPage" :totalItems="totalItems"
      :totalPages="totalPages"></pagination-component>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, reactive } from "vue";
import PageTitleComponent from "../../Layout/Components/PageTitleComponent.vue";
import NotificationComponent from '../../Layout/Components/NotificationComponent.vue';
import TableComponent from "../../Layout/Components/TableComponent.vue";
import PaginationComponent from "../../Layout/Components/PaginationComponent.vue";
import ModalComponent from "../../Layout/Components/ModalComponent.vue";
import ButtonSpinner from "../../Layout/Components/ButtonSpinner.vue";
import { validateUserForm } from '../../utils/validations';
import { apiService } from "../../supabase/apiService";

export default defineComponent({
  name: "UserPage",

  components: {
    PageTitleComponent,
    NotificationComponent,
    TableComponent,
    PaginationComponent,
    ModalComponent,
    ButtonSpinner
  },

  setup() {
    const heading = ref("User");
    const subheading = ref("User");
    const icon = ref("pe-7s-users icon-gradient bg-tempting-azure");

    const showModal = ref(false);
    const onSubmit = ref(false);
    const isPasswordVisible = ref(false);
    const isConfirmPasswordVisible = ref(false);
    const notification = ref(null);
    const currentUser = reactive({
      email: null,
      password: null,
      confirm_password: null,
      email_confirm: false
    });
    const validationErrors = ref({});

    const currentPage = ref(0);
    const itemsPerPage = ref(20);
    const totalItems = ref(0);
    const totalPages = ref(0);
    const fields = ref([
      {
        key: "id",
        value: "Id"
      },
      {
        key: "email",
        value: "email"
      },
      {
        key: "last_sign_in_at",
        value: "last Sign In"
      },
      {
        key: "user_role",
        value: "User Role"
      },
    ]);
    const items = ref([]);

    const toggleModal = () => {
      showModal.value = !showModal.value;
    };

    const togglePassword = () => {
      isPasswordVisible.value = !isPasswordVisible.value;
    };

    const toggleConfirmPassword = () => {
      isConfirmPasswordVisible.value = !isConfirmPasswordVisible.value;
    };


    const getUsersData = async (newPage, newPageSize) => {
      const result = await apiService.getAuthUsers(newPage, newPageSize);
      if (!result.error) {
        items.value = result.items;
        totalItems.value = result.totalItems;
        totalPages.value = result.totalPages;
        itemsPerPage.value = newPageSize;
      }
    };

    const createUser = async () => {
      try {
        await apiService.createAuthUser(currentUser);
        cleanCurrentUser();
        toggleModal();
        onSubmit.value = false;
        notification.value = {
          title: 'Success',
          content: 'User created successfully!',
          type: 'success'
        };
        getUsersData();
      } catch (error) {
        onSubmit.value = false;
        notification.value = {
          title: 'Error',
          content: `Error when submitting User:${error}`,
          type: 'danger'
        };
      }
    };

    const handleSubmitUser = async () => {
      onSubmit.value = true;
      validationErrors.value = validateUserForm(currentUser);
      if (Object.keys(validationErrors.value).length === 0) {
        createUser();
      } else {
        onSubmit.value = false;
        return;
      }
    };

    const handleDeleteUser = async (id) => {
            if (confirm(`Are you sure you want to delete User ${id}?`)) {
                try {
                    await apiService.deleteAuthUser(id);
                    notification.value = {
                        title: "Success",
                        content: "User deleted successfully!",
                        type: "success"
                    };
                    getUsersData();
                } catch (error) {
                    notification.value = {
                        title: "Error",
                        content: `Error when deleting User: ${error}`,
                        type: "danger"
                    };
                }
            }
        };

    const cleanCurrentUser = () => {
      Object.assign(currentUser, {
        email: null,
        password: null,
        confirm_password: null,
        email_confirm: false,
      });
    };

    onMounted(() => {
      getUsersData(currentPage.value, itemsPerPage.value);
    });

    return {
      heading,
      subheading,
      icon,
      showModal,
      onSubmit,
      isPasswordVisible,
      isConfirmPasswordVisible,
      notification,
      currentUser,
      validationErrors,
      currentPage,
      itemsPerPage,
      totalItems,
      totalPages,
      fields,
      items,
      toggleModal,
      togglePassword,
      toggleConfirmPassword,
      handleSubmitUser,
      handleDeleteUser,
    };
  },
});
</script>