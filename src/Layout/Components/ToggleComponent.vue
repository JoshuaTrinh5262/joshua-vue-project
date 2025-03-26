<template>
    <button class="theme-toggle-button toggle-slider" type="button" role="switch"
        :title="isDark ? 'Switch to light theme' : 'Switch to dark theme'" :aria-checked="isDark" @click="handleToggle">
        <span class="check">
            <span class="icon">
                <i class="pe-7s-moon moon"></i>
                <i class="pe-7s-sun sun"></i>
            </span>
        </span>
    </button>
</template>

<script>
import { useDark, useToggle } from '@vueuse/core';

export default {
    name: "ToggleComponent",

    setup() {
        const isDark = useDark();
        const toggleTheme = useToggle(isDark);
        const handleToggle = () => {
            toggleTheme();
        }
        return {
            isDark,
            toggleTheme,
            handleToggle,
        };
    },
};
</script>

<style scoped>
.theme-toggle-button {
    position: relative;
    border-radius: 11px;
    display: block;
    width: 40px;
    height: 22px;
    flex-shrink: 0;
    border: 1px solid #3c3f44;
    background-color: rgba(142, 150, 170, .14);
    transition: border-color .25s !important;
    cursor: pointer;
}

.theme-toggle-button:hover {
    border-color: red;
}

.toggle-slider {
    display: flex;
    align-items: center;
}

.dark .toggle-slider .check {
    transform: translate(18px);
}

.check {
    position: absolute;
    margin: 1px;
    top: 1px;
    left: 1px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: #ffffff;
    box-shadow: 0 1px 2px rgba(0, 0, 0, .04), 0 1px 2px rgba(0, 0, 0, .06);
    transition: transform .25s !important;
}

.dark .check {
    position: absolute;
    margin: 1px;
    top: 1px;
    left: 1px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: #000000;
    box-shadow: 0 1px 2px rgba(0, 0, 0, .04), 0 1px 2px rgba(0, 0, 0, .06);
    transition: transform .25s !important;
}

.icon {
    position: relative;
    display: block;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    overflow: hidden;
}

.icon [class^=pe-7s-] {
    position: absolute;
    top: 2px;
    left: 2px;
    width: 12px;
    height: 12px;
    color: rgba(60, 60, 67, .78);
}

.dark .icon [class^=pe-7s-] {
    color: rgba(255, 255, 245, .86);
    transition: opacity .25s !important;
}

.sun {
    opacity: 1;
}

.moon,
.dark .sun {
    opacity: 0;
}

.dark .moon {
    opacity: 1;
}
</style>
