<template>
  <header class="main-header">
    <div class="header-content">
      <span class="header-title">
        <!-- Task Replace with logo -->
        <a href="/">{{ title }}</a>
      </span>
      <button class="hamburger" @click="isMenuOpen = !isMenuOpen">
        <span :class="{ open: isMenuOpen }"></span>
      </button>
      <nav :class="['header-nav', { open: isMenuOpen }]" class="header-nav">
        <ul>
          <li v-for="item in navItems" :key="item.text" @mouseenter="toggleDropdown(item.text, true)"
            @mouseleave="toggleDropdown(item.text, false)" class="nav-item">
            <a v-if="item.href" :href="item.href" class="item-url">{{ item.text }}</a>
            <span v-else>{{ item.text }}</span>
            <ul class="sub-list">
              <li class="sub-list-item" v-for="subItem in item.submenu" :key="subItem.text">
                <a :href="subItem.href">{{ subItem.text }}</a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
      <div class="auth-buttons">
        <toggle-component></toggle-component>
        <!-- <a v-if="!isAuthenticated" href="login" class="btn btn-primary">Login</a>
        <a v-if="!isAuthenticated" href="register" class="btn btn-secondary">Sign Up</a>
        <a v-if="isAuthenticated" class="btn btn-primary">Logout</a> -->
      </div>
    </div>
  </header>
</template>

<script>
import { defineComponent, ref } from "vue";
import ToggleComponent from "./ToggleComponent.vue";

export default defineComponent({
  components: { ToggleComponent },
  name: "PublicHeaderComponent",

  setup() {
    const title = ref("HDA");
    const isAuthenticated = ref(false);
    const dropdownOpen = ref({});
    const isMenuOpen = ref(false);
    const navItems = ref([
      {
        text: "YUGIOH",
        submenu: [
          { text: "CARD", href: "/yugioh/card" },
          { text: "BANLIST", href: "/yugioh/banlist" },
          { text: "PRODUCT", href: "/yugioh/product" },
          { text: "TOURNAMENT", href: "/yugioh/tournament" },
        ],
      },
      {
        text: "BLOG",
        href: "/blog"
      },
      {
        text: "BATTLE CITY",
        href: "/battlecity",
        submenu: [
          { text: "POLICY", href: "/battlecity/policy" },
        ],
      },
      {
        text: "GENESYS",
        submenu: [
          { text: "Genesys", href: "/genesys" },
          { text: "Deck Build", href: "/deckbuild" },
        ],
      },
      {
        text: "EDISON",
        href: "/edison"
      },
      {
        text: "OTHER",
        submenu: [
          { text: "MASTER RULE", href: "/master_rule" },
          { text: "CONTACT", href: "/contact" },
          { text: "DRAFT", href: "/draft" },
        ],
      },
      {
        text: "TOOLS",
        submenu: [
          { text: "TIMER", href: "/timer" },
        ],
      },
    ]);

    const toggleDropdown = (menu, state) => {
      dropdownOpen.value = { ...dropdownOpen.value, [menu]: state };
    };

    return {
      title,
      isAuthenticated,
      navItems,
      dropdownOpen,
      isMenuOpen,
      toggleDropdown,
    };
  },
});
</script>

<style scoped></style>
