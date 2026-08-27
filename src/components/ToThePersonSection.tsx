import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart } from 'lucide-react';

export const ToThePersonSection: React.FC = () => {
  const lines = [
    { text: 'You never had to take care of me.', delay: 0.1 },
    { text: 'You never had to check whether I was okay.', delay: 0.25 },
    { text: 'You never had to worry about me when days got tough.', delay: 0.4 },
    { text: 'You never had to treat me like your own brother.', delay: 0.55 },
  ];

  return (
    <section className="min-h-screen relative flex items-center justify-center px-4 py-20 z-10">
      <div className="max-w-3xl w-full mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-[#ffb366] text-xs font-semibold uppercase tracking-widest mb-4 shadow-[0_0_15px_rgba(255,107,53,0.25)]">
            <Sparkles className="w-3.5 h-3.5 text-[#ffd700]" />
            <span>Unspoken Gratitude • निस्वार्थ स्नेह</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#ff6b35] via-[#ffb366] to-[#ffd700] bg-clip-text text-transparent font-display">
            To the Person Who Never Had to...
          </h2>
        </motion.div>

        {/* Letter Glassmorphic Card Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8 }}
          className="relative glass-card-neon rounded-3xl p-7 sm:p-11 md:p-14 shadow-2xl overflow-hidden"
        >
          {/* Subtle warm corner neon ambient glow */}
          <div className="absolute top-0 right-0 w-56 h-56 bg-[#ff6b35]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-56 h-56 bg-[#ffd700]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative space-y-4 md:space-y-6 text-base sm:text-lg md:text-xl font-light text-[#e0e0f0] leading-relaxed">
            {lines.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: item.delay }}
                className="flex items-start gap-3.5"
              >
                <span className="w-2 h-2 rounded-full bg-[#ff6b35] shadow-[0_0_8px_rgba(255,107,53,0.8)] mt-2.5 shrink-0" />
                <p>{item.text}</p>
              </motion.div>
            ))}

            <div className="pt-8 border-t border-white/15 space-y-3.5">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.75 }}
                className="text-2xl sm:text-3xl font-bold text-[#ff6b35] flex items-center gap-2.5 font-display neon-text-orange"
              >
                <span>But you did.</span>
                <Heart className="w-7 h-7 fill-[#ff6b35] text-[#ff6b35] drop-shadow-[0_0_12px_rgba(255,107,53,0.8)]" />
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.95 }}
                className="text-xl sm:text-2xl font-medium text-[#ffd700] neon-text-gold"
              >
                And that's something I will cherish for the rest of my life.
              </motion.p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
