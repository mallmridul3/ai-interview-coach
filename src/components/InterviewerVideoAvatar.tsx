import React, { useState, useEffect, useRef } from 'react';
import { User, Volume2, Mic, Sparkles } from 'lucide-react';
import { InterviewerPersona } from '../types';
import { subscribeSpeechArticulation, SpeechArticulationState } from '../utils/speechUtils';

interface InterviewerVideoAvatarProps {
  persona: InterviewerPersona;
  isSpeaking: boolean;
  isCandidateSpeaking: boolean;
  speakingText?: string;
  className?: string;
}

const PERSONA_CONFIGS: Record<
  string,
  {
    avatarUrl: string;
    mouthPos: { top: string; left: string; width: string; height: string };
    eyePos: { top: string; left: string; width: string };
    skinTone: string;
    lipColor: string;
  }
> = {
  'alex-mentor': {
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80',
    mouthPos: { top: '56%', left: '49.5%', width: '13%', height: '7%' },
    eyePos: { top: '38%', left: '49%', width: '26%' },
    skinTone: '#d99b7b',
    lipColor: '#b86657',
  },
  'morgan-bar-raiser': {
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80',
    mouthPos: { top: '57%', left: '49%', width: '12%', height: '7%' },
    eyePos: { top: '39%', left: '49%', width: '25%' },
    skinTone: '#b57855',
    lipColor: '#8a4038',
  },
  'taylor-exec': {
    avatarUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1200&q=80',
    mouthPos: { top: '56.5%', left: '49.5%', width: '12.5%', height: '7%' },
    eyePos: { top: '38.5%', left: '49%', width: '25%' },
    skinTone: '#caa286',
    lipColor: '#9f5653',
  },
};

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
  const [isBlinking, setIsBlinking] = useState(false);
  const [isNodding, setIsNodding] = useState(false);
  const [headTilt, setHeadTilt] = useState(0);

  const config =
    PERSONA_CONFIGS[persona.id] ||
    PERSONA_CONFIGS['alex-mentor'];

  const avatarSrc = persona.avatarUrl || config.avatarUrl;

  // Subscribe to real-time speech viseme articulation
  useEffect(() => {
    const unsubscribe = subscribeSpeechArticulation((state) => {
      setArticulation(state);
    });
    return () => unsubscribe();
  }, []);

  // Lifelike human eye blinking (every 3.2 to 5.4 seconds naturally)
  useEffect(() => {
    let timeoutId: any;
    const scheduleBlink = () => {
      const delay = 3200 + Math.random() * 2200;
      timeoutId = setTimeout(() => {
        setIsBlinking(true);
        setTimeout(() => {
          setIsBlinking(false);
          scheduleBlink();
        }, 130);
      }, delay);
    };

    scheduleBlink();
    return () => clearTimeout(timeoutId);
  }, []);

  // Subtle natural head movement & speaking emphasis
  useEffect(() => {
    if (!isSpeaking) {
      setHeadTilt(0);
      return;
    }

    const interval = setInterval(() => {
      // Gentle micro-tilt while talking (-1.2deg to +1.2deg)
      setHeadTilt((Math.random() - 0.5) * 2.4);
    }, 600);

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
      const delay = 6000 + Math.random() * 4000;
      nodInterval = setTimeout(() => {
        setIsNodding(true);
        setTimeout(() => {
          setIsNodding(false);
          scheduleNod();
        }, 1400);
      }, delay);
    };

    scheduleNod();
    return () => clearTimeout(nodInterval);
  }, [isCandidateSpeaking]);

  const mouthOpen = isSpeaking ? Math.max(articulation.mouthOpening, 0.2) : 0;
  const mouthScaleY = isSpeaking ? 1 + mouthOpen * 1.6 : 1;
  const mouthScaleX = isSpeaking ? 1 + (articulation.phonemeShape === 'ee' ? 0.25 : articulation.phonemeShape === 'oo' ? -0.2 : 0) : 1;

  return (
    <div className={`relative w-full h-full overflow-hidden select-none bg-zinc-950 ${className}`}>
      {/* Realistic Video Stage Background */}
      <div className="absolute inset-0 overflow-hidden">
        {!imageError ? (
          <div
            className="w-full h-full transition-transform duration-500 ease-out origin-top"
            style={{
              transform: `
                rotate(${headTilt}deg) 
                translateY(${isNodding ? '3px' : isSpeaking ? '1px' : '0px'})
                scale(${isSpeaking ? 1.04 : 1.01})
              `,
            }}
          >
            {/* Base High-Resolution Portrait */}
            <img
              src={avatarSrc}
              alt={persona.name}
              className={`w-full h-full object-cover object-top filter transition-all duration-300 ${
                isSpeaking
                  ? 'brightness-105 contrast-105'
                  : isCandidateSpeaking
                  ? 'brightness-100'
                  : 'brightness-95'
              }`}
              onError={() => setImageError(true)}
            />

            {/* Natural Blinking Eyelid Overlay */}
            {isBlinking && (
              <div
                className="absolute pointer-events-none transition-opacity duration-75"
                style={{
                  top: config.eyePos.top,
                  left: config.eyePos.left,
                  width: config.eyePos.width,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <div className="w-full flex justify-between px-1">
                  <div className="w-5 h-2.5 rounded-b-full bg-black/40 backdrop-blur-2xs border-b border-black/60 shadow-xs" />
                  <div className="w-5 h-2.5 rounded-b-full bg-black/40 backdrop-blur-2xs border-b border-black/60 shadow-xs" />
                </div>
              </div>
            )}

            {/* Realistic Dynamic Lip-Sync Mouth Overlay (Active when speaking) */}
            {isSpeaking && (
              <div
                className="absolute pointer-events-none transition-all duration-75 ease-out"
                style={{
                  top: config.mouthPos.top,
                  left: config.mouthPos.left,
                  width: config.mouthPos.width,
                  height: config.mouthPos.height,
                  transform: `translate(-50%, -50%) scale(${mouthScaleX}, ${mouthScaleY})`,
                }}
              >
                {/* Lip Contour & Realistic Mouth Opening */}
                <div className="relative w-full h-full flex flex-col items-center justify-center">
                  {/* Upper Lip Shadow */}
                  <div 
                    className="w-4/5 h-1.5 rounded-t-full opacity-80"
                    style={{ backgroundColor: config.lipColor }}
                  />

                  {/* Inner Mouth Depth (Teeth & Cavity) */}
                  <div 
                    className="w-3/4 rounded-full bg-zinc-950 flex flex-col items-center justify-between overflow-hidden shadow-inner border border-black/40 transition-all duration-75"
                    style={{ 
                      height: `${Math.max(4, Math.round(mouthOpen * 16))}px`,
                      opacity: Math.min(1, mouthOpen * 1.5),
                    }}
                  >
                    {/* Upper Teeth Highlight */}
                    <div className="w-2/3 h-1 bg-white/80 rounded-b-xs shadow-2xs" />
                    {/* Lower Mouth Shadow */}
                    <div className="w-full flex-1 bg-rose-950/80" />
                  </div>

                  {/* Lower Lip Contour */}
                  <div 
                    className="w-4/5 h-1.5 rounded-b-full opacity-85 shadow-xs"
                    style={{ backgroundColor: config.lipColor }}
                  />
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-zinc-800 to-zinc-950 text-white">
            <div className="w-24 h-24 rounded-full bg-zinc-700/80 border-2 border-zinc-600 flex items-center justify-center text-3xl font-bold shadow-xl">
              {persona.name.charAt(0)}
            </div>
          </div>
        )}

        {/* Video Call Lighting & Edge Softening */}
        <div className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
          isSpeaking
            ? 'bg-gradient-to-t from-black/85 via-black/20 to-black/35 ring-1 ring-inset ring-emerald-500/30'
            : isCandidateSpeaking
            ? 'bg-gradient-to-t from-black/80 via-black/15 to-black/25 ring-1 ring-inset ring-blue-500/20'
            : 'bg-gradient-to-t from-black/80 via-black/20 to-black/30'
        }`} />

        {/* Studio Lighting Radial Falloff */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_50%_35%,transparent_60%,rgba(0,0,0,0.5)_100%)]" />
      </div>

      {/* Top Status Bar Over Video */}
      <div className="relative z-10 p-3 sm:p-4 flex items-center justify-between">
        {/* Dynamic Interviewer State Badge */}
        <div className="flex items-center space-x-2 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-xs shadow-lg">
          <span 
            className={`w-2.5 h-2.5 rounded-full ${
              isSpeaking
                ? 'bg-emerald-400 animate-ping'
                : isCandidateSpeaking
                ? 'bg-blue-400 animate-pulse'
                : 'bg-amber-400'
            }`} 
          />
          <span className="font-semibold text-zinc-100">
            {isSpeaking
              ? 'Speaking Interview Question...'
              : isCandidateSpeaking
              ? 'Actively Listening & Observing...'
              : 'Attentive & Ready'}
          </span>
        </div>

        {/* Video Resolution & Soundwave Badge */}
        <div className="flex items-center space-x-2">
          {isSpeaking && (
            <div className="bg-emerald-950/80 backdrop-blur-md border border-emerald-500/40 px-2.5 py-1 rounded-lg flex items-center space-x-1.5 text-[11px] text-emerald-300 font-medium shadow-md">
              <Volume2 className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>Voice Live</span>
              <div className="flex items-center space-x-0.5 ml-1">
                {[1, 2, 3, 2, 1].map((n, i) => (
                  <span
                    key={i}
                    className="w-0.5 bg-emerald-400 rounded-full animate-bounce"
                    style={{
                      height: `${n * 3 + (articulation.volume * 8)}px`,
                      animationDelay: `${i * 120}ms`,
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          <span className="text-[10px] text-zinc-300 font-mono bg-black/60 backdrop-blur-md px-2 py-1 rounded-md border border-white/10">
            1080p HD
          </span>
        </div>
      </div>

      {/* Center Speaking Voice Indicator Glow (when active) */}
      {isSpeaking && (
        <div className="relative z-10 my-auto flex flex-col items-center justify-center pointer-events-none animate-in fade-in duration-300">
          <div className="bg-black/65 backdrop-blur-md border border-emerald-500/40 px-4 py-1.5 rounded-full flex items-center space-x-2.5 shadow-2xl">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-bold text-emerald-300 tracking-wide">
              Interviewer Speaking
            </span>
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 3, 2, 1].map((h, i) => (
                <span
                  key={i}
                  className="w-1 bg-emerald-400 rounded-full animate-bounce"
                  style={{
                    height: `${h * 3.5 + 3}px`,
                    animationDelay: `${i * 85}ms`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Bottom Nameplate & Feed Tag */}
      <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-10 flex items-center space-x-2 bg-black/75 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-xs shadow-lg">
        <User className="w-3.5 h-3.5 text-zinc-300" />
        <span className="font-bold text-white">{persona.name}</span>
        <span className="text-zinc-400 text-[11px]">&bull; {persona.role}</span>
        {isCandidateSpeaking && (
          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30 ml-1">
            Listening
          </span>
        )}
      </div>
    </div>
  );
};
