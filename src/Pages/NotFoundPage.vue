<template>
  <div class="not-found bg-premium-dark">
    <div class="not-found-content">
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <button @click="goHome">Go to Home</button>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'NotFoundPage',
  setup() {
    const router = useRouter();

    const goHome = () => {
      router.push('/admin');
    };

    return {
      goHome,
    };
  },
});
</script>

<style scoped>
.not-found {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  /* background-color: #f0f0f0; */
  background-color: #121212;
  color: #e0e0e0;
}

.not-found-content {
  text-align: center;
  padding: 20px;
  border-radius: 10px;
  /* background-color: white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); */
  background-color: #1e1e1e;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.not-found h1 {
  font-size: 3em;
  color: #ff0000;
}

.not-found p {
  font-size: 1.2em;
}

button {
  padding: 10px 20px;
  font-size: 1em;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  /* Space above the button */
}

button:hover {
  background-color: #0056b3;
}
</style>