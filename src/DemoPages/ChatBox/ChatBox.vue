<template>
  <div :class="{ dark: isDarkMode }">
    <main class="d-flex flex-row align-items-stretch flex-1 w-100 h-100 bg-light dark:bg-dark">
      <Sidebar />

      <div class="d-flex h-100 max-w-6xl mx-auto w-100 flex-column">
        <div class="d-flex h-100 gap-4 px-4 py-4 w-100 flex-column">
          <ModelSelector />
          <ChatMessages />
          <ChatInput />
        </div>
      </div>

      <Settings />
    </main>
  </div>
</template>

<script>
import Sidebar from './Sidebar.vue';
import ChatInput from './ChatInput.vue';
import ChatMessages from './ChatMessages.vue';
import Settings from './Settings.vue';
import ModelSelector from './ModelSelector.vue';
// import store from '../../services/store';

export default {
  data() {
    return {
      isDarkMode: false,
      currentChat: null,
      availableModels: [],
      currentModel: null,
    };
  },
  components: {
    Sidebar,
    ChatInput,
    ChatMessages,
    Settings,
    ModelSelector,
  },
  created() {
    // Get the initial values for data properties from your store or other sources.
    // this.isDarkMode = store.isDarkMode;
    // this.currentChat = store.currentChat;
    // this.availableModels = store.availableModels;
    // this.currentModel = store.currentModel;
    this.isDarkMode = false; // Set your initial data
    this.currentChat = null;
    this.availableModels = [];
    this.currentModel = null;

    // Watch for changes to currentModel
    this.$watch('currentModel', (newModel) => {
      if (newModel && this.currentChat && this.currentChat.messages.length === 0) {
        // store.changeCurrentModel(newModel);
      }
    });
  },
};
</script>