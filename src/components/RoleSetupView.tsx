import React, { useState, useRef } from 'react';
import { 
  Briefcase, 
  Layers, 
  Building2, 
  UserCheck, 
  ChevronRight, 
  FileText, 
  Sparkles,
  Sliders,
  HelpCircle,
  Clock,
  UploadCloud,
  Wand2,
  CheckCircle2,
  Paperclip,
  Brain,
  RefreshCw,
  Target
} from 'lucide-react';
import { RoleSetup, ExperienceLevel, InterviewTrack, CandidateLearningMemory } from '../types';
import { INTERVIEWER_PERSONAS, PRESET_ROLES } from '../data/mockData';
import { loadCandidateMemory, resetCandidateMemory } from '../utils/candidateMemory';

interface RoleSetupViewProps {
  onStartInterview: (setup: RoleSetup) => void;
  isLoading: boolean;
}

export const RoleSetupView: React.FC<RoleSetupViewProps> = ({ onStartInterview, isLoading }) => {
  const [roleTitle, setRoleTitle] = useState('Senior Software Engineer');
  const [level, setLevel] = useState<ExperienceLevel>('Senior');
  const [track, setTrack] = useState<InterviewTrack>('Technical & Behavioral Mix');
  const [targetCompany, setTargetCompany] = useState('Stripe');
  const [jobDescription, setJobDescription] = useState('');
  const [resumeSummary, setResumeSummary] = useState('');
  const [personaId, setPersonaId] = useState(INTERVIEWER_PERSONAS[0].id);
  const [questionCount, setQuestionCount] = useState(3);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [autofillNotice, setAutofillNotice] = useState<string | null>(null);
  const [memory, setMemory] = useState<CandidateLearningMemory>(loadCandidateMemory);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleResetMemory = () => {
    if (confirm('Reset AI memory of your past responses and growth areas?')) {
      const fresh = resetCandidateMemory();
      setMemory(fresh);
    }
  };

  const levels: ExperienceLevel[] = [
    'Intern / Entry-level',
    'Mid-level',
    'Senior',
    'Staff / Principal',
    'Engineering / Product Manager',
    'Executive',
  ];

  const tracks: { track: InterviewTrack; desc: string }[] = [
    { track: 'Technical & Behavioral Mix', desc: 'Balanced blend of domain technical depth, algorithms, architecture, and STAR behavioral leadership' },
    { track: 'Behavioral & Leadership', desc: 'STAR stories, cross-team conflict, ownership, delivering impact' },
    { track: 'Technical & Problem Solving', desc: 'Algorithms, engineering trade-offs, debugging, tech depth' },
    { track: 'System Design & Architecture', desc: 'Scalability, microservices, reliability, bottleneck resolution' },
    { track: 'Product Sense & Strategy', desc: 'User empathy, metrics, prioritization, roadmap trade-offs' },
    { track: 'Situational & Culture Fit', desc: 'Ambiguity handling, ethics, working under pressure' },
  ];

  const handleApplyPreset = (preset: typeof PRESET_ROLES[0]) => {
    setRoleTitle(preset.title);
    setLevel(preset.level);
    setTrack(preset.track);
    setTargetCompany(preset.company);
    setJobDescription(preset.description);
  };

  const handleSmartAutofill = (inputText?: string) => {
    const raw = inputText ?? `${jobDescription}\n${resumeSummary}`;
    if (!raw.trim()) {
      setAutofillNotice('Please paste or upload a Resume or Job Description first.');
      setTimeout(() => setAutofillNotice(null), 3500);
      return;
    }

    const detections: string[] = [];

    // 1. Detect level
    if (/intern|entry[-\s]?level|new grad|graduate|junior|jr\b/i.test(raw)) {
      setLevel('Intern / Entry-level');
      detections.push('Intern / Entry-level');
    } else if (/\b(director|vp|vice president|chief|c-level|executive|head of)\b/i.test(raw)) {
      setLevel('Executive');
      detections.push('Executive');
    } else if (/\b(engineering manager|product manager|tech lead manager|em|people manager)\b/i.test(raw)) {
      setLevel('Engineering / Product Manager');
      detections.push('Manager Level');
    } else if (/\b(staff|principal|distinguished|fellow)\b/i.test(raw)) {
      setLevel('Staff / Principal');
      detections.push('Staff / Principal');
    } else if (/\b(senior|sr\.?|lead)\b/i.test(raw)) {
      setLevel('Senior');
      detections.push('Senior');
    } else if (/\b(mid[-\s]?level|intermediate|engineer ii|l4|ic4)\b/i.test(raw)) {
      setLevel('Mid-level');
      detections.push('Mid-level');
    }

    // 2. Detect track
    if (/system design|distributed system|microservice|scalability|high throughput|architectural|capacity planning/i.test(raw)) {
      setTrack('System Design & Architecture');
      detections.push('System Design Track');
    } else if (/product sense|product management|roadmap|user empathy|feature prioritization|kpis/i.test(raw)) {
      setTrack('Product Sense & Strategy');
      detections.push('Product Sense Track');
    } else if (/behavioral|leadership principles|star method|cross-functional|stakeholder management/i.test(raw)) {
      setTrack('Behavioral & Leadership');
      detections.push('Behavioral Track');
    } else if (/algorithms|data structures|leetcode|time complexity|dynamic programming/i.test(raw)) {
      setTrack('Technical & Problem Solving');
      detections.push('Problem Solving Track');
    }

    // 3. Detect Role Title
    const titleRegex = /(?:role|title|position|opening|job title):\s*([^\n\r,;]+)/i;
    const commonRoles = [
      'Full Stack Software Engineer',
      'Senior Software Engineer',
      'Staff Software Engineer',
      'Backend Engineer',
      'Frontend Engineer',
      'Machine Learning Engineer',
      'AI Research Engineer',
      'Data Engineer',
      'DevOps Engineer',
      'Site Reliability Engineer',
      'Product Manager',
      'Engineering Manager',
      'iOS Engineer',
      'Android Engineer',
      'Security Engineer'
    ];

    let foundRole = '';
    const match = raw.match(titleRegex);
    if (match && match[1]?.trim().length > 3) {
      foundRole = match[1].trim();
    } else {
      for (const cr of commonRoles) {
        if (new RegExp(cr, 'i').test(raw)) {
          foundRole = cr;
          break;
        }
      }
    }
    if (foundRole) {
      setRoleTitle(foundRole);
      detections.push(`Role: ${foundRole}`);
    }

    // 4. Detect Company
    const companyRegex = /(?:company|client|employer|at|organization):\s*([A-Za-z0-9\s&]{2,25})/i;
    const knownCompanies = [
      'Google', 'Stripe', 'Meta', 'Amazon', 'Apple', 'Microsoft', 
      'Netflix', 'Uber', 'Airbnb', 'Databricks', 'Snowflake', 
      'Coinbase', 'OpenAI', 'Anthropic', 'Spotify', 'Shopify'
    ];
    let foundCompany = '';
    const compMatch = raw.match(companyRegex);
    if (compMatch && compMatch[1]?.trim()) {
      foundCompany = compMatch[1].trim();
    } else {
      for (const comp of knownCompanies) {
        if (new RegExp(`\\b${comp}\\b`, 'i').test(raw)) {
          foundCompany = comp;
          break;
        }
      }
    }
    if (foundCompany) {
      setTargetCompany(foundCompany);
      detections.push(`Company: ${foundCompany}`);
    }

    if (detections.length > 0) {
      setAutofillNotice(`✨ Smart Autofill applied: ${detections.join(' • ')}`);
    } else {
      setAutofillNotice('Parsed document. Context loaded into form.');
    }
    setTimeout(() => setAutofillNotice(null), 6000);
  };

  const processUploadedFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (!content) return;

      const isResume = /resume|curriculum vitae|experience|education|projects|work history/i.test(content) || file.name.toLowerCase().includes('resume');
      if (isResume) {
        setResumeSummary(content.slice(0, 4000));
      } else {
        setJobDescription(content.slice(0, 4000));
      }
      setShowAdvanced(true);
      handleSmartAutofill(content);
    };
    reader.readAsText(file);
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processUploadedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processUploadedFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!roleTitle.trim()) return;

    onStartInterview({
      roleTitle: roleTitle.trim(),
      level,
      track,
      targetCompany: targetCompany.trim() || 'Top Industry Leader',
      jobDescription: jobDescription.trim(),
      resumeSummary: resumeSummary.trim(),
      interviewerPersonaId: personaId,
      questionCount,
    });
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      {/* Intro Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-amber-50 border border-amber-200/80 rounded-full text-xs font-medium text-amber-800 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>Tailored Mock Simulations & Rigorous STAR Feedback</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-900">
          Prepare for your next high-stakes interview
        </h1>
        <p className="mt-2 text-sm sm:text-base text-zinc-600 max-w-2xl mx-auto">
          Configure your target role, pick your interviewer persona, and get real-time AI grading on situation, task, action, and results.
        </p>
      </div>

      {/* AI Candidate Memory & Adaptive Learning Card */}
      {memory.totalAnswersAnalyzed > 0 && (
        <div className="mb-8 p-4 sm:p-5 rounded-xl bg-gradient-to-r from-blue-50/90 via-indigo-50/80 to-purple-50/70 border border-blue-200/90 shadow-xs space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-2xs">
                <Brain className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-blue-950 flex items-center space-x-1.5">
                  <span>AI Adaptive Learning Memory Active</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
                    {memory.totalAnswersAnalyzed} Responses Analyzed
                  </span>
                </h3>
                <p className="text-[11px] text-blue-800/80">
                  The AI interviewer will adapt questions to test your historical growth areas and build upon your answers.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleResetMemory}
              className="text-[11px] text-blue-700 hover:text-blue-900 hover:underline flex items-center space-x-1 cursor-pointer"
              title="Reset AI memory of past answers"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset Memory</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-blue-200/60 text-xs">
            {memory.recurringGaps.length > 0 && (
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-amber-900 flex items-center space-x-1">
                  <Target className="w-3.5 h-3.5 text-amber-600" />
                  <span>Targeted Growth Areas (AI Will Test):</span>
                </span>
                <div className="flex flex-wrap gap-1">
                  {memory.recurringGaps.map((gap, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-amber-100/80 text-amber-900 border border-amber-200/80 text-[10px] font-medium"
                    >
                      {gap}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {memory.topDemonstratedStrengths.length > 0 && (
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-emerald-900 flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Demonstrated Strengths Retained:</span>
                </span>
                <div className="flex flex-wrap gap-1">
                  {memory.topDemonstratedStrengths.map((str, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-emerald-100/80 text-emerald-900 border border-emerald-200/80 text-[10px] font-medium"
                    >
                      {str}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Quick Presets */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Popular Role Presets</span>
          <span className="text-xs text-zinc-400">Click to autofill</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {PRESET_ROLES.map((preset) => (
            <button
              key={preset.title}
              type="button"
              onClick={() => handleApplyPreset(preset)}
              className={`p-2.5 rounded-lg border text-left text-xs transition-all ${
                roleTitle === preset.title && level === preset.level
                  ? 'border-zinc-900 bg-zinc-900 text-white shadow-xs'
                  : 'border-zinc-200 bg-white hover:border-zinc-300 text-zinc-800 hover:bg-zinc-50'
              }`}
            >
              <div className="font-medium truncate">{preset.title}</div>
              <div className={`text-[10px] mt-0.5 truncate ${roleTitle === preset.title ? 'text-zinc-300' : 'text-zinc-500'}`}>
                {preset.company}
              </div>
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white border border-zinc-200 rounded-xl shadow-xs overflow-hidden">
        <div className="p-6 sm:p-8 space-y-7">
          {/* Role & Company Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="role-title" className="block text-xs font-semibold text-zinc-800 uppercase tracking-wider mb-1.5 flex items-center space-x-1.5">
                <Briefcase className="w-3.5 h-3.5 text-zinc-500" />
                <span>Target Role / Job Title</span>
              </label>
              <input
                id="role-title"
                type="text"
                required
                value={roleTitle}
                onChange={(e) => setRoleTitle(e.target.value)}
                placeholder="e.g. Senior Backend Engineer, Product Manager"
                className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-lg text-sm text-zinc-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-900 transition-all"
              />
            </div>

            <div>
              <label htmlFor="target-company" className="block text-xs font-semibold text-zinc-800 uppercase tracking-wider mb-1.5 flex items-center space-x-1.5">
                <Building2 className="w-3.5 h-3.5 text-zinc-500" />
                <span>Target Company / Industry</span>
              </label>
              <input
                id="target-company"
                type="text"
                value={targetCompany}
                onChange={(e) => setTargetCompany(e.target.value)}
                placeholder="e.g. Stripe, Google, Series B AI Startup"
                className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-lg text-sm text-zinc-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-900 transition-all"
              />
            </div>
          </div>

          {/* Seniority / Level Selector */}
          <div>
            <label className="block text-xs font-semibold text-zinc-800 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
              <Layers className="w-3.5 h-3.5 text-zinc-500" />
              <span>Seniority & Experience Level</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {levels.map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setLevel(lvl)}
                  className={`py-2 px-3 rounded-lg text-xs font-medium border text-center transition-all ${
                    level === lvl
                      ? 'border-zinc-900 bg-zinc-900 text-white shadow-xs'
                      : 'border-zinc-200 bg-zinc-50 text-zinc-700 hover:bg-zinc-100'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Interview Track */}
          <div>
            <label className="block text-xs font-semibold text-zinc-800 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
              <Sliders className="w-3.5 h-3.5 text-zinc-500" />
              <span>Interview Focus Track</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {tracks.map((t) => (
                <div
                  key={t.track}
                  onClick={() => setTrack(t.track)}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    track === t.track
                      ? 'border-zinc-900 bg-zinc-50/80 ring-1 ring-zinc-900'
                      : 'border-zinc-200 bg-white hover:border-zinc-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-zinc-900">{t.track}</span>
                    {track === t.track && (
                      <span className="w-2 h-2 rounded-full bg-zinc-900" />
                    )}
                  </div>
                  <p className="text-[11px] text-zinc-500 mt-1 leading-relaxed">{t.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Interviewer Persona Selection */}
          <div>
            <label className="block text-xs font-semibold text-zinc-800 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
              <UserCheck className="w-3.5 h-3.5 text-zinc-500" />
              <span>Choose Interviewer Persona</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {INTERVIEWER_PERSONAS.map((persona) => {
                const isSelected = personaId === persona.id;
                return (
                  <div
                    key={persona.id}
                    onClick={() => setPersonaId(persona.id)}
                    className={`p-3.5 rounded-lg border cursor-pointer transition-all relative ${
                      isSelected
                        ? 'border-zinc-900 bg-zinc-50/80 ring-1 ring-zinc-900'
                        : 'border-zinc-200 bg-white hover:border-zinc-300'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5 mb-1.5">
                      <div className="w-8 h-8 rounded-full bg-zinc-200 flex items-center justify-center font-bold text-xs text-zinc-700">
                        {persona.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-zinc-900">{persona.name}</div>
                        <div className="text-[10px] text-zinc-500">{persona.role}</div>
                      </div>
                    </div>
                    <span className="inline-block text-[10px] font-medium px-2 py-0.5 rounded-sm bg-zinc-100 text-zinc-700 mb-1.5">
                      {persona.companyTag}
                    </span>
                    <p className="text-[11px] text-zinc-600 leading-snug">
                      {persona.styleDescription}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Question Count & Time */}
          <div className="flex items-center justify-between p-3.5 bg-zinc-50 rounded-lg border border-zinc-200">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-zinc-500" />
              <div>
                <div className="text-xs font-semibold text-zinc-800">Interview Length</div>
                <div className="text-[11px] text-zinc-500">
                  {questionCount} questions (~{questionCount * 3} - {questionCount * 4} minutes)
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-1.5">
              {[3, 4, 5].map((cnt) => (
                <button
                  key={cnt}
                  type="button"
                  onClick={() => setQuestionCount(cnt)}
                  className={`w-8 h-8 rounded-md text-xs font-semibold transition-all ${
                    questionCount === cnt
                      ? 'bg-zinc-900 text-white'
                      : 'bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-100'
                  }`}
                >
                  {cnt}
                </button>
              ))}
            </div>
          </div>

          {/* Collapsible Advanced Context (Job Description / Resume) */}
          <div className="border-t border-zinc-200 pt-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="text-xs font-semibold text-zinc-700 hover:text-zinc-900 flex items-center space-x-1.5 cursor-pointer"
              >
                <FileText className="w-4 h-4 text-zinc-500" />
                <span>Custom Job Description & Resume Context (Optional)</span>
                <span className="text-[10px] text-zinc-400 font-normal">({showAdvanced ? 'Collapse' : 'Expand & Upload'})</span>
              </button>

              <div className="flex items-center space-x-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  accept=".txt,.md,.text,.json"
                  onChange={handleFileInputChange}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-2.5 py-1 text-xs font-medium text-zinc-700 bg-white hover:bg-zinc-100 rounded-md border border-zinc-200 flex items-center space-x-1.5 transition-colors cursor-pointer"
                >
                  <UploadCloud className="w-3.5 h-3.5 text-zinc-500" />
                  <span>Upload Resume / JD</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSmartAutofill()}
                  className="px-2.5 py-1 text-xs font-medium text-amber-800 bg-amber-50 hover:bg-amber-100 rounded-md border border-amber-200 flex items-center space-x-1.5 transition-colors cursor-pointer"
                >
                  <Wand2 className="w-3.5 h-3.5 text-amber-600" />
                  <span>Smart Autofill</span>
                </button>
              </div>
            </div>

            {autofillNotice && (
              <div className="mt-3 p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center space-x-2 text-xs text-emerald-800 animate-in fade-in duration-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{autofillNotice}</span>
              </div>
            )}

            {showAdvanced && (
              <div className="mt-4 space-y-4">
                {/* Drag and Drop Zone */}
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleFileDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all ${
                    isDragging
                      ? 'border-zinc-900 bg-zinc-100/80 scale-[1.005]'
                      : 'border-zinc-200 bg-zinc-50/50 hover:bg-zinc-50 hover:border-zinc-300'
                  }`}
                >
                  <UploadCloud className="w-6 h-6 text-zinc-400 mx-auto mb-1.5" />
                  <div className="text-xs font-semibold text-zinc-800">
                    Drag and drop your Resume or Job Description (.txt, .md, .json)
                  </div>
                  <div className="text-[11px] text-zinc-500 mt-0.5">
                    Click to browse files or drop document here. AI will extract title, seniority, track, and company automatically.
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label htmlFor="job-description-paste" className="block text-[11px] font-semibold text-zinc-700 uppercase">
                        Job Description Snippet
                      </label>
                      {jobDescription && (
                        <button
                          type="button"
                          onClick={() => setJobDescription('')}
                          className="text-[10px] text-zinc-400 hover:text-zinc-600 cursor-pointer"
                        >
                          Clear
                        </button>
                      )}
                    </div>
                    <textarea
                      id="job-description-paste"
                      rows={3}
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                      placeholder="Paste role responsibilities or required technologies to tailor questions precisely..."
                      className="w-full p-2.5 text-xs bg-zinc-50 border border-zinc-200 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-zinc-900"
                    />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label htmlFor="resume-summary-paste" className="block text-[11px] font-semibold text-zinc-700 uppercase">
                        Your Key Resume Highlights
                      </label>
                      {resumeSummary && (
                        <button
                          type="button"
                          onClick={() => setResumeSummary('')}
                          className="text-[10px] text-zinc-400 hover:text-zinc-600 cursor-pointer"
                        >
                          Clear
                        </button>
                      )}
                    </div>
                    <textarea
                      id="resume-summary-paste"
                      rows={3}
                      value={resumeSummary}
                      onChange={(e) => setResumeSummary(e.target.value)}
                      placeholder="Paste your key accomplishments or tech stack so the interviewer can challenge your real projects..."
                      className="w-full p-2.5 text-xs bg-zinc-50 border border-zinc-200 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-zinc-900"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 bg-zinc-50 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2 text-xs text-zinc-500">
            <HelpCircle className="w-3.5 h-3.5 text-zinc-400" />
            <span>Includes live microphone speech input, timer, and STAR critique.</span>
          </div>

          <button
            id="start-interview-btn"
            type="submit"
            disabled={isLoading || !roleTitle.trim()}
            className="w-full sm:w-auto px-6 py-2.5 bg-zinc-900 hover:bg-zinc-800 disabled:opacity-50 text-white text-sm font-semibold rounded-lg shadow-sm flex items-center justify-center space-x-2 transition-all cursor-pointer"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                <span>Crafting Interview Questions...</span>
              </>
            ) : (
              <>
                <span>Launch Mock Interview</span>
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
