import { useEffect, useRef, useState } from 'react';
import { bannerSlides } from '../data/catalog.js';
import { prefersReducedMotion } from '../lib/scroll.js';
import { PauseIcon, PlayIcon } from './Icons.jsx';
import SmartImage from './SmartImage.jsx';

const INTERVAL = 5000;

export default function Banner() {
  const [index, setIndex] = useState(0);
  // Auto-play is off for visitors who ask for reduced motion.
  const [playing, setPlaying] = useState(() => !prefersReducedMotion());
  const [held, setHeld] = useState(false); // paused while hovered or focused
  const touchX = useRef(null);
  const count = bannerSlides.length;

  const go = (i) => setIndex((i + count) % count);

  useEffect(() => {
    if (!playing || held) return undefined;
    const t = setTimeout(() => setIndex((i) => (i + 1) % count), INTERVAL);
    return () => clearTimeout(t);
  }, [index, playing, held, count]);

  return (
    <section
      id="top"
      className="banner"
      aria-roledescription="carousel"
      aria-labelledby="banner-title"
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocus={() => setHeld(true)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setHeld(false)}
    >
      <div
        className="banner__frame"
        onTouchStart={(e) => {
          touchX.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
          touchX.current = null;
        }}
      >
        {bannerSlides.map((slide, i) => (
          <div
            key={slide.image}
            className={`banner__slide ${i === index ? 'is-active' : ''}`}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${count}`}
            aria-hidden={i !== index}
          >
            <SmartImage
              id={slide.image}
              alt={slide.alt}
              ratio={0.32}
              widths={[800, 1200, 1600, 2200]}
              sizes="94vw"
              eager={i === 0}
            />
          </div>
        ))}
        <div className="banner__shade" aria-hidden="true" />

        <div className="banner__text">
          <h1 id="banner-title" className="banner__title">
            Your event starts with the <em>right details.</em>
          </h1>
          <p className="banner__lead">Pick what you need, add it to your wishlist, and ask us for a price.</p>
        </div>

        <div className="banner__controls">
          <div className="banner__dots">
            {bannerSlides.map((slide, i) => (
              <button
                key={slide.image}
                type="button"
                className={`banner__dot ${i === index ? 'is-active' : ''}`}
                onClick={() => go(i)}
                aria-label={`Show photo ${i + 1} of ${count}`}
                aria-current={i === index ? 'true' : undefined}
              />
            ))}
          </div>
          <button
            type="button"
            className="banner__pause"
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? 'Pause photos' : 'Play photos'}
          >
            {playing ? <PauseIcon /> : <PlayIcon />}
          </button>
        </div>
      </div>
    </section>
  );
}
