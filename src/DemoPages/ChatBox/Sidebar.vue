<template>
  <aside class="d-flex">
    <div class="d-flex h-[100svh] w-60 border-r border-zinc-200 flex-column overflow-y-auto bg-zinc-50 pt-2 dark-border-zinc-700 dark-bg-zinc-900 sm-h-[100vh] sm-w-64">
      <div class="mx-2">
        <button @click="onNewChat" class="d-flex w-100 gap-4 rounded-lg border border-zinc-300 p-4 text-left text-sm font-weight-medium text-zinc-700 transition-colors duration-200 hover-bg-zinc-200 focus-outline-none dark-border-zinc-700 dark-hover-bg-zinc-800 focus-ring-2 focus-ring-blue-500 dark-bg-zinc-700 dark-text-zinc-200 dark-placeholder-zinc-400 dark-focus-ring-blue-500">
          <IconPlus class="h-5 w-5" />
          New Chat
        </button>
      </div>
      <!-- Previous chats container -->
      <div class="h-100 space-4 overflow-y-auto border-b border-zinc-300 px-2 py-4 dark-border-zinc-700">
        <button :key="chat.id" v-for="chat in previousChats" @click="setCurrentChat(chat)" :class="{'dark-bg-zinc-800 bg-zinc-200': currentChat?.id == chat.id}" class="d-flex w-100 flex-column gap-2 rounded-lg px-3 py-2 text-left transition-colors duration-200 hover-bg-zinc-200 dark-hover-bg-zinc-800 focus-outline-none focus-ring-2 focus-ring-blue-500 dark-bg-zinc-700 dark-text-zinc-200 dark-placeholder-zinc-400 dark-focus-ring-blue-500">
          <span class="text-sm font-weight-medium capitalize text-zinc-700 dark-text-zinc-200">{{ chat.title }} - {{ chat.model }}</span>
          <p class="text-xs text-zinc-500 dark-text-zinc-400">{{ chat.createdAt.toLocaleDateString('no', { day: '2-digit', month: 'short', weekday: 'long', hour: '2-digit', minute: '2-digit', second: '2-digit' }) }}</p>
        </button>
      </div>
      <div class="mt-auto w-100 space-4 px-2 py-4">
        <button @click="toggleDarkMode" class="d-flex w-100 gap-x-2 rounded-lg px-3 py-2 text-left text-sm font-weight-medium text-zinc-700 transition-colors duration-200 hover-bg-zinc-200 focus-outline-none dark-hover-bg-zinc-800 focus-ring-2 focus-ring-blue-500 dark-bg-zinc-700 dark-text-zinc-200 dark-placeholder-zinc-400 dark-focus-ring-blue-500">
          <IconSun v-if="isDarkMode" class="h-6 w-6" />
          <IconMoon v-else class="h-6 w-6" />
          Toggle dark mode
        </button>
        <!-- Additional buttons -->
        <!-- <button v-if="false" class="d-flex w-100 gap-x-2 rounded-lg px-3 py-2 text-left text-sm font-weight-medium text-zinc-700 transition-colors duration-200 hover-bg-zinc-200 focus-outline-none dark-hover-bg-zinc-800 focus-ring-2 focus-ring-blue-500 dark-bg-zinc-700 dark-text-zinc-200 dark-placeholder-zinc-400 dark-focus-ring-blue-500">
          <IconUserCircle class="h-6 w-6" />
          User
        </button>
        <button @click="toggleSettingsPanel" class="d-flex w-100 gap-x-2 rounded-lg px-3 py-2 text-left text-sm font-weight-medium text-zinc-700 transition-colors duration-200 hover-bg-zinc-200 focus-outline-none dark-hover-bg-zinc-800 focus-ring-2 focus-ring-blue-500 dark-bg-zinc-700 dark-text-zinc-200 dark-placeholder-zinc-400 dark-focus-ring-blue-500">
          <IconSettings2 class="h-6 w-6" />
          Settings
        </button> -->
      </div>
    </div>
  </aside>
</template>

<script>
export default {
  data() {
    return {
      isDarkMode: false,
      previousChats: [], // Define this data array
      currentChat: null, // Define this data
      currentModel: null, // Define this data
    };
  },
  methods: {
    onNewChat() {
      // Define startNewChat
      this.startNewChat('new chat', this.currentModel);
    },
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;
    },
    setCurrentChat(chat) {
      this.currentChat = chat;
    },
    toggleSettingsPanel() {
      // Define this function
    },
  },
};
</script>