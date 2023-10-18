import createStore from 'vuex';

const state = {
  gravatarEmail: 'helge.sverre@gmail.com',
  debugMode: false,
  isDarkMode: true,
  isSettingsPanelOpen: true,
  currentModel: null,
  availableModels: [],
  userInput: '',
  previousChats: [],
  currentChat: null,
};

// const getters = {
//   avatarUrl: (state) => gravatarUrl(state.gravatarEmail, { size: 200 }),
// };

const mutations = {
  toggleSettingsPanel(state) {
    state.isSettingsPanelOpen = !state.isSettingsPanelOpen;
  },
  setCurrentChat(state, chat) {
    state.currentChat = chat;
  },
  addUserMessage(state, content) {
    // Add user message logic
  },
  addAiMessage(state, content) {
    // Add AI message logic
  },
  appendAiMessage(state, content) {
    // Append AI message logic
  },
  fetchAvailableModels(state) {
    // Fetch available models logic
  },
  clearUserInput(state) {
    state.userInput = '';
  },
  changeCurrentModel(state, newModel) {
    // Change current model logic
  },
  startNewChat(state, { title, model }) {
    // Start a new chat logic
  },
  initialize(state) {
    // Initialization logic
  },
};

const actions = {
  // Your actions go here
};

export default createStore({
  state,
  getters,
  mutations,
  actions,
});
