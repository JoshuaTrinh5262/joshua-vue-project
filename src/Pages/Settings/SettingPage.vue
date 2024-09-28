<template>
    <div>
        <page-title-component :heading="heading" :subheading="subheading" :icon="icon"></page-title-component>
        <div>
            <div class="card main-card mb-3 text-white bg-premium-dark">
                <div class="card-body">
                    <h5 class="card-title">System Setting</h5>
                    <form>
                        <div class="position-relative row form-group">
                            <label for="exampleEmail" class="col-sm-2 col-form-label">Test</label>
                            <div class="col-sm-10">
                                <input name="text" id="exampleEmail" placeholder="with a placeholder" type="email"
                                    class="form-control" />
                            </div>
                        </div>
                        <div class="position-relative row form-check">
                            <div class="col-sm-10 offset-sm-2">
                                <button class="btn btn-primary" type="button">Save Setting</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import PageTitleComponent from '../../Layout/Components/PageTitleComponent.vue';

export default defineComponent({
    name: 'SettingPage',

    components: {
        PageTitleComponent,
    },

    setup() {
        const heading = ref('Settings');
        const subheading = ref('Setting Page.');
        const icon = ref('pe-7s-settings icon-gradient bg-premium-dark');
        const dynamicColor = ref('#00ff00');
        const changeColor = () => {
            dynamicColor.value = '#ff0000';
        };

        return {
            heading,
            subheading,
            icon,
            dynamicColor,
            changeColor,
        };
    },
});
</script>