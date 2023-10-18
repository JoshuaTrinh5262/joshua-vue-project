<template>
  <div>
    <b-table :striped="striped"
            :bordered="bordered"
            :outlined="outlined"
            :small="small"
            :hover="hover"
            :dark="dark"
            :fixed="fixed"
            :foot-clone="footClone"
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
    data: () => ({
      fields: [ 'id', 'name', 'age' ],
      items: [],
      striped: false,
      bordered: false,
      outlined: false,
      small: false,
      hover: false,
      dark: false,
      fixed: false,
      footClone: false
    }),

    created() {
      this.fetchData();
    },

    methods: {
      fetchData() {
        fetch('./demo/data/translation.json')
        .then(response => {
          return response.json();
        })
        .then(data => {
          this.items = data.data;
          console.log(data);
        })
        .catch(error => {
          console.error(error);
        });
      }
    }

  }
</script>
