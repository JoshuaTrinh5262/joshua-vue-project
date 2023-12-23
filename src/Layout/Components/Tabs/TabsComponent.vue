<template lang="html">
  <div class="tabs__wrapper" :class=' {"tabs__light": mode === "light", "tabs__dark": mode === "dark"}'>
    <ul class="tabs__header">
      <li
        v-for="(tab, index) in tabs"
        :key="tab.title"
        @click="selectTab(index)"
        :class='{"tab__selected": (index == selectedIndex)}'
      >
        {{ tab.title }}
      </li>
    </ul>
    <slot></slot>
  </div>
</template>
<script>
  export default {
    name: 'tabs-component',

    props: {
      mode: {
        type: String,
        default: 'light'
      }
    },
    data () {
      return {
        selectedIndex: 0,
        tabs: [],
      }
    },

    created () {
        this.tabs = this.$children
    },

    mounted () {
        this.selectTab(0)
    },

    methods: {
        selectTab (i) {
          this.selectedIndex = i

          this.tabs.forEach((tab, index) => {
            tab.isActive = (index === i)
          })
        }
    }
  }
</script>

<style lang="css">
  .tabs__wrapper {
    width: 100%;
    min-height: 100vh;
    background-color: #f8f8f8;
    margin: 0;
    padding: 10px;
  }

  ul.tabs__header {
    display: block;
    list-style: none;
    margin: 0 0 0 0;
    padding: 0;
  }

  ul.tabs__header > li {
    padding: 12px 30px;
    margin: 0;
    display: inline-block;
    margin-right: 1px;
    cursor: pointer;
  }

  ul.tabs__header > li.tab__selected {
    font-weight: bold;
    border-bottom: 2px solid transparent;
  }

  .tab {
    display: inline-block;
    color: black;
    padding: 20px;
    min-width: 800px;
    border-radius: 10px;
    min-height: 400px;
  }

  .tabs__light .tab{
    background-color: #fff;
  }

  .tabs__light li {
    background-color: #ddd;
    color: #aaa;
  }

  .tabs__light li.tab__selected {
    background-color: #fff;
    pointer-events: none;
    color: #83FFB3;
  }

  .tabs__dark .tab{
    background-color: #555;
    color: #eee;
  }

  .tabs__dark li {
    background-color: #ddd;
    color: #aaa;
  }

  .tabs__dark li.tab__selected {
    background-color: #555;
    color: white;
  }

</style>