<template>
    <div class="app-page-title">
        <div class="page-title-wrapper">
            <div class="page-title-heading">
                <div class="page-title-icon">
                    <i :class="icon"/>
                </div>
                <div>
                    {{heading}}
                    <div
                        class="page-title-subheading">
                        {{subheading}}
                    </div>
                </div>
            </div>
            <div class="page-title-actions">
                <button type="button" @click=clickCreateBtn class="btn-shadow d-inline-flex align-items-center btn btn-primary">
                    <font-awesome-icon class="mr-2" icon="plus"/>
                    Create New
                </button>
                <button v-if="showImport" @click=clickImportBtn type="button" class="btn-shadow d-inline-flex align-items-center btn btn-info">
                    <font-awesome-icon class="mr-2" icon="plus"/>
                    import
                </button>
                <button v-if="showExport" @click=clickExportBtn type="button" class="btn-shadow d-inline-flex align-items-center btn btn-info">
                    <font-awesome-icon class="mr-2" icon="plus"/>
                    Export
                </button>
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
    import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

    library.add(
        faStar,
        faPlus,
    );

    export default {
        components: {
            'font-awesome-icon': FontAwesomeIcon,
        },

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
