import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ChevronDown, Zap } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { extractDiceExpression } from '@/lib/diceUtils';
import type { Spell } from '@/hooks/useCharacterData';

interface SpellWithPrepared extends Spell {
  prepared: boolean;
}

interface SpellListProps {
  spells: SpellWithPrepared[];
  onCast: (spell: Spell) => void;
}

export const SpellList: React.FC<SpellListProps> = ({ spells, onCast }) => {
  const [filter, setFilter] = useState<'all' | 'prepared'>('all');
  const [castingSpell, setCastingSpell] = useState<string | null>(null);

  // Group spells by level
  const spellsByLevel = spells.reduce((acc, spell) => {
    const level = spell.level;
    if (!acc[level]) acc[level] = [];
    acc[level].push(spell);
    return acc;
  }, {} as Record<number, SpellWithPrepared[]>);

  // Sort levels
  const sortedLevels = Object.keys(spellsByLevel)
    .map(Number)
    .sort((a, b) => a - b);

  const filteredSpells = spells.filter(spell =>
    filter === 'all' || spell.prepared
  );

  const handleCast = async (spell: Spell) => {
    setCastingSpell(spell._id.$oid);
    onCast(spell);

    // Reset after animation
    setTimeout(() => {
      setCastingSpell(null);
    }, 1000);
  };

  return (
    <div className="bg-[#121212]/50 backdrop-blur-md border border-white/5 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xs font-mono text-cyan-500 uppercase tracking-widest">
          Spells
        </h3>

        {/* Filter toggle */}
        <div className="flex items-center gap-2 bg-white/5 rounded-lg p-1">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded text-xs font-mono transition-all ${
              filter === 'all'
                ? 'bg-cyan-500 text-black'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('prepared')}
            className={`px-3 py-1 rounded text-xs font-mono transition-all ${
              filter === 'prepared'
                ? 'bg-cyan-500 text-black'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Prepared
          </button>
        </div>
      </div>

      <Accordion type="multiple" className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
        {sortedLevels.map(level => {
          const levelSpells = spellsByLevel[level].filter(spell =>
            filter === 'all' || spell.prepared
          );

          if (levelSpells.length === 0) return null;

          return (
            <AccordionItem
              key={level}
              value={`level-${level}`}
              className="border border-white/10 rounded-xl overflow-hidden"
            >
              <AccordionTrigger className="px-4 py-3 bg-white/5 hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-3">
                  <Sparkles size={16} className="text-cyan-500" />
                  <span className="text-sm font-mono text-white">
                    {level === 0 ? 'Cantrips' : `Level ${level}`}
                  </span>
                  <span className="text-xs text-gray-500">
                    ({levelSpells.length})
                  </span>
                </div>
              </AccordionTrigger>

              <AccordionContent className="p-4 space-y-3">
                {levelSpells.map((spell, index) => {
                  const isCasting = castingSpell === spell._id.$oid;
                  const diceExpr = extractDiceExpression(spell.damage);

                  return (
                    <motion.div
                      key={spell._id.$oid}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="relative bg-white/5 rounded-lg p-4 border border-white/5 hover:border-cyan-500/30 transition-all group"
                    >
                      {/* Casting animation overlay */}
                      <AnimatePresence>
                        {isCasting && (
                          <>
                            {/* Particle bursts */}
                            {Array.from({ length: 12 }).map((_, i) => {
                              const angle = (i / 12) * Math.PI * 2;
                              const distance = 60;
                              const x = Math.cos(angle) * distance;
                              const y = Math.sin(angle) * distance;

                              return (
                                <motion.div
                                  key={i}
                                  className="absolute top-1/2 left-1/2 w-2 h-2 bg-cyan-500 rounded-full"
                                  initial={{ x: 0, y: 0, opacity: 1 }}
                                  animate={{ x, y, opacity: 0 }}
                                  transition={{ duration: 0.6, ease: "easeOut" }}
                                />
                              );
                            })}
                          </>
                        )}
                      </AnimatePresence>

                      <div className="flex items-start gap-4">
                        {/* Spell icon */}
                        <div className="flex-shrink-0">
                          <img
                            src={spell.icon}
                            alt={spell.name}
                            className="w-12 h-12 rounded-lg object-cover border border-white/10"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/48?text=Spell';
                            }}
                          />
                        </div>

                        {/* Spell info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div>
                              <h4 className="font-bold text-white group-hover:text-cyan-400 transition-colors">
                                {spell.name}
                              </h4>
                              <p className="text-xs text-gray-500 font-mono">
                                {spell.school} • {spell.castingTime}
                              </p>
                            </div>
                            {spell.prepared && (
                              <span className="px-2 py-0.5 bg-cyan-500/20 text-cyan-400 text-xs rounded font-mono">
                                PREP
                              </span>
                            )}
                          </div>

                          {/* Spell details */}
                          <div className="text-xs text-gray-400 space-y-1 mb-3">
                            <p><span className="text-gray-500">Range:</span> {spell.range}</p>
                            <p><span className="text-gray-500">Components:</span> {spell.components}</p>
                            <p><span className="text-gray-500">Duration:</span> {spell.duration}</p>
                            {spell.damage && (
                              <p><span className="text-gray-500">Damage:</span> {spell.damage}</p>
                            )}
                          </div>

                          {/* Description */}
                          <p className="text-sm text-gray-400 leading-relaxed mb-3">
                            {spell.description}
                          </p>

                          {/* Cast button */}
                          <motion.button
                            onClick={() => handleCast(spell)}
                            disabled={isCasting}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`w-full py-2 px-4 rounded-lg font-mono text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                              isCasting
                                ? 'bg-cyan-500/50 text-white cursor-not-allowed'
                                : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg hover:shadow-cyan-500/50'
                            }`}
                          >
                            <Zap size={14} className={isCasting ? 'animate-pulse' : ''} />
                            {isCasting ? 'Casting...' : diceExpr ? `Cast (${diceExpr})` : 'Cast'}
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>

      {filteredSpells.length === 0 && (
        <div className="text-center py-12">
          <Sparkles size={48} className="mx-auto text-gray-600 mb-4" />
          <p className="text-gray-500 font-mono text-sm">
            {filter === 'prepared' ? 'No prepared spells' : 'No spells available'}
          </p>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(34, 211, 238, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(34, 211, 238, 0.4);
        }
      `}} />
    </div>
  );
};
