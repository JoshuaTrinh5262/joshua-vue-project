<template>
  <div class="task-card bg-white shadow-sm rounded p-3 pt-3 pb-4 border border-light">
    <div class="d-flex justify-content-between align-items-center mb-2">
      <p class="task-title font-weight-bold text-dark m-0">{{ task.title }}</p>
      <small class="text-muted">{{ formatDate(task.created_at) }}</small>
    </div>

    <div class="task-badges d-flex justify-content-start align-items-center">
      Status:
      <BadgeComponent v-if="task.status" :class="statusBadgeColor">
        {{ task.status }}
      </BadgeComponent>
    </div>
    <div class="task-badges d-flex justify-content-start align-items-center">

      Priority:
      <BadgeComponent v-if="task.priority" :class="priorityBadgeColor">
        {{ task.priority }}
      </BadgeComponent>
    </div>

    <div class="task-assigned d-flex align-items-center">
      <img class="img-fluid rounded-circle" height="35" width="35" src="@/assets/images/avatars/0.jpg"
        alt="Avatar" />
      <BadgeComponent v-if="task.assigned_to" :class="assignedBadgeColor">
        Assigned To: {{ task.assigned_to }}
      </BadgeComponent>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from "vue";
import BadgeComponent from "./BadgeComponent.vue";
import { TaskStatus, TaskPriority } from "../../utils/enums";

export default defineComponent({
  name: "TaskComponent",
  components: { BadgeComponent },
  props: {
    task: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
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

    return {
      statusBadgeColor,
      priorityBadgeColor,
      formatDate,
    };
  },
});
</script>

<style scoped>
.task-card {
  max-width: 400px;
}

.task-title {
  font-size: 1rem;
}

.task-badges .badge-component {
  font-size: 0.85rem;
  padding: 0.4rem 0.6rem;
}

.task-assigned .badge-component {
  font-size: 0.85rem;
  padding: 0.4rem 0.6rem;
}
</style>
