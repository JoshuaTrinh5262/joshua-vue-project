<template>
  <div class="tabs-wrapper">
    <ul class="tabs-header">
      <li v-for="(tab, index) in tabs" :key="tab.title" @click="selectTab(index)"
        :class='{ "tab-selected": (index == selectedIndex) }'>
        {{ tab.title }}
      </li>
    </ul>
    <div class="tab">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import { ref, provide, onMounted, defineComponent } from 'vue';

export default defineComponent({
  name: 'tabs-component',

  props: {
    mode: {
      type: String,
      default: 'dark'
    }
  },
  setup() {
    const selectedIndex = ref(0);
    const tabs = ref([]);

    const selectTab = (index) => {
      selectedIndex.value = index;
      tabs.value.forEach((tab, i) => {
        tab.isActive = (i === index);
      });
    };

    const registerTab = (tab) => {
      tabs.value.push(tab);
    };

    provide('registerTab', registerTab);

    onMounted(() => {
      selectTab(0);
    });

    return {
      selectedIndex,
      tabs,
      selectTab,
    };
  }
});
</script>