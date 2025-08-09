<template>
  <div class="app-container" :class="isDark? 'app-theme-dark' : 'app-theme-white'">
      <MainHeaderComponent />
    <div class="m-4">
      <slot></slot>
    </div>
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
