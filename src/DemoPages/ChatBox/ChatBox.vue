<template>
  <div :class="{ dark: isDarkMode }">
    <main class="d-flex flex-row align-items-stretch flex-1 w-100 h-100 bg-light dark:bg-dark">
      <Sidebar />

      <div class="d-flex h-100 max-w-6xl mx-auto w-100 flex-column">
        <div class="d-flex h-100 gap-4 px-4 py-4 w-100 flex-column">
          <ModelSelector :availableModels="availableModels"/>
          <ChatMessages />
          <ChatInput />
        </div>
      </div>

      <ChatSettings />
    </main>
  </div>
</template>

<script>
import Sidebar from './Sidebar.vue';
import ChatInput from './ChatInput.vue';
import ChatMessages from './ChatMessages.vue';
import ChatSettings from './ChatSettings.vue';
import ModelSelector from './ModelSelector.vue';

export default {
  data() {
    return {
      isDarkMode: false,
      currentChat: null,
      currentModel: null,
    };
  },
  components: {
    Sidebar,
    ChatInput,
    ChatMessages,
    ChatSettings,
    ModelSelector,
  },

  computed: {
    availableModels() {
      return this.$store.getters.getAvailableModels;
    },
  },

  created() {
    // Get the initial values for data properties from your store or other sources.
    this.isDarkMode = this.$store.isDarkMode;
    this.currentChat = this.$store.currentChat;
    this.currentModel = this.$store.currentModel;

    // Watch for changes to currentModel
    this.$watch('currentModel', (newModel) => {
      if (newModel && this.currentChat && this.currentChat.messages.length === 0) {
        this.store.changeCurrentModel(newModel);
      }
    });
  },
};
</script>