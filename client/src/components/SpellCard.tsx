import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Zap } from 'lucide-react';
import { Link } from 'wouter';

interface Spell {
  _id?: { $oid: string };
  guid?: string;
  name: string;
  level: number;
  description: string;
  castingTime?: string;
  range?: string;
  components?: string;
  duration?: string;
  damage?: string;
  school: string;
  icon?: string;
}

interface SpellCardProps {
  spell: Spell;
}

const CDN_BASE = "https://statsheet-cdn.b-cdn.net/images/";

export const SpellCard: React.FC<SpellCardProps> = ({ spell }) => {
  // Check if icon is valid
  const isValidImage = spell.icon &&
    spell.icon.length > 0 &&
    !spell.icon.includes('dsjklfdj') &&
    !spell.icon.includes('dasjkhfd') &&
    spell.icon !== 'placeholder.png';

  const imageUrl = isValidImage
    ? (spell.icon?.startsWith('http')
        ? spell.icon
        : `${CDN_BASE}${spell.icon}`)
    : 'https://via.placeholder.com/400x600?text=Spell';

  const spellId = spell._id?.$oid || spell.guid;

  // Parse damage for display
  const damageDisplay = spell.damage ?
    spell.damage.split(' ').slice(0, 2).join(' ') :
    'N/A';

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-[#121212]/40 backdrop-blur-xl border border-white/5 rounded-none p-0 shadow-2xl group hover:border-[#00f0ff]/30 transition-all duration-500 overflow-hidden relative"
    >
      <div className="aspect-[3/4] relative overflow-hidden bg-black/40">
        <img
          src={imageUrl}
          alt={spell.name}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 opacity-80"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x600?text=Spell';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-90" />

        {/* Level badge */}
        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-2 py-1 border border-white/5 text-[10px] font-mono text-gray-500 uppercase tracking-tighter flex items-center gap-1">
          <Sparkles size={10} className="text-cyan-500" />
          {spell.level === 0 ? 'CANTRIP' : `LVL ${spell.level}`}
        </div>

        {/* School badge */}
        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-2 py-1 border border-white/5 text-[8px] font-mono text-cyan-500 uppercase tracking-wider">
          {spell.school}
        </div>
      </div>

      <div className="p-6 relative">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00f0ff]/20 to-transparent" />

        {/* Spell name */}
        <h3 className="text-xl font-bold font-heading text-white group-hover:text-[#00f0ff] transition-colors mb-3 line-clamp-1">
          {spell.name}
        </h3>

        {/* Spell info grid */}
        <div className="grid grid-cols-2 gap-2 mb-4 opacity-70 group-hover:opacity-100 transition-opacity">
          {/* Casting Time */}
          <div className="bg-white/5 p-2 rounded-sm text-center border border-white/5">
            <p className="text-[8px] text-gray-500 uppercase font-mono mb-1">Cast</p>
            <p className="text-xs font-bold text-white truncate">
              {spell.castingTime ? spell.castingTime.split(' ')[0] : 'N/A'}
            </p>
          </div>

          {/* Range */}
          <div className="bg-white/5 p-2 rounded-sm text-center border border-white/5">
            <p className="text-[8px] text-gray-500 uppercase font-mono mb-1">Range</p>
            <p className="text-xs font-bold text-white truncate">
              {spell.range ? spell.range.split(' ')[0] : 'N/A'}
            </p>
          </div>

          {/* Damage */}
          <div className="bg-white/5 p-2 rounded-sm text-center border border-white/5">
            <p className="text-[8px] text-gray-500 uppercase font-mono mb-1">Damage</p>
            <p className="text-xs font-bold text-cyan-400 truncate">
              {damageDisplay}
            </p>
          </div>

          {/* Duration */}
          <div className="bg-white/5 p-2 rounded-sm text-center border border-white/5">
            <p className="text-[8px] text-gray-500 uppercase font-mono mb-1">Duration</p>
            <p className="text-xs font-bold text-white truncate">
              {spell.duration ? spell.duration.split(',')[0] : 'N/A'}
            </p>
          </div>
        </div>

        {/* Description preview */}
        <p className="text-xs text-gray-500 leading-relaxed mb-4 line-clamp-2">
          {spell.description}
        </p>

        {/* Components */}
        {spell.components && (
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[8px] text-gray-600 uppercase font-mono">Components:</span>
            <span className="text-[9px] text-cyan-500 font-mono font-bold">
              {spell.components}
            </span>
          </div>
        )}

        {/* View Details button */}
        <Link href={`/character-sheet/${spellId}`}>
          <button className="w-full py-3 bg-white/5 hover:bg-[#00f0ff] text-white hover:text-black rounded-none text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 border border-white/5 hover:border-[#00f0ff] shadow-lg hover:shadow-[#00f0ff]/20 flex items-center justify-center gap-2">
            <Zap size={12} />
            View Spell Details
          </button>
        </Link>
      </div>
    </motion.div>
  );
};
