<template>
  <div class="container-fluid my-3" style="background-image: url('../background.jpg'); 
              background-repeat: no-repeat; 
              background-size: cover; 
              background-position: center center; 
              min-height: 100vh;">

    <!-- Header -->
    <div class="text-center mb-3">
      <img alt="Logo" src="genesys-logo.png" style="max-height: 120px; margin-bottom: 10px;" />
      <h2>Genesys Format Deck Builder</h2>
      <p>
        <a href="/genesys">GO HERE</a> What is Genesys Format?
      </p>
    </div>

    <div class="row">
      <!-- Card Preview -->
      <div class="col-md-3 mb-3">
        <div class="card-preview">
          <template v-if="previewCard">
            <img :alt="previewCard.name" class="img-fluid mb-2" :src="previewCard.image" />
            <h5>{{ previewCard.name }}</h5>
            <p class="small">{{ previewCard.type }}</p>
            <div class="small text-muted">{{ previewCard.desc }}</div>
          </template>
          <template v-else>
            <p class="text-muted">
              Select or hover over a card to preview it here.
            </p>
          </template>
        </div>
      </div>

      <!-- Deck Controls -->
      <div class="col-md-6 mb-3">
        <div class="p-2 rounded bg-dark">
          <!-- Existing Deck Actions -->
          <div class="d-flex flex-wrap gap-2 mb-2">
            <select v-model="selectedDeck" class="form-select flex-grow-1">
              <option v-for="deck in decks" :key="deck.id" :value="deck.id">
                {{ deck.name }}
              </option>
            </select>
            <button class="btn btn-tech btn-sm" @click="saveDeck">Save</button>
            <button class="btn btn-tech btn-sm" @click="saveDeckAs">Save As</button>
            <button class="btn btn-tech btn-sm" @click="renameDeck">Rename</button>
            <button class="btn btn-tech btn-sm" @click="sortDeck">Sort</button>
            <button class="btn btn-tech btn-sm" @click="clearDeck">Clear</button>
            <button class="btn btn-tech btn-sm" @click="deleteDeck">Delete</button>
          </div>

          <!-- Create New Deck -->
          <div class="d-flex flex-wrap gap-2 mb-2">
            <input v-model="newDeckName" class="form-control form-control-sm" placeholder="New deck name" type="text" />
            <button class="btn btn-outline-success btn-sm" @click="createDeck">Create</button>
            <button class="btn btn-tech btn-sm" @click="importDeck">Import</button>
            <button class="btn btn-tech btn-sm" @click="exportDeck">Export</button>
          </div>

          <!-- Deck Score -->
          <div class="text-center text-light mb-2">
            Deck Score: {{ deckScore }}
          </div>

          <!-- Main Deck -->
          <div class="deck-row">
            <div class="deck-row-title">Main Deck ({{ mainDeck.length }})</div>
            <div class="d-flex flex-wrap justify-content-center ">
              <p v-if="!mainDeck.length" class="text-muted">Empty</p>
              <div v-for="card in mainDeck" :key="card.id" class="card-slot">
                <div style="position: relative; display: inline-block;">
                  <img :alt="card.name" title="Crusadia Testament"
                    src="https://images.ygoprodeck.com/images/cards_small/87497553.jpg"
                    style="width: 50px; height: 72px; object-fit: cover;">
                </div>
              </div>
            </div>
          </div>

          <!-- Extra Deck -->
          <div class="deck-row">
            <div class="deck-row-title">Extra Deck ({{ extraDeck.length }})</div>
            <div class="d-flex flex-wrap justify-content-center gap-2">
              <p v-if="!extraDeck.length" class="text-muted">Empty</p>
              <div v-for="card in extraDeck" :key="card.id" class="card-slot">
                <div style="position: relative; display: inline-block;">
                  <img :alt="card.name" title="Crusadia Testament"
                    src="https://images.ygoprodeck.com/images/cards_small/87497553.jpg"
                    style="width: 50px; height: 72px; object-fit: cover;">
                </div>
              </div>
            </div>
          </div>

          <!-- Side Deck -->
          <div class="deck-row">
            <div class="deck-row-title">Side Deck ({{ sideDeck.length }})</div>
            <div class="d-flex flex-wrap justify-content-center gap-2">
              <p v-if="!sideDeck.length" class="text-muted">Empty</p>
              <div v-for="card in sideDeck" :key="card.id" class="card-slot">
                <div style="position: relative; display: inline-block;">
                  <img :alt="card.name" title="Crusadia Testament"
                    src="https://images.ygoprodeck.com/images/cards_small/87497553.jpg"
                    style="width: 50px; height: 72px; object-fit: cover;">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Search + Results -->
      <div class="col-md-3 mb-3">
        <div class="results-container">
          <input v-model="searchQuery" class="form-control form-control-sm mb-2" placeholder="Search cards..."
            type="text" />
          <div v-if="apiError" class="alert alert-danger">
            {{ apiError }}
          </div>
          <!-- Search results list -->
          <div v-for="card in searchResults" :key="card.id" class="card-result-item d-flex align-items-center mb-2"
            @mouseenter="setPreview(card)" @click="setPreview(card)">
            <img :alt="card.name" class="rounded border" :src="card.image"
              style="width: 50px; height: 72px; object-fit: cover; margin-right: 8px;" />
            <div class="flex-grow-1">
              <strong>{{ card.name }}</strong>
              <div class="d-flex flex-wrap gap-1 mt-1">
                <button class="btn btn-sm btn-outline-light" @click="addToMainDeck(card)">+ Main/Extra</button>
                <button class="btn btn-sm btn-outline-secondary" @click="addToSideDeck(card)">+ Side</button>
              </div>
            </div>
          </div>
          <!-- end result item -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref } from "vue";
import PageTitleComponent from "@/Layout/Components/PageTitleComponent.vue";

export default defineComponent({
  name: "DeckBuild",

  components: {
    PageTitleComponent,
  },

  setup() {
    const decks = ref([
      { id: "1", name: "ttttt" }
    ]);

    const selectedDeck = ref("1");
    const newDeckName = ref("");
    const deckScore = ref(0);

    const mainDeck = ref([]);
    const extraDeck = ref([]);
    const sideDeck = ref([]);

    const searchQuery = ref("");
    const searchResults = ref([
      {
        id: "38459905",
        name: "F.A. Test Run",
        type: "Spell Card",
        image: "https://images.ygoprodeck.com/images/cards/38459905.jpg",
        desc: `Target 1 "F.A." monster you control; change its battle position, then, destroy 1 card on the field.
    During your Main Phase, except the turn this card was sent to the GY: You can banish this card from your GY,
    then target 1 face-up card you control; destroy it, and if you do, Special Summon 1 "F.A." monster from your Deck.
    You can only use each effect of "F.A. Test Run" once per turn.`
      },
      {
        id: "66380357",
        name: "Appliancer Test",
        type: "Monster Card",
        image: "https://images.ygoprodeck.com/images/cards_small/66380357.jpg",
        desc: "Sample monster card description."
      }
    ]);
    const apiError = ref("Error connecting to the API.");
    const previewCard = ref(null);

    function setPreview(card) {
      previewCard.value = card;
    }

    function saveDeck() {
      alert("Save current deck");
    }

    function saveDeckAs() {
      alert("Save current deck as new");
    }

    function renameDeck() {
      alert("Rename current deck");
    }

    function sortDeck() {
      alert("Sort deck cards");
    }

    function importDeck() {
      alert("Import deck");
    }

    function exportDeck() {
      alert("Export cards");
    }

    function clearDeck() {
      mainDeck.value = [];
      extraDeck.value = [];
      sideDeck.value = [];
    }

    function deleteDeck() {
      alert("Delete current deck");
    }

    function createDeck() {
      if (!newDeckName.value.trim()) {
        return
      };
      const id = Date.now().toString();
      decks.value.push({ id, name: newDeckName.value });
      selectedDeck.value = id;
      newDeckName.value = "";
    }

    function addToMainDeck(card) {
      mainDeck.value.push(card);
    }

    function addToSideDeck(card) {
      sideDeck.value.push(card);
    }

    return {
      mainDeck,
      extraDeck,
      sideDeck,
      deckScore,
      searchQuery,
      searchResults,
      decks,
      apiError,
      newDeckName,
      selectedDeck,
      setPreview,
      saveDeck,
      saveDeckAs,
      renameDeck,
      sortDeck,
      importDeck,
      exportDeck,
      clearDeck,
      deleteDeck,
      createDeck,
      addToMainDeck,
      addToSideDeck
    };
  },
});
</script>

<style scoped>
/* Modo Oscuro Consistente - 100% Sin Blancos */

html,
body {
  background-color: #121212 !important;
  color: #e0e0e0 !important;
  font-family: Arial, sans-serif;
}

h1,
h2,
h3,
h4,
h5,
h6,
p,
span,
label,
div {
  color: #e0e0e0 !important;
}

a,
a:hover,
a:visited {
  color: #bbb !important;
}

.container,
.container-fluid,
.row,
.col,
.col-md-*,
.rounded,
.border {
  background-color: #121212 !important;
  color: #e0e0e0 !important;
}

.bg-light,
.bg-white,
.bg-secondary,
.card,
.alert {
  background-color: #1c1c1c !important;
  color: #ddd !important;
  border-color: #333 !important;
}

.btn,
.btn-tech,
.btn-sm,
.btn-outline-light,
.btn-outline-secondary,
.btn-outline-success {
  background-color: #2a2a2a !important;
  color: #e0e0e0 !important;
  border: 1px solid #444 !important;
}

.btn:hover,
.btn-tech:hover {
  background-color: #3a3a3a !important;
  color: #fff !important;
}

.form-control,
.form-select {
  background-color: #1c1c1c !important;
  color: #ddd !important;
  border: 1px solid #444 !important;
}

.form-control:focus,
.form-select:focus {
  background-color: #222 !important;
  border-color: #666 !important;
  color: #fff !important;
}

.form-control::placeholder {
  color: #888 !important;
}

.card-preview {
  background-color: #1a1a1a !important;
  border: 1px solid #333 !important;
  border-radius: 8px;
  padding: 12px;
  text-align: center;
  color: #a4a !important;
}

.card-preview img {
  max-height: 220px;
  object-fit: contain;
  border-radius: 4px;
  background-color: #000 !important;
}

.card-result-item {
  background-color: #1b1b1b !important;
  border: 1px solid #333 !important;
  border-radius: 5px;
  padding: 8px;
  display: flex;
  align-items: center;
  margin-bottom: 6px;
  color: #ddd !important;
}

.card-result-item:hover {
  background-color: #252525 !important;
}

.deck-row {
  background-color: #181818 !important;
  border: 1px solid #333 !important;
  border-radius: 8px;
  padding: 8px;
  margin: 10px 0;
  text-align: center;
  color: #ddd !important;
}

.deck-row-title {
  border-bottom: 1px solid #444 !important;
  margin-bottom: 6px;
  padding-bottom: 4px;
  font-weight: bold;
  color: #e0e0e0 !important;
}

.deck-row img {
  border: 1px solid #555 !important;
  border-radius: 4px;
  cursor: pointer;
  background-color: #000 !important;
}

.results-container {
  background-color: #181818 !important;
  border: 1px solid #333 !important;
  border-radius: 8px;
  padding: 10px;
  max-height: 400px;
  overflow-y: auto;
  color: #ddd !important;
}

.alert {
  background-color: #2c2c2c !important;
  border-color: #444 !important;
  color: #ddd !important;
}

.text-muted {
  color: #ffffff !important;
}

.card-preview .text-muted {
  color: #ffffff !important;
}
</style>
