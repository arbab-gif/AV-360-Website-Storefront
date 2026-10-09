import { categories } from '../data/catalog.js';
import CategoryCard from './CategoryCard.jsx';
import SectionHeading from './SectionHeading.jsx';

export default function CategorySection({ selected, onSelect }) {
  return (
    <section id="rentals" className="section categories" aria-labelledby="rentals-title">
      <div className="container">
        <SectionHeading
          id="rentals-title"
          className="categories__head"
          title={
            <>
              Find the pieces for <em>your event.</em>
            </>
          }
          text="Explore essentials and finishing touches for every celebration."
        />

        <ul className="categories__row">
          {categories.map((category) => (
            <li key={category.id}>
              <CategoryCard
                category={category}
                selected={selected === category.id}
                onSelect={onSelect}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
