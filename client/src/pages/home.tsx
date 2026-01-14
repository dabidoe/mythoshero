import React from 'react';
import { motion } from 'framer-motion';
import characterImage from '@assets/generated_images/cinematic_fantasy_knight_character_portrait.png';
import AssetGallery from '@/components/AssetGallery';
import { Link } from 'wouter';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-cyan-500 overflow-x-hidden pt-16">
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/10 rounded-full blur-[120px]" />
      </div>

      {/* Hero Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-12 lg:pt-20 pb-32 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-4xl sm:text-6xl lg:text-8xl font-extrabold font-heading leading-tight mb-6">
            Forge Legends.<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-200 to-blue-600 animate-pulse">
              Build Worlds.
            </span>
          </h1>
          <p className="text-xl text-gray-400 mb-10 max-w-lg leading-relaxed border-l-2 border-cyan-900/50 pl-6">
            The premium asset pipeline for storytellers. High-fidelity characters, 
            cinematic lore, and interactive VTT integration. <br/>
            <span className="text-cyan-400">Stop generating—start crafting.</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="https://app.mythos.quest"
              className="bg-cyan-600 hover:bg-cyan-500 text-white px-8 py-4 rounded-lg font-bold text-lg shadow-[0_0_30px_rgba(8,145,178,0.4)] hover:shadow-[0_0_40px_rgba(34,211,238,0.6)] transition-all duration-300 transform hover:-translate-y-1 text-center"
            >
              Try the App
            </a>
            <Link href="/assets">
              <button className="group border border-white/20 hover:border-cyan-500/50 hover:bg-cyan-950/30 px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 w-full">
                <span className="group-hover:text-cyan-400 transition-colors">View Asset Gallery</span>
              </button>
            </Link>
          </div>
          
          <div className="mt-12 flex items-center gap-4 text-sm text-gray-500">
            <div className="flex -space-x-2">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-8 h-8 rounded-full bg-gray-800 border border-black flex items-center justify-center text-xs">
                  {/* Placeholder avatars */}
                  User
                </div>
              ))}
            </div>
            <p>Joined by 10,000+ cool ass bros</p>
          </div>
        </motion.div>

        {/* Cinematic Asset Preview */}
        <motion.div 
          className="relative group perspective-1000"
          initial={{ opacity: 0, scale: 0.9, rotateY: 10 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
          
          {/* Tech lines decoration */}
          <div className="absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-cyan-500/30 rounded-tr-3xl hidden lg:block" />
          <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b-2 border-l-2 border-cyan-500/30 rounded-bl-3xl hidden lg:block" />

          <div className="relative bg-[#121212] border border-white/10 rounded-2xl overflow-hidden aspect-video shadow-2xl group-hover:shadow-[0_0_50px_rgba(34,211,238,0.15)] transition-all duration-500">
             {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10"></div>
            
            {/* UI Overlay Elements */}
            <div className="absolute top-3 right-3 sm:top-6 sm:right-6 z-20 flex gap-2">
              <div className="bg-black/50 backdrop-blur-md px-2 py-1 sm:px-3 rounded text-[10px] sm:text-xs font-mono text-cyan-400 border border-cyan-900/50">
                ASSET_ID: KX-902
              </div>
              <div className="hidden sm:block bg-cyan-500/10 backdrop-blur-md px-3 py-1 rounded text-xs font-mono text-cyan-300 border border-cyan-500/20 animate-pulse">
                LIVE RENDER
              </div>
            </div>

            <div className="absolute bottom-3 left-3 sm:bottom-6 sm:left-6 z-20 max-w-md">
              <p className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-cyan-400 mb-1 sm:mb-2">Featured Asset</p>
              <h3 className="text-xl sm:text-3xl font-bold font-heading text-white mb-2">Sir Kealen, The Iron Oath</h3>
              <div className="flex gap-2">
                <span className="text-xs bg-white/10 px-2 py-1 rounded text-gray-300">Human</span>
                <span className="text-xs bg-white/10 px-2 py-1 rounded text-gray-300">Paladin</span>
                <span className="text-xs bg-white/10 px-2 py-1 rounded text-gray-300">Lvl 45</span>
              </div>
            </div>
            
            <img 
              src={characterImage} 
              alt="High Quality Character Asset - Sir Kealen" 
              className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition duration-1000 ease-in-out"
            />
          </div>
        </motion.div>
      </main>

      <AssetGallery />

      {/* Footer / Brands */}
      <footer className="border-t border-white/5 py-8 sm:py-12">
         <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 opacity-40 hover:opacity-100 transition-opacity duration-500">
           <div className="text-xs sm:text-sm text-gray-500 text-center md:text-left">TRUSTED BY WORLD BUILDERS</div>
           <div className="flex flex-wrap justify-center gap-4 sm:gap-8 grayscale hover:grayscale-0 transition-all">
             <div className="font-heading font-bold text-sm sm:text-xl">D&D BEYOND</div>
             <div className="font-heading font-bold text-sm sm:text-xl">ROLL20</div>
             <div className="font-heading font-bold text-sm sm:text-xl">FOUNDRY</div>
           </div>
         </div>
      </footer>
    </div>
  );
}
