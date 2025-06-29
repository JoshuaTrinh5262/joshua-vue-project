<template>
  <page-title-component :heading="heading" :subheading="subheading" :icon="icon"></page-title-component>
  <table-component :footer=true :fields="fields" :items="items" :showAction="false"
    @search="onSearchChange"></table-component>
</template>

<script>
import { ref, onMounted, defineComponent } from "vue";
import PageTitleComponent from "@/Layout/Components/PageTitleComponent.vue";
import TableComponent from "@/Layout/Components/TableComponent.vue";
import defaultData from "@/utils/defaultData.js";

export default defineComponent({
  name: "AdvanceTablePage",

  components: {
    PageTitleComponent,
    TableComponent
  },

  setup() {
    const heading = ref("Advance Tables");
    const subheading = ref("Tables are the backbone of almost all web applications.");
    const icon = ref("pe-7s-drawer icon-gradient bg-happy-itmeo");

    const fields = ref([
      {
        key: "id",
        value: "Id"
      },
      {
        key: "first_name",
        value: "first_name"
      },
      {
        key: "middle_name",
        value: "middle_name"
      },
      {
        key: "last_name",
        value: "last_name"
      },
      {
        key: "age",
        value: "age"
      },
      {
        key: "gender",
        value: "gender"
      },
      {
        key: "job",
        value: "job"
      },
      {
        key: "status",
        value: "status"
      },
    ]);
    const items = ref(defaultData);

    const onSearchChange = (searchTerm) => {
      if (searchTerm && searchTerm.trim() !== "") {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        items.value = defaultData.filter(person => {
          return Object.keys(person).some(key => {
            const value = person[key]?.toString().toLowerCase() || "";
            return value.includes(lowerCaseSearchTerm);
          });
        });
      } else {
        items.value = defaultData;
      }
    };

    onMounted(() => {
      items.value = defaultData;
    });

    return {
      heading,
      subheading,
      icon,
      fields,
      items,
      onSearchChange
    };
  },
});
</script>
