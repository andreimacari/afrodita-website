'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import PremiumIcon from './PremiumIcon';

interface ServicePageClientProps {
  service: {
    id?: string;
    title: string;
    subheadline: string;
    price: string;
    duration: string;
    tags: string[];
    about: string;
    benefits: { icon: string; title: string; desc: string }[];
    steps: { title: string; desc: string }[];
    faqs?: { question: string; answer: string }[];
    recommendation?: string;
    bookUrl: string;
    image: string;
  };
}

export default function ServicePageClient({ service }: ServicePageClientProps) {
  const [activeTab, setActiveTab] = useState<'about' | 'benefits' | 'steps' | 'faqs'>('about');
  const t = useTranslations('services');
  const tContact = useTranslations('contact');

  const renderTags = (tags: string[]) => {
    return tags.map((tag) => {
      let iconName = 'care';
      let cleanText = tag;
      if (tag.startsWith('⏳')) { iconName = 'time'; cleanText = tag.replace('⏳', '').trim(); }
      else if (tag.startsWith('✨')) { iconName = 'feather'; cleanText = tag.replace('✨', '').trim(); }
      else if (tag.startsWith('🏆')) { iconName = 'crown'; cleanText = tag.replace('🏆', '').trim(); }
      else if (tag.startsWith('🌿')) { iconName = 'relax'; cleanText = tag.replace('🌿', '').trim(); }
      else if (tag.startsWith('🎯')) { iconName = 'expert'; cleanText = tag.replace('🎯', '').trim(); }

      return (
        <span key={tag} className="tag glass-tag" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          <PremiumIcon name={iconName} size={14} color="var(--color-rose-gold)" />
          {cleanText}
        </span>
      );
    });
  };

  return (
    <div className="service-page-container">
      {/* Left Column: Fixed Visual Panel (Desktop-only split-screen view) */}
      <div className="service-split-left" style={{ position: 'relative' }}>
        <Image 
          src={service.image} 
          alt={service.title} 
          fill
          style={{ objectFit: 'cover' }}
          className="service-split-img"
          priority
        />
        <div className="service-split-tags">
          {renderTags(service.tags)}
        </div>
      </div>

      {/* Right Column: Scrollable Content & Mobile Fallback */}
      <div className="service-split-right">
        {/* Mobile Hero (only visible on mobile) */}
        <div className="service-mobile-hero mobile-only" style={{ position: 'relative' }}>
          <Image 
            src={service.image} 
            alt={service.title} 
            fill
            style={{ objectFit: 'cover' }}
            className="service-hero-img"
            priority
          />
          <div className="service-hero-gradient" />
          <div className="service-tags">
            {renderTags(service.tags)}
          </div>
        </div>

        {/* Main Editorial Content */}
        <div className="service-main-content">
          <div className="breadcrumbs" style={{ fontSize: '0.75rem', color: 'var(--color-taupe)', marginBottom: '16px', display: 'flex', gap: '8px', alignItems: 'center' }}>
            <a href="/" style={{ color: 'var(--color-onyx)', textDecoration: 'none' }}>Home</a>
            <span>›</span>
            <a href="/#services" style={{ color: 'var(--color-onyx)', textDecoration: 'none' }}>Services</a>
            <span>›</span>
            <span style={{ color: 'var(--color-rose-gold)' }}>{service.title}</span>
          </div>
          <h1 className="service-title">{service.title}</h1>
          <p className="service-sub">{service.subheadline}</p>

          <div className="tab-nav">
            {(['about', 'benefits', 'steps'] as const).map((tab) => (
              <button
                key={tab}
                className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {t(`tabs.${tab}`)}
              </button>
            ))}
            {service.faqs && service.faqs.length > 0 && (
              <button
                className={`tab-btn ${activeTab === 'faqs' ? 'active' : ''}`}
                onClick={() => setActiveTab('faqs')}
              >
                FAQ
              </button>
            )}
          </div>

          {/* Tab Content */}
          {activeTab === 'about' && (
            <div className="animate-fadeUp">
              <p style={{ color: 'var(--color-charcoal)', lineHeight: 1.7, fontSize: '0.9375rem' }}>
                {service.about}
              </p>
              {service.recommendation && (
                <div className="rec-banner" style={{ marginTop: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <PremiumIcon name="tip" size={18} color="var(--color-rose-gold)" />
                  <span>{service.recommendation}</span>
                </div>
              )}
            </div>
          )}

          {activeTab === 'benefits' && (
            <div className="animate-fadeUp">
              <div className="benefits-scroll">
                {service.benefits.map((b) => {
                  let iconName = 'care';
                  if (b.icon === '💧') iconName = 'glow';
                  else if (b.icon === '🔬') iconName = 'pore';
                  else if (b.icon === '✨') iconName = 'firm';
                  else if (b.icon === '🌸') iconName = 'flower';
                  else if (b.icon === '😌') iconName = 'relax';
                  else if (b.icon === '🛡️') iconName = 'shield';

                  return (
                    <div key={b.title} className="benefit-card">
                      <div className="benefit-icon" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '12px' }}>
                        <PremiumIcon name={iconName} size={32} />
                      </div>
                      <h3 className="benefit-title">{b.title}</h3>
                      <p className="benefit-desc">{b.desc}</p>
                    </div>
                  );
                })}
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--color-taupe)', marginTop: '24px', textAlign: 'center' }} className="mobile-only">
                ← swipe →
              </p>
            </div>
          )}

          {activeTab === 'steps' && (
            <div className="animate-fadeUp">
              <div className="timeline">
                {service.steps.map((step, i) => (
                  <div key={i} className="timeline-item">
                    <div className="timeline-dot">{i + 1}</div>
                    <div className="timeline-content">
                      <h4>{step.title}</h4>
                      <p>{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'faqs' && service.faqs && (
            <div className="animate-fadeUp">
              <div className="faqs-list" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {service.faqs.map((faq, i) => (
                  <div key={i} className="faq-item" style={{ background: 'rgba(255,255,255,0.5)', padding: '24px', borderRadius: '12px', border: '1px solid rgba(215, 193, 195, 0.2)' }}>
                    <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.125rem', color: 'var(--color-charcoal)', marginBottom: '8px', fontWeight: 500 }}>{faq.question}</h4>
                    <p style={{ fontSize: '0.9375rem', color: 'var(--color-onyx)', lineHeight: 1.6, margin: 0 }}>{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Luxury Sticky bottom Booking Action Bar (shared desktop and mobile) */}
      <div className="service-action-bar glass">
        <div className="booking-price">
          <span className="booking-price-label">{t('from')}</span>
          <span className="booking-price-value">{service.price} {t('mdl')}</span>
        </div>
        <a 
          href={service.bookUrl} 
          data-service-id={service.id}
          className="btn btn-primary gtm-service-book" 
          style={{ padding: '16px 36px', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}
        >
          {t('book')}
        </a>
      </div>
    </div>
  );
}
