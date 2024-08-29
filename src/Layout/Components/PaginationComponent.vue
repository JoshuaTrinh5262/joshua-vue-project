<template>
  <div class="table-pagination form-inline">
    <div class="form-group pagination-group">
      <ul class="pagination">
        <li class="page-item">
          <button class="page-link" @click="loadPage(1)" :disabled="currentPage === 1">First</button>
        </li>
        <li class="page-item">
          <button class="page-link" @click="loadPage(currentPage - 1)" :disabled="currentPage === 1">Previous</button>
        </li>
        <li v-for="page in visiblePages" :key="page" :class="{ 'page-item': true, 'active': currentPage === page }">
          <button class="page-link" @click="loadPage(page)">{{ page }}</button>
        </li>
        <li class="page-item">
          <button class="page-link" @click="loadPage(currentPage + 1)"
            :disabled="currentPage === totalPages">Next</button>
        </li>
        <li class="page-item">
          <button class="page-link" @click="loadPage(totalPages)" :disabled="currentPage === totalPages">Last</button>
        </li>
      </ul>
    </div>
    <div class="form-group page-info-group">
      <p>Page {{ currentPage }} of {{ totalPages }} Total Items: {{ totalItems }}</p>
    </div>
    <div class="form-group page-size-group">
      <select v-model="selectedPageSize" @change="changePageSize" class="form-control">
        <option v-for="size in pageSizes" :key="size" :value="size">{{ size }}</option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PaginationComponent',
  props: {
    currentPage: {
      type: Number,
      default: 1,
      required: false,
    },

    perPage: {
      type: Number,
      default: 10,
      required: false,
    },

    totalItems: {
      type: Number,
      default: 0,
      required: false,
    },

    totalPages: {
      type: Number,
      default: 1,
      required: false,
    },
    maxVisiblePages: {
      type: Number,
      default: 5,
    },
  },


  data: () => ({
    selectedPageSize: 20,
    pageSizes: [5, 10, 20, 40, 60, 80, 100],
  }),

  computed: {
    visiblePages() {
      const startPage = Math.max(1, this.currentPage - Math.floor(this.maxVisiblePages / 2));
      const endPage = Math.min(this.totalPages, startPage + this.maxVisiblePages - 1);
      return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    },
  },

  methods: {
    loadPage(page) {
      this.$emit('load-page', page);
    },

    changePageSize() {
      this.$emit('change-page-size', this.selectedPageSize);
    },

    prevPage() {
      if (this.currentPage > 1) {
        this.$emit('update-page', this.currentPage - 1);
      }
    },

    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.$emit('update-page', this.currentPage + 1);
      }
    },
  }
}
</script>

<style scoped>
.table-pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pagination-group {
  text-align: center;
}

.page-info-group {
  margin-left: auto;
}

.page-size-group {
  margin-left: 10px;
}
</style>