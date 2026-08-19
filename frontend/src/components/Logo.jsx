const Logo = ({ size = 'md', variant = 'dark' }) => {
  const sizes = { sm: 48, md: 64, lg: 80 };
  const s = sizes[size] || 64;
  const light = variant === 'light';

  const badgeFill = light ? '#FFFFFF' : '#12304A';
  const badgeStroke = light ? '#FFFFFF' : '#12304A';
  const iconColor = light ? '#12304A' : '#FFFFFF';
  const eyeColor = light ? '#FFFFFF' : '#12304A';
  const textPrimary = light ? '#FFFFFF' : '#12304A';
  const textSecondary = light ? 'rgba(255,255,255,0.92)' : '#12304A';

  return (
    <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <svg width={s} height={s} viewBox="0 0 80 80" fill="none" aria-hidden="true">
        <circle cx="40" cy="40" r="38" fill={badgeFill} stroke={badgeStroke} strokeWidth="2" />
        {/* Horse head */}
        <path
          d="M48 28c-2-6-10-8-14-4-3 2-4 6-3 10l2 8 6 4 4-2 2-6-1-10z"
          fill={iconColor}
          opacity="0.95"
        />
        <path d="M34 30c-1 3 0 7 2 10" stroke={eyeColor} strokeWidth="1.5" fill="none" />
        {/* Dog */}
        <ellipse cx="30" cy="48" rx="7" ry="5" fill={iconColor} opacity="0.9" />
        <circle cx="26" cy="46" r="1.2" fill={eyeColor} />
        {/* Cat ears */}
        <path d="M52 44l3-5 3 5-2 3h-4l-2-3z" fill={iconColor} opacity="0.85" />
        {/* Stars */}
        <polygon points="40,14 41.2,17 44.5,17 41.8,19 42.8,22 40,20.2 37.2,22 38.2,19 35.5,17 38.8,17" fill="#C94343" />
        <polygon points="52,18 52.6,19.8 54.5,19.8 53,20.9 53.5,22.7 52,21.6 50.5,22.7 51,20.9 49.5,19.8 51.4,19.8" fill="#C94343" />
        <polygon points="28,18 28.6,19.8 30.5,19.8 29,20.9 29.5,22.7 28,21.6 26.5,22.7 27,20.9 25.5,19.8 27.4,19.8" fill="#C94343" />
        {/* Horizon line */}
        <path d="M18 56h44" stroke="#C94343" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
      </svg>
      <div className="logo-text">
        <span
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: size === 'sm' ? '1.05rem' : '1.25rem',
            fontWeight: 700,
            color: textPrimary,
            display: 'block',
            lineHeight: 1.1,
          }}
        >
          Star Ranch
        </span>
        <span
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: size === 'sm' ? '0.78rem' : '0.875rem',
            color: textSecondary,
            display: 'block',
          }}
        >
          Animal Sanctuary
        </span>
        <span
          style={{
            fontSize: '0.625rem',
            color: '#C94343',
            letterSpacing: '0.1em',
            fontWeight: 600,
          }}
        >
          — EST. 2012 —
        </span>
      </div>
    </div>
  );
};

export default Logo;
