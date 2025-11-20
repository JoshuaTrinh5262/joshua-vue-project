<template>
    <div>
        <page-title-component :heading="heading" :subheading="subheading" :icon="icon"></page-title-component>
        <tabs-component>
            <tab-component title="Yugioh Enums">

                <div class="information">
                    <div class="information-title">Banned Card Status</div>
                    <enums-component v-bind:enums="banlist"></enums-component>
                </div>
                <div class="information">
                    <div class="information-title">Monster Type</div>
                    <enums-component v-bind:enums="type"></enums-component>
                </div>
                <div class="information">
                    <div class="information-title">Monster Attribute</div>
                    <enums-component v-bind:enums="attribute"></enums-component>
                </div>
            </tab-component>
        </tabs-component>
    </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import PageTitleComponent from "@/Layout/Components/PageTitleComponent.vue";
import TabComponent from "@/Layout/Components/Tabs/TabComponent.vue";
import TabsComponent from "@/Layout/Components/Tabs/TabsComponent.vue";
import EnumsComponent from "@/Layout/Components/EnumsComponent.vue";
import { BanlistCardStatus, MonsterType, MonsterAttribute } from "@/utils/enums";

export default defineComponent({
    name: "Enums Control",

    components: {
        PageTitleComponent,
        TabComponent,
        TabsComponent,
        EnumsComponent
    },

    setup() {
        const heading = ref("Enums Control");
        const subheading = ref("The Enums Control page allows administrators to manage and organize the system's predefined enumeration values."
            + "These enums are used across various modules to ensure consistent labeling, filtering, and categorization throughout the application."
            + "Page provides a centralized interface where you can view, update, or add new enum definitions, making it easier to maintain structured and uniform data across the system.");
        const icon = ref("pe-7s-settings icon-gradient bg-tempting-azure");
        const banlist = Object.values(BanlistCardStatus);
        const type = Object.values(MonsterType);
        const attribute = Object.values(MonsterAttribute);
        return {
            heading,
            subheading,
            icon,
            banlist,
            type,
            attribute
        };
    },
});
</script>
