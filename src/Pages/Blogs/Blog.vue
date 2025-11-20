<template>
    <router-link class="normal" v-bind:to="'/admin/blog/' + blog.id">
        <div id="blog-item">
            <h2 v-rand-color>{{ blog.title }}</h2>
            <p>{{ blog.content }}</p>
            <p>{{ blog.author }}</p>
            <BlogCategories v-bind:categories="blog.categories" />
        </div>
    </router-link>
</template>

<script>
import BlogCategories from './BlogCategories.vue';

export default {
    name: 'Blog',
    components: {
        BlogCategories
    },

    props: {
        blog: {
            type: Object,
            required: true
        }
    },

    filters: {
        toUppercase(value) {
            return value.toUpperCase();
        }
    },

}
</script>

<style scoped>
#blog-item {
    padding: 20px;
    margin: 20px 0;
    box-sizing: border-box;
    background: #eee;
}

.normal {
    text-decoration: none;
    color: inherit;

}
</style>