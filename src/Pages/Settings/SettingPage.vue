<template>
    <div>
        <page-title-component :heading="heading" :subheading="subheading" :icon="icon"></page-title-component>
        <notification-component v-model:notification="notification"></notification-component>
        <tabs-component>
            <tab-component title="Contact Information">
                <div class="information">
                    <div class="information-title">General Information</div>
                    <div class="position-relative form-group">
                        <label for="brand" class="form-label">Brand</label>
                        <input id="brand" class="form-control" value="Hochiminh Duelist Association (HDA)" disabled>
                    </div>
                </div>
                <div class="information">
                    <div class="information-title">Contact Information</div>
                    <div class="form-row">
                        <div class="col-6">
                            <div class="position-relative form-group">
                                <label for="facebook" class="form-label">Facebook</label>
                                <input id="facebook" class="form-control" disabled>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="position-relative form-group">
                                <label for="youtube" class="form-label">Youtube</label>
                                <input id="youtube" class="form-control" disabled>
                            </div>
                        </div>
                    </div>
                    <div class="position-relative form-group">
                        <label for="email" class="form-label">Email</label>
                        <input id="email" value="testing@gmail.com" class="form-control" disabled>
                    </div>
                    <div class="position-relative form-group">
                        <label for="phone" class="form-label">Phone</label>
                        <input id="phone" value="(00)-000-000-000" class="form-control" disabled>
                    </div>
                    <div class="position-relative form-group">
                        <label for="website" class="form-label">Website</label>
                        <input id="website" value="https://joshuatrinh.fun/" class="form-control" disabled>
                    </div>
                    <div class="position-relative">
                        <button class="btn btn-primary" type="button">Save</button>
                    </div>
                </div>
                <div class="information information-block-left">
                    <div class="information-title">Google Connection</div>
                    <div class="position-relative form-group">
                        <label for="google" class="form-label">Google Key</label>
                        <input id="google" class="form-control" value="******" disabled>
                    </div>
                    <div class="position-relative form-group">
                        <label for="google-adsense-account" class="form-label">Google Adsense Account</label>
                        <input id="google-adsense-account" class="form-control" placeholder="ca-pub-XXXXXXXXXXXXXXXX"
                            value="ca-pub-3897004617530574" disabled>
                    </div>
                    <div class="position-relative">
                        <button class="btn btn-primary" type="button">Connected</button>
                    </div>
                </div>
                <div class="information information-block-right">
                    <div class="information-title">Supabase Connection</div>
                    <div class="information-btn-wrap">
                        <button class="btn btn-blue" type="button">Edit</button>
                    </div>
                    <div class="position-relative form-group">
                        <label for="superbase-key" class="form-label">Supabase Public Key</label>
                        <input id="superbase-key" class="form-control" value="******" disabled>
                    </div>
                    <div class="position-relative form-group">
                        <label for="superbase-url" class="form-label">Supabase Url</label>
                        <input id="superbase-url" class="form-control" value="https://********************.supabase.co"
                            disabled>
                    </div>
                    <div class="position-relative">
                        <button class="btn btn-primary" type="button">Connected</button>
                    </div>
                </div>
            </tab-component>
            <tab-component :title="$t('system_setting')">
                <div class="information">
                    <div class="information-title">{{ $t('language') }}</div>
                    <div class="position-relative form-group">
                        <label for="language" class="form-label">{{ $t('select_language') }}</label>

                        <select id="language" v-model="selectedLanguage" class="form-control">
                            <option value="en">{{ $t('english') }}</option>
                            <option value="vn">{{ $t('vietnamese') }}</option>
                            <option value="jp">{{ $t('japanese') }}</option>
                            <option value="id">{{ $t('indonesian') }}</option>
                            <option value="kr">{{ $t('korean') }}</option>
                            <option value="ru">{{ $t('russian') }}</option>
                        </select>
                    </div>
                    <div class="position-relative">
                        <button @click="changeLanguage" class="btn btn-primary"> {{ $t('apply_setting') }}</button>
                    </div>
                </div>
                <div class="information">
                    <div class="information-title">Dark Mode</div>
                    <div class="position-relative form-group">
                        <button id="darkmode" class="btn btn-primary" @click="toggleDark()">
                            <i v-if="!isDark" class="pe-7s-sun"></i>
                            <i v-else class="pe-7s-moon"></i>
                            Toggle Dark Mode
                        </button>
                    </div>
                </div>
            </tab-component>
        </tabs-component>
    </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import { useI18n } from 'vue-i18n';
import PageTitleComponent from "@/Layout/Components/PageTitleComponent.vue";
import NotificationComponent from "@/Layout/Components/NotificationComponent.vue";
import DateTimePicker from "@/DemoPages/Components/DateTimePicker.vue";
import { useDark, useToggle } from "@vueuse/core";
import TabComponent from "@/Layout/Components/Tabs/TabComponent.vue";
import TabsComponent from "@/Layout/Components/Tabs/TabsComponent.vue";

export default defineComponent({
    name: "SettingPage",

    components: {
        PageTitleComponent,
        NotificationComponent,
        DateTimePicker,
        TabComponent,
        TabsComponent
    },

    setup() {
        const isDark = useDark();
        const toggleDark = useToggle(isDark);
        const { t, locale } = useI18n();
        const heading = ref(t("settings"));
        const subheading = ref("Setting Page.");
        const icon = ref("pe-7s-settings icon-gradient bg-tempting-azure");
        const notification = ref(null);
        const selectedLanguage = ref(locale.value);
        const changeLanguage = () => {
            locale.value = selectedLanguage.value;
            localStorage.setItem("selectedLanguage", selectedLanguage.value);
            notification.value = {
                title: "Success",
                content: "Change Language Successfully!",
                type: "success",
            };
        };

        onMounted(() => {
            const savedLanguage = localStorage.getItem("selectedLanguage");
            if (savedLanguage) {
                locale.value = savedLanguage;
                selectedLanguage.value = savedLanguage;
            }
        });

        return {
            heading,
            subheading,
            icon,
            notification,
            selectedLanguage,
            isDark,
            changeLanguage,
            toggleDark,
        };
    },
});
</script>
