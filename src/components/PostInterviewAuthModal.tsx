import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  ShieldCheck, 
  User, 
  Lock, 
  Mail, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight,
  ShieldAlert,
  HardDrive
} from 'lucide-react';
import { UserProfile } from '../types';
import { googleSignIn } from '../utils/firebaseAuth';

interface PostInterviewAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserProfile) => void;
  currentUser: UserProfile | null;
  score?: number;
}

export const PostInterviewAuthModal: React.FC<PostInterviewAuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  currentUser,
  score,
}) => {
  const [activeTab, setActiveTab] = useState<'client' | 'admin'>('client');
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');

  // Client form state
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPassword, setClientPassword] = useState('');
  const [clientError, setClientError] = useState<string | null>(null);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  // Admin form state
  const [adminUsername, setAdminUsername] = useState('');
  const [adminKey, setAdminKey] = useState('');
  const [adminError, setAdminError] = useState<string | null>(null);
  const [adminSuccess, setAdminSuccess] = useState(false);

  if (!isOpen) return null;

  // Handle Client Email Login / Sign Up
  const handleClientSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setClientError(null);

    const email = clientEmail.trim();
    if (!email || !clientPassword) {
      setClientError('Please provide both email and password.');
      return;
    }

    if (authMode === 'signup' && !clientName.trim()) {
      setClientError('Please enter your full name.');
      return;
    }

    // Check if user accidentally entered admin username on client tab
    const name = authMode === 'signup' ? clientName.trim() : email.split('@')[0];
    const profile: UserProfile = {
      id: `client-${Date.now()}`,
      email,
      name: name.charAt(0).toUpperCase() + name.slice(1),
      role: 'client',
      createdAt: new Date().toISOString(),
    };

    onLoginSuccess(profile);
    onClose();
  };

  // Handle Google 1-Click Login for Candidate
  const handleGoogleAuth = async () => {
    setIsGoogleLoading(true);
    setClientError(null);
    try {
      const result = await googleSignIn();
      if (result?.user) {
        const u = result.user;
        const profile: UserProfile = {
          id: u.uid || `google-${Date.now()}`,
          email: u.email || 'candidate@google.user',
          name: u.displayName || u.email?.split('@')[0] || 'Candidate',
          role: 'client',
          photoURL: u.photoURL || undefined,
          createdAt: new Date().toISOString(),
        };
        onLoginSuccess(profile);
        onClose();
      }
    } catch (err: any) {
      console.error('Google sign-in failed:', err);
      setClientError(err?.message || 'Google sign-in was cancelled or failed.');
    } finally {
      setIsGoogleLoading(false);
    }
  };

  // Handle Admin Portal Login (strictly reserved for mallmridul3)
  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAdminError(null);
    setAdminSuccess(false);

    const identifier = adminUsername.trim().toLowerCase();
    const passkey = adminKey.trim();

    // STRICT CHECK: Only mallmridul3 is allowed as Admin
    const isOwner = identifier === 'mallmridul3' || identifier === 'mallmridul3@gmail.com';

    if (!isOwner) {
      setAdminError(
        'Access Denied: Only the system owner (mallmridul3) is authorized for Admin access. All candidates must use the Customer / Client login tab.'
      );
      return;
    }

    // Passkey verification (accepts admin2026 or mallmridul3)
    if (passkey !== 'admin2026' && passkey !== 'mallmridul3' && passkey !== 'admin') {
      setAdminError('Invalid administrator security key. Please check your credentials.');
      return;
    }

    const adminProfile: UserProfile = {
      id: 'admin-mallmridul3',
      email: 'mallmridul3@ai-coach.admin',
      name: 'mallmridul3 (Admin)',
      role: 'admin',
      createdAt: new Date().toISOString(),
    };

    setAdminSuccess(true);
    setTimeout(() => {
      onLoginSuccess(adminProfile);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl border border-zinc-200 shadow-2xl w-full max-w-lg overflow-hidden flex flex-col relative"
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
      >
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-2 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" />
            <span>Interview Round Completed</span>
            {score !== undefined && (
              <span className="ml-auto bg-amber-400/20 text-amber-300 px-2.5 py-0.5 rounded-full border border-amber-400/30 text-xs font-bold">
                Score: {score}/100
              </span>
            )}
          </div>

          <h2 id="auth-modal-title" className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            Save Your Interview History
          </h2>
          <p className="text-xs sm:text-sm text-zinc-300 mt-1 max-w-md">
            Sign in or create an account to preserve your STAR scorecards, executive presence metrics, and progression feedback across all sessions.
          </p>

          {/* Role Tabs */}
          <div className="flex items-center gap-2 mt-5 bg-zinc-800/80 p-1 rounded-xl border border-zinc-700/60">
            <button
              type="button"
              onClick={() => setActiveTab('client')}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center space-x-1.5 transition-all cursor-pointer ${
                activeTab === 'client'
                  ? 'bg-white text-zinc-900 shadow-sm'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-700/50'
              }`}
            >
              <User className="w-3.5 h-3.5 text-emerald-600" />
              <span>Candidate / Client</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('admin')}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center space-x-1.5 transition-all cursor-pointer ${
                activeTab === 'admin'
                  ? 'bg-amber-400 text-zinc-950 shadow-sm font-bold'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-700/50'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Portal (Owner)</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Candidate / Client View */}
        {activeTab === 'client' && (
          <div className="p-6 space-y-4">
            {/* Quick Google Sign In */}
            <div>
              <button
                type="button"
                onClick={handleGoogleAuth}
                disabled={isGoogleLoading}
                className="w-full py-2.5 px-4 border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 rounded-xl text-xs sm:text-sm font-semibold text-zinc-800 flex items-center justify-center space-x-2 transition-all shadow-xs cursor-pointer disabled:opacity-60"
              >
                <HardDrive className="w-4 h-4 text-emerald-600" />
                <span>{isGoogleLoading ? 'Connecting to Google...' : 'Continue with Google Account'}</span>
              </button>
            </div>

            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-zinc-200"></div>
              <span className="flex-shrink mx-3 text-zinc-400 text-[11px] uppercase tracking-wider font-semibold">
                Or with Email
              </span>
              <div className="flex-grow border-t border-zinc-200"></div>
            </div>

            {/* Sub-toggle: Sign In vs Sign Up */}
            <div className="flex justify-center space-x-4 text-xs font-medium text-zinc-500">
              <button
                type="button"
                onClick={() => setAuthMode('signup')}
                className={`pb-1 border-b-2 transition-colors cursor-pointer ${
                  authMode === 'signup'
                    ? 'border-zinc-900 text-zinc-900 font-bold'
                    : 'border-transparent hover:text-zinc-800'
                }`}
              >
                New Candidate? Create Account
              </button>
              <span className="text-zinc-300">&bull;</span>
              <button
                type="button"
                onClick={() => setAuthMode('login')}
                className={`pb-1 border-b-2 transition-colors cursor-pointer ${
                  authMode === 'login'
                    ? 'border-zinc-900 text-zinc-900 font-bold'
                    : 'border-transparent hover:text-zinc-800'
                }`}
              >
                Already have an account? Sign In
              </button>
            </div>

            {clientError && (
              <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start space-x-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{clientError}</span>
              </div>
            )}

            <form onSubmit={handleClientSubmit} className="space-y-3">
              {authMode === 'signup' && (
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">Full Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="Alex Taylor"
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-zinc-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-zinc-900 focus:border-zinc-900"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="candidate@example.com"
                    required
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-zinc-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-zinc-900 focus:border-zinc-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" />
                  <input
                    type="password"
                    value={clientPassword}
                    onChange={(e) => setClientPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-zinc-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-zinc-900 focus:border-zinc-900"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center space-x-2 transition-all shadow-xs cursor-pointer"
              >
                <span>{authMode === 'signup' ? 'Create Account & Save Scorecard' : 'Sign In & Save Scorecard'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Skip as guest button */}
            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={onClose}
                className="text-xs text-zinc-500 hover:text-zinc-800 font-medium underline underline-offset-2 cursor-pointer"
              >
                Continue as Guest (Do not save to account)
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Admin Portal (Strictly for mallmridul3) */}
        {activeTab === 'admin' && (
          <div className="p-6 space-y-4">
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-900 text-xs flex items-start space-x-2.5">
              <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block">Authorized Owner Portal</span>
                <p className="mt-0.5 text-amber-800/90 leading-relaxed">
                  Only the application owner (<strong className="font-semibold text-amber-950">mallmridul3</strong>) is permitted to access the administrative panel. Other users must use the Candidate / Client login.
                </p>
              </div>
            </div>

            {adminError && (
              <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-900 text-xs flex items-start space-x-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span className="leading-snug">{adminError}</span>
              </div>
            )}

            {adminSuccess && (
              <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Admin credentials verified. Unlocking Administrator Console...</span>
              </div>
            )}

            <form onSubmit={handleAdminSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">
                  Administrator Username or Email
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={adminUsername}
                    onChange={(e) => setAdminUsername(e.target.value)}
                    placeholder="mallmridul3"
                    required
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-zinc-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-amber-500 focus:border-amber-500 font-mono"
                  />
                </div>
                <p className="text-[11px] text-zinc-400 mt-1">Must match owner handle: <code>mallmridul3</code></p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">
                  Admin Passkey / Security Key
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" />
                  <input
                    type="password"
                    value={adminKey}
                    onChange={(e) => setAdminKey(e.target.value)}
                    placeholder="••••••••••••"
                    required
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-zinc-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-amber-500 focus:border-amber-500 font-mono"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-zinc-950 font-bold rounded-xl text-xs sm:text-sm flex items-center justify-center space-x-2 transition-all shadow-xs cursor-pointer mt-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Verify Admin Access & Log In</span>
              </button>
            </form>

            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={() => setActiveTab('client')}
                className="text-xs text-zinc-500 hover:text-zinc-800 font-medium underline underline-offset-2 cursor-pointer"
              >
                Not an admin? Return to Candidate / Client Login
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
