<template>
  <div class="task-card">
    <div class="task-header">
      <p class="task-title font-weight-bold text-dark m-0">{{ task.title }}</p>
      <small class="text-muted">{{ formatDate(task.created_at) }}</small>
    </div>
    <div class="task-body">
      <div class="task-badges">
        Status:
        <BadgeComponent v-if="task.status" :class="statusBadgeColor">
          {{ getFormattedText(task.status) }}
        </BadgeComponent>
      </div>
      <div class="task-badges">
        Priority:
        <BadgeComponent v-if="task.priority" :class="priorityBadgeColor">
          {{ getFormattedText(task.priority) }}
        </BadgeComponent>
      </div>
      <div class="task-badges">Type: {{ getFormattedText(task.type) }}</div>
      <div class="task-badges">Code: {{ task.code }}</div>
    </div>
    <div class="task-footer">
      <img
        class="img-fluid rounded-circle"
        height="30"
        width="30"
        src="@/assets/images/avatars/0.jpg"
        alt="Avatar"
      />
      <div>
        <i class="task-action pe-7s-trash" @click="handleDelete(task)"></i>
        <i class="task-action pe-7s-keypad" @click="handleUpdate(task.id)"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from "vue";
import BadgeComponent from "./BadgeComponent.vue";
import { TaskStatus, TaskPriority } from "@/utils/enums";
import formatString from "@/utils/utils.js";

export default defineComponent({
  name: "TaskComponent",
  components: { BadgeComponent },
  props: {
    task: {
      type: Object,
      default: () => ({}),
    },
  },

  emits: ["handleUpdate", "handleDelete"],

  setup(props, { emit }) {
    const statusBadgeColor = computed(() => {
      const colorMap = {
        [TaskStatus.TO_DO]: "badge-secondary",
        [TaskStatus.IN_PROGRESS]: "badge-info",
        [TaskStatus.COMPLETED]: "badge-success",
      };
      return colorMap[props.task.status] || "badge-secondary";
    });

    const priorityBadgeColor = computed(() => {
      const colorMap = {
        [TaskPriority.LOW]: "badge-primary",
        [TaskPriority.MEDIUM]: "badge-warning",
        [TaskPriority.HIGH]: "badge-danger",
      };
      return colorMap[props.task.priority] || "badge-primary";
    });

    const formatDate = (date) => {
      return new Date(date).toLocaleDateString();
    };

    const getFormattedText = (str) => {
      return formatString(str);
    };

    const handleUpdate = (updateData) => {
      emit("handleUpdate", updateData);
    };

    const handleDelete = async (id) => {
      if (confirm(`Are you sure you want to delete this Task ${id}?`)) {
        emit("handleDelete", id);
      }
    };

    return {
      statusBadgeColor,
      priorityBadgeColor,
      formatDate,
      getFormattedText,
      handleUpdate,
      handleDelete,
    };
  },
});
</script>

<style scoped>
.task-card {
  padding: 0.5rem;
  max-width: 400px;
  border-radius: 0.5rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  border: 1px solid #dee2e6;
  background-color: white;
}

.task-header {
  align-items: center;
  justify-content: space-between;
  display: flex;
  margin-bottom: 0.5rem;
}

.task-title {
  font-size: 1rem;
}

.task-body {
  margin-bottom: 0.5rem;
}

.task-badges {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.task-badges .badge-component {
  font-size: 0.85rem;
  padding: 0.4rem 0.6rem;
}

.task-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.task-footer .task-action {
  padding: 2px;
  margin: 2px;
  font-size: 24px;
  border: 1px solid black;
  border-radius: 50px;
}

.task-footer .task-action:hover {
  background-color: black;
  color: white;
  transform: scale(1.1);
}
</style>
