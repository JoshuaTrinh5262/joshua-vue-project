<template>
  <div class="d-flex justify-content-center">
    <div class="form-inline">
      <select 
        :disabled="currentChatHasMessages"
        v-model="currentModel"
        @change=""
        class="mb-2 form-control">
          <option :value="null" disabled>Select A Model</option>
          <option v-for="model in availableModels"
          :key="model.name"
          :value="model.name"
          :selected="model.name=== currentModel"
          >
            {{ model.name }}
          </option>
      </select>
      <p>Selected option: {{ this.currentModel }}</p>

      <button
        :disabled="currentChatHasMessages"
        title="Refresh available models"
        class="btn btn-primary mb-2 form-control"
      >
        Refresh
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, } from 'vuex';
import { mapMutations } from 'vuex';

export default {
  data() {
    return {
      seletedModel: null
    };
  },

  mounted() {
    this.seletedModel = this.currentModel;
  },

  computed: {
    ...mapState({
      currentModel: 'currentModel',
      currentChat: 'currentChat',
      availableModels: 'availableModels',
    }),

    // currentModel: {
    //   get() {
    //       return this.value
    //   },
    //   set(value) {
    //       this.value = value
    //   }
    // },
    
    currentChatHasMessages() {
      return this.currentChat?.messages?.length > 0;
    },
  },
  watch: {
    seletedModel(newModel) {
      if (newModel && this.currentChat && this.currentChat.messages && this.currentChat.messages.length === 0) {
        console.log('The current model changed to:', newModel);
        this.changeCurrentModel(newModel);
      }
    },
  },

  methods: {
    ...mapMutations([
      'setCurrentModel',
      'changeCurrentModel'
    ]),

    // updateCurrentModel() {
    //   this.changeCurrentModel(this.currentModel);

      // this.setCurrentModel(this.selectedModel);
    // },
  },
};
</script>