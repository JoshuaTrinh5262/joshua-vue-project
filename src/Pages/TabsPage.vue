<template>
  <div>
    <page-title-component :heading=heading :subheading=subheading :icon=icon></page-title-component>
    <tabs-component :mode="mode">
      <tab-component title="Tab Zero">Hello From Tab 0</tab-component>
      <tab-component title="Tab One">Hello From Tab 1</tab-component>
      <tab-component title="Tab Two">Hello From Tab 2</tab-component>
      <tab-component title="Tab Three">Hello From Tab 3</tab-component>
      <tab-component title="Tab Four">Hello From Tab 4</tab-component>
      <tab-component title="Tab Five">Hello From Tab 5</tab-component>
      <tab-component title="Tab Six">Hello From Tab 6</tab-component>
      <tab-component title="Tab Seven">Hello From Tab 4</tab-component>
      <tab-component title="Tab Eight">Hello From Tab 5</tab-component>
      <tab-component title="Tab Nine">Hello From Tab 6</tab-component>
    </tabs-component>
  </div>
</template>
<script>
import PageTitleComponent from "../Layout/Components/PageTitleComponent.vue";
import TabsComponent from "../Layout/Components/Tabs/TabsComponent.vue";
import TabComponent from "../Layout/Components/Tabs/TabComponent.vue";

export default {
  name: "TabsPage",

  components: {
    PageTitleComponent,
    TabsComponent,
    TabComponent,
  },

  data() {
    return {
      heading: 'Tabs',
      subheading: 'Tab Demo pages',
      icon: 'pe-7s-phone icon-gradient bg-tempting-azure',
      mode: 'dark'
    };
  },

  methods: {
    changeStyle() {
      if (this.mode === 'dark') {
        this.mode = 'light'
      } else {
        this.mode = 'dark'
      }
    }
  },
};
</script>