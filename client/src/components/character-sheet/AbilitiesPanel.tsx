import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Award, Eye } from 'lucide-react';

interface AbilitiesPanelProps {
  abilities?: Array<{
    abilityId: { $oid: string };
    name?: string;
    description?: string;
    icon?: string;
  }>;
  feats?: Array<{
    featId: { $oid: string };
    name?: string;
    description?: string;
    summary?: string;
    icon?: string;
  }>;
  passiveTraits?: Array<{
    traitId: { $oid: string };
    name?: string;
    description?: string;
    summary?: string;
    icon?: string;
  }>;
}

export const AbilitiesPanel: React.FC<AbilitiesPanelProps> = ({
  abilities = [],
  feats = [],
  passiveTraits = []
}) => {
  const totalAbilities = abilities.length + feats.length + passiveTraits.length;

  return (
    <div className="bg-[#121212]/50 backdrop-blur-md border border-white/5 rounded-2xl p-6">
      <h3 className="text-xs font-mono text-cyan-500 uppercase tracking-widest mb-6">
        Abilities & Features
      </h3>

      <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
        {/* Class Abilities */}
        {abilities.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-3">
              <Zap size={16} className="text-cyan-500" />
              <span className="text-sm font-mono text-gray-400">Class Abilities</span>
              <span className="text-xs text-gray-600">({abilities.length})</span>
            </div>

            {abilities.map((ability, index) => (
              <motion.div
                key={ability.abilityId.$oid}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-4 rounded-lg bg-white/5 border border-white/5 hover:border-cyan-500/30 transition-all"
              >
                {ability.icon && (
                  <img
                    src={ability.icon}
                    alt={ability.name || 'Ability'}
                    className="w-10 h-10 rounded-lg mb-3 border border-white/10"
                  />
                )}
                <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                  <span className="w-1 h-1 bg-cyan-500 rounded-full"></span>
                  {ability.name || 'Unnamed Ability'}
                </h4>
                {ability.description && (
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {ability.description}
                  </p>
                )}
                {!ability.name && (
                  <p className="text-xs text-gray-600 font-mono">
                    ID: {ability.abilityId.$oid.slice(0, 12)}...
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {/* Feats */}
        {feats.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-3">
              <Award size={16} className="text-yellow-500" />
              <span className="text-sm font-mono text-gray-400">Feats</span>
              <span className="text-xs text-gray-600">({feats.length})</span>
            </div>

            {feats.map((feat, index) => (
              <motion.div
                key={feat.featId.$oid}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-4 rounded-lg bg-white/5 border border-white/5 hover:border-yellow-500/30 transition-all"
              >
                {feat.icon && (
                  <img
                    src={feat.icon}
                    alt={feat.name || 'Feat'}
                    className="w-10 h-10 rounded-lg mb-3 border border-white/10"
                  />
                )}
                <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                  <span className="w-1 h-1 bg-yellow-500 rounded-full"></span>
                  {feat.name || 'Unnamed Feat'}
                </h4>
                {feat.summary && (
                  <p className="text-xs text-gray-500 mb-2 italic">
                    {feat.summary}
                  </p>
                )}
                {feat.description && (
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {feat.description}
                  </p>
                )}
                {!feat.name && (
                  <p className="text-xs text-gray-600 font-mono">
                    ID: {feat.featId.$oid.slice(0, 12)}...
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {/* Passive Traits */}
        {passiveTraits.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-3">
              <Eye size={16} className="text-blue-500" />
              <span className="text-sm font-mono text-gray-400">Passive Traits</span>
              <span className="text-xs text-gray-600">({passiveTraits.length})</span>
            </div>

            {passiveTraits.map((trait, index) => (
              <motion.div
                key={trait.traitId.$oid}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-4 rounded-lg bg-white/5 border border-white/5 hover:border-blue-500/30 transition-all"
              >
                <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                  {trait.icon && <span>{trait.icon}</span>}
                  <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                  {trait.name || 'Unnamed Trait'}
                </h4>
                {trait.summary && (
                  <p className="text-xs text-gray-500 mb-2 italic">
                    {trait.summary}
                  </p>
                )}
                {trait.description && (
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {trait.description}
                  </p>
                )}
                {!trait.name && (
                  <p className="text-xs text-gray-600 font-mono">
                    ID: {trait.traitId.$oid.slice(0, 12)}...
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {totalAbilities === 0 && (
          <div className="text-center py-8">
            <Zap size={48} className="mx-auto text-gray-600 mb-4" />
            <p className="text-gray-500 font-mono text-sm">
              No abilities or features
            </p>
          </div>
        )}
      </div>

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
