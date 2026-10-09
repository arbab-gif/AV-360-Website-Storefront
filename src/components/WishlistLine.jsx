import { categoryById } from '../data/catalog.js';
import { useWishlist } from '../context/WishlistContext.jsx';
import { MinusIcon, PlusIcon } from './Icons.jsx';
import SmartImage from './SmartImage.jsx';

const MAX_QTY = 999;

export default function WishlistLine({ entry, item, onRemoved }) {
  const { setQty, remove } = useWishlist();
  const { qty } = entry;

  const onInput = (e) => {
    const n = parseInt(e.target.value, 10);
    if (Number.isFinite(n)) setQty(item.id, Math.min(MAX_QTY, Math.max(1, n)));
  };

  return (
    <li className="line">
      <div className="line__media">
        <SmartImage id={item.image} alt={item.alt} ratio={1.2} widths={[160, 240]} sizes="96px" />
      </div>
      <div className="line__info">
        <p className="line__category">{categoryById[item.category].name}</p>
        <p className="line__name">{item.name}</p>
        <p className="line__option">{item.detail}</p>
        <div className="line__controls">
          <div className="stepper" role="group" aria-label={`Quantity for ${item.name}`}>
            <button
              type="button"
              onClick={() => setQty(item.id, qty - 1)}
              disabled={qty <= 1}
              aria-label={`Decrease quantity of ${item.name}`}
            >
              <MinusIcon />
            </button>
            <input
              type="number"
              inputMode="numeric"
              min="1"
              max={MAX_QTY}
              value={qty}
              onChange={onInput}
              onBlur={(e) => {
                if (!e.target.value || Number(e.target.value) < 1) setQty(item.id, 1);
              }}
              aria-label={`Quantity of ${item.name}`}
            />
            <button
              type="button"
              onClick={() => setQty(item.id, Math.min(MAX_QTY, qty + 1))}
              disabled={qty >= MAX_QTY}
              aria-label={`Increase quantity of ${item.name}`}
            >
              <PlusIcon />
            </button>
          </div>
          <button
            type="button"
            className="line__remove"
            onClick={() => {
              remove(item.id);
              onRemoved?.();
            }}
            aria-label={`Remove ${item.name} from wishlist`}
          >
            Remove
          </button>
        </div>
      </div>
    </li>
  );
}
