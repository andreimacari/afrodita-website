import { getTranslations, setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import Image from 'next/image';
import TreatmentAssistant from '@/components/TreatmentAssistant';
import PremiumIcon from '@/components/PremiumIcon';


const HERO_IMAGE = "/images/hero.png";

const SERVICES = [
  { id: 'hydrafacial', title: 'HydraFacial Clean Face', price: '2100', image: '/images/services/hydrafacial.png', category: 'FACIAL' },
  { id: 'kobido', title: 'Masaj Facial Kobido', price: '750', image: '/images/services/kobido.png', category: 'MASAJ' },
  { id: 'fotona-4d', title: 'Fotona 4D', price: '7000', image: '/images/services/fotona-4d.png', category: 'LASER' },
  { id: 'soprano-ice', title: 'Soprano Ice Platinum', price: '350', image: '/images/services/soprano-ice.png', category: 'LASER' },
  { id: 'peeling-biorepeel', title: 'BioRePeel', price: '950', image: '/images/services/peeling-biorepeel.png', category: 'PEELING' },
  { id: 'curatare-ultrasunete', title: 'Curățare cu Ultrasunete', price: '950', image: '/images/services/curatare-ultrasunete.png', category: 'FACIAL' },
  { id: 'curatare-mecanica', title: 'Curățare Mecanică', price: '950', image: '/images/services/curatare-mecanica.png', category: 'FACIAL' },
  { id: 'curatare-combinata', title: 'Curățare Combinată', price: '1650', image: '/images/services/curatare-combinata.png', category: 'FACIAL' },
  { id: 'hydradermie-lift', title: 'Hydradermie Lift', price: '1650', image: '/images/services/hydradermie-lift.png', category: 'FACIAL' },
  { id: 'is-clinical-spa', title: 'iS Clinical Fire & Ice', price: '1590', image: '/images/services/is-clinical-spa.png', category: 'FACIAL' },
  { id: 'vivace-rf', title: 'Vivace RF Microneedling', price: '2000', image: '/images/services/vivace-rf.png', category: 'LASER' },
  { id: 'injectabile', title: 'Proceduri Injectabile', price: '3900', image: '/images/services/injectabile.png', category: 'MEDICAL' },
  { id: 'piercing', title: 'Piercing Urechi', price: '300', image: '/images/services/piercing.png', category: 'EXTRA' },
];

const SERVICE_TITLES: Record<string, Record<string, string>> = {
  'hydrafacial':         { ro: 'HydraFacial Clean Face', ru: 'HydraFacial Clean Face', en: 'HydraFacial Clean Face' },
  'kobido':              { ro: 'Masaj Facial Kobido', ru: 'Японский массаж Кобидо', en: 'Kobido Facial Massage' },
  'fotona-4d':           { ro: 'Fotona 4D', ru: 'Фотона 4D', en: 'Fotona 4D' },
  'soprano-ice':         { ro: 'Soprano Ice Platinum', ru: 'Soprano Ice Platinum', en: 'Soprano Ice Platinum' },
  'peeling-biorepeel':   { ro: 'BioRePeel', ru: 'BioRePeel', en: 'BioRePeel' },
  'curatare-ultrasunete':{ ro: 'Curățare cu Ultrasunete', ru: 'Ультразвуковая чистка', en: 'Ultrasound Facial Cleansing' },
  'curatare-mecanica':   { ro: 'Curățare Mecanică', ru: 'Механическая чистка', en: 'Mechanical Facial Cleansing' },
  'curatare-combinata':  { ro: 'Curățare Combinată', ru: 'Комбинированная чистка', en: 'Combined Facial Cleansing' },
  'hydradermie-lift':    { ro: 'Hydradermie Lift', ru: 'Hydradermie Lift', en: 'Hydradermie Lift' },
  'is-clinical-spa':     { ro: 'iS Clinical Fire & Ice', ru: 'iS Clinical Fire & Ice', en: 'iS Clinical Fire & Ice' },
  'vivace-rf':           { ro: 'Vivace RF Microneedling', ru: 'Vivace RF Microneedling', en: 'Vivace RF Microneedling' },
  'injectabile':         { ro: 'Proceduri Injectabile', ru: 'Инъекционные процедуры', en: 'Injectable Procedures' },
  'piercing':            { ro: 'Piercing Urechi', ru: 'Пирсинг ушей', en: 'Ear Piercing' },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'home' });
  return {
    title: `Salon Afrodita Chișinău — ${t('hero_title')} ${t('hero_title2')}`,
    description: t('hero_sub'),
    alternates: {
      canonical: `/${locale}`,
      languages: { ro: '/ro', ru: '/ru', en: '/en' },
    },
  };
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'home' });
  const tS = await getTranslations({ locale, namespace: 'services' });

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-bg">
          <Image 
            src={HERO_IMAGE} 
            alt="Interior of Salon Afrodita Beauty in Chișinău" 
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
          <div className="hero-bg-overlay" />
        </div>

        <div className="container">
          <div className="hero-flex">
            <div className="hero-content animate-fadeUp">
              <span className="hero-eyebrow">{t('hero_eyebrow')}</span>
              <h1 className="hero-title">
                {t('hero_title')}<br />
                <span className="hero-title-accent">{t('hero_title2')}</span>
              </h1>
              <p className="hero-sub">{t('hero_sub')}</p>
              <div className="hero-actions">
                <a href="#services" className="btn btn-primary gtm-hero-services">{t('cta')}</a>
                <a href="https://n101864.alteg.io/company/114126/personal/menu" target="_blank" rel="noopener noreferrer" className="btn btn-secondary gtm-hero-book">{t('book')}</a>
              </div>
            </div>
            {/* Visual accent for desktop */}
            <div className="hero-visual desktop-only animate-fadeUp delay-2">
              <div className="hero-badge">
                <span className="hero-badge-year">{t('hero_badge_year')}</span>
                <span className="hero-badge-text" dangerouslySetInnerHTML={{ __html: t('hero_badge_text') }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="section" id="services">
        <div className="container">
          <span className="label animate-fadeUp">Portofoliu de servicii</span>
          <h2 className="h2 animate-fadeUp delay-1" style={{ marginTop: '12px', marginBottom: '8px' }}>
            {tS('title')}
          </h2>
          <p style={{ color: 'var(--color-taupe)', marginBottom: '48px' }} className="animate-fadeUp delay-2">
            {tS('sub')}
          </p>
          <div className="services-grid">
            {SERVICES.map((service, i) => (
              <Link
                href={`/${locale}/services/${service.id}`}
                key={service.id}
                className={`service-card animate-fadeUp delay-${Math.min(i + 1, 4)}`}
                style={{ display: 'block' }}
              >
                <div style={{
                  height: '240px',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <Image 
                    src={service.image} 
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ 
                      objectFit: 'cover',
                      transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                    className="service-card-img"
                  />
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.3))'
                  }} />
                </div>
                <div className="service-card-body" style={{ display: 'flex', flexDirection: 'column', minHeight: '140px', justifyContent: 'space-between' }}>
                  <div>
                    <span className="label" style={{ fontSize: '0.6875rem', marginBottom: '4px', display: 'block', color: 'var(--color-rose-gold)' }}>
                      {service.category}
                    </span>
                    <h3 className="service-card-title">{SERVICE_TITLES[service.id]?.[locale] || service.title}</h3>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
                    <p className="service-card-price" style={{ margin: 0 }}>
                      {tS('from')} {service.price} {tS('mdl')}
                    </p>
                    <div className="ios-details-btn">
                      <span>{tS('details')}</span>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'transform var(--duration) var(--ease)' }} className="ios-arrow"><path d="M9 18l6-6-6-6"/></svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <TreatmentAssistant />

      {/* WHY US */}
      <section className="section" style={{ background: 'var(--color-white)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="label">{t('why_label')}</span>
          <h2 className="h2" style={{ marginTop: '12px', marginBottom: '16px' }}>
            {t('why_title')}
          </h2>
          <div className="divider" style={{ margin: '16px auto' }} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px', marginTop: '48px' }}>
            {[
              { icon: 'expert', title: t('why_years_title'), desc: t('why_years_desc') },
              { icon: 'staff', title: t('why_staff_title'), desc: t('why_staff_desc') },
              { icon: 'tech', title: t('why_tech_title'), desc: t('why_tech_desc') },
              { icon: 'care', title: t('why_care_title'), desc: t('why_care_desc') },
            ].map((item) => (
              <div key={item.title} className="card" style={{ padding: '32px 24px', textAlign: 'center', border: '1px solid rgba(215, 193, 195, 0.15)' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                  <PremiumIcon name={item.icon} size={36} />
                </div>
                <h3 className="h3" style={{ marginBottom: '8px', fontSize: '1.1rem' }}>{item.title}</h3>
                <p style={{ color: 'var(--color-taupe)', fontSize: '0.875rem', lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section style={{
        background: 'var(--color-charcoal)',
        padding: '80px 0',
        textAlign: 'center'
      }}>
        <div className="container">
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.5rem,4vw,2.5rem)', color: 'var(--color-white)', marginBottom: '16px' }}>
            {t('cta_band_title')}
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '32px', fontSize: '1rem' }}>
            {t('cta_band_sub')}
          </p>
          <a href="tel:+37368533337" className="btn btn-primary gtm-home-call" style={{ fontSize: '1rem', padding: '18px 48px' }}>
            📞 +373 68 533 337
          </a>
        </div>
      </section>
    </>
  );
}
