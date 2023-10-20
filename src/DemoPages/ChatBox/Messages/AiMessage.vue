<template>
  <div class="d-flex align-item-end">
    <img
      class="" width="50" height="50"
      src="https://ollama.ai/public/ollama.png"
    />

    <div class="flex max-w-3xl items-center rounded-xl">
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
};
</script>
