import React, { useState, useMemo } from 'react';
import { AUDIT_HOTSPOTS } from '../data/gdpData';
import { VisualSnippetRenderer } from './VisualSnippetRenderer';
import { 
  Search, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  FileCheck2, 
  Eye,
  HelpCircle,
  Sparkles,
  RotateCcw,
  Check
} from 'lucide-react';

interface Props {
  onComplete: () => void;
  onNextSection: () => void;
}

export const RecordAuditInteractive: React.FC<Props> = ({ onComplete, onNextSection }) => {
  const [activeHotspotId, setActiveHotspotId] = useState<string>(AUDIT_HOTSPOTS[0].id);
  // Track selected dropdown answer for each hotspot
  const [userSelections, setUserSelections] = useState<Record<string, string>>({});
  // Track which hotspots user has submitted/evaluated
  const [evaluatedHotspots, setEvaluatedHotspots] = useState<Record<string, boolean>>({});

  // Randomize the dropdown options per hotspot on session mount so the correct answer is not always first
  const randomizedOptionsMap = useMemo(() => {
    const map: Record<string, typeof AUDIT_HOTSPOTS[0]['issueOptions']> = {};
    AUDIT_HOTSPOTS.forEach((hotspot) => {
      const copy = [...hotspot.issueOptions];
      // Fisher-Yates shuffle
      for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = copy[i];
        copy[i] = copy[j];
        copy[j] = temp;
      }
      map[hotspot.id] = copy;
    });
    return map;
  }, []);

  const handleDropdownChange = (hotspotId: string, optionId: string) => {
    setUserSelections((prev) => ({ ...prev, [hotspotId]: optionId }));
    setActiveHotspotId(hotspotId);
  };

  const handleEvaluateHotspot = (hotspotId: string) => {
    if (!userSelections[hotspotId]) return;
    setEvaluatedHotspots((prev) => ({ ...prev, [hotspotId]: true }));
    setActiveHotspotId(hotspotId);
  };

  const handleResetHotspot = (hotspotId: string) => {
    setEvaluatedHotspots((prev) => {
      const updated = { ...prev };
      delete updated[hotspotId];
      return updated;
    });
    setUserSelections((prev) => {
      const updated = { ...prev };
      delete updated[hotspotId];
      return updated;
    });
  };

  const totalItems = AUDIT_HOTSPOTS.length;
  
  // Count how many hotspots have been correctly diagnosed by the user
  const solvedCount = AUDIT_HOTSPOTS.filter(
    (h) => evaluatedHotspots[h.id] && userSelections[h.id] === h.correctIssueId
  ).length;

  const allCompleted = solvedCount === totalItems;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border-2 border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-600 uppercase tracking-widest mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Simulation &bull; You Are The Auditor</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
            You Are The Auditor: Production Record Inspection
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-3xl leading-relaxed">
            Step into the shoes of an official Health Authority / FDA Investigator. Inspect each specimen in the AnyPharm batch record below. For each record field, use the drop-down menu situated directly in that field's box to identify the compliance issue or confirm proper GDP execution.
          </p>
        </div>

        {/* Audit Progress Counter */}
        <div className="bg-slate-50 border-2 border-slate-200 p-4 rounded-xl flex items-center gap-4 shrink-0">
          <div>
            <span className="text-[11px] font-bold text-slate-500 block uppercase tracking-wider">
              Audit Progress
            </span>
            <span className="text-2xl font-mono font-black text-blue-900">
              {solvedCount} / {totalItems} Correct
            </span>
          </div>
          <div className={`w-10 h-10 rounded-lg text-white flex items-center justify-center shadow-xs ${
            allCompleted ? 'bg-emerald-600' : 'bg-blue-600'
          }`}>
            {allCompleted ? <Check className="w-5 h-5 stroke-[3]" /> : <Search className="w-5 h-5" />}
          </div>
        </div>
      </div>

      {/* Simulated Production Batch Logsheet */}
      <div className="bg-white rounded-2xl border-2 border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        {/* Header of Official Simulated Form */}
        <div className="border-b-2 border-slate-900 pb-4">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-slate-700">
            <span className="font-bold uppercase tracking-wider">ANYPHARM DIABETES CARE CORP. &bull; GxP MANUFACTURING</span>
            <span className="bg-slate-100 px-2.5 py-1 rounded font-bold border border-slate-200">DOC REF: PR-2026-GLU-9024</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 mt-2 font-sans-doc">
            Blood Glucose Test Strip Formulation &amp; Packaging Batch Production Record
          </h3>
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-600 mt-1.5 pt-1.5 border-t border-slate-200">
            <span><strong>Product:</strong> GlucoSure™ Test Strips</span>
            <span><strong>Lot #:</strong> GLU-9024</span>
            <span><strong>Room:</strong> Cleanroom Bay 2</span>
            <span><strong>Execution Date:</strong> 02-SEP-2026</span>
          </div>
        </div>

        {/* Audit Instructions Hint */}
        <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-3.5 text-xs text-blue-950 flex items-center gap-2.5">
          <Eye className="w-4 h-4 text-blue-700 shrink-0" />
          <span>
            <strong>Auditor Instructions:</strong> Review the document specimen on the left side of each card. Select your diagnosis from the dropdown menu on the right (under the "GxP Batch Record" badge) and click <strong>Submit Assessment</strong>.
          </span>
        </div>

        {/* List of Batch Record Cards with Inline Dropdowns */}
        <div className="space-y-5">
          {AUDIT_HOTSPOTS.map((hotspot, idx) => {
            const isEvaluated = !!evaluatedHotspots[hotspot.id];
            const selectedOpt = userSelections[hotspot.id] || '';
            const isCorrect = isEvaluated && selectedOpt === hotspot.correctIssueId;
            const isActive = hotspot.id === activeHotspotId;

            return (
              <div
                key={hotspot.id}
                id={`audit-card-${hotspot.id}`}
                onClick={() => setActiveHotspotId(hotspot.id)}
                className={`rounded-xl border-2 transition-all p-4 sm:p-5 ${
                  isEvaluated
                    ? isCorrect
                      ? 'border-emerald-300 bg-emerald-50/10 shadow-xs'
                      : 'border-red-300 bg-red-50/10 shadow-xs'
                    : isActive
                    ? 'border-blue-500 ring-2 ring-blue-100 bg-white shadow-sm'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                {/* Card Top Bar with Title and "GxP Batch Record" box */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-200 text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white ${
                      isEvaluated
                        ? isCorrect ? 'bg-emerald-600' : 'bg-red-500'
                        : 'bg-slate-700'
                    }`}>
                      {idx + 1}
                    </span>
                    <span className="font-bold text-slate-900 text-sm font-sans">{hotspot.label}</span>
                    <span className="text-slate-400 font-mono text-[11px]">[{hotspot.fieldCode}]</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {isEvaluated && (
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 font-mono ${
                        isCorrect
                          ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                          : 'bg-red-100 text-red-900 border border-red-300'
                      }`}>
                        {isCorrect ? (
                          <>
                            <CheckCircle2 className="w-3 h-3" /> Correct Finding
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3 h-3" /> Incorrect Diagnosis
                          </>
                        )}
                      </span>
                    )}

                    {/* Official GxP Form badge */}
                    <span className="text-[11px] text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 font-mono font-medium">
                      GxP Batch Record (21 CFR Part 211)
                    </span>
                  </div>
                </div>

                {/* Card Body: Specimen on Left, Drop-down & Feedback on Right (Under GxP Batch Record box) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 pt-3.5 items-start">
                  {/* Left Specimen Column (5 cols on lg) */}
                  <div className="lg:col-span-5 flex flex-col justify-center">
                    <span className="text-[11px] font-mono text-slate-500 mb-1 block">
                      Record Specimen ({hotspot.fieldCode}):
                    </span>
                    <VisualSnippetRenderer
                      snippet={hotspot.snippet}
                      neutralizeSpoilers={!isEvaluated}
                      className="border-slate-300"
                    />
                  </div>

                  {/* Right Column: Dropdown, Actions, and Regulatory Evaluation (7 cols on lg, directly under GxP Batch Record) */}
                  <div className="lg:col-span-7 space-y-3 bg-slate-50/80 p-3.5 sm:p-4 rounded-xl border border-slate-200">
                    <div className="flex items-center justify-between">
                      <label 
                        htmlFor={`select-${hotspot.id}`} 
                        className="text-xs font-bold text-slate-900 font-mono uppercase tracking-wider flex items-center gap-1.5"
                      >
                        <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
                        Auditor's Query: What is the issue with this record?
                      </label>
                    </div>

                    {/* Dropdown Menu */}
                    <div className="space-y-2">
                      <select
                        id={`select-${hotspot.id}`}
                        value={selectedOpt}
                        onChange={(e) => handleDropdownChange(hotspot.id, e.target.value)}
                        disabled={isEvaluated && isCorrect}
                        className={`w-full text-xs font-medium p-2.5 bg-white border-2 rounded-lg text-slate-800 focus:outline-hidden transition-colors ${
                          isEvaluated
                            ? isCorrect
                              ? 'border-emerald-400 bg-emerald-50/30'
                              : 'border-red-400 bg-red-50/30'
                            : 'border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100'
                        }`}
                      >
                        <option value="">-- Select regulatory observation from dropdown --</option>
                        {(randomizedOptionsMap[hotspot.id] || hotspot.issueOptions).map((opt) => (
                          <option key={opt.id} value={opt.id}>
                            {opt.label}
                          </option>
                        ))}
                      </select>

                      {/* Button Row */}
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleEvaluateHotspot(hotspot.id)}
                          disabled={!selectedOpt || (isEvaluated && isCorrect)}
                          className="py-2 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors shadow-xs flex items-center justify-center gap-1.5 cursor-pointer disabled:cursor-not-allowed"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          {isEvaluated && isCorrect ? 'Diagnosed' : 'Submit Assessment'}
                        </button>

                        {isEvaluated && !isCorrect && (
                          <button
                            type="button"
                            onClick={() => handleResetHotspot(hotspot.id)}
                            className="py-2 px-3 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg text-slate-700 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
                            title="Reset choice to retry"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            Retry
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Inline Evaluation Callout */}
                    {isEvaluated && (
                      <div className={`p-3.5 rounded-lg border text-xs space-y-2 mt-2 ${
                        isCorrect
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                          : 'bg-red-50 border-red-300 text-red-950'
                      }`}>
                        <div className="flex items-center justify-between font-bold">
                          <span className="flex items-center gap-1.5 font-mono">
                            {isCorrect ? (
                              <>
                                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                <span>Correct Observation!</span>
                              </>
                            ) : (
                              <>
                                <XCircle className="w-4 h-4 text-red-600" />
                                <span>Incorrect Observation</span>
                              </>
                            )}
                          </span>
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                            hotspot.status === 'compliant' ? 'bg-emerald-200 text-emerald-900' : 'bg-red-200 text-red-900'
                          }`}>
                            {hotspot.status === 'compliant' ? 'Compliant Record' : 'Regulatory Violation'}
                          </span>
                        </div>

                        <div>
                          <p className="font-bold text-slate-900">{hotspot.findingTitle}</p>
                          <p className="text-slate-700 mt-0.5 leading-relaxed">{hotspot.findingDescription}</p>
                        </div>

                        {hotspot.regulatoryViolation && (
                          <div className="pt-1.5 border-t border-slate-200/80 text-[11px] leading-relaxed">
                            <span className="font-bold text-red-900 block font-mono">
                              Regulatory Violation:
                            </span>
                            {hotspot.regulatoryViolation}
                          </div>
                        )}

                        {hotspot.remediation && (
                          <div className="pt-1.5 border-t border-slate-200/80 text-[11px] leading-relaxed">
                            <span className="font-bold text-blue-900 block font-mono">
                              Mandated QA Action:
                            </span>
                            {hotspot.remediation}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Section Completion Navigation Bar */}
        <div className="pt-6 border-t-2 border-slate-200 flex flex-wrap items-center justify-between gap-4">
          <button
            type="button"
            onClick={onComplete}
            className="px-5 py-2.5 bg-white border-2 border-blue-600 text-blue-600 font-bold text-xs uppercase tracking-widest rounded-lg hover:bg-blue-50 transition-colors inline-flex items-center gap-2 cursor-pointer"
          >
            <FileCheck2 className="w-4 h-4" />
            Mark Audit Complete
          </button>

          <button
            type="button"
            onClick={onNextSection}
            className="px-6 py-2.5 bg-blue-600 text-white font-bold text-xs uppercase tracking-widest rounded-lg shadow-sm hover:bg-blue-700 transition-colors inline-flex items-center gap-2 cursor-pointer"
          >
            Continue to Quiz
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
