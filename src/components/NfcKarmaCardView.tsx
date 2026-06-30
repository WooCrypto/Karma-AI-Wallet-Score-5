import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Shield, 
  Ticket, 
  Crown, 
  Trophy, 
  Wifi, 
  Smartphone, 
  ArrowRight, 
  Check, 
  X, 
  Network, 
  Cpu, 
  Sparkles, 
  Lock, 
  Layers, 
  Fingerprint,
  Zap
} from "lucide-react";

export function NfcKarmaCardView() {
  const [activeEdition, setActiveEdition] = useState<"genesis" | "founders" | "community">("genesis");
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // Mouse position for card tilt effect on hover
  const [tiltStyle, setTiltStyle] = useState<{ transform: string; shadow: string }>({
    transform: "rotateY(0deg) rotateX(0deg)",
    shadow: "0px 0px 0px rgba(0,0,0,0)"
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within the element
    const y = e.clientY - rect.top;  // y position within the element
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateY = ((x - centerX) / centerX) * 12; // tilt up to 12 deg
    const rotateX = -((y - centerY) / centerY) * 12; // tilt up to 12 deg

    setTiltStyle({
      transform: `perspective(1000px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale3d(1.02, 1.02, 1.02)`,
      shadow: `${-rotateY * 1.5}px ${rotateX * 1.5}px 30px rgba(255, 213, 74, 0.2)`
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: "perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)",
      shadow: "0px 10px 30px rgba(0, 0, 0, 0.5)"
    });
  };

  const features = [
    {
      title: "Event Check-In",
      icon: <Ticket className="w-5 h-5 text-blue-400" />,
      description: "Walk into events without opening your wallet app. Simply tap your Karma Card on an NFC reader. The system instantly verifies wallet ownership, checks NFT/membership eligibility, confirms access, and records attendance. Event organizers receive instant verification while members enjoy frictionless entry in seconds."
    },
    {
      title: "Holder Perks",
      icon: <Crown className="w-5 h-5 text-amber-400" />,
      description: "Automatically unlock VIP access, exclusive merchandise, private lounges, giveaways, discounts, and member-only experiences based on your verified NFTs."
    },
    {
      title: "Future Rewards",
      icon: <Trophy className="w-5 h-5 text-blue-400 animate-pulse" />,
      description: "Every check-in can become part of your on-chain reputation. Earn attendance streaks, loyalty points, digital badges, exclusive collectibles, and future Karma rewards for participating in the ecosystem."
    }
  ];

  const steps = [
    {
      num: "01",
      title: "Tap Card",
      desc: "Tap your NFC Karma Card on any compatible reader."
    },
    {
      num: "02",
      title: "Secure Verification",
      desc: "The reader securely verifies cryptographic wallet ownership."
    },
    {
      num: "03",
      title: "Validation",
      desc: "NFT holdings and real-time memberships are instantly validated."
    },
    {
      num: "04",
      title: "Access Granted",
      desc: "Access credentials are confirmed and gate opens instantly."
    },
    {
      num: "05",
      title: "On-Chain Logged",
      desc: "Attendance and rewards are automatically recorded on ledger."
    }
  ];

  const editions = {
    genesis: {
      name: "Genesis Edition",
      subtitle: "Limited to Genesis holders",
      bgGradient: "from-[#110e05] via-[#241a05] to-black",
      cardStyle: "bg-gradient-to-br from-amber-500/20 via-yellow-600/10 to-amber-950/40 border-amber-500/40 shadow-[0_0_30px_rgba(234,179,8,0.15)]",
      textColor: "text-amber-400",
      accentGlow: "bg-amber-500/10",
      number: "001 // GENESIS"
    },
    founders: {
      name: "Founders Edition",
      subtitle: "Reserved for ecosystem builders",
      bgGradient: "from-[#020d1c] via-[#051833] to-black",
      cardStyle: "bg-gradient-to-br from-blue-500/20 via-indigo-600/10 to-blue-950/40 border-blue-500/40 shadow-[0_0_30px_rgba(59,130,246,0.15)]",
      textColor: "text-blue-400",
      accentGlow: "bg-blue-500/10",
      number: "002 // FOUNDER"
    },
    community: {
      name: "Community Edition",
      subtitle: "Available to qualifying NFT holders",
      bgGradient: "from-[#0f0f12] via-[#202028] to-black",
      cardStyle: "bg-gradient-to-br from-slate-400/20 via-slate-600/10 to-slate-950/40 border-slate-500/30 shadow-[0_0_20px_rgba(255,255,255,0.05)]",
      textColor: "text-slate-300",
      accentGlow: "bg-white/5",
      number: "003 // COMMUNITY"
    }
  };

  const integrations = [
    "Wallet Verification",
    "Event Check-ins",
    "Membership Access",
    "Reputation Tracking",
    "Rewards",
    "Loyalty Program",
    "Partner Events",
    "Digital Identity",
    "AI Ecosystem Access"
  ];

  return (
    <div className="space-y-16 py-8 relative overflow-hidden bg-black text-slate-100 rounded-3xl border border-white/5 p-4 sm:p-8">
      
      {/* Background glow meshes */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* HERO SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        
        {/* Hero Copy */}
        <div className="lg:col-span-7 text-left space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/20 bg-amber-500/10 text-amber-400 text-xs font-mono uppercase tracking-widest font-black animate-pulse">
            <Sparkles className="w-3.5 h-3.5" />
            COMING SOON
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-black font-display tracking-tight text-white leading-none">
            NFC Karma Card
          </h1>
          
          <h3 className="text-lg sm:text-2xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-blue-400">
            Your wallet. Your membership. One tap.
          </h3>
          
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl font-sans">
            The NFC Karma Card bridges digital ownership with real-world experiences. Instantly verify your wallet, NFTs, and memberships with a simple tap—no wallet app, QR code, or manual verification required.
          </p>

          <div className="flex flex-wrap gap-4 items-center pt-2">
            <span className="flex items-center gap-1.5 text-xs font-mono text-slate-400 border border-white/10 bg-white/5 px-3 py-1.5 rounded-lg">
              <Fingerprint className="w-4 h-4 text-amber-400" /> Secure Hardware
            </span>
            <span className="flex items-center gap-1.5 text-xs font-mono text-slate-400 border border-white/10 bg-white/5 px-3 py-1.5 rounded-lg">
              <Zap className="w-4 h-4 text-blue-400" /> 0-Delay Verification
            </span>
          </div>
        </div>

        {/* Hero Interactive Premium Metal Card Mockup */}
        <div className="lg:col-span-5 flex justify-center py-6">
          <div 
            className="relative w-80 h-[480px] rounded-3xl border border-white/10 bg-[#060608] p-6 flex flex-col justify-between items-center shadow-2xl transition-all duration-300 select-none overflow-hidden group cursor-pointer"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ 
              transform: tiltStyle.transform,
              boxShadow: tiltStyle.shadow
            }}
          >
            {/* Ambient glows inside mock card wrapper */}
            <div className="absolute -top-40 -left-40 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-amber-500/20 transition-all duration-500" />
            <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-blue-500/20 transition-all duration-500" />
            
            {/* Shimmer light reflect line */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />

            {/* Top Row: NFC Icon and Signal waves */}
            <div className="w-full flex justify-between items-start">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-yellow-600 flex items-center justify-center text-black font-bold text-sm shadow-inner">
                  K
                </div>
                <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase font-bold">
                  Karma Card
                </span>
              </div>
              <div className="relative flex flex-col items-center">
                <Wifi className="w-5 h-5 text-amber-400 rotate-90 animate-pulse" />
                <span className="text-[8px] font-mono text-amber-400 font-bold uppercase mt-1 animate-pulse tracking-wide">
                  NFC ACTIVE
                </span>
              </div>
            </div>

            {/* Center: Glowing Signal / Chip */}
            <div className="relative flex flex-col items-center justify-center my-6 py-6 w-full">
              {/* Outer pulsing ring */}
              <div className="absolute w-28 h-28 border border-amber-400/20 rounded-full animate-ping pointer-events-none" style={{ animationDuration: "3s" }} />
              <div className="absolute w-20 h-20 border border-blue-400/30 rounded-full animate-ping pointer-events-none" style={{ animationDuration: "2s" }} />
              
              <div className="w-16 h-16 rounded-2xl bg-[#0d0e12] border border-amber-400/40 flex items-center justify-center shadow-lg relative z-10 group-hover:border-blue-400/50 transition-colors">
                <Cpu className="w-8 h-8 text-amber-400 animate-pulse" />
              </div>

              {/* Tap instruction */}
              <span className="text-[9px] font-mono text-slate-400 uppercase mt-4 tracking-widest block font-black">
                TAP TO INITIATE HANDSHAKE
              </span>
            </div>

            {/* Bottom Row: Holder Credentials Mockup */}
            <div className="w-full text-left space-y-3 pt-4 border-t border-white/5 relative z-10">
              <div className="space-y-1">
                <span className="block text-[8px] font-mono text-slate-500 uppercase tracking-widest">
                  DECENTRALIZED IDENTITY ID
                </span>
                <span className="text-xs font-mono font-bold text-white tracking-wider block">
                  KM-8829-SHADOW
                </span>
              </div>

              <div className="flex justify-between items-end">
                <div>
                  <span className="block text-[8px] font-mono text-slate-500 uppercase tracking-widest">
                    CARD TIER
                  </span>
                  <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest">
                    GENESIS MULTIPLIER
                  </span>
                </div>
                <span className="text-[10px] font-mono text-blue-400 font-bold">
                  12.5x WEIGHT
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* FEATURE GRID */}
      <section className="space-y-8 pt-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono text-blue-400 uppercase tracking-widest block font-black">
            POWERFUL CAPABILITIES
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
            Designed for Real-World Frictionless Utility
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Unifying standard hardware with decentralized validation hooks to grant elite real-world interactions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feat, idx) => (
            <div 
              key={idx}
              className="p-6 rounded-2xl border border-white/5 bg-[#07080c]/80 backdrop-blur-md hover:border-amber-500/20 transition-all flex flex-col justify-between hover:shadow-[0_0_20px_rgba(255,213,74,0.05)] relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-white/5 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="space-y-3 text-left">
                <div className="p-2.5 rounded-lg bg-white/5 w-fit">
                  {feat.icon}
                </div>
                <h3 className="text-lg font-bold text-white font-display">
                  {feat.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  {feat.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS TIMELINE */}
      <section className="space-y-12 pt-8 relative">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono text-amber-400 uppercase tracking-widest block font-black animate-pulse">
            TRANSACTION ROUTING
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
            How The Tap Works
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Five asynchronous validation stages executed in under 400 milliseconds.
          </p>
        </div>

        {/* Horizontal Timeline flow */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 text-left relative z-10">
          {steps.map((step, idx) => (
            <div 
              key={idx}
              className="relative p-5 rounded-2xl border border-white/5 bg-[#09090c] hover:border-blue-500/15 transition-all space-y-3 group"
            >
              {/* Index indicator */}
              <div className="flex items-center justify-between">
                <span className="text-2xl font-mono font-black text-amber-500/40 group-hover:text-amber-400 transition-colors">
                  {step.num}
                </span>
                {idx < 4 && (
                  <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-blue-400 transition-colors hidden lg:block" />
                )}
              </div>

              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white font-display">
                  {step.title}
                </h4>
                <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BENEFITS COMPARISON */}
      <section className="space-y-8 pt-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono text-blue-400 uppercase tracking-widest block font-black">
            EXPERIENCE PARADIGM
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
            No Wallet. No QR Codes. No Friction.
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Eliminating verification latency to introduce absolute seamless physical synchronization.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
          
          {/* Traditional Entry */}
          <div className="p-6 sm:p-8 rounded-2xl border border-rose-500/10 bg-rose-950/5 space-y-4">
            <h4 className="text-xs font-mono font-bold text-rose-400 uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              Traditional Event Entry
            </h4>
            
            <ul className="space-y-3">
              {[
                "Unlock phone & search for app",
                "Open digital wallet / search keys",
                "Filter through hundreds of NFTs",
                "Wait for camera scanner alignment",
                "Manual staff confirmation & approval delay"
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-2.5 text-xs text-slate-400 font-sans">
                  <X className="w-4 h-4 text-rose-500 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Karma NFC Experience */}
          <div className="p-6 sm:p-8 rounded-2xl border border-amber-500/20 bg-amber-500/5 shadow-[0_0_20px_rgba(234,179,8,0.05)] space-y-4">
            <h4 className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              Karma NFC Experience
            </h4>
            
            <ul className="space-y-3">
              {[
                "Tap card on any reader",
                "Verified cryptographic consensus instantly",
                "Frictionless instant event entry",
                "Real-time metadata logs & rewards automatically"
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-2.5 text-xs text-slate-200 font-sans font-medium">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </section>

      {/* EXCLUSIVE EDITIONS */}
      <section className="space-y-8 pt-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono text-amber-400 uppercase tracking-widest block font-black animate-pulse">
            PREMIUM HARNESSING
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
            Exclusive Card Editions
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Select standard issue hardware built from premium metal and carbon fiber matrices.
          </p>
        </div>

        {/* Navigation Selector */}
        <div className="flex justify-center p-1 bg-white/[0.02] border border-white/5 rounded-xl max-w-sm mx-auto">
          {Object.keys(editions).map((key) => (
            <button
              key={key}
              onClick={() => setActiveEdition(key as any)}
              className={`flex-1 py-2 text-[10px] sm:text-xs font-mono font-bold tracking-wider uppercase rounded-lg transition-all cursor-pointer ${
                activeEdition === key
                  ? "bg-[#111] border border-amber-500/30 text-amber-400 font-black"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {key}
            </button>
          ))}
        </div>

        {/* Edition Display Card */}
        <div className="max-w-2xl mx-auto">
          <div className={`p-8 rounded-3xl border transition-all duration-500 bg-radial ${editions[activeEdition].bgGradient} flex flex-col md:flex-row items-center gap-8 justify-between relative overflow-hidden shadow-2xl`}>
            
            {/* Ambient inner glow */}
            <div className={`absolute top-0 left-0 w-48 h-48 rounded-full blur-3xl pointer-events-none ${editions[activeEdition].accentGlow}`} />

            {/* Premium Card Display Mockup */}
            <div className={`w-72 h-44 rounded-2xl border p-4 flex flex-col justify-between relative z-10 shrink-0 shadow-lg ${editions[activeEdition].cardStyle}`}>
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded bg-white flex items-center justify-center text-black font-extrabold text-[9px]">
                    K
                  </div>
                  <span className="text-[8px] font-mono tracking-widest text-white uppercase font-bold">
                    KARMA CARD
                  </span>
                </div>
                <Wifi className="w-4 h-4 text-white rotate-90 animate-pulse" />
              </div>

              <div className="space-y-1 text-left">
                <span className="block text-[7px] font-mono text-slate-400 uppercase">EDITION ID</span>
                <span className="text-xs font-mono font-bold text-white tracking-widest block">
                  {editions[activeEdition].number}
                </span>
              </div>
            </div>

            {/* Edition Info */}
            <div className="text-left space-y-3 md:max-w-xs relative z-10">
              <span className={`text-xs font-mono font-bold tracking-widest uppercase block ${editions[activeEdition].textColor}`}>
                ✦ {editions[activeEdition].name}
              </span>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {editions[activeEdition].subtitle}. Featuring customized physical layout patterns, personalized engraved handle hashes, and premium high-tier APY multipliers.
              </p>
              <div className="pt-1.5">
                <span className="text-[10px] font-mono text-slate-500 uppercase block">Availability</span>
                <span className="text-xs font-mono text-white font-bold">100% Cryptographically Reserved</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FUTURE INTEGRATIONS CONNECTED NODES */}
      <section className="space-y-8 pt-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono text-blue-400 uppercase tracking-widest block font-black">
            ECOSYSTEM SYNERGIES
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
            Future Integrations
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Hover over any ecosystem node to preview live validation hooks planned for the NFC card matrix.
          </p>
        </div>

        {/* Glowing connected node simulation */}
        <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto py-4 relative">
          <div className="absolute inset-0 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
          
          {integrations.map((node, idx) => {
            const isHovered = hoveredNode === node;
            return (
              <div
                key={idx}
                onMouseEnter={() => setHoveredNode(node)}
                onMouseLeave={() => setHoveredNode(null)}
                className={`px-4 py-2 rounded-xl border text-xs font-mono tracking-wide transition-all duration-300 cursor-pointer relative ${
                  isHovered 
                    ? "border-amber-400 bg-amber-500/10 text-amber-300 shadow-[0_0_15px_rgba(234,179,8,0.25)] scale-105" 
                    : "border-white/5 bg-[#07080c] text-slate-400 hover:border-blue-500/20 hover:text-blue-300"
                }`}
              >
                {isHovered && (
                  <span className="absolute -top-1 -right-1 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                  </span>
                )}
                {node}
              </div>
            );
          })}
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-8 sm:py-12 px-6 rounded-3xl border border-amber-500/20 bg-gradient-to-b from-amber-500/5 via-black to-[#060608] max-w-3xl mx-auto relative overflow-hidden">
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="space-y-6 max-w-xl mx-auto text-center relative z-10">
          <h2 className="text-2xl sm:text-3xl font-black font-display text-white tracking-tight">
            The Future of Web3 Identity Is One Tap Away
          </h2>
          
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
            Your NFT shouldn’t stay inside your wallet. Bring it into the real world with the Karma NFC Card.
          </p>

          <div className="pt-2">
            <button
              disabled
              className="px-8 py-4 bg-white/5 border border-white/10 text-slate-500 rounded-xl font-mono text-xs font-black uppercase tracking-widest cursor-not-allowed shadow"
            >
              Coming Soon
            </button>
            <p className="text-[10px] text-slate-500 font-mono mt-2 uppercase tracking-widest">
              * SECURE CRYPTOGRAPHIC REGISTERING RESERVED FOR VERIFIED ECOSYSTEM HOLDERS
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
