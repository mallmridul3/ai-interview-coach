import React, { useState } from 'react';
import { 
  X, 
  FileText, 
  Table, 
  Mail, 
  CheckCircle2, 
  ExternalLink, 
  AlertCircle,
  Sparkles,
  Send,
  Loader2,
  HardDrive
} from 'lucide-react';
import { User } from 'firebase/auth';
import { RoleSetup, SessionFinalReport, InterviewTurn } from '../types';
import { 
  saveReportToGoogleDrive, 
  exportScorecardToGoogleSheets, 
  sendReportViaGmail,
  DriveExportResult,
  SheetsExportResult,
  GmailSendResult
} from '../utils/googleWorkspace';
import { googleSignIn, logoutGoogle } from '../utils/firebaseAuth';

interface WorkspaceExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  accessToken: string | null;
  onAuthSuccess: (user: User, token: string) => void;
  setup: RoleSetup;
  report: SessionFinalReport;
  turns: InterviewTurn[];
}

export const WorkspaceExportModal: React.FC<WorkspaceExportModalProps> = ({
  isOpen,
  onClose,
  user,
  accessToken,
  onAuthSuccess,
  setup,
  report,
  turns,
}) => {
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Drive state
  const [isSavingDrive, setIsSavingDrive] = useState(false);
  const [driveResult, setDriveResult] = useState<DriveExportResult | null>(null);

  // Sheets state
  const [isExportingSheets, setIsExportingSheets] = useState(false);
  const [sheetsResult, setSheetsResult] = useState<SheetsExportResult | null>(null);

  // Gmail state
  const [recipientEmail, setRecipientEmail] = useState(user?.email || '');
  const [isSendingMail, setIsSendingMail] = useState(false);
  const [mailResult, setMailResult] = useState<GmailSendResult | null>(null);
  const [showMailConfirm, setShowMailConfirm] = useState(false);

  if (!isOpen) return null;

  const handleSignIn = async () => {
    setIsSigningIn(true);
    setErrorMsg(null);
    try {
      const res = await googleSignIn();
      if (res) {
        onAuthSuccess(res.user, res.accessToken);
        if (!recipientEmail && res.user.email) {
          setRecipientEmail(res.user.email);
        }
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err?.message || 'Failed to authenticate with Google');
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleSaveDrive = async () => {
    if (!accessToken) return;
    setIsSavingDrive(true);
    setErrorMsg(null);
    try {
      const res = await saveReportToGoogleDrive(accessToken, setup, report, turns);
      setDriveResult(res);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(`Drive Error: ${err?.message || 'Failed to upload report'}`);
    } finally {
      setIsSavingDrive(false);
    }
  };

  const handleExportSheets = async () => {
    if (!accessToken) return;
    setIsExportingSheets(true);
    setErrorMsg(null);
    try {
      const res = await exportScorecardToGoogleSheets(accessToken, setup, report, turns);
      setSheetsResult(res);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(`Sheets Error: ${err?.message || 'Failed to update tracker sheet'}`);
    } finally {
      setIsExportingSheets(false);
    }
  };

  const handleSendGmailConfirm = async () => {
    if (!accessToken || !recipientEmail) return;
    setShowMailConfirm(false);
    setIsSendingMail(true);
    setErrorMsg(null);
    try {
      const subject = `AI Interview Coach Debrief: ${setup.level} ${setup.roleTitle} (${report.overallScore}/100 - ${report.hiringRecommendation})`;
      const res = await sendReportViaGmail(accessToken, recipientEmail, subject, setup, report, turns);
      setMailResult(res);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(`Gmail Error: ${err?.message || 'Failed to send report via email'}`);
    } finally {
      setIsSendingMail(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-xl border border-zinc-200">
        {/* Modal Header */}
        <div className="p-5 border-b border-zinc-100 flex items-center justify-between sticky top-0 bg-white z-10">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-zinc-900 text-white flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-amber-300" />
            </div>
            <div>
              <h2 className="text-base font-bold text-zinc-900">Google Workspace Sync</h2>
              <p className="text-xs text-zinc-500">Export scorecard to Google Drive, Sheets & Gmail</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {errorMsg && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-800 flex items-start space-x-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Authentication Status */}
          {!user ? (
            <div className="p-6 bg-zinc-50 border border-zinc-200 rounded-xl text-center space-y-3">
              <HardDrive className="w-8 h-8 text-zinc-400 mx-auto" />
              <div>
                <h3 className="text-sm font-bold text-zinc-900">Connect Google Workspace</h3>
                <p className="text-xs text-zinc-500 max-w-xs mx-auto mt-1">
                  Authenticate with your Google account to automatically upload debrief documents, log scores to Sheets, and email feedback.
                </p>
              </div>

              {/* Official Google Sign In Button */}
              <div className="pt-2 flex justify-center">
                <button
                  type="button"
                  onClick={handleSignIn}
                  disabled={isSigningIn}
                  className="px-5 py-2.5 bg-white border border-zinc-300 hover:bg-zinc-50 text-zinc-700 text-xs font-semibold rounded-lg shadow-xs flex items-center space-x-3 transition-colors cursor-pointer disabled:opacity-50"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span>{isSigningIn ? 'Connecting...' : 'Sign in with Google'}</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Signed In User Pill */}
              <div className="p-3 bg-zinc-50 border border-zinc-200 rounded-lg flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2.5">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="User avatar" className="w-6 h-6 rounded-full" />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-zinc-800 text-white flex items-center justify-center font-bold text-[10px]">
                      {user.email?.[0].toUpperCase() || 'U'}
                    </div>
                  )}
                  <div>
                    <span className="font-semibold text-zinc-900 block">{user.displayName || 'Connected User'}</span>
                    <span className="text-zinc-500 text-[11px]">{user.email}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={async () => {
                    await logoutGoogle();
                    onClose();
                  }}
                  className="text-zinc-500 hover:text-zinc-800 underline text-[11px]"
                >
                  Switch Account
                </button>
              </div>

              {/* 1. Google Drive Card */}
              <div className="p-4 border border-zinc-200 rounded-xl bg-white space-y-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2.5">
                    <div className="p-2 bg-blue-50 text-blue-700 rounded-lg">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-zinc-900">Save to Google Drive</h4>
                      <p className="text-[11px] text-zinc-500">Uploads full debrief document to your Drive</p>
                    </div>
                  </div>

                  {driveResult ? (
                    <a
                      href={driveResult.webViewLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold rounded-lg flex items-center space-x-1 hover:bg-emerald-100 transition-colors"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>View in Drive</span>
                      <ExternalLink className="w-3 h-3 ml-0.5" />
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSaveDrive}
                      disabled={isSavingDrive}
                      className="px-3.5 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold rounded-lg flex items-center space-x-1.5 transition-colors cursor-pointer disabled:opacity-50"
                    >
                      {isSavingDrive ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Saving...</span>
                        </>
                      ) : (
                        <span>Upload to Drive</span>
                      )}
                    </button>
                  )}
                </div>
              </div>

              {/* 2. Google Sheets Card */}
              <div className="p-4 border border-zinc-200 rounded-xl bg-white space-y-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2.5">
                    <div className="p-2 bg-emerald-50 text-emerald-700 rounded-lg">
                      <Table className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-zinc-900">Log to Google Sheets Tracker</h4>
                      <p className="text-[11px] text-zinc-500">Appends row with STAR breakdown and score to tracker</p>
                    </div>
                  </div>

                  {sheetsResult ? (
                    <a
                      href={sheetsResult.spreadsheetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold rounded-lg flex items-center space-x-1 hover:bg-emerald-100 transition-colors"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Open Spreadsheet</span>
                      <ExternalLink className="w-3 h-3 ml-0.5" />
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={handleExportSheets}
                      disabled={isExportingSheets}
                      className="px-3.5 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold rounded-lg flex items-center space-x-1.5 transition-colors cursor-pointer disabled:opacity-50"
                    >
                      {isExportingSheets ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Exporting...</span>
                        </>
                      ) : (
                        <span>Log to Sheet</span>
                      )}
                    </button>
                  )}
                </div>
              </div>

              {/* 3. Gmail Card */}
              <div className="p-4 border border-zinc-200 rounded-xl bg-white space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2.5">
                    <div className="p-2 bg-rose-50 text-rose-700 rounded-lg">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-zinc-900">Email Debrief via Gmail</h4>
                      <p className="text-[11px] text-zinc-500">Send performance review directly to your inbox</p>
                    </div>
                  </div>
                </div>

                {mailResult ? (
                  <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Debrief successfully emailed to <strong>{mailResult.recipient}</strong>!</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <input
                      type="email"
                      value={recipientEmail}
                      onChange={(e) => setRecipientEmail(e.target.value)}
                      placeholder="Enter recipient email..."
                      className="flex-1 p-2 bg-zinc-50 border border-zinc-200 rounded-lg text-xs text-zinc-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-zinc-900"
                    />
                    <button
                      type="button"
                      onClick={() => setShowMailConfirm(true)}
                      disabled={!recipientEmail || isSendingMail}
                      className="px-3.5 py-2 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold rounded-lg flex items-center space-x-1.5 transition-colors cursor-pointer disabled:opacity-50"
                    >
                      {isSendingMail ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Send via Gmail</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Confirmation Dialog for Destructive / Send Operations */}
        {showMailConfirm && (
          <div className="p-5 border-t border-zinc-200 bg-amber-50/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div>
              <div className="font-bold text-zinc-900">Confirm Sending Email via Gmail</div>
              <div className="text-zinc-600 text-[11px] mt-0.5">
                Send the interview debrief for <strong>{setup.roleTitle}</strong> to <strong>{recipientEmail}</strong> using your Gmail account?
              </div>
            </div>
            <div className="flex items-center space-x-2 shrink-0">
              <button
                type="button"
                onClick={() => setShowMailConfirm(false)}
                className="px-3 py-1.5 text-xs text-zinc-600 hover:text-zinc-800 bg-white border border-zinc-300 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSendGmailConfirm}
                className="px-3.5 py-1.5 text-xs font-semibold text-white bg-zinc-900 hover:bg-zinc-800 rounded-lg"
              >
                Confirm & Send
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
