import React, { useState, useEffect } from 'react';
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

export const InterviewerVideoAvatar: React.FC<InterviewerVideoAvatarProps> = ({
  persona,
  isSpeaking,
  isCandidateSpeaking,
  speakingText = '',
  className = '',
}) => {
  const [imageError, setImageError] = useState(false);
  const [articulation, setArticulation] = useState<SpeechArticulationState>({
    isSpeaking: false,
    volume: 0,
    mouthOpening: 0,
    phonemeShape: 'rest',
  });
  const [headTilt, setHeadTilt] = useState(0);
  const [isNodding, setIsNodding] = useState(false);

  // Subscribe to speech audio volume & articulation for soundwave visualizer
  useEffect(() => {
    const unsubscribe = subscribeSpeechArticulation((state) => {
      setArticulation(state);
    });
    return () => unsubscribe();
  }, []);

  // Subtle natural head micro-motion while speaking (-0.8deg to +0.8deg)
  useEffect(() => {
    if (!isSpeaking) {
      setHeadTilt(0);
      return;
    }

    const interval = setInterval(() => {
      setHeadTilt((Math.random() - 0.5) * 1.6);
    }, 700);

    return () => clearInterval(interval);
  }, [isSpeaking]);

  // Attentive nodding when candidate is speaking their response
  useEffect(() => {
    if (!isCandidateSpeaking) {
      setIsNodding(false);
      return;
    }

    let nodInterval: any;
    const scheduleNod = () => {
      const delay = 5000 + Math.random() * 3500;
      nodInterval = setTimeout(() => {
        setIsNodding(true);
        setTimeout(() => {
          setIsNodding(false);
          scheduleNod();
        }, 1200);
      }, delay);
    };

    scheduleNod();
    return () => clearTimeout(nodInterval);
  }, [isCandidateSpeaking]);

  const avatarSrc = persona.avatarUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80';

  return (
    <div className={`relative w-full h-full overflow-hidden select-none bg-zinc-950 ${className}`}>
      {/* High-Definition Interviewer Camera Stage */}
      <div className="absolute inset-0 overflow-hidden flex items-center justify-center">
        {!imageError ? (
          <div
            className="w-full h-full transition-transform duration-700 ease-out origin-center"
            style={{
              transform: `
                rotate(${headTilt}deg) 
                translateY(${isNodding ? '4px' : isSpeaking ? '1px' : '0px'})
                scale(${isSpeaking ? 1.03 : 1.0})
              `,
            }}
          >
            {/* Crisp, clean, unobstructed high-definition portrait */}
            <img
              src={avatarSrc}
              alt={persona.name}
              className={`w-full h-full object-cover object-top sm:object-center transition-all duration-500 ${
                isSpeaking
                  ? 'brightness-105 contrast-102'
                  : isCandidateSpeaking
                  ? 'brightness-100'
                  : 'brightness-95'
              }`}
              onError={() => setImageError(true)}
            />
          </div>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-zinc-800 to-zinc-950 text-white">
            <div className="w-24 h-24 rounded-full bg-zinc-700/80 border-2 border-zinc-600 flex items-center justify-center text-3xl font-bold shadow-xl">
              {persona.name.charAt(0)}
            </div>
            <p className="mt-3 text-sm font-semibold text-zinc-300">{persona.name}</p>
          </div>
        )}

        {/* Studio Lighting & Professional Webcam Soft Vignette */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        {/* Dynamic Speaking / Listening Border Glow */}
        <div
          className={`absolute inset-0 pointer-events-none transition-all duration-500 ${
            isSpeaking
              ? 'ring-2 ring-inset ring-emerald-500/70 shadow-[inset_0_0_40px_rgba(16,185,129,0.2)]'
              : isCandidateSpeaking
              ? 'ring-2 ring-inset ring-blue-500/60 shadow-[inset_0_0_30px_rgba(59,130,246,0.15)]'
              : 'ring-1 ring-inset ring-white/10'
          }`}
        />
      </div>

      {/* Sleek, Unobtrusive Meeting Name Tag in Lower-Left Corner (Zoom/Meet Style) */}
      <div className="absolute bottom-3 left-3 z-10 pointer-events-none">
        <div className="flex items-center space-x-2 bg-black/65 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/15 text-xs text-white shadow-lg">
          <span
            className={`w-2 h-2 rounded-full ${
              isSpeaking
                ? 'bg-emerald-400 animate-pulse'
                : isCandidateSpeaking
                ? 'bg-blue-400'
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
        </div>
      </div>

      {/* Sleek Live Indicator Badge in Upper-Right Corner */}
      <div className="absolute top-3 right-3 z-10 pointer-events-none">
        <div className="flex items-center space-x-1.5 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md border border-white/10 text-[10px] text-zinc-300 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>HD 1080p</span>
        </div>
      </div>
    </div>
  );
};
