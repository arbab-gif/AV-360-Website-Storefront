import SmartImage from './SmartImage.jsx';

export default function CategoryCard({ category, selected, onSelect }) {
  return (
    <button
      type="button"
      className={`category-circle ${selected ? 'is-selected' : ''}`}
      onClick={() => onSelect(category.id)}
      aria-pressed={selected}
    >
      <span className="category-circle__disc">
        <SmartImage id={category.image} alt="" ratio={1} widths={[160, 240]} sizes="100px" />
      </span>
      <span className="category-circle__name">{category.name}</span>
    </button>
  );
}
