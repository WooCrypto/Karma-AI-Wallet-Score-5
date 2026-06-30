export enum SignalLevel {
  GREEN = "GREEN",
  YELLOW = "YELLOW",
  ORANGE = "ORANGE",
  RED = "RED",
}

export interface SignalCard {
  label: string;
  level: SignalLevel;
  description: string;
}

export enum RiskLevel {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  CRITICAL = "CRITICAL",
}

export interface SecurityMetric {
  name: string;
  level: RiskLevel;
  detail: string;
}

export interface BehavioralClassification {
  name: string;
  active: boolean;
  score: number; // 0-100 relevance
  description: string;
}

export interface TokenHolding {
  symbol: string;
  name: string;
  balance: number;
  valueUsd: number;
  priceUsd: number;
  percentage: number;
  logoUrl?: string;
}

export interface PortfolioData {
  totalValueUsd: number;
  netWorthTrend: { date: string; value: number }[]; // for the mini-chart
  topTokens: TokenHolding[];
  tokenDiversity: string; // e.g. "High (24 distinct tokens)"
  stablecoinAllocation: number; // e.g. 15 for 15%
  nftAllocation: number; // e.g. 30 for 30%
  defiExposure: number; // e.g. 55 for 55%
  liquidityPositions: string; // e.g. "Uniswap V3 USDC/WETH ($12k)"
  protocolUsage: string; // e.g. "Aave, MakerDAO, Uniswap, Curve"
  chainsUsed: string[]; // e.g. ["Ethereum", "Solana", "Arbitrum"]
  bridgeActivity: string; // e.g. "Heavy (Arbitrum Bridge, Wormhole)"
  walletAge: string; // e.g. "3 Years, 2 Months"
  transactionsCount: number;
  gasSpentUsd: number;
  mostUsedDex: string; // e.g. "Uniswap"
  mostUsedMarketplace: string; // e.g. "OpenSea"
  favoriteEcosystem: string; // e.g. "Solana Defi"
}

export interface NFTCollection {
  name: string;
  mintDate: string;
  purchaseDate: string;
  holdingDuration: string; // e.g. "1.5 Years"
  estimatedValueUsd: number;
  floorPriceEth: number;
  rarityScore: string; // e.g. "Top 5%" or "N/A"
  verified: boolean;
  blueChipRating: string; // e.g. "AAA" or "A" or "B"
  communityScore: number; // 0-100
  utilityScore: number; // 0-100
  governanceAccess: boolean;
  builderReputation: string; // e.g. "Doxxed" or "Legendary"
  holderQuality: string; // e.g. "High (Diamond Hands)"
  communityActivity: string; // e.g. "Highly Active"
  accessBenefits: string; // e.g. "Recognized builder community."
  description: string; // explanation beyond price
}

export interface TimelineEvent {
  title: string;
  date: string;
  description: string;
  iconType: "created" | "tx" | "nft" | "profit" | "loss" | "bridge" | "defi" | "active";
  amount?: string;
}

export interface ReputationMetric {
  name: string;
  score: number; // 0-100
  grade: string; // e.g. "A+", "B", "F"
  description: string;
}

export interface PremiumRequest {
  id: string;
  walletAddress: string;
  email: string;
  urgency: string; // "standard" | "priority"
  notes?: string;
  status: "pending" | "investigating" | "completed";
  createdAt: string;
}

export interface WalletReport {
  address: string;
  chainType: "EVM" | "Solana";
  score: number; // 0-1000
  reputationTier: "Elite" | "Trusted" | "Good" | "Neutral" | "Caution" | "High Risk";
  overallTrustScore: number; // 0-100
  riskRating: "Low" | "Medium" | "High" | "Critical";
  communityReputation: number; // 0-100
  securityRating: number; // 0-100
  experienceLevel: string; // e.g. "OG Elite Trader"
  walletAge: string;
  activityConsistency: string; // e.g. "Highly Consistent"
  confidenceLevel: number; // 0-100
  aiSummary: string;
  signals: SignalCard[];
  securityIntelligence: SecurityMetric[];
  behavioralIntelligence: {
    classifications: BehavioralClassification[];
    botProbability: number;
    smartMoneyProbability: number;
  };
  portfolio: PortfolioData;
  nfts: NFTCollection[];
  timeline: TimelineEvent[];
  reputationBreakdown: {
    communityTrust: number;
    security: number;
    trading: number;
    consistency: number;
    transparency: number;
    ecosystemParticipation: number;
    developerActivity: number;
    nftReputation: number;
    protocolReputation: number;
    governanceActivity: number;
    socialSignals: number;
    builderScore: number;
    investorScore: number;
  };
  recommendations: string[];
  ensName?: string;
  twitterHandle?: string;
  twitterVerifiedType?: 'business' | 'individual' | 'none';
}
