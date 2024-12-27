<template>
  <div class="app-container" :class="isDark? 'app-theme-dark' : 'app-theme-white'">
    <transition name="fade" mode="out-in" appear>
      <MainHeaderComponent />
    </transition>
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import MainHeaderComponent from "../Components/MainHeaderComponent";
import { useDark } from "@vueuse/core";

export default defineComponent({
  name: "App",
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
