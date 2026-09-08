import React, { useState } from 'react';
import { ALCOA_PRINCIPLES } from '../data/gdpData';
import { AlcoaPrinciple } from '../types';
import { 
  Check, 
  X, 
  AlertTriangle, 
  FileCheck2, 
  Info, 
  Shield, 
  ChevronRight,
  ArrowRight,
  UserCheck,
  Sparkles
} from 'lucide-react';

const NEW_HIRE_PERSPECTIVE: Record<string, string> = {
  attributable: "Every stroke of the pen or login MUST trace back to you alone. Never sign for your friend (even if they had to run to the restroom), never share your badge, and never pre-sign steps before you perform them.",
  legible: "If QA or the next shift operator cannot easily distinguish your '3' from an '8', the entire batch could be halted. Always write clearly with standard digit shapes. If you make a mistake, never scribble over it.",
  contemporaneous: "'Contemporaneous' just means 'in real-time, as it happens'. When you read the scale, write the weight immediately. Never wait until your break to fill out records from memory.",
  original: "The very first paper your pen touches is the official legal record. Never write numbers on scratch paper, sticky notes, or your cleanroom glove with the plan to 'copy it neatly later'.",
  accurate: "Mistakes happen to everyone—never try to hide them! If you write the wrong number, use a clean single-line strikethrough, write the correct number, provide a reason code, initial, and date.",
  complete: "Blank boxes look like missed operations during an audit. If a step or row doesn't apply to your batch, draw a single diagonal or Z-line across it, write 'N/A', initial, and date.",
  consistent: "Always write dates in DD-MMM-YYYY format (e.g., 02-SEP-2026) and 24-hour military time (14:30) so there is zero confusion between US/European formats or AM/PM.",
  enduring: "Only use approved indelible blue or black ballpoint pens. Pencils and erasable pens are strictly banned in GMP because they can be altered or erased.",
  available: "Batch records are critical legal files. When you finish your shift, never leave documents in an unassigned locker or drawer—always return them to the designated document control holder."
};

interface Props {
  onComplete: () => void;
  onNextSection: () => void;
}

export const AlcoaModule: React.FC<Props> = ({ onComplete, onNextSection }) => {
  const [selectedPrincipleId, setSelectedPrincipleId] = useState<string>('attributable');
  const [filterMode, setFilterMode] = useState<'all' | 'alcoa' | 'plus'>('all');

  const filteredPrinciples = ALCOA_PRINCIPLES.filter((p) => {
    if (filterMode === 'alcoa') return !p.isPlus;
    if (filterMode === 'plus') return p.isPlus;
    return true;
  });

  const activePrinciple = ALCOA_PRINCIPLES.find((p) => p.id === selectedPrincipleId) || ALCOA_PRINCIPLES[0];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Module Title */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border-2 border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-600 uppercase tracking-widest mb-1">
            <span>Fundamental Regulatory Framework &bull; Section 02</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 leading-tight">
            The ALCOA+ Data Integrity Standard
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
            Established by the FDA, EMA, WHO, and PIC/S, ALCOA+ defines the immutable attributes required of all manual, electronic, and hybrid records.
          </p>
        </div>

        {/* Filter Toggle */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200 self-start md:self-auto shrink-0">
          <button
            onClick={() => setFilterMode('all')}
            className={`px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all ${
              filterMode === 'all' ? 'bg-white text-blue-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            All 9
          </button>
          <button
            onClick={() => setFilterMode('alcoa')}
            className={`px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all ${
              filterMode === 'alcoa' ? 'bg-white text-blue-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            ALCOA (5)
          </button>
          <button
            onClick={() => setFilterMode('plus')}
            className={`px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all ${
              filterMode === 'plus' ? 'bg-white text-blue-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            &ldquo;+&rdquo; Plus (4)
          </button>
        </div>
      </div>

      {/* Main Grid: Selector sidebar + Active Principle Deep Dive */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Letter Selector Badges */}
        <div className="lg:col-span-4 space-y-2">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">
            Select ALCOA+ Principle
          </div>
          <div className="space-y-1.5">
            {filteredPrinciples.map((principle) => {
              const isSelected = principle.id === activePrinciple.id;
              return (
                <button
                  key={principle.id}
                  onClick={() => setSelectedPrincipleId(principle.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-md text-left transition-all ${
                    isSelected
                      ? 'bg-slate-100 text-blue-900 border-l-4 border-blue-600 font-semibold shadow-xs'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className={`w-7 h-7 rounded-full flex items-center justify-center font-mono font-bold text-xs shrink-0 ${
                        isSelected
                          ? 'bg-blue-600 text-white'
                          : principle.isPlus
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {principle.letter}
                    </span>
                    <div className="truncate">
                      <div className="font-bold text-sm truncate">{principle.name}</div>
                      <div className="text-[11px] text-slate-500 truncate">
                        {principle.isPlus ? 'ALCOA+ Extension' : 'Core ALCOA'}
                      </div>
                    </div>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 shrink-0 ${
                      isSelected ? 'text-blue-600' : 'text-slate-400'
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Detailed Card */}
        <div className="lg:col-span-8 bg-white rounded-2xl border-2 border-slate-200 p-6 sm:p-8 shadow-sm flex flex-col justify-between">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <span className="w-12 h-12 rounded-lg bg-blue-600 text-white font-mono text-xl font-bold flex items-center justify-center shadow-xs">
                  {activePrinciple.letter}
                </span>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    {activePrinciple.name}
                  </h3>
                  <span className="text-xs font-mono text-blue-600 font-semibold">
                    {activePrinciple.citation}
                  </span>
                </div>
              </div>
              {activePrinciple.isPlus && (
                <span className="px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-800 border border-blue-200 font-mono">
                  ALCOA+ Extension
                </span>
              )}
            </div>

            {/* Definition */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">
                Regulatory Definition
              </h4>
              <p className="text-sm text-slate-800 font-medium leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
                {activePrinciple.definition}
              </p>
            </div>

            {/* New Hire Cleanroom Perspective Callout */}
            {NEW_HIRE_PERSPECTIVE[activePrinciple.id] && (
              <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-950 space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-amber-900 uppercase tracking-wider text-[11px]">
                  <UserCheck className="w-4 h-4 text-amber-700" />
                  <span>New Operator Floor Reality &bull; What this means on shift:</span>
                </div>
                <p className="text-slate-800 leading-relaxed font-medium">
                  {NEW_HIRE_PERSPECTIVE[activePrinciple.id]}
                </p>
              </div>
            )}

            {/* Practical Do vs Don't */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white border-2 border-emerald-100 shadow-xs">
                <div className="flex items-center justify-between text-xs font-bold text-emerald-700 uppercase tracking-tighter mb-2">
                  <span>Mandated Practice (DO)</span>
                  <span className="text-emerald-600 text-base">✓</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {activePrinciple.practicalDo}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border-2 border-red-100 shadow-xs">
                <div className="flex items-center justify-between text-xs font-bold text-red-700 uppercase tracking-tighter mb-2">
                  <span>Strictly Forbidden (DON&apos;T)</span>
                  <span className="text-red-500 text-base">✕</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {activePrinciple.practicalDont}
                </p>
              </div>
            </div>

            {/* Real World Inspection Finding / Case Study */}
            <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
              <div className="flex items-center gap-2 text-xs font-bold text-blue-900 uppercase tracking-wider mb-1">
                <AlertTriangle className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Real-World Inspection Finding / Case Study</span>
              </div>
              <p className="text-xs text-slate-800 leading-relaxed italic">
                &ldquo;{activePrinciple.realWorldExample}&rdquo;
              </p>
              <div className="mt-2 text-[11px] font-mono text-blue-800 font-semibold border-t border-blue-200/80 pt-1.5">
                Regulatory Exposure: {activePrinciple.inspectionRisk}
              </div>
            </div>
          </div>

          {/* Bottom navigation */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
            <button
              onClick={onComplete}
              className="px-6 py-2.5 bg-white border-2 border-blue-600 text-blue-600 font-bold text-xs uppercase tracking-widest rounded-lg hover:bg-blue-50 transition-colors inline-flex items-center gap-2"
            >
              <FileCheck2 className="w-4 h-4" />
              Mark Section Complete
            </button>

            <button
              onClick={onNextSection}
              className="px-8 py-3 bg-blue-600 text-white font-bold text-xs uppercase tracking-widest rounded-lg shadow-lg shadow-blue-200 hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
            >
              Continue to Core Rules
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
