<template>
    <button :disabled="isLoading" :class="buttonClass" @click="handleClick" class="btn btn-spinner">
        <span v-if="isLoading" class="spinner-icon"></span>
        <span v-if="!isLoading">{{ normalText }}</span>
        <span v-else>{{ loadingText }}</span>
    </button>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'ButtonSpinner',

    props: {
        buttonClass: {
            type: String,
            default: 'btn-success',
        },
        normalText: {
            type: String,
            default: 'Submit',
        },
        loadingText: {
            type: String,
            default: 'Submitting...',
        },
        isLoading: {
            type: Boolean,
            default: false,
        },
    },
    emits: ['click'],

    methods: {
        handleClick() {
            if (!this.isLoading) {
                this.$emit('click');
            }
        },
    },

});
</script>

<style scoped>
.btn-spinner {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
}

.btn-spinner:disabled {
    border: 1px solid #9E9E9E;
    background-color: #9E9E9E;
    cursor: not-allowed;
}

.spinner-icon {
    border: 4px solid rgba(255, 255, 255, 0.3);
    border-left-color: #fff;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    animation: spin 1s linear infinite;
    margin-right: 5px;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>