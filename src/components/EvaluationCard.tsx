import React, { useState } from 'react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  Lightbulb, 
  Copy, 
  Check, 
  ArrowRight, 
  RotateCcw,
  MessageSquarePlus,
  Award,
  Volume2,
  Square,
  ScanEye,
  Eye,
  Activity,
  Gauge,
  Video,
  Brain,
  TrendingUp
} from 'lucide-react';
import { AnswerEvaluation } from '../types';
import { speakText, stopSpeaking } from '../utils/speechUtils';

interface EvaluationCardProps {
  evaluation: AnswerEvaluation;
  onNextQuestion: () => void;
  onRetryQuestion: () => void;
  onTakeFollowUp?: (followUpText: string) => void;
  onFinishEarly?: () => void;
  isLastQuestion: boolean;
  hasFollowUpAvailable?: boolean;
}

export const EvaluationCard: React.FC<EvaluationCardProps> = ({
  evaluation,
  onNextQuestion,
  onRetryQuestion,
  onTakeFollowUp,
  onFinishEarly,
  isLastQuestion,
  hasFollowUpAvailable = true,
}) => {
  const [copiedExemplar, setCopiedExemplar] = useState(false);
  const [activeTab, setActiveTab] = useState<'star' | 'presence' | 'exemplar' | 'tips'>('star');
  const [isPlayingExemplar, setIsPlayingExemplar] = useState(false);

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-emerald-700 bg-emerald-50 border-emerald-200';
    if (score >= 70) return 'text-blue-700 bg-blue-50 border-blue-200';
    if (score >= 55) return 'text-amber-700 bg-amber-50 border-amber-200';
    return 'text-rose-700 bg-rose-50 border-rose-200';
  };

  const getVerdictBadge = (verdict: string) => {
    switch (verdict) {
      case 'Exceptional':
      case 'Strong':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Competent':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Progressing':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      default:
        return 'bg-rose-100 text-rose-800 border-rose-300';
    }
  };

  const handleCopyExemplar = () => {
    navigator.clipboard.writeText(evaluation.exemplarAnswer);
    setCopiedExemplar(true);
    setTimeout(() => setCopiedExemplar(false), 2000);
  };

  const handleTogglePlayExemplar = () => {
    if (isPlayingExemplar) {
      stopSpeaking();
      setIsPlayingExemplar(false);
    } else {
      setIsPlayingExemplar(true);
      speakText(evaluation.exemplarAnswer, () => {
        setIsPlayingExemplar(false);
      });
    }
  };

  const { starBreakdown, deliveryMetrics, executivePresence } = evaluation;

  return (
    <div className="bg-white border border-zinc-200 rounded-xl shadow-xs overflow-hidden mt-6 animate-in fade-in duration-300">
      {/* Header Evaluation Banner */}
      <div className="p-5 sm:p-6 bg-zinc-50/70 border-b border-zinc-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className={`w-14 h-14 rounded-xl border flex flex-col items-center justify-center font-bold shadow-xs ${getScoreColor(evaluation.overallScore)}`}>
            <span className="text-xl leading-none">{evaluation.overallScore}</span>
            <span className="text-[10px] font-medium uppercase tracking-wider opacity-70">Score</span>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-lg font-bold text-zinc-900">Answer Evaluation</h2>
              <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${getVerdictBadge(evaluation.verdict)}`}>
                {evaluation.verdict}
              </span>
            </div>
            <p className="text-xs text-zinc-500 mt-0.5">
              Evaluated across STAR structure, executive body language, and speech pacing.
            </p>
          </div>
        </div>

        {/* Delivery Scores Quick Strip */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <div className="px-3 py-1.5 rounded-lg bg-white border border-zinc-200 text-center">
            <div className="text-[10px] text-zinc-500 font-medium">Clarity</div>
            <div className="font-bold text-zinc-800">{evaluation.communicationClarity}%</div>
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-white border border-zinc-200 text-center">
            <div className="text-[10px] text-zinc-500 font-medium">Depth</div>
            <div className="font-bold text-zinc-800">{evaluation.depthAndImpact}%</div>
          </div>

          {deliveryMetrics && (
            <div className="px-3 py-1.5 rounded-lg bg-white border border-zinc-200 text-center">
              <div className="text-[10px] text-zinc-500 font-medium">Pacing</div>
              <div className={`font-bold ${
                deliveryMetrics.pacingVerdict === 'Optimal' ? 'text-emerald-700' : 'text-amber-700'
              }`}>
                {deliveryMetrics.wpm} WPM
              </div>
            </div>
          )}

          {executivePresence && (
            <div className="px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-center">
              <div className="text-[10px] text-emerald-700 font-medium">Presence</div>
              <div className="font-bold text-emerald-800">{executivePresence.overallScore}%</div>
            </div>
          )}
        </div>
      </div>

      {/* AI Learning & Cross-Turn Trajectory Card */}
      {evaluation.progressionInsights && (
        <div className="mx-5 sm:mx-6 mt-4 p-4 rounded-xl bg-gradient-to-r from-blue-50/90 via-indigo-50/80 to-purple-50/70 border border-blue-200/90 shadow-2xs space-y-2.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-2xs">
                <Brain className="w-4 h-4 text-white" />
              </div>
              <div>
                <span className="text-xs font-bold text-blue-950 flex items-center space-x-1.5">
                  <span>AI Learning & Adaptive Trajectory</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-100 text-blue-800 border border-blue-200">
                    {evaluation.progressionInsights.consistencyVerdict}
                  </span>
                </span>
              </div>
            </div>

            {typeof evaluation.progressionInsights.progressionScoreChange === 'number' && (
              <span className={`text-xs font-bold px-2.5 py-1 rounded-md border flex items-center space-x-1 ${
                evaluation.progressionInsights.progressionScoreChange > 0
                  ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                  : evaluation.progressionInsights.progressionScoreChange === 0
                  ? 'bg-zinc-100 text-zinc-700 border-zinc-200'
                  : 'bg-amber-100 text-amber-800 border-amber-300'
              }`}>
                <TrendingUp className="w-3.5 h-3.5" />
                <span>
                  {evaluation.progressionInsights.progressionScoreChange > 0 
                    ? `+${evaluation.progressionInsights.progressionScoreChange} pts vs prior turn` 
                    : evaluation.progressionInsights.progressionScoreChange === 0 
                    ? 'Score consistent with prior turn' 
                    : `${evaluation.progressionInsights.progressionScoreChange} pts vs prior turn`}
                </span>
              </span>
            )}
          </div>

          <p className="text-xs text-blue-950 leading-relaxed font-medium">
            {evaluation.progressionInsights.continuityNotes}
          </p>

          {(evaluation.progressionInsights.improvedAreas?.length > 0 || evaluation.progressionInsights.recurringBlindSpots?.length > 0) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 border-t border-blue-200/60 text-xs">
              {evaluation.progressionInsights.improvedAreas?.length > 0 && (
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-emerald-800 flex items-center space-x-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Progression Improvements:</span>
                  </span>
                  <ul className="space-y-0.5">
                    {evaluation.progressionInsights.improvedAreas.map((area, idx) => (
                      <li key={idx} className="text-[11px] text-emerald-950 flex items-start space-x-1">
                        <span className="text-emerald-500 font-bold">•</span>
                        <span>{area}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {evaluation.progressionInsights.recurringBlindSpots?.length > 0 && (
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-amber-800 flex items-center space-x-1">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                    <span>Watch for Recurring Habits:</span>
                  </span>
                  <ul className="space-y-0.5">
                    {evaluation.progressionInsights.recurringBlindSpots.map((spot, idx) => (
                      <li key={idx} className="text-[11px] text-amber-950 flex items-start space-x-1">
                        <span className="text-amber-500 font-bold">•</span>
                        <span>{spot}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-zinc-200 px-6 bg-white space-x-4 sm:space-x-6 text-xs font-semibold overflow-x-auto">
        <button
          onClick={() => setActiveTab('star')}
          className={`py-3 border-b-2 transition-all shrink-0 cursor-pointer ${
            activeTab === 'star'
              ? 'border-zinc-900 text-zinc-900'
              : 'border-transparent text-zinc-500 hover:text-zinc-800'
          }`}
        >
          STAR Breakdown
        </button>

        <button
          onClick={() => setActiveTab('presence')}
          className={`py-3 border-b-2 transition-all shrink-0 flex items-center space-x-1.5 cursor-pointer ${
            activeTab === 'presence'
              ? 'border-emerald-600 text-emerald-900'
              : 'border-transparent text-zinc-500 hover:text-zinc-800'
          }`}
        >
          <ScanEye className="w-3.5 h-3.5 text-emerald-600" />
          <span>Body Language & Posture</span>
          {executivePresence && (
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('exemplar')}
          className={`py-3 border-b-2 transition-all shrink-0 flex items-center space-x-1.5 cursor-pointer ${
            activeTab === 'exemplar'
              ? 'border-zinc-900 text-zinc-900'
              : 'border-transparent text-zinc-500 hover:text-zinc-800'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Top 1% Model Answer</span>
        </button>

        <button
          onClick={() => setActiveTab('tips')}
          className={`py-3 border-b-2 transition-all shrink-0 flex items-center space-x-1.5 cursor-pointer ${
            activeTab === 'tips'
              ? 'border-zinc-900 text-zinc-900'
              : 'border-transparent text-zinc-500 hover:text-zinc-800'
          }`}
        >
          <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
          <span>Coach Nuggets & Follow-Up</span>
        </button>
      </div>

      <div className="p-6">
        {/* TAB 1: STAR Breakdown */}
        {activeTab === 'star' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {/* Situation */}
              <div className="p-3.5 rounded-lg border border-zinc-200 bg-zinc-50/50">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-zinc-900 uppercase tracking-wide">
                    S - Situation
                  </span>
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${
                    starBreakdown.situation.score >= 8 ? 'bg-emerald-100 text-emerald-800' : 'bg-zinc-200 text-zinc-700'
                  }`}>
                    {starBreakdown.situation.score}/10
                  </span>
                </div>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  {starBreakdown.situation.feedback}
                </p>
              </div>

              {/* Task */}
              <div className="p-3.5 rounded-lg border border-zinc-200 bg-zinc-50/50">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-zinc-900 uppercase tracking-wide">
                    T - Task & Ownership
                  </span>
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${
                    starBreakdown.task.score >= 8 ? 'bg-emerald-100 text-emerald-800' : 'bg-zinc-200 text-zinc-700'
                  }`}>
                    {starBreakdown.task.score}/10
                  </span>
                </div>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  {starBreakdown.task.feedback}
                </p>
              </div>

              {/* Action */}
              <div className="p-3.5 rounded-lg border border-zinc-200 bg-zinc-50/50">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-zinc-900 uppercase tracking-wide">
                    A - Specific Actions
                  </span>
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${
                    starBreakdown.action.score >= 8 ? 'bg-emerald-100 text-emerald-800' : 'bg-zinc-200 text-zinc-700'
                  }`}>
                    {starBreakdown.action.score}/10
                  </span>
                </div>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  {starBreakdown.action.feedback}
                </p>
              </div>

              {/* Result */}
              <div className="p-3.5 rounded-lg border border-zinc-200 bg-zinc-50/50">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-zinc-900 uppercase tracking-wide">
                    R - Result & Measurable Impact
                  </span>
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${
                    starBreakdown.result.score >= 8 ? 'bg-emerald-100 text-emerald-800' : 'bg-zinc-200 text-zinc-700'
                  }`}>
                    {starBreakdown.result.score}/10
                  </span>
                </div>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  {starBreakdown.result.feedback}
                </p>
              </div>
            </div>

            {/* Delivery & Filler Words Strip */}
            {deliveryMetrics && (
              <div className="p-3.5 rounded-lg bg-zinc-50 border border-zinc-200 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center space-x-2">
                  <Gauge className="w-4 h-4 text-zinc-500" />
                  <span className="font-bold text-zinc-800">Speaking Pace:</span>
                  <span className="font-mono text-zinc-700">{deliveryMetrics.wpm} WPM</span>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    deliveryMetrics.pacingVerdict === 'Optimal'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {deliveryMetrics.pacingVerdict} (Target: 120-160)
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="font-bold text-zinc-800">Filler Words:</span>
                  <span className="font-mono text-zinc-700">{deliveryMetrics.fillerWordsCount} detected</span>
                  {deliveryMetrics.fillerWordsDetected.length > 0 && (
                    <div className="flex items-center space-x-1">
                      {deliveryMetrics.fillerWordsDetected.slice(0, 3).map((f) => (
                        <span key={f.word} className="px-1.5 py-0.5 bg-zinc-200 text-zinc-700 text-[10px] rounded font-mono">
                          "{f.word}" ({f.count})
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Strengths & Weaknesses Split */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-lg p-3.5">
                <div className="text-xs font-bold text-emerald-900 flex items-center space-x-1.5 mb-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Key Candidate Strengths</span>
                </div>
                <ul className="space-y-1.5">
                  {evaluation.strengths.map((str, idx) => (
                    <li key={idx} className="text-xs text-emerald-950 flex items-start space-x-1.5">
                      <span className="text-emerald-500 font-bold">•</span>
                      <span>{str}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-amber-50/60 border border-amber-200/80 rounded-lg p-3.5">
                <div className="text-xs font-bold text-amber-900 flex items-center space-x-1.5 mb-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>Areas to Refine Before Real Interview</span>
                </div>
                <ul className="space-y-1.5">
                  {evaluation.areasForImprovement.map((imp, idx) => (
                    <li key={idx} className="text-xs text-amber-950 flex items-start space-x-1.5">
                      <span className="text-amber-500 font-bold">•</span>
                      <span>{imp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Body Language & Posture Analysis */}
        {activeTab === 'presence' && (
          <div className="space-y-4">
            {executivePresence ? (
              <>
                <div className="p-4 bg-emerald-50/80 border border-emerald-200 rounded-xl flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white font-bold flex flex-col items-center justify-center shadow-xs">
                      <span className="text-lg leading-none">{executivePresence.overallScore}</span>
                      <span className="text-[9px] uppercase tracking-wider opacity-80">Score</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-emerald-950">Executive Presence & Video Evaluation</h4>
                      <p className="text-xs text-emerald-800">
                        Camera alignment, eye contact trajectory, posture, and facial composure analysis.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs">
                  {/* Eye contact */}
                  <div className="p-3.5 rounded-lg border border-zinc-200 bg-white">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-bold text-zinc-900 flex items-center space-x-1.5">
                        <Eye className="w-3.5 h-3.5 text-blue-600" />
                        <span>Eye Contact & Gaze Direction</span>
                      </span>
                      <span className="font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-800">
                        {executivePresence.eyeContactScore}/100
                      </span>
                    </div>
                    <p className="text-zinc-600 leading-relaxed">
                      {executivePresence.eyeContactFeedback}
                    </p>
                  </div>

                  {/* Posture */}
                  <div className="p-3.5 rounded-lg border border-zinc-200 bg-white">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-bold text-zinc-900 flex items-center space-x-1.5">
                        <Activity className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Posture & Spinal Alignment</span>
                      </span>
                      <span className="font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800">
                        {executivePresence.postureScore}/100
                      </span>
                    </div>
                    <p className="text-zinc-600 leading-relaxed">
                      {executivePresence.postureFeedback}
                    </p>
                  </div>

                  {/* Facial Composure */}
                  <div className="p-3.5 rounded-lg border border-zinc-200 bg-white">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-bold text-zinc-900">Facial Composure & Calmness</span>
                      <span className="font-bold px-2 py-0.5 rounded bg-zinc-100 text-zinc-800">
                        {executivePresence.facialComposureScore}/100
                      </span>
                    </div>
                    <p className="text-zinc-600 leading-relaxed">
                      {executivePresence.facialComposureFeedback}
                    </p>
                  </div>

                  {/* Gestures & Fidgeting */}
                  <div className="p-3.5 rounded-lg border border-zinc-200 bg-white">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-bold text-zinc-900">Hand Gestures & Fidgeting Control</span>
                      <span className="font-bold px-2 py-0.5 rounded bg-zinc-100 text-zinc-800">
                        {executivePresence.gesturesAndFidgetingScore}/100
                      </span>
                    </div>
                    <p className="text-zinc-600 leading-relaxed">
                      {executivePresence.gesturesFeedback}
                    </p>
                  </div>
                </div>

                {/* Lighting and Framing */}
                <div className="p-3 bg-zinc-50 border border-zinc-200 rounded-lg text-xs text-zinc-700">
                  <span className="font-bold text-zinc-900 block mb-0.5">Lighting & Camera Framing:</span>
                  <p>{executivePresence.lightingAndFramingFeedback}</p>
                </div>

                {/* Key Improvements */}
                {executivePresence.keyImprovements && executivePresence.keyImprovements.length > 0 && (
                  <div className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-lg text-xs">
                    <span className="font-bold text-amber-900 flex items-center space-x-1.5 mb-1.5">
                      <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                      <span>Executive Body Language Recommendations:</span>
                    </span>
                    <ul className="space-y-1">
                      {executivePresence.keyImprovements.map((tip, i) => (
                        <li key={i} className="text-amber-950 flex items-start space-x-1.5">
                          <span className="text-amber-500 font-bold">•</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <div className="p-8 text-center bg-zinc-50 border border-zinc-200 rounded-xl">
                <Video className="w-8 h-8 text-zinc-400 mx-auto mb-2" />
                <h4 className="text-xs font-bold text-zinc-800">No Video Snapshot Available for This Question</h4>
                <p className="text-xs text-zinc-500 mt-1 max-w-sm mx-auto">
                  Turn on your camera in the 1-on-1 Video Studio during mock interview questions to receive live body language and posture critiques.
                </p>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: Top 1% Model Answer */}
        {activeTab === 'exemplar' && (
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center space-x-1.5 text-xs text-zinc-500">
                <Award className="w-4 h-4 text-amber-500" />
                <span>Tailored model formulation using your real accomplishments:</span>
              </div>
              <div className="flex items-center space-x-2">
                {/* Audio Listen Button */}
                <button
                  type="button"
                  onClick={handleTogglePlayExemplar}
                  className={`text-xs font-semibold px-3 py-1 rounded-md border flex items-center space-x-1.5 transition-colors cursor-pointer ${
                    isPlayingExemplar
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                      : 'bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-50'
                  }`}
                >
                  {isPlayingExemplar ? (
                    <>
                      <Square className="w-3 h-3 fill-current text-emerald-600" />
                      <span>Stop Playing</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-3.5 h-3.5 text-zinc-600" />
                      <span>Listen to Model Answer</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleCopyExemplar}
                  className="text-xs font-medium text-zinc-600 hover:text-zinc-900 flex items-center space-x-1 px-2.5 py-1 rounded-md border border-zinc-200 bg-white cursor-pointer"
                >
                  {copiedExemplar ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Answer</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="p-4 bg-zinc-900 text-zinc-100 rounded-lg font-mono text-xs leading-relaxed whitespace-pre-wrap shadow-inner">
              {evaluation.exemplarAnswer}
            </div>

            <p className="text-[11px] text-zinc-500 italic">
              Notice how the exemplar establishes immediate stakes, details specific personal engineering/leadership actions without vague &ldquo;we&rdquo;, and ends with quantifiable metrics.
            </p>
          </div>
        )}

        {/* TAB 4: Coach Nuggets & Follow-up */}
        {activeTab === 'tips' && (
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-zinc-50 border border-zinc-200">
              <div className="flex items-center space-x-2 text-xs font-bold text-zinc-900 mb-1.5">
                <Lightbulb className="w-4 h-4 text-amber-500" />
                <span>Interviewer Delivery Tip</span>
              </div>
              <p className="text-xs text-zinc-700 leading-relaxed">
                {evaluation.coachAdvice}
              </p>
            </div>

            {evaluation.potentialFollowUp && (
              <div className="p-4 rounded-lg bg-blue-50/70 border border-blue-200 text-xs">
                <div className="font-bold text-blue-900 mb-1 flex items-center space-x-1.5">
                  <MessageSquarePlus className="w-4 h-4 text-blue-600" />
                  <span>Likely Next Interviewer Follow-Up</span>
                </div>
                <p className="text-blue-950 italic mb-2">
                  &ldquo;{evaluation.potentialFollowUp}&rdquo;
                </p>
                <p className="text-[11px] text-blue-700">
                  Interviewer will likely probe this specific trade-off or metric. You can practice responding below!
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Action Buttons Footer */}
      <div className="p-4 sm:p-5 bg-zinc-50 border-t border-zinc-200 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={onRetryQuestion}
            className="px-3.5 py-2 rounded-lg border border-zinc-200 bg-white hover:bg-zinc-100 text-zinc-800 text-xs font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-zinc-500" />
            <span>Retry This Question</span>
          </button>

          {hasFollowUpAvailable && evaluation.potentialFollowUp && onTakeFollowUp && (
            <button
              type="button"
              onClick={() => onTakeFollowUp(evaluation.potentialFollowUp!)}
              className="px-3.5 py-2 rounded-lg border border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-800 text-xs font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer"
            >
              <MessageSquarePlus className="w-3.5 h-3.5 text-blue-600" />
              <span>Practice Follow-up Probe</span>
            </button>
          )}

          {!isLastQuestion && onFinishEarly && (
            <button
              type="button"
              onClick={onFinishEarly}
              className="px-3.5 py-2 rounded-lg border border-zinc-200 bg-zinc-50 hover:bg-zinc-100 text-zinc-700 text-xs font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer"
              title="Finish interview and synthesize final executive report now"
            >
              <Award className="w-3.5 h-3.5 text-amber-600" />
              <span>Finish & View Scorecard</span>
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={onNextQuestion}
          className="px-5 py-2 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold rounded-lg shadow-xs flex items-center space-x-1.5 transition-colors cursor-pointer"
        >
          <span>{isLastQuestion ? 'Complete Mock & View Final Report' : 'Next Interview Question'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
