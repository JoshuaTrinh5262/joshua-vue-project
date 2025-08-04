<template>
    <div>
        <page-title-component :heading="heading" :subheading="subheading" :icon="icon"></page-title-component>
        <notification-component v-model:notification="notification"></notification-component>

        <div class="card main-card">
            <div class="card-body">
                <h4 class="card-title">{{ $t('system_setting') }}</h4>
                <!-- Language Section -->
                <div class="position-relative row form-group">
                    <label for="language" class="col-sm-2 col-form-label">{{ $t('select_language') }}</label>
                    <div class="col-sm-10">
                        <select id="language" v-model="selectedLanguage" class="form-control">
                            <option value="en">{{ $t('english') }}</option>
                            <option value="vn">{{ $t('vietnamese') }}</option>
                            <option value="jp">{{ $t('japanese') }}</option>
                            <option value="id">{{ $t('indonesian') }}</option>
                            <option value="kr">{{ $t('korean') }}</option>
                            <option value="ru">{{ $t('russian') }}</option>
                        </select>
                    </div>
                </div>
                <div class="position-relative row form-check">
                    <button @click="changeLanguage" class="btn btn-primary"> {{ $t('apply_setting') }}</button>
                </div>
                <div class="divider"></div>
                <!-- Darkmode Section -->
                <div class="position-relative row form-group">
                    <label for="darkmode" class="col-sm-2 col-form-label">Dark mode</label>
                    <div class="col-sm-10">
                        <button id="darkmode" class="btn btn-primary" @click="toggleDark()">
                            <i v-if="!isDark" class="pe-7s-sun"></i>
                            <i v-else class="pe-7s-moon"></i>
                            Toggle Dark Mode
                        </button>
                    </div>
                </div>
                <div class="divider"></div>
                <!-- Other Selection -->
                <div class="position-relative row form-group">
                    <label class="col-sm-2 col-form-label">Demo Date Time Picker</label>
                    <div class="col-sm-10">
                        <DateTimePicker></DateTimePicker>
                    </div>
                </div>
                <div class="position-relative row form-check">
                    <button class="btn btn-primary" type="button">Save</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import { useI18n } from 'vue-i18n';
import PageTitleComponent from "@/Layout/Components/PageTitleComponent.vue";
import NotificationComponent from "@/Layout/Components/NotificationComponent.vue";
import DateTimePicker from "@/DemoPages/Components/DateTimePicker.vue";
import { useDark, useToggle } from "@vueuse/core";

export default defineComponent({
    name: "SettingPage",

    components: {
        PageTitleComponent,
        NotificationComponent,
        DateTimePicker
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
