<template>
  <div class="app-container" :class="isDark ? 'app-theme-dark' : 'app-theme-white'">
    <slot></slot>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useDark } from "@vueuse/core";

export default defineComponent({
  name: "App",
  setup() {
    const isDark = useDark();

    return {
      isDark
    };
  },

});
</script>
