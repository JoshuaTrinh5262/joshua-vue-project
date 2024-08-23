<template>
    <div class="app-page-title">
        <div class="page-title-wrapper">
            <div class="page-title-heading">
                <div class="page-title-icon">
                    <i :class="icon"></i>
                </div>
                <div>
                    <h2>{{heading}}</h2>
                    <div
                        class="page-title-subheading">
                        {{subheading}}
                    </div>
                </div>
            </div>
            <div class="page-title-actions">
                <slot name="actions"></slot>
            </div>
        </div>
    </div>
</template>

<script>
    import {library} from '@fortawesome/fontawesome-svg-core'
    import {
        faStar,
        faPlus
    } from '@fortawesome/free-solid-svg-icons'

    library.add(
        faStar,
        faPlus,
    );

    export default {
        props: {
            icon: {
                type: String,
                required: true,
            },
            heading: {
                type: String,
                required: true,
            },
            subheading: {
                type: String,
                required: false,
            },
            showImport: {
                type: Boolean,
                default: false,
                required: false,
            },
            showExport: {
                type: Boolean,
                default: false,
                required: false,
            },
        },

        data() {
            return {
            };
        },

        methods: {
            clickCreateBtn() {
                this.$emit('click-create-btn');
            },

            clickImportBtn() {
                this.$emit('click-import-btn');
            },

            clickExportBtn() {
                this.$emit('click-export-btn');
            },
        },
    }
</script>
