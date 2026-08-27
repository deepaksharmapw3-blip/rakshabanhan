import React from 'react';
import { Heart, ChevronDown, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { playSoftBell } from '../utils/audio';

interface HeroSectionProps {
  sisterName: string;
  onBegin: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ sisterName, onBegin }) => {
  const handleBeginClick = () => {
    playSoftBell(659.25);
    onBegin();
  };

  return (
    <section className="min-h-screen relative flex items-center justify-center px-4 py-20 z-10 text-center">
      <div className="max-w-3xl mx-auto flex flex-col items-center">
        {/* Subtle decorative glassmorphic badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-card-neon text-[#ffb366] text-xs font-medium tracking-wider uppercase mb-8 shadow-[0_0_20px_rgba(255,107,53,0.3)]"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#ffd700] animate-pulse" />
          <span>शुभ रक्षा बन्धनम् • Sacred Tribute</span>
        </motion.div>

        {/* Sequential Opening Texts with Neon Aesthetics */}
        <div className="space-y-4 md:space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-wide bg-gradient-to-r from-[#ff6b35] via-[#ffb366] to-[#ffd700] bg-clip-text text-transparent leading-tight font-display"
          >
            This isn't just a website.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-wide bg-gradient-to-r from-[#ff8555] to-[#ffc288] bg-clip-text text-transparent leading-relaxed"
          >
            It's a little piece of my heart…
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.9 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-wide bg-gradient-to-r from-[#ff9e7d] via-[#ffd6a5] to-[#ffd700] bg-clip-text text-transparent leading-relaxed"
          >
            …that I wanted you to keep forever.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 2.7 }}
            className="pt-6 flex items-center justify-center gap-3 text-2xl sm:text-3xl md:text-4xl font-normal text-[#ff6b35]"
          >
            <span className="font-display font-semibold neon-text-orange">For {sisterName}</span>
            <Heart className="w-8 h-8 inline-block fill-[#ff6b35] text-[#ff6b35] drop-shadow-[0_0_16px_rgba(255,107,53,0.9)] animate-bounce" />
          </motion.div>
        </div>

        {/* CTA Button with Neon Glow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 3.4 }}
          className="mt-12"
        >
          <button
            onClick={handleBeginClick}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#ff6b35] via-[#e85d26] to-[#ffd700] text-white font-medium text-base tracking-wide shadow-xl shadow-[#ff6b35]/35 hover:shadow-2xl hover:shadow-[#ff6b35]/55 hover:scale-105 active:scale-95 transition-all duration-300 border border-amber-300/40 cursor-pointer"
          >
            <span className="font-semibold drop-shadow">Enter the Sacred Journey</span>
            <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform text-white" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};
