import { useState } from 'react';
import Banner from './components/Banner.jsx';
import CategorySection from './components/CategorySection.jsx';
import FeaturedItems from './components/FeaturedItems.jsx';
import Navigation from './components/Navigation.jsx';
import WishlistPanel from './components/WishlistPanel.jsx';
import { useWishlist } from './context/WishlistContext.jsx';
import { prefersReducedMotion } from './lib/scroll.js';

export default function App() {
  const [category, setCategory] = useState('all');
  const [query, setQuery] = useState('');
  const { announcement } = useWishlist();

  // Searching looks through every item; picking a circle clears the search.
  const onQuery = (value) => {
    if (!query && value) {
      setCategory('all');
      // Bring the results into view if they're below the screen.
      const items = document.getElementById('items');
      if (items && items.getBoundingClientRect().top > window.innerHeight * 0.6) {
        items.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
      }
    }
    setQuery(value);
  };

  const onSelect = (id) => {
    setQuery('');
    setCategory(id);
  };

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navigation query={query} onQuery={onQuery} />
      <main id="main">
        <Banner />
        <CategorySection selected={query ? null : category} onSelect={onSelect} />
        <FeaturedItems category={category} query={query} onClear={() => onSelect('all')} />
      </main>
      <WishlistPanel />
      <p className="sr-only" role="status" aria-live="polite">
        {announcement}
      </p>
    </>
  );
}
