<template>
  <div id="app">
    <component :is="layout">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </component>
  </div>
</template>

<script>
export default {
  computed: {
    layout() {
      const default_layout = "default";
      return (this.$route.meta.layout || default_layout) + '-layout';
    }
  }
}
</script>

<style lang="scss">
  @import "assets/base.scss";
</style>