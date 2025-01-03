<template>
    <page-title-component :heading="heading" :subheading="subheading" :icon="icon"></page-title-component>

    <div v-if="talent">
        <h1>{{ talent.name }}</h1>
        <p><strong>Original Name:</strong> {{ talent.original_name }}</p>
    </div>
    <div v-else>
        <p>Loading talent details...</p>
    </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import PageTitleComponent from "../../Layout/Components/PageTitleComponent.vue";
import { apiService } from '@/supabase/apiService';

export default defineComponent({
    name: "TalentDetailPage",

    components: {
        PageTitleComponent,
    },

    props: {
        id: {
            type: String,
            required: true,
        },
    },

    setup(props) {
        const heading = ref("Talent");
        const subheading = ref("Explore the Profiles of Emerging and Established Talents.");
        const icon = ref("pe-7s-user icon-gradient bg-tempting-azure");

        const talent = ref(null);

        const fetchTalent = async (id) => {
            try {
                const data = await apiService.getTalentById(id);
                talent.value = data;
            } catch (error) {
                console.error('Error fetching talent detail:', error);
            }
        };

        onMounted(async () => {
            if (props.id) {
                await fetchTalent(props.id);
                if (talent.value) {
                    heading.value += ` ${talent.value.name}`;
                }
            }
        });

        return {
            heading,
            subheading,
            icon,
            talent,
        };
    },
});
</script>
