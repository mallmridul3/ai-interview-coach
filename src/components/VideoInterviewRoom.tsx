import React, { useState, useEffect, useRef } from 'react';
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Volume2, 
  Square, 
  Send, 
  Clock, 
  Sparkles, 
  HelpCircle, 
  FileEdit, 
  Lightbulb, 
  Eye, 
  UserCheck, 
  Sliders, 
  ShieldCheck, 
  AlertCircle,
  X,
  Maximize2,
  CheckCircle2,
  ScanEye
} from 'lucide-react';
import { 
  InterviewTurn, 
  InterviewerPersona, 
  RoleSetup, 
  TurnClarification, 
  ExecutivePresenceEvaluation 
} from '../types';
import { AudioWaveform } from './AudioWaveform';
import { captureVideoFrame, analyzeSpeechDelivery } from '../utils/deliveryAnalyzer';
import { speakText, stopSpeaking } from '../utils/speechUtils';

interface VideoInterviewRoomProps {
  setup: RoleSetup;
  persona: InterviewerPersona;
  currentTurn: InterviewTurn;
  currentTurnIndex: number;
  totalQuestions: number;
  userAnswer: string;
  onUserAnswerChange: (text: string) => void;
  durationSeconds: number;
  timerActive: boolean;
  isRecording: boolean;
  onToggleRecording: () => void;
  onSubmitAnswer: (snapshotBase64?: string) => Promise<void>;
  isEvaluating: boolean;
  isSpeakingQuestion: boolean;
  onTogglePlayQuestion: () => void;
  onOpenClarification: () => void;
  onOpenScratchpad: () => void;
  onOpenProTips: () => void;
  onOpenVoiceModal: () => void;
  audioStream: MediaStream | null;
  videoStream: MediaStream | null;
  cameraActive: boolean;
  onToggleCamera: () => void;
  speechError?: string | null;
  isTranscribingAudio?: boolean;
}

export const VideoInterviewRoom: React.FC<VideoInterviewRoomProps> = ({
  setup,
  persona,
  currentTurn,
  currentTurnIndex,
  totalQuestions,
  userAnswer,
  onUserAnswerChange,
  durationSeconds,
  isRecording,
  onToggleRecording,
  onSubmitAnswer,
  isEvaluating,
  isSpeakingQuestion,
  onTogglePlayQuestion,
  onOpenClarification,
  onOpenScratchpad,
  onOpenProTips,
  onOpenVoiceModal,
  audioStream,
  videoStream,
  cameraActive,
  onToggleCamera,
  speechError,
  isTranscribingAudio,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [hudFeedback, setHudFeedback] = useState<{
    posture: string;
    eyeContact: string;
    composure: string;
  }>({
    posture: 'Aligned',
    eyeContact: 'Camera Centered',
    composure: 'Composed',
  });

  // Attach video stream to candidate video element
  useEffect(() => {
    if (videoRef.current && videoStream && cameraActive) {
      videoRef.current.srcObject = videoStream;
    }
  }, [videoStream, cameraActive]);

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const words = userAnswer.trim() ? userAnswer.trim().split(/\s+/).filter(Boolean).length : 0;
  const currentWpm = durationSeconds > 0 ? Math.round((words / Math.max(durationSeconds, 1)) * 60) : 0;
  const [isLocalSubmitting, setIsLocalSubmitting] = useState(false);

  const handleSubmit = async () => {
    if ((!userAnswer.trim() && !isRecording) || isEvaluating || isLocalSubmitting || isTranscribingAudio) return;
    setIsLocalSubmitting(true);
    let snapshotBase64: string | undefined = undefined;
    if (videoRef.current && cameraActive) {
      snapshotBase64 = captureVideoFrame(videoRef.current) || undefined;
    }
    try {
      await onSubmitAnswer(snapshotBase64);
    } finally {
      setIsLocalSubmitting(false);
    }
  };

  return (
    <div className="bg-zinc-950 text-white rounded-2xl border border-zinc-800 shadow-2xl overflow-hidden mb-6 flex flex-col">
      {/* Top Video Call Bar */}
      <div className="px-5 py-3 bg-zinc-900/90 border-b border-zinc-800 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-300">
              Live 1-on-1 Call
            </span>
          </div>
          <span className="text-zinc-600">&bull;</span>
          <span className="text-xs text-zinc-400">
            {setup.level} {setup.roleTitle} &bull; {setup.targetCompany}
          </span>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <div className="flex items-center space-x-1.5 px-2.5 py-1 bg-zinc-800/80 rounded-md text-zinc-300 font-mono">
            <Clock className="w-3.5 h-3.5 text-zinc-400" />
            <span>{formatTimer(durationSeconds)}</span>
          </div>
          <span className="text-[11px] font-semibold text-zinc-400">
            Question {currentTurnIndex + 1} of {totalQuestions}
          </span>
        </div>
      </div>

      {/* Main Video Conference Stage */}
      <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
        {/* Tile 1: AI Interviewer Persona */}
        <div className="relative aspect-video sm:aspect-4/3 md:aspect-auto rounded-xl bg-zinc-900 border border-zinc-800 overflow-hidden flex flex-col justify-between p-4 shadow-inner min-h-[260px] sm:min-h-[320px]">
          {/* Top Status */}
          <div className="flex items-center justify-between z-10">
            <div className="flex items-center space-x-2 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 text-xs">
              <span className={`w-2 h-2 rounded-full ${isSpeakingQuestion ? 'bg-emerald-400 animate-ping' : 'bg-zinc-400'}`} />
              <span className="font-semibold text-zinc-200">
                {isSpeakingQuestion ? 'Interviewer Speaking' : 'Listening to You'}
              </span>
            </div>

            <button
              type="button"
              onClick={onTogglePlayQuestion}
              className={`p-2 rounded-lg border text-xs flex items-center space-x-1.5 transition-all cursor-pointer ${
                isSpeakingQuestion
                  ? 'bg-emerald-600 border-emerald-500 text-white shadow-lg'
                  : 'bg-zinc-800/80 border-zinc-700 text-zinc-300 hover:bg-zinc-700'
              }`}
              title={isSpeakingQuestion ? 'Stop speaking' : 'Hear question aloud'}
            >
              {isSpeakingQuestion ? (
                <>
                  <Square className="w-3.5 h-3.5 fill-current" />
                  <span className="text-[11px] font-semibold">Speaking...</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5" />
                  <span className="text-[11px] font-semibold">Repeat Question</span>
                </>
              )}
            </button>
          </div>

          {/* Central Persona Avatar & Waveform */}
          <div className="flex flex-col items-center justify-center my-auto z-10 text-center py-4">
            <div className="relative">
              {isSpeakingQuestion && (
                <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-xl animate-pulse scale-150" />
              )}
              <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-950 border-2 flex items-center justify-center font-bold text-2xl sm:text-3xl text-white shadow-2xl relative transition-transform duration-300 ${
                isSpeakingQuestion ? 'border-emerald-400 scale-105' : 'border-zinc-700'
              }`}>
                {persona.name.charAt(0)}
              </div>
            </div>

            <div className="mt-3">
              <div className="font-bold text-sm sm:text-base text-white">{persona.name}</div>
              <div className="text-xs text-zinc-400">{persona.role} &bull; {persona.companyTag}</div>
            </div>

            {/* Speaking audio wave indicator */}
            {isSpeakingQuestion && (
              <div className="mt-3 flex items-center space-x-1">
                {[1, 2, 3, 4, 5, 4, 3, 2, 1].map((n, i) => (
                  <span
                    key={i}
                    className="w-1 bg-emerald-400 rounded-full animate-bounce"
                    style={{
                      height: `${n * 4 + 4}px`,
                      animationDelay: `${i * 80}ms`,
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Bottom Question Transcript Banner */}
          <div className="z-10 bg-black/80 backdrop-blur-md p-3 rounded-lg border border-white/10 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">
                Question {currentTurnIndex + 1} of {totalQuestions}
              </span>
              {currentTurn.question.adaptiveContext && (
                <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full bg-blue-500/25 text-blue-300 border border-blue-400/40 text-[9px] font-bold shadow-2xs">
                  <Sparkles className="w-2.5 h-2.5 text-blue-300 animate-pulse" />
                  <span>Adaptive Question</span>
                </span>
              )}
            </div>

            {currentTurn.question.adaptiveContext && (
              <p className="text-[10px] text-blue-200/90 font-medium leading-tight">
                💡 {currentTurn.question.adaptiveContext}
              </p>
            )}

            <p className="text-xs sm:text-sm text-zinc-100 font-medium leading-snug line-clamp-3">
              &ldquo;{currentTurn.question.conversationalLeadIn ? `${currentTurn.question.conversationalLeadIn} ` : ''}{currentTurn.question.question}&rdquo;
            </p>
          </div>
        </div>

        {/* Tile 2: Candidate Live Video Stream with AI Posture & Body Language HUD */}
        <div className="relative aspect-video sm:aspect-4/3 md:aspect-auto rounded-xl bg-zinc-900 border border-zinc-800 overflow-hidden flex flex-col justify-between p-4 shadow-inner min-h-[260px] sm:min-h-[320px]">
          {/* Webcam Background or Camera-Off Placeholder */}
          {cameraActive && videoStream ? (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="absolute inset-0 w-full h-full object-cover -scale-x-100"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-950 text-zinc-500">
              <div className="w-16 h-16 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 mb-2 border border-zinc-800">
                <VideoOff className="w-7 h-7" />
              </div>
              <p className="text-xs font-medium">Camera is off</p>
              <button
                type="button"
                onClick={onToggleCamera}
                className="mt-2 px-3 py-1 bg-zinc-800 hover:bg-zinc-700 text-white rounded-md text-xs font-semibold transition-colors cursor-pointer"
              >
                Turn On Camera
              </button>
            </div>
          )}

          {/* Camera Subtle Posture Alignment Guide Lines (when camera active) */}
          {cameraActive && (
            <div className="absolute inset-0 pointer-events-none border border-white/5 m-3 rounded-lg flex items-center justify-center">
              {/* Subtle top third eye-level guide */}
              <div className="absolute top-1/3 left-6 right-6 border-t border-dashed border-white/15" />
              {/* Center line */}
              <div className="absolute top-6 bottom-6 left-1/2 border-l border-dashed border-white/10" />
            </div>
          )}

          {/* Top Video HUD Bar */}
          <div className="flex items-center justify-between z-10">
            <div className="flex items-center space-x-2 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 text-xs">
              <span className={`w-2 h-2 rounded-full ${cameraActive ? 'bg-emerald-400' : 'bg-zinc-500'}`} />
              <span className="font-semibold text-zinc-200">You (Candidate)</span>
            </div>

            {/* AI Body Language Live HUD Badge */}
            {cameraActive && (
              <div className="flex items-center space-x-1.5 bg-black/70 backdrop-blur-md border border-emerald-500/30 px-2.5 py-1 rounded-lg text-[11px] text-emerald-400">
                <ScanEye className="w-3.5 h-3.5 text-emerald-400" />
                <span className="font-semibold hidden sm:inline">AI Posture:</span>
                <span>{hudFeedback.posture}</span>
              </div>
            )}
          </div>

          {/* Bottom Candidate Audio & Live Metrics Bar */}
          <div className="z-10 bg-black/75 backdrop-blur-md p-3 rounded-lg border border-white/10 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center space-x-3">
              {/* Live Audio Waveform */}
              <div className="flex items-center space-x-2">
                <AudioWaveform isRecording={isRecording} stream={audioStream} />
                <span className="text-[11px] text-zinc-300 font-mono">
                  {isRecording ? 'Capturing Voice...' : 'Mic Ready'}
                </span>
              </div>
            </div>

            {/* Live Delivery Metrics */}
            <div className="flex items-center space-x-2 text-[11px] font-mono">
              <span className="text-zinc-400">{words} words</span>
              {currentWpm > 0 && (
                <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                  currentWpm > 165
                    ? 'bg-amber-900/60 text-amber-300'
                    : currentWpm < 105
                    ? 'bg-blue-900/60 text-blue-300'
                    : 'bg-emerald-900/60 text-emerald-300'
                }`}>
                  {currentWpm} WPM
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Answer Speech/Text Preview Tray */}
      <div className="px-4 sm:px-6 pb-2">
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-3">
          {/* Active Error Notice */}
          {speechError && (
            <div className="mb-2.5 p-2.5 bg-amber-950/70 border border-amber-600/40 rounded-lg flex items-center space-x-2 text-xs text-amber-200">
              <AlertCircle className="w-4 h-4 shrink-0 text-amber-400" />
              <span>{speechError}</span>
            </div>
          )}

          {/* AI Transcribing Notice */}
          {isTranscribingAudio && (
            <div className="mb-2.5 p-2.5 bg-blue-950/70 border border-blue-500/40 rounded-lg flex items-center space-x-2 text-xs text-blue-200 animate-pulse">
              <div className="w-3.5 h-3.5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin shrink-0" />
              <span>Transcribing recorded microphone audio with AI...</span>
            </div>
          )}

          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center space-x-2 text-xs text-zinc-400">
              <span className="font-bold text-zinc-300">Your Answer Transcript:</span>
              {isRecording ? (
                <span className="flex items-center space-x-1.5 text-[11px] text-rose-400 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping inline-block" />
                  <span>Recording... Speak clearly into your mic</span>
                </span>
              ) : (
                <span className="text-[11px] text-zinc-400">
                  (Speak into mic or type answer directly)
                </span>
              )}
            </div>
            {userAnswer.length > 0 && (
              <button
                type="button"
                onClick={() => onUserAnswerChange('')}
                className="text-[11px] text-zinc-500 hover:text-zinc-300 underline cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
          <textarea
            rows={3}
            value={userAnswer}
            onChange={(e) => onUserAnswerChange(e.target.value)}
            placeholder={
              isRecording
                ? "Listening... Speak your answer now. Words will appear in real time, and backup audio will transcribe automatically if browser speech is unavailable..."
                : "Your spoken or typed response appears here in real time. Click 'Voice Answer' or type directly..."
            }
            className="w-full bg-zinc-950/80 border border-zinc-800 rounded-lg p-2.5 text-xs text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-600 resize-none font-sans leading-relaxed"
          />
        </div>
      </div>

      {/* Conference Room Control Dock */}
      <div className="px-4 sm:px-6 py-3.5 bg-zinc-900 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-3">
        {/* Left: Device Controls */}
        <div className="flex items-center space-x-2">
          {/* Mic Toggle */}
          <button
            type="button"
            onClick={onToggleRecording}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all cursor-pointer ${
              isRecording
                ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-lg animate-pulse ring-2 ring-rose-400'
                : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200'
            }`}
          >
            {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4 text-emerald-400" />}
            <span>{isRecording ? 'Stop Recording' : 'Voice Answer'}</span>
          </button>

          {/* Camera Toggle */}
          <button
            type="button"
            onClick={onToggleCamera}
            className={`p-2 rounded-xl border text-xs transition-colors cursor-pointer ${
              cameraActive
                ? 'bg-zinc-800 border-zinc-700 text-emerald-400 hover:bg-zinc-700'
                : 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:bg-zinc-700'
            }`}
            title={cameraActive ? 'Turn off camera' : 'Turn on camera'}
          >
            {cameraActive ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
          </button>

          {/* Voice Persona Settings */}
          <button
            type="button"
            onClick={onOpenVoiceModal}
            className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs transition-colors cursor-pointer"
            title="Adjust interviewer voice persona and speed"
          >
            <Sliders className="w-4 h-4" />
          </button>
        </div>

        {/* Center: In-Interview Aids */}
        <div className="flex items-center space-x-1.5">
          {/* Ask Clarification */}
          <button
            type="button"
            onClick={onOpenClarification}
            className="px-3 py-2 bg-zinc-800/90 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer"
            title="Ask clarifying questions to the interviewer before answering"
          >
            <HelpCircle className="w-3.5 h-3.5 text-blue-400" />
            <span>Clarify Scope</span>
          </button>

          {/* Scratchpad */}
          <button
            type="button"
            onClick={onOpenScratchpad}
            className="px-3 py-2 bg-zinc-800/90 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer"
            title="Open scratchpad to outline thoughts before speaking"
          >
            <FileEdit className="w-3.5 h-3.5 text-amber-400" />
            <span>Scratchpad</span>
          </button>

          {/* Pro-Tips Framework */}
          <button
            type="button"
            onClick={onOpenProTips}
            className="px-3 py-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer"
            title="View STAR framework breakdown and starter phrases"
          >
            <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
            <span>Pro-Tip Guide</span>
          </button>
        </div>

        {/* Right: Submit Answer */}
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={(!userAnswer.trim() && !isRecording) || isEvaluating || isLocalSubmitting || isTranscribingAudio}
            className="px-5 py-2.5 bg-white hover:bg-zinc-200 disabled:opacity-40 text-zinc-950 text-xs sm:text-sm font-bold rounded-xl shadow-lg flex items-center space-x-2 transition-all cursor-pointer"
          >
            {isEvaluating || isLocalSubmitting || isTranscribingAudio ? (
              <>
                <div className="w-4 h-4 border-2 border-zinc-950/20 border-t-zinc-950 rounded-full animate-spin" />
                <span>
                  {isTranscribingAudio
                    ? 'Transcribing Voice with AI...'
                    : 'Evaluating STAR & Video Presence...'}
                </span>
              </>
            ) : isRecording ? (
              <>
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Finish & Submit</span>
                <Send className="w-3.5 h-3.5" />
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Submit Response</span>
                <Send className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
