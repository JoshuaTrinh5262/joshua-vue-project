<template>
  <div
    class="px-3 rounded-circle text-xs font-weight-bold d-flex align-items-center"
    :class="`bg-${color}-100 text-${color}-700`"
  >
    <span class="w-2 h-2 rounded-circle mr-1" :class="`bg-${color}-400`"></span>
    <span>
      <slot></slot>
    </span>
  </div>
</template>
<script>
export default {
  name: 'badgeComponent',

  props: {
    color: {
      type: String,
      default: "teal"
    }
  }
};
</script>
