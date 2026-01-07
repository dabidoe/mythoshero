import React from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Grid, List, Download, ExternalLink, Zap } from 'lucide-react';
import AssetGallery from '@/components/AssetGallery';
import bgTexture from '@assets/generated_images/mythos_asset_library_background_texture.png';

const AssetsPage = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-32 pb-20 px-6 relative overflow-hidden">
      {/* Background Texture Overlay */}
      <div 
        className="fixed inset-0 z-0 opacity-20 pointer-events-none bg-cover bg-center"
        style={{ backgroundImage: `url(${bgTexture})` }}
      />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold font-heading tracking-tighter mb-4">
              Library of <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Infinite Lore.</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl border-l-2 border-cyan-500/20 pl-6">
              Browse, filter, and export thousands of premium character, item, and setting assets. 
              Integrated directly with your favorite VTT platforms.
            </p>
          </motion.div>

          {/* Search & Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <div className="relative flex-1 sm:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input 
                type="text" 
                placeholder="Search the vault..." 
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-cyan-500/50 transition-all focus:bg-white/10"
              />
            </div>
            <button className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 rounded-xl px-6 py-3 hover:bg-white/10 transition-all">
              <Filter size={18} /> Filters
            </button>
          </div>
        </div>

        {/* Categories / Quick Toggles */}
        <div className="flex gap-4 mb-12 overflow-x-auto pb-4 custom-scrollbar">
          {['All Assets', 'Heroes', 'Mages', 'Artifacts', 'Settings', 'Spells', 'Creatures'].map((cat, i) => (
            <motion.button
              key={cat}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`whitespace-nowrap px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest border transition-all
                ${i === 0 ? 'bg-cyan-500 text-black border-cyan-500' : 'bg-white/5 text-gray-400 border-white/10 hover:border-white/30'}
              `}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Asset Grid (Reusing Gallery Component logic with page-specific styling) */}
        <AssetGallery />

        {/* Export Integration Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-24 p-12 rounded-3xl bg-gradient-to-b from-white/5 to-transparent border border-white/5 text-center"
        >
          <h2 className="text-3xl font-bold font-heading mb-6">Ready to Export?</h2>
          <div className="flex flex-wrap justify-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="flex items-center gap-2 font-bold text-xl"><Download size={24}/> ROLL20</div>
            <div className="flex items-center gap-2 font-bold text-xl"><ExternalLink size={24}/> FOUNDRY</div>
            <div className="flex items-center gap-2 font-bold text-xl"><Zap size={24}/> D&D BEYOND</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AssetsPage;