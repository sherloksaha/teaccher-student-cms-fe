import { Mail, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';
import { footerLinks } from '../../lib/staticData';

export default function Footer() {
  return (
    <footer id="contact" className="footer">
      <div className="section-shell footer__grid">
        <div>
          <div className="footer__brand">
            <img src="/off-campus-logo.svg" alt="Off Campus logo" className="footer__logo" />
            <div>
              <p className="footer__brand-title">OFF CAMPUS</p>
              <p className="footer__brand-subtitle">Trusted tutors. Better learning.</p>
            </div>
          </div>
          <p className="footer__copy">
            We help families find dependable home tutors who support stronger academics, better
            study habits, and more confident students.
          </p>
        </div>

        <div>
          <h3 className="footer__heading">Quick Links</h3>
          <ul className="footer__list">
            {footerLinks.quickLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="footer__link">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="footer__heading">Contact</h3>
          <ul className="footer__list">
            <li className="footer__item">
              <MapPin className="footer__icon" />
              <span>Dhubri</span>
            </li>
            <li className="footer__item">
              <Phone className="footer__icon" />
              <a href="tel:+919876543210" className="footer__link">
                +91 98765 43210
              </a>
            </li>
            <li className="footer__item">
              <Mail className="footer__icon" />
              <a href="mailto:contact@offcampuseducation.com" className="footer__link">
                contact@offcampuseducation.com
              </a>
            </li>
          </ul>
          <div className="footer__socials">
            {footerLinks.socialLinks.map((link) => (
              <a key={link} href="#" className="footer__social-link">
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
