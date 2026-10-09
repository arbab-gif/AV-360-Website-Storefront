import { categoryById, items, itemById, occasionById } from '../data/catalog.js';
import { searchItems } from '../lib/search.js';
import ItemCard from './ItemCard.jsx';

function pick(category, query) {
  if (query.trim()) return { title: `Results for “${query.trim()}”`, list: searchItems(query) };
  if (category === 'all') return { title: 'All items', list: items };
  if (occasionById[category]) {
    const o = occasionById[category];
    return { title: `For ${o.name.toLowerCase()}`, list: o.items.map((id) => itemById[id]) };
  }
  return { title: categoryById[category].name, list: items.filter((i) => i.category === category) };
}

export default function FeaturedItems({ category, query, onClear }) {
  const { title, list } = pick(category, query);

  return (
    <section id="items" className="items container" aria-labelledby="items-title">
      <div className="items__head">
        <h2 id="items-title" className="items__title">
          {title}
        </h2>
        <p className="items__count" aria-live="polite">
          {list.length} {list.length === 1 ? 'item' : 'items'}
        </p>
      </div>

      {list.length > 0 ? (
        <ul className="items__grid" key={`${category}-${query}`}>
          {list.map((item, i) => (
            <li key={item.id} className="items__cell" style={{ '--d': i }}>
              <ItemCard item={item} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="items__empty">
          <p>No items match “{query.trim()}”. Try another word, like “chair” or “lights”.</p>
          <button type="button" className="btn btn--line" onClick={onClear}>
            Clear search
          </button>
        </div>
      )}

      <p className="items__note">Items depend on availability. Adding an item does not reserve it.</p>
    </section>
  );
}
