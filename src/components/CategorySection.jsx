import { useEffect, useRef, useState } from 'react';
import { categories, occasions } from '../data/catalog.js';
import CategoryCard from './CategoryCard.jsx';
import { ArrowIcon } from './Icons.jsx';

const ALL = { id: 'all', name: 'All', image: '1683435844312-ac5324de7572', alt: 'Event table set with flowers and candles' };

// The switch shows one group at a time: item types or event types.
const GROUPS = [
  { id: 'items', label: 'Items', list: categories },
  { id: 'events', label: 'Events', list: occasions },
];

export default function CategorySection({ selected, onSelect }) {
  const rowRef = useRef(null);
  const [group, setGroup] = useState(() => (occasions.some((o) => o.id === selected) ? 'events' : 'items'));
  const [edges, setEdges] = useState({ start: true, end: false });
  const list = GROUPS.find((g) => g.id === group).list;

  // Track whether the row can scroll further, to enable or disable the arrow buttons.
  useEffect(() => {
    const row = rowRef.current;
    if (!row) return undefined;
    row.scrollLeft = 0;
    const update = () =>
      setEdges({ start: row.scrollLeft <= 4, end: row.scrollLeft + row.clientWidth >= row.scrollWidth - 4 });
    update();
    row.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      row.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [group]);

  const scrollBy = (dir) => {
    const row = rowRef.current;
    row.scrollBy({ left: dir * row.clientWidth * 0.8, behavior: 'smooth' });
  };

  return (
    <section id="categories" className="categories container" aria-labelledby="categories-title">
      <div className="categories__head">
        <h2 id="categories-title" className="categories__title">
          Categories
        </h2>
        <div className="categories__tools">
          <div className="switch" role="group" aria-label="Show categories by">
            {GROUPS.map((g) => (
              <button
                key={g.id}
                type="button"
                className={`switch__option ${group === g.id ? 'is-on' : ''}`}
                aria-pressed={group === g.id}
                onClick={() => setGroup(g.id)}
              >
                {g.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="categories__scroller">
        <button
          type="button"
          className={`categories__arrow categories__arrow--left ${edges.start ? 'is-hidden' : ''}`}
          onClick={() => scrollBy(-1)}
          tabIndex={edges.start ? -1 : 0}
          aria-hidden={edges.start}
          aria-label="Scroll categories left"
        >
          <ArrowIcon style={{ transform: 'rotate(180deg)' }} />
        </button>

        <ul ref={rowRef} className="categories__row" key={group}>
          {[ALL, ...list].map((category) => (
            <li key={category.id}>
              <CategoryCard category={category} selected={selected === category.id} onSelect={onSelect} />
            </li>
          ))}
        </ul>

        <button
          type="button"
          className={`categories__arrow categories__arrow--right ${edges.end ? 'is-hidden' : ''}`}
          onClick={() => scrollBy(1)}
          tabIndex={edges.end ? -1 : 0}
          aria-hidden={edges.end}
          aria-label="Scroll categories right"
        >
          <ArrowIcon />
        </button>
      </div>
    </section>
  );
}
