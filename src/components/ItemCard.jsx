import { categoryById } from '../data/catalog.js';
import { useWishlist } from '../context/WishlistContext.jsx';
import { HeartIcon } from './Icons.jsx';
import SmartImage from './SmartImage.jsx';

export default function ItemCard({ item }) {
  const { has, add, open } = useWishlist();
  const added = has(item.id);
  const category = categoryById[item.category];

  return (
    <article className={`item-card ${added ? 'is-added' : ''}`} aria-labelledby={`item-${item.id}`}>
      <div className="item-card__media">
        <SmartImage
          id={item.image}
          alt={item.alt}
          ratio={1.2}
          widths={[320, 480, 720]}
          sizes="(min-width: 1200px) 22vw, (min-width: 900px) 30vw, (min-width: 560px) 45vw, 92vw"
        />
      </div>
      <div className="item-card__body">
        <p className="item-card__category">{category.name}</p>
        <h3 id={`item-${item.id}`} className="item-card__name">
          {item.name}
        </h3>
        <p className="item-card__detail">{item.detail}</p>
        <button
          type="button"
          className={`wish-toggle ${added ? 'is-added' : ''}`}
          onClick={() => (added ? open() : add(item.id))}
          aria-label={added ? `${item.name} added to wishlist — view wishlist` : `Add ${item.name} to wishlist`}
        >
          <HeartIcon filled={added} className="wish-toggle__icon" />
          {added ? 'Added to Wishlist' : 'Add to Wishlist'}
        </button>
      </div>
    </article>
  );
}
