<template>
  <div :class="{ dark: isDarkMode }">
    <page-title :heading=heading :subheading=subheading :icon=icon></page-title>
    <div class="card-body">
      <div class="row">
        <div class="col-md-4">
          <chat-sidebar></chat-sidebar>
        </div>
        <div class="col-md-4">
          <model-selector :availableModels="availableModels"></model-selector>
          <chat-messages></chat-messages>
          <chat-input></chat-input>
        </div>
          <chat-settings></chat-settings>
        </div>
      </div>
  </div>
</template>

<script>
import ChatSidebar from './ChatSidebar.vue';
import ChatInput from './ChatInput.vue';
import ChatMessages from './ChatMessages.vue';
import ChatSettings from './ChatSettings.vue';
import ModelSelector from './ModelSelector.vue';
import PageTitle from '../../Layout/Components/PageTitle.vue';

export default {
  data() {
    return {
      heading: 'Chatbox',
      subheading: 'Chatbox',
      icon: 'pe-7s-bandaid icon-gradient bg-amy-crisp',

      isDarkMode: false,
      currentChat: null,
      currentModel: null,
    };
  },
  components: {
    ChatSidebar,
    ChatInput,
    ChatMessages,
    ChatSettings,
    ModelSelector,
    PageTitle,
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