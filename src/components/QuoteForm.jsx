import { useState } from 'react';
import { EVENT_TYPES, buildQuote, sendQuote } from '../lib/quote.js';

const EMPTY = { name: '', email: '', phone: '', eventType: '', date: '', guests: '', location: '', notes: '' };

function today() {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}

function validate(f) {
  const errors = {};
  if (!f.name.trim()) errors.name = 'Enter your name.';
  if (!/^\S+@\S+\.\S+$/.test(f.email.trim())) errors.email = 'Enter an email address like name@example.com.';
  if (f.phone.replace(/\D/g, '').length < 7) errors.phone = 'Enter a phone number we can call.';
  if (!f.eventType) errors.eventType = 'Choose the type of event.';
  if (!f.date) errors.date = 'Choose your event date.';
  else if (f.date < today()) errors.date = 'Choose a date that hasn’t passed.';
  if (f.guests && (!Number.isInteger(Number(f.guests)) || Number(f.guests) < 1))
    errors.guests = 'Enter the number of guests, or leave it blank.';
  if (!f.location.trim()) errors.location = 'Enter the venue or city.';
  return errors;
}

export default function QuoteForm({ entries, onSent, onBack }) {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | error
  const [message, setMessage] = useState('');

  const set = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const submit = async (e) => {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    const firstBad = Object.keys(found)[0];
    if (firstBad) {
      document.getElementById(`quote-${firstBad}`)?.focus();
      return;
    }
    setStatus('sending');
    setMessage('');
    try {
      const quote = buildQuote(form, entries);
      const result = await sendQuote(quote);
      onSent({ ...result, name: quote.contact.name, email: quote.contact.email });
    } catch (err) {
      setStatus('error');
      setMessage(err.message);
    }
  };

  const field = (key, label, input, hint) => (
    <div className={`field ${errors[key] ? 'has-error' : ''}`}>
      <label htmlFor={`quote-${key}`}>{label}</label>
      {input}
      {hint && !errors[key] && <p className="field__hint">{hint}</p>}
      {errors[key] && (
        <p id={`quote-${key}-error`} className="field__error">
          {errors[key]}
        </p>
      )}
    </div>
  );

  const aria = (key) => ({
    id: `quote-${key}`,
    'aria-invalid': errors[key] ? true : undefined,
    'aria-describedby': errors[key] ? `quote-${key}-error` : undefined,
  });

  const pieces = entries.reduce((sum, e) => sum + e.qty, 0);

  return (
    <form className="quote" onSubmit={submit} noValidate>
      {/* Short summary only; the full list is one tap away in the wishlist. */}
      <aside className="quote__items" aria-label="Your items">
        <p className="quote__items-summary">
          <strong>Your items:</strong> {entries.length} {entries.length === 1 ? 'item' : 'items'}, {pieces}{' '}
          {pieces === 1 ? 'piece' : 'pieces'}
        </p>
        <button type="button" className="quote__edit" onClick={onBack}>
          Edit items
        </button>
      </aside>

      <div className="quote__fields">
        <fieldset className="quote__group">
          <legend>Your details</legend>
          {field(
            'name',
            'Full name',
            <input {...aria('name')} type="text" autoComplete="name" value={form.name} onChange={set('name')} />,
          )}
          {field(
            'email',
            'Email',
            <input {...aria('email')} type="email" autoComplete="email" value={form.email} onChange={set('email')} />,
          )}
          {field(
            'phone',
            'Phone',
            <input {...aria('phone')} type="tel" autoComplete="tel" value={form.phone} onChange={set('phone')} />,
          )}
        </fieldset>

        <fieldset className="quote__group">
          <legend>Your event</legend>
          {field(
            'eventType',
            'Event type',
            <select
              {...aria('eventType')}
              className={form.eventType ? undefined : 'is-placeholder'}
              value={form.eventType}
              onChange={set('eventType')}
            >
              <option value="">Choose one</option>
              {EVENT_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>,
          )}
          <div className="quote__pair">
            {field(
              'date',
              'Event date',
              <input {...aria('date')} type="date" min={today()} value={form.date} onChange={set('date')} />,
            )}
            {field(
              'guests',
              'Guests (optional)',
              <input
                {...aria('guests')}
                type="number"
                inputMode="numeric"
                min="1"
                value={form.guests}
                onChange={set('guests')}
              />,
            )}
          </div>
          {field(
            'location',
            'Venue or city',
            <input
              {...aria('location')}
              type="text"
              autoComplete="address-level2"
              value={form.location}
              onChange={set('location')}
            />,
          )}
          {field(
            'notes',
            'Anything else we should know?',
            <textarea {...aria('notes')} rows="3" value={form.notes} onChange={set('notes')} />,
            'Optional: setup times, colours, access details',
          )}
        </fieldset>

        {status === 'error' && (
          <p className="quote__alert" role="alert">
            {message}
          </p>
        )}

        <div className="quote__actions">
          <button type="submit" className="btn btn--primary btn--block" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : 'Send Quote Request'}
          </button>
          <button type="button" className="btn btn--line btn--block" onClick={onBack}>
            Back to Wishlist
          </button>
        </div>
      </div>
    </form>
  );
}
