import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, User, Heart, RotateCcw, Check, Sparkles } from 'lucide-react';
import { TributeConfig } from '../types';
import { playSoftBell } from '../utils/audio';

interface PersonalizeModalProps {
  config: TributeConfig;
  onSave: (newConfig: TributeConfig) => void;
  onClose: () => void;
}

export const PersonalizeModal: React.FC<PersonalizeModalProps> = ({
  config,
  onSave,
  onClose,
}) => {
  const [sisterName, setSisterName] = useState(config.sisterName);
  const [brotherName, setBrotherName] = useState(config.brotherName);
  const [customEmergencyNote, setCustomEmergencyNote] = useState(config.customEmergencyNote || '');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    playSoftBell(783.99);
    onSave({
      ...config,
      sisterName: sisterName.trim() || 'Arunima',
      brotherName: brotherName.trim() || 'Deepak',
      customEmergencyNote: customEmergencyNote.trim() || undefined,
    });
    onClose();
  };

  const handleReset = () => {
    setSisterName('Arunima');
    setBrotherName('Deepak');
    setCustomEmergencyNote('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-2xl flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative max-w-md w-full glass-card-gold rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-[#ffd700]/50 text-left"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white rounded-full bg-white/10"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 text-[#ffd700] text-xs font-semibold uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Personalize Tribute • नाम संस्कार</span>
        </div>

        <h3 className="text-2xl font-bold text-white mb-4 font-display">
          Customize Names
        </h3>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-200 mb-1.5 flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
              Sister's Name
            </label>
            <input
              type="text"
              value={sisterName}
              onChange={(e) => setSisterName(e.target.value)}
              placeholder="e.g. Arunima"
              className="w-full px-4 py-3 rounded-xl bg-black/50 border border-amber-500/40 focus:border-[#ffd700] focus:outline-none text-white text-sm placeholder-gray-500 transition shadow-inner"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-200 mb-1.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-amber-400" />
              Brother's Name
            </label>
            <input
              type="text"
              value={brotherName}
              onChange={(e) => setBrotherName(e.target.value)}
              placeholder="e.g. Deepak"
              className="w-full px-4 py-3 rounded-xl bg-black/50 border border-amber-500/40 focus:border-[#ffd700] focus:outline-none text-white text-sm placeholder-gray-500 transition shadow-inner"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-200 mb-1.5 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-rose-400" />
              Custom Emergency Pep-Talk (Optional)
            </label>
            <textarea
              value={customEmergencyNote}
              onChange={(e) => setCustomEmergencyNote(e.target.value)}
              rows={3}
              placeholder="Write a custom emergency note for when she is having a bad day..."
              className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-amber-500/40 focus:border-[#ffd700] focus:outline-none text-white text-xs placeholder-gray-500 transition shadow-inner"
            />
          </div>

          <div className="pt-4 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white text-xs font-medium transition flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Default</span>
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#ff6b35] via-[#ffd700] to-[#ff6b35] text-black font-bold text-xs shadow-lg shadow-yellow-500/30 hover:scale-105 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Check className="w-3.5 h-3.5 text-black stroke-[3]" />
              <span>Save & Update</span>
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
