<template>
  <form class="mt-2" @submit.prevent="onSubmit">
    <div class="position-relative">
      <div class="input-group">
        <input v-model="input" 
          placeholder="Enter your prompt"
          @keydown="onKeydown" 
          :disabled="isUserInputDisabled"
          type="text" class="form-control">
            <div class="input-group-append"><span class="input-group-text">To the Right!</span>
            </div>
        </div>
      <!-- <textarea
        ref="textarea"
        v-model="input"
        class="max-h-500px form-control rounded-xl border-0 bg-zinc-100 p-4 pl-4 pr-5 text-sm text-zinc-900 focus-none focus-ring-2 focus-ring-primary dark-bg-zinc-700 dark-text-zinc-200 dark-placeholder-zinc-400 dark-focus-ring-primary sm-text-base"
        placeholder="Enter your prompt"
        @keydown="onKeydown"
      ></textarea>
      <button
        type="submit"
        class=""
      >
        Send
        <span class="sr-only">Send message</span> -->
      <!-- </button> -->
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      userInput: '',
      textarea: null,
      input: '',
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
  },

  mounted() {
    this.textarea = this.$refs.textarea;
  },
};
</script>