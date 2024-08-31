<template>
    <div>
        <page-title-component :heading=heading :subheading=subheading :icon=icon></page-title-component>

        <div class="content">
            <textarea v-model="text" @input="updateCounters"></textarea>
            <div class="row">
                <div class="col-md-6">
                    <div class="counter">
                        <div class="card">
                            <div class="card-header">
                                <h5>Counter</h5>
                            </div>
                            <div class="card-body">
                                <div class="input-group">
                                    <input type="text" class="form-control" v-model="words">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text">Words</span>
                                    </div>
                                </div>
                                <br>
                                <div class="input-group">
                                    <input type="text" class="form-control" v-model="sentences">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text">Sentences</span>
                                    </div>
                                </div>
                                <br>
                                <div class="input-group">
                                    <input type="text" class="form-control" v-model="paragraphs">
                                    <div class="input-group-prepend btn-primary">
                                        <span class="input-group-text">Paragraphs</span>
                                    </div>
                                </div>
                                <br>
                                <div class="input-group">
                                    <input type="text" class="form-control" v-model="uniqueWordCount">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text">Total Unique Word</span>
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
                                <h5>Word Frequency</h5>
                            </div>
                            <div class="card-body">
                                <ul class="list-group">
                                    <li class="list-group-item" v-for="item in wordFrequency" :key="item.word">
                                        {{ item.word }}: {{ item.count }}
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <br>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>
<script>
import PageTitleComponent from "../../Layout/Components/PageTitleComponent.vue";

export default {
    name: "WordCounterPage",

    components: {
        PageTitleComponent
    },

    data() {
        return {
            heading: 'Word Counter',
            subheading: 'easy-to-use tool for tracking word and character counts in your writing.',
            icon: 'pe-7s-phone icon-gradient bg-premium-dark',
            text: '',
            words: 0,
            sentences: 0,
            paragraphs: 0,
            uniqueWordCount: 0,
            wordFrequency: [],
            sortEnabled: false,
        };
    },

    methods: {
        updateCounters() {
            this.wordCounter();
            this.sentenceCounter();
            this.paragraphCounter();
            this.wordFrequencyCounter();
        },

        wordCounter() {
            const wordCount = this.text ? this.text.match(/\b\w+('\w+)?\b/g) : [];
            this.words = wordCount.length;
        },

        sentenceCounter() {
            const sentenceCount = this.text ? this.text.split(/[.?!][ "\n]/) : [];
            this.sentences = sentenceCount.length > 0 ? sentenceCount.length - 1 : 0;
        },

        paragraphCounter() {
            const paragraphCount = this.text ? this.text.split(/\n/) : [];
            this.paragraphs = paragraphCount.length;
        },

        wordFrequencyCounter() {
            //count
            const wordArray = this.text ? this.text.match(/\b\w+('\w+)?\b/g) : [];
            // Calculate word frequencies
            const wordFrequency = wordArray.reduce((acc, word) => {
                const existingWord = acc.find(item => item.word === word.toLowerCase());

                if (existingWord) {
                    existingWord.count += 1;
                } else {
                    acc.push({ word, count: 1 });
                }

                return acc;
            }, []);

            // Sort the array based on word in alphabetical order
            wordFrequency.sort((a, b) => a.word.localeCompare(b.word));

            // Update the state with the sorted word frequency array
            this.wordFrequency = wordFrequency;
            this.uniqueWordCount = wordFrequency.length;

        },
    },
};
</script>

<style scoped>
textarea {
    width: 100%;
    height: 300px;
}
</style>