import { Quote } from 'lucide-react';

export default function TestimonialCard({ name, role, quote, image }) {
  return (
    <article className="glass-card testimonial-card">
      <div className="testimonial-card__header">
        <div className="testimonial-card__person">
          <img src={image} alt={name} className="testimonial-card__image" />
          <div>
            <h3 className="testimonial-card__name">{name}</h3>
            <p className="testimonial-card__role">{role}</p>
          </div>
        </div>
        <Quote className="testimonial-card__quote-icon" />
      </div>
      <p className="testimonial-card__quote">{quote}</p>
    </article>
  );
}
