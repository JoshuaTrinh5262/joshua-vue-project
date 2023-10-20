<template>
  <div class="mx-auto max-w-md w-full">
    <div class="">
      <div class="form-inline">
        <select 
          :disabled="currentChatHasMessages"
          v-model="currentModel"
          class="mb-2 form-control">
            <option :value="undefined" disabled selected>Select A Model</option>
            <option v-for="model in availableModels" :key="model.id" :value="model.name">
              {{ model.name }}
            </option>
        </select>
        <button
          :disabled="currentChatHasMessages"
          title="Refresh available models"
          class="btn btn-primary mb-2 form-control"
        >
          <!-- <IconRefresh class="h-5 w-5 text-zinc-500" /> -->
          Refresh
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: {
    availableModels: {
      type: Array,
      required: true
    },
  },

  data() {
    return {
      currentModel: null,
    };
  },

  computed: {
    ...mapState({
      currentChat: 'currentChat',
    }),

    currentChatHasMessages() {
      return this.currentChat?.messages?.length > 0;
    },
  },

  methods: {
    updateCurrentModel(newModel) {
      this.$store.commit('setCurrentModel', newModel);
    },
  },


  watch: {
    currentModel(newModel) {
      this.updateCurrentModel(newModel);
    },
  },
};
</script>