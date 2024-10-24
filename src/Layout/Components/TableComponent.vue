<template>
  <div>
    <div class="form-inline">
      <div v-if="showAction" class="input-group mb-2">
        <input placeholder="Searching..." @input="onSearch" v-model="searchTerm" type="text" class="form-control"
          name="search" />
        <div class="input-group-append">
          <button class="btn btn-primary">
            <i class="pe-7s-search"></i>
          </button>
        </div>
      </div>
    </div>
    <table :class="customClass" class="table table-dark table-sm table-bordered">
      <thead>
        <tr>
          <th v-if="showAction"><input type="checkbox" class="" name="checkbox" /></th>
          <th v-for="field in fields" :key="field.key" :id="field.key" @click="changeOrder(field.key)">
            {{ field.value }}
            <span v-if="orderBy === field.key && orderDirection === 'asc'">&#9660;</span>
            <span v-else-if="orderBy === field.key && orderDirection === 'desc'">&#9650;</span>
            <span v-else>&#9670;</span>
          </th>
          <th v-if="showAction">Action</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(item, index) in items" :key="index">
          <td v-if="showAction"><input type="checkbox" name="checkbox" /></td>
          <td v-for="field in fields" :key="field.key">{{ item[field.key] }}</td>
          <td v-if="showAction">
            <button type="button" class="btn btn-sm btn-success" @click="updateRow(item.id)">
              <i class="pe-7s-file"></i>
            </button>
            <button type="button" class="btn btn-sm btn-warning" @click="deleteRow(item.id)">
              <i class="pe-7s-trash"></i>
            </button>
          </td>
        </tr>
      </tbody>

      <tfoot v-if="footer">
        <tr>
          <th v-if="showAction"><input type="checkbox" name="checkbox" /></th>
          <th v-for="field in fields" :key="field.key" :id="field.key" @click="changeOrder(field.key)">
            {{ field.value }}
            <span v-if="orderBy === field.key && orderDirection === 'asc'">&#9660;</span>
            <span v-else-if="orderBy === field.key && orderDirection === 'desc'">&#9650;</span>
            <span v-else>&#9670;</span>
          </th>
          <th v-if="showAction">Action</th>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
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
    showAction: {
      type: Boolean,
      default: true,
      required: false,
    },
    footer: {
      type: Boolean,
      default: false,
      required: false,
    },
  },

  setup(props, { emit }) {
    const orderBy = ref('');
    const orderDirection = ref('');
    const searchTerm = ref(null);

    const deleteRow = (id) => {
      emit('deleteRow', id);
    };

    const updateRow = (id) => {
      emit('updateRow', id);
    };

    const onSearch = () => {
      emit("search", searchTerm.value);
    };

    const changeOrder = (field) => {
      if (field === orderBy.value) {
        if (orderDirection.value === 'asc') {
          orderDirection.value = 'desc';
        } else if (orderDirection.value === 'desc') {
          orderDirection.value = '';
        } else {
          orderDirection.value = 'asc';
        }
      } else {
        orderBy.value = field;
        orderDirection.value = 'asc';
      }

      emit('changeOrder', {
        orderDirection: orderDirection.value,
        orderBy: orderBy.value,
      });
    };

    return {
      orderBy,
      orderDirection,
      searchTerm,
      deleteRow,
      updateRow,
      onSearch,
      changeOrder,
    };
  },
});
</script>
