import React from 'react';
import { 
  X, 
  FileEdit, 
  Trash2, 
  Copy, 
  Check, 
  ArrowRight,
  ListOrdered
} from 'lucide-react';

interface CandidateScratchpadProps {
  isOpen: boolean;
  onClose: () => void;
  notes: string;
  onNotesChange: (notes: string) => void;
  onInsertToAnswer?: (notes: string) => void;
}

export const CandidateScratchpad: React.FC<CandidateScratchpadProps> = ({
  isOpen,
  onClose,
  notes,
  onNotesChange,
  onInsertToAnswer,
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(notes);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleInsertSTARBullets = () => {
    const starTemplate = `• Situation (Context & Stakes): 
• Task (My explicit ownership): 
• Action (1st choice, trade-off, execution): 
• Result (Quantified numbers & business ROI): `;
    onNotesChange(notes ? `${notes}\n\n${starTemplate}` : starTemplate);
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-96 bg-white shadow-2xl border-l border-zinc-200 flex flex-col animate-in slide-in-from-right duration-200">
      {/* Header */}
      <div className="p-4 border-b border-zinc-200 flex items-center justify-between bg-zinc-50">
        <div className="flex items-center space-x-2">
          <div className="w-7 h-7 rounded-lg bg-zinc-900 text-white flex items-center justify-center">
            <FileEdit className="w-3.5 h-3.5 text-amber-300" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-zinc-900">Candidate Scratchpad</h3>
            <span className="text-[10px] text-zinc-500">Jot thoughts & numbers before speaking</span>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="text-zinc-400 hover:text-zinc-700 p-1.5 rounded-lg hover:bg-zinc-200/60 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Scaffolding Bar */}
      <div className="px-4 py-2 bg-amber-50/70 border-b border-amber-200/60 flex items-center justify-between text-xs">
        <span className="text-[11px] font-semibold text-amber-900 flex items-center space-x-1">
          <ListOrdered className="w-3.5 h-3.5 text-amber-700" />
          <span>Quick Scaffolding:</span>
        </span>
        <button
          type="button"
          onClick={handleInsertSTARBullets}
          className="px-2 py-0.5 rounded bg-white border border-amber-300 text-amber-900 font-bold text-[10px] hover:bg-amber-100 transition-colors cursor-pointer"
        >
          + Insert STAR Outline
        </button>
      </div>

      {/* Editor Body */}
      <div className="flex-1 p-4 flex flex-col">
        <textarea
          value={notes}
          onChange={(e) => onNotesChange(e.target.value)}
          placeholder="Jot down key trade-offs, architecture decisions, numbers (e.g. 50k QPS, p99 latency, 35% gain), or STAR bullet points..."
          className="flex-1 w-full p-3 bg-zinc-50/70 border border-zinc-200 rounded-lg text-xs text-zinc-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-zinc-900 font-mono leading-relaxed resize-none"
        />
      </div>

      {/* Footer Actions */}
      <div className="p-3 border-t border-zinc-200 bg-zinc-50 flex items-center justify-between gap-2">
        <div className="flex items-center space-x-1">
          <button
            type="button"
            onClick={() => onNotesChange('')}
            disabled={!notes}
            className="p-1.5 text-zinc-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors disabled:opacity-30 cursor-pointer"
            title="Clear notes"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={handleCopy}
            disabled={!notes}
            className="p-1.5 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200 rounded-md transition-colors disabled:opacity-30 cursor-pointer"
            title="Copy notes"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>

        {onInsertToAnswer && (
          <button
            type="button"
            onClick={() => {
              if (notes) {
                onInsertToAnswer(notes);
                onClose();
              }
            }}
            disabled={!notes}
            className="px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 disabled:opacity-40 text-white text-xs font-semibold rounded-lg flex items-center space-x-1 transition-colors cursor-pointer"
          >
            <span>Insert to Answer</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        )}
      </div>
    </div>
  );
};
