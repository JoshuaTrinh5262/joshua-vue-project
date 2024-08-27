<template>
    <button :disabled="isLoading" @click="handleClick" class="button-spinner">
        <span v-if="isLoading" class="spinner-icon"></span>
        <span v-if="!isLoading">{{ normalText }}</span>
        <span v-else>{{ loadingText }}</span>
    </button>
</template>

<script>
export default {
    props: {
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
    methods: {
        handleClick() {
            this.$emit('submit');
        },
    },
};
</script>

<style scoped>
.button-spinner {
    padding: 10px 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
}

.button-spinner:disabled {
    background-color: #9E9E9E;
    cursor: not-allowed;
}

.spinner-icon {
    border: 4px solid rgba(255, 255, 255, 0.3);
    border-left-color: #fff;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    animation: spin 1s linear infinite;
    margin-right: 10px;
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