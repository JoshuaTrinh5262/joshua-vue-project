<template>
  <div>
    <page-title-component :heading="heading" :subheading="subheading" :icon="icon"/>
    <div class="image-gallery">
      <div v-for="(image, name) in loadImages" :key="name" class="image-container">
        <img :src="image" :alt="name" />
        <div class="image-tag">{{ name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import PageTitleComponent from "../../Layout/Components/PageTitleComponent.vue";
import images from '../../utils/loadImages';

export default defineComponent({
  name: "GalleriesPage",

  components: {
    PageTitleComponent,
  },

  setup() {
    const heading = ref('Gallery');
    const subheading = ref('Highlighting the Journey of Creative Minds in the Art World.');
    const icon = ref('pe-7s-phone icon-gradient bg-premium-dark');
    const loadImages = ref(images);

    return {
      heading,
      subheading,
      icon,
      loadImages,
    };
  },
});
</script>

<style scoped>
.image-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  /* Responsive columns */
  gap: 16px;
  /* Space between images */
}

.image-container {
  opacity: 0;
  /* Start invisible */
  transform: translateY(20px);
  /* Start below the view */
  animation: slideUp 0.5s ease forwards;
  /* Slide up animation */
}

/* Adjust delays for as many images as you have, or use JS to automate this */

/* Animation for sliding up */
@keyframes slideUp {
  to {
    opacity: 1;
    transform: translateY(0);
    /* Slide into place */
  }
}

.image-container img {
  width: 100%;
  height: auto;
  border-radius: 8px;
  /* Optional: add rounded corners */
}

.image-container:hover img {
  transform: scale(1.1);
  /* Slight zoom effect */
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.3);
  /* Add shadow on hover */
}
.image-tag {
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: rgba(0, 0, 0, 0.7);
  color: #fff;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 14px;
  font-weight: bold;
  z-index: 1;
  pointer-events: none;
}
</style>
