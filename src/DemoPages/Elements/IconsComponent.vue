<template>
  <div>
    <page-title-component :heading=heading :subheading=subheading :icon=icon></page-title-component>

    <div class="content">
      <div class="card main-card mb-3 bg-premium-dark text-white">
        <div class="card-body">
          <h3 class="card-title">Gradient Icons</h3>
          <div class="font-icon-wrapper font-icon-lg">
            <i class="pe-7s-filter icon-gradient bg-warm-flame"> </i>
          </div>
          <div class="font-icon-wrapper font-icon-lg">
            <i class="pe-7s-help1 icon-gradient bg-night-fade"> </i>
          </div>
          <div class="font-icon-wrapper font-icon-lg">
            <i class="pe-7s-moon icon-gradient bg-sunny-morning"> </i>
          </div>
          <div class="font-icon-wrapper font-icon-lg">
            <i class="pe-7s-plane icon-gradient bg-tempting-azure"> </i>
          </div>
          <div class="font-icon-wrapper font-icon-lg">
            <i class="pe-7s-box2 icon-gradient bg-amy-crisp"> </i>
          </div>
          <div class="font-icon-wrapper font-icon-lg">
            <i class="pe-7s-lock icon-gradient bg-malibu-beach"> </i>
          </div>
          <div class="font-icon-wrapper font-icon-lg">
            <i class="pe-7s-monitor icon-gradient bg-mean-fruit"> </i>
          </div>
          <div class="font-icon-wrapper font-icon-lg">
            <i class="pe-7s-mouse icon-gradient bg-heavy-rain"> </i>
          </div>
          <div class="font-icon-wrapper font-icon-lg">
            <i class="pe-7s-paint icon-gradient bg-arielle-smile"> </i>
          </div>
          <div class="font-icon-wrapper font-icon-lg">
            <i class="pe-7s-menu icon-gradient bg-ripe-malin"> </i>
          </div>
          <div class="font-icon-wrapper font-icon-lg">
            <i class="pe-7s-wristwatch icon-gradient bg-deep-blue"> </i>
          </div>
          <div class="font-icon-wrapper font-icon-lg">
            <i class="pe-7s-volume2 icon-gradient bg-happy-itmeo"> </i>
          </div>
          <div class="font-icon-wrapper font-icon-lg">
            <i class="pe-7s-video icon-gradient bg-happy-fisher"> </i>
          </div>
          <div class="font-icon-wrapper font-icon-lg">
            <i class="pe-7s-wallet icon-gradient bg-plum-plate"> </i>
          </div>
          <div class="font-icon-wrapper font-icon-lg">
            <i class="pe-7s-paint-bucket icon-gradient bg-grow-early"> </i>
          </div>
          <div class="font-icon-wrapper font-icon-lg">
            <i class="pe-7s-diamond icon-gradient bg-strong-bliss"> </i>
          </div>
          <div class="font-icon-wrapper font-icon-lg">
            <i class="pe-7s-magic-wand icon-gradient bg-mixed-hopes"> </i>
          </div>
          <div class="font-icon-wrapper font-icon-lg">
            <i class="pe-7s-arc icon-gradient bg-premium-dark"> </i>
          </div>
          <div class="font-icon-wrapper font-icon-lg">
            <i class="pe-7s-hourglass icon-gradient bg-love-kiss"> </i>
          </div>
        </div>
      </div>
      <div class="card main-card mb-3 bg-premium-dark text-white">
        <div class="card-body">
          <h3 class="card-title">Stroke 7 Icon Font Set {{ iconCount }}</h3>
          <div class="row">
            <div class="col-md-3" v-for="icon in iconList" :key="icon">
              <div class="font-icon-wrapper">
                <i :class=icon></i>
                <p>{{ icon }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue';
import PageTitleComponent from "@/Layout/Components/PageTitleComponent.vue";
import stroke7IconList from "@/utils/icon.js";

export default defineComponent({
  components: {
    PageTitleComponent,
  },

  setup() {
    const heading = ref('Icons');
    const subheading = ref('Wide icons selection including from flag icons to FontAwesome and other icons libraries.');
    const icon = ref('pe-7s-phone icon-gradient bg-night-fade');
    const iconCount = ref(stroke7IconList.length);
    const iconList = ref(stroke7IconList);

    return {
      heading,
      subheading,
      icon,
      iconCount,
      iconList,
    };
  },
});
</script>
