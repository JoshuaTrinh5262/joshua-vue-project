<template>
  <div class="not-found">
    <div class="not-found-content">
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <button class="btn btn-primary" @click="goHome">Go to Home</button>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { defineComponent } from "vue";

export default defineComponent({
  name: "NotFoundPage",
  setup() {
    const router = useRouter();

    const goHome = () => {
      router.push("/");
    };

    return {
      goHome,
    };
  },
});
</script>
