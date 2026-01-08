import { useState, useCallback } from 'react';
import { parseDiceExpression, type RollResult } from '@/lib/diceUtils';

export interface DiceRollContext {
  result: RollResult;
  context?: string;
  timestamp: number;
}

export const useDiceRoller = () => {
  const [lastRoll, setLastRoll] = useState<DiceRollContext | null>(null);
  const [isRolling, setIsRolling] = useState(false);

  const roll = useCallback((expression: string, context?: string): RollResult => {
    try {
      setIsRolling(true);
      const result = parseDiceExpression(expression);

      setLastRoll({
        result,
        context,
        timestamp: Date.now()
      });

      // Reset rolling state after animation
      setTimeout(() => {
        setIsRolling(false);
      }, 800);

      return result;
    } catch (error) {
      setIsRolling(false);
      console.error('Dice roll error:', error);
      throw error;
    }
  }, []);

  const clear = useCallback(() => {
    setLastRoll(null);
    setIsRolling(false);
  }, []);

  return {
    roll,
    clear,
    lastRoll,
    isRolling
  };
};
