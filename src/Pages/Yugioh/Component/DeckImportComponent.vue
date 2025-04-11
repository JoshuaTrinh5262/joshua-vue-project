<template>
  <modal-component
    title="Deck Import"
    :isOpen="showModal"
    @closeModal="closeModal"
  >
    <template #body>
      <div class="form-inline">
        <div class="position-relative form-group">
          <label for="fileInput" class="">Import File</label>
          <input
            name="file"
            id="fileInput"
            type="file"
            accept=".ydk"
            @change="handleFileChange"
            class="form-control-file"
            required
          />
        </div>
      </div>
    </template>
    <template #footer>
      <button type="text" class="btn btn-primary" @click="closeModal">
        Cancel
      </button>
      <button-spinner
        :isLoading="false"
        buttonClass="btn btn-primary"
        @click="handleImport"
        normalText="Import"
      />
    </template>
  </modal-component>
</template>
  
<script>
import { defineComponent, ref } from "vue";
import ModalComponent from "../../../Layout/Components/ModalComponent.vue";
import ButtonSpinner from "../../../Layout/Components/ButtonSpinner.vue";
import { parseYugiohDeckFile } from "../../../utils/fileHelper";
import { apiService } from "../../../supabase/apiService";

export default defineComponent({
  name: "DeckImportComponent",
  emits: ["closeModal"],
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

  setup(props, { emit }) {
    const file = ref(null);

    const handleFileChange = (e) => {
      file.value = e.target.files[0];
    };

    const closeModal = () => {
      emit("closeModal");
    };

    const handleImport = async () => {
      if (!file.value) {
        return alert("No file selected");
      }

      const reader = new FileReader();

      reader.onload = async (e) => {
        const content = e.target.result;
        console.log("content", content);
        const deckData = parseYugiohDeckFile(content, {
          name: "Imported Deck " + new Date().toISOString().split("T")[0],
        });

        const result = await apiService.importYugiohDeck(deckData);

        if (result.error) {
          alert("Import failed: " + result.error);
        } else {
          alert("Deck imported successfully!");
        }
      };

      reader.readAsText(file.value);
    };

    return {
      handleFileChange,
      closeModal,
      handleImport,
    };
  },
});
</script>
  
