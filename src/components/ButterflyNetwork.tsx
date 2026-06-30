import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ShieldCheck, 
  Sparkles, 
  Coins, 
  Heart, 
  ShieldAlert, 
  Award, 
  Cpu, 
  Clock, 
  TrendingUp, 
  Gamepad2, 
  ExternalLink,
  Trophy,
  ArrowRight,
  Info,
  Check,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Zap,
  Gift
} from "lucide-react";
import shadowButterflyImg from "../assets/images/shadow_butterfly_1782772423565.jpg";

interface ButterflyNetworkProps {
  score: number;
  address: string;
  onOpenStaking: () => void;
  onPollenSpread: (newScoreBoost: number) => void;
  hasSwarmNft?: boolean;
  onMintClick?: () => void;
}

export function ButterflyNetwork({ 
  score, 
  address, 
  onOpenStaking, 
  onPollenSpread,
  hasSwarmNft = false,
  onMintClick
}: ButterflyNetworkProps) {
  const [mintStatus, setMintStatus] = useState<"idle" | "minting" | "success" | "already_owned">(
    hasSwarmNft ? "already_owned" : "idle"
  );
  const [mintStep, setMintStep] = useState("");
  const [mintedNftId, setMintedNftId] = useState<string | null>(null);
  const [isUpgradeExpanded, setIsUpgradeExpanded] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  useEffect(() => {
    if (hasSwarmNft) {
      setMintStatus("already_owned");
    } else if (mintStatus === "already_owned") {
      setMintStatus("idle");
    }
  }, [hasSwarmNft]);

  // Handle Shadow NFT Minting Simulation
  const handleMintShadowNft = async () => {
    if (onMintClick) {
      onMintClick();
      return;
    }

    setMintStatus("minting");
    const steps = [
      "Hashing reputation credentials & weightings...",
      "Requesting cryptographic proof verification...",
      "Writing mint payload to decentralized ledger...",
      "Assembling Shadow Collection NFT structures...",
      "Activating 12.5x multiplier hook on reward pool..."
    ];

    for (let i = 0; i < steps.length; i++) {
      setMintStep(steps[i]);
      await new Promise((resolve) => setTimeout(resolve, 900));
    }

    setMintStatus("success");
    setMintedNftId(`SHADOW-BUTTERFLY-${Math.floor(100000 + Math.random() * 900000)}`);
  };

  // 8 Pillars of Karma Score (Translated for 5th Graders!)
  const PILLARS = [
    {
      name: "Wallet Quality (No Bad Germs!)",
      desc: "Is your wallet clean? We check if you've ever interacted with bad hackers or sneaky scammers. A clean wallet gets a giant golden superstar badge!",
      icon: ShieldCheck,
      metric: score >= 600 ? "👑 Clean & Shiny S-Tier" : score >= 350 ? "⭐ Safe A-Tier" : "⚠️ Bad Germs Alert",
      color: score >= 600 ? "text-yellow-400" : score >= 350 ? "text-amber-400" : "text-rose-500",
    },
    {
      name: "Trust Net (Popular Kid!)",
      desc: "Do legendary Web3 builders and certified safe projects talk to you? If trusted friends have your back, your reputation score skyrockets to outer space!",
      icon: Award,
      metric: score >= 700 ? "🤝 Super Connected" : score >= 350 ? "👍 Moderate Trust" : "🎈 Solo Player",
      color: score >= 700 ? "text-yellow-400" : score >= 350 ? "text-amber-400" : "text-rose-500",
    },
    {
      name: "Activity Velocity (Active Runner!)",
      desc: "Are you running fast or taking a long nap? We look at how often you make trades and do fun stuff cross-chain to verify you are wide awake and ready to roll!",
      icon: TrendingUp,
      metric: score >= 700 ? "🏃 Full Speed Runner" : score >= 350 ? "🚶 Steady Walker" : "💤 Sound Asleep",
      color: score >= 700 ? "text-yellow-400" : score >= 350 ? "text-amber-400" : "text-rose-500",
    },
    {
      name: "Risk Profile (Safety First!)",
      desc: "Are you staying out of trouble? We scan to ensure you never use dangerous tools or step into blacklisted traps. Keep it clean to win the safety trophy!",
      icon: ShieldAlert,
      metric: score >= 700 ? "🛡️ 100% Safe Hero" : score >= 500 ? "⚠️ Minor Caution" : "🚨 Extreme Hazard",
      color: score >= 700 ? "text-emerald-400" : score >= 500 ? "text-yellow-400" : "text-rose-500",
    },
    {
      name: "Pollen Contribution (Toy Sharing!)",
      desc: "Do you share your toys? This counts how many times you helped build awesome open-source codes, shared liquidity, or donated to public goods. Sharing is caring!",
      icon: Heart,
      metric: score >= 700 ? "💖 Ultimate Helper Bee" : score >= 350 ? "🌱 Helpful Supporter" : "🥚 No Shares Yet",
      color: score >= 700 ? "text-yellow-400" : score >= 350 ? "text-amber-400" : "text-rose-500",
    },
    {
      name: "AI Behavioral Analysis (Robot Test!)",
      desc: "Our super smart AI checks your steps to prove you are a real breathing human superstar, not a sneaky automated computer script or auto-bot!",
      icon: Cpu,
      metric: score >= 700 ? "🧑‍🎤 100% Real Human" : score >= 400 ? "👶 Regular Kid" : "🤖 Beep Boop Robot?",
      color: score >= 700 ? "text-yellow-400" : score >= 400 ? "text-amber-400" : "text-rose-500",
    },
    {
      name: "History Consistency (Loyal Champion!)",
      desc: "How long have you been in the Web3 playground? Staying loyal and consistent for years proves you are an absolute legendary champion, not a temporary fad!",
      icon: Clock,
      metric: score >= 700 ? "⏳ 3+ Years Pro" : score >= 350 ? "🌱 New Explorer" : "🌪️ Brand New Account",
      color: score >= 700 ? "text-yellow-400" : score >= 350 ? "text-amber-400" : "text-rose-500",
    },
  ];

  return (
    <div className="space-y-12">
      
      {/* SHADOW COLLECTION MINT & YIELD BOOSTER */}
      <section className="rounded-3xl border border-purple-500/20 bg-gradient-to-b from-[#09090c] to-[#0d0d10] text-slate-100 shadow-[0_0_30px_rgba(147,51,234,0.1)] relative overflow-hidden transition-all duration-300">
        
        {/* Glow behind */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />
        
        {/* INTERACTIVE CLICKABLE HEADER */}
        <button
          onClick={() => setIsUpgradeExpanded(!isUpgradeExpanded)}
          className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 hover:bg-purple-950/5 active:bg-purple-950/10 transition-all text-left relative z-20 cursor-pointer group"
        >
          <div className="flex items-start sm:items-center gap-4">
            <div className="relative flex-shrink-0">
              {/* Pulsing colored ring */}
              <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-500 to-amber-500 opacity-75 blur animate-pulse" />
              <div className="relative p-2.5 bg-[#0e0c14] border border-purple-500/30 rounded-full text-purple-400">
                <Sparkles className="w-5 h-5 animate-pulse" />
              </div>
            </div>
            
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-purple-500/20 bg-purple-950/40 text-purple-300 text-[10px] font-mono uppercase tracking-widest font-black">
                🔮 EXCLUSIVE HIGH-YIELD UPGRADE
              </div>
              <h3 className="text-lg sm:text-xl font-black font-display text-white tracking-tight leading-tight group-hover:text-purple-300 transition-colors">
                Mint Shadow Butterfly NFT to Stake with 12.5x Weight
              </h3>
              <p className="text-xs text-slate-400">
                Activate high-tier staker multipliers & unlock priority Solana pool access.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-end sm:self-center mt-2 sm:mt-0">
            {/* Pulsing prompt to click and read */}
            <span className="text-[10px] font-mono font-black tracking-wider text-purple-400 bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full uppercase animate-pulse">
              {isUpgradeExpanded ? "Click to collapse" : "Click to expand & read"}
            </span>
            <div className="p-1.5 rounded-lg border border-slate-800 bg-black/40 text-slate-400 group-hover:text-white group-hover:border-slate-700 transition-all">
              <motion.div
                animate={{ rotate: isUpgradeExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="w-4 h-4" />
              </motion.div>
            </div>
          </div>
        </button>

        {/* EXPANDABLE BODY CONTENT */}
        <AnimatePresence initial={false}>
          {isUpgradeExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
              className="overflow-hidden"
            >
              <div className="p-6 pt-0 sm:p-8 sm:pt-0 border-t border-slate-900/50 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10 mt-4">
                
                {/* LEFT COLUMN: THE SHADOW COLLECTION SHOWCASE */}
                <div className="lg:col-span-5 flex flex-col items-center justify-center p-4 bg-black/45 rounded-2xl border border-slate-900 shadow-inner relative overflow-hidden group">
                  
                  {/* Elegant glass shimmer overlay */}
                  <div className="absolute top-0 left-0 right-0 h-[40%] bg-gradient-to-b from-white/5 to-transparent blur pointer-events-none" />
                  
                  {/* Generated High Quality Shadow Butterfly Artwork */}
                  <div className="relative w-full max-w-[280px] aspect-[3/4] rounded-xl overflow-hidden border border-purple-500/30 shadow-[0_0_25px_rgba(168,85,247,0.15)] bg-black">
                    <img 
                      src={shadowButterflyImg} 
                      alt="Shadow Collection Butterfly" 
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Overlay elements to make it feel like a live Web3 interface */}
                    <div className="absolute top-3 left-3 flex gap-1.5">
                      <span className="text-[8px] font-mono font-black text-amber-400 bg-black/70 border border-amber-500/30 px-2 py-0.5 rounded uppercase tracking-wider">
                        SHADOW COLLECTION
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 bg-black/80 backdrop-blur-md p-2 rounded-lg border border-white/5 flex items-center justify-between">
                      <div>
                        <span className="block text-[8px] font-mono text-slate-400 uppercase">Multiplier Weight</span>
                        <span className="text-xs font-mono font-black text-purple-400">12.5x BOOST</span>
                      </div>
                      <div className="text-right">
                        <span className="block text-[8px] font-mono text-slate-400 uppercase">Prize Pool</span>
                        <span className="text-xs font-mono font-black text-amber-400">43 SOL</span>
                      </div>
                    </div>
                  </div>

                  {/* Eligibility Info below image */}
                  <div className="text-center w-full mt-4 space-y-1">
                    <span className="block text-[9px] font-mono tracking-widest text-slate-500 uppercase">
                      Active Reward Ecosystem
                    </span>
                    <h4 className="text-sm font-black font-display uppercase tracking-wider text-purple-400">
                      12.5x APY MULTIPLIER ACTIVATOR
                    </h4>
                    <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
                      Unlock exclusive high-tier staker multipliers to claim Solana (SOL) directly from the pool.
                    </p>
                  </div>
                </div>

                {/* RIGHT COLUMN: ACTION COMPOSITION & EXPLANATION */}
                <div className="lg:col-span-7 space-y-6 text-left">
                  <div className="space-y-2">
                    <h2 className="text-xl sm:text-2xl font-extrabold font-display text-white tracking-tight leading-tight">
                      Elevate Your Yield with <br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-400 to-purple-400">
                        Shadow Butterfly Multipliers
                      </span>
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                      Elevate your staking returns automatically! Holding a legendary Shadow Butterfly NFT boosts your base Karma Power yield weightings to a staggering <strong className="text-purple-400">12.5x multiplier</strong>. This translates directly to larger real-time claim streams.
                    </p>
                  </div>

                  {/* Key benefits highlight list */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white/[0.01] border border-white/5 p-5 rounded-2xl">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest block">
                        🏆 Solana Reward Share
                      </span>
                      <p className="text-xs text-slate-400 leading-normal">
                        Gain priority claim rights to earn SOL payouts from our active <strong className="text-white">43 SOL prize pool</strong>.
                      </p>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-mono font-bold text-purple-400 uppercase tracking-widest block">
                        ⚡ 12.5x Multiplier APY
                      </span>
                      <p className="text-xs text-slate-400 leading-normal">
                        Instantly amplify your daily KP accruals. Watch your pending real-time rewards accumulate at 12.5 times the speed.
                      </p>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-mono font-bold text-slate-300 uppercase tracking-widest block">
                        🕹️ Free Play on KarmaGamez
                      </span>
                      <p className="text-xs text-slate-400 leading-normal">
                        Unlock free staking access. Take your multiplied earnings over to <strong className="text-white">karmagamez.xyz</strong>.
                      </p>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest block">
                        👑 Priority Access
                      </span>
                      <p className="text-xs text-slate-400 leading-normal">
                        Get automatic white-listing for all future ecosystem drops, custom badge states, and AI premium decoding.
                      </p>
                    </div>
                  </div>

                  {/* ACTION TRIGGERS */}
                  <div className="space-y-4 pt-2">
                    <div className="flex flex-col sm:flex-row gap-3">
                      {mintStatus === "already_owned" ? (
                        <div className="flex-1 py-3.5 bg-emerald-950/20 border border-emerald-500/30 rounded-xl text-center flex items-center justify-center gap-2 text-emerald-400 font-mono text-xs font-bold">
                          <Check className="w-4 h-4" />
                          MULTIPLIER ACTIVE (12.5x ENHANCED YIELD)
                        </div>
                      ) : mintStatus === "success" ? (
                        <div className="flex-1 py-3.5 bg-emerald-950/30 border border-emerald-500/40 rounded-xl text-center space-y-1">
                          <div className="text-emerald-400 font-mono text-xs font-bold flex items-center justify-center gap-1.5">
                            <Check className="w-4 h-4" /> MINTED SUCCESSFUL!
                          </div>
                          <span className="block text-[9px] font-mono text-slate-400 break-all px-3">
                            ID: {mintedNftId}
                          </span>
                        </div>
                      ) : mintStatus === "minting" ? (
                        <div className="flex-1 py-3.5 bg-slate-950/80 border border-purple-500/20 rounded-xl text-center">
                          <span className="text-xs font-mono text-purple-400 animate-pulse">
                            ⚡ {mintStep}
                          </span>
                        </div>
                      ) : (
                        <a
                          href="https://karmabutterfly.xyz"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 py-3.5 bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500 hover:from-purple-400 hover:to-amber-400 text-white font-mono font-black text-xs tracking-wider uppercase rounded-xl shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer text-center"
                        >
                          <Trophy className="w-4 h-4 text-white animate-pulse" />
                          Mint Shadow Butterfly NFT
                        </a>
                      )}

                      <a
                        href="https://www.karmagamez.xyz/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-3.5 bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white font-mono font-extrabold text-xs tracking-wider uppercase rounded-xl transition-all border border-slate-700 shadow flex items-center justify-center gap-1.5 active:scale-95 text-center"
                      >
                        <Gamepad2 className="w-4 h-4 text-purple-400" />
                        Stake Free on KarmaGamez
                        <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                      </a>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] text-slate-400 bg-white/[0.01] px-4 py-2.5 rounded-lg border border-white/5">
                      <Info className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>
                        Karma game stakers can connect their minted NFT directly to double game score parameters and unlock secondary token yields instantly on the main lobby.
                      </span>
                    </div>
                  </div>

                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* PILLARS OF REPUTATION ASSESSMENT (Functional, based on score) */}
      <section className="space-y-6">
        <div className="space-y-1.5">
          <h3 className="text-sm font-mono font-bold text-amber-400 uppercase tracking-wider">
            ⚡ Decentralized Validation Pillars
          </h3>
          <p className="text-xs text-slate-400 leading-normal max-w-2xl">
            The mathematical engine behind your real-time reputation score. Elevate your status across these vectors to unlock premium multi-chain rewards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {PILLARS.map((pillar, idx) => {
            const IconComponent = pillar.icon;
            return (
              <div 
                key={idx}
                className="p-5 rounded-2xl border border-white/5 bg-[#07080c]/80 backdrop-blur-md hover:border-amber-500/10 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="p-2 rounded-lg bg-white/5 text-slate-300">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded bg-white/[0.02] border border-white/5 ${pillar.color}`}>
                      {pillar.metric}
                    </span>
                  </div>
                  
                  <h4 className="text-sm font-bold text-white font-display">
                    {pillar.name}
                  </h4>
                  
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* EASY-TO-UNDERSTAND FAQ SECTION */}
      <section className="space-y-6 pt-4 border-t border-white/5">
        <div className="space-y-1.5 text-left">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-amber-400 animate-pulse" />
            <h3 className="text-sm font-mono font-bold text-amber-400 uppercase tracking-wider">
              💬 FAQ & Help
            </h3>
          </div>
          <p className="text-xs text-slate-400 leading-normal max-w-2xl">
            Have questions about how your score and rewards work? Here are simple, easy-to-understand answers to help you get started!
          </p>
        </div>

        <div className="space-y-3">
          {[
            {
              question: "⚡ What is Karma Power and how do I get rewards just by hanging out?",
              answer: "Think of Karma Power as your Web3 vibe check. It tells the whole network that you're safe, legit, and not a bot or a scammer. You earn rewards just by keeping your wallet active and staking your power. And if you lock it up or hold a Swarm NFT, you trigger a huge 12.5x multiplier. It's basically like getting free XP and daily login bonuses in a game just for playing.",
              icon: Gift,
              highlight: true
            },
            {
              question: "🔍 What is a 'Decentralized Validation Pillar' in plain English?",
              answer: "In normal apps, some central boss or company decides if you're allowed to play. Here, there is no single boss. Instead, the network looks at '7 Pillars'—like who you deal with, your trades, and how long you've been around—to let everyone vote and agree that your wallet is trusted. It's called decentralized because nobody can fake it or ban you for no reason.",
              icon: HelpCircle,
              highlight: false
            },
            {
              question: "🚀 Do I have to be a tech nerd to understand this?",
              answer: "Definitely not! We made this so anyone can look up their wallet score for free. You literally just paste in an address, look at the cool butterfly graph, and see your rank. You can also look up other traders to see if they're safe to deal with, or check out who's topping the live leaderboard of stakers.",
              icon: Zap,
              highlight: false
            },
            {
              question: "🤝 How do I boost my score and level up with my friends?",
              answer: "You do it by connecting and trading with other high-score wallets! When you deal with trusted people, your reputation network grows. It tells the system you are safe by association, which shoots your Karma Score up and gets you bigger weekly staking reward payouts. Teamwork makes the dream work!",
              icon: Heart,
              highlight: false
            }
          ].map((faq, idx) => {
            const IconComponent = faq.icon;
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  faq.highlight
                    ? "border-amber-500/35 bg-gradient-to-br from-[#120f09] via-[#080705] to-[#040406] shadow-[0_0_15px_rgba(245,158,11,0.05)]"
                    : "border-white/5 bg-[#07080c]/60 backdrop-blur-md hover:border-white/10"
                }`}
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full p-5 flex items-center justify-between gap-4 text-left cursor-pointer active:bg-white/[0.01] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl shrink-0 ${faq.highlight ? "bg-amber-500/20 text-amber-300" : "bg-white/5 text-slate-300"}`}>
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <span className={`text-xs sm:text-sm font-bold tracking-tight font-display ${faq.highlight ? "text-amber-300 font-black" : "text-slate-100"}`}>
                      {faq.question}
                    </span>
                  </div>
                  <div className="shrink-0 text-slate-400">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-5 pb-5 pt-1 text-xs text-slate-300 leading-relaxed border-t border-white/[0.03] space-y-2">
                        <p>{faq.answer}</p>
                        {faq.highlight && (
                          <div className="mt-3 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[10px] text-amber-300 font-mono font-bold flex items-center gap-2 animate-pulse">
                            🎉 QUICK TIP: Click "STAKING" at the top navigation to watch your KP rewards ticker grow live every single second!
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
