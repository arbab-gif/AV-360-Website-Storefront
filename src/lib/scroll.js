export function prefersReducedMotion() {
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
}

// Smoothly scroll to a section (sticky-nav offset handled by CSS scroll-margin-top)
// and move focus to its heading so keyboard and screen-reader users land there too.
export function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
  const target = el.querySelector('[data-focus-target]') || el;
  if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
  target.focus({ preventScroll: true });
  if (window.location.hash !== `#${id}`) history.replaceState(null, '', `#${id}`);
}
