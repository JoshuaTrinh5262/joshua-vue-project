<template>
    <div>
        <page-title-component :heading="heading" :subheading="subheading" :icon="icon"></page-title-component>
        <div class="row">
            <div class="col-md-6">
                <div class="main-card mb-3 card">
                    <div class="card-body">
                        <h5 class="card-title">Controls Types</h5>
                        <form class="">
                            <div class="position-relative form-group">
                                <label for="exampleEmail" class="">Email</label>
                                <input name="email" id="exampleEmail" placeholder="with a placeholder" type="email"
                                    class="form-control">
                            </div>
                            <div class="position-relative form-group">
                                <label for="examplePassword" class="">Password</label>
                                <input name="password" id="examplePassword" placeholder="password placeholder"
                                    type="password" class="form-control">
                            </div>
                            <div class="position-relative form-group">
                                <label for="exampleSelect" class="">Select</label>
                                <select name="select" id="exampleSelect" class="form-control">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </select>
                            </div>
                            <div class="position-relative form-group">
                                <label for="exampleSelectMulti" class="">Select Multiple</label>
                                <select multiple="" name="selectMulti" id="exampleSelectMulti" class="form-control">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </select>
                            </div>
                            <div class="position-relative form-group">
                                <label for="exampleText" class="">Text Area</label>
                                <textarea name="text" id="exampleText" class="form-control"></textarea>
                            </div>
                            <div class="position-relative form-group">
                                <label for="exampleFile" class="">File</label>
                                <input name="file" id="exampleFile" type="file" class="form-control-file">
                                <small class="form-text text-muted">
                                    This is some placeholder block-level help text for
                                    the above input. It"s a bit lighter and easily wraps to a new line.
                                </small>
                            </div>
                            <button class="mt-1 btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="main-card mb-3 card">
                    <div class="card-body">
                        <h5 class="card-title">Sizing</h5>
                        <form class="">
                            <input placeholder="lg" type="text" class="mb-2 form-control-lg form-control">
                            <input placeholder="default" type="text" class="mb-2 form-control">
                            <input placeholder="sm" type="text" class="mb-2 form-control-sm form-control">
                            <div class="divider"></div>
                            <select class="mb-2 form-control-lg form-control">
                                <option>Large Select</option>
                            </select>
                            <select class="mb-2 form-control">
                                <option>Default Select</option>
                            </select>
                            <select class="form-control-sm form-control">
                                <option>Small Select</option>
                            </select>
                        </form>
                    </div>
                </div>
                <div class="main-card mb-3 card">
                    <div class="card-body">
                        <h5 class="card-title">Checkboxes &amp; Radios</h5>
                        <form class="">
                            <fieldset class="position-relative form-group">
                                <div class="position-relative form-check">
                                    <label class="form-check-label">
                                        <input name="radio1" type="radio" class="form-check-input">Option one is this
                                        and that—be sure to include why it"s great
                                    </label>
                                </div>
                                <div class="position-relative form-check">
                                    <label class="form-check-label">
                                        <input name="radio1" type="radio" class="form-check-input">Option two can be
                                        something else and selecting it will deselect option one
                                    </label>
                                </div>
                                <div class="position-relative form-check disabled">
                                    <label class="form-check-label">
                                        <input name="radio1" disabled type="radio" class="form-check-input">Option three
                                        is disabled
                                    </label>
                                </div>
                            </fieldset>
                            <div class="position-relative form-check">
                                <label class="form-check-label">
                                    <input type="checkbox" class="form-check-input">Check me out
                                </label>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <form class="">
            <div class="row">
                <div class="col-md-6">
                    <div class="main-card mb-3 card">
                        <div class="card-body">
                            <h5 class="card-title">Checkboxes</h5>
                            <div class="position-relative form-group">
                                <div>
                                    <div class="custom-checkbox custom-control">
                                        <input type="checkbox" id="exampleCustomCheckbox" class="custom-control-input">
                                        <label class="custom-control-label" for="exampleCustomCheckbox">Check this
                                            custom checkbox</label>
                                    </div>
                                    <div class="custom-checkbox custom-control">
                                        <input type="checkbox" id="exampleCustomCheckbox2" class="custom-control-input">
                                        <label class="custom-control-label" for="exampleCustomCheckbox2">Or this
                                            one</label>
                                    </div>
                                    <div class="custom-checkbox custom-control">
                                        <input type="checkbox" id="exampleCustomCheckbox3" disabled
                                            class="custom-control-input">
                                        <label class="custom-control-label" for="exampleCustomCheckbox3">But not this
                                            disabled one</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="main-card mb-3 card">
                        <div class="card-body">
                            <h5 class="card-title">Inline</h5>
                            <div class="position-relative form-group">
                                <div>
                                    <div class="custom-checkbox custom-control custom-control-inline">
                                        <input type="checkbox" id="exampleCustomInline" class="custom-control-input">
                                        <label class="custom-control-label" for="exampleCustomInline">An inline custom
                                            input</label>
                                    </div>
                                    <div class="custom-checkbox custom-control custom-control-inline">
                                        <input type="checkbox" id="exampleCustomInline2" class="custom-control-input">
                                        <label class="custom-control-label" for="exampleCustomInline2">and another
                                            one</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="main-card mb-3 card">
                        <div class="card-body">
                            <h5 class="card-title">Radios</h5>
                            <div class="position-relative form-group">
                                <div>
                                    <div class="custom-radio custom-control">
                                        <input type="radio" id="exampleCustomRadio" name="customRadio"
                                            class="custom-control-input">
                                        <label class="custom-control-label" for="exampleCustomRadio">Select this custom
                                            radio</label>
                                    </div>
                                    <div class="custom-radio custom-control">
                                        <input type="radio" id="exampleCustomRadio2" name="customRadio"
                                            class="custom-control-input">
                                        <label class="custom-control-label" for="exampleCustomRadio2">Or this
                                            one</label>
                                    </div>
                                    <div class="custom-radio custom-control">
                                        <input type="radio" id="exampleCustomRadio3" disabled
                                            class="custom-control-input">
                                        <label class="custom-control-label" for="exampleCustomRadio3">But not this
                                            disabled one</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="main-card mb-3 card">
                        <div class="card-body">
                            <h5 class="card-title">Form Select</h5>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="position-relative form-group">
                                        <label for="exampleCustomSelect" class="">Custom Select</label>
                                        <select type="select" id="exampleCustomSelect" name="customSelect"
                                            class="custom-select">
                                            <option value="">Select</option>
                                            <option>Value 1</option>
                                            <option>Value 2</option>
                                            <option>Value 3</option>
                                            <option>Value 4</option>
                                            <option>Value 5</option>
                                        </select>
                                    </div>
                                    <div class="position-relative form-group">
                                        <label for="exampleCustomMutlipleSelect" class="">Custom Multiple Select</label>
                                        <select multiple="" type="select" id="exampleCustomMutlipleSelect"
                                            name="customSelect" class="custom-select">
                                            <option value="">Select</option>
                                            <option>Value 1</option>
                                            <option>Value 2</option>
                                            <option>Value 3</option>
                                            <option>Value 4</option>
                                            <option>Value 5</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="position-relative form-group">
                                        <label for="exampleCustomSelectDisabled" class="">Custom Select Disabled</label>
                                        <select type="select" id="exampleCustomSelectDisabled" name="customSelect"
                                            disabled class="custom-select">
                                            <option value="">Select</option>
                                            <option>Value 1</option>
                                            <option>Value 2</option>
                                            <option>Value 3</option>
                                            <option>Value 4</option>
                                            <option>Value 5</option>
                                        </select>
                                    </div>
                                    <div class="position-relative form-group">
                                        <label for="exampleCustomMutlipleSelectDisabled" class="">Custom Multiple Select
                                            Disabled</label>
                                        <select multiple="" type="select" id="exampleCustomMutlipleSelectDisabled"
                                            name="customSelect" disabled class="custom-select">
                                            <option value="">Select</option>
                                            <option>Value 1</option>
                                            <option>Value 2</option>
                                            <option>Value 3</option>
                                            <option>Value 4</option>
                                            <option>Value 5</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
        <div>
            <div class="row">
                <div class="col-md-6">
                    <div class="main-card mb-3 card">
                        <div class="card-body">
                            <h5 class="card-title">Input Groups</h5>
                            <div>
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text">@</span>
                                    </div>
                                    <input placeholder="username" type="text" class="form-control">
                                </div>
                                <br>
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text">
                                            <input aria-label="Checkbox for following text input" type="checkbox"
                                                class="">
                                        </span>
                                    </div>
                                    <input placeholder="Check it out" type="text" class="form-control">
                                </div>
                                <br>
                                <div class="input-group">
                                    <input placeholder="username" type="text" class="form-control">
                                    <div class="input-group-append">
                                        <span class="input-group-text">@example.com</span>
                                    </div>
                                </div>
                                <br>
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text">$</span>
                                        <span class="input-group-text">$</span>
                                    </div>
                                    <input placeholder="Dolla dolla billz yo!" type="text" class="form-control">
                                    <div class="input-group-append">
                                        <span class="input-group-text">$</span>
                                        <span class="input-group-text">$</span>
                                    </div>
                                </div>
                                <br>
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text">$</span>
                                    </div>
                                    <input placeholder="Amount" step="1" type="number" class="form-control">
                                    <div class="input-group-append">
                                        <span class="input-group-text">.00</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="main-card mb-3 card">
                        <div class="card-body">
                            <h5 class="card-title">Input Group Button Shorthand</h5>
                            <div>
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <button class="btn btn-secondary">To the Left!</button>
                                    </div>
                                    <input type="text" class="form-control">
                                </div>
                                <br>
                                <div class="input-group">
                                    <input type="text" class="form-control">
                                    <div class="input-group-append">
                                        <button class="btn btn-secondary">To the Right!</button>
                                    </div>
                                </div>
                                <br>
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <button class="btn btn-danger">To the Left!</button>
                                    </div>
                                    <input placeholder="and..." type="text" class="form-control">
                                    <div class="input-group-append">
                                        <button class="btn btn-success">To the Right!</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="main-card mb-3 card">
                        <div class="card-body">
                            <h5 class="card-title">Input Group Sizing</h5>
                            <div>
                                <div class="input-group input-group-lg">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text">@lg</span>
                                    </div>
                                    <input type="text" class="form-control">
                                </div>
                                <br>
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text">@normal</span>
                                    </div>
                                    <input type="text" class="form-control">
                                </div>
                                <br>
                                <div class="input-group input-group-sm">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text">@sm</span>
                                    </div>
                                    <input type="text" class="form-control">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="main-card mb-3 card">
                        <div class="card-body">
                            <h5 class="card-title">Input Group Addon</h5>
                            <div>
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text">To the Left!</span>
                                    </div>
                                    <input type="text" class="form-control">
                                </div>
                                <br>
                                <div class="input-group">
                                    <input type="text" class="form-control">
                                    <div class="input-group-append">
                                        <span class="input-group-text">To the Right!</span>
                                    </div>
                                </div>
                                <br>
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text">To the Left!</span>
                                    </div>
                                    <input placeholder="and..." type="text" class="form-control">
                                    <div class="input-group-append">
                                        <span class="input-group-text">To the Right!</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="main-card mb-3 card">
                        <div class="card-body">
                            <h5 class="card-title">Input Group Button</h5>
                            <div>
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <button class="btn btn-secondary">I"m a button</button>
                                    </div>
                                    <input type="text" class="form-control">
                                </div>
                                <br>
                                <div class="input-group">
                                    <input type="text" class="form-control">
                                    <div class="input-group-append">
                                        <button class="btn btn-secondary">I"m a button</button>
                                    </div>
                                </div>
                                <br>
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <button class="btn btn-secondary">I"m a button</button>
                                    </div>
                                    <input type="text" placeholder="and..." class="form-control">
                                    <div class="input-group-append">
                                        <button class="btn btn-secondary">I"m a button</button>
                                    </div>
                                </div>
                                <br>
                            </div>
                        </div>
                    </div>
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
        const heading = ref("Form Controls");
        const subheading = ref("Wide selection of forms controls, using the Bootstrap 4 code base, but built with Vue.");
        const icon = ref("pe-7s-display1 icon-gradient bg-tempting-azure");

        return {
            heading,
            subheading,
            icon,
        };
    },
});
</script>
