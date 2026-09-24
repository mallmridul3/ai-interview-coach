import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  HelpCircle, 
  CheckCircle2, 
  Target, 
  ArrowRight, 
  Award, 
  Copy, 
  Check, 
  BookOpen,
  Mic,
  Search,
  Filter,
  Plus,
  Trash2,
  Edit3,
  Bookmark,
  Layers,
  FolderOpen,
  X
} from 'lucide-react';
import { SavedSTARStory } from '../types';

export interface BehavioralQuestionItem {
  id: number;
  title: string;
  category: string;
  question: string;
  whyAsked: string;
  starTips: {
    situation: string;
    task: string;
    action: string;
    result: string;
  };
  commonPitfalls: string[];
}

export const TEN_COMMON_BEHAVIORAL_QUESTIONS: BehavioralQuestionItem[] = [
  {
    id: 1,
    title: 'Conflict & Disagreement',
    category: 'Interpersonal & Alignment',
    question: 'Tell me about a time you had a significant disagreement with a colleague, tech lead, or manager over a project direction. How did you resolve it?',
    whyAsked: 'Evaluates emotional intelligence, psychological safety, data-backed persuasion, and ability to "disagree and commit" without resentment.',
    starTips: {
      situation: 'Briefly define the technical or project crossroads without villifying the other party.',
      task: 'Identify your responsibility to deliver high quality while preserving team rapport.',
      action: 'Detail how you established objective evaluation criteria, ran empirical POCs, or held 1-on-1 discovery discussions.',
      result: 'Highlight consensus reached, zero project delay, and how team trust improved afterwards.',
    },
    commonPitfalls: ['Blaming the colleague', 'Focusing only on who was "right"', 'Omitting post-resolution relationship health'],
  },
  {
    id: 2,
    title: 'Failure & Resilience',
    category: 'Ownership & Accountability',
    question: 'Describe a time when a project or system you were responsible for failed, suffered an outage, or missed a critical deadline. What was your personal accountability?',
    whyAsked: 'Top interviewers test extreme ownership, blameless post-mortem discipline, and whether you create durable systemic safeguards.',
    starTips: {
      situation: 'Clearly explain the high-stakes environment and the failure mode (outage, regression, missed date).',
      task: 'Own your exact share of responsibility directly—no excuses or finger-pointing.',
      action: 'Explain your emergency triage protocol, communication to affected stakeholders, and root-cause analysis (5 Whys).',
      result: 'Quantify recovery speed, new automated test suites or alerting added, and zero recurrences since.',
    },
    commonPitfalls: ['Picking a "fake failure" (e.g. "I worked too hard")', 'Deflecting blame to juniors or management', 'Missing long-term preventative measures'],
  },
  {
    id: 3,
    title: 'Navigating Ambiguity & Prioritization',
    category: 'Strategic Problem Solving',
    question: 'Tell me about a situation where you had to make an important strategic or technical decision with incomplete information and competing deadlines.',
    whyAsked: 'Assesses whether you paralyze under ambiguity or prudently apply two-way-door logic and empirical hypotheses.',
    starTips: {
      situation: 'Describe missing constraints, rapid market shifts, or conflicting user feedback.',
      task: 'State the critical deadline and the risk of inaction vs. incorrect action.',
      action: 'Explain how you isolated high-confidence assumptions, consulted key domain experts, and designed an iterative rollback plan.',
      result: 'Share measurable outcomes, user adoption metrics, and how your baseline hypothesis proved correct.',
    },
    commonPitfalls: ['Waiting passively for senior direction', 'Acting recklessly without telemetry', 'Neglecting stakeholder updates'],
  },
  {
    id: 4,
    title: 'Influence Without Authority',
    category: 'Leadership & Stakeholders',
    question: 'Give me an example of a time you needed to rally cross-functional stakeholders (e.g., Product, Design, Sales, or Leadership) who initially opposed your proposal.',
    whyAsked: 'Senior candidates must deliver organization-wide impact without relying on managerial rank.',
    starTips: {
      situation: 'Explain the new standard, architectural refactor, or product change you championed and the nature of initial pushback.',
      task: 'Show your goal: achieving mutual business alignment rather than "winning an argument".',
      action: 'Detail how you tailored your pitch to their metrics (e.g., latency for engineers, revenue for sales), addressed valid concerns, and held pilot demos.',
      result: 'Show cross-functional sign-off, adoption percentage across teams, and improved cross-org efficiency.',
    },
    commonPitfalls: ['Appealing immediately to an executive sponsor for a mandate', 'Ignoring the valid concerns of opposing teams'],
  },
  {
    id: 5,
    title: 'Overcoming Complex Obstacles',
    category: 'Technical & Execution Rigor',
    question: 'Walk me through the most challenging roadblock or bottleneck you personally encountered in a project. How did you decompose and solve it?',
    whyAsked: 'Tests first-principles problem decomposition, persistence, and technical/analytical resourcefulness.',
    starTips: {
      situation: 'Set up the technical limitation, legacy debt, or complex third-party constraint.',
      task: 'Define the target SLA, performance benchmark, or business deliverable.',
      action: 'Walk through hypothesis testing, profiling, whiteboarding, and iterative architectural refactoring.',
      result: 'Provide hard numbers: e.g. 60% memory reduction, 3x query speedup, or on-time delivery.',
    },
    commonPitfalls: ['Getting lost in trivial technical trivia without tying it to the user or business outcome'],
  },
  {
    id: 6,
    title: 'Customer Empathy & Product Sense',
    category: 'Product & Customer Impact',
    question: 'Tell me about a time you identified an overlooked customer pain point or unstated requirement and championed a solution.',
    whyAsked: 'Evaluates customer-centricity and whether you proactively invent on behalf of users rather than just executing tickets.',
    starTips: {
      situation: 'Explain the customer data, telemetry, or qualitative feedback that tipped you off.',
      task: 'Clarify why this was not already on the official product roadmap.',
      action: 'Detail how you prototyped a lightweight solution, validated with actual users, and prioritized it into the sprint.',
      result: 'Share metrics: +24% retention, CSAT improvement, or reduction in support tickets.',
    },
    commonPitfalls: ['Relying solely on your personal opinion instead of actual customer evidence'],
  },
  {
    id: 7,
    title: 'Delivering Under Extreme Pressure',
    category: 'Execution & Resilience',
    question: 'Describe a project where deadlines were aggressive, team resources were constrained, and expectations were high. How did you deliver?',
    whyAsked: 'Tests ruthlessness in scope pruning, team motivation, and protecting quality under pressure.',
    starTips: {
      situation: 'Set up the contractual deadline, launch date, or competitive pressure.',
      task: 'Define the minimum viable scope required for success.',
      action: 'Explain how you prioritized ruthlessly, eliminated non-essential features, automated toil, and kept the team energized.',
      result: 'On-time delivery with zero critical regressions and high customer praise.',
    },
    commonPitfalls: ['Bragging about burnout/overtime rather than smart scope management and technical leverage'],
  },
  {
    id: 8,
    title: 'Mentorship & Leveling Others',
    category: 'People & Culture',
    question: 'Tell me about an engineer or team member you mentored who was struggling or needed to step up to the next level. How did you support their growth?',
    whyAsked: 'Senior and staff candidates are judged on how they elevate their peers and scale organizational capability.',
    starTips: {
      situation: 'Identify the growth gap or opportunity for the mentee.',
      task: 'Show your commitment to their personal development.',
      action: 'Detail your structured coaching plan: pairing sessions, incremental stretch goals, constructive feedback loops.',
      result: 'Show mentee promotion, independent delivery of key systems, and positive feedback.',
    },
    commonPitfalls: ['Taking all the credit for the mentee\'s achievements', 'Being condescending'],
  },
  {
    id: 9,
    title: 'Championing Engineering Quality',
    category: 'Craftsmanship & Standards',
    question: 'Describe an instance where you pushed to pay down technical debt, improve testing, or enhance architecture when business leaders wanted new features.',
    whyAsked: 'Evaluates how you balance business velocity with long-term systemic durability without being dogmatic.',
    starTips: {
      situation: 'Explain the compounding cost of the debt (regressions, developer friction, slow deployments).',
      task: 'Frame the business justification rather than emotional complaint.',
      action: 'Explain how you bundled debt remediation with feature delivery, instrumented metrics, and proved ROI.',
      result: 'Cut deployment failures by 40%, accelerated team velocity, and preserved high platform uptime.',
    },
    commonPitfalls: ['Demanding a full rewrite from scratch without incremental business delivery'],
  },
  {
    id: 10,
    title: 'Ethical Dilemma & Principled Stance',
    category: 'Integrity & Ethics',
    question: 'Tell me about a time you were pressured to compromise on safety, privacy, security, or ethical standards to meet a business goal. How did you respond?',
    whyAsked: 'Tests moral courage, corporate integrity, and ability to present win-win alternatives under executive pressure.',
    starTips: {
      situation: 'Describe the commercial pressure or deadline pushing for shortcuts.',
      task: 'Highlight your unwavering stance on core principles, user trust, and legal safety.',
      action: 'Detail how you calmly escalated, quantified reputational/security risks, and presented a secure alternative.',
      result: 'Protected company reputation and user trust while achieving business objectives securely.',
    },
    commonPitfalls: ['Being combative instead of constructive', 'Silently complying with unsafe mandates'],
  },
];

const INITIAL_STAR_STORIES: SavedSTARStory[] = [
  {
    id: 'story-1',
    title: 'Resolving Distributed Cache Race Condition during Black Friday',
    category: 'Failure & Resilience',
    situation: 'During peak flash-sale traffic at Stripe, our distributed Redis cache experienced thundering herd cache-stampedes, causing p99 database latency to spike to 4.2 seconds.',
    task: 'As the on-call Senior Infrastructure Engineer, I was accountable for stabilizing payment authorization pipelines without turning away buyers.',
    action: 'I spearheaded emergency read-through mutex locking in the caching layer, implemented adaptive probabilistic early expiration (XFetch algorithm), and coordinated dynamic load-shedding for non-critical endpoints.',
    result: 'p99 latency plummeted from 4.2s back down to 38ms within 18 minutes; we maintained 100% authorization availability and processed $42M in volume with zero data loss.',
    metrics: 'p99 from 4.2s to 38ms, $42M processed, 100% uptime',
    tags: ['Outage', 'Distributed Systems', 'Redis', 'High Traffic'],
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'story-2',
    title: 'Migrating Monolithic Billing Engine to Event-Driven Microservices',
    category: 'Leadership & Stakeholders',
    situation: 'Legacy billing code had 3-day invoice reconciliation delays and blocked international merchant expansion into 14 countries.',
    task: 'I was tasked with architecting the event-driven ledger migration while keeping existing subscriptions billing without double-charging.',
    action: 'I pitched an incremental Strangler-Fig migration pattern using Kafka CDC. Held weekly alignment sessions with Finance and Product to resolve edge cases, and ran a dual-write shadow verification pipeline for 30 days.',
    result: 'Zero billing discrepancies across 250,000 merchants; unlocked expansion to 14 new countries, saving an estimated $350k annually in cloud and reconciliation overhead.',
    metrics: '250k merchants, 14 countries, $350k annual savings',
    tags: ['Architecture', 'Kafka', 'Refactor', 'Cross-Functional'],
    updatedAt: new Date().toISOString(),
  },
];

interface BehavioralQuestionsViewProps {
  onPracticeQuestion: (question: string, category: string) => void;
}

export const BehavioralQuestionsView: React.FC<BehavioralQuestionsViewProps> = ({
  onPracticeQuestion,
}) => {
  const [activeTab, setActiveTab] = useState<'questions' | 'vault'>('questions');
  const [expandedId, setExpandedId] = useState<number | null>(1);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // STAR Story Vault state
  const [stories, setStories] = useState<SavedSTARStory[]>(() => {
    try {
      const saved = localStorage.getItem('ai_interview_coach_story_vault');
      return saved ? JSON.parse(saved) : INITIAL_STAR_STORIES;
    } catch {
      return INITIAL_STAR_STORIES;
    }
  });

  const [isEditingStory, setIsEditingStory] = useState(false);
  const [editingStory, setEditingStory] = useState<SavedSTARStory | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('ai_interview_coach_story_vault', JSON.stringify(stories));
    } catch (e) {
      console.error('Failed to save stories to localStorage:', e);
    }
  }, [stories]);

  const categories = [
    'All',
    'Interpersonal & Alignment',
    'Ownership & Accountability',
    'Strategic Problem Solving',
    'Leadership & Stakeholders',
    'Technical & Execution Rigor',
    'Craftsmanship & Standards',
  ];

  const filteredQuestions = TEN_COMMON_BEHAVIORAL_QUESTIONS.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.whyAsked.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCopyQuestion = (item: BehavioralQuestionItem) => {
    navigator.clipboard.writeText(item.question);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSaveStory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStory || !editingStory.title.trim()) return;

    if (stories.some((s) => s.id === editingStory.id)) {
      setStories((prev) => prev.map((s) => (s.id === editingStory.id ? editingStory : s)));
    } else {
      setStories((prev) => [editingStory, ...prev]);
    }

    setIsEditingStory(false);
    setEditingStory(null);
  };

  const handleDeleteStory = (id: string) => {
    setStories((prev) => prev.filter((s) => s.id !== id));
  };

  const handleCreateNewStory = () => {
    const newStory: SavedSTARStory = {
      id: `story-${Date.now()}`,
      title: 'New Anchor Impact Story',
      category: 'Ownership & Accountability',
      situation: '',
      task: '',
      action: '',
      result: '',
      metrics: '',
      tags: ['Leadership', 'Impact'],
      updatedAt: new Date().toISOString(),
    };
    setEditingStory(newStory);
    setIsEditingStory(true);
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6">
      {/* Header Banner */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-amber-50 border border-amber-200/80 rounded-full text-xs font-medium text-amber-800 mb-3">
          <BookOpen className="w-3.5 h-3.5 text-amber-600" />
          <span>Curated Interview Playbook & Anchor Story Vault</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900">
          Master the Behavioral & Leadership Interview
        </h1>
        <p className="mt-2 text-sm sm:text-base text-zinc-600 max-w-2xl mx-auto">
          Explore the top 10 behavioral prompts asked across Tier-1 companies, or draft and organize your personal STAR stories in your private story vault.
        </p>

        {/* Tab Switcher */}
        <div className="flex items-center justify-center mt-6">
          <div className="bg-zinc-200/80 p-1 rounded-xl flex items-center space-x-1 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setActiveTab('questions')}
              className={`px-4 py-2 rounded-lg transition-all cursor-pointer ${
                activeTab === 'questions'
                  ? 'bg-zinc-900 text-white shadow-xs'
                  : 'text-zinc-700 hover:text-zinc-900'
              }`}
            >
              10 Core Behavioral Questions
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('vault')}
              className={`px-4 py-2 rounded-lg transition-all flex items-center space-x-1.5 cursor-pointer ${
                activeTab === 'vault'
                  ? 'bg-zinc-900 text-white shadow-xs'
                  : 'text-zinc-700 hover:text-zinc-900'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5 text-amber-400" />
              <span>STAR Story Vault ({stories.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* TAB 1: 10 Core Questions */}
      {activeTab === 'questions' && (
        <>
          {/* Search & Filter Bar */}
          <div className="mb-6 flex flex-col sm:flex-row gap-3 items-center justify-between">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search questions or competencies..."
                className="w-full pl-9 pr-3.5 py-2 bg-white border border-zinc-200 rounded-lg text-xs text-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900"
              />
            </div>

            <div className="flex items-center space-x-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
              <Filter className="w-3.5 h-3.5 text-zinc-400 shrink-0 mr-1" />
              {categories.slice(0, 5).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-zinc-900 text-white'
                      : 'bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Question List */}
          <div className="space-y-4">
            {filteredQuestions.map((item) => {
              const isExpanded = expandedId === item.id;
              return (
                <div
                  key={item.id}
                  className="bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-xs hover:border-zinc-300 transition-all"
                >
                  {/* Card Header */}
                  <div 
                    className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer select-none bg-white"
                    onClick={() => setExpandedId(isExpanded ? null : item.id)}
                  >
                    <div className="flex items-start space-x-3.5">
                      <span className="w-7 h-7 rounded-lg bg-zinc-100 text-zinc-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 border border-zinc-200">
                        #{item.id}
                      </span>
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="text-xs font-bold text-zinc-900">{item.title}</span>
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-sm bg-zinc-100 text-zinc-600">
                            {item.category}
                          </span>
                        </div>
                        <p className="text-sm font-semibold text-zinc-800 leading-snug">
                          &ldquo;{item.question}&rdquo;
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 self-end sm:self-center shrink-0">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopyQuestion(item);
                        }}
                        title="Copy Question"
                        className="p-2 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 rounded-lg transition-colors cursor-pointer"
                      >
                        {copiedId === item.id ? (
                          <Check className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onPracticeQuestion(item.question, item.category);
                        }}
                        className="px-3.5 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold rounded-lg shadow-xs flex items-center space-x-1.5 transition-colors cursor-pointer"
                      >
                        <Mic className="w-3.5 h-3.5 text-amber-300" />
                        <span>Practice in Studio</span>
                      </button>
                    </div>
                  </div>

                  {/* Expanded Breakdown */}
                  {isExpanded && (
                    <div className="p-5 pt-0 border-t border-zinc-100 bg-zinc-50/50 space-y-4 text-xs">
                      {/* Why it is asked */}
                      <div className="p-3 bg-blue-50/60 border border-blue-200/80 rounded-lg text-blue-950">
                        <span className="font-bold flex items-center space-x-1 text-blue-900 mb-1">
                          <Target className="w-3.5 h-3.5 text-blue-600" />
                          <span>Why Hiring Committees Ask This:</span>
                        </span>
                        <p className="text-blue-900 leading-relaxed">{item.whyAsked}</p>
                      </div>

                      {/* STAR Method Delivery Blueprint */}
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-700 mb-2.5 flex items-center space-x-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                          <span>STAR Framework Delivery Blueprint</span>
                        </h4>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                          <div className="p-3 bg-white border border-zinc-200 rounded-lg">
                            <div className="font-bold text-zinc-900 mb-1 flex items-center space-x-1">
                              <span className="w-4 h-4 rounded-full bg-zinc-900 text-white text-[10px] flex items-center justify-center font-bold">S</span>
                              <span>Situation (15-20% time)</span>
                            </div>
                            <p className="text-zinc-600 leading-relaxed">{item.starTips.situation}</p>
                          </div>

                          <div className="p-3 bg-white border border-zinc-200 rounded-lg">
                            <div className="font-bold text-zinc-900 mb-1 flex items-center space-x-1">
                              <span className="w-4 h-4 rounded-full bg-zinc-900 text-white text-[10px] flex items-center justify-center font-bold">T</span>
                              <span>Task (10-15% time)</span>
                            </div>
                            <p className="text-zinc-600 leading-relaxed">{item.starTips.task}</p>
                          </div>

                          <div className="p-3 bg-white border border-zinc-200 rounded-lg">
                            <div className="font-bold text-zinc-900 mb-1 flex items-center space-x-1">
                              <span className="w-4 h-4 rounded-full bg-emerald-600 text-white text-[10px] flex items-center justify-center font-bold">A</span>
                              <span>Action (50-60% time)</span>
                            </div>
                            <p className="text-zinc-600 leading-relaxed">{item.starTips.action}</p>
                          </div>

                          <div className="p-3 bg-white border border-zinc-200 rounded-lg">
                            <div className="font-bold text-zinc-900 mb-1 flex items-center space-x-1">
                              <span className="w-4 h-4 rounded-full bg-blue-600 text-white text-[10px] flex items-center justify-center font-bold">R</span>
                              <span>Result (15-20% time)</span>
                            </div>
                            <p className="text-zinc-600 leading-relaxed">{item.starTips.result}</p>
                          </div>
                        </div>
                      </div>

                      {/* Pitfalls to Avoid */}
                      <div className="p-3 bg-rose-50/60 border border-rose-200/80 rounded-lg text-rose-950">
                        <span className="font-bold text-rose-900 block mb-1">Common Pitfalls to Avoid:</span>
                        <ul className="list-disc list-inside space-y-0.5 text-rose-900">
                          {item.commonPitfalls.map((pitfall, i) => (
                            <li key={i}>{pitfall}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* TAB 2: STAR Story Vault (Personal Story Bank) */}
      {activeTab === 'vault' && (
        <div className="space-y-6">
          {/* Action Header */}
          <div className="flex items-center justify-between bg-white p-5 rounded-xl border border-zinc-200 shadow-xs">
            <div>
              <h3 className="text-sm font-bold text-zinc-900">Your Reusable Anchor Stories</h3>
              <p className="text-xs text-zinc-500">
                Top interviewees prepare 4-6 versatile anchor stories that can answer 80% of behavioral questions.
              </p>
            </div>
            <button
              type="button"
              onClick={handleCreateNewStory}
              className="px-3.5 py-2 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold rounded-lg flex items-center space-x-1.5 transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Anchor Story</span>
            </button>
          </div>

          {/* Stories List */}
          <div className="grid grid-cols-1 gap-4">
            {stories.map((story) => (
              <div
                key={story.id}
                className="bg-white border border-zinc-200 rounded-xl p-5 shadow-xs hover:border-zinc-300 transition-all space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-100 pb-3">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="text-sm font-bold text-zinc-900">{story.title}</h4>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-sm bg-zinc-100 text-zinc-700">
                        {story.category}
                      </span>
                    </div>
                    {story.metrics && (
                      <span className="text-xs font-semibold text-emerald-700">
                        Key KPI / Metric: {story.metrics}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingStory(story);
                        setIsEditingStory(true);
                      }}
                      className="p-1.5 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 rounded-lg transition-colors cursor-pointer"
                      title="Edit Story"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteStory(story.id)}
                      className="p-1.5 text-zinc-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                      title="Delete Story"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onPracticeQuestion(`Walk me through your experience: ${story.title}`, story.category)}
                      className="px-3 py-1 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold rounded-lg flex items-center space-x-1 cursor-pointer"
                    >
                      <Mic className="w-3 h-3 text-amber-300" />
                      <span>Rehearse Story</span>
                    </button>
                  </div>
                </div>

                {/* STAR Pillars Quick Breakdown */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                  <div className="p-2.5 bg-zinc-50 rounded-lg border border-zinc-100">
                    <span className="font-bold text-zinc-700 block mb-0.5">S - Situation:</span>
                    <p className="text-zinc-600 line-clamp-2">{story.situation || 'Not specified'}</p>
                  </div>
                  <div className="p-2.5 bg-zinc-50 rounded-lg border border-zinc-100">
                    <span className="font-bold text-zinc-700 block mb-0.5">T - Task:</span>
                    <p className="text-zinc-600 line-clamp-2">{story.task || 'Not specified'}</p>
                  </div>
                  <div className="p-2.5 bg-zinc-50 rounded-lg border border-zinc-100">
                    <span className="font-bold text-emerald-800 block mb-0.5">A - Action (Decisions & Execution):</span>
                    <p className="text-zinc-600 line-clamp-2">{story.action || 'Not specified'}</p>
                  </div>
                  <div className="p-2.5 bg-zinc-50 rounded-lg border border-zinc-100">
                    <span className="font-bold text-blue-800 block mb-0.5">R - Result & Impact:</span>
                    <p className="text-zinc-600 line-clamp-2">{story.result || 'Not specified'}</p>
                  </div>
                </div>

                {/* Tags */}
                {story.tags && story.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {story.tags.map((t, idx) => (
                      <span key={idx} className="text-[10px] px-2 py-0.5 bg-zinc-100 text-zinc-600 rounded-md font-mono">
                        #{t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Edit / Create Story Modal */}
          {isEditingStory && editingStory && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
              <div className="bg-white rounded-2xl shadow-2xl border border-zinc-200 max-w-xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-5 border-b border-zinc-100 flex items-center justify-between sticky top-0 bg-white z-10">
                  <h3 className="text-sm font-bold text-zinc-900">
                    {stories.some((s) => s.id === editingStory.id) ? 'Edit Anchor Story' : 'New Anchor Story'}
                  </h3>
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditingStory(false);
                      setEditingStory(null);
                    }}
                    className="p-1 text-zinc-400 hover:text-zinc-700 rounded-lg"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSaveStory} className="p-6 space-y-4 text-xs">
                  <div>
                    <label className="block font-bold text-zinc-700 uppercase mb-1">Story Title / Project Name</label>
                    <input
                      type="text"
                      required
                      value={editingStory.title}
                      onChange={(e) => setEditingStory({ ...editingStory, title: e.target.value })}
                      placeholder="e.g. Migrating Core Billing Engine to Kafka"
                      className="w-full p-2.5 bg-zinc-50 border border-zinc-200 rounded-lg text-xs"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-zinc-700 uppercase mb-1">Primary Competency</label>
                      <select
                        value={editingStory.category}
                        onChange={(e) => setEditingStory({ ...editingStory, category: e.target.value })}
                        className="w-full p-2.5 bg-zinc-50 border border-zinc-200 rounded-lg text-xs"
                      >
                        <option value="Ownership & Accountability">Ownership & Accountability</option>
                        <option value="Failure & Resilience">Failure & Resilience</option>
                        <option value="Interpersonal & Alignment">Interpersonal & Alignment</option>
                        <option value="Strategic Problem Solving">Strategic Problem Solving</option>
                        <option value="Leadership & Stakeholders">Leadership & Stakeholders</option>
                        <option value="Technical & Execution Rigor">Technical & Execution Rigor</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-zinc-700 uppercase mb-1">Key Measurable Numbers</label>
                      <input
                        type="text"
                        value={editingStory.metrics}
                        onChange={(e) => setEditingStory({ ...editingStory, metrics: e.target.value })}
                        placeholder="e.g. 99.99% uptime, -40% latency"
                        className="w-full p-2.5 bg-zinc-50 border border-zinc-200 rounded-lg text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-zinc-700 uppercase mb-1">Situation (Context & Stakes)</label>
                    <textarea
                      rows={2}
                      value={editingStory.situation}
                      onChange={(e) => setEditingStory({ ...editingStory, situation: e.target.value })}
                      placeholder="Company, product, customer stakes, problem urgency..."
                      className="w-full p-2.5 bg-zinc-50 border border-zinc-200 rounded-lg text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-zinc-700 uppercase mb-1">Task (Your Personal Ownership)</label>
                    <textarea
                      rows={2}
                      value={editingStory.task}
                      onChange={(e) => setEditingStory({ ...editingStory, task: e.target.value })}
                      placeholder="What were YOU explicitly accountable for solving?"
                      className="w-full p-2.5 bg-zinc-50 border border-zinc-200 rounded-lg text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-zinc-700 uppercase mb-1">Action (Technical Choices & Leadership)</label>
                    <textarea
                      rows={3}
                      value={editingStory.action}
                      onChange={(e) => setEditingStory({ ...editingStory, action: e.target.value })}
                      placeholder="Step-by-step decisions, trade-offs evaluated, how you rallied people..."
                      className="w-full p-2.5 bg-zinc-50 border border-zinc-200 rounded-lg text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-zinc-700 uppercase mb-1">Result & Business ROI</label>
                    <textarea
                      rows={2}
                      value={editingStory.result}
                      onChange={(e) => setEditingStory({ ...editingStory, result: e.target.value })}
                      placeholder="Outcome, metrics, permanent safeguards introduced..."
                      className="w-full p-2.5 bg-zinc-50 border border-zinc-200 rounded-lg text-xs"
                    />
                  </div>

                  <div className="pt-2 flex justify-end space-x-2 border-t border-zinc-100">
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditingStory(false);
                        setEditingStory(null);
                      }}
                      className="px-4 py-2 rounded-lg text-zinc-700 hover:bg-zinc-100 text-xs font-semibold cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold cursor-pointer"
                    >
                      Save Story
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
