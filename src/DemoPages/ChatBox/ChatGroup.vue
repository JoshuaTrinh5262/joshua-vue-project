<template>
  <div>
    <page-title :heading="heading" :subheading="subHeading" :icon="icon"></page-title>
    <div class="row">
      <div class="col-3">
        <chat-sidebar :chatGroups=chatGroups></chat-sidebar>
      </div>
      <div class="col-9">
        <chat-messages :messages=messages></chat-messages>
        <chat-input></chat-input>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
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
      chatGroups: [],
      messages: [],
    };
  },
  components: {
    ChatSidebar,
    ChatInput,
    ChatMessages,
    PageTitle,
  },

  created() {
    this.getChatgroupData();
    this.getMessageData();
  },

  computed: {
  },

  methods: {
    getChatgroupData() {
      axios.get('http://127.0.0.1:5000/api/chatgroups')
      .then(response => {
          this.chatGroups = response.data.data;
      })
      .catch(error => {
          console.error(error);
      });
    },
    getMessageData() {
      axios.get('http://127.0.0.1:5000/api/messages')
      .then(response => {
          this.messages = response.data.data;
      })
      .catch(error => {
          console.error(error);
      });
    },
  }
};
</script>