import Vue from 'vue'
import Vuex from 'vuex';
import { v4 as uuidv4 } from 'uuid';

Vue.use(Vuex)

const store =  new Vuex.Store({
  state () {
    return {
      count: 0,
      items: [],
      previousChats: [
        {
          createdAt: "2023-10-19T22:55:15.000Z",
          id: "a4b6f3d1-92fe-4dd7-b231-0bcfed1ec453",
          messages: [
            {
              role: "user",
              content: "Hello"
            },
            {
              role: "ai",
              content: "Hello. How can i help you?"
            },
            {
              role: "user",
              content: "Hello"
            },
            {
              role: "ai",
              content: "Hello. How can i help you?"
            },
            {
              role: "user",
              content: "What is Earth ?"
            },
            {
              role: "ai",
              content: "The Earth, often simply referred to as Earth, is the third planet from the Sun in our solar system. It is a terrestrial planet and is the only known celestial body to support life. Earth is located at an average distance of approximately 93 million miles (150 million kilometers) from the Sun, which places it within the habitable zone, where conditions are just right for the existence of liquid water, essential for life as we know it."
            },
          ],
          model: 'Model A',
          title: "new chat 1",
        },
        {
          createdAt: "2023-10-19T22:55:15.000Z",
          id: "a4b6f3d1-92fe-4dd7-b231-0bcfed1ec454",
          messages: [
            {
              role: "system",
              content: "Hello"
            },
            {
              role: "ai",
              content: "Hello. How can i help you?"
            },
          ],
          model: 'Model B',
          title: "new chat 2",
        },
                {
          createdAt: "2023-10-19T22:55:15.000Z",
          id: "a4b6f3d1-92fe-4dd7-b231-0bcfed1ec455",
          messages: [],
          model: 'Model C',
          title: "new chat 3",
        },        
      ],
      currentChat: null,
      currentModel: null,
      availableModels: [
        {
          id: 1,
          name: 'Model A',
        },
        {
          id: 2,
          name: 'Model B',
        },
        {
          id: 3,
          name: 'Model C',
        },
      ],
      debugMode: false,
      isDarkMode: false,
      isSettingsPanelOpen: false,
      userInput: ''
    }
  },
  mutations: {
    increment (state) {
      state.count++;
    },

    setItems(state, data) {
      state.items = data;
    },

    addChat(state, chat) {
      state.previousChats.push(chat);
    },

    setCurrentChat(state, chat) {
      state.currentChat = chat;
    },

    setCurrentModel(state, model) {
      state.currentModel = model;
    },

    setUserInput(state, input) {
      state.userInput = input;
    },

    clearUserInput(state) {
      state.userInput = '';
    },

    addMessageToCurrentChat(state, message) {
      state.currentChat.messages.push(message);
    },

    toggleDarkMode(state) {
      state.isDarkMode = !state.isDarkMode;
    },

    toggleSettingsPanel(state) {
      state.isSettingsPanelOpen = !state.isSettingsPanelOpen;
    },

    changeCurrentModel(state, newModel) {
      if (state.currentModel && state.currentChat.messages.length === 0) {
        state.currentModel = newModel;
      }
    },

  },

  getters: {
    getAvailableModels: (state) => state.availableModels,
    getCurrentModel: (state) => state.currentModel,
  },

  actions: {
    changeCurrentModel({ commit }, newModel) {
      commit('changeCurrentModel', newModel);
    },

    async fetchData(context) {
      try {
        const response = await fetch('./demo/data/translation.js');
        const data = await response.json();
        if (Array.isArray(data.data)) {
          context.commit('setItems', data.data);
        } else {
          console.error('Data is not an array');
        }
      } catch (error) {
        console.error(error);
      }
    },

    startNewChat({ commit }, { title, model }) {
      const newChat = {
        title,
        model,
        id: uuidv4(),
        messages: [],
        createdAt: new Date(),
      };
      commit('addChat', newChat);
      commit('setCurrentChat', newChat);
      commit('setCurrentModel', model);
    },

    addMessage({ commit, state }, { role, content }) {
      if (!state.currentChat) return;
      if (!content?.trim()) return;

      const message = {
        // id,
        role,
        content,
        date: new Date(),
      };

      commit('addMessageToCurrentChat', message);

      if (role === 'user') {
        // You can dispatch other actions if needed
        // For simplicity, I'll add a sample mutation here
        commit('clearUserInput');

        // // You can use async/await here
        // generateCompletion({
        //   model: state.currentChat.model,
        //   prompt: content,
        //   context: state.currentChat.lastContext,
        // }).then((data) => {
        //   if (data.done === false) {
        //     // You can dispatch another action here if needed
        //     commit('appendAiMessage', data.response);
        //   } else if (data.done && 'context' in data) {
        //     // Dispatch the 'addSystemMessage' mutation
        //     commit('addSystemMessage', JSON.stringify(data, null, 2));
        //     // Update the 'lastContext' in the state
        //     commit('updateLastContext', data.context);
        //   }
        // });
      }
    },
  },
})

export default store