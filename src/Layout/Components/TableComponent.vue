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
          <td>{{ item.id }}</td>
          <td>{{ item.source_text }}</td>
          <td>{{ item.target_text }}</td>
          <td>{{ item.created_date }}</td>
          <td>
            <button type="button" class="btn btn-sm btn-primary" @click="updateRow(item.id)"><i class="pe-7s-file"></i></button>
            <button type="button" class="btn btn-sm btn-warning" @click="deleteRow(item.id)"><i class="pe-7s-trash"></i></button>
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
  </div>
</template>

<script>
  export default {
    name: "TableComponent",

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
        default: false,
        required: false,
      },

    },

    created() {

    },

    methods: {
      deleteRow(id) {
        this.$emit('deleteRow', id);
      },

      updateRow(id) {
         this.$emit('updateRow', id);
      },
    }
  }
</script>
