import React, { useState } from 'react';
import { CORRECTION_EXAMPLES, REASON_CODES } from '../data/gdpData';
import { VisualSnippetRenderer } from './VisualSnippetRenderer';
import { 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Sparkles, 
  ArrowRight, 
  FileCheck2,
  PenTool,
  RotateCcw,
  UserCheck,
  Lightbulb,
  Check
} from 'lucide-react';

interface Props {
  onComplete: () => void;
  onNextSection: () => void;
}

export const CorrectionsLab: React.FC<Props> = ({ onComplete, onNextSection }) => {
  const [activeExampleIndex, setActiveExampleIndex] = useState<number>(0);
  const [showBeginnerGuide, setShowBeginnerGuide] = useState<boolean>(true);
  const activeExample = CORRECTION_EXAMPLES[activeExampleIndex];

  // Interactive Sandbox state
  const [sandboxOriginal, setSandboxOriginal] = useState<string>('12.85 g');
  const [sandboxCorrected, setSandboxCorrected] = useState<string>('12.35 g');
  const [sandboxReasonCode, setSandboxReasonCode] = useState<string>('TE');
  const [sandboxInitials, setSandboxInitials] = useState<string>('JDF');
  const [sandboxDate, setSandboxDate] = useState<string>('02-SEP-2026');
  const [sandboxMode, setSandboxMode] = useState<'compliant' | 'whiteout' | 'scribble' | 'overwritten'>('compliant');

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border-2 border-slate-200 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-600 uppercase tracking-widest mb-1">
          <span>Visual Laboratory &bull; Section 04</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 leading-tight mb-2">
          Proper Correction Technique &amp; Specimen Lab
        </h1>
        <p className="text-slate-600 text-sm sm:text-base max-w-3xl leading-relaxed">
          In a regulated environment, errors must never be obscured. Use the &apos;Single Line&apos; method to maintain the audit trail and transparency of the original entry.
        </p>
      </div>

      {/* New Employee Reassuring 4-Step Golden Rule Card */}
      <div className="p-5 rounded-2xl bg-amber-50/80 border-2 border-amber-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-amber-900 text-xs sm:text-sm uppercase tracking-wider">
            <UserCheck className="w-4 h-4 text-amber-700" />
            <span>New Operator Golden Rule: The 4-Step Error Correction Method</span>
          </div>
          <button
            onClick={() => setShowBeginnerGuide(!showBeginnerGuide)}
            className="text-[11px] font-bold text-amber-800 hover:text-amber-950 uppercase tracking-wider underline"
          >
            {showBeginnerGuide ? 'Hide Guide' : 'Show 4-Step Guide'}
          </button>
        </div>

        {showBeginnerGuide && (
          <div className="space-y-3 pt-1">
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              <strong className="text-amber-950">Don&apos;t panic if you make a mistake!</strong> In pharmaceutical manufacturing, mistakes happen every day. What creates an FDA violation is trying to hide or scribble over it. Follow these 4 simple steps every single time:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className="p-3 bg-white rounded-lg border border-amber-200 space-y-1">
                <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-900 font-mono font-bold text-[10px] flex items-center justify-center">1</span>
                <strong className="block text-slate-900">Single Line Strike</strong>
                <p className="text-slate-600 text-[11px]">Draw one crisp horizontal line through the error. The old number MUST remain clearly readable.</p>
              </div>
              <div className="p-3 bg-white rounded-lg border border-amber-200 space-y-1">
                <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-900 font-mono font-bold text-[10px] flex items-center justify-center">2</span>
                <strong className="block text-slate-900">Write Correct Value</strong>
                <p className="text-slate-600 text-[11px]">Write the accurate, true measurement directly adjacent to (above or beside) the struck-through value.</p>
              </div>
              <div className="p-3 bg-white rounded-lg border border-amber-200 space-y-1">
                <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-900 font-mono font-bold text-[10px] flex items-center justify-center">3</span>
                <strong className="block text-slate-900">Add Reason Code</strong>
                <p className="text-slate-600 text-[11px]">Include an authorized reason code (e.g., &ldquo;TE&rdquo; for Typo, &ldquo;CE&rdquo; for Calculation Error, or &ldquo;EE&rdquo; for Entry Error).</p>
              </div>
              <div className="p-3 bg-white rounded-lg border border-amber-200 space-y-1">
                <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-900 font-mono font-bold text-[10px] flex items-center justify-center">4</span>
                <strong className="block text-slate-900">Initial &amp; Date</strong>
                <p className="text-slate-600 text-[11px]">Sign your registered initials and record today&apos;s date (DD-MMM-YYYY) immediately beside the correction.</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Example Selector Tabs */}
      <div className="space-y-2">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">
          Select Specimen Scenario
        </div>
        <div className="flex space-x-2 overflow-x-auto pb-1 scrollbar-none">
          {CORRECTION_EXAMPLES.map((ex, idx) => {
            const isSelected = idx === activeExampleIndex;
            return (
              <button
                key={ex.id}
                onClick={() => setActiveExampleIndex(idx)}
                className={`px-4 py-2.5 rounded-md text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2.5 ${
                  isSelected
                    ? 'bg-slate-100 text-blue-900 border-l-4 border-blue-600 shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-full text-[10px] flex items-center justify-center font-mono font-bold ${
                    isSelected
                      ? 'bg-blue-600 text-white'
                      : 'border border-slate-300 text-slate-400'
                  }`}
                >
                  0{idx + 1}
                </span>
                <span className="tracking-tight">{ex.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Scenario Overview Callout */}
      <div className="p-4 sm:p-5 bg-blue-50 rounded-xl border border-blue-100 text-xs sm:text-sm text-blue-900 leading-relaxed font-medium flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="font-bold uppercase tracking-wider text-[11px] text-blue-700 block mb-0.5">
            Scenario 0{activeExampleIndex + 1}: {activeExample.category}
          </span>
          <p className="text-slate-800">{activeExample.scenario}</p>
        </div>
        <span className="text-[11px] font-mono text-blue-800 bg-white px-3 py-1 rounded-md border border-blue-200 shrink-0 self-start sm:self-auto font-semibold">
          {activeExample.regulationCitation}
        </span>
      </div>

      {/* Side-by-Side Visual Specimen Grid matching Geometric Balance cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* NON-COMPLIANT CARD (Incorrect) */}
        <div className="bg-white rounded-2xl border-2 border-red-100 shadow-sm flex flex-col overflow-hidden">
          <div className="bg-red-50 px-6 py-3 border-b border-red-100 flex justify-between items-center">
            <span className="text-red-700 font-bold text-xs uppercase tracking-tighter">
              Non-Compliant (Incorrect)
            </span>
            <span className="text-red-500 text-xl font-bold">✕</span>
          </div>

          <div className="p-6 sm:p-8 flex flex-col gap-6 flex-1 justify-between">
            <div className="space-y-4">
              {activeExample.incorrectVariations.map((inc) => (
                <div key={inc.id} className="border-2 border-dashed border-slate-200 p-4 rounded-lg bg-slate-50/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400 uppercase font-bold">
                      {inc.label}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-red-600 bg-red-50 border border-red-200 px-1.5 py-0.5 rounded">
                      Prohibited
                    </span>
                  </div>

                  <VisualSnippetRenderer
                    snippet={inc.snippet}
                    showStatusBadge={false}
                    isCorrect={false}
                  />

                  <p className="text-xs text-red-600 italic">
                    Error: {inc.flawDescription}
                  </p>

                  <div className="text-[11px] text-slate-500 font-mono pt-1 border-t border-slate-200">
                    Violation: {inc.regulatoryViolation}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-red-50/70 p-3.5 rounded-lg border border-red-100 text-xs text-red-900 leading-relaxed">
              <strong className="font-bold block mb-1">Inspector Risk Assessment:</strong>
              These prohibited techniques result in regulatory citations (FDA Form 483 or Warning Letters) as they compromise document transparency.
            </div>
          </div>
        </div>

        {/* COMPLIANT CARD (Correct) */}
        <div className="bg-white rounded-2xl border-2 border-emerald-100 shadow-sm flex flex-col overflow-hidden">
          <div className="bg-emerald-50 px-6 py-3 border-b border-emerald-100 flex justify-between items-center">
            <span className="text-emerald-700 font-bold text-xs uppercase tracking-tighter">
              GDP Compliant (Correct)
            </span>
            <span className="text-emerald-500 text-xl font-bold">✓</span>
          </div>

          <div className="p-6 sm:p-8 flex flex-col gap-6 flex-1 justify-between">
            <div className="border-2 border-dashed border-slate-200 p-4 rounded-lg bg-slate-50/50 space-y-3">
              <span className="text-xs text-slate-400 uppercase font-bold block">
                Standard GxP Entry Correction:
              </span>

              <VisualSnippetRenderer
                snippet={activeExample.correct.snippet}
                showStatusBadge={false}
                isCorrect={true}
              />

              <ul className="mt-4 flex flex-col gap-2">
                {activeExample.correct.keyElements.map((elem, i) => (
                  <li key={i} className="text-xs text-slate-700 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0"></span>
                    <span>{elem}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-emerald-50/80 p-3.5 rounded-lg border border-emerald-200 text-xs text-emerald-950 leading-relaxed">
              <strong className="font-bold block mb-1">GDP Rationale:</strong>
              {activeExample.correct.explanation}
            </div>
          </div>
        </div>
      </div>

      {/* Anatomy of a Compliant Correction Infographic Card */}
      <div className="bg-white rounded-2xl border-2 border-slate-200 p-6 sm:p-8 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-1 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-blue-600" />
          The 5 Golden Rules of a Compliant GxP Error Correction
        </h3>
        <p className="text-xs text-slate-500 mb-4">
          Every time an error is made on a physical GxP document, these five conditions must be simultaneously satisfied:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <span className="font-mono font-black text-blue-600 text-sm">01</span>
            <h5 className="font-bold text-slate-900 mt-1">Single Line</h5>
            <p className="text-slate-600 mt-1 leading-relaxed">
              Draw one single horizontal line through the error. Original text must remain 100% readable.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <span className="font-mono font-black text-blue-600 text-sm">02</span>
            <h5 className="font-bold text-slate-900 mt-1">Adjacent Value</h5>
            <p className="text-slate-600 mt-1 leading-relaxed">
              Write the correct value clearly above or adjacent. Never write over original numbers.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <span className="font-mono font-black text-blue-600 text-sm">03</span>
            <h5 className="font-bold text-slate-900 mt-1">Reason Code</h5>
            <p className="text-slate-600 mt-1 leading-relaxed">
              State the explanation or standard code (e.g. &ldquo;EE&rdquo; for Entry Error, &ldquo;TE&rdquo; for Typo).
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <span className="font-mono font-black text-blue-600 text-sm">04</span>
            <h5 className="font-bold text-slate-900 mt-1">Initials / Sign</h5>
            <p className="text-slate-600 mt-1 leading-relaxed">
              Sign or initial with your registered handwriting. Never initial on behalf of anyone else.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <span className="font-mono font-black text-blue-600 text-sm">05</span>
            <h5 className="font-bold text-slate-900 mt-1">Current Date</h5>
            <p className="text-slate-600 mt-1 leading-relaxed">
              Record the current date using the unambiguous format (e.g., 02-SEP-2026). Never backdate!
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Correction Sandbox */}
      <div className="bg-white rounded-2xl border-2 border-blue-200 p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <PenTool className="w-5 h-5 text-blue-600" />
            <h3 className="text-base font-bold text-slate-900">
              Interactive Practice: Simulate a GxP Correction
            </h3>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            Test how different methods render on an official record sheet
          </span>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Original Erroneous Value</label>
            <input
              type="text"
              value={sandboxOriginal}
              onChange={(e) => setSandboxOriginal(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">True Corrected Value</label>
            <input
              type="text"
              value={sandboxCorrected}
              onChange={(e) => setSandboxCorrected(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Standard Reason Code</label>
            <select
              value={sandboxReasonCode}
              onChange={(e) => setSandboxReasonCode(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono text-xs bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              {REASON_CODES.filter(rc => rc.code !== 'OR').map((rc) => (
                <option key={rc.code} value={rc.code}>
                  {rc.code} - {rc.meaning}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Your Registered Initials</label>
            <input
              type="text"
              maxLength={4}
              value={sandboxInitials}
              onChange={(e) => setSandboxInitials(e.target.value.toUpperCase())}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono text-xs uppercase focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Correction Style</label>
            <select
              value={sandboxMode}
              onChange={(e) => setSandboxMode(e.target.value as any)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono text-xs bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none font-semibold"
            >
              <option value="compliant">✓ Compliant Single Strike</option>
              <option value="whiteout">✗ Liquid White-Out</option>
              <option value="scribble">✗ Heavy Scribble Blackout</option>
              <option value="overwritten">✗ Overwritten Number</option>
            </select>
          </div>
        </div>

        {/* Live Rendered Result */}
        <div className="pt-2">
          <span className="text-xs text-slate-500 font-mono block mb-1">Live Rendered Document Specimen:</span>
          <VisualSnippetRenderer
            snippet={{
              fieldLabel: 'Component Weighing Gross Mass Verification (kg):',
              originalText: sandboxOriginal,
              correctedText: sandboxCorrected,
              reasonCode: sandboxMode === 'compliant' ? sandboxReasonCode : undefined,
              initials: sandboxMode !== 'whiteout' ? sandboxInitials : undefined,
              dateText: sandboxMode === 'compliant' ? sandboxDate : undefined,
              styleType: 
                sandboxMode === 'compliant' ? 'clean_single_strike' :
                sandboxMode === 'whiteout' ? 'whiteout' :
                sandboxMode === 'scribble' ? 'scribble_blackout' : 'overwritten',
              inkColor: 'blue'
            }}
            showStatusBadge={true}
            isCorrect={sandboxMode === 'compliant'}
          />
        </div>
      </div>

      {/* Navigation Footer matching Geometric Balance buttons */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200">
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
          Continue to Record Audit
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
