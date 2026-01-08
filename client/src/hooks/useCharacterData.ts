import { useMemo } from 'react';
import charactersData from '@/characters.json';
import spellsData from '@/spells.json';

export interface Spell {
  _id: { $oid: string };
  name: string;
  level: number;
  description: string;
  castingTime: string;
  range: string;
  components: string;
  duration: string;
  damage: string;
  school: string;
  icon: string;
}

export interface EnrichedCharacter {
  _id: { $oid: string };
  userId?: { $oid: string };
  name: string;
  class: string;
  race: string;
  level: number;
  alignment?: string;
  attributes: {
    str: number;
    dex: number;
    con: number;
    int: number;
    wis: number;
    cha: number;
  };
  hp: {
    current: number;
    max: number;
  };
  ac: number;
  initiative: number;
  state?: string;
  abilities?: Array<{
    abilityId: { $oid: string };
    name?: string;
    description?: string;
    icon?: string;
  }>;
  spells: {
    slots: any[];
    known: Array<{
      spell: Spell;
      prepared: boolean;
    }>;
  };
  inventory: {
    items: any[];
    weapons: Array<{
      itemId: { $oid: string };
      equipped: boolean;
    }>;
    armor: any[];
  };
  skills: Array<{
    name: string;
    modifier: number;
    proficient: boolean;
    _id?: { $oid: string };
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
  profile?: {
    backstory?: string;
    behavior?: string;
    personality?: string;
  };
  icon?: string;
  slug?: string;
  isPublic?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export const useCharacterData = (characterId: string | undefined): EnrichedCharacter | null => {
  return useMemo(() => {
    if (!characterId) return null;

    // Find character by _id.$oid
    const character = (charactersData as any[]).find(
      (char: any) => char._id?.$oid === characterId
    );

    if (!character) return null;

    // Enrich character data by resolving spell references
    const enrichedSpells = character.spells?.known?.map((knownSpell: any) => {
      const spell = (spellsData as any[]).find(
        (s: any) => s._id?.$oid === knownSpell.spellId?.$oid
      );

      return {
        spell: spell || null,
        prepared: knownSpell.prepared
      };
    }).filter((s: any) => s.spell !== null) || [];

    return {
      ...character,
      spells: {
        slots: character.spells?.slots || [],
        known: enrichedSpells
      }
    } as EnrichedCharacter;
  }, [characterId]);
};
