<template>
  <div :class="{ dark: isDarkMode }" >
    <page-title-component :heading="heading" :subheading="subHeading" :icon="icon"></page-title-component>
    <div class="card-body bg-light">
      <div class="row">
        <div class="col-3">
          <chat-sidebar></chat-sidebar>
        </div>
        <div class="col-9">
          <model-selector></model-selector>
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
import PageTitleComponent from '../../Layout/Components/PageTitleComponent.vue';

export default {
  data() {
    return {
      heading: 'Chatbox',
      subHeading: 'Chatbox demo',
      icon: 'pe-7s-bandaid icon-gradient bg-amy-crisp',
    };
  },
  components: {
    ChatSidebar,
    ChatInput,
    ChatMessages,
    ChatSettings,
    ModelSelector,
    PageTitleComponent,
  },

  computed: {
    availableModels() {
      // return this.$store.getters.getAvailableModels;
    },

    isDarkMode() {
      // return this.$store.getters.isDarkMode;
    },

    currentChat() {
      // return this.$store.getters.currentChat;
    },
  },

  // created() {
  //   this.$watch('currentModel', (newModel) => {
  //     if (newModel && this.currentChat && this.currentChat.messages.length === 0) {
  //       this.store.changeCurrentModel(newModel);
  //     }
  //   });
  // },
};
</script>