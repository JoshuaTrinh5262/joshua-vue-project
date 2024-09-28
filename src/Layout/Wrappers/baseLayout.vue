<template>
  <div class="app-container app-theme-dark">
    <transition name="fade" mode="out-in" appear>
      <MainHeaderComponent />
    </transition>
    <div class="">
        <slot></slot>
    </div>
  </div>
</template>

<script>
import MainHeaderComponent from "../Components/MainHeaderComponent";

export default {
  name: "app",
  components: {
    MainHeaderComponent,
  },
  methods: {

  }
}
</script>