import { getTranslations } from 'next-intl/server';
import Image from 'next/image';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });
  return {
    title: `Despre Noi — Salon Afrodita Chișinău`,
    description: t('story'),
    alternates: {
      canonical: `/${locale}/about`,
      languages: { ro: '/ro/about', ru: '/ru/about', en: '/en/about' },
    },
  };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });

  return (
    <>
      {/* Hero */}
      <section className="about-hero" style={{ position: 'relative', overflow: 'hidden', minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
        <Image 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCPpkOR8KZz59YrkWKSx9mCwMMpMw58P02hUe2lmfRqXuho1ok5A677ZkgRmCmn81OraOXJMmzwX7ymh7LI1Z_g_yXV8-rerrE8i04XkJqB0zBDxOBIh-FK6uVpobaX7RAbcHB6EHozgoKN2ZXiDeIHlyhHy16P1UoLWckzkOkaiaZsjoXwFcbraPLdIr5RkKYHmCqLFCZznPo5GdHPpM178amwWFsqdcgmIoCWWXhkiSvMD6N7ye7X2xaThiwrN9cJmpiWas-98yA" 
          alt="Echipa și interiorul Salonului Afrodita din Chișinău" 
          fill
          style={{ objectFit: 'cover', zIndex: 0 }}
          priority
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(252,249,248,0.95) 40%, rgba(252,249,248,0.4) 100%)', zIndex: 1 }} />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <span className="label animate-fadeUp">Despre Noi</span>
          <div className="divider" style={{ marginTop: '16px' }} />
          <h1 className="h1 animate-fadeUp delay-1" style={{ maxWidth: '600px', marginBottom: '16px' }}>
            {t('title')}
          </h1>
          <p style={{ color: 'var(--color-taupe)', fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '1.25rem', maxWidth: '500px' }}>
            {t('sub')}
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="section" style={{ background: 'var(--color-white)' }}>
        <div className="container" style={{ maxWidth: '760px' }}>
          <span className="label">Filosofia noastră</span>
          <div className="divider" style={{ marginTop: '12px' }} />
          <p style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)',
            color: 'var(--color-onyx)',
            lineHeight: 1.8,
            marginTop: '24px'
          }}>
            {t('story')}
          </p>
        </div>
      </section>

      {/* Heritage */}
      <section className="heritage-section" style={{ position: 'relative', overflow: 'hidden', padding: '120px 0' }}>
        <Image 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZ473UMKzplPmGxE2P3lj51mLsNWmukNG_p1reRpmGT0m4c0MsKT6ug158fV0JgenCnNsn7BLN6fUZOhKGB9Xh0AKkFxex7fAuIoGInY18SbsNVLDsZApBKmLZN28Fig6h_Wij3p7DHQrTNKWvFELDWTgxRdo9f0ySnMCXdQgWQ2RyI7qlgKHRKeWZtbRgoRG4JYhCHqeyCw6zAOiQRqehiUIbRMnqqo7XcCLk9vjAMqKm1sokuAtK3MZN8NFCxLv94DWBePA0uGQ" 
          alt="Istoria și tradiția Salon Afrodita încă din 1999" 
          fill
          style={{ objectFit: 'cover', zIndex: 0 }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(26,26,26,0.85)', zIndex: 1 }} />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="heritage-year">1999</div>
          <span className="label" style={{ color: 'var(--color-rose-gold)' }}>{t('heritage_title')}</span>
          <p style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)',
            color: 'rgba(255,255,255,0.9)',
            lineHeight: 1.8,
            maxWidth: '640px',
            marginTop: '16px'
          }}>
            {t('heritage')}
          </p>
        </div>
      </section>

      {/* Team */}
      <section className="section">
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="label">{t('team_title')}</span>
          <div className="divider" style={{ margin: '16px auto' }} />
          <p style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
            color: 'var(--color-charcoal)',
            maxWidth: '640px',
            margin: '0 auto 48px',
            lineHeight: 1.7
          }}>
            &ldquo;{t('team')}&rdquo;
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', flexWrap: 'wrap' }}>
            {[
              { role: 'Specialist Facial', image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=200&q=80' },
              { role: 'Dermatolog', image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=200&q=80' },
              { role: 'Maseur', image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=200&q=80' },
              { role: 'Cosmetolog', image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=200&q=80' },
              { role: 'Laser Expert', image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=200&q=80' }
            ].map((item) => (
              <div key={item.role} className="card" style={{ padding: '32px 24px', width: '160px', textAlign: 'center' }}>
                <div style={{
                  width: '72px', height: '72px', borderRadius: '50%',
                  margin: '0 auto 16px', overflow: 'hidden', position: 'relative'
                }}>
                  <Image src={item.image} alt={item.role} fill sizes="72px" style={{ objectFit: 'cover' }} />
                </div>
                <p style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-charcoal)' }}>{item.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
