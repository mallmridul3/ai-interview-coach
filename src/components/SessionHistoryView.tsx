import React, { useState } from 'react';
import { 
  History, 
  Trash2, 
  Award, 
  Sparkles, 
  Eye, 
  X,
  FileText,
  TrendingUp,
  Target,
  BarChart3,
  ExternalLink,
  Calendar
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';
import { SavedInterviewSession } from '../types';

interface SessionHistoryViewProps {
  sessions: SavedInterviewSession[];
  onDeleteSession: (id: string) => void;
  onClearAll: () => void;
  onStartNewMock: () => void;
  onLoadSessionInReport?: (session: SavedInterviewSession) => void;
}

export const SessionHistoryView: React.FC<SessionHistoryViewProps> = ({
  sessions,
  onDeleteSession,
  onClearAll,
  onStartNewMock,
  onLoadSessionInReport,
}) => {
  const [selectedSession, setSelectedSession] = useState<SavedInterviewSession | null>(null);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-700 bg-emerald-50 border-emerald-200';
    if (score >= 65) return 'text-blue-700 bg-blue-50 border-blue-200';
    if (score >= 50) return 'text-amber-700 bg-amber-50 border-amber-200';
    return 'text-rose-700 bg-rose-50 border-rose-200';
  };

  const formatDate = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return isoString;
    }
  };

  // KPIs
  const totalSessions = sessions.length;
  const avgScore = totalSessions > 0
    ? Math.round(sessions.reduce((acc, s) => acc + s.overallScore, 0) / totalSessions)
    : 0;
  const highestScore = totalSessions > 0
    ? Math.max(...sessions.map((s) => s.overallScore))
    : 0;
  const totalQuestions = sessions.reduce((acc, s) => acc + (s.turns?.length || 0), 0);

  // Chronological chart data
  const chartData = [...sessions]
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
    .map((s, idx) => ({
      name: `#${idx + 1}`,
      date: new Date(s.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
      score: s.overallScore,
      role: `${s.level} ${s.roleTitle}`,
    }));

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-zinc-100 rounded-full text-xs font-semibold text-zinc-700 mb-2">
            <History className="w-3.5 h-3.5 text-zinc-600" />
            <span>Practice Records & Progress</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900">
            Interview History & Scorecards
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1">
            Review your past mock interviews, track score improvements, and revisit model answer formulations.
          </p>
        </div>

        {sessions.length > 0 && (
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={onClearAll}
              className="px-3 py-1.5 text-xs text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded-lg border border-transparent hover:border-rose-200 transition-colors cursor-pointer"
            >
              Clear All Records
            </button>
          </div>
        )}
      </div>

      {/* KPI Overview Cards */}
      {sessions.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <div className="bg-white border border-zinc-200 rounded-xl p-4 shadow-xs">
            <div className="flex items-center justify-between text-zinc-400 mb-1">
              <span className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">Total Mocks</span>
              <History className="w-4 h-4 text-zinc-400" />
            </div>
            <div className="text-2xl font-bold text-zinc-900">{totalSessions}</div>
            <div className="text-[10px] text-zinc-400 mt-0.5">Sessions logged</div>
          </div>

          <div className="bg-white border border-zinc-200 rounded-xl p-4 shadow-xs">
            <div className="flex items-center justify-between text-zinc-400 mb-1">
              <span className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">Average Score</span>
              <Award className="w-4 h-4 text-blue-500" />
            </div>
            <div className="text-2xl font-bold text-zinc-900">{avgScore}<span className="text-xs font-normal text-zinc-500">/100</span></div>
            <div className="text-[10px] text-zinc-400 mt-0.5">Overall grading mean</div>
          </div>

          <div className="bg-white border border-zinc-200 rounded-xl p-4 shadow-xs">
            <div className="flex items-center justify-between text-zinc-400 mb-1">
              <span className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">Highest Score</span>
              <Target className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-2xl font-bold text-emerald-600">{highestScore}<span className="text-xs font-normal text-zinc-500">/100</span></div>
            <div className="text-[10px] text-zinc-400 mt-0.5">Personal best</div>
          </div>

          <div className="bg-white border border-zinc-200 rounded-xl p-4 shadow-xs">
            <div className="flex items-center justify-between text-zinc-400 mb-1">
              <span className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">Questions Answered</span>
              <BarChart3 className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl font-bold text-zinc-900">{totalQuestions}</div>
            <div className="text-[10px] text-zinc-400 mt-0.5">Total STAR responses</div>
          </div>
        </div>
      )}

      {/* Progress Trend Chart */}
      {sessions.length >= 2 && (
        <div className="bg-white border border-zinc-200 rounded-xl p-5 shadow-xs mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <h2 className="text-sm font-bold text-zinc-900">Score Progression Over Time</h2>
            </div>
            <span className="text-xs text-zinc-400">{sessions.length} sessions evaluated</span>
          </div>

          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#71717a' }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#71717a' }} />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const d = payload[0].payload;
                      return (
                        <div className="bg-zinc-900 text-white text-xs p-2.5 rounded-lg shadow-lg border border-zinc-800">
                          <div className="font-bold text-amber-300">{d.role}</div>
                          <div className="text-zinc-400 text-[10px]">{d.date}</div>
                          <div className="mt-1 font-semibold text-emerald-400">Score: {d.score}/100</div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#10b981"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: '#10b981', strokeWidth: 1.5, stroke: '#ffffff' }}
                  activeDot={{ r: 6, fill: '#059669' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {sessions.length === 0 ? (
        <div className="text-center py-16 px-4 bg-white border border-zinc-200 rounded-xl shadow-xs">
          <div className="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center mx-auto mb-4 text-zinc-400">
            <History className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-zinc-900 mb-1">No Saved Sessions Yet</h2>
          <p className="text-xs sm:text-sm text-zinc-500 max-w-sm mx-auto mb-6">
            Complete a mock interview round to save your hiring scorecard and question transcripts.
          </p>
          <button
            type="button"
            onClick={onStartNewMock}
            className="px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white text-xs sm:text-sm font-semibold rounded-lg shadow-xs inline-flex items-center space-x-2 transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Start Your First Mock Interview</span>
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {sessions.map((session) => (
            <div
              key={session.id}
              className="bg-white border border-zinc-200 rounded-xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-zinc-300 transition-all"
            >
              <div className="flex items-start space-x-4">
                <div className={`w-14 h-14 rounded-xl border flex flex-col items-center justify-center font-bold shrink-0 ${getScoreColor(session.overallScore)}`}>
                  <span className="text-xl leading-none">{session.overallScore}</span>
                  <span className="text-[9px] uppercase tracking-wider opacity-70">Score</span>
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="text-sm sm:text-base font-bold text-zinc-900">
                      {session.level} {session.roleTitle}
                    </h3>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-sm bg-zinc-100 text-zinc-700">
                      {session.targetCompany}
                    </span>
                    {session.finalReport?.hiringRecommendation && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-sm bg-emerald-100 text-emerald-800">
                        {session.finalReport.hiringRecommendation}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-500">
                    <span>{session.track}</span>
                    <span>&bull;</span>
                    <span>Interviewer: {session.personaName}</span>
                    <span>&bull;</span>
                    <span>{formatDate(session.createdAt)}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2 self-end sm:self-center">
                {onLoadSessionInReport && (
                  <button
                    type="button"
                    onClick={() => onLoadSessionInReport(session)}
                    className="px-3.5 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold rounded-lg flex items-center space-x-1.5 transition-colors cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Open Full Report</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setSelectedSession(session)}
                  className="px-3 py-1.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-semibold rounded-lg flex items-center space-x-1.5 transition-colors cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Quick View</span>
                </button>

                <button
                  type="button"
                  onClick={() => onDeleteSession(session.id)}
                  title="Delete session"
                  className="p-1.5 text-zinc-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Detail Modal */}
      {selectedSession && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-xl border border-zinc-200">
            <div className="p-6 border-b border-zinc-100 flex items-center justify-between sticky top-0 bg-white z-10">
              <div>
                <h2 className="text-lg font-bold text-zinc-900">
                  {selectedSession.level} {selectedSession.roleTitle}
                </h2>
                <div className="text-xs text-zinc-500">
                  {selectedSession.targetCompany} &bull; {formatDate(selectedSession.createdAt)}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedSession(null)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Executive Summary */}
              {selectedSession.finalReport?.executiveSummary && (
                <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-200 text-xs sm:text-sm text-zinc-700 leading-relaxed whitespace-pre-wrap">
                  <div className="font-bold text-zinc-900 uppercase text-xs mb-2">Executive Summary:</div>
                  {selectedSession.finalReport.executiveSummary}
                </div>
              )}

              {/* Questions & Answers */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-600 mb-3">
                  Interview Questions & Performance ({selectedSession.turns.length})
                </h3>
                <div className="space-y-4">
                  {selectedSession.turns.map((t, idx) => (
                    <div key={t.id} className="p-4 rounded-xl border border-zinc-200 bg-white space-y-2.5 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-zinc-900">Question {idx + 1}: {t.question.question}</span>
                        {t.evaluation && (
                          <span className="px-2 py-0.5 rounded-md font-bold bg-zinc-100 text-zinc-800">
                            {t.evaluation.overallScore}/100
                          </span>
                        )}
                      </div>
                      <div className="p-3 bg-zinc-50 rounded-lg text-zinc-700 italic">
                        &ldquo;{t.userAnswer}&rdquo;
                      </div>
                      {t.evaluation && (
                        <div>
                          <span className="font-bold text-zinc-700">Top 1% Model Exemplar:</span>
                          <div className="mt-1 p-3 bg-zinc-900 text-zinc-100 rounded-lg font-mono text-[11px] whitespace-pre-wrap">
                            {t.evaluation.exemplarAnswer}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-zinc-100 bg-zinc-50 flex items-center justify-between">
              {onLoadSessionInReport && (
                <button
                  type="button"
                  onClick={() => {
                    const session = selectedSession;
                    setSelectedSession(null);
                    onLoadSessionInReport(session);
                  }}
                  className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold rounded-lg flex items-center space-x-1.5 transition-colors cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open in Full Interactive Scorecard</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => setSelectedSession(null)}
                className="px-4 py-2 bg-white border border-zinc-200 hover:bg-zinc-100 text-zinc-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                Close Review
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
