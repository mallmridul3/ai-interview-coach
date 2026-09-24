import React, { useState } from 'react';
import {
  Volume2,
  Play,
  Square,
  Sparkles,
  Check,
  X,
  Gauge,
  HelpCircle,
  Headphones,
  CheckCircle2
} from 'lucide-react';
import {
  AI_VOICES,
  AiVoiceOption,
  getSelectedVoiceId,
  setSelectedVoiceId,
  getSpeechSpeed,
  setSpeechSpeed,
  playVoiceSample,
  testPersonaSpeech,
  getMatchedVoiceDetails,
  stopSpeaking,
} from '../utils/speechUtils';

interface VoiceSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VoiceSettingsModal: React.FC<VoiceSettingsModalProps> = ({ isOpen, onClose }) => {
  const [selectedVoice, setSelectedVoice] = useState<AiVoiceOption['id']>(getSelectedVoiceId());
  const [speed, setSpeed] = useState<number>(getSpeechSpeed());
  const [playingVoiceId, setPlayingVoiceId] = useState<string | null>(null);
  const [playingMode, setPlayingMode] = useState<'sample' | 'question' | null>(null);

  if (!isOpen) return null;

  const handleSelectVoice = (id: AiVoiceOption['id']) => {
    setSelectedVoice(id);
    setSelectedVoiceId(id);
  };

  const handleSpeedChange = (newSpeed: number) => {
    setSpeed(newSpeed);
    setSpeechSpeed(newSpeed);
  };

  const handlePlaySample = (voice: AiVoiceOption) => {
    if (playingVoiceId === voice.id && playingMode === 'sample') {
      stopSpeaking();
      setPlayingVoiceId(null);
      setPlayingMode(null);
      return;
    }

    stopSpeaking();
    setPlayingVoiceId(voice.id);
    setPlayingMode('sample');

    playVoiceSample(
      voice.id,
      () => {
        setPlayingVoiceId(null);
        setPlayingMode(null);
      },
      speed
    );
  };

  const handleTestQuestionSpeech = (voice: AiVoiceOption) => {
    if (playingVoiceId === voice.id && playingMode === 'question') {
      stopSpeaking();
      setPlayingVoiceId(null);
      setPlayingMode(null);
      return;
    }

    stopSpeaking();
    setPlayingVoiceId(voice.id);
    setPlayingMode('question');

    testPersonaSpeech(
      voice.id,
      () => {
        setPlayingVoiceId(null);
        setPlayingMode(null);
      },
      speed
    );
  };

  const handleClose = () => {
    stopSpeaking();
    setPlayingVoiceId(null);
    setPlayingMode(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl border border-zinc-200 max-w-xl w-full overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100 bg-zinc-50/70">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-zinc-900">Interviewer Voice Settings</h3>
              <p className="text-xs text-zinc-500">
                Natural human pacing, calibrated pitch & studio audio
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="text-zinc-400 hover:text-zinc-600 p-1.5 rounded-lg hover:bg-zinc-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Voice List */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-zinc-700 block uppercase tracking-wider">
                Select AI Interviewer Voice
              </label>
              <span className="text-[11px] text-zinc-400">
                Click a persona card to activate
              </span>
            </div>
            <div className="space-y-2.5">
              {AI_VOICES.map((voice) => {
                const isSelected = selectedVoice === voice.id;
                const isPlayingSample = playingVoiceId === voice.id && playingMode === 'sample';
                const isPlayingQuestion = playingVoiceId === voice.id && playingMode === 'question';
                const matchedDetails = getMatchedVoiceDetails(voice.id);

                return (
                  <div
                    key={voice.id}
                    onClick={() => handleSelectVoice(voice.id)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-emerald-500 bg-emerald-50/40 ring-1 ring-emerald-500/20 shadow-xs'
                        : 'border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-1 flex-1 pr-3">
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-bold text-zinc-900">{voice.name}</span>
                          {isSelected && (
                            <span className="flex items-center space-x-1 text-[10px] font-semibold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded-xs">
                              <Check className="w-2.5 h-2.5" />
                              <span>Active Voice</span>
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-zinc-500 leading-snug">{voice.description}</p>
                        
                        {/* Audio Engine Transparency */}
                        <div className="pt-1 flex items-center space-x-2 text-[10px] text-zinc-400">
                          <span className="flex items-center space-x-1">
                            <Headphones className="w-3 h-3 text-emerald-600" />
                            <span className="font-semibold text-emerald-700">
                              Gemini Studio AI Voice
                            </span>
                          </span>
                          <span className="text-zinc-300">·</span>
                          <span className="text-zinc-500 truncate max-w-[200px]" title={`Offline Backup: ${matchedDetails.voiceName}`}>
                            Offline backup: {matchedDetails.voiceName}
                          </span>
                        </div>
                      </div>

                      {/* Preview Buttons */}
                      <div className="flex flex-col sm:flex-row items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePlaySample(voice);
                          }}
                          className={`px-2.5 py-1.5 rounded-lg border text-xs flex items-center space-x-1 transition-colors ${
                            isPlayingSample
                              ? 'border-emerald-500 bg-emerald-500 text-white shadow-xs'
                              : 'border-zinc-200 bg-white hover:bg-zinc-100 text-zinc-700'
                          }`}
                          title="Listen to Studio Introduction"
                        >
                          {isPlayingSample ? (
                            <>
                              <Square className="w-3 h-3 fill-current" />
                              <span className="font-medium text-[11px]">Stop</span>
                            </>
                          ) : (
                            <>
                              <Play className="w-3 h-3 fill-current" />
                              <span className="font-medium text-[11px]">Studio Intro</span>
                            </>
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleTestQuestionSpeech(voice);
                          }}
                          className={`px-2.5 py-1.5 rounded-lg border text-xs flex items-center space-x-1 transition-colors ${
                            isPlayingQuestion
                              ? 'border-zinc-900 bg-zinc-900 text-white shadow-xs'
                              : 'border-zinc-200 bg-zinc-50 hover:bg-zinc-100 text-zinc-700'
                          }`}
                          title="Preview how an actual question will be read in this voice"
                        >
                          {isPlayingQuestion ? (
                            <>
                              <Square className="w-3 h-3 fill-current" />
                              <span className="font-medium text-[11px]">Stop</span>
                            </>
                          ) : (
                            <>
                              <Volume2 className="w-3 h-3 text-zinc-500" />
                              <span className="font-medium text-[11px]">Test Question</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Speed / Pacing slider */}
          <div className="bg-zinc-50 rounded-xl p-4 border border-zinc-200/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-800 flex items-center space-x-1.5">
                <Gauge className="w-3.5 h-3.5 text-zinc-500" />
                <span>Interviewer Pacing</span>
              </span>
              <span className="text-xs font-bold text-zinc-900 bg-white px-2 py-0.5 rounded-md border border-zinc-200">
                {speed.toFixed(2)}x
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-[11px] text-zinc-400">Deliberate (0.85x)</span>
              <input
                type="range"
                min="0.85"
                max="1.15"
                step="0.05"
                value={speed}
                onChange={(e) => handleSpeedChange(parseFloat(e.target.value))}
                className="flex-1 accent-emerald-600 h-1.5 bg-zinc-200 rounded-lg cursor-pointer"
              />
              <span className="text-[11px] text-zinc-400">Brisk (1.15x)</span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-3.5 border-t border-zinc-100 bg-zinc-50/50">
          <span className="text-xs text-zinc-400 flex items-center space-x-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Voice settings auto-saved</span>
          </span>
          <button
            type="button"
            onClick={handleClose}
            className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
