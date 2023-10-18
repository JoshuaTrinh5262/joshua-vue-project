<template>
  <div
    ref="chatElement"
    class="flex-1 overflow-y-auto rounded-xl bg-zinc-100 p-4 text-sm leading-6 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-300 sm:text-base sm:leading-7 scroll-smooth"
  >
    <ChatMessage v-for="message in messages" :message="message" :key="message.id" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      chatElement: null,
    };
  },
  props: {
    debugMode: Boolean,
  },
  computed: {
    messages() {
      return this.debugMode
        ? this.currentChat.messages
        : this.currentChat.messages.filter((m) => m.role !== 'system');
    },
  },
  watch: {
    currentChat() {
      this.$nextTick(() => {
        this.scrollToBottom();
      });
    },
  },
  methods: {
    scrollToBottom() {
      this.$nextTick(() => {
        if (this.chatElement) {
          this.chatElement.scrollTop = this.chatElement.scrollHeight;
        }
      });
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.scrollToBottom();
    });
  },
};
</script>