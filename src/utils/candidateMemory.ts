import { CandidateLearningMemory, InterviewTurn } from '../types';

const STORAGE_KEY = 'ai_interview_candidate_memory_v1';

export function getInitialMemory(): CandidateLearningMemory {
  return {
    totalSessions: 0,
    totalAnswersAnalyzed: 0,
    topDemonstratedStrengths: [],
    recurringGaps: [],
    frequentThemes: [],
    averageScore: 0,
    lastActive: new Date().toISOString(),
  };
}

export function loadCandidateMemory(): CandidateLearningMemory {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getInitialMemory();
    const parsed = JSON.parse(raw);
    return {
      totalSessions: parsed.totalSessions || 0,
      totalAnswersAnalyzed: parsed.totalAnswersAnalyzed || 0,
      topDemonstratedStrengths: parsed.topDemonstratedStrengths || [],
      recurringGaps: parsed.recurringGaps || [],
      frequentThemes: parsed.frequentThemes || [],
      averageScore: parsed.averageScore || 0,
      lastActive: parsed.lastActive || new Date().toISOString(),
    };
  } catch (e) {
    console.warn('Failed to parse candidate memory from localStorage:', e);
    return getInitialMemory();
  }
}

export function saveCandidateMemory(memory: CandidateLearningMemory): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(memory));
  } catch (e) {
    console.warn('Failed to save candidate memory to localStorage:', e);
  }
}

export function recordTurnInMemory(turn: InterviewTurn): CandidateLearningMemory {
  const mem = loadCandidateMemory();
  if (!turn.evaluation) return mem;

  const score = turn.evaluation.overallScore;
  const newTotalAnswers = mem.totalAnswersAnalyzed + 1;
  const newAvg = mem.totalAnswersAnalyzed === 0
    ? score
    : Math.round((mem.averageScore * mem.totalAnswersAnalyzed + score) / newTotalAnswers);

  // Gather strengths and tally
  const allStrengths = [...mem.topDemonstratedStrengths, ...(turn.evaluation.strengths || [])];
  // Deduplicate and keep top 5
  const uniqueStrengths = Array.from(new Set(allStrengths)).slice(0, 5);

  // Gather gaps and tally
  const allGaps = [...mem.recurringGaps, ...(turn.evaluation.areasForImprovement || [])];
  const uniqueGaps = Array.from(new Set(allGaps)).slice(0, 5);

  // Extract themes from question category or answer
  const theme = turn.question.category;
  const themes = theme && !mem.frequentThemes.includes(theme) 
    ? [...mem.frequentThemes, theme].slice(0, 6) 
    : mem.frequentThemes;

  const updated: CandidateLearningMemory = {
    ...mem,
    totalAnswersAnalyzed: newTotalAnswers,
    averageScore: newAvg,
    topDemonstratedStrengths: uniqueStrengths,
    recurringGaps: uniqueGaps,
    frequentThemes: themes,
    lastActive: new Date().toISOString(),
  };

  saveCandidateMemory(updated);
  return updated;
}

export function recordSessionCompletedInMemory(): CandidateLearningMemory {
  const mem = loadCandidateMemory();
  const updated: CandidateLearningMemory = {
    ...mem,
    totalSessions: mem.totalSessions + 1,
    lastActive: new Date().toISOString(),
  };
  saveCandidateMemory(updated);
  return updated;
}

export function resetCandidateMemory(): CandidateLearningMemory {
  const fresh = getInitialMemory();
  saveCandidateMemory(fresh);
  return fresh;
}
