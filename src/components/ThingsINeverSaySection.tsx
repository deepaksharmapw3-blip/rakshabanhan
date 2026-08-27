import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart } from 'lucide-react';
import { playSoftBell } from '../utils/audio';

export const ThingsINeverSaySection: React.FC = () => {
  const cards = [
    {
      num: '01',
      title: 'Thank you for caring.',
      detail: 'In moments when I stayed quiet and kept things inside, you saw through the silence and offered comforting warmth.',
      sanskrit: 'हार्दिक कृतज्ञता',
    },
    {
      num: '02',
      title: 'Thank you for always being there.',
      detail: 'Through deadlines, chaos, college milestones, and random days, your reassuring presence remained constant.',
      sanskrit: 'सतत सान्निध्यम्',
    },
    {
      num: '03',
      title: 'Thank you for treating me like your brother.',
      detail: 'You gave this bond genuine respect, protection, unreserved kindness, and pure unconditional love from your heart.',
      sanskrit: 'भ्रातृभावः',
    },
    {
      num: '04',
      title: 'Thank you for making college feel like home.',
      detail: 'Having a sister around transformed unfamiliar classrooms into a place of belonging, safety, and joy.',
      sanskrit: 'गृहवत् सुखम्',
    },
  ];

  return (
    <section className="min-h-screen relative flex items-center justify-center px-4 py-20 z-10">
      <div className="max-w-4xl w-full mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-[#ffb366] text-xs font-semibold uppercase tracking-widest mb-4 shadow-[0_0_15px_rgba(255,107,53,0.2)]">
            <Sparkles className="w-3.5 h-3.5 text-[#ffd700]" />
            <span>Heartfelt Reflections • अन्तर्मनस्य भावाः</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#ff6b35] via-[#ffb366] to-[#ffd700] bg-clip-text text-transparent font-display">
            Things I Never Say
          </h2>
          <p className="text-gray-300 text-sm sm:text-base mt-2 font-light">
            The deepest feelings that usually stay unspoken in the hustle of everyday life.
          </p>
        </motion.div>

        {/* 4 Glassmorphic Neon Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              onMouseEnter={() => playSoftBell(523 + idx * 65)}
              className="group relative glass-card-neon rounded-2xl p-7 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] cursor-default overflow-hidden"
            >
              {/* Inner ambient specular sheen */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff6b35]/10 rounded-full blur-2xl group-hover:bg-[#ff6b35]/25 transition-all" />

              <div className="flex items-center justify-between mb-3">
                <div className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-[#ff6b35] to-[#ffd700] bg-clip-text text-transparent font-display neon-text-orange">
                  {card.num}
                </div>
                <span className="text-[10px] font-mono text-[#ffd700] px-2 py-0.5 rounded-full border border-[#ffd700]/30 bg-black/40">
                  {card.sanskrit}
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-white mb-2 leading-snug font-display">
                {card.title}
              </h3>
              <p className="text-sm text-[#d0d0e0] font-light leading-relaxed">
                {card.detail}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Closing Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-center mt-12"
        >
          <p className="text-xl sm:text-2xl font-semibold text-[#ff6b35] inline-flex items-center gap-2.5 font-display neon-text-orange">
            <span>And thank you… from the bottom of my heart.</span>
            <Heart className="w-6 h-6 fill-[#ff6b35] text-[#ff6b35] drop-shadow-[0_0_10px_rgba(255,107,53,0.8)]" />
          </p>
        </motion.div>
      </div>
    </section>
  );
};
