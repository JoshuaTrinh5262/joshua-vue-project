<template>
  <footer class="site-footer">
    <div class="footer-container">
      <div class="text-center">
        <div>
          <a href="https://www.facebook.com/ygovn.hda" target="_blank">
            <img class="footer-logo" src="/hda.jpg" alt="mdigi.tools" width="332" height="192">
          </a>
          <div>HDA - Hội YugiOh Tp Hồ Chí Minh.</div>
          <div>Inspired Your Life</div>
        </div>
        <div class="py-2">
          <div class="site-menu">
            <a class="menu-item" href="/about">About</a>
            <a class="menu-item" href="/blog">Blog</a>
            <a class="menu-item" href="/faq">FAQ</a>
            <a class="menu-item" href="/terms-and-conditions">Terms</a>
            <a class="menu-item" href="/privacy/">Privacy</a>
            <a class="menu-item" href="/contact">Contact</a>
          </div>
        </div>
        <div class="py-2">
          <div class="site-menu">
            <a class="m-2" href="https://www.facebook.com/ygovn.hda" target="_blank">Facebook</a>
            <a class="m-2" href="https://www.youtube.com/@HDADuelChannel" target="_blank">Youtube</a>
          </div>
        </div>
      </div>
      <div class="container-readable border-top text-center">
        <div class="leading-loose">
          <div class="text-small">
            Built with ❤ by <a href="https://joshuatrinh.fun">Joshua Trinh</a><br>
            <a href="#top">↑ back to top</a>
          </div>
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
    return {};
  },
});
</script>