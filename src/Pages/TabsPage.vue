<template>
  <div>
    <page-title-component :heading=heading :subheading=subheading :icon=icon></page-title-component>
    <tabs-component :mode="mode">
        <tab-component title="Tab 1">Hello From Tab 1</tab-component>
        <tab-component title="Tab 2">Hello From Tab 2</tab-component>
        <tab-component title="Tab 3">Hello From Tab 3</tab-component>
        <tab-component title="Tab 4">Hello From Tab 4</tab-component>
        <tab-component title="Tab 5">Hello From Tab 5</tab-component>
        <tab-component title="Tab 6">Hello From Tab 6</tab-component>
        <tab-component title="Tab 7">Hello From Tab 4</tab-component>
        <tab-component title="Tab 8">Hello From Tab 5</tab-component>
        <tab-component title="Tab 9">Hello From Tab 6</tab-component>
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
            mode: 'light'
        };
    },

    methods: {
        changeStyle () {
            if (this.mode === 'dark') {
                this.mode = 'light'
            } else {
                this.mode = 'dark'
            }
        }
    },
  };
</script>