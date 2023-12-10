<template>
  <div>
    <page-title :heading=heading :subheading=subheading :icon=icon></page-title>
    <div class="card main-card mb-4">
      <div class="card-body">
        <h3 class="card-title">Bootstrap Table Options</h3>
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
        <h3 class="card-title">Example</h3>
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

      fields: ['id', 'first_name','middle_name', 'last_name', 'age' , 'gender'],
      items: [
        { id: 1, age: 40, first_name: 'Dickerson', middle_name: 'Dickerson',last_name: 'Macdonald', gender: "Male" },
        { id: 2, age: 21, first_name: 'Larsen', middle_name: 'Dickerson', last_name: 'Shaw', gender: "Male" },
        { id: 3, age: 89, first_name: 'Geneva', middle_name: 'Dickerson', last_name: 'Wilson', gender: "Male" },
        { id: 4, age: 40, first_name: 'Dickerson', middle_name: 'Dickerson', last_name: 'Macdonald', gender: "Male" },
        { id: 5, age: 21, first_name: 'Larsen', middle_name: 'Dickerson', last_name: 'Shaw', gender: "Male" },
        { id: 6, age: 89, first_name: 'Geneva', middle_name: 'Dickerson', last_name: 'Wilson', gender: "Male" },
        { id: 7, age: 20, first_name: 'Anna', middle_name: 'Dickerson', last_name: 'Ashley', gender: "Female" },
        { id: 8, age: 20, first_name: 'Annie', middle_name: 'Dickerson', last_name: 'Ashley', gender: "Female" },
        { id: 9, age: 40, first_name: 'Dickerson', middle_name: 'Dickerson', last_name: 'Macdonald', gender: "Male" },
        { id: 10, age: 21, first_name: 'Larsen', middle_name: 'Dickerson', last_name: 'Shaw', gender: "Male" },
        { id: 11, age: 89, first_name: 'Geneva', middle_name: 'Dickerson', last_name: 'Wilson', gender: "Male" },
        { id: 12, age: 40, first_name: 'Dickerson', middle_name: 'Dickerson', last_name: 'Macdonald', gender: "Male" },
        { id: 13, age: 21, first_name: 'Larsen', middle_name: 'Dickerson', last_name: 'Shaw', gender: "Male" },
        { id: 14, age: 89, first_name: 'Geneva', middle_name: 'Dickerson', last_name: 'Wilson', gender: "Male" },
        { id: 15, age: 20, first_name: 'Anna', middle_name: 'Dickerson', last_name: 'Ashley', gender: "Female" },
        { id: 16, age: 20, first_name: 'Annie', middle_name: 'Dickerson', last_name: 'Ashley', gender: "Female" },
        { id: 17, age: 40, first_name: 'Dickerson', middle_name: 'Dickerson', last_name: 'Macdonald', gender: "Male" },
        { id: 18, age: 21, first_name: 'Larsen', middle_name: 'Dickerson', last_name: 'Shaw', gender: "Male" },
        { id: 19, age: 89, first_name: 'Geneva', middle_name: 'Dickerson', last_name: 'Wilson', gender: "Male" },
        { id: 20, age: 40, first_name: 'Dickerson', middle_name: 'Dickerson', last_name: 'Macdonald', gender: "Male" },
        { id: 21, age: 21, first_name: 'Larsen', middle_name: 'Dickerson', last_name: 'Shaw', gender: "Male" },
        { id: 22, age: 89, first_name: 'Geneva', middle_name: 'Dickerson', last_name: 'Wilson', gender: "Male" },
        { id: 23, age: 20, first_name: 'Anna', middle_name: 'Dickerson', last_name: 'Ashley', gender: "Female" },
        { id: 24, age: 20, first_name: 'Annie', middle_name: 'Dickerson', last_name: 'Ashley', gender: "Female" },
        { id: 25, age: 40, first_name: 'Dickerson', middle_name: 'Dickerson', last_name: 'Macdonald', gender: "Male" },
        { id: 26, age: 21, first_name: 'Larsen', middle_name: 'Dickerson', last_name: 'Shaw', gender: "Male" },
        { id: 27, age: 89, first_name: 'Geneva', middle_name: 'Dickerson', last_name: 'Wilson', gender: "Male" },
        { id: 28, age: 40, first_name: 'Dickerson', middle_name: 'Dickerson', last_name: 'Macdonald', gender: "Male" },
        { id: 29, age: 21, first_name: 'Larsen', middle_name: 'Dickerson', last_name: 'Shaw', gender: "Male" },
        { id: 30, age: 89, first_name: 'Geneva', middle_name: 'Dickerson', last_name: 'Wilson', gender: "Male" },
        { id: 31, age: 20, first_name: 'Anna', middle_name: 'Dickerson', last_name: 'Ashley', gender: "Female" },
        { id: 32, age: 20, first_name: 'Annie', middle_name: 'Dickerson', last_name: 'Ashley', gender: "Female" }
      ],
      striped: false,
      bordered: false,
      outlined: false,
      small: false,
      hover: false,
      dark: false,
      fixed: false,
      footClone: false
    }),

    methods: {
      getFieldLabel(field) {
        return field.replace(/_/g, ' ').replace(/\b\w/g, (match) => match.toUpperCase());
      },
    }
  }
</script>
