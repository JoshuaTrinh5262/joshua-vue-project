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
              message: "Hello"
            },
            {
              role: "ai",
              message: "Hello. How can i help you?"
            }
          ],
          model: 'Model A',
          title: "new chat 1",
        },
        {
          createdAt: "2023-10-19T22:55:15.000Z",
          id: "a4b6f3d1-92fe-4dd7-b231-0bcfed1ec454",
          messages: [],
          model: 'Model B',
          title: "new chat 2",
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
      ],
    }
  },
  mutations: {
    increment (state) {
      state.count++
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
  },

  getters: {
    getAvailableModels: (state) => state.availableModels,
  },

  actions: {
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
    },
    addMessage({ commit, state }, { role, content }) {
      if (!state.currentChat) return;
      if (!content?.trim()) return;

      const message = {
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