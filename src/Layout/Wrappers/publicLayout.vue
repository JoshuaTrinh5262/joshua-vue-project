<template>
  <div class="app-container" :class="isDark? 'app-theme-dark' : 'app-theme-white'">
      <MainHeaderComponent />
      <slot></slot>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import MainHeaderComponent from "../Components/MainHeaderComponent";
import { useDark } from "@vueuse/core";

export default defineComponent({
  name: "PublicLayout",
  components: {
    MainHeaderComponent,
  },

  setup() {
    const isDark = useDark();

    return {
      isDark
    };
  },
});
</script>
