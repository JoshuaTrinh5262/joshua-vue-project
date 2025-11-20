<template>
  <div class="card-body">
    <h5 class="card-title">Settings</h5>
    <form class="">
      <div class="position-relative form-group">
        <label for="exampleEmail" class="">Email</label>
        <input name="email" id="exampleEmail" placeholder="with a placeholder" type="email" class="form-control">
      </div>
      <div class="position-relative form-group">
        <label for="exampleSelect" class="">Referre Languague</label>
        <select name="select" id="exampleSelect" class="form-control">
          <option>english</option>
          <option>vietnam</option>
        </select>
      </div>
      <div class="position-relative form-group">
        <label for="exampleSelect" class="">Referre Mode</label>
        <select name="select" id="exampleSelect" class="form-control">
          <option>Dark</option>
          <option>Light</option>
        </select>
      </div>
      <button class="mt-1 btn btn-primary">Submit</button>
      <button class="mt-1 btn btn-secondary">Signout</button>

    </form>
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "Setting Page",
  data() {
    return {
    };
  },
});
</script>
