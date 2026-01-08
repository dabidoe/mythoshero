import React, { useState } from 'react';
import { useRoute, Link } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useCharacterData, type Spell } from '@/hooks/useCharacterData';
import { useDiceRoller } from '@/hooks/useDiceRoller';
import { extractDiceExpression } from '@/lib/diceUtils';

// Import all components
import { StatBlock } from '@/components/character-sheet/StatBlock';
import { SkillsPanel } from '@/components/character-sheet/SkillsPanel';
import { CombatStats } from '@/components/character-sheet/CombatStats';
import { DiceRoller } from '@/components/character-sheet/DiceRoller';
import { SpellSlotTracker, type SpellSlots } from '@/components/character-sheet/SpellSlotTracker';
import { SpellList } from '@/components/character-sheet/SpellList';
import { InventoryPanel } from '@/components/character-sheet/InventoryPanel';
import { AbilitiesPanel } from '@/components/character-sheet/AbilitiesPanel';
import { ProfileSection } from '@/components/character-sheet/ProfileSection';

export default function CharacterSheetPage() {
  const [, params] = useRoute('/character-sheet/:characterId');
  const character = useCharacterData(params?.characterId);
  const { roll, clear, lastRoll, isRolling } = useDiceRoller();

  // Spell slot state management
  const [spellSlots, setSpellSlots] = useState<SpellSlots>(() => {
    // Initialize spell slots from character data
    // For now, we'll use a default structure since the data doesn't have pre-defined slots
    // In a real implementation, this would be initialized from character.spells.slots
    const slots: SpellSlots = {};
    for (let level = 1; level <= 9; level++) {
      slots[level] = { max: 0, used: 0 };
    }

    // Set some default slots based on character level (simplified D&D 5e progression)
    if (character) {
      const charLevel = character.level;
      if (charLevel >= 1) slots[1] = { max: 2, used: 0 };
      if (charLevel >= 3) slots[2] = { max: 2, used: 0 };
      if (charLevel >= 5) slots[3] = { max: 2, used: 0 };
      if (charLevel >= 7) slots[4] = { max: 1, used: 0 };
      if (charLevel >= 9) slots[5] = { max: 1, used: 0 };
      if (charLevel >= 11) slots[6] = { max: 1, used: 0 };
      if (charLevel >= 13) slots[7] = { max: 1, used: 0 };
      if (charLevel >= 15) slots[8] = { max: 1, used: 0 };
      if (charLevel >= 17) slots[9] = { max: 1, used: 0 };
    }

    return slots;
  });

  const handleToggleSlot = (level: number, slotIndex: number) => {
    setSpellSlots(prev => {
      const slots = { ...prev };
      const levelSlots = slots[level];

      if (!levelSlots) return prev;

      // Toggle: if slot is used, restore it; if available, use it
      if (slotIndex < levelSlots.used) {
        // Restore this slot and all higher indices
        slots[level] = { ...levelSlots, used: slotIndex };
      } else {
        // Use this slot
        slots[level] = { ...levelSlots, used: slotIndex + 1 };
      }

      return slots;
    });
  };

  const handleSpellCast = (spell: Spell) => {
    // Extract damage dice from spell
    const diceExpr = extractDiceExpression(spell.damage);

    if (diceExpr) {
      roll(diceExpr, `${spell.name} Damage`);
    }

    // Consume spell slot if not a cantrip
    if (spell.level > 0 && spellSlots[spell.level]) {
      const levelSlots = spellSlots[spell.level];
      if (levelSlots.used < levelSlots.max) {
        setSpellSlots(prev => ({
          ...prev,
          [spell.level]: {
            ...prev[spell.level],
            used: prev[spell.level].used + 1
          }
        }));
      }
    }
  };

  // Loading state
  if (!character) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 size={48} className="mx-auto text-cyan-500 animate-spin mb-4" />
          <p className="text-gray-400 font-mono">Loading character sheet...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-4 md:p-8">
      <div className="max-w-[1800px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link href="/assets">
            <button className="flex items-center gap-2 text-gray-400 hover:text-cyan-500 transition-colors mb-4 group">
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              <span className="font-mono text-sm">Back to Vault</span>
            </button>
          </Link>

          <div className="flex items-end justify-between">
            <div>
              <h1 className="text-5xl md:text-7xl font-extrabold font-heading tracking-tighter mb-2">
                {character.name}
              </h1>
              <div className="flex flex-wrap gap-4 items-center">
                <span className="text-cyan-500 font-mono text-xl uppercase tracking-widest">
                  {character.race}
                </span>
                <span className="w-2 h-2 rounded-full bg-white/20"></span>
                <span className="text-gray-400 text-xl font-heading">
                  {character.class}
                </span>
                <span className="w-2 h-2 rounded-full bg-white/20"></span>
                <span className="bg-white/10 px-4 py-1 rounded-full text-sm font-bold border border-white/10">
                  LEVEL {character.level}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-3 space-y-6">
            <StatBlock
              attributes={character.attributes}
              onRoll={roll}
            />
            <SkillsPanel
              skills={character.skills}
              onRoll={roll}
            />
            <CombatStats
              hp={character.hp}
              ac={character.ac}
              initiative={character.initiative}
              onRoll={roll}
            />
          </div>

          {/* Center Column */}
          <div className="lg:col-span-6 space-y-6">
            <SpellSlotTracker
              spellSlots={spellSlots}
              onToggleSlot={handleToggleSlot}
            />
            <SpellList
              spells={character.spells.known.map(k => ({ ...k.spell, prepared: k.prepared }))}
              onCast={handleSpellCast}
            />
            <AbilitiesPanel
              abilities={character.abilities}
              feats={character.feats}
              passiveTraits={character.passiveTraits}
            />
          </div>

          {/* Right Column */}
          <div className="lg:col-span-3 space-y-6">
            <ProfileSection
              name={character.name}
              race={character.race}
              characterClass={character.class}
              level={character.level}
              alignment={character.alignment}
              icon={character.icon}
              profile={character.profile}
            />
            <InventoryPanel
              inventory={character.inventory}
            />
          </div>
        </div>
      </div>

      {/* Floating Dice Roller */}
      <DiceRoller
        lastRoll={lastRoll}
        isRolling={isRolling}
        onDismiss={clear}
      />
    </div>
  );
}
