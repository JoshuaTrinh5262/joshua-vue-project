<template>
  <div class="d-flex rounded-circle">
    <img
      class="rounded-circle mr-2" width="50" height="50" src="@/assets/images/avatars/1.jpg"
    />
    <div class="flex p-1">
      <p class="whitespace-pre-line">{{ message.content }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: Object,
      required: true,
    },
  },
  computed: {
    avatarUrl() {
      return this.$store.state.avatarUrl;
    },
  },
};
</script>