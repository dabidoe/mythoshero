import { motion } from "framer-motion";
import { Shield, Zap, Activity, Fingerprint } from "lucide-react";

export default function CharacterFoundryCard({ character }) {
  // We extract the high-value data from your JSON
  const { name, race, level, hp, ac, attributes, state, profilePicture } = character;

  // The Cold Glow Theme
  const accentColor = "rgba(0, 255, 240, 0.5)"; // Cold Cyan
  const darkGlass = "backdrop-blur-md bg-black/60 border border-white/10";

  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className={`relative w-80 overflow-hidden rounded-xl ${darkGlass} shadow-2xl group`}
    >
      {/* 1. TOP DATA STRIP: Industrial "Serial Number" look */}
      <div className="flex justify-between items-center px-4 py-2 bg-white/5 border-b border-white/10">
        <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-1">
          <Fingerprint size={12} /> ID_{character._id.$oid.slice(-6)}
        </span>
        <span className="text-[10px] font-bold text-cyan-400/80">LVL_{level}</span>
      </div>

      {/* 2. THE IMAGE: Portrait with Cold Bottom Fade */}
      <div className="relative h-64 w-full bg-zinc-900 overflow-hidden">
        <img 
          src={`https://statsheet-cdn.b-cdn.net/images/${profilePicture}.png`} 
          alt={name}
          className="object-cover w-full h-full grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700"
        />
        {/* The "Cold Dark Glow" Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />

        {/* Hover Scanning Line */}
        <motion.div 
          initial={{ top: "-10%" }}
          whileHover={{ top: "110%" }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 w-full h-[2px] bg-cyan-500/30 blur-sm z-10"
        />
      </div>

      {/* 3. CORE STATS: Tactical Layout */}
      <div className="p-4 space-y-4 relative">
        <div>
          <h3 className="text-xl font-light tracking-tight text-white uppercase italic">{name}</h3>
          <p className="text-[10px] text-cyan-500/70 font-mono uppercase tracking-tighter">
            {race} // {character.class}
          </p>
        </div>

        {/* Tactical Stat Grid */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-white/5 p-2 rounded border border-white/5 flex items-center justify-between">
            <Shield size={14} className="text-white/30" />
            <span className="text-sm font-mono text-white/90">AC {ac}</span>
          </div>
          <div className="bg-white/5 p-2 rounded border border-white/5 flex items-center justify-between">
            <Activity size={14} className="text-white/30" />
            <span className="text-sm font-mono text-white/90">HP {hp.max}</span>
          </div>
        </div>

        {/* Attributes: Minimalist bars */}
        <div className="flex justify-between gap-1 h-8 items-end px-1">
          {Object.entries(attributes).map(([key, val]) => (
            <div key={key} className="flex flex-col items-center gap-1 group/stat">
               <div 
                 className="w-2 bg-cyan-500/20 rounded-t-sm transition-all duration-500 group-hover:bg-cyan-400" 
                 style={{ height: `${(val as number / 20) * 100}%` }}
               />
               <span className="text-[8px] font-mono text-white/20 uppercase">{key}</span>
            </div>
          ))}
        </div>

        {/* STATUS BAR: The Matrix-ish System State */}
        <div className="pt-2 border-t border-white/5">
           <p className="text-[9px] font-mono text-white/40 italic flex items-center gap-2">
             <Zap size={10} className="animate-pulse text-cyan-500" />
             {state || "SYSTEM_STABLE"}
           </p>
        </div>
      </div>
    </motion.div>
  );
}