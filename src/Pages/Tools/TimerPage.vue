<template>
  <page-title-component :heading="heading" :subheading="subheading" :icon="icon"></page-title-component>
  <timer-component></timer-component>
</template>

<script>
import { defineComponent, ref } from "vue";
import TimerComponent from "@/Layout/Components/TimerComponent.vue";
import PageTitleComponent from "@/Layout/Components/PageTitleComponent.vue";

export default defineComponent({
  name: "Timer Page",
  components: {
    PageTitleComponent,
    TimerComponent,
  },
  setup() {
    const heading = ref("Timer");
    const subheading = ref("Timer Page.");
    const icon = ref("pe-7s-settings icon-gradient bg-tempting-azure");

    return {
      heading,
      subheading,
      icon,
    };
  },
});
</script>
