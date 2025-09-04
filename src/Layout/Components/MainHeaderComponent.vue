<template>
  <header class="main-header">
    <div class="header-content">
      <h1 class="header-title">{{ title }}</h1>
      <nav class="header-nav">
        <ul>
          <li v-for="item in navItems" :key="item.text" class="nav-item" @mouseenter="toggleDropdown(item.text, true)"
            @mouseleave="toggleDropdown(item.text, false)">
            <P v-if="href" :href="item.href">{{ item.text }}</P>
            <span v-else>{{ item.text }}</span>
            <ul v-if="item.submenu && dropdownOpen[item.text]" class="drop-list">
              <li class="drop-list-item" v-for="subItem in item.submenu" :key="subItem.text">
                <a :href="subItem.href">{{ subItem.text }}</a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
      <div class="auth-buttons">
        <toggle-component></toggle-component>
        <a v-if="!isAuthenticated" href="login" class="btn btn-primary">Login</a>
        <a v-if="!isAuthenticated" href="register" class="btn btn-secondary">Sign Up</a>
        <a v-if="isAuthenticated" class="btn btn-primary">Logout</a>
      </div>
    </div>
  </header>
</template>

<script>
import { defineComponent, ref } from "vue";
import ToggleComponent from "./ToggleComponent.vue";

export default defineComponent({
  components: { ToggleComponent },
  name: "MainHeaderComponent",

  setup() {
    const title = ref("BRAND");
    const isAuthenticated = ref(false);
    const dropdownOpen = ref({});

    const navItems = ref([
      { text: "HOME", href: "/" },
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
        text: "OTHER",
        submenu: [
          { text: "MASTER RULE", href: "/master_rule" },
          { text: "CONTACT", href: "/contact" },
          { text: "DRAFT", href: "/draft" },
          { text: "Edison", href: "/edison" },
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
      toggleDropdown,
    };
  },
});
</script>

<style scoped>
.dark .main-header {
  background-color: #333;
  color: #fafbfc;
}

.dark .header-nav a {
  color: #fafbfc;
}

.dark .header-nav .drop-list {
  background-color: #333;
}

.main-header {
  background-color: #fafbfc;
  color: #333;
  padding: 0 1.5rem 0 1.5rem;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-title {
  font-size: 1.5rem;
}

.header-nav ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
}

.header-nav .nav-item {
  position: relative;
  margin: 0px;
  padding: 12px;
}

.header-nav .nav-item span {
  cursor: pointer;
}
.header-nav a {
  color: #333;
}

.header-nav a:hover {
  text-decoration: none;
}

.header-nav .drop-list {
  background-color: #fafbfc;
  position: absolute;
  top: 100%;
  left: 0;
  color: #fff;
  list-style: none;
  padding: 0;
  margin: 0;
  z-index: 10;
  display: flex;
  flex-direction: column;
}

.header-nav .drop-list a {
  display: block;
  padding: 1rem;
  text-decoration: none;
  transition: background-color 0.3s ease;
  width: auto;
}

.header-nav .drop-list a:hover {
  background-color: #333;
}

.auth-buttons {
  display: flex;
  align-items: center;
  gap: 0.2rem;
}

.auth-buttons button {
  border: none;
  padding: 0.5rem 1rem;
  margin-left: 1rem;
  cursor: pointer;
}
</style>
