import React from 'react';
import { motion } from 'framer-motion';
import { Swords, Shield, Heart } from 'lucide-react';

interface TokenAction {
  name: string;
  type: string;
  is_bonus: boolean;
  bonus: string;
  damage: string;
}

interface Token {
  tokenId: string;
  name: string;
  side?: string;
  stats: {
    hp: number;
    hpMax: number;
    ac: number;
    init: number;
  };
  icon: string;
  actions?: TokenAction[];
}

interface TokenCardProps {
  token: Token;
}

export const TokenCard: React.FC<TokenCardProps> = ({ token }) => {
  // Check if icon is valid
  const isValidImage = token.icon &&
    token.icon.length > 0 &&
    !token.icon.includes('dsjklfdj') &&
    !token.icon.includes('dasjkhfd');

  const imageUrl = isValidImage
    ? token.icon
    : 'https://via.placeholder.com/400x600?text=Token';

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-[#121212]/40 backdrop-blur-xl border border-white/5 rounded-none p-0 shadow-2xl group hover:border-[#00f0ff]/30 transition-all duration-500 overflow-hidden relative"
    >
      <div className="aspect-[3/4] relative overflow-hidden bg-black/40">
        <img
          src={imageUrl}
          alt={token.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x600?text=Token';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-90" />

        {/* Side badge */}
        {token.side && (
          <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-2 py-1 border border-white/5 text-[10px] font-mono text-gray-500 uppercase tracking-tighter">
            {token.side}
          </div>
        )}

        {/* Token ID */}
        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-2 py-1 border border-white/5 text-[8px] font-mono text-cyan-500 uppercase tracking-wider">
          VTT
        </div>
      </div>

      <div className="p-6 relative">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00f0ff]/20 to-transparent" />

        {/* Token name */}
        <h3 className="text-xl font-bold font-heading text-white group-hover:text-[#00f0ff] transition-colors mb-3 line-clamp-1">
          {token.name}
        </h3>

        {/* Combat stats */}
        <div className="grid grid-cols-3 gap-2 mb-4 opacity-70 group-hover:opacity-100 transition-opacity">
          {/* HP */}
          <div className="bg-white/5 p-2 rounded-sm text-center border border-white/5">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Heart size={10} className="text-red-500" />
              <p className="text-[8px] text-gray-500 uppercase font-mono">HP</p>
            </div>
            <p className="text-xs font-bold text-white">
              {token.stats.hp}
            </p>
          </div>

          {/* AC */}
          <div className="bg-white/5 p-2 rounded-sm text-center border border-white/5">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Shield size={10} className="text-blue-500" />
              <p className="text-[8px] text-gray-500 uppercase font-mono">AC</p>
            </div>
            <p className="text-xs font-bold text-white">
              {token.stats.ac}
            </p>
          </div>

          {/* Init */}
          <div className="bg-white/5 p-2 rounded-sm text-center border border-white/5">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Swords size={10} className="text-cyan-500" />
              <p className="text-[8px] text-gray-500 uppercase font-mono">Init</p>
            </div>
            <p className="text-xs font-bold text-white">
              +{token.stats.init}
            </p>
          </div>
        </div>

        {/* Actions preview */}
        {token.actions && token.actions.length > 0 && (
          <div className="space-y-2 mb-4">
            <p className="text-[8px] text-gray-600 uppercase font-mono mb-2">Actions</p>
            {token.actions.slice(0, 2).map((action, index) => (
              <div
                key={index}
                className="bg-white/5 p-2 rounded-sm border border-white/5 flex items-center justify-between"
              >
                <span className="text-xs text-gray-400 truncate flex-1">
                  {action.name}
                </span>
                <span className="text-xs text-cyan-400 font-mono ml-2">
                  {action.bonus !== 'N/A' ? action.bonus : action.type}
                </span>
              </div>
            ))}
            {token.actions.length > 2 && (
              <p className="text-[8px] text-gray-600 text-center font-mono">
                +{token.actions.length - 2} more
              </p>
            )}
          </div>
        )}

        {/* Add to Battle button */}
        <button className="w-full py-3 bg-white/5 hover:bg-[#00f0ff] text-white hover:text-black rounded-none text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 border border-white/5 hover:border-[#00f0ff] shadow-lg hover:shadow-[#00f0ff]/20 flex items-center justify-center gap-2">
          <Swords size={12} />
          Add to Battle
        </button>
      </div>
    </motion.div>
  );
};
