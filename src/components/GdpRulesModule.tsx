import React, { useState } from 'react';
import { GDP_RULES } from '../data/gdpData';
import { GdpRule } from '../types';
import { 
  PenTool, 
  CalendarClock, 
  UserCheck, 
  FileX, 
  ClockAlert, 
  Trash2, 
  Check, 
  X, 
  ArrowRight,
  ShieldCheck,
  FileCheck2
} from 'lucide-react';

const RULE_NEW_HIRE_TIPS: Record<string, string> = {
  'rule-instruments': "Shopfloor Tip: Keep two approved indelible blue or black ballpoint pens in your cleanroom gowning pocket at all times. Never use erasable ink pens or pencils. Blue ink is preferred across most sites because Quality Assurance can instantly tell an original execution from a black-and-white photocopy.",
  'rule-dates-time': "Shopfloor Tip: Always write dates in DD-MMM-YYYY format (such as 02-SEP-2026) and 24-hour military time (14:30). If you write 09/02/26, European or global inspectors will read it as February 9th, not September 2nd, which can throw off entire batch genealogies.",
  'rule-signatures': "Shopfloor Tip: Never initial for a teammate, even if they had to run to the restroom or step out. Signing for someone else is treated as criminal fraud under FDA 21 CFR § 211. You only sign for what you personally witness or execute.",
  'rule-blank-fields': "Shopfloor Tip: An empty line on a batch record looks like a step you forgot to do. If a test or table doesn't apply, draw a clean single diagonal or Z-line across the unused space, write 'N/A', initial, and date.",
  'rule-late-entries': "Shopfloor Tip: If you performed a reading at 08:00 but forgot to write it down until 11:30, write '11:30' now, and write 'Late entry: recorded at 11:30 for observation at 08:00', explain why, and initial. NEVER write 08:00 when it is currently 11:30 (backdating is illegal).",
  'rule-raw-data': "Shopfloor Tip: The primary document is where ink first touches paper. Always record weights and machine readings directly into the official batch record at the equipment station. Never write on scrap paper, sticky notes, or cleanroom glove sleeves."
};

interface Props {
  onComplete: () => void;
  onNextSection: () => void;
}

export const GdpRulesModule: React.FC<Props> = ({ onComplete, onNextSection }) => {
  const [selectedRuleId, setSelectedRuleId] = useState<string>(GDP_RULES[0].id);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'PenTool':
        return <PenTool className="w-5 h-5" />;
      case 'CalendarClock':
        return <CalendarClock className="w-5 h-5" />;
      case 'UserCheck':
        return <UserCheck className="w-5 h-5" />;
      case 'FileX':
        return <FileX className="w-5 h-5" />;
      case 'ClockAlert':
        return <ClockAlert className="w-5 h-5" />;
      case 'Trash2':
        return <Trash2 className="w-5 h-5" />;
      default:
        return <ShieldCheck className="w-5 h-5" />;
    }
  };

  const currentRule = GDP_RULES.find((r) => r.id === selectedRuleId) || GDP_RULES[0];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Title Header */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border-2 border-slate-200 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-600 uppercase tracking-widest mb-1">
          <span>Standard Operating Procedures &bull; Section 03</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 leading-tight">
          Core GDP Operational Rules for Records
        </h2>
        <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-3xl leading-relaxed">
          Detailed standards governing pens, date formats, signature attributions, blank field voiding, and delayed entries in compliance with 21 CFR § 211 and EU GMP Chapter 4.
        </p>
      </div>

      {/* Rules Navigation Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {GDP_RULES.map((rule) => {
          const isSelected = rule.id === currentRule.id;
          return (
            <button
              key={rule.id}
              onClick={() => setSelectedRuleId(rule.id)}
              className={`p-3.5 rounded-md text-left flex flex-col justify-between transition-all ${
                isSelected
                  ? 'bg-slate-100 text-blue-900 border-l-4 border-blue-600 shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-md flex items-center justify-center mb-3 ${
                  isSelected ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-700'
                }`}
              >
                {getIcon(rule.iconName)}
              </div>
              <div>
                <span
                  className={`text-[10px] font-mono font-bold block ${
                    isSelected ? 'text-blue-700' : 'text-slate-400'
                  }`}
                >
                  {rule.badge}
                </span>
                <span className="text-xs font-bold line-clamp-1 mt-0.5">
                  {rule.title}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Rule Deep Dive Card */}
      <div className="bg-white rounded-2xl border-2 border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-xs">
              {getIcon(currentRule.iconName)}
            </div>
            <div>
              <span className="text-xs font-mono font-bold text-blue-600 uppercase tracking-wider">
                {currentRule.badge}
              </span>
              <h3 className="text-xl font-bold text-slate-900">{currentRule.title}</h3>
            </div>
          </div>
          <span className="px-3 py-1 rounded-md text-xs font-mono font-semibold bg-slate-100 text-slate-700 border border-slate-200">
            {currentRule.regulatoryBasis}
          </span>
        </div>

        {/* Detailed instruction */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">
            Standard Regulatory Requirement
          </h4>
          <p className="text-sm text-slate-800 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
            {currentRule.detailedInstruction}
          </p>
        </div>

        {/* New Hire Shopfloor Tip */}
        {RULE_NEW_HIRE_TIPS[currentRule.id] && (
          <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-950 space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-amber-900 uppercase tracking-wider text-[11px]">
              <UserCheck className="w-4 h-4 text-amber-700" />
              <span>New Operator Floor Tip &bull; Practical Shopfloor Application:</span>
            </div>
            <p className="text-slate-800 leading-relaxed font-medium">
              {RULE_NEW_HIRE_TIPS[currentRule.id]}
            </p>
          </div>
        )}

        {/* Side by side: Mandated vs Prohibited */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-white border-2 border-emerald-100 shadow-xs">
            <div className="flex items-center justify-between text-xs font-bold text-emerald-700 uppercase tracking-tighter mb-2">
              <span>Mandated Compliant Action</span>
              <span className="text-emerald-600 text-base">✓</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              {currentRule.correctBehavior}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white border-2 border-red-100 shadow-xs">
            <div className="flex items-center justify-between text-xs font-bold text-red-700 uppercase tracking-tighter mb-2">
              <span>Strictly Prohibited Infraction</span>
              <span className="text-red-500 text-base">✕</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              {currentRule.incorrectBehavior}
            </p>
          </div>
        </div>

        {/* Action buttons matching Geometric Balance buttons */}
        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
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
            Continue to Corrections Lab
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
