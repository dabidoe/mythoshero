import React from 'react';
import { motion } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';

const CDN_URL = "https://cdn.mythos.quest/assets/";

interface CharacterSheetProps {
  data: any;
}

const CharacterSheet: React.FC<CharacterSheetProps> = ({ data }) => {
  const [imageLoaded, setImageLoaded] = React.useState(false);

  if (!data) return null;

  const getImageUrl = (path: string) => {
    if (!path) return null;
    if (path.startsWith('http')) return path;
    return `${CDN_URL}${path}`;
  };

  const parseJsonValue = (val: string) => {
    try {
      // The provided JSON has stringified JS-like objects in the 'value' field
      // e.g. "{key:'Str',value:'20 (+5)',guid:'...'}"
      // This is non-standard JSON, so we might need a custom parser or regex if JSON.parse fails
      const fixedJson = val.replace(/(\w+):/g, '"$1":').replace(/'/g, '"');
      return JSON.parse(fixedJson);
    } catch (e) {
      return { key: '', value: val };
    }
  };

  const stats = data.container.stats.map((s: any) => parseJsonValue(s.value));
  const skills = data.container.skills.map((s: any) => parseJsonValue(s.value));
  const savingThrows = data.container.saving_throws.map((s: any) => parseJsonValue(s.value));
  const abilities = data.container.abilities.map((a: any) => parseJsonValue(a.value));
  const traits = data.container.traits.map((t: any) => parseJsonValue(t.value));

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-4 md:p-8 font-sans selection:bg-cyan-500">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        {/* Top Section */}
        <div className="mb-12 text-center md:text-left">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-5xl md:text-7xl font-extrabold font-heading tracking-tighter mb-2"
          >
            {data.characterName}
          </motion.h1>
          <div className="flex flex-wrap justify-center md:justify-start gap-4 items-center">
            <span className="text-cyan-500 font-mono text-xl uppercase tracking-widest">{data.race}</span>
            <span className="w-2 h-2 rounded-full bg-white/20"></span>
            <span className="text-gray-400 text-xl font-heading">{data.characterClass}</span>
            <span className="w-2 h-2 rounded-full bg-white/20"></span>
            <span className="bg-white/10 px-4 py-1 rounded-full text-sm font-bold border border-white/10">
              LEVEL {data.level}
            </span>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {stats.map((stat: any, i: number) => (
            <motion.div
              key={stat.key}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="relative group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-b from-cyan-500 to-blue-600 rounded-2xl blur opacity-20 group-hover:opacity-50 transition duration-500"></div>
              <div className="relative w-24 h-28 md:w-32 md:h-36 bg-[#121212]/80 backdrop-blur-xl border border-white/10 rounded-2xl flex flex-col items-center justify-center p-4">
                <span className="text-xs font-mono text-cyan-500 uppercase tracking-widest mb-2">{stat.key}</span>
                <span className="text-2xl md:text-3xl font-bold font-heading">{stat.value.split(' ')[0]}</span>
                <span className="text-xs text-gray-500 mt-1">{stat.value.split(' ')[1]}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Body Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Left Column: Skills & Saving Throws */}
          <div className="space-y-8">
            <div className="bg-[#121212]/50 backdrop-blur-md border border-white/5 rounded-2xl p-6">
              <h3 className="text-xs font-mono text-cyan-500 uppercase tracking-widest mb-6">Skills</h3>
              <div className="space-y-3">
                {skills.map((skill: any) => (
                  <div key={skill.key} className="flex justify-between items-center group">
                    <span className="text-gray-400 group-hover:text-white transition-colors">{skill.key}</span>
                    <span className="font-mono text-cyan-400">{skill.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-[#121212]/50 backdrop-blur-md border border-white/5 rounded-2xl p-6">
              <h3 className="text-xs font-mono text-cyan-500 uppercase tracking-widest mb-6">Combat Vitals</h3>
              <div className="space-y-4">
                {savingThrows.map((st: any) => (
                  <div key={st.key} className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/5">
                    <span className="text-gray-400 text-sm">{st.key}</span>
                    <span className="font-bold text-white">{st.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Center Column: Profile Picture */}
          <div className="relative group lg:-mt-12">
            <div className="absolute -inset-4 bg-cyan-500/20 rounded-full blur-[80px] group-hover:bg-cyan-500/30 transition duration-1000"></div>
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              {!imageLoaded && (
                <Skeleton className="absolute inset-0 bg-[#121212] animate-pulse" />
              )}
              <img 
                src={getImageUrl(data.profilePicture) || "https://images.unsplash.com/photo-1599508704512-2f19efd1e35f?q=80&w=1000"} 
                alt={data.characterName}
                className={`w-full h-full object-cover transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => setImageLoaded(true)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"></div>
              <div className="absolute bottom-8 left-0 right-0 text-center">
                <div className="inline-block bg-black/60 backdrop-blur-md border border-white/10 px-6 py-2 rounded-full text-xs font-mono tracking-widest text-cyan-400">
                  GUID: {data.guid.slice(0, 8)}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Abilities & Traits */}
          <div className="space-y-8">
            <div className="bg-[#121212]/50 backdrop-blur-md border border-white/5 rounded-2xl p-6 h-[400px] flex flex-col">
              <h3 className="text-xs font-mono text-cyan-500 uppercase tracking-widest mb-6">Abilities</h3>
              <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar space-y-6">
                {abilities.map((ability: any) => (
                  <div key={ability.key} className="space-y-2">
                    <h4 className="font-bold text-white flex items-center gap-2">
                      <span className="w-1 h-1 bg-cyan-500 rounded-full"></span>
                      {ability.key}
                    </h4>
                    <p className="text-sm text-gray-400 leading-relaxed">{ability.value}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-[#121212]/50 backdrop-blur-md border border-white/5 rounded-2xl p-6 h-[300px] flex flex-col">
              <h3 className="text-xs font-mono text-cyan-500 uppercase tracking-widest mb-6">Traits</h3>
              <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar space-y-6">
                {traits.map((trait: any) => (
                  <div key={trait.key} className="space-y-2">
                    <h4 className="font-bold text-white flex items-center gap-2">
                      <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                      {trait.key}
                    </h4>
                    <p className="text-sm text-gray-400 leading-relaxed">{trait.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </motion.div>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(34, 211, 238, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(34, 211, 238, 0.4);
        }
      `}} />
    </div>
  );
};

export default CharacterSheet;