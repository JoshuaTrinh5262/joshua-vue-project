<template>
    <div>
        <page-title-component :heading="heading" :subheading="subheading" :icon="icon"></page-title-component>

        <div class="content">
            <textarea v-model="text" @input="updateCounters"></textarea>
            <div class="row">
                <div class="col-md-6">
                    <div class="counter">
                        <div class="card">
                            <div class="card-header">
                                <h5>{{ $t('counter') }}</h5>
                            </div>
                            <div class="card-body">
                                <div class="input-group">
                                    <input type="text" class="form-control" v-model="words" />
                                    <div class="input-group-prepend">
                                        <span class="input-group-text">{{ $t('words') }}</span>
                                    </div>
                                </div>
                                <br />
                                <div class="input-group">
                                    <input type="text" class="form-control" v-model="sentences" />
                                    <div class="input-group-prepend">
                                        <span class="input-group-text">{{ $t('sentences') }}</span>
                                    </div>
                                </div>
                                <br />
                                <div class="input-group">
                                    <input type="text" class="form-control" v-model="paragraphs" />
                                    <div class="input-group-prepend btn-primary">
                                        <span class="input-group-text">{{ $t('paragraphs') }}</span>
                                    </div>
                                </div>
                                <br />
                                <div class="input-group">
                                    <input type="text" class="form-control" v-model="uniqueWordCount" />
                                    <div class="input-group-prepend">
                                        <span class="input-group-text">{{ $t('total_unique_word') }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="word-frequency">
                        <div class="card">
                            <div class="card-header">
                                <h5>{{ $t('word_frequency') }}</h5>
                            </div>
                            <div class="card-body">
                                <ul class="list-group">
                                    <li class="list-group-item" v-for="item in wordFrequency" :key="item.word">
                                        {{ item.word }}: {{ item.count }}
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <br />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useI18n } from 'vue-i18n';
import PageTitleComponent from "../../Layout/Components/PageTitleComponent.vue";

export default defineComponent({
    name: "WordCounterPage",
    components: {
        PageTitleComponent,
    },

    setup() {
        const { t, locale } = useI18n();
        const heading = ref(t("word_counter"));
        const subheading = ref("easy-to-use tool for tracking word and character counts in your writing.");
        const icon = ref("pe-7s-tools icon-gradient bg-premium-dark");

        const text = ref("");
        const words = ref(0);
        const sentences = ref(0);
        const paragraphs = ref(0);
        const uniqueWordCount = ref(0);
        const wordFrequency = ref([]);

        const updateCounters = () => {
            wordCounter();
            sentenceCounter();
            paragraphCounter();
            wordFrequencyCounter();
        };

        const wordCounter = () => {
            const wordCount = text.value ? text.value.match(/\b\w+("\w+)?\b/g) : [];
            words.value = wordCount ? wordCount.length : 0;
        };

        const sentenceCounter = () => {
            const sentenceCount = text.value ? text.value.split(/[.?!][ "\n]/) : [];
            sentences.value = sentenceCount.length > 0 ? sentenceCount.length - 1 : 0;
        };

        const paragraphCounter = () => {
            const paragraphCount = text.value ? text.value.split(/\n/) : [];
            paragraphs.value = paragraphCount ? paragraphCount.length : 0;
        };

        const wordFrequencyCounter = () => {
            const wordArray = text.value ? text.value.match(/\b\w+("\w+)?\b/g) : [];
            const frequency = wordArray.reduce((acc, word) => {
                const existingWord = acc.find((item) => item.word === word.toLowerCase());

                if (existingWord) {
                    existingWord.count += 1;
                } else {
                    acc.push({ word, count: 1 });
                }

                return acc;
            }, []);

            frequency.sort((a, b) => a.word.localeCompare(b.word));

            wordFrequency.value = frequency;
            uniqueWordCount.value = frequency.length;
        };

        return {
            heading,
            subheading,
            icon,
            text,
            words,
            sentences,
            paragraphs,
            uniqueWordCount,
            wordFrequency,
            updateCounters,
        };
    },
});
</script>

<style scoped>
textarea {
    width: 100%;
    height: 300px;
}
</style>