<template>
  <div>
    <page-title :heading="heading" :subheading="subHeading" :icon="icon"></page-title>
    <div class="chatgroup row">
      <div class="col-3">
        <div class="chatgroup-sidebar h-auto space-4 overflow-y-auto px-2 py-4">
          <button class="btn btn-outline-primary"><i class="pe-7s-plus"></i> New Chat</button>
          <button :key="chat.id" v-for="chat in chatGroups" :class="{'active': currentChat?.id == chat.id}"
          class="btn btn-outline-success h-300 w-100 flex-column">
            {{ chat.id}}_{{ chat.chat_group_name }} - {{ formatDate(chat.created_date) }}
          </button>
        </div>
      </div>
      <div class="col-9">
        <div class="chatgroup-box border border-primary p-1">
          <div v-for="message in messages" :key="message.id">
            <div v-if="message.user_id % 2 == 0" class="d-flex pb-1">
              <img class="rounded-circle mr-2" width="30" height="30" src="@/assets/images/avatars/1.jpg"/>
              <div class="flex">
                <p class="whitespace-pre-line">{{ message.content }}</p>
              </div>
            </div>
            <div v-else class="d-flex pb-1">
              <img class="rounded-circle mr-2" width="30" height="30" src="@/assets/images/avatars/default.jpg"/>
              <div class="flex">
                <p class="whitespace-pre-line">{{ message.content }}</p>
              </div>
            </div>
          </div>
        </div>
        <form class="chat_input mt-2">
          <div class="position-relative">
            <div class="input-group">
              <input 
              v-model="userInput" 
              placeholder="Enter your prompt"
              :disabled="isUserInputDisabled"
              type="text" class="form-control">
                <div class="input-group-append">
                    <button type="submit" class="btn btn-primary">Send message</button>
                </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import axios from 'axios';
import PageTitle from '../../Layout/Components/PageTitle.vue';

export default {
  data() {
    return {
      heading: 'Chatgroup',
      subHeading: 'Chatgroup demo',
      icon: 'pe-7s-bandaid icon-gradient bg-amy-crisp',
      currentChat: {},
      userInput: '',
      chatGroups: [],
      messages: [],
    };
  },

  components: {
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

    isUserInputDisabled() {
      return false;
    },
    
    formatDate(value) {
      if (value) {
        return moment(String(value)).format('MM-DD-YYYY');
      }
    }
  }
};
</script>