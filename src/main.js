import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createI18n } from 'vue-i18n';
import en from './translations/en.json';
import vn from './translations/vn.json';
import jp from './translations/jp.json';
import id from './translations/id.json';
import kr from './translations/kr.json';
import { PerfectScrollbarPlugin } from 'vue3-perfect-scrollbar';
import 'vue3-perfect-scrollbar/style.css';
import router from './router';


import App from './App.vue';

import Admin from './Layout/Wrappers/adminLayout.vue';
import Default from './Layout/Wrappers/baseLayout.vue';
import Pages from './Layout/Wrappers/pagesLayout.vue';

const messages = {
    en,
    vn,
    jp,
    id,
    kr,
};

const Translation = createI18n({
    locale: 'en',
    fallbackLocale: 'en',
    messages,
});

const app = createApp(App);
const pinia = createPinia();

// Register global components
app.component('admin-layout', Admin);
app.component('default-layout', Default);
app.component('userpages-layout', Pages);

// Use the router
app.use(router);

// Use Perfect Scrollbar Plugin
app.use(PerfectScrollbarPlugin);

// Use Translation
app.use(Translation);

// Use pinia
app.use(pinia);

// Mount the app
app.mount('#app');
