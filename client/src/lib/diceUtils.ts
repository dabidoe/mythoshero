export interface RollResult {
  total: number;
  rolls: number[];
  expression: string;
  breakdown: string;
  modifier: number;
}

/**
 * Rolls a single die of given size
 */
export const rollSingleDie = (dieSize: number): number => {
  return Math.floor(Math.random() * dieSize) + 1;
};

/**
 * Rolls multiple dice of the same size
 */
export const rollDice = (numDice: number, dieSize: number, modifier: number = 0): RollResult => {
  const rolls = Array.from({ length: numDice }, () => rollSingleDie(dieSize));
  const sumOfRolls = rolls.reduce((sum, roll) => sum + roll, 0);
  const total = sumOfRolls + modifier;

  const modifierStr = modifier > 0 ? `+${modifier}` : modifier < 0 ? `${modifier}` : '';
  const breakdown = `[${rolls.join(', ')}]${modifierStr}`;
  const expression = `${numDice}d${dieSize}${modifierStr}`;

  return {
    total,
    rolls,
    expression,
    breakdown,
    modifier
  };
};

/**
 * Parses a dice expression and returns a roll result
 * Supports formats: "1d20", "3d6+4", "8d6-2", "d20+5"
 */
export const parseDiceExpression = (expr: string): RollResult => {
  // Clean up the expression
  const cleanExpr = expr.trim().toLowerCase().replace(/\s+/g, '');

  // Match dice expression: (number)d(number)(+/-number)
  const regex = /^(\d*)d(\d+)([+-]\d+)?$/;
  const match = cleanExpr.match(regex);

  if (!match) {
    throw new Error(`Invalid dice expression: ${expr}`);
  }

  const numDice = match[1] ? parseInt(match[1]) : 1;
  const dieSize = parseInt(match[2]);
  const modifier = match[3] ? parseInt(match[3]) : 0;

  if (numDice < 1 || numDice > 100) {
    throw new Error('Number of dice must be between 1 and 100');
  }

  if (dieSize < 2 || dieSize > 1000) {
    throw new Error('Die size must be between 2 and 1000');
  }

  return rollDice(numDice, dieSize, modifier);
};

/**
 * Extracts dice expression from text
 * Example: "8d6 Fire damage" -> "8d6"
 */
export const extractDiceExpression = (text: string): string | null => {
  const match = text.match(/(\d*d\d+(?:[+-]\d+)?)/i);
  return match ? match[1] : null;
};

/**
 * Calculates ability modifier from ability score
 * D&D 5e formula: floor((score - 10) / 2)
 */
export const getAbilityModifier = (score: number): number => {
  return Math.floor((score - 10) / 2);
};

/**
 * Formats modifier with + or - sign
 */
export const formatModifier = (modifier: number): string => {
  if (modifier >= 0) {
    return `+${modifier}`;
  }
  return `${modifier}`;
};
