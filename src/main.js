import { createApp } from 'vue';
import router from './router';

import App from './App.vue';

import Admin from './Layout/Wrappers/adminLayout.vue';
import Default from './Layout/Wrappers/baseLayout.vue';
import Pages from './Layout/Wrappers/pagesLayout.vue';

const app = createApp(App);

// Register global components
app.component('admin-layout', Admin);
app.component('default-layout', Default);
app.component('userpages-layout', Pages);

// Use the router
app.use(router);

// Mount the app
app.mount('#app');