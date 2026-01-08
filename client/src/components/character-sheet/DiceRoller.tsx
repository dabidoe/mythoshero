import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dices } from 'lucide-react';
import type { DiceRollContext } from '@/hooks/useDiceRoller';

interface DiceRollerProps {
  lastRoll: DiceRollContext | null;
  isRolling: boolean;
  onDismiss: () => void;
}

export const DiceRoller: React.FC<DiceRollerProps> = ({ lastRoll, isRolling, onDismiss }) => {
  // Auto-dismiss after 3 seconds
  useEffect(() => {
    if (lastRoll && !isRolling) {
      const timer = setTimeout(() => {
        onDismiss();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [lastRoll, isRolling, onDismiss]);

  if (!lastRoll) return null;

  const { result, context } = lastRoll;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 50 }}
        className="fixed bottom-8 right-8 z-50 pointer-events-none"
      >
        <div className="bg-[#121212]/95 backdrop-blur-xl border-2 border-cyan-500/50 rounded-2xl p-6 shadow-2xl shadow-cyan-500/20 min-w-[280px]">
          {/* Header with context */}
          {context && (
            <div className="flex items-center gap-2 mb-4">
              <Dices size={20} className="text-cyan-500" />
              <span className="text-sm font-mono text-gray-400 uppercase tracking-wider">
                {context}
              </span>
            </div>
          )}

          {/* Dice animation */}
          <div className="flex items-center justify-center mb-4">
            {isRolling ? (
              <motion.div
                animate={{
                  rotateX: [0, 360, 720],
                  rotateY: [0, 360, 720],
                }}
                transition={{
                  duration: 0.8,
                  ease: "easeOut"
                }}
                className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/50"
              >
                <Dices size={32} className="text-white" />
              </motion.div>
            ) : (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="relative"
              >
                {/* Glow effect */}
                <div className="absolute -inset-4 bg-cyan-500/30 rounded-full blur-xl" />

                {/* Total result */}
                <div className="relative text-6xl font-bold font-heading text-white">
                  {result.total}
                </div>
              </motion.div>
            )}
          </div>

          {/* Breakdown */}
          {!isRolling && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-2"
            >
              {/* Expression */}
              <div className="text-center text-sm font-mono text-gray-400">
                {result.expression}
              </div>

              {/* Individual rolls */}
              {result.rolls.length > 1 && (
                <div className="flex flex-wrap items-center justify-center gap-2">
                  {result.rolls.map((roll, index) => (
                    <motion.div
                      key={index}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-xs font-bold text-white border border-white/20"
                    >
                      {roll}
                    </motion.div>
                  ))}
                  {result.modifier !== 0 && (
                    <div className="text-sm font-mono text-cyan-400">
                      {result.modifier > 0 ? `+${result.modifier}` : result.modifier}
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          )}

          {/* Dismiss hint */}
          {!isRolling && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-xs text-gray-500 text-center mt-4 font-mono"
            >
              Auto-dismissing...
            </motion.div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
