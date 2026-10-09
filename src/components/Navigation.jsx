import { useEffect, useState } from 'react';
import { useWishlist } from '../context/WishlistContext.jsx';
import { scrollToSection } from '../lib/scroll.js';
import { HeartIcon } from './Icons.jsx';
import SearchBox from './SearchBox.jsx';

export default function Navigation({ query, onQuery }) {
  const { count, open, pulse } = useWishlist();
  const [bump, setBump] = useState(false);

  // Badge bump whenever an item is added.
  useEffect(() => {
    if (!pulse) return undefined;
    setBump(true);
    const t = setTimeout(() => setBump(false), 450);
    return () => clearTimeout(t);
  }, [pulse]);

  const wishlistLabel = count === 1 ? 'Wishlist, 1 item' : `Wishlist, ${count} items`;

  return (
    <header className="nav">
      <div className="nav__inner container">
        <a
          href="#top"
          className="wordmark"
          aria-label="360 AV Design, home"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('top');
          }}
        >
          {/* The round mark is an image (recoloured from the brand logo); the name is real text. */}
          <img className="wordmark__mark" src="/logo-mark.png" alt="" width="194" height="190" />
          <span className="wordmark__text" aria-hidden="true">
            <span className="wordmark__name">
              360<span className="wordmark__av">AV</span>DESIGN
            </span>
            <span className="wordmark__tagline">Audio | Video | Lighting | Staging</span>
          </span>
        </a>

        <SearchBox value={query} onChange={onQuery} />

        <button
          type="button"
          className={`wish-btn ${bump ? 'is-bumping' : ''}`}
          onClick={open}
          aria-label={wishlistLabel}
          aria-haspopup="dialog"
        >
          <span className="wish-btn__icon">
            <HeartIcon filled={count > 0} />
          </span>
          <span className="wish-btn__label">Wishlist</span>
          {count > 0 && (
            <span className="wish-btn__count" aria-hidden="true">
              {count > 99 ? '99+' : count}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
