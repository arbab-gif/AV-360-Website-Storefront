import { useCallback, useState } from 'react';
import CategorySection from './components/CategorySection.jsx';
import EventTypeSection from './components/EventTypeSection.jsx';
import FeaturedItems from './components/FeaturedItems.jsx';
import Hero from './components/Hero.jsx';
import Navigation from './components/Navigation.jsx';
import WishlistPanel from './components/WishlistPanel.jsx';
import { useWishlist } from './context/WishlistContext.jsx';
import { scrollToSection } from './lib/scroll.js';

export default function App() {
  const [category, setCategory] = useState('all');
  const [eventType, setEventType] = useState(null);
  const { announcement } = useWishlist();

  const pickCategory = useCallback((id) => {
    setEventType(null);
    // Clicking the selected circle again shows every item.
    setCategory((current) => (current === id ? 'all' : id));
    scrollToSection('featured');
  }, []);

  const pickEvent = useCallback((id) => {
    setCategory('all');
    setEventType(id);
    scrollToSection('featured');
  }, []);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navigation />
      <main id="main">
        <Hero />
        <CategorySection selected={eventType ? null : category} onSelect={pickCategory} />
        <FeaturedItems
          category={category}
          eventType={eventType}
          onClearEvent={() => setEventType(null)}
          onClearAll={() => {
            setEventType(null);
            setCategory('all');
          }}
        />
        <EventTypeSection onSelect={pickEvent} />
      </main>
      <WishlistPanel />
      <p className="sr-only" role="status" aria-live="polite">
        {announcement}
      </p>
    </>
  );
}
