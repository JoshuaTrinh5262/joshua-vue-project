<template>
  <div class="genesys-page">
    <div class="container-fluid" style="background-image: url('../background.jpg'); ">
      <div class="text-center mb-3">
        <img alt="Genesys Logo" class="genesys-logo" src="genesys-logo.png" />
      </div>
      <div class="genesys-intro">
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
            <li>No Link Monsters or Pendulum Monsters are allowed. All other cards are allowed.
              The original field layout is used, with no Extra Monster Zones nor Pendulum Zones.</li>
            <li>The standard Forbidden & Limited Cards list is not used. All those cards can be used,
              except Link Monsters
              and Pendulum Monsters. Usual limit of 3 copies max of any card still applies.</li>
            <li>Deck construction uses a point system. Some cards are assigned a point value; most cards
              cost zero points.
              The total point cost of cards in your Main Deck, Extra Deck, and Side Deck (combined) cannot exceed the
              point
              cap for that event.</li>
            <li>The standard point cap is 100, but events can be run with any point cap, or even a
              zero-point cap!
              Official Tournament Stores can set their own caps for their tournaments.</li>
          </ol>
        </div>
      </div>
      <div class="genesys-points">
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
      const genesysPoints = localStorage.getItem("genesysPoints");
      if (genesysPoints) {
        items.value = JSON.parse(genesysPoints);
        return;
      }

      const result = await apiService.getGenesysPoints();
      if (!result.error) {
        items.value = result;

        localStorage.setItem("genesysPoints", JSON.stringify(result));
      }

    };

    onMounted(async () => {
      await getGenesysPoints();
    });

    return {
      items,
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

  .genesys-logo {
    max-height: 120px;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  .genesys-intro img {
    width: 100%;
    height: auto;
    margin-bottom: 1rem;
  }

  .genesys-intro li {
    margin-bottom: 0.5rem;
  }
}
</style>
