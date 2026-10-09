import { categoryById, itemById } from '../data/catalog.js';

// Where quote requests go. Set one of these in a `.env` file (see .env.example):
//   VITE_QUOTE_ENDPOINT — a URL that accepts a JSON POST (Formspree, Getform, your own API…)
//   VITE_QUOTE_EMAIL    — the team's inbox; used to open a pre-filled email when no endpoint is set
const ENDPOINT = import.meta.env.VITE_QUOTE_ENDPOINT || '';
const TEAM_EMAIL = import.meta.env.VITE_QUOTE_EMAIL || '';

export const EVENT_TYPES = ['Wedding', 'Birthday', 'Corporate event', 'Private party', 'Other'];

export function buildQuote(form, entries) {
  return {
    contact: {
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
    },
    event: {
      type: form.eventType,
      date: form.date,
      guests: form.guests ? Number(form.guests) : null,
      location: form.location.trim(),
      notes: form.notes.trim(),
    },
    items: entries.map(({ id, qty }) => {
      const item = itemById[id];
      return {
        id,
        name: item.name,
        category: categoryById[item.category].name,
        option: item.detail,
        quantity: qty,
      };
    }),
    submittedAt: new Date().toISOString(),
  };
}

function asText(quote) {
  const { contact, event, items } = quote;
  return [
    `Name: ${contact.name}`,
    `Email: ${contact.email}`,
    `Phone: ${contact.phone}`,
    '',
    `Event type: ${event.type}`,
    `Event date: ${event.date}`,
    `Guests: ${event.guests ?? 'Not given'}`,
    `Location: ${event.location}`,
    '',
    'Items:',
    ...items.map((i) => `- ${i.name} (${i.option}) × ${i.quantity}`),
    '',
    `Notes: ${event.notes || 'None'}`,
  ].join('\n');
}

/**
 * Sends the quote request to the AP360 team.
 * Resolves with { method: 'endpoint' | 'email' }; rejects with a message the visitor can act on.
 */
export async function sendQuote(quote) {
  if (ENDPOINT) {
    let res;
    try {
      res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...quote, summary: asText(quote) }),
      });
    } catch {
      throw new Error('We couldn’t reach our server. Check your connection and try again.');
    }
    if (!res.ok) throw new Error('Your request didn’t go through. Please try again in a moment.');
    return { method: 'endpoint' };
  }

  if (TEAM_EMAIL) {
    const subject = `Quote request — ${quote.event.type}, ${quote.event.date}`;
    window.location.href = `mailto:${TEAM_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
      asText(quote),
    )}`;
    return { method: 'email' };
  }

  console.warn('[AP360] Quote request not sent: set VITE_QUOTE_ENDPOINT or VITE_QUOTE_EMAIL.', quote);
  throw new Error('Quote requests aren’t connected yet, so this wasn’t sent. Please contact the AP360 team directly.');
}
