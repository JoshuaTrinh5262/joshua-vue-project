<template>
  <div>
    <breadcrumb-component></breadcrumb-component>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import BreadcrumbComponent from "../Layout/Components/BreadcrumbComponent.vue";

export default defineComponent({
  name: "YugiohPage",
  data() {
    return {};
  },
  components: { BreadcrumbComponent },
});
</script>
