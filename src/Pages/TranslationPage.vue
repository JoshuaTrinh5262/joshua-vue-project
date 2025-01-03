<template>
    <div>
        <page-title-component :heading="heading" :subheading="subheading" :icon="icon">
        </page-title-component>
        <TableComponent :fields="localeFields" :items="translations" :customClass="'table-striped table-hover'"
            :showAction="false" :footer="true" @changeOrder="handleChangeOrder" @search="handleSearch" />
    </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import PageTitleComponent from '../Layout/Components/PageTitleComponent.vue';
import TableComponent from '../Layout/Components/TableComponent.vue';
import en from "@/translations/en.json";
import vn from "@/translations/vn.json";
import id from "@/translations/id.json";
import jp from "@/translations/jp.json";
import kr from "@/translations/kr.json";


export default defineComponent({
    name: "TranslationPage",

    components: {
        PageTitleComponent,
        TableComponent
    },
    setup() {
        const heading = ref('Translation Page');
        const subheading = ref('Translation Page');
        const icon = ref('pe-7s-file icon-gradient bg-tempting-azure');

        const orderDirection = ref('asc');
        const orderBy = ref('key');
        const translations = ref([]);

        const locales = ref([
            { key: "en", value: "English (EN)" },
            { key: "vn", value: "Vietnamese (VN)" },
            { key: "id", value: "Indonesian (ID)" },
            { key: "jp", value: "Japanese (JP)" },
            { key: "kr", value: "Korean (FR)" }
        ]);
        const translationFiles = { en, vn, id, jp, kr };

        function loadTranslations() {
            const allKeys = new Set();
            locales.value.forEach(locale => {
                Object.keys(translationFiles[locale.key]).forEach(key => allKeys.add(key));
            });

            translations.value = Array.from(allKeys).map(key => {
                const translationEntry = { key };
                locales.value.forEach(locale => {
                    translationEntry[locale.key] = translationFiles[locale.key][key] || "";
                });
                return translationEntry;
            });
        }

        // Use locales as fields with an additional "Key" field
        const localeFields = [
            { key: "key", value: "Key" },
            ...locales.value,
        ];

        const sortTranslations = () => {
            translations.value.sort((a, b) => {
                if (a[orderBy.value] < b[orderBy.value]) {
                    return orderDirection.value === 'asc' ? -1 : 1;
                }
                if (a[orderBy.value] > b[orderBy.value]) {
                    return orderDirection.value === 'asc' ? 1 : -1;
                }
                return 0;
            });
        };

        const handleChangeOrder = ({ orderDirection: newOrderDirection, orderBy: newOrderBy }) => {
            orderDirection.value = newOrderDirection;
            orderBy.value = newOrderBy;
            sortTranslations();
        };

        const handleSearch = (searchTerm) => {
            if (searchTerm) {
                translations.value = translations.value.filter(translation => {
                    return translation.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        Object.values(translation).some(value =>
                            value.toLowerCase().includes(searchTerm.toLowerCase())
                        );
                });
            } else {
                loadTranslations();
            }
        };

        onMounted(() => {
            loadTranslations();
        });

        return {
            heading,
            subheading,
            icon,
            translations,
            locales,
            localeFields,
            handleSearch,
            handleChangeOrder
        };
    }
});
</script>