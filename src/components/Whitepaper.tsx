import React from "react";
import { Download, Printer, ArrowLeft, ShieldCheck, Award, TrendingUp, Cpu, Heart, Clock, ShieldAlert, Coins } from "lucide-react";

interface WhitepaperProps {
  onClose?: () => void;
}

export default function Whitepaper({ onClose }: WhitepaperProps) {
  const handlePrint = () => {
    window.print();
  };

  const handleDownloadMarkdown = () => {
    const markdownContent = `# KARMA AI — Official White Paper
The Law of Equilibrium

## § 01 — Abstract
### YOUR ACTIONS BUILD EQUITY.
KARMA AI is not another reputation point system. It is a living, breathing accountability engine built on Solana — an on-chain intelligence layer that transforms every wallet action, every holding streak, every stablecoin transaction into a verifiable score that follows you across the Web3 ecosystem.
For the first time in crypto, your background on-chain activity generates real equity. Even when you are offline, KARMA AI's indexer is tracking your wallet age, conviction streaks, and DeFi participation — converting your history into a score that unlocks liquidity, credit, and community status.
This is the Law of Equilibrium: what you put into the chain comes back to you. Accountability is no longer invisible — it is legible, portable, and powerful.

## § 02 — Reputation Engine
### THE KARMA SCORE SYSTEM
Traditional credit systems force you to prove yourself through paperwork, intermediaries, and centralized gatekeepers. KARMA AI mirrors the structure of traditional credit scoring — but reads your blockchain ledger instead of a bank file. Every holder already has a Karma score being calculated in real time, whether they know it or not.
Our on-chain indexer tracks four core dimensions of reputation: wallet age and longevity, holding conviction streaks, stablecoin transaction volume, and cross-chain validator participation. These metrics are dynamically weighted and rendered into a shareable score card you can flex across the ecosystem.

### Core Pillars:
- Wallet Age: Long-standing wallets are rewarded. Your chain history is your credit history — and every day you hold builds it deeper.
- Holding Streaks: Conviction is tracked. Continuous holding of KARMA activates multiplier passes that amplify your score velocity.
- Stablecoin Activity: Link your KAST card to let real-world spending — coffee, travel, subscriptions — boost your Web3 reputation score.
- Validator Participation: Staking and consensus node activity unlocks ultra-competitive credit rates backed by DAO-staked reputation grants.
- ZK Credit Audits: Zero-knowledge proofs power DeFi credit assessments — your data stays private while your trustworthiness is verified.
- Score Card: Share your live reputation rank with peers. Each share directly accelerates your native mint multiplier within the SWARM.

## § 03 — NFT Collection
### THE SWARM PFP COLLECTION
When you mint your KARMA AI NFT, you receive exclusive access to the SWARM PFP Frame — a living visual identity that evolves alongside your on-chain journey. Head to the website, upload your X profile picture, customize your frame, and represent the SWARM across the entire ecosystem.
MINT ONCE. EVOLVE WITH US.
The SWARM PFP is not a static image. As the ecosystem evolves, NFT holders will receive an upgraded version of their PFP, professionally illustrated by a talented artist — giving your identity a unique evolution that reflects your journey with KARMA AI.

### Specifications:
- Collection Type: SWARM PFP Frames
- Blockchain: Solana
- PFP Evolution: Artist-Illustrated Upgrades
- Holder Benefit: Wingbeats + Score Multiplier
- Minting: Once — Then Evolve

## § 04 — Community
### THE SWARM WEEKLY ACTIVITIES
KARMA AI is built on the principle that an active community compounding on each other's reputation is worth more than any single actor. The SWARM is kept alive through a rotating calendar of competitive events, creative challenges, and community contests — each tied to real rewards and ecosystem recognition.
Stay active. Earn rewards. Grow with KARMA. One community. Endless opportunities.

### Schedule:
- Quiz Night (Every Saturday & Sunday): Test your knowledge against the SWARM. Compete with community members and win rewards for demonstrating your crypto intelligence.
- NFT Creation Contest (Every Thursday): Show off your creative and design skills. Every winner earns Wingbeats — the SWARM's native reward currency.
- Community Contests (Ongoing): Regular Invite Contests, Activity Challenges, and special surprise events with exclusive rewards for the most dedicated SWARM members.

## § 05 — Roadmap
### THE PATH OF EQUILIBRIUM
- Phase I: Genesis — Foundation: Community formation on Telegram and X. SWARM identity establishment. Initial KARMA distribution and early holder incentives. Launch of weekly community activities and Wingbeats reward system.
- Phase 2: SWARM — NFT Launch: SWARM PFP collection mint. PFP frame builder goes live on karmascore.xyz. Community members upload and deploy their customized frames across the ecosystem. First artist-illustrated PFP evolution wave delivered to holders.
- Phase 3: Score — Reputation Engine: Karma Score dashboard launches. On-chain indexer activates across connected wallets. Score card sharing and leaderboard registry go live. Multiplier passes enabled for KARMA holders through conviction streak tracking.
- Phase 4: Credit — DeFi Integration: Reputation-backed liquidity vaults open. Zero-knowledge DeFi credit audits deploy. KAST card integration unlocks real-world spending as a score boost. Rate tiers activated based on Karma Score thresholds.
- Phase 5: Equilibrium — Full Ecosystem: Cross-chain validator incentives. DAO-staked reputation grants. Institutional underwriter vault integrations. KARMA becomes the standard reputation primitive across partner protocols in the Solana DeFi landscape. Karma Score is a product proudly incubated and built by ViloraLabs.xyz, a member holder of the Ugly Duck Society (uglyducksociety.tech) and public verified member on X & CT Space.

## § 06 — Tokenomics
### THE $KARMA TOKEN
$KARMA is the utility backbone of the entire reputation ecosystem. Holding KARMA activates multiplier passes on your credit scoring, unlocks rate discounts across liquidity vaults, and grants governance participation within the DAO-staked reputation grant system. It is not a passive asset — it is an active proof of your commitment to the ecosystem.
- Score Multipliers: Hold KARMA to claim multiplier passes that amplify how fast your Karma Score grows from on-chain activity.
- Liquidity Access: Higher scores unlock massive rate discounts across prospective underwriter vaults and native liquid pool backing.
- DAO Governance: Stake KARMA to participate in protocol decisions, grant allocations, and reputation system parameter changes.
`;

    const blob = new Blob([markdownContent], { type: "text/markdown;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "KARMA_AI_Official_Whitepaper.md");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="wp-container min-h-screen relative text-[#C8B87A] selection:bg-[#D4A017] selection:text-black">
      {/* CSS Isolation Stylesheet */}
      <style dangerouslySetInnerHTML={{ __html: `
        .wp-container {
          --gold:    #D4A017;
          --amber:   #F0C040;
          --deep-gold: #8B6A00;
          --bronze:  #B8860B;
          --glow:    #FFD700;
          --dark:    #080604;
          --deeper:  #050402;
          --card:    #0D0B06;
          --border:  #2A2000;
          --text:    #C8B87A;
          --muted:   #6B5520;
          --steel:   #A89060;
          --chrome:  #D4C090;
          --white:   #F5EDD0;
          
          background-color: var(--deeper);
          font-family: 'Rajdhani', sans-serif;
          font-size: 15px;
          line-height: 1.8;
          padding-bottom: 60px;
        }

        .wp-vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.85) 100%);
          pointer-events: none;
          z-index: 1;
        }

        .wp-nav {
          position: sticky;
          top: 0; left: 0; right: 0;
          z-index: 50;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 24px;
          background: rgba(5,4,2,0.96);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(212,160,23,0.2);
        }

        .wp-brand {
          font-family: 'Cinzel', serif;
          font-size: 18px;
          font-weight: 700;
          color: var(--gold);
          letter-spacing: 4px;
          text-transform: uppercase;
          text-decoration: none;
          text-shadow: 0 0 15px rgba(212,160,23,0.4);
        }

        .wp-nav-links {
          display: flex;
          gap: 20px;
          list-style: none;
        }

        .wp-nav-links a {
          font-family: 'Share Tech Mono', monospace;
          font-size: 10px;
          color: var(--muted);
          text-decoration: none;
          letter-spacing: 2px;
          text-transform: uppercase;
          transition: color 0.2s;
        }

        .wp-nav-links a:hover { color: var(--gold); }

        .wp-nav-tag {
          font-family: 'Share Tech Mono', monospace;
          font-size: 10px;
          color: var(--gold);
          border: 1px solid rgba(212,160,23,0.45);
          padding: 4px 10px;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .wp-hero {
          min-height: 80vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 80px 24px 60px;
          text-align: center;
          position: relative;
          overflow: hidden;
          background: radial-gradient(ellipse 70% 60% at 50% 35%, rgba(180,130,10,0.12) 0%, transparent 65%);
        }

        .wp-hero-logo {
          width: 140px;
          height: 140px;
          object-fit: cover;
          border-radius: 50%;
          border: 2px solid rgba(212,160,23,0.45);
          box-shadow:
            0 0 30px rgba(212,160,23,0.35),
            0 0 60px rgba(212,160,23,0.14);
          margin-bottom: 24px;
          position: relative;
          z-index: 2;
        }

        .wp-hero-eyebrow {
          font-family: 'Share Tech Mono', monospace;
          font-size: 10px;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 12px;
          position: relative;
          z-index: 2;
        }

        .wp-hero-title {
          font-family: 'Cinzel', serif;
          font-size: clamp(48px, 10vw, 90px);
          font-weight: 700;
          color: var(--white);
          line-height: 0.9;
          letter-spacing: 6px;
          position: relative;
          z-index: 2;
          text-shadow: 0 0 45px rgba(212,160,23,0.25);
        }

        .wp-hero-title .wp-accent {
          color: var(--gold);
          text-shadow: 0 0 30px rgba(212,160,23,0.8), 0 0 60px rgba(212,160,23,0.3);
        }

        .wp-hero-tagline {
          font-family: 'Oswald', sans-serif;
          font-size: 14px;
          font-weight: 300;
          color: var(--steel);
          letter-spacing: 4px;
          text-transform: uppercase;
          margin-top: 20px;
          position: relative;
          z-index: 2;
        }

        .wp-hero-meta {
          display: flex;
          gap: 24px;
          justify-content: center;
          margin-top: 36px;
          position: relative;
          z-index: 2;
          flex-wrap: wrap;
        }

        .wp-meta-block { text-align: center; }

        .wp-meta-label {
          font-family: 'Share Tech Mono', monospace;
          font-size: 8px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--muted);
          margin-bottom: 2px;
        }

        .wp-meta-val {
          font-family: 'Cinzel', serif;
          font-size: 14px;
          color: var(--gold);
          letter-spacing: 1px;
        }

        .wp-ticker {
          background: linear-gradient(90deg, var(--deep-gold), var(--bronze), var(--deep-gold));
          padding: 8px 0;
          overflow: hidden;
          white-space: nowrap;
          border-top: 1px solid rgba(212,160,23,0.4);
          border-bottom: 1px solid rgba(212,160,23,0.4);
        }

        .wp-ticker-inner {
          display: inline-block;
          animation: wp-tick 30s linear infinite;
        }

        .wp-ticker-inner span {
          font-family: 'Cinzel', serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 3px;
          color: rgba(245,237,208,0.9);
          margin: 0 24px;
          text-transform: uppercase;
        }

        @keyframes wp-tick {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

        .wp-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(212,160,23,0.45), transparent);
        }

        .wp-divider-dbl {
          height: 3px;
          background: linear-gradient(90deg, transparent, rgba(212,160,23,0.25) 20%, rgba(240,192,64,0.55) 50%, rgba(212,160,23,0.25) 80%, transparent);
        }

        .wp-section {
          max-width: 900px;
          margin: 0 auto;
          padding: 60px 24px;
          position: relative;
          z-index: 2;
        }

        .wp-sec-num {
          font-family: 'Share Tech Mono', monospace;
          font-size: 10px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 8px;
        }

        .wp-sec-title {
          font-family: 'Cinzel', serif;
          font-size: clamp(28px, 4vw, 48px);
          font-weight: 700;
          color: var(--white);
          letter-spacing: 2px;
          line-height: 1.1;
          margin-bottom: 24px;
          text-transform: uppercase;
        }

        .wp-sec-title .wp-accent { color: var(--gold); }
        .wp-sec-title .wp-steel { color: var(--steel); }

        .wp-container p {
          color: #907850;
          margin-bottom: 16px;
          font-size: 14px;
          line-height: 1.8;
          font-weight: 500;
        }

        .wp-container p strong { color: var(--chrome); }

        .wp-pq {
          border-left: 3px solid var(--gold);
          padding: 16px 24px;
          margin: 32px 0;
          background: rgba(212,160,23,0.04);
          position: relative;
        }

        .wp-pq::before {
          content: '❝';
          position: absolute;
          top: 4px;
          left: 8px;
          font-size: 30px;
          color: var(--gold);
          opacity: 0.15;
          line-height: 1;
        }

        .wp-pq p {
          font-family: 'Cinzel', serif;
          font-size: 16px;
          color: var(--white);
          letter-spacing: 1px;
          margin: 0;
          line-height: 1.4;
          font-style: italic;
        }

        .wp-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1px;
          background: var(--border);
          border: 1px solid var(--border);
          margin: 32px 0;
        }

        .wp-card {
          background: var(--card);
          padding: 24px;
          transition: background 0.3s, border-top-color 0.3s;
          border-top: 2px solid transparent;
          text-align: left;
        }

        .wp-card:hover {
          background: #120E04;
          border-top-color: var(--gold);
        }

        .wp-card-icon { font-size: 24px; margin-bottom: 12px; }

        .wp-card-title {
          font-family: 'Oswald', sans-serif;
          font-size: 15px;
          font-weight: 600;
          color: var(--chrome);
          letter-spacing: 1.5px;
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        .wp-card p { font-size: 12px; margin: 0; color: var(--muted); }

        .wp-token-table {
          border: 1px solid var(--border);
          margin: 32px 0;
        }

        .wp-trow {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 24px;
          border-bottom: 1px solid var(--border);
          background: var(--card);
          transition: background 0.2s;
        }

        .wp-trow:last-child { border-bottom: none; }
        .wp-trow:hover { background: #120E04; }

        .wp-tlabel {
          font-family: 'Share Tech Mono', monospace;
          font-size: 9px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--muted);
        }

        .wp-tval {
          font-family: 'Cinzel', serif;
          font-size: 14px;
          font-weight: 600;
          color: var(--gold);
          text-shadow: 0 0 8px rgba(212,160,23,0.3);
        }

        .wp-tval.wp-steel { color: var(--steel); text-shadow: none; }

        .wp-roadmap { margin: 32px 0; }

        .wp-rphase {
          display: flex;
          gap: 20px;
          margin-bottom: 2px;
          background: var(--card);
          border: 1px solid var(--border);
          padding: 24px;
          transition: background 0.3s;
          position: relative;
          text-align: left;
        }

        .wp-rphase::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 3px;
          background: transparent;
          transition: background 0.3s;
        }

        .wp-rphase:hover { background: #120E04; }
        .wp-rphase:hover::before { background: var(--gold); }

        .wp-rphase-num {
          font-family: 'Cinzel', serif;
          font-size: 28px;
          font-weight: 700;
          color: rgba(212,160,23,0.18);
          line-height: 1;
          flex-shrink: 0;
          width: 44px;
        }

        .wp-rphase-body { flex: 1; }

        .wp-rphase-title {
          font-family: 'Oswald', sans-serif;
          font-size: 16px;
          font-weight: 600;
          color: var(--chrome);
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        .wp-rphase-title .wp-accent { color: var(--gold); }

        .wp-rphase p { font-size: 12px; margin: 0; color: #7A6030; }

        .wp-activities-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1px;
          background: var(--border);
          border: 1px solid var(--border);
          margin: 32px 0;
        }

        .wp-act-card {
          background: var(--card);
          padding: 24px;
          border-top: 2px solid transparent;
          transition: background 0.3s, border-top-color 0.3s;
          text-align: left;
        }

        .wp-act-card:hover {
          background: #120E04;
          border-top-color: var(--gold);
        }

        .wp-act-icon { font-size: 28px; margin-bottom: 12px; }

        .wp-act-title {
          font-family: 'Cinzel', serif;
          font-size: 16px;
          color: var(--white);
          letter-spacing: 1.5px;
          margin-bottom: 4px;
        }

        .wp-act-schedule {
          font-family: 'Share Tech Mono', monospace;
          font-size: 8px;
          letter-spacing: 2px;
          color: var(--gold);
          text-transform: uppercase;
          margin-bottom: 10px;
        }

        .wp-act-card p { font-size: 12px; margin: 0; color: var(--muted); }

        .wp-nft-highlight {
          border: 1px solid rgba(212,160,23,0.25);
          background: rgba(13,11,6,0.6);
          padding: 24px;
          border-radius: 12px;
          margin: 32px 0;
          text-align: left;
        }

        .wp-nft-highlight h3 {
          font-family: 'Cinzel', serif;
          font-size: 20px;
          color: var(--white);
          letter-spacing: 2px;
          margin-bottom: 12px;
        }

        .wp-nft-steps {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-top: 20px;
        }

        .wp-nft-step {
          display: flex;
          gap: 16px;
          align-items: flex-start;
        }

        .wp-nft-step-num {
          font-family: 'Share Tech Mono', monospace;
          font-size: 9px;
          color: var(--gold);
          border: 1px solid rgba(212,160,23,0.4);
          padding: 2px 8px;
          flex-shrink: 0;
          letter-spacing: 1px;
          margin-top: 2px;
        }

        .wp-nft-step p { margin: 0; font-size: 13px; color: #907850; }

        .wp-score-display {
          display: flex;
          justify-content: center;
          gap: 40px;
          margin: 32px 0;
          flex-wrap: wrap;
        }

        .wp-score-ring { text-align: center; }

        .wp-score-num {
          font-family: 'Cinzel', serif;
          font-size: 44px;
          font-weight: 700;
          color: var(--gold);
          text-shadow: 0 0 20px rgba(212,160,23,0.5);
          line-height: 1;
        }

        .wp-score-label {
          font-family: 'Share Tech Mono', monospace;
          font-size: 8px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--muted);
          margin-top: 6px;
        }

        .wp-footer {
          background: var(--deeper);
          border-top: 1px solid rgba(212,160,23,0.2);
          padding: 40px 24px;
          text-align: center;
        }

        .wp-footer-name {
          font-family: 'Cinzel', serif;
          font-size: 24px;
          font-weight: 700;
          color: var(--gold);
          letter-spacing: 6px;
          margin-bottom: 8px;
        }

        .wp-footer-sub {
          font-family: 'Share Tech Mono', monospace;
          font-size: 10px;
          color: var(--steel);
          letter-spacing: 2px;
          margin-bottom: 20px;
        }

        .wp-footer-links {
          display: flex;
          justify-content: center;
          gap: 24px;
          margin-bottom: 24px;
        }

        .wp-footer-links a {
          color: var(--muted);
          text-decoration: none;
          font-family: 'Share Tech Mono', monospace;
          font-size: 10px;
          letter-spacing: 1px;
          transition: color 0.2s;
        }

        .wp-footer-links a:hover { color: var(--gold); }
      ` }} />

      <div className="wp-vignette" />

      {/* NAVIGATION HEADER CONTROLS (React Dashboard Controls) */}
      <nav className="wp-nav sticky top-0 bg-[#050402]/95 border-b border-yellow-500/10 z-50 flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              if (onClose) {
                onClose();
              } else {
                window.location.hash = "";
                window.location.search = "";
                window.location.reload();
              }
            }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 text-xs font-mono font-bold text-[#D4A017] transition-all cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>BACK TO PORTAL</span>
          </button>
        </div>

        <a className="wp-brand" href="#home">KARMA AI</a>

        <div className="flex items-center gap-3">
          <button
            onClick={handleDownloadMarkdown}
            className="px-3.5 py-1.5 bg-white/5 hover:bg-white/10 text-[#C8B87A] border border-white/10 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer"
            title="Download clean Markdown format"
          >
            <Download className="w-3.5 h-3.5 text-amber-500" />
            <span className="hidden sm:inline">DOWNLOAD (.MD)</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-3.5 py-1.5 bg-amber-500/15 hover:bg-amber-500/25 text-[#FFD700] border border-amber-500/30 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer"
            title="Save as PDF or Print"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">PDF / PRINT</span>
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="wp-hero" id="home">
        <img 
          className="wp-hero-logo" 
          src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4UK7RXhpZgAATU0AKgAAAAgABQEaAAUAAAABAAAASgEbAAUAAAABAAAAUgEoAAMAAAABAAIAAAITAAMAAAABAAEAAIdpAAQAAAABAAAAWgAAALQAAABIAAAAAQAAAEgAAAABAAeQAAAHAAAABDAyMjGRAQAHAAAABAECAwCgAAAHAAAABDAxMDCgAQADAAAAAQABAACgAgAEAAAAAQAAAZCgAwAEAAAAAQAAAZCkBgADAAAAAQAAAAAAAAAAAAYBAwADAAAAAQAGAAABGgAFAAAAAQAAAQIBGwAFAAAAAQAAAQoBKAADAAAAAQACAAACAQAEAAAAAQAAARICAgAEAAAAAQAAQZ8AAAAAAAAASAAAAAEAAABIAAAAAf/Y/9sAhAABAQEBAQECAQECAwICAgMEAwMDAwQFBAQEBAQFBgUFBQUFBQYGBgYGBgYGBwcHBwcHCAgICAgJCQkJCQkJCQkJAQEBAQICAgQCAgQJBgUGCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkY/9sAhAEMCwsLDAsLDRELDREICgoRREgSREgTVEgUCgoUFEgUCgoKFEgUDgoKFEgUEg4ODg4OFhYWDxYZEhIUEhIXEhIY/8QAGgABAQEBAQEBAAAAAAAAAAAAAAECAwQFBv/EADUQAQACAQIDBwIEBQQDAAAAAAABAhEDEiExBBNBUWGBcaEFMrHBFEJSkaEGIjPR8EPV4f/aAAwDAQACEAccessRefID: 350" 
          alt="KARMA AI Logo" 
          referrerPolicy="no-referrer"
        />

        <p className="wp-hero-eyebrow">On-Chain Web3 Reputation · The Law of Equilibrium</p>
        <h1 className="wp-hero-title">KARMA<br /><span className="wp-accent">AI</span></h1>
        <p className="wp-hero-tagline">Your Actions. Your Score. Your Equity.</p>

        <div className="wp-hero-meta">
          <div className="wp-meta-block">
            <div className="wp-meta-label">Chain</div>
            <div className="wp-meta-val">Solana</div>
          </div>
          <div className="wp-meta-block">
            <div className="wp-meta-label">Native Core</div>
            <div className="wp-meta-val">Karma Power</div>
          </div>
          <div className="wp-meta-block">
            <div className="wp-meta-label">NFT</div>
            <div className="wp-meta-val">SWARM PFP</div>
          </div>
          <div className="wp-meta-block">
            <div className="wp-meta-label">Twitter</div>
            <div className="wp-meta-val">@karmascoreai</div>
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div className="wp-ticker">
        <div className="wp-ticker-inner">
          <span>Karma Is Not Luck</span><span>◆</span>
          <span>It's Accountability</span><span>◆</span>
          <span>The Law of Equilibrium</span><span>◆</span>
          <span>Your Actions Build Your Equity</span><span>◆</span>
          <span>Mint Once — Evolve With Us</span><span>◆</span>
          <span>The SWARM Rises</span><span>◆</span>
          <span>On-Chain Reputation Is Power</span><span>◆</span>
          <span>Hold . Earn Your Score.</span><span>◆</span>
          <span>Karma Is Not Luck</span><span>◆</span>
          <span>It's Accountability</span><span>◆</span>
          <span>The Law of Equilibrium</span><span>◆</span>
          <span>Your Actions Build Your Equity</span><span>◆</span>
          <span>Mint Once — Evolve With Us</span><span>◆</span>
          <span>The SWARM Rises</span><span>◆</span>
          <span>On-Chain Reputation Is Power</span><span>◆</span>
          <span>Hold . Earn Your Score.</span><span>◆</span>
        </div>
      </div>

      <div className="wp-divider-dbl" />

      {/* §01 ABSTRACT */}
      <section className="wp-section" id="abstract">
        <p className="wp-sec-num">§ 01 — Abstract</p>
        <h2 className="wp-sec-title">YOUR ACTIONS<br />BUILD <span className="wp-accent">EQUITY.</span></h2>

        <p>
          <strong>KARMA AI</strong> is not another reputation point system. It is a living, breathing accountability engine built on Solana — an on-chain intelligence layer that transforms every wallet action, every holding streak, every stablecoin transaction into a verifiable score that follows you across the Web3 ecosystem.
        </p>
        <p>
          For the first time in crypto, your background on-chain activity generates real equity. Even when you are offline, KARMA AI's indexer is tracking your wallet age, conviction streaks, and DeFi participation — converting your history into a score that unlocks liquidity, credit, and community status.
        </p>
        <p>
          This is the <strong>Law of Equilibrium</strong>: what you put into the chain comes back to you. Accountability is no longer invisible — it is legible, portable, and powerful.
        </p>

        <div className="wp-pq">
          <p>"For the first time, you're not just holding a token — you're holding a reflection of your actions."</p>
        </div>

        <div className="wp-score-display">
          <div className="wp-score-ring">
            <div className="wp-score-num">850+</div>
            <div className="wp-score-label">Karma Score Ceiling</div>
          </div>
          <div className="wp-score-ring">
            <div className="wp-score-num">ZK</div>
            <div className="wp-score-label">Privacy Proofs</div>
          </div>
          <div className="wp-score-ring">
            <div className="wp-score-num">Live</div>
            <div className="wp-score-label">On-Chain Indexing</div>
          </div>
        </div>
      </section>

      <div className="wp-divider" />

      {/* §02 THE REPUTATION ENGINE */}
      <section className="wp-section" id="reputation">
        <p className="wp-sec-num">§ 02 — Reputation Engine</p>
        <h2 className="wp-sec-title">THE <span className="wp-accent">KARMA</span><br />SCORE SYSTEM</h2>

        <p>
          Traditional credit systems force you to prove yourself through paperwork, intermediaries, and centralized gatekeepers. <strong>KARMA AI</strong> mirrors the structure of traditional credit scoring — but reads your blockchain ledger instead of a bank file. Every holder already has a Karma score being calculated in real time, whether they know it or not.
        </p>
        <p>
          Our on-chain indexer tracks four core dimensions of reputation: <strong>wallet age and longevity</strong>, <strong>holding conviction streaks</strong>, <strong>stablecoin transaction volume</strong>, and <strong>cross-chain validator participation</strong>. These metrics are dynamically weighted and rendered into a shareable score card you can flex across the ecosystem.
        </p>

        <div className="wp-cards">
          <div className="wp-card">
            <div className="wp-card-icon">🕰️</div>
            <div className="wp-card-title">Wallet Age</div>
            <p>Long-standing wallets are rewarded. Your chain history is your credit history — and every day you hold builds it deeper.</p>
          </div>
          <div className="wp-card">
            <div className="wp-card-icon">🔥</div>
            <div className="wp-card-title">Holding Streaks</div>
            <p>Conviction is tracked. Continuous holding of KARMA token assets activates multiplier passes that amplify your score velocity.</p>
          </div>
          <div className="wp-card">
            <div className="wp-card-icon">💳</div>
            <div className="wp-card-title">Stablecoin Activity</div>
            <p>Link your KAST card to let real-world spending — coffee, travel, subscriptions — boost your Web3 reputation score.</p>
          </div>
          <div className="wp-card">
            <div className="wp-card-icon">🌐</div>
            <div className="wp-card-title">Validator Participation</div>
            <p>Staking and consensus node activity unlocks ultra-competitive credit rates backed by DAO-staked reputation grants.</p>
          </div>
          <div className="wp-card">
            <div className="wp-card-icon">🔮</div>
            <div className="wp-card-title">ZK Credit Audits</div>
            <p>Zero-knowledge proofs power DeFi credit assessments — your data stays private while your trustworthiness is verified.</p>
          </div>
          <div className="wp-card">
            <div className="wp-card-icon">📊</div>
            <div className="wp-card-title">Score Card</div>
            <p>Share your live reputation rank with peers. Each share directly accelerates your native mint multiplier within the SWARM.</p>
          </div>
        </div>

        <div className="wp-pq">
          <p>"We mirror traditional credit structures so people understand their reputation in under 10 seconds. Then we show them how deep the chain goes."</p>
        </div>
      </section>

      <div className="wp-divider" />

      {/* §03 NFT — THE SWARM PFP */}
      <section className="wp-section" id="nft">
        <p className="wp-sec-num">§ 03 — NFT Collection</p>
        <h2 className="wp-sec-title">THE <span className="wp-accent">SWARM</span><br />PFP COLLECTION</h2>

        <p>
          When you mint your KARMA AI NFT, you receive exclusive access to the <strong>SWARM PFP Frame</strong> — a living visual identity that evolves alongside your on-chain journey. Head to the website, upload your X profile picture, customize your frame, and represent the SWARM across the entire ecosystem. 🦋
        </p>

        <div className="wp-nft-highlight">
          <h3>MINT ONCE. <span className="wp-accent">EVOLVE</span> WITH US.</h3>
          <p>The SWARM PFP is not a static image. As the ecosystem evolves, NFT holders will receive an upgraded version of their PFP, professionally illustrated by a talented artist — giving your identity a unique evolution that reflects your journey with KARMA AI.</p>

          <div className="wp-nft-steps">
            <div className="wp-nft-step">
              <span className="wp-nft-step-num">STEP 01</span>
              <p>Mint your KARMA AI NFT to gain access to the exclusive SWARM PFP frame system.</p>
            </div>
            <div className="wp-nft-step">
              <span className="wp-nft-step-num">STEP 02</span>
              <p>Visit the website, upload your X (Twitter) profile picture, and customize your frame to match your identity.</p>
            </div>
            <div className="wp-nft-step">
              <span className="wp-nft-step-num">STEP 03</span>
              <p>Deploy your framed PFP across the ecosystem and represent the SWARM on every platform.</p>
            </div>
            <div className="wp-nft-step">
              <span className="wp-nft-step-num">STEP 04</span>
              <p>As the ecosystem grows, receive a professionally illustrated upgraded PFP — a visual record of your evolution with KARMA AI.</p>
            </div>
          </div>
        </div>

        <div className="wp-token-table">
          <div className="wp-trow">
            <span className="wp-tlabel">Collection Type</span>
            <span className="wp-tval">SWARM PFP Frames</span>
          </div>
          <div className="wp-trow">
            <span className="wp-tlabel">Blockchain</span>
            <span className="wp-tval">Solana</span>
          </div>
          <div className="wp-trow">
            <span className="wp-tlabel">PFP Evolution</span>
            <span className="wp-tval wp-steel">Artist-Illustrated Upgrades</span>
          </div>
          <div className="wp-trow">
            <span className="wp-tlabel">Holder Benefit</span>
            <span className="wp-tval">Wingbeats + Score Multiplier</span>
          </div>
          <div className="wp-trow">
            <span className="wp-tlabel">Minting</span>
            <span className="wp-tval wp-steel">Once — Then Evolve</span>
          </div>
        </div>
      </section>

      <div className="wp-divider" />

      {/* §04 COMMUNITY */}
      <section className="wp-section" id="community">
        <p className="wp-sec-num">§ 04 — Community</p>
        <h2 className="wp-sec-title">THE <span className="wp-accent">SWARM</span><br />WEEKLY ACTIVITIES</h2>

        <p>
          KARMA AI is built on the principle that an active community compounding on each other's reputation is worth more than any single actor. The SWARM is kept alive through a rotating calendar of competitive events, creative challenges, and community contests — each tied to real rewards and ecosystem recognition.
        </p>
        <p>
          <strong>Stay active. Earn rewards. Grow with KARMA.</strong> One community. Endless opportunities.
        </p>

        <div className="wp-activities-grid">
          <div className="wp-act-card">
            <div className="wp-act-icon">🧠</div>
            <div className="wp-act-title">Quiz Night</div>
            <div className="wp-act-schedule">Every Saturday & Sunday</div>
            <p>Test your knowledge against the SWARM. Compete with community members and win rewards for demonstrating your crypto intelligence.</p>
          </div>
          <div className="wp-act-card">
            <div className="wp-act-icon">🎨</div>
            <div className="wp-act-title">NFT Creation Contest</div>
            <div className="wp-act-schedule">Every Thursday</div>
            <p>Show off your creative and design skills. Every winner earns <strong style={{ color: 'var(--gold)' }}>Wingbeats</strong> — the SWARM's native reward currency.</p>
          </div>
          <div className="wp-act-card">
            <div className="wp-act-icon">🎉</div>
            <div className="wp-act-title">Community Contests</div>
            <div className="wp-act-schedule">Ongoing</div>
            <p>Regular Invite Contests, Activity Challenges, and special surprise events with exclusive rewards for the most dedicated SWARM members.</p>
          </div>
        </div>

        <div className="wp-token-table">
          <div className="wp-trow">
            <span className="wp-tlabel">Quiz Night</span>
            <span className="wp-tval wp-steel">Saturday & Sunday</span>
          </div>
          <div className="wp-trow">
            <span className="wp-tlabel">NFT Creation Competition</span>
            <span className="wp-tval wp-steel">Every Thursday</span>
          </div>
          <div className="wp-trow">
            <span className="wp-tlabel">Prize Currency</span>
            <span className="wp-tval">Wingbeats</span>
          </div>
          <div className="wp-trow">
            <span className="wp-tlabel">Invite & Activity Contests</span>
            <span className="wp-tval wp-steel">Ongoing / Surprise Events</span>
          </div>
        </div>
      </section>

      <div className="wp-divider" />

      {/* §05 ROADMAP */}
      <section className="wp-section" id="roadmap">
        <p className="wp-sec-num">§ 05 — Roadmap</p>
        <h2 className="wp-sec-title">THE PATH<br />OF <span className="wp-accent">EQUILIBRIUM</span></h2>

        <p>
          KARMA AI is built for longevity. The roadmap is structured around progressive expansion of the reputation stack — from community formation and NFT launch through to DeFi credit infrastructure and cross-chain validator integrations.
        </p>

        <div className="wp-roadmap">
          <div className="wp-rphase">
            <div className="wp-rphase-num">I</div>
            <div className="wp-rphase-body">
              <div className="wp-rphase-title"><span className="wp-accent">Genesis</span> — Foundation</div>
              <p>Community formation on Telegram and X. SWARM identity establishment. Initial KARMA distribution and early holder incentives. Launch of weekly community activities and Wingbeats reward system.</p>
            </div>
          </div>

          <div className="wp-rphase">
            <div className="wp-rphase-num">II</div>
            <div className="wp-rphase-body">
              <div className="wp-rphase-title"><span className="wp-accent">SWARM</span> — NFT Launch</div>
              <p>SWARM PFP collection mint. PFP frame builder goes live on karmascore.xyz. Community members upload and deploy their customized frames across the ecosystem. First artist-illustrated PFP evolution wave delivered to holders.</p>
            </div>
          </div>

          <div className="wp-rphase">
            <div className="wp-rphase-num">III</div>
            <div className="wp-rphase-body">
              <div className="wp-rphase-title"><span className="wp-accent">Score</span> — Reputation Engine</div>
              <p>Karma Score dashboard launches. On-chain indexer activates across connected wallets. Score card sharing and leaderboard registry go live. Multiplier passes enabled for KARMA holders through conviction streak tracking.</p>
            </div>
          </div>

          <div className="wp-rphase">
            <div className="wp-rphase-num">IV</div>
            <div className="wp-rphase-body">
              <div className="wp-rphase-title"><span className="wp-accent">Credit</span> — DeFi Integration</div>
              <p>Reputation-backed liquidity vaults open. Zero-knowledge DeFi credit audits deploy. KAST card integration unlocks real-world spending as a score boost. Rate tiers activated based on Karma Score thresholds.</p>
            </div>
          </div>

          <div className="wp-rphase">
            <div className="wp-rphase-num">V</div>
            <div className="wp-rphase-body">
              <div className="wp-rphase-title"><span className="wp-accent">Equilibrium</span> — Full Ecosystem</div>
              <p>Cross-chain validator incentives. DAO-staked reputation grants. Institutional underwriter vault integrations. KARMA becomes the standard reputation primitive across partner protocols in the Solana DeFi landscape.</p>
              
              <div style={{ marginTop: '16px', padding: '14px', borderRadius: '8px', background: 'rgba(212, 160, 23, 0.04)', border: '1px dashed rgba(212, 160, 23, 0.25)' }}>
                <span style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '10px', color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '6px' }}>
                  ⚡ Incubation & Team Affiliation
                </span>
                <p style={{ fontSize: '12px', color: 'var(--chrome)', lineHeight: '1.6', margin: 0 }}>
                  Karma Score is a product from <a href="https://ViloraLabs.xyz" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold)', textDecoration: 'underline', fontWeight: 'bold' }}>ViloraLabs.xyz</a>. We are proud member holders of the <a href="https://uglyducksociety.tech" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold)', textDecoration: 'underline', fontWeight: 'bold' }}>Ugly Duck Society</a> and public verified member on X & CT Space. Check out our builds to see how we are shaping decentralized reputation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="wp-divider" />

      {/* §06 TOKENOMICS */}
      <section className="wp-section" id="tokenomics">
        <p className="wp-sec-num">§ 06 — Tokenomics</p>
        <h2 className="wp-sec-title">THE <span className="wp-accent">$KARMA</span><br />TOKEN</h2>

        <p>
          <strong>KARMA</strong> is the utility backbone of the entire reputation ecosystem. Holding KARMA activates multiplier passes on your credit scoring, unlocks rate discounts across liquidity vaults, and grants governance participation within the DAO-staked reputation grant system. It is not a passive asset — it is an active proof of your commitment to the ecosystem.
        </p>
        <p>
          The token operates on Solana for high-throughput, near-zero-fee transactions, enabling real-time reputation updates and micro-reward distributions across the SWARM without friction.
        </p>

        <div className="wp-token-table">
          <div className="wp-trow">
            <span className="wp-tlabel">Token Name</span>
            <span className="wp-tval">KARMA</span>
          </div>
          <div className="wp-trow">
            <span className="wp-tlabel">Ticker</span>
            <span className="wp-tval">KARMA</span>
          </div>
          <div className="wp-trow">
            <span className="wp-tlabel">Blockchain</span>
            <span className="wp-tval">Solana</span>
          </div>
          <div className="wp-trow">
            <span className="wp-tlabel">Primary Utility</span>
            <span className="wp-tval wp-steel">Score Multiplier Passes</span>
          </div>
          <div className="wp-trow">
            <span className="wp-tlabel">DeFi Role</span>
            <span className="wp-tval wp-steel">Reputation-Backed Credit</span>
          </div>
          <div className="wp-trow">
            <span className="wp-tlabel">Governance</span>
            <span className="wp-tval wp-steel">DAO Staking</span>
          </div>
          <div className="wp-trow">
            <span className="wp-tlabel">Reward Currency</span>
            <span className="wp-tval">Wingbeats</span>
          </div>
        </div>

        <div className="wp-cards">
          <div className="wp-card">
            <div className="wp-card-icon">⚡</div>
            <div className="wp-card-title">Score Multipliers</div>
            <p>Hold KARMA to claim multiplier passes that amplify how fast your Karma Score grows from on-chain activity.</p>
          </div>
          <div className="wp-card">
            <div className="wp-card-icon">🏦</div>
            <div className="wp-card-title">Liquidity Access</div>
            <p>Higher scores unlock massive rate discounts across prospective underwriter vaults and native pool backing.</p>
          </div>
          <div className="wp-card">
            <div className="wp-card-icon">🗳️</div>
            <div className="wp-card-title">DAO Governance</div>
            <p>Stake KARMA to participate in protocol decisions, grant allocations, and reputation system parameter changes.</p>
          </div>
        </div>

        <h3 style={{ color: 'var(--gold)', fontFamily: 'Space Grotesk, sans-serif', marginTop: '32px', textTransform: 'uppercase', fontSize: '14px', letterSpacing: '1px' }}>
          Platform Yield & Value Redistribution Architecture
        </h3>
        <p>
          The $KARMA ecosystem is powered by a decentralized, high-velocity on-chain feedback loop. Payouts are triggered instantly upon any paid activity on the platform: whenever any wallet interacts with the Karma AI Wallet Score system for on-chain identity bonding (priced at 0.05 SOL), premium forensic deep-scans (priced at 0.08 SOL), or any other rated transaction, a full <strong>50% fee split</strong> is programmatically routed straight to the Community Revenue Share protocol. This creates consistent, organic daily trading volume and provides powerful holding and staking incentives.
        </p>
        <p>
          The 50% community allocation is divided into two strict cryptographic pools:
        </p>
        <div className="wp-cards" style={{ marginTop: '16px' }}>
          <div className="wp-card" style={{ border: '1px solid rgba(239, 68, 68, 0.2)' }}>
            <div className="wp-card-icon" style={{ color: '#EF4444' }}>🔥</div>
            <div className="wp-card-title">15% Instant Buyback & Burn</div>
            <p>15% of all business revenues are instantly swapped to native $KARMA and burned on-chain to create continuous deflationary supply dynamics.</p>
          </div>
          <div className="wp-card" style={{ border: '1px solid rgba(245, 175, 25, 0.2)' }}>
            <div className="wp-card-icon" style={{ color: 'var(--gold)' }}>🎁</div>
            <div className="wp-card-title">20% Buybacks & Airdrops</div>
            <p>20% of all proceeds fund immediate $KARMA token buybacks which are distributed directly as custom airdrops to SWARM NFT holders and community stakers.</p>
          </div>
        </div>
        <p style={{ fontSize: '11px', color: 'var(--chrome)', fontStyle: 'italic', background: 'rgba(212, 160, 23, 0.03)', padding: '12px', borderRadius: '6px', border: '1px solid rgba(212, 160, 23, 0.1)', marginTop: '16px' }}>
          *Co-Ownership Caveat: While the core developer team retains structural authority to optimize these variables during software updates, this mechanism is stabilized by Vilora Labs. Under current conditions, Vilora Labs has granted 50% of corporate equity and governance weight to the community to handle with care. If the decentralized governance is mistreated or used destructively, these terms may be unilaterally reclaimed to protect the integrity of the platform.
        </p>

        <div className="wp-pq">
          <p>"Holding KARMA isn't about hoping the universe delivers. It's about building proof that you deserve what comes next."</p>
        </div>
      </section>

      <div className="wp-divider-dbl" />

      {/* FOOTER */}
      <footer className="wp-footer">
        <div className="wp-footer-name">KARMA AI</div>
        <div className="wp-footer-sub">The Law of Equilibrium — On-Chain Reputation on Solana</div>
        <p className="text-slate-500 text-xs">Official White Paper v1.0 — Solana Ecosystem — 2025</p>
        <div className="wp-footer-links mt-4 flex items-center justify-center gap-6">
          <a href="https://x.com/karmascoreai" target="_blank" rel="noopener noreferrer">X / Twitter</a>
          <a href="https://t.me/KarmaScore" target="_blank" rel="noopener noreferrer">Telegram</a>
          <a href="https://solana.com" target="_blank" rel="noopener noreferrer">Solana Network</a>
        </div>
        <p className="text-[10px] text-slate-600 mt-6 leading-relaxed max-w-xl mx-auto">
          This document is not a prospectus or securities offering. KARMA is a decentralized utility token primitive.
          Not financial advice. Always verify contract addresses through official channels before any transactions.
          Karma is not luck. It's accountability. The Law of Equilibrium governs all.
        </p>
      </footer>
    </div>
  );
}
