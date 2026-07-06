import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, 
  Lock, 
  Check, 
  ArrowUpRight, 
  ShieldCheck, 
  Layers, 
  Tag, 
  ExternalLink, 
  Info,
  Layers2,
  Cpu,
  Plus,
  Trash2,
  UploadCloud,
  X,
  Fingerprint,
  AlertCircle,
  PlusCircle,
  Image as ImageIcon,
  Loader2,
  EyeOff
} from "lucide-react";

import madLadsNftImg from "../assets/images/mad_lads_nft_1782834969908.jpg";
import degodsNftImg from "../assets/images/degods_nft_1782834978756.jpg";
import boredApesNftImg from "../assets/images/bored_apes_nft_1782834993522.jpg";
import pudgyPenguinsNftImg from "../assets/images/pudgy_penguins_nft_1782835008251.jpg";

interface NftAttribute {
  trait_type: string;
  value: string;
}

interface NFTAsset {
  id: string;
  name: string;
  collection: string;
  image: string;
  rarity: string;
  mintAddress: string;
  verified: boolean;
  attributes: NftAttribute[];
  description: string;
  isPassport?: boolean;
}

// Modern X (formerly Twitter) Icon SVG
const Twitter = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

interface GlassyNftViewProps {
  userWalletAddress: string | null;
  userWalletChain: "Solana" | "EVM" | null;
  isSoulbound: boolean;
  onMintPassport: () => void;
  isMinting: boolean;
  mintStep: string;
  currentScore: number;
  onConnectClick: () => void;
  userTwitterHandle?: string | null;
  solBalance?: number;
  ethBalance?: number;
  onDeductBalance?: (amount: number) => void;
}

export function GlassyNftView({
  userWalletAddress,
  userWalletChain,
  isSoulbound,
  onMintPassport,
  isMinting,
  mintStep,
  currentScore,
  onConnectClick,
  userTwitterHandle,
  solBalance = 2.48,
  ethBalance = 0.142,
  onDeductBalance
}: GlassyNftViewProps) {
  const [selectedNft, setSelectedNft] = useState<NFTAsset | null>(null);

  // PRIVATE IDENTITY SHOWCASE STATES (CONNECTED FUNCTIONALITY)
  const [showcaseNftName, setShowcaseNftName] = useState("Mad Lads");
  const [showcaseNftImage, setShowcaseNftImage] = useState<string>(madLadsNftImg);
  const [showcaseTwitterHandle, setShowcaseTwitterHandle] = useState(userTwitterHandle ? userTwitterHandle.replace(/^@/, "") : "wolfpack_lead");
  const [showcaseProvingState, setShowcaseProvingState] = useState<"idle" | "proving" | "done">("idle");
  const [showcaseProgress, setShowcaseProgress] = useState(0);
  const [showcaseIsSharing, setShowcaseIsSharing] = useState(false);
  const [showcaseSharingStep, setShowcaseSharingStep] = useState("");
  const [showcaseSharedResult, setShowcaseSharedResult] = useState<any | null>(null);
  const [showcaseError, setShowcaseError] = useState<string | null>(null);

  // Sync showcase Twitter handle with actual bound profile
  useEffect(() => {
    if (userTwitterHandle) {
      setShowcaseTwitterHandle(userTwitterHandle.replace(/^@/, ""));
    }
  }, [userTwitterHandle]);

  // Handle assembly proof
  const handleStartShowcaseProof = () => {
    setShowcaseProvingState("proving");
    setShowcaseProgress(0);
    setShowcaseSharedResult(null);
    setShowcaseError(null);
    const interval = setInterval(() => {
      setShowcaseProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setShowcaseProvingState("done");
          return 100;
        }
        return prev + 10;
      });
    }, 120);
  };

  const handleShareShowcaseProof = async () => {
    if (!showcaseTwitterHandle) {
      setShowcaseError("X Handle is required to share the proof.");
      return;
    }
    setShowcaseIsSharing(true);
    setShowcaseSharedResult(null);
    setShowcaseError(null);

    const steps = [
      "Securing connection to Karma AI crypt-registry...",
      `Resolving official X handle @${showcaseTwitterHandle}...`,
      "Signing cryptographic Zero-Knowledge signature...",
      `Publishing proof directly to @${showcaseTwitterHandle} connected feed...`,
      "Anchoring verification mirror post to the official @karmascoreai public database..."
    ];

    try {
      for (let i = 0; i < steps.length; i++) {
        setShowcaseSharingStep(steps[i]);
        await new Promise((resolve) => setTimeout(resolve, 850));
      }

      let assetLabel = showcaseNftName;
      if (showcaseNftName === "Mad Lads") assetLabel = "⚡ Mad Lads #8912";
      else if (showcaseNftName === "Pudgy Penguins") assetLabel = "🐧 Pudgy Penguin #4023";
      else if (showcaseNftName === "DeGods") assetLabel = "👑 DeGod #2910";
      else if (showcaseNftName === "Bored Apes") assetLabel = "🦍 Bored Ape #592";

      const response = await fetch("/api/share-x-proof", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          twitterHandle: showcaseTwitterHandle,
          nftCollection: showcaseNftName,
          assetName: assetLabel
        })
      });

      if (!response.ok) {
        throw new Error("Failed to post proof to X backend API.");
      }

      const data = await response.json();
      if (data.success && data.share) {
        setShowcaseSharedResult(data.share);
      } else {
        throw new Error(data.error || "An error occurred during sharing.");
      }
    } catch (err: any) {
      console.error(err);
      setShowcaseError(err.message || "Failed to publish ZK proof to X backend.");
    } finally {
      setShowcaseIsSharing(false);
    }
  };

  // Share to X states inside NFT view modal
  const [nftTwitterHandle, setNftTwitterHandle] = useState("");
  const [isSharingNftX, setIsSharingNftX] = useState(false);
  const [sharingNftXStep, setSharingNftXStep] = useState("");
  const [sharedNftXResult, setSharedNftXResult] = useState<any | null>(null);
  const [shareNftXError, setShareNftXError] = useState<string | null>(null);

  // Update sharing fields when NFT selection changes
  useEffect(() => {
    if (selectedNft) {
      const storedHandle = userWalletAddress ? localStorage.getItem(`karma_twitter_handle_${userWalletAddress}`) : null;
      setNftTwitterHandle(userTwitterHandle || storedHandle || "wolfpack_lead");
      setIsSharingNftX(false);
      setSharingNftXStep("");
      setSharedNftXResult(null);
      setShareNftXError(null);
    }
  }, [selectedNft, userTwitterHandle, userWalletAddress]);

  // Custom user soulbound NFT states
  const [customNfts, setCustomNfts] = useState<NFTAsset[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isMintingCustom, setIsMintingCustom] = useState(false);
  const [customMintStep, setCustomMintStep] = useState("");

  // Bonded Profile Picture states
  const [bondedProfilePic, setBondedProfilePic] = useState<string | null>(null);
  const [showProfilePicModal, setShowProfilePicModal] = useState(false);
  const [isBondingProfilePic, setIsBondingProfilePic] = useState(false);
  const [profilePicStep, setProfilePicStep] = useState("");
  const [uploadedProfilePic, setUploadedProfilePic] = useState<string | null>(null);
  const [profileDragActive, setProfileDragActive] = useState(false);
  const profileFileInputRef = useRef<HTMLInputElement>(null);

  const userBalance = userWalletChain === "Solana" ? solBalance : ethBalance;
  const isInsufficientBalance = userBalance < 0.002;

  // Custom Form fields
  const [customName, setCustomName] = useState("");
  const [customCollection, setCustomCollection] = useState("");
  const [customDesc, setCustomDesc] = useState("");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [customTraits, setCustomTraits] = useState<NftAttribute[]>([
    { trait_type: "Type", value: "Soulbound Asset" },
    { trait_type: "Origin", value: "User Custom" }
  ]);
  const [newTraitType, setNewTraitType] = useState("");
  const [newTraitValue, setNewTraitValue] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load custom NFTs and profile pic from localStorage when wallet changes
  useEffect(() => {
    if (userWalletAddress) {
      const saved = localStorage.getItem(`karma_custom_nfts_${userWalletAddress}`);
      if (saved) {
        try {
          setCustomNfts(JSON.parse(saved));
        } catch (e) {
          console.error("Failed to load custom NFTs", e);
          setCustomNfts([]);
        }
      } else {
        setCustomNfts([]);
      }

      // Load bonded profile pic
      const savedPic = localStorage.getItem(`karma_bonded_profile_pic_${userWalletAddress}`);
      setBondedProfilePic(savedPic);
    } else {
      setCustomNfts([]);
      setBondedProfilePic(null);
    }
  }, [userWalletAddress]);

  // Helper to save custom NFTs
  const saveCustomNfts = (updated: NFTAsset[]) => {
    setCustomNfts(updated);
    if (userWalletAddress) {
      localStorage.setItem(`karma_custom_nfts_${userWalletAddress}`, JSON.stringify(updated));
    }
  };

  // Drag and Drop Handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const processFile = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setUploadedImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  // Add custom trait
  const handleAddTrait = () => {
    if (newTraitType.trim() && newTraitValue.trim()) {
      setCustomTraits([...customTraits, { trait_type: newTraitType.trim(), value: newTraitValue.trim() }]);
      setNewTraitType("");
      setNewTraitValue("");
    }
  };

  // Remove a custom trait
  const handleRemoveTrait = (idx: number) => {
    setCustomTraits(customTraits.filter((_, i) => i !== idx));
  };

  // Mint / Soulbond Custom asset handler
  const handleMintCustom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName || !uploadedImage) return;

    setIsMintingCustom(true);
    
    const steps = [
      "Securing network identity proof...",
      "Encoding media file payload into decentralized storage...",
      "Generating cryptographic authority anchor...",
      `Bonding customized asset metadata to connected ${userWalletChain || "Web3"} address...`,
      "Verifying non-transferability contract terms...",
      "Consensus finalized. Custom SBT successfully anchored!"
    ];

    for (let i = 0; i < steps.length; i++) {
      setCustomMintStep(steps[i]);
      await new Promise((resolve) => setTimeout(resolve, 850));
    }

    const uniqueId = `custom-nft-${Date.now()}`;
    const newAsset: NFTAsset = {
      id: uniqueId,
      name: customName,
      collection: customCollection.trim() || "Custom Soulbound Collection",
      image: uploadedImage,
      rarity: "Unique (Custom SBT)",
      mintAddress: `SBT-${userWalletChain === "Solana" ? "SOL" : "EVM"}-${Math.random().toString(36).substr(2, 6).toUpperCase()}-${userWalletAddress?.slice(-6).toUpperCase()}`,
      verified: true,
      attributes: [
        ...customTraits,
        { trait_type: "Ownership Status", value: "Soulbound Tethered" },
        { trait_type: "Anchor Address", value: `${userWalletAddress?.slice(0, 6)}...${userWalletAddress?.slice(-4)}` }
      ],
      description: customDesc.trim() || "A customized digital identity artifact, cryptographically minted and soulbound to this connected Web3 wallet."
    };

    const updated = [newAsset, ...customNfts];
    saveCustomNfts(updated);

    setIsMintingCustom(false);
    setShowAddModal(false);
    
    // Reset inputs
    setCustomName("");
    setCustomCollection("");
    setCustomDesc("");
    setUploadedImage(null);
    setCustomTraits([
      { trait_type: "Type", value: "Soulbound Asset" },
      { trait_type: "Origin", value: "User Custom" }
    ]);
  };

  const handleRemoveCustom = (id: string) => {
    const updated = customNfts.filter((nft) => nft.id !== id);
    saveCustomNfts(updated);
    setSelectedNft(null);
  };

  const handleShareNftToX = async () => {
    if (!nftTwitterHandle) {
      setShareNftXError("X Handle is required to publish proof.");
      return;
    }
    setShareNftXError(null);
    setIsSharingNftX(true);

    const steps = [
      "Securing connection to Karma AI ZK-proving database...",
      `Resolving verified X identity @${nftTwitterHandle.trim().replace(/^@/, "")}...`,
      `Signing ownership cryptographic credentials for "${selectedNft?.name}"...`,
      "Synthesizing proof payload into decentralized post format...",
      `Broadcasting verification proof to X & anchoring @karmascoreai public archive...`
    ];

    try {
      for (let i = 0; i < steps.length; i++) {
        setSharingNftXStep(steps[i]);
        await new Promise((resolve) => setTimeout(resolve, 800));
      }

      const response = await fetch("/api/share-x-proof", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          twitterHandle: nftTwitterHandle,
          nftCollection: selectedNft?.collection || "Custom Collection",
          assetName: selectedNft?.name || "Soulbound Asset"
        })
      });

      if (!response.ok) {
        throw new Error("Failed to post proof to X backend API.");
      }

      const data = await response.json();
      if (data.success && data.share) {
        setSharedNftXResult(data.share);
      } else {
        throw new Error(data.error || "An error occurred during sharing.");
      }
    } catch (err: any) {
      console.error(err);
      setShareNftXError(err.message || "Failed to publish ZK proof to X backend.");
    } finally {
      setIsSharingNftX(false);
    }
  };

  // Profile Picture drag and drop handlers
  const handleProfileDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setProfileDragActive(true);
    } else if (e.type === "dragleave") {
      setProfileDragActive(false);
    }
  };

  const processProfileFile = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setUploadedProfilePic(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setProfileDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processProfileFile(e.dataTransfer.files[0]);
    }
  };

  const handleProfileFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      processProfileFile(e.target.files[0]);
    }
  };

  const handleBondProfilePic = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadedProfilePic) return;

    setIsBondingProfilePic(true);

    const steps = [
      "Initializing profile picture sync...",
      "Analyzing avatar dimensions & metadata integrity...",
      `Deducting transaction fee of 0.002 ${userWalletChain === "Solana" ? "SOL" : "ETH"}...`,
      "Generating cryptographic signature payload...",
      `Bonding profile avatar to connected ${userWalletChain || "Web3"} address...`,
      "Consensus finalized! Profile picture successfully bonded."
    ];

    for (let i = 0; i < steps.length; i++) {
      setProfilePicStep(steps[i]);
      await new Promise((resolve) => setTimeout(resolve, 800));
    }

    if (userWalletAddress) {
      localStorage.setItem(`karma_bonded_profile_pic_${userWalletAddress}`, uploadedProfilePic);
    }
    
    // Deduct the 0.002 fee from wallet balance
    if (onDeductBalance) {
      onDeductBalance(0.002);
    }

    setBondedProfilePic(uploadedProfilePic);
    setIsBondingProfilePic(false);
    setShowProfilePicModal(false);
    setUploadedProfilePic(null);
  };

  const handleUnbondProfilePic = () => {
    if (userWalletAddress) {
      localStorage.removeItem(`karma_bonded_profile_pic_${userWalletAddress}`);
    }
    setBondedProfilePic(null);
  };

  if (!userWalletAddress) {
    return (
      <div className="rounded-3xl border border-white/10 bg-[#0d0d12]/35 backdrop-blur-md p-8 text-center space-y-6 shadow-2xl min-h-[380px] flex flex-col items-center justify-center">
        <div className="w-14 h-14 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-500 animate-pulse">
          <Layers2 className="w-7 h-7" />
        </div>
        <div className="space-y-2 max-w-sm">
          <h3 className="text-sm font-black font-mono tracking-wider text-white uppercase">No Wallet Connected</h3>
          <p className="text-xs text-slate-400 leading-relaxed font-normal">
            To view your on-chain NFT portfolio assets and secure your Soulbound Passport NFT, link your Solana or EVM wallet address.
          </p>
        </div>
        <button
          onClick={onConnectClick}
          className="px-5 py-2.5 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-black font-mono text-xs font-bold tracking-wider uppercase rounded-xl transition-all shadow-md flex items-center gap-1.5 active:scale-95 cursor-pointer"
        >
          <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          Connect Web3 Wallet
        </button>
      </div>
    );
  }

  // Dynamic Solana NFTs
  const SOLANA_NFTS: NFTAsset[] = [
    {
      id: "sol-nft-1",
      name: `Karma Solana Passport #${9000 + (currentScore % 1000)}`,
      collection: "Karma ID Passports",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80",
      rarity: `Elite (Top ${(100 - (currentScore / 10)).toFixed(1)}%)`,
      mintAddress: "KaRMsolanaSBT99999999999999999999999",
      verified: true,
      isPassport: true,
      attributes: [
        { trait_type: "Type", value: "Soulbound Identity" },
        { trait_type: "Karma Score", value: `${currentScore} / 1000` },
        { trait_type: "Bond Status", value: "Ledger Synced" },
        { trait_type: "Transfer", value: "NON-TRANSFERABLE" }
      ],
      description: `Official Soulbound Identity Passport. Holds secure cryptographically signed on-chain rep credentials. Note: This card is permanently bound to your address and can never leave your wallet, but its details and score will update automatically based on future checks of this wallet.`
    },
    {
      id: "sol-nft-2",
      name: "Mad Lads #1894",
      collection: "Mad Lads",
      image: madLadsNftImg,
      rarity: "Rare (Top 8.4%)",
      mintAddress: "LadsFfJdfXyZ8hjgkWqf823f9vD",
      verified: true,
      attributes: [
        { trait_type: "Type", value: "Mad" },
        { trait_type: "Clothing", value: "Laser Jacket" },
        { trait_type: "Background", value: "Hyper Cyber" }
      ],
      description: "A premier collection representing loyalty, active trading metrics, and social hub participation in the Solana ecosystem."
    },
    {
      id: "sol-nft-3",
      name: "Claynosaurz #4028",
      collection: "Claynosaurz",
      image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=400&q=80",
      rarity: "Epic (Top 3.1%)",
      mintAddress: "Clay9x9jKkv28Kdfks883hsd9Xz",
      verified: true,
      attributes: [
        { trait_type: "Species", value: "Raptor" },
        { trait_type: "Aura", value: "Golden Dust" },
        { trait_type: "Stance", value: "Primal Charge" }
      ],
      description: "A high-fidelity 3D clay dinosaur native to the Solana valleys, showcasing early ecosystem migration and staking participation."
    },
    {
      id: "sol-nft-5",
      name: "DeGods #2910",
      collection: "DeGods",
      image: degodsNftImg,
      rarity: "Legendary (Top 1.2%)",
      mintAddress: "DeGods9xKkv28Kdfks883hsd9Xz",
      verified: true,
      attributes: [
        { trait_type: "Mouth", value: "Cigarette" },
        { trait_type: "Background", value: "Vibrant Orange" },
        { trait_type: "Core", value: "White Skull" }
      ],
      description: "A legendary collection of divine misfits on Solana, representing identity, community clout, and digital artistry."
    },
    {
      id: "sol-nft-4",
      name: "Famous Fox #9251",
      collection: "Famous Fox Federation",
      image: "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=400&q=80",
      rarity: "Common (Top 42%)",
      mintAddress: "FoxF9v28kmQf23f923hs9823fsd",
      verified: true,
      attributes: [
        { trait_type: "Fur", value: "Cyber Blue" },
        { trait_type: "Hat", value: "DeFi Visor" },
        { trait_type: "Mouth", value: "Pocky Stick" }
      ],
      description: "A member of the Famous Fox Federation, a core utility hub on Solana offering tooling, dens, and token staking utilities."
    }
  ];

  // Dynamic EVM NFTs
  const EVM_NFTS: NFTAsset[] = [
    {
      id: "evm-nft-1",
      name: `Karma EVM Passport #${3000 + (currentScore % 1000)}`,
      collection: "Karma ID Passports",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=400&q=80",
      rarity: `Elite (Top ${(100 - (currentScore / 10)).toFixed(1)}%)`,
      mintAddress: "0xKarmEVMsbt999999999999999999999999999",
      verified: true,
      isPassport: true,
      attributes: [
        { trait_type: "Type", value: "Soulbound Identity" },
        { trait_type: "Karma Score", value: `${currentScore} / 1000` },
        { trait_type: "Bond Status", value: "Signer Verified" },
        { trait_type: "Transfer", value: "NON-TRANSFERABLE" }
      ],
      description: `Official Soulbound Identity Passport for Ethereum/EVM. Holds secure cryptographically signed on-chain rep credentials. Note: This card is permanently bound to your address and can never leave your wallet, but its details and score will update automatically based on future checks of this wallet.`
    },
    {
      id: "evm-nft-2",
      name: "Pudgy Penguin #7712",
      collection: "Pudgy Penguins",
      image: pudgyPenguinsNftImg,
      rarity: "Rare (Top 5.2%)",
      mintAddress: "0xPudg9310a08df82390ffcd238df7d9b9c9c82",
      verified: true,
      attributes: [
        { trait_type: "Background", value: "Studio Orange" },
        { trait_type: "Body", value: "Pink Polo" },
        { trait_type: "Hat", value: "Brown Mohawk" }
      ],
      description: "Embodying love, empathy, and positive vibes across Web3. Pudgy Penguins is a premier Ethereum brand bringing digital identity to the real world."
    },
    {
      id: "evm-nft-3",
      name: "Bored Ape Yacht Club #5049",
      collection: "Bored Ape Yacht Club",
      image: boredApesNftImg,
      rarity: "Epic (Top 1.5%)",
      mintAddress: "0xBAYC014c5f32890adbc88c12fa89bca7df620b7a",
      verified: true,
      attributes: [
        { trait_type: "Fur", value: "Trippy" },
        { trait_type: "Eyes", value: "Aviator Glasses" },
        { trait_type: "Hat", value: "Brown Mohawk" }
      ],
      description: "A collection of 10,000 Bored Ape NFTs living on the Ethereum blockchain. Owners gain membership to an elite yacht club portal."
    },
    {
      id: "evm-nft-4",
      name: "Lil Pudgy #8824",
      collection: "Lil Pudgys",
      image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=400&q=80",
      rarity: "Common (Top 35%)",
      mintAddress: "0xLilP823d0a2890ffcd238df7d9b9c9c823bfcdb",
      verified: true,
      attributes: [
        { trait_type: "Head", value: "Warm Beanie" },
        { trait_type: "Eyes", value: "Aviators" },
        { trait_type: "Main", value: "Pudgy Scarf" }
      ],
      description: "The adorable extension of the Pudgy Penguins ecosystem, participating in cross-chain bridge experiments and cute visual expressions."
    }
  ];

  const currentNfts = userWalletChain === "Solana" ? SOLANA_NFTS : EVM_NFTS;
  
  // Filter passport if not soulbound, we show it differently
  const displayedNfts = currentNfts.filter(nft => !nft.isPassport || isSoulbound);
  const passportNft = currentNfts.find(nft => nft.isPassport);

  // Auto-select first available NFT for the showcase when wallet changes or load
  const allAvailableNfts = [...displayedNfts, ...customNfts];
  useEffect(() => {
    if (allAvailableNfts.length > 0) {
      const nonPassport = allAvailableNfts.find(nft => !nft.isPassport);
      const target = nonPassport || allAvailableNfts[0];
      if (target) {
        setShowcaseNftName(target.name);
        setShowcaseNftImage(target.image);
      }
    }
  }, [userWalletAddress, userWalletChain, customNfts.length]);

  return (
    <div className="space-y-6">
      {/* Dynamic Header State */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white/[0.02] backdrop-blur-md border border-white/5 rounded-2xl p-5">
        <div>
          <h3 className="text-sm font-black font-mono tracking-wider text-white uppercase flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-yellow-500" />
            On-Chain NFT Portfolio Assets
          </h3>
          <p className="text-[11px] text-slate-400 font-mono mt-1">
            Connected Wallet: <span className="text-yellow-400 font-bold">{userWalletAddress ? `${userWalletAddress.slice(0, 8)}...${userWalletAddress.slice(-8)}` : "None"}</span>
          </p>
        </div>
        <div className="text-right">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-black bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 uppercase tracking-wider">
            {userWalletChain} Network Live
          </span>
        </div>
      </div>

      {/* SOULBOUND PASSPORT PROMPT BANNER (IF NOT MINTED) */}
      {!isSoulbound && passportNft && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-950/40 via-yellow-950/30 to-black border border-yellow-500/30 p-5 shadow-[0_0_25px_rgba(245,175,25,0.08)]"
        >
          {/* Metallic Sheen Effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_3s_infinite]" />
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
            <div className="flex items-start gap-3.5 max-w-xl">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500/20 to-amber-500/10 border border-yellow-500/30 flex items-center justify-center text-yellow-400 shrink-0">
                <Sparkles className="w-6 h-6 animate-pulse" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-black font-mono tracking-wider text-yellow-400 uppercase flex items-center gap-1.5">
                  ✨ IDENTITY ENCRYPTION PENDING ✨
                </h4>
                <p className="text-[11px] text-slate-300 font-sans leading-relaxed">
                  Your dynamic reputation score is live, but your <strong>Soulbound Passport NFT</strong> is not yet anchored. Mint this secure, non-transferable certificate now.
                </p>
                <div className="text-[10px] text-slate-400 font-mono flex items-center gap-1 bg-black/40 border border-white/5 px-2 py-0.5 rounded-md inline-block">
                  <Info className="w-3 h-3 text-yellow-400 inline" />
                  <span>SBT Protocol: Never leaves your wallet. Real-time updates based on active checks.</span>
                </div>
              </div>
            </div>

            <button
              onClick={onMintPassport}
              disabled={isMinting}
              className="px-5 py-3 sm:py-2.5 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-black font-mono text-xs font-black tracking-wider uppercase rounded-xl transition-all shadow-lg hover:shadow-yellow-500/10 flex flex-col sm:flex-row items-center justify-center gap-1.5 shrink-0 cursor-pointer active:scale-95 disabled:opacity-80"
            >
              {isMinting ? (
                <div className="flex items-center gap-2">
                  <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>MINTING...</span>
                </div>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-black" />
                  <span>MINT SOULBOUND NFT NOW</span>
                </>
              )}
            </button>
          </div>

          {isMinting && (
            <div className="mt-3 pt-3 border-t border-yellow-500/10 text-[10px] font-mono text-yellow-400 animate-pulse text-center uppercase tracking-wide">
              {mintStep}
            </div>
          )}
        </motion.div>
      )}

      {/* GLASSY GRID OF NFTS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {/* ADD CUSTOM NFT CARD ACTION */}
        <motion.div
          onClick={() => setShowAddModal(true)}
          className="group relative overflow-hidden rounded-2xl bg-[#08090d]/30 backdrop-blur-md border border-dashed border-yellow-500/20 hover:border-yellow-500/50 p-4 hover:bg-yellow-500/[0.02] transition-all cursor-pointer shadow-md flex flex-col items-center justify-center text-center min-h-[220px] select-none space-y-3"
        >
          <div className="w-12 h-12 rounded-full bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-500 group-hover:scale-110 transition-all duration-300">
            <Plus className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h4 className="text-xs font-black text-white font-mono tracking-wider uppercase group-hover:text-yellow-400 transition-colors">
              Soulbond Custom NFT
            </h4>
            <p className="text-[10px] text-slate-400 font-sans max-w-[160px] mx-auto leading-normal">
              Bind a custom personal NFT asset permanently to this connected wallet.
            </p>
          </div>
        </motion.div>

        {/* BOND PROFILE PICTURE CARD ACTION */}
        <motion.div
          onClick={() => setShowProfilePicModal(true)}
          className="group relative overflow-hidden rounded-2xl bg-[#08090d]/30 backdrop-blur-md border border-dashed border-emerald-500/20 hover:border-emerald-500/50 p-4 hover:bg-emerald-500/[0.02] transition-all cursor-pointer shadow-md flex flex-col items-center justify-center text-center min-h-[220px] select-none space-y-3"
        >
          {bondedProfilePic ? (
            <div className="relative">
              <img 
                src={bondedProfilePic} 
                alt="Bonded Profile Pic" 
                className="w-16 h-16 rounded-full object-cover border-2 border-emerald-500 shadow-lg shadow-emerald-500/15 group-hover:scale-105 transition-all duration-300"
              />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border border-black flex items-center justify-center text-[10px] text-black font-black">
                ✓
              </div>
            </div>
          ) : (
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-all duration-300">
              <UploadCloud className="w-6 h-6" />
            </div>
          )}
          <div className="space-y-1">
            <h4 className="text-xs font-black text-white font-mono tracking-wider uppercase group-hover:text-emerald-400 transition-colors">
              {bondedProfilePic ? "Profile Picture Bonded" : "Bond Profile Picture"}
            </h4>
            <p className="text-[10px] text-slate-400 font-sans max-w-[160px] mx-auto leading-normal">
              {bondedProfilePic 
                ? "Your custom avatar is linked to all owned portfolio NFTs."
                : "Upload an avatar and link it to every NFT on this connected wallet."}
            </p>
            {bondedProfilePic && (
              <button 
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleUnbondProfilePic();
                }}
                className="inline-block mt-2 text-[9px] font-mono text-red-400 hover:text-red-300 underline cursor-pointer bg-transparent border-none outline-none"
              >
                Unbond Avatar
              </button>
            )}
          </div>
        </motion.div>

        {/* CUSTOM USER SOULBOUND NFTS */}
        {customNfts.map((nft) => (
          <motion.div
            key={nft.id}
            layoutId={nft.id}
            onClick={() => setSelectedNft(nft)}
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-b from-amber-950/15 to-black/90 border border-amber-500/30 p-3.5 hover:border-amber-400 transition-all cursor-pointer shadow-lg hover:shadow-amber-500/5 select-none"
          >
            {/* Custom SBT Badge */}
            <div className="absolute top-2.5 right-2.5 z-10 bg-amber-500 text-black text-[8px] font-black tracking-widest px-1.5 py-0.5 rounded-md uppercase shadow flex items-center gap-0.5 animate-pulse">
              <Check className="w-2.5 h-2.5" />
              SBT OWNED
            </div>

            {/* Glowing background */}
            <div className="absolute inset-0 bg-radial from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-slate-950/60 mb-3 border border-white/5">
              <img
                src={nft.image}
                alt={nft.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
              />
            </div>

            <div className="space-y-1">
              <div className="text-[9px] font-mono font-bold text-amber-500 tracking-wider uppercase">
                {nft.collection}
              </div>
              <h4 className="text-xs font-black text-white truncate font-display group-hover:text-amber-400 transition-colors">
                {nft.name}
              </h4>
              <div className="flex items-center justify-between pt-1">
                <span className="text-[9px] font-mono text-slate-400 truncate">
                  Owner: <strong className="text-yellow-400">{userWalletAddress?.slice(0, 6)}...{userWalletAddress?.slice(-4)}</strong>
                </span>
                <div className="flex flex-col items-end">
                  {bondedProfilePic && (
                    <img 
                      src={bondedProfilePic} 
                      alt="Bonded Profile" 
                      className="w-5 h-5 rounded-full object-cover border border-amber-500/40 mb-1" 
                    />
                  )}
                  <span className="text-[9px] font-mono text-amber-500 font-bold bg-amber-500/10 px-1 rounded-sm">
                    Custom
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* If Soulbound is active, the passport is listed here in the grid as well! */}
        {isSoulbound && passportNft && (
          <motion.div
            layoutId={passportNft.id}
            onClick={() => setSelectedNft(passportNft)}
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-b from-yellow-950/20 to-black/90 border border-yellow-500/35 p-3.5 hover:border-yellow-400 transition-all cursor-pointer shadow-lg hover:shadow-yellow-500/5 select-none"
          >
            {/* Corner Badge */}
            <div className="absolute top-2.5 right-2.5 z-10 bg-yellow-500 text-black text-[8px] font-black tracking-widest px-1.5 py-0.5 rounded-md uppercase shadow flex items-center gap-0.5 animate-pulse">
              <Check className="w-2.5 h-2.5" />
              SOULBOUND
            </div>

            {/* Glowing background */}
            <div className="absolute inset-0 bg-radial from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-slate-950/60 mb-3 border border-white/5">
              <img
                src={passportNft.image}
                alt={passportNft.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
              />
            </div>

            <div className="space-y-1">
              <div className="text-[9px] font-mono font-bold text-yellow-500 tracking-wider uppercase">
                {passportNft.collection}
              </div>
              <h4 className="text-xs font-black text-white truncate font-display group-hover:text-yellow-400 transition-colors">
                {passportNft.name}
              </h4>
              <div className="flex items-center justify-between pt-1">
                <span className="text-[10px] font-mono text-slate-400 truncate">
                  Score: <strong className="text-white">{currentScore}</strong>
                </span>
                <div className="flex flex-col items-end">
                  {bondedProfilePic && (
                    <img 
                      src={bondedProfilePic} 
                      alt="Bonded Profile" 
                      className="w-5 h-5 rounded-full object-cover border border-yellow-500/40 mb-1" 
                    />
                  )}
                  <span className="text-[9px] font-mono text-yellow-500 font-bold bg-yellow-500/10 px-1 rounded-sm">
                    Active
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {displayedNfts.map((nft) => (
          <motion.div
            key={nft.id}
            layoutId={nft.id}
            onClick={() => setSelectedNft(nft)}
            className="group relative overflow-hidden rounded-2xl bg-[#08090d]/60 backdrop-blur-md border border-white/5 p-3.5 hover:border-white/20 transition-all cursor-pointer shadow-md hover:shadow-white/5 select-none"
          >
            {/* Rarity badge */}
            <div className="absolute top-2.5 right-2.5 z-10 bg-black/75 backdrop-blur border border-white/10 text-white text-[8px] font-mono px-1.5 py-0.5 rounded-md">
              {nft.rarity.split(" ")[0]}
            </div>

            <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-slate-950/40 mb-3 border border-white/5">
              <img
                src={nft.image}
                alt={nft.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
              />
            </div>

            <div className="space-y-1">
              <div className="text-[9px] font-mono font-semibold text-slate-500 tracking-wider">
                {nft.collection}
              </div>
              <h4 className="text-xs font-bold text-white truncate font-display group-hover:text-yellow-400 transition-colors">
                {nft.name}
              </h4>
              <div className="flex items-center justify-between pt-1">
                <span className="text-[9px] font-mono text-slate-500 truncate">
                  {nft.mintAddress.slice(0, 4)}...{nft.mintAddress.slice(-4)}
                </span>
                <div className="flex flex-col items-end">
                  {bondedProfilePic && (
                    <img 
                      src={bondedProfilePic} 
                      alt="Bonded Profile" 
                      className="w-5 h-5 rounded-full object-cover border border-emerald-500/40 mb-1 shadow-md shadow-emerald-500/10" 
                    />
                  )}
                  <span className="text-[9px] font-mono text-emerald-400 font-black flex items-center gap-0.5">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    Verified
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* DYNAMIC SBT BEHAVIOR NOTIFICATION BOX */}
      <div className="p-4 bg-white/[0.01] border border-white/5 rounded-2xl space-y-2">
        <h4 className="text-[11px] font-mono font-bold text-white uppercase flex items-center gap-1.5">
          <Cpu className="w-3.5 h-3.5 text-yellow-500 animate-pulse" />
          Dynamically Calibrated Metadata Loop
        </h4>
        <p className="text-[11px] text-slate-400 leading-relaxed">
          The <strong>Karma Soulbound Card</strong> acts as an on-chain proxy of your reputation credentials. Once minted, the certificate is tethered permanently and can never leave your wallet. However, when new checks occur (e.g. Sybil screening, social updates, or risk changes), the data securely updates on the passport card interface automatically.
        </p>
      </div>

      {/* INTERACTIVE DEMO: ZERO-KNOWLEDGE PRIVATE IDENTITY SHOWCASE */}
      <div className="relative rounded-3xl border border-yellow-500/15 bg-gradient-to-b from-[#0a0a0f] to-[#040407] p-5 sm:p-6 overflow-hidden shadow-2xl">
        {/* Decorative corner grid background to highlight prestige */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-yellow-500/[0.015] rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-yellow-500/[0.01] rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-4 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-yellow-500/10 border border-yellow-500/25 flex items-center justify-center text-yellow-500 shrink-0">
                <Lock className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-mono font-black text-white uppercase tracking-wider">
                  Private Identity Showcase
                </h3>
                <p className="text-[10px] text-slate-500 font-mono">
                  Zero-Knowledge Proof of Asset Ownership
                </p>
              </div>
            </div>
            <span className="self-start sm:self-center px-2 py-0.5 rounded-md text-[8px] font-mono font-bold bg-amber-500/10 border border-amber-500/20 text-amber-500 uppercase tracking-widest">
              ZK-Proofs v1.4
            </span>
          </div>

          <p className="text-[11px] text-slate-400 leading-normal font-sans">
            Prove you own specific high-value NFTs and bind them directly to your official X handle <strong>without ever revealing your public wallet address</strong> or exposing your net worth to public ledger tracking.
          </p>

          <div className="space-y-4 p-4 rounded-2xl bg-black/45 border border-white/5 relative">
            
            {/* Step 1: Select Your Verified Asset */}
            <div className="space-y-2">
              <label className="block text-[9px] font-mono text-slate-500 uppercase tracking-widest">
                1. Select Asset to Prove
              </label>
              {allAvailableNfts.length > 0 ? (
                // Render scrollable row of their ACTUAL connected NFTs
                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                  {allAvailableNfts.map((nft) => (
                    <button
                      key={nft.id}
                      type="button"
                      disabled={showcaseProvingState === "proving"}
                      onClick={() => {
                        setShowcaseNftName(nft.name);
                        setShowcaseNftImage(nft.image);
                        if (showcaseProvingState === "done") {
                          setShowcaseProvingState("idle");
                          setShowcaseSharedResult(null);
                        }
                      }}
                      className={`flex-shrink-0 p-2 rounded-xl text-left border text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer max-w-[160px] ${
                        showcaseNftName === nft.name
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
              ) : (
                // Fallback collections
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { name: "Mad Lads", image: madLadsNftImg },
                    { name: "Pudgy Penguins", image: pudgyPenguinsNftImg },
                    { name: "DeGods", image: degodsNftImg },
                    { name: "Bored Apes", image: boredApesNftImg }
                  ].map((nft) => (
                    <button
                      key={nft.name}
                      type="button"
                      disabled={showcaseProvingState === "proving"}
                      onClick={() => {
                        setShowcaseNftName(nft.name);
                        setShowcaseNftImage(nft.image);
                        if (showcaseProvingState === "done") {
                          setShowcaseProvingState("idle");
                          setShowcaseSharedResult(null);
                        }
                      }}
                      className={`p-2 rounded-xl text-left border text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                        showcaseNftName === nft.name
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
              )}
            </div>

            {/* Step 2: Target X Handle */}
            <div className="space-y-1.5">
              <label className="block text-[9px] font-mono text-slate-500 uppercase tracking-widest">
                2. Target X (Twitter) Handle
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-xs font-mono text-slate-500 select-none">@</span>
                <input
                  type="text"
                  disabled={showcaseProvingState === "proving"}
                  value={showcaseTwitterHandle}
                  onChange={(e) => {
                    setShowcaseTwitterHandle(e.target.value.trim().replace("@", ""));
                    if (showcaseProvingState === "done") {
                      setShowcaseProvingState("idle");
                      setShowcaseSharedResult(null);
                    }
                  }}
                  placeholder="username"
                  className="w-full pl-7 pr-3 py-2 bg-slate-950/60 border border-slate-900 focus:border-yellow-500/30 text-xs text-white rounded-xl font-mono focus:outline-none transition-all"
                />
              </div>
            </div>

            {/* Step 3: Action Trigger */}
            <div className="pt-1">
              <button
                type="button"
                onClick={handleStartShowcaseProof}
                disabled={showcaseProvingState === "proving" || !showcaseTwitterHandle}
                className="w-full py-2 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-black font-mono text-xs font-black tracking-wider uppercase rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                {showcaseProvingState === "idle" && "Assemble Private Proof ⚡"}
                {showcaseProvingState === "proving" && `Proving ownership (${showcaseProgress}%)`}
                {showcaseProvingState === "done" && "Generate New Proof ↺"}
              </button>
            </div>

            {/* Inline Error Display if any */}
            {showcaseError && (
              <div className="p-2 border border-rose-500/20 bg-rose-500/5 text-rose-400 font-mono text-[10px] rounded-lg">
                ⚠️ {showcaseError}
              </div>
            )}

            {/* Step 4: Verification Result */}
            <AnimatePresence>
              {showcaseProvingState !== "idle" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="border-t border-white/5 pt-3 mt-3 space-y-3 overflow-hidden text-left"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono font-bold text-yellow-500 uppercase tracking-wider flex items-center gap-1">
                      <Fingerprint className="w-3.5 h-3.5 animate-pulse" />
                      Status: {showcaseProvingState.toUpperCase()}
                    </span>
                    <span className="text-[8px] font-mono text-slate-500">
                      Method: ZK-Snarks (Groth16)
                    </span>
                  </div>

                  {showcaseProvingState === "proving" && (
                    <div className="space-y-2">
                      <div className="w-full bg-slate-950/80 rounded-full h-1.5 border border-white/5 overflow-hidden">
                        <motion.div
                          className="bg-yellow-500 h-1.5 rounded-full"
                          initial={{ width: "0%" }}
                          animate={{ width: `${showcaseProgress}%` }}
                          transition={{ duration: 0.1 }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-[9px] font-mono text-slate-400">
                        <span className="animate-pulse">Computing witness values...</span>
                        <span>{showcaseProgress}%</span>
                      </div>
                    </div>
                  )}

                  {showcaseProvingState === "done" && (
                    <div className="space-y-3">
                      <div className="p-3 bg-[#03060c] border border-blue-500/10 rounded-xl space-y-2 font-mono">
                        <div className="flex items-center gap-1.5 text-[10px] text-blue-400 font-bold uppercase">
                          <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                          Cryptographic Signatures Sealed
                        </div>
                        <div className="space-y-1 text-[9px] text-slate-400 border-l-2 border-blue-500/20 pl-2 py-0.5">
                          <div><span className="text-slate-600">Asset:</span> {showcaseNftName}</div>
                          <div><span className="text-slate-600">Proof Anchor:</span> {showcaseTwitterHandle.toLowerCase()}_zkp_anchor</div>
                          <div className="truncate"><span className="text-slate-600">ZKP Signature:</span> 0xzk98A190...72f10b74955a12efd91</div>
                        </div>
                      </div>

                      <p className="text-[10px] text-slate-400 font-sans leading-relaxed text-center">
                        🔑 <strong>The Ultimate Flex:</strong> You prove 100% on-chain ownership of your {showcaseNftName} directly to @{showcaseTwitterHandle}, but your actual wallet address is kept offline and protected.
                      </p>

                      {/* X Integration and Mirror */}
                      <div className="pt-1">
                        {!showcaseIsSharing && !showcaseSharedResult && (
                          <button
                            type="button"
                            onClick={handleShareShowcaseProof}
                            className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-[#1d9bf0] to-[#147dbd] hover:from-[#1a8cd8] hover:to-[#1169a1] text-white font-mono text-[10px] font-black uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <Twitter className="w-3.5 h-3.5 text-white" />
                            Share Proof to X & Mirror to Karma AI ⚡
                          </button>
                        )}

                        {showcaseIsSharing && (
                          <div className="p-3 rounded-xl border border-blue-500/20 bg-blue-950/10 space-y-2 text-center">
                            <div className="flex items-center justify-center">
                              <Loader2 className="w-4 h-4 text-[#1d9bf0] animate-spin" />
                            </div>
                            <p className="text-[10px] text-[#1d9bf0] font-mono animate-pulse">
                              {showcaseSharingStep}
                            </p>
                          </div>
                        )}

                        {showcaseSharedResult && (
                          <div className="space-y-2">
                            <div className="p-3 rounded-xl border border-emerald-500/25 bg-[#040906]/60 text-left space-y-2">
                              <div className="flex items-center gap-1.5">
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                                <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider">
                                  Proof Permanently Dispatched & Verified
                                </span>
                              </div>
                              <p className="text-[8px] font-mono text-slate-500">
                                PROOF ID: {showcaseSharedResult.id} • SUCCESS
                              </p>

                              <div className="grid grid-cols-1 gap-2 pt-1">
                                <div className="p-2 rounded bg-black/40 border border-slate-900 flex flex-col justify-between space-y-2">
                                  <div className="space-y-1">
                                    <div className="flex items-center justify-between">
                                      <span className="text-[8px] font-mono text-slate-400 font-bold flex items-center gap-1">
                                        <Twitter className="w-2 h-2 text-[#1d9bf0]" />
                                        @{showcaseTwitterHandle} Feed
                                      </span>
                                      <span className="text-[7px] font-mono text-emerald-400 font-black">● POSTED</span>
                                    </div>
                                    <p className="text-[9px] text-slate-300 font-sans italic leading-relaxed">
                                      "{showcaseSharedResult.userTweetText.slice(0, 110)}..."
                                    </p>
                                  </div>
                                  <a
                                    href={showcaseSharedResult.userPostUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full py-1 text-center rounded bg-[#1d9bf0]/10 hover:bg-[#1d9bf0]/20 text-[#1d9bf0] text-[8px] font-mono font-bold uppercase tracking-wider transition-all block flex items-center justify-center gap-1"
                                  >
                                    <ExternalLink className="w-2 h-2" /> View @{showcaseTwitterHandle} Feed
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>
      </div>

      {/* EXPANDED NFT DETAIL MODAL */}
      <AnimatePresence>
        {selectedNft && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedNft(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            />

            <motion.div
              layoutId={selectedNft.id}
              className="relative w-full max-w-lg bg-[#0c0d12] border border-white/15 rounded-3xl p-5 sm:p-7 shadow-2xl z-10 max-h-[90vh] overflow-y-auto text-slate-200 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent"
            >
              {/* Top border decoration */}
              <div className={`absolute top-0 left-0 right-0 h-[3px] ${selectedNft.isPassport ? "bg-gradient-to-r from-yellow-500 to-amber-500" : "bg-gradient-to-r from-slate-800 to-slate-700"}`} />

              <div className="flex justify-between items-start mb-4 pb-2 border-b border-slate-800/60 pr-1">
                <div>
                  <span className="text-[10px] font-mono font-bold text-yellow-500 uppercase tracking-widest block">
                    {selectedNft.collection}
                  </span>
                  <h3 className="text-base sm:text-lg font-black text-white font-display leading-tight">
                    {selectedNft.name}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedNft(null)}
                  className="p-2 hover:bg-slate-800/60 bg-slate-900 rounded-full text-slate-300 hover:text-white transition-all text-xs font-mono cursor-pointer flex items-center justify-center w-7 h-7 shrink-0 ml-2"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Visual */}
                <div className="space-y-3">
                  <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-950 border border-white/5 max-w-[180px] sm:max-w-none mx-auto w-full">
                    <img
                      src={selectedNft.image}
                      alt={selectedNft.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    {selectedNft.isPassport && (
                      <div className="absolute top-2.5 right-2.5 bg-yellow-500 text-black text-[8px] font-black tracking-wider px-2 py-0.5 rounded-md uppercase">
                        Soulbound Certificate
                      </div>
                    )}
                  </div>

                  <div className="p-3 bg-black/40 rounded-xl border border-white/5 space-y-1">
                    <div className="text-[9px] font-mono text-slate-500 uppercase">Mint Key</div>
                    <div className="text-[10px] font-mono text-slate-300 truncate select-all flex items-center justify-between">
                      <span>{selectedNft.mintAddress}</span>
                      <ExternalLink className="w-3 h-3 text-slate-500 hover:text-white ml-1 cursor-pointer inline" />
                    </div>
                  </div>
                </div>

                {/* Metadata & Attributes */}
                <div className="flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <span className="text-[9px] font-mono text-slate-500 uppercase">Item Integrity Description</span>
                      <p className="text-xs text-slate-300 leading-relaxed font-normal">
                        {selectedNft.description}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <span className="text-[9px] font-mono text-slate-500 uppercase">On-Chain Attributes</span>
                      <div className="grid grid-cols-2 gap-2">
                        {selectedNft.attributes.map((attr, idx) => (
                          <div key={idx} className="p-2 bg-white/[0.02] border border-white/5 rounded-lg">
                            <span className="block text-[8px] font-mono text-slate-500 uppercase truncate">
                              {attr.trait_type}
                            </span>
                            <span className="block text-[11px] font-bold text-white truncate mt-0.5">
                              {attr.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {selectedNft.id.startsWith("custom-") ? (
                    <div className="space-y-3.5">
                      <div className="p-3 bg-amber-500/10 border border-amber-500/25 text-amber-400 rounded-xl flex items-center gap-2 text-xs font-mono">
                        <Fingerprint className="w-4 h-4 shrink-0 text-amber-400 animate-pulse" />
                        <span>Soulbound to Wallet Connected Proof</span>
                      </div>
                      <button
                        onClick={() => handleRemoveCustom(selectedNft.id)}
                        className="w-full py-2.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/25 text-red-400 font-mono text-[11px] font-black rounded-xl uppercase transition-all tracking-wider flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                        Unsoulbond Custom Asset
                      </button>
                    </div>
                  ) : selectedNft.isPassport && !isSoulbound ? (
                    <button
                      onClick={() => {
                        onMintPassport();
                        setSelectedNft(null);
                      }}
                      className="w-full py-3 bg-gradient-to-r from-yellow-500 to-amber-500 text-black font-mono text-xs font-black rounded-xl uppercase transition-all tracking-wider flex items-center justify-center gap-1.5 cursor-pointer hover:from-yellow-400 hover:to-amber-400"
                    >
                      <Sparkles className="w-4 h-4" />
                      MINT PASSPORT NOW
                    </button>
                  ) : (
                    <div className="p-3 bg-emerald-950/15 border border-emerald-500/20 text-emerald-400 rounded-xl flex items-center gap-2 text-xs font-mono">
                      <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-400" />
                      <span>Ledger Verified On-Chain Rep</span>
                    </div>
                  )}
                </div>
              </div>

              {/* SHARE TO X INTEGRATION */}
              <div className="mt-5 pt-4 border-t border-slate-800/80 space-y-3">
                <div className="flex items-center gap-2">
                  <Twitter className="w-4 h-4 text-[#1d9bf0]" />
                  <h4 className="text-[11px] font-mono text-slate-300 font-bold uppercase tracking-wider">
                    Cryptographic Proof Dispatcher
                  </h4>
                </div>

                {!isSharingNftX && !sharedNftXResult && (
                  <div className="space-y-2.5">
                    <p className="text-[10px] text-slate-400 font-sans leading-relaxed">
                      Prove ownership of this elite asset instantly to your X feed without exposing your actual wallet address to public scraping bots.
                    </p>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <span className="absolute left-2.5 top-2 text-slate-500 text-xs font-mono">@</span>
                        <input
                          type="text"
                          value={nftTwitterHandle}
                          onChange={(e) => setNftTwitterHandle(e.target.value.replace(/[^a-zA-Z0-9_]/g, ""))}
                          placeholder="username"
                          className="w-full bg-slate-950/80 border border-slate-800 rounded-lg py-1.5 pl-6 pr-2 text-xs text-white font-mono focus:outline-none focus:border-yellow-500/40 transition-all"
                        />
                      </div>
                      <button
                        onClick={handleShareNftToX}
                        className="py-1.5 px-3 rounded-lg bg-gradient-to-r from-[#1d9bf0] to-[#147dbd] hover:from-[#1a8cd8] hover:to-[#1169a1] text-white font-mono text-[10px] font-black uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-[0.98] shrink-0"
                      >
                        Share to X ⚡
                      </button>
                    </div>
                    {shareNftXError && (
                      <p className="text-[9px] font-mono text-red-400 mt-1">
                        ⚠️ {shareNftXError}
                      </p>
                    )}
                  </div>
                )}

                {isSharingNftX && (
                  <div className="p-3 rounded-xl border border-blue-500/20 bg-blue-950/10 space-y-2 text-center">
                    <div className="flex items-center justify-center">
                      <Loader2 className="w-4 h-4 text-[#1d9bf0] animate-spin" />
                    </div>
                    <p className="text-[10px] text-[#1d9bf0] font-mono animate-pulse">
                      {sharingNftXStep}
                    </p>
                  </div>
                )}

                {sharedNftXResult && (
                  <div className="p-3 rounded-xl border border-emerald-500/25 bg-[#040906]/60 space-y-2.5">
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase">
                        Proof Dispatched & Mirrored!
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <a
                        href={sharedNftXResult.userPostUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-1 px-2 text-center rounded bg-[#1d9bf0]/10 hover:bg-[#1d9bf0]/20 text-[#1d9bf0] text-[9px] font-mono font-bold uppercase transition-all block truncate"
                      >
                        View Feed Post
                      </a>
                      <a
                        href={sharedNftXResult.officialPostUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-1 px-2 text-center rounded bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-500 text-[9px] font-mono font-bold uppercase transition-all block truncate"
                      >
                        View Karma Proof
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Close Button for Better UX */}
              <div className="mt-5 pt-3 border-t border-slate-800/80 flex flex-col items-center gap-3">
                <button
                  onClick={() => setSelectedNft(null)}
                  className="w-full py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white font-mono text-[10px] font-bold rounded-xl uppercase transition-all tracking-wider cursor-pointer"
                >
                  Dismiss Card View
                </button>
                <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">
                  Secured by Karma dynamic indexer consensus
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* SOULBOND CUSTOM NFT MODAL FORM */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop with blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                if (!isMintingCustom) setShowAddModal(false);
              }}
              className="absolute inset-0 bg-black/95 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 180 }}
              className="relative w-full max-w-lg bg-[#07070b] border border-amber-500/20 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(245,158,11,0.1)] z-10 overflow-hidden text-slate-200"
            >
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600" />

              {/* STAGE 1: SOULBOND PROCESSING SCREEN */}
              {isMintingCustom ? (
                <div className="py-8 text-center space-y-6">
                  {/* Holographic scanning animation */}
                  <div className="flex items-center justify-center">
                    <div className="relative w-28 h-28 flex items-center justify-center">
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
                        className="absolute inset-0 rounded-full border-2 border-dashed border-amber-500/30"
                      />
                      <motion.div 
                        animate={{ scale: [1, 1.05, 1], opacity: [0.6, 1, 0.6] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                        className="w-16 h-16 rounded-full bg-amber-500/5 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-xl"
                      >
                        <Loader2 className="w-8 h-8 text-amber-400 animate-spin absolute" />
                        <Fingerprint className="w-5 h-5 text-amber-500" />
                      </motion.div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <span className="text-[10px] font-mono tracking-[0.3em] font-black text-amber-400 uppercase block">
                      Reputation Registry Sync
                    </span>
                    <h3 className="text-xl font-black font-display text-white tracking-wide uppercase">
                      Anchoring Soulbound Artifact
                    </h3>
                    <p className="text-xs text-amber-400 font-mono tracking-wide bg-amber-500/5 border border-amber-500/10 rounded-xl py-3 px-4 max-w-md mx-auto animate-pulse">
                      {customMintStep}
                    </p>
                  </div>

                  {/* Tiny progress line */}
                  <div className="max-w-xs mx-auto">
                    <div className="h-1 w-full bg-slate-900 rounded-full overflow-hidden border border-white/5">
                      <motion.div 
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 5.1, ease: "easeInOut" }}
                        className="h-full bg-gradient-to-r from-yellow-500 to-amber-500"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                /* STAGE 2: CUSTOM FORM ENTRY */
                <form onSubmit={handleMintCustom} className="space-y-5">
                  <div className="flex justify-between items-start border-b border-white/5 pb-3">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest block">
                        Wallet Connection Identity
                      </span>
                      <h3 className="text-base sm:text-lg font-black text-white font-display uppercase tracking-wide">
                        Soulbond Custom Asset
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowAddModal(false)}
                      className="p-1.5 hover:bg-white/5 rounded-lg text-slate-400 hover:text-white transition-all text-xs font-mono cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>

                  {/* Connected Wallet Alert Box */}
                  <div className="p-3 bg-yellow-500/5 border border-yellow-500/15 rounded-xl flex items-center gap-2 text-[10px] font-mono text-amber-400">
                    <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>
                      This NFT will be permanently tethered to: <strong className="text-white select-all">{userWalletAddress?.slice(0, 8)}...{userWalletAddress?.slice(-8)}</strong>
                    </span>
                  </div>

                  <div className="space-y-4">
                    {/* File Upload Zone */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block text-left">
                        Upload Asset Image <span className="text-red-400">*</span>
                      </label>
                      
                      <div 
                        onDragEnter={handleDrag}
                        onDragOver={handleDrag}
                        onDragLeave={handleDrag}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                        className={`relative rounded-2xl border-2 border-dashed p-5 transition-all cursor-pointer flex flex-col items-center justify-center text-center space-y-2 min-h-[140px] ${
                          dragActive 
                            ? "border-yellow-400 bg-yellow-500/5" 
                            : uploadedImage 
                              ? "border-emerald-500/30 bg-emerald-950/10" 
                              : "border-slate-800 hover:border-yellow-500/35 bg-black/40"
                        }`}
                      >
                        <input 
                          ref={fileInputRef}
                          type="file" 
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                        
                        {uploadedImage ? (
                          <div className="space-y-3 w-full flex flex-col items-center">
                            <div className="relative aspect-square w-24 h-24 rounded-xl overflow-hidden border border-emerald-500/30 shadow-md">
                              <img src={uploadedImage} alt="Preview" className="w-full h-full object-cover" />
                              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-all">
                                <span className="text-[9px] font-mono text-white bg-black/80 px-2 py-1 rounded-md">Change File</span>
                              </div>
                            </div>
                            <span className="text-[10px] font-mono text-emerald-400 font-bold block flex items-center gap-1">
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              Image payload successfully decoded
                            </span>
                          </div>
                        ) : (
                          <div className="space-y-2 py-1">
                            <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800/80 flex items-center justify-center text-slate-500 mx-auto">
                              <UploadCloud className="w-5 h-5 text-slate-400" />
                            </div>
                            <div>
                              <p className="text-[11px] text-slate-300 font-bold">
                                Drag & Drop Image File here
                              </p>
                              <p className="text-[9px] text-slate-500 font-mono mt-0.5">
                                or Click to browse system directory
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Inputs Row */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1 text-left">
                        <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                          Asset Name <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Karma Guardian #01"
                          value={customName}
                          onChange={(e) => setCustomName(e.target.value)}
                          className="w-full bg-black/50 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-yellow-500/40 transition-all placeholder-slate-600"
                        />
                      </div>

                      <div className="space-y-1 text-left">
                        <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                          Collection
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Founder Badges"
                          value={customCollection}
                          onChange={(e) => setCustomCollection(e.target.value)}
                          className="w-full bg-black/50 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-yellow-500/40 transition-all placeholder-slate-600"
                        />
                      </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-1 text-left">
                      <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                        Item Integrity Description
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Detail the significance of this custom portfolio credential..."
                        value={customDesc}
                        onChange={(e) => setCustomDesc(e.target.value)}
                        className="w-full bg-black/50 border border-slate-800 rounded-xl px-3 py-2 text-xs font-sans text-white focus:outline-none focus:border-yellow-500/40 transition-all placeholder-slate-600 leading-normal"
                      />
                    </div>

                    {/* Custom Attributes/Traits */}
                    <div className="space-y-2 text-left">
                      <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                        Decentralized Attributes (Traits)
                      </label>
                      
                      {/* Traits List */}
                      {customTraits.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 p-2 bg-black/35 border border-slate-900 rounded-xl max-h-24 overflow-y-auto">
                          {customTraits.map((trait, idx) => (
                            <div key={idx} className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-slate-900 border border-white/5 text-[9px] font-mono">
                              <span className="text-slate-500">{trait.trait_type}:</span>
                              <span className="text-amber-400 font-bold">{trait.value}</span>
                              <button 
                                type="button"
                                onClick={(e) => { e.stopPropagation(); handleRemoveTrait(idx); }}
                                className="text-slate-400 hover:text-red-400 transition-colors cursor-pointer text-[10px] ml-1"
                              >
                                ✕
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {/* Trait Inputs */}
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Trait Name (e.g. Origin)"
                          value={newTraitType}
                          onChange={(e) => setNewTraitType(e.target.value)}
                          className="flex-1 bg-black/50 border border-slate-800 rounded-xl px-2.5 py-1.5 text-[10px] font-mono text-white focus:outline-none focus:border-yellow-500/30 placeholder-slate-600"
                        />
                        <input
                          type="text"
                          placeholder="Value (e.g. Genesis)"
                          value={newTraitValue}
                          onChange={(e) => setNewTraitValue(e.target.value)}
                          className="flex-1 bg-black/50 border border-slate-800 rounded-xl px-2.5 py-1.5 text-[10px] font-mono text-white focus:outline-none focus:border-yellow-500/30 placeholder-slate-600"
                        />
                        <button
                          type="button"
                          onClick={handleAddTrait}
                          className="px-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-yellow-500/30 text-amber-400 font-mono text-[10px] transition-all rounded-xl cursor-pointer"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-3 border-t border-white/5">
                    <button
                      type="button"
                      onClick={() => setShowAddModal(false)}
                      className="px-4 py-2 text-slate-400 hover:text-white font-mono text-xs cursor-pointer transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={!customName || !uploadedImage}
                      className="px-6 py-2.5 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-black font-black font-mono text-xs tracking-wide rounded-xl uppercase transition-all shadow-md active:scale-95 disabled:opacity-35 disabled:pointer-events-none cursor-pointer flex items-center gap-1.5"
                    >
                      <Sparkles className="w-4 h-4 text-black" />
                      Soulbond to Wallet
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* BOND PROFILE PICTURE MODAL */}
      <AnimatePresence>
        {showProfilePicModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                if (!isBondingProfilePic) setShowProfilePicModal(false);
              }}
              className="absolute inset-0 bg-black/95 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 180 }}
              className="relative w-full max-w-lg bg-[#07070b] border border-emerald-500/20 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(16,185,129,0.1)] z-10 overflow-hidden text-slate-200"
            >
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600" />

              {isBondingProfilePic ? (
                <div className="py-8 text-center space-y-6">
                  <div className="flex items-center justify-center">
                    <div className="relative w-28 h-28 flex items-center justify-center">
                      <motion.div 
                        animate={{ rotate: -360 }}
                        transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
                        className="absolute inset-0 rounded-full border-2 border-dashed border-emerald-500/30"
                      />
                      <motion.div 
                        animate={{ scale: [1, 1.05, 1], opacity: [0.6, 1, 0.6] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                        className="w-16 h-16 rounded-full bg-emerald-500/5 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-xl"
                      >
                        <Loader2 className="w-8 h-8 text-emerald-400 animate-spin absolute" />
                        <UploadCloud className="w-5 h-5 text-emerald-500" />
                      </motion.div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <span className="text-[10px] font-mono tracking-[0.3em] font-black text-emerald-400 uppercase block">
                      Reputation Registry Sync
                    </span>
                    <h3 className="text-xl font-black font-display text-white tracking-wide uppercase">
                      Bonding Avatar Identity
                    </h3>
                    <p className="text-xs text-emerald-400 font-mono tracking-wide bg-emerald-500/5 border border-emerald-500/10 rounded-xl py-3 px-4 max-w-md mx-auto animate-pulse">
                      {profilePicStep}
                    </p>
                  </div>

                  <div className="max-w-xs mx-auto">
                    <div className="h-1 w-full bg-slate-900 rounded-full overflow-hidden border border-white/5">
                      <motion.div 
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 4.8, ease: "easeInOut" }}
                        className="h-full bg-gradient-to-r from-emerald-500 to-teal-500"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleBondProfilePic} className="space-y-5">
                  <div className="flex justify-between items-start border-b border-white/5 pb-3">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest block">
                        Wallet Connection Profile
                      </span>
                      <h3 className="text-base sm:text-lg font-black text-white font-display uppercase tracking-wide">
                        Bond Profile Picture (Avatar)
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowProfilePicModal(false)}
                      className="p-1.5 hover:bg-white/5 rounded-lg text-slate-400 hover:text-white transition-all text-xs font-mono cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>

                  {/* Info alert box */}
                  <div className="p-3 bg-emerald-500/5 border border-emerald-500/15 rounded-xl flex items-center gap-2 text-[10px] font-mono text-emerald-400">
                    <Info className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>
                      Linking an avatar stamps it on every on-chain NFT owned by <strong className="text-white">{userWalletAddress?.slice(0, 8)}...{userWalletAddress?.slice(-8)}</strong>.
                    </span>
                  </div>

                  <div className="space-y-4">
                    {/* Upload Zone */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block text-left">
                        Select Avatar Image <span className="text-red-400">*</span>
                      </label>
                      
                      <div 
                        onDragEnter={handleProfileDrag}
                        onDragOver={handleProfileDrag}
                        onDragLeave={handleProfileDrag}
                        onDrop={handleProfileDrop}
                        onClick={() => profileFileInputRef.current?.click()}
                        className={`relative rounded-2xl border-2 border-dashed p-5 transition-all cursor-pointer flex flex-col items-center justify-center text-center space-y-2 min-h-[140px] ${
                          profileDragActive 
                            ? "border-emerald-400 bg-emerald-500/5" 
                            : uploadedProfilePic 
                              ? "border-emerald-500/30 bg-emerald-950/10" 
                              : "border-slate-800 hover:border-emerald-500/35 bg-black/40"
                        }`}
                      >
                        <input 
                          ref={profileFileInputRef}
                          type="file" 
                          accept="image/*"
                          onChange={handleProfileFileChange}
                          className="hidden"
                        />
                        
                        {uploadedProfilePic ? (
                          <div className="space-y-3 w-full flex flex-col items-center">
                            <div className="relative aspect-square w-24 h-24 rounded-full overflow-hidden border border-emerald-500/30 shadow-md">
                              <img src={uploadedProfilePic} alt="Preview" className="w-full h-full object-cover" />
                              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-all rounded-full">
                                <span className="text-[9px] font-mono text-white bg-black/80 px-2 py-1 rounded-md">Change</span>
                              </div>
                            </div>
                            <span className="text-[10px] font-mono text-emerald-400 font-bold block flex items-center gap-1">
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              Avatar image decrypted successfully
                            </span>
                          </div>
                        ) : (
                          <div className="space-y-2 py-1">
                            <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800/80 flex items-center justify-center text-slate-500 mx-auto">
                              <UploadCloud className="w-5 h-5 text-slate-400" />
                            </div>
                            <div>
                              <p className="text-[11px] text-slate-300 font-bold">
                                Drag & Drop profile picture here
                              </p>
                              <p className="text-[9px] text-slate-500 font-mono mt-0.5">
                                or Click to browse system directory
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Bonding Cost details */}
                  <div className="flex items-center justify-between border-t border-white/5 pt-3.5 text-left">
                    <div className="space-y-0.5">
                      <span className="block text-[9px] text-slate-500 font-mono uppercase">Bonding Cost</span>
                      <span className="text-xs font-bold font-mono text-emerald-400">
                        {userWalletChain === "Solana" ? "0.002 SOL" : "0.002 ETH"}
                      </span>
                    </div>
                    
                    <div className="text-right">
                      <span className="block text-[9px] text-slate-500 font-mono uppercase">Your Balance</span>
                      <span className="text-xs font-mono text-slate-300">
                        {userWalletChain === "Solana" ? `${solBalance.toFixed(3)} SOL` : `${ethBalance.toFixed(4)} ETH`}
                      </span>
                    </div>
                  </div>

                  {isInsufficientBalance && uploadedProfilePic && (
                    <div className="text-right">
                      <span className="text-[10px] font-mono text-red-400 bg-red-950/20 border border-red-900/30 px-2.5 py-1 rounded-lg">
                        ⚠️ Insufficient balance to process 0.002 fee
                      </span>
                    </div>
                  )}

                  <div className="flex justify-end gap-3 pt-3 border-t border-white/5">
                    <button
                      type="button"
                      onClick={() => setShowProfilePicModal(false)}
                      className="px-4 py-2 text-slate-400 hover:text-white font-mono text-xs cursor-pointer transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={!uploadedProfilePic || isInsufficientBalance}
                      className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black font-black font-mono text-xs tracking-wide rounded-xl uppercase transition-all shadow-md active:scale-95 disabled:opacity-35 disabled:pointer-events-none cursor-pointer flex items-center gap-1.5"
                    >
                      <Sparkles className="w-4 h-4 text-black" />
                      Bond Avatar to Wallet
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
