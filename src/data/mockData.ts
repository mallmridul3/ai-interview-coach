import { InterviewerPersona, QuickDrillQuestion } from '../types';

export const INTERVIEWER_PERSONAS: InterviewerPersona[] = [
  {
    id: 'alex-mentor',
    name: 'Alex Vance',
    role: 'Staff Lead & Hiring Manager',
    companyTag: 'Tech Lead / Collaborative',
    avatarSeed: 'alex',
    styleDescription: 'Warm, collaborative, and constructive. Seeks candidate potential and asks encouraging clarifying questions.',
    tonePrompt: 'Be supportive, constructive, yet perceptive. Praise genuine technical or leadership accomplishments and gently push for concrete metrics.',
  },
  {
    id: 'morgan-bar-raiser',
    name: 'Morgan Chen',
    role: 'Principal Bar Raiser',
    companyTag: 'Ex-FAANG Bar Raiser',
    avatarSeed: 'morgan',
    styleDescription: 'Sharp, analytical, and rigorous. Tests edge cases, trade-offs, ownership, and STAR depth without fluff.',
    tonePrompt: 'Be razor-sharp, analytical, and exacting. Focus on whether the candidate truly owned the solution, made hard trade-offs, and produced verifiable impact.',
  },
  {
    id: 'taylor-exec',
    name: 'Taylor Rivera',
    role: 'VP of Product & Strategy',
    companyTag: 'Executive Leadership',
    avatarSeed: 'taylor',
    styleDescription: 'Visionary and business-driven. Focuses on cross-functional alignment, communication clarity, and business outcomes.',
    tonePrompt: 'Focus on strategic alignment, high-level business impact, stakeholder navigation, and crisp executive communication.',
  },
];

export const PRESET_ROLES = [
  {
    title: 'Senior Software Engineer',
    track: 'Behavioral & Leadership' as const,
    level: 'Senior' as const,
    company: 'Stripe / Tech Unicorn',
    description: 'Lead architecture of scalable payments microservices, mentor junior engineers, drive technical consensus across teams.',
  },
  {
    title: 'Product Manager (L5)',
    track: 'Product Sense & Strategy' as const,
    level: 'Mid-level' as const,
    company: 'Google',
    description: 'Define product vision, run customer discovery, collaborate with engineering and design, analyze product adoption metrics.',
  },
  {
    title: 'Engineering Manager',
    track: 'Behavioral & Leadership' as const,
    level: 'Engineering / Product Manager' as const,
    company: 'Airbnb',
    description: 'Grow and mentor a team of 8+ engineers, manage performance, set quarterly roadmaps, foster psychological safety and high delivery standards.',
  },
  {
    title: 'Full Stack Developer',
    track: 'Technical & Problem Solving' as const,
    level: 'Mid-level' as const,
    company: 'Shopify',
    description: 'Build responsive web apps with React, Node.js/Go, GraphQL, handle performance bottlenecks and client-side state management.',
  },
  {
    title: 'Staff Data Scientist / AI Engineer',
    track: 'System Design & Architecture' as const,
    level: 'Staff / Principal' as const,
    company: 'Anthropic / OpenAI Ecosystem',
    description: 'Deploy production LLM pipelines, evaluate hallucination mitigations, optimize inference latency, and advise C-suite on AI governance.',
  },
];

export const QUICK_DRILL_QUESTIONS: QuickDrillQuestion[] = [
  {
    id: 'drill-1',
    question: 'Tell me about a time you had a strong disagreement with a technical decision or product direction. How did you resolve it?',
    category: 'Conflict Resolution',
    difficulty: 'Medium',
    idealTimeSeconds: 150,
    frameworkTips: [
      'Focus on objective data over personal ego.',
      'Show that you listened to their perspective before advocating yours.',
      'Highlight how the final decision was aligned with team/company goals.',
      'Mention how you maintained a healthy working relationship post-decision.'
    ]
  },
  {
    id: 'drill-2',
    question: 'Describe the most catastrophic production incident or project failure you were involved with. What was your role and what did you learn?',
    category: 'Failure & Resilience',
    difficulty: 'Challenging',
    idealTimeSeconds: 160,
    frameworkTips: [
      'Take genuine accountability; do not blame colleagues or vendors.',
      'Walk through the triage, remediation, and root-cause post-mortem.',
      'Emphasize the permanent safeguards or architectural changes you introduced.'
    ]
  },
  {
    id: 'drill-3',
    question: 'Why are you looking to leave your current role, and what specifically attracts you to our company and mission?',
    category: 'Motivation & Culture',
    difficulty: 'Easy',
    idealTimeSeconds: 120,
    frameworkTips: [
      'Frame departure positively (seeking new growth vs. complaining about current job).',
      'Name 2 specific aspects of the target company (tech stack, culture, product challenge).',
      'Tie your unique skillset directly to their near-term goals.'
    ]
  },
  {
    id: 'drill-4',
    question: 'How do you prioritize your work when handed three conflicting high-priority deadlines by different executive stakeholders?',
    category: 'Prioritization & Ambiguity',
    difficulty: 'Medium',
    idealTimeSeconds: 140,
    frameworkTips: [
      'Establish criteria: business impact, urgency, and dependencies.',
      'Communicate proactively with transparent trade-offs before missing any deadline.',
      'Propose phased deliverables (MVP now, enhancement next) to satisfy all parties.'
    ]
  },
  {
    id: 'drill-5',
    question: 'Tell me about an initiative you drove from ambiguity to measurable impact without direct authority.',
    category: 'Influence Without Authority',
    difficulty: 'Challenging',
    idealTimeSeconds: 180,
    frameworkTips: [
      'Clarify how you rallied cross-functional partners through shared value.',
      'Highlight concrete metrics (e.g., +30% throughput, $400k annual cloud savings).',
      'Explain how you handled skeptics.'
    ]
  },
  {
    id: 'drill-6',
    question: 'A critical stakeholder demands a major feature launch in 48 hours that you know has substantial security vulnerabilities. What do you do?',
    category: 'Ethics & Risk Management',
    difficulty: 'Curveball',
    idealTimeSeconds: 130,
    frameworkTips: [
      'Never silently push unsafe code or stonewall without options.',
      'Quantify the specific exploit vectors and business risk (reputation, legal).',
      'Offer a gated alternative: dark launch with limited test accounts, or feature flagging behind strict allowlists.'
    ]
  }
];
