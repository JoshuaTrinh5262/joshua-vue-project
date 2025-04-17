<template>
  <div class="tabs-wrapper" :class='{ "tabs__light": mode === "light", "tabs__dark": mode === "dark" }'>
    <ul class="tabs__header">
      <li v-for="(tab, index) in tabs" :key="tab.title" @click="selectTab(index)"
        :class='{ "tab__selected": (index == selectedIndex) }'>
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

<style lang="css">
.tabs-wrapper {
  width: 100%;
  margin: 0;
}

ul.tabs__header {
  display: block;
  list-style: none;
  margin: 0 0 0 0;
  padding: 0;
  white-space: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
}

ul.tabs__header>li {
  padding: 12px 30px;
  margin: 0;
  display: inline-block;
  margin-right: 1px;
  cursor: pointer;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

ul.tabs__header>li.tab__selected {
  font-weight: bold;
  border-bottom: 2px solid transparent;
}

.tab {
  display: inline-block;
  padding: 20px;
  width: 100%;
  min-height: 800px;
}

.tabs__light .tab {
  background-color: #fff;
}

.tabs__light li {
  background-color: #ddd;
  color: #aaa;
}

.tabs__light li.tab__selected {
  background-color: #fff;
  pointer-events: none;
  color: #83FFB3;
}

.tabs__dark .tab {
  background-color: #555;
  color: #eee;
}

.tabs__dark li {
  background-color: #ddd;
  color: #aaa;
}

.tabs__dark li.tab__selected {
  background-color: #555;
  color: white;
}
</style>
