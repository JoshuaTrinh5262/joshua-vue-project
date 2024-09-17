<template>
  <div class="banner">
    <div v-for="(image, index) in images" :key="index" class="image-container" @mouseover="hoverImage(index)"
      @mouseleave="resetHover" :class="{ expanded: hoveredIndex === index }">
      <img :src="image.src" :alt="image.alt">
    </div>
  </div>
</template>

<script>
import { ref, defineComponent } from 'vue';

export default defineComponent({
  name: 'BannerComponent',
  setup() {
    const hoveredIndex = ref(null);

    const images = [
      { src: "girl_orange_A.png", alt: "girl_orange" },
      { src: "girl_green_A.png", alt: "girl_green" },
      { src: "girl_lightblue_A.png", alt: "girl_lightblue" },
      { src: "girl_purple_A.png", alt: "girl_purple" },
      { src: "girl_black_A.png", alt: "girl_black" },
      { src: "girl_blond_A.png", alt: "girl_blond" },
    ];

    const hoverImage = (index) => {
      hoveredIndex.value = index;
    };

    const resetHover = () => {
      hoveredIndex.value = null;
    };

    return {
      hoveredIndex,
      images,
      hoverImage,
      resetHover,
    };
  }
});
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.banner {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 800px;
  overflow: hidden;
  margin: auto;
}

.image-container {
  flex: 1;
  transition: flex 0.5s ease-in-out;
  overflow: hidden;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-container.expanded {
  flex: 1.2;
}
</style>
