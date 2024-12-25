<template>
  <div class="app-container app-theme-dark">
    <slot></slot>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  setup() {
    return {};
  },

});
</script>
