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
  ChevronUp,
  RotateCcw,
  ArrowRight,
  Award,
  ThumbsUp,
  Target,
  TrendingUp,
  TrendingDown,
  Minus
} from 'lucide-react';
import { 
  InterviewTurn, 
  InterviewerPersona, 
  RoleSetup, 
  AnswerEvaluation,
} from '../types';
import { AudioWaveform } from './AudioWaveform';
import { InterviewerVideoAvatar } from './InterviewerVideoAvatar';
import { captureVideoFrame } from '../utils/deliveryAnalyzer';
import { subscribeAutoplayBlocked, triggerPendingAutoplay, unlockAudioContext } from '../utils/speechUtils';

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
  evaluation?: AnswerEvaluation;
  onNextQuestion?: () => void;
  onRetryQuestion?: () => void;
  onTakeFollowUp?: (followUpQuestionText: string) => void;
  onFinishEarly?: () => void;
  isLastQuestion?: boolean;
  turns?: InterviewTurn[];
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
  evaluation,
  onNextQuestion,
  onRetryQuestion,
  onTakeFollowUp,
  onFinishEarly,
  isLastQuestion,
  turns,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const chimePlayedRef = useRef<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showCaptions, setShowCaptions] = useState(true);
  const [layoutMode, setLayoutMode] = useState<'pip' | 'grid'>('pip');
  const [showTranscriptInput, setShowTranscriptInput] = useState(true);
  const [isLocalSubmitting, setIsLocalSubmitting] = useState(false);
  const [showScorecardDrawer, setShowScorecardDrawer] = useState(true);
  const [isAudioBlocked, setIsAudioBlocked] = useState(false);

  // Subscribe to browser autoplay blocked alerts
  useEffect(() => {
    const unsub = subscribeAutoplayBlocked((blocked) => {
      setIsAudioBlocked(blocked);
    });
    return unsub;
  }, []);

  // Auto-expand scorecard drawer whenever new evaluation lands
  useEffect(() => {
    if (evaluation) {
      setShowScorecardDrawer(true);
    }
  }, [evaluation]);

  // Reset pacing chime for each new turn
  useEffect(() => {
    chimePlayedRef.current = false;
  }, [currentTurn.id]);

  // Gentle soft chime once candidate hits 150s (2m 30s) to encourage wrapping up with results
  useEffect(() => {
    if (isRecording && durationSeconds >= 150 && !chimePlayedRef.current) {
      chimePlayedRef.current = true;
      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioCtx) {
          const ctx = new AudioCtx();
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
          osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.12); // A5
          gain.gain.setValueAtTime(0.04, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 0.36);
        }
      } catch (e) {}
    }
  }, [isRecording, durationSeconds]);

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
      onClick={() => {
        if (isAudioBlocked) {
          triggerPendingAutoplay();
        }
      }}
      className={`bg-zinc-950 text-white border border-zinc-800 shadow-2xl flex flex-col transition-all duration-300 ${
        isFullscreen 
          ? 'fixed inset-0 z-50 w-screen h-screen rounded-none mb-0 overflow-hidden' 
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

          {/* Dynamic Response Budget & Pacing Indicator */}
          <div className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-md font-mono text-xs transition-colors ${
            durationSeconds > 150 
              ? 'bg-amber-950/80 text-amber-300 border border-amber-600/60 animate-pulse' 
              : durationSeconds >= 90
              ? 'bg-emerald-950/70 text-emerald-300 border border-emerald-600/50'
              : 'bg-zinc-800/80 text-zinc-300'
          }`}>
            <Clock className={`w-3.5 h-3.5 ${durationSeconds > 150 ? 'text-amber-400' : durationSeconds >= 90 ? 'text-emerald-400' : 'text-zinc-400'}`} />
            <span>{formatTimer(durationSeconds)}</span>
            {isRecording && durationSeconds > 150 && (
              <span className="text-[10px] font-sans font-semibold text-amber-200 hidden md:inline ml-1">
                Wrap up soon
              </span>
            )}
            {isRecording && durationSeconds >= 90 && durationSeconds <= 150 && (
              <span className="text-[10px] font-sans font-semibold text-emerald-300 hidden md:inline ml-1">
                Optimal length
              </span>
            )}
          </div>
          <span className="text-[11px] font-semibold text-zinc-400">
            Q {currentTurnIndex + 1} of {totalQuestions}
          </span>
        </div>
      </div>

      {/* Main Conference Stage */}
      <div className={`relative p-2 sm:p-4 flex flex-col justify-center items-center ${
        isFullscreen ? 'flex-1 min-h-0' : 'flex-1'
      }`}>
        {/* Autoplay Blocked Floating Banner */}
        {isAudioBlocked && (
          <div className="absolute top-6 left-1/2 -translate-x-1/2 z-50 animate-bounce">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                triggerPendingAutoplay();
              }}
              className="px-4 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs flex items-center space-x-2 shadow-2xl border-2 border-white/80 cursor-pointer"
              title="Click to unmute and hear interviewer speak"
            >
              <Volume2 className="w-4 h-4 text-zinc-950 animate-pulse" />
              <span>Interviewer Speaking • Click Anywhere to Unmute</span>
            </button>
          </div>
        )}
        {layoutMode === 'pip' ? (
          /* Mode 1: Clean PiP Stage (Interviewer is the full hero; candidate camera in corner) */
          <div className={`relative w-full rounded-2xl bg-zinc-950 border border-zinc-800 overflow-hidden shadow-2xl flex items-center justify-center ${
            isFullscreen ? 'h-full max-h-[calc(100vh-210px)] max-w-7xl mx-auto' : 'aspect-16/10 sm:aspect-16/9 max-h-[68vh]'
          }`}>
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

              {/* PiP Candidate Name Tag with Live Mic Indicator */}
              <div className="absolute bottom-1.5 left-1.5 right-1.5 flex items-center justify-between bg-black/75 backdrop-blur-xs px-2 py-0.5 rounded text-[10px] text-zinc-200 border border-white/5">
                <span className="font-medium truncate">You</span>
                <div className="flex items-center space-x-1">
                  {isRecording ? (
                    <span className="flex items-center space-x-0.5 text-emerald-400 font-mono text-[9px]" title="Microphone Live">
                      <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="flex items-end space-x-0.5 h-2">
                        <span className="w-0.5 bg-emerald-400 rounded-full animate-[bounce_0.8s_infinite_100ms] h-full" />
                        <span className="w-0.5 bg-emerald-400 rounded-full animate-[bounce_0.8s_infinite_300ms] h-2/3" />
                        <span className="w-0.5 bg-emerald-400 rounded-full animate-[bounce_0.8s_infinite_200ms] h-4/5" />
                      </span>
                    </span>
                  ) : (
                    <span className={`w-1.5 h-1.5 rounded-full ${cameraActive ? 'bg-emerald-400' : 'bg-zinc-500'}`} />
                  )}
                </div>
              </div>
            </div>

            {/* Sleek Live Subtitles (CC) Floating Pill at the Bottom Edge */}
            {showCaptions && (
              <div className="absolute bottom-4 left-6 right-44 sm:right-56 z-20 flex justify-center pointer-events-none">
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
          <div className={`w-full grid grid-cols-1 md:grid-cols-2 gap-4 ${
            isFullscreen ? 'h-full max-h-[calc(100vh-210px)] max-w-7xl mx-auto' : 'max-h-[68vh]'
          }`}>
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

              {/* Tag with live mic audio level */}
              <div className="absolute bottom-3 left-3 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-md text-xs text-white border border-white/10 flex items-center space-x-2">
                <span>You (Candidate)</span>
                {isRecording && (
                  <span className="flex items-center space-x-1 text-emerald-400 font-mono text-[10px]" title="Microphone Live">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Mic Live</span>
                    <span className="flex items-end space-x-0.5 h-2.5 ml-0.5">
                      <span className="w-0.5 bg-emerald-400 rounded-full animate-[bounce_0.8s_infinite_100ms] h-full" />
                      <span className="w-0.5 bg-emerald-400 rounded-full animate-[bounce_0.8s_infinite_300ms] h-2/3" />
                      <span className="w-0.5 bg-emerald-400 rounded-full animate-[bounce_0.8s_infinite_200ms] h-4/5" />
                    </span>
                  </span>
                )}
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

        {/* In-Room Live Feedback & Scorecard Overlay (Keeps candidate immersed in video studio) */}
        {evaluation && showScorecardDrawer && (
          <div className="absolute inset-x-2 sm:inset-x-8 bottom-3 sm:bottom-6 z-30 max-h-[75%] overflow-y-auto rounded-2xl bg-zinc-950/95 backdrop-blur-xl border border-zinc-700/80 p-4 sm:p-5 shadow-2xl text-white transition-all animate-in fade-in slide-in-from-bottom-4 duration-300">
            {/* Top Bar with Score, Verdict, and Primary Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-800">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 font-extrabold text-xl shadow-lg shadow-emerald-500/20 shrink-0">
                  {evaluation.overallScore}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">STAR Evaluation</span>
                    <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                      evaluation.verdict === 'Exceptional' || evaluation.verdict === 'Strong'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : evaluation.verdict === 'Competent'
                        ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    }`}>
                      {evaluation.verdict}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-300 mt-0.5 font-medium line-clamp-1">
                    {evaluation.coachAdvice || "Answer analyzed against premier bar-raiser criteria."}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2 shrink-0">
                {onRetryQuestion && (
                  <button
                    type="button"
                    onClick={onRetryQuestion}
                    className="px-2.5 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-medium flex items-center space-x-1 transition-colors cursor-pointer"
                    title="Practice this question again"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Retry</span>
                  </button>
                )}
                {onNextQuestion && (
                  <button
                    type="button"
                    onClick={onNextQuestion}
                    className="px-4 py-1.5 rounded-lg bg-white hover:bg-zinc-200 text-zinc-950 text-xs font-bold flex items-center space-x-1.5 transition-all shadow-md cursor-pointer"
                  >
                    <span>{isLastQuestion ? 'View Final Debrief' : 'Next Question'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setShowScorecardDrawer(false)}
                  className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  title="Minimize scorecard to view video"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Interview Progression & Round Trajectory Track */}
            {turns && turns.length > 1 && (() => {
              const priorTurnIndex = currentTurnIndex > 0 ? currentTurnIndex - 1 : null;
              const priorTurn = priorTurnIndex !== null && turns ? turns[priorTurnIndex] : null;
              const scoreDelta = priorTurn?.evaluation ? evaluation.overallScore - priorTurn.evaluation.overallScore : null;

              return (
                <div className="my-2.5 p-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800 flex flex-col gap-2">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-1.5 font-bold text-zinc-200">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Round Trajectory & Progression</span>
                    </div>
                    {scoreDelta !== null && (
                      <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold flex items-center space-x-1 ${
                        scoreDelta > 0 
                          ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-700/60' 
                          : scoreDelta < 0
                          ? 'bg-amber-950/80 text-amber-300 border border-amber-700/60'
                          : 'bg-zinc-800 text-zinc-300 border border-zinc-700'
                      }`}>
                        {scoreDelta > 0 ? (
                          <>
                            <TrendingUp className="w-3 h-3 text-emerald-400" />
                            <span>+{scoreDelta} pts vs Prior Turn</span>
                          </>
                        ) : scoreDelta < 0 ? (
                          <>
                            <TrendingDown className="w-3 h-3 text-amber-400" />
                            <span>{scoreDelta} pts vs Prior Turn</span>
                          </>
                        ) : (
                          <>
                            <Minus className="w-3 h-3 text-zinc-400" />
                            <span>Even with Prior Turn</span>
                          </>
                        )}
                      </span>
                    )}
                  </div>

                  {/* Horizontal Question Stepper with Scores */}
                  <div className="flex items-center space-x-2 text-[11px] overflow-x-auto py-0.5">
                    {turns.map((t, idx) => {
                      const isCurrent = idx === currentTurnIndex;
                      const score = t.evaluation?.overallScore;
                      return (
                        <div 
                          key={t.id || idx}
                          className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-lg border transition-all ${
                            isCurrent 
                              ? 'bg-zinc-800 border-emerald-500/80 text-white shadow-xs' 
                              : score !== undefined
                              ? 'bg-zinc-900/90 border-zinc-750 text-zinc-300'
                              : 'bg-zinc-950/50 border-zinc-800 text-zinc-500'
                          }`}
                        >
                          <span className="font-semibold text-zinc-400">Q{idx + 1}</span>
                          {score !== undefined ? (
                            <span className={`font-bold ${score >= 80 ? 'text-emerald-400' : score >= 65 ? 'text-blue-400' : 'text-amber-400'}`}>
                              {score}
                            </span>
                          ) : (
                            <span className="text-zinc-600 font-mono">-</span>
                          )}
                          {isCurrent && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />}
                        </div>
                      );
                    })}
                  </div>

                  {/* Progression Insights Details from Gemini (if available) */}
                  {evaluation.progressionInsights && (
                    <div className="text-[11px] text-zinc-300 bg-zinc-950/70 border border-zinc-800/80 rounded-lg p-2 space-y-1">
                      {evaluation.progressionInsights.improvedAreas?.length > 0 && (
                        <div className="flex items-start space-x-1.5">
                          <span className="text-emerald-400 font-semibold shrink-0">✓ Growth Noticed:</span>
                          <span className="text-zinc-300">{evaluation.progressionInsights.improvedAreas.join('; ')}</span>
                        </div>
                      )}
                      {evaluation.progressionInsights.continuityNotes && (
                        <div className="flex items-start space-x-1.5">
                          <span className="text-blue-400 font-semibold shrink-0">ℹ Continuity:</span>
                          <span className="text-zinc-400">{evaluation.progressionInsights.continuityNotes}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })()}

            {/* STAR Pillars Quick Grid */}
            {evaluation.starBreakdown && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 my-3">
                {(['situation', 'task', 'action', 'result'] as const).map((key) => {
                  const pillar = evaluation.starBreakdown[key];
                  const labels = { situation: 'Situation', task: 'Task', action: 'Action', result: 'Result' };
                  return (
                    <div key={key} className="p-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800/80">
                      <div className="flex items-center justify-between text-[11px] font-semibold text-zinc-300">
                        <span>{labels[key]}</span>
                        <span className={pillar.score >= 8 ? 'text-emerald-400 font-bold' : pillar.score >= 6 ? 'text-blue-400 font-bold' : 'text-amber-400 font-bold'}>
                          {pillar.score}/10
                        </span>
                      </div>
                      <p className="text-[10px] text-zinc-400 mt-1 line-clamp-2 leading-tight">
                        {pillar.feedback}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Follow-Up Probe Callout (The signature feature!) */}
            {evaluation.potentialFollowUp && onTakeFollowUp && (
              <div className="my-3 p-3 rounded-xl bg-gradient-to-r from-amber-950/40 via-amber-900/25 to-zinc-900 border border-amber-600/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-inner">
                <div className="flex-1">
                  <div className="flex items-center space-x-1.5 text-amber-300 font-bold text-xs uppercase tracking-wider mb-0.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Interviewer Follow-Up Probe Available</span>
                  </div>
                  <p className="text-xs text-zinc-200 italic">
                    &ldquo;{evaluation.potentialFollowUp}&rdquo;
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onTakeFollowUp(evaluation.potentialFollowUp!)}
                  className="shrink-0 px-3.5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold flex items-center space-x-1.5 shadow-md transition-all cursor-pointer"
                >
                  <span>🎙️ Take Follow-Up Probe</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Strengths & Improvement Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-1">
              {evaluation.strengths && evaluation.strengths.length > 0 && (
                <div className="p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-800">
                  <span className="font-semibold text-emerald-400 block mb-1">Key Strengths</span>
                  <ul className="space-y-1 text-zinc-300 list-disc list-inside text-[11px]">
                    {evaluation.strengths.slice(0, 2).map((s, idx) => (
                      <li key={idx} className="line-clamp-2">{s}</li>
                    ))}
                  </ul>
                </div>
              )}
              {evaluation.areasForImprovement && evaluation.areasForImprovement.length > 0 && (
                <div className="p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-800">
                  <span className="font-semibold text-amber-400 block mb-1">Growth Areas</span>
                  <ul className="space-y-1 text-zinc-300 list-disc list-inside text-[11px]">
                    {evaluation.areasForImprovement.slice(0, 2).map((g, idx) => (
                      <li key={idx} className="line-clamp-2">{g}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Minimized Scorecard Floating Pill */}
        {evaluation && !showScorecardDrawer && (
          <button
            type="button"
            onClick={() => setShowScorecardDrawer(true)}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 px-4 py-2 rounded-full bg-zinc-900/95 hover:bg-zinc-800 border border-zinc-700 backdrop-blur-md text-white text-xs font-semibold flex items-center space-x-2 shadow-2xl cursor-pointer animate-in fade-in"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Score: {evaluation.overallScore}/100 ({evaluation.verdict}) • View Scorecard</span>
            <ChevronUp className="w-4 h-4 text-zinc-400" />
          </button>
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

          {/* Live Response Pacing Visualizer */}
          {isRecording && (
            <div className="mt-2 pt-2 border-t border-zinc-800/60 flex items-center justify-between text-[11px]">
              <div className="flex items-center space-x-2">
                <span className="text-zinc-400">Target: 90s - 150s (~2m)</span>
                <div className="w-24 sm:w-36 h-1.5 bg-zinc-800 rounded-full overflow-hidden flex">
                  <div 
                    className={`h-full transition-all duration-300 ${
                      durationSeconds > 150 
                        ? 'bg-amber-400' 
                        : durationSeconds >= 90 
                        ? 'bg-emerald-400' 
                        : 'bg-blue-400'
                    }`}
                    style={{ width: `${Math.min(100, Math.round((durationSeconds / 150) * 100))}%` }}
                  />
                </div>
              </div>
              <span className={`font-semibold ${
                durationSeconds > 150 
                  ? 'text-amber-400 animate-pulse' 
                  : durationSeconds >= 90 
                  ? 'text-emerald-400' 
                  : 'text-zinc-400'
              }`}>
                {durationSeconds > 150 
                  ? 'Wrap up with results' 
                  : durationSeconds >= 90 
                  ? 'Ideal pacing' 
                  : `${Math.max(0, 90 - durationSeconds)}s to target`}
              </span>
            </div>
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

          {/* Action Area: Submit OR Post-Evaluation Actions */}
          {evaluation ? (
            <div className="flex items-center space-x-2 ml-1">
              {onRetryQuestion && (
                <button
                  type="button"
                  onClick={onRetryQuestion}
                  className="px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer"
                  title="Practice this question again"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retry</span>
                </button>
              )}
              {evaluation.potentialFollowUp && onTakeFollowUp && (
                <button
                  type="button"
                  onClick={() => onTakeFollowUp(evaluation.potentialFollowUp!)}
                  className="px-3.5 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-bold text-xs rounded-xl shadow-lg flex items-center space-x-1.5 transition-all cursor-pointer"
                  title="Answer the interviewer's probing follow-up live"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Take Follow-Up</span>
                </button>
              )}
              {onNextQuestion && (
                <button
                  type="button"
                  onClick={onNextQuestion}
                  className="px-4 sm:px-5 py-2 bg-white hover:bg-zinc-200 text-zinc-950 text-xs sm:text-sm font-bold rounded-xl shadow-lg flex items-center space-x-1.5 transition-all cursor-pointer"
                >
                  <span>{isLastQuestion ? 'View Final Debrief' : 'Next Question'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          ) : (
            /* Submit Answer */
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
          )}
        </div>
      </div>
    </div>
  );
};
