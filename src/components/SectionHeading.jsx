
export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  tone = 'dark',
}) {
  const classes = [
    'section-heading',
    align === 'center' ? 'section-heading--center' : '',
    tone === 'light' ? 'section-heading--light' : 'section-heading--dark',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes}>
      {eyebrow ? (
        <p className="section-heading__eyebrow">{eyebrow}</p>
      ) : null}
      <h2 className="section-title section-heading__title">{title}</h2>
      {description ? <p className="section-copy section-heading__description">{description}</p> : null}
    </div>
  );
}
