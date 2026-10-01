import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  User, 
  Lock, 
  Mail, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight,
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
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [fullName, setFullName] = useState('');
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  if (!isOpen) return null;

  // Handle Form Submission with Automatic Admin Credentials Detection
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const identifier = emailOrUsername.trim().toLowerCase();
    const pass = password.trim();

    if (!identifier || !pass) {
      setErrorMessage('Please enter your email or username and password.');
      return;
    }

    if (authMode === 'signup' && !fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    // AUTOMATIC ADMIN DETECTION:
    // If the system owner credentials are used, seamlessly grant Admin status!
    const isAdmin = 
      (identifier === 'mallmridul3' || identifier === 'mallmridul3@gmail.com') &&
      (pass === 'admin2026' || pass === 'mallmridul3' || pass === 'admin');

    if (isAdmin) {
      const adminProfile: UserProfile = {
        id: 'admin-mallmridul3',
        email: 'mallmridul3@gmail.com',
        name: 'mallmridul3 (Admin)',
        role: 'admin',
        createdAt: new Date().toISOString(),
      };
      onLoginSuccess(adminProfile);
      onClose();
      return;
    }

    // Standard Candidate / Client Profile
    const displayName = authMode === 'signup' && fullName.trim() 
      ? fullName.trim() 
      : identifier.split('@')[0];

    const clientProfile: UserProfile = {
      id: `client-${Date.now()}`,
      email: identifier.includes('@') ? identifier : `${identifier}@candidate.io`,
      name: displayName.charAt(0).toUpperCase() + displayName.slice(1),
      role: 'client',
      createdAt: new Date().toISOString(),
    };

    onLoginSuccess(clientProfile);
    onClose();
  };

  // Handle Google 1-Click Authentication
  const handleGoogleAuth = async () => {
    setIsGoogleLoading(true);
    setErrorMessage(null);
    try {
      const result = await googleSignIn();
      if (result?.user) {
        const u = result.user;
        const emailLower = (u.email || '').toLowerCase();
        
        // Auto-detect admin on Google Login as well
        const isOwnerGoogle = emailLower === 'mallmridul3@gmail.com';

        const profile: UserProfile = {
          id: u.uid || `google-${Date.now()}`,
          email: u.email || 'candidate@google.user',
          name: isOwnerGoogle ? 'mallmridul3 (Admin)' : (u.displayName || u.email?.split('@')[0] || 'Candidate'),
          role: isOwnerGoogle ? 'admin' : 'client',
          photoURL: u.photoURL || undefined,
          createdAt: new Date().toISOString(),
        };
        onLoginSuccess(profile);
        onClose();
      }
    } catch (err: any) {
      console.error('Google sign-in error:', err);
      setErrorMessage(err?.message || 'Google sign-in was cancelled or failed.');
    } finally {
      setIsGoogleLoading(false);
    }
  };

  // Continue as Guest
  const handleContinueAsGuest = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl border border-zinc-200 shadow-2xl w-full max-w-md overflow-hidden flex flex-col relative"
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
      >
        {/* Header Bar */}
        <div className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-2 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-1.5">
            <Sparkles className="w-4 h-4" />
            <span>AI Interview Coach</span>
            {score !== undefined && (
              <span className="ml-auto bg-amber-400/20 text-amber-300 px-2.5 py-0.5 rounded-full border border-amber-400/30 text-xs font-bold">
                Score: {score}/100
              </span>
            )}
          </div>

          <h2 id="auth-modal-title" className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            {authMode === 'login' ? 'Sign In to Your Account' : 'Create Candidate Account'}
          </h2>
          <p className="text-xs sm:text-sm text-zinc-300 mt-1 leading-relaxed">
            Preserve your STAR scorecards, executive presence metrics, and session progression history across devices.
          </p>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-5">
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

          <div className="relative flex py-0.5 items-center">
            <div className="flex-grow border-t border-zinc-200"></div>
            <span className="flex-shrink mx-3 text-zinc-400 text-[11px] uppercase tracking-wider font-semibold">
              Or with credentials
            </span>
            <div className="flex-grow border-t border-zinc-200"></div>
          </div>

          {/* Mode Switcher */}
          <div className="flex bg-zinc-100 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => {
                setAuthMode('login');
                setErrorMessage(null);
              }}
              className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                authMode === 'login'
                  ? 'bg-white text-zinc-900 shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setAuthMode('signup');
                setErrorMessage(null);
              }}
              className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                authMode === 'signup'
                  ? 'bg-white text-zinc-900 shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {authMode === 'signup' && (
              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-zinc-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Alex Morgan"
                    className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm border border-zinc-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-zinc-900"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-zinc-700 mb-1">Email or Username</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-zinc-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={emailOrUsername}
                  onChange={(e) => setEmailOrUsername(e.target.value)}
                  placeholder="e.g. name@example.com or username"
                  className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm border border-zinc-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-zinc-900"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-zinc-400 absolute left-3 top-3" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm border border-zinc-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-zinc-900"
                  required
                />
              </div>
            </div>

            {errorMessage && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-start space-x-2">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center space-x-2 shadow-xs transition-all cursor-pointer"
            >
              <span>{authMode === 'login' ? 'Sign In' : 'Create Account & Save'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Continue as Guest */}
          <div className="text-center pt-1 border-t border-zinc-100">
            <button
              type="button"
              onClick={handleContinueAsGuest}
              className="text-xs text-zinc-500 hover:text-zinc-800 font-medium transition-colors cursor-pointer"
            >
              Continue as Guest (Scores saved locally in current session)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
