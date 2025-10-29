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

    <div class="deckbuild row">
      <!-- Card Preview -->
      <div class="col-md-3 mb-3">
        <div class="card-preview">
          <template v-if="cardPreview">
            <img :alt="cardPreview.name" class="img-fluid mb-2" :src="cardPreview.image"
              onerror="if (this.src != 'backside.jpg') this.src = 'backside.jpg';" />
            <h5>{{ cardPreview.name }} <span v-if="cardPreview.point && cardPreview.point != 0"
                style="margin-left: 8px; font-size: 12px; padding: 2px 6px; border-radius: 6px; background-color: rgba(0, 0, 0, 0.7); color: white;">{{
                  cardPreview.point }}</span>
            </h5>
            <!-- ATK / DEF (if available) -->
            <p v-if="cardPreview.atk !== -1 && cardPreview.def !== -1" class="small">
              ATK: {{ cardPreview.atk }} / DEF: {{ cardPreview.def }}
            </p>
            <!-- Passcode (if available) -->
            <p v-if="cardPreview.passcode" class="small">
              {{ cardPreview.passcode }}
            </p>
            <!-- Type + Rank / Level -->
            <p v-if="cardPreview.level != -1" class="small">{{ cardPreview.type }} ★{{ cardPreview.level }}</p>
            <p v-if="cardPreview.category" class="small">{{ cardPreview.category }}</p>
            <div class="information" v-if="cardPreview.pendulum_effect">
              <div class="information-title">Pendulum Effect</div>
              {{ cardPreview.pendulum_effect }}
            </div>
            <div class="information" v-if="cardPreview.description">
              <div class="information-title">Card Description</div>
              {{ cardPreview.description }}
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
        <div class="deck-control p-2 rounded">
          <!-- Existing Deck Actions -->
          <div class="d-flex flex-wrap gap-2 mb-2">
            <select v-model="selectedDeck" class="form-control form-control-sm flex-grow-1" @change="changeDeck">
              <option v-for="deck in decks" :key="deck" :value="deck">
                {{ deck }}
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
            <input v-model="newDeckName" class="form-control form-control-sm" placeholder="New deck name" type="text"
              @input="newDeckName = newDeckName.replace(/[^a-zA-Z0-9 _-]/g, '')" />
            <input type="file" ref="fileInput" accept=".ydk" style="display: none" @change="importDeck" />
            <button class="btn btn-outline-success btn-sm" @click="createDeck">Create</button>
            <button class="btn btn-tech btn-sm" @click="triggerFilePicker">Import .ydk</button>
            <button class="btn btn-tech btn-sm" @click="exportDeck">Export .ydk</button>
          </div>

          <!-- Deck Point -->
          <div class="text-center text-light mb-2">
            Deck Point: {{ deckPoints }}
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
            <div class="deck-row-footer">
              Monster {{ mainDeckCounts.Monster }} | Spell {{ mainDeckCounts.Spell }} | Trap {{ mainDeckCounts.Trap }}
            </div>
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
            <div class="deck-row-footer">
              Xyz {{ extraDeckCounts.Xyz }} | Fusion {{ extraDeckCounts.Fusion }} | Synchro {{ extraDeckCounts.Synchro
              }}
            </div>
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
            <div class="deck-row-footer">
              Monster {{ sideDeckCounts.Monster }} | Spell {{ sideDeckCounts.Spell }} | Trap {{ sideDeckCounts.Trap }}
            </div>
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
import { defineComponent, onMounted, ref, computed } from "vue";
import PageTitleComponent from "@/Layout/Components/PageTitleComponent.vue";
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
    const deckPoints = ref(0);

    const fileInput = ref(null);
    const mainDeck = ref([]);
    const extraDeck = ref([]);
    const sideDeck = ref([]);
    const savedDecks = ref([]);

    const searchQuery = ref("");
    const includeDescription = ref(false);
    const searchResults = ref([]);
    const loading = ref(false);
    const apiError = ref(null);
    const cardPreview = ref(null);

    const mainDeckCounts = computed(() => {
      const counts = { Monster: 0, Spell: 0, Trap: 0 };

      for (const card of mainDeck.value) {
        switch (card.category) {
          case "Monster":
            counts.Monster++;
            break;
          case "Spell":
            counts.Spell++;
            break;
          case "Trap":
            counts.Trap++;
            break;
          default:
            break;
        }
      }

      return counts;
    });

    const sideDeckCounts = computed(() => {
      const counts = { Monster: 0, Spell: 0, Trap: 0 };

      for (const card of sideDeck.value) {
        switch (card.category) {
          case "Monster":
            counts.Monster++;
            break;
          case "Spell":
            counts.Spell++;
            break;
          case "Trap":
            counts.Trap++;
            break;
          default:
            break;
        }
      }

      return counts;
    });

    const extraDeckCounts = computed(() => {
      const counts = {
        Fusion: 0,
        Synchro: 0,
        Xyz: 0,
        Link: 0,
      };

      for (const card of extraDeck.value) {
        let type = null;

        switch (true) {
          case card.is_fusion:
            type = "Fusion";
            break;
          case card.is_synchro:
            type = "Synchro";
            break;
          case card.is_xyz:
            type = "Xyz";
            break;
          case card.is_link:
            type = "Link";
            break;
          default:
            break;
        }

        if (type) {
          counts[type]++;
        }
      }

      return counts;
    });

    function setPreview(card) {
      cardPreview.value = card;
    }

    function saveDeck() {
      if (!Array.isArray(savedDecks.value)) {
        savedDecks.value = [];
      }

      const deckData = {
        name: selectedDeck.value,
        main: [...mainDeck.value],
        extra: [...extraDeck.value],
        side: [...sideDeck.value],
      };

      // Find existing deck by name
      const index = savedDecks.value.findIndex(deck => deck.name === selectedDeck.value);

      if (index !== -1) {
        // Update existing deck
        savedDecks.value[index] = deckData;
        alert(`Deck "${selectedDeck.value}" updated successfully!`);
      } else {
        // Add new deck if not found
        savedDecks.value.push(deckData);
        alert(`Deck "${selectedDeck.value}" saved successfully!`);
      }

      // Save to localStorage
      localStorage.setItem("decks", JSON.stringify(savedDecks.value));
    }

    function saveDeckAs() {
      const newName = prompt("Enter a new name for your deck:");

      if (newName === null) {
        // User cancelled the prompt
        return;
      }

      if (newName === selectedDeck.value) {
        alert("New deck name cannot be the same as the current deck name.");
        return;
      }

      selectedDeck.value = newName;
      decks.value.push(newName);

      const deckData = {
        name: newName,
        main: [...mainDeck.value],
        extra: [...extraDeck.value],
        side: [...sideDeck.value],
      };
      savedDecks.value.push(deckData);

      // Save to localStorage
      localStorage.setItem("decks", JSON.stringify(savedDecks.value));

      alert(`Save current deck as "${newName}".`);
    }

    function renameDeck() {
      if (!selectedDeck.value) {
        alert("Please select a deck to rename.");
        return;
      }

      const newName = prompt("Enter a new name for your deck:", selectedDeck.value);

      if (newName === null) {
        return;
      }

      const trimmedName = newName.trim();
      if (trimmedName === "") {
        alert("Deck name cannot be empty!");
        return;
      }

      const nameExists = savedDecks.value.some(
        (deck) => deck.name === trimmedName
      );
      if (nameExists) {
        alert(`A deck named "${trimmedName}" already exists!`);
        return;
      }

      const confirmed = confirm(`Rename deck "${selectedDeck.value}" to "${trimmedName}"?`);
      if (!confirmed) {
        return;
      }

      const index = savedDecks.value.findIndex((deck) => deck.name === selectedDeck.value);

      if (index === -1) {
        alert("Deck not found!");
        return;
      }

      savedDecks.value[index].name = trimmedName;
      selectedDeck.value = trimmedName;

      localStorage.setItem("decks", JSON.stringify(savedDecks.value));

      decks.value = savedDecks.value.map((deck) => deck.name);

      alert(`Deck renamed to "${trimmedName}" successfully!`);
    }

    function sortDeck() {
      const typeOrder = ["Monster", "Spell", "Trap"];
      const sortByTypeThenName = (a, b) => {
        const typeDiff = typeOrder.indexOf(a.type) - typeOrder.indexOf(b.type);
        if (typeDiff !== 0) {
          return typeDiff;
        }
        return a.name.localeCompare(b.name);
      };

      mainDeck.value = mainDeck.value.sort(sortByTypeThenName);
      extraDeck.value = extraDeck.value.sort(sortByTypeThenName);
      sideDeck.value = sideDeck.value.sort(sortByTypeThenName);

      alert("Deck sorted by type and name!");
    }

    function triggerFilePicker() {
      fileInput.value.click();
    }

    async function importDeck(event) {
      const file = event.target.files[0];
      if (!file) {
        return;
      }

      const fileName = file.name.replace(/\.[^/.]+$/, "");
      const text = await file.text();

      // --- Step 1: Parse file sections ---
      const sections = { main: [], extra: [], side: [] };
      let current = null;

      for (const line of text.split("\n").map(l => l.trim()).filter(Boolean)) {
        if (line.startsWith("#main")) {
          current = "main";
        }
        else if (line.startsWith("#extra")) {
          current = "extra";
        }
        else if (line.startsWith("!side")) {
          current = "side";
        }
        else if (/^\d+$/.test(line) && current) {
          sections[current].push(line);
        }
      }

      // --- Step 2: Extract unique passcodes ---
      const uniquePasscodes = [
        ...new Set([
          ...sections.main,
          ...sections.extra,
          ...sections.side,
        ]),
      ];

      // --- Step 3: Fetch card data from Supabase ---
      const { data: cards, error } = await apiService.getYugiohCards(uniquePasscodes);

      const cardWithPoints = cards.map(card => ({
        ...card,
        point: genesysPoints[card.name] ?? 0
      }));

      // --- Step 4: Map passcodes to card data ---
      const cardMap = {};
      for (const card of cardWithPoints) {
        cardMap[card.passcode] = card;
      }

      mainDeck.value = sections.main.map(code => cardMap[code]).filter(Boolean);
      extraDeck.value = sections.extra.map(code => cardMap[code]).filter(Boolean);
      sideDeck.value = sections.side.map(code => cardMap[code]).filter(Boolean);

      // --- Step 5: Generate unique deck name ---
      let newDeckName = fileName;
      let i = 1;
      while (savedDecks.value.some(deck => deck.name === newDeckName)) {
        newDeckName = `${fileName} (${i++})`;
      }

      // --- Step 6: Save to local data ---
      const newDeck = {
        name: newDeckName,
        main: [...mainDeck.value],
        extra: [...extraDeck.value],
        side: [...sideDeck.value],
      };

      // --- Step 7: Update reactive state ---
      savedDecks.value.push(newDeck);
      decks.value.push(newDeckName);
      selectedDeck.value = newDeckName;
      calculateDeckPoints();

      // --- Step 8: Save to localStorage ---
      localStorage.setItem("decks", JSON.stringify(savedDecks.value));

      alert(`Deck "${newDeckName}" imported successfully!`);
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
      // if (!selectedDeck.value) {
      //   alert("Please select a deck to delete.");
      //   return;
      // }

      const confirmed = confirm(
        `Are you sure you want to delete "${selectedDeck.value}"? This action cannot be undone.`
      );

      if (!confirmed) {
        return;
      }
      const index = savedDecks.value.findIndex(
        (deck) => deck.name === selectedDeck.value
      );

      if (index === -1) {
        alert("Deck not found!");
        return;
      }

      savedDecks.value.splice(index, 1);

      localStorage.setItem("decks", JSON.stringify(savedDecks.value));

      decks.value = savedDecks.value.map((deck) => deck.name);

      if (savedDecks.value.length > 0) {
        const firstDeck = savedDecks.value[0];
        selectedDeck.value = firstDeck.name;
        mainDeck.value = firstDeck.main || [];
        extraDeck.value = firstDeck.extra || [];
        sideDeck.value = firstDeck.side || [];
        calculateDeckPoints();
        alert(`Deck deleted. Now loaded "${firstDeck.name}".`);
      } else {
        selectedDeck.value = "";
        mainDeck.value = [];
        extraDeck.value = [];
        sideDeck.value = [];
        alert("All decks deleted.");
      }
    }

    const searchCard = async () => {
      if (searchQuery.value == "") {
        return;
      }

      loading.value = true;
      const result = await apiService.searchCard(searchQuery.value, includeDescription.value);

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

      const newDeck = {
        name: newDeckName.value,
        main: [],
        extra: [],
        side: [],
      };

      savedDecks.value.push(newDeck);
      decks.value.push(newDeckName.value);
      selectedDeck.value = newDeckName.value;

      localStorage.setItem("decks", JSON.stringify(savedDecks.value));

      mainDeck.value = [];
      extraDeck.value = [];
      sideDeck.value = [];
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
      deckPoints.value += cardPoints;

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
        alert("side deck is max size");
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

    function changeDeck() {
      const deck = savedDecks.value.find(d => d.name === selectedDeck.value);
      if (deck) {
        mainDeck.value = deck.main || [];
        extraDeck.value = deck.extra || [];
        sideDeck.value = deck.side || [];
        calculateDeckPoints();
      }
    }

    function calculateDeckPoints() {
      const total =
        mainDeck.value.reduce((sum, card) => sum + (card?.point || 0), 0) +
        extraDeck.value.reduce((sum, card) => sum + (card?.point || 0), 0) +
        sideDeck.value.reduce((sum, card) => sum + (card?.point || 0), 0);

      deckPoints.value = total;
    }

    onMounted(() => {
      const saved = localStorage.getItem("decks");

      if (saved) {
        const deckData = JSON.parse(saved);

        savedDecks.value = deckData;

        if (deckData.length > 0) {
          selectedDeck.value = deckData[0].name;
          mainDeck.value = deckData[0].main || [];
          extraDeck.value = deckData[0].extra || [];
          sideDeck.value = deckData[0].side || [];
          calculateDeckPoints();
        }

        decks.value = deckData.map(deck => deck.name);
      } else {
        savedDecks.value = [];
        decks.value = [];
      }
    });
    return {
      mainDeck,
      extraDeck,
      sideDeck,
      deckPoints,
      searchQuery,
      includeDescription,
      searchResults,
      decks,
      loading,
      apiError,
      newDeckName,
      selectedDeck,
      cardPreview,
      mainDeckCounts,
      sideDeckCounts,
      extraDeckCounts,
      setPreview,
      saveDeck,
      saveDeckAs,
      renameDeck,
      sortDeck,
      triggerFilePicker,
      importDeck,
      exportDeck,
      clearDeck,
      deleteDeck,
      createDeck,
      searchCard,
      clearSearch,
      addCardToDeck,
      addToSideDeck,
      removeCardFromDeck,
      changeDeck
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

.deck-control {
  background-color: #333;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
