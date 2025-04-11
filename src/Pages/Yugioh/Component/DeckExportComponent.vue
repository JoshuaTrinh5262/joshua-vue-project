<template>
  <modal-component title="Deck Export" :isOpen="showModal">
    <template #body> </template>
    <template #footer>
      <button type="text" class="btn btn-primary" @click="toggleModal">
        Cancel
      </button>
      <button-spinner
        :isLoading="onSubmit"
        buttonClass="btn btn-primary"
        @click="handleSubmit"
        normalText="Export"
      />
    </template>
  </modal-component>
</template>
  
<script>
import { defineComponent } from "vue";
import ModalComponent from "../../../Layout/Components/ModalComponent.vue";
import ButtonSpinner from "../../../Layout/Components/ButtonSpinner.vue";

export default defineComponent({
  name: "DeckExportComponent",
  props: {
    showModal: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  components: {
    ModalComponent,
    ButtonSpinner,
  },

  setup() {
    return {};
  },
});
</script>
  
