<template>
    <div>
        <page-title 
            :heading=heading
            :subheading=subheading
            :icon=icon></page-title>
        <div>
            <textarea v-model="text" @input="updateCounters"></textarea>
            <div>
                <p>Words: {{ words }}</p>
                <p>Sentences: {{ sentences }}</p>
                <p>Paragraphs: {{ paragraphs }}</p>
                <p>Total Unique Word: {{ uniqueWordCount }}</p>
            </div>
        </div>
        <div>
            <h3>Word Frequency:</h3>
            <ul>
                <li v-for="item in wordFrequency" :key="item.word">
                {{ item.word }}: {{ item.count }}
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import PageTitle from "../../Layout/Components/PageTitle";

export default { 
    name: "WordCounterPage",

    components: {
        PageTitle
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
        height: 200px;
    }
</style>