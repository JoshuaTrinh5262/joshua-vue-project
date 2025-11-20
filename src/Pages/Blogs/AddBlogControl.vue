<template>
    <div id="add-blog">
        <h2>Add a new blog post</h2>

        <form v-if="!submitted && !isLoading">
            <input type="text" v-model="blog.title" required placeholder="Blog title">
            <textarea required v-model="blog.content" placeholder="Blog content"></textarea>

            <div id="blog-categories">
                <div class="blog-category" v-for="cat in categoriesList" :key="cat">
                    <label>{{ cat }}:</label>
                    <input type="checkbox" :value="cat" v-model="blog.categories">
                </div>
            </div>

            <div class="buttons">
                <button class="btn btn-warning" @click.prevent="previewBlogFun">Preview Blog</button>
                <button class="btn btn-primary" @click.prevent="submitBlogFun">Submit Blog</button>
                <button class="btn btn-danger" @click.prevent="clear">Cancel</button>
            </div>
        </form>

        <div v-if="submitted" class="success">
            <h3>Blog submitted successfully!</h3>
        </div>

        <div id="preview-section" v-if="!isLoading">
            <h3>Preview Blog</h3>
            <p><span class="text-blod">Blog title:</span> {{ previewBlog.title }}</p>
            <p class="text-blod">Blog content:</p>
            <div v-html="previewBlog.content"></div>
            <p><span class="text-blod">Blog categories:</span></p>
            <BlogCategories :categories="previewBlog.categories" />
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import BlogCategories from './BlogCategories.vue';
import blogCategories from "./blogCategories.js"; 

const blog = reactive({
    title: "",
    content: "",
    categories: []
});

const previewBlog = reactive({
    title: "",
    content: "",
    categories: []
});

const categoriesList = blogCategories;

const submitted = ref(false);
const isLoading = ref(true);

const previewBlogFun = () => {
    if (!blog.title || !blog.content || blog.categories.length === 0) return;

    previewBlog.title = blog.title;
    previewBlog.content = blog.content;
    previewBlog.categories = [...blog.categories];
};

const submitBlogFun = async () => {
    // if (!blog.title || !blog.content || blog.categories.length === 0) return;

    // const payload = { ...blog };

    // try {
    //     await axios.post(`${apiBaseUrl.apiBaseUrl}/posts.json`, payload);
    //     submitted.value = true;
    //     previewBlogFun();
    // } catch (error) {
    //     console.error("Error submitting blog:", error);
    // }
};

const clear = () => {
    blog.title = "";
    blog.content = "";
    blog.categories = [];

    previewBlog.title = "";
    previewBlog.content = "";
    previewBlog.categories = [];
};

onMounted(() => {
    isLoading.value = false;
});
</script>

<style scoped>
#add-blog {
    margin: 20px auto;
}

input,
textarea {
    display: block;
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
}

textarea {
    height: 150px;
}

#blog-categories {
    display: flex;
    justify-content: start;
    margin-bottom: 10px;
}

.blog-category {
    display: flex;
    justify-content: start;
    margin-right: 10px;
}

.buttons {
    display: flex;
    justify-content: center;
}

.success {
    background-color: #4CAF50;
    padding: 10px;
    text-align: center;
}

.success h3 {
    margin: 0;
    color: #fff;
}

#preview-section {
    padding: 10px 20px;
    border: 1px dotted #ccc;
    margin: 30px 0;
}
</style>
