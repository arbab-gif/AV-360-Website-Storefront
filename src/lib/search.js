import { categoryById, items } from '../data/catalog.js';

// Lowercase and strip accents so "decor" finds "Décor".
const normalize = (s) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');

const index = items.map((item) => ({
  item,
  text: normalize(`${item.name} ${categoryById[item.category].name} ${item.detail}`),
}));

// Every word typed must appear somewhere in the item's name, category or detail.
export function searchItems(query) {
  const words = normalize(query).split(/\s+/).filter(Boolean);
  if (!words.length) return items;
  return index.filter(({ text }) => words.every((w) => text.includes(w))).map(({ item }) => item);
}
