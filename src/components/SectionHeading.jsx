export default function SectionHeading({ id, label, title, text, className = '' }) {
  return (
    <header className={`section-heading ${className}`}>
      {label && <span className="section-heading__label code">{label}</span>}
      <h2 id={id} className="section-heading__title" data-focus-target>
        {title}
      </h2>
      {text && <p className="section-heading__text">{text}</p>}
    </header>
  );
}
