import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import { QRCodeSVG } from 'qrcode.react';
import confetti from 'canvas-confetti';
import {
  Heart,
  Sparkles,
  QrCode,
  Lock,
  Unlock,
  Sun,
  Shield,
  Copy,
  Check,
  RotateCcw,
  Share2,
  Bookmark,
  Edit3,
  Save,
  MessageCircleHeart,
} from 'lucide-react';
import { playSoftBell, playGiftChime } from '../utils/audio';

interface SecretMessageSectionProps {
  sisterName: string;
  brotherName: string;
  customEmergencyNote?: string;
}

type RevealMode = 'envelope' | 'scratch' | 'qrcode';

export const SecretMessageSection: React.FC<SecretMessageSectionProps> = ({
  sisterName,
  brotherName,
  customEmergencyNote,
}) => {
  const [activeTab, setActiveTab] = useState<RevealMode>('envelope');
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [isScratched, setIsScratched] = useState(false);
  const [scratchProgress, setScratchProgress] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedText, setCopiedText] = useState(false);
  const [hugCount, setHugCount] = useState(0);
  const [isEditingNote, setIsEditingNote] = useState(false);
  const [editableNote, setEditableNote] = useState<string>(() => {
    return (
      customEmergencyNote ||
      localStorage.getItem('rakhi_emergency_note') ||
      `Hey ${sisterName},\n\nIf you're reading this right now, take a deep breath. Drop your shoulders, unclench your jaw, and listen to me.\n\nWhatever happened today, whatever broke your heart or made you feel like you are not enough—it does NOT define you. You are one of the strongest, kindest, and most resilient souls I know.\n\nRemember: Tough days come and go, but your brother is standing right in your corner, forever. You never have to face this world completely alone.\n\nYou have survived 100% of your worst days so far, and you will shine through this one too.\n\nDrink some water, rest your mind, and remember who you are. I've got your back, always.`
    );
  });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawingRef = useRef(false);

  // Confetti trigger helper
  const triggerCelebration = useCallback(() => {
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ffd700', '#ff6b35', '#ff2a5f', '#ffffff'],
    });
  }, []);

  // Envelope Open Trigger
  const handleOpenEnvelope = () => {
    if (!isEnvelopeOpen) {
      playGiftChime();
      setIsEnvelopeOpen(true);
      triggerCelebration();
    }
  };

  // Scratch Canvas Initialization
  const initScratchCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.offsetWidth || 340;
    const height = canvas.offsetHeight || 220;
    canvas.width = width;
    canvas.height = height;

    // Draw shimmering golden foil
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#c59b27');
    grad.addColorStop(0.3, '#f5d77f');
    grad.addColorStop(0.5, '#e5b93b');
    grad.addColorStop(0.8, '#d4af37');
    grad.addColorStop(1, '#997517');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Add sparkle dot noise pattern
    ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
    for (let i = 0; i < 600; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const r = Math.random() * 2;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }

    // Overlay Scratch Text
    ctx.fillStyle = '#2c1e05';
    ctx.font = 'bold 15px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('✨ SCRATCH HERE WITH CURSOR ✨', width / 2, height / 2 - 12);

    ctx.fillStyle = '#4a350c';
    ctx.font = '12px system-ui, sans-serif';
    ctx.fillText('Rub with mouse or finger to uncover pep-talk', width / 2, height / 2 + 14);

    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.font = '10px system-ui, sans-serif';
    ctx.fillText('🔒 Emergency Safe Zone', width / 2, height / 2 + 36);

    setIsScratched(false);
    setScratchProgress(0);
  }, []);

  useEffect(() => {
    if (activeTab === 'scratch') {
      setTimeout(() => {
        initScratchCanvas();
      }, 50);
    }
  }, [activeTab, initScratchCanvas]);

  // Scratch handler
  const scratch = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || isScratched) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 24, 0, Math.PI * 2);
    ctx.fill();

    // Check scratch percentage periodically
    if (Math.random() < 0.25) {
      playSoftBell(800 + Math.random() * 400);
      try {
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        let clearPixels = 0;
        const totalPixels = imgData.data.length / 4;
        for (let i = 3; i < imgData.data.length; i += 16) {
          if (imgData.data[i] === 0) clearPixels++;
        }
        const pct = Math.min(100, Math.round((clearPixels / (totalPixels / 4)) * 100));
        setScratchProgress(pct);

        if (pct > 40 && !isScratched) {
          setIsScratched(true);
          playGiftChime();
          triggerCelebration();
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
      } catch (e) {
        // ignore cross-origin if any
      }
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDrawingRef.current = true;
    scratch(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return;
    scratch(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    isDrawingRef.current = false;
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    isDrawingRef.current = true;
    if (e.touches.length > 0) {
      scratch(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return;
    if (e.touches.length > 0) {
      scratch(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  // Virtual Hug Trigger
  const handleSendHug = () => {
    playGiftChime();
    setHugCount((prev) => prev + 1);
    confetti({
      particleCount: 40,
      scalar: 1.3,
      spread: 90,
      origin: { y: 0.7 },
      colors: ['#ff2a5f', '#ff6b35', '#ffd700'],
    });
  };

  // Copy Pep-talk Text
  const handleCopyText = () => {
    playSoftBell(1046.5);
    const textToCopy = `💌 EMERGENCY PEP-TALK FOR ${sisterName.toUpperCase()}\n\n${editableNote}\n\n— Always with you, ${brotherName || 'Your Brother'}`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2500);
  };

  // Copy Direct Page Bookmark URL
  const handleCopyLink = () => {
    playSoftBell(880);
    const url = window.location.href.split('#')[0] + '#emergency-pep-talk';
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  // Save editable note
  const handleSaveNote = () => {
    playSoftBell(987.77);
    localStorage.setItem('rakhi_emergency_note', editableNote);
    setIsEditingNote(false);
  };

  return (
    <section
      id="emergency-pep-talk"
      className="min-h-screen relative flex items-center justify-center px-4 py-20 z-10"
    >
      <div className="max-w-4xl w-full mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold uppercase tracking-widest mb-4 shadow-[0_0_15px_rgba(255,42,95,0.2)]">
            <MessageCircleHeart className="w-3.5 h-3.5 text-[#ff2a5f] animate-pulse" />
            <span>Emergency Vault • आपातकालीन हौसला</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#ff6b35] via-[#ff2a5f] to-[#ffd700] bg-clip-text text-transparent font-display">
            Secret Message & Bad-Day Pep-Talk
          </h2>

          <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto mt-3 font-light leading-relaxed">
            A permanent sanctuary for <strong className="text-amber-300 font-semibold">{sisterName}</strong>.
            Bookmark this page or scan the QR code to keep it close whenever you need courage, reassurance, or a smile.
          </p>
        </motion.div>

        {/* Tab Navigation Controls (Envelope / Scratch Card / QR Code) */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-8">
          <button
            id="tab-envelope-btn"
            onClick={() => {
              playSoftBell(700);
              setActiveTab('envelope');
            }}
            className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition cursor-pointer ${
              activeTab === 'envelope'
                ? 'bg-gradient-to-r from-[#ff6b35] to-[#ff2a5f] text-white shadow-[0_0_20px_rgba(255,42,95,0.4)] border border-rose-400/50'
                : 'bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Emergency Envelope</span>
          </button>

          <button
            id="tab-scratch-btn"
            onClick={() => {
              playSoftBell(800);
              setActiveTab('scratch');
            }}
            className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition cursor-pointer ${
              activeTab === 'scratch'
                ? 'bg-gradient-to-r from-[#ffd700] to-[#ff6b35] text-slate-950 font-bold shadow-[0_0_20px_rgba(255,215,0,0.4)] border border-amber-300'
                : 'bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Scratch-Off Card</span>
          </button>

          <button
            id="tab-qrcode-btn"
            onClick={() => {
              playSoftBell(900);
              setActiveTab('qrcode');
            }}
            className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition cursor-pointer ${
              activeTab === 'qrcode'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_20px_rgba(6,182,212,0.4)] border border-cyan-400/50'
                : 'bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10'
            }`}
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>Scan QR / Bookmark</span>
          </button>
        </div>

        {/* Main Interactive Stage */}
        <div className="relative glass-card-gold rounded-3xl p-6 sm:p-9 md:p-11 shadow-2xl overflow-hidden border border-amber-500/25">
          {/* Subtle Ambient Background Orbs */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* TAB 1: EMERGENCY ENVELOPE WITH WAX SEAL */}
          {activeTab === 'envelope' && (
            <div className="flex flex-col items-center">
              {!isEnvelopeOpen ? (
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  className="w-full max-w-lg py-8 flex flex-col items-center text-center"
                >
                  {/* Discreet Envelope Frame */}
                  <div className="relative w-full max-w-md bg-gradient-to-b from-[#1a131b] via-[#241724] to-[#160e18] p-8 rounded-2xl border-2 border-rose-500/40 shadow-[0_0_40px_rgba(255,42,95,0.25)] flex flex-col items-center">
                    <div className="absolute -top-3 px-4 py-1 rounded-full bg-[#ff2a5f] text-white text-[11px] font-bold tracking-wider uppercase shadow-md flex items-center gap-1.5">
                      <Lock className="w-3 h-3" />
                      <span>Confidential • Only Open On A Bad Day</span>
                    </div>

                    <div className="mt-4 mb-6 text-gray-300 text-sm italic font-display">
                      "To be unsealed only when you need an emergency dose of courage, comfort, and sisterly love."
                    </div>

                    {/* Glowing Interactive Wax Seal */}
                    <motion.button
                      id="break-wax-seal-btn"
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.92 }}
                      onClick={handleOpenEnvelope}
                      className="relative group w-24 h-24 rounded-full bg-gradient-to-tr from-[#990022] via-[#ff2a5f] to-[#ff6b35] flex items-center justify-center cursor-pointer shadow-[0_0_30px_rgba(255,42,95,0.6)] border-4 border-amber-300/60 transition-transform"
                    >
                      <div className="absolute inset-0 rounded-full border border-white/40 animate-ping opacity-30" />
                      <div className="flex flex-col items-center">
                        <Heart className="w-8 h-8 fill-white text-white drop-shadow" />
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-200 mt-0.5">
                          Unseal
                        </span>
                      </div>
                    </motion.button>

                    <p className="text-xs text-amber-300/80 mt-5 font-medium flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
                      Click the Wax Seal to Break & Reveal
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                  className="w-full"
                >
                  {/* Opened Letter Header Badge */}
                  <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#ff2a5f] to-[#ffd700] flex items-center justify-center shadow-lg">
                        <Unlock className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white font-display">
                          Emergency Pep-Talk Letter Unsealed
                        </h3>
                        <p className="text-xs text-amber-300">
                          For {sisterName} • With infinite love from {brotherName}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setIsEditingNote(!isEditingNote)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs text-gray-200 border border-white/10 transition cursor-pointer"
                      >
                        <Edit3 className="w-3 h-3 text-amber-400" />
                        <span>{isEditingNote ? 'Cancel' : 'Edit Note'}</span>
                      </button>
                      <button
                        onClick={handleCopyText}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-xs text-amber-200 border border-amber-400/30 transition cursor-pointer"
                      >
                        {copiedText ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3 text-amber-300" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Letter Content or Edit Area */}
                  {isEditingNote ? (
                    <div className="mb-6">
                      <textarea
                        value={editableNote}
                        onChange={(e) => setEditableNote(e.target.value)}
                        rows={9}
                        className="w-full p-4 rounded-xl bg-black/40 border border-amber-400/40 text-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 font-sans leading-relaxed"
                        placeholder="Write your custom emergency cheer-up message here..."
                      />
                      <div className="flex justify-end gap-2 mt-2">
                        <button
                          onClick={handleSaveNote}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold text-xs shadow-md hover:brightness-110 cursor-pointer"
                        >
                          <Save className="w-3.5 h-3.5" />
                          <span>Save Custom Note</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gradient-to-b from-[#18111e]/90 to-[#100b14]/90 p-6 sm:p-8 rounded-2xl border border-rose-500/25 shadow-inner mb-6">
                      <div className="text-gray-200 text-sm sm:text-base leading-relaxed space-y-4 font-sans whitespace-pre-line">
                        {editableNote}
                      </div>

                      <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
                        <div className="flex items-center gap-2">
                          <Shield className="w-4 h-4 text-amber-400" />
                          <span>Unconditional Brotherly Promise</span>
                        </div>
                        <span className="font-display text-amber-300 font-semibold">
                          — Tera Bhai, {brotherName} ❤️
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Reset Envelope Button */}
                  <div className="flex justify-center">
                    <button
                      onClick={() => {
                        playSoftBell(600);
                        setIsEnvelopeOpen(false);
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-xs text-gray-400 hover:text-gray-200 transition cursor-pointer"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Re-Seal Envelope</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          )}

          {/* TAB 2: INTERACTIVE SCRATCH-OFF CARD */}
          {activeTab === 'scratch' && (
            <div className="flex flex-col items-center">
              <div className="text-center mb-5">
                <h3 className="text-xl font-bold text-white font-display">
                  Interactive Shimmer Scratch Card
                </h3>
                <p className="text-xs text-amber-300 mt-1">
                  Rub across the golden foil to uncover secret words of encouragement
                </p>
              </div>

              <div className="relative w-full max-w-md h-64 sm:h-72 rounded-2xl overflow-hidden shadow-2xl border-2 border-amber-400/50 bg-[#120d18] flex items-center justify-center p-6 text-center select-none">
                {/* Underlying Secret Revealed Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-center items-center bg-gradient-to-br from-[#231524] via-[#1a0f1c] to-[#120914] text-center">
                  <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center mb-2 text-amber-300">
                    <Sun className="w-6 h-6 animate-pulse text-[#ffd700]" />
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-amber-300 font-display">
                    {sisterName}, You Are Unstoppable!
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-200 mt-2 leading-relaxed">
                    "On tough days, remember: Gold is tested in fire, and diamonds are created under pressure.
                    You are precious, loved, and deeply protected."
                  </p>
                  <div className="mt-3 text-[11px] text-[#ff6b35] font-semibold tracking-wide uppercase">
                    — Permanent Pep-Talk From {brotherName} 🌟
                  </div>
                </div>

                {/* The Scratchable Canvas Foil */}
                <canvas
                  ref={canvasRef}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleMouseUp}
                  className="absolute inset-0 w-full h-full cursor-crosshair touch-none transition-opacity duration-500"
                  style={{
                    opacity: isScratched ? 0 : 1,
                    pointerEvents: isScratched ? 'none' : 'auto',
                  }}
                />
              </div>

              {/* Scratch Progress & Controls */}
              <div className="mt-5 flex items-center justify-between w-full max-w-md text-xs text-gray-400">
                <div className="flex items-center gap-2">
                  <span>Revealed:</span>
                  <span className="font-bold text-amber-300">{isScratched ? 100 : scratchProgress}%</span>
                </div>
                <button
                  onClick={() => {
                    playSoftBell(750);
                    initScratchCanvas();
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-gray-200 transition cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset Foil</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: SCANNABLE QR CODE & QUICK BOOKMARK */}
          {activeTab === 'qrcode' && (
            <div className="flex flex-col items-center text-center">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white font-display">
                  Scan & Keep This Sanctuary in Your Pocket
                </h3>
                <p className="text-xs text-gray-300 max-w-md mx-auto mt-1">
                  Point your mobile phone camera at this QR code to bookmark or add this page to your home screen.
                </p>
              </div>

              {/* QR Code Container with High Contrast & Auspicious Styling */}
              <div className="relative p-5 bg-white rounded-2xl shadow-[0_0_35px_rgba(255,215,0,0.3)] border-4 border-amber-400 flex flex-col items-center">
                <QRCodeSVG
                  value={window.location.href}
                  size={200}
                  level="H"
                  includeMargin={true}
                  imageSettings={{
                    src: 'https://api.iconify.design/lucide:heart.svg?color=%23ff2a5f',
                    x: undefined,
                    y: undefined,
                    height: 32,
                    width: 32,
                    excavate: true,
                  }}
                />
                <div className="mt-2 text-[11px] font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1">
                  <span>Raksha Bandhan • For {sisterName}</span>
                </div>
              </div>

              {/* Action Buttons for Mobile Bookmark & Copy Link */}
              <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
                <button
                  onClick={handleCopyLink}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium text-xs shadow-lg hover:brightness-110 transition cursor-pointer"
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-white" />
                      <span>Link Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Copy Direct Sanctuary Link</span>
                    </>
                  )}
                </button>
              </div>

              <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/10 max-w-md text-xs text-gray-300 text-left space-y-1.5">
                <p className="font-semibold text-amber-300 flex items-center gap-1.5">
                  <Bookmark className="w-3.5 h-3.5 text-amber-400" />
                  <span>How to Add to Phone Home Screen:</span>
                </p>
                <p>• <strong>iPhone (Safari):</strong> Tap the Share icon at bottom → tap <em>"Add to Home Screen"</em>.</p>
                <p>• <strong>Android (Chrome):</strong> Tap the 3 dots menu top-right → tap <em>"Add to Home screen"</em>.</p>
              </div>
            </div>
          )}

          {/* EMERGENCY COMFORT: VIRTUAL HUG */}
          <div className="mt-8 pt-8 border-t border-white/15 flex justify-center">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-rose-950/40 via-black/40 to-[#180e1a]/40 border border-rose-500/30 flex flex-col items-center text-center max-w-md w-full shadow-lg">
              <div className="w-12 h-12 rounded-full bg-rose-500/20 flex items-center justify-center text-rose-400 mb-2 shadow-inner">
                <Heart className="w-6 h-6 fill-rose-500 text-rose-500 animate-pulse" />
              </div>
              <h5 className="text-base font-bold text-white font-display">Send Emergency Virtual Hug</h5>
              <p className="text-xs text-gray-300 mt-1 mb-4">
                Whenever you feel down, tap here to receive a warm, unconditional brotherly hug.
              </p>
              <button
                id="emergency-hug-btn"
                onClick={handleSendHug}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#ff2a5f] to-[#ff6b35] text-white font-semibold text-xs shadow-[0_0_20px_rgba(255,42,95,0.4)] hover:scale-105 active:scale-95 transition cursor-pointer"
              >
                <Heart className="w-4 h-4 fill-white" />
                <span>Receive Tight Hug ({hugCount})</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
