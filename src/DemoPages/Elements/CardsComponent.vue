<template>
  <div>
    <page-title-component :heading=heading :subheading=subheading :icon=icon></page-title-component>
    <div class="content">
      <div class="row">
        <div class="col-md-4">
          <div class="main-card mb-3 card">
            <div class="card-body">
              <h5 class="card-title">Basic Example</h5>
              <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean
                massa.</p>
            </div>
          </div>
          <div class="main-card mb-3 card">
            <div class="card-body">
              <h5 class="card-title">Card with Subtitle</h5>
              <h6 class="card-subtitle">Lorem ipsum dolor sit amet, consectetuer adipiscing elit</h6>
              <p>Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis eni</p>
            </div>
          </div>
          <div class="mb-3 card card-body">
            <h5 class="card-title">Special Title Treatment</h5>With supporting text below as a natural lead-in to
            additional content.
            <button class="btn btn-primary mt-2">Go somewhere</button>
          </div>
          <div class="mb-3 text-center card card-body">
            <h5 class="card-title">Special Title Treatment</h5>With supporting text below as a natural lead-in to
            additional content.
            <button class="btn btn-danger mt-2">Go somewhere</button>
          </div>
          <div class="mb-3 text-right card card-body">
            <h5 class="card-title">Special Title Treatment</h5>With supporting text below as a natural lead-in to
            additional content.
            <button class="btn btn-outline-focus mt-2">Go somewhere</button>
          </div>
          <div class="main-card mb-3 card">
            <div class="card-header">Header</div>
            <div class="card-body">
              <h5 class="card-title">Special Title Treatment</h5>With supporting text below as a natural lead-in to
              additional content.
              <button class="btn btn-warning mt-2">Go somewhere</button>
            </div>
            <div class="card-footer">Footer</div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="main-card mb-3 card"><img src="@/assets/images/sidebar/abstract6.jpg" width="318" height="180"
              alt="Card image cap" class="card-img-top">
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <h6 class="card-subtitle">Card subtitle</h6>Some quick example text to build on the card title and make up
              the bulk of the card's content.
              <br><br>
              <button class="btn btn-secondary">Button</button>
            </div>
          </div>
          <div class="main-card mb-3 card">
            <div class="card-body">
              <h5 class="card-title">Card Title</h5>This is a wider card with supporting text below as a natural lead-in
              to additional content. This content is a little bit longer.
              <br><br>
              <small class="text-muted">Last updated 3 mins ago</small>
            </div>
            <img src="@/assets/images/sidebar/abstract6.jpg" width="318" height="180" alt="Card image cap"
              class="card-img-bottom">
          </div>
          <div class="main-card mb-3 card">
            <img src="@/assets/images/sidebar/abstract6.jpg" width="300" height="300" alt="Card image cap"
              class="card-img">
          </div>
        </div>
        <div class="col-md-4">
          <div class="main-card mb-3 card">
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <h6 class="mb-0 card-subtitle">Card subtitle</h6>
            </div>
            <img src="@/assets/images/sidebar/abstract6.jpg" width="100%" height="180" alt="Card image cap">
            <div class="card-body">
              Some quick example text to build on the card title and make up the bulk of the card's
              content.<br><br>
              <a href="javascript:void(0);" class="card-link">Card Link</a><a href="javascript:void(0);"
                class="card-link">Another
                Link</a>
            </div>
          </div>
          <div class="main-card mb-3 card"><img src="@/assets/images/sidebar/abstract6.jpg" width="200" height="200"
              alt="Card image cap" class="card-img-top">
            <div class="card-body">
              <h5 class="card-title">Card Title</h5>
              This is a wider card with supporting text below as a natural lead-in to additional content. This content
              is a little bit longer.
              <br><br>
              <small class="text-muted">Last updated 3 mins ago</small>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-4">
          <div class="card-shadow-primary border mb-3 card card-body border-primary">
            <h5 class="card-title">Primary Card Shadow</h5>With supporting text below as a natural lead-in to additional
            content.
          </div>
          <div class="card-shadow-secondary border mb-3 card card-body border-secondary">
            <h5 class="card-title">Secondary Card Shadow</h5>With supporting text below as a natural lead-in to
            additional content.
          </div>
          <div class="card-shadow-warning border mb-3 card card-body border-warning">
            <h5 class="card-title">Warning Card Shadow</h5>With supporting text below as a natural lead-in to additional
            content.
          </div>
          <div class="card-shadow-danger border mb-3 card card-body border-danger">
            <h5 class="card-title">Danger Card Shadow</h5>
            <p>With supporting text below as a natural lead-in to additional content.</p>
          </div>
          <div class="card-shadow-success border mb-3 card card-body border-success">
            <h5 class="card-title">Success Card Shadow</h5>
            <p>With supporting text below as a natural lead-in to additional content.</p>
          </div>
          <div class="card-shadow-info border mb-3 card card-body border-info">
            <h5 class="card-title">Info Card Shadow</h5>
            <p>With supporting text below as a natural lead-in to additional content.</p>
          </div>
          <div class="card-shadow-focus border mb-3 card card-body border-focus">
            <h5 class="card-title">Focus Card Shadow</h5>
            <p>With supporting text below as a natural lead-in to additional content.</p>
          </div>
          <div class="card-shadow-alternate border mb-3 card card-body border-alternate">
            <h5 class="card-title">Alternate Card Shadow</h5>
            <p>With supporting text below as a natural lead-in to additional content.</p>
          </div>
          <div class="mb-3 card text-white">
            <img src="@/assets/images/sidebar/abstract6.jpg" width="318" height="300" alt="Card image cap"
              class="card-img">
            <div class="card-img-overlay">
              <h5 class="text-white card-title">Card Title With Image Background</h5>
              <p>This is a wider card with supporting text below as a natural lead-in to additional content. This
                content is a little bit longer.</p>
              <p>This is a wider card with supporting text below as a natural lead-in to additional content. This
                content is a little bit longer.</p>
              <br><br>
              <small class="text-white">Last updated 3 mins ago</small>
            </div>
          </div>
          <div class="mb-3 card text-white">
            <img src="@/assets/images/sidebar/abstract6.jpg" width="318" height="300" alt="Card image cap"
              class="card-img">
            <div class="card-img-overlay">
              <h5 class="text-white card-title">Card Title With Image Background</h5>
              <p>This is a wider card with supporting text below as a natural lead-in to additional content. This
                content is a little bit longer.</p>
              <p>This is a wider card with supporting text below as a natural lead-in to additional content. This
                content is a little bit longer.</p>
              <br><br>
              <small class="text-white">Last updated 3 mins ago</small>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card-border mb-3 card card-body border-primary">
            <h5 class="card-title">Primary Card Border</h5>
            <p>With supporting text below as a natural lead-in to additional content.</p>
          </div>
          <div class="card-border mb-3 card card-body border-secondary">
            <h5 class="card-title">Secondary Card Border</h5>
            <p>With supporting text below as a natural lead-in to additional content.</p>
          </div>
          <div class="card-border mb-3 card card-body border-warning">
            <h5 class="card-title">Warning Card Border</h5>
            <p>With supporting text below as a natural lead-in to additional content.</p>
          </div>
          <div class="card-border mb-3 card card-body border-danger">
            <h5 class="card-title">Danger Card Border</h5>
            <p>With supporting text below as a natural lead-in to additional content.</p>
          </div>
          <div class="card-border mb-3 card card-body border-success">
            <h5 class="card-title">Success Card Border</h5>
            <p>With supporting text below as a natural lead-in to additional content.</p>
          </div>
          <div class="card-border mb-3 card card-body border-info">
            <h5 class="card-title">Info Card Border</h5>With supporting text below as a natural lead-in to additional
            content.
          </div>
          <div class="card-border mb-3 card card-body border-focus">
            <h5 class="card-title">Focus Card Border</h5>With supporting text below as a natural lead-in to additional
            content.
          </div>
          <div class="card-border mb-3 card card-body border-alternate">
            <h5 class="card-title">Alternate Card Border</h5>With supporting text below as a natural lead-in to
            additional content.
          </div>
        </div>
        <div class="col-md-4">
          <div class="mb-3 card text-white bg-primary">
            <div class="card-header">Header</div>
            <div class="card-body">With supporting text below as a natural lead-in to additional content.</div>
            <div class="card-footer">Footer</div>
          </div>
          <div class="mb-3 card text-white card-body"
            style="background-color: rgb(51, 51, 51); border-color: rgb(51, 51, 51);">
            <h5 class="text-white card-title">Special Title Treatment</h5>With supporting text below as a
            natural lead-in to additional content.
          </div>
          <div class="mb-3 card text-white card-body bg-primary">
            <h5 class="text-white card-title">Special Title Treatment</h5>With supporting text below as a natural
            lead-in to additional content.
          </div>
          <div class="mb-3 card text-white card-body bg-success">
            <h5 class="text-white card-title">Special Title Treatment</h5>With supporting text below as a natural
            lead-in to additional content.
          </div>
          <div class="mb-3 card text-white card-body bg-danger">
            <h5 class="text-white card-title">Special Title Treatment</h5>With supporting text below as a natural
            lead-in to additional content.
          </div>
          <div class="mb-3 card text-white card-body bg-info">
            <h5 class="text-white card-title">Special Title Treatment</h5>With supporting text below as a natural
            lead-in to additional content.
          </div>
          <div class="mb-3 card text-white card-body bg-warning">
            <h5 class="text-white card-title">Special Title Treatment</h5>With supporting text below as a natural
            lead-in to additional content.
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
    const heading = ref('Cards');
    const subheading = ref('Wide selection of cards with multiple styles, borders, actions and hover effects.');
    const icon = ref('pe-7s-stopwatch icon-gradient bg-amy-crisp');

    return {
      heading,
      subheading,
      icon,
    };
  },
});
</script>
