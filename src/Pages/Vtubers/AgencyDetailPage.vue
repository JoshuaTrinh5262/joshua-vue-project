<template>
    <page-title-component :heading="heading" :subheading="subheading" :icon="icon"></page-title-component>

    <div v-if="agency">
        <tabs-component>
            <tab-component title="Detail">
                <h1>Name {{ agency.agency_name }}</h1>
                <p>Created At: {{ agency.created_at }}</p>
                <p>Status: {{ agency.agency_status }}</p>
                <p>Description: {{ agency.agency_description }}</p>
            </tab-component>
            <tab-component :title="`Talents (${agency.talent.length})`">
                <table-component :fields="fields" :items="agency.talent" :show-action="false"></table-component>
            </tab-component>
        </tabs-component>
    </div>
    <div v-else>
        <p>Loading agency details...</p>
    </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import PageTitleComponent from "@/Layout/Components/PageTitleComponent.vue";
import TableComponent from "@/Layout/Components/TableComponent.vue"
import TabsComponent from "@/Layout/Components/Tabs/TabsComponent.vue";
import TabComponent from "@/Layout/Components/Tabs/TabComponent.vue";
import { apiService } from '@/supabase/apiService';

export default defineComponent({
    name: "AgencyDetailPage",

    components: {
        PageTitleComponent,
        TableComponent,
        TabsComponent,
        TabComponent
    },

    props: {
        id: {
            type: String,
            required: true,
        },
    },

    setup(props) {
        const heading = ref("Agency");
        const subheading = ref("Agency Detail Page");
        const icon = ref("pe-7s-user icon-gradient bg-tempting-azure");

        const agency = ref(null);
        const fields = ref([
            { key: "name", value: "Name" },
            { key: "original_name", value: "Original Name" },
            { key: "talent_status", value: "Status" },
            { key: "debut_date", value: "Debut Date" },
        ]);
        const fetchAgency = async (id) => {
            try {
                const response = await apiService.getAgencyById(id);
                agency.value = response;
            } catch (error) {
                console.error('Error fetching agency:', error);
            }
        };

        onMounted(async () => {
            if (props.id) {
                await fetchAgency(props.id);
                if (agency.value) {
                    heading.value += ` ${agency.value.agency_name}`;
                }
            }
        });

        return {
            heading,
            subheading,
            icon,
            agency,
            fields
        };
    },
});
</script>
