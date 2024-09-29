<template>
  <div class="px-3 rounded-circle text-xs font-weight-bold d-flex align-items-center" :class="badgeClasses">
    <span class="w-2 h-2 rounded-circle mr-1" :class="circleClasses"></span>
    <span>
      <slot></slot>
    </span>
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
    const circleClasses = computed(() => `bg-${props.color}-400`);

    return {
      badgeClasses,
      circleClasses
    };
  }
});
</script>
