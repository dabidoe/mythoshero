import React from 'react';
import { motion } from 'framer-motion';
import { formatModifier } from '@/lib/diceUtils';
import { Star } from 'lucide-react';

interface Skill {
  name: string;
  modifier: number;
  proficient: boolean;
}

interface SkillsPanelProps {
  skills: Skill[];
  onRoll: (expression: string, context: string) => void;
}

export const SkillsPanel: React.FC<SkillsPanelProps> = ({ skills, onRoll }) => {
  const handleSkillClick = (skill: Skill) => {
    const expression = skill.modifier >= 0 ? `1d20+${skill.modifier}` : `1d20${skill.modifier}`;
    onRoll(expression, `${skill.name} Check`);
  };

  return (
    <div className="bg-[#121212]/50 backdrop-blur-md border border-white/5 rounded-2xl p-6">
      <h3 className="text-xs font-mono text-cyan-500 uppercase tracking-widest mb-6">
        Skills
      </h3>

      <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        {skills.map((skill, index) => (
          <motion.button
            key={`${skill.name}-${index}`}
            onClick={() => handleSkillClick(skill)}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.03 }}
            whileHover={{ x: 4 }}
            className="w-full flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-cyan-500/10 border border-white/5 hover:border-cyan-500/30 transition-all group cursor-pointer"
          >
            <div className="flex items-center gap-2">
              {skill.proficient && (
                <Star
                  size={12}
                  className="text-cyan-500 fill-cyan-500"
                />
              )}
              <span className="text-sm text-gray-400 group-hover:text-white transition-colors">
                {skill.name}
              </span>
            </div>
            <span className="font-mono text-cyan-400 font-bold">
              {formatModifier(skill.modifier)}
            </span>
          </motion.button>
        ))}
      </div>

      <p className="text-xs text-gray-500 text-center mt-4 font-mono">
        <Star size={10} className="inline text-cyan-500 fill-cyan-500" /> = Proficient
      </p>

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
