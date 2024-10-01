<template>
    <div v-if="agency">
        <h1>{{ agency }}</h1>
    </div>
    <div v-else>
        <p>Loading agency details...</p>
    </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import { apiService } from '@/supabase/apiService';

export default defineComponent({
    name: "AgencyDetailPage",

    props: {
        id: {
            type: String,
            required: true,
        },
    },

    setup(props) {
        const agency = ref(null);

        const fetchAgency = async (id) => {
            try {
                const response = await apiService.getAgencyById(id);
                agency.value = response;
            } catch (error) {
                console.error('Error fetching agency:', error);
            }
        };

        onMounted(() => {
            if (props.id) {
                fetchAgency(props.id);
            }
        });

        return {
            agency,
        };
    },
});
</script>
