<template>
    <div class="app-footer">
        <div class="app-footer__inner text-center">
            Copyright {{ currentYear }} JoshuaTrinh
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import { getCurrentYear } from "@/helpers/dateTimeHelper";

export default defineComponent({
    name: "FooterComponent",
    setup() {
        var currentYear = getCurrentYear();
        return {
            currentYear
        };
    },
});
</script>