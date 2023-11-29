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
              <button type="submit" class="btn btn-primary">Send message</button>
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
    userInput: {
      get() {
        return this.$store.state.userInput;
      },
      set(value) {
        this.$store.commit('setUserInput', value);
      },
    },

    isUserInputDisabled() {
      return this.$store.state.currentChat === null;
    },

  },
};
</script>