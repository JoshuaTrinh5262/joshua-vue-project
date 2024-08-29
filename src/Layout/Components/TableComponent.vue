<template>
  <div>
    <div class="input-group mb-2">
      <input placeholder="Searching..." @input="onSearch" v-model="searchTerm" type="text" class="form-control">
      <div class="input-group-append">
        <button class="btn btn-primary"><i class="pe-7s-search"></i></button>
      </div>
    </div>
    <table :class="customClass" class="table table-dark table-sm table-bordered">

      <thead>
        <tr>
          <th><input type="checkbox" class=""></th>
          <th v-for="field in fields" :key="field.key" :id="field.key" @click="changeOrder(field.key)">
            {{ field.value }}
            <span v-if="orderBy === field.key && orderDirection === 'asc'">&#9660;</span>
            <span v-else-if="orderBy === field.key && orderDirection === 'desc'">&#9650;</span>
            <span v-else>&#9670;</span>
          </th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" :key="index">
          <td><input type="checkbox"></td>
          <td v-for="field in fields" :key="field.key">
            {{ item[field.key] }}
          </td>
          <td>
            <button type="button" class="btn btn-sm btn-success" @click="updateRow(item.id)"><i
                class="pe-7s-file"></i></button>
            <button type="button" class="btn btn-sm btn-warning" @click="deleteRow(item.id)"><i
                class="pe-7s-trash"></i></button>
          </td>
        </tr>
      </tbody>
      <tfoot v-if="footer">
        <tr>
          <th><input type="checkbox"></th>
          <th v-for="field in fields" :key="field.key" :id="field.key" @click="changeOrder(field.key)">

            {{ field.value }}
            <span v-if="orderBy === field.key && orderDirection === 'asc'">&#9660;</span>
            <span v-else-if="orderBy === field.key && orderDirection === 'desc'">&#9650;</span>
            <span v-else>&#9670;</span>
          </th>
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
    customClass: {
      type: String,
      default: '',
      required: false,
    },
    footer: {
      type: Boolean,
      default: false,
      required: false,
    },

  },

  data() {
    return {
      orderDirection: '',
      orderBy: '',
      searchTerm: null,
    }
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

    onSearch() {
      this.$emit("search", this.searchTerm);
    },

    changeOrder(field) {
      if (field === this.orderBy) {
        if (this.orderDirection === 'asc') {
          this.orderDirection = 'desc';
        } else if (this.orderDirection === 'desc') {
          this.orderDirection = '';
        } else {
          this.orderDirection = 'asc';
        }
      } else {
        this.orderBy = field;
        this.orderDirection = 'asc';
      }

      this.$emit('changeOrder', {
        orderDirection: this.orderDirection,
        orderBy: this.orderBy,
      });
    },
  },
}
</script>
