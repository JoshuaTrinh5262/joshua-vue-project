<template>
  <page-title-component
    :heading="heading"
    :subheading="subheading"
    :icon="icon"
  ></page-title-component>
  <div class="card main-card">
    <div class="card-body">
      <div class="card-title">Deck Name: {{ deckDetail?.name }}</div>
    </div>
    <div v-if="deckDetail?.yugioh_deck_card.length > 0">
      <ul
        v-for="card in deckDetail.yugioh_deck_card"
        :key="card.id"
        class="list-group list-group-flush"
      >
        <li class="list-group-item">
          <div class="widget-content p-0">
            <div class="widget-content-wrapper">
              <div class="widget-content-left mr-3">
                <div class="widget-content-left">
                  <img
                    width="42"
                    class="rounded"
                    src="/photo-coming-soon-holder.png"
                    alt=""
                  />
                </div>
              </div>
              <div class="widget-content-left">
                <div class="widget-heading">
                  Card Name: <b> {{ card.yugioh_card.name }}</b>
                </div>
                <div class="widget-subheading opacity-10">
                  <span class="pr-2">
                    Quantity <b>{{ card.quantity }}</b></span
                  >
                  <span>
                    Category
                    <b class="text-success">{{
                      card.yugioh_card.category
                        ? card.yugioh_card.category
                        : "NONE"
                    }}</b></span
                  >
                </div>
              </div>
              <div class="widget-content-right text-right mr-3">
                <div>
                  Quantity <b>{{ card.quantity }}</b>
                </div>
                <div>
                  Slot <b>{{ card.category }}</b>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import PageTitleComponent from "../../../Layout/Components/PageTitleComponent.vue";
import { apiService } from "@/supabase/apiService";

export default defineComponent({
  name: "DeckDetailPage",

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
    const heading = ref("Deck Detail");
    const subheading = ref("Deck Detail Page");
    const icon = ref("pe-7s-portfolio icon-gradient bg-tempting-azure");

    const deckDetail = ref(null);

    const fetchDeck = async (id) => {
      try {
        const response = await apiService.getYugiohDeckById(id);
        deckDetail.value = response;
      } catch (error) {
        console.error("Error fetching deck:", error);
      }
    };

    onMounted(async () => {
      if (props.id) {
        await fetchDeck(props.id);
      }
    });

    return {
      heading,
      subheading,
      icon,
      deckDetail,
    };
  },
});
</script>
