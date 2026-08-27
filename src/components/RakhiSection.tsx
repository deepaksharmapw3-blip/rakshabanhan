import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart, Sun } from 'lucide-react';
import { playGiftChime } from '../utils/audio';

export const RakhiSection: React.FC = () => {
  const [blessed, setBlessed] = useState(false);

  const handleRakhiClick = () => {
    playGiftChime();
    setBlessed(true);
    setTimeout(() => setBlessed(false), 3500);
  };

  return (
    <section className="min-h-screen relative flex items-center justify-center px-4 py-20 z-10 text-center">
      <div className="max-w-2xl w-full mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-[#ffb366] text-xs font-semibold uppercase tracking-widest mb-4 shadow-[0_0_15px_rgba(255,107,53,0.25)]">
            <Sparkles className="w-3.5 h-3.5 text-[#ffd700]" />
            <span>The Sacred Thread of Protection • रक्षासूत्रम्</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#ff6b35] via-[#ffd700] to-[#ff9e7d] bg-clip-text text-transparent font-display">
            The Rakhi Moment
          </h2>
        </motion.div>

        {/* Animated Sacred Glassmorphic Rakhi Element */}
        <div className="relative py-12 flex flex-col items-center justify-center">
          <div
            onClick={handleRakhiClick}
            title="Click to receive festive blessing & chime"
            className="relative w-48 h-48 sm:w-56 sm:h-56 cursor-pointer group flex items-center justify-center"
          >
            {/* Swaying Golden Sacred Silk Thread (Kalawa / Mauli) */}
            <div className="absolute inset-y-0 left-1/2 w-2 -translate-x-1/2 bg-gradient-to-b from-[#ff2a5f] via-[#ffd700] to-[#ff6b35] rounded-full animate-thread-sway shadow-[0_0_15px_rgba(255,107,53,0.8)]" />

            {/* Glowing Neon Pulsing Aura Rings */}
            <div className="absolute w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-gradient-to-tr from-[#ff6b35]/25 via-[#ffd700]/20 to-[#ff2a5f]/25 blur-2xl group-hover:scale-125 transition-transform" />
            <div className="absolute w-32 h-32 sm:w-36 sm:h-36 rounded-full border-2 border-dashed border-[#ffd700]/60 animate-[spin_16s_linear_infinite]" />

            {/* Main Sacred Center Floral Emblem & Jewel */}
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-[#ffd700] via-[#ff6b35] to-[#b31412] p-2 shadow-2xl animate-rakhi-glow group-hover:scale-110 transition-transform">
              <div className="w-full h-full rounded-full bg-[#1c0f0a]/90 backdrop-blur-md border-2 border-[#ffd700] flex items-center justify-center shadow-inner relative overflow-hidden">
                {/* Traditional Om / Sun Radial Pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.4)_0,transparent_70%)]" />
                <div className="relative w-12 h-12 rounded-full bg-gradient-to-tr from-[#ff6b35] to-[#ffd700] flex items-center justify-center shadow-lg border border-white/40">
                  <Sun className="w-6 h-6 text-white fill-white animate-spin" style={{ animationDuration: '20s' }} />
                </div>
              </div>
            </div>

            {/* Traditional Rudraksha & Gold Beads */}
            <span className="absolute top-2 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-[#ffd700] border border-amber-200 shadow-[0_0_10px_rgba(255,215,0,0.9)]" />
            <span className="absolute top-8 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#ff2a5f] shadow-[0_0_8px_rgba(255,42,95,0.9)]" />
            <span className="absolute bottom-8 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#ff2a5f] shadow-[0_0_8px_rgba(255,42,95,0.9)]" />
            <span className="absolute bottom-2 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-[#ffd700] border border-amber-200 shadow-[0_0_10px_rgba(255,215,0,0.9)]" />
          </div>

          <p className="text-xs text-[#ffb366] font-medium mt-3">
            {blessed ? '✨ Sacred Chimes & Blessings Bestowed! ✨' : 'Tap the sacred Rakhi for an auspicious blessing'}
          </p>
        </div>

        {/* Story Text with Glassmorphism */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="space-y-6 text-base sm:text-lg text-[#e0e0f0] font-light leading-relaxed max-w-xl mx-auto"
        >
          <p className="text-xl sm:text-2xl font-normal text-[#ffd700] italic font-display neon-text-gold">
            Do you know what this Rakhi truly represents?
          </p>

          <p>
            It's not merely a silk thread.
          </p>

          <div className="p-7 rounded-3xl glass-card-neon text-center">
            <h3 className="text-xl sm:text-2xl font-bold text-[#ff6b35] mb-2 font-display neon-text-orange">
              It is an eternal promise.
            </h3>
            <p className="text-gray-200 text-sm sm:text-base font-light">
              A reminder that in this vast world, you will never walk alone. You have someone who will always protect, respect, and pray for your happiness.
            </p>
          </div>

          <p className="text-lg sm:text-xl font-medium text-[#ffd700] leading-snug">
            And whenever you need a brother's support, know that I am always right here.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
