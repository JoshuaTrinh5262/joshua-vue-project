<template>
  <div id="app">
    <component :is="layout">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <div>
            <component :is="Component" />
          </div>
        </transition>
      </router-view>
    </component>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'App',
  setup() {
    const route = useRoute();

    const layout = computed(() => {
      const emptyLayout = 'empty';
      return (route.meta.layout || emptyLayout) + '-layout';
    });

    return {
      layout,
    };
  },
});
</script>

<style lang="scss">
@import "assets/base.scss";
</style>
