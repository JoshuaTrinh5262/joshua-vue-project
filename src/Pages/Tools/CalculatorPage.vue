<template>
    <div>
      <page-title-component :heading="heading" :subheading="subheading" :icon="icon"></page-title-component>
      <calculator-component></calculator-component>
    </div>
  </template>
  
  <script>
  import { defineComponent, ref } from "vue";
  import PageTitleComponent from "../../Layout/Components/PageTitleComponent.vue";
  import CalculatorComponent from "../../Layout/Components/CalculatorComponent.vue";
  
  export default defineComponent({
    name: "CalculatorPage",
    components: {
      PageTitleComponent,
      CalculatorComponent,
    },
    setup() {
      const heading = ref("Calculator");
      const subheading = ref("Calculator Pages");
      const icon = ref("pe-7s-tools icon-gradient bg-premium-dark");
  
      return {
        heading,
        subheading,
        icon
      };
    }
  });
  </script>
  