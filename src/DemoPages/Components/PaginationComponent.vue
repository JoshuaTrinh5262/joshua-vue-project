<template>
  <div>
      <b-pagination 
        :align="align" 
        :total-rows="100"
        v-model="currentPage"
        :per-page="perPage">
      </b-pagination>
      <div class="divider"></div>
      <div class="text-center">
        Current Page: {{currentPage}}
      </div>
  </div>
</template>

<script>
  export default {
    data: () => ({
      size:"sm", // sm, md , lg
      align: "left", // left, right, center
      currentPage: 3,
      perPage: 10
    }),

    methods: {
      linkGen (pageNumber) {
        return '#page/' + pageNumber + '/foobar'
      }
    }
  }
</script>
