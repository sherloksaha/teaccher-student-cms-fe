import { ArrowUpRight } from 'lucide-react';

export default function SubjectCard({ name, description }) {
  return (
    <article className="subject-card">
      <div className="subject-card__header">
        <h3 className="subject-card__title">{name}</h3>
        <ArrowUpRight className="subject-card__icon" />
      </div>
      <p className="subject-card__description">{description}</p>
    </article>
  );
}
