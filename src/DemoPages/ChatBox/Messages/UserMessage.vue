<template>
  <div class="flex flex-row px-2 py-4 sm:px-4">
    <img class="mr-2 flex h-10 w-10 rounded-full sm:mr-4" :src="avatarUrl" />

    <div class="flex max-w-3xl items-center">
      <p class="whitespace-pre-line">{{ message.content }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: Object, // Assuming ChatMessage is an object type
      required: true,
    },
  },
  computed: {
    avatarUrl() {
      // Assuming that avatarUrl is a computed property in your store or component
      return this.$store.state.avatarUrl;
    },
  },
};
</script>