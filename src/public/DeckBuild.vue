<template>
  <div class="container-fluid" style="background-image: url('../background.jpg');">

    <!-- Header -->
    <div class="text-center mb-3">
      <img alt="Logo" src="genesys-logo.png" class="my-3" style="max-height: 120px; margin-bottom: 10px;" />
      <h2 class="text-white">Genesys Format Deck Builder</h2>
      <p class="text-white">
        What is Genesys Format? <a href="/genesys">GO HERE</a>
      </p>
    </div>

    <div class="row">
      <!-- Card Preview -->
      <div class="col-md-3 mb-3">
        <div class="card-preview">
          <template v-if="previewCard">
            <img :alt="previewCard.name" class="img-fluid mb-2" :src="previewCard.image"
              onerror="if (this.src != 'backside.jpg') this.src = 'backside.jpg';" />
            <h5>{{ previewCard.name }} <span v-if="previewCard.point && previewCard.point != 0"
                style="margin-left: 8px; font-size: 12px; padding: 2px 6px; border-radius: 6px; background-color: rgba(0, 0, 0, 0.7); color: white;">{{
                  previewCard.point }}</span>
            </h5>
            <!-- ATK / DEF (if available) -->
            <p v-if="previewCard.atk !== -1 && previewCard.def !== -1" class="small">
              ATK: {{ previewCard.atk }} / DEF: {{ previewCard.def }}
            </p>
            <!-- Type + Rank / Level -->
            <p v-if="previewCard.level != -1" class="small">{{ previewCard.type }} ★{{ previewCard.level }}</p>
            <p v-if="previewCard.category" class="small">{{ previewCard.category }}</p>
            <div class="text-muted">
              {{ previewCard.pendulum_effect }}
            </div>
            <div class="text-muted">
              {{ previewCard.description }}
            </div>
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
            <select v-model="selectedDeck" class="form-control flex-grow-1">
              <option v-for="deck in decks" :key="deck.id" :value="deck.id">
                {{ deck.name }}
              </option>
            </select>
            <button class="btn btn-tech btn-sm" @click="saveDeck">Save</button>
            <button class="btn btn-tech btn-sm" @click="saveDeckAs" disabed>Save As</button>
            <button class="btn btn-tech btn-sm" @click="renameDeck" disabed>Rename</button>
            <button class="btn btn-tech btn-sm" @click="sortDeck" disabed>Sort</button>
            <button class="btn btn-tech btn-sm" @click="clearDeck">Clear</button>
            <button class="btn btn-tech btn-sm" @click="deleteDeck" disabed>Delete</button>
          </div>

          <!-- Create New Deck -->
          <div class="d-flex flex-wrap gap-2 mb-2">
            <input v-model="newDeckName" class="form-control form-control-sm" placeholder="New deck name" type="text" />
            <button class="btn btn-outline-success btn-sm" @click="createDeck">Create</button>
            <button class="btn btn-tech btn-sm" @click="importDeck" disabled>Import .ydk</button>
            <button class="btn btn-tech btn-sm" @click="exportDeck">Export .ydk</button>
          </div>

          <!-- Deck Point -->
          <div class="text-center text-light mb-2">
            Deck Point: {{ deckPoint }}
          </div>

          <!-- Main Deck -->
          <div class="deck-row">
            <div class="deck-row-title">Main Deck ({{ mainDeck.length }})</div>
            <div class="d-flex flex-wrap justify-content-center gap-2">
              <p v-if="!mainDeck.length" class="text-muted">Empty</p>
              <div v-for="card in mainDeck" :key="card.id" class="card-slot" @mouseenter="setPreview(card)"
                @click="removeCardFromDeck(card, 'main')">
                <div style="position: relative; display: inline-block;">
                  <span v-if="card.point && card.point > 0"
                    style="position: absolute; top: -5px; left: -5px; background-color: rgba(0, 0, 0, 0.7); color: white; font-size: 12px; padding: 2px 5px; border-radius: 8px; z-index: 1;">{{
                      card.point }}</span>
                  <img :alt="card.name" :title="card.name" :src="card.image"
                    onerror="if (this.src != 'backside.jpg') this.src = 'backside.jpg';"
                    style="width: 59px; height: 86px; object-fit: cover;">
                </div>
              </div>
            </div>
            <div class="deck-row-footer">Monster {{ mainDeck.length }} | Spell {{ mainDeck.length }} | Trap {{ mainDeck.length }} </div>
          </div>

          <!-- Extra Deck -->
          <div class="deck-row">
            <div class="deck-row-title">Extra Deck ({{ extraDeck.length }})</div>
            <div class="d-flex flex-wrap justify-content-center gap-2">
              <p v-if="!extraDeck.length" class="text-muted">Empty</p>
              <div v-for="card in extraDeck" :key="card.id" class="card-slot">
                <div style="position: relative; display: inline-block;" @mouseenter="setPreview(card)"
                  @click="removeCardFromDeck(card, 'extra')">
                  <span v-if="card.point && card.point > 0"
                    style="position: absolute; top: -5px; left: -5px; background-color: rgba(0, 0, 0, 0.7); color: white; font-size: 12px; padding: 2px 5px; border-radius: 8px; z-index: 1;">{{
                      card.point }}</span>
                  <img :alt="card.name" :title="card.name" :src="card.image"
                    onerror="if (this.src != 'backside.jpg') this.src = 'backside.jpg';"
                    style="width: 59px; height: 86px; object-fit: cover;">
                </div>
              </div>
            </div>
            <div class="deck-row-footer">Xyz 0 | Fusion 0 | Synchro 0</div>
          </div>

          <!-- Side Deck -->
          <div class="deck-row">
            <div class="deck-row-title">Side Deck ({{ sideDeck.length }})</div>
            <div class="d-flex flex-wrap justify-content-center gap-2">
              <p v-if="!sideDeck.length" class="text-muted">Empty</p>
              <div v-for="card in sideDeck" :key="card.id" class="card-slot">
                <div style="position: relative; display: inline-block;" @mouseenter="setPreview(card)"
                  @click="removeCardFromDeck(card, 'side')">
                  <span v-if="card.point && card.point > 0"
                    style="position: absolute; top: -5px; left: -5px; background-color: rgba(0, 0, 0, 0.7); color: white; font-size: 12px; padding: 2px 5px; border-radius: 8px; z-index: 1;">{{
                      card.point }}</span>
                  <img :alt="card.name" :title="card.name" :src="card.image"
                    onerror="if (this.src != 'backside.jpg') this.src = 'backside.jpg';"
                    style="width: 59px; height: 86px; object-fit: cover;">
                </div>
              </div>
            </div>
            <div class="deck-row-footer">Side Deck ({{ sideDeck.length }})</div>
          </div>
        </div>
      </div>

      <!-- Search + Results -->
      <div class="col-md-3 mb-3">
        <div class="results-container">
          <input v-model="searchQuery" class="form-control form-control-sm mb-2" placeholder="Search card text here"
            type="text" />
          <div class="form-check mb-2">
            <label class="form-check-label">
              <input type="checkbox" class="form-check-input" v-model="includeDescription">Include card description
            </label>
          </div>
          <button class="btn btn-tech btn-sm mb-2" @click="searchCard">Search</button>
          <div v-if="loading" class="loading-spinner"></div>
          <div v-if="apiError" class="alert alert-danger">
            {{ apiError }}
          </div>
          <!-- Search results list -->
          <div v-for="card in searchResults" :key="card.id" class="card-result-item d-flex align-items-center mb-2"
            @mouseenter="setPreview(card)" @click="setPreview(card)">
            <img :alt="card.name" class="rounded border" :src="card.image"
              onerror="if (this.src != 'backside.jpg') this.src = 'backside.jpg';"
              style="width: 59px; height: 86px; object-fit: cover; margin-right: 8px;" />
            <div class="flex-grow-1">
              <strong>{{ card.name }}</strong>
              <span v-if="card.point && card.point != 0"
                style="margin-left: 6px; font-size: 12px; padding: 2px 5px; border-radius: 6px; background-color: rgba(0, 0, 0, 0.7); color: white;">
                {{ card.point }}</span>
              <div class="d-flex flex-wrap gap-1 mt-1">
                <button class="btn btn-sm btn-outline-light" @click="addCardToDeck(card)">+ Main/Extra</button>
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
import { defineComponent, onMounted, ref } from "vue";
import PageTitleComponent from "@/Layout/Components/PageTitleComponent.vue";
import { parseYugiohDeckFile } from "@/utils/fileHelper";
import { apiService } from "@/supabase/apiService";
import genesysPoints from "@/utils/genesys.js";

export default defineComponent({
  name: "DeckBuild",

  components: {
    PageTitleComponent,
  },

  setup() {
    const decks = ref([]);

    const selectedDeck = ref(null);
    const newDeckName = ref("");
    const deckPoint = ref(0);

    const mainDeck = ref([]);
    const extraDeck = ref([]);
    const sideDeck = ref([]);
    const savedDecks = ref({});

    const searchQuery = ref("");
    const includeDescription = ref(false);
    const searchResults = ref([]);
    const loading = ref(false);
    const apiError = ref(null);
    const previewCard = ref(null);

    function setPreview(card) {
      previewCard.value = card;
    }

    function saveDeck() {
      const deckData = {
        main: mainDeck.value,
        extra: extraDeck.value,
        side: sideDeck.value,
      };

      localStorage.setItem("decks", JSON.stringify(deckData));
      alert("Deck saved successfully!");

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
      alert("Deck Imported");
    }

    function exportDeck() {
      if (!selectedDeck.value) {
        alert("Please select your deck to export");
        return;
      }
      const mainLines = mainDeck.value.map(card => card.passcode.toString()).join("\n");
      const extraLines = extraDeck.value.map(card => card.passcode.toString()).join("\n");
      const sideLines = sideDeck.value.map(card => card.passcode.toString()).join("\n");

      // Build YDK text
      const ydkContent = [
        `#main`,
        mainLines,
        `#extra`,
        extraLines,
        `!side`,
        sideLines,
        `` // extra newline at end
      ].join("\n");

      // Create a Blob and download it
      const blob = new Blob([ydkContent], { type: "text/plain" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      console.log(selectedDeck.value);
      a.download = `${selectedDeck.value}.ydk`;
      a.click();

      URL.revokeObjectURL(url);
      alert("Export cards");
    }

    function clearDeck() {
      if (mainDeck.value.length === 0 && extraDeck.value.length === 0 && sideDeck.value.length === 0) {
        return;
      }

      const confirmed = confirm("Are you sure you want to clear your deck? This action cannot be undone.");

      if (confirmed) {
        mainDeck.value = [];
        extraDeck.value = [];
        sideDeck.value = [];
      }
    }

    function deleteDeck() {
      const confirmed = confirm("Are you sure you want to delete your deck? This action cannot be undone.");

      if (confirmed) {
        localStorage.removeItem("decks");
        mainDeck.value = [];
        extraDeck.value = [];
        sideDeck.value = [];
      }
    }

    const searchCard = async () => {
      if (searchQuery.value == "") {
        return;
      }

      loading.value = true;
      const result = await apiService.searchCard(searchQuery.value, includeDescription.value);
      console.log(result);
      if (!result.error) {

        const withPoints = result.map(card => ({
          ...card,
          point: genesysPoints[card.name] ?? 0
        }));

        searchResults.value = withPoints;
      } else {
        apiError.value = "Error connecting to the API.";
      }
      loading.value = false;
    }

    const clearSearch = async () => {
      searchQuery.value = "";
      searchResults.value = [];
    }

    function createDeck() {
      if (!newDeckName.value.trim()) {
        alert(`new Deck Name must not be empty`);
        return;
      };

      const id = Date.now().toString();
      decks.value.push({ id, name: newDeckName.value });
      selectedDeck.value = id;
      newDeckName.value = "";
    }

    function addCardToDeck(card) {
      const totalCopies = countCardCopies(card.passcode);

      if (totalCopies >= 3) {
        alert(`${card.name} already has 3 copies in your deck`);
        return;
      }

      if (card.is_link || card.is_pendulum) {
        alert(`cannot add pendulum or link monster`);
        return;
      }

      const cardPoints = genesysPoints[card.name] ?? 0;
      deckPoint.value += cardPoints;

      if (card.is_fusion || card.is_xyz || card.is_synchro) {
        addToExtraDeck(card)
      } else {
        addToMainDeck(card)
      }
    }

    function removeCardFromDeck(card, deckType) {
      let index = -1;

      switch (deckType) {
        case 'main':
          index = mainDeck.value.findIndex(c => c.passcode === card.passcode);

          if (index !== -1) {
            mainDeck.value.splice(index, 1);
          }
          break;
        case 'extra':
          index = extraDeck.value.findIndex(c => c.passcode === card.passcode);

          if (index !== -1) {
            extraDeck.value.splice(index, 1);
          }
          break;
        case 'side':
          index = sideDeck.value.findIndex(c => c.passcode === card.passcode);

          if (index !== -1) {
            sideDeck.value.splice(index, 1);
          }
          break;
        default:
          alert(`Unknown deck type: ${deckType}`);
          break;
      }
    }

    function addToMainDeck(card) {
      if (mainDeck.value.length >= 60) {
        alert("main deck is max size");
        return;
      }
      mainDeck.value.push(card);
    }

    function addToExtraDeck(card) {
      if (extraDeck.value.length >= 15) {
        alert("extra deck is max size");
        return;
      }
      extraDeck.value.push(card);
    }

    function addToSideDeck(card) {
      const totalCopies = countCardCopies(card.passcode);

      if (totalCopies >= 3) {
        alert(`${card.name} already has 3 copies in your deck`);
        return;
      }

      if (sideDeck.value.length >= 15) {
        alert("side seck is max size");
        return;
      }
      sideDeck.value.push(card);
    }

    function countCardCopies(passcode) {
      const mainCount = mainDeck.value.filter(c => c.passcode === passcode).length;
      const extraCount = extraDeck.value.filter(c => c.passcode === passcode).length;
      const sideCount = sideDeck.value.filter(c => c.passcode === passcode).length;
      return mainCount + extraCount + sideCount;
    }

    onMounted(() => {
      const saved = localStorage.getItem("decks");
      if (saved) {
        const deckData = JSON.parse(saved);
        mainDeck.value = deckData.main || [];
        extraDeck.value = deckData.extra || [];
        sideDeck.value = deckData.side || [];
      }
    });

    return {
      mainDeck,
      extraDeck,
      sideDeck,
      deckPoint,
      searchQuery,
      includeDescription,
      searchResults,
      decks,
      loading,
      apiError,
      newDeckName,
      selectedDeck,
      previewCard,
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
      searchCard,
      clearSearch,
      addCardToDeck,
      addToSideDeck,
      removeCardFromDeck
    };
  },
});
</script>

<style scoped>
.btn,
.btn-tech,
.btn-sm,
.btn-outline-light,
.btn-outline-secondary,
.btn-outline-success {
  background-color: #2a2a2a;
  color: #e0e0e0;
  border: 1px solid #555;
}

.btn:hover,
.btn-tech:hover {
  background-color: #3a3a3a;
  color: #fff;
}

.form-control,
.form-select {
  background-color: #1c1c1c;
  color: #ddd;
  border: 1px solid #555;
}

.form-control:focus,
.form-select:focus {
  background-color: #222;
  border-color: #555;
  color: #fff;
}

.form-control::placeholder {
  color: #888;
}

.card-preview {
  background-color: #1a1a1a;
  border: 1px solid #555;
  border-radius: 8px;
  padding: 12px;
  text-align: center;
  color: #fff;
}

.card-preview img {
  max-height: 220px;
  object-fit: contain;
  border-radius: 4px;
  background-color: #000;
}

.card-result-item {
  background-color: #1b1b1b;
  border: 1px solid #555;
  border-radius: 5px;
  padding: 8px;
  display: flex;
  align-items: center;
  margin-bottom: 6px;
  color: #ddd;
}

.card-result-item:hover {
  background-color: #252525;
}

.deck-row {
  background-color: #181818;
  border: 1px solid #333;
  border-radius: 8px;
  padding: 8px;
  margin: 10px 0;
  text-align: center;
  color: #ddd;

  img {
    border: 1px solid #555;
    border-radius: 4px;
    cursor: pointer;
    background-color: #000;
  }
}

.deck-row-title {
  border-bottom: 1px solid #555;
  margin-bottom: 6px;
  padding-bottom: 4px;
  font-weight: bold;
  color: #e0e0e0;
}

.deck-row-footer {
  border-top: 1px solid #555;
  margin-top: 6px;
  padding-top: 4px;
  text-align: right;
  font-weight: bold;
  color: #e0e0e0;
}

.results-container {
  background-color: #181818;
  border: 1px solid #333;
  border-radius: 8px;
  padding: 10px;
  max-height: 500px;
  overflow-y: auto;
  color: #ddd;
}

.alert {
  background-color: #2c2c2c;
  border-color: #555;
  color: #ddd;
}

.text-muted {
  color: #ffffff;
}

.card-preview .text-muted {
  color: #ffffff;
}

.gap-2 {
  gap: 0.5em;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  margin: 16px auto;
  border: 4px solid #ccc;
  border-top: 4px solid #333;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
