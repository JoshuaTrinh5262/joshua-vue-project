<template>
  <div v-if="message.role" class="outline-primary">
    <SystemMessage v-if="message.role == 'system'" :message="message" />
    <UserMessage v-if="message.role == 'user'" :message="message" />
    <AiMessage v-if="message.role == 'ai'" :message="message" />
  </div>
</template>

<script>
import SystemMessage from './Messages/SystemMessage.vue';
import UserMessage from './Messages/UserMessage.vue';
import AiMessage from './Messages/AiMessage.vue';

export default {
  components: {
    SystemMessage,
    UserMessage,
    AiMessage
  },
  props: {
    message: {
      type: Object,
      required: true
    }
  },
  methods: {
    getMessageComponent() {
      if (this.message.role === 'system') {
        return SystemMessage;
      } else if (this.message.role === 'user') {
        return UserMessage;
      } else if (this.message.role === 'ai') {
        return AiMessage;
      }
    }
  }
}
</script>