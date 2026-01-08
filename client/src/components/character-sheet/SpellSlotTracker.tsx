import React from 'react';
import { motion } from 'framer-motion';
import { Circle, CircleDot } from 'lucide-react';

export interface SpellSlots {
  [level: number]: {
    max: number;
    used: number;
  };
}

interface SpellSlotTrackerProps {
  spellSlots: SpellSlots;
  onToggleSlot: (level: number, slotIndex: number) => void;
}

export const SpellSlotTracker: React.FC<SpellSlotTrackerProps> = ({ spellSlots, onToggleSlot }) => {
  // Filter out levels with no slots
  const levelsWithSlots = Object.entries(spellSlots)
    .filter(([_, slots]) => slots.max > 0)
    .sort(([a], [b]) => parseInt(a) - parseInt(b));

  if (levelsWithSlots.length === 0) {
    return null;
  }

  return (
    <div className="bg-[#121212]/50 backdrop-blur-md border border-white/5 rounded-2xl p-6">
      <h3 className="text-xs font-mono text-cyan-500 uppercase tracking-widest mb-6">
        Spell Slots
      </h3>

      <div className="space-y-4">
        {levelsWithSlots.map(([level, slots]) => {
          const levelNum = parseInt(level);
          const availableSlots = slots.max - slots.used;

          return (
            <motion.div
              key={level}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-mono text-gray-400">
                  Level {levelNum}
                </span>
                <span className="text-xs font-mono text-cyan-400">
                  {availableSlots} / {slots.max}
                </span>
              </div>

              {/* Slot indicators */}
              <div className="flex items-center gap-2 flex-wrap">
                {Array.from({ length: slots.max }).map((_, index) => {
                  const isUsed = index < slots.used;

                  return (
                    <motion.button
                      key={index}
                      onClick={() => onToggleSlot(levelNum, index)}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      className="relative group cursor-pointer"
                    >
                      {isUsed ? (
                        <Circle
                          size={20}
                          className="text-gray-600 hover:text-cyan-500 transition-colors"
                        />
                      ) : (
                        <CircleDot
                          size={20}
                          className="text-cyan-500 hover:text-cyan-400 transition-colors drop-shadow-lg shadow-cyan-500"
                        />
                      )}

                      {/* Tooltip on hover */}
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black/90 text-xs text-white rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                        {isUsed ? 'Click to restore' : 'Click to use'}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </div>

      <p className="text-xs text-gray-500 text-center mt-6 font-mono">
        Click slots to toggle used/available
      </p>
    </div>
  );
};
