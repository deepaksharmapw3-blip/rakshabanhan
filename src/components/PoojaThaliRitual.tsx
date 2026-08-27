import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flame, Sparkles, Heart, Sun, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { playGiftChime, playSoftBell } from '../utils/audio';

interface PoojaThaliRitualProps {
  sisterName: string;
  brotherName: string;
}

export const PoojaThaliRitual: React.FC<PoojaThaliRitualProps> = ({
  sisterName,
  brotherName,
}) => {
  const [diyaLit, setDiyaLit] = useState(true);
  const [tilakApplied, setTilakApplied] = useState(false);
  const [sweetOffered, setSweetOffered] = useState(false);
  const [activePromiseIndex, setActivePromiseIndex] = useState<number | null>(null);

  const handleToggleDiya = () => {
    playSoftBell(784);
    setDiyaLit(!diyaLit);
  };

  const handleApplyTilak = () => {
    playGiftChime();
    setTilakApplied(true);
  };

  const handleOfferSweet = () => {
    playSoftBell(880);
    setSweetOffered(true);
  };

  const sacredPromises = [
    {
      title: 'Sada Saath (Unconditional Support)',
      desc: 'To always be a steadfast pillar of comfort and strength, ready to listen through silence and celebrate every milestone.',
      sanskrit: 'सदा सहाय्यम्',
      color: 'from-orange-500/20 to-amber-500/10',
      border: 'border-orange-500/40',
      glow: 'shadow-orange-500/20',
    },
    {
      title: 'Samman (Dignity & Respect)',
      desc: 'To honor your dreams, choices, and individuality, standing by your ambitions with genuine pride.',
      sanskrit: 'परम सम्मानम्',
      color: 'from-amber-500/20 to-yellow-500/10',
      border: 'border-yellow-500/40',
      glow: 'shadow-yellow-500/20',
    },
    {
      title: 'Suraksha (Protection & Shield)',
      desc: 'To protect your happiness and peace of mind like an unyielding shield through any storm life may bring.',
      sanskrit: 'रक्षण संकल्पः',
      color: 'from-rose-500/20 to-red-500/10',
      border: 'border-rose-500/40',
      glow: 'shadow-rose-500/20',
    },
    {
      title: 'Anant Sneha (Eternal Love & Gratitude)',
      desc: 'To never forget the warmth, care, and sisterly love that turned college into a safe home and a stranger into family.',
      sanskrit: 'अनन्त स्नेहः',
      color: 'from-teal-500/20 to-emerald-500/10',
      border: 'border-teal-500/40',
      glow: 'shadow-teal-500/20',
    },
  ];

  return (
    <section className="min-h-screen relative flex items-center justify-center px-4 py-20 z-10">
      <div className="max-w-4xl w-full mx-auto space-y-16">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-[#ffb366] text-xs font-semibold uppercase tracking-widest mb-4 shadow-[0_0_15px_rgba(255,107,53,0.2)]">
            <Sun className="w-3.5 h-3.5 text-[#ffd700] animate-spin" style={{ animationDuration: '10s' }} />
            <span>Sacred Vedic Ritual & Shloka</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#ff6b35] via-[#ffd700] to-[#ff9e7d] bg-clip-text text-transparent font-display">
            The Pooja Thali & Aarti
          </h2>
          <p className="text-gray-300 text-sm sm:text-base mt-2 max-w-xl mx-auto font-light">
            An auspicious traditional ceremony with Kumkum, Akshata, the sacred Diya flame, and the ancient Raksha Shloka.
          </p>
        </motion.div>

        {/* Sacred Vedic Shloka Glassmorphic Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative glass-card-gold rounded-3xl p-6 sm:p-10 text-center overflow-hidden"
        >
          {/* Neon background aura */}
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-orange-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#ffd700] font-semibold flex items-center justify-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ancient Sanskrit Raksha Mantra</span>
            </span>

            {/* Sacred Sanskrit Shloka */}
            <div className="py-2">
              <p className="text-xl sm:text-2xl md:text-3xl font-display font-medium text-[#ffd700] neon-text-gold tracking-wide leading-relaxed">
                "येन बद्धो बली राजा दानवेन्द्रो महाबलः।<br />
                तेन त्वां प्रतिबद्धनामि रक्षे मा चल मा चल॥"
              </p>
            </div>

            {/* English Meaning */}
            <div className="max-w-2xl mx-auto pt-4 border-t border-amber-500/20 text-sm sm:text-base text-gray-200 font-light leading-relaxed">
              <p className="italic text-[#ffb366]">
                "The sacred protective thread that bound the mighty and righteous King Bali, with that very same auspicious bond of love, respect, and protection, I bind thee. O Sacred Rakhi, remain steadfast, eternal, and unbroken forever."
              </p>
            </div>
          </div>
        </motion.div>

        {/* Interactive Sacred Pooja Thali Glass Platter */}
        <div className="relative flex flex-col items-center">
          <div className="text-center mb-6">
            <span className="text-xs text-[#ffb366] font-medium uppercase tracking-wider">
              Interactive Auspicious Ceremony
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white font-display mt-1">
              Bless the Sacred Bond
            </h3>
          </div>

          {/* Glowing Circular Glass Thali */}
          <div className="relative w-72 h-72 sm:w-96 sm:h-96 rounded-full glass-card-neon p-4 sm:p-6 flex items-center justify-center shadow-[0_0_50px_rgba(255,107,53,0.3)] border-2 border-orange-500/50">
            {/* Outer Decorative Auspicious Rim */}
            <div className="absolute inset-2 sm:inset-3 rounded-full border border-dashed border-[#ffd700]/50 animate-[spin_30s_linear_infinite]" />
            <div className="absolute inset-6 sm:inset-8 rounded-full border border-[#ff6b35]/30" />

            {/* Center Sacred Diya Flame */}
            <div
              onClick={handleToggleDiya}
              className="relative cursor-pointer flex flex-col items-center group z-20"
              title="Click to light / kindle Diya flame"
            >
              {/* Flame Aura */}
              {diyaLit && (
                <div className="absolute -top-8 w-16 h-16 rounded-full bg-gradient-to-t from-orange-500/40 via-yellow-400/40 to-transparent blur-md animate-diya-flame" />
              )}
              {/* Flame Icon */}
              <div className={`relative transition-all duration-300 ${diyaLit ? 'animate-diya-flame' : 'opacity-40'}`}>
                <Flame
                  className={`w-10 h-10 sm:w-14 sm:h-14 ${
                    diyaLit
                      ? 'text-[#ffd700] fill-[#ff6b35] drop-shadow-[0_0_20px_rgba(255,107,53,1)]'
                      : 'text-gray-500'
                  }`}
                />
              </div>

              {/* Clay / Brass Diya Base */}
              <div className="w-14 sm:w-16 h-6 sm:h-7 rounded-b-full bg-gradient-to-r from-[#d97757] via-[#ffd700] to-[#b35422] border border-amber-300/60 shadow-lg flex items-center justify-center -mt-2">
                <span className="text-[9px] font-bold text-amber-950 uppercase tracking-tighter">Aarti</span>
              </div>
            </div>

            {/* Kumkum & Chandan Bowl (Top Left) */}
            <button
              onClick={handleApplyTilak}
              className="absolute top-8 left-8 sm:top-12 sm:left-12 p-3 sm:p-4 rounded-full bg-gradient-to-br from-red-600/30 via-rose-500/20 to-black/60 border border-rose-500/50 backdrop-blur-xl shadow-lg hover:scale-110 active:scale-95 transition-all text-center group z-10"
              title="Click to apply Kumkum Tilak & Akshata"
            >
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-red-600 border border-rose-300 flex items-center justify-center shadow-[0_0_15px_rgba(255,42,95,0.8)]">
                <span className="text-white text-xs font-bold">🔴</span>
              </div>
              <span className="text-[10px] sm:text-xs font-semibold text-rose-300 block mt-1">
                {tilakApplied ? 'Tilak Applied ✓' : 'Kumkum & Rice'}
              </span>
            </button>

            {/* Mithai Sweets Bowl (Top Right) */}
            <button
              onClick={handleOfferSweet}
              className="absolute top-8 right-8 sm:top-12 sm:right-12 p-3 sm:p-4 rounded-full bg-gradient-to-br from-amber-500/30 via-yellow-400/20 to-black/60 border border-amber-400/50 backdrop-blur-xl shadow-lg hover:scale-110 active:scale-95 transition-all text-center group z-10"
              title="Click to offer sweet (Kaju Katli)"
            >
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-xl rotate-45 bg-gradient-to-tr from-amber-200 to-amber-100 border border-yellow-200 flex items-center justify-center shadow-[0_0_15px_rgba(255,215,0,0.8)] mx-auto">
                <span className="-rotate-45 text-amber-900 text-[10px] font-bold">✨</span>
              </div>
              <span className="text-[10px] sm:text-xs font-semibold text-amber-300 block mt-1">
                {sweetOffered ? 'Sweet Shared ✓' : 'Mithai (Sweets)'}
              </span>
            </button>

            {/* Sacred Kalawa / Mauli Silk Threads (Bottom) */}
            <div className="absolute bottom-6 sm:bottom-8 inset-x-0 flex flex-col items-center z-10 pointer-events-none">
              <div className="px-3 py-1 rounded-full bg-black/60 border border-orange-500/40 backdrop-blur-md">
                <span className="text-[10px] sm:text-xs font-mono text-[#ffd700]">
                  🪢 Sacred Kalawa Mauli Thread
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Status Indicator */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs">
            <span className={`px-3 py-1.5 rounded-full border transition-all ${
              diyaLit ? 'bg-orange-500/20 border-orange-500 text-orange-300 shadow-[0_0_12px_rgba(255,107,53,0.4)]' : 'bg-white/5 border-white/10 text-gray-400'
            }`}>
              🪔 Diya: {diyaLit ? 'Kindled Flame' : 'Kindle Diya'}
            </span>

            <span className={`px-3 py-1.5 rounded-full border transition-all ${
              tilakApplied ? 'bg-rose-500/20 border-rose-500 text-rose-300 shadow-[0_0_12px_rgba(255,42,95,0.4)]' : 'bg-white/5 border-white/10 text-gray-400'
            }`}>
              🔴 Tilak: {tilakApplied ? `Applied for ${sisterName}` : `Apply Tilak`}
            </span>

            <span className={`px-3 py-1.5 rounded-full border transition-all ${
              sweetOffered ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-[0_0_12px_rgba(255,215,0,0.4)]' : 'bg-white/5 border-white/10 text-gray-400'
            }`}>
              🍬 Sweetness: {sweetOffered ? 'Shared with Love' : 'Offer Mithai'}
            </span>
          </div>
        </div>

        {/* 4 Sacred Brother-Sister Vows (Raksha Sankalp) */}
        <div>
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-[#ffd700] text-xs font-semibold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Raksha Sankalp</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">
              Four Eternal Promises
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm mt-1">
              Click any promise to deepen its sacred vow.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {sacredPromises.map((promise, pIdx) => {
              const isSelected = activePromiseIndex === pIdx;
              return (
                <motion.div
                  key={pIdx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: pIdx * 0.15 }}
                  onClick={() => {
                    playSoftBell(600 + pIdx * 70);
                    setActivePromiseIndex(isSelected ? null : pIdx);
                  }}
                  className={`relative p-6 rounded-3xl backdrop-blur-2xl border transition-all duration-300 cursor-pointer ${
                    promise.border
                  } ${
                    isSelected
                      ? `bg-gradient-to-br ${promise.color} ${promise.glow} shadow-xl scale-[1.02]`
                      : 'bg-white/[0.03] hover:bg-white/[0.07] hover:border-orange-500/40'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-[11px] font-mono text-[#ffd700] tracking-wider uppercase font-semibold">
                      {promise.sanskrit}
                    </span>
                    <Heart className={`w-4 h-4 transition-colors ${
                      isSelected ? 'text-[#ff6b35] fill-[#ff6b35]' : 'text-gray-500'
                    }`} />
                  </div>

                  <h4 className="text-lg font-bold text-white mb-2 font-display">
                    {promise.title}
                  </h4>

                  <p className="text-sm text-gray-300 font-light leading-relaxed">
                    {promise.desc}
                  </p>

                  {isSelected && (
                    <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-1.5 text-xs text-[#ffd700]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Vow Sealed with Devotion & Respect</span>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
