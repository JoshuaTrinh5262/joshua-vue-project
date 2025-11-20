<template>
    <div class="enums">
        <ul class="items">
            <li class="item" v-for="category in categories" v-bind:key="category">{{ category }}</li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'Blog Categories',
    props: {
        categories: {
            type: Array,
            required: true
        }
    }

}
</script>
