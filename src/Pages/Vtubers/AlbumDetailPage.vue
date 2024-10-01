<template>
    <div v-if="album">
        <h1>{{ album.name }}</h1>
    
    </div>
    <div v-else>
        <p>Loading album details...</p>
    </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import { apiService } from '@/supabase/apiService';

export default defineComponent({
    name: "AlbumDetailPage",

    props: {
        id: {
            type: String,
            required: true,
        },
    },

    setup(props) {
        const album = ref(null);

        const fetchAlbum = async (id) => {
            try {
                const response = await apiService.getAlbumById(id);
                album.value = response;
            } catch (error) {
                console.error('Error fetching album:', error);
            }
        };

        onMounted(() => {
            if (props.id) {
                fetchAlbum(props.id);
            }
        });

        return {
            album,
        };
    },
});
</script>
