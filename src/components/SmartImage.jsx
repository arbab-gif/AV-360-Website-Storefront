import { useState } from 'react';
import { unsplash, unsplashSrcSet } from '../lib/images.js';

// Responsive Unsplash image with a fade-in and a graceful fallback if the photo fails.
export default function SmartImage({
  id,
  alt,
  ratio,
  widths = [400, 640, 960, 1280],
  sizes = '100vw',
  eager = false,
  className = '',
}) {
  const [state, setState] = useState('loading');
  const fallbackW = widths[Math.min(1, widths.length - 1)];

  if (state === 'error') {
    return (
      <div className={`smart-img smart-img--fallback ${className}`} role="img" aria-label={alt}>
        <span aria-hidden="true">AP360</span>
      </div>
    );
  }

  return (
    <img
      className={`smart-img ${state === 'loaded' ? 'is-loaded' : ''} ${className}`}
      src={unsplash(id, { w: fallbackW, h: ratio ? Math.round(fallbackW * ratio) : undefined })}
      srcSet={unsplashSrcSet(id, widths, ratio)}
      sizes={sizes}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      fetchpriority={eager ? 'high' : undefined}
      decoding="async"
      onLoad={() => setState('loaded')}
      onError={() => setState('error')}
    />
  );
}
