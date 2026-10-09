import { CloseIcon, SearchIcon } from './Icons.jsx';

export default function SearchBox({ value, onChange }) {
  return (
    <form className="search" role="search" onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="item-search" className="sr-only">
        Search items
      </label>
      <SearchIcon className="search__icon" />
      <input
        id="item-search"
        type="search"
        placeholder="Search items"
        autoComplete="off"
        enterKeyHint="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Escape' && value) {
            e.preventDefault();
            onChange('');
          }
        }}
      />
      {value && (
        <button type="button" className="search__clear" onClick={() => onChange('')} aria-label="Clear search">
          <CloseIcon />
        </button>
      )}
    </form>
  );
}
