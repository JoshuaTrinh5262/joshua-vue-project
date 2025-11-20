<template>
    <div class="container">
        <h2>All Blogs</h2>
        <div id="search-filter">
            <input type="text" v-model="search" placeholder="Search blogs">
        </div>
        <div id="tag-filter">
            <button v-for="tag in allTags" :key="tag" @click="selectedTag = selectedTag === tag ? '' : tag"
                :class="{ active: selectedTag === tag }">
                {{ tag }}
            </button>
        </div>
        <div v-for="blog in filteredBlogs" v-bind:key="blog.id" v-bind:blog="blog">
            <router-link class="normal" v-bind:to="'/blog/' + blog.id">
                <div id="blog-item">
                    <h2>{{ blog.title }}</h2>
                    <p>{{ blog.content }}</p>
                    <p>{{ blog.author }}</p>
                    <BlogCategories v-bind:categories="blog.categories" />
                </div>
            </router-link>
        </div>
        <!-- <div class="row">
            <div class="col-lg-6 col-md-6" v-for="blog in filteredBlogs" v-bind:key="blog.id" v-bind:blog="blog">
                <div class="card animated-card mb-4">
                    <span class="ribbon">{{ blog.date }}</span>
                    <img src="/img/abstract6.f96a397f.jpg" height="360" alt="Card image cap" class="card-img" />
                    <div class="card-img-overlay">
                        <div>
                            <h5 class="card-title">
                                {{ blog.title }}
                            </h5>
                        </div>
                        <div class="card-body transparent-card">
                            <p>{{ blog.content }}</p>
                            <br />
                            <router-link class="normal" v-bind:to="'/blog/' + blog.id">
                                <p>Know More</p>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div> -->
        <div v-if="filteredBlogs.length == 0">
            <h3>No blogs found!</h3>
        </div>
    </div>
</template>

<script>
import { defineComponent } from "vue";
import BlogCategories from '../Pages/Blogs/BlogCategories.vue';
import blogs from '../Pages/Blogs/blogs.js';

export default defineComponent({
    name: 'Blogs Page',

    components: {
        BlogCategories
    },

    data() {
        return {
            blogs: blogs,
            search: '',
            selectedTag: '',
            isLoading: true
        }
    },

    computed: {
        allTags() {
            const tags = this.blogs.flatMap(blog => blog.categories || []);
            return [...new Set(tags)];
        },

        filteredBlogs() {
            return this.blogs.filter(blog => {
                const matchesSearch = blog.title.toLowerCase().includes(this.search.toLowerCase());
                const matchesTag = this.selectedTag ? (blog.categories || []).includes(this.selectedTag) : true;
                return matchesSearch && matchesTag;
            });
        }
    }
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

#tag-filter {
    margin-bottom: 20px;
}

#tag-filter button {
    margin-right: 10px;
    padding: 5px 10px;
    border: none;
    background: #ccc;
    cursor: pointer;
}

#tag-filter button.active {
    background: #666;
    color: white;
}

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