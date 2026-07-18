import React from 'react';

interface AnimatedLogoProps {
  className?: string;
  height?: string | number;
}

export const AnimatedLogo: React.FC<AnimatedLogoProps> = ({ className = '', height = '100%' }) => {
  const css = `
    svg {
      --green-dark: #3f6b28;
      --green: #4f8a34;
      --green-light: #7fb84a;
      --black: #1C2530;
      --gray: #6e6e6e;
      --tea-dark: #a9631c;
      --tea: #d98f2e;
      --tea-light: #f0b45a;
      --saucer-bg: #ffffff;
    }
    
    /* Dark mode overrides using standard CSS selectors */
    html.dark svg,
    .dark svg,
    [class*="dark"] svg {
      --black: #f5f5f5;
      --gray: #8B95A1;
      --saucer-bg: #12181F;
    }

    /* glass + saucer gentle float */
    .glass-group {
      animation: floaty 4s ease-in-out infinite;
      transform-origin: 360px 692px;
    }
    @keyframes floaty {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-5px); }
    }

    .saucer {
      animation: saucerPulse 4s ease-in-out infinite;
      transform-origin: 360px 705px;
    }
    @keyframes saucerPulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.02); }
    }

    /* leaves sway */
    .leaves {
      animation: sway 3.4s ease-in-out infinite;
      transform-origin: 266px 425px;
    }
    @keyframes sway {
      0%, 100% { transform: rotate(-4deg); }
      50% { transform: rotate(4deg); }
    }

    /* steam swirl loop */
    .steam path {
      stroke-dasharray: 260;
      stroke-dashoffset: 260;
      opacity: 0;
      animation: rise 3.4s ease-in-out infinite;
    }
    .steam path.a { animation-delay: 0s; }
    .steam path.b { animation-delay: 0.6s; }
    @keyframes rise {
      0% { stroke-dashoffset: 260; opacity: 0; transform: translateY(8px); }
      15% { opacity: 1; }
      55% { stroke-dashoffset: 0; opacity: 1; transform: translateY(-4px); }
      82% { opacity: 0.4; }
      100% { stroke-dashoffset: 0; opacity: 0; transform: translateY(-14px); }
    }

    /* the little steam dot */
    .steam-dot {
      animation: dotPulse 3.4s ease-in-out infinite;
      transform-origin: 425px 360px;
    }
    @keyframes dotPulse {
      0%, 100% { opacity: 0.4; transform: scale(0.85); }
      50% { opacity: 1; transform: scale(1.1); }
    }

    /* brackets idle bounce */
    .bracket-left {
      animation: bounceL 3s ease-in-out infinite;
      transform-origin: 0px 600px;
    }
    @keyframes bounceL {
      0%, 100% { transform: translateX(0); }
      50% { transform: translateX(-6px); }
    }
    
    .bracket-right {
      animation: bounceR 3s ease-in-out infinite;
      transform-origin: 810px 600px;
    }
    @keyframes bounceR {
      0%, 100% { transform: translateX(0); }
      50% { transform: translateX(6px); }
    }

    /* text entrance */
    .title-word {
      opacity: 0;
      animation: revealUp 0.8s cubic-bezier(.2,.8,.2,1) forwards;
    }
    .title-word.w1 { animation-delay: 0.15s; }
    .title-word.w2 { animation-delay: 0.4s; }
    .title-word.w3 { animation-delay: 0.65s; }
    @keyframes revealUp {
      0% { opacity: 0; transform: translateY(14px); }
      100% { opacity: 1; transform: translateY(0); }
    }

    .subtitle {
      opacity: 0;
      animation: fadeIn 0.8s ease forwards;
      animation-delay: 1s;
    }
    @keyframes fadeIn {
      to { opacity: 1; }
    }

    .subline {
      transform-origin: center;
      animation: growLine 0.8s ease forwards;
      animation-delay: 1s;
      transform: scaleX(0);
    }
    @keyframes growLine {
      to { transform: scaleX(1); }
    }

    @media (prefers-reduced-motion: reduce) {
      .glass-group, .saucer, .leaves, .steam path, .steam-dot, .bracket-left, .bracket-right, .subline {
        animation: none !important;
      }
      .steam path {
        stroke-dashoffset: 0 !important;
        opacity: 0.6 !important;
      }
      .title-word, .subtitle {
        opacity: 1 !important;
        transform: none !important;
      }
      .subline {
        transform: scaleX(1) !important;
      }
    }
  `;

  return (
    <div className={`inline-block ${className}`} style={{ height }}>
      <svg
        viewBox="170 240 1340 520"
        className="w-auto h-full overflow-visible select-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <style dangerouslySetInnerHTML={{ __html: css }} />

        {/* ===================== CHAI GLASS ===================== */}
        <g className="glass-group">
          {/* saucer */}
          <g className="saucer">
            <ellipse cx="360" cy="705" rx="185" ry="42" fill="var(--green-dark)" />
            <ellipse cx="360" cy="692" rx="175" ry="30" fill="var(--saucer-bg)" stroke="var(--green)" strokeWidth="5" />
          </g>

          {/* leaves */}
          <g className="leaves">
            <path d="M250 430 C228 408, 220 380, 236 352 C258 368, 264 402, 250 430 Z" fill="var(--green)" stroke="var(--green-dark)" strokeWidth="2" />
            <path d="M282 420 C300 398, 322 384, 338 400 C316 416, 300 430, 282 420 Z" fill="var(--green-light)" stroke="var(--green-dark)" strokeWidth="2" />
          </g>

          {/* steam */}
          <g className="steam" stroke="var(--green)" strokeWidth="10" fill="none" strokeLinecap="round">
            <path className="a" d="M340 445 C310 405, 335 375, 315 340 C300 315, 320 295, 305 270" />
            <path className="b" d="M375 445 C400 410, 380 380, 400 348" />
          </g>
          <circle className="steam-dot" cx="425" cy="360" r="10" fill="var(--green)" />

          {/* glass outline */}
          <path d="M248 435 L478 435 L445 665 L281 665 Z" fill="none" stroke="var(--green)" strokeWidth="14" strokeLinejoin="round" />

          {/* chai liquid */}
          <path d="M266 462 L460 462 L432 645 L294 645 Z" fill="var(--tea)" />
          <path d="M266 462 L460 462 L453 486 L273 486 Z" fill="var(--tea-light)" />

          {/* vertical ridge lines */}
          <g stroke="var(--tea-dark)" strokeWidth="3" opacity="0.55">
            <line x1="305" y1="470" x2="296" y2="638" />
            <line x1="340" y1="470" x2="336" y2="640" />
            <line x1="375" y1="470" x2="376" y2="642" />
            <line x1="410" y1="470" x2="416" y2="640" />
            <line x1="440" y1="470" x2="450" y2="636" />
          </g>

          {/* glass shine highlight */}
          <path d="M275 460 C270 520, 268 580, 280 640" fill="none" stroke="#ffffff" strokeWidth="10" strokeLinecap="round" opacity="0.55" />
        </g>

        {/* ===================== TEXT LOCKUP ===================== */}
        <g transform="translate(540,0)">
          {/* left bracket */}
          <text x="-70" y="600" fontSize="130" fill="var(--green)" className="bracket-left" fontFamily="Arial Black, sans-serif" fontWeight="900">&lt;</text>

          {/* CODE */}
          <text x="30" y="605" fontSize="118" fill="var(--black)" className="title-word w1" fontFamily="Arial Black, sans-serif" fontWeight="900">CODE</text>

          {/* & */}
          <text x="380" y="605" fontSize="118" fill="var(--black)" className="title-word w2" fontFamily="Arial Black, sans-serif" fontWeight="900">&amp;</text>

          {/* CHAI */}
          <text x="505" y="605" fontSize="118" fill="var(--black)" className="title-word w3" fontFamily="Arial Black, sans-serif" fontWeight="900">CHAI</text>

          {/* right bracket /> */}
          <text x="810" y="600" fontSize="118" fill="var(--green)" className="bracket-right" fontFamily="Arial Black, sans-serif" fontWeight="900">&lt;/&gt;</text>

          {/* subtitle line */}
          <g className="subtitle">
            <line x1="35" y1="655" x2="130" y2="655" stroke="var(--gray)" strokeWidth="4" className="subline" />
            <text x="150" y="666" fontSize="44" letterSpacing="6" fill="var(--gray)" fontFamily="Arial, sans-serif" fontWeight="700">WITH SUDARSHAN</text>
            <line x1="870" y1="655" x2="965" y2="655" stroke="var(--gray)" strokeWidth="4" className="subline" />
          </g>
        </g>
      </svg>
    </div>
  );
};
