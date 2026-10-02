import React, { useState, useEffect, useRef, useMemo } from 'react';
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
  Target,
  Landmark,
  AlertCircle,
  Check,
  X
} from 'lucide-react';
import { CompanyHiringPipeline, HiringStage } from '../types';
import { 
  PRESET_COMPANY_PIPELINES, 
  POPULAR_COMPANIES, 
  POPULAR_ROLES, 
  ALL_SUPPORTED_COMPANIES,
  findCompanyPipeline, 
  generateFallbackPipeline,
  getCompanyRoles,
  validateCompanyName
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
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'tech' | 'banks' | 'fintech'>('all');

  // Autocomplete dropdown & error validation state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [companyError, setCompanyError] = useState<string | null>(null);
  const [suggestedCorrections, setSuggestedCorrections] = useState<string[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputContainerRef = useRef<HTMLDivElement>(null);

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

  // Filter autocomplete companies based on input
  const filteredCompanies = useMemo(() => {
    const query = companyInput.trim().toLowerCase();
    if (!query) {
      return ALL_SUPPORTED_COMPANIES.slice(0, 8);
    }
    return ALL_SUPPORTED_COMPANIES.filter((c) => {
      return (
        c.name.toLowerCase().includes(query) ||
        c.aliases.some((a) => a.toLowerCase().includes(query)) ||
        c.industry.toLowerCase().includes(query)
      );
    }).slice(0, 8);
  }, [companyInput]);

  // Click-away listener to dismiss autocomplete dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        inputContainerRef.current && 
        !inputContainerRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Immediate debounced auto-updating pipeline & validation as user types
  useEffect(() => {
    const trimmed = companyInput.trim();
    if (!trimmed) {
      setCompanyError(null);
      setSuggestedCorrections([]);
      return;
    }

    // Run instant validation check
    const validation = validateCompanyName(trimmed);
    if (!validation.isValid) {
      setCompanyError(validation.error || `Unrecognized company "${trimmed}".`);
      setSuggestedCorrections(validation.suggestions || []);
    } else {
      setCompanyError(null);
      setSuggestedCorrections([]);
    }

    if (trimmed.toLowerCase() === activePipeline.companyName.toLowerCase()) {
      return;
    }

    const timer = setTimeout(() => {
      // Only update pipeline if valid
      if (validation.isValid) {
        const targetName = validation.matchedName || trimmed;
        // 1. Check local rich preset first
        const localMatch = findCompanyPipeline(targetName) || findCompanyPipeline(trimmed);
        if (localMatch) {
          setActivePipeline(localMatch);
          setSelectedStageId(localMatch.stages[0]?.id || '');
          const availableRoles = localMatch.popularRoles || getCompanyRoles(localMatch.companyName, localMatch.industry);
          if (!availableRoles.includes(roleInput) && availableRoles.length > 0) {
            setRoleInput(availableRoles[0]);
          }
          return;
        }

        // 2. Immediate authentic industry pipeline (banking if bank, consulting, healthcare, tech, etc.)
        const instantPipeline = generateFallbackPipeline(trimmed, roleInput);
        setActivePipeline(instantPipeline);
        setSelectedStageId(instantPipeline.stages[0]?.id || '');
        if (instantPipeline.popularRoles && !instantPipeline.popularRoles.includes(roleInput) && instantPipeline.popularRoles.length > 0) {
          setRoleInput(instantPipeline.popularRoles[0]);
        }
      }
    }, 280);

    return () => clearTimeout(timer);
  }, [companyInput]);

  // Select company directly from dropdown or chips
  const selectCompany = (co: string) => {
    setCompanyInput(co);
    setCompanyError(null);
    setSuggestedCorrections([]);
    setIsDropdownOpen(false);
    setHighlightedIndex(-1);

    const localMatch = findCompanyPipeline(co);
    const fallback = generateFallbackPipeline(co, roleInput);
    const pipeline = localMatch || fallback;
    setActivePipeline(pipeline);
    setSelectedStageId(pipeline.stages[0]?.id || '');
    const rolesForCompany = pipeline.popularRoles || getCompanyRoles(co, pipeline.industry);
    const defaultRole = rolesForCompany[0] || 'Software Engineer';
    setRoleInput(defaultRole);
    handleSearchCompany(co, defaultRole);
  };

  // Handle Search / Fetch
  const handleSearchCompany = async (targetCo = companyInput, targetRole = roleInput) => {
    const cleanCompany = targetCo.trim();
    if (!cleanCompany) return;

    // Validate first
    const validation = validateCompanyName(cleanCompany);
    if (!validation.isValid) {
      setCompanyError(validation.error || `Unrecognized company "${cleanCompany}".`);
      setSuggestedCorrections(validation.suggestions || []);
      return;
    } else {
      setCompanyError(null);
      setSuggestedCorrections([]);
    }

    // 1. Check local rich preset first
    const localMatch = findCompanyPipeline(validation.matchedName || cleanCompany);
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
            {/* Target Company Input, Autocomplete Dropdown & Under-Tab Error Alert */}
            <div className="space-y-3.5" ref={inputContainerRef}>
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-800 flex items-center space-x-2">
                  <Building2 className="w-4 h-4 text-zinc-700" />
                  <span>Target Company</span>
                </label>
                <div className="flex items-center space-x-1.5">
                  {isLoading ? (
                    <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-sky-50 text-sky-800 border border-sky-200 animate-pulse">
                      <Sparkles className="w-3 h-3 text-sky-600 animate-spin" />
                      <span>Synthesizing Deep Pipeline...</span>
                    </span>
                  ) : companyError ? (
                    <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-rose-50 text-rose-800 border border-rose-300">
                      <AlertCircle className="w-3 h-3 text-rose-600" />
                      <span>Verification Failed</span>
                    </span>
                  ) : (
                    <span className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold border transition-all ${
                      activePipeline.industry.includes('Bank') || activePipeline.industry.includes('Capital Markets')
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                        : 'bg-zinc-100 text-zinc-800 border-zinc-200'
                    }`}>
                      {activePipeline.industry.includes('Bank') || activePipeline.industry.includes('Capital Markets') ? (
                        <>
                          <Landmark className="w-3 h-3 text-emerald-600" />
                          <span>Verified Banking &amp; Financial Pipeline</span>
                        </>
                      ) : (
                        <>
                          <ShieldCheck className="w-3 h-3 text-emerald-600" />
                          <span>Verified Hiring Architecture</span>
                        </>
                      )}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="relative">
                <Building2 className="w-5 h-5 text-zinc-400 absolute left-3.5 top-3.5 pointer-events-none" />
                <input
                  type="text"
                  value={companyInput}
                  onChange={(e) => {
                    setCompanyInput(e.target.value);
                    setIsDropdownOpen(true);
                    setHighlightedIndex(-1);
                  }}
                  onFocus={() => {
                    setIsDropdownOpen(true);
                  }}
                  onBlur={() => {
                    // Dropdown click-away is handled by mousedown listener on inputContainerRef
                  }}
                  onKeyDown={(e) => {
                    if (isDropdownOpen && filteredCompanies.length > 0) {
                      if (e.key === 'ArrowDown') {
                        e.preventDefault();
                        setHighlightedIndex((prev) => (prev + 1) % filteredCompanies.length);
                        return;
                      }
                      if (e.key === 'ArrowUp') {
                        e.preventDefault();
                        setHighlightedIndex((prev) => (prev - 1 + filteredCompanies.length) % filteredCompanies.length);
                        return;
                      }
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        if (highlightedIndex >= 0 && highlightedIndex < filteredCompanies.length) {
                          selectCompany(filteredCompanies[highlightedIndex].name);
                          return;
                        }
                        setIsDropdownOpen(false);
                        handleSearchCompany(companyInput, roleInput);
                        return;
                      }
                      if (e.key === 'Escape') {
                        setIsDropdownOpen(false);
                        return;
                      }
                    } else if (e.key === 'Enter') {
                      e.preventDefault();
                      handleSearchCompany(companyInput, roleInput);
                    }
                  }}
                  placeholder="e.g. JPMorgan Chase, Barclays, Google, Amazon, Nvidia..."
                  className={`w-full pl-11 pr-4 py-3 text-sm sm:text-base border rounded-xl font-medium transition-all shadow-2xs ${
                    companyError
                      ? 'bg-rose-50/50 border-rose-300 focus:bg-white focus:ring-2 focus:ring-rose-500 focus:border-rose-500 text-zinc-900'
                      : 'bg-zinc-50/70 hover:bg-zinc-50 border-zinc-300 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-zinc-900 focus:border-zinc-900 text-zinc-900'
                  }`}
                  required
                  autoComplete="off"
                />

                {/* Autocomplete Dropdown List */}
                {isDropdownOpen && filteredCompanies.length > 0 && (
                  <div
                    ref={dropdownRef}
                    id="company-suggestions-dropdown"
                    className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-zinc-200/90 rounded-2xl shadow-xl z-50 max-h-72 overflow-y-auto divide-y divide-zinc-100 animate-in fade-in zoom-in-95 duration-100"
                  >
                    <div className="px-3.5 py-2 bg-zinc-50/90 flex items-center justify-between text-[11px] font-bold text-zinc-500 uppercase tracking-wider">
                      <span>Suggested &amp; Verified Companies</span>
                      <span className="text-[10px] text-zinc-400 font-normal">Use &uarr;&darr; or click</span>
                    </div>

                    <div className="p-1">
                      {filteredCompanies.map((c, idx) => {
                        const isHighlighted = idx === highlightedIndex;
                        const isSelected = activePipeline.companyName.toLowerCase() === c.name.toLowerCase();

                        return (
                          <button
                            key={c.name}
                            type="button"
                            onClick={() => selectCompany(c.name)}
                            onMouseEnter={() => setHighlightedIndex(idx)}
                            className={`w-full text-left px-3.5 py-2.5 rounded-xl flex items-center justify-between transition-colors cursor-pointer ${
                              isHighlighted 
                                ? 'bg-zinc-900 text-white' 
                                : isSelected
                                ? 'bg-zinc-100 text-zinc-900'
                                : 'hover:bg-zinc-50 text-zinc-800'
                            }`}
                          >
                            <div className="space-y-0.5 min-w-0 pr-3">
                              <div className="flex items-center space-x-2">
                                <span className={`text-sm font-semibold truncate ${
                                  isHighlighted ? 'text-white' : 'text-zinc-900'
                                }`}>
                                  {c.name}
                                </span>
                                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                                  isHighlighted
                                    ? 'bg-zinc-800 text-zinc-200 border-zinc-700'
                                    : c.category === 'banks'
                                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                    : c.category === 'fintech'
                                    ? 'bg-sky-50 text-sky-800 border-sky-200'
                                    : c.category === 'defense'
                                    ? 'bg-purple-50 text-purple-800 border-purple-200'
                                    : c.category === 'automotive'
                                    ? 'bg-red-50 text-red-800 border-red-200'
                                    : 'bg-zinc-100 text-zinc-700 border-zinc-200'
                                }`}>
                                  {c.category === 'banks' ? 'Banking' : c.category === 'fintech' ? 'Fintech' : c.category === 'defense' ? 'Defense & AI' : c.category === 'automotive' ? 'Automotive' : 'Tech & Cloud'}
                                </span>
                              </div>
                              <p className={`text-xs truncate ${
                                isHighlighted ? 'text-zinc-300' : 'text-zinc-500'
                              }`}>
                                {c.tagline || c.industry}
                              </p>
                            </div>

                            <div className="shrink-0">
                              {isSelected ? (
                                <span className="inline-flex items-center px-1.5 py-0.5 rounded-md text-[10px] font-bold bg-emerald-500 text-white">
                                  Active
                                </span>
                              ) : (
                                <CheckCircle2 className={`w-4 h-4 ${
                                  isHighlighted ? 'text-amber-300' : 'text-emerald-600 opacity-60'
                                }`} />
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Explicit Error Alert under the Company Tab if Unrecognized Name */}
              {companyError && (
                <div 
                  id="company-input-error-alert"
                  className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl space-y-2 animate-in fade-in duration-150 shadow-2xs"
                >
                  <div className="flex items-start space-x-2.5 text-rose-800">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <div className="flex-1 text-xs sm:text-sm">
                      <p className="font-semibold">{companyError}</p>
                    </div>
                  </div>

                  {suggestedCorrections.length > 0 && (
                    <div className="pl-6.5 space-y-1.5 pt-0.5">
                      <p className="text-[11px] font-semibold text-rose-700">
                        Choose from verified company hiring loops:
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {suggestedCorrections.map((sug) => (
                          <button
                            key={sug}
                            type="button"
                            onClick={() => selectCompany(sug)}
                            className="px-2.5 py-1 bg-white hover:bg-rose-100 text-rose-900 border border-rose-200 rounded-lg text-xs font-semibold transition-all cursor-pointer shadow-2xs hover:scale-102"
                          >
                            + {sug}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Popular Company Chips with Category Tabs */}
              <div className="space-y-2 pt-1">
                <div className="flex flex-wrap items-center justify-between gap-1.5">
                  <div className="flex items-center space-x-1">
                    <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider mr-1">Browse:</span>
                    {[
                      { id: 'all', label: 'All' },
                      { id: 'tech', label: 'Tech Giants' },
                      { id: 'banks', label: 'Global Banks & Finance' },
                      { id: 'fintech', label: 'Fintech' },
                    ].map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setSelectedCategory(cat.id as any)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                          selectedCategory === cat.id
                            ? 'bg-zinc-900 text-white shadow-2xs'
                            : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-600'
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {POPULAR_COMPANIES.filter((co) => {
                    const isBank = [
                      'jpmorgan chase',
                      'goldman sachs',
                      'morgan stanley',
                      'bank of america',
                      'barclays',
                      'capital one',
                      'citigroup',
                    ].includes(co.toLowerCase());
                    if (selectedCategory === 'banks') return isBank;
                    const isFintech = ['stripe', 'uber'].includes(co.toLowerCase());
                    if (selectedCategory === 'fintech') return isFintech;
                    if (selectedCategory === 'tech') return !isBank && !isFintech;
                    return true;
                  }).map((co) => {
                    const isSelected = activePipeline.companyName.toLowerCase() === co.toLowerCase();
                    const isBankCo = [
                      'jpmorgan chase',
                      'goldman sachs',
                      'morgan stanley',
                      'bank of america',
                      'barclays',
                      'capital one',
                      'citigroup',
                    ].includes(co.toLowerCase());
                    return (
                      <button
                        key={co}
                        type="button"
                        onClick={() => selectCompany(co)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center space-x-1.5 ${
                          isSelected
                            ? 'bg-zinc-900 text-white shadow-xs scale-102 ring-2 ring-zinc-900 ring-offset-1'
                            : isBankCo
                            ? 'bg-emerald-50/70 hover:bg-emerald-100/80 text-emerald-900 border border-emerald-200/80'
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
