import React, { useState, useEffect, useRef } from 'react';
import { Volume2, Mic, User } from 'lucide-react';
import { InterviewerPersona } from '../types';
import { subscribeSpeechArticulation, SpeechArticulationState } from '../utils/speechUtils';

interface InterviewerVideoAvatarProps {
  persona: InterviewerPersona;
  isSpeaking: boolean;
  isCandidateSpeaking: boolean;
  speakingText?: string;
  className?: string;
}

const PERSONA_VIDEOS: Record<string, string> = {
  'alex-mentor': '/videos/interviewer_alex.mp4',
  'morgan-bar-raiser': '/videos/interviewer_morgan.mp4',
  'taylor-exec': '/videos/interviewer_taylor.mp4',
};

export const InterviewerVideoAvatar: React.FC<InterviewerVideoAvatarProps> = ({
  persona,
  isSpeaking,
  isCandidateSpeaking,
  speakingText = '',
  className = '',
}) => {
  const [videoError, setVideoError] = useState(false);
  const [imageError, setImageError] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [articulation, setArticulation] = useState<SpeechArticulationState>({
    isSpeaking: false,
    volume: 0,
    mouthOpening: 0,
    phonemeShape: 'rest',
  });

  // Subscribe to speech audio volume & articulation for soundwave visualizer
  useEffect(() => {
    const unsubscribe = subscribeSpeechArticulation((state) => {
      setArticulation(state);
    });
    return () => unsubscribe();
  }, []);

  const avatarSrc = persona.avatarUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80';
  const videoSrc = PERSONA_VIDEOS[persona.id] || PERSONA_VIDEOS['alex-mentor'];

  // Ensure continuous live playback - never freeze on speech end
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    vid.muted = true;
    const playVideo = () => {
      const p = vid.play();
      if (p !== undefined) {
        p.catch(() => {
          // If browser requires user gesture, unlock on first interaction
          const unlock = () => {
            vid.play().catch(() => {});
            window.removeEventListener('click', unlock);
            window.removeEventListener('keydown', unlock);
          };
          window.addEventListener('click', unlock, { once: true });
          window.addEventListener('keydown', unlock, { once: true });
        });
      }
    };

    playVideo();
  }, [videoSrc]);

  // Modulate video playback rate and presence dynamically based on call state
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    if (isSpeaking) {
      // Sync video start at frame 0 with exact millisecond of audio start
      vid.currentTime = 0;
      vid.playbackRate = 1.0;
      vid.play().catch(() => {});
    } else if (isCandidateSpeaking) {
      vid.playbackRate = 0.95; // Attentive listening cadence
      vid.play().catch(() => {});
    } else {
      vid.playbackRate = 0.88; // Calm ambient presence
      vid.play().catch(() => {});
    }
  }, [isSpeaking, isCandidateSpeaking]);

  // Audio-reactive frame-accurate lip sync:
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid || !isSpeaking) return;

    if (articulation.volume > 0.04) {
      // Audio is actively vocalizing words: play forward
      vid.playbackRate = 1.05;
      if (vid.paused) vid.play().catch(() => {});
    } else {
      // Audio is in a breath or punctuation pause: gentle slow-motion so mouth naturally rests
      vid.playbackRate = 0.25;
    }
  }, [isSpeaking, articulation.volume]);

  return (
    <div className={`relative w-full h-full overflow-hidden select-none bg-zinc-950 ${className}`}>
      {/* Subtle Interviewer Head Nodding Animation during Candidate Responses */}
      <style>{`
        @keyframes interviewerListeningNod {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          15% { transform: translateY(3.5px) rotate(0.35deg); }
          28% { transform: translateY(0px) rotate(0deg); }
          45% { transform: translateY(2.8px) rotate(-0.25deg); }
          58% { transform: translateY(0px) rotate(0deg); }
        }
        .animate-interviewer-nod {
          animation: interviewerListeningNod 4.2s ease-in-out infinite;
        }
      `}</style>

      {/* High-Definition Interviewer Camera Stage */}
      <div className="absolute inset-0 overflow-hidden flex items-center justify-center bg-zinc-950">
        {/* Ambient Blurred Studio Backdrop (Fills widescreen displays seamlessly without harsh black cutoffs) */}
        <div
          className="absolute inset-0 bg-cover bg-center filter blur-3xl opacity-35 scale-125 pointer-events-none transition-all duration-700"
          style={{ backgroundImage: `url(${avatarSrc})` }}
        />

        {/* Studio Vignette / Lighting Gradient */}
        <div className="absolute inset-0 pointer-events-none bg-radial from-transparent via-black/20 to-black/70 z-10" />

        {/* Video / Avatar Container - Full Head & Face 100% in Frame (NEVER cut in half) */}
        {!videoError ? (
          <div className={`relative z-10 w-full h-full flex items-center justify-center transition-transform duration-500 ${
            isCandidateSpeaking ? 'animate-interviewer-nod' : ''
          }`}>
            <video
              ref={videoRef}
              src={videoSrc}
              poster={avatarSrc}
              muted
              playsInline
              loop
              autoPlay
              onEnded={() => {
                if (videoRef.current) {
                  videoRef.current.currentTime = 0;
                  videoRef.current.play().catch(() => {});
                }
              }}
              onError={() => setVideoError(true)}
              className={`max-h-full max-w-full w-auto h-auto object-contain mx-auto transition-all duration-300 drop-shadow-2xl ${
                isSpeaking
                  ? 'brightness-105 contrast-102 scale-[1.01]'
                  : isCandidateSpeaking
                  ? 'brightness-102 contrast-100'
                  : 'brightness-95'
              }`}
            />
          </div>
        ) : !imageError ? (
          <div className={`relative z-10 w-full h-full flex items-center justify-center transition-transform duration-500 ${
            isCandidateSpeaking ? 'animate-interviewer-nod' : ''
          }`}>
            <img
              src={avatarSrc}
              alt={persona.name}
              onError={() => setImageError(true)}
              className={`max-h-full max-w-full w-auto h-auto object-contain mx-auto transition-all duration-300 drop-shadow-2xl ${
                isSpeaking
                  ? 'brightness-105 contrast-102'
                  : isCandidateSpeaking
                  ? 'brightness-100'
                  : 'brightness-95'
              }`}
            />
          </div>
        ) : (
          <div className="relative z-10 flex flex-col items-center justify-center text-white">
            <div className="w-24 h-24 rounded-full bg-zinc-700/80 border-2 border-zinc-600 flex items-center justify-center text-3xl font-bold shadow-xl">
              {persona.name.charAt(0)}
            </div>
            <p className="mt-3 text-sm font-semibold text-zinc-300">{persona.name}</p>
          </div>
        )}

        {/* Dynamic Speaking / Listening Border Glow */}
        <div
          className={`absolute inset-0 pointer-events-none transition-all duration-500 z-10 ${
            isSpeaking
              ? 'ring-2 ring-inset ring-emerald-500/70 shadow-[inset_0_0_40px_rgba(16,185,129,0.2)]'
              : isCandidateSpeaking
              ? 'ring-2 ring-inset ring-blue-500/70 shadow-[inset_0_0_35px_rgba(59,130,246,0.2)]'
              : 'ring-1 ring-inset ring-white/10'
          }`}
        />
      </div>

      {/* Sleek, Unobtrusive Meeting Name Tag in Lower-Left Corner (Zoom/Meet Style) */}
      <div className="absolute bottom-3 left-3 z-20 pointer-events-none">
        <div className="flex items-center space-x-2 bg-black/65 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/15 text-xs text-white shadow-lg">
          <span
            className={`w-2 h-2 rounded-full ${
              isSpeaking
                ? 'bg-emerald-400 animate-pulse'
                : isCandidateSpeaking
                ? 'bg-blue-400 animate-pulse'
                : 'bg-zinc-400'
            }`}
          />
          <span className="font-semibold">{persona.name}</span>
          <span className="text-zinc-400 text-[11px] hidden sm:inline">&bull; {persona.role}</span>

          {/* Soundwave Bars when Speaking */}
          {isSpeaking && (
            <div className="flex items-center space-x-0.5 ml-1.5 pl-1.5 border-l border-white/20">
              {[1, 2, 3, 2, 1].map((n, i) => (
                <span
                  key={i}
                  className="w-0.5 bg-emerald-400 rounded-full animate-bounce"
                  style={{
                    height: `${n * 3 + articulation.volume * 8}px`,
                    animationDelay: `${i * 100}ms`,
                  }}
                />
              ))}
            </div>
          )}

          {/* Responsive Listening Indicator when Candidate Speaks */}
          {isCandidateSpeaking && !isSpeaking && (
            <div className="flex items-center space-x-1 ml-1.5 pl-1.5 border-l border-white/20 text-blue-300 text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping" />
              <span className="font-medium hidden md:inline">Listening &amp; Observing</span>
            </div>
          )}
        </div>
      </div>

      {/* Sleek Live Indicator Badge in Upper-Right Corner */}
      <div className="absolute top-3 right-3 z-20 pointer-events-none">
        <div className="flex items-center space-x-1.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10 text-[10px] text-zinc-300 font-medium">
          <span className={`w-1.5 h-1.5 rounded-full ${isSpeaking ? 'bg-emerald-400 animate-pulse' : isCandidateSpeaking ? 'bg-blue-400' : 'bg-emerald-500'}`} />
          <span>{isSpeaking ? 'Speaking' : isCandidateSpeaking ? 'Attentive' : 'Live HD'}</span>
        </div>
      </div>
    </div>
  );
};
