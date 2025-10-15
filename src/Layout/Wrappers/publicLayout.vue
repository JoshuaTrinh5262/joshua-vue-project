<template>
  <div class="app-container" :class="isDark ? 'app-theme-dark' : 'app-theme-white'">
    <PublicHeaderComponent />
    <slot></slot>
    <PublicFooterComponent />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import PublicHeaderComponent from "../Components/PublicHeaderComponent.vue";
import PublicFooterComponent from "../Components/PublicFooterComponent.vue";
import { useDark } from "@vueuse/core";

export default defineComponent({
  name: "PublicLayout",
  components: {
    PublicHeaderComponent,
    PublicFooterComponent
  },

  setup() {
    const isDark = useDark();

    return {
      isDark
    };
  },
});
</script>
