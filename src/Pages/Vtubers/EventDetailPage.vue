<template>
    <div v-if="event">
        <h1>{{ event.name }}</h1>
        <p><strong>Original Name:</strong> {{ event.original_name }}</p>
    </div>
    <div v-else>
        <p>Loading event details...</p>
    </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import { apiService } from '@/supabase/apiService';

export default defineComponent({
    name: "EventDetailPage",

    props: {
        id: {
            type: String,
            required: true,
        },
    },

    setup(props) {
        const event = ref(null);

        const fetchEvent = async (id) => {
            try {
                const response = await apiService.getEventById(id);
                event.value = response;
            } catch (error) {
                console.error('Error fetching event detail:', error);
            }
        };

        onMounted(() => {
            if (props.id) {
                fetchEvent(props.id);
            }
        });

        return {
            event,
        };
    },
});
</script>
