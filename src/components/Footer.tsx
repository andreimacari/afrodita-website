'use client';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';


export default function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();

  const services = [
    { href: 'hydrafacial', label: 'HydraFacial' },
    { href: 'kobido', label: 'Masaj Kobido' },
    { href: 'fotona-4d', label: 'Fotona 4D' },
    { href: 'soprano-ice', label: 'Soprano Ice' },
    { href: 'biorepeel', label: 'BioRePeel' },
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          {/* Brand */}
          <div>
            <div className="footer-logo">Afrodita<span>.</span></div>
            <p className="footer-tagline">
              {t('tagline_1')}<br />{t('tagline_2')}
            </p>
            <div className="footer-socials">
              <a 
                href="https://www.instagram.com/afrodita_beautysalon/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="footer-social-link"
                title="Instagram"
                aria-label="Instagram"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a 
                href="https://www.facebook.com/Afrodita.md/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="footer-social-link"
                title="Facebook"
                aria-label="Facebook"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <p className="footer-heading">{t('services')}</p>
            <ul className="footer-links">
              {services.map(s => (
                <li key={s.href}>
                  <Link href={`/${locale}/services/${s.href}`}>{s.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="footer-heading">{t('contact')}</p>
            <ul className="footer-links">
              <li><a href="tel:+37368533337">+373 68 533 337</a></li>
              <li><a href="tel:+37322274143">+373 22 27 41 43</a></li>
              <li><a href="mailto:salon@afrodita.md">salon@afrodita.md</a></li>
              <li style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8125rem', lineHeight: 1.6 }}>
                Str. 31 August 1989, 79/1<br />Chișinău, Moldova
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Salon Afrodita. {t('rights')}</span>
          <span>Made with ♥ in Chișinău</span>
        </div>
      </div>
    </footer>
  );
}
