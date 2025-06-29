<template>
  <div>
    <page-title-component :heading=heading :subheading=subheading :icon=icon></page-title-component>
    <div class="row">
      <div class="col-md-6">
        <div class="card main-card mb-3">
          <div class="card-body">
            <h3 class="card-title">Basic</h3>
            <div class="progress">
              <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                :style="{ width: (counter / max) * 100 + '%' }" aria-valuenow="counter" aria-valuemin="0"
                aria-valuemax="max">
                {{ counter.toFixed(2) }}
              </div>
            </div>
            <div class="progress mt-1">
              <div class="progress-bar bg-success" role="progressbar"
                :style="{ width: (counter * (6 / 10) / max) * 100 + '%' }" aria-valuenow="counter * (6/10)"
                aria-valuemin="0" aria-valuemax="max">
                Success: {{ (counter * (6 / 10)).toFixed(0) }}
              </div>
              <div class="progress-bar bg-warning" role="progressbar"
                :style="{ width: (counter * (2.5 / 10) / max) * 100 + '%' }" aria-valuenow="counter * (2.5/10)"
                aria-valuemin="0" aria-valuemax="max">
                Warning: {{ (counter * (2.5 / 10)).toFixed(0) }}
              </div>
              <div class="progress-bar bg-danger" role="progressbar"
                :style="{ width: (counter * (1.5 / 10) / max) * 100 + '%' }" aria-valuenow="counter * (1.5/10)"
                aria-valuemin="0" aria-valuemax="max">
                Danger: {{ (counter * (1.5 / 10)).toFixed(0) }}
              </div>
            </div>
            <div class="progress mt-1">
              <div class="progress-bar bg-success" role="progressbar"
                :style="{ width: (counter * (6 / 10) / max) * 100 + '%' }" aria-valuenow="counter * (6/10)"
                aria-valuemin="0" aria-valuemax="max">
                {{ (counter * (6 / 10)).toFixed(0) }}%
              </div>
              <div class="progress-bar bg-warning" role="progressbar"
                :style="{ width: (counter * (2.5 / 10) / max) * 100 + '%' }" aria-valuenow="counter * (2.5/10)"
                aria-valuemin="0" aria-valuemax="max">
                {{ (counter * (2.5 / 10)).toFixed(0) }}%
              </div>
              <div class="progress-bar bg-danger" role="progressbar"
                :style="{ width: (counter * (1.5 / 10) / max) * 100 + '%' }" aria-valuenow="counter * (1.5/10)"
                aria-valuemin="0" aria-valuemax="max">
                {{ (counter * (1.5 / 10)).toFixed(0) }}%
              </div>
            </div>
            <div class="progress mt-1">
              <div class="progress-bar bg-success" role="progressbar"
                :style="{ width: (counter * (3.5 / 10) / max) * 100 + '%' }" aria-valuenow="counter * (3.5/10)"
                aria-valuemin="0" aria-valuemax="max">
                {{ (counter * (3.5 / 10)).toFixed(0) }}%
              </div>
              <div class="progress-bar bg-warning" role="progressbar"
                :style="{ width: (counter * (2.5 / 10) / max) * 100 + '%' }" aria-valuenow="counter * (2.5/10)"
                aria-valuemin="0" aria-valuemax="max">
                {{ (counter * (2.5 / 10)).toFixed(0) }}%
              </div>
              <div class="progress-bar bg-danger" role="progressbar"
                :style="{ width: (counter * (2 / 10) / max) * 100 + '%' }" aria-valuenow="counter * (2/10)"
                aria-valuemin="0" aria-valuemax="max">
                {{ (counter * (2 / 10)).toFixed(0) }}%
              </div>
              <div class="progress-bar bg-dark" role="progressbar"
                :style="{ width: (counter * (2 / 10) / max) * 100 + '%' }" aria-valuenow="counter * (2/10)"
                aria-valuemin="0" aria-valuemax="max">
                {{ (counter * (2 / 10)).toFixed(0) }}%
              </div>
            </div>
            <button class="btn btn-primary mt-4" @click="clicked">Click me</button>
          </div>
        </div>
        <div class="card main-card mb-3">
          <div class="card-body">
            <h3 class="card-title">Colors</h3>
            <div v-for="bar in bars" class="row mb-1" :key="bar.variant">
              <div class="col-sm-2">{{ bar.variant }}</div>
              <div class="col-sm-10 pt-1">
                <div class="progress">
                  <div class="progress-bar" :style="{ width: bar.value + '%' }" :class="'bg-' + bar.variant"
                    role="progressbar" :aria-valuenow="bar.value" :aria-valuemin="0" :aria-valuemax="100">
                    {{ bar.value }}%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card main-card mb-3">
          <div class="card-body">
            <h3 class="card-title">Sizing</h3>
            <div class="progress mb-3">
              <div class="progress-bar" :style="{ width: value + '%' }" role="progressbar" aria-valuenow="value"
                aria-valuemin="0" aria-valuemax="100">
                {{ value }}%
              </div>
            </div>
            <div class="progress mb-2" style="height: 2rem;">
              <div class="progress-bar" :style="{ width: value + '%' }" role="progressbar" aria-valuenow="value"
                aria-valuemin="0" aria-valuemax="100">
                {{ value }}%
              </div>
            </div>
            <div class="progress mb-2" style="height: 20px;">
              <div class="progress-bar" :style="{ width: value + '%' }" role="progressbar" aria-valuenow="value"
                aria-valuemin="0" aria-valuemax="100">
                {{ value }}%
              </div>
            </div>
            <div class="progress" style="height: 2px;">
              <div class="progress-bar" :style="{ width: value + '%' }" role="progressbar" aria-valuenow="value"
                aria-valuemin="0" aria-valuemax="100"></div>
            </div>
          </div>
        </div>
        <div class="card main-card mb-3">
          <div class="card-body">
            <h3 class="card-title">Striped Animated</h3>
            <!-- Success variant -->
            <div class="progress mb-2">
              <div class="progress-bar progress-bar-animated bg-success" :class="{ 'progress-bar-striped': striped }"
                style="width: 25%" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                25%
              </div>
            </div>

            <!-- Info variant -->
            <div class="progress mb-2">
              <div class="progress-bar  progress-bar-animated bg-info" :class="{ 'progress-bar-striped': striped }"
                style="width: 50%" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
                50%
              </div>
            </div>

            <!-- Warning variant -->
            <div class="progress mb-2">
              <div class="progress-bar progress-bar-animated bg-warning" :class="{ 'progress-bar-striped': striped }"
                style="width: 75%" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                75%
              </div>
            </div>

            <!-- Danger variant -->
            <div class="progress mb-2">
              <div class="progress-bar progress-bar-animated bg-danger" :class="{ 'progress-bar-striped': striped }"
                style="width: 100%" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
                100%
              </div>
            </div>

            <!-- Dark variant -->
            <div class="progress mb-2">
              <div class="progress-bar progress-bar-animated bg-dark" :class="{ 'progress-bar-striped': striped }"
                style="width: 30%" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
                30%
              </div>
            </div>

            <!-- Alterate variant -->
            <div class="progress mb-2">
              <div class="progress-bar progress-bar-animated bg-alternate" :class="{ 'progress-bar-striped': striped }"
                style="width: 60%" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
                60%
              </div>
            </div>

            <!-- Focus variant -->
            <div class="progress mb-2">
              <div class="progress-bar progress-bar-animated bg-focus" :class="{ 'progress-bar-striped': striped }"
                style="width: 90%" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
                90%
              </div>
            </div>

            <button class="btn btn-secondary" variant="secondary" @click="striped = !striped">
              {{ striped ? 'Remove' : 'Add' }} Striped
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue';
import PageTitleComponent from "@/Layout/Components/PageTitleComponent.vue";

export default defineComponent({
  name: "ProgressBarComponent",
  components: {
    PageTitleComponent,
  },

  setup() {
    const heading = ref("Progress Bar");
    const subheading = ref("You can use the progress bars on their own or in combination with other widgets.");
    const icon = ref("pe-7s-filter icon-gradient bg-grow-early");

    const counter = ref(45);
    const max = ref(100);
    const bars = ref([
      { variant: "success", value: 75 },
      { variant: "info", value: 75 },
      { variant: "warning", value: 75 },
      { variant: 'danger', value: 75 },
      { variant: 'primary', value: 75 },
      { variant: 'secondary', value: 75 },
      { variant: 'light', value: 75 },
      { variant: 'dark', value: 75 },
      { variant: 'alternate', value: 75 },
      { variant: 'focus', value: 75 }
    ]);

    let timer = ref(null);
    const striped = ref(true);
    const value = ref(75);
    const clicked = () => {
      counter.value = Math.random() * max.value;
    };

    onMounted(() => {
      timer = setInterval(() => {
        bars.value.forEach(bar => {
          bar.value = (25 + (Math.random() * 75)).toFixed(0);
        });
      }, 2000);
    });

    onBeforeUnmount(() => {
      clearInterval(timer);
      timer = null;
    });

    return {
      heading,
      subheading,
      icon,
      counter,
      max,
      timer,
      striped,
      value,
      bars,
      clicked,
    };
  },
});
</script>
