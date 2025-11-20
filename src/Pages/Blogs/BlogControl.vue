<template>
    <div class="container">
        <h2>All Blogs</h2>
        <div id="search-filter">
            <input type="text" v-model="search" placeholder="Search blogs">
        </div>
        <Blog v-for="blog in filteredBlogs" v-bind:key="blog.id" v-bind:blog="blog" />
        <div v-if="filteredBlogs.length == 0">
            <h3>No blogs found!</h3>
        </div>
    </div>
</template>

<script>
import { defineComponent } from "vue";
import Blog from './Blog.vue';
import blogs from './blogs.js';

export default defineComponent({
    name: 'Blogs Page',

    components: {
        Blog
    },

    data() {
        return {
            blogs: blogs,
            search: '',
            isLoading: true
        }
    },
    computed: {
        filteredBlogs() {
            return this.blogs.filter((blog) => {
                return blog.title.match(this.search);
            });
        }
    },
})
</script>

<style scoped>
#search-filter {
    margin: 20px 0;
}

#search-filter input {
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
}
</style>