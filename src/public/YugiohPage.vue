<template>
  <div class="section">
    <div class="section-title">
      <h1>YUGIOH</h1>
    </div>
    <div class="row">
      <div class="col-lg-4 col-md-6" v-for="page in pageList" :key="page">
        <div class="card animated-card mb-4">
          <span class="ribbon">{{ page.name }}</span>
          <img src="/img/abstract6.f96a397f.jpg" height="300" alt="Card image cap" class="card-img" />
          <div class="card-img-overlay">
            <div>
              <h5 class="card-title">
                {{ page.name }}
              </h5>
            </div>
            <div class="card-body transparent-card">
              <p>{{ page.description }}</p>
              <br />
              <small class="text-white">
                <a :href="`/yugioh/${page.name}`">Detail</a>
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  defineComponent,
  ref
} from "vue";
import BreadcrumbComponent from "../Layout/Components/BreadcrumbComponent.vue";

export default defineComponent({
  name: "YugiohPage",
  setup() {
    const pageList = ref([{
      name: "Card",
      description: "Browse detailed information on every Yu-Gi-Oh! card including rulings, sets, and archetype support."
    },
    {
      name: "Banlist",
      description: "Stay updated with the latest Forbidden & Limited list and understand how it affects competitive play."
    },
    {
      name: "Product",
      description: "Explore booster sets, structure decks, accessories, and release schedules."
    },
    {
      name: "Tournament",
      description: "View tournament formats, official event schedules, results, and competitive deck profiles."
    },
    ]);

    return {
      pageList,
    };
  },
  components: {
    BreadcrumbComponent
  },
});
</script>

<style scoped>
.section {
  padding: 1rem;
}

.section-title {
  padding-bottom: 1rem;
}

.transparent-card {
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px);
  padding: 15px;
  border-radius: 10px;
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
  opacity: 0;
  transform: translateY(30px);
}

.card:hover .transparent-card {
  opacity: 1;
  transform: translateY(0);
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
  border-radius: 5px;
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
  opacity: 0;
  transform: translateY(50px);
  animation: slideUp 0.6s ease-out forwards;
}

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
