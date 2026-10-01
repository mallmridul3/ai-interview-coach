import React, { useState } from 'react';
import { 
  Building2, 
  Search, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  User, 
  ShieldCheck, 
  Award, 
  Lightbulb, 
  HelpCircle, 
  ChevronRight,
  Flame,
  Layers,
  BookOpen
} from 'lucide-react';
import { CompanyHiringPipeline, HiringStage } from '../types';
import { 
  PRESET_COMPANY_PIPELINES, 
  POPULAR_COMPANIES, 
  POPULAR_ROLES, 
  findCompanyPipeline, 
  generateFallbackPipeline 
} from '../data/companyHiringData';

interface HiringProcessViewProps {
  onPracticeStage: (pipeline: CompanyHiringPipeline, stage: HiringStage, roleTitle: string) => void;
}

export const HiringProcessView: React.FC<HiringProcessViewProps> = ({
  onPracticeStage,
}) => {
  const [companyInput, setCompanyInput] = useState('Amazon');
  const [roleInput, setRoleInput] = useState('Software Development Engineer (SDE II)');
  const [isLoading, setIsLoading] = useState(false);

  // Active pipeline & selected stage
  const [activePipeline, setActivePipeline] = useState<CompanyHiringPipeline>(
    () => findCompanyPipeline('Amazon') || PRESET_COMPANY_PIPELINES[0]
  );
  const [selectedStageId, setSelectedStageId] = useState<string>(
    () => (findCompanyPipeline('Amazon') || PRESET_COMPANY_PIPELINES[0]).stages[0]?.id || ''
  );

  const selectedStage = 
    activePipeline.stages.find((s) => s.id === selectedStageId) || activePipeline.stages[0];

  // Handle Search / Fetch
  const handleSearchCompany = async (targetCo = companyInput, targetRole = roleInput) => {
    const cleanCompany = targetCo.trim();
    if (!cleanCompany) return;

    // 1. Check local rich preset first
    const localMatch = findCompanyPipeline(cleanCompany);
    if (localMatch) {
      setActivePipeline(localMatch);
      setSelectedStageId(localMatch.stages[0]?.id || '');
      return;
    }

    // 2. Fetch dynamically from AI endpoint
    setIsLoading(true);
    try {
      const res = await fetch('/api/hiring-process/lookup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyName: cleanCompany,
          roleTitle: targetRole || 'Software Engineer',
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data?.pipeline?.stages?.length > 0) {
          setActivePipeline(data.pipeline);
          setSelectedStageId(data.pipeline.stages[0].id);
          return;
        }
      }
      throw new Error('Fallback to local synthesis');
    } catch {
      // 3. Resilient fallback generator
      const fallback = generateFallbackPipeline(cleanCompany, targetRole);
      setActivePipeline(fallback);
      setSelectedStageId(fallback.stages[0]?.id || '');
    } finally {
      setIsLoading(false);
    }
  };

  const getLevelBadgeColor = (type: string) => {
    switch (type) {
      case 'Bar Raiser / Executive':
        return 'bg-amber-100 text-amber-900 border-amber-300';
      case 'System Design':
        return 'bg-purple-100 text-purple-900 border-purple-200';
      case 'Technical Round':
        return 'bg-blue-100 text-blue-900 border-blue-200';
      case 'Online Assessment':
        return 'bg-zinc-100 text-zinc-800 border-zinc-300';
      default:
        return 'bg-emerald-100 text-emerald-900 border-emerald-200';
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 space-y-8 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-sky-50 text-sky-800 border border-sky-200/80 rounded-full text-xs font-semibold">
          <Building2 className="w-3.5 h-3.5 text-sky-600" />
          <span>Company-Specific Hiring Architecture</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-zinc-900">
          Targeted Company Hiring Process & Stages
        </h1>
        <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
          Every company has a unique hiring bar, structure, and philosophy. Search any company to break down their exact multi-round loop (such as Amazon&apos;s Bar Raiser &amp; 16 Leadership Principles), inspect expectations for each level, and practice that exact stage.
        </p>
      </div>

      {/* Search & Configuration Bar */}
      <div className="bg-white border border-zinc-200 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearchCompany();
          }}
          className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end"
        >
          {/* Company Name */}
          <div className="md:col-span-5 space-y-1.5">
            <label className="block text-xs font-bold text-zinc-700">Company Name</label>
            <div className="relative">
              <Building2 className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={companyInput}
                onChange={(e) => setCompanyInput(e.target.value)}
                placeholder="e.g. Amazon, Google, Meta, Stripe..."
                className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-zinc-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-zinc-900 font-medium"
                required
              />
            </div>
          </div>

          {/* Post / Role Name */}
          <div className="md:col-span-5 space-y-1.5">
            <label className="block text-xs font-bold text-zinc-700">Target Post / Role Title</label>
            <div className="relative">
              <User className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={roleInput}
                onChange={(e) => setRoleInput(e.target.value)}
                placeholder="e.g. SDE II, Engineering Manager, Product Manager..."
                className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-zinc-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-zinc-900 font-medium"
                required
              />
            </div>
          </div>

          {/* Submit Search Button */}
          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 px-4 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center space-x-1.5 shadow-xs transition-all cursor-pointer disabled:opacity-50"
            >
              <Search className="w-3.5 h-3.5" />
              <span>{isLoading ? 'Analyzing...' : 'Analyze'}</span>
            </button>
          </div>
        </form>

        {/* Popular Company Suggestions */}
        <div className="space-y-2 pt-2 border-t border-zinc-100">
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-zinc-500 font-semibold mr-1">Popular Companies:</span>
            {POPULAR_COMPANIES.map((co) => (
              <button
                key={co}
                type="button"
                onClick={() => {
                  setCompanyInput(co);
                  handleSearchCompany(co, roleInput);
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activePipeline.companyName.toLowerCase() === co.toLowerCase()
                    ? 'bg-zinc-900 text-white shadow-xs'
                    : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
                }`}
              >
                {co}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-1.5 text-xs pt-1">
            <span className="text-zinc-500 font-semibold mr-1">Target Roles:</span>
            {POPULAR_ROLES.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRoleInput(r)}
                className={`px-2.5 py-0.5 rounded-lg text-[11px] font-medium transition-all cursor-pointer ${
                  roleInput === r
                    ? 'bg-zinc-800 text-white'
                    : 'bg-zinc-50 text-zinc-600 hover:bg-zinc-100 border border-zinc-200'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Company Pipeline Overview Card */}
      <div className="bg-white border border-zinc-200 rounded-2xl p-6 sm:p-7 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-100">
          <div className="space-y-1">
            <div className="flex items-center space-x-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-zinc-900 to-zinc-700 text-white font-black text-xl flex items-center justify-center shadow-xs">
                {activePipeline.companyName.charAt(0)}
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 tracking-tight">
                    {activePipeline.companyName}
                  </h2>
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {activePipeline.totalStages} Levels of Hiring
                  </span>
                </div>
                <p className="text-xs text-zinc-500">{activePipeline.tagline || activePipeline.industry}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-xs text-zinc-600 shrink-0">
            <div className="flex items-center space-x-1.5 bg-zinc-50 px-3 py-1.5 rounded-lg border border-zinc-200">
              <Clock className="w-3.5 h-3.5 text-zinc-500" />
              <span>Timeline: <strong>{activePipeline.typicalTimeline}</strong></span>
            </div>
          </div>
        </div>

        {/* Overview & Evaluation Philosophy */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-zinc-50/70 border border-zinc-200 space-y-1.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-800 flex items-center space-x-1.5">
              <Layers className="w-3.5 h-3.5 text-zinc-600" />
              <span>Hiring Process Overview</span>
            </h3>
            <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed">
              {activePipeline.overview}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 space-y-1.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center space-x-1.5">
              <Award className="w-3.5 h-3.5 text-amber-700" />
              <span>Evaluation Philosophy & Bar</span>
            </h3>
            <p className="text-xs sm:text-sm text-amber-950 leading-relaxed font-medium">
              {activePipeline.evaluationPhilosophy}
            </p>
          </div>
        </div>

        {/* Culture & Principle Highlights */}
        {activePipeline.cultureHighlights?.length > 0 && (
          <div className="space-y-2 pt-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-700 flex items-center space-x-1.5">
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              <span>Key Values & Criteria Tested Across Stages</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {activePipeline.cultureHighlights.map((val, idx) => (
                <div
                  key={idx}
                  className="px-3 py-2 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-800 flex items-start space-x-2"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="leading-snug">{val}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Multi-Level Interactive Pipeline Stages */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-zinc-900">
              Interactive Stage Breakdown for {activePipeline.companyName}
            </h2>
            <p className="text-xs text-zinc-500">
              Click any stage below to inspect its format, typical questions, and launch a targeted simulation.
            </p>
          </div>
        </div>

        {/* Stage Tabs / Flow Rail */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {activePipeline.stages.map((stage) => {
            const isSelected = stage.id === selectedStage.id;
            return (
              <button
                key={stage.id}
                type="button"
                onClick={() => setSelectedStageId(stage.id)}
                className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-zinc-900 text-white border-zinc-900 shadow-md ring-2 ring-zinc-900 ring-offset-2'
                    : 'bg-white hover:bg-zinc-50 text-zinc-800 border-zinc-200 hover:border-zinc-300 shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                      isSelected ? 'bg-zinc-800 text-amber-300' : 'bg-zinc-100 text-zinc-600'
                    }`}>
                      Level {stage.stageNumber}
                    </span>
                    <span className={`text-[10px] font-semibold flex items-center space-x-1 ${
                      isSelected ? 'text-zinc-300' : 'text-zinc-400'
                    }`}>
                      <Clock className="w-3 h-3" />
                      <span>{stage.durationMinutes}m</span>
                    </span>
                  </div>

                  <h3 className={`text-xs sm:text-sm font-bold leading-snug line-clamp-2 ${
                    isSelected ? 'text-white' : 'text-zinc-900'
                  }`}>
                    {stage.name}
                  </h3>
                </div>

                <div className="mt-3 pt-2 border-t border-dashed border-zinc-200/40 flex items-center justify-between">
                  <span className={`text-[10px] font-medium truncate max-w-[120px] ${
                    isSelected ? 'text-zinc-300' : 'text-zinc-500'
                  }`}>
                    {stage.levelType}
                  </span>
                  <ChevronRight className={`w-3.5 h-3.5 ${
                    isSelected ? 'text-amber-300' : 'text-zinc-400'
                  }`} />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Stage Detail & Simulator Card */}
      {selectedStage && (
        <div className="bg-white border-2 border-zinc-900 rounded-2xl p-6 sm:p-8 shadow-lg space-y-6">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-6 border-b border-zinc-100">
            <div className="space-y-1.5">
              <div className="flex items-center space-x-2">
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${getLevelBadgeColor(selectedStage.levelType)}`}>
                  {selectedStage.levelType}
                </span>
                <span className="text-xs font-semibold text-zinc-500 flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{selectedStage.durationMinutes} Minutes</span>
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-zinc-900">
                {selectedStage.name}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600">
                Format: <strong>{selectedStage.format}</strong> &bull; Conducted by: <strong>{selectedStage.interviewerProfile}</strong>
              </p>
            </div>

            {/* Action: Practice this specific round */}
            <div className="shrink-0">
              <button
                type="button"
                onClick={() => onPracticeStage(activePipeline, selectedStage, roleInput)}
                className="px-5 py-3 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center space-x-2 shadow-md transition-all cursor-pointer hover:shadow-lg"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Simulate This Stage in Mock Interview</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-800">
              Round Focus & Expectations
            </h3>
            <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed">
              {selectedStage.description}
            </p>
          </div>

          {/* Core Competencies Tested */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-800 flex items-center space-x-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Competencies & Principles Scored in This Round</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {selectedStage.coreCompetencies.map((comp, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200/80 text-xs font-semibold"
                >
                  {comp}
                </span>
              ))}
            </div>
          </div>

          {/* Typical Questions Asked */}
          <div className="space-y-2 pt-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-800 flex items-center space-x-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
              <span>Typical Questions Asked at {activePipeline.companyName} for This Stage</span>
            </h3>
            <div className="space-y-2">
              {selectedStage.typicalQuestions.map((q, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs sm:text-sm text-zinc-900 flex items-start space-x-3"
                >
                  <span className="w-5 h-5 rounded-full bg-zinc-200 text-zinc-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="font-medium leading-relaxed italic">&ldquo;{q}&rdquo;</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tips for Success */}
          <div className="space-y-2 pt-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center space-x-1.5">
              <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
              <span>Insider Preparation Tips & Bar Raiser Secrets</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {selectedStage.tipsForSuccess.map((tip, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-amber-50/60 border border-amber-200/70 text-xs text-amber-950 flex items-start space-x-2"
                >
                  <span className="text-amber-600 font-bold">&bull;</span>
                  <span className="leading-relaxed">{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
