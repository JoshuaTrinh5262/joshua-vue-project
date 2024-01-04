<template>
    <div>
      <page-title-component :heading=heading :subheading=subheading :icon=icon></page-title-component>
      <calculator-component></calculator-component>
    </div>
  </template>
  <script>
    import PageTitleComponent from "../Layout/Components/PageTitleComponent.vue";
    import CalculatorComponent from "../Layout/Components/CalculatorComponent.vue";
  
    export default { 
      name: "CalculatorPage",
  
      components: {
          PageTitleComponent,
          CalculatorComponent,
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