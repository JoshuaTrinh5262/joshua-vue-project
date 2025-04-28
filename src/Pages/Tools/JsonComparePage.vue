<template>
    <page-title-component :heading="heading" :subheading="subheading" :icon="icon"></page-title-component>
    <div class="json-compare">
        <div style="display: flex;">
            <div style="flex: 1;">
                <label for="oldJson">Old JSON</label>
                <textarea id="oldJson" v-model="oldJsonInput" placeholder="Enter old JSON data here" rows="20"
                    style="width: 100%;"></textarea>
            </div>

            <div style="flex: 1;">
                <label for="newJson">New JSON</label>
                <textarea id="newJson" v-model="newJsonInput" placeholder="Enter new JSON data here" rows="20"
                    style="width: 100%;"></textarea>
            </div>
        </div>
        <div>
            <button class="btn btn-primary" @click="compareJson">Compare JSON</button>
            <button class="btn btn-danger" @click="cleanJson">Clean JSON</button>
            <button class="btn btn-info" @click="loadSampleJson">Load Sample JSON</button>
        </div>
    </div>
    <json-compare-component v-if="oldData && newData" :old-data="oldData" :new-data="newData"></json-compare-component>
</template>

<script>
import { defineComponent, ref } from "vue";
import PageTitleComponent from "../../Layout/Components/PageTitleComponent.vue";
import CalculatorComponent from "../../Layout/Components/CalculatorComponent.vue";
import JsonCompareComponent from "../../Layout/Components/JsonCompare/JsonCompareComponent";
import olsSample from "../../Layout/Components/JsonCompare/sample1.json";
import newSample from "../../Layout/Components/JsonCompare/sample2.json";

export default defineComponent({
    name: "JsonComparePage",
    components: {
        PageTitleComponent,
        CalculatorComponent,
        JsonCompareComponent
    },
    setup() {
        const heading = ref("Json Compare");
        const subheading = ref("Validate, format, and compare two JSON documents. See the differences between the objects instead of just the new lines and mixed up properties.");
        const icon = ref("pe-7s-shield icon-gradient bg-tempting-azure");

        const oldJsonInput = ref(null);
        const newJsonInput = ref(null);

        const oldData = ref(null);
        const newData = ref(null);

        const compareJson = () => {
            try {
                oldData.value = JSON.parse(oldJsonInput.value);
                newData.value = JSON.parse(newJsonInput.value);
            } catch (error) {
                alert("Please enter valid JSON in both fields.");
            }
        };

        const loadSampleJson = () => {
            oldJsonInput.value = JSON.stringify(olsSample, null, 2);
            newJsonInput.value = JSON.stringify(newSample, null, 2);
        };

        const cleanJson = () => {
            oldJsonInput.value = null;
            newJsonInput.value = null;
            oldData.value = null;
            newData.value = null;
        };

        return {
            heading,
            subheading,
            icon,
            oldData,
            newData,
            oldJsonInput,
            newJsonInput,
            compareJson,
            cleanJson,
            loadSampleJson
        };
    }
});
</script>