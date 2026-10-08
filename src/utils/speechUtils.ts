// High-fidelity Speech synthesis and recognition utilities
// Powered by Gemini TTS with studio-quality human voice inflection + neural browser fallback

export interface AiVoiceOption {
  id: 'Kore' | 'Puck' | 'Charon' | 'Fenrir' | 'Zephyr';
  name: string;
  tone: string;
  description: string;
  gender: 'female' | 'male' | 'neutral';
}

export const AI_VOICES: AiVoiceOption[] = [
  {
    id: 'Puck',
    name: 'Alex Vance (Dynamic Tech Lead)',
    tone: 'US English • Andrew Multilingual (Natural, Conversational)',
    description: 'Authentic conversational dialogue with natural breathing, cadence, and peer engineering warmth',
    gender: 'male',
  },
  {
    id: 'Kore',
    name: 'Morgan Chen (Principal Bar-Raiser)',
    tone: 'US English • Ava Multilingual (Expressive, Articulate)',
    description: 'Exceptionally natural, expressive female interviewer voice with genuine human warmth and clarity',
    gender: 'female',
  },
  {
    id: 'Fenrir',
    name: 'Fenrir (Executive Bar-Raiser)',
    tone: 'US English • Brian Multilingual (Deep, Grounded)',
    description: 'Deep, resonant, authoritative bar-raiser presence for senior leadership and executive mock interviews',
    gender: 'male',
  },
  {
    id: 'Charon',
    name: 'Charon (British System Architect)',
    tone: 'British English • Ryan Neural (Crisp, Analytical)',
    description: 'Distinguished British bar-raiser style with crisp, analytical pauses for system design & scale trade-offs',
    gender: 'male',
  },
  {
    id: 'Zephyr',
    name: 'Taylor Rivera (Executive VP)',
    tone: 'British English • Sonia Neural (Polished Executive)',
    description: 'Polished British executive tone focused on high-level strategic alignment and business leadership',
    gender: 'female',
  },
];

// In-memory cache for synthesized audio data URLs
const audioCache = new Map<string, string>();

// High-performance in-memory cache for pre-decoded Web Audio API AudioBuffers
const audioBufferCache = new Map<string, AudioBuffer>();

// Tracking in-flight pre-fetch promises to avoid redundant network requests and allow fluid awaits
const inFlightFetches = new Map<string, Promise<{ audioUrl: string; buffer?: AudioBuffer } | null>>();

let audioContext: AudioContext | null = null;
let currentSourceNode: AudioBufferSourceNode | null = null;
let currentAudioElement: HTMLAudioElement | null = null;
let activeAbortController: AbortController | null = null;

// Speech Viseme & Articulation for realistic interviewer speaking animation
export interface SpeechArticulationState {
  isSpeaking: boolean;
  volume: number; // 0 to 1
  mouthOpening: number; // 0 to 1
  phonemeShape: 'rest' | 'aa' | 'ee' | 'oo' | 'mm';
}

type ArticulationListener = (state: SpeechArticulationState) => void;
const articulationListeners = new Set<ArticulationListener>();

export function subscribeSpeechArticulation(listener: ArticulationListener): () => void {
  articulationListeners.add(listener);
  return () => {
    articulationListeners.delete(listener);
  };
}

let activeArticulationInterval: any = null;
let activeAnalysisAnimationId: number | null = null;

export function startRealtimeAudioAnalysis(analyser: AnalyserNode) {
  stopRealtimeAudioAnalysis();
  const dataArray = new Uint8Array(analyser.frequencyBinCount);

  const tick = () => {
    analyser.getByteFrequencyData(dataArray);
    let sum = 0;
    for (let i = 0; i < dataArray.length; i++) {
      sum += dataArray[i];
    }
    const avg = sum / dataArray.length;
    // Map raw average (0-128) to normalized volume (0-1)
    const vol = Math.min(1, avg / 45);
    const isActuallyVoicing = vol > 0.04;
    const mouth = isActuallyVoicing ? Math.min(1, vol * 1.5) : 0;
    const shapes: ('aa' | 'ee' | 'oo' | 'mm')[] = ['aa', 'ee', 'oo', 'mm'];
    const shape = isActuallyVoicing ? shapes[Math.floor((vol * 10) % shapes.length)] : 'rest';

    const state: SpeechArticulationState = {
      isSpeaking: isActuallyVoicing,
      volume: vol,
      mouthOpening: mouth,
      phonemeShape: shape,
    };

    articulationListeners.forEach((fn) => {
      try {
        fn(state);
      } catch {}
    });

    activeAnalysisAnimationId = requestAnimationFrame(tick);
  };

  activeAnalysisAnimationId = requestAnimationFrame(tick);
}

export function stopRealtimeAudioAnalysis() {
  if (activeAnalysisAnimationId !== null) {
    cancelAnimationFrame(activeAnalysisAnimationId);
    activeAnalysisAnimationId = null;
  }
  const restState: SpeechArticulationState = {
    isSpeaking: false,
    volume: 0,
    mouthOpening: 0,
    phonemeShape: 'rest',
  };
  articulationListeners.forEach((fn) => {
    try {
      fn(restState);
    } catch {}
  });
}

export function startSpeechArticulationLoop() {
  if (activeArticulationInterval) return;
  let phase = 0;
  activeArticulationInterval = setInterval(() => {
    phase += 0.42;
    // Viseme oscillation mimicking human syllable cadence (4-5 Hz)
    const openAmount = 0.2 + 0.65 * Math.abs(Math.sin(phase) * Math.cos(phase * 0.65));
    const shapes: ('aa' | 'ee' | 'oo' | 'mm')[] = ['aa', 'ee', 'oo', 'mm'];
    const shape = shapes[Math.floor((phase * 1.3) % shapes.length)];
    const state: SpeechArticulationState = {
      isSpeaking: true,
      volume: 0.35 + 0.55 * Math.abs(Math.sin(phase * 1.1)),
      mouthOpening: openAmount,
      phonemeShape: shape,
    };
    articulationListeners.forEach((fn) => {
      try {
        fn(state);
      } catch {}
    });
  }, 45);
}

export function stopSpeechArticulationLoop() {
  stopRealtimeAudioAnalysis();
  if (activeArticulationInterval) {
    clearInterval(activeArticulationInterval);
    activeArticulationInterval = null;
  }
  const restState: SpeechArticulationState = {
    isSpeaking: false,
    volume: 0,
    mouthOpening: 0,
    phonemeShape: 'rest',
  };
  articulationListeners.forEach((fn) => {
    try {
      fn(restState);
    } catch {}
  });
}

export function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioContext) {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioCtx) {
      audioContext = new AudioCtx();
    }
  }
  if (audioContext && audioContext.state === 'suspended') {
    audioContext.resume().catch(() => {});
  }
  return audioContext;
}

export async function decodeAudioDataUrl(dataUrl: string): Promise<AudioBuffer | null> {
  try {
    const ctx = getAudioContext();
    if (!ctx) return null;
    const response = await fetch(dataUrl);
    const arrayBuffer = await response.arrayBuffer();
    return await ctx.decodeAudioData(arrayBuffer);
  } catch {
    return null;
  }
}

function playAudioBuffer(
  buffer: AudioBuffer,
  onEnd?: () => void,
  speed = 1.0,
  onStart?: () => void
): () => void {
  const ctx = getAudioContext();
  if (!ctx) {
    onEnd?.();
    return () => {};
  }

  try {
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.playbackRate.value = speed;

    // Connect to real-time Web Audio AnalyserNode for frame-accurate vocal sync
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 128;
    source.connect(analyser);
    analyser.connect(ctx.destination);
    currentSourceNode = source;

    startRealtimeAudioAnalysis(analyser);

    let ended = false;
    const finish = () => {
      if (ended) return;
      ended = true;
      stopRealtimeAudioAnalysis();
      if (currentSourceNode === source) {
        currentSourceNode = null;
      }
      onEnd?.();
    };

    source.onended = finish;
    source.start(0);

    // Audio has officially begun outputting sound to speakers
    onStart?.();

    return () => {
      ended = true;
      stopRealtimeAudioAnalysis();
      try {
        source.stop();
      } catch {}
      if (currentSourceNode === source) {
        currentSourceNode = null;
      }
    };
  } catch {
    stopRealtimeAudioAnalysis();
    onEnd?.();
    return () => {};
  }
}

function playHtmlAudioUrl(
  audioUrl: string,
  onEnd?: () => void,
  speed = 1.0,
  onStart?: () => void
): () => void {
  try {
    const audio = new Audio(audioUrl);
    currentAudioElement = audio;
    audio.playbackRate = speed;

    let hasStarted = false;
    audio.onplay = () => {
      if (!hasStarted) {
        hasStarted = true;
        onStart?.();
        startSpeechArticulationLoop();
      }
    };

    audio.onended = () => {
      stopSpeechArticulationLoop();
      if (currentAudioElement === audio) {
        currentAudioElement = null;
      }
      onEnd?.();
    };

    audio.onerror = () => {
      stopSpeechArticulationLoop();
      if (currentAudioElement === audio) {
        currentAudioElement = null;
      }
      // If HTMLAudio failed, try decoding to AudioBuffer via Web Audio API
      decodeAudioDataUrl(audioUrl).then((buf) => {
        if (buf) {
          playAudioBuffer(buf, onEnd, speed, onStart);
        } else {
          onEnd?.();
        }
      });
    };

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay blocked on HTMLAudio: try Web Audio API AudioBuffer
        decodeAudioDataUrl(audioUrl).then((buf) => {
          if (buf) {
            playAudioBuffer(buf, onEnd, speed, onStart);
          } else {
            onEnd?.();
          }
        });
      });
    }
  } catch {
    decodeAudioDataUrl(audioUrl).then((buf) => {
      if (buf) {
        playAudioBuffer(buf, onEnd, speed, onStart);
      } else {
        onEnd?.();
      }
    });
  }

  return () => {
    stopSpeechArticulationLoop();
    if (currentAudioElement) {
      try {
        currentAudioElement.pause();
      } catch {}
      currentAudioElement = null;
    }
  };
}

// Module-level cached browser voices to ensure immediate availability
let cachedBrowserVoices: SpeechSynthesisVoice[] = [];

function refreshVoices(): SpeechSynthesisVoice[] {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return [];
  const list = window.speechSynthesis.getVoices();
  if (list && list.length > 0) {
    cachedBrowserVoices = list;
  }
  return cachedBrowserVoices;
}

if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  refreshVoices();
  window.speechSynthesis.onvoiceschanged = () => {
    refreshVoices();
  };
}

export function getSelectedVoiceId(): AiVoiceOption['id'] {
  if (typeof window === 'undefined') return 'Kore';
  const saved = localStorage.getItem('ai_coach_voice_id');
  if (saved && AI_VOICES.some((v) => v.id === saved)) {
    return saved as AiVoiceOption['id'];
  }
  return 'Kore';
}

export function getVoiceForPersonaId(personaId?: string): AiVoiceOption['id'] {
  const isCustomExplicit = typeof window !== 'undefined' && localStorage.getItem('ai_coach_voice_id_explicit') === 'true';
  const customVoice = getSelectedVoiceId();
  if (isCustomExplicit && customVoice) {
    return customVoice;
  }
  if (personaId === 'alex-mentor') return 'Puck';
  if (personaId === 'morgan-bar-raiser') return 'Kore';
  if (personaId === 'taylor-exec') return 'Zephyr';
  return customVoice || 'Kore';
}

/**
 * Pre-fetches and pre-decodes voice audio buffers in memory.
 * When a speaker model like Fenrir is selected, this guarantees
 * immediate, zero-latency playback of the model's voice without
 * falling back to the browser's robotic synthesizer.
 */
export async function prewarmVoiceBuffers(voiceId?: AiVoiceOption['id']): Promise<void> {
  if (typeof window === 'undefined') return;
  const voicesToWarm: AiVoiceOption['id'][] = voiceId
    ? [voiceId]
    : ['Fenrir', 'Kore', 'Puck', 'Charon', 'Zephyr'];

  await Promise.all(
    voicesToWarm.map(async (v) => {
      const sampleKey = `sample:${v}`;
      if (audioBufferCache.has(sampleKey)) return;
      if (inFlightFetches.has(sampleKey)) {
        await inFlightFetches.get(sampleKey);
        return;
      }

      const fetchPromise = (async () => {
        try {
          const res = await fetch(`/api/tts/sample/${v}`);
          if (!res.ok) return null;
          const data = await res.json();
          if (data.audioUrl) {
            audioCache.set(sampleKey, data.audioUrl);
            const buffer = await decodeAudioDataUrl(data.audioUrl);
            if (buffer) {
              audioBufferCache.set(sampleKey, buffer);
            }
            return { audioUrl: data.audioUrl, buffer: buffer || undefined };
          }
        } catch {
          return null;
        } finally {
          inFlightFetches.delete(sampleKey);
        }
        return null;
      })();

      inFlightFetches.set(sampleKey, fetchPromise);
      await fetchPromise;
    })
  );
}

export function setSelectedVoiceId(voiceId: AiVoiceOption['id']): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('ai_coach_voice_id', voiceId);
    localStorage.setItem('ai_coach_voice_id_explicit', 'true');
    // Pre-warm the voice audio buffers immediately for fluid transition
    prewarmVoiceBuffers(voiceId);
  }
}

export function getSpeechSpeed(): number {
  if (typeof window === 'undefined') return 1.0;
  const saved = localStorage.getItem('ai_coach_speech_speed');
  if (saved) {
    const val = parseFloat(saved);
    if (!isNaN(val) && val >= 0.75 && val <= 1.25) return val;
  }
  return 1.0;
}

export function setSpeechSpeed(speed: number): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('ai_coach_speech_speed', speed.toString());
  }
}

/**
 * Persona acoustic and vocal profiles.
 * Pitch is calibrated with noticeable, realistic distinction between personas:
 * Fenrir is a deep, resonant baritone (0.80); Puck is a youthful, energetic tech lead (1.08);
 * Charon is measured British (0.92); Kore is warm & clear (1.06); Zephyr is executive British (0.92).
 */
interface PersonaVocalProfile {
  targetGender: 'male' | 'female' | 'neutral';
  pitch: number;
  rateMultiplier: number;
  namePreferences: string[];
  disallowedPatterns: string[];
}

const BANNED_ROBOTIC_PATTERNS = [
  'espeak', 'robot', 'klatt'
];

const PERSONA_VOCAL_PROFILES: Record<AiVoiceOption['id'], PersonaVocalProfile> = {
  Puck: {
    targetGender: 'male',
    pitch: 1.08,
    rateMultiplier: 1.04,
    namePreferences: [
      'guy', 'ryan', 'natural', 'neural', 'online', 'david', 'mark', 'steffan', 'eric', 'kevin',
      'google uk english male', 'daniel', 'nathan'
    ],
    disallowedPatterns: BANNED_ROBOTIC_PATTERNS,
  },
  Fenrir: {
    targetGender: 'male',
    pitch: 0.80,
    rateMultiplier: 0.88,
    namePreferences: [
      'christopher', 'brian', 'steffan', 'george', 'natural', 'neural', 'online', 'david', 'mark',
      'google uk english male', 'daniel', 'oliver'
    ],
    disallowedPatterns: BANNED_ROBOTIC_PATTERNS,
  },
  Charon: {
    targetGender: 'male',
    pitch: 0.92,
    rateMultiplier: 0.95,
    namePreferences: [
      'ryan', 'daniel', 'oliver', 'george', 'uk english male', 'natural', 'neural', 'online', 'brian'
    ],
    disallowedPatterns: BANNED_ROBOTIC_PATTERNS,
  },
  Kore: {
    targetGender: 'female',
    pitch: 1.06,
    rateMultiplier: 1.00,
    namePreferences: [
      'jenny', 'ava', 'emma', 'google us english', 'natural', 'neural', 'online', 'zira', 'samantha'
    ],
    disallowedPatterns: BANNED_ROBOTIC_PATTERNS,
  },
  Zephyr: {
    targetGender: 'female',
    pitch: 0.92,
    rateMultiplier: 0.92,
    namePreferences: [
      'sonia', 'serena', 'google uk english female', 'michelle', 'aria', 'natural', 'neural', 'online', 'zira'
    ],
    disallowedPatterns: BANNED_ROBOTIC_PATTERNS,
  },
};

/**
 * Multi-factor Voice Scoring Algorithm.
 * Dynamically ranks all available browser voices to select the highest-fidelity,
 * most human-like voice available on the device for the requested persona.
 */
function scoreVoiceForProfile(v: SpeechSynthesisVoice, profile: PersonaVocalProfile): number {
  const name = v.name.toLowerCase();
  const lang = v.lang.toLowerCase();

  // 1. Must be English
  if (!lang.startsWith('en')) {
    return -999999;
  }

  // 2. Reject only broken synthesizers (espeak, klatt, etc.)
  if (profile.disallowedPatterns.some((dis) => name.includes(dis))) {
    return -999999;
  }

  let score = 0;

  // 3. Premium Natural/Neural Voice Tier (+2500 to +5000 pts)
  // Microsoft Edge Online Natural, Apple Enhanced/Premium, Chrome Google Neural
  if (name.includes('natural') || name.includes('online')) {
    score += 5000;
  } else if (name.includes('neural')) {
    score += 4500;
  } else if (name.includes('enhanced') || name.includes('premium')) {
    score += 3500;
  } else if (name.includes('google')) {
    score += 3000;
  }

  // Slight penalty for legacy desktop SAPI voices so cloud neural voices take precedence if available
  if (name.includes('desktop') || name.includes('sapi')) {
    score -= 300;
  }

  // 4. Decisive Target Gender Matching (+4000 pts if matched, -8000 pts if mismatched)
  const isMaleName =
    name.includes('male') ||
    name.includes('guy') ||
    name.includes('ryan') ||
    name.includes('eric') ||
    name.includes('christopher') ||
    name.includes('steffan') ||
    name.includes('daniel') ||
    name.includes('george') ||
    name.includes('brian') ||
    name.includes('oliver') ||
    name.includes('david') ||
    name.includes('mark') ||
    name.includes('kevin') ||
    name.includes('nathan') ||
    name.includes('james');

  const isFemaleName =
    name.includes('female') ||
    name.includes('jenny') ||
    name.includes('aria') ||
    name.includes('samantha') ||
    name.includes('victoria') ||
    name.includes('ava') ||
    name.includes('emma') ||
    name.includes('serena') ||
    name.includes('sonia') ||
    name.includes('zira') ||
    name === 'google us english';

  if (profile.targetGender === 'male') {
    if (isMaleName) score += 4000;
    else if (isFemaleName) score -= 8000;
  } else if (profile.targetGender === 'female') {
    if (isFemaleName) score += 4000;
    else if (isMaleName) score -= 8000;
  }

  // 5. Persona-specific keyword affinity
  for (let i = 0; i < profile.namePreferences.length; i++) {
    const pref = profile.namePreferences[i];
    if (name.includes(pref)) {
      score += (profile.namePreferences.length - i) * 150;
    }
  }

  // 6. Prefer standard en-US or en-GB
  if (lang === 'en-us' || lang === 'en-gb') {
    score += 300;
  }

  // 7. Non-local services are high-fidelity cloud neural voices
  if (!v.localService) {
    score += 800;
  }

  return score;
}

/**
 * Finds and returns the best human voice for a persona
 */
export function getBestVoiceForPersona(voiceId: AiVoiceOption['id']): SpeechSynthesisVoice | null {
  const voices = refreshVoices();
  if (!voices || voices.length === 0) return null;
  const profile = PERSONA_VOCAL_PROFILES[voiceId] || PERSONA_VOCAL_PROFILES.Kore;

  let bestVoice: SpeechSynthesisVoice | null = null;
  let bestScore = -99999;

  for (const v of voices) {
    const s = scoreVoiceForProfile(v, profile);
    if (s > bestScore) {
      bestScore = s;
      bestVoice = v;
    }
  }

  return bestVoice;
}

/**
 * Returns metadata about the currently matched voice for a persona
 */
export function getMatchedVoiceDetails(voiceId: AiVoiceOption['id']): {
  voiceName: string;
  isNeural: boolean;
  personaName: string;
} {
  const voice = getBestVoiceForPersona(voiceId);
  const name = voice?.name || 'Standard Human Synthesis';
  const isNeural =
    name.toLowerCase().includes('natural') ||
    name.toLowerCase().includes('neural') ||
    name.toLowerCase().includes('enhanced') ||
    name.toLowerCase().includes('google') ||
    name.toLowerCase().includes('online');

  return {
    voiceName: name,
    isNeural,
    personaName: voiceId,
  };
}

/**
 * Preload Gemini TTS audio and pre-decode Web Audio buffers in the background
 * so questions play instantaneously on demand with zero latency.
 */
export async function preloadSpeech(
  text: string,
  voiceId?: AiVoiceOption['id']
): Promise<AudioBuffer | null> {
  if (!text || typeof window === 'undefined') return null;
  const voice = voiceId || getSelectedVoiceId();
  const cacheKey = `${voice}:${text.trim()}`;

  // If already decoded in memory, return immediately
  if (audioBufferCache.has(cacheKey)) {
    return audioBufferCache.get(cacheKey)!;
  }

  // If already in flight, await the existing pre-fetch
  if (inFlightFetches.has(cacheKey)) {
    const res = await inFlightFetches.get(cacheKey);
    return res?.buffer || null;
  }

  const fetchPromise = (async () => {
    try {
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, voice }),
      });
      if (!res.ok) return null;
      const data = await res.json();
      if (!data.audioUrl) return null;

      audioCache.set(cacheKey, data.audioUrl);
      const buffer = await decodeAudioDataUrl(data.audioUrl);
      if (buffer) {
        audioBufferCache.set(cacheKey, buffer);
      }
      return { audioUrl: data.audioUrl, buffer: buffer || undefined };
    } catch {
      return null;
    } finally {
      inFlightFetches.delete(cacheKey);
    }
  })();

  inFlightFetches.set(cacheKey, fetchPromise);
  const result = await fetchPromise;
  return result?.buffer || null;
}

/**
 * Play pre-synthesized Gemini studio sample audio for any persona (instant playback, 0 quota, 100% human fidelity)
 */
export function playVoiceSample(
  voiceId: AiVoiceOption['id'],
  onEnd?: () => void,
  speed = 1.0,
  onStart?: () => void
): () => void {
  stopSpeaking();
  let cancelled = false;
  const sampleKey = `sample:${voiceId}`;

  // 1. Instant AudioBuffer playback if pre-warmed in memory
  if (audioBufferCache.has(sampleKey)) {
    return playAudioBuffer(audioBufferCache.get(sampleKey)!, onEnd, speed, onStart);
  }

  // 2. If dataUrl cached, play via HTMLAudio and decode for next time
  if (audioCache.has(sampleKey)) {
    const url = audioCache.get(sampleKey)!;
    decodeAudioDataUrl(url).then((buf) => {
      if (buf) audioBufferCache.set(sampleKey, buf);
    });
    return playHtmlAudioUrl(url, onEnd, speed, onStart);
  }

  // 3. If pre-warm fetch is in-flight, await it smoothly
  if (inFlightFetches.has(sampleKey)) {
    inFlightFetches.get(sampleKey)!.then((res) => {
      if (cancelled) return;
      if (res?.buffer) {
        playAudioBuffer(res.buffer, onEnd, speed, onStart);
      } else if (res?.audioUrl) {
        playHtmlAudioUrl(res.audioUrl, onEnd, speed, onStart);
      } else {
        onEnd?.();
      }
    });

    return () => {
      cancelled = true;
      stopSpeaking();
    };
  }

  // 4. Fetch sample, decode into AudioBuffer, and play
  const fetchPromise = (async () => {
    try {
      const res = await fetch(`/api/tts/sample/${voiceId}`);
      if (!res.ok) throw new Error("Sample fetch failed");
      const data = await res.json();
      if (cancelled) return null;
      if (data.audioUrl) {
        audioCache.set(sampleKey, data.audioUrl);
        const buf = await decodeAudioDataUrl(data.audioUrl);
        if (buf) audioBufferCache.set(sampleKey, buf);
        if (!cancelled) {
          if (buf) {
            playAudioBuffer(buf, onEnd, speed, onStart);
          } else {
            playHtmlAudioUrl(data.audioUrl, onEnd, speed, onStart);
          }
        }
        return { audioUrl: data.audioUrl, buffer: buf || undefined };
      } else {
        throw new Error("No audioUrl");
      }
    } catch {
      if (!cancelled) {
        onEnd?.();
      }
      return null;
    } finally {
      inFlightFetches.delete(sampleKey);
    }
  })();

  inFlightFetches.set(sampleKey, fetchPromise);

  return () => {
    cancelled = true;
    stopSpeaking();
  };
}

/**
 * Persona-specific browser speech fallback.
 * Uses intelligent voice scoring and calibrated acoustics to ensure Fenrir, Puck,
 * Charon, Zephyr, and Kore sound like distinct, natural human interviewers rather
 * than generic robotic synthesizers.
 */
export function ensureVoicesLoaded(): Promise<SpeechSynthesisVoice[]> {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return Promise.resolve([]);
  }
  const current = refreshVoices();
  if (current.length > 0) {
    return Promise.resolve(current);
  }

  return new Promise((resolve) => {
    let resolved = false;
    const finish = () => {
      if (resolved) return;
      resolved = true;
      resolve(refreshVoices());
    };

    window.speechSynthesis.onvoiceschanged = finish;
    setTimeout(finish, 800);
  });
}

// User-gesture global audio unlocker to prevent browser autoplay blocking
if (typeof window !== 'undefined') {
  const unlockAudio = () => {
    try {
      if (audioContext && audioContext.state === 'suspended') {
        audioContext.resume().catch(() => {});
      }
    } catch {}
    window.removeEventListener('click', unlockAudio);
    window.removeEventListener('keydown', unlockAudio);
    window.removeEventListener('touchstart', unlockAudio);
  };
  window.addEventListener('click', unlockAudio, { passive: true });
  window.addEventListener('keydown', unlockAudio, { passive: true });
  window.addEventListener('touchstart', unlockAudio, { passive: true });
}

export function fallbackBrowserSpeech(
  text: string,
  onEnd?: () => void,
  rate = 0.98,
  voiceId: AiVoiceOption['id'] = 'Kore'
): () => void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    onEnd?.();
    return () => {};
  }

  try {
    window.speechSynthesis.cancel();
  } catch (e) {
    // ignore
  }

  // Naturalize technical phrasing and ensure graceful breathing pauses
  const humanizedText = text
    .replace(/([.?!])\s+/g, '$1   ')
    .replace(/,\s+/g, ', ')
    .replace(/\be\.g\.\b/gi, 'for example')
    .replace(/\bi\.e\.\b/gi, 'that is')
    .replace(/\bvs\.\b/gi, 'versus');

  const profile = PERSONA_VOCAL_PROFILES[voiceId] || PERSONA_VOCAL_PROFILES.Kore;
  const isMale = profile.targetGender === 'male';

  const utterance = new SpeechSynthesisUtterance(humanizedText);
  // Human vocal tract calibration:
  // Male interviewers: deep, warm, confident resonance (pitch 0.94, rate 0.96)
  // Female interviewers: clear, articulate, dynamic cadence (pitch 1.02, rate 0.98)
  utterance.pitch = profile.pitch || (isMale ? 0.94 : 1.02);
  utterance.rate = Math.max(0.92, Math.min(1.04, rate || profile.rateMultiplier || (isMale ? 0.96 : 0.98)));

  let isFinished = false;
  const finishOnce = () => {
    if (isFinished) return;
    isFinished = true;
    stopSpeechArticulationLoop();
    onEnd?.();
  };

  utterance.onstart = () => {
    startSpeechArticulationLoop();
  };
  utterance.onend = finishOnce;
  utterance.onerror = finishOnce;

  ensureVoicesLoaded().then(() => {
    if (isFinished) return;
    const matchedVoice = getBestVoiceForPersona(voiceId);
    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }
    try {
      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.warn('SpeechSynthesis error:', err);
      finishOnce();
    }
  });

  return () => {
    isFinished = true;
    try {
      window.speechSynthesis.cancel();
    } catch (e) {
      // ignore
    }
  };
}

/**
 * Preview the selected persona speaking: Plays the authentic Gemini Studio AI voice
 * (Fenrir, Puck, Charon, Zephyr, Kore) so the user experiences the true studio timbre.
 */
export function testPersonaSpeech(
  voiceId: AiVoiceOption['id'],
  onEnd?: () => void,
  speed = 1.0
): () => void {
  return playVoiceSample(voiceId, onEnd, speed);
}

/**
 * Main speech player: Uses high-fidelity Gemini AI TTS with studio human inflection,
 * with pre-fetched audio buffers ensuring fluid voice transitions without falling back
 * to default robotic synthesis when speaker models like Fenrir are selected.
 */
export function speakText(
  text: string,
  onEnd?: () => void,
  options?: { voice?: AiVoiceOption['id']; rate?: number; onStart?: () => void }
): () => void {
  // Stop any existing speech or playback immediately
  stopSpeaking();

  if (!text || typeof window === 'undefined') {
    onEnd?.();
    return () => {};
  }

  const voice = options?.voice || getSelectedVoiceId();
  const speed = options?.rate || getSpeechSpeed();
  const onStart = options?.onStart;
  const cacheKey = `${voice}:${text.trim()}`;

  let cancelled = false;

  // 1. Instant playback from pre-decoded AudioBuffer (zero latency, zero buffering)
  if (audioBufferCache.has(cacheKey)) {
    return playAudioBuffer(audioBufferCache.get(cacheKey)!, onEnd, speed, onStart);
  }

  // 2. Play from cached dataUrl while decoding into AudioBuffer in background
  if (audioCache.has(cacheKey)) {
    const url = audioCache.get(cacheKey)!;
    decodeAudioDataUrl(url).then((buf) => {
      if (buf) audioBufferCache.set(cacheKey, buf);
    });
    return playHtmlAudioUrl(url, onEnd, speed, onStart);
  }

  // 3. If pre-fetch for this question is in-flight, await it for a fluid audio transition
  if (inFlightFetches.has(cacheKey)) {
    inFlightFetches.get(cacheKey)!.then((res) => {
      if (cancelled) return;
      if (res?.buffer) {
        playAudioBuffer(res.buffer, onEnd, speed, onStart);
      } else if (res?.audioUrl) {
        playHtmlAudioUrl(res.audioUrl, onEnd, speed, onStart);
      } else {
        onEnd?.();
      }
    });

    return () => {
      cancelled = true;
      stopSpeaking();
    };
  }

  // 4. Fetch dynamic studio speech from neural backend
  const controller = new AbortController();
  activeAbortController = controller;

  const fetchPromise = (async () => {
    try {
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, voice }),
        signal: controller.signal,
      });

      if (!res.ok) {
        throw new Error(`TTS server response ${res.status}`);
      }
      const data = await res.json();
      if (cancelled) return null;

      if (data.audioUrl) {
        audioCache.set(cacheKey, data.audioUrl);
        const buf = await decodeAudioDataUrl(data.audioUrl);
        if (buf) audioBufferCache.set(cacheKey, buf);

        if (!cancelled) {
          if (buf) {
            playAudioBuffer(buf, onEnd, speed, onStart);
          } else {
            playHtmlAudioUrl(data.audioUrl, onEnd, speed, onStart);
          }
        }
        return { audioUrl: data.audioUrl, buffer: buf || undefined };
      } else {
        onEnd?.();
        return null;
      }
    } catch (err: any) {
      if (err.name === 'AbortError' || cancelled) return null;
      console.warn("TTS fetch error:", err?.message);
      onEnd?.();
      return null;
    } finally {
      inFlightFetches.delete(cacheKey);
      if (activeAbortController === controller) {
        activeAbortController = null;
      }
    }
  })();

  inFlightFetches.set(cacheKey, fetchPromise);

  return () => {
    cancelled = true;
    stopSpeaking();
  };
}

export function stopSpeaking(): void {
  stopSpeechArticulationLoop();
  if (activeAbortController) {
    activeAbortController.abort();
    activeAbortController = null;
  }
  if (currentSourceNode) {
    try {
      currentSourceNode.stop();
    } catch {}
    currentSourceNode = null;
  }
  if (currentAudioElement) {
    try {
      currentAudioElement.pause();
      currentAudioElement.currentTime = 0;
    } catch (e) {
      // ignore
    }
    currentAudioElement = null;
  }
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch (e) {
      // ignore
    }
  }
}

// Automatically pre-warm the active speaker model immediately on startup
if (typeof window !== 'undefined') {
  const currentVoice = getSelectedVoiceId();
  prewarmVoiceBuffers(currentVoice);

  // Pre-warm remaining personas in idle moments
  if ('requestIdleCallback' in window) {
    (window as any).requestIdleCallback(() => {
      prewarmVoiceBuffers();
    });
  } else {
    setTimeout(() => {
      prewarmVoiceBuffers();
    }, 1200);
  }
}

export interface SpeechRecognitionHookResult {
  isSupported: boolean;
}

export function isSpeechRecognitionSupported(): boolean {
  if (typeof window === 'undefined') return false;
  return 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;
}
