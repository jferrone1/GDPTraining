import React from 'react';
import { VisualSnippetData } from '../types';
import { CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';

interface Props {
  snippet: VisualSnippetData;
  showStatusBadge?: boolean;
  isCorrect?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  /** When true (e.g. during an unsubmitted quiz), hide explanatory warnings, red flags, and spoiler cues */
  neutralizeSpoilers?: boolean;
}

export const VisualSnippetRenderer: React.FC<Props> = ({
  snippet,
  showStatusBadge = false,
  isCorrect,
  className = '',
  size = 'md',
  neutralizeSpoilers = false
}) => {
  const isBlue = snippet.inkColor !== 'black' && snippet.inkColor !== 'pencil' && snippet.inkColor !== 'red_flag';
  const inkClass = 
    snippet.inkColor === 'pencil' 
      ? 'text-slate-500 font-mono italic' 
      : snippet.inkColor === 'red_flag'
      ? 'text-rose-700 font-handwriting'
      : isBlue
      ? 'text-blue-800 font-handwriting'
      : 'text-slate-900 font-handwriting';

  return (
    <div className={`relative bg-white border-2 border-slate-200 rounded-lg p-3.5 shadow-xs transition-all ${className}`}>
      {/* Header Label simulating official form field */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-200 text-xs font-mono text-slate-500">
        <span className="font-semibold uppercase tracking-wider text-[11px] truncate max-w-[80%]">
          {snippet.fieldLabel}
        </span>
        <span className="text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200 font-mono">
          GxP Batch Record (21 CFR Part 211)
        </span>
      </div>

      {/* Main record entry area */}
      <div className="pt-2.5 pb-1 min-h-[58px] flex flex-col justify-center relative">
        {/* Render according to styleType */}
        {snippet.styleType === 'clean_single_strike' && (
          <div className="flex flex-wrap items-center gap-3">
            {/* Original value with single clean line */}
            <div className="relative px-3 py-1.5 border border-slate-300 font-mono text-base text-slate-800 bg-slate-50 rounded-xs">
              <span className="absolute top-1/2 left-0 w-full h-[2px] bg-slate-800 -translate-y-1/2"></span>
              {snippet.originalText}
            </div>

            {/* Corrected value above/beside */}
            <div className="text-sm font-mono text-blue-700 leading-tight">
              <div className="font-bold text-base text-blue-800">{snippet.correctedText}</div>
              <div className="text-[10px] text-slate-500 tracking-tight">
                {[snippet.initials, snippet.dateText, snippet.reasonCode].filter(Boolean).join(' / ')}
              </div>
            </div>
          </div>
        )}

        {snippet.styleType === 'whiteout' && (
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative inline-block bg-white px-3 py-1.5 rounded-sm border-2 border-dashed border-slate-300 shadow-inner">
              <div className="absolute inset-0 bg-white/95 rounded-xs pointer-events-none" />
              <span className="relative text-xs text-slate-400 line-through opacity-20">
                {snippet.originalText || 'original'}
              </span>
              <span className="relative ml-2 font-mono text-base font-bold text-blue-900">
                {snippet.correctedText}
              </span>
            </div>
            {!neutralizeSpoilers && (
              <span className="text-xs text-slate-500 font-mono italic">(No initials, no date, opaque fluid)</span>
            )}
          </div>
        )}

        {snippet.styleType === 'scribble_blackout' && (
          <div className="flex flex-wrap items-center gap-3">
            {/* Entire original number completely scratched out with heavy pen strokes */}
            <div className="relative inline-flex items-center justify-center px-3.5 py-1 bg-slate-100 border border-slate-300 rounded font-mono text-base font-bold text-slate-600 select-none overflow-hidden min-w-[70px]">
              <span className="relative z-0 opacity-25 select-none tracking-wider">{snippet.originalText || '62.1'}</span>
              {/* Heavy pen scribble / scratch-out lines scratching out the entire number */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-blue-950" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none">
                <path d="M 2 7 Q 14 17 26 5 Q 38 21 50 9 Q 62 19 74 7 Q 86 21 98 9 Q 110 19 122 7" />
                <path d="M 3 13 Q 18 3 36 17 Q 54 5 72 17 Q 90 5 108 15" strokeWidth="2.4" />
                <path d="M 4 9 L 120 9 M 6 15 L 118 7 M 2 5 L 122 15" strokeWidth="1.8" />
              </svg>
            </div>
            {/* New value written nearby without initials or date */}
            <span className="text-base font-mono font-bold text-blue-900">
              {snippet.correctedText}
            </span>
            {!neutralizeSpoilers && (
              <span className="text-xs text-slate-500 font-mono italic">
                (Original number completely scratched out; no initials, no date)
              </span>
            )}
          </div>
        )}

        {snippet.styleType === 'overwritten' && (
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative inline-block px-3 py-1 bg-slate-100 border border-slate-300 rounded">
              <span className="text-lg font-mono font-black text-slate-900 tracking-tighter drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
                {snippet.correctedText}
              </span>
            </div>
            {!neutralizeSpoilers && (
              <span className="text-xs text-slate-500 font-mono italic">
                (Digit traced directly over original number)
              </span>
            )}
          </div>
        )}

        {snippet.styleType === 'proper_na_line' && (
          <div className="relative max-w-[240px] w-full h-10 bg-white border-2 border-dashed border-slate-300 rounded overflow-hidden flex items-center justify-center">
            {/* Diagonal line */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-slate-700" strokeWidth="1.5">
              <line x1="0" y1="100%" x2="100%" y2="0" />
            </svg>
            <div className="relative z-10 bg-white/95 px-2.5 py-0.5 rounded border border-slate-200 text-xs flex items-center gap-1.5 shadow-xs">
              <span className="font-bold text-slate-900 font-mono text-[11px]">N/A</span>
              <span className="text-slate-700 text-[10px] truncate max-w-[110px]">{snippet.correctedText || 'Standard Run'}</span>
              {snippet.initials && (
                <span className="font-mono text-slate-600 text-[10px]">| {snippet.initials} {snippet.dateText || ''}</span>
              )}
            </div>
          </div>
        )}

        {snippet.styleType === 'empty_blank' && (
          <div className="w-full h-10 bg-white border border-dashed border-slate-300 rounded flex items-center justify-center">
            <span className="text-xs font-mono text-slate-400 italic">
              [ Empty Blank Field — No Entry Recorded ]
            </span>
          </div>
        )}

        {snippet.styleType === 'ditto_marks' && (
          <div className="flex items-center gap-4 py-1">
            <span className="text-xl font-serif font-black text-slate-700 px-4 py-0.5 bg-slate-100 border border-slate-300 rounded">
              &ldquo; &rdquo;
            </span>
            {!neutralizeSpoilers && (
              <span className="text-xs text-slate-500 font-mono italic">
                (Ditto marks entered)
              </span>
            )}
          </div>
        )}

        {snippet.styleType === 'standard_date' && (
          <div className={`flex items-center gap-2 px-2.5 py-1 rounded border ${
            neutralizeSpoilers 
              ? 'bg-slate-50 border-slate-200 text-slate-800' 
              : 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
          }`}>
            <span className="text-base font-bold font-mono-doc">
              {snippet.correctedText}
            </span>
            {snippet.initials && (
              <span className={`text-xs font-mono-doc font-bold px-1.5 py-0.5 rounded ${
                neutralizeSpoilers ? 'bg-slate-200 text-slate-700' : 'bg-emerald-200/80 text-emerald-900'
              }`}>
                {snippet.initials}
              </span>
            )}
            {!neutralizeSpoilers && (
              <span className="text-[11px] text-emerald-800 font-medium">✓ Unambiguous International Standard</span>
            )}
          </div>
        )}

        {snippet.styleType === 'ambiguous_date' && (
          <div className={`flex items-center gap-2 px-2.5 py-1 rounded border ${
            neutralizeSpoilers 
              ? 'bg-slate-50 border-slate-200 text-slate-800' 
              : 'bg-rose-50/80 border-rose-300 text-rose-950'
          }`}>
            <span className="text-base font-bold font-mono-doc">
              {snippet.correctedText}
            </span>
            {!neutralizeSpoilers && (
              <span className="text-[11px] text-rose-700 font-mono">
                ⚠ Ambiguous: US vs EU date conflict (Is it Day 9 or Month 9?)
              </span>
            )}
          </div>
        )}

        {snippet.styleType === 'late_entry_correct' && (
          <div className="p-2 bg-slate-50 rounded border border-slate-200 text-xs">
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-slate-800 text-white font-mono font-bold px-1.5 py-0.5 rounded text-[10px]">
                LATE ENTRY
              </span>
              <span className="font-bold text-slate-900 text-sm font-handwriting">
                {snippet.correctedText}
              </span>
            </div>
            <div className="text-[11px] text-slate-600 font-mono flex items-center justify-between border-t border-slate-200 pt-1">
              <span>{snippet.notes || 'Recorded with operational justification'}</span>
              <span className="font-bold text-slate-700">{snippet.initials} {snippet.dateText} {snippet.timeText}</span>
            </div>
          </div>
        )}

        {snippet.styleType === 'late_entry_backdated' && (
          <div className="p-2 bg-slate-50 rounded border border-slate-200 text-xs">
            <span className="font-handwriting text-base font-bold text-slate-900">
              {snippet.correctedText}
            </span>
            {!neutralizeSpoilers && (
              <div className="text-[11px] text-slate-500 font-mono mt-1">
                (Recorded after event)
              </div>
            )}
          </div>
        )}

        {snippet.styleType === 'pencil_erased' && (
          <div className="p-2.5 bg-slate-50/90 rounded border border-slate-200 relative overflow-hidden">
            {/* Faint erased graphite smudge mark underneath */}
            <div className="absolute top-2 left-4 text-xs font-mono text-slate-300 opacity-40 select-none blur-[0.5px]">
              0.58 g/mL (erased smudge)
            </div>
            <div className="relative z-10 flex flex-wrap items-center gap-2">
              <span className="text-sm font-mono text-slate-600 font-semibold italic flex items-center gap-1.5">
                <span className="text-slate-400 select-none">✏</span> {snippet.correctedText}
              </span>
            </div>
            {!neutralizeSpoilers && (
              <div className="text-[10px] text-slate-500 font-mono mt-1 border-t border-slate-200/60 pt-1">
                (Graphite Pencil &amp; Erasure Smudge; Date field left blank)
              </div>
            )}
          </div>
        )}

        {snippet.styleType === 'scrap_paper' && (
          <div className="p-2.5 bg-amber-50/70 border border-amber-200 rounded shadow-xs text-xs font-handwriting text-slate-900">
            <div className="flex items-center justify-between font-mono text-[10px] text-slate-500 pb-1 border-b border-amber-200">
              <span>📎 Attached Note</span>
              {!neutralizeSpoilers && <span className="text-amber-800 font-bold">RAW DATA NOTE</span>}
            </div>
            <p className="mt-1 text-base font-bold">{snippet.correctedText}</p>
          </div>
        )}

        {snippet.styleType === 'ghost_signed' && (
          <div className="p-2 bg-slate-50 border border-slate-200 rounded text-xs">
            <span className="font-handwriting text-base text-slate-900 font-bold">
              {snippet.correctedText}
            </span>
            {!neutralizeSpoilers && (
              <div className="text-[11px] text-slate-500 font-mono mt-1">
                (Signed for another person)
              </div>
            )}
          </div>
        )}

        {snippet.styleType === 'clean_entry' && (
          <div className="flex items-center gap-2">
            <span className={`text-base font-bold ${inkClass}`}>
              {snippet.correctedText}
            </span>
            {snippet.initials && (
              <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded">
                {snippet.initials}
              </span>
            )}
            {snippet.dateText && (
              <span className="text-xs font-mono text-slate-600">
                {snippet.dateText}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Optional Status Pill in bottom right */}
      {showStatusBadge && (
        <div className="mt-1.5 pt-1 border-t border-slate-200/80 flex items-center justify-between text-xs">
          {isCorrect ? (
            <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded text-[11px]">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              GDP Compliant
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-rose-700 font-semibold bg-rose-50 px-2 py-0.5 rounded text-[11px]">
              <XCircle className="w-3.5 h-3.5 text-rose-600" />
              GDP Violation
            </span>
          )}
          {snippet.notes && (
            <span className="text-[10px] text-slate-500 italic truncate max-w-[200px]">
              {snippet.notes}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
