import { getTranslations } from 'next-intl/server';
import PremiumIcon from '@/components/PremiumIcon';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });
  return {
    title: `${t('title')} — Salon Afrodita Chișinău`,
    description: t('sub'),
    alternates: {
      canonical: `/${locale}/contact`,
      languages: { ro: '/ro/contact', ru: '/ru/contact', en: '/en/contact' },
    },
  };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });

  return (
    <>
      {/* Hero */}
      <section style={{ 
        padding: '140px 0 100px', 
        background: `linear-gradient(to bottom, rgba(250, 249, 246, 0.4), rgba(250, 249, 246, 1)), url('/images/contact-bg.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="label animate-fadeUp">Salon Afrodita · Chișinău</span>
          <div className="divider" style={{ margin: '16px auto' }} />
          <h1 className="h1 animate-fadeUp delay-1">{t('title')}</h1>
          <p style={{ color: 'var(--color-taupe)', marginTop: '16px', fontSize: '1.0625rem' }}>
            {t('sub')}
          </p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-card animate-fadeUp delay-1">
              <div className="contact-card-icon" style={{ display: 'flex', marginBottom: '20px' }}>
                <PremiumIcon name="location" size={28} />
              </div>
              <p className="contact-card-title">{t('address_title')}</p>
              <p className="contact-card-text">{t('address')}</p>
            </div>

            <div className="contact-card animate-fadeUp delay-2">
              <div className="contact-card-icon" style={{ display: 'flex', marginBottom: '20px' }}>
                <PremiumIcon name="phone" size={28} />
              </div>
              <p className="contact-card-title">{t('contact_title')}</p>
              <p className="contact-card-text">
                <a href="tel:+37368533337" className="gtm-contact-phone" style={{ display: 'block', marginBottom: '4px', color: 'var(--color-rose-gold)', fontWeight: 600 }}>
                  +373 68 533 337
                </a>
                <a href="tel:+37322274143" className="gtm-contact-phone" style={{ display: 'block', marginBottom: '4px', color: 'var(--color-rose-gold)', fontWeight: 600 }}>
                  +373 22 27 41 43
                </a>
                <a href="mailto:salon@afrodita.md" style={{ color: 'var(--color-charcoal)' }}>
                  salon@afrodita.md
                </a>
              </p>
            </div>

            <div className="contact-card animate-fadeUp delay-3">
              <div className="contact-card-icon" style={{ display: 'flex', marginBottom: '20px' }}>
                <PremiumIcon name="time" size={28} />
              </div>
              <p className="contact-card-title">{t('hours_title')}</p>
              <p className="contact-card-text">
                {t('hours_week')}<br />
                {t('hours_weekend')}
              </p>
            </div>
          </div>

          {/* Map */}
          <div className="map-placeholder animate-fadeUp delay-4">
            <iframe
              src="https://maps.google.com/maps?width=100%25&height=100%25&hl=en&q=Salon%20Afrodita,%20Strada%2031%20August%201989%2079/1,%20Chi%C8%99in%C4%83u,%20Moldova+(Salon%20Afrodita)&t=&z=16&ie=UTF8&iwloc=B&output=embed"
              title="Salon Afrodita location"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              style={{ width: '100%', height: '100%', border: 'none', borderRadius: '16px' }}
            />
          </div>

          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <p style={{ color: 'var(--color-taupe)', marginBottom: '24px', fontSize: '1rem' }}>
              {t('welcome')}
            </p>
            <a href="https://n101864.alteg.io/company/114126/personal/menu" target="_blank" rel="noopener noreferrer" className="btn btn-primary gtm-contact-book" style={{ fontSize: '1.0625rem', padding: '18px 48px' }}>
              {t('book')}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
