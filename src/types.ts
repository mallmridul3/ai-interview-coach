export type ExperienceLevel = 'Intern / Entry-level' | 'Mid-level' | 'Senior' | 'Staff / Principal' | 'Engineering / Product Manager' | 'Executive';

export type InterviewTrack = 
  | 'Technical & Behavioral Mix'
  | 'Behavioral & Leadership'
  | 'System Design & Architecture'
  | 'Technical & Problem Solving'
  | 'Product Sense & Strategy'
  | 'Situational & Culture Fit'
  | 'Custom / Role-Specific';

export interface RoleSetup {
  roleTitle: string;
  level: ExperienceLevel;
  track: InterviewTrack;
  targetCompany: string;
  jobDescription?: string;
  resumeSummary?: string;
  interviewerPersonaId: string;
  questionCount: number;
}

export interface InterviewerPersona {
  id: string;
  name: string;
  role: string;
  companyTag: string;
  avatarSeed: string;
  styleDescription: string;
  tonePrompt: string;
}

export interface InterviewQuestion {
  id: string;
  question: string;
  category: string;
  competencyFocus: string;
  whyItMatters: string;
  hintOrFocusPoints: string[];
  adaptiveContext?: string; // Explains how this question was adapted from previous answers/gaps
  conversationalLeadIn?: string; // Natural conversational lead-in referencing prior answers
  isAdapted?: boolean;
}

export interface STARPillar {
  present: boolean;
  score: number; // 0-10
  feedback: string;
}

export interface STARAnalysis {
  situation: STARPillar;
  task: STARPillar;
  action: STARPillar;
  result: STARPillar;
}

export interface DeliveryMetrics {
  wpm: number;
  fillerWordsCount: number;
  fillerWordsDetected: { word: string; count: number }[];
  pacingVerdict: 'Too Slow' | 'Optimal' | 'Too Fast';
}

export interface ExecutivePresenceEvaluation {
  overallScore: number; // 0-100
  eyeContactScore: number; // 0-100
  eyeContactFeedback: string;
  postureScore: number; // 0-100
  postureFeedback: string;
  facialComposureScore: number; // 0-100
  facialComposureFeedback: string;
  gesturesAndFidgetingScore: number; // 0-100
  gesturesFeedback: string;
  lightingAndFramingFeedback: string;
  observedBehaviors: string[];
  keyImprovements: string[];
}

export interface TurnClarification {
  candidateQuery: string;
  interviewerResponse: string;
  timestamp: string;
}

export interface ProgressionInsights {
  progressionScoreChange?: number; // e.g. +8 compared to previous turn
  improvedAreas: string[]; // specific improvements noticed vs. previous turns
  recurringBlindSpots: string[]; // recurring gaps that repeated across turns
  continuityNotes: string; // narrative continuity with projects/stories from previous turns
  consistencyVerdict: 'High Consistency' | 'Consistent' | 'Contradiction Detected';
}

export interface AnswerEvaluation {
  overallScore: number; // 0-100
  verdict: 'Needs Work' | 'Progressing' | 'Competent' | 'Strong' | 'Exceptional';
  starBreakdown: STARAnalysis;
  communicationClarity: number; // 0-100
  relevanceAndCompleteness: number; // 0-100
  depthAndImpact: number; // 0-100
  strengths: string[];
  areasForImprovement: string[];
  exemplarAnswer: string;
  coachAdvice: string;
  potentialFollowUp?: string;
  deliveryMetrics?: DeliveryMetrics;
  executivePresence?: ExecutivePresenceEvaluation;
  progressionInsights?: ProgressionInsights; // AI learning insights derived from previous turns
}

export interface InterviewTurn {
  id: string;
  question: InterviewQuestion;
  userAnswer: string;
  durationSeconds: number;
  evaluation?: AnswerEvaluation;
  isFollowUp?: boolean;
  clarifications?: TurnClarification[];
  videoSnapshot?: string; // base64 preview of candidate during response
}

export interface CompetencyRadar {
  communication: number; // 0-100
  leadershipAndInfluence: number; // 0-100
  problemSolvingAndAnalytical: number; // 0-100
  domainExpertise: number; // 0-100
  impactAndMetricsOrientation: number; // 0-100
}

export interface SessionFinalReport {
  overallScore: number;
  hiringRecommendation: 'Strong Hire' | 'Hire' | 'Leaning Hire' | 'Leaning No Hire' | 'No Hire';
  executiveSummary: string;
  competencies: CompetencyRadar;
  topStrengths: string[];
  criticalGapsToClose: string[];
  actionablePrepPlan: string[];
  mockStats: {
    totalQuestions: number;
    totalSpeakingTimeSeconds: number;
    avgScore: number;
  };
  executivePresenceSummary?: ExecutivePresenceEvaluation;
}

export interface SavedInterviewSession {
  id: string;
  createdAt: string;
  roleTitle: string;
  level: ExperienceLevel;
  track: InterviewTrack;
  targetCompany: string;
  personaName: string;
  personaId?: string;
  overallScore: number;
  turns: InterviewTurn[];
  finalReport?: SessionFinalReport;
}

export interface QuickDrillQuestion {
  id: string;
  question: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Challenging' | 'Curveball';
  idealTimeSeconds: number;
  frameworkTips: string[];
}

export interface SavedSTARStory {
  id: string;
  title: string;
  category: string;
  situation: string;
  task: string;
  action: string;
  result: string;
  metrics: string;
  tags: string[];
  updatedAt: string;
}

export interface CandidateLearningMemory {
  totalSessions: number;
  totalAnswersAnalyzed: number;
  topDemonstratedStrengths: string[];
  recurringGaps: string[];
  frequentThemes: string[];
  averageScore: number;
  lastActive: string;
}

