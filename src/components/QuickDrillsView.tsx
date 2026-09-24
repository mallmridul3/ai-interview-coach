import React, { useState } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  Clock, 
  ChevronRight, 
  Send, 
  Lightbulb, 
  CheckCircle2, 
  RotateCcw,
  Mic,
  MicOff,
  Filter
} from 'lucide-react';
import { QuickDrillQuestion, AnswerEvaluation } from '../types';
import { QUICK_DRILL_QUESTIONS } from '../data/mockData';
import { speakText, isSpeechRecognitionSupported } from '../utils/speechUtils';

export const QuickDrillsView: React.FC = () => {
  const [questions, setQuestions] = useState<QuickDrillQuestion[]>(QUICK_DRILL_QUESTIONS);
  const [selectedQuestionId, setSelectedQuestionId] = useState<string>(QUICK_DRILL_QUESTIONS[0].id);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showTips, setShowTips] = useState<boolean>(true);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isGrading, setIsGrading] = useState<boolean>(false);
  const [isGeneratingFresh, setIsGeneratingFresh] = useState<boolean>(false);
  const [evaluation, setEvaluation] = useState<AnswerEvaluation | null>(null);

  const activeQuestion = questions.find((q) => q.id === selectedQuestionId) || questions[0];

  const categories = ['All', 'Conflict Resolution', 'Failure & Resilience', 'Motivation & Culture', 'Prioritization & Ambiguity', 'Influence Without Authority', 'Ethics & Risk Management'];

  const filteredQuestions = selectedCategory === 'All' 
    ? questions 
    : questions.filter((q) => q.category.toLowerCase().includes(selectedCategory.toLowerCase()));

  const handleSelectQuestion = (q: QuickDrillQuestion) => {
    setSelectedQuestionId(q.id);
    setUserAnswer('');
    setEvaluation(null);
  };

  const handleGenerateFreshDrill = async () => {
    setIsGeneratingFresh(true);
    try {
      const res = await fetch('/api/interview/quick-drill', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: selectedCategory === 'All' ? 'Behavioral & Leadership' : selectedCategory,
          difficulty: 'Medium',
        }),
      });
      const data = await res.json();
      if (data.drill) {
        setQuestions((prev) => [data.drill, ...prev]);
        setSelectedQuestionId(data.drill.id);
        setUserAnswer('');
        setEvaluation(null);
      }
    } catch (err) {
      console.error('Failed to generate drill:', err);
    } finally {
      setIsGeneratingFresh(false);
    }
  };

  const handleGradeDrillAnswer = async () => {
    if (!userAnswer.trim() || isGrading) return;
    setIsGrading(true);
    try {
      const res = await fetch('/api/interview/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: activeQuestion.question,
          userAnswer: userAnswer.trim(),
          roleTitle: 'Engineering / Product Candidate',
          level: 'Senior',
          track: activeQuestion.category,
          personaName: 'Coach Alex',
          personaTone: 'Constructive and insightful',
        }),
      });
      const data = await res.json();
      if (data.evaluation) {
        setEvaluation(data.evaluation);
      }
    } catch (err) {
      console.error('Failed to grade drill answer:', err);
    } finally {
      setIsGrading(false);
    }
  };

  const handleToggleVoice = () => {
    if (!isSpeechRecognitionSupported()) return;
    if (isRecording) {
      setIsRecording(false);
      return;
    }

    try {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const rec = new SpeechRecognition();
      rec.continuous = true;
      rec.interimResults = true;
      rec.lang = 'en-US';

      rec.onresult = (e: any) => {
        let final = '';
        for (let i = e.resultIndex; i < e.results.length; ++i) {
          if (e.results[i].isFinal) {
            final += e.results[i][0].transcript + ' ';
          }
        }
        if (final) {
          setUserAnswer((prev) => (prev ? prev.trim() + ' ' + final.trim() : final.trim()));
        }
      };

      rec.onend = () => setIsRecording(false);
      rec.onerror = () => setIsRecording(false);

      rec.start();
      setIsRecording(true);
    } catch (e) {
      console.error(e);
      setIsRecording(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-zinc-100 rounded-full text-xs font-semibold text-zinc-700 mb-2">
            <BookOpen className="w-3.5 h-3.5 text-zinc-600" />
            <span>Targeted Practice Drills</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900">
            Rapid Interview Question Bank
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1">
            Hone your answers to tough behavioral and situational curveballs with immediate AI feedback.
          </p>
        </div>

        <button
          type="button"
          onClick={handleGenerateFreshDrill}
          disabled={isGeneratingFresh}
          className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold rounded-lg shadow-xs flex items-center space-x-2 transition-all cursor-pointer self-start sm:self-auto"
        >
          {isGeneratingFresh ? (
            <>
              <div className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              <span>Generating Fresh AI Drill...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Generate AI Drill Question</span>
            </>
          )}
        </button>
      </div>

      {/* Category Pills Filter */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 mb-6 scrollbar-none">
        <Filter className="w-4 h-4 text-zinc-400 shrink-0" />
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
              selectedCategory === cat
                ? 'bg-zinc-900 text-white'
                : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Question List */}
        <div className="lg:col-span-4 space-y-2 max-h-[700px] overflow-y-auto pr-1">
          {filteredQuestions.map((q) => {
            const isSelected = q.id === activeQuestion.id;
            return (
              <div
                key={q.id}
                onClick={() => handleSelectQuestion(q)}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'border-zinc-900 bg-white ring-1 ring-zinc-900 shadow-xs'
                    : 'border-zinc-200 bg-zinc-50/60 hover:bg-white hover:border-zinc-300'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className="font-semibold text-zinc-500 uppercase tracking-wider truncate">
                    {q.category}
                  </span>
                  <span className={`px-2 py-0.5 rounded-sm text-[10px] font-bold ${
                    q.difficulty === 'Curveball'
                      ? 'bg-rose-100 text-rose-800'
                      : q.difficulty === 'Challenging'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-zinc-200 text-zinc-700'
                  }`}>
                    {q.difficulty}
                  </span>
                </div>
                <p className="text-xs font-semibold text-zinc-900 line-clamp-2">
                  {q.question}
                </p>
              </div>
            );
          })}
        </div>

        {/* Right Active Drill Stage */}
        <div className="lg:col-span-8 space-y-5">
          <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-xs">
            {/* Question Details */}
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3 mb-4">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-sm bg-zinc-100 text-zinc-700">
                  {activeQuestion.category}
                </span>
                <span className="text-xs text-zinc-500 flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Ideal response: ~{Math.floor(activeQuestion.idealTimeSeconds / 60)}m</span>
                </span>
              </div>
            </div>

            <h2 className="text-lg sm:text-xl font-bold text-zinc-900 mb-4 leading-snug">
              &ldquo;{activeQuestion.question}&rdquo;
            </h2>

            {/* Framework Tips Box */}
            <div className="bg-amber-50/70 border border-amber-200/80 rounded-lg p-3.5 text-xs text-amber-950 mb-5">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold flex items-center space-x-1.5 text-amber-900">
                  <Lightbulb className="w-4 h-4 text-amber-600" />
                  <span>Winning Structure Tips</span>
                </span>
                <button
                  type="button"
                  onClick={() => setShowTips(!showTips)}
                  className="text-[11px] underline font-medium text-amber-800"
                >
                  {showTips ? 'Hide Tips' : 'Show Tips'}
                </button>
              </div>
              {showTips && (
                <ul className="space-y-1.5 list-disc list-inside text-amber-900">
                  {activeQuestion.frameworkTips.map((tip, i) => (
                    <li key={i}>{tip}</li>
                  ))}
                </ul>
              )}
            </div>

            {/* Input Response Box */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase text-zinc-700">
                  Practice Your Answer
                </label>
                <button
                  type="button"
                  onClick={handleToggleVoice}
                  className={`text-xs font-semibold px-2.5 py-1 rounded-md border flex items-center space-x-1 transition-colors ${
                    isRecording
                      ? 'bg-rose-500 text-white border-rose-600 animate-pulse'
                      : 'bg-zinc-50 border-zinc-200 text-zinc-700 hover:bg-zinc-100'
                  }`}
                >
                  {isRecording ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
                  <span>{isRecording ? 'Listening...' : 'Voice Input'}</span>
                </button>
              </div>

              <textarea
                rows={5}
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Draft or dictate your structured response here to get instantaneous AI scoring..."
                className="w-full p-3.5 text-xs sm:text-sm bg-zinc-50 border border-zinc-200 rounded-lg text-zinc-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-zinc-900 leading-relaxed"
              />

              <div className="flex items-center justify-end space-x-2">
                {userAnswer && (
                  <button
                    type="button"
                    onClick={() => {
                      setUserAnswer('');
                      setEvaluation(null);
                    }}
                    className="px-3 py-1.5 text-xs text-zinc-500 hover:text-zinc-800"
                  >
                    Clear
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleGradeDrillAnswer}
                  disabled={!userAnswer.trim() || isGrading}
                  className="px-5 py-2 bg-zinc-900 hover:bg-zinc-800 disabled:opacity-40 text-white text-xs font-semibold rounded-lg shadow-xs flex items-center space-x-1.5 transition-all cursor-pointer"
                >
                  {isGrading ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      <span>Grading Answer...</span>
                    </>
                  ) : (
                    <>
                      <span>Grade My Drill Response</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Drill Grading Result */}
          {evaluation && (
            <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-xs space-y-4 animate-in fade-in duration-300">
              <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-xl bg-zinc-900 text-white flex flex-col items-center justify-center font-bold">
                    <span className="text-lg leading-none">{evaluation.overallScore}</span>
                    <span className="text-[9px] uppercase tracking-wider text-zinc-400">Score</span>
                  </div>
                  <div>
                    <span className="text-sm font-bold text-zinc-900">Drill Critique</span>
                    <div className="text-xs text-zinc-500">Verdict: <strong>{evaluation.verdict}</strong></div>
                  </div>
                </div>

                <div className="text-xs text-zinc-600 flex items-center space-x-3">
                  <span>Clarity: <strong>{evaluation.communicationClarity}%</strong></span>
                  <span>Depth: <strong>{evaluation.depthAndImpact}%</strong></span>
                </div>
              </div>

              {/* Strengths & Improvements */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-emerald-50/70 border border-emerald-200/80 rounded-lg">
                  <span className="font-bold text-emerald-900 block mb-1">What was strong:</span>
                  <ul className="space-y-1 text-emerald-950">
                    {evaluation.strengths.map((s, i) => (
                      <li key={i}>&bull; {s}</li>
                    ))}
                  </ul>
                </div>
                <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-lg">
                  <span className="font-bold text-amber-900 block mb-1">How to tighten:</span>
                  <ul className="space-y-1 text-amber-950">
                    {evaluation.areasForImprovement.map((a, i) => (
                      <li key={i}>&bull; {a}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Exemplar answer */}
              <div>
                <span className="text-xs font-bold text-zinc-800 block mb-1">Model Formulation:</span>
                <div className="bg-zinc-900 text-zinc-100 p-3.5 rounded-lg font-mono text-xs leading-relaxed whitespace-pre-wrap">
                  {evaluation.exemplarAnswer}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
