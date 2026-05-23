'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import PremiumIcon from './PremiumIcon';

const DATA = {
  ro: {
    eyebrow: 'Bespoke Consultation',
    title: 'Găsește Tratamentul Tău Ideal',
    sub: 'Descoperă serviciul premium potrivit nevoilor specifice ale tenului tău în doar 3 pași simpli.',
    step: 'Pasul',
    of: 'din',
    next: 'Continuă',
    prev: 'Înapoi',
    reset: 'Începe din nou',
    bookNow: 'Rezervă Acum',
    exploreMore: 'Explorează Procedura',
    questions: [
      {
        id: 'skinType',
        title: 'Care este starea actuală a tenului tău?',
        options: [
          { value: 'mature', label: '✨ Matur / Prezența liniilor fine și ridurilor' },
          { value: 'dehydrated', label: '💦 Deshidratat / Uscat, lipsit de strălucire' },
          { value: 'congested', label: '🌿 Pori dilatați / Puncte negre sau exces de sebum' },
          { value: 'sensitive', label: '🌸 Sensibil / Tendință de înroșire sau iritație' }
        ]
      },
      {
        id: 'goal',
        title: 'Care este rezultatul pe care îl dorești cel mai mult?',
        options: [
          { value: 'lift', label: '🎯 Efect vizibil de lifting și reconturare facială' },
          { value: 'hydrate', label: '💧 Strălucire instantă și hidratare de lungă durată' },
          { value: 'cleanse', label: '🧼 Curățare în profunzime și detoxifiere' },
          { value: 'relax', label: '😌 Relaxare totală a mușchilor faciali și destresare' }
        ]
      },
      {
        id: 'method',
        title: 'Ce tip de tratament sau abordare preferi?',
        options: [
          { value: 'tech', label: '⚡ Tehnologii laser avansate (non-invaziv, clinic)' },
          { value: 'facial', label: '🧴 Îngrijire facială premium (seruri, peelinguri, măști)' },
          { value: 'manual', label: '🙌 Terapie manuală 100% (masaj tradițional)' }
        ]
      }
    ],
    recommendations: {
      'fotona-4d': {
        title: 'Recomandare Premium: Fotona 4D',
        desc: 'Tenul tău va beneficia la maximum de tehnologia noastră laser de top. Fotona 4D oferă un lifting neinvaziv spectaculos acționând atât la exteriorul, cât și la interiorul cavității bucale pentru refacerea completă a colagenului.',
        price: '7000',
        image: '/images/services/fotona-4d.png'
      },
      'hydrafacial': {
        title: 'Recomandare Premium: HydraFacial',
        desc: 'Pentru o curățare profundă combinată cu hidratare intensă, HydraFacial este alegerea ideală. Îndepărtează impuritățile prin vacuum în timp ce infuzează antioxidanți și acid hialuronic pentru un ten impecabil.',
        price: '2100',
        image: '/images/services/hydrafacial.png'
      },
      'kobido': {
        title: 'Recomandare Premium: Masaj Facial Kobido',
        desc: 'Tratamentul ideal pentru tine este Masajul Ancestral Japonez Kobido. O terapie 100% manuală care combină mișcări ritmice rapide cu presopunctura pentru a activa colagenul, a destresa mușchii și a oferi un efect natural de lifting.',
        price: '750',
        image: '/images/services/kobido.png'
      }
    }
  },
  en: {
    eyebrow: 'Bespoke Consultation',
    title: 'Find Your Ideal Treatment',
    sub: 'Discover the premium service perfectly tailored to your skin needs in just 3 simple steps.',
    step: 'Step',
    of: 'of',
    next: 'Next',
    prev: 'Back',
    reset: 'Start Over',
    bookNow: 'Book Appointment',
    exploreMore: 'Explore Treatment',
    questions: [
      {
        id: 'skinType',
        title: 'What is the current condition of your skin?',
        options: [
          { value: 'mature', label: '✨ Mature / Fine lines and loss of firmness' },
          { value: 'dehydrated', label: '💦 Dehydrated / Dry, dull and lacking radiance' },
          { value: 'congested', label: '🌿 Congested / Clogged pores or excess sebum' },
          { value: 'sensitive', label: '🌸 Sensitive / Prone to redness or irritation' }
        ]
      },
      {
        id: 'goal',
        title: 'What is the primary result you want to achieve?',
        options: [
          { value: 'lift', label: '🎯 Visible lifting, tightening and facial contouring' },
          { value: 'hydrate', label: '💧 Instant glowing skin and deep hydration' },
          { value: 'cleanse', label: '🧼 Deep pore cleansing and detoxification' },
          { value: 'relax', label: '😌 Complete relaxation of facial muscles and destressing' }
        ]
      },
      {
        id: 'method',
        title: 'What approach or type of therapy do you prefer?',
        options: [
          { value: 'tech', label: '⚡ Advanced laser/RF technologies (non-invasive)' },
          { value: 'facial', label: '🧴 Premium facial care (serums, gentle peels, masks)' },
          { value: 'manual', label: '🙌 100% Manual therapy (traditional ancestral massage)' }
        ]
      }
    ],
    recommendations: {
      'fotona-4d': {
        title: 'Bespoke Selection: Fotona 4D',
        desc: 'Your skin will benefit the most from our absolute gold-standard laser technology. Fotona 4D delivers a stunning non-invasive facelift, working both externally and intraorally to maximize natural collagen rebuilding.',
        price: '7000',
        image: '/images/services/fotona-4d.png'
      },
      'hydrafacial': {
        title: 'Bespoke Selection: HydraFacial',
        desc: 'For a deep cleanse combined with intense hydration, HydraFacial is your ideal choice. It gently vacuums away impurities while infusing skin with premium antioxidants and hyaluronic acid.',
        price: '2100',
        image: '/images/services/hydrafacial.png'
      },
      'kobido': {
        title: 'Bespoke Selection: Kobido Facial Massage',
        desc: 'The ancestral Japanese Kobido Massage is perfectly suited for you. A 100% manual therapy combining rapid rhythmic touch and acupressure to lift, tone facial muscles, and restore natural glow.',
        price: '750',
        image: '/images/services/kobido.png'
      }
    }
  },
  ru: {
    eyebrow: 'Bespoke Consultation',
    title: 'Найдите Идеальный Уход',
    sub: 'Откройте для себя премиум-процедуру, идеально подходящую потребностям вашей кожи, всего за 3 шага.',
    step: 'Шаг',
    of: 'из',
    next: 'Далее',
    prev: 'Назад',
    reset: 'Начать сначала',
    bookNow: 'Записаться сейчас',
    exploreMore: 'Подробнее о процедуре',
    questions: [
      {
        id: 'skinType',
        title: 'Каково текущее состояние вашей кожи?',
        options: [
          { value: 'mature', label: '✨ Зрелая / Наличие мелких морщин и потеря упругости' },
          { value: 'dehydrated', label: '💦 Обезвоженная / Сухая, тусклая и уставшая' },
          { value: 'congested', label: '🌿 Проблемная / Расширенные поры, комедоны или жирный блеск' },
          { value: 'sensitive', label: '🌸 Чувствительная / Склонная к покраснениям или раздражению' }
        ]
      },
      {
        id: 'goal',
        title: 'Какого главного результата вы хотите достичь?',
        options: [
          { value: 'lift', label: '🎯 Заметный эффект лифтинга и четкие контуры лица' },
          { value: 'hydrate', label: '💧 Мгновенное сияние кожи и глубокое увлажнение' },
          { value: 'cleanse', label: '🧼 Глубокое очищение пор и детоксикация' },
          { value: 'relax', label: '😌 Полное расслабление лицевых мышц и снятие стресса' }
        ]
      },
      {
        id: 'method',
        title: 'Какую методику ухода вы предпочитаете?',
        options: [
          { value: 'tech', label: '⚡ Передовые лазерные/RF технологии (неинвазивно)' },
          { value: 'facial', label: '🧴 Премиум-уход (сыворотки, мягкие пилинги, маски)' },
          { value: 'manual', label: '🙌 100% Мануальная терапия (японский массаж лица)' }
        ]
      }
    ],
    recommendations: {
      'fotona-4d': {
        title: 'Премиум-Выбор: Fotona 4D',
        desc: 'Вашей коже больше всего подойдет наш лазер премиум-класса. Fotona 4D обеспечивает потрясающий безоперационный лифтинг, воздействуя снаружи и изнутри полости рта для максимальной стимуляции коллагена.',
        price: '7000',
        image: '/images/services/fotona-4d.png'
      },
      'hydrafacial': {
        title: 'Премиум-Выбор: HydraFacial',
        desc: 'Для идеального баланса очищения и мгновенного увлажнения выбирайте HydraFacial. Вакуумная технология мягко очищает поры, одновременно насыщая кожу антиоксидантами и гиалуроновой кислотой.',
        price: '2100',
        image: '/images/services/hydrafacial.png'
      },
      'kobido': {
        title: 'Премиум-Выбор: Массаж Кобидо',
        desc: 'Японский императорский массаж лица Кобидо идеально подходит вам. Это полностью ручная терапия, которая сочетает быстрые ритмичные похлопывания с акупрессурой для лифтинга и снятия мышечного тонуса.',
        price: '750',
        image: '/images/services/kobido.png'
      }
    }
  }
};

export default function TreatmentAssistant() {
  const pathname = usePathname();
  const locale = (['ro', 'ru', 'en'].find(l => pathname.startsWith(`/${l}`)) || 'ro') as 'ro' | 'ru' | 'en';
  
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResult, setShowResult] = useState(false);

  const t = DATA[locale];

  const handleSelect = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (currentStep < t.questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResult(true);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentStep(0);
    setShowResult(false);
  };

  const getRecommendationKey = (): 'fotona-4d' | 'hydrafacial' | 'kobido' => {
    const { skinType, goal, method } = answers;
    
    // Mature skin or lift goal with tech preference -> Fotona 4D
    if (skinType === 'mature' || goal === 'lift') {
      if (method !== 'manual') return 'fotona-4d';
    }
    
    // Manual therapy or relaxation goal -> Kobido Massage
    if (method === 'manual' || goal === 'relax') {
      return 'kobido';
    }

    // Default or congested skin -> HydraFacial
    return 'hydrafacial';
  };

  const openBookingDrawer = (serviceId: string) => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-booking-drawer', { detail: { serviceId } }));
    }
  };

  const recommendation = showResult ? t.recommendations[getRecommendationKey()] : null;
  const currentQuestion = t.questions[currentStep];

  return (
    <section className="section" style={{ background: 'var(--color-surface)', borderTop: '1px solid rgba(215, 193, 195, 0.2)' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span className="label">{t.eyebrow}</span>
          <h2 className="h2" style={{ marginTop: '12px', marginBottom: '16px' }}>{t.title}</h2>
          <p style={{ color: 'var(--color-taupe)', fontSize: '0.95rem', lineHeight: 1.6 }}>{t.sub}</p>
        </div>

        {/* Wizard Panel */}
        <div className="glass" style={{
          background: 'var(--color-white)',
          borderRadius: '16px',
          padding: '40px',
          boxShadow: 'var(--shadow-ambient)',
          minHeight: '360px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          border: '1px solid rgba(215, 193, 195, 0.2)'
        }}>
          {!showResult ? (
            <>
              {/* Question View */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--color-taupe)', marginBottom: '24px', fontWeight: 600, letterSpacing: '0.05em' }}>
                  <span>{t.step} {currentStep + 1} {t.of} {t.questions.length}</span>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    {t.questions.map((_, idx) => (
                      <div key={idx} style={{
                        width: '24px',
                        height: '3px',
                        backgroundColor: idx <= currentStep ? 'var(--color-rose-gold)' : 'var(--color-surface-dim)',
                        borderRadius: '2px',
                        transition: 'background-color 0.3s ease'
                      }} />
                    ))}
                  </div>
                </div>

                <h3 className="h3" style={{ fontSize: '1.25rem', marginBottom: '24px', fontWeight: 600, color: 'var(--color-onyx)' }}>
                  {currentQuestion.title}
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {currentQuestion.options.map((opt) => {
                    const isSelected = answers[currentQuestion.id] === opt.value;
                    
                    let iconName = 'care';
                    let cleanLabel = opt.label;
                    const emojis = ['✨', '💦', '🌿', '🌸', '🎯', '💧', '🧼', '😌', '⚡', '🧴', '🙌'];
                    const matchedEmoji = emojis.find(e => opt.label.startsWith(e));
                    
                    if (matchedEmoji) {
                      cleanLabel = opt.label.replace(matchedEmoji, '').trim();
                      if (matchedEmoji === '✨') iconName = 'feather';
                      else if (matchedEmoji === '💦' || matchedEmoji === '💧') iconName = 'glow';
                      else if (matchedEmoji === '🌿') iconName = 'relax';
                      else if (matchedEmoji === '🌸') iconName = 'flower';
                      else if (matchedEmoji === '🎯') iconName = 'expert';
                      else if (matchedEmoji === '🧼') iconName = 'shield';
                      else if (matchedEmoji === '😌') iconName = 'relax';
                      else if (matchedEmoji === '⚡') iconName = 'tech';
                      else if (matchedEmoji === '🧴') iconName = 'care';
                      else if (matchedEmoji === '🙌') iconName = 'care';
                    }

                    return (
                      <button
                        key={opt.value}
                        onClick={() => handleSelect(currentQuestion.id, opt.value)}
                        style={{
                          textAlign: 'left',
                          padding: '16px 20px',
                          borderRadius: '8px',
                          border: isSelected ? '2.5px solid var(--color-rose-gold)' : '1px solid var(--color-surface-dim)',
                          backgroundColor: isSelected ? 'rgba(183, 110, 121, 0.04)' : 'var(--color-surface)',
                          cursor: 'pointer',
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.925rem',
                          fontWeight: isSelected ? 600 : 500,
                          color: isSelected ? 'var(--color-rose-gold)' : 'var(--color-onyx)',
                          transition: 'all 0.2s ease',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          width: '100%'
                        }}
                        onMouseEnter={(e) => {
                          if (!isSelected) e.currentTarget.style.borderColor = 'var(--color-rose-gold)';
                        }}
                        onMouseLeave={(e) => {
                          if (!isSelected) e.currentTarget.style.borderColor = 'var(--color-surface-dim)';
                        }}
                      >
                        <PremiumIcon name={iconName} size={20} color={isSelected ? 'var(--color-rose-gold)' : 'var(--color-taupe)'} />
                        <span>{cleanLabel}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Actions Footer */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px', paddingTop: '20px', borderTop: '1px solid var(--color-surface)' }}>
                <button
                  onClick={handlePrev}
                  disabled={currentStep === 0}
                  className="btn btn-secondary"
                  style={{
                    padding: '10px 24px',
                    fontSize: '0.85rem',
                    opacity: currentStep === 0 ? 0.3 : 1,
                    cursor: currentStep === 0 ? 'not-allowed' : 'pointer'
                  }}
                >
                  ← {t.prev}
                </button>

                <button
                  onClick={handleNext}
                  disabled={!answers[currentQuestion.id]}
                  className="btn btn-primary"
                  style={{
                    padding: '10px 32px',
                    fontSize: '0.85rem',
                    opacity: !answers[currentQuestion.id] ? 0.5 : 1,
                    cursor: !answers[currentQuestion.id] ? 'not-allowed' : 'pointer'
                  }}
                >
                  {t.next} →
                </button>
              </div>
            </>
          ) : (
            /* Result View */
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', animation: 'fadeIn 0.5s ease' }}>
              <div style={{
                position: 'relative',
                width: '100%',
                maxHeight: '280px',
                borderRadius: '12px',
                overflow: 'hidden',
                marginBottom: '24px',
                boxShadow: 'var(--shadow-hover)'
              }}>
                <img 
                  src={recommendation?.image} 
                  alt={recommendation?.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', maxHeight: '280px' }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.4))'
                }} />
              </div>

              <span className="label" style={{ color: 'var(--color-rose-gold)', fontSize: '0.75rem', marginBottom: '8px' }}>
                Bespoke Selection
              </span>
              <h3 className="h3" style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-onyx)', marginBottom: '12px' }}>
                {recommendation?.title}
              </h3>
              <p style={{ color: 'var(--color-taupe)', fontSize: '0.9rem', lineHeight: 1.6, maxWidth: '640px', marginBottom: '24px' }}>
                {recommendation?.desc}
              </p>

              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
                <button
                  onClick={() => openBookingDrawer(getRecommendationKey())}
                  className="btn btn-primary"
                  style={{ padding: '14px 28px' }}
                >
                  {t.bookNow} (De la {recommendation?.price} MDL)
                </button>
                
                <Link
                  href={`/${locale}/services/${getRecommendationKey()}`}
                  className="btn btn-secondary"
                  style={{ padding: '14px 28px' }}
                >
                  {t.exploreMore}
                </Link>
              </div>

              <button
                onClick={handleReset}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--color-taupe)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  cursor: 'pointer',
                  marginTop: '32px',
                  borderBottom: '1px solid transparent',
                  paddingBottom: '2px',
                  transition: 'color 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-rose-gold)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-taupe)'}
              >
                ↻ {t.reset}
              </button>
            </div>
          )}
        </div>
      </div>
      
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
