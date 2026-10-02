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
  'Stripe',
  'Uber'
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

