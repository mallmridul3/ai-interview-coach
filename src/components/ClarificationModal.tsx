import React, { useState } from 'react';
import { 
  X, 
  HelpCircle, 
  Send, 
  Sparkles, 
  MessageSquare, 
  Volume2, 
  Square,
  Lightbulb,
  CheckCircle2
} from 'lucide-react';
import { InterviewerPersona, InterviewQuestion, TurnClarification } from '../types';
import { speakText, stopSpeaking } from '../utils/speechUtils';

interface ClarificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  question: InterviewQuestion;
  persona: InterviewerPersona;
  roleTitle: string;
  level: string;
  onClarificationReceived: (clarification: TurnClarification) => void;
  existingClarifications?: TurnClarification[];
}

export const ClarificationModal: React.FC<ClarificationModalProps> = ({
  isOpen,
  onClose,
  question,
  persona,
  roleTitle,
  level,
  onClarificationReceived,
  existingClarifications = [],
}) => {
  const [candidateQuery, setCandidateQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeakingResponse, setIsSpeakingResponse] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmitClarification = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!candidateQuery.trim() || isLoading) return;

    setIsLoading(true);
    setErrorMsg(null);

    try {
      const response = await fetch('/api/interview/clarify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: question.question,
          candidateClarification: candidateQuery.trim(),
          roleTitle,
          level,
          personaName: persona.name,
          personaTone: persona.tonePrompt,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get clarification from interviewer');
      }

      const data = await response.json();
      const newClarification: TurnClarification = {
        candidateQuery: candidateQuery.trim(),
        interviewerResponse: data.interviewerResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      onClarificationReceived(newClarification);
      setCandidateQuery('');

      // Speak interviewer's clarification in character
      setIsSpeakingResponse(true);
      speakText(data.interviewerResponse, () => {
        setIsSpeakingResponse(false);
      });
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err?.message || 'Could not connect with interviewer');
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleSpeak = (text: string) => {
    if (isSpeakingResponse) {
      stopSpeaking();
      setIsSpeakingResponse(false);
    } else {
      setIsSpeakingResponse(true);
      speakText(text, () => {
        setIsSpeakingResponse(false);
      });
    }
  };

  const handleClose = () => {
    stopSpeaking();
    setIsSpeakingResponse(false);
    onClose();
  };

  const quickClarificationPrompts = [
    'Can I assume we are optimizing for low latency over strong consistency?',
    'What scale of daily active users or transactions should I design for?',
    'Is the target audience mobile-first consumers or enterprise operators?',
    'Should I assume greenfield development or backward compatibility with legacy systems?',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl border border-zinc-200 max-w-xl w-full overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/70">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-full bg-zinc-900 text-white font-bold flex items-center justify-center text-sm shadow-xs">
              {persona.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-sm font-bold text-zinc-900">Clarify with {persona.name}</h3>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-sm bg-zinc-200/70 text-zinc-700">
                  {persona.role}
                </span>
              </div>
              <p className="text-xs text-zinc-500">
                Top candidates clarify scope, constraints, and metrics before answering
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="text-zinc-400 hover:text-zinc-600 p-1.5 rounded-lg hover:bg-zinc-100 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4 overflow-y-auto flex-1">
          {/* Question Banner */}
          <div className="p-3.5 bg-zinc-50 rounded-xl border border-zinc-200 text-xs">
            <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1">Current Question:</div>
            <p className="font-semibold text-zinc-800 leading-snug">
              &ldquo;{question.question}&rdquo;
            </p>
          </div>

          {/* Clarification History */}
          {existingClarifications.length > 0 && (
            <div className="space-y-3">
              <div className="text-xs font-bold text-zinc-700 uppercase tracking-wider flex items-center space-x-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-zinc-500" />
                <span>Conversation Log ({existingClarifications.length})</span>
              </div>
              {existingClarifications.map((item, idx) => (
                <div key={idx} className="space-y-2 text-xs">
                  <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-lg text-blue-950 ml-4">
                    <span className="font-bold text-[10px] text-blue-700 uppercase block mb-0.5">You asked ({item.timestamp}):</span>
                    <span>&ldquo;{item.candidateQuery}&rdquo;</span>
                  </div>
                  <div className="p-3.5 bg-zinc-900 text-zinc-100 rounded-lg mr-4 relative">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-[10px] text-emerald-400 uppercase">
                        {persona.name} replied:
                      </span>
                      <button
                        type="button"
                        onClick={() => handleToggleSpeak(item.interviewerResponse)}
                        className="text-zinc-400 hover:text-white p-1 rounded-sm"
                        title="Listen to response"
                      >
                        {isSpeakingResponse ? <Square className="w-3 h-3 fill-current text-emerald-400" /> : <Volume2 className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                    <p className="leading-relaxed whitespace-pre-wrap">{item.interviewerResponse}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Quick Click Prompts */}
          <div>
            <div className="text-xs font-semibold text-zinc-700 mb-2 flex items-center space-x-1">
              <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
              <span>Recommended Clarification Angles:</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {quickClarificationPrompts.map((prompt, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setCandidateQuery(prompt)}
                  className="text-left text-[11px] px-2.5 py-1.5 bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 rounded-lg text-zinc-700 transition-colors cursor-pointer"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-700">
              {errorMsg}
            </div>
          )}
        </div>

        {/* Input Footer */}
        <form onSubmit={handleSubmitClarification} className="p-4 border-t border-zinc-200 bg-zinc-50 flex items-center space-x-2">
          <input
            type="text"
            value={candidateQuery}
            onChange={(e) => setCandidateQuery(e.target.value)}
            placeholder={`Ask ${persona.name} to clarify scale, trade-offs, constraints...`}
            className="flex-1 px-3.5 py-2.5 bg-white border border-zinc-200 rounded-lg text-xs text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-900"
          />
          <button
            type="submit"
            disabled={!candidateQuery.trim() || isLoading}
            className="px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 disabled:opacity-40 text-white text-xs font-semibold rounded-lg flex items-center space-x-1.5 transition-colors cursor-pointer shrink-0"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span>Ask</span>
                <Send className="w-3 h-3" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
