import React, { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { Header } from './components/Header';
import { RoleSetupView } from './components/RoleSetupView';
import { ActiveInterviewView } from './components/ActiveInterviewView';
import { FinalReportView } from './components/FinalReportView';
import { QuickDrillsView } from './components/QuickDrillsView';
import { SessionHistoryView } from './components/SessionHistoryView';
import { BehavioralQuestionsView } from './components/BehavioralQuestionsView';
import { WorkspaceExportModal } from './components/WorkspaceExportModal';
import { VoiceSettingsModal } from './components/VoiceSettingsModal';
import { 
  RoleSetup, 
  InterviewTurn, 
  SessionFinalReport, 
  SavedInterviewSession, 
  InterviewerPersona,
  DeliveryMetrics,
  ExecutivePresenceEvaluation,
  TurnClarification
} from './types';
import { INTERVIEWER_PERSONAS } from './data/mockData';
import { initAuth, getAccessToken } from './utils/firebaseAuth';
import { stopSpeaking, preloadSpeech } from './utils/speechUtils';
import { recordTurnInMemory, recordSessionCompletedInMemory, loadCandidateMemory } from './utils/candidateMemory';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'mock' | 'behavioral' | 'drills' | 'history'>('mock');
  const [interviewState, setInterviewState] = useState<'setup' | 'active' | 'report'>('setup');
  const [voiceEnabled, setVoiceEnabled] = useState(true);

  // Active mock interview state
  const [currentSetup, setCurrentSetup] = useState<RoleSetup | null>(null);
  const [turns, setTurns] = useState<InterviewTurn[]>([]);
  const [currentTurnIndex, setCurrentTurnIndex] = useState(0);
  const [finalReport, setFinalReport] = useState<SessionFinalReport | null>(null);
  const [isSavedSession, setIsSavedSession] = useState(false);

  // Loading flags
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [isGeneratingFinalReport, setIsGeneratingFinalReport] = useState(false);

  // Google Workspace Auth State
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isWorkspaceModalOpen, setIsWorkspaceModalOpen] = useState(false);
  const [isVoiceSettingsOpen, setIsVoiceSettingsOpen] = useState(false);

  // Saved sessions persistence
  const [savedSessions, setSavedSessions] = useState<SavedInterviewSession[]>(() => {
    try {
      const stored = localStorage.getItem('ai_interview_coach_sessions');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('ai_interview_coach_sessions', JSON.stringify(savedSessions));
    } catch (e) {
      console.error('Failed to save sessions to localStorage:', e);
    }
  }, [savedSessions]);

  // Listen to Google Auth state
  useEffect(() => {
    const unsubscribe = initAuth(
      (authedUser, token) => {
        setUser(authedUser);
        setAccessToken(token);
      },
      () => {
        setUser(null);
        setAccessToken(null);
      }
    );
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  // Find persona
  const activePersona: InterviewerPersona = 
    INTERVIEWER_PERSONAS.find((p) => p.id === currentSetup?.interviewerPersonaId) || INTERVIEWER_PERSONAS[0];

  // 1. Start Mock Interview
  const handleStartInterview = async (setup: RoleSetup) => {
    setIsLoadingQuestions(true);
    setCurrentSetup(setup);
    setIsSavedSession(false);
    setFinalReport(null);

    try {
      const candidateMemory = loadCandidateMemory();
      const response = await fetch('/api/interview/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...setup,
          candidateMemory,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate interview questions');
      }

      const data = await response.json();
      const generatedQuestions = data.questions || [];

      if (generatedQuestions.length === 0) {
        throw new Error('No questions returned by interviewer engine');
      }

      const newTurns: InterviewTurn[] = generatedQuestions.map((q: any, idx: number) => ({
        id: `turn-${idx}-${Date.now()}`,
        question: q,
        userAnswer: '',
        durationSeconds: 0,
      }));

      setTurns(newTurns);
      setCurrentTurnIndex(0);
      setInterviewState('active');

      // Pre-fetch question voice audio buffers in background for fluid transitions
      newTurns.forEach((t) => {
        if (t.question?.question) {
          preloadSpeech(t.question.question);
        }
      });
    } catch (err: any) {
      console.error('Error starting interview:', err);
      alert(`Could not start interview: ${err?.message || 'Please verify your internet connection'}`);
    } finally {
      setIsLoadingQuestions(false);
    }
  };

  // 2. Practice a specific behavioral question from the 10 common list
  const handlePracticeBehavioralQuestion = (questionText: string, category: string) => {
    const singleSetup: RoleSetup = {
      roleTitle: 'Engineering & Leadership Candidate',
      level: 'Senior',
      track: 'Behavioral & Leadership',
      targetCompany: 'Premier Tech & Industry Leaders',
      questionCount: 1,
      interviewerPersonaId: 'alex-mentor',
    };

    const singleTurn: InterviewTurn = {
      id: `turn-custom-${Date.now()}`,
      question: {
        id: `q-custom-${Date.now()}`,
        question: questionText,
        category,
        competencyFocus: 'STAR Delivery, Clarity & Impact',
        whyItMatters: 'Top interviewers use this question to evaluate communication clarity, accountability, and metric-driven results.',
        hintOrFocusPoints: [
          'Frame the context concisely (under 20% of time).',
          'Highlight your individual ownership ("I spearheaded", "I decided").',
          'Conclude with quantifiable business or engineering metrics.',
        ],
      },
      userAnswer: '',
      durationSeconds: 0,
    };

    setCurrentSetup(singleSetup);
    setTurns([singleTurn]);
    setCurrentTurnIndex(0);
    setFinalReport(null);
    setIsSavedSession(false);
    setInterviewState('active');
    setCurrentTab('mock');
    preloadSpeech(questionText);
  };

  // 3. Evaluate Answer for Current Turn with Speech Delivery, Video Presence, and Cross-Turn Progression
  const handleEvaluateAnswer = async (
    turnId: string, 
    answer: string, 
    durationSeconds: number,
    deliveryMetrics?: DeliveryMetrics,
    executivePresence?: ExecutivePresenceEvaluation,
    videoSnapshot?: string,
    clarifications?: TurnClarification[]
  ) => {
    if (!currentSetup) return;
    setIsEvaluating(true);

    const currentTurn = turns.find((t) => t.id === turnId);
    if (!currentTurn) return;

    try {
      // Gather previous evaluated turns for cross-turn learning and trajectory analysis
      const previousEvaluatedTurns = turns
        .slice(0, currentTurnIndex)
        .filter((t) => !!t.evaluation);

      const response = await fetch('/api/interview/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: currentTurn.question.question,
          userAnswer: answer,
          roleTitle: currentSetup.roleTitle,
          level: currentSetup.level,
          track: currentSetup.track,
          personaName: activePersona.name,
          personaTone: activePersona.tonePrompt,
          durationSeconds,
          deliveryMetrics,
          executivePresence,
          previousTurns: previousEvaluatedTurns,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to evaluate response');
      }

      const data = await response.json();
      const evaluation = data.evaluation;
      if (deliveryMetrics && !evaluation.deliveryMetrics) {
        evaluation.deliveryMetrics = deliveryMetrics;
      }
      if (executivePresence && !evaluation.executivePresence) {
        evaluation.executivePresence = executivePresence;
      }

      const updatedTurn: InterviewTurn = {
        ...currentTurn,
        userAnswer: answer,
        durationSeconds,
        evaluation,
        videoSnapshot: videoSnapshot || currentTurn.videoSnapshot,
        clarifications: clarifications || currentTurn.clarifications,
      };

      // Record turn in candidate's cross-session learning memory
      recordTurnInMemory(updatedTurn);

      setTurns((prevTurns) =>
        prevTurns.map((turn) =>
          turn.id === turnId ? updatedTurn : turn
        )
      );

      // Adapt upcoming question in the background based on all answers so far!
      if (currentTurnIndex < turns.length - 1) {
        const nextTurn = turns[currentTurnIndex + 1];
        if (nextTurn && !nextTurn.question.isAdapted) {
          const allPreviousTurnsSoFar = [
            ...turns.slice(0, currentTurnIndex),
            updatedTurn,
          ];

          fetch('/api/interview/adapt-next-question', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              roleTitle: currentSetup.roleTitle,
              level: currentSetup.level,
              track: currentSetup.track,
              targetCompany: currentSetup.targetCompany,
              upcomingQuestion: nextTurn.question,
              previousTurns: allPreviousTurnsSoFar,
            }),
          })
            .then((res) => (res.ok ? res.json() : null))
            .then((adaptData) => {
              if (adaptData?.adaptedQuestion) {
                setTurns((prev) =>
                  prev.map((t, idx) =>
                    idx === currentTurnIndex + 1
                      ? { ...t, question: adaptData.adaptedQuestion }
                      : t
                  )
                );
                // Pre-cache question voice audio buffer
                if (adaptData.adaptedQuestion.question) {
                  preloadSpeech(
                    `${adaptData.adaptedQuestion.conversationalLeadIn ? adaptData.adaptedQuestion.conversationalLeadIn + ' ' : ''}${adaptData.adaptedQuestion.question}`
                  );
                }
              }
            })
            .catch((err) => console.warn('Adaptive question background fetch skipped:', err));
        }
      }
    } catch (err: any) {
      console.error('Error evaluating answer:', err);
      alert(`Evaluation failed: ${err?.message || 'Please try again'}`);
    } finally {
      setIsEvaluating(false);
    }
  };

  // 4. Next Question or Finish Mock
  const handleNextQuestion = async () => {
    if (currentTurnIndex < turns.length - 1) {
      setCurrentTurnIndex((prev) => prev + 1);
    } else {
      // Completed all questions: Generate comprehensive final report!
      await generateFinalReport();
    }
  };

  // 5. Retry a Question
  const handleRetryQuestion = (turnId: string) => {
    setTurns((prevTurns) =>
      prevTurns.map((turn) =>
        turn.id === turnId
          ? { ...turn, evaluation: undefined }
          : turn
      )
    );
  };

  // 6. Handle Follow-up Question Probe
  const handleTakeFollowUpQuestion = (followUpQuestionText: string) => {
    const followUpTurn: InterviewTurn = {
      id: `turn-followup-${Date.now()}`,
      question: {
        id: `q-followup-${Date.now()}`,
        question: followUpQuestionText,
        category: 'Follow-Up Probe',
        competencyFocus: 'Detail & Rigor',
        whyItMatters: 'Top interviewers always dig deeper into ambiguous claims or missing engineering metrics.',
        hintOrFocusPoints: [
          'Address the exact nuance the interviewer challenged.',
          'Bring concrete data or technical architecture specifics.',
        ],
      },
      userAnswer: '',
      durationSeconds: 0,
      isFollowUp: true,
    };

    setTurns((prev) => {
      const nextTurns = [...prev];
      nextTurns.splice(currentTurnIndex + 1, 0, followUpTurn);
      return nextTurns;
    });

    setCurrentTurnIndex((prev) => prev + 1);
  };

  // 7. Generate Comprehensive Final Report
  const generateFinalReport = async () => {
    if (!currentSetup) return;
    setIsGeneratingFinalReport(true);

    try {
      const response = await fetch('/api/interview/final-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roleTitle: currentSetup.roleTitle,
          level: currentSetup.level,
          track: currentSetup.track,
          targetCompany: currentSetup.targetCompany,
          turns,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate final scorecard');
      }

      const data = await response.json();
      setFinalReport(data.report);
      setInterviewState('report');
    } catch (err: any) {
      console.error('Error generating final report:', err);
      const fallbackAvg = Math.round(
        turns.reduce((acc, t) => acc + (t.evaluation?.overallScore || 70), 0) / (turns.length || 1)
      );

      const presenceEvaluations = turns
        .map((t) => t.evaluation?.executivePresence)
        .filter(Boolean) as ExecutivePresenceEvaluation[];

      const fallbackReport: SessionFinalReport = {
        overallScore: fallbackAvg,
        hiringRecommendation: fallbackAvg >= 80 ? 'Strong Hire' : fallbackAvg >= 65 ? 'Hire' : 'Leaning No Hire',
        executiveSummary: `The candidate completed ${turns.length} questions across the ${currentSetup.track} track for ${currentSetup.level} ${currentSetup.roleTitle}. Demonstrates capable domain knowledge with opportunities to provide sharper quantifiable impact.`,
        competencies: {
          communication: fallbackAvg,
          leadershipAndInfluence: fallbackAvg,
          problemSolvingAndAnalytical: fallbackAvg,
          domainExpertise: fallbackAvg,
          impactAndMetricsOrientation: fallbackAvg,
        },
        topStrengths: ['Structured thinking', 'Clear professional tone', 'Good situation setup'],
        criticalGapsToClose: ['Quantify business metrics more frequently', 'Emphasize individual technical ownership'],
        actionablePrepPlan: [
          'Refine 3 STAR stories highlighting direct personal trade-offs',
          'Practice concluding answers with measurable business results',
          'Rehearse pacing to stay within 2-3 minutes per prompt',
        ],
        mockStats: {
          totalQuestions: turns.length,
          totalSpeakingTimeSeconds: turns.reduce((acc, t) => acc + t.durationSeconds, 0),
          avgScore: fallbackAvg,
        },
      };

      if (presenceEvaluations.length > 0) {
        const avgPresenceScore = Math.round(
          presenceEvaluations.reduce((acc, p) => acc + (p.overallScore || 80), 0) / presenceEvaluations.length
        );
        const avgEyeContact = Math.round(
          presenceEvaluations.reduce((acc, p) => acc + (p.eyeContactScore || 80), 0) / presenceEvaluations.length
        );
        const avgPosture = Math.round(
          presenceEvaluations.reduce((acc, p) => acc + (p.postureScore || 80), 0) / presenceEvaluations.length
        );
        const avgComposure = Math.round(
          presenceEvaluations.reduce((acc, p) => acc + (p.facialComposureScore || 80), 0) / presenceEvaluations.length
        );
        const avgGestures = Math.round(
          presenceEvaluations.reduce((acc, p) => acc + (p.gesturesAndFidgetingScore || 80), 0) / presenceEvaluations.length
        );

        fallbackReport.executivePresenceSummary = {
          overallScore: avgPresenceScore,
          eyeContactScore: avgEyeContact,
          eyeContactFeedback: avgEyeContact >= 80 ? "Maintained steady, direct camera focus throughout." : "Looked away or down periodically while recalling information.",
          postureScore: avgPosture,
          postureFeedback: avgPosture >= 80 ? "Upright and open posture projected confidence and authority." : "Occasional shoulder slouching observed during longer explanations.",
          facialComposureScore: avgComposure,
          facialComposureFeedback: "Poised, thoughtful delivery with good articulation and calm demeanor under questioning.",
          gesturesAndFidgetingScore: avgGestures,
          gesturesFeedback: "Natural hand emphasis with minimal nervous fidgeting.",
          lightingAndFramingFeedback: "Well-centered camera framing with clean lighting and good upper-body presence.",
          observedBehaviors: [
            "Consistent eye contact focused towards interviewer and camera lens",
            "Balanced upright seating posture without excessive slumping",
            "Controlled head movement and clear vocal delivery"
          ],
          keyImprovements: [
            "Maintain eye contact especially when transitioning between STAR points",
            "Anchor shoulders back to project executive command"
          ]
        };
      }

      setFinalReport(fallbackReport);
      setInterviewState('report');
    } finally {
      setIsGeneratingFinalReport(false);
    }
  };

  // 8. Save Session to History
  const handleSaveSession = () => {
    if (!currentSetup || !finalReport || isSavedSession) return;

    const newSaved: SavedInterviewSession = {
      id: `session-${Date.now()}`,
      createdAt: new Date().toISOString(),
      roleTitle: currentSetup.roleTitle,
      level: currentSetup.level,
      track: currentSetup.track,
      targetCompany: currentSetup.targetCompany,
      personaName: activePersona.name,
      personaId: activePersona.id,
      overallScore: finalReport.overallScore,
      turns,
      finalReport,
    };

    recordSessionCompletedInMemory();
    setSavedSessions((prev) => [newSaved, ...prev]);
    setIsSavedSession(true);
  };

  // 9. Delete Single Session
  const handleDeleteSession = (id: string) => {
    setSavedSessions((prev) => prev.filter((s) => s.id !== id));
  };

  // 10. Clear All History
  const handleClearAllHistory = () => {
    setSavedSessions([]);
  };

  const handleStartNewMock = () => {
    setInterviewState('setup');
    setTurns([]);
    setCurrentTurnIndex(0);
    setFinalReport(null);
    setIsSavedSession(false);
    setCurrentTab('mock');
  };

  const handleLoadSessionInReport = (session: SavedInterviewSession) => {
    const matchedPersona = INTERVIEWER_PERSONAS.find(
      (p) => (session.personaId && p.id === session.personaId) || p.name === session.personaName
    );
    setCurrentSetup({
      roleTitle: session.roleTitle,
      level: session.level,
      track: session.track,
      targetCompany: session.targetCompany,
      jobDescription: '',
      resumeSummary: '',
      interviewerPersonaId: matchedPersona ? matchedPersona.id : INTERVIEWER_PERSONAS[0].id,
      questionCount: session.turns.length,
    });
    setTurns(session.turns);
    setFinalReport(session.finalReport ?? null);
    setIsSavedSession(true);
    setInterviewState('report');
    setCurrentTab('mock');
  };

  return (
    <div className="min-h-screen bg-zinc-100/60 text-zinc-900 flex flex-col font-sans antialiased">
      {/* Top Header */}
      <Header
        currentTab={currentTab}
        onSelectTab={(tab) => {
          if (interviewState === 'active' && tab !== 'mock') {
            stopSpeaking();
          }
          setCurrentTab(tab);
        }}
        voiceEnabled={voiceEnabled}
        onToggleVoice={() => setVoiceEnabled(!voiceEnabled)}
        savedSessionsCount={savedSessions.length}
        isInterviewActive={interviewState === 'active'}
        user={user}
        onOpenWorkspaceModal={() => setIsWorkspaceModalOpen(true)}
        onOpenVoiceSettings={() => setIsVoiceSettingsOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {isGeneratingFinalReport ? (
          <div className="max-w-md mx-auto py-24 text-center px-4">
            <div className="w-12 h-12 rounded-full border-3 border-zinc-900 border-t-transparent animate-spin mx-auto mb-4" />
            <h2 className="text-xl font-bold text-zinc-900 mb-1">Synthesizing Final Debrief</h2>
            <p className="text-xs text-zinc-500">
              The hiring committee is compiling your competency radar, STAR grades, and personalized prep roadmap...
            </p>
          </div>
        ) : currentTab === 'mock' ? (
          <>
            {interviewState === 'setup' && (
              <RoleSetupView
                onStartInterview={handleStartInterview}
                isLoading={isLoadingQuestions}
              />
            )}

            {interviewState === 'active' && currentSetup && (
              <ActiveInterviewView
                setup={currentSetup}
                persona={activePersona}
                turns={turns}
                currentTurnIndex={currentTurnIndex}
                voiceEnabled={voiceEnabled}
                onEvaluateAnswer={handleEvaluateAnswer}
                onNextQuestion={handleNextQuestion}
                onRetryQuestion={handleRetryQuestion}
                onTakeFollowUpQuestion={handleTakeFollowUpQuestion}
                onFinishEarly={generateFinalReport}
                onExitInterview={() => {
                  stopSpeaking();
                  setInterviewState('setup');
                }}
                isEvaluating={isEvaluating}
              />
            )}

            {interviewState === 'report' && currentSetup && finalReport && (
              <FinalReportView
                report={finalReport}
                turns={turns}
                setup={currentSetup}
                onStartNewMock={handleStartNewMock}
                onSaveSession={handleSaveSession}
                isSaved={isSavedSession}
                onOpenWorkspaceModal={() => setIsWorkspaceModalOpen(true)}
              />
            )}
          </>
        ) : currentTab === 'behavioral' ? (
          <BehavioralQuestionsView
            onPracticeQuestion={handlePracticeBehavioralQuestion}
          />
        ) : currentTab === 'drills' ? (
          <QuickDrillsView />
        ) : (
          <SessionHistoryView
            sessions={savedSessions}
            onDeleteSession={handleDeleteSession}
            onClearAll={handleClearAllHistory}
            onStartNewMock={handleStartNewMock}
            onLoadSessionInReport={handleLoadSessionInReport}
          />
        )}
      </main>

      {/* Google Workspace Modal (Drive, Sheets, Gmail) */}
      {isWorkspaceModalOpen && currentSetup && finalReport && (
        <WorkspaceExportModal
          isOpen={isWorkspaceModalOpen}
          onClose={() => setIsWorkspaceModalOpen(false)}
          user={user}
          accessToken={accessToken}
          onAuthSuccess={(authedUser, token) => {
            setUser(authedUser);
            setAccessToken(token);
          }}
          setup={currentSetup}
          report={finalReport}
          turns={turns}
        />
      )}

      {/* Fallback Workspace Modal when not in report mode */}
      {isWorkspaceModalOpen && (!currentSetup || !finalReport) && (
        <WorkspaceExportModal
          isOpen={isWorkspaceModalOpen}
          onClose={() => setIsWorkspaceModalOpen(false)}
          user={user}
          accessToken={accessToken}
          onAuthSuccess={(authedUser, token) => {
            setUser(authedUser);
            setAccessToken(token);
          }}
          setup={{
            roleTitle: 'Software Engineer',
            level: 'Senior',
            track: 'Behavioral & Leadership',
            targetCompany: 'Google',
            questionCount: 3,
            interviewerPersonaId: 'alex-vance',
          }}
          report={{
            overallScore: 85,
            hiringRecommendation: 'Strong Hire',
            executiveSummary: 'Demonstrates structured communication and strong ownership with proven delivery outcomes.',
            competencies: {
              communication: 88,
              leadershipAndInfluence: 84,
              problemSolvingAndAnalytical: 90,
              domainExpertise: 86,
              impactAndMetricsOrientation: 82,
            },
            topStrengths: ['Data-driven decision making', 'Structured STAR pacing'],
            criticalGapsToClose: ['Highlight individual leadership leverage'],
            actionablePrepPlan: ['Rehearse 3 anchor impact stories'],
            mockStats: { totalQuestions: 1, totalSpeakingTimeSeconds: 120, avgScore: 85 },
          }}
          turns={[]}
        />
      )}

      {/* Global Voice Settings Modal */}
      <VoiceSettingsModal
        isOpen={isVoiceSettingsOpen}
        onClose={() => setIsVoiceSettingsOpen(false)}
      />
    </div>
  );
}
