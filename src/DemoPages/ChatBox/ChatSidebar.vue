<template>
  <div class="h-auto">
    <div class="">
      <button class="btn btn-outline-primary" @click="onNewChat"><i class="pe-7s-plus"></i>New Chat</button>
    </div>
    <!-- Previous chats container -->
    <div class="h-auto space-4 overflow-y-auto border-b border-zinc-300 px-2 py-4 dark-border-zinc-700">
      <button :key="chat.id" v-for="chat in previousChats" @click="setCurrentChat(chat)" :class="{'dark-bg-zinc-800 bg-zinc-200': currentChat?.id == chat.id}" class="btn btn-outline-success d-flex w-100 flex-column gap-2 rounded-lg px-3 py-2 text-left transition-colors duration-200 hover-bg-zinc-200 dark-hover-bg-zinc-800 focus-outline-none focus-ring-2 focus-ring-blue-500 dark-bg-zinc-700 dark-text-zinc-200 dark-placeholder-zinc-400 dark-focus-ring-blue-500">
        <span class="text-sm font-weight-medium capitalize text-zinc-700 dark-text-zinc-200">{{ chat.title }} - {{ chat.model }}</span>
        <p class="text-xs text-zinc-500 dark-text-zinc-400">{{ chat.createdAt }}</p>
      </button>
    </div>
    <div class="align-bottom">
      <button @click="toggleDarkMode" class="btn btn-outline-primary d-flex w-100 gap-x-2 rounded-lg px-3 py-2 text-left text-sm font-weight-medium text-zinc-700 transition-colors duration-200 hover-bg-zinc-200 focus-outline-none dark-hover-bg-zinc-800 focus-ring-2 focus-ring-blue-500 dark-bg-zinc-700 dark-text-zinc-200 dark-placeholder-zinc-400 dark-focus-ring-blue-500">
        <i width="24" height="24" class="pe-7s-sun icon-gradient bg-sunny-morning" v-if="isDarkMode"></i>
        <i width="24" height="24" class="pe-7s-moon icon-gradient bg-night-fade" v-else ></i>
        Toggle Dark Mode
      </button>
      <button @click="toggleSettingsPanel" class="btn btn-outline-primary d-flex w-100 gap-x-2 rounded-lg px-3 py-2 text-left text-sm font-weight-medium text-zinc-700 transition-colors duration-200 hover-bg-zinc-200 focus-outline-none dark-hover-bg-zinc-800 focus-ring-2 focus-ring-blue-500 dark-bg-zinc-700 dark-text-zinc-200 dark-placeholder-zinc-400 dark-focus-ring-blue-500">
        <i width="24" height="24" class="pe-7s-sun icon-gradient bg-sunny-morning"></i>
        Settings
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
export default {

  data() {
    return {
    };
  },

  components: {
    // FontAwesomeIcon,
  },

  computed: {
    ...mapState({
      currentChat: 'currentChat',
      previousChats: 'previousChats',
      currentModel: 'currentModel',
      isDarkMode:'isDarkMode',
    }),
  },

  created() {
  },

  methods: {
    ...mapMutations([
      'toggleDarkMode',
      'toggleSettingsPanel'
    ]),

    onNewChat() {
      const model = this.currentModel;
      const title = "New Chat";
      this.$store.dispatch("startNewChat", { title, model });
    },

    setCurrentChat(chat) {
      this.$store.commit("setCurrentChat", chat);
      this.$store.commit("setCurrentModel", chat.model);

    },

  },
};
</script>