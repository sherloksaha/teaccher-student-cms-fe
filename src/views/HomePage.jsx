'use client';

import { ArrowRight, CheckCircle2, ShieldCheck, Star } from 'lucide-react';
import { useMemo } from 'react';
import Button from '../components/Button';
import FeatureCard from '../components/FeatureCard';
import SectionHeading from '../components/SectionHeading';
import SubjectCard from '../components/SubjectCard';
import TestimonialCard from '../components/TestimonialCard';
import {
  chooseUsPoints,
  features,
  subjects,
  testimonials,
} from '../../lib/staticData';

export default function HomePage() {
  const testimonialSlides = useMemo(() => {
    if (testimonials.length === 0) {
      return [];
    }

    return [...testimonials, testimonials[0]];
  }, []);

  return (
    <>
      <section className="home-page__hero">
        <div className="home-page__hero-backdrop" />
        <div className="section-shell home-page__hero-grid">
          <div className="animate-fade-up">
            <div className="home-page__hero-badge">
              <ShieldCheck />
              Trusted tutors for focused home learning
            </div>
            <h1 className="home-page__hero-title">
              Find the Best Home Tutors for Your Child
            </h1>
            <p className="home-page__hero-copy">
              Personalized at-home learning with qualified tutors who understand your child’s
              pace, curriculum, and academic goals.
            </p>
            <div className="home-page__hero-actions">
              <Button to="/signup?role=student">
                Find a Tutor
                <ArrowRight />
              </Button>
            </div>
            <div className="home-page__hero-stats">
              {[
                { label: 'Verified Tutors', value: '350+' },
                { label: 'Students Supported', value: '2,500+' },
                { label: 'Parent Satisfaction', value: '96%' },
              ].map((item) => (
                <div key={item.label}>
                  <p className="home-page__hero-stat-value">{item.value}</p>
                  <p className="home-page__hero-stat-label">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="home-page__hero-visual animate-fade-up">
            <div className="home-page__hero-glow" />
            <div className="glass-card home-page__hero-card">
              <img
                src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80"
                alt="Tutor helping a student study at home"
                className="home-page__hero-image"
              />
              <div className="home-page__highlight-card">
                <div className="home-page__highlight-row">
                  <div>
                    <p className="home-page__highlight-label">Personalized Progress</p>
                    <h2 className="home-page__highlight-title">
                      Academic support built around each learner
                    </h2>
                  </div>
                  <div className="home-page__highlight-icon">
                    <Star />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="home-page__section">
        <div className="section-shell">
          <SectionHeading
            eyebrow="Benefits"
            title="Everything parents look for in a dependable tutoring service"
            description="Our model is built to support academic improvement while keeping the experience safe, structured, and easy to manage."
            align="center"
          />
          <div className="home-page__cards-grid">
            {features.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </div>
      </section>

      <section className="home-page__section home-page__section--muted">
        <div className="section-shell">
          <div className="home-page__support-card">
            <p className="home-page__support-eyebrow">Why this works</p>
            <h2 className="home-page__support-title">Support that feels personal, structured, and reliable</h2>
            <p className="home-page__support-copy">
              From the first call to ongoing progress updates, the experience is designed to reduce
              stress for families and create a positive rhythm for students.
            </p>
            <div className="home-page__support-grid">
              <div className="home-page__support-mini">
                <CheckCircle2 />
                <p className="home-page__support-mini-title">1-on-1 Attention</p>
                <p className="home-page__support-mini-copy">
                  Tutors focus on individual strengths, gaps, and study habits.
                </p>
              </div>
              <div className="home-page__support-mini">
                <CheckCircle2 />
                <p className="home-page__support-mini-title">Regular Feedback</p>
                <p className="home-page__support-mini-copy">
                  Parents stay updated with clear communication and visible progress.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="home-page__section">
        <div className="section-shell">
          <SectionHeading
            eyebrow="Popular Subjects"
            title="Academic support across core school subjects"
            description="Choose tutors for foundational subjects, exam preparation, and skill-building areas."
            align="center"
          />
          <div className="home-page__subject-grid">
            {subjects.map((subject) => (
              <SubjectCard key={subject.name} {...subject} />
            ))}
          </div>
        </div>
      </section>

      <section id="tutors" className="home-page__section home-page__section--muted">
        <div className="section-shell home-page__trust-grid">
          <div>
            <SectionHeading
              eyebrow="Why Choose Us"
              title="A parent-friendly service designed for trust and measurable progress"
              description="We combine careful tutor screening with warm, consistent support for students and families."
            />
          </div>
          <div className="home-page__points">
            {chooseUsPoints.map((point) => (
              <div key={point} className="home-page__point">
                <div className="home-page__point-icon">
                  <CheckCircle2 />
                </div>
                <p className="home-page__point-copy">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="home-page__section">
        <div className="section-shell">
          <SectionHeading
            eyebrow="Testimonials"
            title="What parents and students say about Home Tutor"
            description="Real feedback from families who wanted dependable academic support at home."
            align="center"
          />
          <div className="home-page__testimonial-slider home-page__testimonial-slider--desktop">
            <div className="home-page__testimonial-grid">
              {testimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.name} {...testimonial} />
              ))}
            </div>
          </div>
          <div className="home-page__testimonial-slider home-page__testimonial-slider--mobile">
            <div
              className="home-page__testimonial-mobile-track"
              style={{ '--slide-count': testimonialSlides.length }}
            >
              {testimonialSlides.map((slide, index) => (
                <div key={`slide-${index}`} className="home-page__testimonial-mobile-slide">
                  <TestimonialCard key={`${slide.name}-${index}`} {...slide} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="home-page__section">
        <div className="section-shell">
          <div className="home-page__cta-banner">
            <div className="home-page__cta-grid">
              <div className="home-page__cta-copy-wrap">
                <p className="home-page__cta-eyebrow">Ready to begin?</p>
                <h2 className="home-page__cta-title">Help your child learn with confidence at home</h2>
                <p className="home-page__cta-copy">
                  Tell us what support you need, and we’ll help you find the right tutor quickly.
                </p>
              </div>
              <div className="home-page__cta-actions">
                <Button to="/signup" variant="secondary">
                  Get Started
                </Button>
                <Button to="/about" variant="ghost" className="home-page__ghost-button">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
