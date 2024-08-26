<template>
  <div v-show="isActive" class="p2">
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