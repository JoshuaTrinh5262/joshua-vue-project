<template>
  <div>
    <table class="table b-table">
      <thead>
        <tr>
          <th v-for="(field, key) in fields" :key="key">{{ field }}</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, key) in items" :key="key">
          <td>{{ item.source_text }}</td>
          <td>{{ item.target_text }}</td>
          <td>
          </td>
        </tr>
      </tbody>
      <tfoot v-if="footer">
        <tr>
          <th v-for="(field, key) in fields" :key="key">{{ field }}</th>
          <th>Action</th>
        </tr>
      </tfoot>
    </table>

    <b-table :striped="striped"
            :bordered="bordered"
            :outlined="outlined"
            :small="small"
            :hover="hover"
            :dark="dark"
            :fixed="fixed"
            :foot-clone="footer"
            :items="items"
            :fields="fields">
    </b-table>
    <pagination-component></pagination-component>
  </div>
</template>

<script>
  import PaginationComponent from '../Components/PaginationComponent.vue';

  export default {
    components: { PaginationComponent },
    props: {
      fields: {
        type: Array,
        required: true,
      },
      items: {
        type: Array,
        required: true,
      },
      footer: {
        type: Boolean,
        required: false,
      },
    },

    data: () => ({
      striped: false,
      bordered: false,
      outlined: false,
      small: false,
      hover: false,
      dark: false,
      fixed: false,
    }),

    created() {

    },

    methods: {

    }
  }
</script>
