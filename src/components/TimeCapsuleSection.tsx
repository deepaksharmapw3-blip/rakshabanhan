import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Clock, Heart, Sparkles, Share2, Check } from 'lucide-react';
import { playSoftBell } from '../utils/audio';

interface TimeCapsuleSectionProps {
  sisterName: string;
}

export const TimeCapsuleSection: React.FC<TimeCapsuleSectionProps> = ({
  sisterName,
}) => {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    playSoftBell(880);
    if (navigator.share) {
      navigator.share({
        title: `Raksha Bandhan - A Sacred Tribute to ${sisterName}`,
        text: `This isn't just a website. It's a little piece of my heart that I wanted you to keep. Happy Raksha Bandhan, ${sisterName}!`,
        url: window.location.href,
      }).catch(() => {
        // ignore
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <section className="min-h-screen relative flex items-center justify-center px-4 py-20 z-10">
      <div className="max-w-2xl w-full mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.8 }}
          className="relative glass-card-neon rounded-3xl p-8 sm:p-12 shadow-[0_0_50px_rgba(255,107,53,0.3)] text-left overflow-hidden border-2 border-orange-500/40"
        >
          {/* Header */}
          <div className="flex items-center gap-2 text-[#ffd700] text-xs font-semibold uppercase tracking-widest mb-6">
            <Clock className="w-4 h-4 text-amber-400" />
            <span>A Time Capsule for Eternity • कालमञ्जूषा</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6 font-display">
            If you're seeing this years from now…
          </h3>

          <div className="space-y-4 text-base sm:text-lg text-[#e0e0f0] font-light leading-relaxed">
            <p>I hope you are smiling, thriving, and happy.</p>
            <p>
              Maybe we are in completely different cities. Maybe life looks nothing like what we envisioned back in college corridors.
            </p>
            <p className="font-normal text-white">
              But whenever you revisit this little sanctuary…
            </p>
            <p className="text-[#ffd700] font-medium text-lg sm:text-xl leading-snug font-display neon-text-gold">
              I hope you remember that there was once a brother who was eternally grateful to have you as his sister.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-lg font-medium text-[#ffb366] flex items-center gap-1.5 font-display">
              <span>Some sacred bonds never fade.</span>
              <Heart className="w-5 h-5 fill-[#ff6b35] text-[#ff6b35] drop-shadow-[0_0_8px_rgba(255,107,53,0.8)]" />
            </p>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#ff6b35] to-[#ffd700] text-white text-xs font-semibold shadow-lg shadow-orange-500/30 hover:scale-105 transition-all cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-white" />
                  <span>Link Copied ✓</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share This Tribute</span>
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
