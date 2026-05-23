'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

export default function Navbar() {
  const t = useTranslations('nav');
  const tLang = useTranslations('lang');
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Derive locale from the URL path (always accurate, even after client navigation)
  const locale = (['ro', 'ru', 'en'].find(l => pathname.startsWith(`/${l}`)) || 'ro') as 'ro' | 'ru' | 'en';


  const getLocalePath = (newLocale: string) => {
    const segments = pathname.split('/');
    segments[1] = newLocale;
    return segments.join('/') || `/${newLocale}`;
  };

  const navLinks = [
    { href: `/${locale}`, label: t('services') },
    { href: `/${locale}/about`, label: t('about') },
    { href: `/${locale}/contact`, label: t('contact') },
  ];

  return (
    <nav className="nav glass">
      <div className="nav-inner">
        <Link href={`/${locale}`} className="nav-logo">
          Afrodita<span>.</span>
        </Link>

        <ul className="nav-links">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>

        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          {/* Language Switcher — full page navigation for complete i18n refresh */}
          <div className="lang-switcher">
            {(['ro', 'ru', 'en'] as const).map((lng, i) => (
              <span key={lng} style={{ display: 'flex', alignItems: 'center' }}>
                {i > 0 && <span className="lang-sep">·</span>}
                <Link
                  href={getLocalePath(lng)}
                  className={`lang-btn ${locale === lng ? 'active' : ''}`}
                >
                  {lng.toUpperCase()}
                </Link>
              </span>
            ))}
          </div>

          {/* Book CTA */}
          <a href="https://n101864.alteg.io/company/114126/personal/menu" target="_blank" rel="noopener noreferrer" className="btn btn-primary gtm-nav-book" style={{ padding: '10px 20px', fontSize: '0.75rem' }}>
            {t('book')}
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="nav-mobile-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileOpen
              ? <path d="M18 6L6 18M6 6l12 12" />
              : <path d="M3 12h18M3 6h18M3 18h18" />}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div style={{
          background: 'var(--color-white)',
          borderTop: '1px solid var(--color-surface)',
          padding: '16px 24px 24px'
        }}>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '20px' }}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-onyx)' }}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="lang-switcher">
            {(['ro', 'ru', 'en'] as const).map((lng, i) => (
              <span key={lng} style={{ display: 'flex', alignItems: 'center' }}>
                {i > 0 && <span className="lang-sep">·</span>}
                <Link
                  href={getLocalePath(lng)}
                  className={`lang-btn ${locale === lng ? 'active' : ''}`}
                  onClick={() => setMobileOpen(false)}
                >
                  {tLang(lng)}
                </Link>
              </span>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
