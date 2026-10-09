import { useEffect, useRef, useState } from 'react';
import { itemById } from '../data/catalog.js';
import { useWishlist } from '../context/WishlistContext.jsx';
import { scrollToSection } from '../lib/scroll.js';
import { ArrowIcon, CheckIcon, CloseIcon, HeartIcon } from './Icons.jsx';
import QuoteForm from './QuoteForm.jsx';
import WishlistLine from './WishlistLine.jsx';

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
const EXIT_MS = 320;

export default function WishlistPanel() {
  const { entries, isOpen, close } = useWishlist();
  const [mounted, setMounted] = useState(isOpen);
  const [view, setView] = useState('list'); // list | quote | sent
  const [sent, setSent] = useState(null);
  const titleRef = useRef(null);
  const panelRef = useRef(null);
  const closeRef = useRef(null);

  // Enter/exit are CSS keyframe animations; keep the panel mounted until the exit finishes.
  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      return undefined;
    }
    const t = setTimeout(() => {
      setMounted(false);
      setView('list');
    }, EXIT_MS);
    return () => clearTimeout(t);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && mounted) closeRef.current?.focus();
  }, [isOpen, mounted]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollbar}px`;
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isOpen]);

  const onKeyDown = (e) => {
    if (e.key === 'Escape') {
      e.stopPropagation();
      close();
      return;
    }
    if (e.key !== 'Tab') return;
    const nodes = [...panelRef.current.querySelectorAll(FOCUSABLE)].filter((n) => n.offsetParent !== null);
    if (!nodes.length) return;
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  // Keep focus inside the panel when a line is removed.
  const onLineRemoved = () => requestAnimationFrame(() => closeRef.current?.focus());

  // Move focus to the heading whenever the panel switches between list, form and confirmation.
  const show = (next) => {
    setView(next);
    requestAnimationFrame(() => titleRef.current?.focus());
    panelRef.current?.querySelector('.drawer__body')?.scrollTo(0, 0);
  };

  const explore = () => {
    close();
    setTimeout(() => scrollToSection('categories'), 60);
  };

  if (!mounted) return null;

  const lines = entries.filter((e) => itemById[e.id]);
  const title = view === 'quote' ? 'Request a quote' : view === 'sent' ? 'Request sent' : 'Event wishlist';

  return (
    <div
      className={`drawer ${isOpen ? 'is-open' : 'is-closing'}`}
      onKeyDown={onKeyDown}
    >
      <div className="drawer__scrim" onClick={close} aria-hidden="true" />
      <aside
        ref={panelRef}
        className="drawer__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="wishlist-title"
        aria-describedby={view !== 'quote' ? 'wishlist-note' : undefined}
      >
        <header className="drawer__head">
          <div>
            <h2 id="wishlist-title" className="drawer__title" ref={titleRef} tabIndex={-1}>
              {title}
            </h2>
          </div>
          <button ref={closeRef} type="button" className="icon-btn" onClick={close} aria-label="Close wishlist">
            <CloseIcon />
          </button>
        </header>

        <div className="drawer__body">
          {view === 'quote' && lines.length > 0 ? (
            <QuoteForm
              entries={lines}
              onBack={() => show('list')}
              onSent={(result) => {
                setSent(result);
                show('sent');
              }}
            />
          ) : view === 'sent' && sent ? (
            <div className="drawer__empty">
              <span className="drawer__empty-icon" aria-hidden="true">
                <CheckIcon />
              </span>
              <p className="drawer__empty-title">Thank you, {sent.name.split(' ')[0]}.</p>
              <p className="drawer__sent-text">
                {sent.method === 'email'
                  ? 'Your email app has opened with your request filled in. Press send to deliver it to our team.'
                  : `Your request is with our team. We’ll reply to ${sent.email} with pricing and availability.`}
              </p>
            </div>
          ) : lines.length === 0 ? (
            <div className="drawer__empty">
              <span className="drawer__empty-icon" aria-hidden="true">
                <HeartIcon />
              </span>
              <p className="drawer__empty-title">Your event wishlist is empty.</p>
              <button type="button" className="btn btn--primary" onClick={explore}>
                Browse Items
              </button>
            </div>
          ) : (
            <ul className="drawer__list">
              {lines.map((entry) => (
                <WishlistLine key={entry.id} entry={entry} item={itemById[entry.id]} onRemoved={onLineRemoved} />
              ))}
            </ul>
          )}
        </div>

        {view !== 'quote' && (
          <footer className="drawer__foot">
            <p id="wishlist-note" className="drawer__note">
              Your wishlist is saved on this device.
            </p>
            {view === 'list' && lines.length > 0 && (
              <button type="button" className="btn btn--primary btn--block" onClick={() => show('quote')}>
                Request a Quote <ArrowIcon />
              </button>
            )}
            <button type="button" className="btn btn--line btn--block" onClick={close}>
              Continue Browsing
            </button>
          </footer>
        )}
      </aside>
    </div>
  );
}
