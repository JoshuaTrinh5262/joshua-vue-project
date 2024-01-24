<template>
  <div class="flex-1 overflow-y-auto rounded p-1 text-md leading-6 scroll-smooth">
    <ChatMessage v-for="message in messages" :message="message" :key="message.id" />
  </div>
</template>

<script>
import ChatMessage from './ChatMessage.vue';

export default {
  props: {
    messages: {
      type: Array,
      required: false
    },
  },


  data() {
    return {
    };
  },

  components: {
    ChatMessage,
  },

  computed: {

  },
  watch: {

  },
  methods: {

  },
  mounted() {

  },
};
</script>