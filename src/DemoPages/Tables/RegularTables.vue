<template>
  <div>
    <page-title-component :heading="heading" :subheading="subheading" :icon="icon"></page-title-component>
    <div class="card main-card mb-4 text-white bg-premium-dark">
      <div class="card-body">
        <h3 class="card-title">Table Options</h3>
        <div class="form-check" v-for="option in tableOptions" :key="option.id">
          <input class="form-check-input" type="checkbox" :id="option.id" v-model="option.checked" />
          <label class="form-check-label" :for="option.id">{{ option.label }}</label>
        </div>
      </div>
    </div>
    <div class="card main-card mb-4">
      <div class="card-body">
        <h3 class="card-title">Regular Table Example</h3>
        <table class="table" :class="tableClasses">
          <thead>
            <tr>
              <th v-for="(field, index) in fields" :key="index">{{ getFieldLabel(field) }}</th>
            </tr>
          </thead>
          <tbody>
            <template v-if="items.length > 0">
              <tr v-for="(item, rowIndex) in items" :key="rowIndex">
                <td v-for="(field, colIndex) in fields" :key="colIndex">{{ item[field] }}</td>
              </tr>
            </template>
            <tr v-else>
              <td :colspan="fields.length" class="text-center">No records found</td>
            </tr>
          </tbody>
          <tfoot v-if="footClone">
            <tr>
              <th v-for="(field, index) in fields" :key="index">{{ getFieldLabel(field) }}</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, defineComponent } from "vue";
import PageTitleComponent from "@/Layout/Components/PageTitleComponent.vue";
import defaultData from "@/utils/defaultData.js";

export default defineComponent({
  components: {
    PageTitleComponent,
  },
  setup() {
    const heading = ref("Regular Tables");
    const subheading = ref("Tables are the backbone of almost all web applications.");
    const icon = ref("pe-7s-drawer icon-gradient bg-happy-itmeo");

    const tableOptions = ref([
      { id: "striped", label: "Striped", checked: false },
      { id: "bordered", label: "Bordered", checked: false },
      { id: "outlined", label: "Outlined", checked: false },
      { id: "small", label: "Small", checked: false },
      { id: "hover", label: "Hover", checked: false },
      { id: "dark", label: "Dark", checked: false },
      { id: "fixed", label: "Fixed", checked: false },
      { id: "footClone", label: "Foot Clone", checked: false },
    ]);

    const fields = ref(["id", "first_name", "middle_name", "last_name", "age", "gender", "job", "status"]);
    const items = ref(defaultData);

    const tableClasses = computed(() => ({
      "table-striped": tableOptions.value.find(option => option.id === "striped").checked,
      "table-bordered": tableOptions.value.find(option => option.id === "bordered").checked,
      "table-outlined": tableOptions.value.find(option => option.id === "outlined").checked,
      "table-sm": tableOptions.value.find(option => option.id === "small").checked,
      "table-hover": tableOptions.value.find(option => option.id === "hover").checked,
      "table-dark": tableOptions.value.find(option => option.id === "dark").checked,
      "table-fixed": tableOptions.value.find(option => option.id === "fixed").checked,
    }));

    const footClone = computed(() => tableOptions.value.find(option => option.id === "footClone").checked);

    const getFieldLabel = (field) => {
      return field.charAt(0).toUpperCase() + field.slice(1).replace(/_/g, " ");
    };
    onMounted(() => {
      items.value = defaultData;
    });
    return {
      heading,
      subheading,
      icon,
      tableOptions,
      fields,
      items,
      tableClasses,
      footClone,
      getFieldLabel,
    };
  },
});
</script>
