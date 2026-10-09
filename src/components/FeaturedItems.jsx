import { useMemo } from 'react';
import { categoryById, eventTypeById, items } from '../data/catalog.js';
import { CloseIcon } from './Icons.jsx';
import ItemCard from './ItemCard.jsx';
import SectionHeading from './SectionHeading.jsx';

export default function FeaturedItems({ category, eventType, onClearEvent, onClearAll }) {
  const eventScoped = useMemo(
    () => (eventType ? items.filter((i) => i.events.includes(eventType)) : items),
    [eventType],
  );

  const visible = category === 'all' ? eventScoped : eventScoped.filter((i) => i.category === category);
  const event = eventType ? eventTypeById[eventType] : null;

  return (
    <section id="featured" className="section featured" aria-labelledby="featured-title">
      <div className="container">
        <div className="featured__head">
          <SectionHeading
            id="featured-title"
            title={
              <>
                Start building your <em>event wishlist.</em>
              </>
            }
            text="Select the items you love. Our team will confirm pricing and availability after you submit your request."
          />
        </div>

        {(event || category !== 'all') && (
          <div className="featured__context">
            <span>
              Showing <strong>{event ? event.name : categoryById[category].name}</strong>
            </span>
            <button type="button" className="context-chip" onClick={event ? onClearEvent : onClearAll}>
              Show all items <CloseIcon />
            </button>
          </div>
        )}

        <p className="sr-only" aria-live="polite">
          {visible.length} {visible.length === 1 ? 'item' : 'items'} shown
        </p>

        {visible.length > 0 ? (
          <ul className="featured__grid" key={`${category}-${eventType}`}>
            {visible.map((item, i) => (
              <li key={item.id} className="featured__cell" style={{ '--d': i }}>
                <ItemCard item={item} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="featured__empty">
            <p>No featured pieces match this combination yet.</p>
            <button type="button" className="btn btn--line" onClick={onClearAll}>
              Show all items
            </button>
          </div>
        )}

        <p className="featured__note">
          Wishlist items are subject to availability. Adding an item does not reserve it.
        </p>
      </div>
    </section>
  );
}
