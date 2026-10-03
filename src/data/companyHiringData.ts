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
  'Tesla',
  'Spotify',
  'Adobe',
  'Cisco',
  'Oracle',
  'SpaceX',
  'Boeing',
  'Lockheed Martin',
  'McKinsey & Company',
  'Boston Consulting Group (BCG)',
  'Deloitte',
  'Accenture',
  'Tata Consultancy Services (TCS)',
  'Infosys',
  'Wipro',
  'Flipkart',
  'Zomato',
  'Swiggy',
  'Walmart',
  'Epic Games',
  'Riot Games',
  'Roblox',
  'CrowdStrike',
  'Palo Alto Networks',
  'Pfizer',
  'Qualcomm',
  'Snowflake',
  'Databricks',
  'OpenAI'
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

function matchesKeyword(text: string, kw: string): boolean {
  if (kw.length <= 4) {
    const regex = new RegExp(`\\b${kw.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')}\\b`, 'i');
    return regex.test(text);
  }
  return text.includes(kw);
}

export function detectCompanyIndustry(name: string): {
  industry: string;
  category: 'banking' | 'tech' | 'consulting' | 'healthcare' | 'cybersecurity' | 'hardware' | 'aerospace' | 'gaming' | 'retail' | 'telecom' | 'automotive' | 'services' | 'general';
} {
  if (!name) return { industry: 'Technology & Enterprise Scale', category: 'tech' };
  const n = name.trim().toLowerCase();

  // 1. Consulting & Strategy (check before generic finance to prevent "consulting" matching)
  const consultKeywords = [
    'mckinsey', 'bcg', 'boston consulting', 'bain', 'deloitte', 'pwc', 
    'pricewaterhousecoopers', 'ey', 'ernst', 'kpmg', 'accenture', 'oliver wyman', 'kearney', 'booz allen', 'consulting', 'advisory'
  ];
  if (consultKeywords.some((k) => matchesKeyword(n, k))) {
    return { industry: 'Management, Technology & Strategy Consulting', category: 'consulting' };
  }

  // 2. Aerospace & Defense
  const aeroKeywords = [
    'spacex', 'boeing', 'lockheed', 'nasa', 'northrop', 'raytheon', 'rtx', 'blue origin', 
    'general dynamics', 'l3harris', 'relativity space', 'planet labs', 'aerospace', 'aviation', 'space'
  ];
  if (aeroKeywords.some((k) => matchesKeyword(n, k))) {
    return { industry: 'Aerospace, Defense & Mission-Critical Systems', category: 'aerospace' };
  }

  // 3. Banking, Finance, Quant, Trading, Payments
  const bankKeywords = [
    'bank', 'banking', 'chase', 'jpmorgan', 'jp morgan', 'morgan stanley', 'goldman', 'bofa', 
    'barclays', 'citi', 'citigroup', 'citibank', 'wells fargo', 'capital one', 
    'fidelity', 'blackrock', 'vanguard', 'deutsche', 'ubs', 'credit suisse', 'hsbc', 
    'standard chartered', 'pnc', 'us bank', 'schwab', 'charles schwab', 'mellon', 'state street', 
    'nomura', 'macquarie', 'rbc', 'td bank', 'scotiabank', 'bmo', 'santander', 
    'bnp paribas', 'societe generale', 'ing bank', 'ing groep', 'mizuho', 'hdfc', 'icici', 'kotak', 
    'axis', 'sbi', 'quant', 'trading', 'hedge', 'citadel', 'two sigma', 'jane street', 
    'de shaw', 'point72', 'jump trading', 'fintech', 'revolut', 'monzo', 'chime', 
    'plaid', 'robinhood', 'coinbase', 'financial', 'wealth', 'capital', 'securities'
  ];
  if (bankKeywords.some((k) => matchesKeyword(n, k))) {
    return { industry: 'Investment Banking, Capital Markets & Global Financial Services', category: 'banking' };
  }

  // 4. Gaming & Interactive Entertainment
  const gameKeywords = [
    'epic games', 'riot games', 'electronic arts', 'ea', 'activision', 'blizzard', 'roblox', 
    'playstation', 'sony interactive', 'nintendo', 'ubisoft', 'unity', 'take-two', '2k', 
    'valve', 'bungie', 'bethesda', 'bioware', 'square enix', 'cd projekt', 'gaming', 'game dev', 'game studio'
  ];
  if (gameKeywords.some((k) => n.includes(k))) {
    return { industry: 'Interactive Entertainment, Game Engines & Multiplayer Systems', category: 'gaming' };
  }

  // 5. Retail & E-Commerce
  const retailKeywords = [
    'walmart', 'target', 'ebay', 'flipkart', 'alibaba', 'shopee', 'etsy', 'wayfair', 
    'chewy', 'instacart', 'mercadolibre', 'costco', 'home depot', 'best buy', 
    'swiggy', 'zomato', 'doordash', 'ecommerce', 'e-commerce', 'retail'
  ];
  if (retailKeywords.some((k) => n.includes(k))) {
    return { industry: 'Omnichannel E-Commerce, Logistics & Consumer Marketplaces', category: 'retail' };
  }

  // 6. Automotive & Autonomous Mobility
  const autoKeywords = [
    'tesla', 'rivian', 'lucid', 'waymo', 'cruise', 'ford', 'gm', 'general motors', 
    'bmw', 'mercedes', 'volkswagen', 'audi', 'hyundai', 'toyota', 'honda', 'volvo', 'byd', 'aurora', 'zoox', 'nuro', 'automotive'
  ];
  if (autoKeywords.some((k) => n.includes(k))) {
    return { industry: 'Autonomous Mobility, Electric Vehicles & Robotics', category: 'automotive' };
  }

  // 7. Telecommunications & Networking
  const telecomKeywords = [
    'at&t', 'verizon', 't-mobile', 'comcast', 'cisco', 'ericsson', 'nokia', 'juniper', 'arista', 'vodafone', 'telefonica', 'telecom', 'networking'
  ];
  if (telecomKeywords.some((k) => n.includes(k))) {
    return { industry: 'Telecommunications, 5G Infrastructure & Cloud Networking', category: 'telecom' };
  }

  // 8. IT Services & Systems Integration
  const itServicesKeywords = [
    'tcs', 'tata consultancy', 'infosys', 'wipro', 'hcl', 'tech mahindra', 'cognizant', 'ltimindtree', 'mphasis', 'hexaware', 'persistent systems'
  ];
  if (itServicesKeywords.some((k) => n.includes(k))) {
    return { industry: 'Global IT Engineering & Enterprise Digital Services', category: 'services' };
  }

  // 9. Healthcare & Biotech
  const healthKeywords = [
    'health', 'pfizer', 'moderna', 'johnson', 'j&j', 'roche', 'novartis', 'merck', 
    'astrazeneca', 'gilead', 'abbvie', 'amgen', 'unitedhealth', 'cvs', 'optum', 
    'cigna', 'humana', 'medtronic', 'biogen', 'genentech', 'sanofi', 'bayer', 'epic systems'
  ];
  if (healthKeywords.some((k) => n.includes(k))) {
    return { industry: 'Healthcare, Life Sciences & Biomedical Systems', category: 'healthcare' };
  }

  // 10. Cybersecurity
  const secKeywords = [
    'cyber', 'security', 'palo alto', 'crowdstrike', 'fortinet', 'zscaler', 
    'cloudflare', 'okta', 'checkpoint', 'sentinelone', 'splunk', 'fireeye', 'mandiant'
  ];
  if (secKeywords.some((k) => n.includes(k))) {
    return { industry: 'Enterprise Cybersecurity & Threat Intelligence', category: 'cybersecurity' };
  }

  // 11. Hardware & Semiconductor
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

  if (detected.category === 'aerospace' || ind.includes('aerospace') || ind.includes('defense') || ind.includes('space') || ind.includes('aviation')) {
    return [
      `Flight Software Engineer (${companyName})`,
      `Guidance, Navigation & Control (GNC) Engineer`,
      `Hardware-in-the-Loop (HIL) Test Systems Engineer`,
      `Avionics & Embedded Firmware Engineer`,
      `Mission Telemetry & Ground Operations Architect`,
      `Senior Reliability & Systems Safety Engineer`,
    ];
  }

  if (detected.category === 'gaming' || ind.includes('game') || ind.includes('gaming')) {
    return [
      `Gameplay Systems Engineer (C++ - ${companyName})`,
      `Graphics & Shaders Rendering Engineer`,
      `Game Engine Core Systems Architect`,
      `Multiplayer Game Server & Low-Latency Networking Engineer`,
      `LiveOps Platform & Anti-Cheat Security Engineer`,
      `Technical Audio & Physics Systems Developer`,
    ];
  }

  if (detected.category === 'retail' || ind.includes('retail') || ind.includes('e-commerce') || ind.includes('commerce')) {
    return [
      `Software Engineer (Catalog, Search & Discovery)`,
      `Senior Distributed Systems Engineer (Checkout & Order Ledger)`,
      `Logistics, Supply Chain & Fulfillment Architect`,
      `Dynamic Pricing & Machine Learning Engineer`,
      `Staff Mobile Engineer (Consumer App)`,
      `Product Manager (${companyName} E-Commerce)`,
    ];
  }

  if (detected.category === 'automotive' || ind.includes('auto') || ind.includes('vehicle')) {
    return [
      `Autonomous Vehicle Perception & Sensor Fusion Engineer`,
      `Embedded Vehicle Controls Software Engineer`,
      `Real-Time OS & AUTOSAR Firmware Architect`,
      `Edge Telemetry & Fleet Cloud Infrastructure Engineer`,
      `Functional Safety Systems Engineer (ISO 26262)`,
    ];
  }

  if (detected.category === 'telecom' || ind.includes('telecom') || ind.includes('network')) {
    return [
      `Network Protocol & DPDK Systems Engineer`,
      `5G Core & Radio Access Network (RAN) Software Engineer`,
      `Cloud SDN & Virtual Network Functions Architect`,
      `Embedded DSP & Radio Firmware Engineer`,
      `Telecom Systems Reliability & NOC Infrastructure Engineer`,
    ];
  }

  if (detected.category === 'services' || ind.includes('services') || ind.includes('consultancy')) {
    return [
      `Systems Engineer / Specialist Programmer`,
      `Senior Software Developer (${companyName})`,
      `Technical Lead / Enterprise Cloud Architect`,
      `Full Stack Application Developer (Java / Python / Cloud)`,
      `Delivery Manager / Client Technology Partner`,
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

export function generateAerospacePipeline(companyName: string, roleTitle = 'Flight Software Engineer'): CompanyHiringPipeline {
  const company = companyName.trim() || 'Premier Aerospace Enterprise';
  const roles = getCompanyRoles(company, 'Aerospace');
  return {
    companyName: company,
    normalizedName: company.toLowerCase().replace(/[^a-z0-9]/g, ''),
    tagline: `Mission-critical flight software, real-time determinism & zero-defect safety at ${company}`,
    industry: 'Aerospace, Defense & Mission-Critical Systems',
    overview: `${company} builds high-reliability hardware and software systems where software failures can lead to loss of mission or human life. Candidates are evaluated for low-level C++ performance, real-time operating systems (RTOS), telemetry processing, and conservative fail-safe engineering.`,
    totalStages: 4,
    cultureHighlights: [
      'Zero-defect mission assurance & flight readiness mindset',
      'First-principles physical modeling and mathematical rigor',
      'Real-time deterministic computing & memory safety',
      'Collaborative hardware-software integration'
    ],
    evaluationPhilosophy: `${company} demands engineers who verify assumptions with rigorous telemetry and testing. A candidate who proactively points out edge cases under communication blackout or hardware failure passes the bar.`,
    typicalTimeline: '3 to 5 weeks from initial screen to offer decision',
    popularRoles: roles,
    stages: [
      {
        id: `${company.toLowerCase()}-s1`,
        stageNumber: 1,
        name: 'Stage 1: Technical Recruiter & Engineering Screening',
        levelType: 'Phone Screen',
        format: '30-45 Minute Technical Background & Project Deep Dive',
        durationMinutes: 45,
        interviewerProfile: 'Avionics / Flight Software Lead',
        coreCompetencies: ['Embedded C/C++', 'RTOS Concepts', 'Mission-Critical Architecture'],
        description: `Calibration interview assessing your background with low-level systems, concurrency, real-time hardware constraints, and motivation for ${company}'s missions.`,
        typicalQuestions: [
          `Why do you want to build mission-critical avionics at ${company}?`,
          'Walk me through a project where hardware failure or unexpected sensor data caused an anomaly. How did your software handle it?'
        ],
        tipsForSuccess: [
          'Highlight experience with deterministic systems, watchdogs, and memory management without dynamic allocation.',
          'Speak clearly to past post-mortems and test coverage strategies.'
        ],
        recommendedPersonaId: 'alex-mentor',
        recommendedTrack: 'Technical & Behavioral Mix'
      },
      {
        id: `${company.toLowerCase()}-s2`,
        stageNumber: 2,
        name: 'Stage 2: Embedded Systems & C++ Deterministic Programming',
        levelType: 'Technical Round',
        format: '60-Minute Live Coding & Memory Model Evaluation',
        durationMinutes: 60,
        interviewerProfile: 'Senior Embedded Flight Software Engineer',
        coreCompetencies: ['C++ Memory Layout', 'Concurrency & Mutexes', 'Interrupt Handlers & DMA', 'Bitwise Manipulation'],
        description: `Writing high-performance, deterministic C++ code under memory and timing constraints without relying on heavy runtime reflection or unchecked heap allocations.`,
        typicalQuestions: [
          'Implement a thread-safe, lock-free ring buffer for streaming sensor data between an ISR and a telemetry task.',
          'Given raw packed binary packets from an IMU over SPI, parse and validate the checksum while preventing memory alignment faults.'
        ],
        tipsForSuccess: [
          'Avoid std::vector reallocation or new/malloc in inner loops; explain cache coherency.',
          'Discuss priority inversion and how priority inheritance prevents starvation.'
        ],
        recommendedPersonaId: 'alex-mentor',
        recommendedTrack: 'Technical & Problem Solving'
      },
      {
        id: `${company.toLowerCase()}-s3`,
        stageNumber: 3,
        name: 'Stage 3: Flight Telemetry & Hardware-in-the-Loop (HIL) Architecture',
        levelType: 'System Design',
        format: '60-Minute Architecture & Distributed Avionics Whiteboard',
        durationMinutes: 60,
        interviewerProfile: 'Principal Avionics Architect / Systems Lead',
        coreCompetencies: ['Hardware-in-the-Loop Simulation', 'Fault Detection, Isolation & Recovery (FDIR)', 'Real-Time Pub/Sub (DDS / CAN)'],
        description: `Designing an end-to-end telemetry and guidance loop that processes multi-sensor inputs with sub-millisecond latency and guaranteed failover.`,
        typicalQuestions: [
          `Design the flight computer software architecture for a vehicle at ${company} with triple-modular redundancy (TMR) voting.`,
          'How do you architect a Hardware-in-the-Loop (HIL) automated test harness to simulate extreme flight turbulence and sensor dropouts?'
        ],
        tipsForSuccess: [
          'Diagram the sensor-to-actuator pipeline with explicit timing deadlines (e.g. 500 Hz control loops).',
          'Explain byzantine fault tolerance and fallback modes.'
        ],
        recommendedPersonaId: 'sarah-vp',
        recommendedTrack: 'System Design & Architecture'
      },
      {
        id: `${company.toLowerCase()}-s4`,
        stageNumber: 4,
        name: 'Stage 4: Mission Assurance, Flight Readiness & Values Bar',
        levelType: 'Bar Raiser / Executive',
        format: '45-Minute Executive & Culture Fit Round',
        durationMinutes: 45,
        interviewerProfile: 'Director of Flight Operations / Chief Engineer',
        coreCompetencies: ['Accountability for Safety', 'Constructive Disagreement', 'Crisis Composure'],
        description: `Final assessment evaluating safety culture, composure when facing schedule pressure vs engineering integrity, and dedication to team success.`,
        typicalQuestions: [
          'Describe a situation where schedule demands urged deploying a build, but you were not completely confident in a test result. What did you do?',
          'Tell me about an engineering mistake you made that taught you the most about defensive design.'
        ],
        tipsForSuccess: [
          'Demonstrate that safety and technical truth always take precedence over convenience.',
          'Show extreme ownership without shifting blame.'
        ],
        recommendedPersonaId: 'morgan-chen',
        recommendedTrack: 'Behavioral & Leadership'
      }
    ]
  };
}

export function generateConsultingPipeline(companyName: string, roleTitle = 'Technology Consultant'): CompanyHiringPipeline {
  const company = companyName.trim() || 'Premier Global Consulting Firm';
  const roles = getCompanyRoles(company, 'Consulting');
  return {
    companyName: company,
    normalizedName: company.toLowerCase().replace(/[^a-z0-9]/g, ''),
    tagline: `Enterprise digital transformation, technology advisory & client strategy at ${company}`,
    industry: 'Management, Technology & Strategy Consulting',
    overview: `${company} advises Fortune 500 executives on strategic technology modernization, cloud migration, and AI deployment. Candidates must combine deep architectural knowledge with structured problem solving, business acumen, and executive presence.`,
    totalStages: 4,
    cultureHighlights: [
      'Structured hypothesis-driven problem solving (MECE)',
      'Executive communication and client empathy',
      'Business value creation through scalable technology',
      'Collaborative team leadership across diverse industries'
    ],
    evaluationPhilosophy: `${company} evaluates how well you translate complex technical trade-offs into compelling business value for non-technical executive stakeholders.`,
    typicalTimeline: '3 to 5 weeks from initial screen to offer decision',
    popularRoles: roles,
    stages: [
      {
        id: `${company.toLowerCase()}-s1`,
        stageNumber: 1,
        name: 'Stage 1: Talent Acquisition & Fit Calibration',
        levelType: 'Phone Screen',
        format: '30-Minute Recruiter & Career Trajectory Screen',
        durationMinutes: 30,
        interviewerProfile: 'Consulting Talent Specialist',
        coreCompetencies: ['Consultative Presence', 'Track Record of Impact', 'Communication Poise'],
        description: `Introductory conversation to evaluate client-facing experience, adaptability across industries, and clarity of communication.`,
        typicalQuestions: [
          `Why do you want to pursue technology advisory at ${company}?`,
          'Describe a high-stakes project where you had to bridge the gap between engineering teams and business executives.'
        ],
        tipsForSuccess: ['Use structured STAR responses and highlight measurable client outcomes ($ or % improvement).'],
        recommendedPersonaId: 'alex-mentor',
        recommendedTrack: 'Behavioral & Leadership'
      },
      {
        id: `${company.toLowerCase()}-s2`,
        stageNumber: 2,
        name: 'Stage 2: Enterprise Architecture & Technology Case Study',
        levelType: 'Technical Round',
        format: '60-Minute Interactive Architecture & Modernization Case',
        durationMinutes: 60,
        interviewerProfile: 'Engagement Manager / Principal Architect',
        coreCompetencies: ['Legacy Modernization', 'Cloud Migration Strategy', 'TCO & ROI Analysis', 'Microservices'],
        description: `Solving a realistic client dilemma: modernizing a legacy core banking or retail platform with high technical debt under strict operational constraints.`,
        typicalQuestions: [
          'A global enterprise client wants to migrate an on-premise monolithic ERP system to AWS/Azure. Walk me through your assessment methodology and target state architecture.',
          'How do you evaluate whether a client should buy an off-the-shelf SaaS solution versus building a bespoke microservices architecture?'
        ],
        tipsForSuccess: [
          'Structure your approach using MECE (Mutually Exclusive, Collectively Exhaustive) frameworks.',
          'Incorporate business metrics: cost of delay, compliance risk, and total cost of ownership (TCO).'
        ],
        recommendedPersonaId: 'sarah-vp',
        recommendedTrack: 'System Design & Architecture'
      },
      {
        id: `${company.toLowerCase()}-s3`,
        stageNumber: 3,
        name: 'Stage 3: Executive Client Discovery & Presentation Simulation',
        levelType: 'System Design',
        format: '60-Minute Simulated Client Workshop & Whiteboard',
        durationMinutes: 60,
        interviewerProfile: 'Associate Partner / Solution Director',
        coreCompetencies: ['Stakeholder Management', 'Active Listening', 'Live Whiteboarding', 'Objection Handling'],
        description: `Simulating a live steering committee workshop where you interview the client (interviewer roleplaying a skeptical CIO/CTO) and deliver strategic recommendations.`,
        typicalQuestions: [
          'The client CIO challenges your proposal, stating that their existing database team lacks cloud skills. How do you address their objection?',
          'Whiteboard the 3-year phased digital roadmap balancing quick wins with long-term architectural stability.'
        ],
        tipsForSuccess: [
          'Ask clarifying questions before proposing answers; active listening is heavily scored.',
          'Keep technical slides or diagrams crisp, clear, and business-focused.'
        ],
        recommendedPersonaId: 'sarah-vp',
        recommendedTrack: 'System Design & Architecture'
      },
      {
        id: `${company.toLowerCase()}-s4`,
        stageNumber: 4,
        name: 'Stage 4: Partner Interview & Leadership Fit',
        levelType: 'Bar Raiser / Executive',
        format: '45-Minute Partner Round',
        durationMinutes: 45,
        interviewerProfile: 'Senior Partner / Practice Leader',
        coreCompetencies: ['Values Alignment', 'Integrity & Ethics', 'Talent Mentorship', 'Entrepreneurial Drive'],
        description: `Final interview with senior firm leadership assessing cultural alignment, intellectual curiosity, resilience in demanding client environments, and mentorship.`,
        typicalQuestions: [
          'Tell me about a time a client engagement went off track. How did you restore trust with the client sponsor?',
          'How do you cultivate an inclusive, high-morale team dynamic when working under tight client deliverables?'
        ],
        tipsForSuccess: [
          'Demonstrate authenticity, humility, and passion for developing junior colleagues.',
          'Show readiness to thrive in an apprenticeship-oriented culture.'
        ],
        recommendedPersonaId: 'morgan-chen',
        recommendedTrack: 'Behavioral & Leadership'
      }
    ]
  };
}

export function generateGamingPipeline(companyName: string, roleTitle = 'Gameplay Systems Engineer'): CompanyHiringPipeline {
  const company = companyName.trim() || 'Premier Game Studio';
  const roles = getCompanyRoles(company, 'Gaming');
  return {
    companyName: company,
    normalizedName: company.toLowerCase().replace(/[^a-z0-9]/g, ''),
    tagline: `High-framerate engine architecture, real-time simulation & player experience at ${company}`,
    industry: 'Interactive Entertainment, Game Engines & Multiplayer Systems',
    overview: `${company} crafts immersive interactive experiences powered by low-latency graphics pipelines, custom game engines, and distributed multiplayer backends. Engineers are evaluated on C++ performance, 3D math, concurrency, and passion for player satisfaction.`,
    totalStages: 4,
    cultureHighlights: [
      'Player-first craftsmanship and intuitive game feel',
      'Low-level hardware utilization and frame-budget discipline (16.6ms)',
      'High-bandwidth, low-latency networking & deterministic simulation',
      'Interdisciplinary collaboration between programmers, artists, and designers'
    ],
    evaluationPhilosophy: `${company} looks for engineers who treat every CPU/GPU cycle with care to maintain butter-smooth 60+ FPS while building flexible systems for game designers.`,
    typicalTimeline: '3 to 5 weeks from initial screen to offer decision',
    popularRoles: roles,
    stages: [
      {
        id: `${company.toLowerCase()}-s1`,
        stageNumber: 1,
        name: 'Stage 1: Studio Recruiter Screen & Portfolio Review',
        levelType: 'Phone Screen',
        format: '30-Minute Phone / Video Call',
        durationMinutes: 30,
        interviewerProfile: 'Technical Studio Recruiter',
        coreCompetencies: ['Game Development Passion', 'C++ / Engine Familiarity', 'Collaboration'],
        description: `Reviewing your game development portfolio, completed titles or engine prototypes, and alignment with ${company}'s gaming universes.`,
        typicalQuestions: [
          `What attracts you to building games at ${company}?`,
          'Walk me through a gameplay or engine system you implemented that required creative optimization.'
        ],
        tipsForSuccess: ['Demonstrate enthusiasm for the studio’s games and explain your specific technical contributions to projects.'],
        recommendedPersonaId: 'alex-mentor',
        recommendedTrack: 'Behavioral & Leadership'
      },
      {
        id: `${company.toLowerCase()}-s2`,
        stageNumber: 2,
        name: 'Stage 2: C++ Systems, 3D Math & Data-Oriented Design',
        levelType: 'Technical Round',
        format: '60-Minute Live Coding & Math Problem Solving',
        durationMinutes: 60,
        interviewerProfile: 'Senior Engine / Gameplay Programmer',
        coreCompetencies: ['Vector & Matrix Math', 'Data-Oriented Design (DOD)', 'Memory Cache Optimization', 'Modern C++'],
        description: `Hands-on live coding assessing memory layout, vector math, collision routines, and cache-friendly Entity-Component-System (ECS) architecture.`,
        typicalQuestions: [
          'Implement an efficient spatial partitioning data structure (e.g. Quadtree or BVH) to accelerate frustum culling or collision checks for 10,000 entities.',
          'Explain how Structure of Arrays (SoA) outperforms Array of Structures (AoS) in cache hit rates during physics ticks.'
        ],
        tipsForSuccess: [
          'Be comfortable writing 3D vector dot/cross product operations and matrix transforms.',
          'Explain cache line utilization (L1/L2) and avoid virtual dispatch in tight per-frame loops.'
        ],
        recommendedPersonaId: 'alex-mentor',
        recommendedTrack: 'Technical & Problem Solving'
      },
      {
        id: `${company.toLowerCase()}-s3`,
        stageNumber: 3,
        name: 'Stage 3: Multiplayer Server & Low-Latency Network Architecture',
        levelType: 'System Design',
        format: '60-Minute Distributed Game Architecture Whiteboard',
        durationMinutes: 60,
        interviewerProfile: 'Principal Network Engineer / Tech Director',
        coreCompetencies: ['Client-Side Prediction', 'Lag Compensation & Rollback', 'UDP Network Serialization', 'Matchmaking & LiveOps'],
        description: `Designing multiplayer systems that maintain state consistency across global players with packet loss, jitter, and strict latency budgets.`,
        typicalQuestions: [
          `Design the authoritative dedicated server networking architecture for a fast-paced multiplayer title at ${company}.`,
          'How do you implement client-side prediction, server reconciliation, and lag-compensated hit detection for fast projectile weapons?'
        ],
        tipsForSuccess: [
          'Clarify tick rates, packet delta compression, and reconciliation buffers.',
          'Discuss anti-cheat mechanisms and why clients must never be trusted for authoritative game state.'
        ],
        recommendedPersonaId: 'sarah-vp',
        recommendedTrack: 'System Design & Architecture'
      },
      {
        id: `${company.toLowerCase()}-s4`,
        stageNumber: 4,
        name: 'Stage 4: Creative Director & Culture Alignment Bar',
        levelType: 'Bar Raiser / Executive',
        format: '45-Minute Studio Values & Collaboration Round',
        durationMinutes: 45,
        interviewerProfile: 'Game Director / Studio Engineering Lead',
        coreCompetencies: ['Player Empathy', 'Constructive Creative Critique', 'Fast Prototyping & Iteration'],
        description: `Evaluating how effectively you collaborate with non-technical designers, iterate on gameplay feel, and uphold studio culture.`,
        typicalQuestions: [
          'Describe a situation where a game designer requested a feature that was technically very expensive or would hurt frame rate. How did you collaborate to find a creative alternative?',
          'Tell me about a game mechanic that felt clunky during playtesting and how you tuned it to feel satisfying.'
        ],
        tipsForSuccess: [
          'Show that technology serves player entertainment and game design vision.',
          'Demonstrate openness to iterative redesign based on playtest feedback.'
        ],
        recommendedPersonaId: 'morgan-chen',
        recommendedTrack: 'Behavioral & Leadership'
      }
    ]
  };
}

export function generateRetailPipeline(companyName: string, roleTitle = 'Software Engineer (E-Commerce)'): CompanyHiringPipeline {
  const company = companyName.trim() || 'Premier Commerce Enterprise';
  const roles = getCompanyRoles(company, 'Retail');
  return {
    companyName: company,
    normalizedName: company.toLowerCase().replace(/[^a-z0-9]/g, ''),
    tagline: `High-throughput commerce engines, distributed inventory & omnichannel scale at ${company}`,
    industry: 'Omnichannel E-Commerce, Logistics & Consumer Marketplaces',
    overview: `${company} processes millions of transactions, managing massive product catalogs, dynamic pricing, and warehouse fulfillment. Engineers are tested on high-throughput microservices, distributed transaction consistency, and consumer-facing reliability.`,
    totalStages: 4,
    cultureHighlights: [
      'Customer obsession and friction-free shopping experience',
      'High-throughput availability during peak flash sales and holiday rushes',
      'Data-driven pricing, catalog search & recommendation intelligence',
      'End-to-end operational accountability across the fulfillment chain'
    ],
    evaluationPhilosophy: `${company} values engineers who build systems that never drop an order, gracefully handle inventory race conditions, and keep checkout latency under 100 milliseconds.`,
    typicalTimeline: '3 to 5 weeks from initial screen to offer decision',
    popularRoles: roles,
    stages: [
      {
        id: `${company.toLowerCase()}-s1`,
        stageNumber: 1,
        name: 'Stage 1: Recruiter Screen & Fit Calibration',
        levelType: 'Phone Screen',
        format: '30-Minute Video / Phone Screen',
        durationMinutes: 30,
        interviewerProfile: 'Talent Acquisition Partner',
        coreCompetencies: ['Background Walkthrough', 'Scale Awareness', 'Communication Clarity'],
        description: `Introductory conversation to explore your engineering accomplishments, distributed systems interest, and motivation for ${company}.`,
        typicalQuestions: [
          `Why are you excited to build e-commerce and retail tech at ${company}?`,
          'Walk me through a project where your service had to handle sudden traffic spikes.'
        ],
        tipsForSuccess: ['Demonstrate awareness of consumer retail scale and measurable performance metrics.'],
        recommendedPersonaId: 'alex-mentor',
        recommendedTrack: 'Behavioral & Leadership'
      },
      {
        id: `${company.toLowerCase()}-s2`,
        stageNumber: 2,
        name: 'Stage 2: Algorithmic Problem Solving & Data Optimization',
        levelType: 'Technical Round',
        format: '60-Minute Live Pair Coding Session',
        durationMinutes: 60,
        interviewerProfile: 'Senior Software Engineer from Commerce Platform',
        coreCompetencies: ['Data Structures & Algorithms', 'Concurrency', 'Time & Space Complexity'],
        description: `Solving practical data structure and algorithmic challenges simulating shopping cart aggregation, routing optimization, or inventory lookups.`,
        typicalQuestions: [
          'Design an in-memory rate-limiter and throttle for promotional coupons or flash sale checkout requests.',
          'Given a directed graph of fulfillment centers and delivery routes, compute the most cost-effective multi-item shipping split.'
        ],
        tipsForSuccess: ['Think aloud and structure clean modular code with edge case checks.'],
        recommendedPersonaId: 'alex-mentor',
        recommendedTrack: 'Technical & Problem Solving'
      },
      {
        id: `${company.toLowerCase()}-s3`,
        stageNumber: 3,
        name: 'Stage 3: Distributed Inventory, Cart & Checkout Architecture',
        levelType: 'System Design',
        format: '60-Minute Distributed Architecture Whiteboard',
        durationMinutes: 60,
        interviewerProfile: 'Staff / Principal Systems Architect',
        coreCompetencies: ['Distributed Locking & Idempotency', 'Event-Driven Microservices (Kafka)', 'Cache Tiering & Invalidation', 'Database Partitioning'],
        description: `Designing a scalable commerce subsystem handling hundreds of thousands of concurrent checkouts without overselling scarce inventory.`,
        typicalQuestions: [
          `Architect the flash sale checkout and inventory reservation service at ${company} handling 100,000 QPS with strict consistency guarantees.`,
          'How do you design a real-time product search and faceted filtering catalog for 50 million items with sub-50ms latency?'
        ],
        tipsForSuccess: [
          'Discuss distributed locks (Redis Redlock), optimistic locking, and Saga pattern for distributed transactions.',
          'Address cache stampedes and CDN caching strategies for catalog assets.'
        ],
        recommendedPersonaId: 'sarah-vp',
        recommendedTrack: 'System Design & Architecture'
      },
      {
        id: `${company.toLowerCase()}-s4`,
        stageNumber: 4,
        name: 'Stage 4: Hiring Manager Bar & Customer Obsession Behavioral',
        levelType: 'Bar Raiser / Executive',
        format: '45-Minute Leadership & Operational Excellence Round',
        durationMinutes: 45,
        interviewerProfile: 'Engineering Director / VP of Commerce',
        coreCompetencies: ['Customer Obsession', 'Outage Post-Mortems', 'Cross-Functional Collaboration'],
        description: `Evaluating leadership principles, how you manage production outages during peak sales, and collaboration with product/business leaders.`,
        typicalQuestions: [
          'Tell me about an outage or production regression you owned during high customer traffic. How did you triage and prevent future recurrences?',
          'Describe a situation where product priorities conflicted with technical debt remediation. How did you reach consensus?'
        ],
        tipsForSuccess: [
          'Show unwavering focus on customer impact and business outcomes.',
          'Frame responses using STAR with quantified metrics.'
        ],
        recommendedPersonaId: 'morgan-chen',
        recommendedTrack: 'Behavioral & Leadership'
      }
    ]
  };
}

export function generateAutomotivePipeline(companyName: string, roleTitle = 'Autonomous Systems Engineer'): CompanyHiringPipeline {
  const company = companyName.trim() || 'Premier Automotive Enterprise';
  const roles = getCompanyRoles(company, 'Automotive');
  return {
    companyName: company,
    normalizedName: company.toLowerCase().replace(/[^a-z0-9]/g, ''),
    tagline: `Autonomous mobility, sensor fusion & functional safety (ISO 26262) at ${company}`,
    industry: 'Autonomous Mobility, Electric Vehicles & Robotics',
    overview: `${company} builds cutting-edge electric powertrains, autonomous vehicle systems, and connected vehicle fleets. Engineers are evaluated on C++ performance, robotics perception, real-time vehicle bus communication (CAN/Ethernet), and functional safety.`,
    totalStages: 4,
    cultureHighlights: [
      'Uncompromising functional safety and hardware-software reliability',
      'First-principles physics and computer vision modeling',
      'Low-latency edge computing and sensor telemetry',
      'Rapid prototype validation paired with rigorous automotive compliance'
    ],
    evaluationPhilosophy: `${company} selects engineers who can write real-time deterministic code that operates reliably in real-world road and weather conditions.`,
    typicalTimeline: '3 to 5 weeks from initial screen to offer decision',
    popularRoles: roles,
    stages: [
      {
        id: `${company.toLowerCase()}-s1`,
        stageNumber: 1,
        name: 'Stage 1: Talent Acquisition & Technical Calibration',
        levelType: 'Phone Screen',
        format: '30-Minute Phone / Video Call',
        durationMinutes: 30,
        interviewerProfile: 'Technical Automotive Recruiter',
        coreCompetencies: ['C++ / Robotics Background', 'Safety Culture', 'Role Alignment'],
        description: `Reviewing your background with autonomous driving, robotics, or embedded systems, and calibration for ${company}'s autonomy missions.`,
        typicalQuestions: [
          `Why do you want to build autonomous and EV systems at ${company}?`,
          'Walk me through a project where sensor noise or latency created challenges in control logic.'
        ],
        tipsForSuccess: ['Demonstrate passion for real-world robotics, computer vision, and automotive safety.'],
        recommendedPersonaId: 'alex-mentor',
        recommendedTrack: 'Behavioral & Leadership'
      },
      {
        id: `${company.toLowerCase()}-s2`,
        stageNumber: 2,
        name: 'Stage 2: C++ Algorithms, Spatial Geometry & Real-Time Logic',
        levelType: 'Technical Round',
        format: '60-Minute Live Coding Session',
        durationMinutes: 60,
        interviewerProfile: 'Senior Autonomy / Controls Software Engineer',
        coreCompetencies: ['C++ Concurrency', 'Spatial Math (Quaternions / Transforms)', 'Kalman Filtering', 'Memory Optimization'],
        description: `Live coding focused on sensor data streams, spatial transformations, trajectory planning algorithms, and multi-threaded data pipelines.`,
        typicalQuestions: [
          'Implement an algorithm to track and associate bounding box detections across consecutive video frames with bounding box IoU matching.',
          'Explain how you implement an Extended Kalman Filter (EKF) to fuse noisy GPS and wheel odometry data.'
        ],
        tipsForSuccess: [
          'Be comfortable with vector math, homogeneous transformations, and memory efficiency.',
          'Emphasize thread-safety in sensor ingestion queues.'
        ],
        recommendedPersonaId: 'alex-mentor',
        recommendedTrack: 'Technical & Problem Solving'
      },
      {
        id: `${company.toLowerCase()}-s3`,
        stageNumber: 3,
        name: 'Stage 3: Vehicle Telemetry & Autonomous Edge Architecture',
        levelType: 'System Design',
        format: '60-Minute Distributed Autonomy Whiteboard',
        durationMinutes: 60,
        interviewerProfile: 'Principal Autonomous Architect / Tech Director',
        coreCompetencies: ['Edge Inference Pipeline', 'CAN / SOME/IP Bus Communication', 'Fail-Safe Architecture', 'Fleet Telemetry (OTA)'],
        description: `Architecting an end-to-end edge vehicle perception or fleet management platform with real-time latency deadlines and over-the-air (OTA) updates.`,
        typicalQuestions: [
          `Architect the on-vehicle sensor fusion pipeline at ${company} combining cameras, LiDAR, and radar into a unified 360-degree scene representation.`,
          'How do you design a reliable, secure Over-The-Air (OTA) firmware update pipeline for 500,000 connected vehicles that guarantees rollbacks on failure?'
        ],
        tipsForSuccess: [
          'Differentiate between edge computing constraints and cloud fleet analytics.',
          'Incorporate fail-safe vs fail-operational modes under camera occlusion or ECU failure.'
        ],
        recommendedPersonaId: 'sarah-vp',
        recommendedTrack: 'System Design & Architecture'
      },
      {
        id: `${company.toLowerCase()}-s4`,
        stageNumber: 4,
        name: 'Stage 4: Safety-Critical Systems & ISO 26262 Engineering Bar',
        levelType: 'Bar Raiser / Executive',
        format: '45-Minute Safety & Executive Values Round',
        durationMinutes: 45,
        interviewerProfile: 'Director of Vehicle Engineering / Chief Safety Officer',
        coreCompetencies: ['ISO 26262 / ASIL-D Standards', 'Safety Integrity', 'Cross-Functional Teamwork'],
        description: `Final leadership evaluation assessing adherence to automotive safety integrity levels (ASIL), personal accountability, and ethical rigor.`,
        typicalQuestions: [
          'Describe a situation where you discovered a subtle software bug that could have safety implications on the road. How did you champion its resolution?',
          'Tell me about a time you worked with hardware engineers to diagnose an intermittent electrical or sensor glitch.'
        ],
        tipsForSuccess: [
          'Never compromise safety standards for delivery speed in your answers.',
          'Demonstrate deep respect for multidisciplinary engineering.'
        ],
        recommendedPersonaId: 'morgan-chen',
        recommendedTrack: 'Behavioral & Leadership'
      }
    ]
  };
}

export function generateServicesPipeline(companyName: string, roleTitle = 'Senior Software Developer'): CompanyHiringPipeline {
  const company = companyName.trim() || 'Premier Global IT Enterprise';
  const roles = getCompanyRoles(company, 'Services');
  return {
    companyName: company,
    normalizedName: company.toLowerCase().replace(/[^a-z0-9]/g, ''),
    tagline: `National qualifier rigor, enterprise delivery & full-stack cloud systems at ${company}`,
    industry: 'Global IT Engineering & Enterprise Digital Services',
    overview: `${company} delivers mission-critical software solutions and digital transformation to global clients. The hiring process emphasizes strong computer science fundamentals, OOP concepts, relational database mastery, full-stack frameworks, and client communication skills.`,
    totalStages: 4,
    cultureHighlights: [
      'Comprehensive computer science fundamentals and disciplined engineering',
      'Client delivery excellence and adaptability to diverse project domains',
      'Continuous upskilling in cloud, AI, and enterprise tech stacks',
      'Collaborative team spirit and professional ethics'
    ],
    evaluationPhilosophy: `${company} evaluates candidates for strong core programming principles, problem-solving speed, clean object-oriented architecture, and positive attitude toward client success.`,
    typicalTimeline: '2 to 4 weeks from initial assessment to offer letter',
    popularRoles: roles,
    stages: [
      {
        id: `${company.toLowerCase()}-s1`,
        stageNumber: 1,
        name: 'Stage 1: National Qualifier / Online Coding & Aptitude Challenge',
        levelType: 'Online Assessment',
        format: '90-Minute Timed Coding & Quantitative Assessment',
        durationMinutes: 90,
        interviewerProfile: 'Automated Testing Platform (HackerRank / Mettl)',
        coreCompetencies: ['Data Structures', 'Algorithmic Problem Solving', 'Quantitative Aptitude', 'Code Efficiency'],
        description: `Standardized online screening evaluating foundational algorithms, string/array manipulations, logic puzzles, and quantitative aptitude.`,
        typicalQuestions: [
          'Given a stream of strings representing product logs, count unique anagram groups with optimal memory complexity.',
          'Find the maximum subarray sum with at least one element replaced by zero.'
        ],
        tipsForSuccess: ['Ensure all edge test cases pass with optimal time complexity.', 'Manage time effectively across aptitude and coding sections.'],
        recommendedPersonaId: 'alex-mentor',
        recommendedTrack: 'Technical & Problem Solving'
      },
      {
        id: `${company.toLowerCase()}-s2`,
        stageNumber: 2,
        name: 'Stage 2: Core Engineering & OOP / DBMS Technical Round',
        levelType: 'Technical Round',
        format: '45-60 Minute Live Technical Interview',
        durationMinutes: 60,
        interviewerProfile: 'Technical Lead / Senior Project Manager',
        coreCompetencies: ['OOP Principles (Java / C# / Python)', 'DBMS & SQL Queries', 'Data Structures', 'Operating Systems'],
        description: `Deep-dive technical assessment probing object-oriented design, normalization, complex SQL joins, indexing, and core runtime concepts.`,
        typicalQuestions: [
          'Explain the 4 pillars of OOP with real-world enterprise code examples. When do you favor composition over inheritance?',
          'Write a SQL query to find the second highest salary in each department using window functions (DENSE_RANK) and explain indexing trade-offs.'
        ],
        tipsForSuccess: [
          'Clearly explain memory models, garbage collection, and multithreading basics.',
          'Write clean, readable code with proper naming conventions.'
        ],
        recommendedPersonaId: 'alex-mentor',
        recommendedTrack: 'Technical & Problem Solving'
      },
      {
        id: `${company.toLowerCase()}-s3`,
        stageNumber: 3,
        name: 'Stage 3: Enterprise Architecture & Full-Stack Systems Round',
        levelType: 'System Design',
        format: '45-60 Minute Project & System Architecture Evaluation',
        durationMinutes: 60,
        interviewerProfile: 'Principal Consultant / Enterprise Architect',
        coreCompetencies: ['REST APIs & Microservices', 'Cloud Fundamentals (AWS/Azure)', 'Design Patterns', 'Project Walkthrough'],
        description: `In-depth walkthrough of your past production projects, architecture choices, framework expertise (Spring Boot, React, Node.js), and cloud deployment.`,
        typicalQuestions: [
          `Walk me through the architecture of the most complex application you built. How did you handle authentication, caching, and database scaling?`,
          'How do you design a resilient RESTful microservices architecture with circuit breakers and central configuration management?'
        ],
        tipsForSuccess: [
          'Be prepared to diagram end-to-end data flow from client frontend to database.',
          'Highlight design patterns used (Singleton, Factory, Observer, Repository).'
        ],
        recommendedPersonaId: 'sarah-vp',
        recommendedTrack: 'System Design & Architecture'
      },
      {
        id: `${company.toLowerCase()}-s4`,
        stageNumber: 4,
        name: 'Stage 4: Managerial & HR Calibration Round',
        levelType: 'Bar Raiser / Executive',
        format: '30-45 Minute Fitment & Behavioral Interview',
        durationMinutes: 30,
        interviewerProfile: 'Senior Delivery Manager & HR Business Partner',
        coreCompetencies: ['Client Communication', 'Flexibility & Adaptability', 'Team Spirit', 'Long-term Goals'],
        description: `Final assessment verifying cultural fitment, willingness to adapt to new technology stacks, client interaction readiness, and career aspirations.`,
        typicalQuestions: [
          'Tell me about a situation where a client requested sudden scope changes near a delivery deadline. How did you manage it?',
          'How do you handle working with team members across different time zones and cultures?'
        ],
        tipsForSuccess: [
          'Show a collaborative, growth-oriented mindset and enthusiasm for learning new tech.',
          'Communicate with confidence and clarity.'
        ],
        recommendedPersonaId: 'morgan-chen',
        recommendedTrack: 'Behavioral & Leadership'
      }
    ]
  };
}

export function generateCybersecurityPipeline(companyName: string, roleTitle = 'Application Security Engineer'): CompanyHiringPipeline {
  const company = companyName.trim() || 'Premier Cybersecurity Enterprise';
  const roles = getCompanyRoles(company, 'Cybersecurity');
  return {
    companyName: company,
    normalizedName: company.toLowerCase().replace(/[^a-z0-9]/g, ''),
    tagline: `Threat intelligence, zero-trust infrastructure & defensive resilience at ${company}`,
    industry: 'Enterprise Cybersecurity & Threat Intelligence',
    overview: `${company} protects mission-critical enterprise systems against nation-state actors and advanced persistent threats. The hiring loop tests secure code review, cryptography, distributed threat detection, and ethical composure.`,
    totalStages: 4,
    cultureHighlights: [
      'Assume breach mindset and zero-trust verification',
      'Uncompromising ethical integrity and confidentiality',
      'Low-level operating systems & network packet forensics',
      'Proactive threat modeling and defense in depth'
    ],
    evaluationPhilosophy: `${company} looks for engineers who think like both an attacker and a defender, identifying subtle design flaws before they become CVEs.`,
    typicalTimeline: '3 to 5 weeks from initial screen to offer decision',
    popularRoles: roles,
    stages: [
      {
        id: `${company.toLowerCase()}-s1`,
        stageNumber: 1,
        name: 'Stage 1: Talent Acquisition & Security Calibration',
        levelType: 'Phone Screen',
        format: '30-Minute Security Background Screen',
        durationMinutes: 30,
        interviewerProfile: 'Cybersecurity Talent Partner',
        coreCompetencies: ['Security Mindset', 'OWASP Top 10', 'Role Alignment'],
        description: `Introductory conversation to explore your security engineering background, certifications or bug bounty track record, and motivation for ${company}.`,
        typicalQuestions: [
          `Why do you want to work on enterprise security at ${company}?`,
          'Walk me through a vulnerability you discovered or remediated in production.'
        ],
        tipsForSuccess: ['Demonstrate clear grasp of defensive concepts and ethical boundaries.'],
        recommendedPersonaId: 'alex-mentor',
        recommendedTrack: 'Behavioral & Leadership'
      },
      {
        id: `${company.toLowerCase()}-s2`,
        stageNumber: 2,
        name: 'Stage 2: Secure Code Analysis & Exploit Mitigation',
        levelType: 'Technical Round',
        format: '60-Minute Vulnerability Identification & Remediation Session',
        durationMinutes: 60,
        interviewerProfile: 'Senior AppSec Engineer / Red Team Lead',
        coreCompetencies: ['Secure Code Review', 'Injection & XSS Defense', 'Authentication & JWT Flaws', 'Memory Safety'],
        description: `Reviewing real vulnerable source code snippets to identify weaknesses, explain exploit vectors, and write secure patches.`,
        typicalQuestions: [
          'Analyze this code snippet handling OAuth 2.0 PKCE tokens. Identify three security flaws and write remediated logic.',
          'Explain how SSRF (Server-Side Request Forgery) occurs in microservices and how to implement defense-in-depth network validation.'
        ],
        tipsForSuccess: ['Think methodically through input validation, context encoding, and privilege levels.'],
        recommendedPersonaId: 'alex-mentor',
        recommendedTrack: 'Technical & Problem Solving'
      },
      {
        id: `${company.toLowerCase()}-s3`,
        stageNumber: 3,
        name: 'Stage 3: Zero-Trust Distributed Architecture & Threat Modeling',
        levelType: 'System Design',
        format: '60-Minute Threat Modeling & System Design Whiteboard',
        durationMinutes: 60,
        interviewerProfile: 'Principal Security Architect / CISO Staff',
        coreCompetencies: ['STRIDE Threat Modeling', 'mTLS & Service Mesh', 'Identity & Access Management (IAM)', 'SIEM & Anomaly Detection'],
        description: `Designing secure enterprise infrastructure and conducting a STRIDE threat model across network boundaries, data stores, and public APIs.`,
        typicalQuestions: [
          `Design a global Zero-Trust corporate access proxy at ${company} supporting 100,000 employees with context-aware device authentication.`,
          'How do you design a real-time SIEM event pipeline ingesting 1 million security logs/sec with automated SOAR alert triage?'
        ],
        tipsForSuccess: [
          'Diagram trust boundaries clearly and apply STRIDE to each data flow.',
          'Emphasize least-privilege principles and secrets management (Vault/KMS).'
        ],
        recommendedPersonaId: 'sarah-vp',
        recommendedTrack: 'System Design & Architecture'
      },
      {
        id: `${company.toLowerCase()}-s4`,
        stageNumber: 4,
        name: 'Stage 4: Incident Response & Ethical Trust Review',
        levelType: 'Bar Raiser / Executive',
        format: '45-Minute Executive & Ethical Governance Round',
        durationMinutes: 45,
        interviewerProfile: 'VP of Security / Head of Threat Research',
        coreCompetencies: ['Crisis Incident Response', 'Ethical Governance', 'Cross-Functional De-escalation'],
        description: `Evaluating how you maintain calm under live ransomware/breach scenarios, communicate with executive leaders, and uphold ethical trust.`,
        typicalQuestions: [
          'You suspect a critical production database has been compromised right before a major product launch. Walk me step-by-step through your incident response protocol.',
          'How do you balance high security controls with engineering developer productivity?'
        ],
        tipsForSuccess: [
          'Demonstrate structured incident management (Identify, Protect, Detect, Respond, Recover).',
          'Show empathy for developer velocity while holding firm on security baselines.'
        ],
        recommendedPersonaId: 'morgan-chen',
        recommendedTrack: 'Behavioral & Leadership'
      }
    ]
  };
}

export function generateHealthcarePipeline(companyName: string, roleTitle = 'HealthTech Software Engineer'): CompanyHiringPipeline {
  const company = companyName.trim() || 'Premier Healthcare Enterprise';
  const roles = getCompanyRoles(company, 'Healthcare');
  return {
    companyName: company,
    normalizedName: company.toLowerCase().replace(/[^a-z0-9]/g, ''),
    tagline: `HIPAA compliance, biomedical data platforms & life-saving software at ${company}`,
    industry: 'Healthcare, Life Sciences & Biomedical Systems',
    overview: `${company} builds clinical health applications, patient records platforms, and biomedical data systems. The hiring loop evaluates data privacy (HIPAA/GDPR), distributed consistency, interoperability standards (FHIR/HL7), and ethical devotion to patient care.`,
    totalStages: 4,
    cultureHighlights: [
      'Patient privacy and strict regulatory compliance (HIPAA / HITECH)',
      'Zero-downtime reliability for clinical care systems',
      'Interoperability with healthcare standards (FHIR, HL7, DICOM)',
      'Empathetic design centered on clinicians and patients'
    ],
    evaluationPhilosophy: `${company} selects candidates who demonstrate uncompromising respect for patient health information and building fault-tolerant software where bugs can affect patient outcomes.`,
    typicalTimeline: '3 to 5 weeks from initial screen to offer decision',
    popularRoles: roles,
    stages: [
      {
        id: `${company.toLowerCase()}-s1`,
        stageNumber: 1,
        name: 'Stage 1: Talent Acquisition & Fit Calibration',
        levelType: 'Phone Screen',
        format: '30-Minute Video / Phone Screen',
        durationMinutes: 30,
        interviewerProfile: 'Healthcare Talent Specialist',
        coreCompetencies: ['Background Walkthrough', 'Healthcare Passion', 'Regulatory Awareness'],
        description: `Introductory conversation to explore your background, interest in health technology, and familiarity with clinical software needs.`,
        typicalQuestions: [
          `What motivates you to work in health technology at ${company}?`,
          'Walk me through a project where data privacy or sensitive customer data required special architectural safeguards.'
        ],
        tipsForSuccess: ['Demonstrate understanding of the societal impact and responsibility of healthcare technology.'],
        recommendedPersonaId: 'alex-mentor',
        recommendedTrack: 'Behavioral & Leadership'
      },
      {
        id: `${company.toLowerCase()}-s2`,
        stageNumber: 2,
        name: 'Stage 2: Technical Coding & Data Pipeline Validation',
        levelType: 'Technical Round',
        format: '60-Minute Live Coding Session',
        durationMinutes: 60,
        interviewerProfile: 'Senior Health Data Engineer',
        coreCompetencies: ['Data Structures & Algorithms', 'Data Cleaning & Validation', 'Concurrency & Thread Safety'],
        description: `Algorithmic problem solving focusing on data ingestion, temporal patient event streams, and deterministic validation.`,
        typicalQuestions: [
          'Design an algorithm to merge and deduplicate overlapping patient medical record timelines from disparate clinical sources.',
          'Implement a thread-safe cache for patient vital signs with automatic TTL eviction and anomaly threshold alerts.'
        ],
        tipsForSuccess: ['Highlight input sanitization and defensive edge case validation.'],
        recommendedPersonaId: 'alex-mentor',
        recommendedTrack: 'Technical & Problem Solving'
      },
      {
        id: `${company.toLowerCase()}-s3`,
        stageNumber: 3,
        name: 'Stage 3: Distributed Health Data & Interoperability Architecture',
        levelType: 'System Design',
        format: '60-Minute Health Systems Architecture Whiteboard',
        durationMinutes: 60,
        interviewerProfile: 'Principal Healthcare Architect',
        coreCompetencies: ['FHIR / HL7 Data Modeling', 'HIPAA Encryption at Rest/Transit', 'Audit Logging & BAA Compliance', 'Disaster Recovery'],
        description: `Architecting a distributed clinical data platform that integrates electronic health records (EHR) with strict access control and auditing.`,
        typicalQuestions: [
          `Design the FHIR-compliant Electronic Health Record (EHR) exchange platform for ${company} with immutable audit trails.`,
          'How do you architect an encrypted patient messaging and telehealth video streaming platform with sub-second latency and HIPAA compliance?'
        ],
        tipsForSuccess: [
          'Discuss field-level encryption, tokenization of Protected Health Information (PHI), and immutable audit logs.',
          'Demonstrate familiarity with FHIR REST APIs and resource schemas.'
        ],
        recommendedPersonaId: 'sarah-vp',
        recommendedTrack: 'System Design & Architecture'
      },
      {
        id: `${company.toLowerCase()}-s4`,
        stageNumber: 4,
        name: 'Stage 4: Clinical Ethics, Patient Privacy & Values Round',
        levelType: 'Bar Raiser / Executive',
        format: '45-Minute Medical Ethics & Values Round',
        durationMinutes: 45,
        interviewerProfile: 'VP of Health Engineering / Chief Medical Officer',
        coreCompetencies: ['Clinical Empathy', 'Ethical Stewardship', 'Collaboration with Clinicians'],
        description: `Final assessment evaluating ethics, how you handle privacy dilemmas, and collaboration with clinicians and researchers.`,
        typicalQuestions: [
          'Describe a situation where you had to push back on a feature design because it compromised user data privacy or consent.',
          'How do you approach designing user interfaces or workflows when the primary user is an exhausted nurse or physician in an emergency room?'
        ],
        tipsForSuccess: [
          'Highlight empathy for healthcare providers and patients.',
          'Demonstrate clear moral clarity regarding patient rights.'
        ],
        recommendedPersonaId: 'morgan-chen',
        recommendedTrack: 'Behavioral & Leadership'
      }
    ]
  };
}

export function generateHardwarePipeline(companyName: string, roleTitle = 'Silicon Systems Engineer'): CompanyHiringPipeline {
  const company = companyName.trim() || 'Premier Semiconductor Enterprise';
  const roles = getCompanyRoles(company, 'Hardware');
  return {
    companyName: company,
    normalizedName: company.toLowerCase().replace(/[^a-z0-9]/g, ''),
    tagline: `Silicon architecture, low-level microcode & accelerated computing at ${company}`,
    industry: 'Semiconductors, Accelerated Computing & Hardware Architecture',
    overview: `${company} designs accelerated chips, GPU architectures, and low-level firmware. The interview process probes deep computer architecture, cache hierarchies, DMA, PCIe protocols, and C/C++ low-level systems programming.`,
    totalStages: 4,
    cultureHighlights: [
      'First-principles silicon engineering and tapeout perfection',
      'Cycle-accurate performance optimization and microarchitecture',
      'Hardware-software co-design and driver efficiency',
      'Uncompromising technical rigor across verification and emulation'
    ],
    evaluationPhilosophy: `${company} evaluates how deeply you understand physical hardware execution, memory barriers, cache lines, and low-level driver logic.`,
    typicalTimeline: '3 to 5 weeks from initial screen to offer decision',
    popularRoles: roles,
    stages: [
      {
        id: `${company.toLowerCase()}-s1`,
        stageNumber: 1,
        name: 'Stage 1: Technical Talent Screening',
        levelType: 'Phone Screen',
        format: '30-Minute Video / Phone Call',
        durationMinutes: 30,
        interviewerProfile: 'Hardware Systems Talent Partner',
        coreCompetencies: ['Computer Architecture Basics', 'C/C++ Background', 'Role Alignment'],
        description: `Preliminary interview assessing hardware-software integration experience, silicon projects, and motivation for ${company}.`,
        typicalQuestions: [
          `Why do you want to work on silicon and low-level systems at ${company}?`,
          'Walk me through a project where you debugged a low-level driver or silicon emulation anomaly.'
        ],
        tipsForSuccess: ['Demonstrate fluency with assembly, C/C++, and hardware architecture concepts.'],
        recommendedPersonaId: 'alex-mentor',
        recommendedTrack: 'Behavioral & Leadership'
      },
      {
        id: `${company.toLowerCase()}-s2`,
        stageNumber: 2,
        name: 'Stage 2: Low-Level C/C++, Bitwise Logic & Memory Hierarchy',
        levelType: 'Technical Round',
        format: '60-Minute Live Low-Level Coding Session',
        durationMinutes: 60,
        interviewerProfile: 'Principal Firmware / Driver Engineer',
        coreCompetencies: ['Bitwise Operations', 'DMA & Memory-Mapped I/O', 'Cache Coherency & Memory Barriers', 'Concurrency'],
        description: `Writing low-level C code interacting directly with hardware registers, ring buffers, and DMA descriptors.`,
        typicalQuestions: [
          'Write a C driver routine to program a DMA controller for scatter-gather transfers with proper memory barrier synchronization.',
          'Explain the difference between write-through and write-back caches and how MESI cache coherency protocol functions.'
        ],
        tipsForSuccess: [
          'Explain volatile keyword, alignment requirements, and atomic memory operations.',
          'Articulate how CPU pipelines branch-predict and handle stalls.'
        ],
        recommendedPersonaId: 'alex-mentor',
        recommendedTrack: 'Technical & Problem Solving'
      },
      {
        id: `${company.toLowerCase()}-s3`,
        stageNumber: 3,
        name: 'Stage 3: Computer Architecture & Silicon Emulation Architecture',
        levelType: 'System Design',
        format: '60-Minute Computer Architecture Whiteboard',
        durationMinutes: 60,
        interviewerProfile: 'Distinguished Silicon Architect',
        coreCompetencies: ['PCIe & AXI Bus Protocols', 'Hardware-Software Co-design', 'GPU / NPU Accelerator Pipelines', 'Silicon Emulation'],
        description: `Designing accelerated hardware-software pipelines, PCIe interconnects, or AI tensor processor execution graphs.`,
        typicalQuestions: [
          `Architect the memory subsystem and PCIe Gen 5 host interface for an AI inference accelerator card at ${company}.`,
          'How do you design a cycle-accurate emulator to profile cache miss penalties before silicon tapeout?'
        ],
        tipsForSuccess: [
          'Discuss bandwidth bottlenecks (HBM vs DDR5), NUMA nodes, and memory controller arbitration.',
          'Diagram latency budgets for host-to-device transfers.'
        ],
        recommendedPersonaId: 'sarah-vp',
        recommendedTrack: 'System Design & Architecture'
      },
      {
        id: `${company.toLowerCase()}-s4`,
        stageNumber: 4,
        name: 'Stage 4: Chief Architect Review & Silicon Rigor Bar',
        levelType: 'Bar Raiser / Executive',
        format: '45-Minute Senior Technical Leadership Round',
        durationMinutes: 45,
        interviewerProfile: 'VP of Silicon Architecture / Fellow',
        coreCompetencies: ['First-Principles Thinking', 'Tapeout Commitment', 'Cross-Disciplinary Teamwork'],
        description: `Final assessment evaluating problem solving under high-stakes silicon deadlines, cross-team collaboration with EDA tools and fabrication partners.`,
        typicalQuestions: [
          'Silicon fabrication errors cost millions of dollars and months of delay. Describe how you approach verification to guarantee zero defect escapes.',
          'Tell me about an instance where you pushed back against a specification because it created an unviable hardware constraint.'
        ],
        tipsForSuccess: [
          'Demonstrate obsession with rigorous verification and testing.',
          'Show deep pride in building the physical foundation of modern computing.'
        ],
        recommendedPersonaId: 'morgan-chen',
        recommendedTrack: 'Behavioral & Leadership'
      }
    ]
  };
}

export function generateTelecomPipeline(companyName: string, roleTitle = 'Telecommunications Network Engineer'): CompanyHiringPipeline {
  const company = companyName.trim() || 'Premier Telecom Enterprise';
  const roles = getCompanyRoles(company, 'Telecom');
  return {
    companyName: company,
    normalizedName: company.toLowerCase().replace(/[^a-z0-9]/g, ''),
    tagline: `Carrier-grade 5G infrastructure, packet core & cloud networking at ${company}`,
    industry: 'Telecommunications, 5G Infrastructure & Cloud Networking',
    overview: `${company} operates carrier-grade telecommunications backbones, 5G radio access networks (RAN), and cloud-native software-defined networks (SDN). Engineers are evaluated on network protocols, DPDK packet acceleration, five-nines (99.999%) uptime, and distributed resilience.`,
    totalStages: 4,
    cultureHighlights: [
      'Five-nines (99.999%) carrier-grade reliability',
      'Ultra-reliable low-latency communication (URLLC)',
      'Software-defined networking (SDN) and network function virtualization (NFV)',
      'Operational excellence across 24/7 mission-critical operations'
    ],
    evaluationPhilosophy: `${company} evaluates how well you design resilient network systems that handle unexpected fiber cuts, BGP flapping, and massive concurrent cellular connections without dropping calls or packets.`,
    typicalTimeline: '3 to 5 weeks from initial screen to offer decision',
    popularRoles: roles,
    stages: [
      {
        id: `${company.toLowerCase()}-s1`,
        stageNumber: 1,
        name: 'Stage 1: Technical Talent Screening',
        levelType: 'Phone Screen',
        format: '30-Minute Video / Phone Screen',
        durationMinutes: 30,
        interviewerProfile: 'Telecom Talent Partner',
        coreCompetencies: ['Networking Fundamentals', 'OSI Model & TCP/IP', 'Role Alignment'],
        description: `Introductory conversation to evaluate your experience with networking protocols, cloud platforms, and motivation for ${company}.`,
        typicalQuestions: [
          `Why are you interested in telecommunications infrastructure at ${company}?`,
          'Walk me through how you troubleshoot a packet drop issue in a complex network topology.'
        ],
        tipsForSuccess: ['Demonstrate clear grasp of TCP/IP, routing protocols, and carrier infrastructure.'],
        recommendedPersonaId: 'alex-mentor',
        recommendedTrack: 'Behavioral & Leadership'
      },
      {
        id: `${company.toLowerCase()}-s2`,
        stageNumber: 2,
        name: 'Stage 2: Low-Level Packet Processing & C/C++ Systems',
        levelType: 'Technical Round',
        format: '60-Minute Live Coding & Network Socket Programming',
        durationMinutes: 60,
        interviewerProfile: 'Senior Network Software Engineer',
        coreCompetencies: ['Socket Programming', 'DPDK / eBPF Kernel Bypass', 'Concurrency', 'Buffer Ring Optimization'],
        description: `Writing high-throughput socket programming routines and evaluating knowledge of Linux networking stack, eBPF, or DPDK.`,
        typicalQuestions: [
          'Implement an asynchronous epoll-based packet router handling 100,000 concurrent UDP connections.',
          'Explain how DPDK bypasses the Linux kernel network stack and why zero-copy ring buffers prevent CPU cache thrashing.'
        ],
        tipsForSuccess: ['Explain memory alignment and zero-copy packet descriptor structures.'],
        recommendedPersonaId: 'alex-mentor',
        recommendedTrack: 'Technical & Problem Solving'
      },
      {
        id: `${company.toLowerCase()}-s3`,
        stageNumber: 3,
        name: 'Stage 3: 5G Core & Carrier-Grade Network Architecture',
        levelType: 'System Design',
        format: '60-Minute Network Architecture Whiteboard',
        durationMinutes: 60,
        interviewerProfile: 'Principal Network Architect',
        coreCompetencies: ['5G Standalone Core (5G SA)', 'Network Slicing', 'BGP & MPLS Routing', 'High Availability (Five-Nines)'],
        description: `Designing a scalable cloud-native 5G core user plane function (UPF) with automated failover and dynamic network slicing.`,
        typicalQuestions: [
          `Architect the 5G Core User Plane Function (UPF) at ${company} handling 10 Terabits/sec of mobile data traffic across redundant edge nodes.`,
          'How do you design a multi-region software-defined WAN (SD-WAN) connecting 500 edge enterprise data centers with automated failover under fiber severance?'
        ],
        tipsForSuccess: [
          'Discuss control-plane / user-plane separation (CUPS) and Kubernetes CNFs.',
          'Detail automated failover mechanics with sub-50ms convergence.'
        ],
        recommendedPersonaId: 'sarah-vp',
        recommendedTrack: 'System Design & Architecture'
      },
      {
        id: `${company.toLowerCase()}-s4`,
        stageNumber: 4,
        name: 'Stage 4: Operational Stewardship & Network Reliability Bar',
        levelType: 'Bar Raiser / Executive',
        format: '45-Minute Engineering Leadership Round',
        durationMinutes: 45,
        interviewerProfile: 'Director of Network Operations / VP of Infrastructure',
        coreCompetencies: ['Outage Prevention', 'Post-Mortem Accountability', 'Cross-Functional Leadership'],
        description: `Final assessment evaluating calm decision making during widespread carrier outages, root cause analysis, and operational stewardship.`,
        typicalQuestions: [
          'Describe a situation where a network change created an unintended regional outage. How did you coordinate the rollback and communicate with customers?',
          'How do you foster a culture where junior engineers feel safe proposing changes while strictly adhering to change management procedures?'
        ],
        tipsForSuccess: ['Emphasize blameless post-mortems and rigorous canary deployment practices.'],
        recommendedPersonaId: 'morgan-chen',
        recommendedTrack: 'Behavioral & Leadership'
      }
    ]
  };
}

export function generateFallbackPipeline(companyName: string, roleTitle = 'Software Engineer'): CompanyHiringPipeline {
  const company = companyName.trim() || 'Premier Global Enterprise';
  const detected = detectCompanyIndustry(company);

  if (detected.category === 'banking') return generateBankingPipeline(company, roleTitle);
  if (detected.category === 'aerospace') return generateAerospacePipeline(company, roleTitle);
  if (detected.category === 'consulting') return generateConsultingPipeline(company, roleTitle);
  if (detected.category === 'gaming') return generateGamingPipeline(company, roleTitle);
  if (detected.category === 'retail') return generateRetailPipeline(company, roleTitle);
  if (detected.category === 'automotive') return generateAutomotivePipeline(company, roleTitle);
  if (detected.category === 'cybersecurity') return generateCybersecurityPipeline(company, roleTitle);
  if (detected.category === 'healthcare') return generateHealthcarePipeline(company, roleTitle);
  if (detected.category === 'hardware') return generateHardwarePipeline(company, roleTitle);
  if (detected.category === 'services') return generateServicesPipeline(company, roleTitle);
  if (detected.category === 'telecom') return generateTelecomPipeline(company, roleTitle);

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
  category: 'tech' | 'banks' | 'fintech' | 'consulting' | 'healthcare' | 'defense' | 'automotive' | 'aerospace' | 'gaming' | 'retail' | 'telecom' | 'cybersecurity' | 'hardware' | 'services';
  tagline: string;
}

export const ALL_SUPPORTED_COMPANIES: SupportedCompanyMeta[] = [
  // 1. Tech Giants & Big Tech
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
    category: 'hardware',
    tagline: 'Accelerated computing, CUDA & first-principles architecture',
  },
  {
    name: 'Salesforce',
    aliases: ['crm', 'agentforce', 'force.com'],
    industry: 'Enterprise Cloud SaaS, CRM & AI Agentforce',
    category: 'tech',
    tagline: 'Multi-tenant cloud architecture, Agentforce & Ohana values',
  },
  {
    name: 'Adobe',
    aliases: ['creative cloud', 'photoshop', 'firefly'],
    industry: 'Creative Software, Document Cloud & Generative AI',
    category: 'tech',
    tagline: 'Digital experience platforms & GPU creative acceleration',
  },
  {
    name: 'Spotify',
    aliases: ['audio', 'streaming', 'music'],
    industry: 'Audio Streaming, Recommendation AI & Developer Culture',
    category: 'tech',
    tagline: 'Squad framework, graph recommendation algorithms & low latency audio',
  },
  {
    name: 'Oracle',
    aliases: ['oci', 'java', 'database'],
    industry: 'Enterprise Database, Autonomous Cloud & ERP',
    category: 'tech',
    tagline: 'OCI distributed architecture & mission-critical database clustering',
  },
  {
    name: 'Cisco',
    aliases: ['networking', 'catalyst', 'webex'],
    industry: 'Networking Hardware, Enterprise Telemetry & Cloud Security',
    category: 'telecom',
    tagline: 'Carrier-grade routing, Silicon One & enterprise network resilience',
  },
  {
    name: 'Intel',
    aliases: ['intel corp', 'xeon', 'core'],
    industry: 'Semiconductors, Silicon Microarchitecture & Foundries',
    category: 'hardware',
    tagline: 'x86 microarchitecture, chip packaging & low-level compiler optimization',
  },
  {
    name: 'AMD',
    aliases: ['advanced micro devices', 'ryzen', 'epyc', 'radeon'],
    industry: 'Semiconductors, High-Performance Computing & GPUs',
    category: 'hardware',
    tagline: 'Chiplet packaging, ROCm software stack & high-performance computing',
  },
  {
    name: 'Snowflake',
    aliases: ['data warehouse', 'cortex'],
    industry: 'Cloud Data Warehouse & AI Data Cloud',
    category: 'tech',
    tagline: 'Separation of storage and compute & multi-cluster virtual warehouses',
  },
  {
    name: 'Databricks',
    aliases: ['spark', 'lakehouse', 'delta lake'],
    industry: 'Data Intelligence Platform, Apache Spark & AI Models',
    category: 'tech',
    tagline: 'Unified Lakehouse architecture, Photon engine & distributed AI',
  },
  {
    name: 'Palantir',
    aliases: ['pltr', 'foundry', 'gotham', 'aip'],
    industry: 'Enterprise Intelligence, Defense & Data Platforms',
    category: 'defense',
    tagline: 'The Decomp Round, graph models & mission-critical defense',
  },
  {
    name: 'OpenAI',
    aliases: ['chatgpt', 'gpt', 'sam altman'],
    industry: 'Artificial General Intelligence & Frontier Foundation Models',
    category: 'tech',
    tagline: 'Frontier model research, RLHF training clusters & scalable inference APIs',
  },

  // 2. Investment Banking & Capital Markets
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
    name: 'Wells Fargo',
    aliases: ['wellsfargo', 'wf'],
    industry: 'Commercial & Retail Banking, Wealth Management',
    category: 'banks',
    tagline: 'Core consumer banking rails, enterprise auditability & compliance',
  },
  {
    name: 'Deutsche Bank',
    aliases: ['db', 'deutsche'],
    industry: 'Investment Banking, Capital Markets & Corporate Bank',
    category: 'banks',
    tagline: 'European financial rails, FX algorithmic execution & risk analytics',
  },
  {
    name: 'UBS',
    aliases: ['ubs group', 'swiss bank'],
    industry: 'Global Wealth Management & Investment Banking',
    category: 'banks',
    tagline: 'Global wealth platforms, low-latency equities & fiduciary precision',
  },

  // 3. Fintech Pioneers
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
    name: 'PayPal',
    aliases: ['venmo', 'braintree'],
    industry: 'Global Digital Payments & Merchant Checkout',
    category: 'fintech',
    tagline: 'High-throughput payment gateway resilience & distributed risk scoring',
  },
  {
    name: 'Robinhood',
    aliases: ['hood', 'brokerage'],
    industry: 'Retail Brokerage, Crypto & Financial Tech',
    category: 'fintech',
    tagline: 'Real-time order routing, market data feeds & zero-commission brokerage',
  },

  // 4. Aerospace & Defense
  {
    name: 'SpaceX',
    aliases: ['space exploration technologies', 'starlink', 'falcon', 'starship'],
    industry: 'Aerospace, Defense & Mission-Critical Systems',
    category: 'aerospace',
    tagline: 'Flight software determinism, Starlink constellations & multiplanetary engineering',
  },
  {
    name: 'Boeing',
    aliases: ['commercial airplanes', 'defense space'],
    industry: 'Aerospace, Defense & Mission-Critical Systems',
    category: 'aerospace',
    tagline: 'Avionics DO-178C certification, fly-by-wire controls & systems safety',
  },
  {
    name: 'Lockheed Martin',
    aliases: ['skunk works', 'defense'],
    industry: 'Aerospace, Defense & Mission-Critical Systems',
    category: 'aerospace',
    tagline: 'Skunk Works innovation, mission avionics & autonomous defense platforms',
  },
  {
    name: 'NASA',
    aliases: ['jpl', 'national aeronautics and space administration'],
    industry: 'Aerospace, Defense & Mission-Critical Systems',
    category: 'aerospace',
    tagline: 'Deep space telemetry, autonomous rover navigation & zero-defect flight systems',
  },

  // 5. Automotive & Autonomy
  {
    name: 'Tesla',
    aliases: ['tsla', 'autopilot', 'fsd', 'optimus'],
    industry: 'Electric Vehicles, Autopilot AI, Robotics & Energy',
    category: 'automotive',
    tagline: 'Autopilot vision, low-level systems & architecture presentation',
  },
  {
    name: 'Rivian',
    aliases: ['r1t', 'r1s', 'edv'],
    industry: 'Electric Vehicles, Connected Fleet Software & Powertrain',
    category: 'automotive',
    tagline: 'Custom automotive OS, battery management systems & adventure tech',
  },
  {
    name: 'Waymo',
    aliases: ['alphabet autonomous', 'self driving car'],
    industry: 'Autonomous Mobility, Sensor Fusion & Robotics AI',
    category: 'automotive',
    tagline: 'Full level-4 autonomous driving stack, sensor fusion & simulation testing',
  },

  // 6. Consulting & Strategy
  {
    name: 'McKinsey & Company',
    aliases: ['mckinsey', 'mckinsey digital', 'quantumblack'],
    industry: 'Management, Technology & Strategy Consulting',
    category: 'consulting',
    tagline: 'Strategic hypothesis framing, QuantumBlack AI & C-level tech transformation',
  },
  {
    name: 'Boston Consulting Group (BCG)',
    aliases: ['bcg', 'bcg x', 'boston consulting'],
    industry: 'Management, Technology & Strategy Consulting',
    category: 'consulting',
    tagline: 'BCG X deep engineering, enterprise digital ventures & case architecture',
  },
  {
    name: 'Bain & Company',
    aliases: ['bain', 'bain consulting'],
    industry: 'Management, Technology & Strategy Consulting',
    category: 'consulting',
    tagline: 'Results delivery, enterprise private equity advisory & digital roadmaps',
  },
  {
    name: 'Deloitte',
    aliases: ['deloitte consulting', 'deloitte digital'],
    industry: 'Management, Technology & Strategy Consulting',
    category: 'consulting',
    tagline: 'Enterprise cloud transformation, ERP advisory & large-scale modernization',
  },
  {
    name: 'Accenture',
    aliases: ['accenture technology', 'accenture song'],
    industry: 'Management, Technology & Strategy Consulting',
    category: 'consulting',
    tagline: 'Global systems integration, cloud scale & client delivery excellence',
  },
  {
    name: 'PricewaterhouseCoopers (PwC)',
    aliases: ['pwc', 'pricewaterhousecoopers'],
    industry: 'Management, Technology & Strategy Consulting',
    category: 'consulting',
    tagline: 'Enterprise transformation, cybersecurity advisory & cloud consulting',
  },
  {
    name: 'Ernst & Young (EY)',
    aliases: ['ey', 'ernst and young', 'ernst & young'],
    industry: 'Management, Technology & Strategy Consulting',
    category: 'consulting',
    tagline: 'Technology transformation, risk intelligence & digital advisory',
  },
  {
    name: 'KPMG',
    aliases: ['kpmg consulting'],
    industry: 'Management, Technology & Strategy Consulting',
    category: 'consulting',
    tagline: 'Enterprise systems advisory, regulatory compliance & digital strategy',
  },

  // 7. IT Services & Global Engineering Giants
  {
    name: 'Tata Consultancy Services (TCS)',
    aliases: ['tcs', 'tata', 'tata consultancy'],
    industry: 'Global IT Engineering & Enterprise Digital Services',
    category: 'services',
    tagline: 'National qualifier challenge, core CS rigor & enterprise delivery scale',
  },
  {
    name: 'Infosys',
    aliases: ['infy', 'infosys limited'],
    industry: 'Global IT Engineering & Enterprise Digital Services',
    category: 'services',
    tagline: 'Topaz AI, digital core modernization & global engineering delivery',
  },
  {
    name: 'Wipro',
    aliases: ['wipro limited', 'wipro technologies'],
    industry: 'Global IT Engineering & Enterprise Digital Services',
    category: 'services',
    tagline: 'FullStride cloud services, enterprise engineering & digital consulting',
  },

  // 8. Retail, E-Commerce & Consumer Tech
  {
    name: 'Walmart',
    aliases: ['walmart global tech', 'walmart labs'],
    industry: 'Omnichannel E-Commerce, Logistics & Consumer Marketplaces',
    category: 'retail',
    tagline: 'Hyper-scale retail catalogs, automated supply chain & omnichannel checkout',
  },
  {
    name: 'Flipkart',
    aliases: ['flipkart internet', 'big billion days'],
    industry: 'Omnichannel E-Commerce, Logistics & Consumer Marketplaces',
    category: 'retail',
    tagline: 'Big Billion Days flash sale scale, distributed cart ledgers & mobile commerce',
  },
  {
    name: 'Zomato',
    aliases: ['zomato online', 'blinkit'],
    industry: 'Food Delivery, Quick Commerce & Hyperlocal Logistics',
    category: 'retail',
    tagline: 'Hyperlocal rider dispatch, real-time geofencing & high-QPS search',
  },
  {
    name: 'Swiggy',
    aliases: ['swiggy instamart'],
    industry: 'Food Delivery, Quick Commerce & Hyperlocal Logistics',
    category: 'retail',
    tagline: 'Sub-15 minute grocery routing, dark store inventory & geospatial matching',
  },

  // 9. Gaming & Interactive Entertainment
  {
    name: 'Epic Games',
    aliases: ['unreal engine', 'fortnite'],
    industry: 'Interactive Entertainment, Game Engines & Multiplayer Systems',
    category: 'gaming',
    tagline: 'Unreal Engine 5 Nanite/Lumen, 100-player Battle Royale netcode & Metaverse',
  },
  {
    name: 'Riot Games',
    aliases: ['league of legends', 'valorant'],
    industry: 'Interactive Entertainment, Game Engines & Multiplayer Systems',
    category: 'gaming',
    tagline: '128-tick competitive game servers, Vanguard anti-cheat & player obsession',
  },
  {
    name: 'Roblox',
    aliases: ['rblx', 'roblox studio'],
    industry: 'Interactive Entertainment, Game Engines & Multiplayer Systems',
    category: 'gaming',
    tagline: 'Distributed physics simulation, global creator economy & Lua engine scale',
  },

  // 10. Cybersecurity & Infrastructure
  {
    name: 'CrowdStrike',
    aliases: ['falcon', 'crwd'],
    industry: 'Enterprise Cybersecurity & Threat Intelligence',
    category: 'cybersecurity',
    tagline: 'Falcon kernel telemetry, real-time graph threat intelligence & zero-trust',
  },
  {
    name: 'Palo Alto Networks',
    aliases: ['panw', 'prisma', 'cortex'],
    industry: 'Enterprise Cybersecurity & Threat Intelligence',
    category: 'cybersecurity',
    tagline: 'Next-Gen Firewalls, SASE architecture & automated SOC security operations',
  },

  // 11. Healthcare & Life Sciences
  {
    name: 'Pfizer',
    aliases: ['pfizer inc', 'biopharma'],
    industry: 'Healthcare, Life Sciences & Biomedical Systems',
    category: 'healthcare',
    tagline: 'Clinical trial analytics, biomedical data pipelines & life sciences software',
  },
  {
    name: 'Qualcomm',
    aliases: ['snapdragon', 'qcom'],
    industry: 'Semiconductors, 5G Wireless & Mobile Compute',
    category: 'hardware',
    tagline: 'Snapdragon NPU acceleration, 5G modems & low-power ARM architecture',
  }
];

// Recognized acronyms and abbreviations without conventional vowels
const KNOWN_ACRONYMS = new Set([
  'IBM', 'HP', 'BMW', 'AMD', 'TCS', 'PWC', 'EY', 'KPMG', 'SAP', 'AWS',
  'BYD', 'BCG', 'S&P', 'GE', '3M', 'MSI', 'JLL', 'DXC', 'HCL', 'CVS',
  'GS', 'MS', 'JPM', 'BOFA', 'TDK', 'NTT', 'SNC', 'GLG', 'KKR', 'LG',
  'BP', 'GM', 'VW', 'UPS', 'DHL', 'ZTE', 'CGI', 'ABB', 'CNO', 'TJX'
]);

export function formatCompanyName(raw: string): string {
  const trimmed = raw.trim();
  // Preserve intentional casing if user typed camelCase or all-caps (e.g. SpaceX, eBay, IBM, OpenAI)
  if (/[a-z][A-Z]/.test(trimmed) || /^[A-Z0-9&.-]+$/.test(trimmed)) {
    return trimmed;
  }
  // Title-case standard word strings (e.g. "spotify" -> "Spotify", "infosys" -> "Infosys")
  return trimmed
    .split(/\s+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
}

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

  if (clean.length > 55) {
    return {
      isValid: false,
      suggestions: POPULAR_COMPANIES.slice(0, 5),
      error: 'Company name is too long. Please enter a valid organization name.'
    };
  }

  const lower = clean.toLowerCase();

  // Helper to build intelligent suggestions
  const buildSuggestions = (): string[] => {
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

    return Array.from(new Set(scored.concat(POPULAR_COMPANIES))).slice(0, 4);
  };

  // 1. Direct match or alias in ALL_SUPPORTED_COMPANIES
  const directMatch = ALL_SUPPORTED_COMPANIES.find((c) => 
    c.name.toLowerCase() === lower || 
    c.aliases.some((a) => a.toLowerCase() === lower) ||
    (lower.length >= 4 && (c.name.toLowerCase().includes(lower) || lower.includes(c.name.toLowerCase())))
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

  // 3. Gibberish & invalid input filtering
  // Pure numbers, pure spaces, or pure punctuation (no letters at all)
  if (/^[0-9\s!@#$%^&*()_+=\-[\]{};:'",.<>/?\\|`~]+$/.test(clean) && !/[a-zA-Z]/.test(clean)) {
    return {
      isValid: false,
      suggestions: buildSuggestions(),
      error: `"${clean}" does not appear to be a recognized company name. Please enter a valid company or pick from the suggestions below.`
    };
  }

  // Repetitive spam (e.g. "aaaaa", "zzzzzzz", "111111")
  if (/(.)\1{3,}/i.test(clean)) {
    return {
      isValid: false,
      suggestions: buildSuggestions(),
      error: `"${clean}" contains repetitive characters. Please enter a valid organization name.`
    };
  }

  // No vowels and not a recognized acronym (e.g. "asdfghjk", "bcdfghjkl")
  const lettersOnly = clean.replace(/[^a-zA-Z]/g, '');
  const hasVowels = /[aeiouy]/i.test(clean);
  const isAcronym = KNOWN_ACRONYMS.has(clean.toUpperCase()) || (clean.length <= 4 && /^[A-Z0-9&]+$/.test(clean));

  if (!hasVowels && lettersOnly.length >= 4 && !isAcronym) {
    return {
      isValid: false,
      suggestions: buildSuggestions(),
      error: `"${clean}" does not appear to be a recognized company name. Please verify spelling or pick from the suggestions below.`
    };
  }

  // Long consonant cluster without vowels (6+ consecutive consonants)
  if (/[bcdfghjklmnpqrstvwxz]{6,}/i.test(clean) && !isAcronym) {
    return {
      isValid: false,
      suggestions: buildSuggestions(),
      error: `"${clean}" contains unpronounceable letter combinations. Please verify spelling.`
    };
  }

  // 4. Universal Acceptance: Any legitimate organization name is valid!
  return {
    isValid: true,
    matchedName: formatCompanyName(clean),
    suggestions: []
  };
}

