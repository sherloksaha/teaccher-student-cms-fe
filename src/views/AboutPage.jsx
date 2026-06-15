import Button from '../components/Button';
import SectionHeading from '../components/SectionHeading';
import TeamCard from '../components/TeamCard';
import { stats, teamMembers, values } from '../../lib/staticData';

export default function AboutPage() {
  return (
    <>
      <section className="about-page__hero about-page__hero-inner">
        <div className="about-page__hero-backdrop" />
        <div className="section-shell">
          <div className="about-page__hero-content">
            <p className="about-page__eyebrow">About Us</p>
            <h1 className="about-page__hero-title">
              Building trusted learning relationships between families and tutors
            </h1>
            <p className="about-page__hero-copy">
              Home Tutor exists to make quality, personalized education accessible to students in
              the comfort of their homes through dependable, student-focused tutors.
            </p>
          </div>
        </div>
      </section>

      <section className="about-page__section">
        <div className="section-shell about-page__intro-grid">
          <article className="glass-card about-page__article">
            <SectionHeading
              eyebrow="Who We Are"
              title="An education service designed around home-based academic support"
              description="We connect students with qualified tutors who understand syllabus needs, exam pressure, and the importance of consistent one-on-one attention."
            />
          </article>
          <article className="about-page__mission-card">
            <p className="about-page__mission-eyebrow">Our Mission</p>
            <h2 className="about-page__mission-title">
              To make personalized learning dependable, approachable, and effective for every family
            </h2>
            <p className="about-page__mission-copy">
              We aim to remove the stress from finding academic support by carefully matching
              students with tutors who can teach clearly, connect well, and drive measurable growth.
            </p>
          </article>
        </div>
      </section>

      <section className="about-page__section about-page__section--muted">
        <div className="section-shell about-page__vision-grid">
          <div className="about-page__vision-card">
            <p className="about-page__vision-eyebrow">Our Vision</p>
            <h2 className="about-page__vision-title">
              To become the most trusted home tutoring partner for modern families
            </h2>
            <p className="about-page__vision-copy">
              We envision a future where every student can access high-quality academic guidance at
              home, build confidence in learning, and progress with the support of caring educators.
            </p>
          </div>
          <div>
            <SectionHeading
              eyebrow="Our Values"
              title="Principles that shape every tutor match and family experience"
              description="These values guide how we screen tutors, communicate with families, and support student progress."
            />
            <div className="about-page__values-grid">
              {values.map((value) => {
                const Icon = value.icon;

                return (
                  <article key={value.title} className="about-page__value-card">
                    <div className="about-page__value-icon">
                      <Icon />
                    </div>
                    <h3 className="about-page__value-title">{value.title}</h3>
                    <p className="about-page__value-copy">{value.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="about-page__section">
        <div className="section-shell about-page__trust-grid">
          <div>
            <SectionHeading
              eyebrow="Why Parents Trust Us"
              title="We keep safety, quality, and communication at the center"
              description="Parents choose Home Tutor because the service feels personal, responsive, and accountable from day one."
            />
          </div>
          <div className="about-page__points">
            {[
              'Background-checked and carefully evaluated tutors',
              'Clear communication from trial sessions to long-term planning',
              'Learning support adapted to pace, goals, and confidence levels',
              'A supportive team that helps families whenever needs change',
            ].map((item) => (
              <div key={item} className="about-page__point-card">
                <p className="about-page__point">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-page__section about-page__section--muted">
        <div className="section-shell">
          <SectionHeading
            eyebrow="Team"
            title="Meet the people behind the Home Tutor experience"
            description="A small but focused education team works to maintain teaching quality and family trust."
            align="center"
          />
          <div className="about-page__team-grid">
            {teamMembers.map((member) => (
              <TeamCard key={member.name} {...member} />
            ))}
          </div>
        </div>
      </section>

      <section className="about-page__section">
        <div className="section-shell">
          <div className="about-page__impact-card">
            <SectionHeading
              eyebrow="Impact"
              title="Growing with students, families, and dedicated tutors"
              description="Our numbers reflect a service built on consistency, word of mouth, and results."
              tone="light"
            />
            <div className="about-page__impact-grid">
              {stats.map((stat) => (
                <article key={stat.label} className="about-page__impact-item">
                  <p className="about-page__impact-item-value">{stat.value}</p>
                  <p className="about-page__impact-item-label">{stat.label}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="about-page__section">
        <div className="section-shell">
          <div className="glass-card about-page__cta-card">
            <div className="about-page__cta-copy-wrap">
              <p className="about-page__cta-eyebrow">Work with us</p>
              <h2 className="about-page__cta-title">Looking for a tutor or ready to join our network?</h2>
              <p className="about-page__cta-copy">
                Reach out to discuss your child’s learning needs or register as a tutor and start
                supporting students with confidence.
              </p>
            </div>
            <div className="about-page__cta-actions">
              <Button href="#contact">Contact Us</Button>
              <Button to="/" variant="secondary">
                Explore Home
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
