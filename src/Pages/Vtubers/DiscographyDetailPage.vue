<template>
    <div v-if="discography">
        <h1>{{ discography.name }}</h1>
        <p><strong>Original Name:</strong> {{ discography.original_name }}</p>
        <p><strong>Released Date:</strong> {{ discography.released_date }}</p>
        <p><strong>Album ID:</strong> {{ discography.album_id }}</p>
    </div>
    <div v-else>
        <p>Loading discography details...</p>
    </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import { apiService } from '@/supabase/apiService';

export default defineComponent({
    name: "DiscographyDetailPage",

    props: {
        id: {
            type: String,
            required: true,
        },
    },

    setup(props) {
        const discography = ref(null);

        const fetchDiscography = async (id) => {
            try {
                const response = await apiService.getDiscographyById(id);
                discography.value = response;
            } catch (error) {
                console.error('Error fetching discography:', error);
            }
        };

        onMounted(() => {
            if (props.id) {
                fetchDiscography(props.id);
            }
        });

        return {
            discography,
        };
    },
});
</script>
