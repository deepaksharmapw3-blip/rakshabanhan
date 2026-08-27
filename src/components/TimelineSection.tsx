import React from 'react';
import { motion } from 'motion/react';
import { Users, HeartHandshake, MessageCircleHeart, Heart, Sparkles } from 'lucide-react';

export const TimelineSection: React.FC = () => {
  const steps = [
    {
      icon: Users,
      badge: 'The Beginning',
      title: 'Just Batchmates',
      desc: 'We were supposed to be just two people in the same classroom, going through college lectures side by side…',
      sanskrit: 'आरम्भः',
      color: 'border-orange-500/40',
      iconColor: 'text-gray-300',
    },
    {
      icon: HeartHandshake,
      badge: 'The Turning Point',
      title: 'Somewhere Along the Way',
      desc: 'You started caring without being asked. You noticed when things were heavy and quietly stood by like family.',
      sanskrit: 'सद्भावः',
      color: 'border-amber-400/50',
      iconColor: 'text-[#ffd700]',
    },
    {
      icon: MessageCircleHeart,
      badge: 'The Sacred Warmth',
      title: 'Conversations & Affection',
      desc: 'The shared laughter, thoughtful check-ins, life advice, and turning unfamiliar college halls into a warm, safe sanctuary.',
      sanskrit: 'अनुरागः',
      color: 'border-[#ff6b35]/60',
      iconColor: 'text-[#ff6b35]',
    },
  ];

  return (
    <section className="min-h-screen relative flex items-center justify-center px-4 py-20 z-10">
      <div className="max-w-3xl w-full mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-[#ffd700] text-xs font-semibold uppercase tracking-widest mb-3 shadow-[0_0_15px_rgba(255,215,0,0.2)]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Sacred Evolution • सम्बन्ध यात्रा</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#ff6b35] via-[#ffb366] to-[#ffd700] bg-clip-text text-transparent font-display">
            Batchmate → Sister
          </h2>
          <p className="text-gray-300 text-sm sm:text-base mt-2 max-w-md mx-auto font-light">
            The extraordinary journey of how an ordinary classmate became an eternal sister.
          </p>
        </motion.div>

        {/* Vertical Connected Steps with Glowing Neon Connector */}
        <div className="relative pl-6 sm:pl-10 space-y-12 before:absolute before:left-[19px] sm:before:left-[31px] before:top-4 before:bottom-10 before:w-1 before:bg-gradient-to-b before:from-[#ff6b35] before:via-[#ffd700] before:to-[#ff6b35]/40 before:rounded-full before:shadow-[0_0_12px_rgba(255,107,53,0.6)]">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, delay: idx * 0.2 }}
                className="relative flex items-start gap-4 sm:gap-6 group"
              >
                {/* Step Icon Badge */}
                <div className="absolute -left-6 sm:-left-10 top-0 w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#131122] border-2 border-orange-500/50 flex items-center justify-center shadow-lg shadow-orange-500/30 group-hover:scale-110 group-hover:border-[#ffd700] transition-all">
                  <Icon className={`w-5 h-5 ${step.iconColor}`} />
                </div>

                {/* Glassmorphic Content Card */}
                <div className="flex-1 glass-card-neon rounded-2xl p-6 sm:p-7 transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold tracking-wider text-[#ffb366] uppercase">
                      {step.badge}
                    </span>
                    <span className="text-[10px] font-mono text-[#ffd700] border border-[#ffd700]/30 px-2 py-0.5 rounded-full">
                      {step.sanskrit}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mt-1 mb-2 font-display">
                    {step.title}
                  </h3>
                  <p className="text-[#d8d8e8] text-sm sm:text-base leading-relaxed font-light">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}

          {/* Grand Climax Step */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="relative pt-4"
          >
            <div className="absolute -left-6 sm:-left-10 top-5 w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-[#ff6b35] via-[#ffd700] to-[#ff2a5f] flex items-center justify-center shadow-xl shadow-orange-500/50">
              <Heart className="w-5 h-5 text-white fill-white animate-pulse" />
            </div>

            <div className="p-8 rounded-3xl glass-card-gold text-center shadow-[0_0_40px_rgba(255,215,0,0.25)] border-2 border-[#ffd700]/60">
              <p className="text-base text-gray-200 font-light">
                And without either of us realizing…
              </p>
              <h3 className="text-2xl sm:text-3xl font-bold mt-2 bg-gradient-to-r from-[#ff6b35] via-[#ffd700] to-[#ffb366] bg-clip-text text-transparent font-display neon-text-gold">
                A batchmate became eternal family. ❤️
              </h3>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
