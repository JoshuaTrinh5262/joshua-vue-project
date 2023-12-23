<template lang="html">
  <div v-show="isActive">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'tab-component',

    props: {
      title: {
        type: String,
        default: 'Tab'
      }
    },

    data () {
      return {
        isActive: true
      }
    }
  }
</script>