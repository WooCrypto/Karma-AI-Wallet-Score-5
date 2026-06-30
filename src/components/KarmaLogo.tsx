import React from "react";

interface KarmaLogoProps {
  className?: string;
}

export function KarmaLogo({ className = "w-10 h-10" }: KarmaLogoProps) {
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_0_8px_rgba(245,175,25,0.4)]">
        <defs>
          {/* Radial background for realistic 3D coin depth */}
          <radialGradient id="logoCoinBg" cx="50%" cy="50%" r="50%" fx="40%" fy="40%">
            <stop offset="0%" stopColor="#41270b" />
            <stop offset="65%" stopColor="#1c1003" />
            <stop offset="100%" stopColor="#080400" />
          </radialGradient>
          
          {/* Multi-stop shiny gold gradient */}
          <linearGradient id="logoGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF6D1" />
            <stop offset="20%" stopColor="#F5AF19" />
            <stop offset="40%" stopColor="#E17300" />
            <stop offset="60%" stopColor="#F5AF19" />
            <stop offset="80%" stopColor="#9E5300" />
            <stop offset="100%" stopColor="#FFE07D" />
          </linearGradient>

          {/* Golden glow for text and details */}
          <linearGradient id="logoGlow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFF9E0" />
            <stop offset="50%" stopColor="#F9D806" />
            <stop offset="100%" stopColor="#B36200" />
          </linearGradient>

          {/* Glow filter */}
          <filter id="logoFilter" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComponentTransfer in="blur" result="glow">
              <feFuncA type="linear" slope="0.5" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Arc path for KARMA text */}
          <path id="textArcTop" d="M 32 100 A 68 68 0 0 1 168 100" fill="none" />
          {/* Arc path for AI text */}
          <path id="textArcBottom" d="M 168 100 A 68 68 0 0 1 32 100" fill="none" />
        </defs>

        {/* 3D Outer Bevel */}
        <circle cx="100" cy="100" r="95" fill="none" stroke="#000" strokeWidth="4" opacity="0.6" />
        <circle cx="100" cy="100" r="94" fill="url(#logoCoinBg)" stroke="url(#logoGold)" strokeWidth="3" />

        {/* Concentric Detailing Rings */}
        <circle cx="100" cy="100" r="86" fill="none" stroke="url(#logoGold)" strokeWidth="1" opacity="0.4" />
        <circle cx="100" cy="100" r="83" fill="none" stroke="url(#logoGold)" strokeWidth="2" />
        <circle cx="100" cy="100" r="62" fill="none" stroke="url(#logoGold)" strokeWidth="1.5" opacity="0.8" />

        {/* Triple decorative curved lines on left & right sides, matching the coin design */}
        <path d="M 23 100 A 77 77 0 0 1 33 62" fill="none" stroke="url(#logoGold)" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 19 100 A 81 81 0 0 1 30 60" fill="none" stroke="url(#logoGold)" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
        
        <path d="M 23 100 A 77 77 0 0 0 33 138" fill="none" stroke="url(#logoGold)" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 19 100 A 81 81 0 0 0 30 140" fill="none" stroke="url(#logoGold)" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />

        <path d="M 177 100 A 77 77 0 0 0 167 62" fill="none" stroke="url(#logoGold)" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 181 100 A 81 81 0 0 0 170 60" fill="none" stroke="url(#logoGold)" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
        
        <path d="M 177 100 A 77 77 0 0 1 167 138" fill="none" stroke="url(#logoGold)" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 181 100 A 81 81 0 0 1 170 140" fill="none" stroke="url(#logoGold)" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />

        {/* Side Accents Dots */}
        <circle cx="44" cy="100" r="3.5" fill="url(#logoGold)" filter="url(#logoFilter)" />
        <circle cx="156" cy="100" r="3.5" fill="url(#logoGold)" filter="url(#logoFilter)" />

        {/* Curved text path: K A R M A */}
        <text fill="url(#logoGlow)" fontSize="15.5" fontWeight="900" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="8" filter="url(#logoFilter)">
          <textPath href="#textArcTop" startOffset="50%" textAnchor="middle">
            KARMA
          </textPath>
        </text>

        {/* Curved text path: A I */}
        <text fill="url(#logoGlow)" fontSize="15" fontWeight="900" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="12" filter="url(#logoFilter)">
          <textPath href="#textArcBottom" startOffset="50%" textAnchor="middle">
            AI
          </textPath>
        </text>

        {/* Realistic Celtic/Mystic Endless Knot in Center */}
        <g transform="translate(100, 100) scale(0.65)" filter="url(#logoFilter)">
          {/* Centered diamond square rotated by 45 deg */}
          <path 
            d="M 0 -40 L 40 0 L 0 40 L -40 0 Z" 
            fill="none" 
            stroke="url(#logoGold)" 
            strokeWidth="4.5" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
          {/* Inner interlocking loops & folded corners of endless knot */}
          <path 
            d="M -20 -20 L 20 20 M 20 -20 L -20 20" 
            fill="none" 
            stroke="url(#logoGold)" 
            strokeWidth="3.5" 
            strokeLinecap="round" 
          />
          {/* Intricate interlocking patterns */}
          <path 
            d="M -30 -10 L -10 -30 L 10 -30 L 30 -10 L 30 10 L 10 30 L -10 30 L -30 10 Z" 
            fill="none" 
            stroke="url(#logoGold)" 
            strokeWidth="4" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
          <path 
            d="M -15 0 L 15 0 M 0 -15 L 0 15" 
            fill="none" 
            stroke="url(#logoGold)" 
            strokeWidth="4.5" 
            strokeLinecap="round" 
          />
          <circle cx="0" cy="0" r="6" fill="none" stroke="url(#logoGold)" strokeWidth="2.5" />
        </g>
      </svg>
    </div>
  );
}
