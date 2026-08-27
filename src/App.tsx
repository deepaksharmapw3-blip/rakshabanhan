import React, { useState, useRef } from 'react';
import { StarryBackground } from './components/StarryBackground';
import { AudioPlayer } from './components/AudioPlayer';
import { HeroSection } from './components/HeroSection';
import { ToThePersonSection } from './components/ToThePersonSection';
import { TimelineSection } from './components/TimelineSection';
import { ThingsINeverSaySection } from './components/ThingsINeverSaySection';
import { MemoryGallery } from './components/MemoryGallery';
import { TheLetterSection } from './components/TheLetterSection';
import { PoojaThaliRitual } from './components/PoojaThaliRitual';
import { RakhiSection } from './components/RakhiSection';
import { GiftBoxSection } from './components/GiftBoxSection';
import { TimeCapsuleSection } from './components/TimeCapsuleSection';
import { PersonalizeModal } from './components/PersonalizeModal';
import { TributeConfig } from './types';
import { Heart, Sparkles, SlidersHorizontal } from 'lucide-react';

export default function App() {
  const [config, setConfig] = useState<TributeConfig>({
    sisterName: 'Arunima',
    brotherName: 'Deepak',
  });

  const [showPersonalize, setShowPersonalize] = useState(false);
  const secondSectionRef = useRef<HTMLDivElement | null>(null);

  const handleScrollToNext = () => {
    secondSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="relative min-h-screen bg-[#07070c] text-[#e8e8f2] font-sans selection:bg-[#ff6b35] selection:text-white">
      {/* Background Starfield & Glowing Stardust */}
      <StarryBackground />

      {/* Top Floating Glassmorphic Nav Bar with Neon Accents */}
      <header className="fixed top-4 left-0 right-0 z-40 px-4 pointer-events-none">
        <div className="max-w-4xl mx-auto flex items-center justify-between pointer-events-auto glass-card-neon px-4 sm:px-6 py-2.5 rounded-full border border-orange-500/40 shadow-[0_0_30px_rgba(255,107,53,0.25)]">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff6b35] shadow-[0_0_10px_rgba(255,107,53,1)] animate-pulse" />
            <span className="text-xs sm:text-sm font-medium tracking-wide text-gray-200">
              शुभ रक्षा बन्धनम् • For <strong className="text-[#ffd700] font-semibold">{config.sisterName}</strong>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowPersonalize(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-amber-400/40 text-xs text-amber-200 hover:text-white transition shadow-sm cursor-pointer"
              title="Personalize names"
            >
              <SlidersHorizontal className="w-3 h-3 text-[#ffd700]" />
              <span className="hidden sm:inline font-medium">Customize</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <HeroSection
        sisterName={config.sisterName}
        onBegin={handleScrollToNext}
      />

      {/* Section 2: To The Person */}
      <div ref={secondSectionRef}>
        <ToThePersonSection />
      </div>

      {/* Section 3: Timeline */}
      <TimelineSection />

      {/* Section 4: Things I Never Say */}
      <ThingsINeverSaySection />

      {/* Section 5: Memory Gallery */}
      <MemoryGallery />

      {/* Section 6: The Letter */}
      <TheLetterSection
        sisterName={config.sisterName}
        brotherName={config.brotherName}
      />

      {/* Section 7: Sacred Pooja Thali & Aarti Ritual (Traditional Vedic Culture) */}
      <PoojaThaliRitual
        sisterName={config.sisterName}
        brotherName={config.brotherName}
      />

      {/* Section 8: The Rakhi Moment */}
      <RakhiSection />

      {/* Section 9: Interactive 3D Gift Box */}
      <GiftBoxSection
        sisterName={config.sisterName}
        brotherName={config.brotherName}
      />

      {/* Section 10: Time Capsule */}
      <TimeCapsuleSection sisterName={config.sisterName} />

      {/* Footer with Auspicious Blessing */}
      <footer className="relative z-10 py-12 text-center text-xs text-gray-400 border-t border-white/10">
        <p className="flex items-center justify-center gap-2 text-sm text-gray-300 font-display">
          <span>Crafted with devotion & sacred love for Raksha Bandhan</span>
          <Heart className="w-4 h-4 fill-[#ff6b35] text-[#ff6b35] drop-shadow-[0_0_8px_rgba(255,107,53,0.8)]" />
        </p>
        <p className="text-xs text-[#ffb366] mt-1.5 font-light">
          "येन बद्धो बली राजा दानवेन्द्रो महाबलः। तेन त्वां प्रतिबद्धनामि रक्षे मा चल मा चल॥"
        </p>
      </footer>

      {/* Floating Audio Player (featuring Tum Aankhon Se Batana with 3 highlight segments) */}
      <AudioPlayer />

      {/* Personalize Modal */}
      {showPersonalize && (
        <PersonalizeModal
          config={config}
          onSave={setConfig}
          onClose={() => setShowPersonalize(false)}
        />
      )}
    </main>
  );
}
