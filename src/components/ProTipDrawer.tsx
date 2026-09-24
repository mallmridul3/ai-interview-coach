import React, { useEffect, useState } from 'react';
import {
  X,
  Lightbulb,
  Compass,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Copy,
  Check,
  ArrowRight,
  Sparkles,
  BookOpen,
  Target,
  FileText
} from 'lucide-react';
import { InterviewQuestion } from '../types';

interface ProTipDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  question: InterviewQuestion;
  onInsertTemplate?: (template: string) => void;
}

interface FrameworkStep {
  name: string;
  tag: string;
  percentage: string;
  idealSeconds: string;
  goal: string;
  keyPoints: string[];
  starterPhrase: string;
}

interface CategoryTipGuide {
  categoryTitle: string;
  frameworkName: string;
  frameworkAcronym: string;
  summary: string;
  targetDuration: string;
  steps: FrameworkStep[];
  dos: string[];
  donts: string[];
  outlineTemplate: string;
}

const CATEGORY_GUIDES: Record<string, CategoryTipGuide> = {
  behavioral: {
    categoryTitle: 'Behavioral & Leadership',
    frameworkName: 'STAR Method (Situation, Task, Action, Result)',
    frameworkAcronym: 'S · T · A · R',
    summary: 'Focus 60%+ of your time on YOUR direct actions. Avoid passive "we" statements and generic summaries.',
    targetDuration: '90 – 150 seconds',
    steps: [
      {
        name: 'Situation',
        tag: 'S',
        percentage: '15-20%',
        idealSeconds: '~25s',
        goal: 'Set the scene with context, company, timeline, constraints, and business stakes.',
        keyPoints: [
          'State who the customer or stakeholder was.',
          'Keep backstory concise; do not get lost in company politics.',
          'Highlight what was broken or at risk if nothing changed.'
        ],
        starterPhrase: 'At my previous role at [Company], we faced a critical challenge when...'
      },
      {
        name: 'Task',
        tag: 'T',
        percentage: '10-15%',
        idealSeconds: '~15s',
        goal: 'Clarify your personal responsibility and the specific challenge you owned.',
        keyPoints: [
          'Distinguish team goal from YOUR distinct mandate.',
          'Identify the primary hurdle or ambiguity you had to navigate.',
          'Define the metric or outcome you were accountable for.'
        ],
        starterPhrase: 'My explicit responsibility was to lead the remediation and ensure...'
      },
      {
        name: 'Action',
        tag: 'A',
        percentage: '50-60%',
        idealSeconds: '~60-80s',
        goal: 'The core of your answer! Walk through your strategic decisions, trade-offs, and actions.',
        keyPoints: [
          'Use "I" instead of "we" to show individual agency and technical leadership.',
          'Mention trade-offs: why you chose Solution A over Solution B.',
          'Highlight communication, stakeholder alignment, or architectural choices.'
        ],
        starterPhrase: 'To tackle this, I took a 3-part approach: First, I analyzed... Then, I built...'
      },
      {
        name: 'Result',
        tag: 'R',
        percentage: '15-20%',
        idealSeconds: '~25s',
        goal: 'Deliver measurable business or technical outcomes and long-term learning.',
        keyPoints: [
          'Anchor with concrete metrics: %, $, latency reduction, throughput, or time saved.',
          'Mention the lasting impact (e.g., standard adopted company-wide).',
          'Add a one-sentence post-mortem insight on what you learned.'
        ],
        starterPhrase: 'As a direct outcome, we reduced latency by 42% and saved approximately...'
      }
    ],
    dos: [
      'Quantify your results with concrete numbers, percentages, or scale metrics.',
      'Show vulnerability: mention a trade-off or obstacle you overcame in the Action phase.',
      'Use active verbs: "I orchestrated", "I prototyped", "I negotiated".'
    ],
    donts: [
      'Do not spend over 40 seconds on the Situation setup.',
      'Do not say "we did this" throughout without clarifying your personal contribution.',
      'Do not forget the Result—never trail off without stating the final impact.'
    ],
    outlineTemplate: `[Situation]: At [Company/Project], we experienced [Context & Problem] with [Stakeholder/Users].
[Task]: My explicit responsibility was to [My Objective] under [Key Constraint/Timeline].
[Action]:
1. First, I analyzed the problem by...
2. Next, I made the key decision to [Trade-off/Action] because...
3. I rallied the team and executed by...
[Result]: As a result, we achieved [Quantified Metric: %, $, scale] and established [Lasting Impact].`
  },
  technical: {
    categoryTitle: 'Technical & Problem Solving',
    frameworkName: 'REACT Method (Requirements, Edge Cases, Approach, Code/Architecture, Tests)',
    frameworkAcronym: 'R · E · A · C · T',
    summary: 'Never jump straight to answering without clarifying constraints and discussing trade-offs upfront.',
    targetDuration: '120 – 180 seconds',
    steps: [
      {
        name: 'Clarify Requirements & Scope',
        tag: 'R',
        percentage: '15%',
        idealSeconds: '~20s',
        goal: 'Define inputs, outputs, data volume, scale constraints, and latency expectations.',
        keyPoints: [
          'Ask or clarify expected throughput (QPS, memory limits).',
          'Establish expected return types and whether data fits in memory.',
          'Verify if real-time vs batch processing is expected.'
        ],
        starterPhrase: 'Before diving into the solution, I want to clarify the constraints: Are we assuming...'
      },
      {
        name: 'Identify Edge Cases & Failure Modes',
        tag: 'E',
        percentage: '15%',
        idealSeconds: '~20s',
        goal: 'Prove engineering rigor by listing boundary conditions before writing code.',
        keyPoints: [
          'Null / empty inputs, duplicates, out-of-order data.',
          'Concurrent access, race conditions, memory bottlenecks.',
          'Large datasets that exceed single-node memory.'
        ],
        starterPhrase: 'Key boundary cases I want to keep top of mind include empty inputs, race conditions, and...'
      },
      {
        name: 'Approach & Complexity Trade-Offs',
        tag: 'A',
        percentage: '25%',
        idealSeconds: '~40s',
        goal: 'Compare naive brute force vs optimal solution with Big-O time and space analysis.',
        keyPoints: [
          'State brute-force complexity: "A naive scan is O(N^2) time, O(1) space".',
          'Propose optimal data structure (Hash map, Heap, Trie, Sliding window).',
          'Explain why the chosen data structure optimizes the hot path.'
        ],
        starterPhrase: 'While a brute-force approach would take O(N^2), we can optimize this to O(N log N) using...'
      },
      {
        name: 'Core Logic & Implementation',
        tag: 'C',
        percentage: '35%',
        idealSeconds: '~50s',
        goal: 'Walk step-by-step through the algorithmic pipeline or design components.',
        keyPoints: [
          'Describe variable state and invariant checks.',
          'Keep modular separation of concerns.',
          'Highlight synchronization or thread-safety if relevant.'
        ],
        starterPhrase: 'The core algorithm operates in three phases: First, we initialize...'
      },
      {
        name: 'Test & Verification',
        tag: 'T',
        percentage: '10%',
        idealSeconds: '~20s',
        goal: 'Trace a quick sample input and state how you would monitor it in production.',
        keyPoints: [
          'Walk through happy path with small sample input.',
          'Walk through one edge case to verify correctness.',
          'State the final Big-O Time & Space summary.'
        ],
        starterPhrase: 'Testing this with an input like [example], the pointer moves to... verifying our O(N) complexity.'
      }
    ],
    dos: [
      'Always state Time and Space Complexity (Big-O) explicitly.',
      'Explain the trade-offs: "I chose in-memory caching here to prioritize read latency over memory footprint".',
      'Speak while you structure your logic so the interviewer follows your thought process.'
    ],
    donts: [
      'Do not jump into implementation without discussing edge cases and complexity first.',
      'Do not ignore memory consumption or assuming infinite resources.',
      'Do not pretend to know everything—if unsure of an edge case, state your hypothesis and how you would test it.'
    ],
    outlineTemplate: `[Clarifying Constraints]: Inputs: [Type/Volume], Expected Outputs: [Format], Scale/Latency: [Targets].
[Edge Cases]:
- Empty/null inputs
- Concurrent mutations / Race conditions
- Scale boundaries (>100k records)
[Optimal Approach]:
- Naive: O(N^2) time, O(1) space
- Optimal: O(N) time using [Data Structure / Cache]
[Implementation Blueprint]:
1. Initialize [State / Schema]
2. Process in single pass by...
3. Handle failure modes by...
[Complexity & Trade-offs]: Time Complexity: O(...), Space Complexity: O(...). Chosen because...`
  },
  systemDesign: {
    categoryTitle: 'System Design & Architecture',
    frameworkName: '4-Stage Scalability Blueprint',
    frameworkAcronym: 'Scope · High-Level · Deep-Dive · Resiliency',
    summary: 'Demonstrate end-to-end distributed system intuition. Start broad, then deep-dive into the critical bottlenecks.',
    targetDuration: '150 – 210 seconds',
    steps: [
      {
        name: '1. Scoping & Capacity Estimation',
        tag: '1',
        percentage: '15%',
        idealSeconds: '~25s',
        goal: 'Lock in functional & non-functional requirements and back-of-the-envelope numbers.',
        keyPoints: [
          'Read-heavy vs Write-heavy ratio (e.g., 100:1 read vs write).',
          'Peak QPS, storage growth per year, latency targets (p99 < 50ms).',
          'Availability vs Consistency trade-offs (CAP theorem).'
        ],
        starterPhrase: 'Let us scope the system: For functional requirements, users must be able to... On non-functional, we need 99.99% availability and...'
      },
      {
        name: '2. High-Level Architecture Flow',
        tag: '2',
        percentage: '30%',
        idealSeconds: '~45s',
        goal: 'Lay out the macro data flow from client down to durable storage.',
        keyPoints: [
          'DNS / CDN -> Load Balancers -> API Gateways.',
          'Stateless microservices / worker tier.',
          'Database choice: Relational (PostgreSQL) vs NoSQL (Cassandra/DynamoDB) justification.',
          'Caching layer (Redis/Memcached) and Message Bus (Kafka/RabbitMQ).'
        ],
        starterPhrase: 'At a high level, requests hit our Anycast CDN and Load Balancer, routing to stateless application nodes...'
      },
      {
        name: '3. Deep Dive into Core Bottleneck',
        tag: '3',
        percentage: '35%',
        idealSeconds: '~60s',
        goal: 'Examine data schema, indexing, partitioning, and concurrency controls.',
        keyPoints: [
          'Partitioning key / sharding strategy (consistent hashing).',
          'Database indexing strategy and hot-spot mitigation.',
          'Cache invalidation policy (Write-through vs Cache-aside, TTLs).'
        ],
        starterPhrase: 'Now zooming into our database sharding strategy: To avoid hot partitions on celebrity users, we can...'
      },
      {
        name: '4. Resiliency & Failure Modes',
        tag: '4',
        percentage: '20%',
        idealSeconds: '~30s',
        goal: 'Prove production maturity by showing how the system survives outages and spikes.',
        keyPoints: [
          'Circuit breakers, rate limiting, and exponential backoff with jitter.',
          'Data replication (Active-Passive vs Multi-Region Active-Active).',
          'Dead-letter queues and monitoring telemetry (metrics, traces).'
        ],
        starterPhrase: 'To handle downstream outages, we implement circuit breakers and fallback queues, along with...'
      }
    ],
    dos: [
      'Justify EVERY technology choice with specific trade-offs (e.g. why Redis over local memory, why Kafka over HTTP).',
      'Address the single point of failure (SPOF) before the interviewer points it out.',
      'Show empathy for operational costs and database maintenance.'
    ],
    donts: [
      'Do not throw buzzwords (Kubernetes, Kafka, GraphQL) without knowing why you need them.',
      'Do not assume databases have infinite IOPS or that network partitions never happen.',
      'Do not ignore security, auth tokens, and data encryption at rest/transit.'
    ],
    outlineTemplate: `[Scope & Scale]:
- Functional: [Key user actions]
- Scale: [QPS, Storage per year, p99 Latency < 100ms]
- Trade-off: High Availability over Strict Consistency (AP in CAP)
[High-Level Architecture]:
- CDN / Global Load Balancer
- Stateless App Services
- Distributed Cache (Redis) for hot reads
- Primary-Replica Database for persistence
- Asynchronous Event Queue (Kafka)
[Deep Dive: Data & Sharding]:
- Partition Key: [Field] using Consistent Hashing
- Cache Strategy: Cache-aside with 1-hour jittered TTL
[Resilience & Failure Modes]:
- Rate limiting at API Gateway (Token bucket)
- Circuit breakers to protect downstream databases
- Dead Letter Queue (DLQ) for failed message retries`
  },
  conflictAndLeadership: {
    categoryTitle: 'Conflict Resolution & Collaboration',
    frameworkName: 'CARE Framework (Context, Action, Resolution, Empathy)',
    frameworkAcronym: 'C · A · R · E',
    summary: 'Never villainize colleagues or product partners. Focus on objective customer data, trade-off alignment, and long-term trust.',
    targetDuration: '90 – 140 seconds',
    steps: [
      {
        name: 'Context & Divergent Perspectives',
        tag: 'C',
        percentage: '20%',
        idealSeconds: '~25s',
        goal: 'Frame both sides with intellectual honesty and legitimate business rationale.',
        keyPoints: [
          'Explain why the other party had a valid perspective (e.g. speed vs quality).',
          'Avoid portraying the colleague as stubborn or unreasonable.',
          'Identify what the core disagreement hinged on (data, priority, or risk).'
        ],
        starterPhrase: 'In this instance, our Product Manager advocated for launching quickly to test PMF, while engineering was concerned about...'
      },
      {
        name: 'De-escalation & Objective Alignment',
        tag: 'A',
        percentage: '40%',
        idealSeconds: '~45s',
        goal: 'Explain how you moved the conversation from emotional debate to objective criteria.',
        keyPoints: [
          'Set up a shared evaluation rubric rooted in customer outcome.',
          'Gathered empirical telemetry or ran a fast prototype to test assumptions.',
          'Listened actively to understand their underlying constraint (e.g. executive deadline).'
        ],
        starterPhrase: 'To de-escalate, I scheduled a 1:1 where I first listened to their timeline pressures, then suggested we evaluate based on...'
      },
      {
        name: 'Constructive Resolution',
        tag: 'R',
        percentage: '25%',
        idealSeconds: '~30s',
        goal: 'Describe the pragmatic compromise or "Disagree & Commit" execution.',
        keyPoints: [
          'Show phased delivery (e.g. scoped MVP behind feature flag, fast follow).',
          'Demonstrate how both parties felt respected and heard.',
          'Show that the business objective was safely achieved.'
        ],
        starterPhrase: 'We agreed on a phased compromise: We launched a guarded beta to 5% of users with telemetry, allowing us to...'
      },
      {
        name: 'Enduring Relationship & Learning',
        tag: 'E',
        percentage: '15%',
        idealSeconds: '~20s',
        goal: 'Prove that the working relationship was strengthened, not damaged.',
        keyPoints: [
          'Highlight future successful collaborations with this person.',
          'Share what you learned about communicating with non-technical stakeholders.'
        ],
        starterPhrase: 'Following this launch, our collaborative trust deepened significantly, leading us to co-author...'
      }
    ],
    dos: [
      'Show genuine empathy for non-technical or cross-functional partners.',
      'Rely on data, prototypes, and user research to break deadlocks.',
      'Demonstrate the ability to "disagree and commit" gracefully when needed.'
    ],
    donts: [
      'Never insult a former colleague, manager, or client.',
      'Do not claim you were 100% right and everyone else was wrong.',
      'Do not say "I escalated to my manager immediately" as your first move.'
    ],
    outlineTemplate: `[Context]: Disagreement between [My Perspective] and [Partner Perspective]. Both had valid merits: [Why their view made sense].
[Alignment Action]:
1. Shifted discussion from opinion to customer metrics: [Shared Metric].
2. Ran a fast test / analyzed real data to uncover [Insight].
[Resolution]:
- Chose a phased rollout: [Compromise / Phased Plan].
- Both aligned on success criteria: [Threshold].
[Long-Term Relationship]: Strengthened cross-functional trust, leading to [Future Positive Outcome].`
  }
};

export const ProTipDrawer: React.FC<ProTipDrawerProps> = ({
  isOpen,
  onClose,
  question,
  onInsertTemplate
}) => {
  const [copiedTemplate, setCopiedTemplate] = useState(false);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Determine active guide based on question category and text
  const cat = (question.category || '').toLowerCase();
  const qText = (question.question || '').toLowerCase();

  let activeGuide: CategoryTipGuide = CATEGORY_GUIDES.behavioral;

  if (
    cat.includes('system') ||
    cat.includes('architecture') ||
    qText.includes('design a') ||
    qText.includes('architecture') ||
    qText.includes('distributed')
  ) {
    activeGuide = CATEGORY_GUIDES.systemDesign;
  } else if (
    cat.includes('conflict') ||
    cat.includes('collaboration') ||
    cat.includes('influence') ||
    cat.includes('ethics') ||
    cat.includes('stakeholder') ||
    qText.includes('disagreement') ||
    qText.includes('conflict') ||
    qText.includes('stakeholder')
  ) {
    activeGuide = CATEGORY_GUIDES.conflictAndLeadership;
  } else if (
    cat.includes('tech') ||
    cat.includes('problem') ||
    cat.includes('algorithm') ||
    cat.includes('coding') ||
    cat.includes('data structure') ||
    qText.includes('how would you implement') ||
    qText.includes('algorithm')
  ) {
    activeGuide = CATEGORY_GUIDES.technical;
  } else {
    activeGuide = CATEGORY_GUIDES.behavioral;
  }

  const handleCopyTemplate = () => {
    navigator.clipboard.writeText(activeGuide.outlineTemplate);
    setCopiedTemplate(true);
    setTimeout(() => setCopiedTemplate(false), 2000);
  };

  const handleApplyTemplate = () => {
    if (onInsertTemplate) {
      onInsertTemplate(activeGuide.outlineTemplate);
      onClose();
    } else {
      handleCopyTemplate();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <aside
          id="pro-tip-slide-drawer"
          role="dialog"
          aria-label="Pro-Tip Answer Structuring Drawer"
          className="w-screen max-w-md sm:max-w-lg bg-white shadow-2xl border-l border-zinc-200 flex flex-col transform transition-transform duration-300 ease-out animate-in slide-in-from-right"
        >
          {/* Drawer Header */}
          <div className="p-5 border-b border-zinc-200 bg-zinc-50/80 flex items-center justify-between shrink-0">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shadow-xs">
                <Lightbulb className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-sm font-bold text-zinc-900">
                    Pro-Tip: Answer Structuring
                  </h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                    Real-time
                  </span>
                </div>
                <p className="text-xs text-zinc-500">
                  Calibrated for {question.category || activeGuide.categoryTitle}
                </p>
              </div>
            </div>

            <button
              type="button"
              id="close-protip-drawer-btn"
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-200/60 rounded-lg transition-colors cursor-pointer"
              title="Close drawer (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Question Category Banner */}
          <div className="px-5 py-3 bg-zinc-900 text-white flex items-center justify-between shrink-0 text-xs">
            <div className="flex items-center space-x-2">
              <Compass className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-semibold">{activeGuide.frameworkName}</span>
            </div>
            <div className="flex items-center space-x-1.5 font-mono text-[11px] text-zinc-300">
              <Clock className="w-3 h-3 text-zinc-400" />
              <span>{activeGuide.targetDuration}</span>
            </div>
          </div>

          {/* Drawer Scrollable Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            {/* Quick Context Summary */}
            <div className="p-3.5 rounded-xl border border-amber-200/70 bg-amber-50/50 text-xs text-amber-900 space-y-1.5">
              <div className="flex items-center space-x-1.5 font-semibold text-amber-950">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Executive Recruiter Advice</span>
              </div>
              <p className="leading-relaxed text-zinc-700">
                {activeGuide.summary}
              </p>
            </div>

            {/* Template Insert Quick Action */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                id="insert-outline-template-btn"
                onClick={handleApplyTemplate}
                className="flex-1 px-3.5 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-lg text-xs font-semibold flex items-center justify-center space-x-2 shadow-xs transition-all cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-amber-400" />
                <span>Insert Starter Outline in Answer</span>
              </button>
              <button
                type="button"
                onClick={handleCopyTemplate}
                className="p-2.5 border border-zinc-200 hover:border-zinc-300 bg-white rounded-lg text-zinc-600 hover:text-zinc-900 text-xs transition-colors cursor-pointer"
                title="Copy outline to clipboard"
              >
                {copiedTemplate ? (
                  <Check className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Step-by-Step Architecture */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-700">
                  Recommended Phase Breakdown
                </h4>
                <span className="text-[11px] font-mono text-zinc-400">
                  {activeGuide.frameworkAcronym}
                </span>
              </div>

              <div className="space-y-3">
                {activeGuide.steps.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl border border-zinc-200 bg-white hover:border-zinc-300 transition-colors shadow-2xs space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="w-5 h-5 rounded-full bg-zinc-900 text-white font-mono text-[11px] font-bold flex items-center justify-center">
                          {step.tag}
                        </span>
                        <span className="text-xs font-bold text-zinc-900">
                          {step.name}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 text-[11px]">
                        <span className="font-semibold text-zinc-600 bg-zinc-100 px-1.5 py-0.5 rounded-xs">
                          {step.percentage}
                        </span>
                        <span className="font-mono text-zinc-400">
                          {step.idealSeconds}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-zinc-600 leading-snug">
                      {step.goal}
                    </p>

                    {/* Bullet checkpoints */}
                    <div className="pt-1 space-y-1">
                      {step.keyPoints.map((kp, kIdx) => (
                        <div
                          key={kIdx}
                          className="flex items-start space-x-1.5 text-[11px] text-zinc-600"
                        >
                          <ArrowRight className="w-3 h-3 text-amber-500 shrink-0 mt-0.5" />
                          <span>{kp}</span>
                        </div>
                      ))}
                    </div>

                    {/* Starter phrase */}
                    <div className="pt-1.5 border-t border-zinc-100">
                      <span className="text-[10px] font-semibold text-zinc-400 block uppercase tracking-wider">
                        Natural Lead-In Phrase:
                      </span>
                      <p className="text-[11px] text-zinc-700 italic font-serif">
                        &ldquo;{step.starterPhrase}&rdquo;
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Current Question Specific Context */}
            {question.hintOrFocusPoints && question.hintOrFocusPoints.length > 0 && (
              <div className="p-4 rounded-xl border border-zinc-200 bg-zinc-50 space-y-2">
                <div className="flex items-center space-x-2">
                  <Target className="w-4 h-4 text-zinc-700" />
                  <span className="text-xs font-bold text-zinc-900">
                    What Interviewers Listen For Here:
                  </span>
                </div>
                <p className="text-xs text-zinc-600">
                  {question.whyItMatters}
                </p>
                <ul className="pt-1 space-y-1">
                  {question.hintOrFocusPoints.map((pt, i) => (
                    <li key={i} className="flex items-start space-x-1.5 text-xs text-zinc-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 mt-1.5 shrink-0" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Do's and Don'ts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {/* DOs */}
              <div className="p-3.5 rounded-xl border border-emerald-200 bg-emerald-50/40 space-y-2">
                <div className="flex items-center space-x-1.5 text-emerald-800 text-xs font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Always DO</span>
                </div>
                <ul className="space-y-1.5 text-[11px] text-emerald-950">
                  {activeGuide.dos.map((d, i) => (
                    <li key={i} className="flex items-start space-x-1">
                      <span className="text-emerald-600 font-bold">•</span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* DONTs */}
              <div className="p-3.5 rounded-xl border border-rose-200 bg-rose-50/40 space-y-2">
                <div className="flex items-center space-x-1.5 text-rose-800 text-xs font-bold">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                  <span>Avoid These Pitfalls</span>
                </div>
                <ul className="space-y-1.5 text-[11px] text-rose-950">
                  {activeGuide.donts.map((d, i) => (
                    <li key={i} className="flex items-start space-x-1">
                      <span className="text-rose-600 font-bold">•</span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Drawer Footer */}
          <div className="p-4 border-t border-zinc-200 bg-zinc-50 flex items-center justify-between shrink-0 text-xs text-zinc-500">
            <span className="flex items-center space-x-1">
              <BookOpen className="w-3.5 h-3.5 text-zinc-400" />
              <span>Competency: {question.competencyFocus}</span>
            </span>
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 bg-white border border-zinc-200 hover:bg-zinc-100 text-zinc-700 font-medium rounded-md shadow-2xs transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};
