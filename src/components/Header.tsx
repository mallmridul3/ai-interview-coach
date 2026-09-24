import React from 'react';
import { 
  Sparkles, 
  MessageSquare, 
  BookOpen, 
  History, 
  Volume2, 
  VolumeX, 
  ListChecks,
  HardDrive,
  Sliders
} from 'lucide-react';
import { User } from 'firebase/auth';

interface HeaderProps {
  currentTab: 'mock' | 'behavioral' | 'drills' | 'history';
  onSelectTab: (tab: 'mock' | 'behavioral' | 'drills' | 'history') => void;
  voiceEnabled: boolean;
  onToggleVoice: () => void;
  savedSessionsCount: number;
  isInterviewActive: boolean;
  user: User | null;
  onOpenWorkspaceModal?: () => void;
  onOpenVoiceSettings?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  voiceEnabled,
  onToggleVoice,
  savedSessionsCount,
  isInterviewActive,
  user,
  onOpenWorkspaceModal,
  onOpenVoiceSettings,
}) => {
  return (
    <header className="border-b border-zinc-200 bg-white sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-zinc-900 flex items-center justify-center text-white shadow-xs">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-zinc-900 tracking-tight text-lg">AI Interview Coach</span>
                <span className="text-[10px] font-medium tracking-wide uppercase px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200/60 rounded-full">
                  Gemini 3.8
                </span>
              </div>
              <p className="text-xs text-zinc-500 hidden sm:block">Real-time STAR scoring, feedback & role simulation</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center space-x-1 sm:space-x-1.5" aria-label="Main Navigation">
            <button
              id="tab-mock-interview"
              onClick={() => onSelectTab('mock')}
              className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors flex items-center space-x-1.5 cursor-pointer ${
                currentTab === 'mock'
                  ? 'bg-zinc-900 text-white shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Mock Interview</span>
              {isInterviewActive && (
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-1" />
              )}
            </button>

            <button
              id="tab-behavioral-questions"
              onClick={() => onSelectTab('behavioral')}
              className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors flex items-center space-x-1.5 cursor-pointer ${
                currentTab === 'behavioral'
                  ? 'bg-zinc-900 text-white shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
              }`}
            >
              <ListChecks className="w-4 h-4 text-amber-500" />
              <span>10 Behavioral</span>
            </button>

            <button
              id="tab-question-bank"
              onClick={() => onSelectTab('drills')}
              className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors flex items-center space-x-1.5 cursor-pointer ${
                currentTab === 'drills'
                  ? 'bg-zinc-900 text-white shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Practice Drills</span>
              <span className="sm:hidden">Drills</span>
            </button>

            <button
              id="tab-session-history"
              onClick={() => onSelectTab('history')}
              className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors flex items-center space-x-1.5 cursor-pointer ${
                currentTab === 'history'
                  ? 'bg-zinc-900 text-white shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
              }`}
            >
              <History className="w-4 h-4" />
              <span>History</span>
              {savedSessionsCount > 0 && (
                <span className="text-[11px] font-bold px-1.5 py-0.2 bg-zinc-200 text-zinc-700 rounded-full">
                  {savedSessionsCount}
                </span>
              )}
            </button>
          </nav>

          {/* Right Action Items: Google Workspace & Voice Toggle */}
          <div className="flex items-center space-x-2">
            {/* Google Workspace Button */}
            {onOpenWorkspaceModal && (
              <button
                type="button"
                onClick={onOpenWorkspaceModal}
                title="Google Workspace Sync (Drive, Sheets, Gmail)"
                className="px-2.5 py-1.5 border border-zinc-200 hover:border-zinc-300 rounded-lg text-xs flex items-center space-x-1.5 bg-zinc-50 hover:bg-zinc-100 transition-colors cursor-pointer"
              >
                {user ? (
                  <>
                    {user.photoURL ? (
                      <img src={user.photoURL} alt="Avatar" className="w-4 h-4 rounded-full" />
                    ) : (
                      <span className="w-4 h-4 rounded-full bg-emerald-600 text-white text-[9px] flex items-center justify-center font-bold">
                        {user.email?.[0].toUpperCase()}
                      </span>
                    )}
                    <span className="hidden lg:inline text-zinc-700 font-medium truncate max-w-[120px]">
                      {user.email}
                    </span>
                  </>
                ) : (
                  <>
                    <HardDrive className="w-3.5 h-3.5 text-zinc-600" />
                    <span className="hidden sm:inline font-medium text-zinc-700">Google Sync</span>
                  </>
                )}
              </button>
            )}

            {/* Voice Output Toggle & Persona Settings */}
            <div className="flex items-center space-x-1">
              <button
                id="toggle-voice-btn"
                onClick={onToggleVoice}
                title={voiceEnabled ? 'Voice playback enabled for questions' : 'Voice playback muted'}
                className={`p-2 rounded-lg border text-xs flex items-center space-x-1.5 transition-colors cursor-pointer ${
                  voiceEnabled
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                    : 'bg-zinc-50 border-zinc-200 text-zinc-500 hover:text-zinc-800'
                }`}
              >
                {voiceEnabled ? <Volume2 className="w-4 h-4 text-emerald-600" /> : <VolumeX className="w-4 h-4" />}
                <span className="hidden xl:inline font-medium">
                  {voiceEnabled ? 'Voice: On' : 'Voice: Muted'}
                </span>
              </button>

              {onOpenVoiceSettings && (
                <button
                  id="open-voice-settings-btn"
                  onClick={onOpenVoiceSettings}
                  title="Configure natural AI interviewer voice, pacing & sample audio"
                  className="p-2 rounded-lg border border-zinc-200 bg-zinc-50 hover:bg-zinc-100 text-zinc-600 hover:text-zinc-900 text-xs transition-colors cursor-pointer"
                >
                  <Sliders className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
