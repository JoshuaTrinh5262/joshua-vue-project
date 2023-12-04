<template>
  <div class="bg-white shadow-sm rounded p-3 pt-3 pb-5 border border-white">
    <div class="d-flex justify-content-between">
      <p class="text-gray-700 font-weight-bold font-sans tracking-wide small">{{ task.title }}</p>

      <img
        class="img-fluid rounded-circle ml-3"
        src="@/assets/images/avatars/1.jpg"
        alt="Avatar"
      >
    </div>
    <div class="d-flex mt-4 justify-content-between align-items-center">
      <span class="small text-muted">{{ task.date }}</span>
      <badge-component v-if="task.type" :class="badgeColor">{{ task.type }}</badge-component>
    </div>
  </div>
</template>
<script>
import BadgeComponent from "./BadgeComponent.vue";
export default {
  name: "TaskComponent",

  components: {
    BadgeComponent
  },
  props: {
    task: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    badgeColor() {
      const mappings = {
        Design: "purple",
        "Feature Request": "teal",
        Backend: "blue",
        QA: "green",
        default: "teal"
      };
      return mappings[this.task.type] || mappings.default;
    }
  }
};
</script>
