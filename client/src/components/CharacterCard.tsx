import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Sword, Zap } from 'lucide-react';

interface CharacterStats {
  STR: number;
  DEX: number;
  CON: number;
  INT: number;
  WIS: number;
  CHA: number;
}

interface Character {
  characterName: string;
  race: string;
  class: string;
  level: number;
  stats: CharacterStats;
}

interface CharacterCardProps {
  character: Character;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-[#121212] border border-white/10 rounded-2xl p-6 shadow-xl group hover:border-cyan-500/50 transition-all duration-300"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold font-heading text-white group-hover:text-cyan-400 transition-colors">{character.characterName}</h3>
          <p className="text-xs text-gray-500 font-mono uppercase tracking-widest">{character.race} {character.class}</p>
        </div>
        <div className="bg-cyan-500/10 text-cyan-400 px-2 py-1 rounded text-xs font-bold border border-cyan-500/20">
          LVL {character.level}
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-2 mb-6">
        <div className="bg-white/5 p-2 rounded text-center">
          <p className="text-[10px] text-gray-500 uppercase">STR</p>
          <p className="font-bold text-white">{character.stats.STR}</p>
        </div>
        <div className="bg-white/5 p-2 rounded text-center">
          <p className="text-[10px] text-gray-500 uppercase">DEX</p>
          <p className="font-bold text-white">{character.stats.DEX}</p>
        </div>
        <div className="bg-white/5 p-2 rounded text-center">
          <p className="text-[10px] text-gray-500 uppercase">CON</p>
          <p className="font-bold text-white">{character.stats.CON}</p>
        </div>
      </div>

      <button className="w-full py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-sm font-bold transition-all shadow-lg shadow-cyan-900/20">
        View Sheet
      </button>
    </motion.div>
  );
};