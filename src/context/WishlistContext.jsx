import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useRef, useState } from 'react';
import { itemById } from '../data/catalog.js';

const STORAGE_KEY = 'ap360.wishlist.v1';
const WishlistContext = createContext(null);

function load() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) return [];
    // Drop unknown items and duplicates; clamp quantities to at least one.
    const seen = new Set();
    return parsed
      .filter((e) => e && itemById[e.id] && !seen.has(e.id) && seen.add(e.id))
      .map((e) => ({ id: e.id, qty: Math.max(1, Math.floor(Number(e.qty)) || 1) }));
  } catch {
    return [];
  }
}

function reducer(state, action) {
  switch (action.type) {
    case 'add':
      if (state.some((e) => e.id === action.id)) return state;
      return [...state, { id: action.id, qty: 1 }];
    case 'remove':
      return state.filter((e) => e.id !== action.id);
    case 'setQty':
      return state.map((e) => (e.id === action.id ? { ...e, qty: Math.max(1, action.qty) } : e));
    default:
      return state;
  }
}

export function WishlistProvider({ children }) {
  const [entries, dispatch] = useReducer(reducer, undefined, load);
  const [isOpen, setOpen] = useState(false);
  const [announcement, setAnnouncement] = useState('');
  const [pulse, setPulse] = useState(0);
  const returnFocus = useRef(null);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    } catch {
      /* storage unavailable — wishlist still works for this visit */
    }
  }, [entries]);

  const has = useCallback((id) => entries.some((e) => e.id === id), [entries]);

  const add = useCallback(
    (id) => {
      if (entries.some((e) => e.id === id)) return;
      dispatch({ type: 'add', id });
      setPulse((p) => p + 1);
      setAnnouncement(`${itemById[id].name} added to your wishlist.`);
    },
    [entries],
  );

  const remove = useCallback((id) => {
    dispatch({ type: 'remove', id });
    setAnnouncement(`${itemById[id].name} removed from your wishlist.`);
  }, []);

  const setQty = useCallback((id, qty) => dispatch({ type: 'setQty', id, qty }), []);

  const open = useCallback(() => {
    returnFocus.current = document.activeElement;
    setOpen(true);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    const el = returnFocus.current;
    if (el && el !== document.body && document.contains(el)) el.focus({ preventScroll: true });
  }, []);

  const value = useMemo(
    () => ({
      entries,
      count: entries.length,
      has,
      add,
      remove,
      setQty,
      isOpen,
      open,
      close,
      pulse,
      announcement,
    }),
    [entries, has, add, remove, setQty, isOpen, open, close, pulse, announcement],
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used inside WishlistProvider');
  return ctx;
}
