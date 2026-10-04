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
  Sliders, 
  AlertCircle,
  Maximize2, 
  Minimize2, 
  ScanEye,
  MessageSquare,
  LayoutGrid,
  Pipette,
  CheckCircle2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { 
  InterviewTurn, 
  InterviewerPersona, 
  RoleSetup, 
} from '../types';
import { AudioWaveform } from './AudioWaveform';
import { InterviewerVideoAvatar } from './InterviewerVideoAvatar';
import { captureVideoFrame } from '../utils/deliveryAnalyzer';

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
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showCaptions, setShowCaptions] = useState(true);
  const [layoutMode, setLayoutMode] = useState<'pip' | 'grid'>('pip');
  const [showTranscriptInput, setShowTranscriptInput] = useState(true);
  const [isLocalSubmitting, setIsLocalSubmitting] = useState(false);

  const toggleFullscreen = () => {
    setIsFullscreen((prev) => {
      const next = !prev;
      if (next) {
        if (containerRef.current?.requestFullscreen) {
          containerRef.current.requestFullscreen().catch(() => {});
        }
      } else {
        if (document.fullscreenElement && document.exitFullscreen) {
          document.exitFullscreen().catch(() => {});
        }
      }
      return next;
    });
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setIsFullscreen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsFullscreen(false);
        return;
      }
      if (e.key === 'f' || e.key === 'F') {
        if (document.activeElement?.tagName === 'TEXTAREA' || document.activeElement?.tagName === 'INPUT') {
          return;
        }
        toggleFullscreen();
      }
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

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

  const fullQuestionText = currentTurn.question.conversationalLeadIn
    ? `${currentTurn.question.conversationalLeadIn} ${currentTurn.question.question}`
    : currentTurn.question.question;

  return (
    <div 
      ref={containerRef}
      className={`bg-zinc-950 text-white border border-zinc-800 shadow-2xl flex flex-col transition-all duration-300 ${
        isFullscreen 
          ? 'fixed inset-0 z-50 w-screen h-screen rounded-none mb-0 overflow-y-auto' 
          : 'rounded-2xl mb-6 overflow-hidden'
      }`}
    >
      {/* Top Header Bar */}
      <div className="px-4 sm:px-6 py-2.5 bg-zinc-900/90 border-b border-zinc-800/80 flex items-center justify-between z-20">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-200">
              Live 1-on-1 Call
            </span>
          </div>
          <span className="text-zinc-600 hidden sm:inline">&bull;</span>
          <span className="text-xs text-zinc-400 hidden sm:inline">
            {setup.level} {setup.roleTitle} &bull; {setup.targetCompany}
          </span>
        </div>

        <div className="flex items-center space-x-2.5 text-xs">
          {/* Full Screen Mode Toggle Button */}
          <button
            type="button"
            id="toggle-fullscreen-btn"
            onClick={toggleFullscreen}
            className="px-2.5 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white border border-zinc-700/80 rounded-md transition-all cursor-pointer flex items-center space-x-1.5"
            title={isFullscreen ? 'Exit Fullscreen Mode (Esc or F)' : 'Enter Professional Fullscreen Mode (F)'}
            aria-label={isFullscreen ? 'Exit Full Screen' : 'Full Screen'}
          >
            {isFullscreen ? (
              <>
                <Minimize2 className="w-3.5 h-3.5 text-amber-400" />
                <span className="font-semibold text-[11px]">Exit Fullscreen</span>
              </>
            ) : (
              <>
                <Maximize2 className="w-3.5 h-3.5 text-zinc-400" />
                <span className="font-semibold text-[11px]">Full Screen</span>
              </>
            )}
          </button>

          <div className="flex items-center space-x-1.5 px-2.5 py-1 bg-zinc-800/80 rounded-md text-zinc-300 font-mono">
            <Clock className="w-3.5 h-3.5 text-zinc-400" />
            <span>{formatTimer(durationSeconds)}</span>
          </div>
          <span className="text-[11px] font-semibold text-zinc-400">
            Q {currentTurnIndex + 1} of {totalQuestions}
          </span>
        </div>
      </div>

      {/* Main Conference Stage */}
      <div className={`relative p-3 sm:p-5 flex flex-col justify-center items-center ${
        isFullscreen ? 'flex-1 min-h-[70vh]' : 'flex-1'
      }`}>
        {layoutMode === 'pip' ? (
          /* Mode 1: Clean PiP Stage (Interviewer is the full hero; candidate camera in corner) */
          <div className="relative w-full aspect-16/10 sm:aspect-16/9 max-h-[68vh] rounded-2xl bg-zinc-950 border border-zinc-800 overflow-hidden shadow-2xl flex items-center justify-center">
            {/* Hero Interviewer Video Feed */}
            <InterviewerVideoAvatar
              persona={persona}
              isSpeaking={isSpeakingQuestion}
              isCandidateSpeaking={isRecording}
              speakingText={fullQuestionText}
              className="absolute inset-0 w-full h-full"
            />

            {/* Candidate PiP Floating Window in Lower-Right Corner */}
            <div className="absolute bottom-4 right-4 z-20 w-36 h-28 sm:w-48 sm:h-36 rounded-xl border border-white/20 bg-zinc-900 overflow-hidden shadow-2xl transition-all">
              {cameraActive && videoStream ? (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover -scale-x-100"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-900 text-zinc-500 p-2 text-center">
                  <VideoOff className="w-5 h-5 text-zinc-400 mb-1" />
                  <span className="text-[10px] font-medium text-zinc-400">Camera Off</span>
                </div>
              )}

              {/* PiP Candidate Name Tag */}
              <div className="absolute bottom-1.5 left-1.5 right-1.5 flex items-center justify-between bg-black/70 backdrop-blur-xs px-2 py-0.5 rounded text-[10px] text-zinc-200">
                <span className="font-medium truncate">You</span>
                <span className={`w-1.5 h-1.5 rounded-full ${cameraActive ? 'bg-emerald-400' : 'bg-zinc-500'}`} />
              </div>
            </div>

            {/* Sleek Live Subtitles (CC) Floating Pill at the Bottom Edge */}
            {showCaptions && (
              <div className="absolute bottom-4 left-6 right-44 sm:right-56 z-10 flex justify-center pointer-events-none">
                <div className={`backdrop-blur-md px-4 py-2 sm:px-5 sm:py-2.5 rounded-2xl border max-w-xl text-center shadow-2xl transition-all duration-300 pointer-events-auto ${
                  isSpeakingQuestion 
                    ? 'bg-black/85 border-emerald-500/50 ring-1 ring-emerald-500/40 text-white' 
                    : 'bg-black/75 border-white/15 text-zinc-200'
                }`}>
                  <p className="text-xs sm:text-sm font-medium leading-snug">
                    <span className="text-amber-300 font-bold mr-1.5">Interviewer:</span>
                    <span className={isSpeakingQuestion ? 'text-white font-semibold' : 'text-zinc-200'}>
                      &ldquo;{fullQuestionText}&rdquo;
                    </span>
                  </p>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Mode 2: Clean Side-by-Side Grid Stage */
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[68vh]">
            {/* Interviewer Tile */}
            <div className="relative aspect-video rounded-2xl bg-zinc-950 border border-zinc-800 overflow-hidden shadow-xl">
              <InterviewerVideoAvatar
                persona={persona}
                isSpeaking={isSpeakingQuestion}
                isCandidateSpeaking={isRecording}
                speakingText={fullQuestionText}
                className="w-full h-full"
              />
            </div>

            {/* Candidate Tile */}
            <div className="relative aspect-video rounded-2xl bg-zinc-900 border border-zinc-800 overflow-hidden shadow-xl flex items-center justify-center">
              {cameraActive && videoStream ? (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover -scale-x-100"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-zinc-500">
                  <VideoOff className="w-8 h-8 text-zinc-400 mb-2" />
                  <span className="text-xs font-semibold text-zinc-400">Camera Off</span>
                  <button
                    type="button"
                    onClick={onToggleCamera}
                    className="mt-2 px-3 py-1 bg-zinc-800 hover:bg-zinc-700 text-white rounded-md text-xs font-semibold cursor-pointer"
                  >
                    Turn On Camera
                  </button>
                </div>
              )}

              {/* Tag */}
              <div className="absolute bottom-3 left-3 bg-black/65 backdrop-blur-md px-2.5 py-1 rounded-md text-xs text-white border border-white/10">
                <span>You (Candidate)</span>
              </div>
            </div>

            {/* Subtitles across bottom in grid mode */}
            {showCaptions && (
              <div className="md:col-span-2 flex justify-center mt-1">
                <div className={`backdrop-blur-md px-4 py-2 rounded-xl border max-w-2xl text-center shadow-lg transition-all ${
                  isSpeakingQuestion 
                    ? 'bg-black/85 border-emerald-500/50 text-white' 
                    : 'bg-black/75 border-white/15 text-zinc-200'
                }`}>
                  <p className="text-xs sm:text-sm font-medium">
                    <span className="text-amber-300 font-bold mr-1">Interviewer:</span>
                    &ldquo;{fullQuestionText}&rdquo;
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Answer Transcript & Notes Tray (Collapsible & Compact) */}
      <div className="px-4 sm:px-6 pb-2">
        <div className="bg-zinc-900/90 border border-zinc-800 rounded-xl p-3 shadow-inner">
          {/* Active Error Notice */}
          {speechError && (
            <div className="mb-2 p-2 bg-amber-950/70 border border-amber-600/40 rounded-lg flex items-center space-x-2 text-xs text-amber-200">
              <AlertCircle className="w-4 h-4 shrink-0 text-amber-400" />
              <span>{speechError}</span>
            </div>
          )}

          {/* AI Transcribing Notice */}
          {isTranscribingAudio && (
            <div className="mb-2 p-2 bg-blue-950/70 border border-blue-500/40 rounded-lg flex items-center space-x-2 text-xs text-blue-200 animate-pulse">
              <div className="w-3.5 h-3.5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin shrink-0" />
              <span>Transcribing recorded microphone audio...</span>
            </div>
          )}

          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center space-x-2 text-xs">
              <span className="font-semibold text-zinc-300">Your Answer:</span>
              {isRecording ? (
                <span className="flex items-center space-x-1.5 text-[11px] text-rose-400 font-semibold animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-rose-500 inline-block" />
                  <span>Recording... Speak clearly</span>
                </span>
              ) : (
                <span className="text-[11px] text-zinc-400 font-mono">
                  {words} words {currentWpm > 0 && `• ${currentWpm} WPM`}
                </span>
              )}
            </div>

            <div className="flex items-center space-x-2">
              {userAnswer.length > 0 && (
                <button
                  type="button"
                  onClick={() => onUserAnswerChange('')}
                  className="text-[11px] text-zinc-400 hover:text-zinc-200 underline cursor-pointer"
                >
                  Clear
                </button>
              )}
              <button
                type="button"
                onClick={() => setShowTranscriptInput((prev) => !prev)}
                className="text-zinc-400 hover:text-white p-0.5 cursor-pointer"
                title={showTranscriptInput ? 'Collapse answer box' : 'Expand answer box'}
              >
                {showTranscriptInput ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {showTranscriptInput && (
            <textarea
              rows={2}
              value={userAnswer}
              onChange={(e) => onUserAnswerChange(e.target.value)}
              placeholder={
                isRecording
                  ? "Listening to your microphone... Your answer appears here in real time..."
                  : "Click 'Voice Answer' to speak, or type your answer directly..."
              }
              className="w-full bg-zinc-950/80 border border-zinc-800 rounded-lg p-2.5 text-xs text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-600 resize-none font-sans leading-relaxed"
            />
          )}
        </div>
      </div>

      {/* Streamlined Meeting Dock (Zoom / Google Meet Style) */}
      <div className="px-4 sm:px-6 py-3 bg-zinc-900 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-2.5 z-20">
        {/* Left: AV Controls */}
        <div className="flex items-center space-x-2">
          {/* Voice Answer Mic Toggle */}
          <button
            type="button"
            id="toggle-recording-btn"
            onClick={onToggleRecording}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all cursor-pointer ${
              isRecording
                ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-lg animate-pulse ring-2 ring-rose-400'
                : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200'
            }`}
            title={isRecording ? 'Stop recording microphone' : 'Start speaking response'}
          >
            {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4 text-emerald-400" />}
            <span>{isRecording ? 'Stop Recording' : 'Voice Answer'}</span>
          </button>

          {/* Camera Toggle */}
          <button
            type="button"
            id="toggle-camera-btn"
            onClick={onToggleCamera}
            className={`p-2 rounded-xl border text-xs transition-colors cursor-pointer ${
              cameraActive
                ? 'bg-zinc-800 border-zinc-700 text-emerald-400 hover:bg-zinc-700'
                : 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:bg-zinc-700'
            }`}
            title={cameraActive ? 'Turn off camera' : 'Turn on camera'}
            aria-label="Camera"
          >
            {cameraActive ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
          </button>

          {/* Voice Narration Button */}
          <button
            type="button"
            onClick={onTogglePlayQuestion}
            className={`px-3 py-2 rounded-xl border text-xs flex items-center space-x-1.5 transition-colors cursor-pointer ${
              isSpeakingQuestion
                ? 'bg-emerald-600 border-emerald-500 text-white animate-pulse'
                : 'bg-zinc-800 hover:bg-zinc-700 border-zinc-700 text-zinc-300'
            }`}
            title={isSpeakingQuestion ? 'Stop voice playback' : 'Listen to interviewer read question'}
          >
            {isSpeakingQuestion ? (
              <>
                <Square className="w-3.5 h-3.5 fill-current" />
                <span className="font-semibold text-[11px]">Stop Voice</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                <span className="font-semibold text-[11px]">Speak Question</span>
              </>
            )}
          </button>

          {/* Captions Toggle */}
          <button
            type="button"
            onClick={() => setShowCaptions((prev) => !prev)}
            className={`px-2.5 py-2 rounded-xl border text-xs transition-colors cursor-pointer ${
              showCaptions
                ? 'bg-zinc-800 border-emerald-500/50 text-emerald-400'
                : 'bg-zinc-800/80 border-zinc-700 text-zinc-400'
            }`}
            title={showCaptions ? 'Hide live captions' : 'Show live captions'}
          >
            <span className="font-bold text-[10px]">CC</span>
          </button>

          {/* Layout Mode Toggle (PiP vs Side-by-Side Grid) */}
          <button
            type="button"
            onClick={() => setLayoutMode((prev) => (prev === 'pip' ? 'grid' : 'pip'))}
            className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs border border-zinc-700 transition-colors cursor-pointer hidden xs:flex"
            title={layoutMode === 'pip' ? 'Switch to side-by-side grid view' : 'Switch to focus view (PiP)'}
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
        </div>

        {/* Center/Right: Tools & Submit */}
        <div className="flex items-center space-x-2">
          {/* Clarification */}
          <button
            type="button"
            onClick={onOpenClarification}
            className="px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer"
            title="Ask clarifying questions to the interviewer"
          >
            <HelpCircle className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden md:inline">Clarify Scope</span>
            <span className="md:hidden">Clarify</span>
          </button>

          {/* Scratchpad */}
          <button
            type="button"
            onClick={onOpenScratchpad}
            className="px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer"
            title="Open scratchpad to take notes"
          >
            <FileEdit className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden md:inline">Scratchpad</span>
            <span className="md:hidden">Notes</span>
          </button>

          {/* Pro-Tips */}
          <button
            type="button"
            onClick={onOpenProTips}
            className="px-3 py-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer"
            title="View STAR framework tips"
          >
            <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden md:inline">Pro-Tip Guide</span>
            <span className="md:hidden">Tips</span>
          </button>

          {/* Voice Settings */}
          <button
            type="button"
            onClick={onOpenVoiceModal}
            className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs border border-zinc-700 transition-colors cursor-pointer"
            title="Adjust interviewer voice settings"
          >
            <Sliders className="w-4 h-4" />
          </button>

          {/* Submit Answer */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={(!userAnswer.trim() && !isRecording) || isEvaluating || isLocalSubmitting || isTranscribingAudio}
            className="px-4 sm:px-5 py-2 bg-white hover:bg-zinc-200 disabled:opacity-40 text-zinc-950 text-xs sm:text-sm font-bold rounded-xl shadow-lg flex items-center space-x-1.5 transition-all cursor-pointer ml-1"
          >
            {isEvaluating || isLocalSubmitting || isTranscribingAudio ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin" />
                <span>Evaluating...</span>
              </>
            ) : (
              <>
                <span>Submit Answer</span>
                <Send className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
