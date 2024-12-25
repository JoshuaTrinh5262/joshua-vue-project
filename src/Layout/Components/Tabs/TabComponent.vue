<template>
  <div v-show="isActive" class="p2">
    <slot></slot>
  </div>
</template>

<script>
import { inject, defineComponent, ref, onMounted } from 'vue';

export default defineComponent({
  name: 'tab-component',

  props: {
    title: {
      type: String,
      default: 'Tab'
    }
  },

  setup(props) {
    const isActive = ref(false);
    const registerTab = inject('registerTab');

    onMounted(() => {
      if (registerTab) {
        registerTab({ title: props.title, isActive });
      }
    });

    return {
      isActive
    };
  }
});
</script>