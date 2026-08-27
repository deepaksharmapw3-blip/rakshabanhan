// Web Audio API ambient generator and audio utilities with 3 Highlight Segments
// (00:33 - 00:59, 01:43 - 02:09, 02:21 - 03:08) of "Tum Aankhon Se Batana"

import { AudioTrack, AudioHighlightSegment } from '../types';

let audioCtx: AudioContext | null = null;
let ambientInterval: number | null = null;
let isAmbientPlaying = false;
let melodyTimer: number | null = null;

export function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Convert seconds to mm:ss format
export function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return '00:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Parse string like "0:33", "0.33", "33" into seconds
export function parseTimeToSeconds(input: string | number): number {
  if (typeof input === 'number') return input;
  if (!input) return 0;

  const trimmed = input.trim();
  if (trimmed.includes(':')) {
    const [mins, secs] = trimmed.split(':').map(Number);
    return (mins || 0) * 60 + (secs || 0);
  } else if (trimmed.includes('.')) {
    const [mins, secs] = trimmed.split('.').map(Number);
    return (mins || 0) * 60 + (secs || 0);
  }
  const num = Number(trimmed);
  return isNaN(num) ? 0 : num;
}

// 3 Highlight Segments from "Tum Aankhon Se Batana" stitched into a Single Play
// (0:33 - 0:59, 1:43 - 2:09, and 2:21 - 3:08 from original recording)
export const HIGHLIGHT_SEGMENTS: AudioHighlightSegment[] = [
  {
    id: 'seg-1',
    title: 'Part 1: 0:33 – 0:59',
    subtitle: 'Verse 1: "Tum aankhon se batana hum samajh jayenge..."',
    startTime: 0,
    endTime: 26,
    startFormatted: '00:33',
    endFormatted: '00:59',
    lyrics: 'Tum aankhon se batana hum samajh jayenge... tum hath thaam lena hum sawar jayenge',
    lyricsHindi: 'तुम आँखों से बताना हम समझ जायेंगे... तुम हाथ थाम लेना हम संवर जायेंगे',
  },
  {
    id: 'seg-2',
    title: 'Part 2: 1:43 – 2:09',
    subtitle: 'Verse 2: "Hum khamoshi padh lenge agar chup tum raho..."',
    startTime: 26,
    endTime: 52,
    startFormatted: '01:43',
    endFormatted: '02:09',
    lyrics: 'Tumhari mehendi mein chupe hum rahe... hum khamoshi padh lenge agar chup tum raho... tum aadat bano humari hum bigad jayenge',
    lyricsHindi: 'तुम्हारी मेहंदी में छुपे हम रहे... हम खामोशी पढ़ लेंगे अगर चुप तुम रहो... तुम आदत बनो हमारी हम बिगड़ जायेंगे',
  },
  {
    id: 'seg-3',
    title: 'Part 3: 2:21 – 3:08',
    subtitle: 'Verse 3: "Humne apne jazbaat saja ke hain rakhe..."',
    startTime: 52,
    endTime: 99,
    startFormatted: '02:21',
    endFormatted: '03:08',
    lyrics: 'Yaar mere pyaar ka matlab samajhta nahi zamaana... kaagzon par sabne apne lafz likhe, humne apne jazbaat saja ke hain rakhe... tum aankhon mein dekho humari sab samajh jaaoge',
    lyricsHindi: 'यार मेरे प्यार का मतलब समझता नहीं ज़माना... कागज़ों पर सबने अपने लफ़्ज़ लिखे, हमने अपने जज़्बात सजा के हैं रखे... तुम आँखों में देखो हमारी सब समझ जाओगे',
  },
];

export const DEFAULT_SEGMENT = {
  startTime: 0,
  endTime: 99,
  duration: 99,
};

// Preset audio tracks - Single Play 3-part cut of "Tum Aankhon Se Batana"
export const PRESET_TRACKS: AudioTrack[] = [
  {
    id: 'tum-aankhon-se',
    name: 'Tum Aankhon Se Batana (Single Play Cut)',
    subtitle: '00:33-00:59 • 01:43-02:09 • 02:21-03:08',
    type: 'preset',
    url: '/tum_aankhon_se_batana.mp3',
    defaultStartTime: 0,
    defaultEndTime: 99,
    segments: HIGHLIGHT_SEGMENTS,
  },
];

// Play pleasant celebration chime for opening gift box
export function playGiftChime() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    const freqs = [523.25, 659.25, 783.99, 987.77, 1046.5, 1318.51];
    
    freqs.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + index * 0.08);
      
      gain.gain.setValueAtTime(0, now + index * 0.08);
      gain.gain.linearRampToValueAtTime(0.18, now + index * 0.08 + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + index * 0.08 + 1.8);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(now + index * 0.08);
      osc.stop(now + index * 0.08 + 1.9);
    });
  } catch (e) {
    console.error('Failed to play chime sound', e);
  }
}

// Play soft tactile bell on interaction
export function playSoftBell(freq = 880) {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);
    
    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start(now);
    osc.stop(now + 0.65);
  } catch (e) {
    // ignore
  }
}

// Notes sequence mapping for "Tum Aankhon Se Batana" covering Part 1 (0:33-0:59), Part 2 (1:43-2:09), Part 3 (2:21-3:08)
const tumAankhonNotes = [
  // Movement 1: (0:33 - 0:59)
  // "Tum aankhon se batana hum samajh jayenge"
  { freq: 293.66, dur: 0.45 }, // Tum (D4)
  { freq: 329.63, dur: 0.45 }, // aan- (E4)
  { freq: 392.00, dur: 0.4 },  // khon (G4)
  { freq: 440.00, dur: 0.4 },  // se (A4)
  { freq: 493.88, dur: 0.6 },  // ba-taa- (B4)
  { freq: 440.00, dur: 0.4 },  // na (A4)
  { freq: 392.00, dur: 0.5 },  // hum (G4)
  { freq: 329.63, dur: 0.4 },  // sa-majh (E4)
  { freq: 293.66, dur: 0.8 },  // jaa-yenge (D4)

  // "Tum halki si sharmana hum tere ho jayenge"
  { freq: 293.66, dur: 0.45 }, // Tum
  { freq: 329.63, dur: 0.4 },  // hal-ki
  { freq: 392.00, dur: 0.4 },  // si
  { freq: 440.00, dur: 0.45 }, // shar-maa-
  { freq: 493.88, dur: 0.6 },  // na
  { freq: 587.33, dur: 0.5 },  // hum (D5)
  { freq: 493.88, dur: 0.4 },  // te-re (B4)
  { freq: 440.00, dur: 0.45 }, // ho (A4)
  { freq: 392.00, dur: 0.9 },  // jaa-yenge (G4)

  // "Hum raah taake baithe hain koi ijaazat do"
  { freq: 392.00, dur: 0.4 },  // Hum
  { freq: 440.00, dur: 0.4 },  // raah
  { freq: 493.88, dur: 0.5 },  // taa-ke
  { freq: 493.88, dur: 0.45 }, // bai-the
  { freq: 493.88, dur: 0.4 },  // hain
  { freq: 440.00, dur: 0.4 },  // ko-i
  { freq: 392.00, dur: 0.4 },  // i-jaa-
  { freq: 440.00, dur: 0.5 },  // zat
  { freq: 392.00, dur: 0.7 },  // do

  // "Tum hath thaam lena hum sawar jayenge"
  { freq: 293.66, dur: 0.45 }, // Tum
  { freq: 329.63, dur: 0.45 }, // hath
  { freq: 392.00, dur: 0.5 },  // thaam
  { freq: 440.00, dur: 0.5 },  // le-na
  { freq: 493.88, dur: 0.65 }, // hum
  { freq: 440.00, dur: 0.45 }, // sa-war
  { freq: 392.00, dur: 0.5 },  // jaa-
  { freq: 293.66, dur: 1.1 },  // yenge

  // Movement 2: (1:43 - 2:09)
  // "Tumhari mehendi mein chupe hum rahe"
  { freq: 440.00, dur: 0.45 }, // Tum-ha-ri (A4)
  { freq: 493.88, dur: 0.45 }, // me-hen-di (B4)
  { freq: 587.33, dur: 0.6 },  // mein (D5)
  { freq: 587.33, dur: 0.45 }, // chu-pe (D5)
  { freq: 659.25, dur: 0.5 },  // hum (E5)
  { freq: 587.33, dur: 0.45 }, // ra-he (D5)
  { freq: 493.88, dur: 0.5 },  // (B4)
  { freq: 440.00, dur: 0.7 },  // (A4)

  // "Baatein karna humse bin kuch tum kahe"
  { freq: 440.00, dur: 0.45 }, // Baa-tein
  { freq: 493.88, dur: 0.45 }, // kar-na
  { freq: 587.33, dur: 0.5 },  // hum-se
  { freq: 587.33, dur: 0.45 }, // bin
  { freq: 659.25, dur: 0.5 },  // kuch
  { freq: 587.33, dur: 0.45 }, // tum
  { freq: 493.88, dur: 0.8 },  // ka-he

  // "Hum khamoshi padh lenge agar chup tum raho"
  { freq: 493.88, dur: 0.45 }, // Hum
  { freq: 587.33, dur: 0.5 },  // khaa-mo-shi
  { freq: 659.25, dur: 0.55 }, // padh
  { freq: 659.25, dur: 0.5 },  // len-ge
  { freq: 587.33, dur: 0.45 }, // a-gar
  { freq: 493.88, dur: 0.45 }, // chup
  { freq: 440.00, dur: 0.5 },  // tum
  { freq: 392.00, dur: 0.8 },  // ra-ho

  // "Tum aadat bano humari hum bigad jayenge"
  { freq: 293.66, dur: 0.45 }, // Tum
  { freq: 329.63, dur: 0.45 }, // aa-dat
  { freq: 392.00, dur: 0.5 },  // ba-no
  { freq: 440.00, dur: 0.5 },  // hu-maa-ri
  { freq: 493.88, dur: 0.65 }, // hum
  { freq: 440.00, dur: 0.45 }, // bi-gad
  { freq: 392.00, dur: 0.5 },  // jaa-
  { freq: 293.66, dur: 1.2 },  // yenge

  // Movement 3: (2:21 - 3:08)
  // "Kaagzon par sabne apne lafz likhe"
  { freq: 440.00, dur: 0.45 }, // Kaag-zon
  { freq: 493.88, dur: 0.45 }, // par
  { freq: 587.33, dur: 0.5 },  // sab-ne
  { freq: 587.33, dur: 0.45 }, // ap-ne
  { freq: 659.25, dur: 0.55 }, // lafz
  { freq: 587.33, dur: 0.8 },  // li-khe

  // "Humne apne jazbaat saja ke hain rakhe"
  { freq: 440.00, dur: 0.45 }, // Hum-ne
  { freq: 493.88, dur: 0.45 }, // ap-ne
  { freq: 587.33, dur: 0.5 },  // jaz-baat
  { freq: 587.33, dur: 0.45 }, // sa-jaa
  { freq: 659.25, dur: 0.55 }, // ke
  { freq: 587.33, dur: 0.45 }, // hain
  { freq: 493.88, dur: 0.8 },  // ra-khe

  // "Tum aankhon mein dekho humari sab samajh jaaoge"
  { freq: 293.66, dur: 0.45 }, // Tum
  { freq: 329.63, dur: 0.45 }, // aan-khon
  { freq: 392.00, dur: 0.5 },  // mein
  { freq: 440.00, dur: 0.5 },  // de-kho
  { freq: 493.88, dur: 0.65 }, // hu-maa-ri
  { freq: 440.00, dur: 0.45 }, // sab
  { freq: 392.00, dur: 0.5 },  // sa-majh
  { freq: 392.00, dur: 1.3 },  // jaa-o-ge
];

// Generative Bansuri Flute & Acoustic Synthesizer for "Tum Aankhon Se Batana"
export function startAmbientMusic(onStateChange?: (playing: boolean) => void) {
  try {
    const ctx = getAudioContext();
    isAmbientPlaying = true;
    if (onStateChange) onStateChange(true);

    let noteIdx = 0;

    const playNextMelodyNote = () => {
      if (!isAmbientPlaying) return;
      const now = ctx.currentTime;
      const note = tumAankhonNotes[noteIdx % tumAankhonNotes.length];
      noteIdx++;

      // Bansuri / Flute lead oscillator with subtle warm vibrato
      const osc = ctx.createOscillator();
      const oscHarmonic = ctx.createOscillator();
      const gain = ctx.createGain();
      const vibrato = ctx.createOscillator();
      const vibratoGain = ctx.createGain();

      vibrato.frequency.setValueAtTime(5.2, now);
      vibratoGain.gain.setValueAtTime(2.2, now);
      vibrato.connect(vibratoGain);
      vibratoGain.connect(osc.frequency);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(note.freq, now);

      oscHarmonic.type = 'triangle';
      oscHarmonic.frequency.setValueAtTime(note.freq * 2, now);

      const dur = note.dur * 1.15;
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.09, now + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + dur);

      osc.connect(gain);
      oscHarmonic.connect(gain);
      gain.connect(ctx.destination);

      vibrato.start(now);
      osc.start(now);
      oscHarmonic.start(now);

      const stopTime = now + dur + 0.1;
      vibrato.stop(stopTime);
      osc.stop(stopTime);
      oscHarmonic.stop(stopTime);

      // Schedule next note
      const delayMs = note.dur * 1000;
      melodyTimer = window.setTimeout(playNextMelodyNote, delayMs);
    };

    // Start melody sequence
    playNextMelodyNote();

  } catch (e) {
    console.error('Ambient music startup error', e);
  }
}

export function stopAmbientMusic(onStateChange?: (playing: boolean) => void) {
  isAmbientPlaying = false;
  if (ambientInterval !== null) {
    clearInterval(ambientInterval);
    ambientInterval = null;
  }
  if (melodyTimer !== null) {
    clearTimeout(melodyTimer);
    melodyTimer = null;
  }
  if (onStateChange) onStateChange(false);
}

export function toggleAmbientMusic(onStateChange?: (playing: boolean) => void): boolean {
  if (isAmbientPlaying) {
    stopAmbientMusic(onStateChange);
    return false;
  } else {
    startAmbientMusic(onStateChange);
    return true;
  }
}
