<template>
  <div class="vsm-list">
    <Item v-for="(subItem, index) in items" :key="index" :item="subItem" :show-child="showChild" :rtl="rtl">
      <slot name="dropdown-icon"></slot>
    </Item>
  </div>
</template>

<script>
import { defineComponent} from 'vue';

export default defineComponent({
  name: 'SidebarListItem',
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
  components: {},
  beforeMount() {
    this.$options.components.Item = require('./SidebarItem.vue').default;
  },
});
</script>