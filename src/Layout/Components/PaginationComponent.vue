<template>
  <div class="table-pagination">
    <div class="form-group pagination-group">
      <ul class="pagination">
        <li class="page-item" :class="currentPage === 1 ? 'disabled' : ''">
          <button class="page-link" @click="loadPage(1)" :disabled="currentPage === 1">First</button>
        </li>
        <li class="page-item" :class="currentPage === 1 ? 'disabled' : ''">
          <button class="page-link" @click="loadPage(currentPage - 1)" :disabled="currentPage === 1">Previous</button>
        </li>
        <li v-for="page in visiblePages" :key="page" :class="{ 'page-item': true, 'active': currentPage === page }">
          <button class="page-link" @click="loadPage(page)">{{ page }}</button>
        </li>
        <li class="page-item" :class="currentPage === totalPages ? 'disabled' : ''">
          <button class="page-link" @click="loadPage(currentPage + 1)"
            :disabled="currentPage === totalPages">Next</button>
        </li>
        <li class="page-item" :class="currentPage === totalPages ? 'disabled' : ''">
          <button class="page-link" @click="loadPage(totalPages)" :disabled="currentPage === totalPages">Last</button>
        </li>
      </ul>
    </div>
    <div class="form-group page-info-group">
      Page {{ currentPage }} of {{ totalPages }} | Total Items: {{ totalItems }}
    </div>
    <div class="form-group page-size-group">
      <select v-model="selectedPageSize" @change="changePageSize" class="form-control" name="selectedPageSize">
        <option v-for="size in pageSizes" :key="size" :value="size">{{ size }}</option>
      </select>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed, onMounted } from "vue";

export default defineComponent({
  name: "PaginationComponent",
  props: {
    currentPage: {
      type: Number,
      default: 1,
    },
    perPage: {
      type: Number,
      default: 10,
    },
    totalItems: {
      type: Number,
      default: 0,
    },
    totalPages: {
      type: Number,
      default: 1,
    },
    maxVisiblePages: {
      type: Number,
      default: 5,
    },
  },

  setup(props, { emit }) {
    const selectedPageSize = ref(props.perPage);
    const pageSizes = [5, 10, 20, 40, 60, 80, 100];

    const visiblePages = computed(() => {
      const startPage = Math.max(1, props.currentPage - Math.floor(props.maxVisiblePages / 2));
      const endPage = Math.min(props.totalPages, startPage + props.maxVisiblePages - 1);
      return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    });

    const loadPage = (page) => {
      emit("load-page", page);
    };

    const changePageSize = () => {
      emit("change-page-size", selectedPageSize.value);
    };

    onMounted(() => {
      selectedPageSize.value = props.perPage;
    });

    return {
      selectedPageSize,
      pageSizes,
      visiblePages,
      loadPage,
      changePageSize,
    };
  },
});
</script>

<style scoped>
.table-pagination {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
}

.pagination-group {
  text-align: center;
}

.pagination-group .pagination {
  margin: 0px;
}

.dark .page-info-group {
  color: #fff;
  border: 1px solid #fff;
  background-color: #212529;
}

.page-info-group {
  color: #5a5a5a;
  border: 1px solid #5a5a5a;
  border-radius: 5px;
  padding: 6px;
  margin-left: auto;
}

.page-size-group {
  margin-left: 10px;
}
</style>