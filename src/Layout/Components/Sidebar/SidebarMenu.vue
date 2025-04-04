<template>
  <div class="v-sidebar-menu" :class="[!isCollapsed ? 'vsm-default' : 'vsm-collapsed', theme, rtl ? 'rtl' : '']"
    :style="{ 'width': sidebarWidth }" @mouseleave="mouseLeave">
    <slot name="header"></slot>
    <div class="vsm-list">
      <template v-for="(item, index) in menu">
        <template v-if="item.header">
          <template v-if="(item.visibleOnCollapse || !isCollapsed) && item.component">
            <component :is="item.component" :key="index" />
          </template>
          <template v-else-if="item.visibleOnCollapse || !isCollapsed">
            <div :key="index" class="vsm-header" :class="item.class">
              {{ item.title }}
            </div>
          </template>
        </template>
        <SidebarItem v-else :key="index" :item="item" :first-item="true" :is-collapsed="isCollapsed"
          :active-show="activeShow" :show-one-child="showOneChild" :show-child="showChild" :rtl="rtl"
          @mouseEnterItem="handleMouseEnterItem" @touchClickItem="handleTouchClickItem">
          <slot slot="dropdown-icon" name="dropdown-icon"></slot>
        </SidebarItem>
      </template>
    </div>
    <div v-if="isCollapsed"
      :style="[{ 'position': 'absolute' }, { 'top': `${mobileItemPos}px` }, rtl ? { 'right': '0px' } : { 'left': '0px' }, { 'z-index': 30 }, { 'width': width }]">
      <SidebarItem v-if="mobileItem" :item="mobileItem" :mobile-item="true" :is-collapsed="isCollapsed"
        :show-child="showChild" :rtl="rtl" @mouseEnterItem="handleMouseEnterItem"
        @touchClickItem="handleTouchClickItem">
        <slot slot="dropdown-icon" name="dropdown-icon"></slot>
      </SidebarItem>
      <transition name="slide-animation">
        <div v-if="mobileItem" class="vsm-mobile-bg"
          :style="[{ 'position': 'absolute' }, { 'left': '0px' }, { 'right': '0px' }, { 'top': '0px' }, { 'height': `${mobileItemHeight}px` }]">
        </div>
      </transition>
      <div class="vsm-dropdown"
        :style="[{ 'position': 'absolute' }, { 'top': `${mobileItemHeight}px` }, { 'left': rtl ? '0px' : sidebarWidth }, { 'right': rtl ? sidebarWidth : '0px' }, { 'max-height': `calc(${sidebarHeight}px - ${mobileItemPos + mobileItemHeight}px)` }, { 'overflow-y': 'auto' }]">
        <transition name="expand" @enter="expandEnter" @afterEnter="expandAfterEnter" @beforeLeave="expandBeforeLeave">
          <SidebarListItem v-if="mobileItem && mobileItem.child" :items="mobileItem.child" :show-child="showChild"
            :rtl="rtl">
            <slot slot="dropdown-icon" name="dropdown-icon"></slot>
          </SidebarListItem>
        </transition>
      </div>
    </div>
    <slot name="footer"></slot>
    <button class="collapse-btn" :class="{ 'slot-icon': $slots['collapse-icon'] }" @click="toggleCollapse">
      <slot name="collapse-icon"></slot>
    </button>
  </div>
</template>

<script>
import SidebarItem from './SidebarItem.vue'
import SidebarListItem from './SidebarListItem.vue'
import { animationMixin } from './mixin'
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'sidebar-menu',
  components: {
    SidebarItem,
    SidebarListItem
  },
  mixins: [animationMixin],
  props: {
    menu: {
      type: Array,
      required: true
    },
    collapsed: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: '350px'
    },
    widthCollapsed: {
      type: String,
      default: '50px'
    },
    showChild: {
      type: Boolean,
      default: false
    },
    theme: {
      type: String,
      default: ''
    },
    showOneChild: {
      type: Boolean,
      default: false
    },
    rtl: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isCollapsed: this.collapsed,
      mobileItem: null,
      mobileItemPos: 0,
      mobileItemHeight: 0,
      closeTimeout: null,
      activeShow: null,
      sidebarHeight: 0
    }
  },
  computed: {
    sidebarWidth() {
      return this.isCollapsed ? this.widthCollapsed : this.width;
    }
  },
  watch: {
    collapsed(val) {
      this.isCollapsed = val
      this.$nextTick(() => {
        this.initSidebarHeight()
      })
    },
  },
  created() {
    // this.$on('mouseEnterItem', (val) => {
    //   this.mobileItem = null
    //   this.$nextTick(() => {
    //     this.mobileItem = val.item
    //     this.mobileItemPos = val.pos
    //     this.mobileItemHeight = val.height
    //   })
    // })

    // this.$on('touchClickItem', (clearCloseTimeout) => {
    //   if (clearCloseTimeout) {
    //     clearTimeout(this.closeTimeout)
    //     return
    //   }
    //   if (this.closeTimeout) clearTimeout(this.closeTimeout)
    //   this.closeTimeout = setTimeout(() => {
    //     this.mouseLeave()
    //   }, 600)
    // })
    this.handleMouseEnterItem = this.handleMouseEnterItem.bind(this);
    this.handleTouchClickItem = this.handleTouchClickItem.bind(this);
  },
  mounted() {
    this.initSidebarHeight()
  },
  methods: {
    handleMouseEnterItem(val) {
      this.mobileItem = null;
      this.$nextTick(() => {
        this.mobileItem = val.item;
        this.mobileItemPos = val.pos;
        this.mobileItemHeight = val.height;
      });
    },
    handleTouchClickItem(clearCloseTimeout) {

      if (clearCloseTimeout) {
        clearTimeout(this.closeTimeout);
        return;
      }
      if (this.closeTimeout) clearTimeout(this.closeTimeout);
      this.closeTimeout = setTimeout(() => {
        this.mouseLeave();
      }, 600);
    },
    mouseLeave() {
      this.mobileItem = null
    },
    toggleCollapse() {
      this.isCollapsed = !this.isCollapsed;
      this.$nextTick(() => {
        this.initSidebarHeight()
      })
      this.$emit('collapse', this.isCollapsed);
    },
    onActiveShow(uid) {
      this.activeShow = uid
    },
    onItemClick(event, item) {
      this.$emit('itemClick', event, item);
      this.$emit('item-click', event, item);
    },
    initSidebarHeight() {
      this.sidebarHeight = this.$el.offsetHeight;
    }
  },
  provide() {
    return {
      emitActiveShow: this.onActiveShow,
      emitItemClick: this.onItemClick
    }
  }
})
</script>
