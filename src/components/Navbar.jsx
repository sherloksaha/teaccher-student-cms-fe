'use client';

import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { navLinks } from '../../lib/staticData';
import Button from './Button';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname() || '/';
  const { currentUser } = useAuth();

  const resolveHref = (href) => {
    if (href.startsWith('#') && pathname !== '/') {
      return `/${href}`;
    }

    return href;
  };

  const linkClass = (href) =>
    `navbar__nav-link${pathname === href ? ' navbar__nav-link--active' : ''}`;

  const navigationLinks = currentUser
    ? (() => {
        const contactIndex = navLinks.findIndex((link) => link.label === 'Contact');

        if (contactIndex === -1) {
          return [...navLinks, { label: 'Dashboard', href: '/dashboard' }];
        }

        return [
          ...navLinks.slice(0, contactIndex + 1),
          { label: 'Dashboard', href: '/dashboard' },
          ...navLinks.slice(contactIndex + 1),
        ];
      })()
    : navLinks;

  return (
    <header className="navbar">
      <div className="section-shell navbar__inner">
        <Link href="/" className="navbar__brand">
          <img src="/off-campus-logo.svg" alt="Off Campus logo" className="navbar__logo" />
          <div>
            <p className="navbar__brand-title">OFF CAMPUS</p>
            <p className="navbar__brand-subtitle">Trusted learning at home</p>
          </div>
        </Link>

        <nav className="navbar__nav" aria-label="Main navigation">
          {navigationLinks.map((link) =>
            link.href.startsWith('/') ? (
              <Link key={link.label} href={link.href} className={linkClass(link.href)}>
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={resolveHref(link.href)}
                className="navbar__nav-link"
              >
                {link.label}
              </a>
            ),
          )}
        </nav>

        <div className="navbar__cta">
          <Button to={currentUser ? '/dashboard' : '/signup'}>
            {currentUser ? 'Dashboard' : 'Get Started'}
          </Button>
        </div>

        <button
          type="button"
          className="navbar__menu-button"
          onClick={() => setIsOpen((open) => !open)}
          aria-expanded={isOpen}
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X className="navbar__menu-icon" /> : <Menu className="navbar__menu-icon" />}
        </button>
      </div>

      {isOpen ? (
        <div className="navbar__mobile-panel">
          <nav className="section-shell navbar__mobile-nav" aria-label="Mobile navigation">
            {navigationLinks.map((link) =>
              link.href.startsWith('/') ? (
                <Link
                  key={link.label}
                  href={link.href}
                  className={linkClass(link.href)}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={resolveHref(link.href)}
                  className="navbar__nav-link"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              ),
            )}
            <Button
              to={currentUser ? '/dashboard' : '/signup'}
              className="button--full-width"
              onClick={() => setIsOpen(false)}
            >
              {currentUser ? 'Dashboard' : 'Get Started'}
            </Button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
