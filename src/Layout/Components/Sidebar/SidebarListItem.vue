<template>
  <div class="vsm-list">
    <Item
      v-for="(subItem, index) in items"
      :key="index"
      :item="subItem"
      :show-child="showChild"
      :rtl="rtl"
    >
      <slot
        slot="dropdown-icon"
        name="dropdown-icon"
      ></slot>
    </Item>
  </div>
</template>

<script>
export default {
  name: 'sidebar-list-item',

  props: {
    items: {
      type: Array,
      required: true
    },
    showChild: {
      type: Boolean,
      default: false
    },
    rtl: {
      type: Boolean,
      default: false
    }
  },
  beforeCreate () {
    this.$options.components.Item = require('./SidebarItem.vue').default
  }
}
</script>
