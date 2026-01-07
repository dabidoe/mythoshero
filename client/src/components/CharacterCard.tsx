import React from 'react';
import { motion } from 'framer-motion';

interface CharacterStats {
  STR: number;
  DEX: number;
  CON: number;
  INT: number;
  WIS: number;
  CHA: number;
}

interface Character {
  guid: string;
  characterName: string;
  characterClass: string;
  race: string;
  level: number;
  stats: CharacterStats;
  profilePicture?: string;
}

interface CharacterCardProps {
  character: Character;
}

const CDN_BASE = "https://statsheet-cdn.b-cdn.net/images/";

export const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  const imageUrl = character.profilePicture?.startsWith('http') 
    ? character.profilePicture 
    : `${CDN_BASE}${character.profilePicture || 'placeholder.png'}`;

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-[#121212]/40 backdrop-blur-xl border border-white/5 rounded-none p-0 shadow-2xl group hover:border-[#00f0ff]/30 transition-all duration-500 overflow-hidden relative"
    >
      <div className="aspect-[3/4] relative overflow-hidden bg-black/40">
        <img 
          src={imageUrl} 
          alt={character.characterName}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 opacity-80"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x600?text=MythOS+Asset';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-90" />
        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-2 py-1 border border-white/5 text-[10px] font-mono text-gray-500 uppercase tracking-tighter">
          LVL {character.level}
        </div>
      </div>
      
      <div className="p-6 relative">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00f0ff]/20 to-transparent" />
        <p className="text-[9px] text-[#00f0ff]/60 font-mono uppercase tracking-[0.3em] mb-2">{character.characterClass || 'Class'}</p>
        <h3 className="text-xl font-bold font-heading text-white group-hover:text-[#00f0ff] transition-colors mb-4 line-clamp-1">{character.characterName}</h3>
        
        <div className="grid grid-cols-3 gap-1 mb-6 opacity-40 group-hover:opacity-100 transition-opacity">
          {[
            { label: 'STR', val: character.stats.STR },
            { label: 'DEX', val: character.stats.DEX },
            { label: 'CON', val: character.stats.CON }
          ].map((stat) => (
            <div key={stat.label} className="bg-white/5 p-2 rounded-sm text-center border border-white/5">
              <p className="text-[8px] text-gray-500 uppercase font-mono">{stat.label}</p>
              <p className="text-xs font-bold text-white">{stat.val}</p>
            </div>
          ))}
        </div>

        <button className="w-full py-3 bg-white/5 hover:bg-[#00f0ff] text-white hover:text-black rounded-none text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 border border-white/5 hover:border-[#00f0ff] shadow-lg hover:shadow-[#00f0ff]/20">
          Sync Interface
        </button>
      </div>
    </motion.div>
  );
};