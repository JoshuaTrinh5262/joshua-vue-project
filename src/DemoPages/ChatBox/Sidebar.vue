<template>
  <div class="">
    <div class="">
      <button @click="onNewChat">New Chat</button>
    </div>
    <!-- Previous chats container -->
    <div class="h-100 space-4 overflow-y-auto border-b border-zinc-300 px-2 py-4 dark-border-zinc-700">
      <button :key="chat.id" v-for="chat in previousChats" @click="setCurrentChat(chat)" :class="{'dark-bg-zinc-800 bg-zinc-200': currentChat?.id == chat.id}" class="d-flex w-100 flex-column gap-2 rounded-lg px-3 py-2 text-left transition-colors duration-200 hover-bg-zinc-200 dark-hover-bg-zinc-800 focus-outline-none focus-ring-2 focus-ring-blue-500 dark-bg-zinc-700 dark-text-zinc-200 dark-placeholder-zinc-400 dark-focus-ring-blue-500">
        <span class="text-sm font-weight-medium capitalize text-zinc-700 dark-text-zinc-200">{{ chat.title }} - {{ chat.model }}</span>
        <p class="text-xs text-zinc-500 dark-text-zinc-400">{{ chat.createdAt.toLocaleDateString('no', { day: '2-digit', month: 'short', weekday: 'long', hour: '2-digit', minute: '2-digit', second: '2-digit' }) }}</p>
      </button>
    </div>
    <div class="">
      <button @click="toggleDarkMode" class="d-flex w-100 gap-x-2 rounded-lg px-3 py-2 text-left text-sm font-weight-medium text-zinc-700 transition-colors duration-200 hover-bg-zinc-200 focus-outline-none dark-hover-bg-zinc-800 focus-ring-2 focus-ring-blue-500 dark-bg-zinc-700 dark-text-zinc-200 dark-placeholder-zinc-400 dark-focus-ring-blue-500">
        <!-- <IconSun v-if="isDarkMode" class="h-6 w-6" />
        <IconMoon v-else class="h-6 w-6" /> -->
        Toggle dark mode
      </button>
      <!-- Additional buttons -->
      <button v-if="false" class="d-flex w-100 gap-x-2 rounded-lg px-3 py-2 text-left text-sm font-weight-medium text-zinc-700 transition-colors duration-200 hover-bg-zinc-200 focus-outline-none dark-hover-bg-zinc-800 focus-ring-2 focus-ring-blue-500 dark-bg-zinc-700 dark-text-zinc-200 dark-placeholder-zinc-400 dark-focus-ring-blue-500">
        <IconUserCircle class="h-6 w-6" />
        User
      </button>
      <button @click="toggleSettingsPanel" class="d-flex w-100 gap-x-2 rounded-lg px-3 py-2 text-left text-sm font-weight-medium text-zinc-700 transition-colors duration-200 hover-bg-zinc-200 focus-outline-none dark-hover-bg-zinc-800 focus-ring-2 focus-ring-blue-500 dark-bg-zinc-700 dark-text-zinc-200 dark-placeholder-zinc-400 dark-focus-ring-blue-500">
        <!-- <IconSettings2 class="h-6 w-6" /> -->
        Settings
      </button>
    </div>
  </div>
</template>

<script>
export default {

  data() {
    return {
      isDarkMode: false,
      previousChats: [],
      currentChat: null,
      currentModel: null,
    };
  },

  created() {
    // Assign the Vuex state to your component's data property
    this.previousChats = this.$store.state.previousChats;
  },

  methods: {
    onNewChat() {
      // Define startNewChat
      const model = this.currentModel;
      const title = "new chat";
      this.$store.dispatch("startNewChat", { title, model });
    },
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;
    },
    setCurrentChat(chat) {
      console.log(chat)
      this.$store.commit("setCurrentChat", chat);
    },
    toggleSettingsPanel() {
      // Define this function
    },
  },
};
</script>