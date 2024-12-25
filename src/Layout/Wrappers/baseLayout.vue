<template>
  <div class="app-container app-theme-dark">
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

export default defineComponent({
  name: "App",
  components: {
    MainHeaderComponent,
  },
  setup() {

    return {
    };
  },
});
</script>
