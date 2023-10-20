<template>
  <form class="mt-2" @submit.prevent="onSubmit">
    <div class="position-relative">
      <div class="input-group">
        <input 
        v-model="userInput" 
        placeholder="Enter your prompt"
        @keydown="onKeydown" 
        :disabled="isUserInputDisabled"
        type="text" class="form-control">
          <div class="input-group-append">
              <button type="submit" class="btn btn-secondary">Send message</button>
          </div>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
    };
  },

  methods: {
    onSubmit() {
      this.$store.dispatch('addMessage', {
        role: 'user',
        content: this.userInput,
      });
    },

    onKeydown(event) {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        this.onSubmit();
      }
    },
  },

  computed: {
    isUserInputDisabled() {
      return this.$store.state.currentChat === null;
    },

    userInput() {
      return this.$store.userInput;
    }
  },

  mounted() {
    this.use = this.$refs.textarea;
  },
};
</script>