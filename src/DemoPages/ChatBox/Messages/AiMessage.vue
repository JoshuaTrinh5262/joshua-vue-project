<template>
  <div class="d-flex justify-content-end rounded-circle">
    <div class="flex p-1">
      <p class="whitespace-pre-line">{{ message.content }}</p>
    </div>
    <img
      class="rounded-circle ml-2"
      width="50" height="50"
      src="@/assets/images/avatars/2.jpg"
    />
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
