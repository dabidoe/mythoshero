import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Shield, Zap } from 'lucide-react';
import { formatModifier } from '@/lib/diceUtils';

interface CombatStatsProps {
  hp: {
    current: number;
    max: number;
  };
  ac: number;
  initiative: number;
  onRoll: (expression: string, context: string) => void;
}

export const CombatStats: React.FC<CombatStatsProps> = ({ hp, ac, initiative, onRoll }) => {
  const hpPercentage = (hp.current / hp.max) * 100;

  // Determine HP bar color based on percentage
  const getHPColor = () => {
    if (hpPercentage > 66) return 'from-green-500 to-emerald-600';
    if (hpPercentage > 33) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-rose-600';
  };

  const handleInitiativeRoll = () => {
    const expression = initiative >= 0 ? `1d20+${initiative}` : `1d20${initiative}`;
    onRoll(expression, 'Initiative');
  };

  return (
    <div className="bg-[#121212]/50 backdrop-blur-md border border-white/5 rounded-2xl p-6 space-y-4">
      <h3 className="text-xs font-mono text-cyan-500 uppercase tracking-widest mb-6">
        Combat Stats
      </h3>

      {/* HP Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart size={16} className="text-red-500" />
            <span className="text-sm font-mono text-gray-400">Hit Points</span>
          </div>
          <span className="font-bold text-white font-mono">
            {hp.current} / {hp.max}
          </span>
        </div>

        {/* HP Progress Bar */}
        <div className="relative w-full h-6 bg-white/5 rounded-lg overflow-hidden border border-white/10">
          <motion.div
            className={`h-full bg-gradient-to-r ${getHPColor()}`}
            initial={{ width: 0 }}
            animate={{ width: `${hpPercentage}%` }}
            transition={{ duration: 0.5 }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-bold text-white drop-shadow-lg">
              {Math.round(hpPercentage)}%
            </span>
          </div>
        </div>
      </div>

      {/* AC & Initiative */}
      <div className="grid grid-cols-2 gap-4">
        {/* Armor Class */}
        <div className="bg-white/5 p-4 rounded-xl border border-white/5">
          <div className="flex items-center gap-2 mb-2">
            <Shield size={16} className="text-cyan-500" />
            <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">
              AC
            </span>
          </div>
          <span className="text-3xl font-bold font-heading text-white">
            {ac}
          </span>
        </div>

        {/* Initiative (clickable) */}
        <motion.button
          onClick={handleInitiativeRoll}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white/5 p-4 rounded-xl border border-white/5 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all cursor-pointer group"
        >
          <div className="flex items-center gap-2 mb-2">
            <Zap size={16} className="text-yellow-500" />
            <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">
              Init
            </span>
          </div>
          <span className="text-3xl font-bold font-heading text-white group-hover:text-cyan-400 transition-colors">
            {formatModifier(initiative)}
          </span>
        </motion.button>
      </div>

      <p className="text-xs text-gray-500 text-center font-mono">
        Click Initiative to roll
      </p>
    </div>
  );
};
