<template>
  <button :class="{ 'loading': loading }" @click="handleClick" :disabled="loading">
    <span v-if="!loading">{{ buttonText }}</span>
    <span v-else>Loading...</span>
  </button>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: "ButtonSpinner",

  props: {
    buttonText: {
      type: String,
      default: "Click me",
    },
    onClick: {
      type: Function,
      required: true,
    },
  },

  setup(props) {
    const loading = ref(false);

    const handleClick = () => {
      // Set loading to true before calling the onClick function
      loading.value = true;

      // Call the onClick function (assumed to be an asynchronous operation)
      props.onClick()
        .then(() => {
          // Set loading back to false on successful completion
          loading.value = false;
        })
        .catch(() => {
          // Handle errors and set loading back to false
          loading.value = false;
        });
    };

    return {
      loading,
      handleClick,
    };
  },
});
</script>

<style scoped>
button {
  padding: 10px 20px;
  cursor: pointer;
}

.loading::after {
  content: " ";
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid #ccc;
  border-radius: 50%;
  border-top: 2px solid #3498db;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
