import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createI18n } from 'vue-i18n';
import en from './translations/en.json';
import vn from './translations/vn.json';
import jp from './translations/jp.json';
import id from './translations/id.json';
import kr from './translations/kr.json';
import ru from './translations/ru.json';
import { PerfectScrollbarPlugin } from 'vue3-perfect-scrollbar';
import 'vue3-perfect-scrollbar/style.css';
import router from './router';


import App from './App.vue';

import Admin from './Layout/Wrappers/adminLayout.vue';
import Public from './Layout/Wrappers/publicLayout.vue';
import Empty from './Layout/Wrappers/emptyLayout.vue';

const messages = {
    en,
    vn,
    jp,
    id,
    kr,
    ru
};

const Translation = createI18n({
    legacy: false,
    locale: 'en',
    fallbackLocale: 'en',
    messages,
});

const app = createApp(App);
const pinia = createPinia();

app.config.devtools = true;
// Register global components
app.component('admin-layout', Admin);
app.component('public-layout', Public);
app.component('empty-layout', Empty);

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
