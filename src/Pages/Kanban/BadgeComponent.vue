<template>
  <div class="kanban-badge" :class="badgeClasses">
    <slot></slot>
  </div>
</template>

<script>
import { defineComponent, computed } from "vue";

export default defineComponent({
  name: "BadgeComponent",

  props: {
    color: {
      type: String,
      default: "teal"
    }
  },

  setup(props) {
    const badgeClasses = computed(() => `bg-${props.color}-100 text-${props.color}-700`);

    return {
      badgeClasses
    };
  }
});
</script>

<style scoped>
.kanban-badge {
  margin: 2px;
  padding: 0 0.5rem 0 0.5rem;
  border-radius: 0.5rem;
}
</style>
