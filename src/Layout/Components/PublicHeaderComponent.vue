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
    const title = ref("BRAND");
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
        text: "GENESYS",
        submenu: [
          { text: "Genesys", href: "/genesys" },
          { text: "Deck Build", href: "/deckbuild" },
        ],
      },
      { text: "EDISON", href: "/edison" },
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

<style scoped>
.dark {
  .main-header {
    background-color: #333;
    color: #fafbfc;
  }

  .header-nav a {
    color: #fafbfc;
  }

  .header-nav .nav-item span,
  .header-nav .nav-item .item-url {
    border-bottom: 2px solid #333;
  }

  .header-nav .sub-list {
    background-color: #333;
  }

  .header-nav .sub-list .sub-list-item {
    border-bottom: 2px solid #333;
  }

  .hamburger span,
  .hamburger span::before,
  .hamburger span::after {
    background: white;
  }

  @media (max-width: 768px) {
    .hamburger {
      display: block;
    }

    .header-nav {
      background: #333;
    }
  }
}

.hamburger {
  display: none;
  width: 32px;
  height: 24px;
  position: relative;
  border: none;
  background: transparent;
  cursor: pointer;
}

.hamburger span,
.hamburger span::before,
.hamburger span::after {
  content: "";
  position: absolute;
  height: 3px;
  width: 100%;
  background: black;
  left: 0;
  transition: 0.3s ease;
}

.hamburger span {
  top: 50%;
  transform: translateY(-50%);
}

.hamburger span::before {
  top: -8px;
}

.hamburger span::after {
  top: 8px;
}

/* Animate when open */
.hamburger span.open {
  background: transparent;
}

.hamburger span.open::before {
  transform: rotate(45deg) translate(5px, 5px);
}

.hamburger span.open::after {
  transform: rotate(-45deg) translate(5px, -5px);
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

.header-title a {
  text-decoration: none;
}

.header-nav ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
}

/* --- Navigation --- */
.header-nav ul {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
}

.header-nav li {
  position: relative;
}

.header-nav a {
  color: white;
  text-decoration: none;
}

.header-nav .nav-item {
  display: flex;
  flex-direction: column;
  list-style: none;
}

.header-nav .nav-item span {
  cursor: default;
  padding: 12px;
  border-bottom: 2px solid white;
}

.header-nav .nav-item .item-url {
  padding: 12px;
  border-bottom: 2px solid white;
}

.header-nav .nav-item:hover span,
.header-nav .nav-item:hover .item-url {
  border-bottom: 2px solid red;
}

.header-nav a {
  color: #333;
}

.header-nav a:hover {
  text-decoration: none;
}

.header-nav .sub-list {
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
  width: 150px;
}

.header-nav .sub-list .sub-list-item {
  display: none;
  padding: 1rem;
  border-bottom: 2px solid #fafbfc;
}

.nav-item:hover .sub-list .sub-list-item {
  display: block;
}

.header-nav .sub-list .sub-list-item:hover {
  border-bottom: 2px solid red;
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

/* --- Responsive --- */
@media (max-width: 768px) {
  .hamburger {
    display: block;
  }

  .header-nav {
    position: absolute;
    top: 40px;
    left: 0;
    width: 100%;
    background: #fafbfc;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.5s ease-in-out;
    z-index: 3;
  }

  .header-nav.open {
    max-height: 1000px;
  }

  .header-nav ul {
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
  }

  .header-nav .nav-item {
    width: 100%;
  }

  .header-nav .nav-item span {
    padding: 10px;
  }

  .header-nav .sub-list {
    position: relative;
    width: 100%;
    max-height: 0;
    opacity: 0;
    overflow: hidden;
    transform: translateY(-10px);
    transition: max-height 0.5s ease, opacity 0.5s ease, transform 0.5s ease;
  }

  .nav-item:hover .sub-list {
    max-height: 300px;
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
