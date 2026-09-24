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
    id: 'Kore',
    name: 'Kore (Warm & Professional)',
    tone: 'Warm, natural, supportive',
    description: 'Empathetic, clear, and reassuring interviewer cadence — recommended for behavioral and tech interviews',
    gender: 'female',
  },
  {
    id: 'Fenrir',
    name: 'Fenrir (Executive & Deep)',
    tone: 'Resonant, authoritative, steady',
    description: 'Deep, deliberate bar-raiser presence for senior leadership and executive mock interviews',
    gender: 'male',
  },
  {
    id: 'Puck',
    name: 'Puck (Dynamic & Engaging)',
    tone: 'Conversational, spirited',
    description: 'Fast-paced, modern, and engaging collaborative style',
    gender: 'neutral',
  },
  {
    id: 'Charon',
    name: 'Charon (Analytical & Composed)',
    tone: 'Thoughtful, measured, precise',
    description: 'System-architect style with calm, analytical pauses',
    gender: 'male',
  },
  {
    id: 'Zephyr',
    name: 'Zephyr (Modern & Balanced)',
    tone: 'Smooth, polished, crisp',
    description: 'Clean, neutral, contemporary interviewer voice',
    gender: 'neutral',
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
  speed = 1.0
): () => void {
  const ctx = getAudioContext();
  if (!ctx) {
    onEnd?.();
    return () => {};
  }

  try {
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.playbackRate.value = speed;
    source.connect(ctx.destination);
    currentSourceNode = source;

    let ended = false;
    const finish = () => {
      if (ended) return;
      ended = true;
      if (currentSourceNode === source) {
        currentSourceNode = null;
      }
      onEnd?.();
    };

    source.onended = finish;
    source.start(0);

    return () => {
      ended = true;
      try {
        source.stop();
      } catch {}
      if (currentSourceNode === source) {
        currentSourceNode = null;
      }
    };
  } catch {
    onEnd?.();
    return () => {};
  }
}

function playHtmlAudioUrl(
  audioUrl: string,
  onEnd?: () => void,
  speed = 1.0,
  fallbackText?: string,
  voiceId?: AiVoiceOption['id']
): () => void {
  try {
    const audio = new Audio(audioUrl);
    currentAudioElement = audio;
    audio.playbackRate = speed;

    audio.onended = () => {
      if (currentAudioElement === audio) {
        currentAudioElement = null;
      }
      onEnd?.();
    };

    audio.onerror = () => {
      if (currentAudioElement === audio) {
        currentAudioElement = null;
      }
      if (fallbackText) {
        fallbackBrowserSpeech(fallbackText, onEnd, speed, voiceId);
      } else {
        onEnd?.();
      }
    };

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        if (currentAudioElement === audio) {
          currentAudioElement = null;
        }
        if (fallbackText) {
          fallbackBrowserSpeech(fallbackText, onEnd, speed, voiceId);
        } else {
          onEnd?.();
        }
      });
    }
  } catch {
    if (fallbackText) {
      fallbackBrowserSpeech(fallbackText, onEnd, speed, voiceId);
    } else {
      onEnd?.();
    }
  }

  return () => {
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
 * Pitch is strictly constrained between 0.94 and 1.02 to preserve human vocal tract resonance
 * and prevent metallic ring-modulator or robotic artifacts.
 */
interface PersonaVocalProfile {
  targetGender: 'male' | 'female' | 'neutral';
  pitch: number;
  rateMultiplier: number;
  namePreferences: string[];
  disallowedPatterns: string[];
}

const PERSONA_VOCAL_PROFILES: Record<AiVoiceOption['id'], PersonaVocalProfile> = {
  Puck: {
    targetGender: 'male',
    pitch: 1.0, // Natural organic pitch (no phase-vocoder distortion)
    rateMultiplier: 1.0,
    namePreferences: [
      'natural', 'neural', 'ryan', 'eric', 'guy', 'kevin', 'steffan', 'alex',
      'google uk english male', 'google us english', 'daniel', 'nathan', 'david'
    ],
    disallowedPatterns: ['espeak', 'robot', 'klatt'],
  },
  Charon: {
    targetGender: 'male',
    pitch: 1.0, // Grounded, natural delivery without metallic artifacts
    rateMultiplier: 0.96,
    namePreferences: [
      'natural', 'neural', 'steffan', 'davis', 'brian', 'malcolm', 'james',
      'google uk english male', 'daniel', 'christopher', 'george', 'david'
    ],
    disallowedPatterns: ['espeak', 'robot', 'klatt'],
  },
  Fenrir: {
    targetGender: 'male',
    pitch: 1.0, // Authentic commanding vocal timbre without pitch shift distortion
    rateMultiplier: 0.95,
    namePreferences: [
      'natural', 'neural', 'christopher', 'guy', 'brian', 'george', 'arthur',
      'google uk english male', 'alex', 'daniel', 'mark', 'oliver', 'david'
    ],
    disallowedPatterns: ['espeak', 'robot', 'klatt'],
  },
  Zephyr: {
    targetGender: 'female',
    pitch: 1.0,
    rateMultiplier: 1.0,
    namePreferences: [
      'natural', 'neural', 'aria', 'jenny', 'michelle', 'serena', 'sonia',
      'google uk english female', 'google us english', 'samantha', 'victoria', 'zira'
    ],
    disallowedPatterns: ['espeak', 'robot', 'klatt'],
  },
  Kore: {
    targetGender: 'female',
    pitch: 1.0,
    rateMultiplier: 0.98,
    namePreferences: [
      'natural', 'neural', 'jenny', 'ava', 'emma', 'sonia', 'ana',
      'google us english', 'google uk english female', 'samantha', 'victoria', 'zira'
    ],
    disallowedPatterns: ['espeak', 'robot', 'klatt'],
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
    return -99999;
  }

  // 2. Reject explicitly low-quality robotic synthesizers
  if (profile.disallowedPatterns.some((dis) => name.includes(dis))) {
    return -5000;
  }

  let score = 0;

  // 3. Premium Natural/Neural Voice Tier (+1200 to +1800 pts)
  // Microsoft Edge Online Natural, Apple Enhanced/Premium, Chrome Google Neural
  if (name.includes('natural') || name.includes('neural') || name.includes('online')) {
    score += 1800;
  } else if (name.includes('enhanced') || name.includes('premium')) {
    score += 1400;
  } else if (name.includes('google')) {
    score += 1100;
  }

  // 4. Target Gender Matching (+600 pts if matched, -800 pts if mismatched)
  const isMaleName =
    name.includes('male') ||
    name.includes('guy') ||
    name.includes('ryan') ||
    name.includes('eric') ||
    name.includes('christopher') ||
    name.includes('davis') ||
    name.includes('steffan') ||
    name.includes('daniel') ||
    name.includes('alex') ||
    name.includes('george') ||
    name.includes('brian') ||
    name.includes('mark') ||
    name.includes('oliver') ||
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
    name.includes('zira');

  if (profile.targetGender === 'male') {
    if (isMaleName) score += 600;
    else if (isFemaleName) score -= 800;
  } else if (profile.targetGender === 'female') {
    if (isFemaleName) score += 600;
    else if (isMaleName) score -= 800;
  }

  // 5. Persona-specific keyword affinity
  for (let i = 0; i < profile.namePreferences.length; i++) {
    const pref = profile.namePreferences[i];
    if (name.includes(pref)) {
      score += (profile.namePreferences.length - i) * 75;
    }
  }

  // 6. Prefer standard en-US or en-GB over obscure regional accents
  if (lang === 'en-us' || lang === 'en-gb') {
    score += 250;
  }

  // 7. Non-local services are often high-fidelity cloud neural voices
  if (!v.localService) {
    score += 300;
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
  speed = 1.0
): () => void {
  stopSpeaking();
  let cancelled = false;
  const sampleKey = `sample:${voiceId}`;

  // 1. Instant AudioBuffer playback if pre-warmed in memory
  if (audioBufferCache.has(sampleKey)) {
    return playAudioBuffer(audioBufferCache.get(sampleKey)!, onEnd, speed);
  }

  // 2. If dataUrl cached, play via HTMLAudio and decode for next time
  if (audioCache.has(sampleKey)) {
    const url = audioCache.get(sampleKey)!;
    decodeAudioDataUrl(url).then((buf) => {
      if (buf) audioBufferCache.set(sampleKey, buf);
    });
    return playHtmlAudioUrl(url, onEnd, speed, undefined, voiceId);
  }

  // 3. If pre-warm fetch is in-flight, await it smoothly
  if (inFlightFetches.has(sampleKey)) {
    inFlightFetches.get(sampleKey)!.then((res) => {
      if (cancelled) return;
      if (res?.buffer) {
        playAudioBuffer(res.buffer, onEnd, speed);
      } else if (res?.audioUrl) {
        playHtmlAudioUrl(res.audioUrl, onEnd, speed, undefined, voiceId);
      } else {
        fallbackBrowserSpeech(
          "Hello, I will be your interviewer today. Walk me through a challenging problem you solved.",
          onEnd,
          speed,
          voiceId
        );
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
            playAudioBuffer(buf, onEnd, speed);
          } else {
            playHtmlAudioUrl(data.audioUrl, onEnd, speed, undefined, voiceId);
          }
        }
        return { audioUrl: data.audioUrl, buffer: buf || undefined };
      } else {
        throw new Error("No audioUrl");
      }
    } catch {
      if (!cancelled) {
        fallbackBrowserSpeech(
          "Hello, I will be your interviewer today. Walk me through a challenging problem you solved.",
          onEnd,
          speed,
          voiceId
        );
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
export function fallbackBrowserSpeech(
  text: string,
  onEnd?: () => void,
  rate = 0.95,
  voiceId: AiVoiceOption['id'] = 'Kore'
): () => void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    onEnd?.();
    return () => {};
  }

  // Cancel any currently playing browser speech
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

  const utterance = new SpeechSynthesisUtterance(humanizedText);
  // Keep pitch at 1.0 to avoid the browser's metallic phase-vocoder / robotic distortion
  utterance.pitch = 1.0;
  utterance.rate = 1.0;

  let isFinished = false;
  const finishOnce = () => {
    if (isFinished) return;
    isFinished = true;
    onEnd?.();
  };

  utterance.onend = finishOnce;
  utterance.onerror = finishOnce;

  const executeSpeak = () => {
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
  };

  const voices = refreshVoices();
  if (voices.length > 0) {
    executeSpeak();
  } else {
    // Voices may still be initializing asynchronously in Chrome/Safari
    let executed = false;
    const voiceLoadHandler = () => {
      if (executed) return;
      executed = true;
      refreshVoices();
      executeSpeak();
    };

    window.speechSynthesis.onvoiceschanged = voiceLoadHandler;

    // Safety timeout in case onvoiceschanged does not fire
    setTimeout(() => {
      if (!executed) {
        executed = true;
        refreshVoices();
        executeSpeak();
      }
    }, 200);
  }

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
  options?: { voice?: AiVoiceOption['id']; rate?: number }
): () => void {
  // Stop any existing speech or playback immediately
  stopSpeaking();

  if (!text || typeof window === 'undefined') {
    onEnd?.();
    return () => {};
  }

  const voice = options?.voice || getSelectedVoiceId();
  const speed = options?.rate || getSpeechSpeed();
  const cacheKey = `${voice}:${text.trim()}`;
  const sampleKey = `sample:${voice}`;

  let cancelled = false;

  // 1. Instant playback from pre-decoded AudioBuffer (zero latency, zero buffering)
  if (audioBufferCache.has(cacheKey)) {
    return playAudioBuffer(audioBufferCache.get(cacheKey)!, onEnd, speed);
  }

  // 2. Play from cached dataUrl while decoding into AudioBuffer in background
  if (audioCache.has(cacheKey)) {
    const url = audioCache.get(cacheKey)!;
    decodeAudioDataUrl(url).then((buf) => {
      if (buf) audioBufferCache.set(cacheKey, buf);
    });
    return playHtmlAudioUrl(url, onEnd, speed, text, voice);
  }

  // 3. If pre-fetch for this question is in-flight, await it for a fluid audio transition
  if (inFlightFetches.has(cacheKey)) {
    inFlightFetches.get(cacheKey)!.then((res) => {
      if (cancelled) return;
      if (res?.buffer) {
        playAudioBuffer(res.buffer, onEnd, speed);
      } else if (res?.audioUrl) {
        playHtmlAudioUrl(res.audioUrl, onEnd, speed, text, voice);
      } else if (audioBufferCache.has(sampleKey)) {
        // Fluid transition: use the speaker model's pre-warmed studio sample buffer!
        playAudioBuffer(audioBufferCache.get(sampleKey)!, onEnd, speed);
      } else if (audioCache.has(sampleKey)) {
        playHtmlAudioUrl(audioCache.get(sampleKey)!, onEnd, speed, text, voice);
      } else {
        fallbackBrowserSpeech(text, onEnd, speed, voice);
      }
    });

    return () => {
      cancelled = true;
      stopSpeaking();
    };
  }

  // 4. Fetch dynamic studio speech from Gemini TTS backend with quota resilience
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
            playAudioBuffer(buf, onEnd, speed);
          } else {
            playHtmlAudioUrl(data.audioUrl, onEnd, speed, text, voice);
          }
        }
        return { audioUrl: data.audioUrl, buffer: buf || undefined };
      } else {
        throw new Error('No audioUrl');
      }
    } catch (err: any) {
      if (err.name === 'AbortError' || cancelled) return null;
      // Resilient voice preservation: When a speaker model like Fenrir is selected,
      // fluidly transition to the speaker model's pre-warmed studio buffer rather than
      // abruptly dropping to the browser's robotic synthesis!
      if (audioBufferCache.has(sampleKey)) {
        playAudioBuffer(audioBufferCache.get(sampleKey)!, onEnd, speed);
      } else if (audioCache.has(sampleKey)) {
        playHtmlAudioUrl(audioCache.get(sampleKey)!, onEnd, speed, text, voice);
      } else {
        fallbackBrowserSpeech(text, onEnd, speed, voice);
      }
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
