<template>
  <div>
    <page-title-component :heading=heading :subheading=subheading :icon=icon></page-title-component>

    <div class="content">
      <div class="main-card mb-3 card card-dark">
        <div class="card-body">
          <h5 class="card-title">Grid Rows</h5>
          <form class="">
            <div class="form-row">
              <div class="col-md-6">
                <div class="position-relative form-group"><label for="exampleEmail11" class="">Email</label><input
                    name="email" id="exampleEmail11" placeholder="with a placeholder" type="email" class="form-control">
                </div>
              </div>
              <div class="col-md-6">
                <div class="position-relative form-group"><label for="examplePassword11" class="">Password</label><input
                    name="password" id="examplePassword11" placeholder="password placeholder" type="password"
                    class="form-control"></div>
              </div>
            </div>
            <div class="position-relative form-group"><label for="exampleAddress" class="">Address</label><input
                name="address" id="exampleAddress" placeholder="1234 Main St" type="text" class="form-control"></div>
            <div class="position-relative form-group"><label for="exampleAddress2" class="">Address 2</label><input
                name="address2" id="exampleAddress2" placeholder="Apartment, studio, or floor" type="text"
                class="form-control"></div>
            <div class="form-row">
              <div class="col-md-6">
                <div class="position-relative form-group"><label for="exampleCity" class="">City</label><input
                    name="city" id="exampleCity" type="text" class="form-control"></div>
              </div>
              <div class="col-md-4">
                <div class="position-relative form-group"><label for="exampleState" class="">State</label><input
                    name="state" id="exampleState" type="text" class="form-control"></div>
              </div>
              <div class="col-md-2">
                <div class="position-relative form-group"><label for="exampleZip" class="">Zip</label><input name="zip"
                    id="exampleZip" type="text" class="form-control"></div>
              </div>
            </div>
            <div class="position-relative form-check">
              <input name="check" id="exampleCheck" type="checkbox" class="form-check-input">
              <label for="exampleCheck" class="form-check-label">Check me out</label>
            </div>
            <button class="mt-2 btn btn-primary">Sign in</button>
          </form>
        </div>
      </div>
      <div class="main-card mb-3 card">
        <div class="card-body">
          <h5 class="card-title">Inline</h5>
          <div>
            <form class="form-inline">
              <div class="mb-2 mr-sm-2 mb-sm-0 position-relative form-group"><label for="exampleEmail22"
                  class="mr-sm-2">Email</label><input name="email" id="exampleEmail22" placeholder="something@idk.cool"
                  type="email" class="form-control">
              </div>
              <div class="mb-2 mr-sm-2 mb-sm-0 position-relative form-group"><label for="examplePassword22"
                  class="mr-sm-2">Password</label><input name="password" id="examplePassword22" placeholder="password"
                  type="password" class="form-control"></div>
              <button class="btn btn-primary">Submit</button>
            </form>
            <div class="divider"></div>
            <form class="">
              <div class="position-relative form-check form-check-inline"><label class="form-check-label"><input
                    type="checkbox" class="form-check-input"> Some input</label></div>
              <div class="position-relative form-check form-check-inline"><label class="form-check-label"><input
                    type="checkbox" class="form-check-input"> Some other input</label></div>
            </form>
            <div class="divider"></div>
            <form class="form-inline">
              <div class="position-relative form-group"><label for="exampleEmail33" class="sr-only">Email</label><input
                  name="email" id="exampleEmail33" placeholder="Email" type="email" class="mr-2 form-control"></div>
              <div class="position-relative form-group"><label for="examplePassword44"
                  class="sr-only">Password</label><input name="password" id="examplePassword44" placeholder="Password"
                  type="password" class="mr-2 form-control"></div>
              <button class="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
      <div class="main-card mb-3 card">
        <div class="card-body">
          <h5 class="card-title">Grid</h5>
          <form class="">
            <div class="position-relative row form-group"><label for="exampleEmail"
                class="col-sm-2 col-form-label">Email</label>
              <div class="col-sm-10"><input name="email" id="exampleEmail" placeholder="with a placeholder" type="email"
                  class="form-control"></div>
            </div>
            <div class="position-relative row form-group"><label for="examplePassword"
                class="col-sm-2 col-form-label">Password</label>
              <div class="col-sm-10"><input name="password" id="examplePassword" placeholder="password placeholder"
                  type="password" class="form-control"></div>
            </div>
            <div class="position-relative row form-group">
              <label for="exampleSelect" class="col-sm-2 col-form-label">Select</label>
              <div class="col-sm-10">
                <select name="select" id="exampleSelect" class="form-control">
                  <option value="0">Zero</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                  <option value="4">Four</option>
                  <option value="5">Five</option>
                  <option value="6">Six</option>
                  <option value="7">Seven</option>
                  <option value="8">Eight</option>
                  <option value="9">Nine</option>
                </select>
              </div>
            </div>
            <div class="position-relative row form-group">
              <label for="exampleSelectMulti" class="col-sm-2 col-form-label">Select Multiple</label>
              <div class="col-sm-10">
                <select multiple="" name="selectMulti" id="exampleSelectMulti" class="form-control">
                  <option value="0">Zero</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                  <option value="4">Four</option>
                  <option value="5">Five</option>
                  <option value="6">Six</option>
                  <option value="7">Seven</option>
                  <option value="8">Eight</option>
                  <option value="9">Nine</option>
                </select>
              </div>
            </div>
            <div class="position-relative row form-group"><label for="exampleText" class="col-sm-2 col-form-label">Text
                Area</label>
              <div class="col-sm-10"><textarea name="text" id="exampleText" class="form-control"></textarea></div>
            </div>
            <div class="position-relative row form-group"><label for="exampleFile"
                class="col-sm-2 col-form-label">File</label>
              <div class="col-sm-10"><input name="file" id="exampleFile" type="file"
                  class=" date-picker form-control-file">
                <small class="form-text text-muted">This is some placeholder block-level help text for the above input.
                  It"s a bit lighter and easily wraps to a new line.</small>
              </div>
            </div>
            <fieldset class="position-relative row form-group">
              <legend class="col-form-label col-sm-2">Radio Buttons</legend>
              <div class="col-sm-10">
                <div class="position-relative form-check"><label class="form-check-label"><input name="radio2"
                      type="radio" class="form-check-input"> Option one is this and that—be sure to include why it"s
                    great</label></div>
                <div class="position-relative form-check"><label class="form-check-label"><input name="radio2"
                      type="radio" class="form-check-input"> Option two can be something else and selecting it will
                    deselect option one</label></div>
                <div class="position-relative form-check disabled"><label class="form-check-label"><input name="radio2"
                      disabled type="radio" class="form-check-input"> Option three is disabled</label></div>
              </div>
            </fieldset>
            <div class="position-relative row form-group"><label for="checkbox2"
                class="col-sm-2 col-form-label">Checkbox</label>
              <div class="col-sm-10">
                <div class="position-relative form-check">
                  <label class="form-check-label">Check me out</label>
                  <input type="checkbox" class="form-check-input">
                </div>
              </div>
            </div>
            <div class="position-relative row form-check">
              <div class="col-sm-10 offset-sm-2">
                <button class="btn btn-secondary">Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import PageTitleComponent from "@/Layout/Components/PageTitleComponent.vue";

export default defineComponent({
  components: {
    PageTitleComponent,
  },

  setup() {
    const heading = ref("Form Layouts");
    const subheading = ref("Build whatever layout you need with our framework.");
    const icon = ref("pe-7s-graph text-success");

    return {
      heading,
      subheading,
      icon,
    };
  }
});
</script>