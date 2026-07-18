import React from 'react';

interface AnimatedLogoProps {
  className?: string;
  height?: string | number;
}

export const AnimatedLogo: React.FC<AnimatedLogoProps> = ({ className = '', height = '100%' }) => {
  return (
    <div className={`inline-block ${className}`} style={{ height }}>
      <svg
        viewBox="170 320 1360 425"
        className="w-auto h-full overflow-visible select-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <style>{`
          svg {
            --logo-green: #8ecb2e;
            --logo-green-glow: #a6e639;
            --logo-white: #1C2530;
            --logo-glow-white-color: rgba(28, 37, 48, 0.3);
          }
          
          /* Dark mode variables override based on html class */
          :global(.dark) svg,
          .dark svg,
          [class*="dark"] svg {
            --logo-white: #f5f5f5;
            --logo-glow-white-color: rgba(255, 255, 255, 0.5);
          }

          .glow-green {
            filter: drop-shadow(0 0 2px var(--logo-green)) drop-shadow(0 0 6px var(--logo-green-glow));
          }
          .glow-white {
            filter: drop-shadow(0 0 2px var(--logo-white)) drop-shadow(0 0 5px var(--logo-glow-white-color));
          }

          /* saucer pulse */
          .saucer {
            animation: pulseGlow 3s ease-in-out infinite;
            transform-origin: 360px 705px;
          }
          @keyframes pulseGlow {
            0%, 100% { 
              opacity: 0.75; 
              filter: drop-shadow(0 0 3px var(--logo-green)) drop-shadow(0 0 8px var(--logo-green-glow)); 
            }
            50% { 
              opacity: 1; 
              filter: drop-shadow(0 0 6px var(--logo-green)) drop-shadow(0 0 16px var(--logo-green-glow)); 
            }
          }

          /* glass container gentle float */
          .glass-group {
            animation: floaty 4s ease-in-out infinite;
            transform-origin: 360px 690px;
          }
          @keyframes floaty {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-6px); }
          }

          /* steam */
          .steam path {
            stroke-dasharray: 260;
            stroke-dashoffset: 260;
            animation: rise 3.2s ease-in-out infinite;
            opacity: 0;
          }
          .steam path:nth-child(1) { animation-delay: 0s; }
          .steam path:nth-child(2) { animation-delay: 0.5s; }
          @keyframes rise {
            0% { stroke-dashoffset: 260; opacity: 0; transform: translateY(10px); }
            15% { opacity: 1; }
            55% { stroke-dashoffset: 0; opacity: 0.9; transform: translateY(-4px); }
            80% { opacity: 0.4; }
            100% { stroke-dashoffset: 0; opacity: 0; transform: translateY(-14px); }
          }

          /* leaf sway */
          .leaves {
            animation: sway 3.2s ease-in-out infinite;
            transform-origin: 270px 440px;
          }
          @keyframes sway {
            0%, 100% { transform: rotate(-3deg); }
            50% { transform: rotate(3deg); }
          }

          /* code brackets flicker like a cursor / neon sign */
          .bracket {
            animation: flicker 3.6s ease-in-out infinite;
          }
          .bracket.right { animation-delay: 1.8s; }
          @keyframes flicker {
            0%, 92%, 100% { 
              opacity: 1; 
              filter: drop-shadow(0 0 3px var(--logo-green)) drop-shadow(0 0 10px var(--logo-green-glow)); 
            }
            93% { opacity: 0.3; }
            95% { opacity: 1; }
            96% { opacity: 0.4; }
            97% { opacity: 1; }
          }

          /* text reveal animation */
          .title-word {
            opacity: 0;
            animation: revealUp 0.9s cubic-bezier(.2,.8,.2,1) forwards;
          }
          .title-word.w1 { animation-delay: 0.2s; }
          .title-word.w2 { animation-delay: 0.5s; }
          .title-word.w3 { animation-delay: 0.85s; }
          @keyframes revealUp {
            0% { opacity: 0; transform: translateY(14px); }
            100% { opacity: 1; transform: translateY(0); }
          }

          .subtitle {
            opacity: 0;
            animation: fadeIn 1s ease forwards;
            animation-delay: 1.2s;
          }
          .subline {
            transform-origin: center;
            animation: growLine 1s ease forwards;
            animation-delay: 1.2s;
            transform: scaleX(0);
          }
          @keyframes fadeIn {
            to { opacity: 1; }
          }
          @keyframes growLine {
            to { transform: scaleX(1); }
          }

          .amp {
            animation: pulseGlow 3s ease-in-out infinite;
            animation-delay: 0.4s;
          }

          /* text steady glow */
          .glow-title-white {
            filter: drop-shadow(0 0 1px var(--logo-white)) drop-shadow(0 0 5px var(--logo-glow-white-color));
          }
          .glow-title-green {
            filter: drop-shadow(0 0 2px var(--logo-green)) drop-shadow(0 0 8px var(--logo-green-glow));
          }

          @media (prefers-reduced-motion: reduce) {
            .saucer, .glass-group, .steam path, .leaves, .bracket, .amp {
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
        `}</style>

        {/* ===================== CHAI GLASS ===================== */}
        <g className="glass-group">
          {/* saucer */}
          <g className="saucer">
            <ellipse cx="360" cy="705" rx="180" ry="26" fill="none" stroke="var(--logo-white)" strokeWidth="5" className="glow-white" />
            <ellipse cx="360" cy="712" rx="150" ry="16" fill="none" stroke="var(--logo-green)" strokeWidth="6" className="glow-green" />
          </g>

          {/* leaves */}
          <g className="leaves">
            <path d="M255 445 C235 425, 225 400, 240 375 C260 390, 265 420, 255 445 Z" fill="#8ecb2e" stroke="#5a8f1a" strokeWidth="2" />
            <path d="M285 435 C300 415, 320 400, 335 415 C315 430, 300 445, 285 435 Z" fill="#79b322" stroke="#5a8f1a" strokeWidth="2" />
          </g>

          {/* steam forming code-bracket shape */}
          <g className="steam" stroke="#8ecb2e" strokeWidth="10" fill="none" strokeLinecap="round" opacity="0.9">
            <path className="glow-green" d="M330 470 C300 430, 300 400, 330 365" />
            <path className="glow-green" d="M395 470 C425 430, 425 400, 395 365" />
          </g>
          {/* middle steam wisp */}
          <path className="glow-green" d="M362 470 C350 420, 375 390, 360 340" stroke="#8ecb2e" strokeWidth="8" fill="none" strokeLinecap="round" opacity="0.85" />

          {/* glass outline */}
          <path d="M255 470 L470 470 L440 690 L285 690 Z" fill="none" stroke="var(--logo-white)" strokeWidth="6" className="glow-white" strokeLinejoin="round" />

          {/* chai liquid */}
          <path d="M268 495 L457 495 L432 675 L293 675 Z" fill="#c78a3a" />
          <path d="M268 495 L457 495 L451 520 L274 520 Z" fill="#e0a752" />

          {/* vertical ridge lines on glass */}
          <g stroke="#a66b28" strokeWidth="3" opacity="0.5">
            <line x1="310" y1="500" x2="300" y2="670" />
            <line x1="345" y1="500" x2="340" y2="672" />
            <line x1="380" y1="500" x2="380" y2="674" />
            <line x1="415" y1="500" x2="420" y2="672" />
          </g>

          {/* spoon */}
          <line x1="300" y1="475" x2="290" y2="410" stroke="var(--logo-white)" strokeWidth="5" strokeLinecap="round" className="glow-white" />
        </g>

        {/* ===================== TEXT LOCKUP ===================== */}
        <g transform="translate(540,0)">
          {/* left bracket */}
          <text x="0" y="600" fontSize="140" fill="var(--logo-green)" className="bracket left glow-green" fontFamily="Arial Black, sans-serif" fontWeight="900">&lt;</text>

          {/* CODE */}
          <text x="90" y="605" fontSize="118" fill="var(--logo-white)" className="title-word w1 glow-title-white" fontFamily="Arial Black, sans-serif" fontWeight="900">CODE</text>

          {/* & */}
          <text x="440" y="605" fontSize="118" fill="var(--logo-green)" className="title-word w2 amp glow-title-green" fontFamily="Arial Black, sans-serif" fontWeight="900">&amp;</text>

          {/* CHAI */}
          <text x="565" y="605" fontSize="118" fill="var(--logo-white)" className="title-word w3 glow-title-white" fontFamily="Arial Black, sans-serif" fontWeight="900">CHAI</text>

          {/* right bracket /> */}
          <text x="870" y="600" fontSize="140" fill="var(--logo-green)" className="bracket right glow-green" fontFamily="Arial Black, sans-serif" fontWeight="900">/&gt;</text>

          {/* subtitle line */}
          <g className="subtitle">
            <line x1="35" y1="660" x2="130" y2="660" stroke="var(--logo-green)" strokeWidth="5" className="glow-green subline" />
            <text x="150" y="672" fontSize="46" letterSpacing="6" fill="var(--logo-white)" className="glow-white" fontFamily="Arial, sans-serif" fontWeight="700">WITH SUDARSHAN</text>
            <line x1="900" y1="660" x2="995" y2="660" stroke="var(--logo-green)" strokeWidth="5" className="glow-green subline" />
          </g>
        </g>
      </svg>
    </div>
  );
};
