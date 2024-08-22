import Vue from 'vue';
import router from './router';
import store from './store/store';

import App from './App';

import Admin from './Layout/Wrappers/adminLayout.vue';
import Default from './Layout/Wrappers/baseLayout.vue';
import Pages from './Layout/Wrappers/pagesLayout.vue';

Vue.config.productionTip = false;

Vue.component('admin-layout', Admin);
Vue.component('default-layout', Default);
Vue.component('userpages-layout', Pages);

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
