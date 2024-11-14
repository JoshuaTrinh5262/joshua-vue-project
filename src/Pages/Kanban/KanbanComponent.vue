<template>
  <div class="d-flex justify-content-center">
    <div class="d-flex overflow-auto">
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
</template>

<script>
import { defineComponent, ref, toRef } from "vue";
import TaskComponent from "./TaskComponent";

export default defineComponent({
  name: "KanbanComponent",

  components: {
    TaskComponent,
  },

  props: {
    data: {
      type: Array,
      required: true,
    },
  },

  setup(props) {
    const draggedTask = ref(null);
    const draggedFromColumnIndex = ref(null);
    const columns = toRef(props, 'data');
  
    const dragTask = (task, columnIndex) => {
      draggedTask.value = task;
      draggedFromColumnIndex.value = columnIndex;
    };

    const dropTask = (targetColumnIndex) => {
      if (draggedTask.value && draggedFromColumnIndex.value !== null) {
        columns.value[draggedFromColumnIndex.value].tasks = columns.value[draggedFromColumnIndex.value].tasks.filter(
          (task) => task.id !== draggedTask.value.id
        );
        columns.value[targetColumnIndex].tasks.push(draggedTask.value);
        draggedTask.value = null;
        draggedFromColumnIndex.value = null;
      }
    };

    return {
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
