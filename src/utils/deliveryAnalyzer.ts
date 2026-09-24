import { DeliveryMetrics } from '../types';

export const COMMON_FILLER_WORDS = [
  'um',
  'uh',
  'like',
  'basically',
  'actually',
  'literally',
  'you know',
  'sort of',
  'kind of',
  'honestly',
];

/**
 * Analyzes candidate spoken answer text for speaking pace (WPM) and filler words.
 */
export function analyzeSpeechDelivery(text: string, durationSeconds: number): DeliveryMetrics {
  const clean = text.trim();
  if (!clean || durationSeconds <= 0) {
    return {
      wpm: 0,
      fillerWordsCount: 0,
      fillerWordsDetected: [],
      pacingVerdict: 'Optimal',
    };
  }

  const words = clean.split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const minutes = Math.max(durationSeconds / 60, 0.1);
  const wpm = Math.round(wordCount / minutes);

  const lowerText = clean.toLowerCase();
  const detected: { word: string; count: number }[] = [];
  let totalFillerCount = 0;

  for (const filler of COMMON_FILLER_WORDS) {
    // Regex matching filler word with word boundaries
    const regex = new RegExp(`\\b${filler}\\b`, 'gi');
    const matches = lowerText.match(regex);
    if (matches && matches.length > 0) {
      detected.push({ word: filler, count: matches.length });
      totalFillerCount += matches.length;
    }
  }

  // Pacing verdict
  let pacingVerdict: 'Too Slow' | 'Optimal' | 'Too Fast' = 'Optimal';
  if (wpm < 105) {
    pacingVerdict = 'Too Slow';
  } else if (wpm > 165) {
    pacingVerdict = 'Too Fast';
  }

  return {
    wpm,
    fillerWordsCount: totalFillerCount,
    fillerWordsDetected: detected.sort((a, b) => b.count - a.count),
    pacingVerdict,
  };
}

/**
 * Captures a crisp, compressed JPEG frame snapshot from an HTMLVideoElement for AI body language analysis.
 */
export function captureVideoFrame(video: HTMLVideoElement): string | null {
  try {
    if (!video || video.readyState < 2 || video.videoWidth === 0) {
      return null;
    }

    const canvas = document.createElement('canvas');
    // Scale down to max 640px width for fast network upload and optimal Gemini Vision speed
    const maxDim = 640;
    let width = video.videoWidth;
    let height = video.videoHeight;

    if (width > maxDim || height > maxDim) {
      if (width > height) {
        height = Math.round((height * maxDim) / width);
        width = maxDim;
      } else {
        width = Math.round((width * maxDim) / height);
        height = maxDim;
      }
    }

    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    // Draw video frame
    ctx.drawImage(video, 0, 0, width, height);
    return canvas.toDataURL('image/jpeg', 0.82);
  } catch (err) {
    console.warn('Failed to capture video frame:', err);
    return null;
  }
}
