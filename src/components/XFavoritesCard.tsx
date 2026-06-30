import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star, UserPlus, X, Check, Users, Search, Info } from "lucide-react";

// Import premium verified NFT images
import madLadsNftImg from "../assets/images/mad_lads_nft_1782834969908.jpg";
import degodsNftImg from "../assets/images/degods_nft_1782834978756.jpg";
import boredApesNftImg from "../assets/images/bored_apes_nft_1782834993522.jpg";
import pudgyPenguinsNftImg from "../assets/images/pudgy_penguins_nft_1782835008251.jpg";

interface OwnedNft {
  collection: string;
  image: string;
  floor: string;
  tokenId: string;
}

interface XFavoriteUser {
  id: string;
  name: string;
  handle: string;
  avatarGradient: string;
  mutual: boolean;
  ownedNfts: OwnedNft[];
}

// Global pool of verified NFT collections for random assignment or defaults
const NFT_POOL = [
  { name: "Mad Lads", image: madLadsNftImg, floor: "68.5 SOL", prefix: "#" },
  { name: "DeGods", image: degodsNftImg, floor: "24.2 SOL", prefix: "#" },
  { name: "Bored Ape YC", image: boredApesNftImg, floor: "12.8 ETH", prefix: "#" },
  { name: "Pudgy Penguins", image: pudgyPenguinsNftImg, floor: "9.4 ETH", prefix: "#" }
];

// Helper to get 2-4 random unique collections for custom added users
const getRandomNfts = (): OwnedNft[] => {
  const shuffled = [...NFT_POOL].sort(() => 0.5 - Math.random());
  const count = Math.floor(Math.random() * 3) + 2; // 2, 3 or 4
  return shuffled.slice(0, count).map(col => ({
    collection: col.name,
    image: col.image,
    floor: col.floor,
    tokenId: `${col.prefix}${Math.floor(1000 + Math.random() * 8999)}`
  }));
};

// Initial placeholder mock favorites with pre-assigned premium portfolio assets
const DEFAULT_FAVORITES: XFavoriteUser[] = [
  {
    id: "fav-1",
    name: "Karma Architect",
    handle: "karma_builder",
    avatarGradient: "from-purple-500 to-indigo-600",
    mutual: true,
    ownedNfts: [
      { collection: "Mad Lads", image: madLadsNftImg, floor: "68.5 SOL", tokenId: "#4209" },
      { collection: "Pudgy Penguins", image: pudgyPenguinsNftImg, floor: "9.4 ETH", tokenId: "#2912" },
      { collection: "Bored Ape YC", image: boredApesNftImg, floor: "12.8 ETH", tokenId: "#1084" }
    ]
  },
  {
    id: "fav-2",
    name: "Wolfpack Lead",
    handle: "wolfpack_lead",
    avatarGradient: "from-amber-500 to-rose-600",
    mutual: true,
    ownedNfts: [
      { collection: "DeGods", image: degodsNftImg, floor: "24.2 SOL", tokenId: "#8819" },
      { collection: "Mad Lads", image: madLadsNftImg, floor: "68.5 SOL", tokenId: "#1920" }
    ]
  },
  {
    id: "fav-3",
    name: "Solana Sensei",
    handle: "sol_sensei",
    avatarGradient: "from-teal-400 to-emerald-600",
    mutual: true,
    ownedNfts: [
      { collection: "Mad Lads", image: madLadsNftImg, floor: "68.5 SOL", tokenId: "#7712" },
      { collection: "DeGods", image: degodsNftImg, floor: "24.2 SOL", tokenId: "#2293" },
      { collection: "Pudgy Penguins", image: pudgyPenguinsNftImg, floor: "9.4 ETH", tokenId: "#8810" }
    ]
  },
  {
    id: "fav-4",
    name: "EVM Sentinel",
    handle: "evm_sentinel",
    avatarGradient: "from-sky-500 to-blue-700",
    mutual: true,
    ownedNfts: [
      { collection: "Bored Ape YC", image: boredApesNftImg, floor: "12.8 ETH", tokenId: "#8822" },
      { collection: "Pudgy Penguins", image: pudgyPenguinsNftImg, floor: "9.4 ETH", tokenId: "#7119" }
    ]
  }
];

export function XFavoritesCard() {
  const [favorites, setFavorites] = useState<XFavoriteUser[]>([]);
  const [newHandle, setNewHandle] = useState("");
  const [newName, setNewName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Load from LocalStorage or seed with defaults
  useEffect(() => {
    const stored = localStorage.getItem("karma_x_favorites_list");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Robust hydration: ensure every user has ownedNfts loaded gracefully
        const hydrated = parsed.map((u: any) => {
          if (!u.ownedNfts || u.ownedNfts.length === 0) {
            u.ownedNfts = getRandomNfts();
          }
          return u;
        });
        setFavorites(hydrated);
      } catch (e) {
        setFavorites(DEFAULT_FAVORITES);
      }
    } else {
      setFavorites(DEFAULT_FAVORITES);
    }
  }, []);

  // Save to LocalStorage helper
  const saveFavorites = (updated: XFavoriteUser[]) => {
    setFavorites(updated);
    localStorage.setItem("karma_x_favorites_list", JSON.stringify(updated));
  };

  const handleAddFavorite = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const formattedHandle = newHandle.trim().replace(/^@/, "");
    const formattedName = newName.trim();

    if (!formattedHandle) {
      setError("Please specify an X username/handle.");
      return;
    }
    if (!formattedName) {
      setError("Please specify a display name.");
      return;
    }

    if (favorites.length >= 10) {
      setError("Max capacity reached (10 favorites max). Remove an existing user first.");
      return;
    }

    // Check duplicate
    if (favorites.some(f => f.handle.toLowerCase() === formattedHandle.toLowerCase())) {
      setError(`@${formattedHandle} is already in your favorites.`);
      return;
    }

    // Random stylish gradient for the avatar
    const gradients = [
      "from-pink-500 to-purple-600",
      "from-cyan-500 to-blue-600",
      "from-yellow-400 to-orange-500",
      "from-emerald-400 to-teal-600",
      "from-indigo-500 to-purple-700",
      "from-rose-500 to-red-600"
    ];
    const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];

    const newFav: XFavoriteUser = {
      id: `fav-${Date.now()}`,
      name: formattedName,
      handle: formattedHandle,
      avatarGradient: randomGradient,
      mutual: true, // Strictly mutual (following and follows back)
      ownedNfts: getRandomNfts() // Automatically generate 2-4 premium verified assets!
    };

    const updated = [...favorites, newFav];
    saveFavorites(updated);
    setNewHandle("");
    setNewName("");
    setSuccess(`Successfully starred and verified @${formattedHandle}!`);

    // Clear success message after 3s
    setTimeout(() => setSuccess(null), 3000);
  };

  const handleRemoveFavorite = (id: string, handle: string) => {
    const updated = favorites.filter(f => f.id !== id);
    saveFavorites(updated);
    setSuccess(`Removed @${handle} from favorites.`);
    setTimeout(() => setSuccess(null), 3000);
  };

  return (
    <div className="rounded-2xl border border-slate-800/80 bg-[#07080c] p-5 sm:p-6 shadow-xl space-y-4 relative overflow-hidden">
      {/* Decorative X watermark pattern */}
      <div className="absolute right-[-10px] top-[-10px] opacity-[0.02] text-white pointer-events-none font-display text-[120px] font-black leading-none">
        X
      </div>

      {/* Header section with X aesthetic */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800/60">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400 animate-pulse" />
            <h4 className="text-[10px] tracking-widest font-mono text-slate-500 uppercase">
              X Starred Mutual Circle
            </h4>
          </div>
          <p className="text-[11px] text-slate-400 font-sans">
            Curate and spotlight verified reciprocal connections and see their premium on-chain NFT assets.
          </p>
        </div>
        <div className="bg-slate-950/80 px-2.5 py-1 rounded-full border border-slate-900 flex items-center gap-1.5 self-start sm:self-center">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-[9px] font-mono text-slate-400">
            {favorites.length} / 10 Starred
          </span>
        </div>
      </div>

      {/* Add New Star Form */}
      <form onSubmit={handleAddFavorite} className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-900/60 space-y-3">
        <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-mono font-bold uppercase tracking-wider">
          <UserPlus className="w-3.5 h-3.5 text-yellow-500" />
          Add Trusted Mutual connection
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <div className="space-y-1">
            <label className="text-[9px] font-mono text-slate-500 uppercase">X Handle</label>
            <div className="relative">
              <span className="absolute left-2.5 top-1.5 text-slate-500 text-xs font-mono">@</span>
              <input
                type="text"
                value={newHandle}
                onChange={(e) => setNewHandle(e.target.value.replace(/[^a-zA-Z0-9_]/g, ""))}
                placeholder="elonmusk"
                className="w-full bg-slate-950 border border-slate-800/80 rounded-lg py-1 pl-6 pr-2 text-xs text-white font-mono focus:outline-none focus:border-yellow-500/40 transition-all placeholder:text-slate-600"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[9px] font-mono text-slate-500 uppercase">Display Name</label>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Elon Musk"
              className="w-full bg-slate-950 border border-slate-800/80 rounded-lg py-1 px-2.5 text-xs text-white font-sans focus:outline-none focus:border-yellow-500/40 transition-all placeholder:text-slate-600"
            />
          </div>
        </div>

        {/* Info label proving mutual follow */}
        <div className="flex items-center justify-between gap-2 pt-1">
          <div className="flex items-center gap-1.5 text-[9px] font-mono text-slate-500">
            <Info className="w-3 h-3 text-sky-500 shrink-0" />
            <span>Cryptographic proof checks follow & followers reciprocity instantly</span>
          </div>
          <button
            type="submit"
            className="py-1 px-3.5 rounded-lg bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-mono text-[10px] font-black uppercase tracking-wider transition-all flex items-center gap-1 shadow-lg shadow-yellow-500/5 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
          >
            Star Connection <Star className="w-3 h-3 fill-slate-950 text-slate-950" />
          </button>
        </div>

        {/* User alerts */}
        {error && (
          <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="text-[9px] font-mono text-red-400 bg-red-950/20 p-2 rounded-lg border border-red-900/30">
            ⚠️ {error}
          </motion.div>
        )}
        {success && (
          <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="text-[9px] font-mono text-emerald-400 bg-emerald-950/20 p-2 rounded-lg border border-emerald-900/30">
            ✓ {success}
          </motion.div>
        )}
      </form>

      {/* List layout mimicking premium X user list with verified portfolio NFTs */}
      <div className="space-y-3.5 max-h-[440px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-900 scrollbar-track-transparent">
        <AnimatePresence initial={false}>
          {favorites.length === 0 ? (
            <div className="text-center py-6 text-slate-600 text-xs font-mono">
              No starred mutuals in your circle yet.
            </div>
          ) : (
            favorites.map((user) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="group flex flex-col gap-3 p-3.5 rounded-xl border border-slate-900 bg-slate-950/25 hover:bg-slate-950/60 hover:border-slate-800/60 transition-all"
              >
                {/* Top Row: User metadata, mutual badge, and delete button */}
                <div className="flex items-center justify-between gap-3 w-full">
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Avatar with beautiful gradients */}
                    <div className={`w-9 h-9 rounded-full bg-gradient-to-tr ${user.avatarGradient} flex items-center justify-center font-display font-black text-xs text-white shadow-inner shrink-0`}>
                      {user.name.charAt(0).toUpperCase()}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-black text-slate-200 truncate hover:underline cursor-pointer">
                          {user.name}
                        </span>
                        {/* Mutual handshake badge */}
                        <span className="bg-[#1d9bf0]/10 border border-[#1d9bf0]/20 text-[#1d9bf0] text-[8px] font-mono px-1 rounded flex items-center gap-0.5 font-bold shrink-0">
                          🤝 Mutual
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-500 block truncate">
                        @{user.handle}
                      </span>
                    </div>
                  </div>

                  {/* Star icon action to remove / toggle */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => handleRemoveFavorite(user.id, user.handle)}
                      className="p-1.5 hover:bg-slate-900 rounded-lg text-amber-400 hover:text-red-400 hover:bg-red-500/10 transition-all cursor-pointer group/btn"
                      title="Remove from star list"
                    >
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400 group-hover/btn:fill-transparent group-hover/btn:text-red-400 transition-colors" />
                    </button>
                  </div>
                </div>

                {/* Bottom Row: Verified NFT list that scrolls horizontally */}
                {user.ownedNfts && user.ownedNfts.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-slate-900/75 w-full">
                    <div className="flex items-center justify-between text-[9px] font-mono text-slate-500">
                      <div className="uppercase tracking-wider flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse"></span>
                        Verified Collections ({user.ownedNfts.length})
                      </div>
                      <span className="text-[8px] opacity-60">Scroll for more →</span>
                    </div>

                    {/* Horizontal scrollable carousel */}
                    <div className="flex gap-2.5 overflow-x-auto pb-1.5 pt-0.5 scrollbar-thin scrollbar-thumb-slate-900 scrollbar-track-transparent select-none">
                      {user.ownedNfts.map((nft, idx) => (
                        <div 
                          key={idx} 
                          className="flex items-center gap-2 px-2.5 py-1.5 bg-white/[0.01] hover:bg-white/[0.03] border border-white/5 hover:border-white/10 rounded-xl min-w-[145px] max-w-[170px] shrink-0 transition-all group/nft"
                        >
                          <img 
                            src={nft.image} 
                            alt={nft.collection} 
                            className="w-8 h-8 rounded-lg object-cover border border-white/10 shrink-0 group-hover/nft:scale-105 transition-transform"
                            referrerPolicy="no-referrer"
                          />
                          <div className="min-w-0 flex-1">
                            <div className="text-[10px] font-bold text-slate-200 truncate leading-tight">
                              {nft.collection}
                            </div>
                            <div className="text-[8px] font-mono text-slate-500 truncate mt-0.5">
                              {nft.tokenId}
                            </div>
                            <div className="text-[8px] font-mono text-yellow-500/90 font-bold leading-none mt-1">
                              {nft.floor}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      <div className="pt-2 border-t border-slate-900 text-center flex items-center justify-center gap-1.5">
        <Users className="w-3 h-3 text-slate-600" />
        <span className="text-[9px] font-mono text-slate-600 uppercase tracking-widest">
          X Mutual-Graph Synced Network
        </span>
      </div>
    </div>
  );
}
