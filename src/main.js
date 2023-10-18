import Vue from 'vue'
// import Vuex from 'vuex'
// import store from './services/store';
import router from './router'

import BootstrapVue from "bootstrap-vue"

import App from './App'

import Default from './Layout/Wrappers/baseLayout.vue';
import Pages from './Layout/Wrappers/pagesLayout.vue';

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
// Vue.use(Vuex);
Vue.component('default-layout', Default);
Vue.component('userpages-layout', Pages);

new Vue({
  el: '#app',
  router,
  // store: store,
  template: '<App/>',
  components: { App }
});
