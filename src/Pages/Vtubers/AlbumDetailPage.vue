<template>
    <div v-if="album">
        <div>
            <input type="file" @change="handleFileChange" />
            <button @click="handleFileUpload">Upload</button>

            <div v-if="imageUrl">
                <img :src="imageUrl" alt="Uploaded Image" />
            </div>
            <div v-else>
                <p>No image uploaded yet.</p>
            </div>
        </div>
        <h1>{{ album.name }}</h1>

    </div>
    <div v-else>
        <p>Loading album details...</p>
    </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import { apiService } from '@/supabase/apiService';
import { storageService } from "../../supabase/storageService";

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
        const file = ref(null);
        const imageUrl = ref('');

        const handleFileChange = (e) => {
            file.value = e.target.files[0];
        };

        const handleFileUpload = async () => {
            if (file.value) {
                try {
                    const uploadResult = await storageService.uploadImage(file.value, props.id, "album");
                    imageUrl.value = await storageService.getImageUrl("album", uploadResult.Key);
                } catch (error) {
                    console.error('Error uploading image:', error);
                }
            }
        };
        const fetchAlbum = async (id) => {
            try {
                const response = await apiService.getAlbumById(id);
                album.value = response;
                loadImage(id)
            } catch (error) {
                console.error('Error fetching album:', error);
            }
        };

        const loadImage = async (albumId) => {
            try {
                const imagePublicUrl = storageService.getImageUrl('album', albumId);
                if (imagePublicUrl) {
                    imageUrl.value = imagePublicUrl;
                }
            } catch (error) {
                console.error('Error loading existing image:', error);
            }
        };

        onMounted(() => {
            if (props.id) {
                fetchAlbum(props.id);
            }
        });

        return {
            album,
            file,
            imageUrl,
            handleFileChange,
            handleFileUpload,
            loadImage
        };
    },
});
</script>
