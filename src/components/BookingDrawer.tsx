'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface BookingDrawerProps {
  locale?: 'ro' | 'ru' | 'en';
}

const DICTIONARY = {
  ro: {
    title: 'Rezervare Premium',
    sub: 'Completează detaliile pentru a solicita o programare personalizată.',
    name: 'Numele Complet',
    phone: 'Numărul de Telefon',
    service: 'Procedura Dorită',
    date: 'Data Preferată',
    notes: 'Cerințe Speciale / Preferințe',
    submit: 'Solicită Programarea',
    submitting: 'Se procesează solicitarea...',
    successTitle: 'Solicitare Înregistrată',
    successDesc: 'Vă mulțumim pentru încredere. Un consultant Afrodita vă va contacta în cel mai scurt timp pentru confirmarea datei și orei exacte.',
    close: 'Închide',
    selectService: 'Alege o procedură...',
    services: {
      'hydrafacial': 'HydraFacial Clean Face',
      'kobido': 'Masaj Japonez Kobido',
      'fotona-4d': 'Fotona 4D Laser Lifting',
      'soprano-ice': 'Soprano Ice Platinum Epilare',
      'peeling-biorepeel': 'BioRePeel Clasa Premium',
      'curatare-ultrasunete': 'Curățare cu Ultrasunete',
      'curatare-mecanica': 'Curățare Mecanică Tradițională',
      'curatare-combinata': 'Curățare Combinată Premium',
      'hydradermie-lift': 'Tratament Hydradermie Lift',
      'is-clinical-spa': 'iS Clinical Fire & Ice Spa',
      'vivace-rf': 'Vivace RF Microneedling',
      'injectabile': 'Proceduri Injectabile Estetice',
      'piercing': 'Piercing Medical Urechi'
    }
  },
  en: {
    title: 'Bespoke Booking',
    sub: 'Please complete the details to request your personalized treatment.',
    name: 'Full Name',
    phone: 'Phone Number',
    service: 'Select Treatment',
    date: 'Preferred Date',
    notes: 'Special Requests / Preferences',
    submit: 'Request Appointment',
    submitting: 'Processing request...',
    successTitle: 'Request Received',
    successDesc: 'Thank you for choosing Afrodita. A concierge consultant will contact you shortly to confirm your exact session time.',
    close: 'Close',
    selectService: 'Select a service...',
    services: {
      'hydrafacial': 'HydraFacial Clean Face',
      'kobido': 'Kobido Japanese Facial Massage',
      'fotona-4d': 'Fotona 4D Laser Lifting',
      'soprano-ice': 'Soprano Ice Platinum Hair Removal',
      'peeling-biorepeel': 'BioRePeel Premium Grade',
      'curatare-ultrasunete': 'Ultrasound Deep Cleanse',
      'curatare-mecanica': 'Traditional Mechanical Cleanse',
      'curatare-combinata': 'Combined Premium Cleanse',
      'hydradermie-lift': 'Hydradermie Lift Treatment',
      'is-clinical-spa': 'iS Clinical Fire & Ice Spa',
      'vivace-rf': 'Vivace RF Microneedling',
      'injectabile': 'Aesthetic Injectable Procedures',
      'piercing': 'Medical Ear Piercing'
    }
  },
  ru: {
    title: 'Премиум Запись',
    sub: 'Заполните форму, чтобы оставить запрос на персональную процедуру.',
    name: 'Полное Имя',
    phone: 'Номер Телефона',
    service: 'Выберите Процедуру',
    date: 'Желаемая Дата',
    notes: 'Особые пожелания / Примечания',
    submit: 'Отправить Запрос',
    submitting: 'Обработка запроса...',
    successTitle: 'Запрос Принят',
    successDesc: 'Благодарим вас за доверие. Консультант салона Afrodita свяжется с вами в ближайшее время для подтверждения точного времени.',
    close: 'Закрыть',
    selectService: 'Выберите процедуру...',
    services: {
      'hydrafacial': 'HydraFacial Глубокое Очищение',
      'kobido': 'Японский Массаж Лица Кобидо',
      'fotona-4d': 'Fotona 4D Лазерный Лифтинг',
      'soprano-ice': 'Эпиляция Soprano Ice Platinum',
      'peeling-biorepeel': 'Пилинг BioRePeel Премиум класса',
      'curatare-ultrasunete': 'Ультразвуковая Чистка',
      'curatare-mecanica': 'Механическая Чистка Лица',
      'curatare-combinata': 'Комбинированная Чистка Премиум',
      'hydradermie-lift': 'Процедура Hydradermie Lift',
      'is-clinical-spa': 'iS Clinical Fire & Ice Спа-уход',
      'vivace-rf': 'Микроигольчатый Vivace RF',
      'injectabile': 'Эстетические Инъекционные Процедуры',
      'piercing': 'Медицинский Пирсинг Ушей'
    }
  }
};

export default function BookingDrawer() {
  const pathname = usePathname();
  const locale = (['ro', 'ru', 'en'].find(l => pathname.startsWith(`/${l}`)) || 'ro') as 'ro' | 'ru' | 'en';
  
  const [isOpen, setIsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const dict = DICTIONARY[locale];

  useEffect(() => {
    const handleOpen = (e: Event) => {
      const customEvent = e as CustomEvent<{ serviceId?: string }>;
      if (customEvent.detail?.serviceId) {
        setSelectedService(customEvent.detail.serviceId);
      }
      setIsOpen(true);
      setStatus('idle');
    };

    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Intercept any link or button that initiates booking/dialer or contact navigation
      const triggerEl = target.closest('a[href="tel:+37368533337"], button[data-booking-trigger], a[href*="/contact"], .btn-booking-trigger');
      if (triggerEl) {
        e.preventDefault();
        
        // See if there's a dynamic data-service attribute
        const serviceId = triggerEl.getAttribute('data-service-id');
        if (serviceId) {
          setSelectedService(serviceId);
        }
        
        setIsOpen(true);
        setStatus('idle');
      }
    };

    window.addEventListener('open-booking-drawer', handleOpen);
    document.addEventListener('click', handleGlobalClick);
    return () => {
      window.removeEventListener('open-booking-drawer', handleOpen);
      document.removeEventListener('click', handleGlobalClick);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    setStatus('submitting');
    
    // Simulate luxury API booking response
    setTimeout(() => {
      setStatus('success');
      // Reset fields
      setName('');
      setPhone('');
      setDate('');
      setNotes('');
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 1000,
      display: 'flex',
      justifyContent: 'flex-end',
      fontFamily: 'var(--font-sans)'
    }}>
      {/* Background Backdrop Blur */}
      <div 
        onClick={() => setIsOpen(false)}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(26, 26, 26, 0.4)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          transition: 'opacity 0.4s ease'
        }}
      />

      {/* Drawer Body */}
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '480px',
        height: '100%',
        background: 'var(--color-white)',
        boxShadow: '-10px 0 40px rgba(0,0,0,0.15)',
        display: 'flex',
        flexDirection: 'column',
        padding: '40px 32px',
        animation: 'slideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        overflowY: 'auto'
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', fontWeight: 600, color: 'var(--color-onyx)' }}>
            {dict.title}
          </h2>
          <button 
            onClick={() => setIsOpen(false)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1.5rem',
              color: 'var(--color-taupe)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-surface)',
              transition: 'all 0.2s ease'
            }}
          >
            ×
          </button>
        </div>

        {status !== 'success' ? (
          <>
            <p style={{ color: 'var(--color-taupe)', fontSize: '0.875rem', marginBottom: '32px', lineHeight: 1.6 }}>
              {dict.sub}
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', flex: 1 }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-rose-gold)', marginBottom: '8px' }}>
                  {dict.name} *
                </label>
                <input 
                  type="text" 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Maria Ionescu"
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    borderRadius: '8px',
                    border: '1px solid var(--color-surface-dim)',
                    backgroundColor: 'var(--color-surface)',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.9rem',
                    outline: 'none',
                    transition: 'border-color 0.2s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--color-rose-gold)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--color-surface-dim)'}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-rose-gold)', marginBottom: '8px' }}>
                  {dict.phone} *
                </label>
                <input 
                  type="tel" 
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. +373 68 533 337"
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    borderRadius: '8px',
                    border: '1px solid var(--color-surface-dim)',
                    backgroundColor: 'var(--color-surface)',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.9rem',
                    outline: 'none',
                    transition: 'border-color 0.2s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--color-rose-gold)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--color-surface-dim)'}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-rose-gold)', marginBottom: '8px' }}>
                  {dict.service}
                </label>
                <select 
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    borderRadius: '8px',
                    border: '1px solid var(--color-surface-dim)',
                    backgroundColor: 'var(--color-surface)',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.9rem',
                    outline: 'none',
                    cursor: 'pointer',
                    transition: 'border-color 0.2s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--color-rose-gold)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--color-surface-dim)'}
                >
                  <option value="">{dict.selectService}</option>
                  {Object.entries(dict.services).map(([id, label]) => (
                    <option key={id} value={id}>{label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-rose-gold)', marginBottom: '8px' }}>
                  {dict.date}
                </label>
                <input 
                  type="date" 
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    borderRadius: '8px',
                    border: '1px solid var(--color-surface-dim)',
                    backgroundColor: 'var(--color-surface)',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.9rem',
                    outline: 'none',
                    transition: 'border-color 0.2s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--color-rose-gold)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--color-surface-dim)'}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-rose-gold)', marginBottom: '8px' }}>
                  {dict.notes}
                </label>
                <textarea 
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Bespoke requests..."
                  rows={3}
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    borderRadius: '8px',
                    border: '1px solid var(--color-surface-dim)',
                    backgroundColor: 'var(--color-surface)',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.9rem',
                    outline: 'none',
                    resize: 'none',
                    transition: 'border-color 0.2s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--color-rose-gold)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--color-surface-dim)'}
                />
              </div>

              <button 
                type="submit" 
                disabled={status === 'submitting'}
                className="btn btn-primary animate-pulse"
                style={{
                  marginTop: 'auto',
                  width: '100%',
                  padding: '16px',
                  fontSize: '0.95rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px'
                }}
              >
                {status === 'submitting' ? (
                  <>
                    <span className="luxury-spinner" />
                    {dict.submitting}
                  </>
                ) : dict.submit}
              </button>
            </form>
          </>
        ) : (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            flex: 1,
            padding: '24px'
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              backgroundColor: 'rgba(183, 110, 121, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2.5rem',
              color: 'var(--color-rose-gold)',
              marginBottom: '24px',
              animation: 'scaleUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards'
            }}>
              ✓
            </div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-onyx)', marginBottom: '12px' }}>
              {dict.successTitle}
            </h3>
            <p style={{ color: 'var(--color-taupe)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '32px' }}>
              {dict.successDesc}
            </p>
            <button 
              onClick={() => setIsOpen(false)}
              className="btn btn-secondary"
              style={{ padding: '12px 32px' }}
            >
              {dict.close}
            </button>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        @keyframes scaleUp {
          from {
            transform: scale(0.8);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .luxury-spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255,255,255,0.3);
          border-radius: 50%;
          border-top-color: #fff;
          animation: spin 1s ease-in-out infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
