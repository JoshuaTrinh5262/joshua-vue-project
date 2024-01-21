<template>
  <div>
    <page-title :heading="heading" :subheading="subHeading" :icon="icon"></page-title>
    <div class="row">
      <div class="col-3">
        <chat-sidebar></chat-sidebar>
      </div>
      <div class="col-9">
        <chat-messages></chat-messages>
        <chat-input></chat-input>
      </div>
    </div>
  </div>
</template>

<script>
import ChatSidebar from './ChatSidebar.vue';
import ChatInput from './ChatInput.vue';
import ChatMessages from './ChatMessages.vue';
import PageTitle from '../../Layout/Components/PageTitle.vue';

export default {
  data() {
    return {
      heading: 'Chatgroup',
      subHeading: 'Chatgroup demo',
      icon: 'pe-7s-bandaid icon-gradient bg-amy-crisp',
    };
  },
  components: {
    ChatSidebar,
    ChatInput,
    ChatMessages,
    PageTitle,
  },

  computed: {
    currentChat() {
      return this.$store.getters.currentChat;
    },
  },
};
</script>