
export default function TeamCard({ name, role, bio, image }) {
  return (
    <article className="team-card">
      <img src={image} alt={name} className="team-card__image" />
      <div className="team-card__body">
        <h3 className="team-card__name">{name}</h3>
        <p className="team-card__role">{role}</p>
        <p className="team-card__bio">{bio}</p>
      </div>
    </article>
  );
}
