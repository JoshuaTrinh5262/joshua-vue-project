<template>
  <div class="kanban">
    <div class="kanban-container">
      <div v-for="(column, columnIndex) in columns" :key="column.status" class="kanban-column" @dragover.prevent
        @drop="dropTask(columnIndex)">
        <p class="column-title">{{ getFormattedText(column.status) }}</p>
        <div v-for="task in column.tasks" :key="task.id" class="kanban-cards" :draggable="true"
          @dragstart="dragTask(task, columnIndex)">
          <task-component :task="task"></task-component>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, toRef, emit } from "vue";
import TaskComponent from "./TaskComponent";
import formatString from "@/utils/utils.js";

export default defineComponent({
  name: "KanbanComponent",
  emits: ["changeTaskStatus"],
  components: {
    TaskComponent,
  },

  props: {
    data: {
      type: Array,
      required: true,
    },
  },

  setup(props, { emit }) {
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
        if (columns.value[targetColumnIndex].status != draggedTask.value.status) {
          emit("changeTaskStatus", columns.value[targetColumnIndex].status, draggedTask.value);
        }
        draggedTask.value = null;
        draggedFromColumnIndex.value = null;
      }
    };

    const getFormattedText = (str) => {
      return formatString(str);
    }

    return {
      columns,
      draggedTask,
      draggedFromColumnIndex,
      dragTask,
      dropTask,
      getFormattedText,
    };
  },
});
</script>

<style scoped>
.kanban {
  display: flex;
  justify-content: center;
}

.kanban-container {
  display: flex;
  overflow: auto;
}

.kanban-column {
  min-width: 300px;
  min-height: 600px;
  width: 320px;
  padding: 0.5rem;
  margin-right: 0.25rem;
  border-radius: 0.25rem;
  background-color: white;
}

.column-title {
  font-size: 20px;
  font-weight: 700;
  color: black;
}

.kanban-cards {
  margin-top: 0.5rem;
}

.dark .column-title {
  color: white;
}

.dark .kanban-column {
  background-color: black;
}
</style>
