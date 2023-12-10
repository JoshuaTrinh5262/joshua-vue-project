<template>
  <div>
    <page-title :heading=heading :subheading=subheading :icon=icon></page-title>
      <div class="row">
        <div class="col-md-6">
          <div class="card main-card mb-3">
            <div class="card-body">
              <h3 class="card-title">Doughnut</h3>
              <doughnut></doughnut>
            </div>
          </div>
          <div class="card main-card mb-3">
            <div class="card-body">
              <h3 class="card-title">Radar</h3>
              <radar></radar>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card main-card mb-3">
            <div class="card-body">
              <h3 class="card-title">Polar Area</h3>
              <polar></polar>
            </div>
          </div>
          <div class="card main-card mb-3">
            <div class="card-body">
              <h3 class="card-title">Pie Chart</h3>
              <pie></pie>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="card main-card mb-3">
            <div class="card-body">
              <h3 class="card-title">Line Chart</h3>
              <lineeg></lineeg>
            </div>
          </div>
          <div class="card main-card mb-3">
            <div class="card-body">
              <h3 class="card-title">Area Chart</h3>
              <areaeg></areaeg>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card main-card mb-3">
            <div class="card-body">
              <h3 class="card-title">Vertical Bar Chart</h3>
              <bar></bar>
            </div>
          </div>
          <div class="card main-card mb-3">
            <div class="card-body">
              <h3 class="card-title">Horizontal Bar Chart</h3>
              <barhoriz></barhoriz>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>

  import PageTitle from "../../Layout/Components/PageTitle.vue";

  import doughnut from './Chartjs/Doughnut'
  import radar from './Chartjs/Radar'
  import polar from './Chartjs/Polar'
  import pie from './Chartjs/Pie'
  import lineeg from './Chartjs/Line'
  import areaeg from './Chartjs/Area'
  import bar from './Chartjs/Bar'
  import barhoriz from './Chartjs/BarHoriz'

  export default {
    components: {
      PageTitle,

      doughnut,
      radar,
      polar,
      pie,
      lineeg,
      areaeg,
      bar,
      barhoriz,

    },
    data: () => ({
      heading: 'ChartJS',
      subheading: 'Huge selection of charts created with the Vue ChartJS Plugin',
      icon: 'pe-7s-bandaid icon-gradient bg-amy-crisp',
    }),


  }
</script>
