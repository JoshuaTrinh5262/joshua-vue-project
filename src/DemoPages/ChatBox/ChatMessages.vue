<template>
  <div
    class="flex-1 overflow-y-auto rounded p-1 text-md leading-6 scroll-smooth"
  >
    <ChatMessage v-for="message in this.messages" :message="message" :key="message.id" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ChatMessage from './ChatMessage.vue';

export default {
  data() {
    return {
    };
  },

  components: {
    ChatMessage,
  },

  computed: {
    ...mapState({
      currentChat: 'currentChat', 
      debugMode: 'debugMode',
    }),

    messages() {
      return this.debugMode ? this.currentChat?.messages : this.currentChat?.messages.filter((m) => m.role !== 'system');
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