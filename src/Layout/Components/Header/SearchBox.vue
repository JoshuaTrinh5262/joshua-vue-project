<template>
    <div>
        <div class="search-wrapper" :class="{ active: searchOpen }">
            <div class="input-holder">
                <input name="searchBox" type="text" class="search-input" placeholder="Type to search" />
                <button class="search-icon" @click="toggleSearch"><span /></button>
            </div>
            <button class="close" @click="toggleSearch"></button>
        </div>
    </div>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
    name: "SearchComponent",

    setup() {
        const searchOpen = ref(false);

        const toggleSearch = () => {
            searchOpen.value = !searchOpen.value;
        };

        return {
            searchOpen,
            toggleSearch,
        };
    },
});
</script>
