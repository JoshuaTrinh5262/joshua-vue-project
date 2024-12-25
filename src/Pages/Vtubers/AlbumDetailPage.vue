<template>
    <page-title-component :heading="heading" :subheading="subheading" :icon="icon"></page-title-component>

    <div v-if="album">
        <div>
            <input type="file" @change="handleFileChange" />
            <button @click="handleFileUpload">Upload</button>

            <div v-if="imageUrl">
                <img :src="imageUrl" width="200" height="200" :alt="album.name" />
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
import PageTitleComponent from "../../Layout/Components/PageTitleComponent.vue";
import { apiService } from '@/supabase/apiService';
import { storageService } from "../../supabase/storageService";

export default defineComponent({
    name: "AlbumDetailPage",

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
        const heading = ref("Album");
        const subheading = ref("Album");
        const icon = ref("pe-7s-user icon-gradient bg-premium-dark");

        const album = ref(null);
        const file = ref(null);
        const imageUrl = ref('');

        const handleFileChange = (e) => {
            file.value = e.target.files[0];
        };

        const handleFileUpload = async () => {
            if (file.value) {
                try {
                    await storageService.uploadImage(file.value, props.id, "album");
                    loadImage(props.id);
                } catch (error) {
                    console.error('Error uploading image:', error);
                }
            }
        };

        const fetchAlbum = async (id) => {
            try {
                const response = await apiService.getAlbumById(id);
                album.value = response;
                if (response) {
                    await loadImage(id);
                }
            } catch (error) {
                console.error('Error fetching album:', error);
            }
        };

        const loadImage = async (albumId) => {
            try {
                const imagePublicUrl = await storageService.getSignedImageUrl('album', albumId);
                if (imagePublicUrl) {
                    imageUrl.value = imagePublicUrl;
                }
            } catch (error) {
                console.error('Error loading existing image:', error);
            }
        };

        onMounted(async () => {
            if (props.id) {
                await fetchAlbum(props.id);
                if (album.value) {
                    heading.value += ` ${album.value.name}`;
                }
            }
        });

        return {
            heading,
            subheading,
            icon,
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
