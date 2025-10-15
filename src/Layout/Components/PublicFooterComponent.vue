<template>
  <footer class="site-footer">
    <div class="site-container">
      <div class="text-center">
        <div><a href="https://www.facebook.com/ygovn.hda" target="_blank"><img class="footer-logo" src="/hda.jpg"
              alt="mdigi.tools" width="332" height="192"></a>
          <div>HDA - Hội YugiOh Tp Hồ Chí Minh.</div>
        </div>
        <div class="py-3">
          <div class="site-menu"><a class="menu-item" href="/about">About</a>
            <a class="menu-item" href="/blog">Blog</a>
            <a class="menu-item" href="/faq">FAQ</a>
            <a class="menu-item" href="/terms-and-conditions">Terms</a><a class="menu-item" href="/privacy/">Privacy</a>
            <a class="menu-item" href="/contact">Contact</a>
          </div>
        </div>
      </div>
      <div class="container-readable border-top text-center">
        <div class="leading-loose">
          <div class="text-small">Built with ❤ by <a href="https://joshuatrinh.fun">Joshua Trinh</a><br><a href="#top">↑
              back to top</a></div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { defineComponent, } from "vue";
import ToggleComponent from "./ToggleComponent.vue";

export default defineComponent({
  components: { ToggleComponent },
  name: "PublicFooterComponent",

  setup() {

    return {

    };
  },
});
</script>

<style scoped>
.dark {
  .site-footer {
    background-color: #333;
    color: #fff;
  }

  .site-footer a {
    color: red;
  }

  .site-footer a:hover {
    color: red;
  }

  .container-readable {
    .border-top {
      border-color: #000;
    }
  }
}

.site-container {
  width: 100%;
  max-width: 1374px;
  padding-left: 1rem;
  padding-right: 1rem;
  margin-left: auto;
  margin-right: auto;
}

.site-menu {
  height: 2.5rem;
  font-size: 0.875rem;
  letter-spacing: 0.025em;
  font-weight: 600;
  width: 100%;
}

.site-menu .menu-item+.menu-item {
  margin-left: 1.25rem;
}

.site-menu .menu-item {
  line-height: 40px;
  align-self: center;
}

.site-footer {
  width: 100%;
  padding-top: 1.25rem;
  padding-bottom: 1.25rem;
  margin-left: auto;
  margin-right: auto;
  border-top-width: 1px;
  border-color: #f0f2f4;
  color: #334155;
  font-size: 0.875rem;
  background-color: #fafbfc;
}

.site-footer a {
  color: #334155;
}

.site-footer a:hover {
  color: #1E293B;
}

.footer-logo {
  border-radius: 50%;
  height: 60px;
  width: auto;
  margin: 0 auto;
  margin-bottom: 10px;
}

.container-readable {
  width: 100%;
  max-width: 768px;
  margin-left: auto;
  margin-right: auto;
  padding-top: 1.25rem;
  padding-bottom: 1.25rem;

  .border-top {
    border-top-width: 1px;
    border-color: #000;
  }

  .leading-loose {
    line-height: 2;
  }
}

@media (min-width: 768px) {
  .site-container {
    padding-left: 2.5rem;
    padding-right: 2.5rem;
  }
}

.site-menu {
  font-size: 0.875rem;
}
</style>
