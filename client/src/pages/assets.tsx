import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Download, ExternalLink, Zap } from 'lucide-react';
import { CharacterCard } from '@/components/CharacterCard';
import bgTexture from '@assets/generated_images/mythos_asset_library_background_texture.png';
import characterData from '@/character.json';
import spellData from '@/spells.json';

const CDN_BASE = "https://b-cdn.net/mythos/";

interface Character {
  guid: string;
  characterName: string;
  characterClass: string;
  race: string;
  level: number;
  stats: {
    STR: number;
    DEX: number;
    CON: number;
    INT: number;
    WIS: number;
    CHA: number;
  };
  profilePicture?: string;
  characterType?: string;
  class?: string;
}

const AssetsPage = () => {
  const [category, setCategory] = useState('HEROES');
  const [search, setSearch] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [filteredData, setFilteredData] = useState<Character[]>([]);

  useEffect(() => {
    setIsScanning(true);
    const timer = setTimeout(() => {
      let data: Character[] = [];
      if (category === 'HEROES') {
        data = (characterData.characters as any[]).filter(c => c.level > 0 && c.characterType === 'HERO');
      } else if (category === 'CREATURES') {
        data = (characterData.characters as any[]).filter(c => c.characterType === 'NPC' || c.characterType === 'Boss');
      } else if (category === 'ARTIFACTS') {
        data = (characterData.artifacts as any[]) || [];
      } else if (category === 'SPELLS') {
        data = spellData.map(s => ({
          guid: s.name,
          characterName: s.name,
          characterClass: s.school,
          race: `Lvl ${s.level}`,
          level: s.level,
          stats: { STR: 0, DEX: 0, CON: 0, INT: 0, WIS: 0, CHA: 0 },
          profilePicture: 'mythos_asset_library_background_texture.png',
          characterType: 'SPELL'
        }));
      }

      if (search) {
        data = data.filter(item => 
          item.characterName.toLowerCase().includes(search.toLowerCase())
        );
      }

      setFilteredData(data);
      setIsScanning(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [category, search]);

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-32 pb-20 px-6 relative overflow-hidden">
      <div 
        className="fixed inset-0 z-0 opacity-10 pointer-events-none bg-cover bg-center grayscale"
        style={{ backgroundImage: `url(${bgTexture})` }}
      />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold font-heading tracking-tighter mb-4">
              The <span className="text-[#00f0ff] drop-shadow-[0_0_15px_rgba(0,240,255,0.3)]">Vault.</span>
            </h1>
            <p className="text-gray-500 text-lg max-w-2xl border-l border-[#00f0ff]/30 pl-6 font-light italic">
              Accessing encrypted asset archives... 
            </p>
          </motion.div>

          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <div className="relative flex-1 sm:w-80 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-[#00f0ff] transition-colors" size={18} />
              <input 
                type="text" 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Scan archive..." 
                className="w-full bg-white/[0.02] border border-white/10 rounded-none py-3 pl-12 pr-4 outline-none focus:border-[#00f0ff]/50 transition-all backdrop-blur-md"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-4 mb-16 overflow-x-auto pb-4 scrollbar-hide border-b border-white/5">
          {['HEROES', 'CREATURES', 'ARTIFACTS', 'SPELLS'].map((cat) => (
            <button
              key={cat}
              onClick={() => {
                if (category !== cat) {
                  setCategory(cat);
                }
              }}
              className={`relative px-8 py-3 text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-300 cursor-pointer
                ${category === cat ? 'text-[#00f0ff]' : 'text-gray-600 hover:text-gray-400'}
              `}
            >
              {cat}
              {category === cat && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#00f0ff] shadow-[0_0_10px_#00f0ff]"
                />
              )}
            </button>
          ))}
        </div>

        <div className="relative min-h-[400px]">
          <AnimatePresence mode="wait">
            {isScanning ? (
              <motion.div 
                key="scanning"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center z-20 bg-[#050505]/80 backdrop-blur-sm"
              >
                <div className="flex flex-col items-center gap-4">
                  <div className="w-48 h-[1px] bg-white/10 relative overflow-hidden">
                    <motion.div 
                      className="absolute inset-0 bg-[#00f0ff]"
                      initial={{ x: '-100%' }}
                      animate={{ x: '100%' }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    />
                  </div>
                  <span className="text-[10px] font-mono text-[#00f0ff] animate-pulse uppercase tracking-[0.5em]">Scanning Data...</span>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={category}
                initial={{ opacity: 0, filter: 'blur(10px) brightness(2)' }}
                animate={{ opacity: 1, filter: 'blur(0px) brightness(1)' }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
              >
                {filteredData.map((item) => (
                  <CharacterCard key={item.guid} character={{
                    ...item,
                    stats: item.stats || { STR: 0, DEX: 0, CON: 0, INT: 0, WIS: 0, CHA: 0 }
                  } as any} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.div 
          className="mt-32 p-16 border border-white/5 bg-white/[0.01] backdrop-blur-3xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#00f0ff]" />
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#00f0ff]" />
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#00f0ff]" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#00f0ff]" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="text-left">
              <h2 className="text-3xl font-bold font-heading mb-4 text-[#00f0ff]">VTT Uplink Active</h2>
              <p className="text-gray-500 max-w-md text-sm leading-relaxed uppercase tracking-wider">
                Direct neural export path established for major virtual table-top architectures.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-12 opacity-30 hover:opacity-100 transition-opacity duration-700">
              <div className="flex items-center gap-2 font-black text-xs tracking-[0.3em]"><Download size={16}/> ROLL20</div>
              <div className="flex items-center gap-2 font-black text-xs tracking-[0.3em]"><ExternalLink size={16}/> FOUNDRY</div>
              <div className="flex items-center gap-2 font-black text-xs tracking-[0.3em]"><Zap size={16}/> D&D BEYOND</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AssetsPage;