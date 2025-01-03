<template>
  <page-title-component :heading="heading" :subheading="subheading" :icon="icon" />
  <KanbanComponent :data="columns"></KanbanComponent>
</template>

<script>
import { defineComponent, ref } from "vue";
import PageTitleComponent from "../../Layout/Components/PageTitleComponent.vue";
import KanbanComponent from "../../Pages/Kanban/KanbanComponent.vue";
import kanbanData from "../../utils/kanbanData.js";

export default defineComponent({
  name: "Kanban Page",

  components: {
    PageTitleComponent,
    KanbanComponent,
  },

  setup() {
    const heading = ref("Kanban");
    const subheading = ref("Kanban Page.");
    const icon = ref("pe-7s-notebook icon-gradient bg-tempting-azure");

    const columns = ref(kanbanData);

    return {
      heading,
      subheading,
      icon,
      columns,
    };
  },
});
</script>