import React from 'react';
import { motion } from 'framer-motion';
import { getAbilityModifier, formatModifier } from '@/lib/diceUtils';

interface Attributes {
  str: number;
  dex: number;
  con: number;
  int: number;
  wis: number;
  cha: number;
}

interface StatBlockProps {
  attributes: Attributes;
  onRoll: (expression: string, context: string) => void;
}

const STAT_LABELS = [
  { key: 'str', label: 'STR', name: 'Strength' },
  { key: 'dex', label: 'DEX', name: 'Dexterity' },
  { key: 'con', label: 'CON', name: 'Constitution' },
  { key: 'int', label: 'INT', name: 'Intelligence' },
  { key: 'wis', label: 'WIS', name: 'Wisdom' },
  { key: 'cha', label: 'CHA', name: 'Charisma' }
];

export const StatBlock: React.FC<StatBlockProps> = ({ attributes, onRoll }) => {
  const handleStatClick = (statKey: string, score: number, statName: string) => {
    const modifier = getAbilityModifier(score);
    const expression = modifier >= 0 ? `1d20+${modifier}` : `1d20${modifier}`;
    onRoll(expression, `${statName} Check`);
  };

  return (
    <div className="bg-[#121212]/50 backdrop-blur-md border border-white/5 rounded-2xl p-6">
      <h3 className="text-xs font-mono text-cyan-500 uppercase tracking-widest mb-6">
        Ability Scores
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {STAT_LABELS.map((stat, i) => {
          const score = attributes[stat.key as keyof Attributes];
          const modifier = getAbilityModifier(score);

          return (
            <motion.button
              key={stat.key}
              onClick={() => handleStatClick(stat.key, score, stat.name)}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative group cursor-pointer"
            >
              {/* Glow effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-b from-cyan-500 to-blue-600 rounded-xl blur opacity-0 group-hover:opacity-50 transition duration-500" />

              {/* Card content */}
              <div className="relative bg-[#121212]/80 backdrop-blur-xl border border-white/10 rounded-xl flex flex-col items-center justify-center p-4 group-hover:border-cyan-500/50 transition-colors">
                <span className="text-xs font-mono text-cyan-500 uppercase tracking-widest mb-2">
                  {stat.label}
                </span>
                <span className="text-3xl font-bold font-heading text-white mb-1">
                  {score}
                </span>
                <span className="text-sm text-gray-400 font-mono">
                  {formatModifier(modifier)}
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>

      <p className="text-xs text-gray-500 text-center mt-4 font-mono">
        Click to roll ability check
      </p>
    </div>
  );
};
