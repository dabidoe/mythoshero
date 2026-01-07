import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Hammer, Cpu, Wand2 } from 'lucide-react';

const Forge = () => {
  const [prompt, setPrompt] = useState('');
  const [isForging, setIsForging] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleForge = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isForging) return;

    setIsForging(true);
    setProgress(0);

    // Simulate forging process
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsForging(false), 1000);
          return 100;
        }
        return prev + 1;
      });
    }, 40);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-32 pb-20 px-6 relative overflow-hidden">
      {/* Background FX */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-6"
          >
            <Sparkles size={14} /> The Forge Alpha
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-bold font-heading mb-6 tracking-tighter">
            What will you <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">create?</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Describe a character, item, or location. Our neural forge will hammer the raw lore into high-fidelity cinematic assets.
          </p>
        </div>

        <div className="relative group">
          {/* Main Input Window */}
          <motion.div
            className={`relative bg-[#121212] border ${isForging ? 'border-cyan-500 shadow-[0_0_50px_rgba(34,211,238,0.2)]' : 'border-white/10'} rounded-3xl p-2 transition-all duration-500`}
            animate={isForging ? { scale: 0.98 } : { scale: 1 }}
          >
            <form onSubmit={handleForge} className="flex flex-col md:flex-row gap-2">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                disabled={isForging}
                placeholder="A legendary elven rogue with a mechanical arm..."
                className="flex-1 bg-transparent border-none outline-none px-6 py-4 text-lg text-white placeholder:text-gray-600 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isForging || !prompt.trim()}
                className={`px-8 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all duration-300 transform active:scale-95
                  ${isForging 
                    ? 'bg-cyan-500/20 text-cyan-400 cursor-not-allowed' 
                    : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-900/20'
                  }`}
              >
                {isForging ? (
                  <>
                    <Cpu className="animate-spin" size={20} />
                    Forging...
                  </>
                ) : (
                  <>
                    <Hammer size={20} />
                    Strike
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Forging Animation State */}
          <AnimatePresence>
            {isForging && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-12 space-y-8"
              >
                {/* Progress Bar */}
                <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-cyan-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ ease: "linear" }}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-6 bg-white/5 rounded-2xl border border-white/5 flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center mb-4 text-cyan-400">
                      <Wand2 size={24} className="animate-pulse" />
                    </div>
                    <h3 className="text-sm font-bold mb-2 uppercase tracking-widest text-cyan-500">Weaving Lore</h3>
                    <p className="text-xs text-gray-500">Synthesizing narrative threads and cultural context...</p>
                  </div>
                  <div className="p-6 bg-white/5 rounded-2xl border border-white/5 flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-4 text-blue-400">
                      <Cpu size={24} className="animate-bounce" />
                    </div>
                    <h3 className="text-sm font-bold mb-2 uppercase tracking-widest text-blue-500">Shaping Form</h3>
                    <p className="text-xs text-gray-500">Executing generative neural passes for morphology...</p>
                  </div>
                  <div className="p-6 bg-white/5 rounded-2xl border border-white/5 flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center mb-4 text-indigo-400">
                      <Sparkles size={24} className="animate-spin" />
                    </div>
                    <h3 className="text-sm font-bold mb-2 uppercase tracking-widest text-indigo-500">Final Polish</h3>
                    <p className="text-xs text-gray-500">Applying atmospheric lighting and cinematic grain...</p>
                  </div>
                </div>

                {/* Simulated Console */}
                <div className="bg-black border border-white/5 p-4 rounded-xl font-mono text-[10px] text-gray-500 h-32 overflow-hidden relative">
                  <div className="space-y-1 animate-scroll-up">
                    <p>[0.0s] Connection established to MythOS Neural Core...</p>
                    <p>[0.4s] Input parsed: {prompt.slice(0, 50)}...</p>
                    <p>[1.2s] Archetype detected: HERO_LEGENDARY</p>
                    <p>[2.1s] Generating 4k textures...</p>
                    <p>[3.4s] Simulating material properties: Steel, Leather, Bone</p>
                    <p>[4.8s] Rendering cinematic lighting passes...</p>
                    <p>[5.9s] Finalizing asset GUID...</p>
                    <p>[7.2s] Forging complete.</p>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none"></div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Forge Guidelines */}
        <div className="mt-24 grid md:grid-cols-3 gap-12 text-sm">
           <div>
             <h4 className="text-white font-bold mb-3 uppercase tracking-widest">Detail is Power</h4>
             <p className="text-gray-500 leading-relaxed">The forge responds better to descriptive language. Mention materials, moods, and specific details.</p>
           </div>
           <div>
             <h4 className="text-white font-bold mb-3 uppercase tracking-widest">Neural Balance</h4>
             <p className="text-gray-500 leading-relaxed">Our models are trained on high-fantasy and sci-fi lore. Cross-genre prompts often yield the most unique results.</p>
           </div>
           <div>
             <h4 className="text-white font-bold mb-3 uppercase tracking-widest">Direct Integration</h4>
             <p className="text-gray-500 leading-relaxed">Once forged, assets can be immediately exported to Roll20, Foundry, or D&D Beyond.</p>
           </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scroll-up {
          0% { transform: translateY(0); }
          100% { transform: translateY(-100%); }
        }
        .animate-scroll-up {
          animation: scroll-up 20s linear infinite;
        }
      `}} />
    </div>
  );
};

export default Forge;