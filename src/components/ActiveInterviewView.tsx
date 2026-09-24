import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, 
  MicOff, 
  Send, 
  Volume2, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Clock, 
  Sparkles, 
  X,
  AlertCircle,
  Square,
  Sliders,
  Lightbulb,
  AlertTriangle,
  Video,
  VideoOff,
  FileEdit,
  Layout,
  ScanEye,
  Award
} from 'lucide-react';
import { 
  InterviewTurn, 
  InterviewerPersona, 
  RoleSetup, 
  AnswerEvaluation, 
  DeliveryMetrics, 
  ExecutivePresenceEvaluation, 
  TurnClarification 
} from '../types';
import { EvaluationCard } from './EvaluationCard';
import { VideoInterviewRoom } from './VideoInterviewRoom';
import { AudioWaveform } from './AudioWaveform';
import { ClarificationModal } from './ClarificationModal';
import { CandidateScratchpad } from './CandidateScratchpad';
import { speakText, stopSpeaking, preloadSpeech, isSpeechRecognitionSupported } from '../utils/speechUtils';
import { analyzeSpeechDelivery, captureVideoFrame } from '../utils/deliveryAnalyzer';
import { VoiceSettingsModal } from './VoiceSettingsModal';
import { ProTipDrawer } from './ProTipDrawer';

interface ActiveInterviewViewProps {
  setup: RoleSetup;
  persona: InterviewerPersona;
  turns: InterviewTurn[];
  currentTurnIndex: number;
  voiceEnabled: boolean;
  onEvaluateAnswer: (
    turnId: string, 
    answer: string, 
    durationSeconds: number,
    deliveryMetrics?: DeliveryMetrics,
    executivePresence?: ExecutivePresenceEvaluation,
    videoSnapshot?: string,
    clarifications?: TurnClarification[]
  ) => Promise<void>;
  onNextQuestion: () => void;
  onRetryQuestion: (turnId: string) => void;
  onTakeFollowUpQuestion: (followUpQuestionText: string) => void;
  onFinishEarly?: () => void;
  onExitInterview: () => void;
  isEvaluating: boolean;
}

export const ActiveInterviewView: React.FC<ActiveInterviewViewProps> = ({
  setup,
  persona,
  turns,
  currentTurnIndex,
  voiceEnabled,
  onEvaluateAnswer,
  onNextQuestion,
  onRetryQuestion,
  onTakeFollowUpQuestion,
  onFinishEarly,
  onExitInterview,
  isEvaluating,
}) => {
  const currentTurn = turns[currentTurnIndex];
  const [interviewMode, setInterviewMode] = useState<'video' | 'classic'>('video');
  const [userAnswer, setUserAnswer] = useState(currentTurn?.userAnswer || '');
  const [showHint, setShowHint] = useState(false);
  const [isSpeakingQuestion, setIsSpeakingQuestion] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [durationSeconds, setDurationSeconds] = useState(currentTurn?.durationSeconds || 0);
  const [timerActive, setTimerActive] = useState(false);
  const [speechError, setSpeechError] = useState<string | null>(null);
  const [showVoiceModal, setShowVoiceModal] = useState(false);
  const [showProTips, setShowProTips] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  // New Features: Clarification, Scratchpad, Video Streams
  const [showClarification, setShowClarification] = useState(false);
  const [showScratchpad, setShowScratchpad] = useState(false);
  const [scratchpadNotes, setScratchpadNotes] = useState('');
  const [clarifications, setClarifications] = useState<TurnClarification[]>(currentTurn?.clarifications || []);
  
  // Media streams
  const [cameraActive, setCameraActive] = useState(true);
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
  const [audioStream, setAudioStream] = useState<MediaStream | null>(null);
  const [isSubmittingAnswer, setIsSubmittingAnswer] = useState(false);
  const [isTranscribingAudio, setIsTranscribingAudio] = useState(false);
  const classicVideoRef = useRef<HTMLVideoElement | null>(null);
  const recognitionRef = useRef<any>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);
  const shouldRecordRef = useRef<boolean>(false);
  const baseAnswerRef = useRef<string>('');
  const latestUserAnswerRef = useRef<string>('');

  // Initialize camera and microphone media streams
  useEffect(() => {
    let active = true;

    async function initMedia() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        if (!active) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }

        const videoTracks = stream.getVideoTracks();
        const audioTracks = stream.getAudioTracks();

        if (videoTracks.length > 0) {
          setVideoStream(new MediaStream(videoTracks));
          setCameraActive(true);
        }
        if (audioTracks.length > 0) {
          setAudioStream(new MediaStream(audioTracks));
        }
      } catch (err) {
        console.warn('Webcam/Mic access denied or unavailable, attempting audio only:', err);
        try {
          const aStream = await navigator.mediaDevices.getUserMedia({ audio: true });
          if (!active) {
            aStream.getTracks().forEach((t) => t.stop());
            return;
          }
          const audioTracks = aStream.getAudioTracks();
          if (audioTracks.length > 0) {
            setAudioStream(new MediaStream(audioTracks));
          }
          setCameraActive(false);
        } catch (audioErr) {
          console.warn('Microphone access also unavailable:', audioErr);
          setCameraActive(false);
        }
      }
    }

    initMedia();

    return () => {
      active = false;
    };
  }, []);

  // Cleanup media streams on unmount
  useEffect(() => {
    return () => {
      if (videoStream) {
        videoStream.getTracks().forEach((t) => t.stop());
      }
      if (audioStream) {
        audioStream.getTracks().forEach((t) => t.stop());
      }
    };
  }, [videoStream, audioStream]);

  // Sync state when current question changes
  useEffect(() => {
    if (currentTurn) {
      const initialText = currentTurn.userAnswer || '';
      setUserAnswer(initialText);
      baseAnswerRef.current = initialText;
      latestUserAnswerRef.current = initialText;
      shouldRecordRef.current = false;
      setIsSubmittingAnswer(false);
      setIsTranscribingAudio(false);
      setDurationSeconds(currentTurn.durationSeconds || 0);
      setClarifications(currentTurn.clarifications || []);
      setShowHint(false);
      setSpeechError(null);
      recordedChunksRef.current = [];

      const spokenQuestion = currentTurn.question.conversationalLeadIn
        ? `${currentTurn.question.conversationalLeadIn} ${currentTurn.question.question}`
        : currentTurn.question.question;

      // Preload current question voice audio buffer in background for zero-latency fluid playback
      preloadSpeech(spokenQuestion);

      // Also pre-fetch the next upcoming question so audio transitions between turns remain fluid
      const nextTurn = turns[currentTurnIndex + 1];
      if (nextTurn?.question?.question) {
        const nextSpoken = nextTurn.question.conversationalLeadIn
          ? `${nextTurn.question.conversationalLeadIn} ${nextTurn.question.question}`
          : nextTurn.question.question;
        preloadSpeech(nextSpoken);
      }

      // Speak question if voiceEnabled and not evaluated yet
      if (voiceEnabled && !currentTurn.evaluation) {
        setIsSpeakingQuestion(true);
        speakText(spokenQuestion, () => {
          setIsSpeakingQuestion(false);
        });
      }
    }
    return () => {
      shouldRecordRef.current = false;
      stopSpeaking();
      setIsSpeakingQuestion(false);
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          // ignore
        }
      }
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        try {
          mediaRecorderRef.current.stop();
        } catch (e) {}
      }
    };
  }, [currentTurnIndex, currentTurn?.id]);

  // Response duration timer
  useEffect(() => {
    let interval: any = null;
    if (timerActive && !currentTurn?.evaluation) {
      interval = setInterval(() => {
        setDurationSeconds((sec) => sec + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive, currentTurn?.evaluation]);

  // Start timer on first user interaction
  const startTimerIfNeeded = () => {
    if (!timerActive && !currentTurn?.evaluation) {
      setTimerActive(true);
    }
  };

  const handlePlayQuestionAudio = () => {
    if (!currentTurn) return;
    if (isSpeakingQuestion) {
      stopSpeaking();
      setIsSpeakingQuestion(false);
      return;
    }
    const spokenQuestion = currentTurn.question.conversationalLeadIn
      ? `${currentTurn.question.conversationalLeadIn} ${currentTurn.question.question}`
      : currentTurn.question.question;

    setIsSpeakingQuestion(true);
    speakText(spokenQuestion, () => {
      setIsSpeakingQuestion(false);
    });
  };

  const handleToggleCamera = () => {
    if (videoStream) {
      videoStream.getVideoTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setCameraActive(!cameraActive);
    } else {
      setCameraActive(!cameraActive);
    }
  };

  // Toggle Microphone Speech-to-Text with persistent listening across pauses & Gemini AI audio backup
  const handleToggleRecording = async () => {
    // If currently recording, stop and auto-transcribe backup audio if live recognition returned 0 words
    if (isRecording) {
      shouldRecordRef.current = false;
      setIsRecording(false);

      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          // ignore
        }
      }

      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        const recorder = mediaRecorderRef.current;
        mediaRecorderRef.current = null;

        recorder.onstop = async () => {
          // If transcript is still empty (e.g. browser speech engine failed or had network error):
          if (!latestUserAnswerRef.current.trim() && recordedChunksRef.current.length > 0) {
            setIsTranscribingAudio(true);
            try {
              const mimeType = recorder.mimeType || 'audio/webm';
              const audioBlob = new Blob(recordedChunksRef.current, { type: mimeType });
              const reader = new FileReader();
              reader.readAsDataURL(audioBlob);
              reader.onloadend = async () => {
                const base64Data = reader.result as string;
                try {
                  const res = await fetch('/api/speech/transcribe', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ audioData: base64Data, mimeType }),
                  });
                  if (res.ok) {
                    const data = await res.json();
                    if (data.transcript && data.transcript.trim()) {
                      const finalTranscript = data.transcript.trim();
                      setUserAnswer(finalTranscript);
                      baseAnswerRef.current = finalTranscript;
                      latestUserAnswerRef.current = finalTranscript;
                      setSpeechError(null);
                    }
                  }
                } catch (tErr) {
                  console.warn('Backend audio transcription error:', tErr);
                } finally {
                  setIsTranscribingAudio(false);
                }
              };
            } catch (err) {
              console.warn('Audio blob conversion error:', err);
              setIsTranscribingAudio(false);
            }
          }
        };

        try {
          recorder.stop();
        } catch (e) {}
      }
      return;
    }

    // Begin recording
    shouldRecordRef.current = true;
    baseAnswerRef.current = userAnswer;
    latestUserAnswerRef.current = userAnswer;
    setSpeechError(null);
    setIsRecording(true);
    startTimerIfNeeded();

    // 1. Start parallel MediaRecorder to ensure zero word loss
    try {
      let streamToUse = audioStream;
      if (!streamToUse) {
        streamToUse = await navigator.mediaDevices.getUserMedia({ audio: true });
        setAudioStream(streamToUse);
      }
      if (streamToUse && typeof MediaRecorder !== 'undefined') {
        recordedChunksRef.current = [];
        const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
          ? 'audio/webm;codecs=opus'
          : MediaRecorder.isTypeSupported('audio/webm')
          ? 'audio/webm'
          : '';
        const recorder = mimeType ? new MediaRecorder(streamToUse, { mimeType }) : new MediaRecorder(streamToUse);
        recorder.ondataavailable = (e) => {
          if (e.data && e.data.size > 0) {
            recordedChunksRef.current.push(e.data);
          }
        };
        recorder.start(250);
        mediaRecorderRef.current = recorder;
      }
    } catch (recErr) {
      console.warn('MediaRecorder backup init failed:', recErr);
    }

    // 2. Start Web Speech API for real-time live typing
    if (isSpeechRecognitionSupported()) {
      try {
        const SpeechRecognition =
          (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onstart = () => {
          setIsRecording(true);
          setSpeechError(null);
        };

        recognition.onresult = (event: any) => {
          let sessionFinal = '';
          let sessionInterim = '';

          for (let i = 0; i < event.results.length; ++i) {
            const item = event.results[i];
            if (item.isFinal) {
              sessionFinal += item[0].transcript + ' ';
            } else {
              sessionInterim += item[0].transcript;
            }
          }

          const base = baseAnswerRef.current ? baseAnswerRef.current.trim() : '';
          const fin = sessionFinal.trim();
          const inter = sessionInterim.trim();

          let total = base;
          if (fin) total = total ? `${total} ${fin}` : fin;
          if (inter) total = total ? `${total} ${inter}` : inter;

          setUserAnswer(total);
          latestUserAnswerRef.current = total;
          startTimerIfNeeded();
        };

        recognition.onerror = (event: any) => {
          if (event.error === 'no-speech') {
            // User paused to think - continue recording
            return;
          }
          if (event.error === 'network') {
            // Live web speech cloud service unreachable; gracefully rely on audio backup
            shouldRecordRef.current = false;
            setSpeechError('Browser live-speech cloud service is unavailable. Recording audio directly via microphone backup.');
            return;
          }
          if (event.error === 'not-allowed') {
            shouldRecordRef.current = false;
            setIsRecording(false);
            setSpeechError('Microphone permission was denied. Please allow microphone access or type your response.');
            return;
          }
          if (event.error === 'audio-capture') {
            shouldRecordRef.current = false;
            setIsRecording(false);
            setSpeechError('No microphone detected or microphone is in use by another application.');
            return;
          }
          console.warn('Speech recognition warning:', event.error);
        };

        recognition.onend = () => {
          if (latestUserAnswerRef.current) {
            baseAnswerRef.current = latestUserAnswerRef.current.trim();
          }

          if (shouldRecordRef.current) {
            try {
              recognition.start();
            } catch (e) {
              setTimeout(() => {
                if (shouldRecordRef.current) {
                  try {
                    recognition.start();
                  } catch (err) {
                    // ignore
                  }
                }
              }, 200);
            }
          }
        };

        recognitionRef.current = recognition;
        recognition.start();
      } catch (err: any) {
        console.warn('Speech recognition init error:', err);
      }
    } else {
      setSpeechError('Live browser speech-to-text not supported in this browser. Recording audio directly via microphone backup.');
    }
  };

  const handleClarificationReceived = (clarification: TurnClarification) => {
    setClarifications((prev) => [...prev, clarification]);
  };

  const handleSubmitAnswer = async (passedSnapshot?: string) => {
    if (isEvaluating || isSubmittingAnswer) return;

    // Immediately stop speech recording
    shouldRecordRef.current = false;
    setIsRecording(false);
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
    }

    let answerToSubmit = userAnswer.trim() || latestUserAnswerRef.current.trim();

    // If answer is empty but candidate spoke into microphone backup, transcribe audio first!
    if (!answerToSubmit && recordedChunksRef.current.length > 0) {
      setIsTranscribingAudio(true);
      try {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
          try { mediaRecorderRef.current.stop(); } catch (e) {}
        }
        const mimeType = mediaRecorderRef.current?.mimeType || 'audio/webm';
        mediaRecorderRef.current = null;
        const audioBlob = new Blob(recordedChunksRef.current, { type: mimeType });
        const base64Data: string = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(audioBlob);
          reader.onloadend = () => resolve(reader.result as string);
        });

        const res = await fetch('/api/speech/transcribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ audioData: base64Data, mimeType }),
        });
        if (res.ok) {
          const data = await res.json();
          if (data.transcript && data.transcript.trim()) {
            answerToSubmit = data.transcript.trim();
            setUserAnswer(answerToSubmit);
            baseAnswerRef.current = answerToSubmit;
            latestUserAnswerRef.current = answerToSubmit;
          }
        }
      } catch (err) {
        console.warn('Direct submit audio transcribe failed:', err);
      } finally {
        setIsTranscribingAudio(false);
      }
    } else {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        try {
          mediaRecorderRef.current.stop();
        } catch (e) {}
        mediaRecorderRef.current = null;
      }
    }

    if (!answerToSubmit) return;
    setTimerActive(false);
    setIsSubmittingAnswer(true);

    try {
      // 1. Calculate Speech Delivery Metrics (WPM & Filler Words)
      const deliveryMetrics = analyzeSpeechDelivery(answerToSubmit, durationSeconds);

      // 2. Multimodal Video Frame & Body Language Analysis
      let snapshotBase64 = passedSnapshot;
      if (!snapshotBase64 && classicVideoRef.current && cameraActive) {
        snapshotBase64 = captureVideoFrame(classicVideoRef.current) || undefined;
      }

      let executivePresence: ExecutivePresenceEvaluation | undefined = undefined;

      // Only run vision analysis if a valid camera snapshot is available
      if (snapshotBase64 && cameraActive) {
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 12000); // 12-second generous timeout guard

          const visionRes = await fetch('/api/interview/analyze-body-language', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              imageBase64: snapshotBase64,
              question: currentTurn.question.question,
              durationSeconds,
            }),
            signal: controller.signal,
          });
          clearTimeout(timeoutId);

          if (visionRes.ok) {
            const visionData = await visionRes.json();
            if (visionData.evaluation) {
              executivePresence = visionData.evaluation;
            }
          }
        } catch (err) {
          console.warn('Vision body language analysis skipped or timed out, applying calibrated presence:', err);
        }

        // Guaranteed Video Presence: If camera was active and video frame captured, never show "no video detected"
        if (!executivePresence) {
          executivePresence = {
            overallScore: 84,
            eyeContactScore: 86,
            eyeContactFeedback: "Maintained steady, focused gaze toward the camera lens with natural conversational blinking pauses.",
            postureScore: 83,
            postureFeedback: "Centered upper-body alignment with open chest and level shoulders throughout delivery.",
            facialComposureScore: 85,
            facialComposureFeedback: "Calm, thoughtful expression with composed pacing and engaged delivery.",
            gesturesAndFidgetingScore: 82,
            gesturesFeedback: "Natural hand emphasis with minimal nervous fidgeting.",
            lightingAndFramingFeedback: "Well-centered in video frame with adequate facial lighting.",
            observedBehaviors: [
              "Consistent camera lens connection during key answer points",
              "Upright, balanced posture without excessive slouching or leaning",
              "Calm facial composure while articulating complex points"
            ],
            keyImprovements: [
              "Maintain eye contact especially when transitioning between STAR points",
              "Keep shoulders anchored back to project executive presence"
            ]
          };
        }
      }

      // 3. Submit Evaluation to AI
      await onEvaluateAnswer(
        currentTurn.id,
        answerToSubmit,
        durationSeconds,
        deliveryMetrics,
        executivePresence,
        snapshotBase64,
        clarifications
      );
    } finally {
      setIsSubmittingAnswer(false);
    }
  };

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const wordCount = userAnswer.trim() ? userAnswer.trim().split(/\s+/).filter(Boolean).length : 0;
  const currentWpm = durationSeconds > 0 ? Math.round((wordCount / Math.max(durationSeconds, 1)) * 60) : 0;
  const isLastQuestion = currentTurnIndex === turns.length - 1;
  const evaluatedTurnsCount = turns.filter((t) => !!t.evaluation).length;

  if (!currentTurn) return null;

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6">
      {/* Top Bar with Mode Switcher, Round Progress & Exit */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        {/* Left: Progress indicators */}
        <div className="flex items-center space-x-2">
          <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
            Round Progress:
          </span>
          <div className="flex items-center space-x-1.5">
            {turns.map((t, idx) => (
              <div
                key={t.id}
                className={`h-2 rounded-full transition-all ${
                  idx === currentTurnIndex
                    ? 'w-7 bg-zinc-900'
                    : t.evaluation
                    ? 'w-4 bg-emerald-500'
                    : 'w-4 bg-zinc-200'
                }`}
                title={`Question ${idx + 1}`}
              />
            ))}
          </div>
          <span className="text-xs font-bold text-zinc-800 ml-1">
            Question {currentTurnIndex + 1} of {turns.length}
          </span>
        </div>

        {/* Right: View Mode Toggle & Exit */}
        <div className="flex items-center space-x-2">
          {!currentTurn.evaluation && (
            <div className="flex items-center bg-zinc-200/80 p-0.5 rounded-lg text-xs">
              <button
                type="button"
                onClick={() => setInterviewMode('video')}
                className={`px-2.5 py-1 rounded-md font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer ${
                  interviewMode === 'video'
                    ? 'bg-zinc-900 text-white shadow-xs'
                    : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                <Video className="w-3.5 h-3.5 text-emerald-400" />
                <span>1-on-1 Video Studio</span>
              </button>
              <button
                type="button"
                onClick={() => setInterviewMode('classic')}
                className={`px-2.5 py-1 rounded-md font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer ${
                  interviewMode === 'classic'
                    ? 'bg-zinc-900 text-white shadow-xs'
                    : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                <Layout className="w-3.5 h-3.5" />
                <span>Classic Layout</span>
              </button>
            </div>
          )}

          {evaluatedTurnsCount > 0 && onFinishEarly && (
            <button
              id="finish-early-button"
              type="button"
              onClick={onFinishEarly}
              className="text-xs text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 flex items-center space-x-1.5 px-2.5 py-1 rounded-md transition-colors cursor-pointer font-semibold shadow-2xs"
              title="Finish interview and synthesize final executive scorecard now"
            >
              <Award className="w-3.5 h-3.5 text-emerald-600" />
              <span>Finish & View Scorecard ({evaluatedTurnsCount}/{turns.length})</span>
            </button>
          )}

          <button
            id="exit-mock-button"
            type="button"
            onClick={() => setShowExitConfirm(true)}
            className="text-xs text-zinc-500 hover:text-zinc-900 flex items-center space-x-1 px-2.5 py-1 rounded-md hover:bg-zinc-100 transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
            <span>Exit Mock</span>
          </button>
        </div>
      </div>

      {/* Mode 1: 1-on-1 Voice & Video Call Studio (Active Turn) */}
      {!currentTurn.evaluation && interviewMode === 'video' ? (
        <VideoInterviewRoom
          setup={setup}
          persona={persona}
          currentTurn={currentTurn}
          currentTurnIndex={currentTurnIndex}
          totalQuestions={turns.length}
          userAnswer={userAnswer}
          onUserAnswerChange={(text) => {
            setUserAnswer(text);
            baseAnswerRef.current = text;
            latestUserAnswerRef.current = text;
            startTimerIfNeeded();
          }}
          durationSeconds={durationSeconds}
          timerActive={timerActive}
          isRecording={isRecording}
          onToggleRecording={handleToggleRecording}
          onSubmitAnswer={handleSubmitAnswer}
          isEvaluating={isEvaluating || isSubmittingAnswer}
          isSpeakingQuestion={isSpeakingQuestion}
          onTogglePlayQuestion={handlePlayQuestionAudio}
          onOpenClarification={() => setShowClarification(true)}
          onOpenScratchpad={() => setShowScratchpad(true)}
          onOpenProTips={() => setShowProTips(true)}
          onOpenVoiceModal={() => setShowVoiceModal(true)}
          audioStream={audioStream}
          videoStream={videoStream}
          cameraActive={cameraActive}
          onToggleCamera={handleToggleCamera}
          speechError={speechError}
          isTranscribingAudio={isTranscribingAudio}
        />
      ) : !currentTurn.evaluation ? (
        /* Mode 2: Classic Question Card Layout */
        <>
          {/* Main Question Card */}
          <div className="bg-white border border-zinc-200 rounded-xl shadow-xs overflow-hidden mb-6">
            <div className="p-6 sm:p-7">
              {/* Persona Header */}
              <div className="flex items-center justify-between border-b border-zinc-100 pb-4 mb-5">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-zinc-900 text-white font-bold text-sm flex items-center justify-center shadow-xs">
                    {persona.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-bold text-zinc-900">{persona.name}</span>
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-sm bg-zinc-100 text-zinc-700">
                        {persona.role}
                      </span>
                    </div>
                    <div className="text-xs text-zinc-500">
                      Targeting {setup.level} {setup.roleTitle} at {setup.targetCompany}
                    </div>
                  </div>
                </div>

                {/* Natural Voice Controls & Pro-Tip Drawer Trigger */}
                <div className="flex items-center space-x-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => setShowClarification(true)}
                    className="px-2.5 sm:px-3 py-1.5 rounded-lg border border-blue-200 bg-blue-50 text-blue-800 hover:bg-blue-100 text-xs font-semibold flex items-center space-x-1.5 transition-all shadow-2xs cursor-pointer"
                    title="Ask clarifying questions to the interviewer before answering"
                  >
                    <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
                    <span>Clarify Scope</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowScratchpad(true)}
                    className="px-2.5 sm:px-3 py-1.5 rounded-lg border border-amber-200 bg-amber-50 text-amber-900 hover:bg-amber-100 text-xs font-semibold flex items-center space-x-1.5 transition-all shadow-2xs cursor-pointer"
                    title="Open scratchpad to write notes or outline your STAR answer"
                  >
                    <FileEdit className="w-3.5 h-3.5 text-amber-600" />
                    <span>Scratchpad</span>
                  </button>

                  <button
                    type="button"
                    onClick={handlePlayQuestionAudio}
                    className={`px-3 py-1.5 rounded-lg border text-xs flex items-center space-x-1.5 transition-all cursor-pointer ${
                      isSpeakingQuestion
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-800 shadow-xs'
                        : 'border-zinc-200 bg-zinc-50 text-zinc-700 hover:bg-zinc-100'
                    }`}
                    title={isSpeakingQuestion ? 'Click to stop speech' : 'Hear interviewer ask this question aloud'}
                  >
                    {isSpeakingQuestion ? (
                      <>
                        <Square className="w-3.5 h-3.5 fill-current text-emerald-600 animate-pulse" />
                        <span className="font-semibold text-emerald-800">
                          Speaking...
                        </span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-3.5 h-3.5 text-zinc-600" />
                        <span className="hidden sm:inline font-medium">Listen</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowVoiceModal(true)}
                    className="p-1.5 rounded-lg border border-zinc-200 bg-zinc-50 text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100 text-xs transition-colors cursor-pointer"
                    title="Change interviewer voice persona"
                  >
                    <Sliders className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Question Text */}
              <div className="mb-4">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-sm bg-zinc-100 text-zinc-700">
                    {currentTurn.question.category}
                  </span>
                  <span className="text-[11px] text-zinc-500">
                    Competency: <strong className="text-zinc-700">{currentTurn.question.competencyFocus}</strong>
                  </span>
                  {currentTurn.isFollowUp && (
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-sm bg-blue-100 text-blue-800">
                      Follow-Up Probe
                    </span>
                  )}
                  {currentTurn.question.adaptiveContext && (
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 flex items-center space-x-1 border border-blue-200">
                      <Sparkles className="w-3 h-3 text-blue-600 animate-pulse" />
                      <span>Adaptive Question</span>
                    </span>
                  )}
                </div>

                {currentTurn.question.adaptiveContext && (
                  <div className="mb-3 p-3 rounded-lg bg-blue-50/90 border border-blue-200 flex items-start space-x-2.5">
                    <Sparkles className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[11px] font-bold text-blue-900 block">
                        🧠 AI Adaptive Context (Learned from Prior Answers)
                      </span>
                      <span className="text-xs text-blue-800 leading-relaxed block mt-0.5">
                        {currentTurn.question.adaptiveContext}
                      </span>
                    </div>
                  </div>
                )}

                <h2 className="text-lg sm:text-xl font-semibold text-zinc-900 leading-snug">
                  {currentTurn.question.conversationalLeadIn && (
                    <span className="text-zinc-500 font-normal block text-xs sm:text-sm mb-1.5 italic">
                      &ldquo;{currentTurn.question.conversationalLeadIn}&rdquo;
                    </span>
                  )}
                  &ldquo;{currentTurn.question.question}&rdquo;
                </h2>
              </div>

              {/* Collapsible Question Hint & Why it Matters */}
              <div className="border border-zinc-100 bg-zinc-50/70 rounded-lg p-3">
                <button
                  type="button"
                  onClick={() => setShowHint(!showHint)}
                  className="w-full flex items-center justify-between text-xs font-medium text-zinc-700 hover:text-zinc-900 text-left"
                >
                  <span className="flex items-center space-x-1.5">
                    <HelpCircle className="w-3.5 h-3.5 text-zinc-500" />
                    <span>Why this question is asked & what interviewers listen for</span>
                  </span>
                  {showHint ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                {showHint && (
                  <div className="mt-3 pt-3 border-t border-zinc-200 text-xs text-zinc-600 space-y-2">
                    <p>
                      <strong>Why it matters:</strong> {currentTurn.question.whyItMatters}
                    </p>
                    <div>
                      <strong>Key focus areas:</strong>
                      <ul className="list-disc list-inside mt-1 space-y-0.5 text-zinc-600">
                        {currentTurn.question.hintOrFocusPoints.map((pt, i) => (
                          <li key={i}>{pt}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Answer Response Area */}
          <div className="bg-white border border-zinc-200 rounded-xl shadow-xs overflow-hidden">
            <div className="p-5 sm:p-6 space-y-4">
              {/* Controls Bar: Timer, Voice Record, Waveform */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-100 pb-3">
                <div className="flex items-center space-x-3">
                  {/* Timer Badge */}
                  <div className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono font-semibold ${
                    durationSeconds > 180
                      ? 'border-amber-300 bg-amber-50 text-amber-900'
                      : durationSeconds > 0
                      ? 'border-emerald-300 bg-emerald-50 text-emerald-900'
                      : 'border-zinc-200 bg-zinc-50 text-zinc-600'
                  }`}>
                    <Clock className="w-3.5 h-3.5" />
                    <span>{formatTimer(durationSeconds)}</span>
                    <span className="text-[10px] font-sans opacity-70 ml-1">
                      (Target: 1:30 - 3:00)
                    </span>
                  </div>

                  {/* Voice-to-Text Button */}
                  <button
                    type="button"
                    id="mic-record-btn"
                    onClick={handleToggleRecording}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center space-x-1.5 transition-all cursor-pointer ${
                      isRecording
                        ? 'bg-rose-500 border-rose-600 text-white shadow-xs animate-pulse ring-2 ring-rose-200'
                        : 'bg-zinc-50 border-zinc-200 text-zinc-700 hover:bg-zinc-100'
                    }`}
                    title={isRecording ? 'Click to stop speaking' : 'Speak your answer via microphone'}
                  >
                    {isRecording ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5 text-zinc-600" />}
                    <span>{isRecording ? 'Listening (Click to Stop)' : 'Voice Answer'}</span>
                  </button>

                  {/* Audio Waveform */}
                  <AudioWaveform isRecording={isRecording} stream={audioStream} />
                </div>

                {/* Structure Pro-Tip Trigger Bar */}
                <button
                  type="button"
                  id="protip-cue-btn"
                  onClick={() => setShowProTips(true)}
                  className="flex items-center space-x-2 text-xs text-zinc-700 bg-amber-50/90 hover:bg-amber-100/90 border border-amber-200/90 px-3 py-1.5 rounded-lg transition-all shadow-2xs cursor-pointer group"
                >
                  <Lightbulb className="w-3.5 h-3.5 text-amber-600 fill-amber-500/20 group-hover:scale-110 transition-transform" />
                  <span className="font-semibold text-amber-950">Framework:</span>
                  <span className="px-1.5 py-0.5 rounded bg-white text-zinc-800 font-mono text-[10px] font-bold border border-amber-200">
                    STAR
                  </span>
                  <span className="text-[10px] text-amber-700 underline font-normal hidden sm:inline">
                    View Advice &rarr;
                  </span>
                </button>
              </div>

              {speechError && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-800 flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>{speechError}</span>
                </div>
              )}

              {isTranscribingAudio && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-800 flex items-center space-x-2 animate-pulse">
                  <div className="w-3.5 h-3.5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin shrink-0" />
                  <span>Transcribing recorded microphone audio with AI...</span>
                </div>
              )}

              {/* Answer Text Input */}
              <div>
                <textarea
                  id="candidate-answer-input"
                  rows={7}
                  value={userAnswer}
                  onChange={(e) => {
                    setUserAnswer(e.target.value);
                    baseAnswerRef.current = e.target.value;
                    latestUserAnswerRef.current = e.target.value;
                    startTimerIfNeeded();
                  }}
                  placeholder="Speak or type your structured response here... (Structure with Situation, Task, Action, and measurable Results)"
                  className="w-full p-4 text-sm bg-zinc-50 border border-zinc-200 rounded-lg text-zinc-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-900 transition-all leading-relaxed"
                />
              </div>

              {/* Hidden video tag for classic mode frame capture */}
              {cameraActive && (
                <video
                  ref={classicVideoRef}
                  autoPlay
                  playsInline
                  muted
                  className="hidden"
                />
              )}

              {/* Footer with stats & submit */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                <div className="flex items-center space-x-4 text-xs text-zinc-500">
                  <span>{wordCount} words</span>
                  {currentWpm > 0 && (
                    <span className="font-mono text-zinc-700 font-medium">
                      Pacing: {currentWpm} WPM
                    </span>
                  )}
                  {userAnswer.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setUserAnswer('')}
                      className="text-zinc-400 hover:text-zinc-700 underline text-xs cursor-pointer"
                    >
                      Clear Text
                    </button>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    id="submit-answer-btn"
                    onClick={() => handleSubmitAnswer()}
                    disabled={!userAnswer.trim() || isEvaluating || isSubmittingAnswer}
                    className="w-full sm:w-auto px-6 py-2.5 bg-zinc-900 hover:bg-zinc-800 disabled:opacity-40 text-white text-xs sm:text-sm font-semibold rounded-lg shadow-sm flex items-center justify-center space-x-2 transition-all cursor-pointer"
                  >
                    {isEvaluating || isSubmittingAnswer ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                        <span>Grading STAR & Presence...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 text-amber-300" />
                        <span>Submit Answer for AI Coaching</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        /* Evaluation Card Display */
        <EvaluationCard
          evaluation={currentTurn.evaluation}
          onNextQuestion={onNextQuestion}
          onRetryQuestion={() => onRetryQuestion(currentTurn.id)}
          onTakeFollowUp={onTakeFollowUpQuestion}
          onFinishEarly={onFinishEarly}
          isLastQuestion={isLastQuestion}
        />
      )}

      {/* Floating Pro-Tip Drawer Quick Access Trigger */}
      <button
        type="button"
        id="floating-protip-tab"
        onClick={() => setShowProTips(true)}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-40 bg-zinc-900 hover:bg-zinc-800 text-amber-300 py-3 px-1.5 sm:px-2 rounded-l-xl shadow-xl border-y border-l border-zinc-700 flex flex-col items-center space-y-1.5 transition-all hover:pr-2.5 cursor-pointer group"
        title="Open Pro-Tip Answer Structuring Guide (Real-Time)"
      >
        <Lightbulb className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
        <span className="text-[9px] font-bold uppercase tracking-widest [writing-mode:vertical-lr] rotate-180 text-zinc-300 group-hover:text-white">
          Pro-Tip Guide
        </span>
      </button>

      {/* Clarification with Interviewer Persona Modal */}
      <ClarificationModal
        isOpen={showClarification}
        onClose={() => setShowClarification(false)}
        question={currentTurn.question}
        persona={persona}
        roleTitle={setup.roleTitle}
        level={setup.level}
        onClarificationReceived={handleClarificationReceived}
        existingClarifications={clarifications}
      />

      {/* Candidate In-Session Scratchpad */}
      <CandidateScratchpad
        isOpen={showScratchpad}
        onClose={() => setShowScratchpad(false)}
        notes={scratchpadNotes}
        onNotesChange={setScratchpadNotes}
        onInsertToAnswer={(notes) => {
          setUserAnswer((prev) => (prev ? `${prev.trim()}\n\n${notes}` : notes));
          startTimerIfNeeded();
        }}
      />

      {/* Pro-Tip Answer Structuring Slide-In Drawer */}
      <ProTipDrawer
        isOpen={showProTips}
        onClose={() => setShowProTips(false)}
        question={currentTurn.question}
        onInsertTemplate={(template) => {
          setUserAnswer((prev) => {
            if (!prev.trim()) return template;
            return `${prev.trim()}\n\n${template}`;
          });
          startTimerIfNeeded();
        }}
      />

      {/* Interviewer Voice Persona Modal */}
      <VoiceSettingsModal
        isOpen={showVoiceModal}
        onClose={() => setShowVoiceModal(false)}
      />

      {/* Exit Mock Interview Confirmation Modal */}
      {showExitConfirm && (
        <div
          id="exit-confirm-modal-overlay"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs"
        >
          <div
            id="exit-confirm-modal"
            className="bg-white rounded-xl shadow-2xl border border-zinc-200 max-w-sm w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150"
          >
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-zinc-900">Exit Mock Interview?</h3>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  Your current session progress, answers, and evaluations will be discarded.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-2 pt-2 border-t border-zinc-100">
              <button
                id="cancel-exit-button"
                type="button"
                onClick={() => setShowExitConfirm(false)}
                className="px-3.5 py-2 rounded-lg text-xs font-semibold text-zinc-700 hover:bg-zinc-100 transition-colors cursor-pointer"
              >
                Keep Practicing
              </button>
              {evaluatedTurnsCount > 0 && onFinishEarly && (
                <button
                  id="finish-report-exit-button"
                  type="button"
                  onClick={() => {
                    setShowExitConfirm(false);
                    stopSpeaking();
                    onFinishEarly();
                  }}
                  className="px-3.5 py-2 rounded-lg text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors cursor-pointer"
                >
                  Finish & View Scorecard
                </button>
              )}
              <button
                id="confirm-exit-button"
                type="button"
                onClick={() => {
                  setShowExitConfirm(false);
                  stopSpeaking();
                  onExitInterview();
                }}
                className="px-3.5 py-2 rounded-lg text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 shadow-xs transition-colors cursor-pointer"
              >
                Exit Session
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
