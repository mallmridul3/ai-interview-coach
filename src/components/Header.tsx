import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  MessageSquare, 
  BookOpen, 
  History, 
  Volume2, 
  VolumeX, 
  ListChecks,
  HardDrive,
  Sliders,
  ShieldCheck,
  User as UserIcon,
  LogOut,
  LogIn,
  Building2,
  ChevronDown,
  Menu,
  Check
} from 'lucide-react';
import { User } from 'firebase/auth';
import { UserProfile } from '../types';

export type TabKey = 'hiring-process' | 'mock' | 'behavioral' | 'drills' | 'history';

interface HeaderProps {
  currentTab: TabKey;
  onSelectTab: (tab: TabKey) => void;
  voiceEnabled: boolean;
  onToggleVoice: () => void;
  savedSessionsCount: number;
  isInterviewActive: boolean;
  user: User | null;
  currentUser?: UserProfile | null;
  onOpenWorkspaceModal?: () => void;
  onOpenVoiceSettings?: () => void;
  onOpenAuthModal?: () => void;
  onLogout?: () => void;
}

interface NavTabItem {
  id: TabKey;
  label: string;
  badgeLabel?: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  elementId: string;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  voiceEnabled,
  onToggleVoice,
  savedSessionsCount,
  isInterviewActive,
  user,
  currentUser,
  onOpenWorkspaceModal,
  onOpenVoiceSettings,
  onOpenAuthModal,
  onLogout,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Tabs ordered with Hiring Process FIRST
  const TABS: NavTabItem[] = [
    {
      id: 'hiring-process',
      label: 'Hiring Process',
      badgeLabel: 'Architecture & Loops',
      description: 'Company-specific interview stages, leveled roles & authentic questions',
      icon: Building2,
      iconColor: 'text-sky-500',
      elementId: 'tab-hiring-process',
    },
    {
      id: 'mock',
      label: 'Mock Interview',
      description: 'Live interactive AI interview simulation with real-time STAR scoring',
      icon: MessageSquare,
      iconColor: 'text-emerald-500',
      elementId: 'tab-mock-interview',
    },
    {
      id: 'behavioral',
      label: '10 Behavioral',
      description: 'Amazon LP, STAR mastery framework & high-frequency behavioral questions',
      icon: ListChecks,
      iconColor: 'text-amber-500',
      elementId: 'tab-behavioral-questions',
    },
    {
      id: 'drills',
      label: 'Practice Drills',
      description: 'Rapid-fire timed drills to sharpen spontaneous problem solving',
      icon: BookOpen,
      iconColor: 'text-indigo-500',
      elementId: 'tab-question-bank',
    },
    {
      id: 'history',
      label: 'Session History',
      description: 'Detailed past transcripts, competency radar scores & executive reports',
      icon: History,
      iconColor: 'text-purple-500',
      elementId: 'tab-session-history',
    },
  ];

  const currentTabObj = TABS.find((t) => t.id === currentTab) || TABS[0];
  const CurrentIcon = currentTabObj.icon;

  // Click-away listener to close menu
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    }

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen]);

  const handleSelectTab = (tabId: TabKey) => {
    onSelectTab(tabId);
    setIsMenuOpen(false);
  };

  return (
    <header className="border-b border-zinc-200 bg-white sticky top-0 z-30 shadow-2xs">
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
              <p className="text-xs text-zinc-500 hidden sm:block">Real-time STAR scoring, feedback &amp; role simulation</p>
            </div>
          </div>

          {/* Minimalist Navigation: Shows ONLY the Current Tab Name + Menu Trigger */}
          <div className="relative" ref={menuRef}>
            <button
              id="header-nav-menu-btn"
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center space-x-2.5 px-3.5 py-2 bg-zinc-50 hover:bg-zinc-100/90 border border-zinc-200/90 hover:border-zinc-300 rounded-xl transition-all cursor-pointer shadow-2xs group"
              title="Click to view all sections menu"
              aria-expanded={isMenuOpen}
              aria-haspopup="true"
            >
              <div className="flex items-center space-x-2">
                <div className="p-1 rounded-md bg-white border border-zinc-200 shadow-2xs">
                  <CurrentIcon className={`w-4 h-4 ${currentTabObj.iconColor}`} />
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="text-xs text-zinc-400 font-medium hidden md:inline">Current:</span>
                  <span className="text-xs sm:text-sm font-bold text-zinc-900 tracking-tight">
                    {currentTabObj.label}
                  </span>
                </div>

                {/* Status Badges */}
                {currentTab === 'mock' && isInterviewActive && (
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-0.5" title="Live Interview in Progress" />
                )}
                {currentTab === 'history' && savedSessionsCount > 0 && (
                  <span className="text-[10px] font-bold px-1.5 py-0.2 bg-zinc-200 text-zinc-700 rounded-full ml-1">
                    {savedSessionsCount}
                  </span>
                )}
              </div>

              {/* Menu Chevron Indicator */}
              <div className="flex items-center pl-1 border-l border-zinc-200 text-zinc-400 group-hover:text-zinc-700 transition-colors">
                <Menu className="w-3.5 h-3.5 mr-0.5 hidden sm:block" />
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isMenuOpen ? 'rotate-180 text-zinc-900' : ''}`} />
              </div>
            </button>

            {/* Comprehensive Dropdown Menu containing all options */}
            {isMenuOpen && (
              <div 
                id="header-navigation-menu-dropdown"
                className="absolute top-full right-0 sm:left-1/2 sm:-translate-x-1/2 mt-2 w-72 sm:w-88 bg-white border border-zinc-200/90 rounded-2xl shadow-xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150"
              >
                <div className="px-4 py-2.5 bg-zinc-50/80 border-b border-zinc-100 flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
                    Navigation Menu
                  </span>
                  <span className="text-[10px] text-zinc-400 font-medium">
                    {TABS.length} Sections Available
                  </span>
                </div>

                <div className="p-1.5 space-y-1">
                  {TABS.map((tab) => {
                    const TabIcon = tab.icon;
                    const isActive = currentTab === tab.id;

                    return (
                      <button
                        key={tab.id}
                        id={tab.elementId}
                        type="button"
                        onClick={() => handleSelectTab(tab.id)}
                        className={`w-full text-left px-3 py-2.5 rounded-xl transition-all flex items-start space-x-3 cursor-pointer group ${
                          isActive
                            ? 'bg-zinc-900 text-white shadow-xs'
                            : 'hover:bg-zinc-100/80 text-zinc-800'
                        }`}
                      >
                        <div className={`p-1.5 rounded-lg shrink-0 mt-0.5 ${
                          isActive 
                            ? 'bg-zinc-800 text-white' 
                            : 'bg-zinc-100 text-zinc-700 group-hover:bg-white border border-zinc-200/60'
                        }`}>
                          <TabIcon className={`w-4 h-4 ${isActive ? 'text-amber-300' : tab.iconColor}`} />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2">
                            <span className={`text-xs sm:text-sm font-semibold truncate ${
                              isActive ? 'text-white' : 'text-zinc-900'
                            }`}>
                              {tab.label}
                            </span>

                            {/* Live Badge for Mock */}
                            {tab.id === 'mock' && isInterviewActive && (
                              <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500 text-white animate-pulse">
                                Live
                              </span>
                            )}

                            {/* Saved count for History */}
                            {tab.id === 'history' && savedSessionsCount > 0 && (
                              <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                                isActive ? 'bg-zinc-800 text-zinc-200' : 'bg-zinc-200 text-zinc-700'
                              }`}>
                                {savedSessionsCount}
                              </span>
                            )}

                            {/* Hiring Process Priority Tag */}
                            {tab.id === 'hiring-process' && (
                              <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full uppercase tracking-wider ${
                                isActive ? 'bg-sky-500/30 text-sky-200' : 'bg-sky-50 text-sky-700 border border-sky-200/60'
                              }`}>
                                Top
                              </span>
                            )}
                          </div>

                          <p className={`text-[11px] leading-snug line-clamp-2 mt-0.5 ${
                            isActive ? 'text-zinc-300' : 'text-zinc-500'
                          }`}>
                            {tab.description}
                          </p>
                        </div>

                        {isActive && (
                          <div className="shrink-0 self-center pl-1 text-emerald-400">
                            <Check className="w-4 h-4" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Right Action Items: User Role, Google Workspace & Voice Toggle */}
          <div className="flex items-center space-x-2">
            {/* User Account / Role Badge */}
            {currentUser ? (
              <div className="flex items-center space-x-1.5">
                <div 
                  id="user-role-badge"
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center space-x-1.5 border ${
                    currentUser.role === 'admin'
                      ? 'bg-amber-50 text-amber-900 border-amber-300 shadow-xs'
                      : 'bg-emerald-50 text-emerald-900 border-emerald-200'
                  }`}
                  title={currentUser.role === 'admin' ? 'System Administrator (Owner: mallmridul3)' : `Candidate: ${currentUser.email}`}
                >
                  {currentUser.role === 'admin' ? (
                    <>
                      <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                      <span className="font-bold">Admin: mallmridul3</span>
                    </>
                  ) : (
                    <>
                      <UserIcon className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="truncate max-w-[110px]">{currentUser.name || currentUser.email}</span>
                    </>
                  )}
                </div>

                {onLogout && (
                  <button
                    type="button"
                    id="sign-out-btn"
                    onClick={onLogout}
                    title="Sign Out"
                    className="p-1.5 rounded-lg border border-zinc-200 bg-zinc-50 hover:bg-zinc-100 text-zinc-500 hover:text-zinc-800 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ) : (
              onOpenAuthModal && (
                <button
                  type="button"
                  id="open-auth-btn"
                  onClick={onOpenAuthModal}
                  className="px-2.5 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-lg text-xs font-semibold flex items-center space-x-1.5 shadow-xs transition-all cursor-pointer"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Sign In</span>
                </button>
              )
            )}

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
                  title="Configure natural AI interviewer voice, pacing &amp; sample audio"
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
