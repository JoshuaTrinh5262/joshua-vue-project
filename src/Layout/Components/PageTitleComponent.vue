<template>
  <div class="app-page-title">
    <div class="page-title-wrapper">
      <div class="page-title-heading">
        <div class="page-title-icon">
          <i :class="icon"></i>
        </div>
        <div>
          <h2>{{ heading }}</h2>
          <div class="page-title-subheading">
            {{ subheading }}
          </div>
        </div>
      </div>
      <div class="page-title-actions">
        <slot name="actions"></slot>
        <button type="button" class="btn-shadow ml-2 btn btn-dark">
          <i class="pe-7s-more"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, toRefs } from "vue";

export default defineComponent ({
  name: "PageTitleComponent",
  props: {
    icon: {
      type: String,
      required: true,
    },
    heading: {
      type: String,
      required: true,
    },
    subheading: {
      type: String,
      default: "",
    },
    showImport: {
      type: Boolean,
      default: false,
    },
    showExport: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const { icon, heading, subheading, showImport, showExport } = toRefs(props);

    return {
      icon,
      heading,
      subheading,
      showImport,
      showExport,
    };
  },
});
</script>