<template>
    <div class="container">
        <div id="blog-item" v-if="blog">
            <h2>{{ blog.title }}</h2>
            <div v-html="blog.content"></div>
        </div>

        <div v-else>
            <h3>Blog not found!</h3>
        </div>

        <div class="buttons">
            <button :disabled="isLoading" class="btn btn-danger" @click.prevent="deleteBlog">
                Delete Blog
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import blogs from "../Pages/Blogs/blogs.js";


const route = useRoute();
const router = useRouter();

const id = route.params.id;
const blog = ref(null);
const isLoading = ref(true);

onMounted(() => {
    const found = blogs.find(b => b.id == id);

    if (found) {
        blog.value = found;
    }

    isLoading.value = false;
});

const deleteBlog = async () => {
    try {
        await axios.delete(`${apiBaseUrl.apiBaseUrl}/posts/${id}.json`);
        router.push("/");
    } catch (err) {
        console.error("Delete failed:", err);
    }
};
</script>

<style scoped>
#blog-item {
    padding: 20px;
    margin: 20px auto;
    box-sizing: border-box;
    background: #eee;
    min-height: 150px;
}
</style>
