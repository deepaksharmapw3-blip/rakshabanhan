import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  Play,
  Pause,
  Music,
  Volume2,
  VolumeX,
  Sparkles,
  Sliders,
  Scissors,
  Layers,
  RotateCcw,
  SkipForward,
  SkipBack
} from 'lucide-react';
import {
  formatTime,
  parseTimeToSeconds,
  HIGHLIGHT_SEGMENTS,
  getAudioContext
} from '../utils/audio';

export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(99);
  const [showMenu, setShowMenu] = useState(false);
  const [isLooping, setIsLooping] = useState(true);

  const audioElemRef = useRef<HTMLAudioElement | null>(null);

  // Determine current active verse based on real-time playback position in the stitched audio
  const currentVerseIndex = useMemo(() => {
    if (currentTime < 26) return 0;
    if (currentTime < 52) return 1;
    return 2;
  }, [currentTime]);

  const currentHighlight = HIGHLIGHT_SEGMENTS[currentVerseIndex] || HIGHLIGHT_SEGMENTS[0];

  // Monitor audio time updates
  const handleTimeUpdate = () => {
    if (!audioElemRef.current) return;
    setCurrentTime(audioElemRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (!audioElemRef.current) return;
    const dur = audioElemRef.current.duration;
    if (!isNaN(dur) && dur > 0) {
      setDuration(dur);
    }
  };

  // Toggle play/pause
  const handleTogglePlay = async () => {
    if (!audioElemRef.current) return;
    
    // Ensure Web Audio context is active
    try {
      const ctx = getAudioContext();
      if (ctx && ctx.state === 'suspended') {
        await ctx.resume();
      }
    } catch {
      // ignore
    }

    if (isPlaying) {
      audioElemRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        await audioElemRef.current.play();
        setIsPlaying(true);
      } catch (err) {
        console.error('Audio playback error:', err);
      }
    }
  };

  // Jump to specific verse or time
  const jumpToVerse = (verseIndex: number) => {
    const target = HIGHLIGHT_SEGMENTS[verseIndex];
    if (!target || !audioElemRef.current) return;
    audioElemRef.current.currentTime = target.startTime;
    setCurrentTime(target.startTime);
    if (!isPlaying) {
      audioElemRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const jumpToTime = (timeInSec: number) => {
    if (audioElemRef.current) {
      audioElemRef.current.currentTime = Math.max(0, Math.min(duration, timeInSec));
      setCurrentTime(audioElemRef.current.currentTime);
      if (!isPlaying) {
        audioElemRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    }
  };

  const toggleMute = () => {
    if (audioElemRef.current) {
      audioElemRef.current.muted = !isMuted;
    }
    setIsMuted(!isMuted);
  };

  // Initial setup
  useEffect(() => {
    if (audioElemRef.current) {
      audioElemRef.current.src = '/tum_aankhon_se_batana.mp3';
      audioElemRef.current.load();
    }
  }, []);

  return (
    <>
      <audio
        ref={audioElemRef}
        src="/tum_aankhon_se_batana.mp3"
        preload="auto"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => {
          if (isLooping && audioElemRef.current) {
            audioElemRef.current.currentTime = 0;
            audioElemRef.current.play().catch(() => {});
          } else {
            setIsPlaying(false);
          }
        }}
      />

      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
        {/* Expanded 3-Verse Single-Play Controller */}
        {showMenu && (
          <div className="bg-[#151422]/95 backdrop-blur-2xl border border-orange-500/40 rounded-3xl p-5 shadow-2xl shadow-orange-500/25 text-xs w-80 sm:w-[440px] max-h-[85vh] overflow-y-auto animate-in fade-in slide-in-from-bottom-3 duration-200">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#ff6b35] via-[#ff9248] to-[#ffd700] flex items-center justify-center shadow-md shadow-orange-500/40">
                  <Music className="w-4 h-4 text-white" />
                </div>
                <div>
                  <span className="font-bold text-white text-sm">Tum Aankhon Se Batana</span>
                  <p className="text-[10px] text-[#ffb366]">
                    Single-Play Cut • 0:33-0:59 ➔ 1:43-2:09 ➔ 2:21-3:08
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowMenu(false)}
                className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition"
              >
                ✕
              </button>
            </div>

            {/* Single Play Info Banner */}
            <div className="flex items-center gap-2 p-2 rounded-xl bg-gradient-to-r from-orange-500/20 via-amber-500/10 to-transparent border border-orange-500/30 mb-3">
              <Sparkles className="w-4 h-4 text-[#ffd700] shrink-0" />
              <p className="text-[10.5px] text-gray-200 leading-tight">
                All 3 highlighted verses are stitched into a <span className="text-[#ffd700] font-semibold">single seamless audio track</span> that plays sequentially from start to end.
              </p>
            </div>

            {/* 3 Interactive Highlight Segment Cards */}
            <div className="space-y-2 mb-3.5">
              <div className="flex items-center justify-between text-[11px] text-gray-300 font-semibold px-1">
                <span className="flex items-center gap-1.5 text-white">
                  <Scissors className="w-3.5 h-3.5 text-[#ffd700]" />
                  Sequenced Song Verses
                </span>
                <span className="text-[10px] text-[#ffd700]">Click any to jump</span>
              </div>

              {HIGHLIGHT_SEGMENTS.map((seg, idx) => {
                const isActive = currentVerseIndex === idx;

                return (
                  <button
                    key={seg.id}
                    type="button"
                    onClick={() => jumpToVerse(idx)}
                    className={`w-full text-left p-2.5 rounded-2xl transition border flex flex-col gap-1 ${
                      isActive
                        ? 'bg-gradient-to-r from-[#ff6b35]/25 via-amber-500/20 to-transparent border-[#ff6b35] shadow-lg shadow-orange-500/25 ring-1 ring-orange-400/50'
                        : 'bg-white/5 hover:bg-white/10 border-white/10 text-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                            isActive
                              ? 'bg-[#ff6b35] text-white animate-pulse'
                              : 'bg-white/10 text-gray-400'
                          }`}
                        >
                          {idx + 1}
                        </span>
                        <span className={`font-semibold text-xs ${isActive ? 'text-[#ffd700]' : 'text-white'}`}>
                          {seg.title}
                        </span>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-black/50 text-[10px] font-mono text-[#ffb366] border border-orange-500/30">
                        {seg.startFormatted} — {seg.endFormatted}
                      </span>
                    </div>

                    <p className="text-[10.5px] text-gray-300 pl-7 italic line-clamp-1">
                      "{seg.lyricsHindi}"
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Active Real-time Lyrics Card */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-br from-orange-950/60 via-black/60 to-black/80 border border-orange-500/30 mb-3.5 text-center shadow-inner">
              <div className="text-[10px] uppercase font-bold tracking-wider text-orange-400 mb-1 flex items-center justify-center gap-1.5">
                <Sparkles className="w-3 h-3 text-[#ffd700]" />
                <span>Now Playing: {currentHighlight.title} ({currentHighlight.startFormatted} - {currentHighlight.endFormatted})</span>
              </div>
              <p className="text-xs text-[#ffd700] font-serif italic mb-1 font-medium">
                "{currentHighlight.lyricsHindi}"
              </p>
              <p className="text-[10px] text-gray-300">
                "{currentHighlight.lyrics}"
              </p>
            </div>

            {/* Continuous Timeline Scrubber */}
            <div className="p-3 rounded-2xl bg-black/40 border border-white/10 mb-2">
              <div className="flex items-center justify-between text-[10px] font-mono text-gray-300 mb-1.5">
                <span className="text-[#ffd700] font-bold flex items-center gap-1">
                  <Play className="w-2.5 h-2.5 fill-current" /> {formatTime(currentTime)}
                </span>
                <span className="text-gray-400">Total: {formatTime(duration)}</span>
              </div>

              {/* Progress bar with segment tick marks */}
              <div
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  const pct = Math.max(0, Math.min(1, clickX / rect.width));
                  jumpToTime(pct * (duration || 99));
                }}
                className="h-2.5 w-full bg-black/80 rounded-full cursor-pointer overflow-hidden border border-white/10 relative"
              >
                {/* Segment visual divisions */}
                <div className="absolute left-[26.26%] top-0 bottom-0 w-0.5 bg-white/30 z-10" title="Part 2 (1:43)" />
                <div className="absolute left-[52.52%] top-0 bottom-0 w-0.5 bg-white/30 z-10" title="Part 3 (2:21)" />

                <div
                  className="h-full bg-gradient-to-r from-[#ff6b35] via-[#ffb366] to-[#ffd700] rounded-full transition-all duration-100"
                  style={{
                    width: `${Math.min(100, Math.max(0, (currentTime / (duration || 99)) * 100))}%`,
                  }}
                />
              </div>

              <div className="flex justify-between text-[9px] text-gray-400 font-mono mt-1 px-0.5">
                <span>0:33 (Part 1)</span>
                <span className="text-center">1:43 (Part 2)</span>
                <span className="text-right">2:21 (Part 3)</span>
              </div>

              {/* Playback action controls */}
              <div className="flex items-center justify-center gap-3 mt-3 pt-2 border-t border-white/10">
                <button
                  onClick={() => jumpToVerse(Math.max(0, currentVerseIndex - 1))}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition"
                  title="Previous Verse"
                >
                  <SkipBack className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={handleTogglePlay}
                  className="px-4 py-1.5 rounded-full bg-gradient-to-r from-[#ff6b35] to-[#ffd700] text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-orange-500/30 hover:scale-105 active:scale-95 transition"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-3.5 h-3.5 fill-white" /> Pause
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-white ml-0.5" /> Play Full Cut
                    </>
                  )}
                </button>

                <button
                  onClick={() => jumpToVerse(Math.min(2, currentVerseIndex + 1))}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition"
                  title="Next Verse"
                >
                  <SkipForward className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => {
                    jumpToTime(0);
                  }}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition ml-2"
                  title="Restart Single Play"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Floating Player Pill */}
        <div className="flex items-center gap-2.5 glass-card-neon px-3.5 py-2 rounded-full border border-[#ff6b35]/50 shadow-[0_0_30px_rgba(255,107,53,0.35)]">
          {/* Menu / Settings Button */}
          <button
            onClick={() => setShowMenu(!showMenu)}
            title="Audio settings & 3-highlight segment controller"
            className="p-2 text-gray-300 hover:text-white rounded-full hover:bg-white/10 transition relative"
          >
            <Sliders className="w-4 h-4 text-[#ffb366]" />
          </button>

          {/* Active Status Badge */}
          <button
            onClick={() => setShowMenu(true)}
            className="text-left flex flex-col justify-center max-w-[130px] sm:max-w-[190px] cursor-pointer"
          >
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ffd700] animate-pulse" />
              <span className="text-[11px] font-bold text-white truncate">
                Tum Aankhon Se Batana
              </span>
            </div>
            <span className="text-[10px] font-mono text-[#ffb366] truncate">
              {currentHighlight.title} ({formatTime(currentTime)})
            </span>
          </button>

          {/* Animated Waveform Equalizer */}
          {isPlaying && (
            <div className="hidden sm:flex items-end gap-0.5 h-4 px-1">
              <span className="w-0.5 bg-[#ff6b35] rounded-full animate-[bounce_1s_infinite_100ms] h-3" />
              <span className="w-0.5 bg-[#ffd700] rounded-full animate-[bounce_1s_infinite_300ms] h-4" />
              <span className="w-0.5 bg-[#ffb366] rounded-full animate-[bounce_1s_infinite_200ms] h-2" />
            </div>
          )}

          {/* Main Play/Pause Button */}
          <button
            id="musicBtn"
            onClick={handleTogglePlay}
            title={isPlaying ? 'Pause audio' : 'Play Tum Aankhon Se Batana (0:33-0:59, 1:43-2:09, 2:21-3:08 in single play)'}
            className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#ff6b35] via-[#e85d26] to-[#ffd700] text-white flex items-center justify-center shadow-md shadow-orange-500/50 hover:scale-105 active:scale-95 transition-all"
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 fill-white" />
            ) : (
              <Play className="w-4 h-4 fill-white ml-0.5" />
            )}
          </button>

          {/* Mute Toggle */}
          {isPlaying && (
            <button
              onClick={toggleMute}
              className="p-1.5 text-gray-400 hover:text-white rounded-full hover:bg-white/10 transition"
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? (
                <VolumeX className="w-3.5 h-3.5 text-red-400" />
              ) : (
                <Volume2 className="w-3.5 h-3.5 text-gray-300" />
              )}
            </button>
          )}
        </div>
      </div>
    </>
  );
};
