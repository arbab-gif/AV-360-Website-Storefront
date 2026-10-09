// Unsplash CDN helpers. Photos are referenced by ID so sizes can be requested per layout.
const BASE = 'https://images.unsplash.com/photo-';

export function unsplash(id, { w = 800, h, q = 75 } = {}) {
  const params = new URLSearchParams({ auto: 'format', fit: 'crop', w: String(w), q: String(q) });
  if (h) params.set('h', String(h));
  return `${BASE}${id}?${params}`;
}

// Build a srcset for a fixed aspect ratio (height / width).
export function unsplashSrcSet(id, widths, ratio) {
  return widths
    .map((w) => `${unsplash(id, { w, h: ratio ? Math.round(w * ratio) : undefined })} ${w}w`)
    .join(', ');
}
