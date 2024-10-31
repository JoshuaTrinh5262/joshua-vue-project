<template>
  <div>
    <page-title-component :heading="heading" :subheading="subheading" :icon="icon" />
    <div class="d-flex justify-content-center">
      <div class="min-vh-100 d-flex overflow-auto">
        <div v-for="(column, columnIndex) in columns" :key="column.title"
          class="bg-dark rounded p-2 column-width rounded mr-1" @dragover.prevent @drop="dropTask(columnIndex)">
          <p class="font-weight-bold font-sans tracking-wide text-white">{{ column.title }}</p>
          <div v-for="task in column.tasks" :key="task.id" class="mt-3 cursor-move task" :draggable="true"
            @dragstart="dragTask(task, columnIndex)">
            <task-component :task="task"></task-component>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import PageTitleComponent from "../../Layout/Components/PageTitleComponent.vue";
import TaskComponent from "./TaskComponent";

export default defineComponent({
  name: "KanbanComponent",

  components: {
    TaskComponent,
    PageTitleComponent,
  },

  setup() {
    const heading = ref("Kanban");
    const subheading = ref("Kanban Page.");
    const icon = ref("pe-7s-notebook icon-gradient bg-premium-dark");

    const draggedTask = ref(null);
    const draggedFromColumnIndex = ref(null);
    const columns = ref([
      {
        title: "Backlog",
        tasks: [
          { id: 1, title: "Add discount code to checkout page", date: "Sep 14", type: "Feature Request" },
          { id: 2, title: "Provide documentation on integrations", date: "Sep 12" },
          { id: 3, title: "Design shopping cart dropdown", date: "Sep 9", type: "Design" },
          { id: 4, title: "Test checkout flow", date: "Sep 15", type: "QA" },
        ],
      },
      {
        title: "In Progress",
        tasks: [
          { id: 6, title: "Design shopping cart dropdown", date: "Sep 9", type: "Design" },
          { id: 7, title: "Add discount code to checkout page", date: "Sep 14", type: "Feature Request" },
          { id: 8, title: "Design shopping cart dropdown", date: "Sep 13", type: "Design" },
          { id: 9, title: "Add discount code to checkout page", date: "Sep 11", type: "Feature Request" },
        ],
      },
      {
        title: "Review",
        tasks: [
          { id: 9, title: "Provide documentation on integrations", date: "Sep 12" },
          { id: 10, title: "Design shopping cart dropdown", date: "Sep 9", type: "Design" },
        ],
      },
      {
        title: "Testing",
        tasks: [
          { id: 18, title: "Provide documentation on integrations", date: "Sep 12" },
          { id: 19, title: "Design shopping cart dropdown", date: "Sep 9", type: "Design" },
        ],
      },
      {
        title: "Done",
        tasks: [
          { id: 14, title: "Add discount code to checkout page", date: "Sep 14", type: "Feature Request" },
        ],
      },
    ]);

    const dragTask = (task, columnIndex) => {
      draggedTask.value = task;
      draggedFromColumnIndex.value = columnIndex;
    };

    const dropTask = (targetColumnIndex) => {
      if (draggedTask.value && draggedFromColumnIndex.value !== null) {
        // Remove task from the original column
        columns.value[draggedFromColumnIndex.value].tasks = columns.value[draggedFromColumnIndex.value].tasks.filter(
          (task) => task.id !== draggedTask.value.id
        );
        // Add task to the target column
        columns.value[targetColumnIndex].tasks.push(draggedTask.value);
        draggedTask.value = null;
        draggedFromColumnIndex.value = null;
      }
    };

    return {
      heading,
      subheading,
      icon,
      columns,
      draggedTask,
      draggedFromColumnIndex,
      dragTask,
      dropTask,
    };
  },
});
</script>

<style scoped>
.column-width {
  min-width: 320px;
  width: 320px;
}

.ghost-card {
  opacity: 0.5;
  background: #F7FAFC;
  border: 1px solid #4299e1;
}
</style>
