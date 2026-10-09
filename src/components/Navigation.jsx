import { useEffect, useRef, useState } from 'react';
import { useWishlist } from '../context/WishlistContext.jsx';
import { scrollToSection } from '../lib/scroll.js';
import { CloseIcon, HeartIcon, MenuIcon } from './Icons.jsx';

const LINKS = [
  { label: 'Rentals', target: 'rentals' },
  { label: 'Event Types', target: 'event-types' },
  { label: 'How It Works', soon: true },
  { label: 'Contact', soon: true },
];

export default function Navigation() {
  const { count, open, pulse } = useWishlist();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('');
  const [bump, setBump] = useState(false);
  // Brand logo lives at public/logo.png; the text wordmark shows until that file exists.
  const [logoOk, setLogoOk] = useState(true);
  const toggleRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Highlight the link for the section currently in view.
  useEffect(() => {
    const ids = ['rentals', 'event-types'];
    const io = new IntersectionObserver(
      (records) => {
        records.forEach((r) => {
          if (r.isIntersecting) setActive(r.target.id);
          else setActive((prev) => (prev === r.target.id ? '' : prev));
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  // Badge bump whenever an item is added.
  useEffect(() => {
    if (!pulse) return undefined;
    setBump(true);
    const t = setTimeout(() => setBump(false), 450);
    return () => clearTimeout(t);
  }, [pulse]);

  // Mobile menu: close on Escape or when resizing up to desktop.
  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    const mq = window.matchMedia('(min-width: 961px)');
    const onMq = (e) => e.matches && setMenuOpen(false);
    document.addEventListener('keydown', onKey);
    mq.addEventListener('change', onMq);
    return () => {
      document.removeEventListener('keydown', onKey);
      mq.removeEventListener('change', onMq);
    };
  }, [menuOpen]);

  const go = (e, target) => {
    e.preventDefault();
    if (!menuOpen) {
      scrollToSection(target);
      return;
    }
    // Let the mobile menu collapse first so the scroll target doesn't shift mid-scroll.
    setMenuOpen(false);
    setTimeout(() => scrollToSection(target), 30);
  };

  const wishlistLabel = count === 1 ? 'Wishlist, 1 item' : `Wishlist, ${count} items`;

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''} ${menuOpen ? 'nav--menu-open' : ''}`}>
      <div className="nav__inner container">
        <a href="#top" className="wordmark" aria-label="Home" onClick={(e) => go(e, 'top')}>
          {logoOk ? (
            <img className="wordmark__logo" src="/logo.png" alt="" onError={() => setLogoOk(false)} />
          ) : (
            <>
              <span className="wordmark__mark">AP</span>
              <span className="wordmark__num">360</span>
            </>
          )}
        </a>

        <nav className="nav__links" aria-label="Primary">
          <ul>
            {LINKS.map((link) => (
              <li key={link.label}>
                {link.soon ? (
                  <span className="nav__link nav__link--soon" aria-disabled="true" title="Coming soon">
                    {link.label}
                  </span>
                ) : (
                  <a
                    href={`#${link.target}`}
                    className={`nav__link ${active === link.target ? 'is-active' : ''}`}
                    aria-current={active === link.target ? 'location' : undefined}
                    onClick={(e) => go(e, link.target)}
                  >
                    {link.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav__actions">
          <button
            type="button"
            className={`wish-btn ${bump ? 'is-bumping' : ''}`}
            onClick={open}
            aria-label={wishlistLabel}
            aria-haspopup="dialog"
          >
            <HeartIcon filled={count > 0} />
            <span className="wish-btn__label">Wishlist</span>
            <span className={`wish-btn__count ${count ? 'has-items' : ''}`} aria-hidden="true">
              {count}
            </span>
          </button>
          <a href="#rentals" className="btn btn--primary btn--sm nav__cta" onClick={(e) => go(e, 'rentals')}>
            Browse Rentals
          </a>
          <button
            ref={toggleRef}
            type="button"
            className="nav__toggle"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      <div id="mobile-menu" className="mobile-menu" hidden={!menuOpen}>
        <nav aria-label="Mobile" className="container">
          <ul>
            {LINKS.map((link, i) => (
              <li key={link.label} style={{ '--i': i }}>
                {link.soon ? (
                  <span className="mobile-menu__link mobile-menu__link--soon" aria-disabled="true" title="Coming soon">
                    {link.label}
                  </span>
                ) : (
                  <a href={`#${link.target}`} className="mobile-menu__link" onClick={(e) => go(e, link.target)}>
                    {link.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
          <a href="#rentals" className="btn btn--primary btn--block" onClick={(e) => go(e, 'rentals')}>
            Browse Rentals
          </a>
        </nav>
      </div>
    </header>
  );
}
