import { ArrowIcon } from './Icons.jsx';
import SmartImage from './SmartImage.jsx';

export default function EventTypeCard({ event, onSelect }) {
  return (
    <button
      type="button"
      className="event-card"
      onClick={() => onSelect(event.id)}
      aria-label={`${event.name}: ${event.tagline} Show suitable rental items.`}
    >
      <span className="event-card__photo">
        <SmartImage
          id={event.image}
          alt={event.alt}
          ratio={1.3}
          widths={[400, 640, 900]}
          sizes="(min-width: 1100px) 24vw, (min-width: 600px) 46vw, 80vw"
        />
      </span>
      <span className="event-card__body">
        <span className="event-card__name">{event.name}</span>
        <span className="event-card__tagline">{event.tagline}</span>
        <span className="event-card__foot" aria-hidden="true">
          <ArrowIcon />
        </span>
      </span>
    </button>
  );
}
