<template>
    <header class="main-header">
        <div class="header-content">
            <h1 class="header-title">{{ title }}</h1>
            <nav class="header-nav">
                <ul>
                    <li v-for="item in navItems" :key="item.text">
                        <a :href="item.href">{{ item.text }}</a>
                    </li>
                </ul>
            </nav>
            <div class="auth-buttons">
                <button v-if="!isAuthenticated">Login</button>
                <button v-if="isAuthenticated">Logout</button>
            </div>
        </div>
    </header>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
    name: "MainHeaderComponent",

    setup() {
        const title = ref("Joshua");
        const isAuthenticated = ref(false);
        const navItems = ref([
            { text: "HOME", href: "/" },
            { text: "HOLOLIVE", href: "/hololive" },
            { text: "TOOL", href: "/tool" },
            { text: "ABOUT", href: "/about" },
            { text: "CONTACT", href: "/contact" }
        ]);

        return {
            title,
            isAuthenticated,
            navItems
        };
    }
});
</script>

<style scoped>
.main-header {
    background-color: #333;
    color: #fff;
    padding: 1rem;
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

.header-nav li {
    margin-left: 1rem;
}

.header-nav a {
    color: #fff;
    text-decoration: none;
}

.header-nav a:hover {
    text-decoration: underline;
}

.auth-buttons button {
    background-color: #007bff;
    border: none;
    color: white;
    padding: 0.5rem 1rem;
    margin-left: 1rem;
    cursor: pointer;
}

.auth-buttons button:hover {
    background-color: #0056b3;
}
</style>
