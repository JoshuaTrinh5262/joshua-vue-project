<template>
  <div>
    <table class="table table-sm">
      <thead>
        <tr>
          <th v-for="field in fields" :key="field.key" :id="field.key">{{ field.value }}</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" :key="index">
          <td v-for="field in fields" :key="field.key">
            {{ item[field.key] }}
          </td>
          <td>
            <button type="button" class="btn btn-sm btn-success" @click="updateRow(item.id)"><i class="pe-7s-file"></i></button>
            <button type="button" class="btn btn-sm btn-warning" @click="deleteRow(item.id)"><i class="pe-7s-trash"></i></button>
          </td>
        </tr>
      </tbody>
      <tfoot v-if="footer">
        <tr>
          <th v-for="field in fields" :key="field.key" :id="field.key">{{ field.value }}</th>
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
