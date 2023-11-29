<template>
  <div class="mb-4 flex rounded-xl px-2 py-6 dark:bg-pink-800 bg-pink-100 sm:px-4">
    <div
      class="mr-2 flex h-10 w-10 text-2xl items-center justify-center text-center dark:bg-pink-700 bg-pink-100 rounded-full sm:mr-4"
    >
      <img
        class="rounded-circle m-2"
        width="50" height="50"
        src="@/assets/images/avatars/3.jpg"
      />
    </div>

    <div class="flex">
      <pre
        class="whitespace-pre-wrap text-sm dark:bg-pink-700 dark:text-white bg-pink-100 leading-tight p-4 dark:border-pink-800 border-pink-200 border rounded-md"
      >{{ message.content }}</pre>
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