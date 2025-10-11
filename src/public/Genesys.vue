<template>
  <div class="genesys-page">
    <div class="container-fluid" style="background-image: url('../background.jpg'); ">
      <div class="text-center mb-3">
        <img alt="Logo" src="genesys-logo.png" class="my-3" style="max-height: 120px; margin-bottom: 10px;" />
      </div>
      <div class="intro">
        <h1 class="text-center">Yu-Gi-Oh! GENESYS</h1>
        <h2 class="text-center">WHAT IS GENESYS?</h2>
        <p class="text-center">
          Want to build Genesys Decks or modify your existing Decks. <a href="/deckbuild">GO HERE</a>
        </p>
        <div class="information">
          <div class="information-title">
            The Genesys rules are simple:
          </div>
          <ol>
            <li class="mb-2">No Link Monsters or Pendulum Monsters are allowed. All other cards are allowed. The
              original field layout
              is
              used, with no Extra Monster Zones nor Pendulum Zones.</li>
            <li class="mb-2">The standard Forbidden & Limited Cards list is not used. All those cards can be used,
              except Link Monsters
              and Pendulum Monsters. Usual limit of 3 copies max of any card still applies.</li>
            <li class="mb-2">Deck construction uses a point system. Some cards are assigned a point value; most cards
              cost zero points.
              The total point cost of cards in your Main Deck, Extra Deck, and Side Deck (combined) cannot exceed the
              point
              cap for that event.</li>
            <li class="mb-2">The standard point cap is 100, but events can be run with any point cap, or even a
              zero-point cap!
              Official Tournament Stores can set their own caps for their tournaments.</li>
          </ol>
        </div>
      </div>

      <div class="card-list">
        <table-component :footer=true :fields="fields" :items="items" :showAction="false"
          :showSearch="false"></table-component>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import TableComponent from "@/Layout/Components/TableComponent.vue";
import { apiService } from "@/supabase/apiService";

export default defineComponent({
  name: "GenesysPage",

  components: {
    TableComponent,

  },

  data() {
    const items = ref([]);
    const deckListUrl = "https://registration.yugioh-card.com";
    const strategyGuideUrl = "https://yugiohblog.konami.com";
    const fields = ref([
      {
        key: "name",
        value: "CARD NAME"
      },
      {
        key: "passcode",
        value: "PASSCODE"
      },
      {
        key: "point",
        value: "CARD POINT"
      },
    ]);

    const getGenesysPoints = async () => {
      const result = await apiService.getGenesysPoints();
      if (!result.error) {
        items.value = result;
      }
    };

    onMounted(async () => {
      await getGenesysPoints();
    });

    return {
      items,
      deckListUrl,
      strategyGuideUrl,
      fields
    };
  },
});
</script>

<style scoped>
.genesys-page {
  margin: 0 auto;
  color: white;
  font-family: sans-serif;
}

.main-nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
}

.main-nav li {
  margin-right: 1rem;
}

.intro img {
  width: 100%;
  height: auto;
  margin-bottom: 1rem;
}

.card-list ul {
  list-style: none;
  padding: 0;
}

.card-list li {
  margin-bottom: 0.5rem;
}
</style>
