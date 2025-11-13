<template>
  <div>
    <div v-for="(item, i) in sections" :key="i" class="parallax" :style="{ backgroundImage: `url(${item.image})` }">
      <div :class="['content-box', i % 2 === 0 ? 'left' : 'right']">
        <h2>{{ item.title }}</h2>
        <p>{{ item.text }}</p>
        <router-link :to="item.url" class="detail">
          Know More →
        </router-link>
      </div>

    </div>
  </div>
</template>

<script setup>
const sections = [
  {
    image: "/background.jpg",
    title: "BATTLE CITY VIETNAM (BCVN)",
    text: "a national tournament system in Vietnam for the card game Yu-Gi-Oh!",
    url: "/"
  },
  {
    image: "/abstract5.jpg",
    title: "Yu-Gi-Oh! CARDS",
    text: "Use the Card Lookup to discover cards, read effects, view artworks, and learn how each card fits into your favorite decks.",
    url: "/yugioh/card"
  },
  {
    image: "/background.jpg",
    title: "Yu-Gi-Oh! BANLIST",
    text: "Wondering if your favorite card is still legal?"
      + "The Banlist Lookup makes it easy to search, filter, and explore the current Yu-Gi-Oh! banlist so you can duel confidently and stay ahead of the meta.",
    url: "/yugioh/banlist"
  },
  {
    image: "/abstract5.jpg",
    title: "Yu-Gi-Oh! GENESYS",
    text: "YuGiOh Genesys is Konami's official format that reimagines competitive Yu-Gi-Oh! gameplay."
      + " Launched for players seeking a fresh strategic experience, the genesys format eliminates modern"
      + "mechanics complexity while introducing an innovative point-based deck construction system.",
    url: "/genesys"
  },
  {
    image: "/background.jpg",
    title: "DECKBUILD TOOL",
    text: "The Deck Build Tool allows players to create, customize, and optimize their Yu-Gi-Oh! decks with ease. Users can browse cards, add them to their deck, and instantly see statistics such as card type distribution, mana/attribute ratios, and combo potential. The tool also supports saving, sharing, and importing deck lists, making it perfect for casual play, competitive preparation, and testing new strategies.",
    url: "/deckbuild"
  },
  {
    image: "/abstract5.jpg",
    title: "Yu-Gi-Oh! EDISON FORMAT",
    text: "The Edison format is a popular retro format in the Yu-Gi-Oh! trading card game, named after the 75th Shonen"
      + "Jump Championship held in Edison, New Jersey. It features cards from the 5D's era and is known for its strong"
      + "community support and competitive play. Iconic decks such as Quickdraw Plant and various strategies like"
      + "Blackwing and Vayu Turbo are commonly used in this format. The format has gained recognition for its unique"
      + "gameplay and is celebrated through events like the Edison Format World Championship.",
    url: "/edison"
  },
  {
    image: "/background.jpg",
    title: "TIMER TOOL",
    text: "The Timer Tool provides a simple and reliable way to track match times during duels or practice sessions. Players can set countdowns, pause/resume timers, and receive alerts when time is up. This helps enforce official match timing rules or simply improve pacing during practice.",
    url: "/timer"
  },
];
</script>