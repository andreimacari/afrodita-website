'use client';

interface PremiumIconProps {
  name: string;
  className?: string;
  size?: number;
  color?: string;
}

export default function PremiumIcon({ name, className = '', size = 24, color = 'var(--color-rose-gold)' }: PremiumIconProps) {
  const icons: Record<string, React.ReactNode> = {
    // 🏆 Why Us: 25+ Ani
    'expert': (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="8" r="7" />
        <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
      </svg>
    ),
    // 👩‍⚕️ Why Us: Specialists
    'staff': (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M19 8v6" />
        <path d="M22 11h-6" />
      </svg>
    ),
    // 🔬 Why Us: Premium Tech
    'tech': (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M10 2h4" />
        <path d="M12 2v20" />
        <path d="M4 18h16" />
        <path d="M8 10h8" />
        <path d="M12 6c-2 0-3 1.5-3 3s1 3 3 3s3-1.5 3-3s-1-3-3-3z" />
      </svg>
    ),
    // 💛 Why Us: Bespoke Approach
    'care': (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    ),
    // 💧 Benefits: HydraFacial glow
    'glow': (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M12 3v3M12 18v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" />
        <circle cx="12" cy="12" r="4" fill="rgba(183, 110, 121, 0.15)" />
      </svg>
    ),
    // 🔬 Benefits: HydraFacial minimized pores
    'pore': (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" fill={color} />
      </svg>
    ),
    // ✨ Benefits: HydraFacial elasticity/firm
    'firm': (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M12 20V4M5 11l7-7 7 7" />
        <path d="M12 4L5 11M19 11l-7-7" />
        <circle cx="12" cy="20" r="1" fill={color} />
      </svg>
    ),
    // 🌸 Benefits: Kobido collagen
    'flower': (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="3" />
        <path d="M12 5.5A2.5 2.5 0 0 1 14.5 3a2.5 2.5 0 0 1 2.5 2.5c0 2-2.5 4.5-5 4.5s-5-2.5-5-4.5A2.5 2.5 0 0 1 9.5 3A2.5 2.5 0 0 1 12 5.5z" />
        <path d="M12 18.5A2.5 2.5 0 0 0 14.5 21a2.5 2.5 0 0 0 2.5-2.5c0-2-2.5-4.5-5-4.5s-5 2.5-5 4.5a2.5 2.5 0 0 0 2.5 2.5a2.5 2.5 0 0 0 2.5-2.5z" />
        <path d="M5.5 12A2.5 2.5 0 0 1 3 9.5A2.5 2.5 0 0 1 5.5 7c2 0 4.5 2.5 4.5 5s-2.5 5-4.5 5A2.5 2.5 0 0 1 3 14.5A2.5 2.5 0 0 1 5.5 12z" />
        <path d="M18.5 12A2.5 2.5 0 0 0 21 9.5A2.5 2.5 0 0 0 18.5 7c-2 0-4.5 2.5-4.5 5s2.5 5 4.5 5a2.5 2.5 0 0 0 2.5-2.5A2.5 2.5 0 0 0 18.5 12z" />
      </svg>
    ),
    // 😌 Benefits: Kobido relaxation
    'relax': (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M12 2c1 2.5 3.5 4.5 6 4.5A5.5 5.5 0 0 1 18 17.5c-2.5 0-5-2-6-4.5c-1 2.5-3.5 4.5-6 4.5A5.5 5.5 0 0 1 6 6.5c2.5 0 5-2 6-4.5z" />
      </svg>
    ),
    // ⏳ Generic tags / duration
    'time': (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    // ✨ Generic tags / pain-free
    'feather': (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
        <line x1="16" y1="8" x2="2" y2="22" />
        <line x1="17.5" y1="15" x2="9" y2="15" />
      </svg>
    ),
    // 🏆 Generic tags / top rank
    'crown': (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z" />
        <path d="M3 20h18" />
      </svg>
    ),
    // 🛡️ Generic benefit: safe
    'shield': (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    // 💡 Recommendation banner tip
    'tip': (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M9.663 17h4.673M12 3v1m6.364.364l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.808 13.064a3 3 0 105.112 0H9.663z" />
        <path d="M15 11a3 3 0 11-6 0c0-1.258.46-2.457 1.3-3.376A3.996 3.996 0 0112 6.5c1.077 0 2.054.424 2.7 1.124.84.919 1.3 2.118 1.3 3.376z" />
      </svg>
    ),
    // 📍 Contact: Location
    'location': (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
        <circle cx="12" cy="10" r="3"></circle>
      </svg>
    ),
    // 📞 Contact: Phone
    'phone': (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
      </svg>
    )
  };

  return icons[name] || icons['care'];
}
