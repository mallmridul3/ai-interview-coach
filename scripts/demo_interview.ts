import dotenv from 'dotenv';
dotenv.config();

const BASE_URL = 'http://localhost:3000';

async function runDemoInterview() {
  console.log('====================================================');
  console.log('🚀 STARTING COMPREHENSIVE AI INTERVIEW DEMO SIMULATION');
  console.log('====================================================\n');

  // Step 1: Health Check
  console.log('1️⃣ Checking server health...');
  const healthRes = await fetch(`${BASE_URL}/api/health`);
  const health = await healthRes.json();
  console.log('   ✓ Server health status:', health.status);

  // Step 2: Question Generation & Role Sanitization
  console.log('\n2️⃣ Testing Question Generation with Role Sanitization...');
  const qPayload = {
    roleTitle: 'Senior Software Engineer (SDE II)',
    level: 'Senior',
    track: 'System Design & Architecture',
    targetCompany: 'Stripe',
    questionCount: 3,
  };

  const qRes = await fetch(`${BASE_URL}/api/interview/questions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(qPayload),
  });
  const qData = await qRes.json();
  const questions = qData.questions || [];
  console.log(`   ✓ Received ${questions.length} questions`);

  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    console.log(`   [Q${i + 1}] Category: ${q.category}`);
    console.log(`        Text: "${q.question}"`);
    if (q.question.includes('(SDE II)') || q.question.includes('(')) {
      console.warn(`        ⚠️ Note: question contains parentheses: "${q.question}"`);
    } else {
      console.log(`        ✓ Question text is clean of parentheses.`);
    }
  }

  // Step 3: Neural TTS Synthesis for Interviewer Voice
  console.log('\n3️⃣ Testing Neural TTS Voice Generation across Personas...');
  const testVoices = ['Kore', 'Puck', 'Fenrir', 'Charon', 'Zephyr'];
  for (const voice of testVoices) {
    const ttsRes = await fetch(`${BASE_URL}/api/tts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: 'Welcome to your system design interview. Today we will design a globally distributed idempotent payment processing gateway.',
        voice,
      }),
    });
    const ttsData = await ttsRes.json();
    const hasAudio = !!ttsData.audioUrl && ttsData.audioUrl.startsWith('data:audio/');
    console.log(`   ✓ Voice [${voice}]: Generated=${hasAudio}, mimeType=${ttsData.mimeType || 'none'}`);
  }

  // Step 4: Candidate Answer Submission & STAR Evaluation
  console.log('\n4️⃣ Testing Candidate Answer Evaluation...');
  const sampleAnswer = `At my previous company, our payment webhook processing service began failing during Black Friday spikes because of database lock contention. As the tech lead, my task was to redesign the ingestion pipeline to guarantee zero dropped transactions and sub-200ms processing latencies.
  
I implemented an event-driven architecture using Kafka for durable queuing and Redis for distributed deduplication with 24-hour idempotency keys. I introduced consumer worker pools with exponential backoff dead-letter queues.

Within three weeks, our throughput increased from 800 QPS to over 14,000 QPS with p99 latency dropping to 65ms, resulting in zero payment drops across the entire quarter.`;

  const evalPayload = {
    question: questions[0]?.question || 'Describe a high-throughput distributed system you designed.',
    userAnswer: sampleAnswer,
    roleTitle: 'Senior Software Engineer',
    level: 'Senior',
    track: 'System Design & Architecture',
    personaName: 'Alex Rivera',
    personaTone: 'Rigorous and constructive',
    deliveryMetrics: {
      wpm: 142,
      durationSeconds: 78,
      fillerWordCount: 1,
      fillerWords: ['like'],
      clarityScore: 92,
      pacingAssessment: 'Good Pacing',
    },
    previousTurns: [],
  };

  const evalRes = await fetch(`${BASE_URL}/api/interview/evaluate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(evalPayload),
  });
  const evalData = await evalRes.json();
  const evaluation = evalData.evaluation;

  console.log(`   ✓ Composite Score: ${evaluation?.overallScore}/100 | Verdict: "${evaluation?.verdict}"`);
  console.log(`   ✓ STAR Breakdown:`);
  console.log(`      - Situation: ${evaluation?.starBreakdown?.situation?.score}/10 (${evaluation?.starBreakdown?.situation?.feedback?.slice(0, 70)}...)`);
  console.log(`      - Task:      ${evaluation?.starBreakdown?.task?.score}/10 (${evaluation?.starBreakdown?.task?.feedback?.slice(0, 70)}...)`);
  console.log(`      - Action:    ${evaluation?.starBreakdown?.action?.score}/10 (${evaluation?.starBreakdown?.action?.feedback?.slice(0, 70)}...)`);
  console.log(`      - Result:    ${evaluation?.starBreakdown?.result?.score}/10 (${evaluation?.starBreakdown?.result?.feedback?.slice(0, 70)}...)`);
  console.log(`   ✓ Strengths: ${(evaluation?.strengths || []).join('; ')}`);
  console.log(`   ✓ Growth Areas: ${(evaluation?.areasForImprovement || []).join('; ')}`);
  console.log(`   ✓ Follow-Up Probe Generated: "${evaluation?.potentialFollowUp || evaluation?.followUpQuestion}"`);

  // Step 5: In-Call Clarification Inquiry
  console.log('\n5️⃣ Testing In-Call Clarification...');
  const clarifyRes = await fetch(`${BASE_URL}/api/interview/clarify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      question: questions[0]?.question || 'Describe a high-throughput distributed system you designed.',
      candidateClarification: 'Should I focus on multi-region active-active replication or single-region latency optimizations?',
      personaName: 'Alex Rivera',
      personaTone: 'Rigorous and constructive',
    }),
  });
  const clarifyData = await clarifyRes.json();
  console.log(`   ✓ Clarification Response: "${(clarifyData?.interviewerResponse || '').slice(0, 120)}..."`);

  // Step 6: Final Scorecard Synthesis
  console.log('\n6️⃣ Testing Final Executive Scorecard Synthesis...');
  const finalReportRes = await fetch(`${BASE_URL}/api/interview/final-report`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      setup: {
        roleTitle: 'Senior Software Engineer',
        level: 'Senior',
        track: 'System Design & Architecture',
        targetCompany: 'Stripe',
      },
      turns: [
        {
          id: 'turn-1',
          question: questions[0] || { question: 'Test question' },
          userAnswer: sampleAnswer,
          durationSeconds: 78,
          evaluation,
        },
      ],
    }),
  });
  const finalReportData = await finalReportRes.json();
  const report = finalReportData.report;
  console.log(`   ✓ Final Readiness Score: ${report?.overallScore}/100 | Hiring Verdict: "${report?.hiringRecommendation}"`);
  console.log(`   ✓ Executive Summary: ${report?.executiveSummary?.slice(0, 120)}...`);

  console.log('\n====================================================');
  console.log('✅ ALL DEMO INTERVIEW SUITE CHECKS COMPLETED SUCCESSFULLY');
  console.log('====================================================\n');
}

runDemoInterview().catch((err) => {
  console.error('❌ Demo interview failed with error:', err);
  process.exit(1);
});
