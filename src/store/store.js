import Vue from 'vue'

Vue.use(Vuex)

import Vuex from 'vuex';

const store =  new Vuex.Store({
  state () {
      return {
        count: 0,
        items: [],
      }
    },
    mutations: {
      increment (state) {
        state.count++
      },
      setItems(state, data) {
        state.items = data;
      },
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
    },
  })

  export default store
