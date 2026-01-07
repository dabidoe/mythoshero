import React from 'react';
import { motion } from 'framer-motion';
import kealenImg from '@assets/generated_images/cinematic_fantasy_knight_character_portrait.png';
import shadowImg from '@assets/generated_images/shadow_weaver_mage_portrait.png';
import swordImg from '@assets/generated_images/the_iron_oath_artifact_sword.png';
import forestImg from '@assets/generated_images/grimwood_pass_setting_environment.png';

const assets = [
  { id: 1, name: 'Sir Kealen', type: 'Hero', rarity: 'Legendary', img: kealenImg },
  { id: 2, name: 'Shadow Weaver', type: 'Mage', rarity: 'Epic', img: shadowImg },
  { id: 3, name: 'The Iron Oath', type: 'Artifact', rarity: 'Rare', img: swordImg },
  { id: 4, name: 'Grimwood Pass', type: 'Setting', rarity: 'Uncommon', img: forestImg },
];

const AssetGallery = () => {
  return (
    <section id="assets" className="bg-[#0a0a0a] py-32 px-6 relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-cyan-500/5 blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl font-bold text-white mb-4 font-heading tracking-tight">The Asset Vault</h2>
            <p className="text-gray-400 text-lg max-w-xl border-l-2 border-cyan-500/20 pl-6">
              Cinematic story building blocks for your next quest. High-fidelity renders, 
              interactive lore, and seamless integration.
            </p>
          </motion.div>
          <motion.button 
            whileHover={{ x: 5 }}
            className="text-cyan-400 font-bold hover:text-cyan-300 transition-colors text-sm uppercase tracking-widest flex items-center gap-2 group"
          >
            Browse All Assets <span className="group-hover:translate-x-1 transition-transform">→</span>
          </motion.button>
        </div>

        {/* The Netflix-Style Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {assets.map((asset, index) => (
            <motion.div 
              key={asset.id} 
              className="group relative bg-[#121212] border border-white/5 rounded-2xl overflow-hidden hover:border-cyan-500/50 transition-all duration-500 shadow-2xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Aspect Ratio Box for consistent "Netflix Card" look */}
              <div className="aspect-[2/3] relative overflow-hidden">
                <img 
                  src={asset.img} 
                  alt={asset.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700 ease-in-out"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-500"></div>
                
                {/* Tech Lines Overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                   <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-cyan-500/40"></div>
                   <div className="absolute bottom-4 left-4 w-8 h-8 border-b border-l border-cyan-500/40"></div>
                </div>

                {/* Badge */}
                <div className="absolute top-4 left-4">
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded border backdrop-blur-md uppercase tracking-tighter
                    ${asset.rarity === 'Legendary' ? 'bg-orange-500/10 text-orange-400 border-orange-500/30' : 
                      asset.rarity === 'Epic' ? 'bg-purple-500/10 text-purple-400 border-purple-500/30' :
                      asset.rarity === 'Rare' ? 'bg-blue-500/10 text-blue-400 border-blue-500/30' :
                      'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'}
                  `}>
                    {asset.rarity}
                  </span>
                </div>
              </div>

              {/* Card Details */}
              <div className="p-6 relative">
                <p className="text-[10px] text-cyan-500/60 font-mono uppercase tracking-widest mb-2">{asset.type}</p>
                <h3 className="text-2xl font-bold text-white font-heading group-hover:text-cyan-400 transition-colors">{asset.name}</h3>
                <button className="mt-6 w-full py-3 bg-white/5 hover:bg-cyan-500 hover:text-black text-white text-xs font-bold rounded-lg transition-all duration-300 border border-white/5 hover:border-cyan-500 transform active:scale-95">
                  VIEW ASSET SPECS
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AssetGallery;
