import { CompanyHiringPipeline } from '../types';

export const COMPANY_SPECIFIC_ROLES: Record<string, string[]> = {
  Amazon: [
    'Software Development Engineer I (SDE I)',
    'Software Development Engineer II (SDE II)',
    'Senior SDE (SDE III / L6)',
    'Principal Engineer (L7)',
    'Software Development Manager (SDM / EM)',
    'Technical Program Manager (TPM)',
    'Product Manager - Technical (PMT)',
    'Applied Scientist (AWS & GenAI)',
    'Solutions Architect (AWS Enterprise)',
  ],
  Google: [
    'Software Engineer (L3 - Early Career)',
    'Software Engineer (L4 - Mid-Level)',
    'Senior Software Engineer (L5)',
    'Staff Software Engineer (L6)',
    'Engineering Manager (L6/L7)',
    'Product Manager (APM / L4 / L5)',
    'Site Reliability Engineer (SRE)',
    'Research Scientist (Google DeepMind)',
    'Developer Relations Engineer',
  ],
  Meta: [
    'Software Engineer (E3 - Entry)',
    'Software Engineer (E4 - Mid-Level)',
    'Senior Software Engineer (E5)',
    'Staff Software Engineer (E6)',
    'Production Engineer (Systems & Infrastructure)',
    'Engineering Manager (M1/M2)',
    'Product Manager (Rotational / L5)',
    'AI Research Scientist (FAIR)',
    'Data Engineer (Core Analytics)',
  ],
  Microsoft: [
    'Software Engineer (Level 59-60)',
    'Software Engineer II (Level 61-62)',
    'Senior Software Engineer (Level 63-64)',
    'Principal Software Engineer (Level 65+)',
    'Product Manager (Level 61-64)',
    'Cloud Solution Architect (Azure)',
    'AI / Copilot Applied Scientist',
    'Partner Software Architect',
  ],
  Apple: [
    'ICT2 / ICT3 Software Engineer',
    'ICT4 Senior Software Engineer',
    'ICT5 Staff / Lead Software Engineer',
    'Engineering Project Manager (EPM)',
    'iOS & macOS Core Frameworks Engineer',
    'Machine Learning & Siri Core Engineer',
    'Silicon Firmware & Embedded Systems Engineer',
    'Interactive Media & Core OS Engineer',
  ],
  Netflix: [
    'Senior Software Engineer (L5 - Core Bar)',
    'Staff Software Engineer',
    'Engineering Manager (Streaming Platforms)',
    'Distributed Systems & Edge CDN Architect',
    'Data Platform & Analytics Engineer',
    'UI & Edge Experience Engineer',
    'Product Manager (Algorithms & Discovery)',
  ],
  Stripe: [
    'Software Engineer (L1 / L2)',
    'Software Engineer (L3 - Senior)',
    'Staff Software Engineer (L4)',
    'Infrastructure & Core Ledger Architect',
    'Engineering Manager (Payments Infrastructure)',
    'Product Manager (Billing, Connect & Banking)',
    'Security & Risk Intelligence Engineer',
    'Developer Platform & API Engineer',
  ],
  Uber: [
    'Software Engineer I / II',
    'Senior Software Engineer (5A / 5B)',
    'Staff Software Engineer (Level 6)',
    'Marketplace & Dispatch Algorithms Engineer',
    'Autonomous Mobility & Maps Engineer',
    'Engineering Manager (Driver & Rider Tech)',
    'Product Manager (Pricing & Marketplace)',
  ],
  Nvidia: [
    'CUDA Systems Software Engineer',
    'Deep Learning Frameworks Engineer',
    'GPU Architecture & Performance Engineer',
    'AI Infrastructure & Megatron-LM Scaling Engineer',
    'Senior Linux Kernel & Driver Developer',
    'Autonomous Vehicles (DRIVE OS) Engineer',
    'TensorRT & LLM Inference Optimization Engineer',
  ],
  Airbnb: [
    'Software Engineer (L3 / L4)',
    'Senior Software Engineer (L5)',
    'Staff Software Engineer (L6)',
    'Trust & Safety Machine Learning Engineer',
    'Search, Ranking & Dynamic Pricing Engineer',
    'Guest & Host Experience Frontend Engineer',
    'Engineering Manager',
  ],
  'Goldman Sachs': [
    'Technology Analyst (Full Stack Development)',
    'Associate (Quantitative Engineering)',
    'Vice President (VP - Core Engineering)',
    'Low-Latency Algorithmic Execution Developer',
    'Risk & Pricing Models Systems Engineer',
    'Financial Data Platform Architect',
  ],
  'JPMorgan Chase': [
    'Software Engineer Program (SEP Analyst)',
    'Associate Software Engineer (Core Banking & Payments)',
    'Vice President (VP - Corporate & Investment Bank Tech)',
    'Quantitative Research / Analytics Engineer',
    'Low-Latency C++ Electronic Trading Developer',
    'Cloud & Microservices Architect (Chase Digital)',
    'Cybersecurity & Fraud Risk Detection Engineer',
    'Product Manager (Consumer & Community Banking)',
  ],
  'Morgan Stanley': [
    'Technology Analyst (Enterprise Engineering)',
    'Senior Manager / Associate (Wealth Management Tech)',
    'Vice President (Institutional Securities Technology)',
    'Algorithmic Trading & Fixed Income Systems Engineer',
    'High-Throughput Java & Distributed Cache Architect',
    'Core Infrastructure & Reliability Engineer',
  ],
  'Bank of America': [
    'Global Technology Analyst (Full Stack Development)',
    'Senior Tech Associate (Merrill Wealth & CashPro)',
    'Vice President (Global Markets Technology)',
    'High-Throughput Payments & Ledger Architect',
    'Risk & Regulatory Reporting Systems Engineer',
    'Enterprise Cloud & Data Platform Developer',
  ],
  Barclays: [
    'Technology Developer (Barclays Investment Bank)',
    'Associate (Corporate & Sustainable Banking Tech)',
    'Vice President (Markets & Execution Technology)',
    'Low-Latency Java / C++ Settlement Developer',
    'Digital Banking & Payments Microservices Engineer',
    'Risk, Compliance & Fraud Architecture Engineer',
  ],
  'Capital One': [
    'Associate Software Engineer (TDP Program)',
    'Senior Software Engineer (Cloud Card & Payments)',
    'Lead Software Engineer (Real-Time Fraud Detection)',
    'Principal Distributed Systems Architect',
    'Director of Software Engineering',
    'Machine Learning & Credit Modeling Engineer',
    'Product Manager (Financial Products)',
  ],
  Citigroup: [
    'Technology Analyst (Citi Treasury & Trade Solutions)',
    'Assistant Vice President (AVP - Institutional Clients Group)',
    'Vice President (VP - Markets Quantitative Engineering)',
    'Global Payments & Real-Time Settlement Architect',
    'Risk Analytics & Regulatory Data Engineer',
  ],
  Salesforce: [
    'Member of Technical Staff (MTS)',
    'Senior Member of Technical Staff (SMTS)',
    'Lead / Principal MTS',
    'Enterprise Cloud Platform Architect',
    'Product Manager (Agentforce & AI)',
    'Engineering Manager (Data Cloud)',
  ],
  Palantir: [
    'Forward Deployed Software Engineer (FDSE)',
    'Software Engineer (Core Foundry / Gotham)',
    'Deployment Strategist / Technical Lead',
    'Data Platform & Graph Systems Engineer',
    'Infrastructure & Security Operations Engineer',
  ],
  Tesla: [
    'Autopilot & Computer Vision Software Engineer',
    'Embedded Firmware & Low-Level Systems Engineer',
    'Vehicle Software Architecture Engineer',
    'Energy Platforms & Megapack Systems Engineer',
    'Staff Distributed Systems Engineer',
  ],
};

export const PRESET_COMPANY_PIPELINES: CompanyHiringPipeline[] = [
  {
    companyName: 'Amazon',
    normalizedName: 'amazon',
    tagline: 'Pioneer of the 16 Leadership Principles & Bar Raiser Hiring Standard',
    industry: 'Cloud Computing, E-Commerce, Logistics & AI',
    overview: 'Amazon uses a structured, standardized loop model. Every candidate is evaluated on both technical rigor and the 16 Leadership Principles (LPs). In each interview round, 2 specific LPs are probed deeply using STAR methodology. The final loop always includes a dedicated "Bar Raiser" who has absolute veto power to prevent lowering the hiring bar.',
    totalStages: 5,
    cultureHighlights: [
      'Customer Obsession (Always start with the customer and work backwards)',
      'Ownership (Leaders never say "that\'s not my job")',
      'Bias for Action (Speed matters in business; many decisions are two-way doors)',
      'Have Backbone; Disagree and Commit (Respectfully challenge decisions, but commit fully once decided)',
      'Dive Deep (Stay connected to the details, audit frequently)',
      'Deliver Results (Focus on key inputs and deliver with quality despite setbacks)'
    ],
    evaluationPhilosophy: 'Candidates are evaluated on whether they raise the average performance of the current team ("Raise the Bar"). A strong technical candidate who fails Leadership Principles will be rejected.',
    typicalTimeline: '3 to 6 weeks from Online Assessment to final Loop debrief',
    popularRoles: COMPANY_SPECIFIC_ROLES['Amazon'],
    stages: [
      {
        id: 'amz-s1',
        stageNumber: 1,
        name: 'Stage 1: Online Assessment (OA1 & OA2)',
        levelType: 'Online Assessment',
        format: 'Timed Automated Platform (Hackerrank / Mettl)',
        durationMinutes: 90,
        interviewerProfile: 'Automated Evaluation System',
        coreCompetencies: ['Data Structures & Algorithms', 'Work Style Simulation', 'Amazon LP Alignment'],
        description: 'Two coding questions (Data Structures & Algorithms) followed by an interactive Work Style Simulation assessing your natural workplace instincts against Amazon Leadership Principles.',
        typicalQuestions: [
          'Given a stream of delivery package weights and vehicle capacities, determine optimal vehicle routing to minimize fuel cost.',
          'Work Simulation: Your team is behind deadline on a Prime Day service release. An engineer proposes skipping integration tests. How do you respond?'
        ],
        tipsForSuccess: [
          'Prioritize passing all edge test cases and time complexity requirements.',
          'In the work style simulation, always favor Customer Obsession and long-term Ownership over quick shortcuts.'
        ],
        recommendedPersonaId: 'morgan-chen',
        recommendedTrack: 'Technical & Problem Solving',
      },
      {
        id: 'amz-s2',
        stageNumber: 2,
        name: 'Stage 2: Technical Phone Screen',
        levelType: 'Phone Screen',
        format: '60-Minute 1-on-1 via Amazon Chime & Live Code Editor',
        durationMinutes: 60,
        interviewerProfile: 'Amazon SDE II or Senior SDE from Target Org',
        coreCompetencies: ['Coding & Algorithmic Optimization', 'Customer Obsession', 'Ownership'],
        description: 'Begins with 15-20 minutes of behavioral questions mapped to 2 Leadership Principles, followed by 30-35 minutes of live coding in a collaborative editor.',
        typicalQuestions: [
          'Tell me about a time you had to make a critical engineering trade-off to meet an aggressive customer deadline.',
          'Implement a Least Recently Used (LRU) Cache with O(1) get and put operations, including thread-safety considerations.'
        ],
        tipsForSuccess: [
          'Structure your behavioral answer with the STAR framework (Situation, Task, Action, Result) in under 3 minutes.',
          'State your time and space complexity explicitly before writing code.'
        ],
        recommendedPersonaId: 'alex-mentor',
        recommendedTrack: 'Technical & Behavioral Mix',
      },
      {
        id: 'amz-s3',
        stageNumber: 3,
        name: 'Stage 3: The Virtual Loop — Problem Solving & Coding',
        levelType: 'Technical Round',
        format: '60-Minute 1-on-1 Live Technical Session',
        durationMinutes: 60,
        interviewerProfile: 'Senior Engineer from Peer Team',
        coreCompetencies: ['Data Structures', 'Algorithmic Optimization', 'Deliver Results', 'Bias for Action'],
        description: 'High-intensity coding round focusing on modular, maintainable, production-ready code. Emphasizes clean object-oriented design and boundary condition testing.',
        typicalQuestions: [
          'Describe a situation where you had to push through ambiguity without complete specifications to deliver an impactful outcome.',
          'Design an algorithm to find the top K most frequent search queries in a distributed 24-hour log stream.'
        ],
        tipsForSuccess: [
          'Do not write hacky code. Use meaningful variable names, handle null/empty checks, and write test cases aloud.',
          'Demonstrate Bias for Action while recognizing when a decision is a one-way door versus a two-way door.'
        ],
        recommendedPersonaId: 'morgan-chen',
        recommendedTrack: 'Technical & Problem Solving',
      },
      {
        id: 'amz-s4',
        stageNumber: 4,
        name: 'Stage 4: The Virtual Loop — System Architecture & High-Scale Design',
        levelType: 'System Design',
        format: '60-Minute Architecture & Distributed Whiteboarding Session',
        durationMinutes: 60,
        interviewerProfile: 'Principal Engineer or Staff SDE',
        coreCompetencies: ['Distributed Systems Scalability', 'Fault Tolerance', 'Think Big', 'Frugality'],
        description: 'End-to-end design of an Amazon-scale service (e.g., Prime Video streaming, Amazon Locker fulfillment, or DynamoDB caching tier).',
        typicalQuestions: [
          'Tell me about an architectural decision you made that you later realized was flawed. What did you do to remediate it?',
          'Design an Amazon Locker package pickup notification and reservation system capable of handling 50,000 concurrent lockers nationwide.'
        ],
        tipsForSuccess: [
          'Clarify functional vs non-functional constraints (throughput, latency, p99 requirements, availability targets).',
          'Discuss database partitioning, caching, single points of failure, and idempotency for payment and order state.'
        ],
        recommendedPersonaId: 'sarah-vp',
        recommendedTrack: 'System Design & Architecture',
      },
      {
        id: 'amz-s5',
        stageNumber: 5,
        name: 'Stage 5: The Bar Raiser Round (Strict Leadership Principles Audit)',
        levelType: 'Bar Raiser / Executive',
        format: '60-Minute Deep Behavioral & Architectural Probe',
        durationMinutes: 60,
        interviewerProfile: 'Certified Amazon Bar Raiser (Outside Org)',
        coreCompetencies: [
          'Have Backbone; Disagree & Commit',
          'Earn Trust',
          'Insist on the Highest Standards',
          'Deep Dive'
        ],
        description: 'The Bar Raiser is an experienced, objective interviewer from an entirely different organization. They probe deeply into inconsistencies, verify whether you truly drove results ("I" vs "We"), and hold veto power over the final hiring committee decision.',
        typicalQuestions: [
          'Tell me about a time you strongly disagreed with your engineering manager or product lead on an architectural direction. How did you handle it and what was the outcome?',
          'Give an example of a time when a metric you monitored showed everything was fine, but you dug deeper and discovered a hidden customer impact.',
          'Describe a time you failed to meet a commitment. What was the root cause and what specific mechanisms did you introduce to prevent a recurrence?'
        ],
        tipsForSuccess: [
          'Never blame colleagues or management; maintain accountability for your actions and trade-offs.',
          'Speak in terms of direct quantifiable impact (e.g. reduced p99 latency by 32%, saved $450K in AWS EC2 compute).',
          'Expect the Bar Raiser to interrupt with follow-up probes: "Why did you choose that?", "What data did you look at?", "Who disagreed?"'
        ],
        recommendedPersonaId: 'morgan-chen',
        recommendedTrack: 'Behavioral & Leadership',
      },
    ],
  },
  {
    companyName: 'Google',
    normalizedName: 'google',
    tagline: 'General Cognitive Ability, Large-Scale Engineering & Googleyness',
    industry: 'Search, Cloud, AI, Consumer Hardware & Android',
    overview: 'Google assesses candidates across four core pillars: General Cognitive Ability (GCA), Role-Related Knowledge (RRK), Leadership, and Googleyness. Google operates with independent blind hiring committees: your interviewers submit numeric ratings and detailed written transcripts without conferring, and a committee decides whether to extend an offer.',
    totalStages: 5,
    cultureHighlights: [
      'Focus on the user and all else will follow',
      'Googleyness (Thriving in ambiguity, doing the right thing, intellectual humility, constructive collaboration)',
      '10x Thinking (Aiming for order-of-magnitude improvements rather than incremental gains)',
      'Data-driven decision making and open blameless culture'
    ],
    evaluationPhilosophy: 'Google hires for long-term athlete capability rather than specific framework familiarity. Strong computer science fundamentals and algorithmic problem-solving adaptability are prioritized.',
    typicalTimeline: '4 to 8 weeks including Hiring Committee review and team matching',
    popularRoles: COMPANY_SPECIFIC_ROLES['Google'],
    stages: [
      {
        id: 'goog-s1',
        stageNumber: 1,
        name: 'Stage 1: Recruiter Screen & Calibration',
        levelType: 'Phone Screen',
        format: '30-Minute Video / Phone Call',
        durationMinutes: 30,
        interviewerProfile: 'Google Technical Recruiter',
        coreCompetencies: ['Background Alignment', 'Google Candidate Trajectory', 'Technical Breadth'],
        description: 'Discussion of past engineering scale, domain interests, and confirmation of algorithmic and system design interview readiness.',
        typicalQuestions: [
          'Walk me through the most technically complex distributed system or algorithm you designed in the last 2 years.',
          'What engineering challenges at Google scale interest you most?'
        ],
        tipsForSuccess: [
          'Be concise and clear regarding past scope, team size, and individual contributions.',
          'Clarify target level expectations (L4, L5 Senior, L6 Staff).'
        ],
        recommendedPersonaId: 'alex-mentor',
        recommendedTrack: 'Behavioral & Leadership',
      },
      {
        id: 'goog-s2',
        stageNumber: 2,
        name: 'Stage 2: Technical Phone Screen',
        levelType: 'Technical Round',
        format: '45-Minute Live Coding via Google Meet & Google Docs / CoderPad',
        durationMinutes: 45,
        interviewerProfile: 'Senior Google Software Engineer',
        coreCompetencies: ['Algorithmic Thinking', 'Time & Space Complexity', 'Clean Syntax'],
        description: 'A 45-minute live algorithmic challenge in a text document without auto-complete or syntax highlighting, simulating raw conceptual fluency.',
        typicalQuestions: [
          'Given a directed acyclic graph representing build dependencies, determine the minimum build order and detect circular dependencies.',
          'Optimize a spatial search tree to query nearby point-of-interest coordinates with millisecond responsiveness.'
        ],
        tipsForSuccess: [
          'Communicate before you code: verbalize edge cases, discuss brute force O(n^2), then optimize to O(n log n) or O(n).',
          'Manually trace your code with test examples line by line before telling the interviewer you are finished.'
        ],
        recommendedPersonaId: 'alex-mentor',
        recommendedTrack: 'Technical & Problem Solving',
      },
      {
        id: 'goog-s3',
        stageNumber: 3,
        name: 'Stage 3: Onsite Coding Round 1 & 2 (Algorithmic Rigor)',
        levelType: 'Technical Round',
        format: 'Two 45-Minute Back-to-Back Coding Sessions',
        durationMinutes: 90,
        interviewerProfile: 'Two Independent Google Engineers',
        coreCompetencies: ['Advanced Algorithms', 'Dynamic Programming / Graphs / Trees', 'Edge Case Robustness'],
        description: 'Rigorous algorithmic problem solving testing how you adapt when problem constraints change midway or when performance bounds tighten.',
        typicalQuestions: [
          'Design an algorithm to find the longest substring containing at most K distinct characters under high throughput.',
          'Given a stream of words, implement an autocomplete prefix tree with ranked frequency updates in real time.'
        ],
        tipsForSuccess: [
          'Explain trade-offs clearly: memory consumption vs computational speed.',
          'Write idiomatic, modular code that handles null pointers, integer overflows, and empty inputs gracefully.'
        ],
        recommendedPersonaId: 'morgan-chen',
        recommendedTrack: 'Technical & Problem Solving',
      },
      {
        id: 'goog-s4',
        stageNumber: 4,
        name: 'Stage 4: System Design & Scalability (L5+)',
        levelType: 'System Design',
        format: '45-Minute Distributed Architecture & Whiteboarding',
        durationMinutes: 45,
        interviewerProfile: 'Google Staff / Principal Engineer',
        coreCompetencies: ['Global Distributed Infrastructure', 'Fault Tolerance', 'Reliability (SRE Principles)'],
        description: 'Architecting large-scale systems serving billions of global queries, focusing on data consistency, load balancing, and failure domains.',
        typicalQuestions: [
          'Design Google Drive backend synchronization service handling file chunking, deduplication, and concurrent edits.',
          'Design a global distributed rate limiter that coordinates across multiple worldwide data centers with sub-10ms overhead.'
        ],
        tipsForSuccess: [
          'Drive the design proactively; do not wait to be spoon-fed requirements.',
          'Calculate back-of-the-envelope numbers (QPS, storage over 5 years, network bandwidth) within the first 5 minutes.'
        ],
        recommendedPersonaId: 'sarah-vp',
        recommendedTrack: 'System Design & Architecture',
      },
      {
        id: 'goog-s5',
        stageNumber: 5,
        name: 'Stage 5: Googleyness & Leadership',
        levelType: 'Behavioral & Culture',
        format: '45-Minute Behavioral Evaluation',
        durationMinutes: 45,
        interviewerProfile: 'Google Manager or Senior Leader',
        coreCompetencies: ['Googleyness', 'Navigating Ambiguity', 'Constructive Disagreement', 'Inclusive Leadership'],
        description: 'Evaluates your intellectual humility, empathy, ability to thrive in ambiguous environments, and ethical decision-making.',
        typicalQuestions: [
          'Tell me about a time you joined a project with ambiguous goals and no clear roadmap. How did you establish direction?',
          'Describe a situation where a teammate made a significant technical mistake that caused an outage. How did you handle the situation constructively?',
          'Share an example of when you had to advocate for an underrepresented perspective or prioritize accessibility in your product.'
        ],
        tipsForSuccess: [
          'Show genuine curiosity and humility; avoid dogmatic or arrogant attitudes.',
          'Highlight collaborative wins where you enabled others to succeed.'
        ],
        recommendedPersonaId: 'alex-mentor',
        recommendedTrack: 'Behavioral & Leadership',
      },
    ],
  },
  {
    companyName: 'Meta',
    normalizedName: 'meta',
    tagline: 'Move Fast, Focus on Long-Term Impact & Build Awesome Things',
    industry: 'Social Technologies, VR/AR, Large AI Models & Infrastructure',
    overview: 'Meta evaluates candidates with rapid-fire coding interviews (Ninja rounds), distributed architecture (Pirate rounds), and cultural alignment (Jedi round). Meta looks for builders who ship quickly, minimize overhead, and demonstrate ruthless prioritization toward user metrics.',
    totalStages: 4,
    cultureHighlights: [
      'Move Fast (Execute quickly, build minimum viable prototypes, learn from production data)',
      'Focus on Long-Term Impact (Prioritize highest-leverage engineering outcomes)',
      'Build Awesome Things (Craft inspiring experiences with engineering rigor)',
      'Live in the Future (Anticipate technological inflection points)',
      'Be Open (Share context openly, reduce organizational silos)'
    ],
    evaluationPhilosophy: 'Speed matters. Meta expects engineers to write working, optimal code for 2 algorithm problems in a 45-minute window with minimal friction.',
    typicalTimeline: '3 to 5 weeks',
    popularRoles: COMPANY_SPECIFIC_ROLES['Meta'],
    stages: [
      {
        id: 'meta-s1',
        stageNumber: 1,
        name: 'Stage 1: Technical Screen (CoderPad)',
        levelType: 'Technical Round',
        format: '45-Minute Live Coding (2 Problems Expected)',
        durationMinutes: 45,
        interviewerProfile: 'Meta Software Engineer',
        coreCompetencies: ['Speed of Execution', 'Data Structures', 'Bug-Free Implementation'],
        description: 'A 45-minute session in CoderPad. Candidates are expected to fully solve and code 2 LeetCode Medium/Hard problems within the time limit.',
        typicalQuestions: [
          'Problem 1: Simplify Path or Subarray Sum Equals K (20 mins).',
          'Problem 2: Lowest Common Ancestor in Binary Tree or Vertical Order Traversal (20 mins).'
        ],
        tipsForSuccess: [
          'Do not spend more than 3-4 minutes brainstorming per problem. Start writing clean, runnable code quickly.',
          'Know Python / C++ / Java standard library data structures inside out.'
        ],
        recommendedPersonaId: 'morgan-chen',
        recommendedTrack: 'Technical & Problem Solving',
      },
      {
        id: 'meta-s2',
        stageNumber: 2,
        name: 'Stage 2: The Onsite Ninja Rounds (Coding 1 & 2)',
        levelType: 'Technical Round',
        format: 'Two 45-Minute Live Algorithmic Rounds',
        durationMinutes: 90,
        interviewerProfile: 'Two Senior Meta Engineers',
        coreCompetencies: ['Algorithmic Efficiency', 'Recursion & Dynamic Programming', 'Code Fluidity'],
        description: 'Deep algorithmic execution under time constraints. Demonstrates how cleanly you structure complex recursion, graph traversals, and dynamic programming state transitions.',
        typicalQuestions: [
          'Given a dictionary of words and a target word, find the shortest transformation sequence with single-letter mutations.',
          'Implement an iterator for a nested list of integers with optimal amortized time complexity.'
        ],
        tipsForSuccess: [
          'Clean modular helpers make your code easy to read and modify.',
          'Check array bounds and pointer mutations deliberately.'
        ],
        recommendedPersonaId: 'morgan-chen',
        recommendedTrack: 'Technical & Problem Solving',
      },
      {
        id: 'meta-s3',
        stageNumber: 3,
        name: 'Stage 3: The Pirate Round (Distributed Systems Design)',
        levelType: 'System Design',
        format: '45-Minute System Architecture Whiteboarding',
        durationMinutes: 45,
        interviewerProfile: 'Meta Staff / Production Engineer',
        coreCompetencies: ['High-Concurrency Architecture', 'Data Sharding & Replication', 'Storage Tiering'],
        description: 'Designing consumer infrastructure serving billions of daily active users (e.g., News Feed, Instagram Stories, WhatsApp live status, or Distributed Counter).',
        typicalQuestions: [
          'Design the Meta News Feed aggregation, ranking, and fan-out service under 500 million active users.',
          'Design Instagram Direct Messaging or WhatsApp real-time delivery and receipt tracking service.'
        ],
        tipsForSuccess: [
          'Distinguish write-heavy vs read-heavy bottlenecks immediately.',
          'Deep dive into fan-out-on-write vs fan-out-on-read trade-offs.'
        ],
        recommendedPersonaId: 'sarah-vp',
        recommendedTrack: 'System Design & Architecture',
      },
      {
        id: 'meta-s4',
        stageNumber: 4,
        name: 'Stage 4: The Jedi Round (Behavioral & Impact)',
        levelType: 'Behavioral & Culture',
        format: '45-Minute Behavioral & Leadership Interview',
        durationMinutes: 45,
        interviewerProfile: 'Meta Engineering Manager',
        coreCompetencies: ['Resolving Conflict', 'Driving Cross-Functional Alignment', 'Move Fast Mindset', 'Resilience'],
        description: 'Focuses on navigating interpersonal conflicts, handling critical production setbacks, and driving projects that moved core business metrics.',
        typicalQuestions: [
          'Tell me about a project where you had to push through significant organizational pushback to ship a feature. How did you build consensus?',
          'Describe a situation where a service you deployed failed in production. What were your immediate containment steps and post-mortem learnings?',
          'How do you decide what NOT to work on when faced with competing priorities?'
        ],
        tipsForSuccess: [
          'Emphasize your individual agency: what did YOU specifically do rather than your team.',
          'Highlight metric-driven results (e.g. improved conversion by 4.2%, reduced latency by 60ms).'
        ],
        recommendedPersonaId: 'alex-mentor',
        recommendedTrack: 'Behavioral & Leadership',
      },
    ],
  },
  {
    companyName: 'Microsoft',
    normalizedName: 'microsoft',
    tagline: 'Growth Mindset, Customer Empathy & Global Enterprise Scale',
    industry: 'Enterprise Cloud, Productivity Software, Windows, Gaming & AI',
    overview: 'Microsoft evaluates candidates through a collaborative, growth-oriented lens. Interviews focus on code modularity, system resilience, and how candidates learn from mistakes. The final interview is typically with the "As-Appropriate" (AA) interviewer (usually a Partner or Director) who holds the decisive vote.',
    totalStages: 4,
    cultureHighlights: [
      'Growth Mindset (Anyone can develop their abilities; learn-it-all beats know-it-all)',
      'Customer Obsession & Empathy (Understand customer needs deeply)',
      'Diversity & Inclusion (Seeking and valuing diverse perspectives)',
      'One Microsoft (Cross-divisional collaboration over siloed protectionism)'
    ],
    evaluationPhilosophy: 'Microsoft values clean code architecture, maintainability, and candidates who communicate transparently when exploring problem spaces.',
    typicalTimeline: '3 to 5 weeks',
    popularRoles: COMPANY_SPECIFIC_ROLES['Microsoft'],
    stages: [
      {
        id: 'msft-s1',
        stageNumber: 1,
        name: 'Stage 1: Codility Assessment & Technical Screen',
        levelType: 'Online Assessment',
        format: '60-Minute Codility Assessment or Phone Screen',
        durationMinutes: 60,
        interviewerProfile: 'Senior Software Engineer',
        coreCompetencies: ['Core Algorithms', 'Clean Code', 'Edge Case Detection'],
        description: 'Online technical challenge testing algorithmic reasoning and bug-free code quality.',
        typicalQuestions: [
          'Implement string parsing and pattern matching with wildcard criteria.',
          'Given an array of resource requests, optimize scheduling to maximize resource utilization.'
        ],
        tipsForSuccess: [
          'Write clean, readable variable names and test thoroughly against null and boundary inputs.'
        ],
        recommendedPersonaId: 'alex-mentor',
        recommendedTrack: 'Technical & Problem Solving',
      },
      {
        id: 'msft-s2',
        stageNumber: 2,
        name: 'Stage 2: Onsite Technical Problem Solving & Coding',
        levelType: 'Technical Round',
        format: '45-Minute Live Technical Session',
        durationMinutes: 45,
        interviewerProfile: 'Microsoft Senior SDE',
        coreCompetencies: ['Object-Oriented Design', 'Data Structures', 'Code Readability'],
        description: 'Focuses on maintainable, extensible code structure and algorithmic problem solving.',
        typicalQuestions: [
          'Design and implement an in-memory file system with directory creation, path traversal, and search.',
          'Serialize and deserialize a n-ary tree with minimal storage overhead.'
        ],
        tipsForSuccess: [
          'Talk through design patterns (factory, observer, strategy) when structuring code.',
          'Welcome interviewer hints as collaborative opportunities to demonstrate a Growth Mindset.'
        ],
        recommendedPersonaId: 'alex-mentor',
        recommendedTrack: 'Technical & Problem Solving',
      },
      {
        id: 'msft-s3',
        stageNumber: 3,
        name: 'Stage 3: Cloud Architecture & System Design',
        levelType: 'System Design',
        format: '45-Minute Azure Scale Architecture',
        durationMinutes: 45,
        interviewerProfile: 'Principal SDE or Azure Architect',
        coreCompetencies: ['Enterprise Scalability', 'High Availability', 'Security & Compliance'],
        description: 'Designing enterprise cloud services with 99.999% SLA requirements, data encryption, and microservices decomposition.',
        typicalQuestions: [
          'Design an Azure-scale distributed telemetry logging service that ingests 50 million events per second.',
          'Design a collaborative real-time document editing service like Microsoft Word Online.'
        ],
        tipsForSuccess: [
          'Address operational concerns: rolling deployments, canary testing, telemetry, and health probes.',
          'Discuss data residency and compliance considerations for global enterprise customers.'
        ],
        recommendedPersonaId: 'sarah-vp',
        recommendedTrack: 'System Design & Architecture',
      },
      {
        id: 'msft-s4',
        stageNumber: 4,
        name: 'Stage 4: The "As-Appropriate" (AA) Partner Round',
        levelType: 'Bar Raiser / Executive',
        format: '45-Minute Strategic Leadership & Behavioral Session',
        durationMinutes: 45,
        interviewerProfile: 'Partner / Director of Engineering',
        coreCompetencies: ['Growth Mindset', 'Executive Presence', 'Strategic Alignment', 'Customer Impact'],
        description: 'The decisive final interview. The Partner evaluates your overall trajectory, how you handle failure, and whether you fit Microsoft long-term vision.',
        typicalQuestions: [
          'Tell me about an instance where you exhibited a Learn-it-all mindset instead of a Know-it-all mindset.',
          'How do you handle delivering bad news to executive stakeholders or customers when a project slips?'
        ],
        tipsForSuccess: [
          'Be candid and reflective about your mistakes and lessons learned.',
          'Ask thoughtful questions about Microsoft product strategy and culture.'
        ],
        recommendedPersonaId: 'sarah-vp',
        recommendedTrack: 'Behavioral & Leadership',
      },
    ],
  },
  {
    companyName: 'Netflix',
    normalizedName: 'netflix',
    tagline: 'Freedom & Responsibility, Context Not Control & The Keeper Test',
    industry: 'Streaming Entertainment, Content Studio & Cloud Microservices',
    overview: 'Netflix is known for its high-performance culture and unique Culture Memo. Netflix hires seasoned, self-directed senior engineers who thrive with high autonomy. Interviews emphasize candid feedback, ownership, and deep system architecture.',
    totalStages: 4,
    cultureHighlights: [
      'Freedom and Responsibility (High autonomy with high accountability)',
      'Context, Not Control (Lead with strategy and context rather than micro-management)',
      'The Keeper Test (Would your manager fight to keep you if you wanted to leave?)',
      'Stunning Colleagues (Only hiring top performers who elevate the standard)',
      'Highly Aligned, Loosely Coupled (Clear shared objectives with independent execution)'
    ],
    evaluationPhilosophy: 'Netflix does not hire junior engineers; they evaluate for mature senior judgement, business context awareness, and independent execution.',
    typicalTimeline: '3 to 5 weeks',
    popularRoles: COMPANY_SPECIFIC_ROLES['Netflix'],
    stages: [
      {
        id: 'nflx-s1',
        stageNumber: 1,
        name: 'Stage 1: Technical & Architectural Phone Screen',
        levelType: 'Phone Screen',
        format: '45-Minute Deep Technical Interview',
        durationMinutes: 45,
        interviewerProfile: 'Senior Netflix Engineer',
        coreCompetencies: ['System Architecture', 'Language Mastery', 'Microservices'],
        description: 'Rigorous exploration of your past technical systems, concurrent programming, and distributed service trade-offs.',
        typicalQuestions: [
          'Walk through the architecture of a high-throughput video encoding or metadata pipeline you maintained.',
          'How do you design for resilience when third-party microservices fail intermittently?'
        ],
        tipsForSuccess: [
          'Show deep end-to-end understanding from client requests down to the operating system and database layers.'
        ],
        recommendedPersonaId: 'alex-mentor',
        recommendedTrack: 'Technical & Problem Solving',
      },
      {
        id: 'nflx-s2',
        stageNumber: 2,
        name: 'Stage 2: Onsite Technical Architecture Gauntlet',
        levelType: 'System Design',
        format: 'Two 45-Minute Distributed Architecture Sessions',
        durationMinutes: 90,
        interviewerProfile: 'Staff / Principal Netflix Engineers',
        coreCompetencies: ['Global Streaming Architecture', 'Chaos Engineering', 'Caching & Edge CDN'],
        description: 'Designing global streaming and recommendations services with chaos testing, zero-downtime deployments, and edge caching.',
        typicalQuestions: [
          'Design Netflix Open Connect CDN content pre-positioning and caching strategy for new global movie launches.',
          'Design real-time playback telemetry and personalized recommendations aggregation under 200M concurrent streams.'
        ],
        tipsForSuccess: [
          'Incorporate Chaos Monkey principles: assume dependencies will fail and design self-healing fallbacks.'
        ],
        recommendedPersonaId: 'sarah-vp',
        recommendedTrack: 'System Design & Architecture',
      },
      {
        id: 'nflx-s3',
        stageNumber: 3,
        name: 'Stage 3: Netflix Culture Memo & The Keeper Test',
        levelType: 'Behavioral & Culture',
        format: '45-Minute Deep Culture Alignment Round',
        durationMinutes: 45,
        interviewerProfile: 'Engineering Director',
        coreCompetencies: ['Freedom & Responsibility', 'Direct Candid Feedback', 'The Keeper Test'],
        description: 'Intense discussion of Netflix Culture Memo principles. Candidates are evaluated on whether they speak candidly and embrace high accountability.',
        typicalQuestions: [
          'Tell me about a time you gave difficult, critical feedback directly to a peer or manager. How was it received and what happened next?',
          'How do you handle a situation where a high-performing colleague is toxic or dismissive to junior teammates?'
        ],
        tipsForSuccess: [
          'Read the Netflix Culture Memo thoroughly. Demonstrate high emotional maturity and self-direction.'
        ],
        recommendedPersonaId: 'sarah-vp',
        recommendedTrack: 'Behavioral & Leadership',
      },
      {
        id: 'nflx-s4',
        stageNumber: 4,
        name: 'Stage 4: Executive Alignment & Compensation Dialogue',
        levelType: 'Bar Raiser / Executive',
        format: '45-Minute VP / HR Partner Session',
        durationMinutes: 45,
        interviewerProfile: 'Vice President of Engineering',
        coreCompetencies: ['Strategic Vision', 'Executive Judgement', 'Total Compensation Alignment'],
        description: 'Final conversation regarding business impact, engineering philosophy, and top-of-market compensation structure.',
        typicalQuestions: [
          'Where do you see the greatest technical risks in streaming and AI entertainment over the next 5 years?',
          'What conditions do you need to do the best work of your career?'
        ],
        tipsForSuccess: [
          'Articulate crisp opinions on technology trends and show true business owner perspective.'
        ],
        recommendedPersonaId: 'sarah-vp',
        recommendedTrack: 'Behavioral & Leadership',
      },
    ],
  },
  {
    companyName: 'Stripe',
    normalizedName: 'stripe',
    tagline: 'Increase the GDP of the Internet with High-Craft Software',
    industry: 'Financial Infrastructure, Payment APIs & Billing Systems',
    overview: 'Stripe uses a famously practical interview process. Instead of artificial whiteboard algorithms, Stripe asks candidates to code in their own favorite IDE, debug real codebases, integrate third-party APIs, and design fault-tolerant financial ledgers.',
    totalStages: 4,
    cultureHighlights: [
      'Users First (Obsess over developer experience and clean APIs)',
      'Move with Urgency (Deliver real working software quickly)',
      'Think Rigorously (High standards for correctness, idempotency, and financial accuracy)',
      'Trust and Amplify (Empower colleagues, give credit generously)'
    ],
    evaluationPhilosophy: 'Can you write maintainable, tested code in a real development environment with real documentation and real bugs?',
    typicalTimeline: '3 to 5 weeks',
    popularRoles: COMPANY_SPECIFIC_ROLES['Stripe'],
    stages: [
      {
        id: 'strp-s1',
        stageNumber: 1,
        name: 'Stage 1: Real-IDE Technical Coding Screen',
        levelType: 'Technical Round',
        format: '60-Minute Pair Programming in Your Own Local IDE',
        durationMinutes: 60,
        interviewerProfile: 'Senior Stripe Engineer',
        coreCompetencies: ['Clean Software Craftsmanship', 'Unit Testing', 'API Design'],
        description: 'Building a practical component in your own local environment (VS Code, IntelliJ) with access to Google and documentation.',
        typicalQuestions: [
          'Build an HTTP rate limiter supporting burst allowances and sliding window limits with test coverage.',
          'Parse and validate transaction batch records with multi-currency conversion.'
        ],
        tipsForSuccess: [
          'Use your preferred keyboard shortcuts, write automated unit tests, and structure your classes cleanly.'
        ],
        recommendedPersonaId: 'alex-mentor',
        recommendedTrack: 'Technical & Problem Solving',
      },
      {
        id: 'strp-s2',
        stageNumber: 2,
        name: 'Stage 2: The Bug Squash & Integration Round',
        levelType: 'Technical Round',
        format: '60-Minute Practical Codebase Navigation',
        durationMinutes: 60,
        interviewerProfile: 'Stripe Infrastructure Engineer',
        coreCompetencies: ['Debugging Unknown Codebases', 'Reading Stack Traces', 'Refactoring'],
        description: 'You are provided with a real open-source style repository containing failing tests and obscure bugs. Your task is to diagnose, reproduce, and fix them cleanly.',
        typicalQuestions: [
          'A distributed lock service intermittently deadlocks under concurrent transactions. Locate the race condition and submit a patch.',
          'Integrate a new payment webhooks provider adhering to strict signature verification standards.'
        ],
        tipsForSuccess: [
          'Read the logs carefully. Add deterministic test cases to isolate the bug before changing source code.'
        ],
        recommendedPersonaId: 'morgan-chen',
        recommendedTrack: 'Technical & Problem Solving',
      },
      {
        id: 'strp-s3',
        stageNumber: 3,
        name: 'Stage 3: Financial Ledger & Payment System Design',
        levelType: 'System Design',
        format: '60-Minute High-Reliability Architecture Session',
        durationMinutes: 60,
        interviewerProfile: 'Staff Payment Systems Architect',
        coreCompetencies: ['Idempotency', 'Double-Entry Bookkeeping', 'High-Consistency Databases'],
        description: 'Designing high-reliability payment systems where zero data loss and exact financial correctness are mandatory.',
        typicalQuestions: [
          'Design an idempotent payment processing gateway that guarantees no double-charging even if network packets are dropped or retried.',
          'Design a double-entry bookkeeping ledger handling billions of micro-transactions across global merchant accounts.'
        ],
        tipsForSuccess: [
          'Always address idempotency keys, two-phase commits vs saga patterns, and reconciliation audit jobs.'
        ],
        recommendedPersonaId: 'sarah-vp',
        recommendedTrack: 'System Design & Architecture',
      },
      {
        id: 'strp-s4',
        stageNumber: 4,
        name: 'Stage 4: Collaboration, Craft & Operating Principles',
        levelType: 'Behavioral & Culture',
        format: '45-Minute Deep Culture & Values Session',
        durationMinutes: 45,
        interviewerProfile: 'Engineering Manager',
        coreCompetencies: ['Craftsmanship', 'Humble Communication', 'Developer Empathy'],
        description: 'Evaluating how you prioritize user experience, collaborate with product managers, and uphold high technical standards.',
        typicalQuestions: [
          'Tell me about an API you designed that you were exceptionally proud of. What made the developer ergonomics delightful?',
          'Describe a situation where you balanced urgent product delivery with necessary refactoring.'
        ],
        tipsForSuccess: [
          'Show pride in technical craft, documentation clarity, and empathy for developers using your APIs.'
        ],
        recommendedPersonaId: 'alex-mentor',
        recommendedTrack: 'Behavioral & Leadership',
      },
    ],
  },
  {
    companyName: 'Apple',
    normalizedName: 'apple',
    tagline: 'Perfectionism, Hardware-Software Integration & Secrecy',
    industry: 'Consumer Devices, Custom Silicon, iOS & Services',
    overview: 'Apple hiring is heavily team-dependent. There is no centralized hiring committee; individual engineering teams hire directly for their specific stack. Interviews dive deep into computer systems, language internals, memory management, and attention to detail.',
    totalStages: 4,
    cultureHighlights: [
      'Relentless attention to detail and craft',
      'Extreme confidentiality and secrecy',
      'Direct cross-functional collaboration between hardware, software, and design',
      'Pride in shipping products loved by hundreds of millions of users'
    ],
    evaluationPhilosophy: 'Apple values deep domain mastery over generic algorithm memorization. Can you explain every layer of the stack you touch?',
    typicalTimeline: '4 to 6 weeks',
    popularRoles: COMPANY_SPECIFIC_ROLES['Apple'],
    stages: [
      {
        id: 'appl-s1',
        stageNumber: 1,
        name: 'Stage 1: Hiring Manager Deep Dive',
        levelType: 'Phone Screen',
        format: '45-Minute Technical Conversation',
        durationMinutes: 45,
        interviewerProfile: 'Hiring Team Manager',
        coreCompetencies: ['Domain Expertise', 'Team Fit', 'Past Product Ownership'],
        description: 'Deep dive into your technical resume and architectural contributions to previous shipping products.',
        typicalQuestions: [
          'Tell me about the most challenging memory leak or multithreading bug you debugged in production.',
          'Why are you specifically interested in this team at Apple?'
        ],
        tipsForSuccess: [
          'Be deeply knowledgeable about Apple technologies (Swift, Metal, CoreOS, Objective-C/C++) relevant to the team.'
        ],
        recommendedPersonaId: 'alex-mentor',
        recommendedTrack: 'Technical & Behavioral Mix',
      },
      {
        id: 'appl-s2',
        stageNumber: 2,
        name: 'Stage 2: Technical Phone Screen',
        levelType: 'Technical Round',
        format: '60-Minute Live Coding & Low-Level Mechanics',
        durationMinutes: 60,
        interviewerProfile: 'Senior Apple Software Engineer',
        coreCompetencies: ['Memory Allocation', 'Concurrency', 'Algorithmic Optimization'],
        description: 'Focuses on clean data structures, pointer manipulation, and operating system trade-offs.',
        typicalQuestions: [
          'Implement a thread-safe circular buffer with zero-copy read/write capabilities.',
          'Explain how virtual memory paging, cache lines, and branch prediction affect application performance.'
        ],
        tipsForSuccess: [
          'Demonstrate understanding of low-level computational overhead (CPU cache locality, stack vs heap allocation).'
        ],
        recommendedPersonaId: 'morgan-chen',
        recommendedTrack: 'Technical & Problem Solving',
      },
      {
        id: 'appl-s3',
        stageNumber: 3,
        name: 'Stage 3: The Onsite Loop (Peer Gauntlet)',
        levelType: 'Technical Round',
        format: 'Full Day Loop (5-6 Separate 45-Minute Rounds)',
        durationMinutes: 240,
        interviewerProfile: 'Cross-Functional Engineering Peers & Tech Leads',
        coreCompetencies: ['Systems Architecture', 'API Craftsmanship', 'Problem Solving under Pressure'],
        description: 'A comprehensive loop with individual team members covering domain architecture, live coding, and peer collaboration.',
        typicalQuestions: [
          'Design an offline-first data sync engine for Apple Notes or HealthKit with end-to-end encryption.',
          'Optimize a frame-rendering pipeline to guarantee steady 120Hz ProMotion display output without dropping frames.'
        ],
        tipsForSuccess: [
          'Show passion for delighting end-users and obsessing over fluid performance.'
        ],
        recommendedPersonaId: 'sarah-vp',
        recommendedTrack: 'System Design & Architecture',
      },
      {
        id: 'appl-s4',
        stageNumber: 4,
        name: 'Stage 4: Executive & Cross-Functional Alignment',
        levelType: 'Bar Raiser / Executive',
        format: '45-Minute Senior Director Session',
        durationMinutes: 45,
        interviewerProfile: 'Director / Senior Director of Product Group',
        coreCompetencies: ['Design Sensitivity', 'Collaboration Across Hardware/Software', 'Confidentiality'],
        description: 'Final evaluation of maturity, discretion, and cross-functional leadership.',
        typicalQuestions: [
          'Describe a situation where engineering trade-offs clashed with industrial design requirements. How did you resolve it?',
          'What makes an Apple user experience feel magical to you?'
        ],
        tipsForSuccess: [
          'Speak with pride about craftsmanship and user empathy.'
        ],
        recommendedPersonaId: 'sarah-vp',
        recommendedTrack: 'Behavioral & Leadership',
      },
    ],
  },
  {
    companyName: 'JPMorgan Chase & Co.',
    normalizedName: 'jpmorganchase',
    tagline: 'Global Leader in Financial Technology, Quantitative Trading & Large-Scale Payment Infrastructure',
    industry: 'Investment Banking, Global Capital Markets & Consumer Payments',
    overview: 'JPMorgan Chase processes over $10 trillion in daily financial transactions. The engineering hiring architecture evaluates high-throughput data reliability, multithreaded concurrency (Java, C++, Python), database transaction integrity (ACID, double-entry ledgering), and rigorous ethical accountability. The process moves from HackerRank/HireVue screening into the high-stakes Superday loop.',
    totalStages: 4,
    cultureHighlights: [
      'Client First & Fiduciary Responsibility (Treat customer money and confidential records with zero compromise)',
      'Operational Resilience (Architect systems with zero-downtime, idempotency, and automated disaster failover)',
      'Cross-Team Partnership (Communicate cleanly across algorithmic trading desks, risk officers, and compliance)',
      'Regulatory Governance & Auditability (Embed strict audit logging and security into every software release)'
    ],
    evaluationPhilosophy: 'JPMorgan values engineers who balance rapid feature delivery with bulletproof transactional consistency. In financial engineering, an unhandled race condition can cause millions in financial losses or regulatory sanctions. Candidates who articulate locking strategies, transaction isolation, and disaster recovery pass the bar.',
    typicalTimeline: '3 to 5 weeks from HackerRank/HireVue to Superday offer debrief',
    popularRoles: COMPANY_SPECIFIC_ROLES['JPMorgan Chase'],
    stages: [
      {
        id: 'jpm-s1',
        stageNumber: 1,
        name: 'Stage 1: HackerRank Coding Challenge & HireVue Video Screen',
        levelType: 'Online Assessment',
        format: '60-Minute Timed Platform (2 Coding Questions) + 3 Recorded Video Prompts',
        durationMinutes: 60,
        interviewerProfile: 'Automated Evaluation Platform & Talent Acquisition Calibration',
        coreCompetencies: ['Data Structures & Algorithms', 'Time Complexity Optimization', 'Communication Clarity', 'Fiduciary Ethics'],
        description: 'Automated assessment testing core algorithmic efficiency (arrays, hashmaps, sliding window) followed by asynchronous HireVue behavioral questions evaluating past accountability and adherence to standards.',
        typicalQuestions: [
          'Given an array of customer transaction amounts and timestamps, detect anomalous rapid withdrawals exceeding a rolling-window limit.',
          'HireVue Prompt: Describe a situation where you had to adhere strictly to a policy, security requirement, or compliance standard even when taking a shortcut would have saved time.'
        ],
        tipsForSuccess: [
          'Ensure all edge test cases pass with optimal O(n) or O(n log n) time complexity.',
          'In HireVue, dress professionally, look directly into the camera lens, and structure answers tightly with the STAR framework.'
        ],
        recommendedPersonaId: 'alex-mentor',
        recommendedTrack: 'Technical & Behavioral Mix',
      },
      {
        id: 'jpm-s2',
        stageNumber: 2,
        name: 'Stage 2: Technical Phone Screen & Live Code Pair',
        levelType: 'Technical Round',
        format: '45-60 Minute Live Pair-Coding Session via CoderPad',
        durationMinutes: 60,
        interviewerProfile: 'Vice President (VP) / Lead Software Engineer from Line of Business',
        coreCompetencies: ['Multithreading & Concurrency', 'OOP & Design Patterns', 'SQL & Transaction Isolation', 'Memory Management'],
        description: 'Interactive pair programming evaluating code readability, synchronization, deadlock avoidance, and relational database trade-offs.',
        typicalQuestions: [
          'Implement a thread-safe in-memory order matching queue or LRU cache with concurrent read/write locks.',
          'Explain the practical differences between optimistic locking and pessimistic locking, and how isolation levels (Read Committed vs Serializable) prevent dirty reads and phantom reads in banking databases.'
        ],
        tipsForSuccess: [
          'Proactively discuss thread-safety guarantees (mutexes, atomics, condition variables).',
          'Highlight boundary condition validation, error handling, and defensive programming practices.'
        ],
        recommendedPersonaId: 'morgan-chen',
        recommendedTrack: 'Technical & Problem Solving',
      },
      {
        id: 'jpm-s3',
        stageNumber: 3,
        name: 'Stage 3: The Superday — Financial Systems Architecture & Transactional Resiliency',
        levelType: 'System Design',
        format: '60-Minute High-Scale Distributed Architecture Whiteboard',
        durationMinutes: 60,
        interviewerProfile: 'Executive Director / Principal Enterprise Architect',
        coreCompetencies: ['Double-Entry Ledger Design', 'Idempotency Keys', 'Event Sourcing & Kafka', 'Disaster Recovery & Multi-Region Consistency'],
        description: 'Architecting mission-critical financial software handling heavy transactional volume with zero double-spending and zero message loss.',
        typicalQuestions: [
          'Design an end-to-end peer-to-peer money movement and settlement engine (like Zelle or Chase QuickPay) handling 25,000 TPS with strict idempotency under network partition.',
          'How do you reconcile asynchronous payment states between third-party clearing rails (SWIFT, Fedwire, ACH) and internal ledger databases when network timeouts occur?'
        ],
        tipsForSuccess: [
          'Always begin with data integrity: double-entry bookkeeping schemas, unique idempotency keys, and transactional outbox patterns.',
          'Discuss distributed consensus and explain why eventual consistency must be paired with compensating transactions (Saga pattern).'
        ],
        recommendedPersonaId: 'sarah-vp',
        recommendedTrack: 'System Design & Architecture',
      },
      {
        id: 'jpm-s4',
        stageNumber: 4,
        name: 'Stage 4: The Superday — Managing Director Behavioral, Risk & Ethical Governance Round',
        levelType: 'Bar Raiser / Executive',
        format: '45-Minute Executive Leadership & Values Interview',
        durationMinutes: 45,
        interviewerProfile: 'Managing Director (MD) / Head of Technology Division',
        coreCompetencies: ['Regulatory Awareness & Ethics', 'Client Service Dedication', 'Crisis & Outage Management', 'Cross-Functional Collaboration'],
        description: 'Final leadership evaluation assessing executive presence, fiduciary responsibility, resilience under pressure, and cross-functional leadership.',
        typicalQuestions: [
          'Tell me about a time you identified a critical flaw, security vulnerability, or data discrepancy in production. Walk me step-by-step through how you communicated the risk to leadership and remediated it.',
          'Describe a scenario where business trading desks pressured engineering to release a feature immediately, but quality or compliance checks had not yet finished. How did you handle the conflict?'
        ],
        tipsForSuccess: [
          'Exhibit unwavering personal accountability—never deflect blame onto junior peers or vendors.',
          'Demonstrate deep respect for risk officers, compliance mandates, and customer data privacy.'
        ],
        recommendedPersonaId: 'morgan-chen',
        recommendedTrack: 'Behavioral & Leadership',
      },
    ],
  },
  {
    companyName: 'Goldman Sachs',
    normalizedName: 'goldmansachs',
    tagline: 'Engineering Rigor Meets High-Stakes Financial Mastery & Algorithmic Excellence',
    industry: 'Investment Banking, Global Markets & Quantitative Strats',
    overview: 'Goldman Sachs considers engineering its core differentiator in Global Markets and Asset Management. The firm evaluates candidates on deep computer science fundamentals, algorithmic optimization, low-latency execution, mathematical and probabilistic reasoning, and a strong culture of partnership and client service.',
    totalStages: 4,
    cultureHighlights: [
      'Partnership & Teamwork (No single individual succeeds alone; solutions are peer-reviewed)',
      'Client Service & Excellence (Relentless focus on quality and delivering flawless execution)',
      'Integrity & Intellectual Honesty (Admit mistakes early, audit numbers rigorously)',
      'Innovation & Meritocracy (Best ideas win regardless of seniority)'
    ],
    evaluationPhilosophy: 'Goldman Sachs looks for strong mathematical clarity, deep understanding of CPU cache and memory locality for trading systems, and candidates who communicate complex technical reasoning cleanly under pressure.',
    typicalTimeline: '4 to 6 weeks from HackerRank to Superday committee debrief',
    popularRoles: COMPANY_SPECIFIC_ROLES['Goldman Sachs'],
    stages: [
      {
        id: 'gs-s1',
        stageNumber: 1,
        name: 'Stage 1: HackerRank Online Coding Assessment',
        levelType: 'Online Assessment',
        format: '90-Minute Timed Assessment (2 Advanced Coding Challenges + Math/Probability)',
        durationMinutes: 90,
        interviewerProfile: 'Automated Evaluation Platform',
        coreCompetencies: ['Dynamic Programming', 'Graph Theory', 'Probability & Numerical Reasoning', 'Memory Complexity'],
        description: 'Challenging technical assessment covering algorithmic problem solving, dynamic programming arrays, string algorithms, and numerical trade-offs.',
        typicalQuestions: [
          'Given a stream of limit orders with bids and asks, determine optimal matched volume while minimizing execution latency.',
          'Calculate the expected value and variance of a portfolio transition under probabilistic drawdown constraints.'
        ],
        tipsForSuccess: [
          'Focus on optimal Big-O algorithmic complexity and memory layout.',
          'Write modular, self-documenting code with defensive input validation.'
        ],
        recommendedPersonaId: 'morgan-chen',
        recommendedTrack: 'Technical & Problem Solving',
      },
      {
        id: 'gs-s2',
        stageNumber: 2,
        name: 'Stage 2: Technical Phone Screen / Peer Deep Dive',
        levelType: 'Technical Round',
        format: '45-Minute Live Interactive Technical Conversation',
        durationMinutes: 45,
        interviewerProfile: 'Goldman Sachs Associate / Vice President Engineer',
        coreCompetencies: ['Object-Oriented Design', 'Low-Latency Mechanics', 'Data Structures', 'Algorithmic Optimization'],
        description: 'Live coding and CS fundamentals discussion examining memory management, garbage collection overhead (or C++ RAII), and data structures.',
        typicalQuestions: [
          'Implement a high-performance circular lock-free ring buffer for streaming market ticks.',
          'Explain how memory cache lines, false sharing, and branch prediction affect high-frequency execution performance.'
        ],
        tipsForSuccess: [
          'Demonstrate understanding of low-level CPU efficiency (stack vs heap, cache locality).',
          'Communicate transparently when exploring problem spaces.'
        ],
        recommendedPersonaId: 'morgan-chen',
        recommendedTrack: 'Technical & Problem Solving',
      },
      {
        id: 'gs-s3',
        stageNumber: 3,
        name: 'Stage 3: The Superday — Systems Architecture & Distributed Financial Engines',
        levelType: 'System Design',
        format: '60-Minute Distributed Ledger & High-Throughput Engine Architecture',
        durationMinutes: 60,
        interviewerProfile: 'Senior VP / Technology Fellow',
        coreCompetencies: ['High-Throughput Architecture', 'Event Auditing', 'Fault Tolerance', 'Sub-Millisecond Latency'],
        description: 'Comprehensive system design session modeling high-throughput trade execution pipelines or real-time portfolio risk computation.',
        typicalQuestions: [
          'Design a real-time risk calculation and VaR (Value at Risk) pipeline processing 50,000 market price updates per second with sub-100ms dashboard refreshes.',
          'How do you design a financial audit ledger that guarantees non-repudiation and cryptographic integrity across multiple regulatory jurisdictions?'
        ],
        tipsForSuccess: [
          'Break down functional vs non-functional requirements (throughput, P99 latency, fault tolerance).',
          'Detail schema design, cache invalidation, and data partition strategies.'
        ],
        recommendedPersonaId: 'sarah-vp',
        recommendedTrack: 'System Design & Architecture',
      },
      {
        id: 'gs-s4',
        stageNumber: 4,
        name: 'Stage 4: The Superday — Vice President / Managing Director Culture & Partnership Round',
        levelType: 'Bar Raiser / Executive',
        format: '45-Minute Senior Leadership & Culture Alignment Evaluation',
        durationMinutes: 45,
        interviewerProfile: 'Managing Director / Business Unit Head',
        coreCompetencies: ['Partnership & Teamwork', 'Client Dedication', 'Integrity & Ethics', 'Handling Ambiguity'],
        description: 'Final behavioral debrief evaluating candidate alignment with Goldman Sachs core principles, intellectual maturity, and executive poise.',
        typicalQuestions: [
          'Tell me about a time you had to deliver difficult news to a major stakeholder or client when a software rollout encountered a defect.',
          'How do you foster partnership and psychological safety in a high-pressure trading floor environment?'
        ],
        tipsForSuccess: [
          'Highlight humility, team-first mentality, and pride in excellence.',
          'Speak articulately about past projects and lessons learned.'
        ],
        recommendedPersonaId: 'sarah-vp',
        recommendedTrack: 'Behavioral & Leadership',
      },
    ],
  },
  {
    companyName: 'Nvidia',
    normalizedName: 'nvidia',
    tagline: 'Accelerated computing, deep learning platforms & first-principles GPU architecture',
    industry: 'Semiconductors, Accelerated Computing & Hardware Architecture',
    overview: 'NVIDIA’s engineering evaluation centers on deep computer architecture fundamentals, extreme C++/CUDA performance, low-level concurrency, and first-principles reasoning under CEO Jensen Huang\'s high-velocity execution philosophy. Candidates are tested on their ability to reason about hardware limits, cache hierarchies, and massive-scale distributed training clusters.',
    totalStages: 4,
    cultureHighlights: [
      'First-Principles Thinking (Break problems down to physics and hardware fundamentals)',
      'High-Speed Execution (Speed of light execution; build prototypes rapidly)',
      'Intellectual Honesty & Radical Candor (Zero tolerance for hand-waving or vague answers)',
      'Continuous Innovation & Craftsmanship (Architect systems that push the boundary of accelerated computing)'
    ],
    evaluationPhilosophy: 'NVIDIA values depth over breadth. You must demonstrate mastery over system memory architectures, latency hiding, CUDA streams, thread divergence, and hardware bottlenecks.',
    typicalTimeline: '3 to 5 weeks from initial screen to final loop',
    popularRoles: [
      'CUDA Systems Software Engineer',
      'Deep Learning Frameworks Engineer',
      'GPU Architecture & Performance Engineer',
      'AI Infrastructure & Megatron-LM Scaling Engineer',
      'Senior Linux Kernel & Driver Developer',
      'Autonomous Vehicles (DRIVE OS) Engineer',
      'TensorRT & LLM Inference Optimization Engineer',
    ],
    stages: [
      {
        id: 'nvda-s1',
        stageNumber: 1,
        name: 'Stage 1: Technical Screening & Computer Architecture',
        levelType: 'Phone Screen',
        format: '45-60 Minute Technical Phone Screen with Senior Systems Architect',
        durationMinutes: 60,
        interviewerProfile: 'Senior Systems Software Engineer',
        coreCompetencies: ['C/C++ Deep Mechanics', 'Computer Architecture', 'Memory Hierarchies', 'Data Structures'],
        description: 'Rigorous exploration of memory models, cache coherence, virtual memory, pointers, and algorithmic complexity.',
        typicalQuestions: [
          'Explain cache line bouncing in multicore processors and how false sharing degrades performance in high-throughput C++ applications.',
          'Implement an aligned memory allocator in C++ ensuring 64-byte or 256-byte cache-line alignment.'
        ],
        tipsForSuccess: [
          'Be prepared to explain assembly-level execution, compiler optimizations (SIMD/AVX), and volatile/atomic semantics.',
          'Discuss hardware bottlenecks quantitatively.'
        ],
        recommendedPersonaId: 'alex-mentor',
        recommendedTrack: 'Technical & Problem Solving',
      },
      {
        id: 'nvda-s2',
        stageNumber: 2,
        name: 'Stage 2: Low-Level C++ / CUDA Systems & Kernel Concurrency',
        levelType: 'Technical Round',
        format: '60-Minute Live Coding & Kernel Architecture Analysis',
        durationMinutes: 60,
        interviewerProfile: 'CUDA Compiler & Core Platform Lead',
        coreCompetencies: ['CUDA Programming', 'GPU Thread Divergence', 'Shared Memory Optimization', 'Asynchronous Streams'],
        description: 'Writing high-performance parallel kernels, optimizing memory bandwidth, and eliminating synchronization stalls.',
        typicalQuestions: [
          'Write a CUDA kernel to perform parallel reduction (sum/max) across an array of 10M floats using shared memory and warp shuffle intrinsics (__shfl_down_sync).',
          'Explain bank conflicts in shared memory and how padding or strided access eliminates serialization.'
        ],
        tipsForSuccess: [
          'Prioritize compute-to-memory ratio and arithmetic intensity (Roofline model).',
          'Highlight asynchronous CUDA stream overlaps for host-to-device data transfers.'
        ],
        recommendedPersonaId: 'morgan-chen',
        recommendedTrack: 'Technical & Problem Solving',
      },
      {
        id: 'nvda-s3',
        stageNumber: 3,
        name: 'Stage 3: Distributed Acceleration & TensorRT / Megatron-LM Scaling',
        levelType: 'System Design',
        format: '60-Minute Distributed High-Scale Acceleration Architecture Round',
        durationMinutes: 60,
        interviewerProfile: 'Distinguished Engineer / AI Platform Architect',
        coreCompetencies: ['Tensor & Pipeline Parallelism (Megatron-LM)', 'NVLink & InfiniBand Fabrics', 'Low-Precision FP8/FP16 Quantization', 'Fault-Tolerant Distributed Training'],
        description: 'Architecting cluster-scale GPU training and low-latency inference pipelines handling thousands of H100/Blackwell nodes.',
        typicalQuestions: [
          'Design the communication topology for a 405B parameter LLM training cluster across 16,384 GPUs using 3D parallelism (Tensor, Pipeline, and ZeRO/FSDP Data Parallelism).',
          'How does KV-cache paging (vLLM / TensorRT-LLM) reduce memory fragmentation and enable continuous batching?'
        ],
        tipsForSuccess: [
          'Calculate inter-node bandwidth vs intra-node NVLink throughput mathematically.',
          'Address straggler mitigation, gradient checkpointing, and checkpoint recovery.'
        ],
        recommendedPersonaId: 'sarah-vp',
        recommendedTrack: 'System Design & Architecture',
      },
      {
        id: 'nvda-s4',
        stageNumber: 4,
        name: 'Stage 4: Director Deep-Dive & First-Principles Engineering Leadership',
        levelType: 'Bar Raiser / Executive',
        format: '45-Minute Executive Engineering & Cultural Fit Interview',
        durationMinutes: 45,
        interviewerProfile: 'Engineering Director / Vice President',
        coreCompetencies: ['First-Principles Problem Solving', 'Speed of Execution', 'Cross-Disciplinary Teamwork', 'Resilience'],
        description: 'In-depth behavioral and philosophical interview on technical ownership, tackling unsolved computational problems, and thrives in high-pressure execution.',
        typicalQuestions: [
          'Tell me about a time you solved an impossible performance or architectural bottleneck by throwing out conventional assumptions and reasoning from first principles.',
          'Describe a situation where an engineering roadmap failed to deliver expected speedups. How did you diagnose the root cause and course-correct?'
        ],
        tipsForSuccess: [
          'Demonstrate passion for accelerated computing and how your work directly advances AI breakthroughs.',
          'Be candid about past technical failures and what you learned from hardware profiling.'
        ],
        recommendedPersonaId: 'morgan-chen',
        recommendedTrack: 'Behavioral & Leadership',
      },
    ],
  },
  {
    companyName: 'Morgan Stanley',
    normalizedName: 'morganstanley',
    tagline: 'Institutional securities, global algorithmic trading & real-time financial architecture',
    industry: 'Investment Banking, Capital Markets & Global Financial Services',
    overview: 'Morgan Stanley’s technology organization powers electronic trading, high-frequency market making, risk calculations, and enterprise wealth management. Their hiring process assesses strong software engineering fundamentals, multi-threaded Java / C++ concurrency, zero-data-loss relational database modeling, and institutional risk awareness.',
    totalStages: 4,
    cultureHighlights: [
      'Do the Right Thing (Highest ethical and fiduciary conduct)',
      'Lead with Exceptional Ideas (Cutting-edge electronic execution & research)',
      'Give Back & Foster Diversity (Team-oriented collaborative culture)',
      'Commit to Diversity and Inclusion & Operational Excellence'
    ],
    evaluationPhilosophy: 'Engineers are expected to understand both software craftsmanship and financial mechanics. The loop stresses concurrency correctness, network latency awareness, and robust failover design.',
    typicalTimeline: '3 to 5 weeks from initial screening to Superday decision',
    popularRoles: [
      'Technology Analyst (Enterprise Engineering)',
      'Senior Manager / Associate (Wealth Management Tech)',
      'Vice President (Institutional Securities Technology)',
      'Algorithmic Trading & Fixed Income Systems Engineer',
      'High-Throughput Java & Distributed Cache Architect',
      'Core Infrastructure & Reliability Engineer',
    ],
    stages: [
      {
        id: 'ms-s1',
        stageNumber: 1,
        name: 'Stage 1: HackerRank Technical Assessment & Video Screen',
        levelType: 'Online Assessment',
        format: '75-Minute Timed HackerRank (2 Coding Problems + Core CS MCQs) + HireVue Video',
        durationMinutes: 75,
        interviewerProfile: 'Automated Platform Calibration',
        coreCompetencies: ['Algorithmic Efficiency', 'Data Structures', 'Database & SQL Optimization', 'Communication'],
        description: 'Assesses standard data structures (trees, heaps, dynamic programming) and core computer science fundamentals.',
        typicalQuestions: [
          'Given an order book transaction stream, implement an algorithm to calculate weighted moving volume and detect bid-ask arbitrage opportunities.',
          'HireVue: Why Morgan Stanley, and how do you ensure zero ethical compromises when under pressure to hit milestones?'
        ],
        tipsForSuccess: [
          'Double-check edge cases (empty streams, duplicate timestamps, integer overflow).',
          'Articulate clear STAR answers during the video portion emphasizing teamwork.'
        ],
        recommendedPersonaId: 'alex-mentor',
        recommendedTrack: 'Technical & Behavioral Mix',
      },
      {
        id: 'ms-s2',
        stageNumber: 2,
        name: 'Stage 2: CoderPad Live Pair-Coding & Concurrency Isolation',
        levelType: 'Technical Round',
        format: '60-Minute Live Collaborative Coding Session',
        durationMinutes: 60,
        interviewerProfile: 'Vice President / Lead Electronic Trading Developer',
        coreCompetencies: ['Java / C++ Concurrency', 'Thread-Safe Collections', 'Locking & Volatile Semantics', 'Object-Oriented Design'],
        description: 'Hands-on programming probing multithreaded correctness, race conditions, memory visibility, and clean API design.',
        typicalQuestions: [
          'Implement a thread-safe Circular Ring Buffer / Disruptor pattern in Java without synchronized blocks (using AtomicLong and volatile memory barriers).',
          'Explain how garbage collection pauses impact low-latency trading engines and how to design zero-allocation architectures.'
        ],
        tipsForSuccess: [
          'Write idiomatic code and explain synchronization primitives (ReadWriteLock, CAS operations, semaphores).',
          'Discuss time and space complexity upfront before typing.'
        ],
        recommendedPersonaId: 'morgan-chen',
        recommendedTrack: 'Technical & Problem Solving',
      },
      {
        id: 'ms-s3',
        stageNumber: 3,
        name: 'Stage 3: Superday — Institutional Securities & Trading Systems Architecture',
        levelType: 'System Design',
        format: '60-Minute Distributed Systems Architecture Round',
        durationMinutes: 60,
        interviewerProfile: 'Executive Director / Principal Enterprise Architect',
        coreCompetencies: ['FIX Protocol & Gateway Architecture', 'Event Sourcing & Order Matching', 'Disaster Recovery (Active-Active)', 'Kafka & Distributed Logging'],
        description: 'Architecting high-frequency, ultra-reliable financial market connectivity and pricing engines.',
        typicalQuestions: [
          'Design an institutional order routing and risk validation gateway handling 100,000 orders/second with p99 latency under 2 milliseconds.',
          'How do you guarantee that a trade execution report is never duplicated even if a primary network gateway crashes midway through settlement?'
        ],
        tipsForSuccess: [
          'Incorporate sequenced messaging, deterministic replay, and two-phase commit or transactional outbox patterns.',
          'Discuss monitoring, heartbeat metrics, and regulatory audit logging.'
        ],
        recommendedPersonaId: 'sarah-vp',
        recommendedTrack: 'System Design & Architecture',
      },
      {
        id: 'ms-s4',
        stageNumber: 4,
        name: 'Stage 4: Superday — Executive Director & Risk Ethics Round',
        levelType: 'Bar Raiser / Executive',
        format: '45-Minute Executive Behavioral & Fiduciary Interview',
        durationMinutes: 45,
        interviewerProfile: 'Executive Director / Global Head of Application Technology',
        coreCompetencies: ['Risk Mindset', 'Leadership & Partnership', 'Crisis Management', 'Long-Term Vision'],
        description: 'Assesses executive poise, accountability, navigating difficult stakeholder conversations, and alignment with Morgan Stanley core values.',
        typicalQuestions: [
          'Describe a situation where a trading desk or product partner asked for an urgent workaround that bypassed standard CI/CD testing or compliance scans. How did you handle it?',
          'Tell me about a high-severity production outage you managed. How did you communicate with executive stakeholders while guiding your team to resolution?'
        ],
        tipsForSuccess: [
          'Demonstrate calm composure, clear structure, and respect for risk controllers.',
          'Emphasize collaborative outcomes where all parties reached shared alignment.'
        ],
        recommendedPersonaId: 'sarah-vp',
        recommendedTrack: 'Behavioral & Leadership',
      },
    ],
  },
  {
    companyName: 'Bank of America',
    normalizedName: 'bankofamerica',
    tagline: 'High-availability transaction ledgers, cash management & Merrill wealth systems',
    industry: 'Investment Banking, Capital Markets & Global Financial Services',
    overview: 'Bank of America\'s global technology division processes trillions in daily transactions across Merrill Lynch, CashPro, and Consumer Banking. Their engineering loops emphasize transactional resilience, high-throughput microservices, strict security, and operational excellence.',
    totalStages: 4,
    cultureHighlights: [
      'Deliver for Clients (Excellence in customer and commercial delivery)',
      'Act Responsibly (Protecting customer data and maintaining absolute fiduciary vigilance)',
      'Realize the Power of Our People (Inclusive and supportive collaborative culture)',
      'Trust the Team (Accountability and shared victory)'
    ],
    evaluationPhilosophy: 'BofA seeks engineers who build fault-tolerant, horizontally scalable systems with zero data corruption. Clear communication, clean code, and deep knowledge of enterprise data architectures are paramount.',
    typicalTimeline: '3 to 5 weeks from initial screen to Superday decision',
    popularRoles: [
      'Global Technology Analyst (Full Stack Development)',
      'Senior Tech Associate (Merrill Wealth & CashPro)',
      'Vice President (Global Markets Technology)',
      'High-Throughput Payments & Ledger Architect',
      'Risk & Regulatory Reporting Systems Engineer',
      'Enterprise Cloud & Data Platform Developer',
    ],
    stages: [
      {
        id: 'bofa-s1',
        stageNumber: 1,
        name: 'Stage 1: Online Technical Assessment (HireVue / HackerRank)',
        levelType: 'Online Assessment',
        format: '60-Minute Assessment (Coding + Behavioral Questions)',
        durationMinutes: 60,
        interviewerProfile: 'Automated Evaluation Platform',
        coreCompetencies: ['Algorithms & Data Structures', 'SQL Queries & ACID', 'Communication Clarity'],
        description: 'Algorithmic problem solving combined with video questions assessing your background and customer-centric mindset.',
        typicalQuestions: [
          'Given a collection of credit transactions, calculate moving average customer balances and flag account overdrafts.',
          'Write SQL to reconcile merchant settlement batches and identify unallocated funds across multi-currency tables.'
        ],
        tipsForSuccess: [
          'Ensure algorithmic solutions account for boundary conditions and large dataset limits.',
          'Answer video questions clearly using the STAR framework.'
        ],
        recommendedPersonaId: 'alex-mentor',
        recommendedTrack: 'Technical & Behavioral Mix',
      },
      {
        id: 'bofa-s2',
        stageNumber: 2,
        name: 'Stage 2: Technical Phone Screen & Java / Spring / C# Live Coding',
        levelType: 'Technical Round',
        format: '60-Minute Live Technical Interview',
        durationMinutes: 60,
        interviewerProfile: 'Vice President / Lead Software Engineer',
        coreCompetencies: ['Enterprise Java / Python / C#', 'REST / Microservices Design', 'Database Transactions & Locking', 'OOP Principles'],
        description: 'Deep dive into object-oriented design, microservices communication, transactional isolation, and clean coding.',
        typicalQuestions: [
          'Design and implement a resilient payment processing interface with retry mechanisms, circuit breakers, and exponential backoff.',
          'Explain the differences between optimistic locking and pessimistic locking in enterprise database transactions.'
        ],
        tipsForSuccess: [
          'Demonstrate clear object-oriented architecture and adherence to SOLID principles.',
          'Discuss logging, observability, and unit test coverage aloud.'
        ],
        recommendedPersonaId: 'morgan-chen',
        recommendedTrack: 'Technical & Problem Solving',
      },
      {
        id: 'bofa-s3',
        stageNumber: 3,
        name: 'Stage 3: Superday — CashPro High-Throughput Ledger & Resilient Settlement',
        levelType: 'System Design',
        format: '60-Minute System Architecture Session',
        durationMinutes: 60,
        interviewerProfile: 'Senior VP / Enterprise Solutions Architect',
        coreCompetencies: ['High-Throughput Ledger Architecture', 'Event-Driven Microservices', 'Idempotency & Replay', 'Active-Active Disaster Recovery'],
        description: 'Designing distributed money movement, cash management, or Merrill wealth trading backbones.',
        typicalQuestions: [
          'Design an enterprise real-time wire payment platform handling $50B in daily transfers with sub-second acknowledgment, double-entry auditability, and zero data loss during regional cloud failover.',
          'How do you manage schema evolution and backwards compatibility in event-driven microservices across hundreds of services?'
        ],
        tipsForSuccess: [
          'Start with strict data integrity: schemas, idempotency keys, and transactional outbox patterns.',
          'Define clear SLAs, latency budgets, and disaster recovery strategies (RPO = 0, RTO < 10s).'
        ],
        recommendedPersonaId: 'sarah-vp',
        recommendedTrack: 'System Design & Architecture',
      },
      {
        id: 'bofa-s4',
        stageNumber: 4,
        name: 'Stage 4: Superday — Managing Director Behavioral & Regulatory Risk Governance',
        levelType: 'Bar Raiser / Executive',
        format: '45-Minute Executive Leadership Round',
        durationMinutes: 45,
        interviewerProfile: 'Managing Director / Technology Line of Business Executive',
        coreCompetencies: ['Fiduciary Responsibility', 'Regulatory Stewardship', 'Crisis Management', 'Team Leadership'],
        description: 'Senior leadership interview evaluating ethical courage, team leadership, stakeholder management, and continuous improvement.',
        typicalQuestions: [
          'Tell me about a time you noticed an overlooked risk or vulnerability in an existing process. How did you bring it to light and resolve it?',
          'How do you balance rapid delivery of new digital banking capabilities with strict audit and regulatory standards?'
        ],
        tipsForSuccess: [
          'Show deep respect for compliance, risk, and information security.',
          'Highlight instances where you mentored junior engineers and fostered positive team culture.'
        ],
        recommendedPersonaId: 'sarah-vp',
        recommendedTrack: 'Behavioral & Leadership',
      },
    ],
  },
  {
    companyName: 'Barclays',
    normalizedName: 'barclays',
    tagline: 'Investment banking technology, sustainable finance & high-speed markets settlement',
    industry: 'Investment Banking, Capital Markets & Global Financial Services',
    overview: 'Barclays Investment Bank and Consumer Banking teams develop world-class trading engines (BARX), payment networks, and digital banking platforms. Their interview loop evaluates algorithmic rigor, multithreaded systems engineering, distributed transactional integrity, and alignment with Barclays Barclays Values (Respect, Integrity, Service, Excellence, Stewardship).',
    totalStages: 4,
    cultureHighlights: [
      'Respect (Value each individual and their contributions)',
      'Integrity (Act with fairness, honesty, and transparency in everything we do)',
      'Service (Put clients and customers at the center of what we deliver)',
      'Excellence (Relentlessly pursue the highest quality and technical craftsmanship)',
      'Stewardship (Leave things in better shape than we found them for future generations)'
    ],
    evaluationPhilosophy: 'Barclays looks for engineers who combine technical mastery with fiduciary maturity. Demonstrating how you safeguard financial integrity and collaborate across global teams will set you apart.',
    typicalTimeline: '3 to 5 weeks from initial screen to Superday committee decision',
    popularRoles: [
      'Technology Developer (Barclays Investment Bank)',
      'Associate (Corporate & Sustainable Banking Tech)',
      'Vice President (Markets & Execution Technology)',
      'Low-Latency Java / C++ Settlement Developer',
      'Digital Banking & Payments Microservices Engineer',
      'Risk, Compliance & Fraud Architecture Engineer',
    ],
    stages: [
      {
        id: 'barc-s1',
        stageNumber: 1,
        name: 'Stage 1: HackerRank Coding Challenge & HireVue Video Screen',
        levelType: 'Online Assessment',
        format: '60-Minute Timed HackerRank Assessment + Recorded HireVue Video',
        durationMinutes: 60,
        interviewerProfile: 'Automated Evaluation Platform',
        coreCompetencies: ['Data Structures & Algorithms', 'Big-O Complexity', 'Barclays Values', 'Communication'],
        description: 'Algorithmic assessment testing speed, algorithmic correctness, and behavioral answers aligned with Barclays RISE values.',
        typicalQuestions: [
          'Given an array of customer trade orders, find the longest contiguous subsequence where price volatility does not exceed a threshold.',
          'HireVue: Describe a situation where you had to act with absolute integrity when nobody else was watching.'
        ],
        tipsForSuccess: [
          'Ensure O(n log n) or O(n) algorithmic complexity for all test cases.',
          'Speak clearly into the camera and map your stories directly to Barclays RISE principles.'
        ],
        recommendedPersonaId: 'alex-mentor',
        recommendedTrack: 'Technical & Behavioral Mix',
      },
      {
        id: 'barc-s2',
        stageNumber: 2,
        name: 'Stage 2: Technical Live Pair Coding & Concurrency Control',
        levelType: 'Technical Round',
        format: '60-Minute Live CoderPad Session with Lead Engineer',
        durationMinutes: 60,
        interviewerProfile: 'Vice President / Markets Execution Tech Lead',
        coreCompetencies: ['Java / C++ / Python Concurrency', 'Object-Oriented Design', 'Memory & Thread Synchronization', 'Defensive Programming'],
        description: 'Live interactive coding round testing concurrent data structures, clean modular design, and robust error handling.',
        typicalQuestions: [
          'Design and implement a thread-safe in-memory order cache supporting concurrent updates and snapshot reads without blocking writer threads.',
          'Explain the memory visibility guarantees of volatile variables and memory barriers in multicore architectures.'
        ],
        tipsForSuccess: [
          'Explicitly address thread-safety, race conditions, and deadlock avoidance.',
          'Write unit tests and edge cases before declaring your solution complete.'
        ],
        recommendedPersonaId: 'morgan-chen',
        recommendedTrack: 'Technical & Problem Solving',
      },
      {
        id: 'barc-s3',
        stageNumber: 3,
        name: 'Stage 3: Superday — Financial Infrastructure & Trade Settlement Architecture',
        levelType: 'System Design',
        format: '60-Minute Whiteboard & Distributed Architecture Round',
        durationMinutes: 60,
        interviewerProfile: 'Director / Chief Architect',
        coreCompetencies: ['Distributed Settlement Systems', 'Idempotent Message Processing', 'Event Sourcing & Kafka', 'Auditability & Disaster Recovery'],
        description: 'Architecting high-volume clearing, trade booking, or payment rails capable of handling extreme market surges.',
        typicalQuestions: [
          'Design an FX trade clearing and settlement pipeline at Barclays capable of processing 50,000 trades/sec with guaranteed auditability and zero double-processing under network split.',
          'How do you manage real-time fraud scoring without adding more than 15 milliseconds of latency to consumer transactions?'
        ],
        tipsForSuccess: [
          'Proactively discuss ACID semantics, idempotency tokens, and disaster recovery strategies.',
          'Highlight trade-offs between strong consistency and low latency.'
        ],
        recommendedPersonaId: 'sarah-vp',
        recommendedTrack: 'System Design & Architecture',
      },
      {
        id: 'barc-s4',
        stageNumber: 4,
        name: 'Stage 4: Superday — Managing Director Values & Regulatory Stewardship Round',
        levelType: 'Bar Raiser / Executive',
        format: '45-Minute Executive Behavioral & Values Evaluation',
        durationMinutes: 45,
        interviewerProfile: 'Managing Director / Global Technology Head',
        coreCompetencies: ['Barclays RISE Values', 'Ethical Courage', 'Stakeholder Leadership', 'Team Mentorship'],
        description: 'Final executive interview focusing on how you lead through uncertainty, handle ethical challenges, and build long-term value.',
        typicalQuestions: [
          'Tell me about a time you faced conflicting priorities between rapid delivery and thorough security or compliance validation. How did you resolve it?',
          'How do you foster an environment of continuous learning, psychological safety, and stewardship in your engineering teams?'
        ],
        tipsForSuccess: [
          'Use the STAR method with clear personal responsibility ("I did" rather than "we did").',
          'Demonstrate knowledge of Barclays recent technology transformations and global initiatives.'
        ],
        recommendedPersonaId: 'morgan-chen',
        recommendedTrack: 'Behavioral & Leadership',
      },
    ],
  },
  {
    companyName: 'Capital One',
    normalizedName: 'capitalone',
    tagline: 'Cloud-native banking, machine learning credit models & the Technical Case Interview',
    industry: 'Investment Banking, Capital Markets & Global Financial Services',
    overview: 'Capital One was the first major US bank to migrate 100% of its data centers to the public cloud (AWS). Their hiring loop is renowned for the Capital One Technical Case Interview—an interactive architectural problem where candidates design a scalable cloud-native microservices solution—paired with algorithmic coding and behavioral job family evaluations.',
    totalStages: 4,
    cultureHighlights: [
      'Excellence (Strive for the highest standards in tech craftsmanship)',
      'Do the Right Thing (Operate with honesty, integrity, and customer obsession)',
      'Change Banking for Good (Innovate through cloud, open-source, and machine learning)',
      'Collaborative & Inclusive Culture (Focus on shared mentorship and psychological safety)'
    ],
    evaluationPhilosophy: 'Capital One seeks engineers who think critically about cloud architecture, microservices separation of concerns, API contracts, and business value. The technical case round is unique and tests your ability to think aloud with the interviewer.',
    typicalTimeline: '2 to 4 weeks from initial screening to Power Day decision',
    popularRoles: [
      'Associate Software Engineer (TDP Program)',
      'Senior Software Engineer (Cloud Card & Payments)',
      'Lead Software Engineer (Real-Time Fraud Detection)',
      'Principal Distributed Systems Architect',
      'Director of Software Engineering',
      'Machine Learning & Credit Modeling Engineer',
      'Product Manager (Financial Products)',
    ],
    stages: [
      {
        id: 'cap1-s1',
        stageNumber: 1,
        name: 'Stage 1: CodeSignal General Coding Assessment (GCA)',
        levelType: 'Online Assessment',
        format: '70-Minute Timed CodeSignal Assessment (4 Algorithmic Tasks)',
        durationMinutes: 70,
        interviewerProfile: 'Automated Platform Calibration',
        coreCompetencies: ['Algorithmic Problem Solving', 'Array & String Manipulation', 'Matrix & Dynamic Programming', 'Time Management'],
        description: 'Standardized CodeSignal General Coding Framework (Task 1 & 2 straightforward, Task 3 implementation-heavy, Task 4 advanced algorithmic optimization).',
        typicalQuestions: [
          'Implement a continuous text editor or memory simulation tracking undo/redo states.',
          'Given a grid representing payment flows, calculate maximum profit path with constraints on turnaround time.'
        ],
        tipsForSuccess: [
          'Practice time allocation: finish tasks 1 & 2 in under 15 minutes to preserve time for task 3 & 4.',
          'Aim for a CodeSignal score of 800+ for direct advancement.'
        ],
        recommendedPersonaId: 'alex-mentor',
        recommendedTrack: 'Technical & Problem Solving',
      },
      {
        id: 'cap1-s2',
        stageNumber: 2,
        name: 'Stage 2: Technical Phone Screen & Live Coding',
        levelType: 'Technical Round',
        format: '60-Minute Live Coding Session via CodeSignal / Zoom',
        durationMinutes: 60,
        interviewerProfile: 'Senior Software Engineer from Hiring Org',
        coreCompetencies: ['Data Structures & Algorithms', 'Clean Code Principles', 'Object-Oriented Design', 'Complexity Analysis'],
        description: 'Collaborative coding problem with an emphasis on readable, production-grade code, unit testing, and edge case discussion.',
        typicalQuestions: [
          'Design an in-memory cache with eviction policies and expiration timestamps for sensitive credit card transaction queries.',
          'Implement an algorithm to detect credit card fraud velocity patterns in real-time streaming data.'
        ],
        tipsForSuccess: [
          'Communicate your design approach before writing code.',
          'Handle edge cases cleanly and demonstrate clean modular code structure.'
        ],
        recommendedPersonaId: 'alex-mentor',
        recommendedTrack: 'Technical & Problem Solving',
      },
      {
        id: 'cap1-s3',
        stageNumber: 3,
        name: 'Stage 3: Power Day — The Capital One Technical Case Interview',
        levelType: 'System Design',
        format: '60-Minute Interactive Cloud Architecture Case Study',
        durationMinutes: 60,
        interviewerProfile: 'Principal Software Engineer / Senior Manager',
        coreCompetencies: ['Cloud-Native Architecture (AWS)', 'Microservices & API Design', 'Database Selection (SQL vs NoSQL)', 'Scalability & Resiliency'],
        description: 'The signature Capital One interview: you are given a business scenario (e.g. launching a new peer-to-peer payment feature or credit monitoring service) and collaborate to architect the system from scratch.',
        typicalQuestions: [
          'Case Prompt: Capital One wants to build a new instant credit pre-approval microservice that checks external credit bureaus and internal account history in under 300ms. Walk through your database schema, API contracts, caching strategy, and asynchronous fallback queues.',
          'How do you handle a sudden 10x traffic spike on Black Friday while ensuring zero data loss and maintaining PCI-DSS compliance?'
        ],
        tipsForSuccess: [
          'Treat the interviewer as a teammate; ask clarifying business and technical questions.',
          'Structure your response clearly: Requirements -> Data Model -> API Design -> High-Level Architecture -> Bottlenecks & Edge Cases.'
        ],
        recommendedPersonaId: 'sarah-vp',
        recommendedTrack: 'System Design & Architecture',
      },
      {
        id: 'cap1-s4',
        stageNumber: 4,
        name: 'Stage 4: Power Day — Behavioral & Job Family Leadership Round',
        levelType: 'Behavioral & Culture',
        format: '45-Minute Behavioral & Values Interview',
        durationMinutes: 45,
        interviewerProfile: 'Engineering Manager / Director',
        coreCompetencies: ['Ownership & Initiative', 'Conflict Resolution', 'Mentorship & Inclusion', 'Adaptability'],
        description: 'Explores your past experiences, leadership style, teamwork, and how you uphold Capital One\'s collaborative culture.',
        typicalQuestions: [
          'Tell me about a time you identified a process or architectural flaw that was not strictly your responsibility. How did you take ownership to fix it?',
          'Describe a situation where you had to influence a teammate or cross-functional partner who disagreed with your proposed technical approach.'
        ],
        tipsForSuccess: [
          'Structure your answers using STAR with quantifiable impact.',
          'Highlight collaboration, learning from mistakes, and mentoring others.'
        ],
        recommendedPersonaId: 'morgan-chen',
        recommendedTrack: 'Behavioral & Leadership',
      },
    ],
  },
  {
    companyName: 'Citigroup',
    normalizedName: 'citigroup',
    tagline: 'Institutional clients group, real-time treasury & global currency rails',
    industry: 'Investment Banking, Capital Markets & Global Financial Services',
    overview: 'Citi\'s technology infrastructure connects over 160 countries and moves trillions of dollars daily. Their engineering interviews focus on mission-critical system reliability, global payment rails, microservices architecture, and adherence to international banking regulations and cyber hygiene.',
    totalStages: 4,
    cultureHighlights: [
      'We Take Ownership (Taking personal pride and accountability in our work)',
      'We Deliver with Pride (Excellence in commercial execution and reliability)',
      'We Succeed Together (One Citi mindset across global borders)',
      'We Value Integrity (Strict adherence to fiduciary responsibility and compliance)'
    ],
    evaluationPhilosophy: 'Citi evaluates candidates for rock-solid software engineering fundamentals, multi-datacenter resiliency, and calm judgment during production incidents.',
    typicalTimeline: '3 to 5 weeks from initial screening to Superday decision',
    popularRoles: [
      'Technology Analyst (Citi Treasury & Trade Solutions)',
      'Assistant Vice President (AVP - Institutional Clients Group)',
      'Vice President (VP - Markets Quantitative Engineering)',
      'Global Payments & Real-Time Settlement Architect',
      'Risk Analytics & Regulatory Data Engineer',
    ],
    stages: [
      {
        id: 'citi-s1',
        stageNumber: 1,
        name: 'Stage 1: Automated Coding Challenge & Technical Screen',
        levelType: 'Online Assessment',
        format: '60-Minute Timed HackerRank Assessment + Video Screen',
        durationMinutes: 60,
        interviewerProfile: 'Automated Platform Calibration',
        coreCompetencies: ['Algorithms & Data Structures', 'SQL & Database Indexing', 'Problem Decomposition'],
        description: 'Foundational algorithmic coding and relational database queries assessing speed, accuracy, and code clarity.',
        typicalQuestions: [
          'Write an algorithm to detect circular transfer loops across accounts that may indicate layering or money laundering patterns.',
          'Optimize a SQL query aggregating billions of daily transactions partitioned by currency and country code.'
        ],
        tipsForSuccess: [
          'Focus on optimal time complexity and test edge cases thoroughly.',
          'Write clean, readable variable names and modular functions.'
        ],
        recommendedPersonaId: 'alex-mentor',
        recommendedTrack: 'Technical & Problem Solving',
      },
      {
        id: 'citi-s2',
        stageNumber: 2,
        name: 'Stage 2: Technical Phone Screen & Live Coding',
        levelType: 'Technical Round',
        format: '60-Minute Live Coding Session via CoderPad',
        durationMinutes: 60,
        interviewerProfile: 'Assistant Vice President / Tech Lead',
        coreCompetencies: ['OOP & Clean Architecture', 'Concurrency & Threading', 'API Design', 'Error Handling'],
        description: 'Interactive pair-programming probing object-oriented patterns, thread safety, and defensive programming.',
        typicalQuestions: [
          'Design an in-memory foreign exchange currency converter with real-time rate updates and thread-safe lock-free reads.',
          'Explain how you ensure idempotency in REST microservices handling non-reversible fund transfers.'
        ],
        tipsForSuccess: [
          'Explain concurrency guarantees and lock choices clearly.',
          'Demonstrate clear separation between business logic and transport layers.'
        ],
        recommendedPersonaId: 'morgan-chen',
        recommendedTrack: 'Technical & Problem Solving',
      },
      {
        id: 'citi-s3',
        stageNumber: 3,
        name: 'Stage 3: Superday — Global Treasury & High-Volume Payment Architecture',
        levelType: 'System Design',
        format: '60-Minute Distributed Systems Architecture Interview',
        durationMinutes: 60,
        interviewerProfile: 'Senior VP / Enterprise Architect',
        coreCompetencies: ['Global Financial Rails', 'Distributed Consensus & Replication', 'Disaster Recovery (Active-Active)', 'Kafka & Event Streaming'],
        description: 'Designing mission-critical global settlement architectures operating across varying international network boundaries.',
        typicalQuestions: [
          'Design a cross-border payments messaging backbone connecting 50 countries with ISO 20022 message compliance, handling 10,000 TPS with zero transaction loss during fiber optic line cuts.',
          'How do you manage eventual consistency in distributed account balances while preventing overdrafts?'
        ],
        tipsForSuccess: [
          'Emphasize audit logging, idempotency tokens, and distributed transaction compensation (Saga pattern).',
          'Discuss cross-region replication strategies and data residency compliance (GDPR, local banking acts).'
        ],
        recommendedPersonaId: 'sarah-vp',
        recommendedTrack: 'System Design & Architecture',
      },
      {
        id: 'citi-s4',
        stageNumber: 4,
        name: 'Stage 4: Superday — Senior Leadership, Governance & Fiduciary Alignment',
        levelType: 'Bar Raiser / Executive',
        format: '45-Minute Executive Behavioral Interview',
        durationMinutes: 45,
        interviewerProfile: 'Managing Director / Division Head',
        coreCompetencies: ['Fiduciary Mindset', 'Global Collaboration', 'Risk Mitigation', 'Executive Presence'],
        description: 'Assesses executive maturity, cross-cultural leadership, navigating complex regulatory landscapes, and personal integrity.',
        typicalQuestions: [
          'Tell me about a time you had to deliver difficult technical news to business leaders regarding a deadline slip or security finding. How did you handle the conversation?',
          'How do you foster an inclusive engineering culture when coordinating with teams across London, New York, Singapore, and Pune?'
        ],
        tipsForSuccess: [
          'Show genuine pride in building resilient infrastructure that protects global markets.',
          'Highlight past instances of cross-regional teamwork and ethical courage.'
        ],
        recommendedPersonaId: 'sarah-vp',
        recommendedTrack: 'Behavioral & Leadership',
      },
    ],
  },
  {
    companyName: 'Uber',
    normalizedName: 'uber',
    tagline: 'Hyper-scale geospatial dispatch, dynamic marketplace pricing & real-time routing',
    industry: 'Mobility, Delivery, Freight & Global Logistics',
    overview: 'Uber operates at unprecedented real-time scale, matching millions of riders and drivers using geohashing (H3), distributed stateful microservices, and dynamic marketplace algorithms. Their interview process evaluates algorithmic mastery, distributed system design at massive scale, clean machine coding, and alignment with Uber values.',
    totalStages: 4,
    cultureHighlights: [
      'Go Get It (Bring energy and drive to make things happen)',
      'Trip Over the Truth (Honesty and radical transparency over comfort)',
      'Stand for Safety (Prioritize rider and platform safety in every decision)',
      'Great Minds Don\'t Think Alike (Embrace cognitive diversity and rigorous debate)',
      'See the Forest and the Trees (Balance broad strategic vision with deep technical execution)'
    ],
    evaluationPhilosophy: 'Uber seeks engineers who can write clean, production-grade code quickly and design distributed systems that degrade gracefully during network partitions and flash crowds.',
    typicalTimeline: '3 to 5 weeks from initial screening to final onsite decision',
    popularRoles: [
      'Software Engineer I / II',
      'Senior Software Engineer (5A / 5B)',
      'Staff Software Engineer (Level 6)',
      'Marketplace & Dispatch Algorithms Engineer',
      'Autonomous Mobility & Maps Engineer',
      'Engineering Manager (Driver & Rider Tech)',
      'Product Manager (Pricing & Marketplace)',
    ],
    stages: [
      {
        id: 'uber-s1',
        stageNumber: 1,
        name: 'Stage 1: Automated Coding Assessment (CodeSignal / HackerRank)',
        levelType: 'Online Assessment',
        format: '70-Minute Timed CodeSignal Assessment',
        durationMinutes: 70,
        interviewerProfile: 'Automated Platform Calibration',
        coreCompetencies: ['Data Structures & Algorithms', 'Time Complexity Optimization', 'Edge Case Handling'],
        description: 'Timed assessment evaluating data structures (graphs, trees, two pointers) and clean coding execution.',
        typicalQuestions: [
          'Given a stream of driver locations and customer pickup points, compute closest matches within an expanding geohash boundary.',
          'Optimize a route itinerary to maximize driver earnings subject to shift time constraints.'
        ],
        tipsForSuccess: [
          'Prioritize code correctness and test for boundary conditions before submitting.',
          'Aim for clean O(n log n) or O(n) solutions.'
        ],
        recommendedPersonaId: 'alex-mentor',
        recommendedTrack: 'Technical & Problem Solving',
      },
      {
        id: 'uber-s2',
        stageNumber: 2,
        name: 'Stage 2: Technical Phone Screen',
        levelType: 'Technical Round',
        format: '60-Minute Live Coding Session via CoderPad',
        durationMinutes: 60,
        interviewerProfile: 'Uber Senior Software Engineer',
        coreCompetencies: ['Algorithms & Graph Theory', 'Concurrency', 'Clean Coding', 'Problem Decomposition'],
        description: 'Live interactive coding involving shortest-path, graph traversal, or complex data structure manipulation.',
        typicalQuestions: [
          'Implement a thread-safe rate limiter supporting sliding-window counter or token-bucket algorithms across multiple API keys.',
          'Given a directed graph of city transit routes with dynamic traffic delays, find the path of least delay.'
        ],
        tipsForSuccess: [
          'Think aloud and discuss algorithmic trade-offs before writing code.',
          'Test code manually with edge cases.'
        ],
        recommendedPersonaId: 'alex-mentor',
        recommendedTrack: 'Technical & Problem Solving',
      },
      {
        id: 'uber-s3',
        stageNumber: 3,
        name: 'Stage 3: The Virtual Onsite — Machine Coding & Geospatial Dispatch Architecture',
        levelType: 'System Design',
        format: '60-Minute Distributed Systems Architecture Round',
        durationMinutes: 60,
        interviewerProfile: 'Staff Software Engineer / Principal Architect',
        coreCompetencies: ['Geospatial Indexing (H3 / Geohash)', 'Real-Time Stateful Streaming (Kafka / Flink)', 'High Availability & Failover', 'Dynamic Surge Pricing'],
        description: 'Architecting Uber\'s real-time marketplace dispatch, rider matching, or dynamic trip pricing at global scale.',
        typicalQuestions: [
          'Design Uber\'s real-time ride matching and dispatch engine handling 100,000 requests/second with sub-second driver location updates using geospatial indexes (H3).',
          'How do you handle split-brain or network partitions between city datacenters without stranding riders or duplicate trip assignments?'
        ],
        tipsForSuccess: [
          'Dive deep into data storage choices: memory caches (Redis), geospatial indices, and persistent databases.',
          'Address bottlenecks, cache invalidation, and backpressure mechanisms.'
        ],
        recommendedPersonaId: 'sarah-vp',
        recommendedTrack: 'System Design & Architecture',
      },
      {
        id: 'uber-s4',
        stageNumber: 4,
        name: 'Stage 4: The Virtual Onsite — Engineering Principles & Bar Raiser Round',
        levelType: 'Bar Raiser / Executive',
        format: '45-Minute Behavioral & Values Interview',
        durationMinutes: 45,
        interviewerProfile: 'Engineering Manager or Independent Bar Raiser',
        coreCompetencies: ['Trip Over the Truth', 'Go Get It', 'Conflict Resolution', 'Cross-Functional Leadership'],
        description: 'Probes your leadership instincts, handling disagreements with data, learning from failures, and raising the bar for the team.',
        typicalQuestions: [
          'Tell me about a time you had to champion a difficult technical truth or call out an architectural flaw that others wanted to ignore.',
          'Describe a situation where you led a cross-functional project through severe ambiguity and conflicting priorities.'
        ],
        tipsForSuccess: [
          'Use the STAR framework and articulate measurable outcomes.',
          'Show humble self-awareness and focus on customer safety and driver experience.'
        ],
        recommendedPersonaId: 'morgan-chen',
        recommendedTrack: 'Behavioral & Leadership',
      },
    ],
  },
  {
    companyName: 'Airbnb',
    normalizedName: 'airbnb',
    tagline: 'World-class product craftsmanship, global travel search & authentic Core Values',
    industry: 'Hospitality, Travel Tech & Marketplace Platforms',
    overview: 'Airbnb is celebrated for exceptional design, thoughtful code architecture, and its world-famous Core Values interviews. Their technical loops evaluate elegant API design, distributed search indexing, booking consistency, and deep alignment with company values like "Be a Host".',
    totalStages: 4,
    cultureHighlights: [
      'Champion the Mission (Dedication to creating a world where anyone can belong anywhere)',
      'Be a Host (Care for others, demonstrate hospitality and empathy in all interactions)',
      'Be a \'Cereal\' Entrepreneur (Creativity, resourcefulness, and persistence in the face of constraints)',
      'Simplify (Focus on clarity, elegant minimalism, and product craftsmanship)'
    ],
    evaluationPhilosophy: 'At Airbnb, cultural fit carries equal weight to technical capability. You will face dedicated Core Values interviewers whose only job is to assess your character, empathy, and mission alignment.',
    typicalTimeline: '3 to 5 weeks from initial screen to final debrief',
    popularRoles: [
      'Software Engineer (L3 / L4)',
      'Senior Software Engineer (L5)',
      'Staff Software Engineer (L6)',
      'Trust & Safety Machine Learning Engineer',
      'Search, Ranking & Dynamic Pricing Engineer',
      'Guest & Host Experience Frontend Engineer',
      'Engineering Manager',
    ],
    stages: [
      {
        id: 'abnb-s1',
        stageNumber: 1,
        name: 'Stage 1: HackerRank Coding Assessment',
        levelType: 'Online Assessment',
        format: '60-Minute Timed HackerRank Assessment',
        durationMinutes: 60,
        interviewerProfile: 'Automated Evaluation Platform',
        coreCompetencies: ['Data Structures & Algorithms', 'Clean Code', 'Modular Thinking'],
        description: 'Practical algorithmic problem solving reflecting real-world engineering scenarios (e.g. pagination, calendar interval overlap).',
        typicalQuestions: [
          'Given an array of listing availability intervals, merge overlapping bookings and find the largest contiguous open booking window.',
          'Implement a paginated search result iterator that guarantees unique listing display across host tiers.'
        ],
        tipsForSuccess: [
          'Write readable code with descriptive variable names.',
          'Test boundary conditions thoroughly (empty intervals, edge-to-edge bookings).'
        ],
        recommendedPersonaId: 'alex-mentor',
        recommendedTrack: 'Technical & Problem Solving',
      },
      {
        id: 'abnb-s2',
        stageNumber: 2,
        name: 'Stage 2: Technical Phone Screen',
        levelType: 'Technical Round',
        format: '60-Minute Live Coding Session via CoderPad',
        durationMinutes: 60,
        interviewerProfile: 'Airbnb Senior Software Engineer',
        coreCompetencies: ['Clean Architecture', 'API Design', 'Data Modeling', 'Algorithms'],
        description: 'Hands-on coding session focusing on practical software craftsmanship, modular helper methods, and testability.',
        typicalQuestions: [
          'Design an in-memory calendar booking system that supports check-in/check-out reservation requests with concurrency checks.',
          'Implement a boggle-style word search or string similarity match for listing titles.'
        ],
        tipsForSuccess: [
          'Demonstrate clear object-oriented or functional separation of concerns.',
          'Discuss time complexity and write unit tests.'
        ],
        recommendedPersonaId: 'alex-mentor',
        recommendedTrack: 'Technical & Problem Solving',
      },
      {
        id: 'abnb-s3',
        stageNumber: 3,
        name: 'Stage 3: System Design & Search / Booking Consistency Architecture',
        levelType: 'System Design',
        format: '60-Minute Distributed Systems Architecture Interview',
        durationMinutes: 60,
        interviewerProfile: 'Staff Software Engineer / Architecture Lead',
        coreCompetencies: ['Distributed Search & Ranking', 'Transactional Booking Consistency', 'Caching & Invalidation', 'Availability & Disaster Recovery'],
        description: 'Architecting Airbnb\'s search engine, reservation inventory system, or trust & safety review pipeline.',
        typicalQuestions: [
          'Design Airbnb\'s global listing search and ranking engine supporting complex filters (amenities, dates, geo-radius) with sub-100ms response times for 50M listings.',
          'How do you prevent double-booking of a single listing during instantaneous concurrent checkout attempts across two different devices?'
        ],
        tipsForSuccess: [
          'Discuss database choices (relational for ACID bookings vs Elasticsearch for rich search).',
          'Explain optimistic locking, idempotency, and distributed locking mechanisms (e.g. Redlock).'
        ],
        recommendedPersonaId: 'sarah-vp',
        recommendedTrack: 'System Design & Architecture',
      },
      {
        id: 'abnb-s4',
        stageNumber: 4,
        name: 'Stage 4: Core Values Interview ("Be a Host" & "Champion the Mission")',
        levelType: 'Behavioral & Culture',
        format: '45-Minute Dedicated Core Values Interview (Conducted by Trained Core Values Interviewer)',
        durationMinutes: 45,
        interviewerProfile: 'Trained Airbnb Core Values Ambassador (Non-Engineering or Cross-Functional)',
        coreCompetencies: ['Be a Host (Empathy & Hospitality)', 'Champion the Mission', 'Be a Cereal Entrepreneur', 'Simplify'],
        description: 'The legendary Airbnb Core Values interview. Pure focus on your character, humility, how you treat others, and alignment with the mission of belonging.',
        typicalQuestions: [
          'Tell me about a time you went out of your way to make someone else feel welcome, supported, or included.',
          'Describe a significant setback or failure in your career. What did you learn about yourself, and how did it change your perspective?'
        ],
        tipsForSuccess: [
          'Be completely authentic, humble, and vulnerable—do not give scripted "humblebrag" answers.',
          'Demonstrate genuine empathy, teamwork, and love for creating thoughtful experiences.'
        ],
        recommendedPersonaId: 'morgan-chen',
        recommendedTrack: 'Behavioral & Leadership',
      },
    ],
  },
  {
    companyName: 'Salesforce',
    normalizedName: 'salesforce',
    tagline: 'Enterprise multi-tenant cloud architectures, autonomous AI agents & Ohana values',
    industry: 'Enterprise Cloud SaaS, CRM & AI Agentforce',
    overview: 'Salesforce powers global CRM, data clouds, and autonomous enterprise AI agents (Agentforce). Their hiring loops probe multi-tenant database virtualization, row-level security, high-scale distributed systems, and alignment with the core values of Trust, Customer Success, Innovation, and Equality.',
    totalStages: 4,
    cultureHighlights: [
      'Trust (Our #1 value; unwavering security, reliability, and transparency)',
      'Customer Success (When our customers succeed, we succeed)',
      'Innovation (Continuously delivering trailblazing cloud and AI capabilities)',
      'Equality (Creating an inclusive, equitable workplace for all Ohana members)'
    ],
    evaluationPhilosophy: 'Salesforce evaluates candidates for robust enterprise architecture design, multi-tenant isolation, clean coding, and ethical teamwork.',
    typicalTimeline: '3 to 5 weeks from initial screening to offer decision',
    popularRoles: [
      'Member of Technical Staff (MTS)',
      'Senior Member of Technical Staff (SMTS)',
      'Lead / Principal MTS',
      'Enterprise Cloud Platform Architect',
      'Product Manager (Agentforce & AI)',
      'Engineering Manager (Data Cloud)',
    ],
    stages: [
      {
        id: 'crm-s1',
        stageNumber: 1,
        name: 'Stage 1: HackerRank Coding Challenge',
        levelType: 'Online Assessment',
        format: '60-Minute Timed HackerRank Assessment',
        durationMinutes: 60,
        interviewerProfile: 'Automated Platform Calibration',
        coreCompetencies: ['Data Structures & Algorithms', 'Time Complexity', 'Clean Code'],
        description: 'Timed assessment evaluating data structures (hash maps, trees, heaps, dynamic programming) and code correctness.',
        typicalQuestions: [
          'Given a stream of CRM contact activity logs, calculate real-time lead score aggregations within a moving window.',
          'Implement an algorithm to validate hierarchical tenant permissions across nested organizational units.'
        ],
        tipsForSuccess: [
          'Ensure all hidden test cases pass within optimal asymptotic time bounds.',
          'Write clean, well-structured code.'
        ],
        recommendedPersonaId: 'alex-mentor',
        recommendedTrack: 'Technical & Problem Solving',
      },
      {
        id: 'crm-s2',
        stageNumber: 2,
        name: 'Stage 2: Technical Phone Screen',
        levelType: 'Technical Round',
        format: '60-Minute Live Coding Session via HackerRank / Zoom',
        durationMinutes: 60,
        interviewerProfile: 'Senior Member of Technical Staff (SMTS)',
        coreCompetencies: ['Object-Oriented Design', 'Clean Code Principles', 'Data Structures', 'Algorithmic Optimization'],
        description: 'Live interactive problem solving focusing on clean object-oriented architecture, modularity, and error handling.',
        typicalQuestions: [
          'Design an in-memory key-value store supporting transactions with commit and rollback capabilities.',
          'Implement an LRU cache with expiration and multi-tenant key namespaces.'
        ],
        tipsForSuccess: [
          'Communicate continuously and explain design choices before writing code.',
          'Demonstrate clear separation of concerns.'
        ],
        recommendedPersonaId: 'alex-mentor',
        recommendedTrack: 'Technical & Problem Solving',
      },
      {
        id: 'crm-s3',
        stageNumber: 3,
        name: 'Stage 3: System Design & Enterprise Multi-Tenant Architecture',
        levelType: 'System Design',
        format: '60-Minute Enterprise Systems Architecture Interview',
        durationMinutes: 60,
        interviewerProfile: 'Principal Architect / Director of Engineering',
        coreCompetencies: ['Multi-Tenant Database Virtualization', 'Row-Level Tenant Isolation', 'Metadata-Driven Engines', 'High Availability & Scalability'],
        description: 'Architecting high-scale enterprise SaaS platforms with strict tenant data isolation, metadata compilation, and zero-downtime upgrades.',
        typicalQuestions: [
          'Design a multi-tenant cloud CRM database engine supporting custom user-defined schemas and fields without requiring table schema alterations in underlying relational databases.',
          'How do you design an autonomous AI agent event processing system handling millions of webhook triggers per minute with guaranteed delivery?'
        ],
        tipsForSuccess: [
          'Highlight tenant isolation, row-level security, and rate limiting to prevent "noisy neighbor" resource starvation.',
          'Discuss metadata caching, partition strategies, and disaster recovery.'
        ],
        recommendedPersonaId: 'sarah-vp',
        recommendedTrack: 'System Design & Architecture',
      },
      {
        id: 'crm-s4',
        stageNumber: 4,
        name: 'Stage 4: Ohana Culture & Engineering Leadership Round',
        levelType: 'Bar Raiser / Executive',
        format: '45-Minute Behavioral & Values Evaluation',
        durationMinutes: 45,
        interviewerProfile: 'Engineering Director / VP',
        coreCompetencies: ['Trust & Ethics', 'Customer Success Orientation', 'Equality & Inclusion', 'Collaboration'],
        description: 'Evaluates your leadership style, handling disagreements, commitment to customer trust, and upholding Ohana culture.',
        typicalQuestions: [
          'Tell me about a time you put customer trust and security ahead of a product feature deadline.',
          'How do you build consensus across distributed teams when opinions on architecture differ widely?'
        ],
        tipsForSuccess: [
          'Use the STAR framework and show genuine alignment with Trust, Innovation, and Equality.',
          'Highlight mentorship and fostering an inclusive environment.'
        ],
        recommendedPersonaId: 'morgan-chen',
        recommendedTrack: 'Behavioral & Leadership',
      },
    ],
  },
  {
    companyName: 'Palantir',
    normalizedName: 'palantir',
    tagline: 'Mission-critical enterprise intelligence, graph pipelines & the legendary Decomp round',
    industry: 'Enterprise Intelligence, Defense & Data Platforms',
    overview: 'Palantir builds foundational data integration platforms (Foundry, Gotham, AIP) for defense, intelligence, healthcare, and enterprise. Their interview process is renowned for its rigor, featuring the unique "Decomposition" (Decomp) interview where candidates break down vague, massive real-world problems live.',
    totalStages: 4,
    cultureHighlights: [
      'Mission Matters (Deploying technology where the stakes are highest)',
      'Substance over Appearance (Intellectual honesty, zero tolerance for superficial answers)',
      'Flat Hierarchy (The best idea wins regardless of title or tenure)',
      'Continuous Ownership (Engineers own outcomes from code to client frontline deployment)'
    ],
    evaluationPhilosophy: 'Palantir values exceptional problem decomposition, deep computer science fundamentals, intellectual agility under ambiguity, and dedication to mission-critical outcomes.',
    typicalTimeline: '3 to 5 weeks from initial screening to onsite committee review',
    popularRoles: [
      'Forward Deployed Software Engineer (FDSE)',
      'Software Engineer (Core Foundry / Gotham)',
      'Deployment Strategist / Technical Lead',
      'Data Platform & Graph Systems Engineer',
      'Infrastructure & Security Operations Engineer',
    ],
    stages: [
      {
        id: 'pltr-s1',
        stageNumber: 1,
        name: 'Stage 1: Karat Technical Coding Screen / HackerRank',
        levelType: 'Online Assessment',
        format: '60-Minute Live Coding Interview via Karat Platform',
        durationMinutes: 60,
        interviewerProfile: 'Karat Senior Interview Engineer',
        coreCompetencies: ['Data Structures & Algorithms', 'Fast Accurate Coding', 'Complexity Analysis'],
        description: 'High-speed problem solving testing data structures, matrix traversals, graph algorithms, and clean debugging.',
        typicalQuestions: [
          'Given an undirected graph of user interactions and suspicious entity nodes, identify all connected components containing more than k flagged accounts.',
          'Implement an access control evaluation matrix checking inherited roles and clearance levels.'
        ],
        tipsForSuccess: [
          'Aim to solve 2-3 progressive problems within the 60-minute window.',
          'Test edge cases proactively and state time/space complexity explicitly.'
        ],
        recommendedPersonaId: 'alex-mentor',
        recommendedTrack: 'Technical & Problem Solving',
      },
      {
        id: 'pltr-s2',
        stageNumber: 2,
        name: 'Stage 2: The Decomp Round — System Decomposition Under Ambiguity',
        levelType: 'System Design',
        format: '60-Minute Interactive Problem Decomposition Session',
        durationMinutes: 60,
        interviewerProfile: 'Palantir Lead Architect / Forward Deployed Tech Lead',
        coreCompetencies: ['Problem Decomposition', 'First-Principles Structuring', 'Handling Ambiguity', 'Data Modeling'],
        description: 'Palantir\'s signature interview round. You are presented with a complex, open-ended real-world problem (e.g. tracking vaccine supply chain fraud or optimizing crisis response logistics) and must decompose it from messy data to operational systems.',
        typicalQuestions: [
          'Decomp Prompt: A humanitarian coalition needs to coordinate relief supplies across disaster zones with unreliable telecom networks, corrupt local distribution, and multiple NGO data formats. How do you model the entities, resolve identity conflicts, and build an operational tracking platform?',
          'How do you design a data lineage tracking system that can prove the provenance of every data point across a multi-million-node knowledge graph?'
        ],
        tipsForSuccess: [
          'Do not jump into writing code or databases immediately. Clarify stakeholders, entity schemas, data ingress, and failure modes.',
          'Structure your approach: 1. Core Entities & Relationships -> 2. Ingestion & Transformation -> 3. Validation & Provenance -> 4. Operational Interfaces.'
        ],
        recommendedPersonaId: 'sarah-vp',
        recommendedTrack: 'System Design & Architecture',
      },
      {
        id: 'pltr-s3',
        stageNumber: 3,
        name: 'Stage 3: Technical Problem Solving & Graph Data Modeling',
        levelType: 'Technical Round',
        format: '60-Minute Live Algorithmic Session with Core Palantir Engineer',
        durationMinutes: 60,
        interviewerProfile: 'Foundry Core Infrastructure Senior Engineer',
        coreCompetencies: ['Graph Algorithms', 'Dynamic Programming', 'Scalable Data Structures', 'Debugging'],
        description: 'In-depth algorithmic problem solving probing graphs, trees, DFS/BFS traversals, topological sorting, and data integrity.',
        typicalQuestions: [
          'Design an algorithm to find the shortest dependency resolution order for complex analytical transformations in Foundry with cycle detection and parallel execution branches.',
          'Implement an ontology relationship index supporting rapid bidirectional graph queries.'
        ],
        tipsForSuccess: [
          'Communicate your algorithm clearly and explain why specific data structures were chosen.',
          'Address concurrency and memory overhead.'
        ],
        recommendedPersonaId: 'alex-mentor',
        recommendedTrack: 'Technical & Problem Solving',
      },
      {
        id: 'pltr-s4',
        stageNumber: 4,
        name: 'Stage 4: Palantir Culture, Mission & Ethical Philosophy Round',
        levelType: 'Behavioral & Culture',
        format: '45-Minute Cultural & Mission Alignment Interview',
        durationMinutes: 45,
        interviewerProfile: 'Senior Engineering Director / Long-Tenured Palantir Leader',
        coreCompetencies: ['Mission Orientation', 'Intellectual Rigor', 'Ethical Critical Thinking', 'Ownership'],
        description: 'Probes why you want to work on mission-critical software, how you navigate ethical complexity, your resilience, and teamwork under pressure.',
        typicalQuestions: [
          'Why Palantir, and how do you think about the ethical implications of building software used in national security, defense, and healthcare?',
          'Tell me about a time you took a contrarian technical position based on data and had to defend it in front of senior leaders.'
        ],
        tipsForSuccess: [
          'Be thoughtful and honest; demonstrate that you have researched Palantir\'s mission and products.',
          'Show intellectual courage, openness to feedback, and passion for making real-world impact.'
        ],
        recommendedPersonaId: 'morgan-chen',
        recommendedTrack: 'Behavioral & Leadership',
      },
    ],
  },
  {
    companyName: 'Tesla',
    normalizedName: 'tesla',
    tagline: 'Autopilot vision, extreme high-speed execution & first-principles engineering',
    industry: 'Electric Vehicles, Autopilot AI, Robotics & Energy',
    overview: 'Tesla builds cutting-edge full self-driving (FSD) neural networks, vehicle firmware, humanoid robotics (Optimus), and massive battery energy storage systems (Megapack). Tesla\'s interview process is fast-paced, highly technical, and centered on first-principles physics, extreme ownership, and relentless work ethic.',
    totalStages: 4,
    cultureHighlights: [
      'First-Principles Thinking (Reason from fundamental physics and hardware realities)',
      'Move Incredibly Fast (Test, iterate, and deploy at lightning velocity)',
      'Extreme Ownership (Take responsibility for the entire vehicle/software stack)',
      'No Bureaucracy (Zero tolerance for unnecessary meetings or administrative bloat)'
    ],
    evaluationPhilosophy: 'Tesla looks for engineers who can roll up their sleeves and fix broken systems under extreme pressure. Hands-on coding, hardware-software integration, and first-principles mastery are prioritized over theoretical credentials.',
    typicalTimeline: '2 to 4 weeks from recruiter reach-out to engineering offer',
    popularRoles: [
      'Autopilot & Computer Vision Software Engineer',
      'Embedded Firmware & Low-Level Systems Engineer',
      'Vehicle Software Architecture Engineer',
      'Energy Platforms & Megapack Systems Engineer',
      'Staff Distributed Systems Engineer',
    ],
    stages: [
      {
        id: 'tsla-s1',
        stageNumber: 1,
        name: 'Stage 1: Recruiter & Technical Screening',
        levelType: 'Phone Screen',
        format: '30-45 Minute Technical Screening Call',
        durationMinutes: 45,
        interviewerProfile: 'Technical Recruiter & Senior Team Engineer',
        coreCompetencies: ['Background Walkthrough', 'C/C++ & Python Proficiency', 'First-Principles Understanding'],
        description: 'Evaluates your technical background, real-world hands-on project accomplishments, and motivation to thrive in Tesla\'s intense engineering environment.',
        typicalQuestions: [
          'Walk me through the most technically challenging hardware or software system you designed from scratch. What broke first and how did you fix it?',
          'Why Tesla specifically, and how do you handle high-pressure environments with tight deployment cycles?'
        ],
        tipsForSuccess: [
          'Focus on concrete engineering details rather than high-level management talk.',
          'Demonstrate passion for Tesla\'s mission in sustainable energy and autonomous robotics.'
        ],
        recommendedPersonaId: 'alex-mentor',
        recommendedTrack: 'Technical & Behavioral Mix',
      },
      {
        id: 'tsla-s2',
        stageNumber: 2,
        name: 'Stage 2: Technical Phone Screen & Low-Level Systems',
        levelType: 'Technical Round',
        format: '60-Minute Live Coding Session via CoderPad',
        durationMinutes: 60,
        interviewerProfile: 'Senior Firmware / Autopilot Software Engineer',
        coreCompetencies: ['C/C++ Systems Programming', 'Concurrency & RTOS', 'Memory Constraints & Pointers', 'Debugging'],
        description: 'Rigorous coding problem focusing on low-level memory management, multithreaded synchronization, bit manipulation, or algorithm optimization.',
        typicalQuestions: [
          'Implement a thread-safe ring buffer for streaming sensor data from radar/cameras in C++ with zero dynamic heap allocations.',
          'Explain how you would diagnose and eliminate a priority inversion deadlock in an embedded real-time operating system (RTOS).'
        ],
        tipsForSuccess: [
          'Write clean, efficient C++ code avoiding dynamic memory allocations where possible.',
          'Discuss hardware constraints (CPU cycles, memory footprint, cache latency) proactively.'
        ],
        recommendedPersonaId: 'morgan-chen',
        recommendedTrack: 'Technical & Problem Solving',
      },
      {
        id: 'tsla-s3',
        stageNumber: 3,
        name: 'Stage 3: Technical Presentation & Architecture Deep-Dive',
        levelType: 'System Design',
        format: '60-90 Minute Technical Presentation to Engineering Panel',
        durationMinutes: 90,
        interviewerProfile: 'Panel of 4-6 Senior Staff Engineers & Engineering Manager',
        coreCompetencies: ['Technical Presentation Mastery', 'Defending Design Decisions', 'System Architecture', 'First-Principles Problem Solving'],
        description: 'The defining Tesla interview step: you present a 30-45 minute slide deck on a past complex engineering project you spearheaded, followed by intense grilling from Tesla\'s senior engineering panel.',
        typicalQuestions: [
          'Why did you choose this architecture over a simpler alternative? What was the exact bottleneck in terms of latency or bandwidth?',
          'If we deployed your system on the vehicle\'s HW4 compute cluster with power constraints of 150W, how would it fail and how would you redesign it?'
        ],
        tipsForSuccess: [
          'Know every single calculation, line of code, and architectural trade-off inside out.',
          'Never guess if you do not know an answer—reason through it aloud from first principles.'
        ],
        recommendedPersonaId: 'sarah-vp',
        recommendedTrack: 'System Design & Architecture',
      },
      {
        id: 'tsla-s4',
        stageNumber: 4,
        name: 'Stage 4: High-Velocity Execution & First-Principles Leadership Round',
        levelType: 'Bar Raiser / Executive',
        format: '45-Minute Engineering Director / VP Interview',
        durationMinutes: 45,
        interviewerProfile: 'Director of Autopilot / Vehicle Software VP',
        coreCompetencies: ['Speed of Execution', 'Intellectual Honesty', 'First-Principles Mindset', 'Extreme Ownership'],
        description: 'Evaluates your stamina, ability to cut through red tape, passion for rapid prototyping, and cultural alignment with Tesla.',
        typicalQuestions: [
          'Tell me about a time you worked around the clock to diagnose a critical production or launch defect. What was the root cause?',
          'Describe a scenario where you discarded standard industry practice because it was too slow or inefficient, and built a better solution.'
        ],
        tipsForSuccess: [
          'Demonstrate relentless grit, urgency, and pride in engineering craftsmanship.',
          'Show that you are comfortable working directly with hardware and taking personal responsibility.'
        ],
        recommendedPersonaId: 'morgan-chen',
        recommendedTrack: 'Behavioral & Leadership',
      },
    ],
  },
];

export const POPULAR_COMPANIES = [
  'Amazon',
  'Google',
  'Meta',
  'Microsoft',
  'Apple',
  'Netflix',
  'Nvidia',
  'JPMorgan Chase',
  'Goldman Sachs',
  'Morgan Stanley',
  'Bank of America',
  'Barclays',
  'Capital One',
  'Citigroup',
  'Stripe',
  'Uber',
  'Airbnb',
  'Salesforce',
  'Palantir',
  'Tesla'
];

export const POPULAR_ROLES = [
  'Software Development Engineer (SDE II)',
  'Senior Software Engineer',
  'Engineering Manager',
  'Product Manager (L5/L6)',
  'System Architect',
  'Staff Data Scientist / AI Engineer',
  'DevOps / Site Reliability Engineer (SRE)'
];

export const BANKING_ROLES = [
  'Technology Analyst (Software Engineering Program)',
  'Associate Software Engineer (Core Banking)',
  'Vice President (VP - Architecture & Engineering)',
  'Quantitative Developer (Trading & Pricing Models)',
  'Low-Latency C++ / Java Systems Developer',
  'Financial Data Platform & Regulatory Compliance Architect',
  'Cloud Infrastructure & DevSecOps Engineer (Financial Cloud)',
  'Product Manager (Payments, Digital Banking & Wealth)',
];

export function detectCompanyIndustry(name: string): {
  industry: string;
  category: 'banking' | 'tech' | 'consulting' | 'healthcare' | 'cybersecurity' | 'hardware' | 'general';
} {
  if (!name) return { industry: 'Technology & Enterprise Scale', category: 'tech' };
  const n = name.trim().toLowerCase();

  // 1. Banking, Finance, Quant, Trading, Payments
  const bankKeywords = [
    'bank', 'banking', 'chase', 'jpmorgan', 'jp morgan', 'morgan stanley', 'goldman', 'bofa', 
    'barclays', 'citi', 'citigroup', 'citibank', 'wells fargo', 'capital one', 
    'fidelity', 'blackrock', 'vanguard', 'deutsche', 'ubs', 'credit suisse', 'hsbc', 
    'standard chartered', 'pnc', 'us bank', 'schwab', 'charles schwab', 'mellon', 'state street', 
    'nomura', 'macquarie', 'rbc', 'td bank', 'scotiabank', 'bmo', 'santander', 
    'bnp paribas', 'societe generale', 'ing', 'mizuho', 'hdfc', 'icici', 'kotak', 
    'axis', 'sbi', 'quant', 'trading', 'hedge', 'citadel', 'two sigma', 'jane street', 
    'de shaw', 'point72', 'jump trading', 'fintech', 'revolut', 'monzo', 'chime', 
    'plaid', 'robinhood', 'coinbase', 'financial', 'wealth', 'capital', 'securities'
  ];
  if (bankKeywords.some((k) => n.includes(k))) {
    return { industry: 'Investment Banking, Capital Markets & Global Financial Services', category: 'banking' };
  }

  // 2. Consulting & Strategy
  const consultKeywords = [
    'mckinsey', 'bcg', 'boston consulting', 'bain', 'deloitte', 'pwc', 
    'pricewaterhousecoopers', 'ey', 'ernst', 'kpmg', 'accenture', 'oliver wyman', 'kearney', 'consulting'
  ];
  if (consultKeywords.some((k) => n.includes(k))) {
    return { industry: 'Management, Technology & Strategy Consulting', category: 'consulting' };
  }

  // 3. Healthcare & Biotech
  const healthKeywords = [
    'health', 'pfizer', 'moderna', 'johnson', 'j&j', 'roche', 'novartis', 'merck', 
    'astrazeneca', 'gilead', 'abbvie', 'amgen', 'unitedhealth', 'cvs', 'optum', 
    'cigna', 'humana', 'medtronic', 'biogen', 'genentech', 'sanofi', 'bayer', 'epic systems'
  ];
  if (healthKeywords.some((k) => n.includes(k))) {
    return { industry: 'Healthcare, Life Sciences & Biomedical Systems', category: 'healthcare' };
  }

  // 4. Cybersecurity
  const secKeywords = [
    'cyber', 'security', 'palo alto', 'crowdstrike', 'fortinet', 'zscaler', 
    'cloudflare', 'okta', 'checkpoint', 'sentinelone', 'splunk', 'fireeye', 'mandiant'
  ];
  if (secKeywords.some((k) => n.includes(k))) {
    return { industry: 'Enterprise Cybersecurity & Threat Intelligence', category: 'cybersecurity' };
  }

  // 5. Hardware & Semiconductor
  const hwKeywords = [
    'nvidia', 'amd', 'intel', 'qualcomm', 'broadcom', 'arm', 'tsmc', 'asml', 
    'texas instruments', 'micron', 'nxp', 'applied materials', 'semiconductor', 'hardware', 'chip'
  ];
  if (hwKeywords.some((k) => n.includes(k))) {
    return { industry: 'Semiconductors, Accelerated Computing & Hardware Architecture', category: 'hardware' };
  }

  return { industry: 'Technology & Enterprise Scale', category: 'tech' };
}

export function generateBankingPipeline(companyName: string, roleTitle = 'Associate Software Engineer'): CompanyHiringPipeline {
  const company = companyName.trim() || 'Premier Global Bank';
  const roles = getCompanyRoles(company, 'Investment Banking');

  return {
    companyName: company,
    normalizedName: company.toLowerCase().replace(/[^a-z0-9]/g, ''),
    tagline: `High-concurrency financial engineering, transactional resilience & fiduciary standards at ${company}`,
    industry: 'Investment Banking, Capital Markets & Global Financial Services',
    overview: `${company} operates under zero-tolerance tolerances for downtime, double-spending, and compliance failure. Their multi-stage engineering loop evaluates algorithmic problem solving under pressure, low-level concurrency (Java, C++, Python, SQL), ACID transaction guarantees, and uncompromising ethical stewardship.`,
    totalStages: 4,
    cultureHighlights: [
      'Client First & Uncompromising Fiduciary Integrity',
      'Zero-Downtime Resilience & Transactional Auditability',
      'Strict Regulatory Compliance, Risk Mitigation & Data Privacy',
      'High-Stakes Composure, Team Partnership & Ownership'
    ],
    evaluationPhilosophy: `${company} evaluates candidates for technical depth, fault-tolerant system design, and fiduciary maturity. In banking tech, an unhandled race condition can cause millions in financial losses or regulatory sanctions. Candidates who understand transaction isolation, idempotency, and disaster recovery pass the bar.`,
    typicalTimeline: '3 to 5 weeks from initial screening / HireVue to final Superday committee decision',
    popularRoles: roles,
    stages: [
      {
        id: `${company.toLowerCase()}-s1`,
        stageNumber: 1,
        name: 'Stage 1: Online Coding Challenge & HireVue Video Screen',
        levelType: 'Online Assessment',
        format: '60-Minute Timed HackerRank / CodeSignal + 3 Recorded Video Questions',
        durationMinutes: 60,
        interviewerProfile: 'Automated Platform & Talent Acquisition Calibration',
        coreCompetencies: ['Data Structures & Algorithms', 'Big-O Efficiency', 'STAR Behavioral Clarity', 'Fiduciary Ethics'],
        description: `Initial automated screening evaluating foundational data structures and asynchronous video answers. Tests speed, algorithmic accuracy under time constraints, and structured communication.`,
        typicalQuestions: [
          'Given an array of customer transaction amounts and timestamps, detect anomalous rapid withdrawals exceeding a rolling-window limit.',
          'HireVue Prompt: Describe a situation where you had to adhere strictly to a policy, security requirement, or compliance standard even when taking a shortcut would have saved time.'
        ],
        tipsForSuccess: [
          'Ensure all hidden edge test cases pass with optimal O(n) or O(n log n) time and space complexity.',
          'For HireVue questions, speak clearly directly into the camera using the STAR method with concrete personal ownership.'
        ],
        recommendedPersonaId: 'alex-mentor',
        recommendedTrack: 'Technical & Behavioral Mix',
      },
      {
        id: `${company.toLowerCase()}-s2`,
        stageNumber: 2,
        name: 'Stage 2: Technical Phone Screen & Live Code Pair',
        levelType: 'Technical Round',
        format: '45-60 Minute Live Pair-Coding via CoderPad',
        durationMinutes: 60,
        interviewerProfile: 'Vice President (VP) / Senior Technical Lead from Banking Line of Business',
        coreCompetencies: ['Multithreading & Concurrency', 'OOP & Design Patterns', 'SQL & Transaction Isolation', 'Memory Management'],
        description: `Live interactive coding round probing low-level mechanics, synchronization, deadlock avoidance, and clean architectural design in languages such as Java, C++, Python, or C#.`,
        typicalQuestions: [
          'Implement a thread-safe in-memory order matching cache or LRU cache with concurrent read/write locks.',
          'Explain the practical differences between optimistic locking and pessimistic locking, and how isolation levels (Read Committed vs Serializable) prevent dirty reads and phantom reads in banking databases.'
        ],
        tipsForSuccess: [
          'Articulate thread-safety guarantees proactively (atomic operations, mutexes, condition variables).',
          'Highlight error handling, boundary validation, and defensive programming practices.'
        ],
        recommendedPersonaId: 'morgan-chen',
        recommendedTrack: 'Technical & Problem Solving',
      },
      {
        id: `${company.toLowerCase()}-s3`,
        stageNumber: 3,
        name: 'Stage 3: The Superday — Financial Systems Architecture & Transactional Resiliency',
        levelType: 'System Design',
        format: '60-Minute Distributed Architecture & Data Integrity Round',
        durationMinutes: 60,
        interviewerProfile: 'Principal Architect / Executive Director',
        coreCompetencies: ['Double-Entry Ledger Design', 'Idempotency Keys', 'Event Sourcing & Kafka Streams', 'Disaster Recovery & Multi-Region Consistency'],
        description: `Designing mission-critical distributed financial systems capable of processing high-throughput transactions with zero data loss and sub-millisecond auditability.`,
        typicalQuestions: [
          `Design an end-to-end peer-to-peer money movement and settlement engine at ${company} handling 25,000 TPS with strict idempotency and zero double-spending under network partition.`,
          'How do you handle asynchronous reconciliation when external payment rails (SWIFT, Fedwire, ACH) timeout or return indeterminate status codes?'
        ],
        tipsForSuccess: [
          'Always start with data integrity: establish double-entry bookkeeping schemas, unique idempotency keys, and transactional outbox patterns.',
          'Discuss distributed consensus and why eventual consistency must be paired with compensating transactions (Saga pattern).'
        ],
        recommendedPersonaId: 'sarah-vp',
        recommendedTrack: 'System Design & Architecture',
      },
      {
        id: `${company.toLowerCase()}-s4`,
        stageNumber: 4,
        name: 'Stage 4: The Superday — Managing Director Behavioral, Risk & Ethical Governance Round',
        levelType: 'Bar Raiser / Executive',
        format: '45-Minute Executive Leadership & Values Interview',
        durationMinutes: 45,
        interviewerProfile: 'Managing Director (MD) / Head of Technology Division',
        coreCompetencies: ['Regulatory Awareness & Ethics', 'Client Service Dedication', 'Crisis & Outage Management', 'Cross-Functional Collaboration'],
        description: `Final leadership evaluation assessing executive presence, fiduciary responsibility, resilience under market volatility, and long-term team stewardship.`,
        typicalQuestions: [
          'Tell me about a time you identified a critical flaw, security vulnerability, or data discrepancy in production. Walk me step-by-step through how you communicated the risk to leadership and remediated it.',
          'Describe a scenario where business trading desks pressured engineering to release a feature immediately, but quality or compliance checks had not yet finished. How did you handle the conflict?'
        ],
        tipsForSuccess: [
          'Exhibit unwavering personal accountability—never deflect blame onto junior peers or third-party vendors.',
          'Demonstrate respect for risk officers, compliance mandates, and customer data privacy.'
        ],
        recommendedPersonaId: 'morgan-chen',
        recommendedTrack: 'Behavioral & Leadership',
      },
    ],
  };
}

export function getCompanyRoles(companyName?: string, industry?: string): string[] {
  if (!companyName) return POPULAR_ROLES;
  const clean = companyName.trim().toLowerCase();

  // 1. Check exact key or match in COMPANY_SPECIFIC_ROLES
  for (const [key, roles] of Object.entries(COMPANY_SPECIFIC_ROLES)) {
    if (key.toLowerCase() === clean || clean.includes(key.toLowerCase()) || key.toLowerCase().includes(clean)) {
      return roles;
    }
  }

  // 2. Check preset pipelines
  const preset = PRESET_COMPANY_PIPELINES.find(
    (p) => p.normalizedName === clean || p.companyName.toLowerCase().includes(clean) || clean.includes(p.normalizedName)
  );
  if (preset && preset.popularRoles && preset.popularRoles.length > 0) {
    return preset.popularRoles;
  }

  // 3. Smart Industry Detection
  const detected = detectCompanyIndustry(companyName);
  const ind = (industry || detected.industry).toLowerCase();

  if (detected.category === 'banking' || ind.includes('financ') || ind.includes('bank') || ind.includes('quant') || ind.includes('trading')) {
    return [
      `Technology Analyst (Software Engineering)`,
      `Associate Software Engineer (${companyName})`,
      `Vice President (VP - Architecture & Engineering)`,
      `Quantitative Developer (Pricing & Risk Modeling)`,
      `Low-Latency C++ / Java Systems Developer`,
      `Financial Data Platform & Regulatory Architect`,
      `Cloud Infrastructure & DevSecOps Engineer`,
      `Product Manager (Digital Banking & Payments)`,
    ];
  }

  if (detected.category === 'consulting' || ind.includes('consult')) {
    return [
      `Technology Consultant (${companyName})`,
      `Senior Solution Architect (Enterprise Advisory)`,
      `Digital Transformation Strategy Lead`,
      `Cloud & Data Modernization Consultant`,
      `Associate Partner / Engagement Director`,
    ];
  }

  if (detected.category === 'healthcare' || ind.includes('health') || ind.includes('bio') || ind.includes('medic')) {
    return [
      'Bioinformatics Software Engineer',
      `HealthTech Systems Architect (${companyName})`,
      'Senior Clinical Data Platform Engineer',
      'Regulatory & HIPAA Compliance Engineer',
      'Staff Machine Learning Engineer (Healthcare)',
    ];
  }

  if (detected.category === 'cybersecurity' || ind.includes('cyber') || ind.includes('security')) {
    return [
      'Security Operations & Incident Response Engineer',
      'Application Security Architect (AppSec)',
      'Threat Intelligence & Vulnerability Researcher',
      'Cloud Infrastructure Security Engineer (DevSecOps)',
      'Staff Cryptography & Identity Engineer',
    ];
  }

  if (detected.category === 'hardware' || ind.includes('hardware') || ind.includes('semiconductor') || ind.includes('chip') || ind.includes('embedded')) {
    return [
      'Embedded Firmware Engineer',
      'ASIC / FPGA Verification Engineer',
      'Hardware-Software Integration Architect',
      'DSP & Low-Level Driver Systems Engineer',
      'Principal Silicon Systems Engineer',
    ];
  }

  // Standard tech enterprise roles customized with the company name
  return [
    `Software Engineer (${companyName})`,
    `Senior Software Engineer (${companyName})`,
    `Staff Engineer / Technical Lead`,
    `Engineering Manager (${companyName})`,
    `Cloud Infrastructure & DevOps Engineer`,
    `Data Platform & AI Engineer`,
    `Product Manager (${companyName})`,
  ];
}

export function findCompanyPipeline(query: string): CompanyHiringPipeline | undefined {
  if (!query) return undefined;
  const rawClean = query.trim().toLowerCase();
  const clean = rawClean.replace(/[^a-z0-9]/g, '');

  // Alias checks for convenience
  if (rawClean.includes('jpmorgan') || rawClean.includes('chase') || rawClean.includes('jp morgan')) {
    const found = PRESET_COMPANY_PIPELINES.find((p) => p.normalizedName.includes('jpmorgan'));
    if (found) return found;
  }
  if (rawClean.includes('goldman')) {
    const found = PRESET_COMPANY_PIPELINES.find((p) => p.normalizedName.includes('goldman'));
    if (found) return found;
  }
  if (rawClean.includes('apple')) {
    const found = PRESET_COMPANY_PIPELINES.find((p) => p.normalizedName.includes('apple'));
    if (found) return found;
  }
  if (rawClean.includes('google')) {
    const found = PRESET_COMPANY_PIPELINES.find((p) => p.normalizedName.includes('google'));
    if (found) return found;
  }
  if (rawClean.includes('meta') || rawClean === 'facebook') {
    const found = PRESET_COMPANY_PIPELINES.find((p) => p.normalizedName.includes('meta'));
    if (found) return found;
  }
  if (rawClean.includes('amazon')) {
    const found = PRESET_COMPANY_PIPELINES.find((p) => p.normalizedName.includes('amazon'));
    if (found) return found;
  }

  return PRESET_COMPANY_PIPELINES.find(
    (p) => p.normalizedName === clean || p.companyName.toLowerCase().includes(rawClean) || rawClean.includes(p.companyName.toLowerCase()) || clean.includes(p.normalizedName)
  );
}

export function generateFallbackPipeline(companyName: string, roleTitle = 'Software Engineer'): CompanyHiringPipeline {
  const company = companyName.trim() || 'Premier Global Enterprise';
  const detected = detectCompanyIndustry(company);

  if (detected.category === 'banking') {
    return generateBankingPipeline(company, roleTitle);
  }

  return {
    companyName: company,
    normalizedName: company.toLowerCase().replace(/[^a-z0-9]/g, ''),
    tagline: `Comprehensive hiring process & bar evaluation at ${company}`,
    industry: detected.industry,
    popularRoles: getCompanyRoles(company, detected.industry),
    overview: `${company} evaluates candidates across technical depth, domain architecture, and cultural ownership. The process assesses both practical problem solving and alignment with organizational values.`,
    totalStages: 4,
    cultureHighlights: [
      'Customer-centric ownership and business accountability',
      'High-rigor software engineering and design modularity',
      'Effective cross-functional communication and constructive debate',
      'Continuous learning and technical adaptability'
    ],
    evaluationPhilosophy: `${company} seeks engineers and leaders who balance rapid execution with scalable architecture. Candidates who articulate trade-offs clearly stand out.`,
    typicalTimeline: '3 to 5 weeks from initial screening to final offer decision',
    stages: [
      {
        id: `${company.toLowerCase()}-s1`,
        stageNumber: 1,
        name: 'Stage 1: Recruiter Screen & Fit Calibration',
        levelType: 'Phone Screen',
        format: '30-Minute Video / Phone Call',
        durationMinutes: 30,
        interviewerProfile: 'Technical Talent Partner',
        coreCompetencies: ['Background Walkthrough', 'Role Alignment', 'Communication Clarity'],
        description: `Introductory conversation to explore your previous technical impact, expectations for the ${roleTitle} post, and mutual timeline.`,
        typicalQuestions: [
          `Why are you interested in joining ${company} specifically at this stage?`,
          'Walk me through the most significant technical project you owned and the measurable business outcome.'
        ],
        tipsForSuccess: [
          'Be prepared with crisp 90-second summaries of your core achievements.',
          `Research ${company}'s current flagship products, recent releases, and engineering challenges.`
        ],
        recommendedPersonaId: 'alex-mentor',
        recommendedTrack: 'Behavioral & Leadership',
      },
      {
        id: `${company.toLowerCase()}-s2`,
        stageNumber: 2,
        name: 'Stage 2: Technical Phone Screen / Live Coding',
        levelType: 'Technical Round',
        format: '45-60 Minute Live Collaborative Code Session',
        durationMinutes: 60,
        interviewerProfile: 'Senior Engineer from Hiring Team',
        coreCompetencies: ['Data Structures & Algorithms', 'Clean Code', 'Debugging'],
        description: 'Live problem solving assessing algorithmic complexity O(n), code cleanliness, and boundary condition handling.',
        typicalQuestions: [
          'Solve a core algorithmic optimization problem with edge case verification.',
          'Discuss how you would profile and eliminate a CPU or latency bottleneck in a critical production service.'
        ],
        tipsForSuccess: [
          'Think aloud continuously so the interviewer can follow your thought process.',
          'State time and space complexity upfront before typing code.'
        ],
        recommendedPersonaId: 'alex-mentor',
        recommendedTrack: 'Technical & Problem Solving',
      },
      {
        id: `${company.toLowerCase()}-s3`,
        stageNumber: 3,
        name: 'Stage 3: Systems Architecture & Scalability',
        levelType: 'System Design',
        format: '45-60 Minute Architecture Whiteboarding Session',
        durationMinutes: 60,
        interviewerProfile: 'Staff Engineer / Tech Lead',
        coreCompetencies: ['Distributed Systems', 'High Availability', 'Database Partitioning', 'Resilience'],
        description: `Designing an end-to-end distributed system reflecting the scale and domain constraints of ${company}.`,
        typicalQuestions: [
          `How would you design a real-time event streaming and ingestion pipeline at ${company} handling 50k QPS?`,
          'Explain how you ensure data consistency across cross-region databases under network partition.'
        ],
        tipsForSuccess: [
          'Establish clear functional and non-functional requirements early.',
          'Identify single points of failure, cache invalidation strategies, and backpressure mechanisms.'
        ],
        recommendedPersonaId: 'sarah-vp',
        recommendedTrack: 'System Design & Architecture',
      },
      {
        id: `${company.toLowerCase()}-s4`,
        stageNumber: 4,
        name: 'Stage 4: Hiring Manager & Values Alignment Round',
        levelType: 'Bar Raiser / Executive',
        format: '45-Minute Leadership & Behavioral Evaluation',
        durationMinutes: 45,
        interviewerProfile: 'Engineering Manager / Director',
        coreCompetencies: ['Ownership', 'Conflict Resolution', 'Cross-Functional Collaboration', 'Culture Fit'],
        description: `Deep behavioral debrief evaluating your track record of navigating ambiguity, driving projects to completion, and upholding team health.`,
        typicalQuestions: [
          'Tell me about a time you had a strong technical disagreement with a peer or stakeholder. How did you resolve it?',
          'Describe a situation where a project fell severely behind schedule. What actions did you take to recover?'
        ],
        tipsForSuccess: [
          'Frame answers using the STAR framework with concrete numbers and metrics.',
          'Demonstrate accountability, self-awareness, and focus on team outcomes.'
        ],
        recommendedPersonaId: 'morgan-chen',
        recommendedTrack: 'Behavioral & Leadership',
      },
    ],
  };
}



export interface SupportedCompanyMeta {
  name: string;
  aliases: string[];
  industry: string;
  category: 'tech' | 'banks' | 'fintech' | 'consulting' | 'healthcare' | 'defense' | 'automotive';
  tagline: string;
}

export const ALL_SUPPORTED_COMPANIES: SupportedCompanyMeta[] = [
  {
    name: 'Amazon',
    aliases: ['amz', 'aws', 'amazon.com'],
    industry: 'Cloud Computing, E-Commerce & AI',
    category: 'tech',
    tagline: '16 Leadership Principles & Bar Raiser Hiring Standard',
  },
  {
    name: 'Google',
    aliases: ['alphabet', 'deepmind', 'goog'],
    industry: 'Search, Cloud & Artificial Intelligence',
    category: 'tech',
    tagline: 'Googleyness, algorithmic problem solving & system design',
  },
  {
    name: 'Meta',
    aliases: ['facebook', 'fb', 'instagram', 'whatsapp', 'oculus'],
    industry: 'Social Platforms, AR/VR & Open AI',
    category: 'tech',
    tagline: 'Move Fast, systems engineering & E3-E6 leveling',
  },
  {
    name: 'Microsoft',
    aliases: ['msft', 'azure', 'copilot'],
    industry: 'Enterprise Cloud, Productivity & AI',
    category: 'tech',
    tagline: 'Growth Mindset, Azure cloud scale & collaborative design',
  },
  {
    name: 'Apple',
    aliases: ['aapl', 'ios', 'macos'],
    industry: 'Consumer Hardware, Silicon & Operating Systems',
    category: 'tech',
    tagline: 'Uncompromising craftsmanship, silicon firmware & secrecy',
  },
  {
    name: 'Netflix',
    aliases: ['nflx', 'streaming'],
    industry: 'Global Media, CDN & Distributed Streaming',
    category: 'tech',
    tagline: 'Freedom & Responsibility, high-leverage Senior L5 bar',
  },
  {
    name: 'Nvidia',
    aliases: ['nvda', 'geforce', 'cuda'],
    industry: 'Semiconductors, Accelerated Computing & AI Platforms',
    category: 'tech',
    tagline: 'Accelerated computing, CUDA & first-principles architecture',
  },
  {
    name: 'JPMorgan Chase',
    aliases: ['jpmorgan', 'chase', 'jpm', 'jp morgan'],
    industry: 'Investment Banking, Capital Markets & Global Financial Services',
    category: 'banks',
    tagline: 'High-concurrency banking, electronic trading & fiduciary rigor',
  },
  {
    name: 'Goldman Sachs',
    aliases: ['gs', 'goldman', 'marcus'],
    industry: 'Investment Banking, Capital Markets & Global Financial Services',
    category: 'banks',
    tagline: 'Algorithmic trading, quantitative modeling & Superday loops',
  },
  {
    name: 'Morgan Stanley',
    aliases: ['ms', 'morgan', 'institutional securities'],
    industry: 'Investment Banking, Capital Markets & Global Financial Services',
    category: 'banks',
    tagline: 'Institutional trading systems, Java/C++ concurrency & risk governance',
  },
  {
    name: 'Bank of America',
    aliases: ['bofa', 'bof a', 'merrill', 'cashpro'],
    industry: 'Investment Banking, Capital Markets & Global Financial Services',
    category: 'banks',
    tagline: 'High-availability transaction ledgers & Merrill wealth tech',
  },
  {
    name: 'Barclays',
    aliases: ['barclay', 'barx', 'investment bank'],
    industry: 'Investment Banking, Capital Markets & Global Financial Services',
    category: 'banks',
    tagline: 'Investment banking tech, markets settlement & RISE values',
  },
  {
    name: 'Capital One',
    aliases: ['capone', 'cap1', 'capital 1'],
    industry: 'Investment Banking, Capital Markets & Global Financial Services',
    category: 'banks',
    tagline: 'Cloud-native banking & the Technical Case Interview',
  },
  {
    name: 'Citigroup',
    aliases: ['citi', 'citibank', 'ttss'],
    industry: 'Investment Banking, Capital Markets & Global Financial Services',
    category: 'banks',
    tagline: 'Institutional clients group & global payment rails',
  },
  {
    name: 'Stripe',
    aliases: ['payments', 'fintech'],
    industry: 'Financial Infrastructure & Developer APIs',
    category: 'fintech',
    tagline: 'Core ledger resilience, developer APIs & high-rigor coding',
  },
  {
    name: 'Uber',
    aliases: ['rideshare', 'eats', 'freight'],
    industry: 'Mobility, Delivery, Freight & Global Logistics',
    category: 'tech',
    tagline: 'Geospatial dispatch (H3), dynamic pricing & Bar Raiser',
  },
  {
    name: 'Airbnb',
    aliases: ['abnb', 'travel', 'hospitality'],
    industry: 'Hospitality, Travel Tech & Marketplace Platforms',
    category: 'tech',
    tagline: 'Product craftsmanship & legendary Core Values interview',
  },
  {
    name: 'Salesforce',
    aliases: ['crm', 'agentforce', 'force.com'],
    industry: 'Enterprise Cloud SaaS, CRM & AI Agentforce',
    category: 'tech',
    tagline: 'Multi-tenant cloud architecture, Agentforce & Ohana values',
  },
  {
    name: 'Palantir',
    aliases: ['pltr', 'foundry', 'gotham', 'aip'],
    industry: 'Enterprise Intelligence, Defense & Data Platforms',
    category: 'defense',
    tagline: 'The Decomp Round, graph models & mission-critical defense',
  },
  {
    name: 'Tesla',
    aliases: ['tsla', 'autopilot', 'fsd', 'optimus'],
    industry: 'Electric Vehicles, Autopilot AI, Robotics & Energy',
    category: 'automotive',
    tagline: 'Autopilot vision, low-level systems & architecture presentation',
  },
];

export function validateCompanyName(name: string): {
  isValid: boolean;
  matchedName?: string;
  suggestions: string[];
  error?: string;
} {
  const clean = (name || '').trim();
  if (!clean || clean.length < 2) {
    return {
      isValid: false,
      suggestions: POPULAR_COMPANIES.slice(0, 5),
      error: 'Please enter a valid company name (at least 2 characters).'
    };
  }

  const lower = clean.toLowerCase();

  // 1. Direct match or alias in ALL_SUPPORTED_COMPANIES
  const directMatch = ALL_SUPPORTED_COMPANIES.find((c) => 
    c.name.toLowerCase() === lower || 
    c.aliases.some((a) => a.toLowerCase() === lower) ||
    c.name.toLowerCase().includes(lower) ||
    lower.includes(c.name.toLowerCase())
  );

  if (directMatch) {
    return {
      isValid: true,
      matchedName: directMatch.name,
      suggestions: []
    };
  }

  // 2. Preset match in PRESET_COMPANY_PIPELINES
  const preset = findCompanyPipeline(clean);
  if (preset) {
    return {
      isValid: true,
      matchedName: preset.companyName,
      suggestions: []
    };
  }

  // 3. Recognized banking/industry keywords
  const ind = detectCompanyIndustry(clean);
  if (ind.category !== 'general' && ind.category !== 'tech') {
    return {
      isValid: true,
      matchedName: clean,
      suggestions: []
    };
  }

  // 4. Input health checks (numbers only, repeating characters, no vowels)
  const hasVowels = /[aeiouy]/i.test(clean);
  const isAlpha = /^[a-zA-Zs.&'-]+$/.test(clean);
  const isRepeated = /(.)\1{3,}/.test(clean);

  // 5. Build intelligent suggestions
  const scored = ALL_SUPPORTED_COMPANIES.map((c) => {
    let score = 0;
    const cLower = c.name.toLowerCase();
    if (cLower.startsWith(lower.slice(0, 2))) score += 5;
    for (const char of lower) {
      if (cLower.includes(char)) score += 1;
    }
    return { name: c.name, score };
  })
  .filter((s) => s.score > 1)
  .sort((a, b) => b.score - a.score)
  .map((s) => s.name);

  const topSuggestions = Array.from(new Set(scored.concat(POPULAR_COMPANIES))).slice(0, 4);

  if (!hasVowels || !isAlpha || isRepeated || clean.length > 35) {
    return {
      isValid: false,
      suggestions: topSuggestions,
      error: `"${clean}" does not appear to be a recognized company name. Please verify spelling or pick from the suggestions below.`
    };
  }

  return {
    isValid: false,
    suggestions: topSuggestions,
    error: `Company "${clean}" could not be verified in our verified hiring loop database. Please choose a suggested company below.`
  };
}
