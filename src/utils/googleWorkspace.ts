import { SessionFinalReport, RoleSetup, InterviewTurn } from '../types';

export interface DriveExportResult {
  fileId: string;
  name: string;
  webViewLink?: string;
}

export interface SheetsExportResult {
  spreadsheetId: string;
  spreadsheetUrl: string;
  isNew: boolean;
}

export interface GmailSendResult {
  messageId: string;
  recipient: string;
}

/**
 * 1. Google Drive: Save comprehensive interview report to Google Drive
 */
export async function saveReportToGoogleDrive(
  accessToken: string,
  setup: RoleSetup,
  report: SessionFinalReport,
  turns: InterviewTurn[]
): Promise<DriveExportResult> {
  const fileName = `Interview Debrief - ${setup.level} ${setup.roleTitle} (${new Date().toLocaleDateString().replace(/\//g, '-')}).txt`;

  const reportText = `===================================================================
       AI INTERVIEW COACH - EXECUTIVE HIRING DEBRIEF
===================================================================

ROLE: ${setup.level} ${setup.roleTitle}
TARGET COMPANY / STYLE: ${setup.targetCompany}
TRACK: ${setup.track}
DATE: ${new Date().toLocaleString()}

-------------------------------------------------------------------
HIRING VERDICT & SCORE
-------------------------------------------------------------------
Overall Score: ${report.overallScore}/100
Recommendation: ${report.hiringRecommendation}

EXECUTIVE SUMMARY:
${report.executiveSummary}

-------------------------------------------------------------------
CORE COMPETENCY BENCHMARKS (0-100)
-------------------------------------------------------------------
• Communication & Clarity: ${report.competencies.communication}%
• Leadership & Stakeholder Influence: ${report.competencies.leadershipAndInfluence}%
• Analytical & Problem Solving: ${report.competencies.problemSolvingAndAnalytical}%
• Domain & Technical Expertise: ${report.competencies.domainExpertise}%
• Impact & Metrics Orientation: ${report.competencies.impactAndMetricsOrientation}%
${report.executivePresenceSummary ? `
-------------------------------------------------------------------
EXECUTIVE PRESENCE & BODY LANGUAGE ANALYSIS (COMPUTER VISION)
-------------------------------------------------------------------
• Overall Presence Score: ${report.executivePresenceSummary.overallScore}/100
• Eye Contact Alignment: ${report.executivePresenceSummary.eyeContactScore}/100 - ${report.executivePresenceSummary.eyeContactFeedback}
• Posture & Body Language: ${report.executivePresenceSummary.postureScore}/100 - ${report.executivePresenceSummary.postureFeedback}
• Facial Composure: ${report.executivePresenceSummary.facialComposureScore}/100 - ${report.executivePresenceSummary.facialComposureFeedback}
• Hand Gestures & Stillness: ${report.executivePresenceSummary.gesturesAndFidgetingScore}/100 - ${report.executivePresenceSummary.gesturesFeedback}
` : ''}
-------------------------------------------------------------------
DEMONSTRATED STRENGTHS
-------------------------------------------------------------------
${report.topStrengths.map((s, i) => `${i + 1}. ${s}`).join('\n')}

-------------------------------------------------------------------
CRITICAL GAPS TO CLOSE
-------------------------------------------------------------------
${report.criticalGapsToClose.map((g, i) => `${i + 1}. ${g}`).join('\n')}

-------------------------------------------------------------------
RECOMMENDED 3-STEP PREP ROADMAP
-------------------------------------------------------------------
${report.actionablePrepPlan.map((p, i) => `${i + 1}. ${p}`).join('\n')}

===================================================================
FULL QUESTION & ANSWER TRANSCRIPT WITH STAR SCORES
===================================================================
${turns
  .map(
    (t, idx) => `
QUESTION ${idx + 1}: ${t.question.question}
Category: ${t.question.category}
Competency Focus: ${t.question.competencyFocus}

Candidate's Answer:
"${t.userAnswer}"

STAR Scores & Feedback:
• Situation: ${t.evaluation?.starBreakdown.situation.score ?? 'N/A'}/10 - ${t.evaluation?.starBreakdown.situation.feedback || ''}
• Task: ${t.evaluation?.starBreakdown.task.score ?? 'N/A'}/10 - ${t.evaluation?.starBreakdown.task.feedback || ''}
• Action: ${t.evaluation?.starBreakdown.action.score ?? 'N/A'}/10 - ${t.evaluation?.starBreakdown.action.feedback || ''}
• Result: ${t.evaluation?.starBreakdown.result.score ?? 'N/A'}/10 - ${t.evaluation?.starBreakdown.result.feedback || ''}
Turn Score: ${t.evaluation?.overallScore ?? 'N/A'}/100 (Verdict: ${t.evaluation?.verdict ?? 'Evaluated'})

Top 1% Model Exemplar:
${t.evaluation?.exemplarAnswer || 'N/A'}
`
  )
  .join('\n-------------------------------------------------------------------\n')}
`;

  const boundary = '-------314159265358979323846';
  const delimiter = `\r\n--${boundary}\r\n`;
  const closeDelimiter = `\r\n--${boundary}--`;

  const metadata = {
    name: fileName,
    mimeType: 'text/plain',
    description: `AI Interview Coach debrief for ${setup.level} ${setup.roleTitle}`,
  };

  const multipartRequestBody =
    delimiter +
    'Content-Type: application/json; charset=UTF-8\r\n\r\n' +
    JSON.stringify(metadata) +
    delimiter +
    'Content-Type: text/plain; charset=UTF-8\r\n\r\n' +
    reportText +
    closeDelimiter;

  const res = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,webViewLink', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': `multipart/related; boundary=${boundary}`,
    },
    body: multipartRequestBody,
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Google Drive API error (${res.status}): ${errText}`);
  }

  const data = await res.json();
  return {
    fileId: data.id,
    name: data.name,
    webViewLink: data.webViewLink || `https://drive.google.com/file/d/${data.id}/view`,
  };
}

/**
 * 2. Google Sheets: Append session scorecard to a tracker spreadsheet
 */
export async function exportScorecardToGoogleSheets(
  accessToken: string,
  setup: RoleSetup,
  report: SessionFinalReport,
  turns: InterviewTurn[]
): Promise<SheetsExportResult> {
  const trackerTitle = 'AI Interview Coach - Preparation Tracker';

  // 1. Search for existing tracker sheet
  const searchRes = await fetch(
    `https://www.googleapis.com/drive/v3/files?q=name='${encodeURIComponent(trackerTitle)}' and mimeType='application/vnd.google-apps.spreadsheet' and trashed=false&fields=files(id,name)`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );

  let spreadsheetId: string | null = null;
  let isNew = false;

  if (searchRes.ok) {
    const searchData = await searchRes.json();
    if (searchData.files && searchData.files.length > 0) {
      spreadsheetId = searchData.files[0].id;
    }
  }

  // 2. Create spreadsheet if none exists
  if (!spreadsheetId) {
    const createRes = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        properties: { title: trackerTitle },
        sheets: [
          {
            properties: {
              title: 'Scorecard Log',
              gridProperties: { rowCount: 100, columnCount: 14, frozenRowCount: 1 },
            },
            data: [
              {
                startRow: 0,
                startColumn: 0,
                rowData: [
                  {
                    values: [
                      { userEnteredValue: { stringValue: 'Date' } },
                      { userEnteredValue: { stringValue: 'Role' } },
                      { userEnteredValue: { stringValue: 'Level' } },
                      { userEnteredValue: { stringValue: 'Target Company' } },
                      { userEnteredValue: { stringValue: 'Track' } },
                      { userEnteredValue: { stringValue: 'Overall Score' } },
                      { userEnteredValue: { stringValue: 'Hiring Verdict' } },
                      { userEnteredValue: { stringValue: 'Situation Avg (0-10)' } },
                      { userEnteredValue: { stringValue: 'Task Avg (0-10)' } },
                      { userEnteredValue: { stringValue: 'Action Avg (0-10)' } },
                      { userEnteredValue: { stringValue: 'Result Avg (0-10)' } },
                      { userEnteredValue: { stringValue: 'Top Strength' } },
                      { userEnteredValue: { stringValue: 'Critical Gap' } },
                      { userEnteredValue: { stringValue: 'Questions Evaluated' } },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      }),
    });

    if (!createRes.ok) {
      const err = await createRes.text();
      throw new Error(`Failed to create Google Sheet: ${err}`);
    }

    const createData = await createRes.json();
    spreadsheetId = createData.spreadsheetId;
    isNew = true;
  }

  // Calculate averages
  const turnsWithEval = turns.filter((t) => t.evaluation?.starBreakdown);
  const avgS = turnsWithEval.length ? (turnsWithEval.reduce((acc, t) => acc + (t.evaluation?.starBreakdown.situation.score || 0), 0) / turnsWithEval.length).toFixed(1) : 'N/A';
  const avgT = turnsWithEval.length ? (turnsWithEval.reduce((acc, t) => acc + (t.evaluation?.starBreakdown.task.score || 0), 0) / turnsWithEval.length).toFixed(1) : 'N/A';
  const avgA = turnsWithEval.length ? (turnsWithEval.reduce((acc, t) => acc + (t.evaluation?.starBreakdown.action.score || 0), 0) / turnsWithEval.length).toFixed(1) : 'N/A';
  const avgR = turnsWithEval.length ? (turnsWithEval.reduce((acc, t) => acc + (t.evaluation?.starBreakdown.result.score || 0), 0) / turnsWithEval.length).toFixed(1) : 'N/A';

  const newRowValues = [
    new Date().toLocaleDateString(),
    setup.roleTitle,
    setup.level,
    setup.targetCompany,
    setup.track,
    report.overallScore,
    report.hiringRecommendation,
    avgS,
    avgT,
    avgA,
    avgR,
    report.topStrengths[0] || 'N/A',
    report.criticalGapsToClose[0] || 'N/A',
    turns.length,
  ];

  // 3. Append row
  const appendRes = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Scorecard Log!A1:append?valueInputOption=USER_ENTERED`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        values: [newRowValues],
      }),
    }
  );

  if (!appendRes.ok) {
    const err = await appendRes.text();
    throw new Error(`Failed to append row to Google Sheet: ${err}`);
  }

  return {
    spreadsheetId: spreadsheetId!,
    spreadsheetUrl: `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`,
    isNew,
  };
}

/**
 * 3. Gmail: Send performance debrief email to candidate or coach
 */
export async function sendReportViaGmail(
  accessToken: string,
  recipientEmail: string,
  subject: string,
  setup: RoleSetup,
  report: SessionFinalReport,
  turns: InterviewTurn[]
): Promise<GmailSendResult> {
  const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; line-height: 1.6; color: #18181b; }
    .container { max-width: 640px; margin: 0 auto; padding: 24px; border: 1px solid #e4e4e7; border-radius: 12px; }
    .header { border-bottom: 2px solid #18181b; padding-bottom: 16px; margin-bottom: 20px; }
    .badge { display: inline-block; padding: 4px 12px; border-radius: 6px; font-weight: bold; font-size: 14px; background-color: #10b981; color: white; }
    .score-box { background-color: #f4f4f5; padding: 16px; border-radius: 8px; margin: 16px 0; text-align: center; }
    .score { font-size: 36px; font-weight: 800; color: #18181b; }
    .section-title { font-size: 16px; font-weight: bold; color: #09090b; margin-top: 24px; margin-bottom: 8px; border-bottom: 1px solid #f4f4f5; padding-bottom: 4px; }
    .q-card { background-color: #fafafa; border: 1px solid #e4e4e7; border-radius: 8px; padding: 12px; margin-bottom: 12px; }
    ul { padding-left: 20px; }
    li { margin-bottom: 6px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2 style="margin:0 0 4px 0;">AI Interview Coach — Performance Debrief</h2>
      <p style="margin:0; color:#71717a; font-size:14px;">
        Role: <strong>${setup.level} ${setup.roleTitle}</strong> &bull; Target: <strong>${setup.targetCompany}</strong>
      </p>
    </div>

    <div class="score-box">
      <div style="font-size:12px; text-transform:uppercase; font-weight:600; color:#71717a;">Overall Session Score</div>
      <div class="score">${report.overallScore} / 100</div>
      <div style="margin-top:8px;">
        <span class="badge">${report.hiringRecommendation}</span>
      </div>
    </div>

    <div class="section-title">Hiring Committee Executive Summary</div>
    <p style="font-size:14px; color:#3f3f46;">${report.executiveSummary}</p>

    <div class="section-title">Core Competencies</div>
    <ul style="font-size:14px;">
      <li>Communication & Clarity: <strong>${report.competencies.communication}%</strong></li>
      <li>Leadership & Influence: <strong>${report.competencies.leadershipAndInfluence}%</strong></li>
      <li>Problem Solving & Analysis: <strong>${report.competencies.problemSolvingAndAnalytical}%</strong></li>
      <li>Domain Expertise: <strong>${report.competencies.domainExpertise}%</strong></li>
      <li>Impact & Metrics: <strong>${report.competencies.impactAndMetricsOrientation}%</strong></li>
    </ul>
    ${report.executivePresenceSummary ? `
    <div class="section-title">Executive Presence & Body Language (Computer Vision)</div>
    <ul style="font-size:14px; color:#18181b;">
      <li>Overall Presence Score: <strong>${report.executivePresenceSummary.overallScore}/100</strong></li>
      <li>Eye Contact: <strong>${report.executivePresenceSummary.eyeContactScore}%</strong> — ${report.executivePresenceSummary.eyeContactFeedback}</li>
      <li>Posture & Alignment: <strong>${report.executivePresenceSummary.postureScore}%</strong> — ${report.executivePresenceSummary.postureFeedback}</li>
      <li>Facial Composure: <strong>${report.executivePresenceSummary.facialComposureScore}%</strong> — ${report.executivePresenceSummary.facialComposureFeedback}</li>
      <li>Gestures & Stillness: <strong>${report.executivePresenceSummary.gesturesAndFidgetingScore}%</strong> — ${report.executivePresenceSummary.gesturesFeedback}</li>
    </ul>
    ` : ''}

    <div class="section-title">Demonstrated Strengths</div>
    <ul style="font-size:14px; color:#047857;">
      ${report.topStrengths.map((s) => `<li>${s}</li>`).join('')}
    </ul>

    <div class="section-title">Critical Gaps to Close</div>
    <ul style="font-size:14px; color:#b45309;">
      ${report.criticalGapsToClose.map((g) => `<li>${g}</li>`).join('')}
    </ul>

    <div class="section-title">Actionable 3-Step Prep Roadmap</div>
    <ol style="font-size:14px; color:#18181b;">
      ${report.actionablePrepPlan.map((p) => `<li>${p}</li>`).join('')}
    </ol>

    <div class="section-title">Questions & Answers Evaluated (${turns.length})</div>
    ${turns
      .map(
        (t, idx) => `
      <div class="q-card">
        <div style="font-size:13px; font-weight:bold; color:#18181b;">Q${idx + 1}: ${t.question.question}</div>
        <div style="font-size:12px; color:#52525b; margin:6px 0; font-style:italic;">&ldquo;${t.userAnswer}&rdquo;</div>
        <div style="font-size:12px; font-weight:600; color:#18181b;">
          Score: ${t.evaluation?.overallScore ?? 'N/A'}/100 &bull; STAR Breakdown: S:${t.evaluation?.starBreakdown.situation.score ?? 0}/10 | T:${t.evaluation?.starBreakdown.task.score ?? 0}/10 | A:${t.evaluation?.starBreakdown.action.score ?? 0}/10 | R:${t.evaluation?.starBreakdown.result.score ?? 0}/10
        </div>
      </div>
    `
      )
      .join('')}

    <div style="margin-top:32px; font-size:12px; color:#a1a1aa; text-align:center; border-top:1px solid #f4f4f5; padding-top:16px;">
      Sent via AI Interview Coach with Google Workspace integration.
    </div>
  </div>
</body>
</html>
`;

  // Encode message in RFC 2822
  const emailLines = [
    `To: ${recipientEmail}`,
    `Subject: =?utf-8?B?${btoa(unescape(encodeURIComponent(subject)))}?=`,
    'Content-Type: text/html; charset=utf-8',
    'MIME-Version: 1.0',
    '',
    htmlBody,
  ];

  const emailRaw = emailLines.join('\r\n');
  const base64Encoded = btoa(unescape(encodeURIComponent(emailRaw)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  const res = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ raw: base64Encoded }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Failed to send email via Gmail (${res.status}): ${err}`);
  }

  const data = await res.json();
  return {
    messageId: data.id,
    recipient: recipientEmail,
  };
}
