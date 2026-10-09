import { eventTypes } from '../data/catalog.js';
import EventTypeCard from './EventTypeCard.jsx';
import SectionHeading from './SectionHeading.jsx';

export default function EventTypeSection({ onSelect }) {
  return (
    <section id="event-types" className="section events" aria-labelledby="events-title">
      <div className="container">
        <div className="events__head">
          <SectionHeading
            id="events-title"
            title={
              <>
                Every occasion, <em>thoughtfully planned.</em>
              </>
            }
            text="Find inspiration and rental items for the event you have in mind."
          />
        </div>

        <ul className="events__grid">
          {eventTypes.map((event) => (
            <li key={event.id}>
              <EventTypeCard event={event} onSelect={onSelect} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
