import React, { useState } from 'react';
import { SectionId } from '../types';
import { NewHireWalkthrough } from './NewHireWalkthrough';
import { 
  FileText, 
  ShieldAlert, 
  CheckCircle2, 
  ArrowRight, 
  BookOpen, 
  Sparkles, 
  Scale, 
  AlertCircle,
  Stethoscope,
  UserCheck,
  Compass,
  FileCheck2
} from 'lucide-react';

interface Props {
  onStartTraining: () => void;
  onJumpToCorrections: () => void;
  onJumpToQuiz: () => void;
}

export const OverviewModule: React.FC<Props> = ({
  onStartTraining,
  onJumpToCorrections,
  onJumpToQuiz
}) => {
  const [activeView, setActiveView] = useState<'walkthrough' | 'curriculum'>('walkthrough');

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Mode Switcher Banner */}
      <div className="bg-white rounded-2xl border-2 border-slate-200 p-4 sm:p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-900 flex items-center justify-center shrink-0">
            <Compass className="w-5 h-5 text-blue-700" />
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-600">
              Training Navigation Mode
            </span>
            <h3 className="text-sm sm:text-base font-bold text-slate-900">
              {activeView === 'walkthrough' 
                ? 'New Production Operator Guided Walkthrough' 
                : 'Standard GDP Regulatory Curriculum & Standards'}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl border border-slate-200 shrink-0 text-xs">
          <button
            onClick={() => setActiveView('walkthrough')}
            className={`px-3.5 py-2 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
              activeView === 'walkthrough'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>New Operator Walkthrough</span>
          </button>
          <button
            onClick={() => setActiveView('curriculum')}
            className={`px-3.5 py-2 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
              activeView === 'curriculum'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>Regulatory Curriculum</span>
          </button>
        </div>
      </div>

      {/* View 1: New Employee Interactive Shift Walkthrough */}
      {activeView === 'walkthrough' && (
        <div className="space-y-6">
          <NewHireWalkthrough 
            onProceedToAlcoa={onStartTraining} 
            onCompleteWalkthrough={onStartTraining} 
          />

          {/* Prompt to switch or continue */}
          <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0">
                <BookOpen className="w-4 h-4" />
              </div>
              <div className="text-xs text-blue-950">
                <strong className="block text-sm text-blue-900">Ready to explore the full regulatory curriculum?</strong>
                You can switch between the Day 1 shift walkthrough and formal 21 CFR regulatory standards anytime.
              </div>
            </div>
            <button
              onClick={() => setActiveView('curriculum')}
              className="px-4 py-2 bg-white hover:bg-blue-100 text-blue-700 border border-blue-300 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors shrink-0"
            >
              View Regulatory Curriculum &rarr;
            </button>
          </div>
        </div>
      )}

      {/* View 2: High Level Regulatory Curriculum */}
      {activeView === 'curriculum' && (
        <div className="space-y-8">
          {/* Hero Card */}
          <div className="bg-white rounded-2xl border-2 border-slate-200 shadow-sm p-6 sm:p-10 relative overflow-hidden">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 border border-blue-200 text-blue-900 text-xs font-bold uppercase tracking-widest mb-4">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                Mandatory Regulatory Curriculum
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Good Documentation Practices (GDP)
              </h1>
              <p className="text-blue-700 font-semibold text-base sm:text-lg mt-1">
                Data Integrity, Correction Standards &amp; Regulatory Compliance
              </p>

              <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
                In regulated life sciences—pharmaceuticals, biotechnology, cell therapies, and medical devices—the cardinal rule of compliance is absolute:
              </p>

              <div className="mt-3 p-4 bg-slate-50 rounded-xl border-l-4 border-blue-600 border border-slate-200">
                <span className="text-base sm:text-lg font-bold text-slate-800 font-mono">
                  &ldquo;If it is not documented properly, it never happened.&rdquo;
                </span>
                <p className="text-xs text-slate-500 mt-1 font-mono">
                  Enforced by FDA 21 CFR § 211.194, EU GMP Chapter 4, and WHO TRS 996 Data Integrity Guidelines.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  onClick={onStartTraining}
                  className="px-8 py-3 bg-blue-600 text-white font-bold text-xs uppercase tracking-widest rounded-lg shadow-lg shadow-blue-200 hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
                >
                  Start ALCOA+ Module
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={onJumpToCorrections}
                  className="px-6 py-2.5 bg-white border-2 border-blue-600 text-blue-600 font-bold text-xs uppercase tracking-widest rounded-lg hover:bg-blue-50 transition-colors inline-flex items-center gap-2"
                >
                  <FileText className="w-4 h-4 text-blue-600" />
                  Corrections Specimen Lab
                </button>

                <button
                  onClick={onJumpToQuiz}
                  className="px-6 py-2.5 text-slate-500 font-bold text-xs uppercase tracking-widest hover:text-slate-800 transition-colors"
                >
                  Skip to Compliance Quiz
                </button>
              </div>
            </div>
          </div>

          {/* Why GDP Matters - 3 High Impact Pillars */}
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Scale className="w-5 h-5 text-blue-600" />
              Why Good Documentation Practices are Critical
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl border-2 border-slate-200 shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4">
                  <Stethoscope className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-slate-900 text-base">Direct Patient Safety</h4>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  Every dosage calculation, environmental monitor reading, and sterilization log directly guarantees the drug or medical device delivered to patients is safe, potent, and pure.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border-2 border-slate-200 shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-900 flex items-center justify-center mb-4">
                  <FileText className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-slate-900 text-base">Uncompromised Audit Trail</h4>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  Compliant documentation allows independent regulatory reviewers, qualified persons (QPs), and QA auditors to reconstruct the exact manufacturing sequence years after production.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border-2 border-slate-200 shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center mb-4">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-slate-900 text-base">Legal &amp; Regulatory Standing</h4>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  FDA Form 483 inspection observations (official written notices issued to management citing regulatory violations), formal Warning Letters, import bans, and consent decrees routinely stem from sloppy corrections, backdating, pencil entries, or missing raw data.
                </p>
              </div>
            </div>
          </div>

          {/* Module Overview Map */}
          <div className="bg-white rounded-2xl border-2 border-slate-200 p-6 sm:p-8 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-1">Module Learning Curriculum</h3>
            <p className="text-xs text-slate-500 mb-6">Complete each section to prepare for the final Visual Recognition &amp; Compliance Quiz.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-xs font-bold text-blue-600 font-mono">01 &bull; CORE FRAMEWORK</span>
                <h5 className="font-bold text-slate-900 mt-1 text-sm">ALCOA+ Principles</h5>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Attributable, Legible, Contemporaneous, Original, Accurate + Complete, Consistent, Enduring, Available.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-xs font-bold text-blue-600 font-mono">02 &bull; EXECUTION RULES</span>
                <h5 className="font-bold text-slate-900 mt-1 text-sm">Manual &amp; Hybrid Records</h5>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Permanent blue/black ink, 24-hr international date formats, signature authentication, and Z-striping empty spaces.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-xs font-bold text-blue-600 font-mono">03 &bull; VISUAL LAB</span>
                <h5 className="font-bold text-slate-900 mt-1 text-sm">Correct vs. Incorrect</h5>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Side-by-side specimens: single strikethrough vs whiteout, scribble blackout, overwriting, and backdating.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-xs font-bold text-blue-600 font-mono">04 &bull; AUDIT SIM &amp; QUIZ</span>
                <h5 className="font-bold text-slate-900 mt-1 text-sm">Knowledge Assessment</h5>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Interactive batch record audit simulator followed by a 10-question visual quiz to earn your GDP Certificate.
                </p>
              </div>
            </div>
          </div>

          {/* Critical Regulatory Pitfalls Callout */}
          <div className="p-5 rounded-xl bg-amber-50/80 border border-amber-200">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
              <div className="text-xs text-amber-950 space-y-1">
                <span className="font-bold text-sm block text-amber-900">
                  The 5 Most Frequent FDA Form 483 GDP Inspection Findings (Official Citations for Non-Compliance):
                </span>
                <ul className="list-disc pl-4 space-y-1 text-slate-700">
                  <li><strong>Correction Fluid / Opaque Tape:</strong> Liquid paper used to cover unverified or out-of-specification values.</li>
                  <li><strong>Scrap Paper &amp; Sticky Notes:</strong> Writing raw weights or readings on paper towels or post-it notes and discarding them.</li>
                  <li><strong>Backdating &amp; Pre-signing:</strong> Signing records before work is finished, or recording an earlier date to meet deadlines.</li>
                  <li><strong>Pencil &amp; Erasable Pens:</strong> Using erasable ink pens or pencils that allow undetectable alterations.</li>
                  <li><strong>Unattended Blank Spaces:</strong> Leaving table rows empty without drawing a diagonal line and writing &ldquo;N/A&rdquo;.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
