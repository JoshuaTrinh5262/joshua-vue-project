<template>
  <div>
    <page-title :heading=heading :subheading=subheading :icon=icon></page-title>
    <div class="card main-card mb-4">
      <div class="card-body">
        <h3 class="card-title">Table Options</h3>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" id="striped" v-model="striped">
          <label class="form-check-label" for="striped">Striped</label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" id="bordered" v-model="bordered">
          <label class="form-check-label" for="bordered">Bordered</label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" id="outlined" v-model="outlined">
          <label class="form-check-label" for="outlined">Outlined</label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" id="small" v-model="small">
          <label class="form-check-label" for="small">Small</label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" id="hover" v-model="hover">
          <label class="form-check-label" for="hover">Hover</label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" id="dark" v-model="dark">
          <label class="form-check-label" for="dark">Dark</label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" id="fixed" v-model="fixed">
          <label class="form-check-label" for="fixed">Fixed</label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" id="footClone" v-model="footClone">
          <label class="form-check-label" for="footClone">Foot Clone</label>
        </div>
      </div>
    </div>
    <div class="card main-card mb-4">
      <div class="card-body">
        <h3 class="card-title">Table Example</h3>
        <table class="table"
          :class="{ 'table-striped': striped, 'table-bordered': bordered, 'table-outlined': outlined, 'table-sm': small, 'table-hover': hover, 'table-dark': dark, 'table-fixed': fixed }">
          <thead>
            <tr>
              <th v-for="(field, index) in fields" :key="index">{{ getFieldLabel(field) }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, rowIndex) in items" :key="rowIndex">
              <td v-for="(field, colIndex) in fields" :key="colIndex">{{ item[field] }}</td>
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

import PageTitle from "../../Layout/Components/PageTitle.vue";

export default {
  components: {
    PageTitle,
  },
  data: () => ({
    heading: 'Regular Tables',
    subheading: 'Tables are the backbone of almost all web applications.',
    icon: 'pe-7s-drawer icon-gradient bg-happy-itmeo',

    fields: ['id', 'first_name', 'middle_name', 'last_name', 'age', 'gender', 'job'],
    items: [
      { id: 1, age: 40, first_name: 'Dickerson', middle_name: 'Dickerson', last_name: 'Macdonald', gender: "Male", job: "Worker" },
      { id: 2, age: 21, first_name: 'Larsen', middle_name: 'Dickerson', last_name: 'Shaw', gender: "Male", job: "Worker" },
      { id: 3, age: 89, first_name: 'Geneva', middle_name: 'Dickerson', last_name: 'Wilson', gender: "Male", job: "Worker" },
      { id: 4, age: 40, first_name: 'Dickerson', middle_name: 'Dickerson', last_name: 'Macdonald', gender: "Male", job: "Worker" },
      { id: 5, age: 21, first_name: 'Larsen', middle_name: 'Dickerson', last_name: 'Shaw', gender: "Male", job: "Worker" },
      { id: 6, age: 89, first_name: 'Geneva', middle_name: 'Dickerson', last_name: 'Wilson', gender: "Male", job: "Worker" },
      { id: 7, age: 20, first_name: 'Anna', middle_name: 'Dickerson', last_name: 'Ashley', gender: "Female", job: "Worker" },
      { id: 8, age: 20, first_name: 'Annie', middle_name: 'Dickerson', last_name: 'Ashley', gender: "Female", job: "Worker" },
      { id: 9, age: 40, first_name: 'Dickerson', middle_name: 'Dickerson', last_name: 'Macdonald', gender: "Male", job: "Worker" },
      { id: 10, age: 21, first_name: 'Larsen', middle_name: 'Dickerson', last_name: 'Shaw', gender: "Male", job: "Worker" },
      { id: 11, age: 89, first_name: 'Geneva', middle_name: 'Dickerson', last_name: 'Wilson', gender: "Male", job: "Worker" },
      { id: 12, age: 40, first_name: 'Dickerson', middle_name: 'Dickerson', last_name: 'Macdonald', gender: "Male", job: "Worker" },
      { id: 13, age: 21, first_name: 'Larsen', middle_name: 'Dickerson', last_name: 'Shaw', gender: "Male", job: "Worker" },
      { id: 14, age: 89, first_name: 'Geneva', middle_name: 'Dickerson', last_name: 'Wilson', gender: "Male", job: "Worker" },
      { id: 15, age: 20, first_name: 'Anna', middle_name: 'Dickerson', last_name: 'Ashley', gender: "Female", job: "Worker" },
      { id: 16, age: 20, first_name: 'Annie', middle_name: 'Dickerson', last_name: 'Ashley', gender: "Female", job: "Worker" },
      { id: 17, age: 40, first_name: 'Dickerson', middle_name: 'Dickerson', last_name: 'Macdonald', gender: "Male", job: "Worker" },
      { id: 18, age: 21, first_name: 'Larsen', middle_name: 'Dickerson', last_name: 'Shaw', gender: "Male", job: "Worker" },
      { id: 19, age: 89, first_name: 'Geneva', middle_name: 'Dickerson', last_name: 'Wilson', gender: "Male", job: "Worker" },
      { id: 20, age: 40, first_name: 'Dickerson', middle_name: 'Dickerson', last_name: 'Macdonald', gender: "Male", job: "Worker" },
      { id: 21, age: 21, first_name: 'Larsen', middle_name: 'Dickerson', last_name: 'Shaw', gender: "Male", job: "Worker" },
      { id: 22, age: 89, first_name: 'Geneva', middle_name: 'Dickerson', last_name: 'Wilson', gender: "Male", job: "Worker" },
      { id: 23, age: 20, first_name: 'Anna', middle_name: 'Dickerson', last_name: 'Ashley', gender: "Female", job: "Worker" },
      { id: 24, age: 20, first_name: 'Annie', middle_name: 'Dickerson', last_name: 'Ashley', gender: "Female", job: "Worker" },
      { id: 25, age: 40, first_name: 'Dickerson', middle_name: 'Dickerson', last_name: 'Macdonald', gender: "Male", job: "Worker" },
      { id: 26, age: 21, first_name: 'Larsen', middle_name: 'Dickerson', last_name: 'Shaw', gender: "Male", job: "Worker" },
      { id: 27, age: 89, first_name: 'Geneva', middle_name: 'Dickerson', last_name: 'Wilson', gender: "Male", job: "Worker" },
      { id: 28, age: 40, first_name: 'Dickerson', middle_name: 'Dickerson', last_name: 'Macdonald', gender: "Male", job: "Worker" },
      { id: 29, age: 21, first_name: 'Larsen', middle_name: 'Dickerson', last_name: 'Shaw', gender: "Male", job: "Worker" },
      { id: 30, age: 89, first_name: 'Geneva', middle_name: 'Dickerson', last_name: 'Wilson', gender: "Male", job: "Worker" },
      { id: 31, age: 20, first_name: 'Anna', middle_name: 'Dickerson', last_name: 'Ashley', gender: "Female", job: "Worker" },
      { id: 32, age: 20, first_name: 'Annie', middle_name: 'Dickerson', last_name: 'Ashley', gender: "Female", job: "Worker" },
      { id: 32, age: 40, first_name: 'Dickerson', middle_name: 'Dickerson', last_name: 'Macdonald', gender: "Male", job: "Worker" },
      { id: 33, age: 21, first_name: 'Larsen', middle_name: 'Dickerson', last_name: 'Shaw', gender: "Male", job: "Worker" },
      { id: 34, age: 89, first_name: 'Geneva', middle_name: 'Dickerson', last_name: 'Wilson', gender: "Male", job: "Worker" },
      { id: 35, age: 21, first_name: 'Larsen', middle_name: 'Dickerson', last_name: 'Shaw', gender: "Male", job: "Worker" },
      { id: 36, age: 89, first_name: 'Geneva', middle_name: 'Dickerson', last_name: 'Wilson', gender: "Male", job: "Worker" },
      { id: 37, age: 20, first_name: 'Anna', middle_name: 'Dickerson', last_name: 'Ashley', gender: "Female", job: "Worker" },
      { id: 38, age: 20, first_name: 'Annie', middle_name: 'Dickerson', last_name: 'Ashley', gender: "Female", job: "Worker" },
      { id: 39, age: 40, first_name: 'Dickerson', middle_name: 'Dickerson', last_name: 'Macdonald', gender: "Male", job: "Worker" },
      { id: 40, age: 21, first_name: 'Larsen', middle_name: 'Dickerson', last_name: 'Shaw', gender: "Male", job: "Worker" },
      { id: 41, age: 89, first_name: 'Geneva', middle_name: 'Dickerson', last_name: 'Wilson', gender: "Male", job: "Worker" },
      { id: 42, age: 40, first_name: 'Dickerson', middle_name: 'Dickerson', last_name: 'Macdonald', gender: "Male", job: "Worker" },
      { id: 43, age: 21, first_name: 'Larsen', middle_name: 'Dickerson', last_name: 'Shaw', gender: "Male", job: "Worker" },
      { id: 44, age: 89, first_name: 'Geneva', middle_name: 'Dickerson', last_name: 'Wilson', gender: "Male", job: "Manager" },
      { id: 45, age: 20, first_name: 'Anna', middle_name: 'Dickerson', last_name: 'Ashley', gender: "Female", job: "Manager" },
      { id: 46, age: 20, first_name: 'Annie', middle_name: 'Dickerson', last_name: 'Ashley', gender: "Female", job: "Manager" },
      { id: 47, age: 40, first_name: 'Dickerson', middle_name: 'Dickerson', last_name: 'Macdonald', gender: "Male", job: "Manager" },
      { id: 48, age: 21, first_name: 'Larsen', middle_name: 'Dickerson', last_name: 'Shaw', gender: "Male", job: "Manager" },
      { id: 49, age: 89, first_name: 'Geneva', middle_name: 'Dickerson', last_name: 'Wilson', gender: "Male", job: "Manager" },
      { id: 50, age: 40, first_name: 'Dickerson', middle_name: 'Dickerson', last_name: 'Macdonald', gender: "Male", job: "Manager" },
      { id: 51, age: 21, first_name: 'Larsen', middle_name: 'Dickerson', last_name: 'Shaw', gender: "Male", job: "Manager" },
      { id: 52, age: 89, first_name: 'Geneva', middle_name: 'Dickerson', last_name: 'Wilson', gender: "Male", job: "Manager" },
      { id: 53, age: 20, first_name: 'Anna', middle_name: 'Dickerson', last_name: 'Ashley', gender: "Female", job: "Manager" },
      { id: 54, age: 20, first_name: 'Annie', middle_name: 'Dickerson', last_name: 'Ashley', gender: "Female", job: "Manager" },
      { id: 55, age: 40, first_name: 'Dickerson', middle_name: 'Dickerson', last_name: 'Macdonald', gender: "Male", job: "Manager" },
      { id: 56, age: 21, first_name: 'Larsen', middle_name: 'Dickerson', last_name: 'Shaw', gender: "Male", job: "Manager" },
      { id: 57, age: 89, first_name: 'Geneva', middle_name: 'Dickerson', last_name: 'Wilson', gender: "Male", job: "Manager" },
      { id: 58, age: 40, first_name: 'Dickerson', middle_name: 'Dickerson', last_name: 'Macdonald', gender: "Male", job: "Manager" },
      { id: 59, age: 21, first_name: 'Larsen', middle_name: 'Dickerson', last_name: 'Shaw', gender: "Male", job: "Manager" },
      { id: 60, age: 89, first_name: 'Geneva', middle_name: 'Dickerson', last_name: 'Wilson', gender: "Male", job: "Manager" },
      { id: 61, age: 20, first_name: 'Anna', middle_name: 'Dickerson', last_name: 'Ashley', gender: "Female", job: "Manager" },
      { id: 62, age: 20, first_name: 'Annie', middle_name: 'Dickerson', last_name: 'Ashley', gender: "Female", job: "Manager" },
      { id: 63, age: 40, first_name: 'Dickerson', middle_name: 'Dickerson', last_name: 'Macdonald', gender: "Male", job: "Manager" },
      { id: 64, age: 40, first_name: 'Dickerson', middle_name: 'Dickerson', last_name: 'Macdonald', gender: "Male", job: "Manager" },
      { id: 65, age: 21, first_name: 'Larsen', middle_name: 'Dickerson', last_name: 'Shaw', gender: "Male", job: "Manager" },
      { id: 66, age: 89, first_name: 'Geneva', middle_name: 'Dickerson', last_name: 'Wilson', gender: "Male", job: "Manager" },
      { id: 67, age: 20, first_name: 'Anna', middle_name: 'Dickerson', last_name: 'Ashley', gender: "Female", job: "Manager" },
      { id: 68, age: 20, first_name: 'Annie', middle_name: 'Dickerson', last_name: 'Ashley', gender: "Female", job: "Manager" },
      { id: 69, age: 40, first_name: 'Dickerson', middle_name: 'Dickerson', last_name: 'Macdonald', gender: "Male", job: "Manager" },
    ],
    striped: false,
    bordered: false,
    outlined: false,
    small: false,
    hover: false,
    dark: true,
    fixed: false,
    footClone: true
  }),

  methods: {
    getFieldLabel(field) {
      return field.replace(/_/g, ' ').replace(/\b\w/g, (match) => match.toUpperCase());
    },
  }
}
</script>
