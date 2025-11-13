<template>
  <div class="card" v-if="card">
    <div class="card-body">
      <div class="row">
        <div class="col-4">
          <img :src="card.image_url" :alt="card.name" width="320"
            onerror="if (this.src != '/backside.jpg')  this.src = '/backside.jpg';" />
        </div>
        <div class="col-8">
          <h1>{{ card.name }}</h1>
          <p><strong> Card Category:</strong> {{ card.category }}</p>
          <div class="information">
            <div class="information-title"> Card Description:</div>
            {{ card.description }}
          </div>
          <div class="information">
            <div class="information-title"> Card pendulum_effect:</div>
            {{ card.pendulum_effect }}
          </div>
        </div>

      </div>
    </div>
    <div class="card-body">
      <h5>Detail</h5>
      <div class="position-relative form-group">
        <label for="card_id" class="">card Id</label>
        <input id="card_id" class="form-control" v-model="card.id" disabled />
      </div>
      <div class="position-relative form-group">
        <label for="card_passcode" class="">card passcode</label>
        <input id="card_passcode" class="form-control" v-model="card.passcode" disabled />
      </div>
      <div class="position-relative form-group">
        <label for="card_name" class="">card Name</label>
        <input id="card_name" class="form-control" v-model="card.name" disabled />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import { useRoute } from 'vue-router';
import { apiService } from "@/supabase/apiService";

export default defineComponent({
  name: "cardDetailPage",

  components: {
  },

  setup() {
    const route = useRoute();

    const card = ref(null);
    const fetchcard = async (id) => {
      try {
        const data = await apiService.getYugiohCardById(id);
        console.log(data);

        card.value = {
          ...data,
          image_url: `https://images.ygoprodeck.com/images/cards/${data.passcode}.jpg`
        }
      } catch (error) {
        console.error("Error fetching card detail:", error);
      }
    };

    onMounted(async () => {
      if (route.params.id) {
        await fetchcard(route.params.id);
      }
    });

    return {
      card,
    };
  },
});
</script>
