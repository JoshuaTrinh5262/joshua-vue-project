<template>
  <nav class="breadcrumb-container" aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li class="breadcrumb-item">
        <router-link to="/">Home</router-link>
      </li>
      <li
        v-for="(breadcrumb, index) in breadcrumbs"
        :key="index"
        class="breadcrumb-item"
        :class="{ active: index === breadcrumbs.length - 1 }"
      >
        <router-link
          v-if="index !== breadcrumbs.length - 1"
          :to="breadcrumb.path"
          >{{ breadcrumb.name }}
        </router-link>
        <span v-else>{{ breadcrumb.name }} </span>
      </li>
    </ol>
  </nav>
</template>

<script>
import { defineComponent, computed } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "BreadcrumbComponent",

  setup() {
    const route = useRoute();

    const breadcrumbs = computed(() => {
      return route.matched
        .filter((route) => route.name)
        .map((route) => ({
          name: route.meta.breadcrumb || route.name,
          path: route.path,
        }));
    });

    return {
      breadcrumbs,
    };
  },
});
</script>
