import { useEffect, useRef, useState } from 'react';
import { categories, occasions } from '../data/catalog.js';
import CategoryCard from './CategoryCard.jsx';
import { ArrowIcon } from './Icons.jsx';

const ALL = { id: 'all', name: 'All', image: '1683435844312-ac5324de7572', alt: 'Event table set with flowers and candles' };

export default function CategorySection({ selected, onSelect }) {
  const rowRef = useRef(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  // Track whether the row can scroll further, to show or hide the arrow buttons.
  useEffect(() => {
    const row = rowRef.current;
    if (!row) return undefined;
    const update = () =>
      setEdges({ start: row.scrollLeft <= 4, end: row.scrollLeft + row.clientWidth >= row.scrollWidth - 4 });
    update();
    row.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      row.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

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
        <div className="categories__arrows">
          <button type="button" className="icon-btn" onClick={() => scrollBy(-1)} disabled={edges.start} aria-label="Scroll categories left">
            <ArrowIcon style={{ transform: 'rotate(180deg)' }} />
          </button>
          <button type="button" className="icon-btn" onClick={() => scrollBy(1)} disabled={edges.end} aria-label="Scroll categories right">
            <ArrowIcon />
          </button>
        </div>
      </div>

      <ul ref={rowRef} className="categories__row">
        {[ALL, ...occasions].map((category) => (
          <li key={category.id}>
            <CategoryCard category={category} selected={selected === category.id} onSelect={onSelect} />
          </li>
        ))}
        <li className="categories__divider" aria-hidden="true" />
        {categories.map((category) => (
          <li key={category.id}>
            <CategoryCard category={category} selected={selected === category.id} onSelect={onSelect} />
          </li>
        ))}
      </ul>
    </section>
  );
}
