<template>
  <div class="c-json-view">
    <p class="c-json-outter">{{ isArray(newData) ? "[" : "{" }}</p>
    <Tree 
      v-for="(item, index) in mergeView" 
      :key="index" 
      :name="item.name"
      :value="item.value"
      :type="item.type"
      :line="item.line"
      :showIndex="item.showIndex"
      :needComma="item.needComma"
      :lineType="item.lineType"
      :lastLineType="item.lastLineType"
      :lastLine="item.lastLine" />
    <p class="c-json-outter">{{ isArray(newData) ? "]" : "}" }}</p>
  </div>
</template>

<script>
import { defineComponent, ref, watch, onMounted } from "vue";
import { mergeData, isArray } from "./utils.js";
import Tree from "./tree.vue";
import "./jsoncompare.css";


export default defineComponent({
  name: "JsonCompareComponent",

  props: {
    oldData: {
      type: Object,
      required: true,
    },
    newData: {
      type: Object,
      required: true,
    }
  },
  components: {
    Tree,
  },
  setup(props) {
    const mergeView = ref([]);

    watch([() => props.oldData, () => props.newData], () => {
      updateView();
    });

    const updateView = () => {
      mergeView.value = mergeData(props.oldData, props.newData);
    };

    onMounted(() => {
      updateView();
    });

    return {
      mergeView,
      isArray,
    };
  }
});
</script>
