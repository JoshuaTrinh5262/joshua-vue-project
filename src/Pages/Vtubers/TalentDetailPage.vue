<template>
  <page-title-component
    :heading="heading"
    :subheading="subheading"
    :icon="icon"
  ></page-title-component>
  <div class="card" v-if="talent">
    <div class="card-body">
      <h1>{{ talent.name }}</h1>
      <div>
        <p><strong>Original Name:</strong> {{ talent.original_name }}</p>
      </div>
      <div>
        <img :src="imageRef" width="200" height="200" :alt="talent.name" />
      </div>
    </div>
    <div class="card-body">
      <tabs-component>
        <tab-component title="Detail">
          <div class="position-relative form-group">
            <label for="talent_id" class="">Talent Id</label>
            <input
              id="talent_id"
              class="form-control"
              v-model="talent.id"
              disabled
            />
          </div>
          <div class="position-relative form-group">
            <label for="talent_name" class="">Talent Name</label>
            <input
              id="talent_name"
              class="form-control"
              v-model="talent.name"
              disabled
            />
          </div>
          <div class="position-relative form-group">
            <label for="talent_debut_date" class="">Talent Debut Date</label>
            <input
              id="talent_debut_date"
              class="form-control"
              v-model="talent.debut_date"
              disabled
            />
          </div>
        </tab-component>
        <tab-component title="Agency">
          <div class="position-relative form-group">
            <label for="agency_id" class="">Agency Id</label>
            <input
              id="agency_id"
              class="form-control"
              v-model="talent.agency.id"
              disabled
            />
          </div>
          <div class="position-relative form-group">
            <label for="agency_name" class="">Agency Name</label>
            <input
              id="agency_name"
              class="form-control"
              v-model="talent.agency.agency_name"
              disabled
            />
          </div>
        </tab-component>
        <tab-component :title="`Discography (${talent.discography.length})`">
          <div v-for="discography in talent.discography" :key="discography.id">
            <div class="position-relative form-group">
              <label :for="`discography_${discography.id}`"
                >Discography {{ discography.id }}</label
              >
              <input
                :id="`discography_${discography.id}`"
                class="form-control"
                v-model="discography.name"
                disabled
              />
            </div>
          </div>
        </tab-component>
        <tab-component :title="`Album (${talent.album.length})`">
          <div v-for="album in talent.album" :key="album.id">
            <div class="position-relative form-group">
              <label :for="`album_${album.id}`">Album {{ album.id }}</label>
              <input
                :id="`album_${album.id}`"
                class="form-control"
                v-model="album.name"
                disabled
              />
            </div>
          </div>
        </tab-component>
        <tab-component :title="`Event (${talent.event.length})`">
          <div v-for="event in talent.event" :key="event.id">
            <div class="position-relative form-group">
              <label :for="`event_${event.id}`"
                >Event {{ event.id }}</label
              >
              <input
                :id="`event_${event.id}`"
                class="form-control"
                v-model="event.event_title"
                disabled
              />
            </div>
          </div>
        </tab-component>
      </tabs-component>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import PageTitleComponent from "../../Layout/Components/PageTitleComponent.vue";
import { apiService } from "@/supabase/apiService";
import TabsComponent from "../../Layout/Components/Tabs/TabsComponent.vue";
import TabComponent from "../../Layout/Components/Tabs/TabComponent.vue";

export default defineComponent({
  name: "TalentDetailPage",

  components: {
    PageTitleComponent,
    TabsComponent,
    TabComponent,
  },

  props: {
    id: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    const heading = ref("Talent");
    const subheading = ref(
      "Explore the Profiles of Emerging and Established Talents."
    );
    const icon = ref("pe-7s-user icon-gradient bg-tempting-azure");

    const talent = ref(null);
    const defaultImage = "/default.jpg";
    const imageRef = ref(defaultImage);
    const fetchTalent = async (id) => {
      try {
        const data = await apiService.getTalentById(id);
        talent.value = data;
      } catch (error) {
        console.error("Error fetching talent detail:", error);
      }
    };

    const preloadImage = (imageName) => {
      const preloadImage = new Image();
      preloadImage.onload = () => {
        imageRef.value = `/storage/talents/${imageName}.png`;
      };

      preloadImage.src = `/storage/talents/${imageName}.png`;
    };

    onMounted(async () => {
      if (props.id) {
        await fetchTalent(props.id);
        if (talent.value) {
          heading.value += ` ${talent.value.name}`;
          preloadImage(props.id);
        }
      }
    });

    return {
      heading,
      subheading,
      icon,
      talent,
      defaultImage,
      imageRef,
    };
  },
});
</script>
