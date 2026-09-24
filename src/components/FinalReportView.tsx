import React, { useState } from 'react';
import { 
  Award, 
  CheckCircle2, 
  AlertTriangle, 
  ListChecks, 
  Copy, 
  Check, 
  RotateCcw, 
  Download, 
  ChevronDown, 
  ChevronUp, 
  BarChart3,
  Clock,
  Sparkles,
  HelpCircle,
  Radar as RadarIcon,
  Printer,
  ScanEye,
  Eye,
  Activity,
  Gauge,
  Lightbulb
} from 'lucide-react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { SessionFinalReport, InterviewTurn, RoleSetup } from '../types';

interface FinalReportViewProps {
  report: SessionFinalReport;
  turns: InterviewTurn[];
  setup: RoleSetup;
  onStartNewMock: () => void;
  onSaveSession: () => void;
  isSaved: boolean;
  onOpenWorkspaceModal?: () => void;
}

export const FinalReportView: React.FC<FinalReportViewProps> = ({
  report,
  turns,
  setup,
  onStartNewMock,
  onSaveSession,
  isSaved,
  onOpenWorkspaceModal,
}) => {
  const [copiedReport, setCopiedReport] = useState(false);
  const [expandedTurnId, setExpandedTurnId] = useState<string | null>(null);

  const getVerdictStyle = (rec: string) => {
    switch (rec) {
      case 'Strong Hire':
        return 'bg-emerald-600 text-white';
      case 'Hire':
        return 'bg-emerald-500 text-white';
      case 'Leaning Hire':
        return 'bg-blue-600 text-white';
      case 'Leaning No Hire':
        return 'bg-amber-600 text-white';
      default:
        return 'bg-rose-600 text-white';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-700 bg-emerald-50 border-emerald-200';
    if (score >= 65) return 'text-blue-700 bg-blue-50 border-blue-200';
    if (score >= 50) return 'text-amber-700 bg-amber-50 border-amber-200';
    return 'text-rose-700 bg-rose-50 border-rose-200';
  };

  const handleCopyReport = () => {
    const text = `=== AI INTERVIEW COACH - FINAL DEBRIEF REPORT ===
Role: ${setup.level} ${setup.roleTitle} at ${setup.targetCompany}
Overall Score: ${report.overallScore}/100
Hiring Recommendation: ${report.hiringRecommendation}

EXECUTIVE SUMMARY:
${report.executiveSummary}

COMPETENCY SCORES:
- Communication: ${report.competencies.communication}%
- Leadership & Influence: ${report.competencies.leadershipAndInfluence}%
- Problem Solving: ${report.competencies.problemSolvingAndAnalytical}%
- Domain Expertise: ${report.competencies.domainExpertise}%
- Impact & Metrics: ${report.competencies.impactAndMetricsOrientation}%
${report.executivePresenceSummary ? `
BODY LANGUAGE & EXECUTIVE PRESENCE:
- Presence Score: ${report.executivePresenceSummary.overallScore}%
- Eye Contact: ${report.executivePresenceSummary.eyeContactScore}% - ${report.executivePresenceSummary.eyeContactFeedback}
- Posture: ${report.executivePresenceSummary.postureScore}% - ${report.executivePresenceSummary.postureFeedback}
- Composure: ${report.executivePresenceSummary.facialComposureScore}% - ${report.executivePresenceSummary.facialComposureFeedback}
` : ''}
TOP STRENGTHS:
${report.topStrengths.map((s) => `• ${s}`).join('\n')}

CRITICAL GAPS TO CLOSE:
${report.criticalGapsToClose.map((g) => `• ${g}`).join('\n')}

RECOMMENDED ACTION PLAN:
${report.actionablePrepPlan.map((p, i) => `${i + 1}. ${p}`).join('\n')}
`;
    navigator.clipboard.writeText(text);
    setCopiedReport(true);
    setTimeout(() => setCopiedReport(false), 2000);
  };

  const handlePrintPdf = () => {
    window.print();
  };

  const formatSeconds = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const remaining = sec % 60;
    return `${mins}m ${remaining}s`;
  };

  const totalSpeakingTime = turns.reduce((acc, t) => acc + (t.durationSeconds || 0), 0);
  const totalFillers = turns.reduce((acc, t) => acc + (t.evaluation?.deliveryMetrics?.fillerWordsCount || 0), 0);
  const avgWpm = Math.round(
    turns.reduce((acc, t) => acc + (t.evaluation?.deliveryMetrics?.wpm || 135), 0) / (turns.length || 1)
  );

  const radarData = [
    {
      subject: 'Communication',
      score: report.competencies.communication,
      benchmark: 75,
      fullMark: 100,
    },
    {
      subject: 'Leadership',
      score: report.competencies.leadershipAndInfluence,
      benchmark: 70,
      fullMark: 100,
    },
    {
      subject: 'Problem Solving',
      score: report.competencies.problemSolvingAndAnalytical,
      benchmark: 80,
      fullMark: 100,
    },
    {
      subject: 'Technical Depth',
      score: report.competencies.domainExpertise,
      benchmark: 80,
      fullMark: 100,
    },
    {
      subject: 'Impact & Metrics',
      score: report.competencies.impactAndMetricsOrientation,
      benchmark: 75,
      fullMark: 100,
    },
  ];

  const CustomRadarTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0];
      const data = item.payload;
      return (
        <div className="bg-zinc-900 text-white px-3 py-2 rounded-lg shadow-xl border border-zinc-700 text-xs select-none">
          <p className="font-bold text-zinc-100 mb-0.5">{data.subject}</p>
          <p className="text-emerald-400 font-semibold">Candidate Score: {data.score}%</p>
          <p className="text-zinc-400 text-[11px]">Target Benchmark: {data.benchmark}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 space-y-6 print:py-2 print:px-2">
      {/* Top Banner & Verdict */}
      <div className="bg-white border border-zinc-200 rounded-xl shadow-xs overflow-hidden">
        <div className="p-6 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-zinc-100 pb-6">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 bg-zinc-100 rounded-full text-xs font-semibold text-zinc-800 mb-2">
                <Award className="w-3.5 h-3.5 text-amber-500" />
                <span>Hiring Committee Debrief</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900">
                {setup.level} {setup.roleTitle}
              </h1>
              <p className="text-xs sm:text-sm text-zinc-500 mt-1">
                Target: <strong>{setup.targetCompany}</strong> &bull; Track: <strong>{setup.track}</strong>
              </p>
            </div>

            {/* Verdict Badge & Score */}
            <div className="flex items-center space-x-4">
              <div className={`p-4 rounded-xl border flex flex-col items-center justify-center font-bold ${getScoreColor(report.overallScore)} shadow-xs`}>
                <span className="text-3xl leading-none">{report.overallScore}</span>
                <span className="text-[10px] font-medium uppercase tracking-wider opacity-80 mt-1">
                  Overall Score
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] uppercase font-semibold text-zinc-400 block">
                  Hiring Verdict
                </span>
                <span className={`inline-block px-3.5 py-1.5 rounded-lg text-sm font-bold shadow-xs ${getVerdictStyle(report.hiringRecommendation)}`}>
                  {report.hiringRecommendation}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Stats Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 text-xs">
            <div className="p-3 bg-zinc-50 rounded-lg border border-zinc-100">
              <span className="text-zinc-500 block text-[11px]">Questions Evaluated</span>
              <span className="text-base font-bold text-zinc-900">{turns.length} questions</span>
            </div>
            <div className="p-3 bg-zinc-50 rounded-lg border border-zinc-100">
              <span className="text-zinc-500 block text-[11px]">Total Speaking Time</span>
              <span className="text-base font-bold text-zinc-900 flex items-center space-x-1">
                <Clock className="w-3.5 h-3.5 text-zinc-500" />
                <span>{formatSeconds(totalSpeakingTime)}</span>
              </span>
            </div>
            <div className="p-3 bg-zinc-50 rounded-lg border border-zinc-100">
              <span className="text-zinc-500 block text-[11px]">Avg Speech Pacing</span>
              <span className="text-base font-bold text-zinc-900">{avgWpm} WPM</span>
            </div>
            <div className="p-3 bg-zinc-50 rounded-lg border border-zinc-100">
              <span className="text-zinc-500 block text-[11px]">Filler Words Count</span>
              <span className="text-base font-bold text-zinc-900">{totalFillers} detected</span>
            </div>
          </div>

          {/* Executive Summary */}
          <div className="mt-6 p-4 rounded-lg bg-zinc-50 border border-zinc-200">
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-800 mb-2 flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Hiring Committee Executive Evaluation</span>
            </h2>
            <div className="text-xs sm:text-sm text-zinc-700 leading-relaxed whitespace-pre-wrap">
              {report.executiveSummary}
            </div>
          </div>
        </div>
      </div>

      {/* Competency Pillar Radar & Benchmarks */}
      <div className="bg-white border border-zinc-200 rounded-xl p-6 sm:p-7 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-zinc-100">
          <div>
            <h2 className="text-sm font-bold text-zinc-900 flex items-center space-x-2">
              <RadarIcon className="w-4 h-4 text-zinc-700" />
              <span>Competency Radar & Hiring Benchmarks</span>
            </h2>
            <p className="text-xs text-zinc-500 mt-0.5">
              Multidimensional spider evaluation across communication, problem solving, technical depth, leadership, and business impact.
            </p>
          </div>

          {/* Radar Legend */}
          <div className="flex items-center space-x-4 text-xs shrink-0">
            <div className="flex items-center space-x-1.5">
              <span className="w-3 h-3 rounded-xs bg-emerald-500 inline-block" />
              <span className="text-zinc-700 font-medium">Candidate Score</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-3 h-0.5 border-t-2 border-dashed border-zinc-400 inline-block" />
              <span className="text-zinc-500 font-medium">Target Benchmark</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Radar Chart (Spider Plot) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-3 bg-zinc-50/60 rounded-xl border border-zinc-100">
            <div className="w-full h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                  <PolarGrid stroke="#e4e4e7" strokeDasharray="3 3" />
                  <PolarAngleAxis
                    dataKey="subject"
                    tick={{ fill: '#27272a', fontSize: 11, fontWeight: 600 }}
                  />
                  <PolarRadiusAxis
                    angle={90}
                    domain={[0, 100]}
                    tick={{ fill: '#71717a', fontSize: 9 }}
                    stroke="#e4e4e7"
                  />
                  <Tooltip content={<CustomRadarTooltip />} />
                  <Radar
                    name="Target Benchmark"
                    dataKey="benchmark"
                    stroke="#94a3b8"
                    strokeDasharray="4 4"
                    strokeWidth={1.5}
                    fill="#94a3b8"
                    fillOpacity={0.06}
                  />
                  <Radar
                    name="Candidate Score"
                    dataKey="score"
                    stroke="#10b981"
                    strokeWidth={2}
                    fill="#10b981"
                    fillOpacity={0.25}
                    dot={{ r: 4, fill: '#10b981', strokeWidth: 1.5, stroke: '#ffffff' }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-[11px] text-zinc-400 text-center mt-1">
              Radar nodes represent calibrated candidate performance relative to tier-1 benchmarks
            </p>
          </div>

          {/* Breakdown Bars & Detailed Metrics */}
          <div className="lg:col-span-7 space-y-3.5">
            {[
              { label: 'Communication & Conciseness', val: report.competencies.communication, desc: 'Clarity, pacing, absence of filler, structured thoughts' },
              { label: 'Leadership & Stakeholder Influence', val: report.competencies.leadershipAndInfluence, desc: 'Conflict resolution, rallying others, ownership of failures' },
              { label: 'Analytical & Problem Solving', val: report.competencies.problemSolvingAndAnalytical, desc: 'Decomposing ambiguity, trade-off evaluation, first-principles thinking' },
              { label: 'Domain & Technical Depth', val: report.competencies.domainExpertise, desc: 'Role-specific architectural decisions, system tradeoffs, best practices' },
              { label: 'Impact & Metrics Orientation', val: report.competencies.impactAndMetricsOrientation, desc: 'Quantifiable outcomes, business alignment, ROI focus' },
            ].map((comp) => (
              <div key={comp.label} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-zinc-800">{comp.label}</span>
                  <span className="font-bold text-zinc-900">{comp.val}%</span>
                </div>
                <div className="w-full bg-zinc-100 rounded-full h-2.5 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      comp.val >= 75 ? 'bg-emerald-500' : comp.val >= 60 ? 'bg-blue-500' : 'bg-amber-500'
                    }`}
                    style={{ width: `${comp.val}%` }}
                  />
                </div>
                <p className="text-[10px] text-zinc-400">{comp.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Executive Presence & Video Body Language Scorecard (when available) */}
      {report.executivePresenceSummary && (
        <div className="bg-white border border-emerald-200 rounded-xl p-6 sm:p-7 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-zinc-100">
            <div>
              <h2 className="text-sm font-bold text-zinc-900 flex items-center space-x-2">
                <ScanEye className="w-4 h-4 text-emerald-600" />
                <span>Executive Presence & Body Language Analysis</span>
              </h2>
              <p className="text-xs text-zinc-500 mt-0.5">
                AI computer vision critique of posture, camera eye-contact, facial composure, and non-verbal delivery.
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-zinc-500">Presence Score:</span>
              <span className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-900 font-bold text-sm">
                {report.executivePresenceSummary.overallScore}/100
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs mb-4">
            <div className="p-3.5 bg-zinc-50 rounded-lg border border-zinc-100">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-zinc-800 flex items-center space-x-1">
                  <Eye className="w-3.5 h-3.5 text-blue-600" />
                  <span>Eye Contact</span>
                </span>
                <span className="font-bold text-blue-700">{report.executivePresenceSummary.eyeContactScore}%</span>
              </div>
              <p className="text-zinc-600 text-[11px] leading-relaxed">
                {report.executivePresenceSummary.eyeContactFeedback}
              </p>
            </div>

            <div className="p-3.5 bg-zinc-50 rounded-lg border border-zinc-100">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-zinc-800 flex items-center space-x-1">
                  <Activity className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Posture Alignment</span>
                </span>
                <span className="font-bold text-emerald-700">{report.executivePresenceSummary.postureScore}%</span>
              </div>
              <p className="text-zinc-600 text-[11px] leading-relaxed">
                {report.executivePresenceSummary.postureFeedback}
              </p>
            </div>

            <div className="p-3.5 bg-zinc-50 rounded-lg border border-zinc-100">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-zinc-800">Facial Composure</span>
                <span className="font-bold text-zinc-700">{report.executivePresenceSummary.facialComposureScore}%</span>
              </div>
              <p className="text-zinc-600 text-[11px] leading-relaxed">
                {report.executivePresenceSummary.facialComposureFeedback}
              </p>
            </div>

            <div className="p-3.5 bg-zinc-50 rounded-lg border border-zinc-100">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-zinc-800">Gestures & Stillness</span>
                <span className="font-bold text-zinc-700">{report.executivePresenceSummary.gesturesAndFidgetingScore}%</span>
              </div>
              <p className="text-zinc-600 text-[11px] leading-relaxed">
                {report.executivePresenceSummary.gesturesFeedback}
              </p>
            </div>
          </div>

          {report.executivePresenceSummary.keyImprovements && (
            <div className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-lg text-xs">
              <span className="font-bold text-amber-900 flex items-center space-x-1.5 mb-1">
                <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                <span>Physical Presence & Posture Recommendations:</span>
              </span>
              <ul className="space-y-1">
                {report.executivePresenceSummary.keyImprovements.map((tip, idx) => (
                  <li key={idx} className="text-amber-950 flex items-start space-x-1.5">
                    <span className="text-amber-500 font-bold">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Strengths & Critical Gaps */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Strengths */}
        <div className="bg-white border border-emerald-200 rounded-xl p-6 shadow-xs bg-emerald-50/20">
          <div className="text-sm font-bold text-emerald-900 flex items-center space-x-2 mb-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Demonstrated Strengths</span>
          </div>
          <ul className="space-y-2">
            {report.topStrengths.map((str, idx) => (
              <li key={idx} className="text-xs text-zinc-700 flex items-start space-x-2">
                <span className="text-emerald-500 font-bold">•</span>
                <span>{str}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Gaps to Close */}
        <div className="bg-white border border-amber-200 rounded-xl p-6 shadow-xs bg-amber-50/20">
          <div className="text-sm font-bold text-amber-900 flex items-center space-x-2 mb-3">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>Critical Gaps to Close</span>
          </div>
          <ul className="space-y-2">
            {report.criticalGapsToClose.map((gap, idx) => (
              <li key={idx} className="text-xs text-zinc-700 flex items-start space-x-2">
                <span className="text-amber-500 font-bold">•</span>
                <span>{gap}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Actionable Prep Plan */}
      <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-xs">
        <h2 className="text-sm font-bold text-zinc-900 mb-3 flex items-center space-x-2">
          <ListChecks className="w-4 h-4 text-zinc-700" />
          <span>Actionable 3-Step Preparation Roadmap</span>
        </h2>
        <div className="space-y-2.5">
          {report.actionablePrepPlan.map((step, idx) => (
            <div key={idx} className="p-3 bg-zinc-50 rounded-lg border border-zinc-200 text-xs text-zinc-700 flex items-start space-x-3">
              <span className="w-5 h-5 rounded-full bg-zinc-900 text-white font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <span className="leading-relaxed">{step}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Question Breakdown Accordion */}
      <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-xs print:break-inside-avoid">
        <h2 className="text-sm font-bold text-zinc-900 mb-3">
          Question-by-Question Transcript & Grades ({turns.length})
        </h2>
        <div className="space-y-2">
          {turns.map((turn, index) => {
            const isExpanded = expandedTurnId === turn.id;
            return (
              <div key={turn.id} className="border border-zinc-200 rounded-lg overflow-hidden">
                <button
                  type="button"
                  onClick={() => setExpandedTurnId(isExpanded ? null : turn.id)}
                  className="w-full p-3.5 bg-zinc-50 hover:bg-zinc-100/70 text-left flex items-center justify-between text-xs transition-colors cursor-pointer"
                >
                  <div className="flex items-center space-x-2.5 pr-2">
                    <span className="font-bold text-zinc-800">Q{index + 1}:</span>
                    <span className="text-zinc-700 font-medium line-clamp-1">{turn.question.question}</span>
                  </div>
                  <div className="flex items-center space-x-3 shrink-0">
                    <span className="px-2 py-0.5 rounded-md bg-white border border-zinc-200 font-bold text-zinc-800">
                      {turn.evaluation?.overallScore ?? 'N/A'}/100
                    </span>
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-zinc-500" /> : <ChevronDown className="w-4 h-4 text-zinc-500" />}
                  </div>
                </button>

                {isExpanded && (
                  <div className="p-4 border-t border-zinc-200 space-y-3 bg-white text-xs">
                    <div>
                      <span className="font-bold text-zinc-500 uppercase text-[10px]">Your Answer:</span>
                      <p className="mt-1 text-zinc-700 bg-zinc-50 p-3 rounded-md italic">
                        &ldquo;{turn.userAnswer}&rdquo;
                      </p>
                    </div>

                    {turn.evaluation && (
                      <div className="space-y-2 pt-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-zinc-800">Top 1% Exemplar:</span>
                        </div>
                        <div className="bg-zinc-900 text-zinc-100 p-3 rounded-md font-mono text-[11px] whitespace-pre-wrap">
                          {turn.evaluation.exemplarAnswer}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="p-4 sm:p-5 bg-white border border-zinc-200 rounded-xl shadow-xs flex flex-wrap items-center justify-between gap-3 print:hidden">
        <div className="flex items-center space-x-2">
          {/* Print PDF Button */}
          <button
            type="button"
            onClick={handlePrintPdf}
            className="px-3.5 py-2 rounded-lg border border-zinc-200 bg-white hover:bg-zinc-50 text-xs font-semibold text-zinc-800 flex items-center space-x-1.5 transition-colors cursor-pointer"
            title="Download or print this scorecard as a PDF"
          >
            <Printer className="w-3.5 h-3.5 text-zinc-600" />
            <span>Print / Save PDF</span>
          </button>

          <button
            type="button"
            onClick={handleCopyReport}
            className="px-3.5 py-2 rounded-lg border border-zinc-200 bg-white hover:bg-zinc-50 text-xs font-semibold text-zinc-800 flex items-center space-x-1.5 transition-colors cursor-pointer"
          >
            {copiedReport ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedReport ? 'Copied!' : 'Copy Text'}</span>
          </button>

          <button
            type="button"
            onClick={onSaveSession}
            disabled={isSaved}
            className="px-3.5 py-2 rounded-lg border border-zinc-200 bg-white hover:bg-zinc-50 text-xs font-semibold text-zinc-800 flex items-center space-x-1.5 transition-colors disabled:opacity-50 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isSaved ? 'Saved to History' : 'Save to History'}</span>
          </button>

          {onOpenWorkspaceModal && (
            <button
              type="button"
              onClick={onOpenWorkspaceModal}
              className="px-3.5 py-2 rounded-lg border border-zinc-200 bg-emerald-50 hover:bg-emerald-100/70 text-emerald-800 text-xs font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Google Sync</span>
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={onStartNewMock}
          className="px-5 py-2 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold rounded-lg shadow-xs flex items-center space-x-1.5 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Start Another Mock Session</span>
        </button>
      </div>
    </div>
  );
};
