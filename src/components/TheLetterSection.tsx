import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Copy, Check, Heart, Sparkles } from 'lucide-react';
import { playSoftBell } from '../utils/audio';

interface TheLetterSectionProps {
  sisterName: string;
  brotherName: string;
}

export const TheLetterSection: React.FC<TheLetterSectionProps> = ({
  sisterName,
  brotherName,
}) => {
  const [copied, setCopied] = useState(false);

  const letterParagraphs = [
    `${sisterName}, I want you to know something…`,
    `I don't know whether I've ever properly thanked you for everything you've done for me. You came into my life as my college batchmate, but somewhere along the way, you became someone far more special.`,
    `The way you've cared for me, looked out for me, checked in on tough days, and treated me like your own brother means more to me than I can ever express in words.`,
    `I may not always say it, and I may not always know how to show it, but I am endlessly grateful to have your presence, your advice, and your smile in my life.`,
    `Life will evolve. College days will turn into memories. We'll step into different chapters, meet new people, and navigate the world.`,
    `But I promise you this: the sacred bond of love, respect, and protection we share will remain steadfast forever.`,
    `You don't need to be my sister by blood for me to call you my sister. You already are, and you always will be. ❤️`,
  ];

  const handleCopy = () => {
    playSoftBell(1046.5);
    const fullText = letterParagraphs.join('\n\n') + `\n\n— Tera Bhai, ${brotherName || '[Your Name]'}\nशुभ रक्षा बन्धनम्`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="min-h-screen relative flex items-center justify-center px-4 py-20 z-10">
      <div className="max-w-3xl w-full mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-[#ffd700] text-xs font-semibold uppercase tracking-widest mb-4 shadow-[0_0_15px_rgba(255,215,0,0.2)]">
            <Mail className="w-3.5 h-3.5" />
            <span>From the Heart • भावाभिव्यक्तिः</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#ff6b35] via-[#ffb366] to-[#ffd700] bg-clip-text text-transparent font-display">
            The Letter
          </h2>
        </motion.div>

        {/* Glassmorphic Letter Parchment Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.8 }}
          className="relative glass-card-gold rounded-3xl p-7 sm:p-11 md:p-14 shadow-2xl overflow-hidden"
        >
          {/* Subtle neon glowing watermark */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Top Seal Stamp */}
          <div className="flex items-center justify-between pb-6 mb-8 border-b border-white/15">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#ff6b35] via-[#ffd700] to-[#ff2a5f] flex items-center justify-center shadow-lg shadow-orange-500/30">
                <Heart className="w-5 h-5 fill-white text-white" />
              </div>
              <div>
                <span className="text-base font-semibold text-white font-display">To: {sisterName}</span>
                <p className="text-xs text-[#ffb366]">Raksha Bandhan Letter</p>
              </div>
            </div>

            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-xs text-gray-200 hover:text-white transition shadow-sm"
              title="Copy letter"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-medium">Copied to Clipboard</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#ffd700]" />
                  <span>Copy Letter</span>
                </>
              )}
            </button>
          </div>

          {/* Letter Body Paragraphs */}
          <div className="space-y-5 text-base sm:text-lg text-[#e0e0f0] font-light leading-relaxed">
            <p className="text-xl sm:text-2xl font-normal text-[#ffd700] font-display neon-text-gold">
              {letterParagraphs[0]}
            </p>

            <p>{letterParagraphs[1]}</p>
            <p>{letterParagraphs[2]}</p>
            <p>{letterParagraphs[3]}</p>

            <div className="py-4 border-y border-white/10 space-y-3 bg-white/[0.02] px-4 rounded-xl">
              <p className="font-medium text-white">
                {letterParagraphs[4]}
              </p>
              <p className="text-[#ffb366] font-semibold text-lg sm:text-xl font-display">
                {letterParagraphs[5]}
              </p>
            </div>

            <p className="text-xl sm:text-2xl font-bold text-[#ff6b35] pt-2 font-display neon-text-orange">
              {letterParagraphs[6]}
            </p>
          </div>

          {/* Signoff */}
          <div className="mt-10 pt-6 border-t border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sm">
            <span className="text-gray-400">Always standing by your side with prayers,</span>
            <span className="text-[#ffd700] font-medium font-display text-base sm:text-lg">
              — Tera Bhai, {brotherName || '[Your Name]'}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
