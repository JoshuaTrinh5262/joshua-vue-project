<template>
  <page-title-component
    :heading="heading"
    :subheading="subheading"
    :icon="icon"
  ></page-title-component>
  <notification-component
    v-model:notification="notification"
  ></notification-component>
  <div class="card" v-if="album">
    <div class="card-body">
      <h1>{{ album.name }}</h1>
      <div>
        <p><strong>Original Name:</strong> {{ album.name }}</p>
      </div>
      <div>
        <img :src="imageRef" width="300" height="300" :alt="album.name" />
      </div>
    </div>
    <div class="card-body">
      <tabs-component>
        <tab-component :title="`Tracklist (${album.tracklist.length})`">
          <album-tracklist-component
            :tracksData="album.tracklist"
            :isEditMode="isEditMode"
            @toggleEditMode="toggleEdit"
            @updateTracklist="handleUpdateTrackList"
          ></album-tracklist-component>
        </tab-component>
      </tabs-component>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import PageTitleComponent from "@/Layout/Components/PageTitleComponent.vue";
import { apiService } from "@/supabase/apiService";
import TabsComponent from "@/Layout/Components/Tabs/TabsComponent.vue";
import TabComponent from "@/Layout/Components/Tabs/TabComponent.vue";
import AlbumTracklistComponent from "@/Layout/Components/AlbumTracklistComponent.vue";
import NotificationComponent from "@/Layout/Components/NotificationComponent.vue";

export default defineComponent({
  name: "AlbumDetailPage",

  components: {
    PageTitleComponent,
    TabsComponent,
    TabComponent,
    AlbumTracklistComponent,
    NotificationComponent,
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
    const icon = ref("pe-7s-user icon-gradient bg-tempting-azure");

    const album = ref(null);
    const defaultImage = "/default.jpg";
    const imageRef = ref(defaultImage);
    const isEditMode = ref(false);
    const notification = ref(null);

    const fetchAlbum = async (id) => {
      try {
        const response = await apiService.getAlbumById(id);
        album.value = response;
      } catch (error) {
        console.error("Error fetching album:", error);
      }
    };

    const handleUpdateTrackList = async (updatedTracks) => {
      try {
        const response = await apiService.updateAlbumTracklist(
          props.id,
          updatedTracks
        );

        if (response && !response.error) {
          notification.value = {
            title: "Success",
            content: "Update album's tracklist successfully!",
            type: "success",
          };
          toggleEdit();
        }
      } catch (err) {
        console.error(err);
        notification.value = {
          title: "Error",
          content: `Error when update album's tracklist: ${error}`,
          type: "danger",
        };
      }
    };

    const toggleEdit = () => {
      isEditMode.value = !isEditMode.value;
    };

    const preloadImage = (imageName) => {
      const preloadImage = new Image();
      preloadImage.onload = () => {
        imageRef.value = `/storage/albums/${imageName}.png`;
      };

      preloadImage.src = `/storage/albums/${imageName}.png`;
    };

    onMounted(async () => {
      if (props.id) {
        await fetchAlbum(props.id);
        if (album.value) {
          heading.value += ` ${album.value.name}`;
          preloadImage(props.id);
        }
      }
    });

    return {
      heading,
      subheading,
      icon,
      album,
      imageRef,
      isEditMode,
      notification,
      toggleEdit,
      handleUpdateTrackList,
    };
  },
});
</script>
