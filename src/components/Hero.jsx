import { hero } from '../data/catalog.js';
import { scrollToSection } from '../lib/scroll.js';
import { ArrowIcon } from './Icons.jsx';
import SmartImage from './SmartImage.jsx';

const STEPS = ['Choose your items.', 'Share your plans.', 'Receive a custom quote.'];

export default function Hero() {
  const go = (e, id) => {
    e.preventDefault();
    scrollToSection(id);
  };

  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <div className="hero__inner container">
        <div className="hero__copy">
          <h1 id="hero-title" className="hero__title">
            Your event starts with the <em>right details.</em>
          </h1>
          <p className="hero__text">
            Explore furniture, décor, and event essentials. Add your favorites to a wishlist, and let AP360 help bring
            your plans together.
          </p>
          <div className="hero__actions">
            <a href="#rentals" className="btn btn--primary btn--lg" onClick={(e) => go(e, 'rentals')}>
              Explore Rentals
              <ArrowIcon />
            </a>
            <a href="#event-types" className="btn btn--line btn--lg" onClick={(e) => go(e, 'event-types')}>
              Browse Event Types
            </a>
          </div>
          <ol className="hero__steps" aria-label="How AP360 works">
            {STEPS.map((step, i) => (
              <li key={step}>
                <span className="hero__step-num" aria-hidden="true">
                  0{i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>

        <div className="hero__visual">
          <div className="hero__arch">
            <SmartImage
              id={hero.image}
              alt={hero.alt}
              ratio={1.22}
              widths={[640, 900, 1200, 1600]}
              sizes="(min-width: 961px) 52vw, 92vw"
              eager
            />
          </div>

          <figure className="hero__inset">
            <SmartImage id={hero.inset} alt={hero.insetAlt} ratio={1.25} widths={[240, 400]} sizes="200px" eager />
          </figure>

          <svg className="hero__badge" viewBox="0 0 200 200" aria-hidden="true" focusable="false">
            <defs>
              <path id="badge-circle" d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0" />
            </defs>
            <circle cx="100" cy="100" r="98" className="hero__badge-bg" />
            <g className="hero__badge-ring">
              <text>
                <textPath href="#badge-circle" startOffset="0">
                  Weddings · Birthdays · Celebrations ·
                </textPath>
              </text>
            </g>
            <text x="100" y="114" textAnchor="middle" className="hero__badge-mark">
              360
            </text>
          </svg>
        </div>
      </div>
    </section>
  );
}
