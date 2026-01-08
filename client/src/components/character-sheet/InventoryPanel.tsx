import React from 'react';
import { motion } from 'framer-motion';
import { Sword, Shield, Package } from 'lucide-react';

interface InventoryPanelProps {
  inventory: {
    items: any[];
    weapons: Array<{
      itemId: { $oid: string };
      equipped: boolean;
    }>;
    armor: any[];
  };
}

export const InventoryPanel: React.FC<InventoryPanelProps> = ({ inventory }) => {
  const totalItems = inventory.items.length + inventory.weapons.length + inventory.armor.length;

  return (
    <div className="bg-[#121212]/50 backdrop-blur-md border border-white/5 rounded-2xl p-6">
      <h3 className="text-xs font-mono text-cyan-500 uppercase tracking-widest mb-6">
        Inventory
      </h3>

      <div className="space-y-4">
        {/* Weapons */}
        {inventory.weapons.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-3">
              <Sword size={16} className="text-orange-500" />
              <span className="text-sm font-mono text-gray-400">Weapons</span>
              <span className="text-xs text-gray-600">({inventory.weapons.length})</span>
            </div>

            <div className="space-y-2">
              {inventory.weapons.map((weapon, index) => (
                <motion.div
                  key={weapon.itemId.$oid}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`p-3 rounded-lg border transition-all ${
                    weapon.equipped
                      ? 'bg-cyan-500/10 border-cyan-500/30'
                      : 'bg-white/5 border-white/5'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">
                      Weapon #{index + 1}
                    </span>
                    {weapon.equipped && (
                      <span className="px-2 py-0.5 bg-cyan-500/20 text-cyan-400 text-xs rounded font-mono">
                        EQUIPPED
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-600 font-mono mt-1">
                    ID: {weapon.itemId.$oid.slice(0, 8)}...
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Armor */}
        {inventory.armor.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-3">
              <Shield size={16} className="text-blue-500" />
              <span className="text-sm font-mono text-gray-400">Armor</span>
              <span className="text-xs text-gray-600">({inventory.armor.length})</span>
            </div>

            <div className="space-y-2">
              {inventory.armor.map((armor, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-3 rounded-lg bg-white/5 border border-white/5"
                >
                  <span className="text-sm text-gray-400">
                    Armor #{index + 1}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Other Items */}
        {inventory.items.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-3">
              <Package size={16} className="text-green-500" />
              <span className="text-sm font-mono text-gray-400">Items</span>
              <span className="text-xs text-gray-600">({inventory.items.length})</span>
            </div>

            <div className="space-y-2">
              {inventory.items.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-3 rounded-lg bg-white/5 border border-white/5"
                >
                  <span className="text-sm text-gray-400">
                    Item #{index + 1}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Empty state */}
        {totalItems === 0 && (
          <div className="text-center py-8">
            <Package size={48} className="mx-auto text-gray-600 mb-4" />
            <p className="text-gray-500 font-mono text-sm">
              Empty inventory
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
