<template>
  <button :class="{ 'loading': loading }" @click="handleClick" :disabled="loading">
    <span v-if="!loading">{{ buttonText }}</span>
    <span v-else>Loading...</span>
  </button>
</template>

<script>
export default {
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
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    name: "button-spinner",

    handleClick() {
      // Set loading to true before calling the onClick function
      this.loading = true;

      // Call the onClick function (assumed to be an asynchronous operation)
      this.onClick()
        .then(() => {
          // Set loading back to false on successful completion
          this.loading = false;
        })
        .catch(() => {
          // Handle errors and set loading back to false
          this.loading = false;
        });
    },
  },
};
</script>

<style scoped>
/* Add your button styling, e.g., background, color, etc. */
button {
  padding: 10px 20px;
  cursor: pointer;
}

/* Add loading indicator styling, e.g., spinner or animation */
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
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>