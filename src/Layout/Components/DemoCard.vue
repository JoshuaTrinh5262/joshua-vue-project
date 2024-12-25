<template>
    <div class="card main-card mb-3">
        <div class="card-header p-3 h-auto d-block">
            <div class="d-block">{{ heading }}</div>
            <div class="d-block font-weight-normal text-capitalize mt-1 grey--text">{{ subheading }}</div>
        </div>
        <div class="card-body">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
    name: "CardComponent",

    props: {
        heading: {
            type: String,
            required: true
        },
        subheading: {
            type: String,
            default: ""
        }
    },
});
</script>