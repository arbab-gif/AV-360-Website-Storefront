import { ArrowIcon } from './Icons.jsx';
import SmartImage from './SmartImage.jsx';

export default function CategoryCard({ category, selected, onSelect }) {
  return (
    <button
      type="button"
      className={`category-circle ${selected ? 'is-selected' : ''}`}
      onClick={() => onSelect(category.id)}
      aria-pressed={selected}
      aria-label={`${category.name}. Show these items.`}
    >
      <span className="category-circle__disc">
        <SmartImage id={category.image} alt={category.alt} ratio={1} widths={[200, 320, 440]} sizes="170px" />
        <span className="category-circle__arrow" aria-hidden="true">
          <ArrowIcon />
        </span>
      </span>
      <span className="category-circle__name">{category.name}</span>
    </button>
  );
}
