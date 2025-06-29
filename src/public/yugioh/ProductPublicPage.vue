<template>
  <breadcrumb-component></breadcrumb-component>
  <div class="card">
    <div class="card-body">
      <h1>Page is under contruction.</h1>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import BreadcrumbComponent from "@/Layout/Components/BreadcrumbComponent.vue";
import TableComponent from "@/Layout/Components/TableComponent.vue";
import PaginationComponent from "@/Layout/Components/PaginationComponent.vue";
import ModalComponent from "@/Layout/Components/ModalComponent.vue";
import ButtonSpinner from "@/Layout/Components/ButtonSpinner.vue";

export default defineComponent({
  name: "YugiohProductPublicPage",

  components: {
    BreadcrumbComponent,
    TableComponent,
    PaginationComponent,
    ModalComponent,
    ButtonSpinner,
  },

  setup() {
    return {
    };
  },
});
</script>
