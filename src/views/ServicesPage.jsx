import {
  ArrowRight,
  BookOpenCheck,
  ClipboardCheck,
  House,
  MonitorSmartphone,
  Target,
} from 'lucide-react';
import Button from '../components/Button';
import FeatureCard from '../components/FeatureCard';
import SectionHeading from '../components/SectionHeading';
import SubjectCard from '../components/SubjectCard';
import { features, steps, subjects } from '../../lib/staticData';

const servicePrograms = [
  {
    title: 'Home Tutoring',
    description:
      'In-person one-on-one sessions at home for students who learn best with direct, face-to-face guidance.',
    icon: House,
  },
  {
    title: 'Online Tutoring',
    description:
      'Live virtual sessions with screen sharing, structured lesson plans, and flexible scheduling across locations.',
    icon: MonitorSmartphone,
  },
  {
    title: 'Homework Support',
    description:
      'Consistent academic help for assignments, revision routines, and daily study habits without overwhelming students.',
    icon: ClipboardCheck,
  },
  {
    title: 'Exam Preparation',
    description:
      'Focused support for school exams, boards, Olympiads, and high-pressure assessments that require a clear strategy.',
    icon: Target,
  },
];

const serviceAssurances = [
  'Tutor matching based on class level, board, subject mix, schedule, and teaching style',
  'Trial-first approach so families can assess comfort, clarity, and consistency before continuing',
  'Progress updates that keep parents informed about attendance, academic gaps, and learning wins',
  'Flexible support options for long-term tutoring, short revision cycles, or focused exam preparation',
];

const learningFormats = [
  {
    title: 'Foundation Building',
    description:
      'Ideal for students who need stronger basics, better pace control, and confidence across core subjects.',
  },
  {
    title: 'Performance Improvement',
    description:
      'Best for learners aiming to improve scores, close concept gaps, and build consistent study discipline.',
  },
  {
    title: 'Exam-Focused Support',
    description:
      'Structured revision, timed practice, and concept reinforcement for milestone tests and final exams.',
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className="services-page__hero services-page__section">
        <div className="services-page__hero-backdrop" />
        <div className="section-shell services-page__hero-grid">
          <div>
            <p className="services-page__eyebrow">Services</p>
            <h1 className="services-page__hero-title">
              Academic support designed around how each student learns best
            </h1>
            <p className="services-page__hero-copy">
              We offer personalized tutoring formats for daily support, concept building, and exam
              preparation, with flexible delivery for families who need dependable results.
            </p>
            <div className="services-page__hero-actions">
              <Button href="/#contact">
                Book a Consultation
                <ArrowRight />
              </Button>
              <Button to="/about" variant="secondary">
                Learn About Us
              </Button>
            </div>
          </div>

          <div className="services-page__stat-grid">
            {[
              { value: '1-on-1', label: 'Dedicated tutoring support' },
              { value: 'Home + Online', label: 'Flexible learning formats' },
              { value: 'School to Exams', label: 'Support across academic stages' },
              { value: 'Parent Updates', label: 'Clear communication throughout' },
            ].map((item) => (
              <article key={item.label} className="services-page__stat-card">
                <p className="services-page__stat-value">{item.value}</p>
                <p className="services-page__stat-label">{item.label}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="services-page__section">
        <div className="section-shell">
          <SectionHeading
            eyebrow="Service Types"
            title="Choose the tutoring format that fits your child’s current needs"
            description="From long-term academic guidance to short, focused support cycles, each service is built to be practical and adaptable."
            align="center"
          />
          <div className="services-page__cards-grid">
            {servicePrograms.map((program) => (
              <FeatureCard key={program.title} {...program} />
            ))}
          </div>
        </div>
      </section>

      <section className="services-page__section services-page__section--muted">
        <div className="section-shell services-page__assurance-grid">
          <div>
            <SectionHeading
              eyebrow="Included"
              title="Every service is built around clarity, consistency, and family trust"
              description="The delivery format can change, but the standard of tutor quality and communication stays the same."
            />
            <div className="services-page__assurances">
              {serviceAssurances.map((item) => (
                <article key={item} className="services-page__assurance">
                  {item}
                </article>
              ))}
            </div>
          </div>

          <div className="services-page__dark-panel">
            <SectionHeading
              eyebrow="Why Families Choose Us"
              title="Support that adapts to pace, pressure, and academic goals"
              description="We keep tutoring structured enough to show progress and flexible enough to work in real family routines."
              tone="light"
            />
            <div className="services-page__feature-list">
              {features.map((feature) => {
                const Icon = feature.icon;

                return (
                  <article key={feature.title} className="services-page__feature-item">
                    <div className="services-page__feature-row">
                      <div className="services-page__feature-icon">
                        <Icon />
                      </div>
                      <div>
                        <h3 className="services-page__feature-title">{feature.title}</h3>
                        <p className="services-page__feature-copy">{feature.description}</p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="services-page__section">
        <div className="section-shell">
          <SectionHeading
            eyebrow="Approach"
            title="Support plans for different academic situations"
            description="Not every student needs the same cadence or level of intervention. We shape the service around the actual need."
            align="center"
          />
          <div className="services-page__approach-grid">
            {learningFormats.map((format) => (
              <article key={format.title} className="glass-card services-page__approach-card">
                <div className="services-page__approach-icon">
                  <BookOpenCheck />
                </div>
                <h3 className="services-page__approach-title">{format.title}</h3>
                <p className="services-page__approach-copy">{format.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="services-page__section services-page__section--muted">
        <div className="section-shell services-page__process-grid">
          <div>
            <SectionHeading
              eyebrow="How It Works"
              title="The setup stays simple from first inquiry to regular sessions"
              description="We keep onboarding straightforward so families can get help quickly and move into a stable learning rhythm."
            />
            <div className="services-page__steps">
              {steps.map((step, index) => (
                <article key={step.title} className="services-page__step">
                  <div className="services-page__step-row">
                    <div className="services-page__step-number">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="services-page__step-title">{step.title}</h3>
                      <p className="services-page__step-copy">{step.description}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div>
            <SectionHeading
              eyebrow="Subjects"
              title="Available across core school subjects and targeted exam support"
              description="Families can start with one subject or build a broader tutoring plan depending on the student’s workload and goals."
            />
            <div className="services-page__subject-grid">
              {subjects.map((subject) => (
                <SubjectCard key={subject.name} {...subject} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="services-page__section">
        <div className="section-shell">
          <div className="services-page__cta-banner">
            <div className="services-page__cta-grid">
              <div className="services-page__cta-copy-wrap">
                <p className="services-page__cta-eyebrow">Start the right plan</p>
                <h2 className="services-page__cta-title">
                  Tell us the subject, class level, and schedule. We’ll recommend the right service.
                </h2>
                <p className="services-page__cta-copy">
                  Whether you need a long-term tutor or short-term academic support, the next step
                  is a quick conversation.
                </p>
              </div>
              <div className="services-page__cta-actions">
                <Button href="/#contact" variant="secondary">
                  Contact Us
                </Button>
                <Button to="/" variant="ghost" className="services-page__ghost-button">
                  Back to Home
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
