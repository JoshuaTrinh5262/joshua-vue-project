<template>
    <div class="enums">
        <ul class="items">
            <li class="item" v-for="value in enums" v-bind:key="value">{{ value }}</li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'Enums Component',
    props: {
        enums: {
            type: Array,
            required: true
        }
    }
}
</script>
