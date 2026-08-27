import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Gift, Heart, RotateCcw, Share2, Award, Sparkles } from 'lucide-react';
import { playGiftChime } from '../utils/audio';

interface GiftBoxSectionProps {
  sisterName: string;
  brotherName: string;
}

export const GiftBoxSection: React.FC<GiftBoxSectionProps> = ({
  sisterName,
  brotherName,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenGift = () => {
    if (!isOpen) {
      setIsOpen(true);
      playGiftChime();

      // Launch vibrant festive confetti
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#ff6b35', '#ffd700', '#ffb366', '#ff2a5f', '#ffffff'],
      });

      setTimeout(() => {
        confetti({
          particleCount: 60,
          angle: 60,
          spread: 60,
          origin: { x: 0 },
          colors: ['#ff6b35', '#ffd700', '#ff2a5f'],
        });
        confetti({
          particleCount: 60,
          angle: 120,
          spread: 60,
          origin: { x: 1 },
          colors: ['#ff6b35', '#ffd700', '#ff2a5f'],
        });
      }, 350);
    }
  };

  const handleReplay = () => {
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-[#ffd700] text-xs font-semibold uppercase tracking-widest mb-4 shadow-[0_0_15px_rgba(255,215,0,0.25)]">
            <Gift className="w-3.5 h-3.5" />
            <span>A Special Blessing • उपहारम्</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#ff6b35] via-[#ffd700] to-[#ffb366] bg-clip-text text-transparent font-display">
            One Last Thing
          </h2>
          <p className="text-gray-200 text-base sm:text-lg mt-3 font-light">
            {sisterName}… there's an auspicious token of gratitude waiting just for you.
          </p>
        </motion.div>

        {/* 3D Glassmorphic Interactive Gift Box */}
        <div className="py-10 flex flex-col items-center">
          <div
            onClick={handleOpenGift}
            className="perspective-1000 w-40 h-40 sm:w-48 sm:h-48 cursor-pointer group"
          >
            <div
              className={`transform-style-3d relative w-full h-full duration-700 transition-transform ${
                isOpen ? 'rotate-x-180' : 'group-hover:scale-105'
              }`}
            >
              {/* Box Front (Unopened) - Glassmorphic with Neon Saffron/Gold Foil */}
              <div className="backface-hidden absolute inset-0 rounded-3xl bg-gradient-to-tr from-[#ff6b35]/80 via-[#1e152d]/90 to-[#ffd700]/70 border-2 border-[#ffd700] shadow-[0_0_40px_rgba(255,107,53,0.5)] flex flex-col items-center justify-center p-4 backdrop-blur-2xl">
                <span className="text-5xl sm:text-6xl animate-bounce">🎁</span>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-200 mt-2 font-mono">
                  Tap to Unveil
                </span>
              </div>

              {/* Box Back (Opened) - Radiant Swarna Glass */}
              <div className="backface-hidden rotate-x-180 absolute inset-0 rounded-3xl bg-gradient-to-tr from-[#ffd700] via-[#ffb366] to-[#ff2a5f] border-2 border-yellow-200 shadow-[0_0_50px_rgba(255,215,0,0.8)] flex flex-col items-center justify-center text-white backdrop-blur-2xl">
                <span className="text-5xl sm:text-6xl animate-pulse">✨</span>
                <span className="text-xs font-bold uppercase tracking-wider text-black/90 mt-2 font-mono">
                  Blessed!
                </span>
              </div>
            </div>
          </div>

          <p className="text-xs text-[#ffb366] font-medium mt-3">
            {isOpen ? '✨ Gift Unwrapped & Shlokas Chanted! ✨' : 'Click the sacred gift chest to open'}
          </p>
        </div>

        {/* Revealed Final Message Glassmorphic Card */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, type: 'spring' }}
              className="mt-6 p-8 sm:p-12 rounded-3xl glass-card-gold border-2 border-[#ffd700]/70 shadow-[0_0_50px_rgba(255,215,0,0.35)] text-center relative overflow-hidden"
            >
              {/* Festive glowing background flare */}
              <div className="absolute inset-0 bg-gradient-to-t from-orange-500/15 via-transparent to-yellow-500/15 pointer-events-none" />

              <div className="w-16 h-16 mx-auto rounded-3xl bg-gradient-to-tr from-[#ff6b35] to-[#ffd700] flex items-center justify-center shadow-xl shadow-orange-500/40 mb-6">
                <Award className="w-8 h-8 text-white fill-white" />
              </div>

              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#ff6b35] via-[#ffd700] to-[#ffb366] bg-clip-text text-transparent font-display leading-tight neon-text-gold">
                Happy Raksha Bandhan, {sisterName}! ❤️
              </h3>

              <div className="my-6 space-y-4 text-base sm:text-lg text-gray-100 font-light leading-relaxed">
                <p>You didn't become my sister because of a Rakhi thread.</p>
                <p className="text-xl sm:text-2xl font-semibold text-[#ffd700] font-display">
                  The Rakhi simply celebrated what your kindness already built.
                </p>
              </div>

              <div className="pt-6 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-[#ffd700] font-medium text-base font-display">
                  — Tera Bhai, {brotherName || '[Your Name]'}
                </span>

                <button
                  onClick={handleReplay}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs text-white transition cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Relive the Journey</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
