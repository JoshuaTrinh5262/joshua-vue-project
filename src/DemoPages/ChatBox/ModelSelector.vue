<template>
  <div class="mx-auto max-w-md w-full">
    <div class="px-2 py-4 text-zinc-800 dark:text-zinc-200">
      <div class="h-10 inline-flex gap-2 items-center">
        <select
          :disabled="currentChatHasMessages"
          v-model="currentModel"
          class="w-full cursor-pointer rounded-lg border-r-8 border-transparent bg-zinc-200 py-2 h-full pl-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-zinc-700 disabled:opacity-50"
        >
          <option :value="undefined" disabled selected>Select a model</option>
          <option v-for="model in availableModels" :key="model.id" :value="model.name">
            {{ model.name }}
          </option>
        </select>

        <button
          :disabled="currentChatHasMessages"
          title="Refresh available models"
          class="p-3 inline-flex items-center justify-center h-full rounded-lg bg-zinc-200 text-sm focus:outline-none border-none focus:ring-2 focus:ring-blue-600 dark:bg-zinc-700 disabled:opacity-50"
        >
          <!-- <IconRefresh class="h-5 w-5 text-zinc-500" /> -->
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    availableModels: {
      type: Array,
      required: true
    },
    // currentModel: {
    //   type: String,
    //   required: true
    // },
    currentChatHasMessages: {
      type: Boolean,
      required: true
    },
    
  },

  data() {
    return {
      currentModel: null,
    };
  },

  computed: {

  },

  methods: {
    updateCurrentModel(newModel) {
      this.$store.commit('setCurrentModel', newModel);
    },
  },


  watch: {
    currentModel(newModel) {
      console.log(newModel);
      this.updateCurrentModel(newModel);
    },
  },
};
</script>