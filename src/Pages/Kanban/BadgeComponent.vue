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