import { CompanyHiringPipeline } from '../types';

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
];

export const POPULAR_COMPANIES = [
  'Amazon',
  'Google',
  'Meta',
  'Microsoft',
  'Netflix',
  'Apple',
  'Stripe',
  'Uber',
  'Nvidia',
  'Airbnb',
  'Goldman Sachs'
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

export function findCompanyPipeline(query: string): CompanyHiringPipeline | undefined {
  if (!query) return undefined;
  const clean = query.trim().toLowerCase();
  return PRESET_COMPANY_PIPELINES.find(
    (p) => p.normalizedName === clean || p.companyName.toLowerCase().includes(clean) || clean.includes(p.normalizedName)
  );
}

export function generateFallbackPipeline(companyName: string, roleTitle = 'Software Engineer'): CompanyHiringPipeline {
  const company = companyName.trim() || 'Premier Tech Leader';
  return {
    companyName: company,
    normalizedName: company.toLowerCase().replace(/[^a-z0-9]/g, ''),
    tagline: `Comprehensive hiring process & bar evaluation at ${company}`,
    industry: 'Technology & Enterprise Scale',
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

