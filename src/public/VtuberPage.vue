<template>
  <breadcrumb-component></breadcrumb-component>
</template>

<script>
import { defineComponent, ref } from "vue";
import BreadcrumbComponent from "../Layout/Components/BreadcrumbComponent.vue";

export default defineComponent({
  name: "YugiohPage",
  setup() {
    return {};
  },
  components: { BreadcrumbComponent },
});
</script>
