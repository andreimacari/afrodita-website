import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import ServicePageClient from '@/components/ServicePageClient';

const DEFAULT_SERVICE_IMAGE = "https://lh3.googleusercontent.com/aida-public/AB6AXuB2mSiDNtcO5Uo5oUe4lIxsqf-KF9pYyuRCa3tcHfQf2Flq3l3HDHXBvlo9GR2zDxHYmMkVEWKCRyoMErigBy7byLSxeBIyhoYfPWafDYhm_XBMNvAtQtmOpY8BoQeuRGcJiRJ5E9R3zk_leG3mfA2efCRMuadRH7O7kPvGoOncVcEoShxrW6_lUvz0jg50DrqBlFKXlNqN0BJC0OImXErpzTZIMsjnu5R5FZvkY1HtsAdC-i5AvtlSHZENMIzOUFci-C8W9Ey7S3Y";

const DEFAULT_FAQS: Record<string, { question: string; answer: string }[]> = {
  ro: [
    { question: 'Procedura este dureroasă?', answer: 'Nu, utilizăm tehnici avansate și, unde este necesar, anestezie locală pentru confortul tău maxim.' },
    { question: 'Cât timp durează efectul?', answer: 'Efectele sunt de lungă durată, însă depind de tipul procedurii și de stilul de viață. Recomandăm ședințe de întreținere.' },
    { question: 'Există o perioadă de recuperare?', answer: 'Majoritatea procedurilor noastre sunt non-invazive și nu necesită timp de recuperare, permițându-ți să revii imediat la activitățile zilnice.' },
    { question: 'Cum mă programez?', answer: 'Te poți programa rapid online folosind butonul "Programează-te" sau contactându-ne telefonic.' }
  ],
  ru: [
    { question: 'Процедура болезненна?', answer: 'Нет, мы используем передовые методы и, при необходимости, местную анестезию для вашего максимального комфорта.' },
    { question: 'Как долго длится эффект?', answer: 'Эффект долговечен, но зависит от типа процедуры и образа жизни. Мы рекомендуем поддерживающие сеансы.' },
    { question: 'Есть ли период восстановления?', answer: 'Большинство наших процедур неинвазивны и не требуют времени на восстановление.' },
    { question: 'Как записаться?', answer: 'Вы можете быстро записаться онлайн, используя кнопку «Записаться», или позвонив нам.' }
  ],
  en: [
    { question: 'Is the procedure painful?', answer: 'No, we use advanced techniques and local anesthesia when necessary for your maximum comfort.' },
    { question: 'How long does the effect last?', answer: 'The effects are long-lasting but depend on the procedure type and lifestyle. We recommend maintenance sessions.' },
    { question: 'Is there a recovery period?', answer: 'Most of our procedures are non-invasive and require no downtime.' },
    { question: 'How do I book?', answer: 'You can quickly book online using the "Book" button or by contacting us by phone.' }
  ]
};

// All services data with full multilingual content
const SERVICES_DATA: Record<string, Record<string, {
  title: string;
  subheadline: string;
  price: string;
  duration: string;
  tags: string[];
  about: string;
  benefits: { icon: string; title: string; desc: string }[];
  steps: { title: string; desc: string }[];
  recommendation?: string;
  bookUrl: string;
  image: string;
}>> = {
  hydrafacial: {
    ro: {
      title: 'HydraFacial Clean Face',
      subheadline: 'Curățare, hidratare și rejuvenare într-o singură ședință. Tehnologie originală SUA.',
      price: '2100',
      duration: '90 min',
      tags: ['⏳ 90 min', '✨ Fără durere', '🏆 Top la Hollywood'],
      about: 'HydraFacial este tratamentul facial de top preferat la Hollywood – o procedură multi-etapă, non-invazivă, care curăță, hidratează și revitalizează pielea din interior. Ideal pentru toate tipurile de ten.',
      benefits: [
        { icon: '💧', title: 'Ten luminos și curat', desc: 'Elimină impuritățile și conferă un luciu sănătos.' },
        { icon: '🔬', title: 'Pori micșorați', desc: 'Reduce vizibil dimensiunea porilor după prima ședință.' },
        { icon: '✨', title: 'Piele fermă și suplă', desc: 'Infuzia de acid hialuronic hidratează în profunzime.' },
      ],
      steps: [
        { title: 'Curățare profundă și exfoliere', desc: 'Eliminarea impurităților de la suprafață.' },
        { title: 'Curățare vacuumatică', desc: 'Extracția punctelor negre prin sucțiune blândă.' },
        { title: 'Hidratare cu seruri', desc: 'Infuzia de antioxidanți și acid hialuronic.' },
        { title: 'Terapie LED', desc: 'Reducerea inflamației și stimularea colagenului.' },
      ],
      recommendation: 'Pentru efecte cumulative recomandăm 3–6 ședințe la intervale de 2–3 săptămâni.',
      bookUrl: 'https://n101864.alteg.io/company/114126/personal/menu',
      image: '/images/services/hydrafacial.png'
    },
    ru: {
      title: 'HydraFacial Clean Face',
      subheadline: 'Очищение, увлажнение и омоложение за одну процедуру. Оригинальная технология США.',
      price: '2100',
      duration: '90 мин',
      tags: ['⏳ 90 мин', '✨ Без боли', '🏆 Выбор Голливуда'],
      about: 'HydraFacial — топовая процедура для лица, любимая в Голливуде. Многоэтапная, неинвазивная процедура, которая очищает, увлажняет и омолаживает кожу изнутри.',
      benefits: [
        { icon: '💧', title: 'Сияющая кожа', desc: 'Устраняет загрязнения и придаёт здоровый блеск.' },
        { icon: '🔬', title: 'Сужение пор', desc: 'Заметно уменьшает поры уже после первого сеанса.' },
        { icon: '✨', title: 'Упругая и гладкая кожа', desc: 'Гиалуроновая кислота увлажняет в глубину.' },
      ],
      steps: [
        { title: 'Глубокое очищение и эксфолиация', desc: 'Удаление загрязнений с поверхности кожи.' },
        { title: 'Вакуумное очищение', desc: 'Мягкое удаление чёрных точек.' },
        { title: 'Увлажнение сыворотками', desc: 'Введение антиоксидантов и гиалуроновой кислоты.' },
        { title: 'LED-терапия', desc: 'Снижение воспаления и стимуляция коллагена.' },
      ],
      recommendation: 'Для накопительного эффекта рекомендуется 3–6 процедур с интервалом 2–3 недели.',
      bookUrl: 'https://n101864.alteg.io/company/114126/personal/menu',
      image: '/images/services/hydrafacial.png'
    },
    en: {
      title: 'HydraFacial Clean Face',
      subheadline: 'Cleansing, hydration and rejuvenation in a single session. Original US technology.',
      price: '2100',
      duration: '90 min',
      tags: ['⏳ 90 min', '✨ Painless', '🏆 Hollywood Favorite'],
      about: 'HydraFacial is the top facial treatment preferred in Hollywood – a multi-step, non-invasive procedure that cleanses, hydrates and revitalizes the skin from within.',
      benefits: [
        { icon: '💧', title: 'Radiant, clean skin', desc: 'Removes impurities and grants a healthy glow.' },
        { icon: '🔬', title: 'Minimized pores', desc: 'Visibly reduces pore size after the first session.' },
        { icon: '✨', title: 'Firm and supple skin', desc: 'Hyaluronic acid infusion hydrates deeply.' },
      ],
      steps: [
        { title: 'Deep cleansing & exfoliation', desc: 'Removing surface impurities.' },
        { title: 'Vacuum extraction', desc: 'Gentle removal of blackheads via suction.' },
        { title: 'Serum infusion', desc: 'Antioxidants and hyaluronic acid infusion.' },
        { title: 'LED therapy', desc: 'Reducing inflammation and stimulating collagen.' },
      ],
      recommendation: 'For cumulative effects, we recommend 3–6 sessions at 2–3 week intervals.',
      bookUrl: 'https://n101864.alteg.io/company/114126/personal/menu',
      image: '/images/services/hydrafacial.png'
    },
  },
  kobido: {
    ro: {
      title: 'Masaj Facial Kobido',
      subheadline: 'O terapie unică ce stimulează colagenul, relaxează mușchii și redă fermitatea tenului.',
      price: '750',
      duration: '30-60 min',
      tags: ['⏳ 30-60 min', '🌿 100% Manual', '🎯 Lifting Japonez'],
      about: 'Descoperă masajul facial japonez Kobido la Salon Afrodita Chișinău. O terapie ancestrală care acționează profund asupra musculaturii feței, stimulând circulația și producția de colagen.',
      benefits: [
        { icon: '🌸', title: 'Stimulează colagenul', desc: 'Presiunile ritmice activează producția naturală de colagen.' },
        { icon: '😌', title: 'Relaxează mușchii faciali', desc: 'Elimină tensiunile acumulate în mușchii feței.' },
        { icon: '✨', title: 'Redă fermitatea', desc: 'Efect vizibil de lifting natural după prima ședință.' },
      ],
      steps: [
        { title: 'Pregătirea tenului', desc: 'Curățare blândă și aplicarea uleiului de masaj.' },
        { title: 'Drenaj limfatic', desc: 'Stimularea circulației limfatice pentru detoxifiere.' },
        { title: 'Presiuni ritmice profunde', desc: 'Tehnica Kobido specifică asupra punctelor de acupresură.' },
        { title: 'Mască de relaxare', desc: 'Finalizare cu o mască calmantă adaptată tipului de ten.' },
      ],
      bookUrl: 'https://n101864.alteg.io/company/114126/personal/menu',
      image: '/images/services/kobido.png'
    },
    ru: {
      title: 'Японский массаж Кобидо',
      subheadline: 'Уникальная терапия для стимуляции коллагена, расслабления мышц и подтяжки лица.',
      price: '750',
      duration: '30-60 мин',
      tags: ['⏳ 30-60 мин', '🌿 100% Ручная', '🎯 Японский лифтинг'],
      about: 'Откройте для себя японский массаж Кобидо в Salon Afrodita Кишинёв. Древняя терапия, которая глубоко воздействует на мышцы лица, стимулируя кровообращение и выработку коллагена.',
      benefits: [
        { icon: '🌸', title: 'Стимуляция коллагена', desc: 'Ритмичные нажатия активируют естественную выработку коллагена.' },
        { icon: '😌', title: 'Расслабление мышц', desc: 'Снимает напряжение с мышц лица.' },
        { icon: '✨', title: 'Упругость кожи', desc: 'Заметный эффект лифтинга уже после первого сеанса.' },
      ],
      steps: [
        { title: 'Подготовка кожи', desc: 'Мягкое очищение и нанесение массажного масла.' },
        { title: 'Лимфодренаж', desc: 'Стимуляция лимфатического кровообращения.' },
        { title: 'Глубокое ритмичное давление', desc: 'Техника Кобидо на акупрессурных точках.' },
        { title: 'Расслабляющая маска', desc: 'Завершение успокаивающей маской.' },
      ],
      bookUrl: 'https://n101864.alteg.io/company/114126/personal/menu',
      image: '/images/services/kobido.png'
    },
    en: {
      title: 'Kobido Facial Massage',
      subheadline: 'A unique therapy that stimulates collagen, relaxes muscles and restores skin firmness.',
      price: '750',
      duration: '30-60 min',
      tags: ['⏳ 30-60 min', '🌿 100% Manual', '🎯 Japanese Lifting'],
      about: 'Discover Kobido Japanese facial massage at Salon Afrodita Chișinău. An ancestral therapy that works deeply on facial muscles, stimulating circulation and collagen production.',
      benefits: [
        { icon: '🌸', title: 'Collagen stimulation', desc: 'Rhythmic pressure activates natural collagen production.' },
        { icon: '😌', title: 'Relaxes facial muscles', desc: 'Releases tension accumulated in facial muscles.' },
        { icon: '✨', title: 'Restores firmness', desc: 'Visible natural lifting effect after the first session.' },
      ],
      steps: [
        { title: 'Skin preparation', desc: 'Gentle cleansing and massage oil application.' },
        { title: 'Lymphatic drainage', desc: 'Stimulating lymphatic circulation for detoxification.' },
        { title: 'Deep rhythmic pressure', desc: 'Specific Kobido technique on acupressure points.' },
        { title: 'Relaxing mask', desc: 'Finishing with a calming mask adapted to skin type.' },
      ],
      bookUrl: 'https://n101864.alteg.io/company/114126/personal/menu',
      image: '/images/services/kobido.png'
    },
  },
};

// Generic fallback for services without full translations yet
function getGenericService(id: string, locale: string, price: string) {
  const titles: Record<string, Record<string, string>> = {
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

  const subs: Record<string, string> = {
    ro: 'Tratament profesional pentru rezultate vizibile și de durată.',
    ru: 'Профессиональная процедура для видимых и долговременных результатов.',
    en: 'Professional treatment for visible and long-lasting results.',
  };

  const aboutText: Record<string, string> = {
    ro: `Descoperă ${titles[id]?.[locale] || id} la Salon Afrodita Chișinău. O procedură realizată de specialiști certificați pentru a-ți evidenția frumusețea naturală.`,
    ru: `Откройте для себя ${titles[id]?.[locale] || id} в Salon Afrodita Кишинёв. Процедура выполняется сертифицированными специалистами.`,
    en: `Discover ${titles[id]?.[locale] || id} at Salon Afrodita Chișinău. A procedure performed by certified specialists to highlight your natural beauty.`,
  };

  const benefits: Record<string, { icon: string; title: string; desc: string }[]> = {
    ro: [
      { icon: '✨', title: 'Rezultate vizibile', desc: 'Efect observabil imediat după procedură.' },
      { icon: '🛡️', title: 'Procedură sigură', desc: 'Realizată cu echipamente certificate și produse premium.' },
      { icon: '⏳', title: 'Efect de lungă durată', desc: 'Rezultate ce se mențin mult timp.' },
    ],
    ru: [
      { icon: '✨', title: 'Видимые результаты', desc: 'Эффект заметен сразу после процедуры.' },
      { icon: '🛡️', title: 'Безопасная процедура', desc: 'Выполняется с сертифицированным оборудованием.' },
      { icon: '⏳', title: 'Долговременный эффект', desc: 'Результаты сохраняются надолго.' },
    ],
    en: [
      { icon: '✨', title: 'Visible results', desc: 'Effect noticeable immediately after treatment.' },
      { icon: '🛡️', title: 'Safe procedure', desc: 'Performed with certified equipment and premium products.' },
      { icon: '⏳', title: 'Long-lasting effect', desc: 'Results that are maintained for a long time.' },
    ],
  };

  const steps: Record<string, { title: string; desc: string }[]> = {
    ro: [
      { title: 'Consultație', desc: 'Evaluarea tipului de piele și stabilirea protocolului.' },
      { title: 'Pregătire', desc: 'Curățarea și pregătirea zonei de tratament.' },
      { title: 'Procedura propriu-zisă', desc: 'Aplicarea tehnicii specifice de către specialist.' },
      { title: 'Recomandări post-tratament', desc: 'Sfaturi pentru menținerea rezultatelor acasă.' },
    ],
    ru: [
      { title: 'Консультация', desc: 'Оценка типа кожи и разработка протокола.' },
      { title: 'Подготовка', desc: 'Очищение и подготовка зоны обработки.' },
      { title: 'Сама процедура', desc: 'Применение специфической техники специалистом.' },
      { title: 'Постпроцедурные рекомендации', desc: 'Советы по уходу в домашних условиях.' },
    ],
    en: [
      { title: 'Consultation', desc: 'Skin type evaluation and protocol establishment.' },
      { title: 'Preparation', desc: 'Cleansing and preparing the treatment area.' },
      { title: 'The procedure itself', desc: 'Application of the specific technique by the specialist.' },
      { title: 'Post-treatment recommendations', desc: 'Tips for maintaining results at home.' },
    ],
  };

  return {
    title: titles[id]?.[locale] || id,
    subheadline: subs[locale] || subs.ro,
    price,
    duration: '30-90 min',
    tags: ['⏳ 30-90 min', '✨ Premium Service', '🏆 Salon Afrodita'],
    about: aboutText[locale] || aboutText.ro,
    benefits: benefits[locale] || benefits.ro,
    steps: steps[locale] || steps.ro,
    faqs: DEFAULT_FAQS[locale] || DEFAULT_FAQS.ro,
    bookUrl: 'https://n101864.alteg.io/company/114126/personal/menu',
    image: `/images/services/${id}.png`,
  };
}

const SERVICE_PRICES: Record<string, string> = {
  hydrafacial: '2100',
  kobido: '750',
  'fotona-4d': '7000',
  'soprano-ice': '350',
  'peeling-biorepeel': '950',
  'curatare-ultrasunete': '950',
  'curatare-mecanica': '950',
  'curatare-combinata': '1650',
  'hydradermie-lift': '1650',
  'is-clinical-spa': '1590',
  'vivace-rf': '2000',
  injectabile: '3900',
  piercing: '300',
};

export async function generateStaticParams() {
  const serviceIds = Object.keys(SERVICE_PRICES);
  const locales = ['ro', 'ru', 'en'];
  return serviceIds.flatMap(id => locales.map(locale => ({ locale, id })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const { locale, id } = await params;
  const service =
    SERVICES_DATA[id]?.[locale] ||
    SERVICES_DATA[id]?.ro ||
    getGenericService(id, locale, SERVICE_PRICES[id] || '0');
  return {
    title: `${service.title} — Salon Afrodita Chișinău`,
    description: service.subheadline,
    alternates: {
      canonical: `/${locale}/services/${id}`,
      languages: {
        ro: `/ro/services/${id}`,
        ru: `/ru/services/${id}`,
        en: `/en/services/${id}`,
      },
    },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const { locale, id } = await params;

  if (!SERVICE_PRICES[id]) notFound();

  let service =
    SERVICES_DATA[id]?.[locale] ||
    SERVICES_DATA[id]?.ro ||
    getGenericService(id, locale, SERVICE_PRICES[id]);
    
  if (!service.faqs) {
    service = { ...service, faqs: DEFAULT_FAQS[locale] || DEFAULT_FAQS.ro };
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.subheadline,
    provider: {
      '@type': 'BeautySalon',
      name: 'Salon Afrodita',
      image: 'https://www.afrodita.md/opengraph-image.png',
    },
    url: `https://www.afrodita.md/${locale}/services/${id}`,
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Acasă', item: `https://www.afrodita.md/${locale}` },
      { '@type': 'ListItem', position: 2, name: service.title, item: `https://www.afrodita.md/${locale}/services/${id}` },
    ],
  };

  const faqLd = service.faqs ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: service.faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  } : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      {faqLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      )}
      <ServicePageClient service={{ ...service, id }} />
    </>
  );
}
