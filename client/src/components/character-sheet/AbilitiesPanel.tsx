import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Award, Eye } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

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
  // Filter out items without proper names (only showing IDs)
  const validAbilities = abilities.filter(a => a.name && a.name.trim().length > 0);
  const validFeats = feats.filter(f => f.name && f.name.trim().length > 0);
  const validTraits = passiveTraits.filter(t => t.name && t.name.trim().length > 0);

  const totalAbilities = validAbilities.length + validFeats.length + validTraits.length;

  return (
    <div className="bg-[#121212]/50 backdrop-blur-md border border-white/5 rounded-2xl p-6">
      <h3 className="text-xs font-mono text-cyan-500 uppercase tracking-widest mb-6">
        Abilities & Features
      </h3>

      {totalAbilities === 0 ? (
        <div className="text-center py-8">
          <Zap size={48} className="mx-auto text-gray-600 mb-4" />
          <p className="text-gray-500 font-mono text-sm">
            No abilities or features
          </p>
        </div>
      ) : (
        <Accordion type="multiple" className="space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
          {/* Class Abilities */}
          {validAbilities.length > 0 && (
            <AccordionItem value="abilities" className="border border-white/10 rounded-xl overflow-hidden">
              <AccordionTrigger className="px-4 py-3 bg-white/5 hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-3">
                  <Zap size={16} className="text-cyan-500" />
                  <span className="text-sm font-mono text-white">Class Abilities</span>
                  <span className="text-xs text-gray-500">({validAbilities.length})</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-4 space-y-3">
                {validAbilities.map((ability, index) => (
                  <motion.div
                    key={ability.abilityId.$oid}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-4 rounded-lg bg-white/5 border border-white/5"
                  >
                    {ability.icon && (
                      <img
                        src={ability.icon}
                        alt={ability.name}
                        className="w-10 h-10 rounded-lg mb-3 border border-white/10"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    )}
                    <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                      <span className="w-1 h-1 bg-cyan-500 rounded-full"></span>
                      {ability.name}
                    </h4>
                    {ability.description && (
                      <p className="text-sm text-gray-400 leading-relaxed">
                        {ability.description}
                      </p>
                    )}
                  </motion.div>
                ))}
              </AccordionContent>
            </AccordionItem>
          )}

          {/* Feats */}
          {validFeats.length > 0 && (
            <AccordionItem value="feats" className="border border-white/10 rounded-xl overflow-hidden">
              <AccordionTrigger className="px-4 py-3 bg-white/5 hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-3">
                  <Award size={16} className="text-yellow-500" />
                  <span className="text-sm font-mono text-white">Feats</span>
                  <span className="text-xs text-gray-500">({validFeats.length})</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-4 space-y-3">
                {validFeats.map((feat, index) => (
                  <motion.div
                    key={feat.featId.$oid}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-4 rounded-lg bg-white/5 border border-white/5"
                  >
                    {feat.icon && (
                      <img
                        src={feat.icon}
                        alt={feat.name}
                        className="w-10 h-10 rounded-lg mb-3 border border-white/10"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    )}
                    <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                      <span className="w-1 h-1 bg-yellow-500 rounded-full"></span>
                      {feat.name}
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
                  </motion.div>
                ))}
              </AccordionContent>
            </AccordionItem>
          )}

          {/* Passive Traits */}
          {validTraits.length > 0 && (
            <AccordionItem value="traits" className="border border-white/10 rounded-xl overflow-hidden">
              <AccordionTrigger className="px-4 py-3 bg-white/5 hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-3">
                  <Eye size={16} className="text-blue-500" />
                  <span className="text-sm font-mono text-white">Passive Traits</span>
                  <span className="text-xs text-gray-500">({validTraits.length})</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-4 space-y-3">
                {validTraits.map((trait, index) => (
                  <motion.div
                    key={trait.traitId.$oid}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-4 rounded-lg bg-white/5 border border-white/5"
                  >
                    <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                      {trait.icon && <span>{trait.icon}</span>}
                      <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                      {trait.name}
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
                  </motion.div>
                ))}
              </AccordionContent>
            </AccordionItem>
          )}
        </Accordion>
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
