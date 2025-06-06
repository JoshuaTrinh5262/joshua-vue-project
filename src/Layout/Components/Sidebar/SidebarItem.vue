<template>
  <div
    class="vsm-item"
    :class="{
      'first-item': firstItem,
      'mobile-item': mobileItem,
      'open-item': show,
      'active-item': active,
      'parent-active-item': childActive
    }"
    @mouseenter="mouseEnter"
  >
    <template v-if="isRouterLink">
      <router-link
        class="vsm-link"
        v-bind="item.attributes"
        :class="item.class"
        :to="item.href"
        :disabled="item.disabled"
        :tabindex="item.disabled ? -1 : null"
        @click="clickEvent"
      >
        <template v-if="item.icon">
          <i
            v-if="typeof item.icon === 'string' || item.icon instanceof String"
            class="vsm-icon"
            :class="item.icon"
          ></i>
          <component
            :is="item.icon.element || 'i'"
            v-else
            class="vsm-icon"
            :class="item.icon.class"
            v-bind="item.icon.attributes"
          >
            {{ item.icon.text }}
          </component>
        </template>
        <template v-if="!isCollapsed || mobileItem">
          <component
            :is="item.badge.element || 'span'"
            v-if="item.badge"
            :style="rtl ? (item.child ? { 'margin-left': '30px' } : {}) : (item.child ? { 'margin-right': '30px' } : {})"
            class="vsm-badge"
            :class="item.badge.class"
            v-bind="item.badge.attributes"
          >
            {{ item.badge.text }}
          </component>
          <span class="vsm-title">{{ item.title }}</span>
          <div
            v-if="item.child"
            class="vsm-arrow"
            :class="{ 'open-arrow': show, 'slot-icon': $slots['dropdown-icon'] }"
          >
            <slot name="dropdown-icon"></slot>
          </div>
        </template>
      </router-link>
    </template>
    <template v-else>
      <a
        class="vsm-link"
        v-bind="item.attributes"
        :class="item.class"
        :href="item.href || '#'"
        :disabled="item.disabled"
        :tabindex="item.disabled ? -1 : null"
        @click="clickEvent"
      >
        <template v-if="item.icon">
          <i
            v-if="typeof item.icon === 'string' || item.icon instanceof String"
            class="vsm-icon"
            :class="item.icon"
          ></i>
          <component
            :is="item.icon.element || 'i'"
            v-else
            class="vsm-icon"
            :class="item.icon.class"
            v-bind="item.icon.attributes"
          >
            {{ item.icon.text }}
          </component>
        </template>
        <template v-if="!isCollapsed || mobileItem">
          <component
            :is="item.badge.element || 'span'"
            v-if="item.badge"
            :style="rtl ? (item.child ? { 'margin-left': '30px' } : {}) : (item.child ? { 'margin-right': '30px' } : {})"
            class="vsm-badge"
            :class="item.badge.class"
            v-bind="item.badge.attributes"
          >
            {{ item.badge.text }}
          </component>
          <span class="vsm-title">{{ item.title }}</span>
          <div
            v-if="item.child"
            class="vsm-arrow"
            :class="{ 'open-arrow': show, 'slot-icon': $slots['dropdown-icon'] }"
          >
            <slot name="dropdown-icon" />
          </div>
        </template>
      </a>
    </template>
    <template v-if="item.child">
      <template v-if="!isCollapsed">
        <transition
          name="expand"
          @enter="expandEnter"
          @after-enter="expandAfterEnter"
          @before-leave="expandBeforeLeave"
        >
          <div v-if="show" class="vsm-dropdown">
            <SidebarListItem
              :items="item.child"
              :show-child="showChild"
              :rtl="rtl"
            >
              <slot name="dropdown-icon"></slot>
            </SidebarListItem>
          </div>
        </transition>
      </template>
    </template>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import SidebarListItem from './SidebarListItem.vue';
import { itemMixin, animationMixin } from './mixin';

export default defineComponent({
  name: 'SidebarItem',
  components: {
    SidebarListItem,
  },
  mixins: [itemMixin, animationMixin],
  props: {
    item: {
      type: Object,
      required: true,
    },
    firstItem: {
      type: Boolean,
      default: false,
    },
    isCollapsed: {
      type: Boolean,
    },
    mobileItem: {
      type: Boolean,
      default: false,
    },
    activeShow: {
      type: Number,
      default: null,
    },
    showChild: {
      type: Boolean,
      default: false,
    },
    showOneChild: {
      type: Boolean,
      default: false,
    },
    rtl: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    mouseEnter(event) {
      if (
        this.isCollapsed &&
        this.firstItem &&
        !this.mobileItem &&
        !this.item.disabled
      ) {
        this.$emit('mouseEnterItem', {
          item: this.item,
          pos:
            event.currentTarget.getBoundingClientRect().top -
            this.$el.getBoundingClientRect().top,
          height: this.$el.offsetHeight,
        });
      }
    },
  },
});
</script>
