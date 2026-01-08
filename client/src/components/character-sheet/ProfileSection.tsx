import React from 'react';
import { motion } from 'framer-motion';
import { User, BookOpen, Heart as HeartIcon } from 'lucide-react';

interface ProfileSectionProps {
  name: string;
  race: string;
  characterClass: string;
  level: number;
  alignment?: string;
  icon?: string;
  profile?: {
    backstory?: string;
    behavior?: string;
    personality?: string;
  };
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({
  name,
  race,
  characterClass,
  level,
  alignment,
  icon,
  profile
}) => {
  return (
    <div className="bg-[#121212]/50 backdrop-blur-md border border-white/5 rounded-2xl p-6">
      <h3 className="text-xs font-mono text-cyan-500 uppercase tracking-widest mb-6">
        Character Profile
      </h3>

      {/* Character portrait */}
      {icon && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative mb-6 group"
        >
          <div className="absolute -inset-4 bg-cyan-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition duration-500" />
          <img
            src={icon}
            alt={name}
            className="relative w-full aspect-square rounded-xl object-cover border border-white/10"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400?text=Character';
            }}
          />
        </motion.div>
      )}

      {/* Basic info */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center gap-2">
          <User size={14} className="text-gray-500" />
          <span className="text-sm font-mono text-gray-400">Race:</span>
          <span className="text-sm text-white">{race}</span>
        </div>

        <div className="flex items-center gap-2">
          <BookOpen size={14} className="text-gray-500" />
          <span className="text-sm font-mono text-gray-400">Class:</span>
          <span className="text-sm text-white">{characterClass}</span>
        </div>

        {alignment && (
          <div className="flex items-center gap-2">
            <HeartIcon size={14} className="text-gray-500" />
            <span className="text-sm font-mono text-gray-400">Alignment:</span>
            <span className="text-sm text-white">{alignment}</span>
          </div>
        )}
      </div>

      {/* Profile sections */}
      {profile && (
        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
          {profile.personality && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-2"
            >
              <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                Personality
              </h4>
              <p className="text-sm text-gray-400 leading-relaxed">
                {profile.personality}
              </p>
            </motion.div>
          )}

          {profile.behavior && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-2"
            >
              <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                Behavior
              </h4>
              <p className="text-sm text-gray-400 leading-relaxed">
                {profile.behavior}
              </p>
            </motion.div>
          )}

          {profile.backstory && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-2"
            >
              <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                Backstory
              </h4>
              <p className="text-sm text-gray-400 leading-relaxed">
                {profile.backstory}
              </p>
            </motion.div>
          )}
        </div>
      )}

      {/* Empty state */}
      {!profile && !icon && (
        <div className="text-center py-8">
          <User size={48} className="mx-auto text-gray-600 mb-4" />
          <p className="text-gray-500 font-mono text-sm">
            No profile information
          </p>
        </div>
      )}

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
