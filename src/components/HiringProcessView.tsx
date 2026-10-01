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
  ChevronRight,
  Flame,
  Layers,
  BookOpen,
  Briefcase,
  Compass,
  TrendingUp,
  Target
} from 'lucide-react';
import { CompanyHiringPipeline, HiringStage } from '../types';
import { 
  PRESET_COMPANY_PIPELINES, 
  POPULAR_COMPANIES, 
  POPULAR_ROLES, 
  findCompanyPipeline, 
  generateFallbackPipeline,
  getCompanyRoles
} from '../data/companyHiringData';

interface HiringProcessViewProps {
  onPracticeStage: (pipeline: CompanyHiringPipeline, stage: HiringStage, roleTitle: string) => void;
}

export const HiringProcessView: React.FC<HiringProcessViewProps> = ({
  onPracticeStage,
}) => {
  const initialPipeline = findCompanyPipeline('Amazon') || PRESET_COMPANY_PIPELINES[0];
  const [companyInput, setCompanyInput] = useState('Amazon');
  const [roleInput, setRoleInput] = useState(
    () => (initialPipeline.popularRoles && initialPipeline.popularRoles[0]) || 'Software Development Engineer I (SDE I)'
  );
  const [isLoading, setIsLoading] = useState(false);

  // Active pipeline & selected stage
  const [activePipeline, setActivePipeline] = useState<CompanyHiringPipeline>(initialPipeline);
  const [selectedStageId, setSelectedStageId] = useState<string>(
    () => initialPipeline.stages[0]?.id || ''
  );

  const selectedStage = 
    activePipeline.stages.find((s) => s.id === selectedStageId) || activePipeline.stages[0];

  const currentCompanyRoles =
    activePipeline.popularRoles && activePipeline.popularRoles.length > 0
      ? activePipeline.popularRoles
      : getCompanyRoles(activePipeline.companyName, activePipeline.industry);

  // Select company directly and update role list seamlessly
  const selectCompany = (co: string) => {
    setCompanyInput(co);
    const localMatch = findCompanyPipeline(co);
    const rolesForCompany = localMatch?.popularRoles || getCompanyRoles(co);
    const defaultRole = rolesForCompany[0] || 'Software Engineer';
    setRoleInput(defaultRole);
    handleSearchCompany(co, defaultRole);
  };

  // Handle Search / Fetch
  const handleSearchCompany = async (targetCo = companyInput, targetRole = roleInput) => {
    const cleanCompany = targetCo.trim();
    if (!cleanCompany) return;

    // 1. Check local rich preset first
    const localMatch = findCompanyPipeline(cleanCompany);
    if (localMatch) {
      setActivePipeline(localMatch);
      setSelectedStageId(localMatch.stages[0]?.id || '');
      const availableRoles = localMatch.popularRoles || getCompanyRoles(localMatch.companyName, localMatch.industry);
      if (!availableRoles.includes(targetRole) && availableRoles.length > 0) {
        setRoleInput(availableRoles[0]);
      }
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
          const pipeline: CompanyHiringPipeline = data.pipeline;
          if (!pipeline.popularRoles || pipeline.popularRoles.length === 0) {
            pipeline.popularRoles = getCompanyRoles(pipeline.companyName, pipeline.industry);
          }
          setActivePipeline(pipeline);
          setSelectedStageId(pipeline.stages[0].id);
          if (pipeline.popularRoles && !pipeline.popularRoles.includes(targetRole) && pipeline.popularRoles.length > 0) {
            setRoleInput(pipeline.popularRoles[0]);
          }
          return;
        }
      }
      throw new Error('Fallback to local synthesis');
    } catch {
      // 3. Resilient fallback generator
      const fallback = generateFallbackPipeline(cleanCompany, targetRole);
      setActivePipeline(fallback);
      setSelectedStageId(fallback.stages[0]?.id || '');
      if (fallback.popularRoles && !fallback.popularRoles.includes(targetRole) && fallback.popularRoles.length > 0) {
        setRoleInput(fallback.popularRoles[0]);
      }
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
    <div className="max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8 space-y-10 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3.5">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 bg-sky-50 text-sky-800 border border-sky-200/80 rounded-full text-xs font-semibold shadow-2xs">
          <Compass className="w-3.5 h-3.5 text-sky-600" />
          <span>Company-Specific Hiring Architecture &amp; Loops</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-900">
          Targeted Company Hiring Process
        </h1>
        <p className="text-sm sm:text-base text-zinc-600 leading-relaxed max-w-2xl mx-auto">
          Every top firm uses a tailored interview architecture. Select or enter any company to inspect their multi-level stages, leadership rubrics, and launch a realistic simulation of that exact round.
        </p>
      </div>

      {/* Spacious, Elegant Search & Selection Hub */}
      <div className="bg-white border border-zinc-200/90 rounded-2xl p-6 sm:p-8 shadow-sm space-y-7">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearchCompany();
          }}
          className="space-y-6"
        >
          {/* Inputs Grid: 2 Generous Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Target Company Input & Suggestions */}
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-800 flex items-center space-x-2">
                  <Building2 className="w-4 h-4 text-zinc-700" />
                  <span>Target Company</span>
                </label>
                <span className="text-[11px] text-zinc-400 font-medium">Type any company or choose below</span>
              </div>
              
              <div className="relative">
                <Building2 className="w-5 h-5 text-zinc-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={companyInput}
                  onChange={(e) => setCompanyInput(e.target.value)}
                  placeholder="e.g. Amazon, Google, Meta, Stripe..."
                  className="w-full pl-11 pr-4 py-3 bg-zinc-50/70 hover:bg-zinc-50 text-sm sm:text-base border border-zinc-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-zinc-900 focus:border-zinc-900 font-medium transition-all shadow-2xs"
                  required
                />
              </div>

              {/* Popular Company Chips (Clean & Spacious) */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">Top Companies:</span>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_COMPANIES.map((co) => {
                    const isSelected = activePipeline.companyName.toLowerCase() === co.toLowerCase();
                    return (
                      <button
                        key={co}
                        type="button"
                        onClick={() => selectCompany(co)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center space-x-1.5 ${
                          isSelected
                            ? 'bg-zinc-900 text-white shadow-xs scale-102 ring-2 ring-zinc-900 ring-offset-1'
                            : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700 border border-zinc-200/60'
                        }`}
                      >
                        <span>{co}</span>
                        {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Target Role / Post Input & Suggestions */}
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-800 flex items-center space-x-2">
                  <Briefcase className="w-4 h-4 text-zinc-700" />
                  <span>Target Post / Role Title</span>
                </label>
                <span className="text-[11px] text-zinc-400 font-medium">Position you are interviewing for</span>
              </div>

              <div className="relative">
                <User className="w-5 h-5 text-zinc-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={roleInput}
                  onChange={(e) => setRoleInput(e.target.value)}
                  placeholder="e.g. SDE II, Engineering Manager, Product Manager..."
                  className="w-full pl-11 pr-4 py-3 bg-zinc-50/70 hover:bg-zinc-50 text-sm sm:text-base border border-zinc-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-zinc-900 focus:border-zinc-900 font-medium transition-all shadow-2xs"
                  required
                />
              </div>

              {/* Dynamic Company-Specific Role Chips */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">
                    Roles at {activePipeline.companyName}:
                  </span>
                  <span className="text-[10px] text-zinc-400 font-medium">Click to select authentic leveled role</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {currentCompanyRoles.map((r) => {
                    const isSelected = roleInput === r;
                    return (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setRoleInput(r)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-zinc-800 text-white font-semibold shadow-xs ring-2 ring-zinc-800 ring-offset-1'
                            : 'bg-zinc-50 hover:bg-zinc-100 text-zinc-700 border border-zinc-200'
                        }`}
                      >
                        {r}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-zinc-100">
            <p className="text-xs text-zinc-500">
              Analyzing hiring intelligence for <strong>{companyInput}</strong> &bull; <strong>{roleInput}</strong>
            </p>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto px-6 py-3 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-sm font-semibold flex items-center justify-center space-x-2 shadow-sm transition-all cursor-pointer disabled:opacity-50"
            >
              <Search className="w-4 h-4" />
              <span>{isLoading ? 'Synthesizing Pipeline...' : 'Analyze Hiring Architecture'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Company Pipeline Overview Card */}
      <div className="bg-white border border-zinc-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-7">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 pb-6 border-b border-zinc-100">
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-700 text-white font-black text-2xl flex items-center justify-center shadow-xs">
              {activePipeline.companyName.charAt(0)}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight">
                  {activePipeline.companyName}
                </h2>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{activePipeline.totalStages} Levels of Hiring</span>
                </span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-500 mt-0.5">{activePipeline.tagline || activePipeline.industry}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-xs text-zinc-700 shrink-0">
            <div className="flex items-center space-x-2 bg-zinc-50 px-3.5 py-2 rounded-xl border border-zinc-200 shadow-2xs">
              <Clock className="w-4 h-4 text-zinc-500" />
              <span>Typical Timeline: <strong>{activePipeline.typicalTimeline}</strong></span>
            </div>
          </div>
        </div>

        {/* Overview & Evaluation Philosophy */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="p-5 rounded-2xl bg-zinc-50/80 border border-zinc-200/90 space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-800 flex items-center space-x-2">
              <Layers className="w-4 h-4 text-zinc-600" />
              <span>Hiring Process Overview</span>
            </h3>
            <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed">
              {activePipeline.overview}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-200/90 space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center space-x-2">
              <Award className="w-4 h-4 text-amber-700" />
              <span>Evaluation Philosophy &amp; Bar</span>
            </h3>
            <p className="text-xs sm:text-sm text-amber-950 leading-relaxed font-medium">
              {activePipeline.evaluationPhilosophy}
            </p>
          </div>
        </div>

        {/* Culture & Principle Highlights */}
        {activePipeline.cultureHighlights?.length > 0 && (
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-800 flex items-center space-x-2">
              <Flame className="w-4 h-4 text-amber-500" />
              <span>Key Values &amp; Rubric Tested Across Stages</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {activePipeline.cultureHighlights.map((val, idx) => (
                <div
                  key={idx}
                  className="px-3.5 py-2.5 rounded-xl bg-zinc-50 hover:bg-zinc-100/70 border border-zinc-200 text-xs text-zinc-800 flex items-start space-x-2.5 transition-colors"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="leading-snug font-medium">{val}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Multi-Level Interactive Pipeline Stages */}
      <div className="space-y-5">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">
            <Target className="w-4 h-4 text-zinc-600" />
            <span>Interactive Level Breakdown</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-zinc-900">
            Hiring Stages for {activePipeline.companyName}
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 mt-0.5">
            Click any stage below to inspect its format, interviewer role, typical questions, and launch a targeted simulation.
          </p>
        </div>

        {/* Stage Tabs / Flow Rail */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3.5">
          {activePipeline.stages.map((stage) => {
            const isSelected = stage.id === selectedStage.id;
            return (
              <button
                key={stage.id}
                type="button"
                onClick={() => setSelectedStageId(stage.id)}
                className={`p-4 sm:p-5 rounded-2xl border text-left transition-all flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-zinc-900 text-white border-zinc-900 shadow-md ring-2 ring-zinc-900 ring-offset-2 scale-102'
                    : 'bg-white hover:bg-zinc-50 text-zinc-800 border-zinc-200 hover:border-zinc-300 shadow-2xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                      isSelected ? 'bg-zinc-800 text-amber-300' : 'bg-zinc-100 text-zinc-700'
                    }`}>
                      Level {stage.stageNumber}
                    </span>
                    <span className={`text-[11px] font-semibold flex items-center space-x-1 ${
                      isSelected ? 'text-zinc-300' : 'text-zinc-500'
                    }`}>
                      <Clock className="w-3.5 h-3.5" />
                      <span>{stage.durationMinutes}m</span>
                    </span>
                  </div>

                  <h3 className={`text-xs sm:text-sm font-bold leading-snug line-clamp-2 ${
                    isSelected ? 'text-white' : 'text-zinc-900'
                  }`}>
                    {stage.name}
                  </h3>
                </div>

                <div className="mt-3.5 pt-2.5 border-t border-dashed border-zinc-200/50 flex items-center justify-between">
                  <span className={`text-[11px] font-medium truncate ${
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

      {/* Selected Stage Deep-Dive Card */}
      {selectedStage && (
        <div className="bg-white border border-zinc-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-7 animate-in fade-in duration-200">
          {/* Stage Header & Simulation CTA */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 pb-6 border-b border-zinc-100">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`text-xs font-bold px-3 py-1 rounded-full border ${getLevelBadgeColor(selectedStage.levelType)}`}>
                  {selectedStage.levelType}
                </span>
                <span className="text-xs font-medium text-zinc-500 bg-zinc-100 px-2.5 py-1 rounded-full">
                  Level {selectedStage.stageNumber} of {activePipeline.totalStages}
                </span>
                <span className="text-xs font-medium text-zinc-500 bg-zinc-100 px-2.5 py-1 rounded-full flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5 text-zinc-500" />
                  <span>{selectedStage.durationMinutes} Minutes</span>
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-extrabold text-zinc-900">
                {selectedStage.name}
              </h2>

              <p className="text-xs sm:text-sm text-zinc-600 flex flex-wrap items-center gap-x-2 gap-y-1">
                <span>Format: <strong>{selectedStage.format}</strong></span>
                <span className="text-zinc-300 hidden sm:inline">&bull;</span>
                <span>Conducted by: <strong>{selectedStage.interviewerProfile}</strong></span>
              </p>
            </div>

            {/* Launch Simulation CTA */}
            <div className="shrink-0">
              <button
                type="button"
                onClick={() => onPracticeStage(activePipeline, selectedStage, roleInput)}
                className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white rounded-xl text-sm font-bold flex items-center justify-center space-x-2 shadow-md hover:shadow-lg transition-all cursor-pointer group"
              >
                <span>Simulate This Stage in Mock Interview</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Description & Competencies */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-7 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-800 flex items-center space-x-1.5">
                <BookOpen className="w-4 h-4 text-zinc-600" />
                <span>Round Focus &amp; Expectations</span>
              </h3>
              <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed">
                {selectedStage.description}
              </p>
            </div>

            <div className="md:col-span-5 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-800 flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Competencies &amp; Principles Scored</span>
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {selectedStage.coreCompetencies.map((comp, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-xl bg-zinc-100 text-zinc-800 border border-zinc-200/80 text-xs font-semibold"
                  >
                    {comp}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Typical Questions Asked */}
          {selectedStage.typicalQuestions?.length > 0 && (
            <div className="space-y-3.5 pt-2 border-t border-zinc-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-800 flex items-center space-x-2">
                <Lightbulb className="w-4 h-4 text-amber-500" />
                <span>Typical Questions Asked at {activePipeline.companyName} for This Stage</span>
              </h3>
              <div className="space-y-2.5">
                {selectedStage.typicalQuestions.map((q, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-zinc-50/90 border border-zinc-200/80 flex items-start space-x-3.5 shadow-2xs"
                  >
                    <span className="w-6 h-6 rounded-full bg-zinc-900 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="text-xs sm:text-sm font-medium text-zinc-800 italic leading-relaxed">
                      &ldquo;{q}&rdquo;
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tips for Success */}
          {selectedStage.tipsForSuccess?.length > 0 && (
            <div className="space-y-3 pt-2 border-t border-zinc-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-800 flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-sky-600" />
                <span>Insider Preparation Tips &amp; Bar Raiser Secrets</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {selectedStage.tipsForSuccess.map((tip, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-sky-50/60 border border-sky-200/70 text-xs text-sky-950 flex items-start space-x-2.5"
                  >
                    <span className="text-sky-600 font-bold text-sm leading-none mt-0.5">&bull;</span>
                    <span className="leading-relaxed font-medium">{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
