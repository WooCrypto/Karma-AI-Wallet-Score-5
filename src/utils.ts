import { 
  WalletReport, 
  SignalLevel, 
  RiskLevel, 
  SignalCard, 
  SecurityMetric, 
  BehavioralClassification, 
  NFTCollection, 
  TimelineEvent,
  TokenHolding
} from "./types";

// Deterministic seed helper
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

export function getDeterministicEVMAddress(name: string): string {
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

export function getDeterministicSolanaAddress(name: string): string {
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

export function generateSeededReport(address: string, chain: "EVM" | "Solana"): WalletReport {
  const seed = getAddressSeed(address);
  let seedOffset = 0;
  const r = (offset: number) => seededRandom(seed + offset);

  // Determine reputation score and tier
  const score = Math.floor(150 + r(1) * 851); // 150 - 1000
  let tier: "Elite" | "Trusted" | "Good" | "Neutral" | "Caution" | "High Risk" = "Neutral";
  let overallTrustScore = Math.floor(score / 10);
  let riskRating: "Low" | "Medium" | "High" | "Critical" = "Medium";

  if (score >= 900) {
    tier = "Elite";
    riskRating = "Low";
  } else if (score >= 800) {
    tier = "Trusted";
    riskRating = "Low";
  } else if (score >= 650) {
    tier = "Good";
    riskRating = "Medium";
  } else if (score >= 450) {
    tier = "Neutral";
    riskRating = "Medium";
  } else if (score >= 280) {
    tier = "Caution";
    riskRating = "High";
  } else {
    tier = "High Risk";
    riskRating = "Critical";
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
    aiSummary = `This ${chain} address displays exceptional on-chain metrics, with an active history spanning over ${years} years. Our decoders identified consistent governance participation across major protocols, robust liquidity provisioning, and zero interactions with high-risk smart contracts. The wallet is classified as 'Smart Money' due to historical accuracy in long-term token holding and verified community contributions. Overall, it stands out as an exemplary and highly trustworthy actor on-chain.`;
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
  const signals: SignalCard[] = [];
  if (tier === "Elite" || tier === "Trusted") {
    signals.push(
      { label: "Trusted Wallet", level: SignalLevel.GREEN, description: "Highly trusted score based on protocol history." },
      { label: "OG Wallet", level: SignalLevel.GREEN, description: "Active since early chain deployment stages." },
      { label: "Diamond Hands", level: SignalLevel.GREEN, description: "Retains major assets for 365+ days." },
      { label: "Community Contributor", level: SignalLevel.GREEN, description: "Active builder or verified ecosystem participant." }
    );
    if (r(7) > 0.5) signals.push({ label: "DAO Member", level: SignalLevel.GREEN, description: "Voted in 5+ governance cycles." });
    if (r(8) > 0.5) signals.push({ label: "Smart Money", level: SignalLevel.GREEN, description: "Early enterer in high-yielding protocols." });
    if (r(9) > 0.7) signals.push({ label: "Whale", level: SignalLevel.YELLOW, description: "Holds assets exceeding $1M." });
  } else if (tier === "Good") {
    signals.push(
      { label: "Long-Term Holder", level: SignalLevel.GREEN, description: "Maintains assets without rapid liquidations." },
      { label: "NFT Collector", level: SignalLevel.GREEN, description: "Holds verified collection assets." },
      { label: "Early Adopter", level: SignalLevel.GREEN, description: "Used testnets or V1 protocols." }
    );
    if (r(7) > 0.5) signals.push({ label: "DAO Member", level: SignalLevel.GREEN, description: "Voted in governance." });
  } else if (tier === "Neutral") {
    signals.push(
      { label: "Active Trader", level: SignalLevel.YELLOW, description: "Consistent swaps on major aggregators." },
      { label: "New Wallet", level: SignalLevel.YELLOW, description: "Age is below 1 year on-chain." }
    );
    if (r(8) > 0.6) signals.push({ label: "Yield Farmer", level: SignalLevel.YELLOW, description: "Active liquidity staker." });
  } else if (tier === "Caution") {
    signals.push(
      { label: "Meme Coin Trader", level: SignalLevel.YELLOW, description: "High proportion of micro-cap swap volume." },
      { label: "High Volatility", level: SignalLevel.YELLOW, description: "Rapid balance spikes and drops." },
      { label: "Heavy Bridge Usage", level: SignalLevel.YELLOW, description: "Frequent cross-chain value movement." },
      { label: "Wash Trading Signals", level: SignalLevel.ORANGE, description: "Matched buying and selling within small intervals." },
      { label: "Farming Wallet", level: SignalLevel.ORANGE, description: "Repetitive, program-like transaction sequences." }
    );
  } else {
    signals.push(
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
    overallTrustScore,
    riskRating,
    communityReputation: Math.floor(60 + r(30) * 35),
    securityRating: Math.floor(55 + r(31) * 40),
    experienceLevel,
    walletAge,
    activityConsistency,
    confidenceLevel,
    aiSummary,
    signals,
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
      tokenDiversity: `${Math.floor(4 + r(32) * 20)} distinct tokens`,
      stablecoinAllocation: Math.floor(10 + r(33) * 40),
      nftAllocation: Math.floor(5 + r(34) * 35),
      defiExposure: Math.floor(15 + r(35) * 60),
      liquidityPositions: `${chain === "EVM" ? "Uniswap V3" : "Raydium"} LP Positions Verified`,
      protocolUsage: chain === "EVM" ? "Aave, Maker, Uniswap, Curve" : "Jupiter, Kamino, Orca, Raydium",
      chainsUsed: chain === "EVM" ? ["Ethereum", "Arbitrum", "Optimism", "Polygon"] : ["Solana"],
      bridgeActivity: chain === "EVM" ? "Across, LayerZero" : "deBridge, Wormhole",
      walletAge,
      transactionsCount: Math.floor(50 + r(36) * 4500),
      gasSpentUsd: Math.floor(10 + r(37) * 3500),
      mostUsedDex: chain === "EVM" ? "Uniswap" : "Jupiter",
      mostUsedMarketplace: chain === "EVM" ? "OpenSea" : "Tensor",
      favoriteEcosystem: chain === "EVM" ? "Ethereum DeFi" : "Solana DeFi"
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

// Preset Sandbox Profiles so we don't have to calculate them randomly if chosen
export const PRESETS: Record<string, WalletReport> = {
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
