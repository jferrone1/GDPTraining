import React, { useRef } from 'react';
import { Award, Printer, ShieldCheck, CheckCircle2, ArrowLeft, Sparkles } from 'lucide-react';

interface Props {
  traineeName: string;
  setTraineeName: (name: string) => void;
  score: number;
  passed: boolean;
  completionDate: string;
  certificateId: string;
  onBackToCourse: () => void;
}

export const CertificateView: React.FC<Props> = ({
  traineeName,
  setTraineeName,
  score,
  passed,
  completionDate,
  certificateId,
  onBackToCourse
}) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 max-w-4xl mx-auto">
      {/* Top action bar (hidden during print) */}
      <div className="no-print flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-2xl border-2 border-slate-200 shadow-sm">
        <button
          onClick={onBackToCourse}
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-700 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Training Modules
        </button>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500 font-bold uppercase tracking-wider text-[11px]">Trainee Name:</span>
            <input
              type="text"
              value={traineeName}
              onChange={(e) => setTraineeName(e.target.value)}
              className="px-3 py-1.5 border-2 border-slate-200 rounded-lg font-bold text-slate-900 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
              placeholder="Your Full Legal Name"
            />
          </div>

          <button
            onClick={handlePrint}
            className="px-6 py-2.5 bg-blue-600 text-white font-bold text-xs uppercase tracking-widest rounded-lg shadow-lg shadow-blue-200 hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
          >
            <Printer className="w-4 h-4" />
            Print / Save Certificate PDF
          </button>
        </div>
      </div>

      {/* Official Certificate Layout (Designed for Screen & Print) */}
      <div className="bg-white p-8 sm:p-12 rounded-2xl border-8 border-double border-slate-800 shadow-lg relative overflow-hidden paper-sheet print:border-4 print:p-8">
        {/* Subtle decorative background watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-3 pointer-events-none">
          <ShieldCheck className="w-[500px] h-[500px] text-slate-900" />
        </div>

        {/* Certificate Border Details */}
        <div className="relative z-10 border border-slate-300 p-6 sm:p-8 rounded-lg text-center space-y-6">
          {/* Header Org */}
          <div className="space-y-1">
            <div className="flex items-center justify-center gap-2 text-xs font-mono font-bold text-blue-900 uppercase tracking-widest">
              <ShieldCheck className="w-5 h-5 text-blue-800" />
              <span>GxP REGULATORY COMPLIANCE ACADEMY</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-serif uppercase pt-2">
              Certificate of Completion
            </h1>
            <p className="text-xs font-mono text-slate-500 uppercase tracking-wider">
              Good Documentation Practices (GDP) &amp; ALCOA+ Data Integrity Standards
            </p>
          </div>

          {/* Recipient Statement */}
          <div className="py-2 space-y-2">
            <p className="text-xs sm:text-sm text-slate-500 italic">
              This officially certifies that
            </p>
            <div className="text-2xl sm:text-4xl font-bold text-blue-950 font-serif border-b-2 border-slate-300 pb-2 inline-block min-w-[300px] px-6">
              {traineeName || 'Certified GxP Professional'}
            </div>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto pt-2 leading-relaxed">
              has successfully fulfilled all regulatory training competencies and achieved a passing score on the Good Documentation Practices qualification examination in accordance with:
            </p>
          </div>

          {/* Regulatory Standards Listed */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-mono text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-200">
            <span className="font-semibold">FDA 21 CFR § 211.194</span>
            <span className="font-semibold">FDA 21 CFR Part 11</span>
            <span className="font-semibold">EU GMP Volume 4 Ch. 4</span>
            <span className="font-semibold">WHO TRS 996 Data Integrity</span>
          </div>

          {/* Curriculum competencies verified */}
          <div className="text-left bg-blue-50/50 p-4 rounded-lg border border-blue-100 text-xs text-slate-700 space-y-1">
            <span className="font-bold text-blue-950 block font-mono text-[11px] uppercase">
              Accredited Competencies Verified:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 pt-1 text-[11px]">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                ALCOA+ 9 Data Integrity Principles
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                Single-Strikethrough Error Correction
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                Indelible Ink &amp; Unambiguous Dates
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                Prohibition of White-out &amp; Scrap Paper
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                Z-Striping Blank Spaces &amp; Table Rows
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                Contemporaneous &amp; Late Entry Protocol
              </span>
            </div>
          </div>

          {/* Signature & Verification Seal Footer */}
          <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-6 items-end border-t border-slate-200">
            {/* Left: Issue Date & Verification */}
            <div className="text-left space-y-1 text-xs font-mono text-slate-600">
              <div>
                <span className="text-slate-400 block text-[10px]">ISSUED DATE:</span>
                <span className="font-bold text-slate-900">{completionDate}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">CERTIFICATE ID:</span>
                <span className="font-bold text-blue-900">{certificateId}</span>
              </div>
            </div>

            {/* Center: Gold/Navy Seal */}
            <div className="flex flex-col items-center justify-center">
              <div className="w-20 h-20 rounded-full border-4 border-amber-600 bg-amber-50 flex flex-col items-center justify-center text-center p-1 shadow-sm">
                <Award className="w-6 h-6 text-amber-700 mb-0.5" />
                <span className="text-[9px] font-extrabold text-amber-900 uppercase tracking-tighter leading-tight font-mono">
                  VERIFIED GDP
                </span>
                <span className="text-[8px] font-bold text-amber-800 font-mono">
                  SCORE: {score}%
                </span>
              </div>
            </div>

            {/* Right: Signature */}
            <div className="text-right space-y-1">
              <div className="font-handwriting text-2xl text-blue-900 font-bold pr-2">
                Dr. Katherine Vance, VP QA
              </div>
              <div className="border-t border-slate-400 pt-1 text-xs font-mono text-slate-600">
                Quality Assurance &amp; Regulatory Compliance
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
