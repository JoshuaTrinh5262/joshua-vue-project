<template>
  <div>
    <div class="container-fluid" style="background-image: url('../background.jpg'); ">
      <div class="text-white">
        <h1 class="text-center">Yu-Gi-Oh! EDISON</h1>
        <h2 class="text-center">WHAT IS EDISON FORMAT?</h2>
        <p class="text-center">
          The Edison format is a popular retro format in the Yu-Gi-Oh! trading card game, named after the 75th Shonen
          Jump Championship held in Edison, New Jersey. It features cards from the 5D's era and is known for its strong
          community support and competitive play. Iconic decks such as Quickdraw Plant and various strategies like
          Blackwing and Vayu Turbo are commonly used in this format. The format has gained recognition for its unique
          gameplay and is celebrated through events like the Edison Format World Championship.
        </p>
      </div>
      <div>
        <div v-for="group in banlistGroups" :key="group.title" class="banlist-group text-white">
          <h2>{{ group.title }}</h2>
          <ul>
            <li v-for="card in group.items" :key="card">
              {{ card.Name }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { banned, limit, semi } from "@/utils/edison_banlist.js";

export default defineComponent({
  name: "Edison",
  setup() {
    const banlistGroups = [
      { title: "Banned", items: banned },
      { title: "Limited", items: limit },
      { title: "Semi-Limited", items: semi },
    ];

    return {

      banlistGroups
    };
  },
});
</script>

<style scoped></style>
