<template>
    <div>
        <page-title-component :heading=heading :subheading=subheading :icon=icon></page-title-component>
        <div>
            <div class="main-card mb-3 card">
            <div class="card-body"><h5 class="card-title">System Setting</h5>
              <form class="">
                <div class="position-relative row form-group">
                    <label for="exampleEmail" class="col-sm-2 col-form-label">Test</label>
                    <div class="col-sm-10">
                        <input name="text" id="exampleEmail" placeholder="with a placeholder" type="email" class="form-control">
                    </div>
                </div>
                <div class="position-relative row form-check">
                  <div class="col-sm-10 offset-sm-2">
                    <button class="btn btn-primary">Save Setting</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
    </div>
</template>
<script>
import PageTitleComponent from "../../Layout/Components/PageTitleComponent.vue";

export default {
    name: "SettingComponent",

    components: {
        PageTitleComponent
    },

    data() {
        return {
            heading: 'Settings',
            subheading: 'Settings.',
            icon: 'pe-7s-phone icon-gradient bg-premium-dark',
            dynamicColor: '#00ff00', // Default color from your SCSS
        }
    },

    methods: {
        changeColor() {
            this.dynamicColor = '#ff0000';
        },
    },
};
</script>