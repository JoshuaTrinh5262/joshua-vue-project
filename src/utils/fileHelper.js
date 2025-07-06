export const parseYugiohDeckFile = (fileText, deckMeta = {}) => {
  const lines = fileText.split("\n").map(line => line.trim()).filter(Boolean);

  const cardsMap = new Map();
  let currentCategory = "main";

  for (const line of lines) {
    if (line.startsWith("#")) {
      if (line.includes("main")) currentCategory = "main";
      else if (line.includes("extra")) currentCategory = "extra";
    } else if (line.startsWith("!")) {
      if (line.includes("side")) currentCategory = "side";
    } else if (!line.startsWith("#")) {
      const cardId = line;
      const key = `${cardId}_${currentCategory}`;
      if (!cardsMap.has(key)) {
        cardsMap.set(key, { card_id: cardId, quantity: 1, category: currentCategory });
      } else {
        cardsMap.get(key).quantity += 1;
      }
    }
  }

  return {
    deck: {
      name: deckMeta.name || "Unnamed Deck",
    },
    cards: Array.from(cardsMap.values())
  };
}
