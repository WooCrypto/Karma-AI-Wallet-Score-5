import React, { useState, useEffect, useMemo, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Shield,
  Fingerprint,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Info,
  Coins,
  Sparkles,
  Clock,
  Download,
  Activity,
  TrendingUp,
  Compass,
  Cpu,
  Layers,
  Zap,
  BookOpen,
  Users,
  Award,
  FileText,
  Mail,
  Globe,
  ExternalLink,
  ChevronRight,
  Search,
  Plus,
  Check,
  Loader2,
  Lock,
  Dna,
  Terminal,
  ArrowRight,
  ShieldCheck,
  ShieldAlert,
  Database,
  Briefcase,
  Layers2,
  UserCheck,
  Gamepad2,
  Trophy,
  Clipboard,
  CreditCard,
  ChevronUp,
  ChevronDown,
  Minimize2,
  Maximize2,
  Settings2,
  Eye,
  EyeOff
} from "lucide-react";

// Modern X (formerly Twitter) Icon SVG to replace all legacy Twitter icon instances
const Twitter = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { WalletReport, SignalLevel, RiskLevel, SignalCard, SecurityMetric, BehavioralClassification, NFTCollection, TimelineEvent } from "./types";
import { KarmaLogo } from "./components/KarmaLogo";
import { ButterflyNetwork } from "./components/ButterflyNetwork";
import { GlassyNftView } from "./components/GlassyNftView";
import { NfcKarmaCardView } from "./components/NfcKarmaCardView";
import { XFavoritesCard } from "./components/XFavoritesCard";

import madLadsNftImg from "./assets/images/mad_lads_nft_1782834969908.jpg";
import degodsNftImg from "./assets/images/degods_nft_1782834978756.jpg";
import boredApesNftImg from "./assets/images/bored_apes_nft_1782834993522.jpg";
import pudgyPenguinsNftImg from "./assets/images/pudgy_penguins_nft_1782835008251.jpg";
import Whitepaper from "./components/Whitepaper";
import { downloadWhitepaper, downloadRoadmap, downloadBusinessModel } from "./lib/downloads";
import { generateSeededReport, PRESETS, getDeterministicEVMAddress, getDeterministicSolanaAddress } from "./utils";

const POPULAR_EXAMPLES = [
  {
    name: "Vitalik Buterin (OG Creator)",
    address: "0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
    tier: "Elite",
    score: 985,
    chain: "EVM"
  },
  {
    name: "Elite Whale Trader",
    address: "0x71c7656ec7ab88b098defb751b7401b5f6d1476b",
    tier: "Trusted",
    score: 842,
    chain: "EVM"
  },
  {
    name: "Meme Coin Sniper",
    address: "hn7cabvixv78g48a5sgs27utvys71mjunpzg4899gabc",
    tier: "Caution",
    score: 340,
    chain: "Solana"
  },
  {
    name: "Phishing & Drainer Account",
    address: "0x3922378f846bc0b986b2de66c80ba820847b2c01",
    tier: "High Risk",
    score: 120,
    chain: "EVM"
  }
];

const VERIFIED_CROWDS = [
  ...POPULAR_EXAMPLES,
  {
    name: "karmapower.eth (EVM Power User)",
    address: "0xkarmaevm88888888888888888888888888888888",
    tier: "Trusted",
    score: 785,
    chain: "EVM"
  },
  {
    name: "karmapol.sol (Solana Power Staker)",
    address: "karmasol11111111111111111111111111111111",
    tier: "Trusted",
    score: 820,
    chain: "Solana"
  },
  {
    name: "Wolfpack Herd Alpha Lead",
    address: "0x7777777777777777777777777777777777777777",
    tier: "Elite",
    score: 960,
    chain: "EVM"
  },
  {
    name: "GraveMint Curator",
    address: "0x8888888888888888888888888888888888888888",
    tier: "Trusted",
    score: 895,
    chain: "EVM"
  },
  {
    name: "White Hat Security Auditor",
    address: "0x9999999999999999999999999999999999999999",
    tier: "Elite",
    score: 975,
    chain: "EVM"
  },
  {
    name: "Sybil Cluster Syphon (Flagged)",
    address: "0x5555555555555555555555555555555555555555",
    tier: "High Risk",
    score: 210,
    chain: "EVM"
  },
  {
    name: "Flash-Loan Arbitrage Bot (Slippage Exploit)",
    address: "karmasolexploiter6666666666666666666",
    tier: "High Risk",
    score: 185,
    chain: "Solana"
  },
  {
    name: "Coordinated Airdrop Sybil Cluster",
    address: "0xairdropsybil4444444444444444444444",
    tier: "Caution",
    score: 310,
    chain: "EVM"
  }
];

const dashboardContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.05
    }
  }
};

const dashboardItemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 14,
      duration: 0.6
    }
  }
};

interface LeaderboardEntry {
  rank: number;
  name: string;
  address: string;
  staked: number;
  status: string;
  share: string;
}

const generateLeaderboardData = (): LeaderboardEntry[] => {
  const data: LeaderboardEntry[] = [];
  
  const top6 = [
    { rank: 1, name: "vitalik.eth", address: "0xd8da6bf26964af9d7eed9e03e53415d37aa96045", staked: 9420000000000, status: "👑 PLATINUM TRILLIONAIRE", share: "34.2%" },
    { rank: 2, name: "@swarm_lord", address: "0x3a9c7b8d4f2e1a0b9c8d7e6f5a4b3c2d1e0f9a8b", staked: 5120000000000, status: "💎 GOLDEN TRILLIONAIRE", share: "18.6%" },
    { rank: 3, name: "karma_nexus.sol", address: "KarmaG56vUoXkS7B8N9qZ4pY3rE1wT5yU7iO9pPqRsSt", staked: 2880000000000, status: "⚡ ACTIVE TRILLIONAIRE", share: "10.4%" },
    { rank: 4, name: "@reputation_max", address: "0x51cfa12f39fd6e51aad88f6f4ce6ab8827279cf", staked: 1250000000000, status: "⚡ ACTIVE TRILLIONAIRE", share: "4.5%" },
    { rank: 5, name: "alpha_validator.eth", address: "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266", staked: 920000000000, status: "🚀 BILLIONAIRE CLUB", share: "3.3%" },
    { rank: 6, name: "@decentra_trust", address: "0xbc8e20f4b3c2d1e0f9a8b7e6f5a4b3c2d1e0f9a8", staked: 740000000000, status: "🚀 BILLIONAIRE CLUB", share: "2.7%" },
  ];

  data.push(...top6);

  const prefix = ["alpha", "omega", "giga", "cyber", "sol", "eth", "pioneer", "decentra", "crypt", "node", "nexus", "swarm", "stellar", "matrix", "apex", "validator"];
  const suffix = ["lord", "maker", "staker", "runner", "hunter", "keeper", "expert", "wizard", "ninja", "titan", "scout", "sentinel", "guardian", "beast", "rebel", "monk"];
  const domains = [".eth", ".sol", "", "", "", ""];

  let currentStaked = 700000000000;
  for (let rank = 7; rank <= 2000; rank++) {
    const decreasePct = 0.0022 + (Math.sin(rank * 0.17) * 0.0008);
    currentStaked = Math.max(50000, Math.floor(currentStaked * (1 - Math.abs(decreasePct))));
    
    const pIdx = (rank * 13) % prefix.length;
    const sIdx = (rank * 23) % suffix.length;
    const dld = domains[rank % domains.length];
    
    let name = "";
    if (dld) {
      name = `${prefix[pIdx]}_${suffix[sIdx]}${dld}`;
    } else {
      name = `@${prefix[pIdx]}${suffix[sIdx]}${rank}`;
    }

    let address = "";
    if (rank % 2 === 0) {
      const hex = (rank * 987654321).toString(16).padStart(34, "0");
      address = `0x${hex.slice(0, 38)}`;
    } else {
      const chars = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
      let solAddr = "Karma";
      for (let i = 0; i < 35; i++) {
        solAddr += chars[(rank * i + 17) % chars.length];
      }
      address = solAddr;
    }

    let status = "🔸 VALUED CONTRIBUTOR";
    if (currentStaked >= 1000000000000) {
      status = "⚡ ACTIVE TRILLIONAIRE";
    } else if (currentStaked >= 50000000000) {
      status = "🚀 BILLIONAIRE CLUB";
    } else if (currentStaked >= 1000000000) {
      status = "⭐ POWER STAKER";
    }

    const shareNum = (currentStaked / 27.5e12) * 100;
    const share = shareNum < 0.01 ? "< 0.01%" : `${shareNum.toFixed(2)}%`;

    data.push({
      rank,
      name,
      address,
      staked: currentStaked,
      status,
      share
    });
  }

  return data;
};

export default function App() {
  const [isWhitepaperView, setIsWhitepaperView] = useState(false);
  const [isBusinessModelView, setIsBusinessModelView] = useState(false);
  const [isRoadmapView, setIsRoadmapView] = useState(false);

  // Synchronize Whitepaper, Roadmap, and Business Model views with URL hash/query string for deep-linking
  useEffect(() => {
    const handleLocationChange = () => {
      const hash = window.location.hash.toLowerCase();
      const params = new URLSearchParams(window.location.search);
      
      const isWhitepaperHash = hash === "#whitepaper" || hash === "#/whitepaper" || hash === "#white-paper";
      const isWhitepaperQuery = params.get("view") === "whitepaper" || params.get("tab") === "whitepaper";
      
      const isRoadmapHash = hash === "#roadmap" || hash === "#/roadmap";
      const isRoadmapQuery = params.get("view") === "roadmap" || params.get("tab") === "roadmap";
      
      const isBusinessModelHash = hash === "#businessmodel" || hash === "#/businessmodel" || hash === "#revshare" || hash === "#/revshare" || hash === "#revenue-share";
      const isBusinessModelQuery = params.get("view") === "businessmodel" || params.get("view") === "revshare" || params.get("tab") === "businessmodel" || params.get("tab") === "revshare";

      setIsWhitepaperView(isWhitepaperHash || isWhitepaperQuery);
      setIsRoadmapView(isRoadmapHash || isRoadmapQuery);
      setIsBusinessModelView(isBusinessModelHash || isBusinessModelQuery);
    };

    handleLocationChange();

    window.addEventListener("hashchange", handleLocationChange);
    return () => {
      window.removeEventListener("hashchange", handleLocationChange);
    };
  }, []);

  useEffect(() => {
    const currentHash = window.location.hash.toLowerCase();
    if (isWhitepaperView) {
      if (currentHash !== "#whitepaper") {
        window.history.pushState(null, "", "#whitepaper");
      }
    } else if (isRoadmapView) {
      if (currentHash !== "#roadmap") {
        window.history.pushState(null, "", "#roadmap");
      }
    } else if (isBusinessModelView) {
      if (currentHash !== "#revshare" && currentHash !== "#businessmodel") {
        window.history.pushState(null, "", "#revshare");
      }
    } else {
      // Clear hash if it matches any of our views and we closed them
      const isAnyHash = ["#whitepaper", "#/whitepaper", "#white-paper", "#roadmap", "#/roadmap", "#businessmodel", "#/businessmodel", "#revshare", "#/revshare", "#revenue-share"].includes(currentHash);
      if (isAnyHash) {
        window.history.pushState(null, "", window.location.pathname + window.location.search);
      }
    }
  }, [isWhitepaperView, isRoadmapView, isBusinessModelView]);

  const [addressInput, setAddressInput] = useState("");
  const [report, setReportInternal] = useState<WalletReport | null>(null);

  const applyLocalOverrides = (data: WalletReport | null): WalletReport | null => {
    if (!data) return null;
    const lowerAddress = data.address.toLowerCase();
    const cleanAddress = data.address.trim();
    const copy = { ...data };

    try {
      const localNames = JSON.parse(localStorage.getItem("karma_custom_names") || "{}");
      if (localNames[lowerAddress]) {
        copy.experienceLevel = localNames[lowerAddress];
      } else if (localNames[cleanAddress]) {
        copy.experienceLevel = localNames[cleanAddress];
      }
    } catch (e) {
      console.error("Local names error:", e);
    }

    try {
      const localX = JSON.parse(localStorage.getItem("karma_connected_x") || "{}");
      const account = localX[lowerAddress] || localX[cleanAddress];
      if (account) {
        copy.twitterHandle = account.twitterHandle;
        copy.twitterVerifiedType = account.twitterVerifiedType;
      }
    } catch (e) {
      console.error("Local X error:", e);
    }
    return copy;
  };

  const setReport = (val: WalletReport | null | ((prev: WalletReport | null) => WalletReport | null)) => {
    if (typeof val === "function") {
      setReportInternal((prev) => {
        const resolved = val(prev);
        return applyLocalOverrides(resolved);
      });
    } else {
      setReportInternal(applyLocalOverrides(val));
    }
  };

  const [animatedScore, setAnimatedScore] = useState(0);
  const [isUpdatingScore, setIsUpdatingScore] = useState(false);
  const [glassWaveTrigger, setGlassWaveTrigger] = useState(0);

  // Set the score instantly to disable counting animation as requested
  useEffect(() => {
    if (report) {
      setAnimatedScore(report.score);
    } else {
      setAnimatedScore(0);
    }
  }, [report?.score]);

  // Trigger the modern glassy ripple animation whenever a wallet is connected or changed
  useEffect(() => {
    if (report?.address) {
      setGlassWaveTrigger(prev => prev + 1);
    } else {
      setGlassWaveTrigger(0);
    }
  }, [report?.address]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [scanSteps, setScanSteps] = useState<string[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [showReportModal, setShowReportModal] = useState(false);

  // Soulbound minting states
  const [isSoulbound, setIsSoulbound] = useState(false);
  const [bondStampedDate, setBondStampedDate] = useState<string | null>(null);
  const [isMinting, setIsMinting] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [mintStep, setMintStep] = useState<string>("");

  // User connected wallet states
  const [userWalletAddress, setUserWalletAddress] = useState<string | null>(null);
  const [userWalletChain, setUserWalletChain] = useState<"Solana" | "EVM" | null>(null);
  const [solBalance, setSolBalance] = useState<number>(() => {
    const saved = localStorage.getItem("karma_wallet_sol_balance");
    return saved ? parseFloat(saved) : 2.48;
  });
  const [ethBalance, setEthBalance] = useState<number>(() => {
    const saved = localStorage.getItem("karma_wallet_eth_balance");
    return saved ? parseFloat(saved) : 0.142;
  });
  const [showConnectWalletModal, setShowConnectWalletModal] = useState(false);

  const handleDeductWalletBalance = (amount: number) => {
    if (userWalletChain === "Solana") {
      setSolBalance((prev) => {
        const next = Math.max(0, prev - amount);
        localStorage.setItem("karma_wallet_sol_balance", next.toFixed(4));
        return parseFloat(next.toFixed(4));
      });
    } else {
      setEthBalance((prev) => {
        const next = Math.max(0, prev - amount);
        localStorage.setItem("karma_wallet_eth_balance", next.toFixed(4));
        return parseFloat(next.toFixed(4));
      });
    }
  };
  const [isConnectingWallet, setIsConnectingWallet] = useState<string | null>(null); // "Solana" or "EVM" or null
  const [columnTwoTab, setColumnTwoTab] = useState<"social" | "nfts">("social");
  const [activeMainTab, setActiveMainTab] = useState<"dashboard" | "staking" | "premium" | "nfc-card">("dashboard");

  // Navigation minimization & scroll states
  const [isNavMinimized, setIsNavMinimized] = useState(() => {
    return typeof window !== "undefined" && window.innerWidth < 768;
  });
  const [autoMinimizeOnScroll, setAutoMinimizeOnScroll] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("up");

  // Specialized Bonding / Minting flow states
  const [isBondingFlowAfterConnect, setIsBondingFlowAfterConnect] = useState(false);
  const [bondingModalState, setBondingModalState] = useState<"hidden" | "check_wallet" | "bonding" | "success">("hidden");
  const [bondingWalletChain, setBondingWalletChain] = useState<"Solana" | "EVM" | null>(null);
  const [bondingStepText, setBondingStepText] = useState("");

  // Premium investigation requests (persisted in local state)
  const [premiumRequests, setPremiumRequests] = useState<any[]>([]);
  const [premiumForm, setPremiumForm] = useState({
    walletAddress: "",
    email: "",
    urgency: "standard",
    notes: ""
  });
  const [premiumSuccess, setPremiumSuccess] = useState(false);
  const [premiumLoading, setPremiumLoading] = useState(false);
  const [premiumStepText, setPremiumStepText] = useState("");

  // X/Twitter link states
  const [userTwitterConnected, setUserTwitterConnected] = useState(false);
  const [userTwitterHandle, setUserTwitterHandle] = useState<string | null>(null);
  const [showLinkXModal, setShowLinkXModal] = useState(false);
  const [linkXForm, setLinkXForm] = useState({
    twitterHandle: "",
    twitterVerifiedType: "individual" as "business" | "individual"
  });
  const [linkXLoading, setLinkXLoading] = useState(false);
  const [linkXSuccess, setLinkXSuccess] = useState<string | null>(null);
  const [linkXError, setLinkXError] = useState<string | null>(null);

  // Toast notifications state
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);

  // ZK-Demo states
  const [demoNftCollection, setDemoNftCollection] = useState("Mad Lads");
  const [demoTwitterHandle, setDemoTwitterHandle] = useState("wolfpack_lead");
  const [demoProvingState, setDemoProvingState] = useState<"idle" | "proving" | "done">("idle");
  const [demoProgress, setDemoProgress] = useState(0);

  // ZK-Demo Share to X states
  const [demoIsSharingX, setDemoIsSharingX] = useState(false);
  const [demoSharingStep, setDemoSharingStep] = useState("");
  const [demoSharedResult, setDemoSharedResult] = useState<any | null>(null);

  const handleStartDemo = () => {
    setDemoProvingState("proving");
    setDemoProgress(0);
    setDemoSharedResult(null);
    const interval = setInterval(() => {
      setDemoProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setDemoProvingState("done");
          return 100;
        }
        return prev + 8;
      });
    }, 120);
  };

  const handleShareXProof = async () => {
    if (!demoTwitterHandle) {
      showToast("X Handle is required to share the proof.", "error");
      return;
    }
    setDemoIsSharingX(true);
    setDemoSharedResult(null);

    const steps = [
      "Securing connection to Karma AI crypt-registry...",
      `Resolving official X handle @${demoTwitterHandle}...`,
      "Signing cryptographic Zero-Knowledge signature...",
      `Publishing proof directly to @${demoTwitterHandle} connected feed...`,
      "Anchoring verification mirror post to the official @karmascoreai public database..."
    ];

    try {
      // Transition steps with beautiful delays
      for (let i = 0; i < steps.length; i++) {
        setDemoSharingStep(steps[i]);
        await new Promise((resolve) => setTimeout(resolve, 850));
      }

      const collectionMapping: Record<string, string> = {
        "Mad Lads": "⚡ Mad Lads #8912",
        "Pudgy Penguins": "🐧 Pudgy Penguin #4023",
        "DeGods": "👑 DeGod #2910",
        "Bored Apes": "🦍 Bored Ape #592"
      };
      const assetName = collectionMapping[demoNftCollection] || `${demoNftCollection} Asset`;

      const response = await fetch("/api/share-x-proof", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          twitterHandle: demoTwitterHandle,
          nftCollection: demoNftCollection,
          assetName: assetName
        })
      });

      if (!response.ok) {
        throw new Error("Failed to post proof to X backend API.");
      }

      const data = await response.json();
      if (data.success && data.share) {
        setDemoSharedResult(data.share);
        showToast("Proof shared instantly and mirrored to official Karma AI page!", "success");
      } else {
        throw new Error(data.error || "An error occurred during sharing.");
      }
    } catch (err: any) {
      console.error(err);
      showToast(err.message || "Failed to publish ZK proof to X backend.", "error");
    } finally {
      setDemoIsSharingX(false);
    }
  };

  const showToast = (message: string, type: "success" | "error" | "info" = "success") => {
    setToast({ message, type });
    // Dismiss after 4 seconds
    setTimeout(() => {
      setToast(prev => prev?.message === message ? null : prev);
    }, 4000);
  };

  // Synchronize Twitter connection state when report changes
  useEffect(() => {
    if (report && report.twitterHandle) {
      setUserTwitterConnected(true);
      setUserTwitterHandle(report.twitterHandle);
    } else {
      setUserTwitterConnected(false);
      setUserTwitterHandle(null);
    }
  }, [report]);

  // Handle window scroll to detect scroll position and direction
  useEffect(() => {
    let previousScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Scrolled past 80px
      setIsScrolled(currentScrollY > 80);

      // Determine scroll direction
      if (currentScrollY > previousScrollY && currentScrollY > 150) {
        setScrollDirection("down");
      } else if (currentScrollY < previousScrollY) {
        setScrollDirection("up");
      }

      previousScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Custom purchased name states
  const [showChangeNameModal, setShowChangeNameModal] = useState(false);
  const [customNameInput, setCustomNameInput] = useState("");
  const [isBuyingName, setIsBuyingName] = useState(false);
  const [buyNameSuccess, setBuyNameSuccess] = useState(false);
  const [buyNameError, setBuyNameError] = useState<string | null>(null);
  const [buyNameStep, setBuyNameStep] = useState("");

  // Swarm staking states
  const [showSwarmStakingModal, setShowSwarmStakingModal] = useState(false);
  const [stakingAmount, setStakingAmount] = useState("1000");
  const [stakedBalance, setStakedBalance] = useState(5000); // Start with some default staked amount for demonstration
  const [rewardTally, setRewardTally] = useState(24.385);
  const [stakingLoading, setStakingLoading] = useState(false);
  const [stakingSuccess, setStakingSuccess] = useState(false);

  // Swarm NFT states
  const [hasSwarmNft, setHasSwarmNft] = useState<boolean>(() => {
    try {
      return localStorage.getItem("karma_has_swarm_nft") === "true";
    } catch {
      return false;
    }
  });
  const [showMintSwarmNftModal, setShowMintSwarmNftModal] = useState(true);
  const [isMintingSwarmNft, setIsMintingSwarmNft] = useState(false);
  const [swarmNftMintStep, setSwarmNftMintStep] = useState("");

  // Verified sandbox pop-up search states
  const [showVerifiedCrowdsModal, setShowVerifiedCrowdsModal] = useState(false);
  const [verifiedSearchQuery, setVerifiedSearchQuery] = useState("");
  const [leaderboardSearchQuery, setLeaderboardSearchQuery] = useState("");
  const [leaderboardVisibleCount, setLeaderboardVisibleCount] = useState(150);

  // Memoize full 2000 leaderboard entries to ensure zero lag
  const fullLeaderboardData = useMemo(() => generateLeaderboardData(), []);

  const filteredLeaderboardRows = useMemo(() => {
    const q = leaderboardSearchQuery.toLowerCase().trim();
    if (!q) return fullLeaderboardData;
    return fullLeaderboardData.filter((row) => {
      return (
        row.name.toLowerCase().includes(q) ||
        row.address.toLowerCase().includes(q) ||
        row.rank.toString() === q ||
        row.status.toLowerCase().includes(q)
      );
    });
  }, [fullLeaderboardData, leaderboardSearchQuery]);

  // Staking reward simulation ticker
  useEffect(() => {
    if (stakedBalance <= 0) return;

    const interval = setInterval(() => {
      // Calculate multiplier from report score (default is 5x yield boost if no report)
      const scoreWeight = report ? report.score : 500;
      const karmaMultiplier = scoreWeight / 100;
      // Growth scale matches staked balance size
      const baseYield = (stakedBalance * 0.00000004); 
      const nftMultiplier = hasSwarmNft ? 12.5 : 1.0;
      setRewardTally((prev) => prev + baseYield * karmaMultiplier * nftMultiplier);
    }, 1000);

    return () => clearInterval(interval);
  }, [stakedBalance, report?.score, hasSwarmNft]);

  const handleConnectXSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!report) return;
    if (!linkXForm.twitterHandle.trim()) {
      setLinkXError("Please enter a valid X handle.");
      return;
    }

    setLinkXLoading(true);
    setLinkXSuccess(null);
    setLinkXError(null);

    let handleValue = linkXForm.twitterHandle.trim();
    if (!handleValue.startsWith("@")) {
      handleValue = `@${handleValue}`;
    }
    let verifiedType = linkXForm.twitterVerifiedType;

    try {
      try {
        const res = await fetch("/api/connect-x", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            address: report.address,
            twitterHandle: handleValue,
            twitterVerifiedType: verifiedType
          })
        });

        if (res.ok) {
          const data = await res.json();
          handleValue = data.handle || handleValue;
          verifiedType = data.verifiedType || verifiedType;
        } else {
          console.warn("Backend connect-x failed. Falling back to local connection.");
        }
      } catch (backendErr) {
        console.warn("Backend connect-x error, using local storage fallback:", backendErr);
      }

      // Local storage persistence: save the connected X profile mapping
      const lowerAddress = report.address.toLowerCase();
      try {
        const localX = JSON.parse(localStorage.getItem("karma_connected_x") || "{}");
        localX[lowerAddress] = {
          twitterHandle: handleValue,
          twitterVerifiedType: verifiedType
        };
        localX[report.address.trim()] = {
          twitterHandle: handleValue,
          twitterVerifiedType: verifiedType
        };
        localStorage.setItem("karma_connected_x", JSON.stringify(localX));
      } catch (err) {
        console.error("Failed to write X profile connection to localStorage:", err);
      }

      setLinkXSuccess("Link established successfully!");
      setUserTwitterConnected(true);
      setUserTwitterHandle(handleValue);
      setReport({
        ...report,
        twitterHandle: handleValue,
        twitterVerifiedType: verifiedType
      });

      setTimeout(() => {
        setShowLinkXModal(false);
        setLinkXSuccess(null);
        setLinkXForm({ twitterHandle: "", twitterVerifiedType: "individual" });
      }, 1500);

    } catch (err: any) {
      console.error(err);
      setLinkXError("An error occurred while establishing the connection link.");
    } finally {
      setLinkXLoading(false);
    }
  };

  const handleDisconnectX = async () => {
    const activeAddress = report?.address || userWalletAddress;
    const activeHandle = report?.twitterHandle || userTwitterHandle || "account";
    
    try {
      if (activeAddress) {
        try {
          await fetch("/api/disconnect-x", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ address: activeAddress })
          });
        } catch (backendErr) {
          console.warn("Backend disconnect-x error, proceeding locally:", backendErr);
        }

        // Local storage cleanup
        const lowerAddress = activeAddress.toLowerCase();
        try {
          const localX = JSON.parse(localStorage.getItem("karma_connected_x") || "{}");
          delete localX[lowerAddress];
          delete localX[activeAddress.trim()];
          localStorage.setItem("karma_connected_x", JSON.stringify(localX));
        } catch (err) {
          console.error("Failed to clean up localStorage:", err);
        }
      }

      // Reset state
      setUserTwitterConnected(false);
      setUserTwitterHandle(null);
      if (report) {
        setReport({
          ...report,
          twitterHandle: undefined,
          twitterVerifiedType: undefined
        });
      }
      
      showToast(`X / Twitter account @${String(activeHandle).replace(/^@/, "")} logged out and unlinked successfully.`, "success");
    } catch (err) {
      console.error(err);
      showToast("An error occurred while logging out of your X account.", "error");
    }
  };

  const handlePlatformLogout = () => {
    // Disconnect everything
    handleDisconnectWallet();
    showToast("Logged out of the platform successfully.", "success");
  };

  const handlePurchaseName = async (e: FormEvent) => {
    e.preventDefault();
    if (!report) return;
    if (!customNameInput.trim()) {
      setBuyNameError("Please enter a valid identity name.");
      return;
    }

    setBuyNameError(null);
    setIsBuyingName(true);
    
    // Detailed Solana transaction simulation steps
    const steps = [
      "Awaiting Phantom/Solflare signature...",
      "Broadcasting transaction to Solana mainnet-beta...",
      "Transferring 0.005 SOL to Treasury escrow account...",
      "Awaiting ledger confirmation (commitment: finalized)...",
      "Updating on-chain identity index and metadata..."
    ];

    try {
      for (let i = 0; i < steps.length; i++) {
        setBuyNameStep(steps[i]);
        await new Promise((resolve) => setTimeout(resolve, 850));
      }

      let newNameValue = customNameInput.trim();

      try {
        const res = await fetch("/api/update-name", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            address: report.address,
            newName: customNameInput
          })
        });

        if (res.ok) {
          const data = await res.json();
          newNameValue = data.newName || newNameValue;
        } else {
          console.warn("Backend update-name failed. Falling back to local update.");
        }
      } catch (backendErr) {
        console.warn("Backend update-name error, using local storage fallback:", backendErr);
      }

      // Local storage persistence: save the custom name mapping
      const lowerAddress = report.address.toLowerCase();
      try {
        const localNames = JSON.parse(localStorage.getItem("karma_custom_names") || "{}");
        localNames[lowerAddress] = newNameValue;
        localNames[report.address.trim()] = newNameValue;
        localStorage.setItem("karma_custom_names", JSON.stringify(localNames));
      } catch (err) {
        console.error("Failed to write custom name to localStorage:", err);
      }

      setBuyNameSuccess(true);
      setReport({
        ...report,
        experienceLevel: newNameValue,
        ensName: newNameValue
      });
      setTimeout(() => {
        setShowChangeNameModal(false);
        setBuyNameSuccess(false);
        setCustomNameInput("");
        setBuyNameStep("");
      }, 2200);
    } catch (err) {
      console.error("Error updating custom name:", err);
      setBuyNameError("Network error occurred during name registration.");
    } finally {
      setIsBuyingName(false);
    }
  };

  const handlePollenSpread = (boost: number) => {
    if (report) {
      const newScore = Math.min(1000, report.score + boost);
      setReport({
        ...report,
        score: newScore
      });
    }
  };

  const handleUpdateScore = async () => {
    if (!report || isUpdatingScore) return;
    setIsUpdatingScore(true);

    // Scan the wallet & process transactions to recalculate score
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Calculate a new score. Let's make sure it changes!
    let scoreChange = Math.floor(Math.random() * 80) + 40; // change between +40 and +120
    let nextScore = report.score + scoreChange;
    if (nextScore > 1000) {
      nextScore = 280 + Math.floor(Math.random() * 250);
    }

    // Determine new tier and title based on the new score
    let nextTier = "Neutral";
    let nextLevel = report.experienceLevel || "Chain Wanderer";

    if (nextScore >= 900) {
      nextTier = "Elite";
      nextLevel = "DeFi Sovereign";
    } else if (nextScore >= 800) {
      nextTier = "High";
      nextLevel = "Alpha Infiltrator";
    } else if (nextScore >= 650) {
      nextTier = "Good";
      nextLevel = "Liquidity Architect";
    } else if (nextScore >= 450) {
      nextTier = "Moderate";
      nextLevel = "Ecosystem Builder";
    } else if (nextScore >= 300) {
      nextTier = "Low";
      nextLevel = "Staking Cadet";
    } else {
      nextTier = "Threat";
      nextLevel = "Flagged Hazard";
    }

    setReport({
      ...report,
      score: nextScore,
      reputationTier: nextTier,
      experienceLevel: nextLevel
    });

    // Reset soulbound status so each new score update behaves like a new check & requires a new soulbound mint
    setIsSoulbound(false);
    setBondStampedDate(null);

    setIsUpdatingScore(false);
  };

  const handleConnectWalletForBonding = async (chain: "Solana" | "EVM") => {
    setShowConnectWalletModal(false);
    setBondingModalState("check_wallet");
    setBondingWalletChain(chain);
    
    // Simulate check-your-wallet handshake
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    const address = chain === "Solana" 
      ? "KarmaSol11111111111111111111111111111111" 
      : "0xKarmaEVM88888888888888888888888888888888";
      
    setUserWalletAddress(address);
    setUserWalletChain(chain);
    
    // Read in the passport card (decode)
    try {
      const lowerAddress = address.toLowerCase();
      const matchedPreset = Object.keys(PRESETS).find(key => key.toLowerCase() === lowerAddress);
      if (matchedPreset) {
        setReport(PRESETS[matchedPreset]);
        setAddressInput(address);
      } else {
        const response = await fetch("/api/decode", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ address })
        });
        const contentType = response.headers.get("content-type");
        if (response.ok && contentType && contentType.includes("application/json")) {
          const data = await response.json();
          setReport(data);
        } else {
          setReport(generateSeededReport(address, chain));
        }
        setAddressInput(address);
      }
    } catch (e) {
      console.error("Auto decode error:", e);
      setReport(generateSeededReport(address, chain));
      setAddressInput(address);
    }
    
    // Move to bonding minting step
    setBondingModalState("bonding");
    
    const steps = [
      "Securing network RPC node link...",
      "Requesting user signature for permanent identity seal...",
      `Processing bonding fee transfer: ${chain === "Solana" ? "0.05 SOL" : "$5 equivalent EVM"}...`,
      "Synthesizing decentralized SBT metadata package...",
      "Minting non-transferable Soulbound reputation cert...",
      "Finalizing dynamic oracle anchors & ledger updates..."
    ];
    
    for (let i = 0; i < steps.length; i++) {
      setBondingStepText(steps[i]);
      await new Promise((resolve) => setTimeout(resolve, 1100));
    }
    
    setIsSoulbound(true);
    setBondStampedDate(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).toUpperCase());
    setBondingModalState("success");
    setShowConfetti(true);
    
    setTimeout(() => {
      setShowConfetti(false);
    }, 4000);
  };

  const handleConnectWallet = async (chain: "Solana" | "EVM") => {
    if (isBondingFlowAfterConnect) {
      handleConnectWalletForBonding(chain);
      return;
    }

    setIsConnectingWallet(chain);
    await new Promise((resolve) => setTimeout(resolve, 400));
    
    let connectedAddress = "";
    if (chain === "Solana") {
      connectedAddress = "KarmaSol11111111111111111111111111111111";
      setUserWalletAddress(connectedAddress);
      setUserWalletChain("Solana");
    } else {
      connectedAddress = "0xKarmaEVM88888888888888888888888888888888";
      setUserWalletAddress(connectedAddress);
      setUserWalletChain("EVM");
    }
    
    setIsConnectingWallet(null);
    setShowConnectWalletModal(false);

    // Automatically decode the connected wallet so it reads into the passport card!
    handleDecode(connectedAddress, false);
  };

  const handleDisconnectWallet = () => {
    if (userWalletAddress) {
      const lowerAddress = userWalletAddress.toLowerCase();
      try {
        const localX = JSON.parse(localStorage.getItem("karma_connected_x") || "{}");
        delete localX[lowerAddress];
        delete localX[userWalletAddress.trim()];
        localStorage.setItem("karma_connected_x", JSON.stringify(localX));
      } catch (e) {
        console.error("Failed to clean up localStorage on wallet disconnect:", e);
      }
      
      // Notify backend if possible to disconnect X account from this wallet session
      fetch("/api/disconnect-x", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address: userWalletAddress })
      }).catch(err => console.warn("Backend disconnect error on wallet disconnect:", err));
    }

    setUserWalletAddress(null);
    setUserWalletChain(null);
    setIsSoulbound(false); // Reset soulbound when wallet changes
    setBondStampedDate(null); // Reset stamped date
    setUserTwitterConnected(false);
    setUserTwitterHandle(null);
    setReport(null); // Clear report on disconnect to close passport card
  };

  const handleBondAndMint = async () => {
    if (!userWalletAddress) {
      setIsBondingFlowAfterConnect(true);
      setShowConnectWalletModal(true);
      return;
    }

    setIsMinting(true);
    setMintStep("Initiating bonding vault handshake...");
    await new Promise((resolve) => setTimeout(resolve, 300));

    setMintStep("Requesting user signature approval in wallet...");
    await new Promise((resolve) => setTimeout(resolve, 400));

    const feeAmount = userWalletChain === "Solana" ? "0.05 SOL" : "$5 (0.002 ETH equivalent)";
    setMintStep(`Transferring bonding fee of ${feeAmount} to Karma treasury safe...`);
    await new Promise((resolve) => setTimeout(resolve, 400));

    setMintStep("Writing decentralized metadata & minting Soulbound SBT...");
    await new Promise((resolve) => setTimeout(resolve, 400));

    setMintStep("Finalizing ledger inclusion & consensus check...");
    await new Promise((resolve) => setTimeout(resolve, 300));

    setIsMinting(false);
    setMintStep("");
    setIsSoulbound(true);
    setBondStampedDate(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).toUpperCase());
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 4000);
  };

  // Only fetch premium requests on mount (keep the passport card close/hidden initially)
  useEffect(() => {
    fetchPremiumRequests();
  }, []);

  // Smoothly scroll down to results dashboard when a report becomes available
  useEffect(() => {
    if (report) {
      const timer = setTimeout(() => {
        const el = document.getElementById("results-dashboard");
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [report]);

  const stepsList = [
    "Initializing connection to RPC node cluster...",
    "Querying block transaction indexes...",
    "Retrieving native gas and token balances...",
    "Analyzing historical smart contract interaction signatures...",
    "Mapping DeFi liquidity pool allocations...",
    "Analyzing NFT metadata and verified creator access lists...",
    "Analyzing wash-trading & circular volume anomalies...",
    "Running machine learning behavioral classifier...",
    "Decoding risk variables & blacklist indices...",
    "Compiling final on-chain Karma score...",
  ];

  // Animate the scanner logs nicely
  useEffect(() => {
    if (loading) {
      setScanSteps([]);
      setCurrentStepIndex(0);
      const interval = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev < stepsList.length) {
            setScanSteps((current) => [...current, stepsList[prev]]);
            return prev + 1;
          } else {
            clearInterval(interval);
            return prev;
          }
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [loading]);

  const handleDecode = async (targetAddress: string, isInitial = false) => {
    const cleanAddress = targetAddress.trim();
    if (!cleanAddress) {
      setError("Please enter a valid Solana or EVM wallet address.");
      return;
    }
    setLoading(true);
    setError(null);

    const lowerAddress = cleanAddress.toLowerCase();
    
    let resolvedAddress = cleanAddress;
    let chain: "EVM" | "Solana" | null = null;
    let isDomain = false;
    let originalDomain = "";

    const KNOWN_DOMAINS: Record<string, { address: string; chain: "EVM" | "Solana" }> = {
      "vitalik.eth": { address: "0xd8da6bf26964af9d7eed9e03e53415d37aa96045", chain: "EVM" },
      "whaletrader.eth": { address: "0x71c7656ec7ab88b098defb751b7401b5f6d1476b", chain: "EVM" },
      "sniper.sol": { address: "hn7cabvixv78g48a5sgs27utvys71mjunpzg4899gabc", chain: "Solana" },
      "karmapower.eth": { address: "0xkarmaevm88888888888888888888888888888888", chain: "EVM" },
      "karmapol.sol": { address: "karmasol11111111111111111111111111111111", chain: "Solana" }
    };

    if (KNOWN_DOMAINS[lowerAddress]) {
      resolvedAddress = KNOWN_DOMAINS[lowerAddress].address;
      chain = KNOWN_DOMAINS[lowerAddress].chain;
      isDomain = true;
      originalDomain = lowerAddress;
    } else {
      // Check local custom names by reverse lookup
      try {
        const localNames = JSON.parse(localStorage.getItem("karma_custom_names") || "{}");
        for (const [addr, name] of Object.entries(localNames)) {
          if (typeof name === "string" && name.toLowerCase() === lowerAddress) {
            resolvedAddress = addr;
            chain = addr.startsWith("0x") ? "EVM" : "Solana";
            isDomain = true;
            originalDomain = name;
            break;
          }
        }
      } catch (e) {
        console.error("Local reverse lookup error:", e);
      }
    }

    const resolvedLower = resolvedAddress.toLowerCase();

    // If chain was not determined, check standard formats or suffixes
    if (!chain) {
      if (/^0x[a-fA-F0-9]{40}$/.test(resolvedAddress) || resolvedLower === "0xkarmaevm88888888888888888888888888888888") {
        chain = "EVM";
      } else if (/^[1-9A-HJ-NP-Za-km-z]{30,44}$/.test(resolvedAddress) || resolvedLower === "karmasol11111111111111111111111111111111") {
        chain = "Solana";
      } else if (resolvedLower.endsWith(".sol")) {
        chain = "Solana";
        resolvedAddress = getDeterministicSolanaAddress(resolvedLower);
        isDomain = true;
        originalDomain = resolvedLower;
      } else if (resolvedLower.endsWith(".eth") || resolvedLower.includes(".")) {
        chain = "EVM";
        resolvedAddress = getDeterministicEVMAddress(resolvedLower);
        isDomain = true;
        originalDomain = resolvedLower;
      } else {
        // FALLBACK: Treat any arbitrary string as a custom username or handle
        chain = "EVM";
        resolvedAddress = getDeterministicEVMAddress(resolvedLower);
        isDomain = true;
        originalDomain = resolvedLower.includes(".") ? resolvedLower : `${resolvedLower}.score`;
      }
    }

    if (!chain) {
      setError("Please enter a valid Solana or EVM wallet address, or a registered .eth/.sol/.score name.");
      setLoading(false);
      return;
    }

    // Check if preset exists on client for instantaneous, flawless rendering
    const presetKey = resolvedAddress.toLowerCase();
    const matchedPreset = Object.keys(PRESETS).find(key => key.toLowerCase() === presetKey);
    if (matchedPreset) {
      await new Promise(resolve => setTimeout(resolve, 800)); // smooth progress bar feeling
      const reportData = { ...PRESETS[matchedPreset] };
      if (isDomain && originalDomain) {
        reportData.ensName = originalDomain;
      }
      setReport(reportData);
      setAddressInput(targetAddress);
      setIsSoulbound(false);
      setIsMinting(false);
      setLoading(false);
      
      if (!isInitial) {
        setTimeout(() => {
          const el = document.getElementById("results-dashboard");
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 100);
      }
      return;
    }

    try {
      const response = await fetch("/api/decode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address: targetAddress })
      });
      
      let data;
      const contentType = response.headers.get("content-type");
      if (response.ok && contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        // Fallback to client-side seeded generator if server fails or returned HTML (e.g. static hosting)
        console.warn("Backend API returned non-JSON or error. Falling back to local seeded decoder.");
        await new Promise(resolve => setTimeout(resolve, 100));
        data = generateSeededReport(resolvedAddress, chain);
      }

      if (isDomain && originalDomain) {
        data.ensName = originalDomain;
      }
      setReport(data);
      // Synchronize input value with searched address
      setAddressInput(targetAddress);
      
      // Reset soulbound states on new decode search
      setIsSoulbound(false);
      setIsMinting(false);

      // Smoothly scroll down to results dashboard when a search completes
      if (!isInitial) {
        setTimeout(() => {
          const el = document.getElementById("results-dashboard");
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 300);
      }
    } catch (err: any) {
      console.warn("Network error during decode, falling back to client-side decoder:", err);
      try {
        await new Promise(resolve => setTimeout(resolve, 100));
        const data = generateSeededReport(resolvedAddress, chain);
        if (isDomain && originalDomain) {
          data.ensName = originalDomain;
        }
        setReport(data);
        setAddressInput(targetAddress);
        setIsSoulbound(false);
        setIsMinting(false);
        if (!isInitial) {
          setTimeout(() => {
            const el = document.getElementById("results-dashboard");
            if (el) {
              el.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          }, 300);
        }
      } catch (fallbackErr: any) {
        console.error(fallbackErr);
        setError(fallbackErr.message || "Failed to check wallet reputation. Check format and try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchPremiumRequests = async (retries = 3, delayMs = 1500) => {
    for (let i = 0; i < retries; i++) {
      try {
        const res = await fetch("/api/premium-requests");
        if (res.ok) {
          const data = await res.json();
          setPremiumRequests(data || []);
          return;
        }
      } catch (err) {
        if (i === retries - 1) {
          console.warn("Could not fetch premium requests on load, falling back to empty queue:", err);
          setPremiumRequests([]);
        } else {
          await new Promise((resolve) => setTimeout(resolve, delayMs));
        }
      }
    }
  };

  const handlePremiumSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!premiumForm.walletAddress.trim() || !premiumForm.email.trim()) {
      return;
    }
    setPremiumLoading(true);

    const steps = [
      "Establishing secure Web3 peer tunnel...",
      "Requesting authorization signature from connected wallet...",
      "Transferring custom premium audit fee of 0.08 SOL to treasury...",
      "Verifying cryptographic signature on the Solana ledger...",
      "Allocating certified security researcher container...",
      "Registering priority audit target in active deep-scan queue..."
    ];

    try {
      for (let i = 0; i < steps.length; i++) {
        setPremiumStepText(steps[i]);
        await new Promise((resolve) => setTimeout(resolve, 950));
      }

      const res = await fetch("/api/premium-investigate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(premiumForm)
      });
      if (res.ok) {
        setPremiumSuccess(true);
        setPremiumForm({ walletAddress: "", email: "", urgency: "standard", notes: "" });
        fetchPremiumRequests();
        setTimeout(() => setPremiumSuccess(false), 6000);
      } else {
        const d = await res.json();
        setError(d.error || "Failed to submit request.");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setPremiumLoading(false);
      setPremiumStepText("");
    }
  };

  // Color functions based on levels and scores
  const getTierLevelText = (tier: string, score?: number) => {
    if (score !== undefined && score < 280) {
      return "DANGER • Tier 1 of 5";
    }
    switch (tier) {
      case "Elite": return "Tier 5 of 5";
      case "Trusted": return "Tier 4 of 5";
      case "Good": return "Tier 3 of 5";
      case "Neutral": return "Tier 2 of 5";
      case "Caution": return "Tier 2 of 5";
      case "High Risk": return "Tier 1 of 5";
      default: return "Tier 2 of 5";
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "Elite": return "text-emerald-400 border-emerald-500 bg-emerald-950/20";
      case "Trusted": return "text-teal-400 border-teal-500 bg-teal-950/20";
      case "Good": return "text-yellow-400 border-yellow-500/30 bg-yellow-950/20";
      case "Neutral": return "text-slate-400 border-slate-500 bg-slate-950/20";
      case "Caution": return "text-amber-400 border-amber-500 bg-amber-950/20";
      case "High Risk": return "text-rose-500 border-rose-600 bg-rose-950/20";
      default: return "text-slate-400 border-slate-500 bg-slate-950/20";
    }
  };

  const getScoreColorClass = (score: number) => {
    if (score <= 280) return "text-red-500 animate-pulse";
    if (score <= 588) return "text-yellow-400";
    if (score <= 888) return "text-emerald-400";
    return "text-white";
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Low": return "text-emerald-400";
      case "Medium": return "text-amber-400";
      case "High": return "text-orange-400";
      case "Critical": return "text-rose-500 font-bold";
      default: return "text-slate-400";
    }
  };

  const getSignalBadgeStyle = (level: SignalLevel) => {
    switch (level) {
      case SignalLevel.GREEN: return "bg-emerald-500/10 border-emerald-500/20 text-emerald-400";
      case SignalLevel.YELLOW: return "bg-amber-500/10 border-amber-500/20 text-amber-400";
      case SignalLevel.ORANGE: return "bg-orange-500/10 border-orange-500/20 text-orange-400";
      case SignalLevel.RED: return "bg-rose-500/10 border-rose-500/20 text-rose-400";
      default: return "bg-slate-500/10 border-slate-500/20 text-slate-400";
    }
  };

  const getSecurityRiskBadge = (level: RiskLevel) => {
    switch (level) {
      case RiskLevel.LOW: return <span className="px-2 py-0.5 text-xs font-mono font-medium rounded border bg-emerald-500/10 border-emerald-500/30 text-emerald-400">LOW</span>;
      case RiskLevel.MEDIUM: return <span className="px-2 py-0.5 text-xs font-mono font-medium rounded border bg-amber-500/10 border-amber-500/30 text-amber-400">MEDIUM</span>;
      case RiskLevel.HIGH: return <span className="px-2 py-0.5 text-xs font-mono font-medium rounded border bg-orange-500/10 border-orange-500/30 text-orange-400">HIGH</span>;
      case RiskLevel.CRITICAL: return <span className="px-2 py-0.5 text-xs font-mono font-bold rounded border bg-rose-500/10 border-rose-500/40 text-rose-400 animate-pulse">CRITICAL</span>;
    }
  };

  // SVG representation for the dynamic high-fidelity green/yellow radar chart
  const renderRadarChart = (report: WalletReport) => {
    const cx = 110;
    const cy = 110;
    const r = 72;
    const numPoints = 5;

    const rawConsistency = report.reputationBreakdown.consistency ?? 80;
    const rawProtocol = report.reputationBreakdown.protocolReputation ?? 75;
    const rawDeFi = report.reputationBreakdown.ecosystemParticipation ?? 70;
    const rawSafety = report.reputationBreakdown.security ?? 85;
    const rawRecency = report.reputationBreakdown.consistency ?? 80;

    const m1 = Math.max(1, Math.round((rawConsistency / 100) * 20));
    const m2 = Math.max(1, Math.round((rawProtocol / 100) * 17));
    const m3 = Math.max(1, Math.round((rawDeFi / 100) * 25));
    const m4 = Math.max(1, Math.round((rawSafety / 100) * 15));
    const m5 = Math.max(1, Math.round((rawRecency / 100) * 15));

    const percentages = [
      m1 / 20,
      m2 / 17,
      m3 / 25,
      m4 / 15,
      m5 / 15
    ];

    const backgroundPentagons = [0.25, 0.5, 0.75, 1.0].map((scale) => {
      const points = [];
      for (let i = 0; i < numPoints; i++) {
        const angle = (i * 2 * Math.PI) / numPoints - Math.PI / 2;
        const x = cx + r * scale * Math.cos(angle);
        const y = cy + r * scale * Math.sin(angle);
        points.push(`${x},${y}`);
      }
      return points.join(" ");
    });

    const activePoints = [];
    for (let i = 0; i < numPoints; i++) {
      const angle = (i * 2 * Math.PI) / numPoints - Math.PI / 2;
      const x = cx + r * percentages[i] * Math.cos(angle);
      const y = cy + r * percentages[i] * Math.sin(angle);
      activePoints.push({ x, y });
    }
    const polygonPointsStr = activePoints.map(p => `${p.x},${p.y}`).join(" ");

    const labels = [
      { text: "Consistency", x: cx, y: cy - r - 12, anchor: "middle" as const },
      { text: "Protocol (17)", x: cx + r + 10, y: cy - r/4, anchor: "start" as const },
      { text: "DeFi Exposure", x: cx + r/2 + 5, y: cy + r + 12, anchor: "start" as const },
      { text: "Safety Ratio", x: cx - r/2 - 5, y: cy + r + 12, anchor: "end" as const },
      { text: "Wallet Age", x: cx - r - 10, y: cy - r/4, anchor: "end" as const }
    ];

    return (
      <svg className="w-56 h-56 mx-auto overflow-visible" viewBox="0 0 220 220">
        {backgroundPentagons.map((points, idx) => (
          <polygon
            key={idx}
            points={points}
            fill="none"
            stroke="rgba(71, 85, 105, 0.35)"
            strokeWidth="1"
            strokeDasharray="2"
          />
        ))}

        {Array.from({ length: numPoints }).map((_, i) => {
          const angle = (i * 2 * Math.PI) / numPoints - Math.PI / 2;
          const x = cx + r * Math.cos(angle);
          const y = cy + r * Math.sin(angle);
          return (
            <line
              key={i}
              x1={cx}
              y1={cy}
              x2={x}
              y2={y}
              stroke="rgba(71, 85, 105, 0.25)"
              strokeWidth="1"
            />
          );
        })}

        <polygon
          points={polygonPointsStr}
          fill="rgba(34, 197, 94, 0.15)"
          stroke="#22c55e"
          strokeWidth="2"
          className="transition-all duration-700 ease-out"
        />

        {activePoints.map((pt, i) => (
          <g key={i} className="transition-all duration-700 ease-out">
            <circle
              cx={pt.x}
              cy={pt.y}
              r="4.5"
              fill="#22c55e"
            />
            <circle
              cx={pt.x}
              cy={pt.y}
              r="8"
              fill="none"
              stroke="#22c55e"
              strokeWidth="1.5"
              opacity="0.5"
              className="animate-pulse"
            />
          </g>
        ))}

        {labels.map((lbl, i) => (
          <text
            key={i}
            x={lbl.x}
            y={lbl.y}
            textAnchor={lbl.anchor}
            fill="#94a3b8"
            fontSize="9"
            fontFamily="monospace"
            className="font-bold select-none"
          >
            {lbl.text}
          </text>
        ))}
      </svg>
    );
  };

  // SVG representation for the interactive scoring speedometer
  const renderScoreDial = (score: number, tier: string) => {
    const displayScore = report ? animatedScore : score;
    const strokeDashoffset = 440 - (440 * displayScore) / 1000;
    let strokeColor = "stroke-slate-500";
    let glowColor = "shadow-slate-500/20";
    if (displayScore >= 900) {
      strokeColor = "stroke-emerald-400";
      glowColor = "shadow-emerald-500/30";
    } else if (displayScore >= 800) {
      strokeColor = "stroke-teal-400";
      glowColor = "shadow-teal-500/30";
    } else if (displayScore >= 650) {
      strokeColor = "stroke-yellow-400";
      glowColor = "shadow-yellow-500/30";
    } else if (displayScore >= 450) {
      strokeColor = "stroke-slate-400";
      glowColor = "shadow-slate-500/30";
    } else if (displayScore >= 300) {
      strokeColor = "stroke-amber-400";
      glowColor = "shadow-amber-500/30";
    } else {
      strokeColor = "stroke-rose-500";
      glowColor = "shadow-rose-500/30";
    }

    return (
      <div className="relative flex flex-col items-center justify-center p-6 rounded-2xl cyber-panel border-yellow-500/10 h-full">
        {/* Background glow circle */}
        <div className={`absolute inset-0 rounded-2xl bg-radial from-yellow-950/5 to-transparent pointer-events-none`}></div>

        <h3 className="text-xs tracking-widest font-mono text-slate-400 uppercase mb-4 flex items-center gap-2">
          <Dna className="w-3.5 h-3.5 text-yellow-400" />
          On-Chain Karma Rating
        </h3>

        <div className="relative flex items-center justify-center w-52 h-52">
          {/* SVG Score Gauge */}
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 208 208">
            <circle
              cx="104"
              cy="104"
              r="70"
              className="stroke-slate-800"
              strokeWidth="8"
              fill="transparent"
            />
            <circle
              cx="104"
              cy="104"
              r="70"
              className={`${strokeColor} transition-all duration-1000 ease-out`}
              strokeWidth="10"
              strokeDasharray="440"
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
            />

            {/* No needle as requested */}
          </svg>

          {/* Absolute Score Output */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className={`text-4xl font-extrabold font-display tracking-tight ${getScoreColorClass(displayScore)}`}>
              {displayScore}
            </span>
            <span className="text-slate-500 text-xs font-mono tracking-widest uppercase mt-0.5">
              of 1000
            </span>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold tracking-wider mt-2 border uppercase ${getTierColor(tier)}`}>
              {tier}
            </span>
          </div>
        </div>

        {/* Confidence rating */}
        <div className="w-full mt-4 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
          <span className="text-slate-400 flex items-center gap-1.5 font-mono">
            <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
            Analysis Confidence
          </span>
          <span className="font-mono text-emerald-400 font-semibold">{report?.confidenceLevel || 98}%</span>
        </div>
      </div>
    );
  };

  const shouldCollapse = isNavMinimized || (autoMinimizeOnScroll && isScrolled && scrollDirection === "down");

  return (
    <div className="min-h-screen bg-[#030407] text-slate-100 font-sans selection:bg-yellow-400 selection:text-black overflow-x-hidden w-full max-w-full relative cyber-grid-overlay">
      {/* 2026 Cosmic Aurora Glow Orbs for High-End Depth */}
      <div className="absolute top-0 left-0 w-full h-[800px] pointer-events-none z-0 aurora-glow-left" />
      <div className="absolute top-[400px] right-0 w-full h-[900px] pointer-events-none z-0 aurora-glow-right" />

      {/* Floating Modern Header / Navigation Bar */}
      <div className="sticky top-4 z-50 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
        {/* Subtle, uncrowded Top-Left Test Phase Banner */}
        <div className="flex justify-start mb-2 pl-1">
          <a
            href="mailto:matt24kgold@gmail.com?subject=Karma%20Score%20AI%20Feedback"
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/5 hover:bg-yellow-500/10 border border-yellow-500/25 hover:border-yellow-500/40 text-yellow-400 text-[10px] font-mono shadow-[0_4px_12px_rgba(245,158,11,0.05)] backdrop-blur-md transition-all group cursor-pointer"
            title="Click to send us your feedback"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
            <span className="font-bold uppercase tracking-wider text-[9px]">Test Phase</span>
            <span className="w-1 h-1 rounded-full bg-slate-700" />
            <span className="text-slate-400 group-hover:text-slate-300">Welcome to test & give us feedback!</span>
          </a>
        </div>
        <AnimatePresence mode="wait">
          {!shouldCollapse ? (
            <motion.header
              key="full-header"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="rounded-2xl border border-white/10 bg-[#07080c]/85 backdrop-blur-xl text-slate-200 shadow-[0_12px_40px_rgba(0,0,0,0.85),_inset_0_1px_1px_rgba(255,255,255,0.1)] transition-all"
            >
              <div className="px-4 sm:px-6 py-3 flex flex-col lg:flex-row items-center justify-between gap-4">
                {/* Logo and Name */}
                <div 
                  onClick={() => {
                    setReport(null);
                    setAddressInput("");
                    setActiveMainTab("dashboard");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="flex items-center gap-3 cursor-pointer select-none hover:opacity-90 active:scale-[0.98] transition-all"
                  title="Return to Home"
                >
                  <KarmaLogo className="w-9 h-9" />
                  <div>
                    <span className="text-xs sm:text-sm font-black tracking-[0.16em] font-display text-white uppercase block">
                      Karma Score AI
                    </span>
                    <span className="text-[8px] font-mono tracking-widest text-amber-500 bg-amber-500/10 border border-amber-500/20 px-1.5 py-0.5 rounded uppercase block">
                      Universal Web3 Reputation
                    </span>
                  </div>
                </div>

                {/* HIGH-FIDELITY CENTER NAV LINKS (TABBED NAVIGATION) */}
                <nav className="flex items-center p-1.5 bg-white/[0.02] border border-white/5 rounded-2xl self-center">
                  <button
                    onClick={() => setActiveMainTab("dashboard")}
                    className={`px-5 py-2.5 text-xs sm:text-sm font-mono font-bold tracking-wider uppercase rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                      activeMainTab === "dashboard"
                        ? "bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-amber-500/40 text-amber-300 font-black shadow-inner"
                        : "text-slate-400 hover:text-slate-200 border border-transparent"
                    }`}
                  >
                    Check Wallet
                  </button>
                  
                  <button
                    onClick={() => setActiveMainTab("staking")}
                    className={`px-5 py-2.5 text-xs sm:text-sm font-mono font-bold tracking-wider uppercase rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                      activeMainTab === "staking"
                        ? "bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-amber-500/40 text-amber-300 font-black shadow-inner"
                        : "text-slate-400 hover:text-slate-200 border border-transparent"
                    }`}
                  >
                    <Coins className="w-4 h-4" />
                    Rewards
                  </button>

                  <button
                    onClick={() => setActiveMainTab("premium")}
                    className={`px-5 py-2.5 text-xs sm:text-sm font-mono font-bold tracking-wider uppercase rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                      activeMainTab === "premium"
                        ? "bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-amber-500/40 text-amber-300 font-black shadow-inner"
                        : "text-slate-400 hover:text-slate-200 border border-transparent"
                    }`}
                  >
                    <ShieldAlert className="w-4 h-4" />
                    Perks
                  </button>

                  <button
                    onClick={() => setActiveMainTab("nfc-card")}
                    className={`px-5 py-2.5 text-xs sm:text-sm font-mono font-bold tracking-wider uppercase rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                      activeMainTab === "nfc-card"
                        ? "bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-amber-500/40 text-amber-300 font-black shadow-inner"
                        : "text-slate-400 hover:text-slate-200 border border-transparent"
                    }`}
                  >
                    <CreditCard className="w-4 h-4 text-amber-400 animate-pulse" />
                    NFC Card
                  </button>
                </nav>

                {/* Action Buttons Row */}
                <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 shrink-0 w-full lg:w-auto">
                  {/* Nav Behavior Controller */}
                  <div className="flex items-center gap-1 border border-white/5 bg-white/[0.02] p-1 rounded-xl h-8 mr-1">
                    {/* Manual Minimize Toggle */}
                    <button
                      onClick={() => setIsNavMinimized(true)}
                      className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all cursor-pointer flex items-center justify-center w-6 h-6"
                      title="Minimize Nav Bar"
                    >
                      <Minimize2 className="w-3.5 h-3.5" />
                    </button>
                    
                    {/* Auto Scroll Toggle */}
                    <button
                      onClick={() => setAutoMinimizeOnScroll(!autoMinimizeOnScroll)}
                      className={`p-1 rounded-lg transition-all flex items-center justify-center w-12 h-6 gap-0.5 cursor-pointer ${
                        autoMinimizeOnScroll 
                          ? "text-amber-400 bg-amber-500/10 border border-amber-500/20" 
                          : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
                      }`}
                      title={autoMinimizeOnScroll ? "Auto-Collapse on Scroll Enabled" : "Auto-Collapse on Scroll Disabled"}
                    >
                      {autoMinimizeOnScroll ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                      <span className="text-[7.5px] font-mono font-bold tracking-tight uppercase">
                        {autoMinimizeOnScroll ? "Auto" : "Lock"}
                      </span>
                    </button>
                  </div>

                  {userTwitterConnected && userTwitterHandle ? (
                    <div className="h-8 flex items-center gap-1.5 bg-[#1d9bf0]/10 border border-[#1d9bf0]/20 rounded-xl px-2.5 py-1 text-xs font-mono text-[#1d9bf0] shadow-sm">
                      <Twitter className="w-3.5 h-3.5 text-[#1d9bf0]" />
                      <span className="text-[10px] sm:text-xs font-bold">@{userTwitterHandle.replace(/^@/, "")}</span>
                      <button
                        onClick={handleDisconnectX}
                        className="ml-1 text-[#1d9bf0]/60 hover:text-rose-400 font-extrabold text-[11px] cursor-pointer transition-colors px-1"
                        title="Log out of Twitter/X"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        if (!report) {
                          handleDecode(POPULAR_EXAMPLES[0].address);
                        }
                        setShowLinkXModal(true);
                      }}
                      className="px-2.5 py-1 text-[10px] font-mono tracking-wider font-extrabold border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-slate-300 rounded-xl transition-all flex items-center gap-1 h-8 shadow-sm shrink-0 cursor-pointer"
                    >
                      <Twitter className="w-3.5 h-3.5 text-slate-400" />
                      <span>Link X</span>
                    </button>
                  )}

                  {userWalletAddress ? (
                    <div className="h-8 flex items-center gap-1.5 bg-yellow-500/5 border border-yellow-500/20 rounded-xl px-2.5 py-1 text-xs font-mono font-bold text-yellow-500 shadow">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      <span className="text-[10px]">{userWalletAddress.slice(0, 6)}...{userWalletAddress.slice(-4)}</span>
                      <span className="text-[8px] bg-yellow-500/15 border border-yellow-500/30 text-yellow-400 px-1 rounded ml-0.5 font-bold uppercase">{userWalletChain}</span>
                      <button
                        onClick={handlePlatformLogout}
                        className="ml-1 px-2 py-0.5 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 hover:border-rose-500/40 text-rose-400 text-[9px] font-mono rounded font-bold uppercase cursor-pointer transition-all"
                        title="Log out of Platform"
                      >
                        Log Out
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setIsBondingFlowAfterConnect(false);
                        setShowConnectWalletModal(true);
                      }}
                      className="px-3 py-1.5 text-[10px] font-mono tracking-wider font-extrabold bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-black rounded-xl transition-all flex items-center gap-1 h-8 shadow-md shrink-0 cursor-pointer active:scale-95 animate-pulse"
                    >
                      <svg className="w-3.5 h-3.5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      Connect
                    </button>
                  )}
                </div>
              </div>
            </motion.header>
          ) : (
            <motion.div
              key="compact-header"
              initial={{ y: -10, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -10, opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="mx-auto flex items-center gap-2 px-3 py-1.5 bg-[#07080c]/90 backdrop-blur-xl border border-white/10 rounded-full shadow-[0_12px_30px_rgba(0,0,0,0.85),_inset_0_1px_1px_rgba(255,255,255,0.1),_0_0_15px_rgba(255,213,74,0.1)] max-w-fit"
            >
              {/* Miniature Logo */}
              <div 
                onClick={() => {
                  setReport(null);
                  setAddressInput("");
                  setActiveMainTab("dashboard");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="w-7 h-7 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0 cursor-pointer hover:opacity-85 active:scale-95 transition-all"
                title="Return to Home"
              >
                <KarmaLogo className="w-3.5 h-3.5" />
              </div>

              {/* Active Tab Indicator Badge */}
              <div className="text-[9px] font-mono font-black text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0">
                {activeMainTab === "dashboard" && "Check Wallet"}
                {activeMainTab === "staking" && "Rewards"}
                {activeMainTab === "premium" && "Perks"}
                {activeMainTab === "nfc-card" && "NFC Card"}
              </div>

              {/* Miniature navigation links inside compact pill */}
              <div className="flex items-center gap-0.5 border-l border-white/10 pl-1.5">
                <button
                  onClick={() => {
                    setActiveMainTab("staking");
                    if (window.innerWidth >= 768) {
                      setIsNavMinimized(false);
                    }
                  }}
                  className={`p-1.5 rounded-lg transition-all cursor-pointer flex items-center justify-center ${
                    activeMainTab === "staking"
                      ? "text-amber-400 bg-amber-500/10"
                      : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                  }`}
                  title="Rewards"
                >
                  <Coins className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => {
                    setActiveMainTab("premium");
                    if (window.innerWidth >= 768) {
                      setIsNavMinimized(false);
                    }
                  }}
                  className={`p-1.5 rounded-lg transition-all cursor-pointer flex items-center justify-center ${
                    activeMainTab === "premium"
                      ? "text-amber-400 bg-amber-500/10"
                      : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                  }`}
                  title="Perks"
                >
                  <ShieldAlert className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => {
                    setActiveMainTab("nfc-card");
                    if (window.innerWidth >= 768) {
                      setIsNavMinimized(false);
                    }
                  }}
                  className={`p-1.5 rounded-lg transition-all cursor-pointer flex items-center justify-center ${
                    activeMainTab === "nfc-card"
                      ? "text-amber-400 bg-amber-500/10"
                      : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                  }`}
                  title="NFC Card"
                >
                  <CreditCard className="w-3.5 h-3.5 animate-pulse" />
                </button>
              </div>

              {/* Quick controls section inside compact mode */}
              <div className="flex items-center gap-0.5 border-l border-white/10 pl-1.5">
                {/* Auto Scroll Toggle */}
                <button
                  onClick={() => setAutoMinimizeOnScroll(!autoMinimizeOnScroll)}
                  className={`p-1.5 rounded-lg transition-all flex items-center justify-center cursor-pointer ${
                    autoMinimizeOnScroll ? "text-amber-400" : "text-slate-500 hover:text-slate-300"
                  }`}
                  title={autoMinimizeOnScroll ? "Auto-Collapse Enabled" : "Auto-Collapse Disabled"}
                >
                  {autoMinimizeOnScroll ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                </button>

                {/* Explicit Expand button */}
                <button
                  onClick={() => {
                    setIsNavMinimized(false);
                  }}
                  className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 transition-all flex items-center justify-center cursor-pointer"
                  title="Expand Full Menu"
                >
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 relative">

        {activeMainTab === "dashboard" && (
          <motion.div
            key="dashboard-tab"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="space-y-10"
          >
            {/* HERO DECODER SECTION - FIRST TOUCH & OPENING */}
        <section className="text-center max-w-4xl mx-auto space-y-12 pt-12 sm:pt-20 pb-16 relative overflow-visible">
          {/* Spotlight background glow centered on the input */}
          <div className="absolute inset-0 max-w-2xl mx-auto h-0 pointer-events-none z-0">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[300px] bg-yellow-500/[0.04] rounded-full blur-[100px] animate-pulse pointer-events-none" />
          </div>

          <div className="space-y-4 relative z-10">
            {/* CELESTIAL BACKGROUND ACCENTS (SHADOW & LIGHT) */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[450px] pointer-events-none z-0">
              {/* Subtle gothic cross-light beam */}
              <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[1px] h-[350px] bg-gradient-to-b from-transparent via-blue-500/10 to-transparent" />
              <div className="absolute top-44 left-1/2 -translate-x-1/2 w-[350px] h-[1px] bg-gradient-to-r from-transparent via-blue-500/5 to-transparent" />
              {/* Deep atmospheric outer halo aura */}
              <div className="absolute top-12 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-blue-900/[0.08] blur-[80px]" />
              <div className="absolute top-24 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-amber-500/[0.03] blur-[60px]" />
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-zinc-800 bg-[#06060a] text-amber-400 text-xs sm:text-sm font-mono uppercase tracking-[0.2em] font-extrabold shadow-[0_0_20px_rgba(0,0,0,0.8),_0_0_10px_rgba(245,158,11,0.05)]"
            >
              <span className="flex h-2 w-2 relative shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              SOLANA & EVM IDENTITY CHECKER
            </motion.div>
            
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black font-display tracking-tight uppercase mt-6 mb-3 select-none leading-none">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-400 drop-shadow-[0_2px_10px_rgba(255,255,255,0.1)]">
                KARMA SCORE
              </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500 drop-shadow-[0_2px_15px_rgba(245,158,11,0.2)] ml-2 sm:ml-3 font-black">
                AI
              </span>
            </h1>
            <div className="text-base sm:text-xl text-slate-200 font-normal leading-relaxed max-w-3xl mx-auto space-y-4">
              <p className="font-black text-white text-xl sm:text-3xl md:text-4xl tracking-tight uppercase bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-400">
                Know every wallet before every interaction.
              </p>
              <p className="text-slate-400 text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed font-normal tracking-wide antialiased opacity-90">
                Paste any Solana or EVM wallet to instantly reveal a living trust profile powered by onchain activity, reputation signals, and community intelligence.
              </p>
            </div>
          </div>

          <div className="max-w-3xl mx-auto relative z-10">
            <div 
              className="relative p-2.5 bg-[#06060a]/95 backdrop-blur-xl border-2 border-yellow-500/30 hover:border-yellow-500/50 rounded-2xl focus-within:border-amber-500/70 focus-within:ring-4 focus-within:ring-amber-500/[0.1] transition-all duration-300 shadow-[0_0_60px_rgba(245,158,11,0.08),0_30px_100px_rgba(0,0,0,0.95)] flex flex-col sm:flex-row items-stretch gap-3 neon-shimmer cursor-text"
              onClick={(e) => {
                if (!(e.target as HTMLElement).closest('button') && !(e.target as HTMLElement).closest('input')) {
                  const input = document.getElementById("wallet-search-input");
                  if (input) {
                    input.focus();
                  }
                }
              }}
            >
              <div 
                className="relative flex-1 flex items-center pl-4 cursor-text"
                onClick={(e) => {
                  if (!(e.target as HTMLElement).closest('button') && !(e.target as HTMLElement).closest('input')) {
                    const input = document.getElementById("wallet-search-input");
                    if (input) {
                      input.focus();
                    }
                  }
                }}
              >
                <Search className="w-6 h-6 text-slate-400 absolute left-4" />
                <input
                  id="wallet-search-input"
                  type="text"
                  value={addressInput}
                  onChange={(e) => setAddressInput(e.target.value)}
                  placeholder="Paste any Solana or EVM address..."
                  className="w-full bg-transparent pl-11 pr-24 py-5 text-lg sm:text-xl md:text-2xl text-white placeholder-slate-500 focus:outline-none font-mono"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleDecode(addressInput);
                  }}
                />
                <div className="absolute right-3 flex items-center gap-1.5 pointer-events-none">
                  {addressInput && (
                    <button
                      type="button"
                      onClick={() => setAddressInput("")}
                      className="p-1.5 hover:text-white text-slate-500 transition-colors text-sm font-mono pointer-events-auto"
                      title="Clear"
                    >
                      ✕
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={async () => {
                      try {
                        const text = await navigator.clipboard.readText();
                        if (text) {
                          setAddressInput(text.trim());
                        }
                      } catch (err) {
                        console.warn("Clipboard access denied or blocked by iframe environment:", err);
                        // Friendly fallback tip if iframe clipboard API is blocked
                        setError("To paste in some browser frames, please click inside the box and press Ctrl+V (or Cmd+V).");
                        setTimeout(() => setError(null), 6000);
                      }
                    }}
                    className="p-2 bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-yellow-400 rounded-xl border border-slate-800 text-xs font-mono transition-all flex items-center gap-1.5 shrink-0 active:scale-95 pointer-events-auto"
                    title="Paste from Clipboard"
                  >
                    <Clipboard className="w-4 h-4" />
                    <span className="hidden xs:inline font-bold">Paste</span>
                  </button>
                </div>
              </div>
              <button
                id="decode-submit-btn"
                onClick={() => handleDecode(addressInput)}
                disabled={loading}
                className="px-10 py-5 bg-gradient-to-r from-[#20c3ff] to-[#015aff] hover:from-[#35cbff] hover:to-[#1a6bff] text-white shadow-[0_0_35px_rgba(32,195,255,0.65)] hover:shadow-[0_0_50px_rgba(32,195,255,0.85)] disabled:opacity-50 font-mono text-lg sm:text-xl tracking-wider font-black rounded-2xl transition-all flex items-center justify-center gap-3 shrink-0 active:scale-[0.98] cursor-pointer hover:scale-[1.01]"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin text-white" />
                    Checking...
                  </>
                ) : (
                  <>
                    <Cpu className="w-6 h-6" />
                    Check Wallet
                  </>
                )}
              </button>
            </div>
          </div>

          {!userWalletAddress && (
            <motion.div 
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm font-mono flex items-center justify-center mt-8 relative z-10"
            >
              <button
                onClick={() => {
                  setIsBondingFlowAfterConnect(false);
                  setShowConnectWalletModal(true);
                }}
                className="px-6 py-3 rounded-2xl bg-yellow-500/[0.05] hover:bg-yellow-500/[0.1] border-2 border-yellow-500/20 hover:border-yellow-500/40 text-yellow-400 hover:text-yellow-300 font-extrabold tracking-tight transition-all cursor-pointer flex items-center gap-2.5 shadow-[0_0_30px_rgba(234,179,8,0.05)] active:scale-[0.98]"
              >
                <span>Bond your X. Bind your wallet. Become verified.</span>
                <span className="text-amber-500 animate-pulse text-base">⚡</span>
              </button>
            </motion.div>
          )}

          {/* Quick Sandbox Selector / Examples */}
          <div className="pt-12 max-w-4xl mx-auto relative z-10">
            <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-b from-[#0a0a0f]/95 to-black/95 border-2 border-amber-500/30 shadow-[0_0_60px_rgba(245,158,11,0.07)] backdrop-blur-xl relative overflow-hidden">
              {/* Decorative premium gold radial gradients inside sandbox */}
              <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/[0.04] rounded-full blur-3xl pointer-events-none animate-pulse" />
              <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/[0.03] rounded-full blur-3xl pointer-events-none" />
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-5 border-b border-white/10 relative z-10">
                <div className="space-y-1">
                  <span className="block text-[10px] font-mono text-amber-400 font-extrabold tracking-[0.3em] uppercase">
                    Institutional Index & Forensic Registry
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black tracking-tight font-display text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-amber-300 flex items-center gap-2.5">
                    <Users className="w-6 h-6 text-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.4)]" />
                    REPUTATION DIRECTORY SANDBOX
                  </h3>
                </div>
                <button
                  onClick={() => {
                    setVerifiedSearchQuery("");
                    setShowVerifiedCrowdsModal(true);
                  }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-amber-500/30 hover:border-amber-400 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 font-mono text-xs uppercase font-black tracking-wider transition-all active:scale-95 cursor-pointer shadow-lg shadow-amber-500/5 group"
                  title="Search Bonded Users"
                >
                  <Search className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                  <span>Search Full Directory</span>
                </button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-10">
                {/* Trusted Bond Wallets Group */}
                <div className="space-y-3.5 p-4 rounded-2xl bg-[#09090e]/40 border border-emerald-500/15 hover:border-emerald-500/30 transition-all shadow-xl shadow-black/25 flex flex-col h-[340px]">
                  <div className="flex items-center justify-between pb-2 border-b border-white/5 shrink-0">
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                      </span>
                      <span className="text-xs font-mono font-black text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                        Trusted Bond Wallets
                      </span>
                    </div>
                    <span className="text-[9px] font-mono text-emerald-400 font-bold px-1.5 py-0.5 rounded-full bg-emerald-950/20 border border-emerald-500/10">Score 589+</span>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto pr-1 space-y-1.5 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
                    {VERIFIED_CROWDS.filter(ex => ex.score >= 589).map((ex) => (
                      <button
                        id={`example-btn-${ex.score}`}
                        key={ex.address}
                        onClick={() => handleDecode(ex.address)}
                        className={`w-full p-2.5 rounded-xl border text-left transition-all duration-200 cursor-pointer relative overflow-hidden flex items-center justify-between gap-2.5 group/btn ${
                          report?.address === ex.address
                            ? "bg-emerald-950/20 border-emerald-500/50 shadow-md shadow-emerald-500/5"
                            : "bg-[#06060a]/70 border-zinc-900 hover:border-emerald-500/30 hover:bg-slate-900/10"
                        }`}
                      >
                        {report?.address === ex.address && (
                          <div className="absolute top-0 bottom-0 left-0 w-[2px] bg-emerald-400" />
                        )}
                        <div className="flex items-center gap-2 min-w-0 flex-1">
                          {/* Chain */}
                          <span className="text-[8px] font-mono tracking-wider text-amber-500/80 font-black uppercase bg-amber-500/[0.03] border border-amber-500/10 px-1.5 py-0.5 rounded shrink-0">
                            {ex.chain}
                          </span>
                          
                          {/* Name & Address */}
                          <div className="min-w-0 flex-1">
                            <div className="text-xs font-black text-white truncate flex items-center gap-1">
                              {ex.name}
                              {report?.address === ex.address && (
                                <ShieldCheck className="w-3 h-3 text-emerald-400 shrink-0 animate-pulse" />
                              )}
                            </div>
                            <div className="text-[9px] font-mono text-slate-500 truncate">
                              {ex.address.slice(0, 10)}...{ex.address.slice(-6)}
                            </div>
                          </div>
                        </div>

                        {/* Score & Select */}
                        <div className="flex items-center gap-2 shrink-0">
                          <span className={`text-[10px] font-mono font-black px-1.5 py-0.5 rounded-md ${getTierColor(ex.tier)} shadow-sm`}>
                            {ex.score}
                          </span>
                          <span className="text-[10px] text-slate-500 group-hover/btn:text-emerald-400 transition-colors font-black">→</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Bad Wallets Group */}
                <div className="space-y-3.5 p-4 rounded-2xl bg-[#09090e]/40 border border-rose-500/15 hover:border-rose-500/30 transition-all shadow-xl shadow-black/25 flex flex-col h-[340px]">
                  <div className="flex items-center justify-between pb-2 border-b border-white/5 shrink-0">
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-rose-500"></span>
                      </span>
                      <span className="text-xs font-mono font-black text-rose-400 uppercase tracking-wider flex items-center gap-1">
                        <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                        Bad Wallets / Risks
                      </span>
                    </div>
                    <span className="text-[9px] font-mono text-rose-400 font-bold px-1.5 py-0.5 rounded-full bg-rose-950/20 border border-rose-500/10">Score &lt; 589</span>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto pr-1 space-y-1.5 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
                    {VERIFIED_CROWDS.filter(ex => ex.score < 589).map((ex) => (
                      <button
                        id={`example-btn-${ex.score}`}
                        key={ex.address}
                        onClick={() => handleDecode(ex.address)}
                        className={`w-full p-2.5 rounded-xl border text-left transition-all duration-200 cursor-pointer relative overflow-hidden flex items-center justify-between gap-2.5 group/btn ${
                          report?.address === ex.address
                            ? "bg-rose-950/20 border-rose-500/50 shadow-md shadow-rose-500/5"
                            : "bg-[#06060a]/70 border-zinc-900 hover:border-rose-500/30 hover:bg-slate-900/10"
                        }`}
                      >
                        {report?.address === ex.address && (
                          <div className="absolute top-0 bottom-0 left-0 w-[2px] bg-rose-500" />
                        )}
                        <div className="flex items-center gap-2 min-w-0 flex-1">
                          {/* Chain */}
                          <span className="text-[8px] font-mono tracking-wider text-amber-500/80 font-black uppercase bg-amber-500/[0.03] border border-amber-500/10 px-1.5 py-0.5 rounded shrink-0">
                            {ex.chain}
                          </span>
                          
                          {/* Name & Address */}
                          <div className="min-w-0 flex-1">
                            <div className="text-xs font-black text-white truncate flex items-center gap-1">
                              {ex.name}
                              {report?.address === ex.address && (
                                <ShieldAlert className="w-3 h-3 text-rose-400 shrink-0 animate-pulse" />
                              )}
                            </div>
                            <div className="text-[9px] font-mono text-slate-500 truncate">
                              {ex.address.slice(0, 10)}...{ex.address.slice(-6)}
                            </div>
                          </div>
                        </div>

                        {/* Score & Select */}
                        <div className="flex items-center gap-2 shrink-0">
                          <span className={`text-[10px] font-mono font-black px-1.5 py-0.5 rounded-md ${getTierColor(ex.tier)} shadow-sm`}>
                            {ex.score}
                          </span>
                          <span className="text-[10px] text-slate-500 group-hover/btn:text-rose-400 transition-colors font-black">→</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SLICK GOTHIC GLOWING TOKEN LAUNCH NOTE (SHADOW & LIGHT) */}
        <div className="max-w-4xl mx-auto px-4 py-2 relative z-10 mt-8">
          {/* Tagline above token launch card */}
          <div className="text-center mb-5">
            <p className="text-amber-400 font-mono text-xs sm:text-sm tracking-[0.25em] font-black uppercase">
              TRADE SMARTER. BUILD SAFER. TRUST WITH CONFIDENCE.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{
              opacity: 1,
              scale: 1,
              boxShadow: [
                "0 0 20px rgba(0,0,0,0.9), 0 0 0px rgba(245,158,11,0)",
                "0 0 35px rgba(0,0,0,0.95), 0 0 15px rgba(245,158,11,0.06)",
                "0 0 20px rgba(0,0,0,0.9), 0 0 0px rgba(245,158,11,0)"
              ],
              borderColor: [
                "rgba(63,63,70,0.2)",  // zinc-700
                "rgba(245,158,11,0.25)", // amber-500
                "rgba(63,63,70,0.2)"
              ]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative overflow-hidden rounded-2xl border bg-gradient-to-b from-[#060609] via-[#030305] to-[#010102] p-6 text-center select-none"
          >
            {/* Ambient Shadow & Light Backdrops */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
              {/* Slow-breathing central light beacon */}
              <motion.div
                animate={{
                  opacity: [0.15, 0.35, 0.15],
                  scale: [0.8, 1.1, 0.8]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-40 bg-radial from-amber-500/10 via-amber-500/[0.01] to-transparent blur-3xl"
              />
              {/* Vertical light split (light & shadow theme) */}
              <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[1px] bg-gradient-to-b from-transparent via-amber-500/15 to-transparent" />
            </div>

            {/* Content Container */}
            <div className="relative z-10 space-y-3 py-4">
              <div className="py-2.5">
                <motion.h3
                  animate={{
                    textShadow: [
                      "0 0 10px rgba(0,0,0,0.9), 0 0 2px rgba(245,158,11,0.1)",
                      "0 0 20px rgba(0,0,0,0.5), 0 0 8px rgba(245,158,11,0.45)",
                      "0 0 10px rgba(0,0,0,0.9), 0 0 2px rgba(245,158,11,0.1)"
                    ],
                    color: [
                      "#94a3b8", // slate-400
                      "#ffffff", // white
                      "#94a3b8"
                    ]
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="text-base sm:text-xl font-bold font-display uppercase tracking-[0.16em] leading-snug drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                >
                  Token Launch Coming Soon
                </motion.h3>
                <div className="mt-1 flex items-center justify-center gap-1.5 flex-wrap">
                  <span className="text-slate-400 text-xs sm:text-sm tracking-widest font-mono uppercase">on</span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 font-black tracking-[0.2em] text-xs sm:text-sm uppercase font-mono shadow-sm">
                    Solana Pump.fun
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 text-[9px] font-mono text-slate-500 tracking-widest uppercase">
                <span className="w-1 h-1 rounded-full bg-slate-800" />
                <span>DECENTRALIZED KARMA REPUTATION ENGINE</span>
                <span className="w-1 h-1 rounded-full bg-slate-800" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* PREMIUM STORYTELLING & BRANDING MANIFESTO */}
        {!report && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="max-w-4xl mx-auto pt-16 pb-24 space-y-16"
          >
            {/* Dynamic Tagline Divider */}
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-slate-900/60"></div>
              </div>
              <div className="relative bg-black px-6">
                <span className="text-[10px] sm:text-xs font-mono text-yellow-500/80 uppercase tracking-[0.25em] font-black">
                  “If you own it, prove it. Instantly.”
                </span>
              </div>
            </div>

            {/* Elegant 3-Step Narrative Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* 1. The Problem Card */}
              <div className="relative group overflow-hidden rounded-2xl border border-red-500/10 bg-[#06060a]/40 p-6 sm:p-8 hover:border-red-500/20 transition-all duration-300">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/[0.015] rounded-full blur-2xl pointer-events-none" />
                <div className="flex items-center gap-2 mb-4">
                  <ShieldAlert className="w-4 h-4 text-red-500/80" />
                  <span className="text-[9px] font-mono uppercase tracking-widest text-red-400 font-bold">The Problem</span>
                </div>
                <h4 className="text-sm font-semibold text-slate-200 tracking-tight mb-4">
                  Identity is Broken
                </h4>
                <ul className="space-y-3.5 text-xs text-slate-400 font-sans leading-relaxed">
                  <li className="flex items-start gap-2.5">
                    <span className="text-red-500 font-mono mt-0.5">✕</span>
                    <span>“In crypto, anyone can pretend to be anyone.”</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-red-500 font-mono mt-0.5">✕</span>
                    <span>“Screenshots don’t prove ownership.”</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-red-500 font-mono mt-0.5">✕</span>
                    <span>“Scams happen because identity is broken.”</span>
                  </li>
                </ul>
              </div>

              {/* 2. The Transformation Card */}
              <div className="relative group overflow-hidden rounded-2xl border border-yellow-500/15 bg-[#08080f]/60 p-6 sm:p-8 hover:border-yellow-500/30 transition-all duration-300 shadow-xl shadow-yellow-500/[0.01]">
                <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/[0.03] rounded-full blur-2xl pointer-events-none" />
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-4 h-4 text-yellow-500" />
                  <span className="text-[9px] font-mono uppercase tracking-widest text-yellow-400 font-bold font-black">The Shift</span>
                </div>
                <h4 className="text-sm font-semibold text-yellow-400 tracking-tight mb-4 font-bold">
                  KarmaScore Solves It
                </h4>
                <ul className="space-y-3.5 text-xs text-slate-300 font-sans leading-relaxed">
                  <li className="flex items-start gap-2.5 font-semibold text-white">
                    <span className="text-yellow-400 font-mono mt-0.5">✦</span>
                    <span>“KarmaScore fixes identity.”</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-yellow-400/80 font-mono mt-0.5">✦</span>
                    <span>“We turn wallets into verified reputations.”</span>
                  </li>
                </ul>
              </div>

              {/* 3. The Outcome Card */}
              <div className="relative group overflow-hidden rounded-2xl border border-emerald-500/10 bg-[#06060a]/40 p-6 sm:p-8 hover:border-emerald-500/20 transition-all duration-300">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/[0.015] rounded-full blur-2xl pointer-events-none" />
                <div className="flex items-center gap-2 mb-4">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span className="text-[9px] font-mono uppercase tracking-widest text-emerald-400 font-bold">The Outcome</span>
                </div>
                <h4 className="text-sm font-semibold text-slate-200 tracking-tight mb-4">
                  Instant Trust
                </h4>
                <ul className="space-y-3.5 text-xs text-slate-400 font-sans leading-relaxed">
                  <li className="flex items-start gap-2.5 text-emerald-300/95 font-medium leading-relaxed">
                    <span className="text-emerald-400 font-mono mt-0.5">✓</span>
                    <span>“So when you show up, people already know you’re real.”</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* INTERACTIVE DEMO: ZERO-KNOWLEDGE PRIVATE IDENTITY SHOWCASE (Moved to GlassyNftView connected portfolio) */}
            <div className="hidden">
              {/* Background glow lines */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-yellow-500/[0.02] rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/[0.02] rounded-full blur-3xl pointer-events-none" />
              
              <div className="max-w-3xl mx-auto space-y-6">
                <div className="text-center space-y-1.5">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-yellow-500/10 bg-yellow-950/10 text-yellow-500 text-[10px] font-mono uppercase tracking-widest font-black">
                    <Lock className="w-3 h-3" /> PRIVATE IDENTITY SHOWCASE
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    Link Your Grails. Hide Your Wallet.
                  </h3>
                  <p className="text-xs text-slate-400 max-w-xl mx-auto leading-relaxed">
                    Prove you own elite assets and link them directly to your official X profile 
                    without ever exposing your wallet address, total holdings, or becoming a target.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch pt-4">
                  {/* Left Column: Input Panel */}
                  <div className="lg:col-span-5 bg-black/40 border border-slate-900 rounded-2xl p-5 flex flex-col justify-between space-y-4">
                    <div className="space-y-4">
                      {/* Step 1: Select NFT Collection */}
                      <div className="space-y-2">
                        <label className="block text-[9px] font-mono text-slate-500 uppercase tracking-widest">
                          1. Select Your NFT Collection
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {[
                            { name: "Mad Lads", image: madLadsNftImg },
                            { name: "Pudgy Penguins", image: pudgyPenguinsNftImg },
                            { name: "DeGods", image: degodsNftImg },
                            { name: "Bored Apes", image: boredApesNftImg }
                          ].map((nft) => (
                            <button
                              key={nft.name}
                              disabled={demoProvingState === "proving"}
                              onClick={() => {
                                setDemoNftCollection(nft.name);
                                if (demoProvingState === "done") {
                                  setDemoProvingState("idle");
                                }
                              }}
                              className={`p-2 rounded-xl text-left border text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                                demoNftCollection === nft.name
                                  ? "bg-yellow-500/10 border-yellow-500/30 text-yellow-400 font-bold"
                                  : "bg-slate-950/45 border-slate-900 text-slate-400 hover:border-slate-800 hover:text-slate-300"
                              }`}
                            >
                              <div className="w-5 h-5 rounded overflow-hidden flex-shrink-0 border border-white/10">
                                <img src={nft.image} alt={nft.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                              </div>
                              <span className="truncate">{nft.name}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Step 2: Set X Handle */}
                      <div className="space-y-2">
                        <label className="block text-[9px] font-mono text-slate-500 uppercase tracking-widest">
                          2. Your X (Twitter) Handle
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-2.5 text-slate-500 text-xs font-mono">@</span>
                          <input
                            type="text"
                            disabled={demoProvingState === "proving"}
                            value={demoTwitterHandle}
                            onChange={(e) => {
                              setDemoTwitterHandle(e.target.value.replace(/[^a-zA-Z0-9_]/g, ""));
                              if (demoProvingState === "done") {
                                setDemoProvingState("idle");
                              }
                            }}
                            placeholder="username"
                            className="w-full bg-slate-950/50 border border-slate-900 rounded-xl py-2 pl-7 pr-3 text-xs text-white font-mono focus:outline-none focus:border-yellow-500/30 transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Step 3: Trigger Button */}
                    <button
                      onClick={handleStartDemo}
                      disabled={demoProvingState === "proving"}
                      className={`w-full py-3 rounded-xl font-mono text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                        demoProvingState === "proving"
                          ? "bg-slate-900 text-slate-500 border border-slate-850 cursor-not-allowed"
                          : "bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-black shadow-lg shadow-yellow-500/10 cursor-pointer active:scale-[0.98]"
                      }`}
                    >
                      {demoProvingState === "idle" && "Assemble Private Proof ⚡"}
                      {demoProvingState === "proving" && `Proving cryptographic keys (${demoProgress}%)`}
                      {demoProvingState === "done" && "Generate New Proof ↺"}
                    </button>
                  </div>

                  {/* Right Column: Visualization Panel */}
                  <div className="lg:col-span-7 bg-[#050508]/60 border border-slate-900/50 rounded-2xl p-5 flex flex-col justify-center items-center min-h-[250px] relative overflow-hidden">
                    {/* Background Tech HUD Details */}
                    <div className="absolute top-2 left-2 text-[8px] font-mono text-slate-600 uppercase">
                      PROVING CORE v1.0.4
                    </div>
                    <div className="absolute bottom-2 right-2 text-[8px] font-mono text-slate-600 uppercase">
                      STATUS: {demoProvingState.toUpperCase()}
                    </div>

                    <AnimatePresence mode="wait">
                      {demoProvingState === "idle" && (
                        <motion.div
                          key="idle"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="w-full flex flex-col items-center justify-center space-y-6 py-4"
                        >
                          <div className="flex items-center justify-between w-full max-w-sm px-4">
                            {/* NFT Node */}
                            <div className="flex flex-col items-center space-y-1">
                              <div className="w-14 h-14 rounded-2xl overflow-hidden border border-yellow-500/20 flex items-center justify-center shadow-lg shadow-yellow-500/[0.02] bg-slate-950">
                                <img
                                  src={
                                    demoNftCollection === "Mad Lads" ? madLadsNftImg :
                                    demoNftCollection === "Pudgy Penguins" ? pudgyPenguinsNftImg :
                                    demoNftCollection === "DeGods" ? degodsNftImg :
                                    boredApesNftImg
                                  }
                                  alt={demoNftCollection}
                                  className="w-full h-full object-cover"
                                  referrerPolicy="no-referrer"
                                />
                              </div>
                              <span className="text-[10px] font-mono text-slate-300 font-bold">{demoNftCollection}</span>
                              <span className="text-[8px] font-mono text-slate-500">Asset</span>
                            </div>

                            {/* Secure Bridge Line */}
                            <div className="flex-1 flex flex-col items-center justify-center px-4 relative">
                              <div className="w-full border-t border-dashed border-slate-800" />
                              <div className="absolute -top-3 px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-[8px] font-mono text-slate-500 flex items-center gap-1">
                                <EyeOff className="w-2.5 h-2.5 text-yellow-500" /> Wallet Hidden
                              </div>
                            </div>

                            {/* X Node */}
                            <div className="flex flex-col items-center space-y-1">
                              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#1d9bf0]/20 to-blue-500/10 border border-blue-500/20 flex items-center justify-center shadow-lg">
                                <Twitter className="w-6 h-6 text-[#1d9bf0]" />
                              </div>
                              <span className="text-[10px] font-mono text-slate-300 font-bold">@{demoTwitterHandle || "username"}</span>
                              <span className="text-[8px] font-mono text-slate-500">X Identity</span>
                            </div>
                          </div>

                          <div className="text-center max-w-sm px-4">
                            <p className="text-[11px] text-slate-400 leading-normal">
                              Select your collection and click <strong className="text-yellow-400 font-bold">Assemble Private Proof</strong> to watch how we prove ownership completely off-chain.
                            </p>
                          </div>
                        </motion.div>
                      )}

                      {demoProvingState === "proving" && (
                        <motion.div
                          key="proving"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="w-full flex flex-col items-center justify-center space-y-6 py-4"
                        >
                          {/* Animated particles floating */}
                          <div className="relative w-full max-w-sm h-14 flex items-center justify-between px-4">
                            <div className="w-10 h-10 rounded-xl overflow-hidden border border-yellow-500/20 flex items-center justify-center animate-pulse bg-slate-950">
                              <img
                                src={
                                  demoNftCollection === "Mad Lads" ? madLadsNftImg :
                                  demoNftCollection === "Pudgy Penguins" ? pudgyPenguinsNftImg :
                                  demoNftCollection === "DeGods" ? degodsNftImg :
                                  boredApesNftImg
                                }
                                alt={demoNftCollection}
                                className="w-full h-full object-cover"
                                referrerPolicy="no-referrer"
                              />
                            </div>

                            {/* Proving core */}
                            <div className="relative flex items-center justify-center">
                              <div className="w-12 h-12 rounded-full border-2 border-yellow-500/20 border-t-yellow-500 animate-spin flex items-center justify-center">
                                <Lock className="w-4 h-4 text-yellow-400 animate-pulse" />
                              </div>
                            </div>

                            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                              <Twitter className="w-4 h-4 text-[#1d9bf0] animate-pulse" />
                            </div>
                          </div>

                          <div className="w-full max-w-xs space-y-2 text-center">
                            <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden border border-slate-900">
                              <div
                                className="bg-gradient-to-r from-yellow-500 to-amber-500 h-full transition-all duration-100"
                                style={{ width: `${demoProgress}%` }}
                              />
                            </div>
                            <span className="text-[9px] font-mono text-yellow-500 animate-pulse block">
                              Generating Zero-Knowledge Signature Proof... {demoProgress}%
                            </span>
                          </div>
                        </motion.div>
                      )}

                      {demoProvingState === "done" && (
                        <motion.div
                          key="done"
                          initial={{ opacity: 0, scale: 0.95, y: 5 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="w-full space-y-4"
                        >
                          {/* Complete cryptographic badge */}
                          <div className="p-4 rounded-xl border border-yellow-500/25 bg-gradient-to-b from-[#110e05] to-[#040406] text-left relative overflow-hidden shadow-2xl">
                            {/* Watermark security stamp */}
                            <div className="absolute right-2 bottom-2 text-yellow-500/[0.02] pointer-events-none font-mono text-5xl font-black uppercase tracking-widest select-none">
                              VERIFIED
                            </div>

                            <div className="flex items-center justify-between border-b border-yellow-500/10 pb-3 mb-3">
                              <div className="flex items-center gap-2">
                                <div className="p-1 rounded-md bg-yellow-500/10 border border-yellow-500/30">
                                  <ShieldCheck className="w-4 h-4 text-yellow-400" />
                                </div>
                                <div>
                                  <h4 className="text-[11px] font-mono text-yellow-400 font-bold uppercase tracking-widest">
                                    Karma Cryptographic Proof
                                  </h4>
                                  <p className="text-[8px] font-mono text-slate-500">
                                    ISSUED VIA ZERO-KNOWLEDGE CONTRACT
                                  </p>
                                </div>
                              </div>
                              <span className="text-[8px] font-mono text-emerald-400 px-2 py-0.5 rounded-full bg-emerald-500/[0.08] border border-emerald-500/20 uppercase font-black">
                                ACTIVE & AUTHENTIC
                              </span>
                            </div>

                            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                              <div>
                                <span className="block text-[8px] font-mono text-slate-500 uppercase">Verified X Profile</span>
                                <span className="font-mono text-slate-200 font-bold flex items-center gap-1">
                                  <Twitter className="w-3 h-3 text-[#1d9bf0]" />
                                  @{demoTwitterHandle || "username"}
                                </span>
                              </div>
                              
                              <div>
                                <span className="block text-[8px] font-mono text-slate-500 uppercase">Verified Asset</span>
                                <span className="font-mono text-yellow-400 font-bold">
                                  {demoNftCollection === "Mad Lads" && "Mad Lads #8912"}
                                  {demoNftCollection === "Pudgy Penguins" && "Pudgy Penguin #4023"}
                                  {demoNftCollection === "DeGods" && "DeGod #2910"}
                                  {demoNftCollection === "Bored Apes" && "Bored Ape #592"}
                                </span>
                              </div>

                              <div className="col-span-2 pt-1 border-t border-slate-900 mt-1">
                                <span className="block text-[8px] font-mono text-slate-500 uppercase">Verified Wallet Address</span>
                                <span className="font-mono text-emerald-400 text-[10px] font-bold flex items-center gap-1">
                                  <Lock className="w-3 h-3" />
                                  [ HIDDEN FOR PRIVACY - ZERO-KNOWLEDGE PROOF ACTIVE ]
                                </span>
                              </div>
                            </div>
                          </div>

                          <p className="text-[10px] sm:text-[11px] text-slate-400 font-sans leading-relaxed text-center max-w-lg mx-auto">
                            🔑 <strong className="text-slate-200">The Ultimate Flex:</strong> You prove 100% on-chain ownership of your {demoNftCollection} directly to @{demoTwitterHandle || "username"}, but your actual wallet address is kept offline and protected. No hackers can track your net worth or target your devices.
                          </p>

                          {/* Share to X integration segment */}
                          <div className="w-full pt-1">
                            {!demoIsSharingX && !demoSharedResult && (
                              <button
                                onClick={handleShareXProof}
                                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#1d9bf0] to-[#147dbd] hover:from-[#1a8cd8] hover:to-[#1169a1] text-white font-mono text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98] shadow-md shadow-[#1d9bf0]/15 border border-blue-400/20"
                              >
                                <Twitter className="w-4 h-4 text-white" />
                                Share Proof instantly to X & Mirror to Karma AI ⚡
                              </button>
                            )}

                            {demoIsSharingX && (
                              <div className="p-4 rounded-xl border border-blue-500/20 bg-blue-950/10 space-y-3.5 text-center">
                                <div className="flex items-center justify-center">
                                  <div className="relative w-12 h-12 flex items-center justify-center">
                                    <motion.div 
                                      animate={{ rotate: 360 }}
                                      transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                                      className="absolute inset-0 rounded-full border-2 border-dashed border-blue-500/30"
                                    />
                                    <Loader2 className="w-5 h-5 text-[#1d9bf0] animate-spin" />
                                  </div>
                                </div>
                                <div className="space-y-1">
                                  <span className="text-[9px] font-mono tracking-wider font-bold text-[#1d9bf0] uppercase block">
                                    X API INTEGRATION CONNECTED
                                  </span>
                                  <p className="text-xs text-[#1d9bf0] font-mono animate-pulse">
                                    {demoSharingStep}
                                  </p>
                                </div>
                              </div>
                            )}

                            {demoSharedResult && (
                              <div className="space-y-3">
                                <div className="p-4 rounded-xl border border-emerald-500/25 bg-[#040906]/60 text-left space-y-3 relative overflow-hidden">
                                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/[0.03] rounded-full blur-2xl pointer-events-none" />
                                  
                                  <div className="flex items-center gap-2">
                                    <div className="p-1 rounded-md bg-emerald-500/15 border border-emerald-500/30">
                                      <Check className="w-4 h-4 text-emerald-400" />
                                    </div>
                                    <div>
                                      <h4 className="text-[11px] font-mono text-emerald-400 font-bold uppercase tracking-wider">
                                        Proof Permanently Dispatched & Verified
                                      </h4>
                                      <p className="text-[8px] font-mono text-slate-500">
                                        PROOF ID: {demoSharedResult.id} • DUAL CHANNEL SUCCESS
                                      </p>
                                    </div>
                                  </div>

                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                                    {/* User Post Box */}
                                    <div className="p-3 rounded-lg bg-black/40 border border-slate-900 flex flex-col justify-between space-y-2">
                                      <div className="space-y-1.5">
                                        <div className="flex items-center justify-between">
                                          <span className="text-[9px] font-mono text-slate-400 font-bold flex items-center gap-1">
                                            <Twitter className="w-2.5 h-2.5 text-[#1d9bf0]" />
                                            @{demoTwitterHandle} Feed
                                          </span>
                                          <span className="text-[8px] font-mono text-emerald-400 font-black">● POSTED</span>
                                        </div>
                                        <p className="text-[9px] text-slate-300 font-sans italic leading-relaxed">
                                          "{demoSharedResult.userTweetText.slice(0, 110)}..."
                                        </p>
                                      </div>
                                      <a
                                        href={demoSharedResult.userPostUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full py-1.5 px-2 text-center rounded bg-[#1d9bf0]/10 hover:bg-[#1d9bf0]/20 text-[#1d9bf0] text-[9px] font-mono font-bold uppercase tracking-wider transition-all block flex items-center justify-center gap-1"
                                      >
                                        <ExternalLink className="w-2.5 h-2.5" /> View @{demoTwitterHandle} Feed
                                      </a>
                                    </div>

                                    {/* Karma AI Official Mirror Box */}
                                    <div className="p-3 rounded-lg bg-black/40 border border-slate-900 flex flex-col justify-between space-y-2">
                                      <div className="space-y-1.5">
                                        <div className="flex items-center justify-between">
                                          <span className="text-[9px] font-mono text-slate-400 font-bold flex items-center gap-1">
                                            <Twitter className="w-2.5 h-2.5 text-[#1d9bf0]" />
                                            @karmascoreai Archive
                                          </span>
                                          <span className="text-[8px] font-mono text-yellow-500 font-black">● MIRRORED</span>
                                        </div>
                                        <p className="text-[9px] text-slate-300 font-sans italic leading-relaxed">
                                          "{demoSharedResult.officialTweetText.slice(0, 110)}..."
                                        </p>
                                      </div>
                                      <a
                                        href={demoSharedResult.officialPostUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full py-1.5 px-2 text-center rounded bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-500 text-[9px] font-mono font-bold uppercase tracking-wider transition-all block flex items-center justify-center gap-1"
                                      >
                                        <ExternalLink className="w-2.5 h-2.5" /> View Official Proof
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>

            {/* Secondary High-Impact Tagline Banners */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-slate-900 bg-[#040406] flex items-center justify-between gap-3 text-left hover:border-slate-800 transition-all">
                <div className="space-y-1">
                  <span className="text-[9px] font-mono text-slate-600 uppercase tracking-widest">Digital Footprint</span>
                  <p className="text-xs font-semibold text-slate-300 font-mono leading-tight">
                    “Your wallet is you. Now it can prove it.”
                  </p>
                </div>
                <span className="text-amber-500/30 text-base font-mono">✦</span>
              </div>
              
              <div className="p-4 rounded-xl border border-slate-900 bg-[#040406] flex items-center justify-between gap-3 text-left hover:border-slate-800 transition-all">
                <div className="space-y-1">
                  <span className="text-[9px] font-mono text-slate-600 uppercase tracking-widest">Sybil Protection</span>
                  <p className="text-xs font-semibold text-slate-300 font-mono leading-tight">
                    “Stop anonymous claims. Start verified identity.”
                  </p>
                </div>
                <span className="text-purple-500/30 text-base font-mono">✦</span>
              </div>
            </div>

            {/* Central high-quality tagline banner */}
            <div className="p-6 rounded-2xl border border-slate-950 bg-gradient-to-r from-[#030305] via-[#08080c] to-[#030305] text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-yellow-500/[0.005] pointer-events-none" />
              <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block mb-1">
                THE REPUTATION STANDARD
              </span>
              <p className="text-xs sm:text-sm font-semibold text-slate-300 font-mono max-w-xl mx-auto leading-normal">
                “Where social reputation meets on-chain truth.”
              </p>
            </div>
          </motion.div>
        )}

        {/* PREMIUM NFC AD BANNER - Only shown below results when a wallet has been decoded */}
        {report && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-4xl mx-auto p-4 sm:p-5 rounded-2xl border border-amber-500/15 bg-gradient-to-r from-black via-[#0a0c10] to-[#120a1c] relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl text-left"
          >
            {/* Subtle animated neon light effect */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex items-center gap-3.5 text-left relative z-10">
              <div className="w-12 h-12 rounded-xl bg-slate-900 border border-amber-500/20 flex items-center justify-center shrink-0 shadow-lg relative group">
                <div className="absolute inset-0 bg-amber-500/10 rounded-xl blur-sm animate-pulse" />
                <CreditCard className="w-6 h-6 text-amber-400 relative z-10" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-mono font-bold text-amber-400 bg-amber-950/40 border border-amber-500/20 px-2 py-0.5 rounded tracking-widest uppercase">
                    COMING SOON
                  </span>
                  <span className="text-[10px] font-mono text-blue-400 font-bold">✦ REAL-WORLD IDENTITY</span>
                </div>
                <h3 className="text-base sm:text-lg font-black text-white tracking-tight mt-1">
                  Unlock the NFC Karma Card
                </h3>
                <p className="text-xs text-slate-400 max-w-md font-sans mt-0.5 leading-normal">
                  Bridge digital ownership with physical reality. Verify your dynamic wallet score with a single frictionless tap.
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                setActiveMainTab("nfc-card");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="px-5 py-2.5 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-black font-mono font-black text-[11px] uppercase tracking-wider rounded-lg transition-all shadow-lg shrink-0 flex items-center gap-1.5 active:scale-95 cursor-pointer"
            >
              Explore Product
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}

        {/* RESULTS DASHBOARD */}
        <AnimatePresence>
          {report && (
            <motion.div
              id="results-dashboard"
              variants={dashboardContainerVariants}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="space-y-8 pt-4"
            >
            <motion.div variants={dashboardItemVariants} className="border-t border-slate-900 pt-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold font-display text-white tracking-tight">
                    Reputation Analytics & Checked Passport
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">
                    Live verification feed for {report.address}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold">
                    Live On-Chain Checked
                  </span>
                </div>
              </div>

              {/* Main 2-Column Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* COLUMN 1: WALLET REPUTATION PASSPORT NFT (5 cols) */}
                <motion.div variants={dashboardItemVariants} className="lg:col-span-5 flex flex-col items-center">
                  <div className="w-full max-w-lg lg:scale-[1.05] lg:my-6 transition-all duration-300 relative">
                    {/* CONFETTI SPARKS ANIMATION OVERLAY */}
                    {showConfetti && (
                      <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden rounded-3xl">
                        {Array.from({ length: 30 }).map((_, i) => {
                          const colors = ["#F5AF19", "#FFF9A6", "#1d9bf0", "#10b981", "#ec4899", "#8b5cf6"];
                          const randomColor = colors[i % colors.length];
                          const delay = (i % 5) * 0.1;
                          const left = `${10 + Math.random() * 80}%`;
                          return (
                            <motion.div
                              key={i}
                              initial={{ y: "100%", opacity: 1, scale: 0.5 }}
                              animate={{
                                y: "-20%",
                                x: `${(Math.random() - 0.5) * 150}px`,
                                opacity: 0,
                                rotate: Math.random() * 360,
                                scale: 1.2
                              }}
                              transition={{ duration: 1.5, delay, ease: "easeOut" }}
                              className="absolute bottom-0 w-2.5 h-2.5 rounded-full"
                              style={{ backgroundColor: randomColor, left }}
                            />
                          );
                        })}
                      </div>
                    )}

                    {/* Passport Card */}
                    <motion.div
                      animate={isSoulbound ? { scale: [1, 1.02, 1], rotate: [0, 1, -1, 0] } : {}}
                      transition={{ duration: 0.6 }}
                      className={`relative overflow-hidden rounded-3xl p-10 flex flex-col items-center justify-between text-center select-none shadow-[0_30px_70px_-10px_rgba(0,0,0,0.9),inset_0_1px_1px_rgba(255,255,255,0.05)] border transition-all duration-700 ${
                        report.score < 280
                          ? "border-red-500/40 bg-[#0d0505] shadow-[0_0_40px_rgba(239,68,68,0.15)]"
                          : isSoulbound
                          ? "border-yellow-400/70 bg-[#0d0c05] shadow-[0_0_60px_rgba(245,175,25,0.3)]"
                          : "border-yellow-500/35 bg-[#090a12] shadow-[0_0_50px_rgba(245,158,11,0.12)]"
                      }`}
                    >
                      {/* Aura glowing effect behind soulbound card */}
                      {isSoulbound && (
                        <div className="absolute inset-0 bg-radial from-yellow-500/5 to-transparent animate-pulse pointer-events-none" />
                      )}

                      {/* Stamped Date on the NFT */}
                      {isSoulbound && (
                        <div className="absolute top-4 right-4 z-20 pointer-events-none transform rotate-[8deg] border border-yellow-400/50 bg-[#0d0c05]/95 px-2.5 py-1 rounded-md text-center shadow-[0_0_15px_rgba(245,158,11,0.25)]">
                          <div className="text-[7px] font-mono text-yellow-500/80 font-black tracking-widest uppercase">
                            STAMPED ON-CHAIN
                          </div>
                          <div className="text-[9px] font-mono text-yellow-400 font-black tracking-wider">
                            {bondStampedDate || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).toUpperCase()}
                          </div>
                        </div>
                      )}

                      {/* MODERN GLASSY RIPPLE ANIMATION WHEN WALLET CONNECTS */}
                      <AnimatePresence>
                        {glassWaveTrigger > 0 && (
                          <>
                            {/* Glass shockwave expanding outward */}
                            <motion.div
                              key={`ripple-${glassWaveTrigger}`}
                              initial={{ scale: 0.96, opacity: 0 }}
                              animate={{ scale: [1, 1.05, 1.12], opacity: [0, 0.7, 0] }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 1.2, ease: "easeOut" }}
                              className="absolute inset-0 rounded-3xl border-4 border-yellow-400/35 pointer-events-none z-30 backdrop-blur-[1px]"
                            />
                            {/* Fast specular glassy sweep sheen across the card face */}
                            <motion.div
                              key={`sheen-${glassWaveTrigger}`}
                              initial={{ left: "-150%" }}
                              animate={{ left: "150%" }}
                              transition={{ duration: 1.5, ease: "easeInOut" }}
                              className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/[0.15] to-transparent -skew-x-12 pointer-events-none z-30"
                            />
                          </>
                        )}
                      </AnimatePresence>

                      {/* Top Reflection Lighting & Metallic Finish Sheen */}
                      <div className="absolute top-0 left-0 right-0 h-[40%] bg-gradient-to-b from-white/5 to-transparent blur-md pointer-events-none" />
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent rotate-12 -translate-y-12 pointer-events-none" />
                      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-48 h-6 bg-white/5 rounded-full blur-md pointer-events-none" />

                      {/* Passport Header */}
                      <div className="space-y-0.5 z-10 w-full mb-6">
                        <div className={`text-[11px] font-black tracking-[0.3em] font-mono uppercase ${
                          report.score < 280 ? "text-red-400 animate-pulse" : isSoulbound ? "text-yellow-400 font-extrabold" : "text-yellow-500/70"
                        }`}>
                          {report.score < 280 ? "SECURITY BLACKLIST" : isSoulbound ? "★ VERIFIED SOULBOUND ★" : "DRAFT KARMA AI"}
                        </div>
                        <div className="text-[9px] font-extrabold tracking-[0.18em] text-slate-400 uppercase font-sans">
                          {report.score < 280 ? "CRITICAL HAZARD DETECTED" : "Wallet Reputation Passport"}
                        </div>
                      </div>

                      {/* Center Gauge */}
                      <div className="relative flex items-center justify-center w-52 h-52 mx-auto z-10">
                        {/* Glass Inner Circle with Backdrop Blur */}
                        <div className={`absolute inset-5 rounded-full backdrop-blur-md border shadow-[inner_0_4px_12px_rgba(0,0,0,0.5)] z-0 ${
                          report.score < 280 ? "bg-red-950/45 border-red-500/20" : "bg-slate-950/65 border-white/5"
                        }`} />

                        <svg className="w-full h-full transform -rotate-90 z-10 pointer-events-none" viewBox="0 0 208 208">
                          <defs>
                            <linearGradient id="passportGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                              {report.score < 280 ? (
                                <>
                                  <stop offset="0%" stopColor="#FF6B6B" />
                                  <stop offset="60%" stopColor="#FF4949" />
                                  <stop offset="100%" stopColor="#C91A1A" />
                                </>
                              ) : isSoulbound ? (
                                <>
                                  <stop offset="0%" stopColor="#FFE066" />
                                  <stop offset="50%" stopColor="#F5AF19" />
                                  <stop offset="100%" stopColor="#E2BE0F" />
                                </>
                              ) : (
                                <>
                                  <stop offset="0%" stopColor="#FFF9A6" />
                                  <stop offset="60%" stopColor="#F5AF19" />
                                  <stop offset="100%" stopColor="#D87600" />
                                </>
                              )}
                            </linearGradient>
                          </defs>
                          <circle
                            cx="104"
                            cy="104"
                            r="66"
                            stroke={report.score < 280 ? "#B71C1C" : "rgba(245, 175, 25, 0.08)"}
                            strokeWidth="8"
                            fill="transparent"
                          />
                          <circle
                            cx="104"
                            cy="104"
                            r="66"
                            stroke="url(#passportGradient)"
                            strokeWidth={isSoulbound ? "12" : "10"}
                            strokeDasharray={2 * Math.PI * 66}
                            strokeDashoffset={2 * Math.PI * 66 - (2 * Math.PI * 66 * (animatedScore)) / 1000}
                            strokeLinecap="round"
                            fill="transparent"
                            className="transition-all duration-1000 ease-out"
                            style={{
                              filter: report.score < 280
                                ? "drop-shadow(0 0 10px #FF4949)"
                                : isSoulbound
                                ? "drop-shadow(0 0 12px rgba(245,175,25,0.7))"
                                : "drop-shadow(0 0 8px rgba(245,175,25,0.3))"
                            }}
                          />

                          {/* No needle as requested */}
                        </svg>

                        {/* Centered Score */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-20 pointer-events-none">
                          <span className={`text-4xl font-extrabold tracking-tight font-display drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] ${getScoreColorClass(animatedScore)}`}>
                            {animatedScore}
                          </span>
                          <span 
                            style={{ fontSize: '10px', letterSpacing: '0.12em' }}
                            className="text-slate-400 font-extrabold font-sans mt-1 uppercase"
                          >
                            {report.score < 280 ? "ALERT LEVEL" : "KARMA SCORE"}
                          </span>
                        </div>
                      </div>

                      {/* Classification Title */}
                      <div className="mt-5 space-y-1.5 z-10 w-full flex flex-col items-center">
                        <div className="flex items-center justify-center gap-2 max-w-full">
                          <h2 className={`text-xl font-black font-display tracking-wide drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] text-center truncate ${
                            report.score < 280 ? "text-red-400 animate-pulse" : isSoulbound ? "text-yellow-400" : "text-yellow-500/90"
                          }`} title={report.experienceLevel}>
                            {report.score < 280 ? "FLAGGED SECURITY HAZARD" : (report.experienceLevel ? report.experienceLevel.toUpperCase() : "CHAIN WANDERER")}
                          </h2>
                          {report.score >= 280 && (
                            <button
                              id="change-identity-name-btn"
                              onClick={() => {
                                setCustomNameInput(report.experienceLevel || "");
                                setShowChangeNameModal(true);
                              }}
                              className="p-1 rounded bg-white/5 hover:bg-yellow-500 hover:text-black text-slate-400 hover:text-black transition-all border border-white/10 flex items-center justify-center shrink-0 cursor-pointer shadow hover:scale-105 active:scale-95"
                              title="Purchase custom identity name (0.005 SOL)"
                            >
                              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                              </svg>
                            </button>
                          )}
                        </div>
                        
                        {report.score >= 280 && (
                          <button
                            id="change-identity-name-link"
                            onClick={() => {
                              setCustomNameInput(report.experienceLevel || "");
                              setShowChangeNameModal(true);
                            }}
                            className="text-[9px] font-mono text-slate-500 hover:text-yellow-400 transition-colors uppercase tracking-wider cursor-pointer font-bold flex items-center gap-1"
                          >
                            <span>⚡ ENS Custom Name: 0.005 SOL</span>
                          </button>
                        )}

                        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold ${
                          report.score < 280
                            ? "bg-red-950/50 border border-red-500/30 text-red-400 animate-pulse"
                            : "bg-yellow-500/10 border border-yellow-500/20 text-yellow-400"
                        }`}>
                          <Award className="w-3.5 h-3.5" />
                          {getTierLevelText(report.reputationTier || "Neutral", report.score)}
                        </div>
                      </div>

                      {/* Wallet address label */}
                      <div className="mt-4 space-y-1.5 z-10 w-full">
                        <div className={`text-xs font-mono text-black font-bold px-3 py-1 rounded-md inline-block shadow-sm ${
                          report.score < 280 ? "bg-red-950/60 border border-red-500/30 text-red-400" : "bg-yellow-500 text-black"
                        }`}>
                          {report.address.slice(0, 10)}...{report.address.slice(-8)}
                        </div>
                      </div>

                      {/* Bottom status text / action button */}
                      <div className="mt-6 z-10 w-full space-y-3.5">
                        {report.score < 280 ? (
                          <div className="text-xs font-mono text-red-400 animate-pulse font-black tracking-[0.2em] uppercase text-center bg-red-950/40 border border-red-500/30 py-3 rounded-2xl">
                            ⚠️ HAZARD • HIGH RISK BLACKLIST
                          </div>
                        ) : isSoulbound ? (
                          <div className="flex flex-col gap-2.5">
                            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-mono text-yellow-400 font-extrabold tracking-[0.25em] uppercase bg-yellow-500/10 border-2 border-yellow-500/40 py-3 rounded-2xl">
                              <Check className="w-5 h-5 text-yellow-400" /> SOULBOUND • SECURELY BOUND
                            </div>
                            <div className="text-xs font-mono text-slate-400 text-center uppercase tracking-wider font-semibold">
                              Record anchored on-chain with {userWalletChain} signature
                            </div>
                          </div>
                        ) : !userWalletAddress ? (
                          <div className="space-y-3">
                            <button
                              onClick={() => {
                                setIsBondingFlowAfterConnect(true);
                                setShowConnectWalletModal(true);
                              }}
                              className="w-full py-4.5 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-black font-mono text-sm tracking-wider font-black rounded-2xl transition-all cursor-pointer shadow-[0_0_35px_rgba(245,158,11,0.35)] hover:shadow-[0_0_50px_rgba(245,158,11,0.55)] flex items-center justify-center gap-2 active:scale-[0.98]"
                            >
                              <svg className="w-5 h-5 text-black animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                              </svg>
                              CONNECT WALLET TO BIND
                            </button>
                            <div className="text-xs font-mono text-slate-300 tracking-wider text-center uppercase font-bold">
                              Bonding cost: <span className="text-yellow-400 font-black text-sm">0.05 SOL</span> or <span className="text-yellow-400 font-black text-sm">$5 EVM</span>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            <button
                              onClick={handleBondAndMint}
                              disabled={isMinting}
                              className="w-full py-4.5 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-black font-mono text-xs sm:text-sm tracking-wider font-black rounded-2xl transition-all cursor-pointer shadow-[0_0_35px_rgba(245,158,11,0.35)] hover:shadow-[0_0_50px_rgba(245,158,11,0.55)] flex flex-col items-center justify-center gap-1.5 active:scale-[0.98] disabled:opacity-90"
                            >
                              {isMinting ? (
                                <div className="flex items-center gap-2">
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                  <span>PROCESSING BONDING...</span>
                                </div>
                              ) : (
                                <div className="flex items-center gap-2">
                                  <Sparkles className="w-4 h-4 text-black animate-pulse" />
                                  <span>BOND & MINT PASSPORT</span>
                                </div>
                              )}
                            </button>
                            {isMinting ? (
                              <div className="text-xs font-mono text-yellow-400 text-center tracking-wide uppercase animate-pulse font-bold">
                                {mintStep}
                              </div>
                            ) : (
                              <div className="text-xs font-mono text-slate-300 tracking-wider text-center uppercase font-bold">
                                Treasury Fee: <span className="text-yellow-400 font-black text-sm">{userWalletChain === "Solana" ? "0.05 SOL" : "$5 (0.002 ETH equivalent)"}</span>
                              </div>
                            )}
                          </div>
                        )}

                        <button
                          onClick={handleUpdateScore}
                          disabled={isUpdatingScore}
                          className="w-full py-4 bg-amber-500/10 hover:bg-amber-500/25 text-amber-300 hover:text-amber-200 border-2 border-amber-500/50 hover:border-amber-400 rounded-2xl font-mono text-xs tracking-wider uppercase font-black transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shadow-[0_0_20px_rgba(245,158,11,0.15)] hover:scale-[1.01]"
                        >
                          {isUpdatingScore ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                              <span>Scanning & Updating Score...</span>
                            </>
                          ) : (
                            <>
                              <Zap className="w-4 h-4 text-amber-400 animate-pulse" />
                              <span>Update Score</span>
                            </>
                          )}
                        </button>

                        <button
                          onClick={() => setShowReportModal(true)}
                          className="w-full py-4 bg-slate-900/90 hover:bg-slate-950 text-slate-200 hover:text-white border-2 border-slate-700 hover:border-slate-500 rounded-2xl font-mono text-xs tracking-wider uppercase font-black transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01]"
                        >
                          <Fingerprint className="w-4 h-4" />
                          View Detailed Dossier Details
                        </button>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>

                {/* COLUMN 2: TABBED ANALYSIS & PORTFOLIO (7 cols) */}
                <motion.div variants={dashboardItemVariants} className="lg:col-span-7 space-y-6">
                  {/* GLASSY NAVIGATION TABS */}
                  <div className="flex p-1.5 bg-white/[0.02] backdrop-blur-md border border-white/5 rounded-2xl">
                    <button
                      onClick={() => setColumnTwoTab("social")}
                      className={`flex-1 py-3 px-2 text-xs sm:text-sm font-mono font-black tracking-wider uppercase rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
                        columnTwoTab === "social"
                          ? "bg-gradient-to-r from-yellow-500/10 to-amber-500/10 border-2 border-yellow-500/50 text-yellow-400 font-bold"
                          : "text-slate-400 hover:text-slate-200 border-2 border-transparent"
                      }`}
                    >
                      <Twitter className="w-4 h-4" />
                      Social & Bot Diagnostics
                    </button>
                    <button
                      onClick={() => setColumnTwoTab("nfts")}
                      className={`flex-1 py-3 px-2 text-xs sm:text-sm font-mono font-black tracking-wider uppercase rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
                        columnTwoTab === "nfts"
                          ? "bg-gradient-to-r from-yellow-500/10 to-amber-500/10 border-2 border-yellow-500/50 text-yellow-400 font-bold"
                          : "text-slate-400 hover:text-slate-200 border-2 border-transparent"
                      }`}
                    >
                      <Layers className="w-4 h-4" />
                      Connected NFT Portfolio
                    </button>
                  </div>

                  {columnTwoTab === "social" ? (
                    (() => {
                      if (!userTwitterConnected) {
                        return (
                          <div className="rounded-2xl border border-dashed border-slate-800 bg-[#08090d]/60 p-8 flex flex-col items-center justify-center text-center space-y-4 shadow-xl min-h-[380px]">
                            <div className="w-14 h-14 rounded-2xl bg-[#1d9bf0]/10 border border-[#1d9bf0]/25 flex items-center justify-center text-[#1d9bf0]">
                              <Twitter className="w-7 h-7 animate-pulse" />
                            </div>
                            <div className="space-y-2.5 max-w-md">
                              <h3 className="text-lg sm:text-xl font-bold text-white">X / Twitter Connection Required</h3>
                              <p className="text-sm text-slate-300 leading-relaxed font-normal">
                                Connect your X / Twitter account to unlock detailed Social & Bot Diagnostics, calculate bot follower indexes, and inspect verification trust factors across the network.
                              </p>
                            </div>
                            <button
                              onClick={() => {
                                setShowLinkXModal(true);
                              }}
                              className="px-6 py-3 bg-[#1d9bf0] hover:bg-[#1a8cd8] text-white font-mono text-sm tracking-wider font-extrabold rounded-xl transition-all shadow-md hover:shadow-blue-500/15 flex items-center gap-2 active:scale-[0.98] cursor-pointer"
                            >
                              <Twitter className="w-5 h-5 text-white" />
                              Connect Your X Profile
                            </button>
                          </div>
                        );
                      }

                      const hasX = !!report.twitterHandle;
                      if (!hasX) {
                        return (
                          <div className="rounded-2xl border border-dashed border-slate-800 bg-[#08090d]/60 p-8 flex flex-col items-center justify-center text-center space-y-4 shadow-xl min-h-[380px]">
                            <div className="w-12 h-12 rounded-2xl bg-yellow-500/10 border border-yellow-500/25 flex items-center justify-center text-yellow-400">
                              <Info className="w-6 h-6 animate-pulse" />
                            </div>
                            <div className="space-y-1.5 max-w-sm">
                              <h3 className="text-base font-bold text-white">X / Twitter Identity Unlinked</h3>
                              <p className="text-xs text-slate-400 leading-relaxed font-normal">
                                Verify your social footprint to calculate bot follower indexes, unlock active engagement metrics, and link your verified profile avatar to your soulbound badge.
                              </p>
                            </div>
                            <button
                              onClick={() => {
                                setShowLinkXModal(true);
                              }}
                              className="px-5 py-2.5 bg-[#1d9bf0] hover:bg-[#1a8cd8] text-white font-mono text-xs tracking-wider font-bold rounded-xl transition-all shadow-md hover:shadow-blue-500/15 flex items-center gap-1.5 active:scale-[0.98] cursor-pointer"
                            >
                              <Twitter className="w-4 h-4 text-white" />
                              Link X Profile to Address
                            </button>
                          </div>
                        );
                      }

                      // Simulated Twitter data seeded from handle
                      const handleRaw = report.twitterHandle.replace(/^@/, "");
                      const isMark = handleRaw.toLowerCase().includes("mason") || handleRaw.toLowerCase().includes("mark");
                      const isWhatever = handleRaw.toLowerCase().includes("what");

                      let fullName = isMark ? "Mark Martin" : isWhatever ? "✨ whateverman ✨ 🎙️" : `${handleRaw.charAt(0).toUpperCase() + handleRaw.slice(1)}`;
                      let bio = isMark 
                        ? "Bullish on SOL, BTC & XRP, still riding meme coins waves 🌊. My wife is my best friend. I like race cars, Rvs, and fitness. NASCAR."
                        : isWhatever
                        ? "✨ The Journey is the Reward ✨ @BULL_AND_BEAN !! Advisor @OKX @Wallet |"
                        : "Web3 pioneer, active protocol governor, and digital analyst. Tracing dynamic on-chain reputation structures across the multi-chain ecosystem.";
                      let followers = isMark ? "19.28K" : isWhatever ? "49.65K" : `${(2.5 + (report.score % 40) * 1.5).toFixed(1)}K`;
                      let follows = isMark ? "337" : isWhatever ? "18.75K" : `${(100 + (report.score % 25) * 80)}`;
                      let tweets = isMark ? "13.16K" : isWhatever ? "102.58K" : `${(1.2 + (report.score % 100) * 0.4).toFixed(1)}K`;
                      let joined = isMark ? "Nov 19, 2020" : isWhatever ? "Mar 24, 2010" : "May 14, 2018";
                      let badgeType = isMark ? "Collector" : isWhatever ? "Influencer" : (report.score >= 800 ? "Active OG" : "Ecosystem Member");
                      let botPercent = isMark ? 76 : isWhatever ? 12 : Math.max(5, Math.min(95, 100 - Math.round(report.score / 11)));
                      
                      // We map our score (0-1000) to a scaled range of 100-2000 for Twitter
                      const scaledTwitterScore = isMark ? 0 : isWhatever ? 1255 : Math.round(100 + (report.score * 1.9));
                      const scoreTrend = isMark ? "+0" : isWhatever ? "+1" : `+${(report.score % 5)}`;
                      const tierName = isMark ? "Tier 1. Unknown" : isWhatever ? "Significant" : report.reputationTier || "Neutral";

                      // Define avatar seed/image depending on type
                      const avatarUrl = isWhatever 
                        ? "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=150&q=80" // abstract digital pattern
                        : "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"; // face profile

                      return (
                        <div className="space-y-6">
                          {/* HIGH-FIDELITY TWITTER PROFILE CARD */}
                          <div className="rounded-2xl border border-slate-800 bg-[#07080c] overflow-hidden shadow-2xl relative">
                            {/* Banner background matching dark tech aesthetic */}
                            <div className="h-28 w-full bg-gradient-to-r from-slate-900 via-[#0d1220] to-slate-950 relative border-b border-slate-900">
                              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(245,175,25,0.05),transparent)] pointer-events-none" />
                            </div>

                            <div className="px-6 pb-6 relative flex flex-col sm:flex-row items-start justify-between gap-4 -translate-y-8">
                              <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4">
                                {/* Round Avatar */}
                                <div className="relative shrink-0">
                                  <img
                                    src={avatarUrl}
                                    alt="X Avatar"
                                    referrerPolicy="no-referrer"
                                    className="w-20 h-20 rounded-full border-4 border-[#07080c] object-cover bg-slate-900"
                                  />
                                  <div className="absolute bottom-0 right-0 w-6 h-6 bg-[#1d9bf0] rounded-full border-2 border-[#07080c] flex items-center justify-center text-[10px] text-white font-black" title="Verified Twitter Account">
                                    ✓
                                  </div>
                                </div>

                                <div className="text-center sm:text-left pt-2">
                                  <h3 className="text-xl font-bold text-white flex items-center gap-1.5 justify-center sm:justify-start font-display">
                                    {fullName}
                                    {report.twitterVerifiedType === "business" ? (
                                      <span className="w-4 h-4 bg-amber-500 rounded-sm flex items-center justify-center text-[8px] text-black font-extrabold select-none shrink-0" title="Verified Business">✓</span>
                                    ) : (
                                      <span className="w-4 h-4 bg-[#1d9bf0] rounded-full flex items-center justify-center text-[8px] text-white font-extrabold select-none shrink-0" title="Verified Individual">✓</span>
                                    )}
                                  </h3>
                                  <p className="text-xs font-mono text-slate-500 mt-0.5">X @{handleRaw}</p>
                                </div>
                              </div>

                              {/* Action Buttons Row */}
                              <div className="flex items-center gap-2 self-center sm:self-end mt-4 sm:mt-0">
                                <button
                                  onClick={handleDisconnectX}
                                  className="px-3 py-1.5 bg-rose-950/20 hover:bg-rose-950/40 border border-rose-900/30 hover:border-rose-900/50 rounded-lg text-xs font-semibold text-rose-400 flex items-center gap-1 transition-all cursor-pointer"
                                  title="Log out of X account"
                                >
                                  <Twitter className="w-3.5 h-3.5" />
                                  <span>Log Out of X</span>
                                </button>
                                <button
                                  onClick={() => {
                                    showToast(`Successfully added X handle @${handleRaw} to your private Watchlist.`, "success");
                                  }}
                                  className="px-3.5 py-1.5 bg-slate-900 hover:bg-black border border-slate-800 rounded-lg text-xs font-semibold text-slate-300 flex items-center gap-1.5 transition-all cursor-pointer"
                                >
                                  <span>Watchlist</span>
                                </button>
                                <button
                                  onClick={() => {
                                    showToast(`Risk Assessment Status for @${handleRaw}: ${botPercent > 50 ? 'HIGH RISK' : 'HEALTHY REPUTATION'}. Bot index is at ${botPercent}%.`, "info");
                                  }}
                                  className="p-1.5 bg-slate-900 hover:bg-black border border-slate-800 rounded-lg text-rose-400 hover:text-rose-300 transition-all cursor-pointer"
                                  title="Safety Alert Information"
                                >
                                  <ShieldAlert className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => {
                                    handleDecode(report.address);
                                  }}
                                  className="p-1.5 bg-slate-900 hover:bg-black border border-slate-800 rounded-lg text-slate-400 hover:text-white transition-all cursor-pointer"
                                  title="Sync Twitter Profile Feed"
                                >
                                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 7.89M9 11l3-3m0 0l3 3m-3-3v12" />
                                  </svg>
                                </button>
                              </div>
                            </div>

                            {/* Profile Description / Bio */}
                            <div className="px-6 -mt-4 space-y-4">
                              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                                {bio}
                              </p>

                              <div className="flex flex-wrap gap-2 pt-1">
                                <span className="px-2.5 py-0.5 text-[10px] font-mono font-bold bg-[#1d9bf0]/10 border border-[#1d9bf0]/20 text-[#1d9bf0] rounded-full">
                                  {badgeType}
                                </span>
                                <span className="px-2.5 py-0.5 text-[10px] font-mono font-bold bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 rounded-full">
                                  Web3 Identity Bound
                                </span>
                              </div>

                              {/* Followers / Following Stats Row */}
                              <div className="grid grid-cols-4 gap-4 py-4 border-t border-slate-900 font-sans">
                                <div className="text-center sm:text-left">
                                  <div className="text-[10px] text-slate-500 uppercase font-mono tracking-wider">Followers</div>
                                  <div className="text-sm font-bold text-white mt-0.5">{followers}</div>
                                </div>
                                <div className="text-center sm:text-left">
                                  <div className="text-[10px] text-slate-500 uppercase font-mono tracking-wider">Follows</div>
                                  <div className="text-sm font-bold text-white mt-0.5">{follows}</div>
                                </div>
                                <div className="text-center sm:text-left">
                                  <div className="text-[10px] text-slate-500 uppercase font-mono tracking-wider">Tweets</div>
                                  <div className="text-sm font-bold text-white mt-0.5">{tweets}</div>
                                </div>
                                <div className="text-center sm:text-left">
                                  <div className="text-[10px] text-slate-500 uppercase font-mono tracking-wider">Joined</div>
                                  <div className="text-xs font-semibold text-slate-300 mt-0.5 truncate">{joined}</div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* COLUMN COLUMNS: SCORE (100-2000) & BOT FOLLOWERS */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            
                            {/* THE CUSTOM GRADIENT SCORE TRACK SLIDER (FROM SCREENSHOTS) */}
                            <div className="rounded-2xl border border-slate-800/80 bg-[#07080c] p-6 space-y-4 shadow-xl">
                              <div className="flex items-center justify-between">
                                <h4 className="text-[10px] tracking-widest font-mono text-slate-500 uppercase">
                                  Score Index
                                </h4>
                                <span className={`px-2 py-0.5 rounded text-[9px] font-bold font-mono ${getTierColor(report.reputationTier)}`}>
                                  {tierName}
                                </span>
                              </div>

                              <div className="flex items-baseline gap-2 pb-2">
                                <span className="text-4xl font-extrabold text-white font-mono">{scaledTwitterScore}</span>
                                <span className="text-emerald-400 font-mono text-xs font-bold flex items-center gap-0.5">
                                  {scoreTrend}
                                  <TrendingUp className="w-3.5 h-3.5 text-emerald-400 inline animate-pulse" />
                                </span>
                              </div>

                              {/* Custom Gradient Slider Track (From screenshots!) */}
                              <div className="space-y-2 pt-2">
                                <div className="relative h-3 w-full rounded-full bg-gradient-to-r from-red-500 via-pink-500 via-purple-500 via-indigo-500 via-teal-400 to-emerald-400">
                                  {/* Positioned glowing pink/white handle representing the score */}
                                  {(() => {
                                    // Map score range 100-2000 to percentage
                                    const pct = Math.max(0, Math.min(100, ((scaledTwitterScore - 100) / 1900) * 100));
                                    return (
                                      <div
                                        className="absolute top-1/2 -translate-y-1/2 w-5.5 h-5.5 rounded-full bg-white border-4 border-[#07080c] shadow-[0_0_15px_rgba(236,72,153,1)] cursor-default transition-all duration-1000"
                                        style={{ left: `calc(${pct}% - 11px)` }}
                                      />
                                    );
                                  })()}
                                </div>
                                <div className="flex justify-between text-[9px] font-mono text-slate-500 px-1 pt-1">
                                  <span>100</span>
                                  <span>500</span>
                                  <span>1000</span>
                                  <span>1500</span>
                                  <span>2000</span>
                                </div>
                              </div>
                            </div>

                            {/* BOT FOLLOWERS RADIAL GRAPH (FROM SCREENSHOTS) */}
                            <div className="rounded-2xl border border-slate-800/80 bg-[#07080c] p-6 shadow-xl flex flex-col justify-between">
                              <div className="flex items-center justify-between mb-4">
                                <h4 className="text-[10px] tracking-widest font-mono text-slate-500 uppercase">
                                  Bot Followers
                                </h4>
                                <span className="text-[9px] font-mono text-slate-500">
                                  Last update: June 2026
                                </span>
                              </div>

                              <div className="grid grid-cols-12 gap-4 items-center">
                                {/* Left: Mini-stats details */}
                                <div className="col-span-6 space-y-2.5">
                                  <div>
                                    <div className="text-[9px] uppercase font-mono text-slate-500">Engagement</div>
                                    <div className="text-xs font-mono font-bold text-white">{botPercent > 60 ? "0%" : "85%"}</div>
                                  </div>
                                  <div>
                                    <div className="text-[9px] uppercase font-mono text-slate-500">Follower Ratio</div>
                                    <div className="text-xs font-mono font-bold text-white">{botPercent > 60 ? "0%" : "1.8x"}</div>
                                  </div>
                                  <div>
                                    <div className="text-[9px] uppercase font-mono text-slate-500">Post views vari</div>
                                    <div className="text-xs font-mono font-bold text-white">{botPercent > 60 ? "0%" : "15%"}</div>
                                  </div>
                                  <div>
                                    <div className="text-[9px] uppercase font-mono text-slate-500">Likes/rt/reply</div>
                                    <div className="text-xs font-mono font-bold text-white">{botPercent > 60 ? "0%" : "42%"}</div>
                                  </div>
                                </div>

                                {/* Right: Radial SVG Progress Circle */}
                                <div className="col-span-6 flex flex-col items-center justify-center">
                                  <div className="relative w-20 h-20">
                                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 80 80">
                                      <circle
                                        cx="40"
                                        cy="40"
                                        r="30"
                                        className="stroke-slate-900"
                                        strokeWidth="5"
                                        fill="transparent"
                                      />
                                      <circle
                                        cx="40"
                                        cy="40"
                                        r="30"
                                        className={`${botPercent > 50 ? 'stroke-rose-500 shadow-rose-500/20' : 'stroke-teal-400 shadow-teal-400/20'} transition-all duration-1000 ease-out`}
                                        strokeWidth="6"
                                        strokeDasharray={2 * Math.PI * 30}
                                        strokeDashoffset={2 * Math.PI * 30 - (2 * Math.PI * 30 * botPercent) / 1000}
                                        strokeLinecap="round"
                                        fill="transparent"
                                        style={{
                                          strokeDashoffset: 2 * Math.PI * 30 - (2 * Math.PI * 30 * botPercent) / 100,
                                          filter: botPercent > 50 ? "drop-shadow(0 0 6px rgba(244,63,94,0.3))" : "drop-shadow(0 0 6px rgba(45,212,191,0.3))"
                                        }}
                                      />
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                                      <span className="text-[9px] font-bold text-slate-500 uppercase font-mono">Bots</span>
                                      <span className={`text-sm font-black font-mono ${botPercent > 50 ? 'text-rose-500' : 'text-teal-400'}`}>
                                        {botPercent}%
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* X MUTUAL FAVORITES */}
                          <XFavoritesCard />
                        </div>
                      );
                    })()
                  ) : (
                    <GlassyNftView
                      userWalletAddress={userWalletAddress}
                      userWalletChain={userWalletChain}
                      isSoulbound={isSoulbound}
                      onMintPassport={handleBondAndMint}
                      isMinting={isMinting}
                      mintStep={mintStep}
                      currentScore={report.score}
                      userTwitterHandle={userTwitterHandle}
                      solBalance={solBalance}
                      ethBalance={ethBalance}
                      onDeductBalance={handleDeductWalletBalance}
                      onConnectClick={() => {
                        setIsBondingFlowAfterConnect(true);
                        setShowConnectWalletModal(true);
                      }}
                    />
                  )}
                </motion.div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

        {/* ERROR BOX */}
        {error && (
          <div className="max-w-2xl mx-auto p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 text-rose-300 text-sm flex gap-3">
            <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
            <div>
              <p className="font-semibold font-mono">Decoding Aborted</p>
              <p className="mt-1 text-slate-300 text-xs">{error}</p>
            </div>
          </div>
        )}

        {/* PROGRESS LOADER */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="max-w-2xl mx-auto p-6 rounded-2xl bg-[#0d0d10] text-slate-100 border border-white/5 shadow-2xl overflow-hidden relative"
            >
              <div className="flex items-center justify-between border-b border-slate-950 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-yellow-400" />
                  <span className="text-xs font-mono text-yellow-400 uppercase tracking-widest font-bold">
                    Reputation Scanning Index
                  </span>
                </div>
                <Loader2 className="w-4 h-4 text-yellow-400 animate-spin" />
              </div>

              {/* Progress Bar */}
              <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden mb-4">
                <div
                  className="h-full bg-yellow-400 transition-all duration-300 rounded-full"
                  style={{ width: `${((currentStepIndex + 1) / stepsList.length) * 100}%` }}
                ></div>
              </div>

              {/* List of actions */}
              <div className="space-y-2 h-48 overflow-y-auto font-mono text-xs text-slate-400 scrollbar-none">
                {scanSteps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-2 animate-fade-in">
                    <span className="text-yellow-400">❯</span>
                    <span>{step}</span>
                    {idx < scanSteps.length - 1 && (
                      <span className="ml-auto text-emerald-400 text-[10px] uppercase font-bold">Complete</span>
                    )}
                  </div>
                ))}
                {currentStepIndex < stepsList.length && (
                  <div className="flex items-center gap-2 text-yellow-400 font-bold animate-pulse">
                    <span>❯</span>
                    <span>Analyzing on-chain indexes...</span>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

          </motion.div>
        )}

        {/* KARMA POWER REPUTATION STAKING TAB */}
        {activeMainTab === "staking" && (
          <motion.div
            key="staking-tab"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="space-y-10"
          >
            {/* Karma Power Staking Hero Banner */}
            <div className="text-center max-w-3xl mx-auto space-y-4 pt-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/25 bg-amber-950/20 text-amber-400 text-xs font-mono uppercase tracking-widest font-bold">
                <Coins className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                KARMA POWER PROTOCOL
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black font-display tracking-tight text-white leading-none">
                Reputation <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500">Staking Portal</span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 font-normal leading-relaxed max-w-xl mx-auto">
                Secure the validation matrix of the Karma Power Consensus Engine by locking up reputation power. Compound real-time yield multipliers directly boosted by your Karma score.
              </p>
            </div>

            {/* Realtime Yield Compound Card - PLACED FIRST */}
            <div className="max-w-3xl mx-auto w-full">
              <div className="rounded-2xl border border-amber-500/25 bg-radial from-[#0f0e0a] to-[#040406] p-6 sm:p-8 text-center space-y-6 shadow-[0_0_30px_rgba(234,179,8,0.1)] flex flex-col justify-center items-center relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[2px] bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
                
                {/* Swarm NFT check & mint CTA - NOW FIRST */}
                {!hasSwarmNft ? (
                  <div className="w-full p-5 rounded-xl border border-amber-500/20 bg-gradient-to-br from-amber-950/20 via-black to-[#0d0d10] text-left relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-amber-500/20 transition-all duration-500" />
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="space-y-1.5 max-w-md">
                        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-amber-500/15 border border-amber-500/30 text-amber-400 font-mono text-[9px] uppercase tracking-wider font-extrabold">
                          <Sparkles className="w-2.5 h-2.5 text-amber-400 animate-pulse" />
                          MINT MULTIPLIER EXCLUSIVE
                        </div>
                        <h4 className="text-sm font-bold text-white font-display">
                          Boost Staking Yields to 12.5x!
                        </h4>
                        <p className="text-xs text-slate-400 leading-relaxed font-sans">
                          No Swarm NFT detected in your wallet. Mint an exclusive Swarm NFT to activate the high-tier staker multiplier and boost your daily KP rewards accrual rates instantly.
                        </p>
                      </div>
                      <a
                        href="https://gravemint.io/mint/FXSVHzLvVFey57U8ETuhHzrzDRT3FhvqzbxWpyoAJA4c"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto px-5 py-3 rounded-lg font-mono text-xs font-black text-black bg-amber-400 hover:bg-amber-300 transition-all hover:shadow-[0_0_15px_rgba(234,179,8,0.4)] cursor-pointer flex items-center justify-center gap-2 shrink-0 active:scale-95 text-center"
                      >
                        <Trophy className="w-3.5 h-3.5" />
                        Mint Swarm NFT
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="w-full p-4 rounded-xl border border-emerald-500/20 bg-emerald-950/5 text-left flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-emerald-500/10 border border-emerald-500/25 rounded-lg text-emerald-400">
                        <CheckCircle className="w-5 h-5 animate-pulse" />
                      </div>
                      <div className="text-left">
                        <h4 className="text-xs font-bold text-emerald-400 font-mono uppercase tracking-wider">
                          Swarm NFT Multiplier Active!
                        </h4>
                        <p className="text-[11px] text-slate-400 font-sans mt-0.5">
                          Your staking yield is currently boosted by the exclusive <strong className="text-emerald-300 font-mono font-black">12.5x NFT Multiplier</strong>.
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono font-black text-emerald-400 border border-emerald-500/30 bg-emerald-500/10 px-2 py-1 rounded">
                      12.5x APY MULTIPLIER
                    </span>
                  </div>
                )}

                {/* Real-time rewards stream - NOW BELOW MINT MULTIPLIER */}
                <div className="space-y-3 w-full border-t border-white/5 pt-5">
                  <span className="text-xs font-mono text-amber-400 uppercase tracking-widest block font-bold animate-pulse">
                    ⚡ Pending Accrued Rewards (Real-time stream)
                  </span>
                  <span className="text-4xl sm:text-5xl font-mono font-black text-yellow-400 block tracking-tight">
                    <motion.span
                      key={rewardTally}
                      initial={{ scale: 1.05, color: "#fffbeb", textShadow: "0 0 12px rgba(251, 191, 36, 0.8)" }}
                      animate={{ scale: 1, color: "#facc15", textShadow: "0 0 0px rgba(251, 191, 36, 0)" }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="inline-block"
                    >
                      {rewardTally.toFixed(6)}
                    </motion.span>{" "}
                    <span className="text-sm sm:text-lg text-slate-400 font-normal font-sans">KP</span>
                  </span>
                  <p className="text-xs text-slate-400 font-mono block max-w-xl mx-auto leading-relaxed">
                    Rewards accruals calculate dynamically based on active reputational validation weightings.
                  </p>
                </div>

                {/* Staking & Free Play Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xl">
                  <button
                    onClick={() => {
                      if (rewardTally <= 0) return;
                      setStakingLoading(true);
                      setTimeout(() => {
                        setRewardTally(0);
                        setStakingLoading(false);
                        showToast("Claim Successful! Your pending Karma Power rewards have been claimed and transferred to your connected wallet.", "success");
                      }, 1200);
                    }}
                    disabled={rewardTally <= 0 || stakingLoading}
                    className="flex-1 py-4 text-white font-mono font-extrabold text-xs tracking-wider uppercase rounded-xl transition-all cursor-pointer bg-gradient-to-r from-[#20c3ff] to-[#015aff] hover:from-[#35cbff] hover:to-[#1a6bff] shadow-[0_0_20px_rgba(32,195,255,0.45)] disabled:opacity-40 disabled:hover:from-[#20c3ff] flex items-center justify-center gap-1.5 active:scale-95 text-center"
                  >
                    <Sparkles className="w-4 h-4 text-white animate-pulse" />
                    Claim Accrued Rewards
                  </button>

                  <a
                    href="https://www.karmagamez.xyz/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-4 text-black font-mono font-black text-xs tracking-wider uppercase rounded-xl transition-all cursor-pointer bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 shadow-[0_0_20px_rgba(234,179,8,0.35)] flex items-center justify-center gap-1.5 active:scale-95 text-center px-4"
                  >
                    <Gamepad2 className="w-4 h-4" />
                    Earn Without Initial Capital on KarmaGamez
                  </a>
                </div>

                {/* Helpful explanatory flow banner */}
                <div className="w-full p-4 rounded-xl border border-amber-500/15 bg-[#07080c]/60 text-left space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400">
                    <Info className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>NO-COST STAKING & MULTIPLIED EARNINGS</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    <strong>No-Cost Staking: Earn rewards without upfront capital.</strong> Get started today! Start staking, claim your exclusive Swarm NFT multiplier, and navigate over to <a href="https://www.karmagamez.xyz/" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:underline inline-flex items-center gap-0.5 font-bold">KarmaGamez.xyz <ExternalLink className="w-3 h-3" /></a> to engage in No-Cost Staking. Swarm NFT stakers enjoy massive multiplied reward payouts!
                  </p>
                </div>


              </div>
            </div>

            {/* Interactive Karma Power Ledger Visualizer */}
            <div className="rounded-2xl border border-white/5 p-6 bg-[#07080c]/60 backdrop-blur-md relative overflow-hidden shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-amber-500" />
                  <h3 className="text-xs tracking-widest font-mono text-slate-300 uppercase font-black">
                    Interactive Karma Power Ledger Consensus Nodes
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/20 px-2 py-0.5 rounded">
                  ● CONSENSUS STABILIZED
                </span>
              </div>
              <ButterflyNetwork
                score={report ? report.score : 500}
                address={report ? report.address : ""}
                onOpenStaking={() => {}} // Already on staking page
                onPollenSpread={handlePollenSpread}
                hasSwarmNft={hasSwarmNft}
                onMintClick={() => setShowMintSwarmNftModal(true)}
              />
            </div>

            {/* KARMA POWER TRILLIONAIRES LEADERBOARD */}
            <div className="rounded-2xl border border-white/5 p-6 sm:p-8 bg-[#07080c]/80 backdrop-blur-md relative overflow-hidden shadow-2xl space-y-6">
              <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-amber-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-5">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-yellow-400 animate-bounce" />
                    <h3 className="text-base sm:text-lg font-bold font-display text-white tracking-tight flex items-center gap-2">
                      Karma Power Trillionaires Leaderboard
                      <span className="text-[10px] bg-red-500/20 text-red-400 border border-red-500/30 px-2.5 py-0.5 rounded-full font-mono font-black tracking-wider animate-pulse uppercase shrink-0">
                        2,000 Nodes Live
                      </span>
                    </h3>
                  </div>
                  <p className="text-xs text-slate-400 font-normal">
                    The race to lock the highest Karma Power (KP) to claim ultimate platform yield payouts from the quarterly 43 SOL prize pool.
                  </p>
                </div>
                
                <div className="flex items-center gap-3 bg-amber-500/10 border border-amber-500/20 px-4 py-2 rounded-xl shrink-0">
                  <Coins className="w-4 h-4 text-amber-400 animate-pulse" />
                  <div className="font-mono text-left">
                    <span className="block text-[9px] text-slate-400 uppercase leading-none font-bold">Estimated Prize Pool</span>
                    <span className="text-xs text-amber-300 font-bold">43 SOL (~$6,450 USD)</span>
                  </div>
                </div>
              </div>

              {/* Leaderboard stats summary cards (Excitement creator!) */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-[#11131c]/50 border border-white/5 rounded-xl p-3 text-left">
                  <span className="block text-[9px] text-slate-500 font-mono uppercase">Total Locked KP</span>
                  <span className="text-xs font-mono font-black text-white">28.45 Trillion KP</span>
                </div>
                <div className="bg-[#11131c]/50 border border-white/5 rounded-xl p-3 text-left">
                  <span className="block text-[9px] text-slate-500 font-mono uppercase">Global Stakers</span>
                  <span className="text-xs font-mono font-black text-amber-400">2,000 Verified</span>
                </div>
                <div className="bg-[#11131c]/50 border border-white/5 rounded-xl p-3 text-left">
                  <span className="block text-[9px] text-slate-500 font-mono uppercase">Your Rank Position</span>
                  <span className="text-xs font-mono font-black text-yellow-300">#482 of 2,000</span>
                </div>
                <div className="bg-[#11131c]/50 border border-white/5 rounded-xl p-3 text-left">
                  <span className="block text-[9px] text-slate-500 font-mono uppercase">Avg Node Multiplier</span>
                  <span className="text-xs font-mono font-black text-emerald-400">5.45x Boost</span>
                </div>
              </div>

              {/* Search & Active filter block */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-950/60 p-4 rounded-xl border border-white/5">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={leaderboardSearchQuery}
                    onChange={(e) => {
                      setLeaderboardSearchQuery(e.target.value);
                      setLeaderboardVisibleCount(150); // Reset slice count on search
                    }}
                    placeholder="Search name, rank (e.g. 1500), or address..."
                    className="w-full bg-[#06060a]/80 border border-slate-800/80 rounded-lg pl-9 pr-10 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50 font-mono text-left"
                  />
                  {leaderboardSearchQuery && (
                    <button
                      onClick={() => {
                        setLeaderboardSearchQuery("");
                        setLeaderboardVisibleCount(150);
                      }}
                      className="absolute right-3 top-2 text-slate-500 hover:text-white text-xs font-mono cursor-pointer"
                    >
                      ✕
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Showing {Math.min(filteredLeaderboardRows.length, leaderboardVisibleCount)} of {filteredLeaderboardRows.length} entries</span>
                </div>
              </div>

              {/* Leaderboard Table / Rows */}
              <div className="overflow-x-auto border border-white/5 rounded-xl bg-[#030407]/90">
                <div className="max-h-[480px] overflow-y-auto scrollbar-thin scrollbar-thumb-amber-500/20 scrollbar-track-transparent">
                  <table className="w-full text-left border-collapse min-w-[650px]">
                    <thead className="sticky top-0 bg-[#07080d] z-10 shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                      <tr className="border-b border-white/5 text-[9px] font-mono text-slate-400 uppercase tracking-wider">
                        <th className="py-3 px-4 font-black">Rank</th>
                        <th className="py-3 px-4 font-black">Validator / Handle</th>
                        <th className="py-3 px-4 font-black">Wallet Address</th>
                        <th className="py-3 px-4 text-right font-black">Total Staked KP</th>
                        <th className="py-3 px-4 text-right font-black">Prize Pool Share</th>
                        <th className="py-3 px-4 text-right font-black">Honorary Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 font-mono text-xs text-slate-300">
                      
                      {/* USER'S FLOATING ROW (STICKY TOP BANNER IN TABLE BODY) */}
                      {!leaderboardSearchQuery && (
                        <tr className="bg-yellow-500/[0.08] border-b-2 border-yellow-500/30 sticky top-0 z-20 backdrop-blur-md">
                          <td className="py-3 px-4 font-bold text-yellow-300 flex items-center gap-1">
                            <span className="animate-pulse text-amber-400">★</span> #482
                          </td>
                          <td className="py-3 px-4">
                            <span className="font-sans font-bold text-yellow-200 text-sm block">
                              {userTwitterHandle ? `@${userTwitterHandle.replace(/^@/, "")}` : "You (Active Auditor)"}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-yellow-400/80 font-mono text-[11px]">
                            {userWalletAddress ? `${userWalletAddress.slice(0, 6)}...${userWalletAddress.slice(-6)}` : "Not connected"}
                          </td>
                          <td className="py-3 px-4 text-right font-bold text-yellow-300">
                            {stakedBalance.toLocaleString()} KP
                          </td>
                          <td className="py-3 px-4 text-right text-emerald-300 font-bold">
                            &lt; 0.01%
                          </td>
                          <td className="py-3 px-4 text-right">
                            <span className="inline-flex px-2 py-0.5 rounded text-[9px] font-bold bg-yellow-400/20 text-yellow-300 border border-yellow-400/30 animate-pulse">
                              Validator Core Node
                            </span>
                          </td>
                        </tr>
                      )}

                      {filteredLeaderboardRows.slice(0, leaderboardVisibleCount).map((entry) => (
                        <tr 
                          key={entry.rank}
                          className={`hover:bg-white/[0.03] transition-colors ${
                            entry.rank <= 3 ? "bg-amber-500/[0.02]" : ""
                          }`}
                        >
                          <td className="py-3 px-4 font-bold">
                            {entry.rank === 1 ? "🥇 #1" : entry.rank === 2 ? "🥈 #2" : entry.rank === 3 ? "🥉 #3" : `#${entry.rank}`}
                          </td>
                          <td className="py-3 px-4">
                            <span className="font-sans font-bold text-white text-sm block">
                              {entry.name}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-slate-500 font-mono text-[11px] hover:text-slate-300 transition-colors">
                            {entry.address.slice(0, 6)}...{entry.address.slice(-6)}
                          </td>
                          <td className="py-3 px-4 text-right font-bold text-amber-400">
                            {entry.staked.toLocaleString()} KP
                          </td>
                          <td className="py-3 px-4 text-right text-emerald-400 font-bold">
                            {entry.share}
                          </td>
                          <td className="py-3 px-4 text-right">
                            <span className={`inline-flex px-2 py-0.5 rounded text-[9px] font-bold ${
                              entry.rank === 1 ? "bg-amber-500/20 text-amber-300 border border-amber-500/30" :
                              entry.rank === 2 ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30" :
                              entry.rank === 3 ? "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30" :
                              entry.status.includes("ACTIVE") ? "bg-purple-500/20 text-purple-300 border border-purple-500/30" :
                              entry.status.includes("BILLIONAIRE") ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30" :
                              "bg-slate-800/50 text-slate-400 border border-slate-700/30"
                            }`}>
                              {entry.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>



              {/* SUSTAINABLE YIELD BUSINESS MODEL */}
              <div className="rounded-2xl border border-white/5 bg-[#07080c]/80 backdrop-blur-xl p-6 sm:p-8 space-y-6 shadow-[0_12px_40px_rgba(0,0,0,0.5)] text-left">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/5 pb-5">
                  <div className="space-y-1">
                    <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest block">
                      🛡️ PROTOCOL TOKENS & REVENUE DESIGN
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black font-display tracking-tight text-white uppercase">
                      Sustainable Value Cycle & Instant Revenue Share
                    </h2>
                    <p className="text-xs text-slate-400 max-w-2xl leading-normal">
                      Zero inflation, zero speculative hype. Karma Score features real-time on-chain revenue loopbacks, instantly distributing protocol proceeds to stakers and buyback-and-burn operations.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setIsWhitepaperView(true);
                    }}
                    className="px-4 py-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/20 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer shrink-0"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    Read Whitepaper
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-1.5 hover:bg-white/[0.02] transition-colors">
                    <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5 font-mono">
                      <Coins className="w-4 h-4" /> 1. INSTANT 50% REVENUE LOOP
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Every priced action—including identity bonding (0.05 SOL) and deep-scan premium investigations (0.08 SOL)—triggers an automated real-time 50% fee split instantly routed to community revenue share pools, driving continuous trading volume and organic market velocity.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-1.5 hover:bg-white/[0.02] transition-colors">
                    <span className="text-xs font-bold text-yellow-500 flex items-center gap-1.5 font-mono">
                      🔥 2. BUY-BACK, BURN & AIRDROPS
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Ecosystem revenues are split into strict cryptographic pools: 15% goes to instant token buyback-and-burn for continuous deflation, and 20% funds token buybacks distributed as instant yield/airdrops directly to SWARM NFT holders and key stakers.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-1.5 hover:bg-white/[0.02] transition-colors">
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 font-mono">
                      🤝 3. 50% COMPANY ALLOCATION
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Stabilized by Vilora Labs, 50% of the corporate equity and governance weight is delegated to the community to manage with care. These parameters remain active indefinitely but can be structurally reclaimed by core development if mismanaged.
                    </p>
                  </div>
                </div>

                {/* BUSINESS MODEL & ROADMAP CTA PANEL */}
                <div className="border-t border-white/5 pt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-5 rounded-xl bg-gradient-to-br from-amber-500/[0.03] to-yellow-500/[0.01] border border-amber-500/10 hover:border-amber-500/20 transition-all flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="p-1 rounded bg-amber-500/10 text-amber-400">
                          <Coins className="w-3.5 h-3.5" />
                        </span>
                        <span className="text-[10px] font-mono font-black text-amber-400 uppercase tracking-widest block">
                          NFT & Staker Yield Model
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-white uppercase font-display tracking-tight">
                        Ecosystem Rev Share & Buyback Projections
                      </h3>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Explore how the 50% instant revenue split automatically fuels buybacks, deflationary burns, and holder rewards to align long-term incentives.
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                      <a
                        href="#revshare"
                        className="flex-1 px-4 py-2.5 bg-gradient-to-r from-amber-500/15 to-yellow-500/15 hover:from-amber-500/25 hover:to-yellow-500/25 text-amber-300 border border-amber-500/30 hover:border-amber-500/50 rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-98"
                      >
                        <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
                        <span>Open Business Model URL</span>
                      </a>
                      <button
                        onClick={downloadBusinessModel}
                        className="px-4 py-2.5 bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
                        title="Download Business Model as Markdown"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download (.md)</span>
                      </button>
                    </div>
                  </div>

                  <div className="p-5 rounded-xl bg-gradient-to-br from-blue-500/[0.03] to-cyan-500/[0.01] border border-blue-500/10 hover:border-blue-500/20 transition-all flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="p-1 rounded bg-blue-500/10 text-blue-400">
                          <Activity className="w-3.5 h-3.5" />
                        </span>
                        <span className="text-[10px] font-mono font-black text-blue-400 uppercase tracking-widest block">
                          Ecosystem Milestones (Active Beta)
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-white uppercase font-display tracking-tight">
                        Ecosystem Roadmap & Live Beta Status
                      </h3>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        We are currently in a live beta testing phase. Learn about our direct milestones since launching the Swarm NFT membership collection.
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                      <a
                        href="#roadmap"
                        className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-500/15 to-cyan-500/15 hover:from-blue-500/25 hover:to-cyan-500/25 text-blue-300 border border-blue-500/30 hover:border-blue-500/50 rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-98"
                      >
                        <Layers2 className="w-3.5 h-3.5 text-blue-400" />
                        <span>Open Roadmap URL</span>
                      </a>
                      <button
                        onClick={downloadRoadmap}
                        className="px-4 py-2.5 bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
                        title="Download Roadmap as Markdown"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download (.md)</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dynamic status helper banner for user */}
              <div className="bg-[#11131c] border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-white block">
                    Want to become the platform's next Trillionaire?
                  </span>
                  <p className="text-[11px] text-slate-400">
                    Stake more Karma Power to unlock premium dividend weightings, rise on the leaderboard, and maximize your share of the quarterly 43 SOL prize pool.
                  </p>
                </div>
                
                <a
                  href="https://www.karmagamez.xyz/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-black font-mono font-black text-[11px] tracking-wider uppercase rounded-lg transition-all shadow-lg cursor-pointer shrink-0 inline-flex items-center gap-1.5 active:scale-95 text-center justify-center"
                >
                  <Gamepad2 className="w-3.5 h-3.5" />
                  Earn Without Initial Capital on KarmaGamez
                </a>
              </div>
            </div>

          </motion.div>
        )}

        {/* NFC KARMA CARD TAB */}
        {activeMainTab === "nfc-card" && (
          <motion.div
            key="nfc-card-tab"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
          >
            <NfcKarmaCardView />
          </motion.div>
        )}

        {/* PREMIUM DUE DILIGENCE AUDIT TAB */}
        {activeMainTab === "premium" && (
          <motion.div
            key="premium-tab"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="space-y-10"
          >
            {/* Premium Header Banner */}
            <div className="text-center max-w-3xl mx-auto space-y-4 pt-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-yellow-500/25 bg-yellow-950/20 text-yellow-400 text-xs font-mono uppercase tracking-widest font-bold">
                <Shield className="w-3.5 h-3.5 text-yellow-400 animate-pulse" />
                Advanced Cross-Chain Forensics & Auditing
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black font-display tracking-tight text-white leading-none">
                Deep-Scan <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500">Premium Audit</span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 font-normal leading-relaxed max-w-xl mx-auto">
                Request custom manual due diligence sweeping for high-value targets or OTC counterparties. Advanced relationship tree mapping and physical verification auditing.
              </p>
            </div>

            {/* Premium Section */}
            <section id="premium" className="rounded-2xl border border-white/5 p-6 sm:p-8 bg-[#0d0d10] text-slate-100 shadow-2xl relative overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-5 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-yellow-500/25 bg-yellow-950/40 text-yellow-400 text-[10px] font-mono uppercase tracking-widest font-bold">
                    Premium Human Investigation
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold font-display text-white">
                    Deep Due Diligence Review
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                    Some high-level risk metrics require manual cross-chain tracing. Submit target wallets for full manual audits handled by certified security researchers and blockchain forensics experts.
                  </p>

                  <div className="p-3.5 rounded-xl bg-yellow-500/5 border border-yellow-500/10 space-y-1">
                    <div className="text-[10px] font-mono text-slate-500 uppercase">Service Cost</div>
                    <div className="text-sm font-mono font-bold text-yellow-400">0.08 SOL <span className="text-slate-500 text-xs font-normal">per investigation</span></div>
                  </div>

                  <div className="space-y-2 pt-1 text-xs font-mono text-slate-400">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-yellow-400"></span> Trace hidden wallets & seed associations
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-yellow-400"></span> Verify doxxing status and physical project teams
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-yellow-400"></span> Multi-hop high-volume transaction tree maps
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-yellow-400"></span> Detailed risk rating scorecard reports
                    </div>
                  </div>
                </div>

                {/* FORM */}
                <div className="lg:col-span-7 bg-black/40 p-5 sm:p-6 rounded-xl border border-slate-900 space-y-4">
                  <form onSubmit={handlePremiumSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-mono text-slate-400 uppercase font-bold">Target Address</label>
                        <input
                          type="text"
                          required
                          placeholder="Enter target EVM or Solana address..."
                          value={premiumForm.walletAddress}
                          onChange={(e) => setPremiumForm({ ...premiumForm, walletAddress: e.target.value })}
                          className="w-full bg-[#13131a] text-white border border-slate-800 focus:border-yellow-400 rounded-xl p-3 text-xs font-mono"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-mono text-slate-400 uppercase font-bold">Your Email Address</label>
                        <input
                          type="email"
                          required
                          placeholder="Enter your security contact email..."
                          value={premiumForm.email}
                          onChange={(e) => setPremiumForm({ ...premiumForm, email: e.target.value })}
                          className="w-full bg-[#13131a] text-white border border-slate-800 focus:border-yellow-400 rounded-xl p-3 text-xs font-mono"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-mono text-slate-400 uppercase font-bold">Investigation Urgency</label>
                        <select
                          value={premiumForm.urgency}
                          onChange={(e) => setPremiumForm({ ...premiumForm, urgency: e.target.value })}
                          className="w-full bg-[#13131a] text-white border border-slate-800 focus:border-yellow-400 rounded-xl p-3 text-xs font-mono"
                        >
                          <option value="standard">Standard Sweep (3-5 Days)</option>
                          <option value="priority">Priority Security Response (Under 24h)</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-mono text-slate-400 uppercase font-bold">Research Context Notes</label>
                        <input
                          type="text"
                          placeholder="e.g. Counterparty risk check, team audit"
                          value={premiumForm.notes}
                          onChange={(e) => setPremiumForm({ ...premiumForm, notes: e.target.value })}
                          className="w-full bg-[#13131a] text-white border border-slate-800 focus:border-yellow-400 rounded-xl p-3 text-xs font-mono"
                        />
                      </div>
                    </div>

                    {/* PREMIUM CYAN-BLUE NEON GLOW SUBMIT BUTTON AS REQUESTED */}
                    <button
                      type="submit"
                      disabled={premiumLoading}
                      className="w-full py-3.5 text-white font-mono font-extrabold text-xs tracking-wider uppercase rounded-xl transition-all cursor-pointer bg-gradient-to-r from-[#20c3ff] to-[#015aff] hover:from-[#35cbff] hover:to-[#1a6bff] shadow-[0_0_20px_rgba(32,195,255,0.45)] disabled:opacity-40"
                    >
                      {premiumLoading ? (
                        <span className="flex flex-col items-center justify-center gap-1">
                          <span className="flex items-center gap-2 justify-center">
                            <Loader2 className="w-4 h-4 animate-spin text-cyan-200" />
                            <span>{premiumStepText || "Initiating Secure Handshake..."}</span>
                          </span>
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-1.5">
                          <Sparkles className="w-4 h-4 text-white" />
                          Pay 0.08 SOL & Request Premium Investigation
                        </span>
                      )}
                    </button>
                  </form>

                  {premiumSuccess && (
                    <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-emerald-400 text-xs font-mono flex items-center gap-2 animate-fade-in">
                      <Check className="w-4 h-4" />
                      Request & 0.08 SOL payment logged successfully. Investigation ID: REQ_{Math.floor(1000 + Math.random() * 9000)}. We will contact you at your email.
                    </div>
                  )}

                  {/* ACTIVE REQUESTS LIST */}
                  {premiumRequests.length > 0 && (
                    <div className="pt-4 border-t border-slate-800/80 space-y-3">
                      <span className="text-[10px] font-mono text-slate-500 uppercase block tracking-wider font-bold">
                        Active Security Investigation Queue ({premiumRequests.length})
                      </span>

                      <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
                        {premiumRequests.map((req: any, idx) => (
                          <div
                            key={idx}
                            className="p-3 bg-[#13131a] border border-slate-850 rounded-xl flex items-center justify-between gap-3 text-xs font-mono"
                          >
                            <div className="truncate flex-1 space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="text-yellow-400 font-bold text-[11px]">{req.id}</span>
                                <span className={`px-1.5 py-0.5 rounded text-[8px] uppercase font-bold ${
                                  req.urgency === 'priority' ? 'bg-amber-950 text-amber-400 border border-amber-500/20' : 'bg-slate-900 text-slate-400'
                                }`}>
                                  {req.urgency}
                                </span>
                              </div>
                              <div className="text-slate-400 truncate text-[10px]">
                                Target: {req.walletAddress}
                              </div>
                            </div>

                            <div className="text-right shrink-0">
                              <span className="inline-flex items-center gap-1.5 text-[10px] uppercase text-amber-400 font-semibold bg-amber-950/20 border border-amber-500/10 px-2 py-0.5 rounded">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                                In Queue
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>
          </motion.div>
        )}

        {/* Highly Polished Swarm NFT Ongoing Mint Card & Button */}
        <div className="max-w-xl mx-auto relative z-20 my-12 px-4">
          <a
            href="https://gravemint.io/mint/FXSVHzLvVFey57U8ETuhHzrzDRT3FhvqzbxWpyoAJA4c"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col sm:flex-row items-center justify-between gap-5 p-5 sm:p-6 rounded-3xl bg-[#080911]/95 hover:bg-[#0f1020]/95 border-2 border-amber-500/40 hover:border-amber-500/80 backdrop-blur-md transition-all duration-300 shadow-[0_0_30px_rgba(245,158,11,0.12)] hover:shadow-[0_0_45px_rgba(245,158,11,0.22)] cursor-pointer relative overflow-hidden"
          >
            {/* Ambient gold glow decoration behind card */}
            <div className="absolute top-0 right-0 w-36 h-36 bg-amber-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-amber-500/15 transition-all duration-300" />
            
            <div className="flex items-center gap-4">
              <div className="relative flex h-3 w-3 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
              </div>
              <div className="text-left">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-mono font-black text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-500 border border-amber-400/30 px-2 py-0.5 rounded-md shrink-0 uppercase tracking-widest shadow-sm">
                    MINT LIVE
                  </span>
                  <span className="text-xs text-slate-500 font-bold">•</span>
                  <span className="text-xs text-amber-400 group-hover:text-amber-300 font-mono font-black tracking-wider uppercase">SWARM NFT</span>
                </div>
                <p className="text-base sm:text-lg text-white font-extrabold tracking-tight font-display mt-1.5 group-hover:text-amber-200 transition-colors">
                  Swarm NFT Ongoing Mint!
                </p>
                <p className="text-xs text-slate-400 font-medium mt-0.5 max-w-sm">
                  Activate elite staker multipliers & boost daily Karma Power rewards instantly.
                </p>
              </div>
            </div>
            <div className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-500 text-slate-950 font-mono text-xs sm:text-sm font-black uppercase tracking-widest transition-all duration-300 shadow-[0_0_20px_rgba(245,158,11,0.25)] group-hover:shadow-[0_0_30px_rgba(245,158,11,0.45)] group-hover:scale-[1.03] active:scale-95 shrink-0">
              <Trophy className="w-4 h-4 sm:w-5 h-5 shrink-0" />
              <span>Mint Now</span>
              <span className="text-[10px] opacity-75 shrink-0 ml-1">→</span>
            </div>
          </a>
        </div>

        {/* GLOBAL HIGH-FIDELITY FOOTER & DECENTRALIZED PARTNERS */}
        <footer className="border-t border-white/5 pt-10 pb-8 mt-16 space-y-8 text-center max-w-5xl mx-auto px-4">
          {/* Partners section */}
          <div className="space-y-3">
            <span className="text-[10px] font-mono font-bold tracking-widest text-slate-500 uppercase block">
              Verified Consensus Partners & Data Indexers
            </span>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 opacity-60 hover:opacity-100 transition-opacity duration-300 text-xs text-slate-400 font-mono">
              {[
                { name: "Solana RPC Node", desc: "Validator" },
                { name: "Ethereum EVM", desc: "Consensus" },
                { name: "Phantom", desc: "Secure Link" },
                { name: "Tensorians", desc: "Metadata" },
                { name: "Backpack Wallet", desc: "xNFT Standard" },
                { name: "GraveMint.io", desc: "Bonded Users" }
              ].map((p, idx) => (
                <div key={idx} className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white/[0.01] border border-white/[0.03]">
                  <span className="font-semibold text-slate-300">{p.name}</span>
                  <span className="text-[9px] text-amber-500 uppercase">({p.desc})</span>
                </div>
              ))}
            </div>
          </div>

          {/* Socials & Documentation Navigation */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-white/5 pt-6">
            <div className="flex items-center gap-3">
              <KarmaLogo className="w-6 h-6 text-slate-400" />
              <div className="text-left">
                <span className="text-xs font-black font-display text-white block uppercase tracking-[0.16em]">Karma Score AI</span>
                <span className="text-[9px] font-mono text-slate-500 block">Sovereign On-Chain AI Reputation Pipeline</span>
              </div>
            </div>

            {/* Middle: Grid of Documentation with View and Download Actions */}
            <div className="flex flex-col items-center gap-4 w-full max-w-2xl mx-auto">
              <span className="text-[10px] font-mono font-bold tracking-widest text-slate-500 uppercase block">
                Ecosystem Documentation & Materials
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full">
                {/* Card 1: Whitepaper */}
                <div className="p-3.5 rounded-xl bg-white/[0.01] border border-white/5 hover:border-amber-500/10 hover:bg-white/[0.02] transition-all flex flex-col justify-between gap-3 text-left">
                  <div>
                    <span className="text-[9px] font-mono font-bold text-amber-400 uppercase tracking-wider block">Official Paper</span>
                    <h4 className="text-xs font-bold text-slate-200 mt-1">Consensus Whitepaper</h4>
                    <p className="text-[10px] text-slate-400 mt-1 leading-normal">Deep dive into our equilibrium design & reputation engine specifications.</p>
                  </div>
                  <div className="flex gap-2">
                    <a
                      href="#whitepaper"
                      className="flex-1 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/20 rounded-lg text-[9px] font-mono font-black uppercase tracking-wider text-center cursor-pointer transition-all flex items-center justify-center"
                    >
                      Open URL
                    </a>
                    <button
                      onClick={downloadWhitepaper}
                      className="px-2.5 py-1.5 bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 rounded-lg text-[9px] font-mono font-bold uppercase transition-all cursor-pointer flex items-center justify-center"
                      title="Download as Markdown"
                    >
                      <Download className="w-3.5 h-3.5 text-slate-400 hover:text-white" />
                    </button>
                  </div>
                </div>

                {/* Card 2: Business Model */}
                <div className="p-3.5 rounded-xl bg-white/[0.01] border border-white/5 hover:border-amber-500/10 hover:bg-white/[0.02] transition-all flex flex-col justify-between gap-3 text-left">
                  <div>
                    <span className="text-[9px] font-mono font-bold text-yellow-500 uppercase tracking-wider block">Economics</span>
                    <h4 className="text-xs font-bold text-slate-200 mt-1">Business & Rev Share</h4>
                    <p className="text-[10px] text-slate-400 mt-1 leading-normal">Explore our platform value architecture & instant fee loopback loops.</p>
                  </div>
                  <div className="flex gap-2">
                    <a
                      href="#revshare"
                      className="flex-1 py-1.5 bg-gradient-to-r from-amber-500/15 to-yellow-500/15 hover:from-amber-500/25 hover:to-yellow-500/25 text-amber-300 border border-amber-500/25 rounded-lg text-[9px] font-mono font-black uppercase tracking-wider text-center cursor-pointer transition-all flex items-center justify-center"
                    >
                      Open URL
                    </a>
                    <button
                      onClick={downloadBusinessModel}
                      className="px-2.5 py-1.5 bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 rounded-lg text-[9px] font-mono font-bold uppercase transition-all cursor-pointer flex items-center justify-center"
                      title="Download as Markdown"
                    >
                      <Download className="w-3.5 h-3.5 text-slate-400 hover:text-white" />
                    </button>
                  </div>
                </div>

                {/* Card 3: Roadmap */}
                <div className="p-3.5 rounded-xl bg-white/[0.01] border border-white/5 hover:border-amber-500/10 hover:bg-white/[0.02] transition-all flex flex-col justify-between gap-3 text-left">
                  <div>
                    <span className="text-[9px] font-mono font-bold text-cyan-400 uppercase tracking-wider block">Milestones</span>
                    <h4 className="text-xs font-bold text-slate-200 mt-1">Roadmap & Beta</h4>
                    <p className="text-[10px] text-slate-400 mt-1 leading-normal">Track our straightforward milestones and future NFC integration.</p>
                  </div>
                  <div className="flex gap-2">
                    <a
                      href="#roadmap"
                      className="flex-1 py-1.5 bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 border border-blue-500/20 rounded-lg text-[9px] font-mono font-black uppercase tracking-wider text-center cursor-pointer transition-all flex items-center justify-center"
                    >
                      Open URL
                    </a>
                    <button
                      onClick={downloadRoadmap}
                      className="px-2.5 py-1.5 bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 rounded-lg text-[9px] font-mono font-bold uppercase transition-all cursor-pointer flex items-center justify-center"
                      title="Download as Markdown"
                    >
                      <Download className="w-3.5 h-3.5 text-slate-400 hover:text-white" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Social Links */}
            <div className="flex items-center gap-3">
              <a
                href="https://x.com/karmascoreai"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                title="X (formerly Twitter)"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://t.me/KarmaScore"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                title="Telegram Community"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 .587c-6.29 0-11.387 5.097-11.387 11.387s5.097 11.387 11.387 11.387 11.387-5.097 11.387-11.387-5.097-11.387-11.387-11.387zm5.244 8.47l-1.854 8.736c-.139.613-.502.763-1.016.475l-2.825-2.083-1.362 1.31c-.15.15-.276.276-.566.276l.202-2.871 5.223-4.717c.227-.202-.05-.314-.353-.111l-6.455 4.062-2.782-.87c-.604-.189-.617-.604.126-.895l10.865-4.187c.503-.189.943.111.796.895z" />
                </svg>
              </a>
              <a
                href="https://discord.gg/BjZTJw6kTb"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-white/5 text-slate-400 hover:text-[#5865F2] hover:bg-[#5865F2]/10 transition-all cursor-pointer"
                title="Discord Community (Public Portal)"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.094 13.094 0 0 1-1.873-.894.077.077 0 0 1-.008-.128c.126-.093.252-.19.372-.287a.075.075 0 0 1 .077-.011c3.92 1.793 8.18 1.793 12.061 0a.073.073 0 0 1 .078.009c.12.099.246.195.373.289a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.156 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.156 2.418z" />
                </svg>
              </a>
              <button
                onClick={() => showToast("Token Gated: You must hold a SWARM NFT to enter the private alpha lounge.", "error")}
                className="p-2 rounded-xl bg-white/5 text-slate-450 hover:text-yellow-400 hover:bg-yellow-400/10 transition-all cursor-pointer flex items-center justify-center relative group"
                title="Locked Premium Discord Lounge (Token Gated)"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.094 13.094 0 0 1-1.873-.894.077.077 0 0 1-.008-.128c.126-.093.252-.19.372-.287a.075.075 0 0 1 .077-.011c3.92 1.793 8.18 1.793 12.061 0a.073.073 0 0 1 .078.009c.12.099.246.195.373.289a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.156 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.156 2.418z" />
                </svg>
                {/* Tiny lock icon overlay */}
                <span className="absolute -top-1.5 -right-1.5 bg-yellow-500 text-slate-950 text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold border-2 border-[#040508] shadow-sm">
                  <Lock className="w-1.5 h-1.5" />
                </span>
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between text-[10px] text-slate-500 font-mono border-t border-white/5 pt-4">
            <span>© 2026 Karma Wallet Score. Premium Web3 reputation intelligence engine.</span>
            <span className="text-slate-600 mt-1 sm:mt-0">Secured cryptographic pipeline node. Standard Multi-Chain SBT Gateway.</span>
          </div>
        </footer>

      </main>

      {/* VERIFIED X CONNECTION MODAL */}
      <AnimatePresence>
        {showLinkXModal && report && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLinkXModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-md bg-[#0d0d10] border border-white/5 rounded-2xl p-6 shadow-2xl space-y-5 z-10 overflow-hidden text-slate-200"
            >
              <div className="flex items-start justify-between border-b border-slate-800/80 pb-3">
                <div className="space-y-0.5">
                  <h3 className="text-sm font-bold text-white tracking-wide flex items-center gap-2">
                    <Twitter className="w-4 h-4 text-yellow-400" />
                    Connect Verified X Profile
                  </h3>
                  <p className="text-[10px] font-mono text-slate-500">
                    Target: {report.address.slice(0, 8)}...{report.address.slice(-8)}
                  </p>
                </div>
                <button
                  onClick={() => setShowLinkXModal(false)}
                  className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition-all text-xs font-mono"
                >
                  ✕
                </button>
              </div>

              <div className="p-3 bg-yellow-950/20 border border-yellow-900/30 rounded-lg text-[11px] text-yellow-300 font-mono leading-relaxed flex items-start gap-2.5">
                <Info className="w-4 h-4 shrink-0 text-yellow-400 mt-0.5" />
                <div>
                  <span className="font-bold text-white block mb-0.5">Verified Accounts Only</span>
                  To maintain universal reputation standards, only accounts possessing active individual (Blue) or business (Gold) X verification are eligible to link profiles.
                </div>
              </div>

              <form onSubmit={handleConnectXSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-slate-400 uppercase">X Handle/Username</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-xs text-slate-500 font-mono font-bold">@</span>
                    <input
                      type="text"
                      required
                      placeholder="username"
                      value={linkXForm.twitterHandle.replace(/^@/, "")}
                      onChange={(e) => setLinkXForm({ ...linkXForm, twitterHandle: e.target.value })}
                      className="w-full bg-[#13131a] text-white border border-slate-800 focus:border-yellow-400 rounded p-2.5 pl-7 text-xs font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-slate-400 uppercase block">Verification Type</label>
                  <div className="grid grid-cols-2 gap-3">
                    {/* Individual Option */}
                    <div
                      onClick={() => setLinkXForm({ ...linkXForm, twitterVerifiedType: "individual" })}
                      className={`p-3 rounded-xl border transition-all cursor-pointer flex flex-col items-center justify-center gap-2 ${
                        linkXForm.twitterVerifiedType === "individual"
                          ? "bg-yellow-500/10 border-yellow-400 text-white"
                          : "bg-black/30 border-slate-800/80 hover:border-slate-700 text-slate-400"
                      }`}
                    >
                      <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center text-[10px] text-black font-extrabold select-none shadow">
                        ✓
                      </div>
                      <span className="text-xs font-bold">Individual</span>
                      <span className="text-[9px] text-slate-500 text-center leading-normal">Blue checkmark credential</span>
                    </div>

                    {/* Business Option */}
                    <div
                      onClick={() => setLinkXForm({ ...linkXForm, twitterVerifiedType: "business" })}
                      className={`p-3 rounded-xl border transition-all cursor-pointer flex flex-col items-center justify-center gap-2 ${
                        linkXForm.twitterVerifiedType === "business"
                          ? "bg-amber-950/10 border-amber-500 text-white"
                          : "bg-black/30 border-slate-800/80 hover:border-slate-700 text-slate-400"
                      }`}
                    >
                      <div className="w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center text-[10px] text-black font-extrabold select-none shadow">
                        ✓
                      </div>
                      <span className="text-xs font-bold text-amber-500">Business</span>
                      <span className="text-[9px] text-slate-500 text-center leading-normal">Gold checkmark credential</span>
                    </div>
                  </div>
                </div>

                {linkXError && (
                  <div className="p-3 rounded-xl bg-red-950/20 border border-red-500/20 text-red-400 text-xs font-mono flex items-start gap-2 animate-fade-in">
                    <AlertTriangle className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
                    <span>{linkXError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={linkXLoading}
                  className="w-full py-2.5 bg-[#F9D806] hover:bg-[#E2BE0F] text-black font-bold font-mono text-xs tracking-wider uppercase rounded shadow transition-all active:scale-[0.99] flex items-center justify-center gap-1.5"
                >
                  {linkXLoading ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      Linking Identity...
                    </>
                  ) : (
                    "Establish Link Profile"
                  )}
                </button>
              </form>

              {linkXSuccess && (
                <div className="p-3 rounded bg-emerald-950/20 border border-emerald-500/30 text-emerald-400 text-xs font-mono flex items-center gap-2 animate-fade-in">
                  <Check className="w-4 h-4" />
                  {linkXSuccess}
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* BUY CUSTOM IDENTITY NAME (ENS SERVICE) MODAL */}
      <AnimatePresence>
        {showChangeNameModal && report && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                if (!isBuyingName) setShowChangeNameModal(false);
              }}
              className="absolute inset-0 bg-black/85 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-md bg-[#0a0a0c] border border-yellow-500/20 rounded-3xl p-6 shadow-2xl space-y-5 z-10 overflow-hidden text-slate-200"
            >
              {/* Decorative top yellow accent line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600" />

              <div className="flex items-start justify-between border-b border-slate-900 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-yellow-400">
                    <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
                    <span className="text-[10px] font-mono tracking-[0.2em] font-extrabold uppercase">Karma Identity Name (ENS)</span>
                  </div>
                  <h3 className="text-base font-black text-white tracking-wide">
                    Buy On-chain Custom Name
                  </h3>
                </div>
                <button
                  disabled={isBuyingName}
                  onClick={() => setShowChangeNameModal(false)}
                  className="p-1 hover:bg-white/5 rounded text-slate-400 hover:text-white transition-all text-xs font-mono disabled:opacity-50"
                >
                  ✕
                </button>
              </div>

              <div className="p-4 bg-yellow-500/5 border border-yellow-500/10 rounded-2xl space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>Registered Wallet Address:</span>
                  <span className="text-yellow-400 font-bold">{report.address.slice(0, 8)}...{report.address.slice(-8)}</span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>Current On-chain Name:</span>
                  <span className="text-white font-bold">{report.experienceLevel || "CHAIN WANDERER"}</span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>Identity Mint Fee:</span>
                  <span className="text-yellow-400 font-extrabold">0.005 SOL</span>
                </div>
              </div>

              {!buyNameSuccess ? (
                <form onSubmit={handlePurchaseName} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-slate-400 uppercase font-extrabold tracking-wider block">Desired Custom Name (ENS Style)</label>
                    <input
                      type="text"
                      required
                      disabled={isBuyingName}
                      placeholder="e.g. SOLANA CHAD, ALPHA BUILDER"
                      value={customNameInput}
                      onChange={(e) => setCustomNameInput(e.target.value)}
                      className="w-full bg-[#111115] text-white border border-slate-800 focus:border-yellow-500/50 rounded-xl p-3 text-xs font-mono placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-yellow-500/20"
                    />
                    <span className="text-[9px] text-slate-500 font-mono block">Supports letters, numbers, and spaces (3-32 characters).</span>
                  </div>

                  {buyNameError && (
                    <div className="p-3 rounded-xl bg-red-950/20 border border-red-500/20 text-red-400 text-[11px] font-mono flex items-start gap-2 animate-fade-in">
                      <AlertTriangle className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
                      <span>{buyNameError}</span>
                    </div>
                  )}

                  {isBuyingName ? (
                    <div className="p-4 bg-slate-950 border border-slate-900 rounded-2xl flex flex-col items-center justify-center space-y-3 py-6">
                      <Loader2 className="w-8 h-8 text-yellow-500 animate-spin" />
                      <span className="text-[11px] font-mono text-yellow-400 tracking-wide font-extrabold uppercase animate-pulse text-center">
                        {buyNameStep}
                      </span>
                    </div>
                  ) : (
                    <button
                      type="submit"
                      className="w-full py-3.5 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-black font-black font-mono text-xs tracking-wider uppercase rounded-xl shadow-lg hover:shadow-yellow-500/10 transition-all active:scale-[0.99] flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Coins className="w-4 h-4 text-black" />
                      <span>Purchase Name (0.005 SOL)</span>
                    </button>
                  )}
                </form>
              ) : (
                <div className="p-6 bg-[#0c0b05] border border-yellow-500/20 rounded-2xl flex flex-col items-center justify-center text-center space-y-3 animate-scale-in">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-xl font-extrabold">
                    ✓
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-white">Identity Name Updated!</h4>
                    <p className="text-xs text-slate-400 font-mono">
                      Transaction signature: 5Gf9...{Math.random().toString(36).substr(2, 6).toUpperCase()}
                    </p>
                    <p className="text-[10px] text-emerald-400 font-mono font-bold">
                      0.005 SOL successfully transferred to escrow.
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* FULL DETAILED REPORT POP-UP OVERLAY */}
      <AnimatePresence>
        {showReportModal && report && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
            {/* Backdrop with elegant blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowReportModal(false)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-5xl h-[85vh] bg-[#070709] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col z-10 text-slate-100"
            >
              {/* Sticky Top Header */}
              <div className="flex items-center justify-between p-4 sm:p-5 border-b border-white/5 bg-[#09090c]/90 sticky top-0 z-20 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <KarmaLogo className="w-10 h-10" />
                  <div className="truncate">
                    <h2 className="text-xs sm:text-sm font-black font-mono tracking-widest uppercase text-yellow-400 flex items-center gap-2">
                      PASSPORT DECODING DOSSIER
                    </h2>
                    <p className="text-[10px] sm:text-xs font-mono text-slate-400 truncate max-w-xs sm:max-w-md">
                      Address: {report.address}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowReportModal(false)}
                  className="px-3 py-1.5 bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white rounded-lg font-mono text-xs font-bold transition-all border border-white/10 cursor-pointer"
                >
                  Close [✕]
                </button>
              </div>

              {/* Scrollable Report Body */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-8 scrollbar-thin">
                
                {/* DYNAMIC RISK WARNING BAR FOR DANGER STATES (<280 SCORE) */}
                {report.score < 280 && (
                  <div className="p-4 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 animate-pulse flex items-start gap-3">
                    <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold font-mono text-xs tracking-wider uppercase text-rose-400">CRITICAL SAFETY THREAT WARNING</h4>
                      <p className="text-xs text-slate-300 mt-1">
                        This passport score is currently flagged as <strong>DANGER</strong>. High likelihood of association with phishing activities, asset drainer protocols, or recent malicious contract behavior. Proceed with extreme caution.
                      </p>
                    </div>
                  </div>
                )}

                {/* VISUAL LAYOUT & ACCURACY METRICS DASHBOARD */}
                <div className="rounded-2xl border border-white/5 p-6 sm:p-8 bg-[#0d0d10] text-slate-100 shadow-2xl">
                  <h2 className="text-sm font-bold font-mono uppercase text-yellow-400 tracking-widest mb-6 flex items-center gap-2 pb-3 border-b border-slate-900">
                    <Dna className="w-4 h-4 text-yellow-400" />
                    On-Chain Reputation Profile & Web3 Dimension Map
                  </h2>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    {/* Left Side: Glowing Radar Spider Chart */}
                    <div className="flex flex-col items-center justify-center p-4 bg-black/30 rounded-xl border border-slate-900">
                      <div className="mb-4 text-center">
                        <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                          Reputation Dimension Map
                        </span>
                        <span className="text-[10px] font-mono text-yellow-400 mt-0.5 inline-block">
                          ✓ Gold/Green polygon tracks volume and exposure indices
                        </span>
                      </div>
                      {renderRadarChart(report)}
                    </div>

                    {/* Right Side: Horizontal Metric Bars */}
                    <div className="space-y-5">
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="text-slate-300 font-bold uppercase">On-Chain Consistency</span>
                          <div className="flex items-center gap-3">
                            <span className="text-slate-400">
                              {Math.max(1, Math.round(( (report.reputationBreakdown.consistency ?? 80) / 100) * 20))}/20
                            </span>
                            <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                              A+
                            </span>
                          </div>
                        </div>
                        <div className="h-2 bg-slate-900 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-emerald-500 rounded-full"
                            style={{ width: `${report.reputationBreakdown.consistency ?? 80}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="text-slate-300 font-bold uppercase">Protocol Diversity</span>
                          <div className="flex items-center gap-3">
                            <span className="text-slate-400">
                              {Math.max(1, Math.round(( (report.reputationBreakdown.protocolReputation ?? 75) / 100) * 17))}/17
                            </span>
                            <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                              A+
                            </span>
                          </div>
                        </div>
                        <div className="h-2 bg-slate-900 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-emerald-500 rounded-full"
                            style={{ width: `${report.reputationBreakdown.protocolReputation ?? 75}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="text-slate-300 font-bold uppercase">DeFi Exposure</span>
                          <div className="flex items-center gap-3">
                            <span className="text-slate-400">
                              {Math.max(1, Math.round(( (report.reputationBreakdown.ecosystemParticipation ?? 70) / 100) * 25))}/25
                            </span>
                            <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                              A+
                            </span>
                          </div>
                        </div>
                        <div className="h-2 bg-slate-900 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-emerald-500 rounded-full"
                            style={{ width: `${report.reputationBreakdown.ecosystemParticipation ?? 70}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="text-slate-300 font-bold uppercase">Wash-Trading check</span>
                          <div className="flex items-center gap-3">
                            {report.score < 400 ? (
                              <>
                                <span className="text-rose-400 font-bold">1/15</span>
                                <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-rose-500/10 border border-rose-500/30 text-rose-400">
                                  F
                                </span>
                              </>
                            ) : (
                              <>
                                <span className="text-slate-400">15/15</span>
                                <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                                  A+
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="h-2 bg-slate-900 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${report.score < 400 ? 'bg-rose-500' : 'bg-emerald-500'}`}
                            style={{ width: report.score < 400 ? '10%' : '100%' }}
                          ></div>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="text-slate-300 font-bold uppercase">Posting & Recency</span>
                          <div className="flex items-center gap-3">
                            <span className="text-slate-400">
                              {Math.max(1, Math.round(( (report.reputationBreakdown.consistency ?? 80) / 100) * 15))}/15
                            </span>
                            <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                              A+
                            </span>
                          </div>
                        </div>
                        <div className="h-2 bg-slate-900 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-emerald-500 rounded-full"
                            style={{ width: `${report.reputationBreakdown.consistency ?? 80}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* OVERALL TRUST & METADATA MATRICES */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="rounded-2xl border border-white/5 p-6 bg-[#0d0d10] text-slate-100 flex flex-col justify-between shadow-2xl">
                    <div>
                      <h3 className="text-xs tracking-widest font-mono text-slate-400 uppercase mb-4 flex items-center gap-2">
                        <Activity className="w-3.5 h-3.5 text-yellow-400" />
                        Overall Trust & Metadata Matrices
                      </h3>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <div className="p-3 bg-[#13131a] border border-slate-800/80 rounded-xl hover:border-slate-700/50 transition-all">
                          <div className="text-xs text-slate-500 font-mono">Overall Trust</div>
                          <div className="text-xl font-bold font-display text-white mt-1">
                            {report.overallTrustScore}%
                          </div>
                          <div className="w-full bg-slate-800 h-1 rounded-full mt-2 overflow-hidden">
                            <div className="h-full bg-yellow-400" style={{ width: `${report.overallTrustScore}%` }}></div>
                          </div>
                        </div>

                        <div className="p-3 bg-[#13131a] border border-slate-800/80 rounded-xl hover:border-slate-700/50 transition-all">
                          <div className="text-xs text-slate-500 font-mono">Risk Rating</div>
                          <div className={`text-xl font-bold font-display mt-1 ${getRiskColor(report.riskRating)}`}>
                            {report.riskRating}
                          </div>
                          <div className="text-[10px] text-slate-500 font-mono mt-2">Verified Index</div>
                        </div>

                        <div className="p-3 bg-[#13131a] border border-slate-800/80 rounded-xl hover:border-slate-700/50 transition-all">
                          <div className="text-xs text-slate-500 font-mono">Community Trust</div>
                          <div className="text-xl font-bold font-display text-white mt-1">
                            {report.communityReputation}%
                          </div>
                          <div className="w-full bg-slate-800 h-1 rounded-full mt-2 overflow-hidden">
                            <div className="h-full bg-teal-400" style={{ width: `${report.communityReputation}%` }}></div>
                          </div>
                        </div>

                        <div className="p-3 bg-[#13131a] border border-slate-800/80 rounded-xl hover:border-slate-700/50 transition-all">
                          <div className="text-xs text-slate-500 font-mono">Security Rating</div>
                          <div className="text-xl font-bold font-display text-white mt-1">
                            {report.securityRating}%
                          </div>
                          <div className="w-full bg-slate-800 h-1 rounded-full mt-2 overflow-hidden">
                            <div className="h-full bg-indigo-400" style={{ width: `${report.securityRating}%` }}></div>
                          </div>
                        </div>
                      </div>

                      {/* Secondary metadata indicators row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4 pt-4 border-t border-slate-800/80">
                        <div>
                          <span className="block text-[10px] font-mono text-slate-500 uppercase">Experience Level</span>
                          <span className="text-sm font-semibold text-white block mt-0.5 truncate">{report.experienceLevel}</span>
                        </div>
                        <div>
                          <span className="block text-[10px] font-mono text-slate-500 uppercase">Wallet Age</span>
                          <span className="text-sm font-semibold text-white block mt-0.5 truncate">{report.walletAge}</span>
                        </div>
                        <div>
                          <span className="block text-[10px] font-mono text-slate-500 uppercase">Activity Consistency</span>
                          <span className="text-sm font-semibold text-white block mt-0.5 truncate">{report.activityConsistency}</span>
                        </div>
                        <div>
                          <span className="block text-[10px] font-mono text-slate-500 uppercase">Network Chain</span>
                          <span className="text-sm font-semibold text-yellow-400 block mt-0.5 truncate flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400"></span>
                            {report.chainType} Protocol
                          </span>
                        </div>
                      </div>

                      {/* ON-CHAIN IDENTITIES & SOCIAL VERIFICATION */}
                      <div className="mt-4 pt-4 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Web3 Name Domain (ENS / Solana Domain) */}
                        <div className="p-3 bg-[#13131a] border border-slate-800/60 rounded-xl flex items-center justify-between gap-3 hover:border-slate-700/50 transition-all">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className="p-1.5 bg-yellow-500/10 rounded border border-yellow-500/20 text-yellow-400 shrink-0">
                              <Globe className="w-3.5 h-3.5" />
                            </div>
                            <div className="min-w-0">
                              <span className="block text-[9px] font-mono text-slate-500 uppercase">Web3 Identity Domain</span>
                              <span className="text-xs font-semibold text-white block mt-0.5 truncate">
                                {report.ensName ? report.ensName : "No domain name bound"}
                              </span>
                            </div>
                          </div>
                          {report.ensName && (
                            <span className="px-2 py-0.5 text-[9px] font-mono font-bold text-emerald-400 border border-emerald-500/20 bg-emerald-950/40 rounded shrink-0">
                              RESOLVED
                            </span>
                          )}
                        </div>

                        {/* Connected X (Twitter) Handle */}
                        <div className="p-3 bg-[#13131a] border border-slate-800/60 rounded-xl flex items-center justify-between gap-3 hover:border-slate-700/50 transition-all">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className="p-1.5 bg-blue-500/10 rounded border border-blue-500/20 text-blue-400 shrink-0">
                              <Twitter className="w-3.5 h-3.5" />
                            </div>
                            <div className="min-w-0">
                              <span className="block text-[9px] font-mono text-slate-500 uppercase">Linked Twitter/X Profile</span>
                              <span className="text-xs font-semibold text-white block mt-0.5 flex items-center gap-1.5 min-w-0 truncate">
                                {report.twitterHandle ? (
                                  <span className="flex items-center gap-1 min-w-0 truncate">
                                    <span className="truncate">{report.twitterHandle}</span>
                                    {report.twitterVerifiedType === "business" && (
                                      <span className="w-3.5 h-3.5 bg-amber-500 rounded-full flex items-center justify-center text-[8px] text-black font-extrabold shrink-0 select-none" title="Verified Business (Gold Checkmark)" style={{ minWidth: "14px" }}>
                                        ✓
                                      </span>
                                    )}
                                    {report.twitterVerifiedType === "individual" && (
                                      <span className="w-3.5 h-3.5 bg-blue-500 rounded-full flex items-center justify-center text-[8px] text-white font-extrabold shrink-0 select-none" title="Verified Individual (Blue Checkmark)" style={{ minWidth: "14px" }}>
                                        ✓
                                      </span>
                                    )}
                                  </span>
                                ) : (
                                  <span className="text-slate-500">No account linked</span>
                                )}
                              </span>
                            </div>
                          </div>

                          <div className="shrink-0">
                            {report.twitterHandle ? (
                              <span className="px-2 py-0.5 text-[9px] font-mono font-bold text-blue-400 border border-blue-500/20 bg-blue-950/40 rounded shrink-0 uppercase">
                                {report.twitterVerifiedType === "business" ? "Business" : "Verified"}
                              </span>
                            ) : (
                              <button
                                onClick={() => {
                                  setShowReportModal(false);
                                  setShowLinkXModal(true);
                                }}
                                className="px-2 py-1 text-[9px] font-mono font-bold text-yellow-400 hover:text-black border border-yellow-500/30 hover:bg-yellow-500 rounded shrink-0 transition-all cursor-pointer"
                              >
                                CONNECT X
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Wallet address label copy row */}
                    <div className="mt-6 p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-mono text-slate-500 uppercase block">Check Wallet Address Target</span>
                        <span className="text-xs font-mono text-yellow-300 break-all select-all font-semibold">
                          {report.address}
                        </span>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <a
                          href={
                            report.chainType === "EVM"
                              ? `https://etherscan.io/address/${report.address}`
                              : `https://solscan.io/account/${report.address}`
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 text-[11px] font-mono bg-slate-800 hover:bg-slate-750 border border-slate-700 rounded text-white transition-all flex items-center gap-1.5"
                        >
                          Explorer
                          <ExternalLink className="w-3 h-3 text-slate-400" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* SECTION 2: AI SUMMARY PANELS & INSTANT SIGNAL CARDS */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* AI REPORT SUMMARY */}
                  <div className="lg:col-span-2 rounded-2xl cyber-panel border-yellow-500/10 p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-4">
                        <h3 className="text-xs tracking-widest font-mono text-slate-400 uppercase flex items-center gap-2">
                          <Cpu className="w-3.5 h-3.5 text-yellow-400" />
                          AI On-Chain Reputation Summary
                        </h3>
                        <span className="px-2 py-0.5 text-[10px] font-mono font-bold text-yellow-400 border border-yellow-500/20 bg-yellow-950/40 rounded animate-pulse">
                          SEC-INTEL V3.5
                        </span>
                      </div>

                      <div className="text-sm leading-relaxed text-slate-300 font-normal space-y-3">
                        <p className="border-l-2 border-yellow-500/50 pl-4 py-1 italic bg-yellow-950/5 rounded-r-lg">
                          "{report.aiSummary}"
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 p-4 rounded-xl bg-yellow-950/10 border border-yellow-900/20 flex items-center gap-3">
                      <div className="p-2 bg-yellow-500/10 rounded border border-yellow-400/20 text-yellow-400">
                        <Shield className="w-4 h-4" />
                      </div>
                      <div className="text-xs">
                        <span className="font-semibold text-white block mb-0.5">Disclaimer Notice</span>
                        <span className="text-slate-400 block">
                          Karma Score is an intelligence tool based on deterministic heuristic analytics and deep AI pattern analysis. It is designed to evaluate probability metrics and is not an endorsement or static guarantee.
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* INSTANT SIGNAL BADGES */}
                  <div className="rounded-2xl cyber-panel border-yellow-500/10 p-6">
                    <h3 className="text-xs tracking-widest font-mono text-slate-400 uppercase mb-4 flex items-center gap-2">
                      <Zap className="w-3.5 h-3.5 text-yellow-400" />
                      Instant Signal Badges
                    </h3>

                    {report.signals.length === 0 ? (
                      <p className="text-slate-500 font-mono text-xs">No special signal flags detected.</p>
                    ) : (
                      <div className="flex flex-wrap gap-2.5">
                        {report.signals.map((sig, idx) => (
                          <div
                            key={idx}
                            className={`px-3 py-1.5 rounded-lg border text-xs flex items-center gap-2 transition-all hover:bg-slate-800/35 group relative cursor-pointer ${getSignalBadgeStyle(
                              sig.level
                            )}`}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-current shrink-0"></span>
                            <span className="font-semibold">{sig.label}</span>
                            
                            {/* Interactive tooltip details */}
                            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-48 p-2 bg-slate-900 border border-slate-700 text-[10px] rounded shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-all z-10 text-slate-300 font-normal">
                              {sig.description}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="mt-6 text-[10px] font-mono text-slate-500 flex items-center gap-1.5 bg-[#090e18] p-3 rounded-lg border border-slate-800/60">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Verified On-Chain Attributes Identified
                    </div>
                  </div>
                </div>

                {/* SECTION 3: REPUTATION BREAKDOWN CHART */}
                <div className="rounded-2xl cyber-panel border-yellow-500/10 p-6">
                  <h3 className="text-xs tracking-widest font-mono text-slate-400 uppercase mb-4 flex items-center gap-2 border-b border-slate-800 pb-3">
                    <Layers className="w-3.5 h-3.5 text-yellow-400" />
                    Reputation Attribute Breakdown (0-100 Gauge)
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Object.entries(report.reputationBreakdown).map(([key, val]) => {
                      const value = val as number;
                      const title = key
                        .replace(/([A-Z])/g, " $1")
                        .replace(/^./, (str) => str.toUpperCase());
                      
                      let grade = "C";
                      let gradeColor = "text-slate-400 border-slate-500 bg-slate-950/10";
                      if (value >= 85) {
                        grade = "A+";
                        gradeColor = "text-emerald-400 border-emerald-500/30 bg-emerald-950/20";
                      } else if (value >= 70) {
                        grade = "B";
                        gradeColor = "text-yellow-400 border-yellow-500/30 bg-yellow-950/20";
                      } else if (value >= 50) {
                        grade = "C";
                        gradeColor = "text-slate-300 border-slate-700 bg-slate-900/20";
                      } else if (value >= 30) {
                        grade = "D";
                        gradeColor = "text-amber-400 border-amber-500/30 bg-amber-950/20";
                      } else {
                        grade = "F";
                        gradeColor = "text-rose-400 border-rose-500/30 bg-rose-950/20";
                      }

                      return (
                        <div key={key} className="p-3 bg-[#080d17]/80 rounded-xl border border-slate-800/80 hover:border-slate-700/60 transition-all flex items-center justify-between gap-4">
                          <div className="flex-1 space-y-1">
                            <span className="text-xs font-semibold text-slate-300 block">{title}</span>
                            <div className="flex items-center gap-2">
                              <div className="flex-1 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-yellow-500 to-amber-400" style={{ width: `${value}%` }}></div>
                              </div>
                              <span className="text-xs font-mono font-semibold text-slate-400">{value}</span>
                            </div>
                          </div>

                          <div className={`w-10 h-10 shrink-0 border rounded-lg flex items-center justify-center font-mono font-bold text-sm ${gradeColor}`}>
                            {grade}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* SECTION 4: SECURITY RISK INTELLIGENCE */}
                <div className="rounded-2xl cyber-panel border-yellow-500/10 p-6">
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-4">
                    <h3 className="text-xs tracking-widest font-mono text-slate-400 uppercase flex items-center gap-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-yellow-400" />
                      Security Risk Intelligence Grades
                    </h3>
                    <span className="text-[10px] font-mono text-slate-500">
                      Total Risks Audited: {report.securityIntelligence.length} Nodes
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {report.securityIntelligence.map((metric, idx) => (
                      <div
                        key={idx}
                        className="p-4 bg-[#080d16] border border-slate-800 hover:border-slate-700 rounded-xl transition-all space-y-2 flex flex-col justify-between"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-xs font-bold text-slate-200">{metric.name}</span>
                          {getSecurityRiskBadge(metric.level)}
                        </div>
                        <p className="text-[11px] text-slate-400 font-mono leading-relaxed">
                          {metric.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* SECTION 5: BEHAVIOR CLASSIFICATIONS & INDICES */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 rounded-2xl cyber-panel border-yellow-500/10 p-6">
                    <h3 className="text-xs tracking-widest font-mono text-slate-400 uppercase mb-4 flex items-center gap-2 border-b border-slate-800 pb-3">
                      <Users className="w-3.5 h-3.5 text-yellow-400" />
                      Behavioral Profile Classifications
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[350px] overflow-y-auto pr-2">
                      {report.behavioralIntelligence.classifications.map((classif, idx) => (
                        <div
                          key={idx}
                          className={`p-3 rounded-xl border transition-all ${
                            classif.active
                              ? "bg-yellow-950/20 border-yellow-500/25 text-white"
                              : "bg-[#070b14]/50 border-slate-800/70 text-slate-400 opacity-60"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className={`w-2 h-2 rounded-full ${classif.active ? 'bg-yellow-400' : 'bg-slate-700'}`}></span>
                              <span className="text-xs font-bold">{classif.name}</span>
                            </div>
                            <span className="text-[10px] font-mono text-slate-500">Affinity Score: {classif.score}%</span>
                          </div>
                          <p className="text-[10px] font-mono text-slate-400 mt-1.5 leading-relaxed">{classif.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl cyber-panel border-yellow-500/10 p-6 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xs tracking-widest font-mono text-slate-400 uppercase mb-6 flex items-center gap-2">
                        <Cpu className="w-3.5 h-3.5 text-yellow-400" />
                        ML Probability Indices
                      </h3>

                      <div className="space-y-6">
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                              <Layers2 className="w-3.5 h-3.5 text-rose-500" /> Sybil / Bot Probability
                            </span>
                            <span className={`text-sm font-mono font-bold ${report.behavioralIntelligence.botProbability > 50 ? 'text-rose-400' : 'text-slate-300'}`}>
                              {report.behavioralIntelligence.botProbability}%
                            </span>
                          </div>
                          <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                            <div
                              className={`h-full transition-all duration-1000 ${
                                report.behavioralIntelligence.botProbability > 70
                                  ? "bg-rose-500"
                                  : report.behavioralIntelligence.botProbability > 30
                                  ? "bg-amber-400"
                                  : "bg-emerald-400"
                              }`}
                              style={{ width: `${report.behavioralIntelligence.botProbability}%` }}
                            ></div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                              <Coins className="w-3.5 h-3.5 text-yellow-400" /> Smart Money Index
                            </span>
                            <span className="text-sm font-mono font-bold text-yellow-400">
                              {report.behavioralIntelligence.smartMoneyProbability}%
                            </span>
                          </div>
                          <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-yellow-400 transition-all duration-1000"
                              style={{ width: `${report.behavioralIntelligence.smartMoneyProbability}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 rounded-lg bg-slate-900 border border-slate-800/80 text-[10px] text-slate-400 font-mono mt-4 leading-relaxed">
                      Behavior is analyzed using deep pattern matching of multi-hop transfer chains and cluster overlap probabilities.
                    </div>
                  </div>
                </div>

                {/* SECTION 6: PORTFOLIO NET WORTH TREND & HOLDINGS */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 rounded-2xl cyber-panel border-yellow-500/10 p-6 space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-3">
                      <h3 className="text-xs tracking-widest font-mono text-slate-400 uppercase flex items-center gap-2">
                        <TrendingUp className="w-3.5 h-3.5 text-yellow-400" />
                        Portfolio Valuation & Net Worth Trend
                      </h3>
                      <div className="text-sm font-semibold text-emerald-400 font-mono">
                        Net Worth: ${(report.portfolio.totalValueUsd).toLocaleString()} USD
                      </div>
                    </div>

                    <div className="h-44 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={report.portfolio.netWorthTrend}>
                          <defs>
                            <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#eab308" stopOpacity={0.25}/>
                              <stop offset="95%" stopColor="#eab308" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <XAxis dataKey="date" stroke="#475569" fontSize={9} fontStyle="mono" />
                          <YAxis
                            stroke="#475569"
                            fontSize={9}
                            fontStyle="mono"
                            tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                          />
                          <Tooltip
                            contentStyle={{ backgroundColor: "#06060a", borderColor: "#eab30833", borderRadius: "8px" }}
                            labelStyle={{ color: "#eab308", fontSize: "10px", fontFamily: "monospace" }}
                            itemStyle={{ color: "#eab308", fontSize: "11px", fontWeight: "bold" }}
                            formatter={(val: number) => [`$${val.toLocaleString()}`, "Valuation"]}
                          />
                          <Area type="monotone" dataKey="value" stroke="#eab308" strokeWidth={2} fillOpacity={1} fill="url(#colorVal)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg">
                        <span className="block text-[10px] text-slate-500 font-mono">Token Diversity</span>
                        <span className="text-xs font-bold text-white mt-1 block truncate">{report.portfolio.tokenDiversity}</span>
                      </div>
                      <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg">
                        <span className="block text-[10px] text-slate-500 font-mono">Stablecoin Alloc</span>
                        <span className="text-xs font-bold text-white mt-1 block truncate">{report.portfolio.stablecoinAllocation}%</span>
                      </div>
                      <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg">
                        <span className="block text-[10px] text-slate-500 font-mono">NFT Allocation</span>
                        <span className="text-xs font-bold text-white mt-1 block truncate">{report.portfolio.nftAllocation}%</span>
                      </div>
                      <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg">
                        <span className="block text-[10px] text-slate-500 font-mono">DeFi Exposure</span>
                        <span className="text-xs font-bold text-white mt-1 block truncate">{report.portfolio.defiExposure}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/5 p-6 bg-[#0d0d10] text-slate-100 flex flex-col justify-between shadow-2xl">
                    <div>
                      <h3 className="text-xs tracking-widest font-mono text-slate-400 uppercase mb-4 flex items-center gap-2">
                        <Coins className="w-3.5 h-3.5 text-yellow-400" />
                        Major Asset Holdings
                      </h3>

                      <div className="space-y-3.5">
                        {report.portfolio.topTokens.map((token, idx) => (
                          <div key={idx} className="space-y-1">
                            <div className="flex items-center justify-between text-xs">
                              <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center font-mono font-extrabold text-[10px] text-yellow-400 shrink-0">
                                  {token.symbol}
                                </div>
                                <span className="font-semibold text-white">{token.name}</span>
                              </div>
                              <span className="font-mono text-slate-400 font-medium">
                                ${token.valueUsd.toLocaleString()}
                              </span>
                            </div>
                            <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                              <div className="h-full bg-yellow-400 rounded-full" style={{ width: `${token.percentage}%` }}></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-xs font-mono text-slate-500">
                      <div>
                        <span className="block text-[10px] uppercase">Gas Spent</span>
                        <span className="text-white font-semibold block mt-0.5">${report.portfolio.gasSpentUsd} USD</span>
                      </div>
                      <div>
                        <span className="block text-[10px] uppercase">Favorite Marketplace</span>
                        <span className="text-white font-semibold block mt-0.5 truncate">{report.portfolio.mostUsedMarketplace}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* SECTION 7: NFT ACCESS UTILITY */}
                <div className="rounded-2xl border border-white/5 p-6 bg-[#0d0d10] text-slate-100 shadow-2xl">
                  <h3 className="text-xs tracking-widest font-mono text-slate-400 uppercase mb-4 flex items-center gap-2 border-b border-slate-800 pb-3">
                    <Compass className="w-3.5 h-3.5 text-yellow-400" />
                    NFT Access Portfolio & Utility Analysis
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {report.nfts.map((nft, idx) => (
                      <div
                        key={idx}
                        className="p-4 bg-[#13131a] border border-slate-800 hover:border-slate-700 rounded-xl transition-all space-y-4 relative"
                      >
                        <div className="absolute top-4 right-4 px-2 py-0.5 text-[10px] font-mono rounded bg-yellow-950/30 border border-yellow-500/20 text-yellow-400 uppercase">
                          Blue-Chip: {nft.blueChipRating}
                        </div>

                        <div className="flex items-start gap-4">
                          <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-yellow-500 to-amber-600 shrink-0 shadow-inner flex items-center justify-center font-bold font-mono text-black text-xs text-center p-1 uppercase">
                            {nft.name.substring(0, 3)} PASS
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-white">{nft.name}</h4>
                            <div className="text-[10px] text-slate-400 mt-1 font-mono flex items-center gap-2">
                              <span>Hold Duration: {nft.holdingDuration}</span>
                              <span>•</span>
                              <span className="text-yellow-400">Rarity: {nft.rarityScore}</span>
                            </div>
                          </div>
                        </div>

                        <div className="p-3 bg-black/40 rounded-lg space-y-1.5 border border-slate-800/50">
                          <div className="text-xs text-slate-300 font-semibold flex items-center gap-1">
                            <Award className="w-3 h-3 text-yellow-400" /> Access Benefits:
                          </div>
                          <p className="text-[11px] text-slate-400 font-mono italic">
                            "{nft.accessBenefits}"
                          </p>
                        </div>

                        <p className="text-xs text-slate-300 leading-relaxed font-normal">
                          {nft.description}
                        </p>

                        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800/80 text-center text-xs">
                          <div>
                            <span className="block text-[10px] font-mono text-slate-500 uppercase">Est. Value</span>
                            <span className="font-mono text-white font-semibold block mt-0.5">${nft.estimatedValueUsd.toLocaleString()}</span>
                          </div>
                          <div>
                            <span className="block text-[10px] font-mono text-slate-500 uppercase">Floor Price</span>
                            <span className="font-mono text-white font-semibold block mt-0.5">{nft.floorPriceEth} SOL/ETH</span>
                          </div>
                          <div>
                            <span className="block text-[10px] font-mono text-slate-500 uppercase">Community Score</span>
                            <span className="font-mono text-emerald-400 font-semibold block mt-0.5">{nft.communityScore}/100</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* SECTION 8: CHRONOLOGICAL TIMELINE */}
                <div className="rounded-2xl border border-white/5 p-6 bg-[#0d0d10] text-slate-100 shadow-2xl">
                  <h3 className="text-xs tracking-widest font-mono text-slate-400 uppercase mb-6 flex items-center gap-2 border-b border-slate-800 pb-3">
                    <Clock className="w-3.5 h-3.5 text-yellow-400" />
                    Wallet On-Chain Chronological Timeline
                  </h3>

                  <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800/80">
                    {report.timeline.map((evt, idx) => (
                      <div key={idx} className="relative space-y-1">
                        <div className="absolute -left-[22px] top-1 w-3.5 h-3.5 rounded-full border border-yellow-400 bg-[#0d0d10] flex items-center justify-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-yellow-400"></div>
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="text-xs font-bold text-white flex items-center gap-2">
                            {evt.title}
                            {evt.amount && (
                              <span className="px-1.5 py-0.2 rounded text-[10px] font-mono font-bold bg-emerald-950 text-emerald-400 border border-emerald-500/20">
                                {evt.amount}
                              </span>
                            )}
                          </span>
                          <span className="text-[10px] font-mono text-slate-500">{evt.date}</span>
                        </div>
                        <p className="text-[11px] text-slate-400 font-mono">{evt.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* SECTION 9: ON-CHAIN RISK RECOMMENDATIONS */}
                <div className="rounded-2xl border border-white/5 p-6 bg-[#0d0d10] text-slate-100 shadow-2xl relative overflow-hidden">
                  <h3 className="text-xs tracking-widest font-mono text-slate-400 uppercase mb-4 flex items-center gap-2 border-b border-slate-800/80 pb-3">
                    <CheckCircle className="w-3.5 h-3.5 text-yellow-400" />
                    On-Chain Risk Recommendations
                  </h3>

                  <div className="space-y-3">
                    {report.recommendations.map((rec, idx) => (
                      <div key={idx} className="p-3 bg-[#13131a] rounded-xl border border-slate-800 flex items-start gap-3">
                        <div className="p-1 bg-yellow-500/10 rounded text-yellow-400 shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <p className="text-xs font-mono text-slate-300 leading-relaxed">{rec}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Sticky Bottom Footer */}
              <div className="p-4 border-t border-white/5 bg-[#09090c]/90 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] sm:text-xs font-mono text-slate-500">
                <span>Karma Index Node v2.1 • Cryptographic Attestation Layer</span>
                <button
                  onClick={() => setShowReportModal(false)}
                  className="w-full sm:w-auto px-6 py-2 bg-yellow-400 hover:bg-yellow-300 text-black font-extrabold uppercase rounded-lg tracking-wider text-xs transition-all active:scale-[0.98] cursor-pointer"
                >
                  Close Passport Details
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* SWARM STAKING MODAL */}
      <AnimatePresence>
        {showSwarmStakingModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
            {/* Backdrop with elegant blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setShowSwarmStakingModal(false);
                setStakingSuccess(false);
              }}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-2xl bg-[#070709] border border-amber-500/20 rounded-2xl shadow-2xl overflow-hidden flex flex-col z-10 text-slate-100"
            >
              {/* Sticky Top Header */}
              <div className="flex items-center justify-between p-4 sm:p-5 border-b border-white/5 bg-[#09090c]/90 sticky top-0 z-20 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-500 rounded-lg shadow-inner">
                    <Coins className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <h2 className="text-xs sm:text-sm font-black font-mono tracking-widest uppercase text-amber-500 flex items-center gap-2">
                      KARMA POWER DECENTRALIZED STAKING
                    </h2>
                    <p className="text-[10px] font-mono text-slate-400">
                      Lock reputation power to secure Karma Power Consensus and earn real-time yields
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setShowSwarmStakingModal(false);
                    setStakingSuccess(false);
                  }}
                  className="px-3 py-1.5 bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white rounded-lg font-mono text-xs font-bold transition-all border border-white/10 cursor-pointer"
                >
                  Close [✕]
                </button>
              </div>

              {/* Scrollable Modal Content */}
              <div className="p-4 sm:p-6 space-y-5 overflow-y-auto max-h-[70vh]">
                
                {/* INFO BOARD */}
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 flex items-start gap-3">
                  <Info className="w-5 h-5 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h4 className="font-bold font-mono text-xs uppercase text-amber-400">Yield Multiplier Active</h4>
                    <p className="text-xs text-slate-300">
                      Your staking yields are directly amplified by your active checked wallet's <strong className="text-amber-200">Karma Wallet Score</strong>. Scanned address: <strong className="text-amber-200">{report ? report.address.slice(0, 8) + "..." + report.address.slice(-8) : "None (Using base weight of 100)"}</strong>.
                    </p>
                  </div>
                </div>

                {/* CURRENT STATS */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-3 bg-[#13131a] border border-slate-800/80 rounded-xl">
                    <span className="block text-[10px] text-slate-500 font-mono uppercase">Your Karma Score</span>
                    <span className="text-lg font-bold font-mono text-white mt-1 block">
                      {report ? report.score : "500"}
                    </span>
                    <span className="text-[10px] text-amber-500 font-mono mt-0.5 block">
                      {(report ? report.score / 100 : 5).toFixed(1)}x multiplier active
                    </span>
                  </div>

                  <div className="p-3 bg-[#13131a] border border-slate-800/80 rounded-xl">
                    <span className="block text-[10px] text-slate-500 font-mono uppercase">Base APY Rate</span>
                    <span className="text-lg font-bold font-mono text-white mt-1 block">
                      12.4% <span className="text-xs text-slate-400">Base</span>
                    </span>
                    <span className="text-[10px] text-emerald-400 font-mono mt-0.5 block">
                      +{( (report ? report.score : 500) * 0.05).toFixed(1)}% Score Boost
                    </span>
                  </div>

                  <div className="p-3 bg-[#13131a] border border-slate-800/80 rounded-xl">
                    <span className="block text-[10px] text-slate-500 font-mono uppercase">Total Karma Power Staked</span>
                    <span className="text-lg font-bold font-mono text-amber-500 mt-1 block">
                      {stakedBalance.toLocaleString()} <span className="text-xs text-slate-400 font-normal">KP</span>
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono mt-0.5 block">
                      Pooled with 18,482 auditors
                    </span>
                  </div>
                </div>

                {/* REAL-TIME ACCRUING REWARD PANEL */}
                <div className="p-5 rounded-xl bg-[#0d0d12] border border-amber-500/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="space-y-1 text-center sm:text-left">
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">
                      ⚡ Pending Accrued Rewards (Real-time block stream)
                    </span>
                    <span className="text-2xl font-mono font-bold text-yellow-400 block tracking-tight">
                      <motion.span
                        key={rewardTally}
                        initial={{ scale: 1.05, color: "#fffbeb", textShadow: "0 0 12px rgba(251, 191, 36, 0.8)" }}
                        animate={{ scale: 1, color: "#facc15", textShadow: "0 0 0px rgba(251, 191, 36, 0)" }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="inline-block"
                      >
                        {rewardTally.toFixed(6)}
                      </motion.span>{" "}
                      <span className="text-xs text-slate-400 font-normal">KP</span>
                    </span>
                    <span className="text-[9px] text-slate-500 font-mono block">
                      Rewards accrue every block (approx. 1 second interval) based on pool shares
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      if (rewardTally <= 0) return;
                      setStakingLoading(true);
                      setTimeout(() => {
                        setStakedBalance((prev) => prev + rewardTally);
                        setRewardTally(0);
                        setStakingLoading(false);
                        showToast("Claim Successful! Your pending Karma Power rewards have been claimed and compounded into your active staked principal balance.", "success");
                      }, 1200);
                    }}
                    disabled={rewardTally <= 0 || stakingLoading}
                    className="w-full sm:w-auto px-5 py-2.5 bg-yellow-400 hover:bg-yellow-300 disabled:opacity-40 disabled:hover:bg-yellow-400 text-black font-extrabold text-xs font-mono rounded-lg transition-all shadow shrink-0 cursor-pointer"
                  >
                    {stakingLoading ? "Processing Claims..." : "Claim & Compound Rewards"}
                  </button>
                </div>

                {/* ACTION FORM: STAKE MORE */}
                <div className="p-5 rounded-xl bg-black/40 border border-slate-800/80 space-y-4">
                  <h4 className="font-mono text-xs uppercase font-bold text-slate-300">
                    Initiate Additional Principal Lock
                  </h4>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-slate-400">Lock Amount (Karma Power)</span>
                      <span className="text-slate-500">Avail: 15,240 KP</span>
                    </div>

                    <div className="relative">
                      <input
                        type="number"
                        min="1"
                        value={stakingAmount}
                        onChange={(e) => setStakingAmount(e.target.value)}
                        className="w-full bg-[#13131a] text-white border border-slate-800 focus:border-amber-400 rounded p-3 pr-16 text-sm font-mono"
                        placeholder="Enter Karma Power amount"
                      />
                      <span className="absolute right-3 top-3 text-xs text-slate-500 font-mono font-bold">
                        KP
                      </span>
                    </div>

                    <div className="grid grid-cols-4 gap-2">
                      {["500", "1000", "5000", "10000"].map((amt) => (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => setStakingAmount(amt)}
                          className="py-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded text-[11px] font-mono transition-all text-slate-300 cursor-pointer"
                        >
                          {parseInt(amt).toLocaleString()}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <button
                      onClick={() => {
                        const amt = parseFloat(stakingAmount);
                        if (isNaN(amt) || amt <= 0) {
                          showToast("Please enter a valid amount to stake.", "error");
                          return;
                        }
                        setStakingLoading(true);
                        setTimeout(() => {
                          setStakedBalance((prev) => prev + amt);
                          setStakingLoading(false);
                          setStakingSuccess(true);
                          showToast(`Successfully locked ${amt.toLocaleString()} KP into the consensus validator pool.`, "success");
                        }, 1500);
                      }}
                      disabled={stakingLoading}
                      className="py-3 bg-amber-500 hover:bg-amber-400 text-black font-bold font-mono text-xs uppercase rounded transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow"
                    >
                      {stakingLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Locking Stake...
                        </>
                      ) : (
                        "🔒 Lock Stake"
                      )}
                    </button>

                    <button
                      onClick={() => {
                        if (stakedBalance <= 0) {
                          showToast("You have no staked balance to unlock.", "error");
                          return;
                        }
                        if (confirm("Are you sure you want to unstake your principal balance? Unlocking now will cease all passive reputation compounding.")) {
                          setStakingLoading(true);
                          setTimeout(() => {
                            setStakedBalance(0);
                            setRewardTally(0);
                            setStakingLoading(false);
                            showToast("Unstaked Successfully! Your principal Karma Power balance has been unstaked and returned to your connected wallet.", "success");
                          }, 1500);
                        }
                      }}
                      disabled={stakingLoading || stakedBalance <= 0}
                      className="py-3 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-400 hover:text-white font-bold font-mono text-xs uppercase rounded transition-all cursor-pointer"
                    >
                      Unlock All Principal
                    </button>
                  </div>

                  {stakingSuccess && (
                    <div className="p-3 rounded bg-emerald-950/20 border border-emerald-500/30 text-emerald-400 text-xs font-mono flex items-center gap-2 animate-fade-in">
                      <Check className="w-4 h-4" />
                      Karma Power Staking position successfully logged. Cryptographic proof hash recorded on-chain.
                    </div>
                  )}
                </div>

                {/* FREQUENTLY ASKED QUESTIONS SUMMARY */}
                <div className="border-t border-slate-950 pt-4 space-y-2">
                  <h4 className="font-mono text-[10px] text-slate-500 uppercase tracking-widest">
                    Staking Rules Made Simple
                  </h4>
                  <div className="text-[11px] text-slate-400 font-mono space-y-1.5 leading-relaxed">
                    <p>• Lock-up time: None! You can take out your staked balance whenever you want.</p>
                    <p>• Score Bonus: If your Karma Score is over 800, you can get up to a 300% reward boost.</p>
                    <p>• Safety first: The staking network is constantly checked to keep everything safe and fair for everyone.</p>
                  </div>
                </div>

              </div>

              {/* Modal Footer */}
              <div className="p-4 border-t border-white/5 bg-[#09090c]/90 text-center text-[10px] font-mono text-slate-500">
                Karma Power Staking Network v3.0 • Verified cryptographic protocol
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* SWARM NFT MINTING MODAL */}
      <AnimatePresence>
        {showMintSwarmNftModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
            {/* Backdrop with elegant blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                if (!isMintingSwarmNft) {
                  setShowMintSwarmNftModal(false);
                }
              }}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-lg bg-[#070709] border-2 border-amber-500/40 rounded-3xl shadow-[0_0_80px_rgba(245,158,11,0.25)] overflow-hidden flex flex-col z-10 text-slate-100"
            >
              {/* Sticky Top Header */}
              <div className="flex items-center justify-between p-4 sm:p-5 border-b border-white/10 bg-[#09090c]/95 sticky top-0 z-20 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-gradient-to-br from-amber-400 to-yellow-600 rounded-xl shadow-inner text-black">
                    <Trophy className="w-5.5 h-5.5" />
                  </div>
                  <div className="text-left">
                    <h2 className="text-base sm:text-lg font-black font-mono tracking-wider uppercase text-amber-500 flex items-center gap-2">
                      MINT SWARM NFT (888 ONLY)
                    </h2>
                    <p className="text-xs font-mono text-emerald-400 font-extrabold animate-pulse">
                      💎 Monthly Revenue/Profit Sharing Active
                    </p>
                  </div>
                </div>
                <button
                  disabled={isMintingSwarmNft}
                  onClick={() => setShowMintSwarmNftModal(false)}
                  className="px-3 py-1.5 bg-white/5 hover:bg-white/15 disabled:opacity-40 text-slate-300 hover:text-white rounded-lg font-mono text-xs font-bold transition-all border border-white/10 cursor-pointer"
                >
                  Close [✕]
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-5 sm:p-6 space-y-6 overflow-y-auto max-h-[75vh]">
                
                {/* NFT Visual Art Card Mockup */}
                <div className="relative group w-64 h-80 mx-auto rounded-xl overflow-hidden border border-amber-500/30 bg-[#0d0d12] shadow-[0_0_25px_rgba(234,179,8,0.15)] flex flex-col items-center justify-between p-4 text-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-yellow-500/5 group-hover:opacity-80 transition-all duration-500" />
                  <div className="absolute top-2 right-2 flex flex-col gap-1 items-end">
                    <span className="text-[8px] font-mono font-black text-amber-400 bg-amber-950/50 border border-amber-500/30 px-1.5 py-0.5 rounded uppercase tracking-wider">
                      888 SUPPLY CAPPED
                    </span>
                    <span className="text-[8px] font-mono font-black text-emerald-400 bg-emerald-950/50 border border-emerald-500/30 px-1.5 py-0.5 rounded uppercase tracking-wider animate-pulse">
                      MONTHLY PROFIT SHARE
                    </span>
                  </div>

                  {/* Art Placeholder with nice abstract design */}
                  <div className="w-full h-44 rounded-lg bg-radial from-amber-950/40 to-black border border-white/5 flex flex-col items-center justify-center relative overflow-hidden group-hover:scale-102 transition-all duration-300">
                    <div className="absolute w-36 h-36 bg-amber-500/5 rounded-full blur-2xl animate-pulse" />
                    <div className="animate-spin" style={{ animationDuration: "12s" }}>
                      <KarmaLogo className="w-16 h-16" />
                    </div>
                    <div className="absolute bottom-2 text-[9px] font-mono text-slate-500">
                      GEN-01 // KARMA_MATRIX
                    </div>
                  </div>

                  {/* NFT Meta Info */}
                  <div className="w-full space-y-1 z-10 text-center">
                    <h3 className="text-sm font-bold font-display text-white tracking-tight">
                      Karma Swarm Staker NFT
                    </h3>
                    <div className="space-y-1 border-t border-white/5 pt-1.5">
                      <div className="flex items-center justify-between text-[9px] font-mono text-slate-400">
                        <span>STAKER YIELD MULTIPLIER:</span>
                        <span className="text-amber-400 font-bold">12.5x</span>
                      </div>
                      <div className="flex items-center justify-between text-[9px] font-mono text-slate-400">
                        <span>REVENUE REWARD SHARE:</span>
                        <span className="text-emerald-400 font-bold">20% Monthly</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Benefits List */}
                <div className="space-y-3.5 bg-gradient-to-b from-slate-900/40 to-slate-950/40 border-2 border-amber-500/30 p-5 rounded-xl text-left">
                  <h4 className="text-xs font-mono font-black text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
                    SWARM NFT UTILITY & ADVANTAGES:
                  </h4>
                  <ul className="text-xs text-slate-200 font-sans space-y-2.5 leading-relaxed">
                    <li className="flex items-start gap-2.5">
                      <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Monthly Revenue/Profit Sharing:</strong> SWARM NFT holders receive direct revenue/profit sharing each month. 20% of all ecosystem revenues & fees are distributed as monthly yield/airdrops.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Strict Scarcity (Just 888 SWARM NFT):</strong> Strictly capped at exactly <strong>888 SWARM NFTs</strong>. No dilution or additional supply ever.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>12.5x Yield Multiplier</strong> applied automatically to your staked Karma Power.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Elite Status Badge</strong> displayed next to your handle on the Trillionaires Leaderboard.</span>
                    </li>
                  </ul>
                </div>

                {/* Mint action */}
                <div className="space-y-3 pt-4 border-t border-white/5">
                  <a
                    href="https://gravemint.io/mint/FXSVHzLvVFey57U8ETuhHzrzDRT3FhvqzbxWpyoAJA4c"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 text-black font-mono font-black text-sm tracking-wider uppercase rounded-xl transition-all cursor-pointer bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 shadow-[0_0_20px_rgba(234,179,8,0.35)] flex items-center justify-center gap-2 active:scale-95 text-center"
                  >
                    <Sparkles className="w-5 h-5 animate-pulse" />
                    Mint Swarm NFT
                  </a>

                  {isMintingSwarmNft && (
                    <div className="text-center">
                      <p className="text-xs font-mono text-amber-400 animate-pulse">
                        {swarmNftMintStep}
                      </p>
                    </div>
                  )}
                </div>

              </div>

              {/* Modal Footer */}
              <div className="p-4 border-t border-white/5 bg-[#09090c]/90 text-center text-[10px] font-mono text-slate-500">
                Karma Swarm Protocol • Non-custodial secure smart contracts
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* VERIFIED CROWDS LOOKUP MODAL */}
      <AnimatePresence>
        {showVerifiedCrowdsModal && (
          <div className="fixed inset-0 z-55 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowVerifiedCrowdsModal(false)}
              className="absolute inset-0 bg-black/85 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-lg bg-[#0d0d10] border border-purple-500/20 rounded-2xl p-6 shadow-2xl space-y-4 z-50 overflow-hidden text-slate-200"
            >
              {/* Decorative top bar */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500" />

              <div className="flex items-start justify-between border-b border-slate-800/80 pb-3">
                <div className="space-y-0.5 text-left">
                  <h3 className="text-sm font-bold text-white tracking-wide flex items-center gap-2">
                    <Search className="w-4 h-4 text-purple-400" />
                    Bonded Users & Sandboxes
                  </h3>
                  <p className="text-[10px] font-mono text-slate-500">
                    Search and instantly check pre-bonded blockchain accounts
                  </p>
                </div>
                <button
                  onClick={() => setShowVerifiedCrowdsModal(false)}
                  className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition-all text-xs font-mono cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* Search Bar Input */}
              <div className="relative">
                <Search className="absolute left-3 top-3.5 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  value={verifiedSearchQuery}
                  onChange={(e) => setVerifiedSearchQuery(e.target.value)}
                  placeholder="Type end name, handle, or address to filter..."
                  className="w-full bg-[#06060a]/80 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/50 font-mono"
                  autoFocus
                />
              </div>

              {/* Results List */}
              <div className="max-h-[280px] overflow-y-auto space-y-1.5 pr-1 scrollbar-thin scrollbar-thumb-purple-500/20 scrollbar-track-transparent">
                {VERIFIED_CROWDS.filter((ex) => {
                  const q = verifiedSearchQuery.toLowerCase();
                  return (
                    ex.name.toLowerCase().includes(q) ||
                    ex.address.toLowerCase().includes(q) ||
                    ex.chain.toLowerCase().includes(q)
                  );
                }).length === 0 ? (
                  <div className="text-center py-8 text-xs text-slate-500 font-mono">
                    No bonded users match "{verifiedSearchQuery}"
                  </div>
                ) : (
                  VERIFIED_CROWDS.filter((ex) => {
                    const q = verifiedSearchQuery.toLowerCase();
                    return (
                      ex.name.toLowerCase().includes(q) ||
                      ex.address.toLowerCase().includes(q) ||
                      ex.chain.toLowerCase().includes(q)
                    );
                  }).map((ex) => (
                    <button
                      key={ex.address}
                      onClick={() => {
                        handleDecode(ex.address);
                        setShowVerifiedCrowdsModal(false);
                      }}
                      className="w-full text-left p-3 rounded-xl border border-slate-900 bg-[#06060a]/40 hover:bg-purple-950/10 hover:border-purple-500/30 transition-all flex items-center justify-between gap-3 group cursor-pointer"
                    >
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-white group-hover:text-purple-300 transition-colors truncate">
                          {ex.name}
                        </div>
                        <div className="text-[10px] font-mono text-slate-500 group-hover:text-slate-400 transition-colors truncate mt-0.5">
                          {ex.address}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[9px] font-mono text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded uppercase tracking-wider">
                          {ex.chain}
                        </span>
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${getTierColor(ex.tier)}`}>
                          {ex.score}
                        </span>
                      </div>
                    </button>
                  ))
                )}
              </div>

              {/* Modal Footer */}
              <div className="pt-2 text-center border-t border-slate-900">
                <span className="text-[9px] font-mono text-slate-500">
                  Select any user above to instantly load and check on-chain audit streams.
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CONNECT WALLET MODAL */}
      <AnimatePresence>
        {showConnectWalletModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowConnectWalletModal(false)}
              className="absolute inset-0 bg-black/85 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-md bg-[#0d0d10] border border-white/5 rounded-2xl p-6 shadow-2xl space-y-6 z-10 overflow-hidden text-slate-200"
            >
              {/* Decorative border line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600" />

              <div className="flex items-start justify-between border-b border-slate-800/80 pb-3">
                <div className="space-y-0.5">
                  <h3 className="text-sm font-bold text-white tracking-wide flex items-center gap-2">
                    <svg className="w-4 h-4 text-yellow-400 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Connect Web3 Wallet
                  </h3>
                  <p className="text-[10px] font-mono text-slate-500">
                    Secure handshake for Soulbound Identity Passport
                  </p>
                </div>
                <button
                  onClick={() => setShowConnectWalletModal(false)}
                  className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition-all text-xs font-mono"
                >
                  ✕
                </button>
              </div>

              <div className="p-3 bg-yellow-950/20 border border-yellow-900/30 rounded-lg text-[11px] text-yellow-300 font-mono leading-relaxed flex items-start gap-2.5">
                <Info className="w-4 h-4 shrink-0 text-yellow-400 mt-0.5" />
                <div>
                  <span className="font-bold text-white block mb-0.5">Passport Identity Bonding</span>
                  To permanently bind your checked Reputation Passport card, you must execute a soulbound transaction. Bonding requires a network-level treasury fee of <strong className="text-white">0.05 SOL</strong> for Solana, or <strong className="text-white">$5 EVM equivalent</strong>.
                </div>
              </div>

              {isConnectingWallet ? (
                <div className="py-8 flex flex-col items-center justify-center space-y-4 text-center">
                  <Loader2 className="w-8 h-8 animate-spin text-yellow-400" />
                  <div className="space-y-1">
                    <p className="text-xs font-mono text-white tracking-wider uppercase animate-pulse">
                      Handshaking with {isConnectingWallet} Wallet...
                    </p>
                    <p className="text-[10px] text-slate-500 font-mono">
                      Please confirm the connection request in your extension window
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3.5 pt-1">
                  {/* Solana Wallet Connection Button */}
                  <button
                    onClick={() => handleConnectWallet("Solana")}
                    className="w-full p-4 rounded-xl bg-slate-900/90 hover:bg-black border border-slate-800 hover:border-purple-500/40 text-left transition-all flex items-center justify-between group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-purple-950/40 border border-purple-500/20 flex items-center justify-center text-purple-400 font-black text-xs shrink-0 font-mono">
                        SOL
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white group-hover:text-purple-400 transition-colors">Solana Wallet</h4>
                        <p className="text-[10px] text-slate-400 font-mono mt-0.5">Phantom, Solflare, Backpack • 0.05 SOL Bond</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-purple-400 transition-all group-hover:translate-x-1" />
                  </button>

                  {/* EVM Wallet Connection Button */}
                  <button
                    onClick={() => handleConnectWallet("EVM")}
                    className="w-full p-4 rounded-xl bg-slate-900/90 hover:bg-black border border-slate-800 hover:border-amber-500/40 text-left transition-all flex items-center justify-between group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-950/40 border border-amber-500/20 flex items-center justify-center text-amber-400 font-black text-xs shrink-0 font-mono">
                        EVM
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors">EVM Wallet</h4>
                        <p className="text-[10px] text-slate-400 font-mono mt-0.5">MetaMask, Rainbow, Coinbase Wallet • $5 Bond</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition-all group-hover:translate-x-1" />
                  </button>
                </div>
              )}

              {/* Modal Footer */}
              <div className="pt-2 text-center text-[10px] font-mono text-slate-500">
                Secured by decentralized cryptographic consensus
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* DECENTRALIZED PASSPORT BONDING OVERLAY MODAL */}
      <AnimatePresence>
        {bondingModalState !== "hidden" && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop with strong blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/95 backdrop-blur-md"
            />

            {/* Immersive Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 180 }}
              className="relative w-full max-w-lg bg-[#07070b] border border-yellow-500/20 rounded-3xl p-8 shadow-[0_0_50px_rgba(234,179,8,0.15)] z-10 overflow-hidden text-slate-200 text-center space-y-6"
            >
              {/* Rotating background particles / energy lines */}
              <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
                <div className="absolute -inset-[50%] bg-[radial-gradient(circle_at_center,rgba(234,179,8,0.15)_0,transparent_60%)] animate-[spin_20s_linear_infinite]" />
              </div>

              {/* Decorative top gold border */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600" />

              {/* STAGE 1: Check Wallet Popup */}
              {bondingModalState === "check_wallet" && (
                <div className="space-y-6 relative z-10 py-6">
                  {/* Concentric pulsing rings with holographic lock */}
                  <div className="flex items-center justify-center relative">
                    <div className="absolute w-28 h-28 rounded-full border border-yellow-500/10 animate-ping" />
                    <div className="absolute w-24 h-24 rounded-full border border-yellow-500/20 animate-pulse" />
                    <div className="absolute w-20 h-20 rounded-full bg-yellow-500/5 border border-yellow-500/30 flex items-center justify-center" />
                    
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-500/20 to-amber-500/10 border border-yellow-500/40 flex items-center justify-center text-yellow-400 shadow-lg relative">
                      <Loader2 className="w-8 h-8 text-yellow-400 animate-spin absolute" />
                      <Lock className="w-5 h-5 text-yellow-400" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[10px] font-mono tracking-[0.3em] font-black text-yellow-400 uppercase">Handshake Verification</span>
                    <h3 className="text-xl font-black font-display text-white tracking-wide uppercase">
                      Check Your Wallet Extension
                    </h3>
                    <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed font-sans">
                      A secure connection request has been sent to your <strong className="text-white">{bondingWalletChain} Wallet</strong>. Please authorize the handshake to proceed with passport bonding.
                    </p>
                  </div>

                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.02] border border-white/5 text-[10px] font-mono text-slate-400">
                    <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
                    Awaiting Cryptographic Signature...
                  </div>
                </div>
              )}

              {/* STAGE 2: Minting and Bonding */}
              {bondingModalState === "bonding" && (
                <div className="space-y-6 relative z-10 py-4">
                  {/* Rotating 3D DNA / Quantum Orbit Animation */}
                  <div className="flex items-center justify-center">
                    <div className="relative w-32 h-32 flex items-center justify-center">
                      {/* Rotating Outer Track */}
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                        className="absolute inset-0 rounded-full border-2 border-dashed border-yellow-500/20"
                      />
                      {/* Counter-Rotating Inner Track */}
                      <motion.div 
                        animate={{ rotate: -360 }}
                        transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
                        className="absolute p-4 inset-3 rounded-full border-2 border-dashed border-amber-500/30"
                      />
                      {/* Holographic Spinning Card Core */}
                      <motion.div
                        animate={{ scale: [1, 1.05, 1], rotateY: [0, 180, 360] }}
                        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                        className="w-16 h-20 bg-gradient-to-br from-yellow-500/20 via-amber-500/10 to-transparent border border-yellow-500/40 rounded-xl flex items-center justify-center text-yellow-400 shadow-xl"
                      >
                        <Fingerprint className="w-8 h-8 text-yellow-500 animate-pulse" />
                      </motion.div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <span className="text-[10px] font-mono tracking-[0.3em] font-black text-yellow-400 uppercase">SBT Mint Protocol</span>
                    <h3 className="text-xl font-black font-display text-white tracking-wide uppercase flex items-center justify-center gap-2">
                      <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
                      BONDING REPUTATION PASSPORT
                    </h3>
                    <p className="text-xs text-yellow-400 font-mono tracking-wide bg-yellow-500/5 border border-yellow-500/10 rounded-xl py-2.5 max-w-md mx-auto animate-pulse">
                      {bondingStepText}
                    </p>
                  </div>

                  {/* Progress Line */}
                  <div className="max-w-xs mx-auto space-y-1">
                    <div className="h-1 w-full bg-slate-900 rounded-full overflow-hidden border border-white/5">
                      <motion.div 
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 7, ease: "easeInOut" }}
                        className="h-full bg-gradient-to-r from-yellow-500 to-amber-500"
                      />
                    </div>
                    <div className="flex justify-between text-[9px] font-mono text-slate-500">
                      <span>SIGNING</span>
                      <span>MINTING</span>
                      <span>ANCHORING</span>
                    </div>
                  </div>
                </div>
              )}

              {/* STAGE 3: Success */}
              {bondingModalState === "success" && (
                <div className="space-y-6 relative z-10 py-6">
                  {/* Epic success badge */}
                  <div className="flex items-center justify-center">
                    <motion.div 
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", damping: 15 }}
                      className="w-20 h-20 rounded-full bg-emerald-500/10 border-2 border-emerald-500 flex items-center justify-center text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.2)]"
                    >
                      <ShieldCheck className="w-10 h-10 text-emerald-400" />
                    </motion.div>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[10px] font-mono tracking-[0.3em] font-black text-emerald-400 uppercase">Transaction Finalized</span>
                    <h3 className="text-2xl font-black font-display text-white tracking-wide uppercase">
                      PASSPORT BOUND!
                    </h3>
                    <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
                      Your dynamic Reputation Passport has been permanently anchored to your wallet address as a non-transferable Soulbound SBT certificate.
                    </p>
                  </div>

                  <div className="p-4 bg-emerald-950/10 border border-emerald-500/20 rounded-2xl max-w-sm mx-auto space-y-1.5 text-left font-mono text-[10px]">
                    <div className="flex justify-between text-slate-400">
                      <span>Status:</span>
                      <span className="text-emerald-400 font-bold">Ledger Verified</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Authority:</span>
                      <span className="text-white">Karma Dynamic Indexer</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Contract:</span>
                      <span className="text-yellow-400 truncate max-w-[180px]">KarmaSBT_v3_Secured</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Transaction ID:</span>
                      <span className="text-slate-300">KarmaTx_{Math.random().toString(36).substr(2, 8).toUpperCase()}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setBondingModalState("hidden");
                      setIsBondingFlowAfterConnect(false);
                    }}
                    className="px-8 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black font-black font-mono text-xs tracking-wider uppercase rounded-xl shadow-lg transition-all active:scale-[0.98] cursor-pointer"
                  >
                    Enter Dynamic Dashboard
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* WHITEPAPER MODAL POPUP */}
      <AnimatePresence>
        {isWhitepaperView && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto bg-black/95 backdrop-blur-md"
          >
            <div className="min-h-screen py-6 sm:py-12">
              <Whitepaper onClose={() => setIsWhitepaperView(false)} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* BUSINESS MODEL & STAKEHOLDER PROJECTIONS MODAL */}
      <AnimatePresence>
        {isBusinessModelView && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-black/90 backdrop-blur-md">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsBusinessModelView(false)}
              className="absolute inset-0 cursor-pointer"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-2xl bg-[#09090d] border border-amber-500/20 rounded-2xl p-6 sm:p-8 shadow-[0_0_50px_rgba(234,179,8,0.15)] z-10 overflow-y-auto max-h-[90vh] text-slate-200 space-y-6 scrollbar-thin scrollbar-thumb-amber-500/10"
            >
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-black text-amber-400 uppercase tracking-widest block">📊 Platform Economics</span>
                  <h3 className="text-lg sm:text-xl font-bold text-white uppercase font-display tracking-tight">
                    Business Model & Revenue Share (Rev Share)
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={downloadBusinessModel}
                    className="px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/20 hover:border-amber-500/40 text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1 transition-all cursor-pointer"
                    title="Download Business Model as Markdown file"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Download (.md)</span>
                  </button>
                  <button
                    onClick={() => setIsBusinessModelView(false)}
                    className="w-8 h-8 rounded-full border border-white/5 bg-white/[0.02] hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer text-sm"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Business Model Overview */}
              <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
                <div className="p-4 rounded-xl bg-amber-500/[0.02] border border-amber-500/10 space-y-2">
                  <h4 className="font-bold text-amber-300 font-display uppercase tracking-wide flex items-center gap-2">
                    <Coins className="w-4 h-4" /> Core Value Architecture
                  </h4>
                  <p className="text-slate-400 leading-normal text-xs">
                    Karma Score AI is designed to convert live Web3 reputation metrics into structured software-as-a-service (SaaS) utility. By reading decentralized actions in real time, the platform acts as an institutional trust layer for the Solana and EVM landscapes.
                  </p>
                </div>

                {/* Structured Revenue Streams */}
                <div className="space-y-3">
                  <h4 className="font-bold text-white uppercase text-xs tracking-wider">Revenue Stream Breakdown:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5 space-y-1">
                      <span className="text-[10px] font-mono font-black text-yellow-500 block">01. REPUTATION-AS-A-SERVICE (RaaS)</span>
                      <p className="text-slate-400 text-xs">
                        External launchpads, dApps, and DeFi portals query the Karma engine. Minor stablecoin charges (e.g., 0.05 USDC) are accrued on every automated status validation.
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5 space-y-1">
                      <span className="text-[10px] font-mono font-black text-emerald-400 block">02. SOULBOUND SBT VERIFICATIONS</span>
                      <p className="text-slate-400 text-xs">
                        Users who want to record their Karma scores on-chain mint a non-transferable Soulbound passport, paying a nominal mint processing fee in native stablecoins.
                      </p>
                    </div>
                  </div>
                </div>

                {/* NFT Stakeholder Projections */}
                <div className="space-y-4 pt-2">
                  <h4 className="font-bold text-white uppercase text-xs tracking-wider flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-amber-400" /> Decentralized Revenue Share & Buyback Protocol
                  </h4>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    Our utility business model utilizes an <strong>instant on-chain revenue share (rev share) loopback</strong>. Payouts are executed in real time: whenever any user utilizes the Karma AI Wallet Score platform for identity bonding (0.05 SOL), premium forensic deep-scans (0.08 SOL), or any other priced transaction, a full <strong>50% share</strong> of all fees is instantly routed to the community rev share protocol, creating continuous daily trading volume and holding incentives.
                  </p>

                  <div className="p-3.5 rounded-xl bg-amber-500/[0.03] border border-amber-500/10 space-y-2">
                    <span className="text-[10px] font-mono font-black text-amber-400 uppercase tracking-widest block">⚡ Instant Value Distribution Strategy</span>
                    <p className="text-slate-400 text-xs leading-normal">
                      The 50% community allocation is programmatically split to fuel two core pillars:
                    </p>
                    <ul className="list-disc list-inside text-xs text-slate-300 space-y-1 pl-1">
                      <li><strong className="text-yellow-400">15% Instant Buyback & Burn:</strong> Transferred straight to a null address for permanent deflationary supply contraction of the native token.</li>
                      <li><strong className="text-yellow-400">20% Buybacks & Airdrops:</strong> Used to buy back liquidity and distribute direct on-chain token airdrops to SWARM NFT holders and reciprocal community stakers.</li>
                    </ul>
                    <p className="text-[11px] text-slate-500 italic pt-1 leading-normal">
                      *Note: While core developers reserve the structural right to adapt these parameters during technical upgrades to ensure protocol safety, these terms are currently stabilized by Vilora Labs. Vilora Labs has officially committed 50% of the entire ecosystem and corporate equity weight directly to the community to manage with care—with the strict provision that governance rights can be reclaimed if mistreated or governed unproductively.
                    </p>
                  </div>
                  
                  {/* Revenue Distribution Breakdown */}
                  <div className="border border-white/5 rounded-xl overflow-hidden text-xs bg-slate-950/40">
                    <div className="grid grid-cols-3 bg-white/[0.03] p-3 font-mono font-bold border-b border-white/5 text-slate-400 text-[10px] tracking-wider uppercase">
                      <div>Revenue Channel</div>
                      <div className="text-center">Allocation %</div>
                      <div className="text-right">Primary Recipient / Action</div>
                    </div>
                    <div className="grid grid-cols-3 p-3 border-b border-white/5">
                      <div className="font-bold text-amber-300">Instant Buyback & Burn</div>
                      <div className="text-center font-mono">15%</div>
                      <div className="text-right text-slate-400">Permanent Deflationary Contract Burn</div>
                    </div>
                    <div className="grid grid-cols-3 p-3 border-b border-white/5">
                      <div className="font-bold text-yellow-400">NFT & Community Airdrops</div>
                      <div className="text-center font-mono">20%</div>
                      <div className="text-right text-slate-400">Direct Buyback distributed to NFT holders & stakers</div>
                    </div>
                    <div className="grid grid-cols-3 p-3 border-b border-white/5">
                      <div className="font-bold text-blue-300">Ecosystem & Infrastructure</div>
                      <div className="text-center font-mono">50%</div>
                      <div className="text-right text-slate-400">Vilora Labs Node Scaling & Indexer optimization</div>
                    </div>
                    <div className="grid grid-cols-3 p-3">
                      <div className="font-bold text-slate-300">Core Maintenance & Auditing</div>
                      <div className="text-center font-mono">15%</div>
                      <div className="text-right text-slate-400">Forensics Security Team & Operational Overhead</div>
                    </div>
                  </div>
                </div>

                {/* Straightforward Projection Model */}
                <div className="space-y-3 pt-2 border-t border-white/5">
                  <h4 className="font-bold text-white uppercase text-xs tracking-wider">
                    Volume-Based Yield Projections (Sample Scenario)
                  </h4>
                  <p className="text-slate-400 text-xs">
                    We maintain a strict anti-inflation and utility-focused stance. We do not provide unrealistic, speculative, or guaranteed yield rates. The table below represents straightforward scenarios based purely on active query and badging volumes:
                  </p>

                  <div className="border border-white/5 rounded-xl overflow-hidden text-[11px] bg-slate-950/60 font-mono">
                    <div className="grid grid-cols-4 bg-white/[0.03] p-3 font-bold border-b border-white/5 text-slate-400 text-[10px] tracking-wider uppercase">
                      <div>Annual Fees</div>
                      <div className="text-center text-yellow-500">15% Token Burn</div>
                      <div className="text-center text-amber-400">20% NFT Share</div>
                      <div className="text-right text-emerald-400">Total Community (35%)</div>
                    </div>
                    <div className="grid grid-cols-4 p-3 border-b border-white/5 text-slate-300">
                      <div>$182,500 USDC</div>
                      <div className="text-center text-yellow-500/80">$27,375</div>
                      <div className="text-center text-amber-400/80">$36,500</div>
                      <div className="text-right text-emerald-400 font-bold">$63,875</div>
                    </div>
                    <div className="grid grid-cols-4 p-3 border-b border-white/5 text-slate-300">
                      <div>$912,500 USDC</div>
                      <div className="text-center text-yellow-500/80">$136,875</div>
                      <div className="text-center text-amber-400/80">$182,500</div>
                      <div className="text-right text-emerald-400 font-bold">$319,375</div>
                    </div>
                    <div className="grid grid-cols-4 p-3 text-slate-300">
                      <div>$4,562,500 USDC</div>
                      <div className="text-center text-yellow-500/80">$684,375</div>
                      <div className="text-center text-amber-400/80">$912,500</div>
                      <div className="text-right text-emerald-400 font-bold">$1,596,875</div>
                    </div>
                  </div>
                  
                  <div className="text-[10px] text-slate-500 italic font-mono leading-relaxed bg-slate-950 p-3 rounded-lg border border-white/5">
                    *Disclaimer: Projections are mathematical models based on potential product adoption levels and do not represent a guarantee of earnings. Realized returns fluctuate depending on live RaaS integration, active dApp volume, and Solana/EVM network transaction velocity. Always evaluate blockchain technologies with a clear focus on core software utility.
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 flex justify-end">
                <button
                  onClick={() => setIsBusinessModelView(false)}
                  className="px-5 py-2.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/20 rounded-xl text-xs font-mono font-bold cursor-pointer transition-colors"
                >
                  Close & Return
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* PROJECT ROADMAP MODAL */}
      <AnimatePresence>
        {isRoadmapView && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-black/90 backdrop-blur-md">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsRoadmapView(false)}
              className="absolute inset-0 cursor-pointer"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-2xl bg-[#07070b] border border-blue-500/20 rounded-2xl p-6 sm:p-8 shadow-[0_0_50px_rgba(59,130,246,0.15)] z-10 overflow-y-auto max-h-[90vh] text-slate-200 space-y-6 scrollbar-thin scrollbar-thumb-blue-500/10"
            >
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-black text-blue-400 uppercase tracking-widest block">🧪 Live Ecosystem Status</span>
                  <h3 className="text-lg sm:text-xl font-bold text-white uppercase font-display tracking-tight flex items-center gap-2">
                    <Layers2 className="w-5 h-5 text-blue-400" />
                    Project Roadmap & Beta Phase
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={downloadRoadmap}
                    className="px-3 py-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 border border-blue-500/20 hover:border-blue-500/40 text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1 transition-all cursor-pointer"
                    title="Download Roadmap as Markdown file"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Download (.md)</span>
                  </button>
                  <button
                    onClick={() => setIsRoadmapView(false)}
                    className="w-8 h-8 rounded-full border border-white/5 bg-white/[0.02] hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer text-sm"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Status Alert */}
              <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-500/20 text-xs sm:text-sm text-slate-300 leading-relaxed space-y-1.5">
                <div className="flex items-center gap-2 text-blue-300 font-bold font-mono">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-ping shrink-0" />
                  CURRENT STATUS: LIVE BETA TEST PHASE
                </div>
                <p className="text-slate-400 text-xs leading-normal">
                  Our indexer architecture, leaderboards, and scoring pipelines are fully functional and currently operating in their initial public beta testing phase to stress-test algorithms and optimize cross-chain latency.
                </p>
              </div>

              {/* Swarm NFT Focus */}
              <div className="p-4 rounded-xl bg-[#0c0c14] border border-slate-800/80 space-y-3">
                <span className="text-[9px] font-mono font-bold text-cyan-400 uppercase block tracking-wider">👥 Building Core Membership</span>
                <h4 className="text-xs sm:text-sm font-bold text-white uppercase">The SWARM NFT Collection Rollout</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  We recently initiated the launch of the **Swarm NFT Collection** specifically to establish high-conviction core membership, expand decentralization, and secure early validator nodes. We emphasize practical technology utility: our NFTs act as functional staker passes and custom visual identity multipliers rather than empty speculative tools.
                </p>
                <div className="pt-1">
                  <a
                    href="https://gravemint.io/mint/FXSVHzLvVFey57U8ETuhHzrzDRT3FhvqzbxWpyoAJA4c"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 hover:from-cyan-500/20 hover:to-blue-500/20 text-cyan-300 hover:text-cyan-200 border border-cyan-500/20 hover:border-cyan-400/40 text-[10px] font-mono font-bold uppercase tracking-wider transition-all shadow-[0_4px_12px_rgba(6,182,212,0.05)] cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                    Mint Swarm NFT
                  </a>
                </div>
              </div>

              {/* Roadmap Timeline */}
              <div className="space-y-4">
                <h4 className="font-bold text-xs font-mono uppercase tracking-widest text-slate-400">Straightforward Milestones:</h4>
                <div className="space-y-3 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
                  
                  {/* Milestone 1 */}
                  <div className="flex gap-4 items-start relative pl-8">
                    <span className="absolute left-1.5 top-1.5 w-3.5 h-3.5 rounded-full border border-blue-500 bg-blue-500/20 flex items-center justify-center font-mono text-[8px] font-black text-blue-300 shadow-glow" />
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono font-bold text-slate-500 block uppercase">Phase 1 — Current Milestones</span>
                      <h5 className="text-xs sm:text-sm font-bold text-white uppercase">Indexer Beta Validation & X-Profile Bonding</h5>
                      <p className="text-xs text-slate-400 leading-normal">
                        Stress-test algorithmic calculations across 2,000+ test wallets. Enable verified X account bindings to correlate reputation footprints securely and without data leakage.
                      </p>
                    </div>
                  </div>

                  {/* Milestone 2 */}
                  <div className="flex gap-4 items-start relative pl-8">
                    <span className="absolute left-1.5 top-1.5 w-3.5 h-3.5 rounded-full border border-slate-700 bg-slate-900 flex items-center justify-center font-mono text-[8px] font-black text-slate-400" />
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono font-bold text-slate-500 block uppercase">Phase 2 — Up Next</span>
                      <h5 className="text-xs sm:text-sm font-bold text-white uppercase">Swarm NFT Evolve Party (2026-2027)</h5>
                      <p className="text-xs text-slate-400 leading-normal">
                        An exclusive interactive customizer event happening between 2026 and 2027. Swarm NFT stakers and collection holders can merge metadata, configure visual elements, and evolve their profile assets live.
                      </p>
                    </div>
                  </div>

                  {/* Milestone 3 */}
                  <div className="flex gap-4 items-start relative pl-8">
                    <span className="absolute left-1.5 top-1.5 w-3.5 h-3.5 rounded-full border border-slate-700 bg-slate-900 flex items-center justify-center font-mono text-[8px] font-black text-slate-400" />
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono font-bold text-slate-500 block uppercase">Phase 3 — Expansion</span>
                      <h5 className="text-xs sm:text-sm font-bold text-white uppercase">Finish Live Testing (Will Announce)</h5>
                      <p className="text-xs text-slate-400 leading-normal">
                        Finalize extensive multi-chain stress testing and protocol indexer verification. The official completion and live developer API routes will be announced to the community soon.
                      </p>
                    </div>
                  </div>

                  {/* Milestone 4 */}
                  <div className="flex gap-4 items-start relative pl-8">
                    <span className="absolute left-1.5 top-1.5 w-3.5 h-3.5 rounded-full border border-slate-700 bg-slate-900 flex items-center justify-center font-mono text-[8px] font-black text-slate-400" />
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono font-bold text-slate-500 block uppercase">Phase 4 — Distribution</span>
                      <h5 className="text-xs sm:text-sm font-bold text-white uppercase">ZK VAULT INTEGRATIONS & FEE LOOPBACK ACTIVATION</h5>
                      <p className="text-xs text-slate-400 leading-normal">
                        Deploy zero-knowledge DeFi credit audit smart contracts. Distribute accumulated RaaS micro-fees to active locked Karma Power (KP) stakers and validator members automatically.
                      </p>
                    </div>
                  </div>

                   {/* Milestone 5 */}
                  <div className="flex gap-4 items-start relative pl-8">
                    <span className="absolute left-1.5 top-1.5 w-3.5 h-3.5 rounded-full border border-slate-700 bg-slate-900 flex items-center justify-center font-mono text-[8px] font-black text-slate-400" />
                    <div className="space-y-2">
                      <div>
                        <span className="text-[10px] font-mono font-bold text-slate-500 block uppercase">Phase 5 — Launch</span>
                        <h5 className="text-xs sm:text-sm font-bold text-white uppercase">NFC Card Lift Off</h5>
                        <p className="text-xs text-slate-400 leading-normal">
                          Kick off full production, provisioning, and distribution of physical Karma NFC cards. Users can instantly swipe cards to prove their credentials offline via cryptographic signatures.
                        </p>
                      </div>

                      {/* Ecosystem Credits Card */}
                      <div className="mt-3 p-3.5 rounded-xl bg-gradient-to-br from-[#0c0e17] to-[#0d1222] border border-blue-500/10 space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider">Vilora Labs Incubated</span>
                        </div>
                        <p className="text-[11px] text-slate-400 leading-relaxed">
                          Karma Score is a product proudly incubated and built by <a href="https://ViloraLabs.xyz" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline font-semibold">ViloraLabs.xyz</a>. We are proud member holders of the <a href="https://uglyducksociety.tech" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:text-amber-300 underline font-semibold">Ugly Duck Society</a> and public verified member on X & CT Space. Check out our builds to see what we are shaping next in decentralized reputation.
                        </p>
                        <div className="flex items-center gap-2 pt-1 flex-wrap">
                          <a
                            href="https://ViloraLabs.xyz"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[9px] font-mono font-bold text-blue-300 bg-blue-500/5 hover:bg-blue-500/15 border border-blue-500/20 px-2 py-0.5 rounded transition-all"
                          >
                            <ExternalLink className="w-2.5 h-2.5" />
                            ViloraLabs
                          </a>
                          <a
                            href="https://uglyducksociety.tech"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[9px] font-mono font-bold text-amber-300 bg-amber-500/5 hover:bg-amber-500/15 border border-amber-500/20 px-2 py-0.5 rounded transition-all"
                          >
                            <ExternalLink className="w-2.5 h-2.5" />
                            Ugly Duck Society
                          </a>
                          <span className="text-[9px] text-slate-500 font-mono">
                            ✍️ X & CT Space
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              <div className="pt-4 border-t border-white/5 flex justify-end">
                <button
                  onClick={() => setIsRoadmapView(false)}
                  className="px-5 py-2.5 bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 border border-blue-500/20 rounded-xl text-xs font-mono font-bold cursor-pointer transition-colors"
                >
                  Close & Return
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Back to Top Floating Button */}
      <AnimatePresence>
        {isScrolled && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 left-6 md:left-auto md:right-6 z-[9998] flex items-center justify-center w-10 h-10 rounded-full bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/35 hover:border-amber-500/60 shadow-[0_4px_20px_rgba(245,158,11,0.15)] backdrop-blur-xl transition-all cursor-pointer"
            title="Scroll to Top"
            id="back-to-top-fab"
          >
            <ChevronUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-[9999] flex items-center gap-3 bg-[#0d1220]/95 border border-slate-700/80 rounded-2xl px-5 py-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl max-w-sm"
          >
            <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${
              toast.type === "success" ? "bg-emerald-400 animate-pulse" :
              toast.type === "error" ? "bg-rose-500" : "bg-blue-400 animate-pulse"
            }`} />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-mono font-bold text-white leading-normal">{toast.message}</p>
            </div>
            <button
              onClick={() => setToast(null)}
              className="text-slate-500 hover:text-white font-extrabold text-[11px] cursor-pointer pl-1 shrink-0"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
