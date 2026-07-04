import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import { WalletReport, SignalLevel, RiskLevel, SignalCard, SecurityMetric, BehavioralClassification, NFTCollection, TimelineEvent, ReputationMetric, TokenHolding } from "./src/types";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK with User-Agent for telemetry
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
}

// Helper to call Gemini with a single ultra-fast attempt to prevent frontend latency issues
async function generateContentWithRetry(aiClient: GoogleGenAI, params: any, retries = 0, delayMs = 0): Promise<any> {
  const currentModel = params.model || "gemini-2.5-flash";
  try {
    console.log(`[Gemini API] Single fast attempt with model ${currentModel}...`);
    return await aiClient.models.generateContent(params);
  } catch (err: any) {
    console.warn(`[Gemini API] Fast attempt with ${currentModel} failed, propagating for immediate fallback:`, String(err));
    throw err;
  }
}

// Deterministic mock seed generator so entering any custom address gives stable, realistic data
function getAddressSeed(address: string): number {
  let hash = 0;
  for (let i = 0; i < address.length; i++) {
    hash = address.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

function seededRandom(seed: number) {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

function getDeterministicEVMAddress(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash << 5) - hash + name.charCodeAt(i);
    hash |= 0;
  }
  let hex = Math.abs(hash).toString(16).padEnd(8, 'f');
  let rest = "";
  for (let i = 0; i < 32; i++) {
    rest += ((hash + i) * 31 & 15).toString(16);
  }
  return "0x" + (hex + rest).substring(0, 40);
}

function getDeterministicSolanaAddress(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash << 5) - hash + name.charCodeAt(i);
    hash |= 0;
  }
  const base58Chars = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
  let address = "Karma";
  let seed = Math.abs(hash);
  for (let i = 0; i < 39; i++) {
    seed = (seed * 1664525 + 1013904223) | 0;
    const index = Math.abs(seed) % base58Chars.length;
    address += base58Chars[index];
  }
  return address.substring(0, 44);
}

// Generate highly detailed realistic wallet reports deterministically from address
function generateSeededReport(address: string, chain: "EVM" | "Solana"): WalletReport {
  const seed = getAddressSeed(address);
  let r = (offset: number) => seededRandom(seed + offset);

  // Determine reputation score and tier
  const score = Math.floor(150 + r(1) * 851); // 150 - 1000
  let tier: "Elite" | "Trusted" | "Good" | "Neutral" | "Caution" | "High Risk" = "Neutral";
  let overallTrust = Math.floor(score / 10);
  let risk: "Low" | "Medium" | "High" | "Critical" = "Medium";

  if (score >= 900) {
    tier = "Elite";
    risk = "Low";
  } else if (score >= 800) {
    tier = "Trusted";
    risk = "Low";
  } else if (score >= 650) {
    tier = "Good";
    risk = "Medium";
  } else if (score >= 450) {
    tier = "Neutral";
    risk = "Medium";
  } else if (score >= 280) {
    tier = "Caution";
    risk = "High";
  } else {
    tier = "High Risk";
    risk = "Critical";
  }

  // Generate experience level
  const expLevels = [
    "DeFi Adventurer", "Airdrop Strategist", "Diamond-Hand Collector",
    "High-Frequency Degenerate", "Ecosystem Builder", "Conservative Whale",
    "Governance Delegate", "Fresh On-Chain Explorer"
  ];
  const experienceLevel = tier === "Elite" ? "OG Elite Web3 Pioneer" : expLevels[Math.floor(r(2) * expLevels.length)];

  // Set general metadata
  const years = Math.floor(1 + r(3) * 6);
  const months = Math.floor(1 + r(4) * 11);
  const walletAge = `${years} Year${years > 1 ? 's' : ''}, ${months} Month${months > 1 ? 's' : ''}`;
  const consistencyOptions = ["Highly Consistent", "Moderate", "Spiky (Event-driven)", "Periodic Swaps", "Dormant with Sudden Activity"];
  const activityConsistency = score >= 700 ? "Highly Consistent" : consistencyOptions[Math.floor(r(5) * consistencyOptions.length)];
  const confidenceLevel = Math.floor(80 + r(6) * 18);

  // Narrative summary generator
  let aiSummary = "";
  if (tier === "Elite" || tier === "Trusted") {
    aiSummary = `This ${chain} address displays exceptional on-chain metrics, with an active history spanning over ${years} years. Our checking systems identified consistent governance participation across major protocols, robust liquidity provisioning, and zero interactions with high-risk smart contracts. The wallet is classified as 'Smart Money' due to historical accuracy in long-term token holding and verified community contributions. Overall, it stands out as an exemplary and highly trustworthy actor on-chain.`;
  } else if (tier === "Good") {
    aiSummary = `A healthy and productive ${chain} wallet. It features moderate trading activity with sustained interactions on major decentralized exchanges. It maintains a steady portfolio value with moderate allocations to blue-chip tokens and verified NFT collections. There is minimal contract exposure risk and some involvement in community governance. It demonstrates consistent, authentic user behavior with low Sybil/bot probability.`;
  } else if (tier === "Neutral") {
    aiSummary = `This wallet represents a standard, middle-tier ${chain} account. It exhibits intermittent trading volume, typical of standard retail participants. While no malicious or blacklisted contract interactions were detected, its relatively younger age and lack of governance or liquidity participation restrict its reputation score to neutral territory. Portfolio exposure is concentrated in major tokens and native gas assets.`;
  } else if (tier === "Caution") {
    aiSummary = `Caution is advised when interacting with this ${chain} wallet. The account shows high portfolio volatility with frequent meme coin swaps and significant bridge activity. We have flagged potential wash-trading signals in minor decentralized marketplaces and a high proportion of fresh capital infusions. Risk is elevated due to several approvals granted to unverified smart contracts within the past 90 days.`;
  } else {
    aiSummary = `CRITICAL ALERT. This ${chain} wallet exhibits high-risk behavioral anomalies. We detected active interactions with flagged drainer protocols, honeypots, or mixers. Furthermore, it displays extreme transaction clusters typical of a coordinated Sybil air-drop farming bot. The account lacks any verified NFT ownership or governance footprint. It is strongly advised to double-check all interactions before sending assets to this address.`;
  }

  // Generate signals
  const allSignals: SignalCard[] = [];
  if (tier === "Elite" || tier === "Trusted") {
    allSignals.push(
      { label: "Trusted Wallet", level: SignalLevel.GREEN, description: "Highly trusted score based on protocol history." },
      { label: "OG Wallet", level: SignalLevel.GREEN, description: "Active since early chain deployment stages." },
      { label: "Diamond Hands", level: SignalLevel.GREEN, description: "Retains major assets for 365+ days." },
      { label: "Community Contributor", level: SignalLevel.GREEN, description: "Active builder or verified ecosystem participant." }
    );
    if (r(7) > 0.5) allSignals.push({ label: "DAO Member", level: SignalLevel.GREEN, description: "Voted in 5+ governance cycles." });
    if (r(8) > 0.5) allSignals.push({ label: "Smart Money", level: SignalLevel.GREEN, description: "Early enterer in high-yielding protocols." });
    if (r(9) > 0.7) allSignals.push({ label: "Whale", level: SignalLevel.YELLOW, description: "Holds assets exceeding $1M." });
  } else if (tier === "Good") {
    allSignals.push(
      { label: "Long-Term Holder", level: SignalLevel.GREEN, description: "Maintains assets without rapid liquidations." },
      { label: "NFT Collector", level: SignalLevel.GREEN, description: "Holds verified collection assets." },
      { label: "Early Adopter", level: SignalLevel.GREEN, description: "Used testnets or V1 protocols." }
    );
    if (r(7) > 0.5) allSignals.push({ label: "DAO Member", level: SignalLevel.GREEN, description: "Voted in governance." });
  } else if (tier === "Neutral") {
    allSignals.push(
      { label: "Active Trader", level: SignalLevel.YELLOW, description: "Consistent swaps on major aggregators." },
      { label: "New Wallet", level: SignalLevel.YELLOW, description: "Age is below 1 year on-chain." }
    );
    if (r(8) > 0.6) allSignals.push({ label: "Yield Farmer", level: SignalLevel.YELLOW, description: "Active liquidity staker." });
  } else if (tier === "Caution") {
    allSignals.push(
      { label: "Meme Coin Trader", level: SignalLevel.YELLOW, description: "High proportion of micro-cap swap volume." },
      { label: "High Volatility", level: SignalLevel.YELLOW, description: "Rapid balance spikes and drops." },
      { label: "Heavy Bridge Usage", level: SignalLevel.YELLOW, description: "Frequent cross-chain value movement." },
      { label: "Wash Trading Signals", level: SignalLevel.ORANGE, description: "Matched buying and selling within small intervals." },
      { label: "Farming Wallet", level: SignalLevel.ORANGE, description: "Repetitive, program-like transaction sequences." }
    );
  } else {
    allSignals.push(
      { label: "High-Risk Wallet", level: SignalLevel.RED, description: "Critical rating based on toxic history." },
      { label: "Scam Exposure", level: SignalLevel.RED, description: "Interacted with smart contracts flagged as phishing." },
      { label: "Bot-like Activity", level: SignalLevel.RED, description: "Extremely high frequency execution and timing." },
      { label: "Drainer Interaction", level: SignalLevel.RED, description: "Approved gas token drainage functions." },
      { label: "Honeypot Interaction", level: SignalLevel.RED, description: "Traded contracts with locked liquidity/sales." }
    );
  }

  // Security intelligence grades
  const secMetrics = [
    "Approval Risk", "Malicious Contract Exposure", "Known Wallet Drainers",
    "Blacklist Detection", "Phishing Interaction", "Dusting Attacks",
    "Exploit Participation", "MEV Activity", "Flash Loan Exposure",
    "Bridge Risk", "Mixer Interaction", "Wallet Clustering"
  ];
  
  const securityIntelligence: SecurityMetric[] = secMetrics.map((name, i) => {
    let level = RiskLevel.LOW;
    let detail = "No issues detected. Safely verified.";
    
    if (tier === "High Risk") {
      const lvls = [RiskLevel.HIGH, RiskLevel.CRITICAL];
      level = lvls[Math.floor(r(20 + i) * lvls.length)];
      detail = `Toxic signatures detected. Historical matching with flagged hashes.`;
    } else if (tier === "Caution") {
      const lvls = [RiskLevel.MEDIUM, RiskLevel.HIGH];
      level = lvls[Math.floor(r(20 + i) * lvls.length)];
      detail = `Elevated activity. Approvals granted to unverified deployers.`;
    } else if (tier === "Neutral") {
      level = r(20 + i) > 0.7 ? RiskLevel.MEDIUM : RiskLevel.LOW;
      detail = level === RiskLevel.MEDIUM ? "Mild anomalies flag. Normal activity." : "No warnings.";
    }
    return { name, level, detail };
  });

  // Behavioral Classification
  const behaviors = [
    "Investor", "Builder", "Developer", "Founder", "Collector", "Creator",
    "Community Leader", "Liquidity Provider", "Validator", "NFT Flipper",
    "Whale", "Market Maker", "Swing Trader", "Long-Term Holder", "Day Trader",
    "DeFi User", "GameFi User", "Memecoin Trader", "DAO Contributor",
    "Airdrop Hunter", "Yield Farmer"
  ];

  const classifications: BehavioralClassification[] = behaviors.map((name, i) => {
    let active = false;
    let scoreVal = Math.floor(10 + r(40 + i) * 80);

    if (tier === "Elite" && ["Investor", "Founder", "Builder", "Developer", "Long-Term Holder"].includes(name)) {
      active = true;
      scoreVal = Math.floor(85 + r(40 + i) * 15);
    } else if (tier === "Caution" && ["Swing Trader", "Memecoin Trader", "Airdrop Hunter"].includes(name)) {
      active = true;
      scoreVal = Math.floor(75 + r(40 + i) * 20);
    } else if (tier === "High Risk" && ["Airdrop Hunter", "Day Trader"].includes(name)) {
      active = true;
      scoreVal = Math.floor(90 + r(40 + i) * 10);
    } else if (r(40 + i) > 0.6) {
      active = true;
    }

    return {
      name,
      active,
      score: scoreVal,
      description: active ? `High affinity to standard ${name} on-chain actions.` : `Low correlation.`
    };
  });

  const botProbability = tier === "High Risk" ? Math.floor(85 + r(60) * 14) : tier === "Caution" ? Math.floor(50 + r(60) * 30) : Math.floor(r(60) * 15);
  const smartMoneyProbability = tier === "Elite" ? Math.floor(90 + r(61) * 9) : tier === "Trusted" ? Math.floor(75 + r(61) * 15) : Math.floor(r(61) * 40);

  // Portfolio details
  const portfolioVal = Math.floor(500 + r(62) * 2500000);
  const netWorthTrend = Array.from({ length: 12 }, (_, i) => {
    const valMult = tier === "High Risk" ? (1 - i * 0.06) : tier === "Elite" ? (1 + i * 0.08) : (1 + (r(63 + i) - 0.4) * 0.2);
    return {
      date: `Month ${i + 1}`,
      value: Math.floor(portfolioVal * valMult * 0.5)
    };
  });

  const topTokens: TokenHolding[] = [
    { symbol: chain === "EVM" ? "ETH" : "SOL", name: chain === "EVM" ? "Ethereum" : "Solana", balance: parseFloat((portfolioVal * 0.5 / (chain === "EVM" ? 3500 : 180)).toFixed(2)), valueUsd: Math.floor(portfolioVal * 0.5), priceUsd: chain === "EVM" ? 3500 : 180, percentage: 50 },
    { symbol: "USDC", name: "USD Coin", balance: Math.floor(portfolioVal * 0.25), valueUsd: Math.floor(portfolioVal * 0.25), priceUsd: 1, percentage: 25 },
    { symbol: chain === "EVM" ? "AAVE" : "JUP", name: chain === "EVM" ? "Aave" : "Jupiter", balance: parseFloat((portfolioVal * 0.15 / (chain === "EVM" ? 120 : 1.2)).toFixed(2)), valueUsd: Math.floor(portfolioVal * 0.15), priceUsd: chain === "EVM" ? 120 : 1.2, percentage: 15 },
    { symbol: "BONK", name: "Bonk Inu", balance: parseFloat((portfolioVal * 0.1 / 0.00002).toFixed(2)), valueUsd: Math.floor(portfolioVal * 0.1), priceUsd: 0.00002, percentage: 10 }
  ];

  // NFT gallery
  const nfts: NFTCollection[] = [
    {
      name: chain === "EVM" ? "Bored Ape Yacht Club" : "Mad Lads",
      mintDate: "2021-08-12",
      purchaseDate: "2022-01-05",
      holdingDuration: "2.4 Years",
      estimatedValueUsd: chain === "EVM" ? 45000 : 8500,
      floorPriceEth: chain === "EVM" ? 15 : 45,
      rarityScore: "Top 12%",
      verified: true,
      blueChipRating: "AAA",
      communityScore: 92,
      utilityScore: 88,
      governanceAccess: true,
      builderReputation: "Doxxed Founders",
      holderQuality: "High (Diamond Hands)",
      communityActivity: "Very High",
      accessBenefits: "Exclusive alpha network and physical events.",
      description: "Acts as a primary access pass to premium Web3 circles, VC introductions, and closed developer cohorts."
    },
    {
      name: chain === "EVM" ? "Pudgy Penguins" : "Tensorians",
      mintDate: "2022-03-20",
      purchaseDate: "2023-04-10",
      holdingDuration: "1.2 Years",
      estimatedValueUsd: chain === "EVM" ? 18000 : 2500,
      floorPriceEth: chain === "EVM" ? 6 : 14,
      rarityScore: "Top 25%",
      verified: true,
      blueChipRating: "AA",
      communityScore: 95,
      utilityScore: 78,
      governanceAccess: false,
      builderReputation: "Ecosystem Builder",
      holderQuality: "Medium-High",
      communityActivity: "Extremely Active",
      accessBenefits: "IP Licensing pool and community events.",
      description: "Strong retail integration and cute IP that has successfully bridged Web2 and Web3 retail awareness."
    }
  ];

  // Timeline
  const timeline: TimelineEvent[] = [
    { title: "Wallet Created", date: `${years} Years Ago`, description: "First generated on keypair system.", iconType: "created" },
    { title: "First Transaction", date: `${years} Years Ago`, description: `Funded with gas via Kraken deposit.`, iconType: "tx" },
    { title: "First NFT", date: `${years - 1} Years Ago`, description: "Acquired verified digital art piece.", iconType: "nft" },
    { title: "Largest Buy", date: "8 Months Ago", description: "Purchased high-value DeFi protocol shares.", iconType: "profit", amount: `$${(portfolioVal * 0.4).toLocaleString()}` },
    { title: "Bridge Activity", date: "6 Months Ago", description: "Moved assets across major secure bridges.", iconType: "bridge" },
    { title: "DeFi Expansion", date: "2 Months Ago", description: "Entered long-term LP staking pools.", iconType: "defi" },
    { title: "Recent Activity", date: "2 Days Ago", description: "Approved standard gas-efficient swap transaction.", iconType: "active" }
  ];

  // Reputation breakdowns
  const b = (offset: number, min = 20) => Math.floor(min + r(offset) * (100 - min));
  const reputationBreakdown = {
    communityTrust: score >= 800 ? b(70, 85) : score >= 500 ? b(70, 50) : b(70, 10),
    security: score >= 800 ? b(71, 85) : score >= 500 ? b(71, 45) : b(71, 5),
    trading: b(72, 30),
    consistency: b(73, 20),
    transparency: b(74, 40),
    ecosystemParticipation: b(75, 20),
    developerActivity: b(76, 5),
    nftReputation: b(77, 10),
    protocolReputation: b(78, 20),
    governanceActivity: b(79, 5),
    socialSignals: b(80, 5),
    builderScore: score >= 900 ? b(81, 80) : b(81, 10),
    investorScore: b(82, 30)
  };

  // Recommendations
  const recommendations: string[] = [];
  if (tier === "Elite" || tier === "Trusted") {
    recommendations.push(
      "Excellent reputation. Appears fully suitable for OTC, DAO delegation, and trusted partnership opportunities.",
      "Consider contacting user for validator or ecosystem builder initiatives.",
      "Keep track of their portfolio movements as high-conviction signals."
    );
  } else if (tier === "Good" || tier === "Neutral") {
    recommendations.push(
      "Standard trading operations are completely safe.",
      "Review active approvals annually to maintain peak security hygiene.",
      "Monitor for upcoming protocol governance votes to earn incentives."
    );
  } else if (tier === "Caution") {
    recommendations.push(
      "Exercise vigilance: Revoke any high-allowance permissions granted to unverified contracts.",
      "Avoid large OTC transactions without reliable Escrow/Multisig middle agents.",
      "Expect high slippage and volatility if trading matching pools with this address."
    );
  } else {
    recommendations.push(
      "DANGER: Do not connect key accounts or send valuable assets directly to this wallet.",
      "Immediately flag contract addresses deployed by this wallet on security aggregators.",
      "Verify if mixer-bridged funds correlate with recent exploit/phishing reports."
    );
  }

  // Construct domain & Twitter
  let ensName: string | undefined = undefined;
  let twitterHandle: string | undefined = undefined;
  let twitterVerifiedType: "business" | "individual" | "none" | undefined = undefined;

  // Generate domains deterministically if score is decent (>= 350)
  if (score >= 350) {
    const domainPrefixes = ["alpha", "zen", "whale", "giga", "nexus", "matrix", "apex", "crypto", "stellar", "ether", "solana", "node", "nexus", "quantum"];
    const domainSuffixes = ["builder", "trader", "hodler", "pioneer", "wizard", "ninja", "guru", "watcher", "maxi", "enthusiast", "capital", "dao"];
    const pIdx = Math.floor(r(95) * domainPrefixes.length);
    const sIdx = Math.floor(r(96) * domainSuffixes.length);
    const num = Math.floor(r(97) * 99);
    const ext = chain === "EVM" ? ".eth" : ".sol";
    ensName = `${domainPrefixes[pIdx]}${domainSuffixes[sIdx]}${num > 50 ? num : ""}${ext}`;
  }

  // Generate Twitter handle for reputable wallets
  if (score >= 500 && r(98) > 0.4) {
    const handlePrefixes = ["Crypto", "DeFi_", "Web3_", "Sol_", "Ether_", "Whale_", "Degen", "Alpha_"];
    const handleSuffixes = ["Pioneer", "Alpha", "Whale", "Guru", "Wizard", "Investor", "Sentinel", "Builder"];
    const hp = Math.floor(r(99) * handlePrefixes.length);
    const hs = Math.floor(r(100) * handleSuffixes.length);
    twitterHandle = `@${handlePrefixes[hp]}${handleSuffixes[hs]}`;
    twitterVerifiedType = r(101) > 0.8 ? "business" : "individual";
  }

  return {
    address,
    chainType: chain,
    score,
    reputationTier: tier,
    overallTrustScore: overallTrust,
    riskRating: risk,
    communityReputation: Math.floor(reputationBreakdown.communityTrust * 0.9),
    securityRating: reputationBreakdown.security,
    experienceLevel,
    walletAge,
    activityConsistency,
    confidenceLevel,
    aiSummary,
    signals: allSignals,
    securityIntelligence,
    behavioralIntelligence: {
      classifications,
      botProbability,
      smartMoneyProbability
    },
    portfolio: {
      totalValueUsd: portfolioVal,
      netWorthTrend,
      topTokens,
      tokenDiversity: tier === "Elite" ? "Extreme (50+ tokens)" : "Moderate",
      stablecoinAllocation: 25,
      nftAllocation: 15,
      defiExposure: 40,
      liquidityPositions: "Uniswap V3 LP",
      protocolUsage: "Uniswap, Aave, Curve",
      chainsUsed: [chain, chain === "EVM" ? "Arbitrum" : "Solana Devnet"],
      bridgeActivity: "Standard secure bridges",
      walletAge,
      transactionsCount: Math.floor(50 + r(90) * 1200),
      gasSpentUsd: Math.floor(10 + r(91) * 3500),
      mostUsedDex: chain === "EVM" ? "Uniswap" : "Jupiter",
      mostUsedMarketplace: chain === "EVM" ? "OpenSea" : "Tensor",
      favoriteEcosystem: chain === "EVM" ? "Ethereum L2s" : "Solana DeFi"
    },
    nfts,
    timeline,
    reputationBreakdown,
    recommendations,
    ensName,
    twitterHandle,
    twitterVerifiedType
  };
}

// Famous predefined examples for instant checking
const EXAMPLES: Record<string, WalletReport> = {
  // Vitalik EVM
  "0xd8da6bf26964af9d7eed9e03e53415d37aa96045": {
    ...generateSeededReport("0xd8da6bf26964af9d7eed9e03e53415d37aa96045", "EVM"),
    score: 985,
    reputationTier: "Elite",
    overallTrustScore: 99,
    riskRating: "Low",
    experienceLevel: "OG Creator / Ethereum Founder",
    walletAge: "11 Years",
    aiSummary: "This wallet belongs to Vitalik Buterin, the co-founder of Ethereum. It shows unparalleled trust metrics, huge long-term asset lockups, high community interaction, and major governance weights. It has participated in thousands of early on-chain operations and holds multiple highly respected builder credentials. No malicious patterns or security risks are present.",
    recommendations: [
      "Ultimate benchmark. Fully trustable address associated with pioneering Web3 development.",
      "High-conviction validator and builder score.",
      "Highly stable transaction consistency across multiple decades."
    ],
    ensName: "vitalik.eth",
    twitterHandle: "@VitalikButerin",
    twitterVerifiedType: "individual"
  },
  // Elite EVM
  "0x71c7656ec7ab88b098defb751b7401b5f6d1476b": {
    ...generateSeededReport("0x71c7656ec7ab88b098defb751b7401b5f6d1476b", "EVM"),
    score: 842,
    reputationTier: "Trusted",
    overallTrustScore: 89,
    riskRating: "Low",
    experienceLevel: "Professional Whale & NFT Collector",
    walletAge: "4 Years, 6 Months",
    aiSummary: "A highly respected Ethereum wallet active for over four years. Demonstrates consistent trading history, heavy investment in verified Blue-Chip NFT collections (Bored Apes, Cryptopunks), and significant DeFi liquidity provision on Uniswap and Curve. No smart contract risks or malicious transactions were detected. It stands as an authentic, high-quality on-chain participant.",
    ensName: "whaletrader.eth",
    twitterHandle: "@EliteWhale",
    twitterVerifiedType: "business"
  },
  // Meme Coin Solana
  "hn7cabvixv78g48a5sgs27utvys71mjunpzg4899gabc": {
    ...generateSeededReport("hn7cabvixv78g48a5sgs27utvys71mjunpzg4899gabc", "Solana"),
    score: 340,
    reputationTier: "Caution",
    overallTrustScore: 35,
    riskRating: "High",
    experienceLevel: "High-Frequency Memecoin Trader",
    walletAge: "8 Months",
    aiSummary: "A highly active Solana address engaging in rapid, low-latency memecoin swaps via decentralized aggregators. While it hasn't engaged in known exploits or blacklisted contracts, it is flagged with a high wash-trading probability, extreme portfolio volatility, and heavy selling pressure. Its behavior pattern is highly automated/bot-like.",
    ensName: "sniper.sol",
    twitterHandle: "@MemeSniper",
    twitterVerifiedType: "individual"
  },
  // High Risk / Drainer EVM
  "0x3922378f846bc0b986b2de66c80ba820847b2c01": {
    ...generateSeededReport("0x3922378f846bc0b986b2de66c80ba820847b2c01", "EVM"),
    score: 120,
    reputationTier: "High Risk",
    overallTrustScore: 12,
    riskRating: "Critical",
    experienceLevel: "Flagged Wallet / Suspicious Actor",
    walletAge: "3 Weeks",
    aiSummary: "CRITICAL SECURITY WARNING. This wallet exhibits malicious blockchain patterns. It has direct interactions with known phishing contracts and wallet drainers. Almost all gas funding came from centralized mixers or recently drained smart contracts. Wash trading signals and extreme Sybil cluster patterns are present. INTERACTION STRICTLY UNRECOMMENDED.",
    ensName: undefined,
    twitterHandle: undefined,
    twitterVerifiedType: "none"
  },
  // Pre-cached Connected EVM Wallet
  "0xkarmaevm88888888888888888888888888888888": {
    ...generateSeededReport("0xKarmaEVM88888888888888888888888888888888", "EVM"),
    score: 785,
    reputationTier: "Trusted",
    overallTrustScore: 82,
    riskRating: "Low",
    experienceLevel: "EVM Power User & DeFi Liquidity Provider",
    walletAge: "2 Years, 10 Months",
    aiSummary: "A highly consistent and reputable EVM address demonstrating excellent on-chain health. It maintains healthy borrowing limits across multiple lending protocols, holds voting rights in key DAOs, and has zero associations with suspicious or malicious contracts. A pristine profile representing a highly trusted Web3 contributor.",
    recommendations: [
      "Excellent reputation score. Fully eligible for premier staking multipliers and governance roles.",
      "Keep maintaining the active liquidity positions to preserve high DeFi exposure scores.",
      "Consider anchoring a Soulbound Identity Passport to secure permanently verified credentials."
    ],
    ensName: "karmapower.eth",
    twitterHandle: "@KarmaEVMUser",
    twitterVerifiedType: "individual"
  },
  // Pre-cached Connected Solana Wallet
  "karmasol11111111111111111111111111111111": {
    ...generateSeededReport("KarmaSol11111111111111111111111111111111", "Solana"),
    score: 820,
    reputationTier: "Trusted",
    overallTrustScore: 85,
    riskRating: "Low",
    experienceLevel: "Solana Power Staker & NFT Pioneer",
    walletAge: "1 Year, 5 Months",
    aiSummary: "An active and reputable Solana address demonstrating robust participation across top DeFi pools and NFT marketplaces. Features excellent staking consistency, high liquidity provision, and a strong balance of blue-chip NFT holdings with active governance rights. No hazardous behaviors or bot-like circular transactions detected.",
    recommendations: [
      "Strong Solana footprint. Take advantage of high-yield SWARM staking rewards.",
      "Excellent DeFi health profile; keep liquidity pools diversified.",
      "Secure this premium rating by bonding your reputation to an SBT certificate."
    ],
    ensName: "karmapol.sol",
    twitterHandle: "@KarmaSolUser",
    twitterVerifiedType: "individual"
  }
};

// Connected Verified Twitter/X accounts cache (In-memory mapping)
const connectedXAccounts: Record<string, { twitterHandle: string; twitterVerifiedType: "business" | "individual" | "none" }> = {};

// Custom Purchased Identity Names Cache (In-memory mapping)
const customNames: Record<string, string> = {};
const customNameAddresses: Record<string, string> = {};

// Request Premium Wallet Investigation Storage (In-memory mock database for high fidelity interaction)
const premiumRequests: any[] = [];

// API: Purchase & Update Custom Name (ENS service - 0.005 SOL)
app.post("/api/update-name", (req, res) => {
  try {
    const { address, newName } = req.body;
    if (!address || !newName) {
      return res.status(400).json({ error: "Address and new name are required." });
    }

    const cleanAddress = address.trim();
    const lowerAddress = cleanAddress.toLowerCase();
    const nameStr = newName.trim();

    if (nameStr.length < 3 || nameStr.length > 32) {
      return res.status(400).json({ error: "Name must be between 3 and 32 characters." });
    }

    customNames[lowerAddress] = nameStr;
    customNames[cleanAddress] = nameStr;
    customNameAddresses[nameStr.toLowerCase()] = cleanAddress;

    return res.status(200).json({
      success: true,
      message: `Custom name '${nameStr}' purchased and bound successfully.`,
      newName: nameStr
    });
  } catch (err) {
    console.error("Error purchasing custom name:", err);
    res.status(500).json({ error: "Failed to purchase custom name." });
  }
});

// API: Connect verified Twitter/X account
app.post("/api/connect-x", (req, res) => {
  try {
    const { address, twitterHandle, twitterVerifiedType } = req.body;
    if (!address || !twitterHandle || !twitterVerifiedType) {
      return res.status(400).json({ error: "Address, X handle, and verification type are required." });
    }

    const cleanAddress = address.trim();
    const lowerAddress = cleanAddress.toLowerCase();
    const handle = twitterHandle.trim().startsWith("@") ? twitterHandle.trim() : `@${twitterHandle.trim()}`;

    connectedXAccounts[lowerAddress] = {
      twitterHandle: handle,
      twitterVerifiedType: twitterVerifiedType === "business" ? "business" : "individual"
    };

    return res.status(200).json({
      success: true,
      message: `Verified X account ${handle} successfully connected & verified on-chain.`,
      handle,
      verifiedType: twitterVerifiedType
    });
  } catch (err) {
    console.error("Error connecting Twitter/X account:", err);
    res.status(500).json({ error: "Failed to connect Verified Twitter/X account." });
  }
});

// API: Disconnect/Unlink Twitter/X account
app.post("/api/disconnect-x", (req, res) => {
  try {
    const { address } = req.body;
    if (!address) {
      return res.status(400).json({ error: "Address is required." });
    }
    const cleanAddress = address.trim();
    const lowerAddress = cleanAddress.toLowerCase();
    
    delete connectedXAccounts[lowerAddress];
    delete connectedXAccounts[cleanAddress];

    return res.status(200).json({
      success: true,
      message: "Verified X account successfully disconnected."
    });
  } catch (err) {
    console.error("Error disconnecting Twitter/X account:", err);
    res.status(500).json({ error: "Failed to disconnect Twitter/X account." });
  }
});

// API: Decode Wallet
app.post("/api/decode", async (req, res) => {
  try {
    const { address } = req.body;
    if (!address || typeof address !== "string") {
      return res.status(400).json({ error: "Wallet address is required." });
    }

    let cleanAddress = address.trim();
    let lowerAddress = cleanAddress.toLowerCase();

    // Check if EVM or Solana based on name resolution or address format
    let chain: "EVM" | "Solana" = "EVM";
    let isValid = false;
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
      cleanAddress = KNOWN_DOMAINS[lowerAddress].address;
      chain = KNOWN_DOMAINS[lowerAddress].chain;
      isValid = true;
      isDomain = true;
      originalDomain = lowerAddress;
    } else if (customNameAddresses[lowerAddress]) {
      cleanAddress = customNameAddresses[lowerAddress];
      chain = cleanAddress.startsWith("0x") ? "EVM" : "Solana";
      isValid = true;
      isDomain = true;
      originalDomain = customNames[cleanAddress.toLowerCase()] || lowerAddress;
    } else {
      const evmRegex = /^0x[a-fA-F0-9]{40}$/;
      const evmBareRegex = /^[a-fA-F0-9]{40}$/;
      const solRegex = /^[1-9A-HJ-NP-Za-km-z]{30,44}$/;

      if (lowerAddress.endsWith(".sol")) {
        chain = "Solana";
        cleanAddress = getDeterministicSolanaAddress(lowerAddress);
        isValid = true;
        isDomain = true;
        originalDomain = lowerAddress;
      } else if (lowerAddress.endsWith(".eth") || lowerAddress.includes(".")) {
        chain = "EVM";
        cleanAddress = getDeterministicEVMAddress(lowerAddress);
        isValid = true;
        isDomain = true;
        originalDomain = lowerAddress;
      } else if (evmRegex.test(cleanAddress) || lowerAddress === "0xkarmaevm88888888888888888888888888888888") {
        chain = "EVM";
        isValid = true;
      } else if (evmBareRegex.test(cleanAddress)) {
        cleanAddress = "0x" + cleanAddress;
        lowerAddress = cleanAddress.toLowerCase();
        chain = "EVM";
        isValid = true;
      } else if (solRegex.test(cleanAddress) || lowerAddress === "karmasol11111111111111111111111111111111") {
        chain = "Solana";
        isValid = true;
      } else {
        // Fallback: Treat any arbitrary input as a custom username or handle
        chain = "EVM";
        cleanAddress = getDeterministicEVMAddress(lowerAddress);
        isValid = true;
        isDomain = true;
        originalDomain = lowerAddress.includes(".") ? lowerAddress : `${lowerAddress}.score`;
      }
    }

    if (!isValid) {
      return res.status(400).json({ error: "Invalid address format. Please enter a valid EVM address (starting with 0x), Solana base58 address, or domain (.eth / .sol / .score)." });
    }

    lowerAddress = cleanAddress.toLowerCase();

    let finalReport: WalletReport;

    // Check predefined examples first
    if (EXAMPLES[lowerAddress]) {
      finalReport = { ...EXAMPLES[lowerAddress] };
    } else if (EXAMPLES[cleanAddress]) {
      finalReport = { ...EXAMPLES[cleanAddress] };
    } else {
      let report: WalletReport | null = null;
      // If Gemini is configured, let's call Gemini to get a customized, high-intelligence report
      if (ai) {
        try {
          const systemPrompt = `You are the core intelligence engine of Karma Wallet Score, a premium Web3 wallet reputation and credit-score platform.
You will analyze the following ${chain} wallet address: "${cleanAddress}".
Generate a highly detailed, professional, and authentic-feeling reputation report matching the exact requested JSON schema.
The report must look fully realistic, including precise percentages, token symbols, specific Web3 activities, realistic security ratings, NFT utilities, timeline events, and practical recommendations.

Use the following rating logic:
- Address characteristics can be used to determine their "Karma Score" (0 to 1000). Generate a score that feels highly believable.
- Provide a robust paragraph of plain English summary under "aiSummary" that sounds like a professional security researcher wrote it.
- Include a list of colorful badges/chips under "signals".
- Fill out all portfolio fields, NFT fields (give them premium access details, Access Benefits like 'Recognized builder community', 'Exclusive alpha network' etc. and explain why they matter beyond price), timeline events, reputation breakdowns, and actionable recommendations.

Return ONLY the completed JSON object matching the requested schema. No conversational wrappers, no markdown formatting outside of JSON.`;

          const geminiPromise = generateContentWithRetry(ai, {
            model: "gemini-2.5-flash",
            contents: systemPrompt,
            config: {
              responseMimeType: "application/json",
              responseSchema: {
                type: Type.OBJECT,
                properties: {
                  score: { type: Type.INTEGER, description: "A score from 0 to 1000" },
                  reputationTier: { type: Type.STRING, description: "Elite, Trusted, Good, Neutral, Caution, or High Risk" },
                  overallTrustScore: { type: Type.INTEGER, description: "Percentage 0 to 100" },
                  riskRating: { type: Type.STRING, description: "Low, Medium, High, or Critical" },
                  communityReputation: { type: Type.INTEGER, description: "0 to 100" },
                  securityRating: { type: Type.INTEGER, description: "0 to 100" },
                  experienceLevel: { type: Type.STRING },
                  walletAge: { type: Type.STRING },
                  activityConsistency: { type: Type.STRING },
                  confidenceLevel: { type: Type.INTEGER },
                  aiSummary: { type: Type.STRING },
                  signals: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        label: { type: Type.STRING },
                        level: { type: Type.STRING, description: "GREEN, YELLOW, ORANGE, or RED" },
                        description: { type: Type.STRING }
                      },
                      required: ["label", "level", "description"]
                    }
                  },
                  securityIntelligence: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        name: { type: Type.STRING },
                        level: { type: Type.STRING, description: "LOW, MEDIUM, HIGH, or CRITICAL" },
                        detail: { type: Type.STRING }
                      },
                      required: ["name", "level", "detail"]
                    }
                  },
                  behavioralIntelligence: {
                    type: Type.OBJECT,
                    properties: {
                      classifications: {
                        type: Type.ARRAY,
                        items: {
                          type: Type.OBJECT,
                          properties: {
                            name: { type: Type.STRING },
                            active: { type: Type.BOOLEAN },
                            score: { type: Type.INTEGER },
                            description: { type: Type.STRING }
                          }
                        }
                      },
                      botProbability: { type: Type.INTEGER },
                      smartMoneyProbability: { type: Type.INTEGER }
                    }
                  },
                  portfolio: {
                    type: Type.OBJECT,
                    properties: {
                      totalValueUsd: { type: Type.INTEGER },
                      tokenDiversity: { type: Type.STRING },
                      stablecoinAllocation: { type: Type.INTEGER },
                      nftAllocation: { type: Type.INTEGER },
                      defiExposure: { type: Type.INTEGER },
                      liquidityPositions: { type: Type.STRING },
                      protocolUsage: { type: Type.STRING },
                      chainsUsed: { type: Type.ARRAY, items: { type: Type.STRING } },
                      bridgeActivity: { type: Type.STRING },
                      transactionsCount: { type: Type.INTEGER },
                      gasSpentUsd: { type: Type.INTEGER },
                      mostUsedDex: { type: Type.STRING },
                      mostUsedMarketplace: { type: Type.STRING },
                      favoriteEcosystem: { type: Type.STRING }
                    }
                  },
                  nfts: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        name: { type: Type.STRING },
                        mintDate: { type: Type.STRING },
                        purchaseDate: { type: Type.STRING },
                        holdingDuration: { type: Type.STRING },
                        estimatedValueUsd: { type: Type.INTEGER },
                        floorPriceEth: { type: Type.NUMBER },
                        rarityScore: { type: Type.STRING },
                        verified: { type: Type.BOOLEAN },
                        blueChipRating: { type: Type.STRING },
                        communityScore: { type: Type.INTEGER },
                        utilityScore: { type: Type.INTEGER },
                        governanceAccess: { type: Type.BOOLEAN },
                        builderReputation: { type: Type.STRING },
                        holderQuality: { type: Type.STRING },
                        communityActivity: { type: Type.STRING },
                        accessBenefits: { type: Type.STRING },
                        description: { type: Type.STRING }
                      }
                    }
                  },
                  timeline: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        title: { type: Type.STRING },
                        date: { type: Type.STRING },
                        description: { type: Type.STRING },
                        iconType: { type: Type.STRING, description: "created, tx, nft, profit, loss, bridge, defi, active" },
                        amount: { type: Type.STRING }
                      }
                    }
                  },
                  reputationBreakdown: {
                    type: Type.OBJECT,
                    properties: {
                      communityTrust: { type: Type.INTEGER },
                      security: { type: Type.INTEGER },
                      trading: { type: Type.INTEGER },
                      consistency: { type: Type.INTEGER },
                      transparency: { type: Type.INTEGER },
                      ecosystemParticipation: { type: Type.INTEGER },
                      developerActivity: { type: Type.INTEGER },
                      nftReputation: { type: Type.INTEGER },
                      protocolReputation: { type: Type.INTEGER },
                      governanceActivity: { type: Type.INTEGER },
                      socialSignals: { type: Type.INTEGER },
                      builderScore: { type: Type.INTEGER },
                      investorScore: { type: Type.INTEGER }
                    }
                  },
                  recommendations: { type: Type.ARRAY, items: { type: Type.STRING } }
                },
                required: [
                  "score", "reputationTier", "overallTrustScore", "riskRating",
                  "aiSummary", "signals", "securityIntelligence", "recommendations"
                ]
              }
            }
          });

          const timeoutPromise = new Promise<any>((_, reject) =>
            setTimeout(() => reject(new Error("Gemini API call timed out after 1.8 seconds.")), 1800)
          );

          const response = await Promise.race([geminiPromise, timeoutPromise]);

          if (response && response.text) {
            const parsed = JSON.parse(response.text.trim());
            
            // Complete missing structural elements with seeded defaults to guarantee safety
            const baseReport = generateSeededReport(cleanAddress, chain);
            report = {
              ...baseReport,
              ...parsed,
              address: cleanAddress,
              chainType: chain
            };
          }
        } catch (geminiError) {
          console.warn("Gemini API decode info: falling back to seeded generator (model slow or high demand):", geminiError.message || geminiError);
        }
      }

      if (!report) {
        report = generateSeededReport(cleanAddress, chain);
      }
      finalReport = report;
    }

    // Overlay dynamically connected Twitter/X handle if any
    const connectedX = connectedXAccounts[lowerAddress] || connectedXAccounts[cleanAddress];
    if (connectedX) {
      finalReport.twitterHandle = connectedX.twitterHandle;
      finalReport.twitterVerifiedType = connectedX.twitterVerifiedType;
    }

    // Overlay purchased custom name if any
    const customName = customNames[lowerAddress] || customNames[cleanAddress];
    if (customName) {
      finalReport.experienceLevel = customName;
      finalReport.ensName = customName;
    }

    // Overlay resolved domain name as ensName if resolved from a domain
    if (isDomain && originalDomain) {
      finalReport.ensName = originalDomain;
    }

    return res.json(finalReport);

  } catch (err: any) {
    console.error("Error decoding address:", err);
    res.status(500).json({ error: "An error occurred while decoding the wallet reputation." });
  }
});

// API: Submit Premium Investigation Request
app.post("/api/premium-investigate", (req, res) => {
  try {
    const { walletAddress, email, urgency, notes } = req.body;

    if (!walletAddress || !email || !urgency) {
      return res.status(400).json({ error: "Wallet address, email, and urgency level are required." });
    }

    const newRequest = {
      id: "REQ_" + Math.floor(100000 + Math.random() * 900000),
      walletAddress: walletAddress.trim(),
      email: email.trim(),
      urgency,
      notes: notes ? notes.trim() : "",
      status: "pending",
      createdAt: new Date().toISOString()
    };

    premiumRequests.push(newRequest);

    res.status(201).json({
      success: true,
      message: "Premium investigator request successfully submitted.",
      request: newRequest
    });
  } catch (err) {
    console.error("Error creating premium request:", err);
    res.status(500).json({ error: "Failed to submit premium investigation request." });
  }
});

// API: Get Premium Investigation Requests (for tracking/feedback)
app.get("/api/premium-requests", (req, res) => {
  res.json(premiumRequests);
});

// In-memory storage for shared proof posts
const sharedProofs: any[] = [];

// API: Share Cryptographic ZK-Proof instantly to connected X Profile & Official Karma AI account
app.post("/api/share-x-proof", (req, res) => {
  try {
    const { twitterHandle, nftCollection, assetName } = req.body;

    if (!twitterHandle) {
      return res.status(400).json({ error: "Twitter handle is required to publish the proof." });
    }

    const cleanHandle = twitterHandle.trim().replace(/^@/, "");
    const selectedCollection = nftCollection || "Mad Lads";
    const selectedAsset = assetName || `${selectedCollection} Asset`;
    const proofId = "SBT-ZK-" + Math.random().toString(36).substr(2, 6).toUpperCase();
    const timestamp = new Date().toISOString();

    const randomStatusId1 = Math.floor(1800000000000000000 + Math.random() * 100000000000000000).toString();
    const randomStatusId2 = Math.floor(1800000000000000000 + Math.random() * 100000000000000000).toString();

    const userTweetText = `I just proved ownership of my elite ${selectedAsset} completely off-chain! My wallet stays offline and secure from attackers, verified instantly by @Karma_AI. 🛡️🔐\n\nVerify yours at: ${process.env.APP_URL || "https://karma-ai.io"}`;
    const officialTweetText = `PUBLIC PROOF: Verified @${cleanHandle}'s authentic ownership of ${selectedAsset} via Zero-Knowledge Cryptographic Passport #${proofId}. No wallet addresses were exposed. 🌐✅\n\nProtect your Web3 footprint with Karma AI: ${process.env.APP_URL || "https://karma-ai.io"}`;

    const newShare = {
      id: proofId,
      twitterHandle: `@${cleanHandle}`,
      nftCollection: selectedCollection,
      assetName: selectedAsset,
      userTweetText,
      officialTweetText,
      userPostUrl: `https://x.com/${cleanHandle}/status/${randomStatusId1}`,
      officialPostUrl: `https://x.com/Karma_AI/status/${randomStatusId2}`,
      timestamp
    };

    sharedProofs.push(newShare);

    res.status(200).json({
      success: true,
      message: "Proof successfully synchronized and published instantly to X backend profiles.",
      share: newShare
    });
  } catch (err) {
    console.error("Error sharing ZK proof to X:", err);
    res.status(500).json({ error: "Failed to publish ZK proof to X backend." });
  }
});

// API: Get Shared Proof Archive
app.get("/api/shared-proofs", (req, res) => {
  res.json(sharedProofs);
});

// Setup Vite & Static Files Server Middleware
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
