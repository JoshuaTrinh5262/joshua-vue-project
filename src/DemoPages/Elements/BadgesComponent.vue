<template>
  <div>
    <page-title-component :heading=heading :subheading=subheading :icon=icon></page-title-component>

    <div class="content">
      <div class="row">
        <div class="col-lg-6">
          <div class="main-card mb-3 card">
            <div class="card-body">
              <h5 class="card-title">Colors</h5>
              <div class="mb-2 mr-2 badge badge-primary">Primary</div>
              <div class="mb-2 mr-2 badge badge-secondary">Secondary</div>
              <div class="mb-2 mr-2 badge badge-success">Success</div>
              <div class="mb-2 mr-2 badge badge-info">Info</div>
              <div class="mb-2 mr-2 badge badge-warning">Warning</div>
              <div class="mb-2 mr-2 badge badge-danger">Danger</div>
              <div class="mb-2 mr-2 badge badge-focus">Focus</div>
              <div class="mb-2 mr-2 badge badge-alternate">Alt</div>
              <div class="mb-2 mr-2 badge badge-light">Light</div>
              <div class="mb-2 mr-2 badge badge-dark">Dark</div>
              <div class="divider"></div>
              <h5 class="card-title">Pills</h5>
              <div class="mb-2 mr-2 badge badge-pill badge-primary">Primary</div>
              <div class="mb-2 mr-2 badge badge-pill badge-secondary">Secondary</div>
              <div class="mb-2 mr-2 badge badge-pill badge-success">Success</div>
              <div class="mb-2 mr-2 badge badge-pill badge-info">Info</div>
              <div class="mb-2 mr-2 badge badge-pill badge-warning">Warning</div>
              <div class="mb-2 mr-2 badge badge-pill badge-danger">Danger</div>
              <div class="mb-2 mr-2 badge badge-pill badge-focus">Focus</div>
              <div class="mb-2 mr-2 badge badge-pill badge-alternate">Alt</div>
              <div class="mb-2 mr-2 badge badge-pill badge-light">Light</div>
              <div class="mb-2 mr-2 badge badge-pill badge-dark">Dark</div>
              <div class="divider"></div>
              <h5 class="card-title">Links</h5><a href="javascript:void(0);"
                class="mb-2 mr-2 badge badge-primary">Primary</a><a href="javascript:void(0);"
                class="mb-2 mr-2 badge badge-secondary">Secondary</a><a href="javascript:void(0);"
                class="mb-2 mr-2 badge badge-success">Success</a><a href="javascript:void(0);"
                class="mb-2 mr-2 badge badge-info">Info</a><a href="javascript:void(0);"
                class="mb-2 mr-2 badge badge-warning">Warning</a><a href="javascript:void(0);"
                class="mb-2 mr-2 badge badge-danger">Danger</a><a href="javascript:void(0);"
                class="mb-2 mr-2 badge badge-focus">Focus</a><a href="javascript:void(0);"
                class="mb-2 mr-2 badge badge-alternate">Alt</a><a href="javascript:void(0);"
                class="mb-2 mr-2 badge badge-light">Light</a><a href="javascript:void(0);"
                class="mb-2 mr-2 badge badge-dark">Dark</a>
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="main-card mb-3 card">
            <div class="card-body">
              <h5 class="card-title">With Buttons</h5>
              <button class="mb-2 mr-2 btn btn-primary">Primary<span class="badge badge-light ml-2">NEW</span></button>
              <button class="mb-2 mr-2 btn btn-secondary">Secondary<span
                  class="badge badge-light ml-2">NEW</span></button>
              <button class="mb-2 mr-2 btn btn-success">Success<span class="badge badge-light ml-2">NEW</span></button>
              <button class="mb-2 mr-2 btn btn-info">Info<span class="badge badge-light ml-2">NEW</span></button>
              <button class="mb-2 mr-2 btn btn-warning">Warning<span class="badge badge-light ml-2">NEW</span></button>
              <button class="mb-2 mr-2 btn btn-danger">Danger<span class="badge badge-light ml-2">NEW</span></button>
              <button class="mb-2 mr-2 btn btn-focus">Focus<span class="badge badge-light ml-2">NEW</span></button>
              <button class="mb-2 mr-2 btn btn-alternate">Alt<span class="badge badge-light ml-2">NEW</span></button>
              <button class="mb-2 mr-2 btn btn-light">Light<span class="badge badge-light ml-2">NEW</span></button>
              <button class="mb-2 mr-2 btn btn-white">Light<span class="badge badge-light ml-2">NEW</span></button>
              <button class="mb-2 mr-2 btn btn-dark">Dark<span class="badge badge-light ml-2">NEW</span></button>
              <button class="mb-2 mr-2 btn btn-link">Link 1<span class="badge badge-primary">NEW</span></button>
              <button class="mb-2 mr-2 btn btn-link">Link 2<span class="badge badge-success">NEW</span></button>
              <button class="mb-2 mr-2 btn btn-link">Link 3<span class="badge badge-danger">NEW</span></button>
              <button class="mb-2 mr-2 btn btn-link">Link 4<span class="badge badge-warning">NEW</span></button>
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

export default defineComponent({

  components: {
    PageTitleComponent,
  },

  setup() {
    const heading = ref('Badges and Labels');
    const subheading = ref('Badges and labels are used to offer extra small pieces of info for your content.');
    const icon = ref('pe-7s-voicemail icon-gradient bg-arielle-smile');

    return {
      heading,
      subheading,
      icon,
    };
  },
});
</script>
