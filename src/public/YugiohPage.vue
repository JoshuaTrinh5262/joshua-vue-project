<template>
  <breadcrumb-component></breadcrumb-component>
  <div class="row">
    <div class="col-md-4" v-for="page in pageList" :key="page">
      <div class="card animated-card mb-2">
        <span class="ribbon">New</span>

        <img
          src="photo-coming-soon-holder.png"
          width="300"
          height="300"
          alt="Card image cap"
          class="card-img"
        />
        <div class="card-img-overlay">
          <div>
            <h5 class="card-title">
              {{ page.name }}
            </h5>
          </div>
          <div class="card-body transparent-card">
            <p>
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </p>
            <p>
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </p>
            <br />
            <small class="text-white">Last updated 3 mins ago</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import BreadcrumbComponent from "../Layout/Components/BreadcrumbComponent.vue";

export default defineComponent({
  name: "YugiohPage",
  setup() {
    const pageList = ref([
      {
        name: "Card",
      },
      {
        name: "Banlist",
      },
      {
        name: "Tournament",
      },
    ]);
    return {
      pageList,
    };
  },
  components: { BreadcrumbComponent },
});
</script>
 <style scoped>
.transparent-card {
  background-color: rgba(255, 255, 255, 0.2); /* Slight transparency */
  backdrop-filter: blur(5px); /* Adds blur effect */
  padding: 15px;
  border-radius: 10px;
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
  opacity: 0; /* Initially hidden */
  transform: translateY(30px); /* Moves card-body down */
}

.card:hover .transparent-card {
  opacity: 1; /* Fully visible on hover */
  transform: translateY(0); /* Moves up to original position */
}

.new-tag {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: red;
  color: white;
  font-size: 14px;
  font-weight: bold;
  padding: 5px 10px;
  border-radius: 5px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
}
.ribbon {
  position: absolute;
  top: 10px;
  right: -10px;
  background: red;
  color: white;
  font-size: 14px;
  font-weight: bold;
  padding: 5px 20px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2);
  z-index: 10;
}

.ribbon::before {
  content: "";
  position: absolute;
  bottom: -5px;
  left: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 10px solid red;
}

.animated-card {
  opacity: 0; /* Hidden initially */
  transform: translateY(50px); /* Starts below */
  animation: slideUp 0.6s ease-out forwards;
}

/* Slide-up animation */
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
