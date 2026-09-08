import React, { useState } from 'react';
import { REASON_CODES, ALCOA_PRINCIPLES, ACRONYMS } from '../data/gdpData';
import { 
  X, 
  BookMarked, 
  Search, 
  ShieldCheck, 
  AlertTriangle, 
  FileText, 
  CheckCircle2, 
  PenTool,
  BookOpen,
  Info,
  HelpCircle
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const ReferenceDrawer: React.FC<Props> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [acronymCategory, setAcronymCategory] = useState<'all' | 'regulatory' | 'shopfloor' | 'quality' | 'systems' | 'correction_codes'>('all');
  const [activeTab, setActiveTab] = useState<'acronyms' | 'reason_codes' | 'alcoa_summary' | 'red_flags' | 'citations'>('acronyms');

  if (!isOpen) return null;

  const filteredAcronyms = ACRONYMS.filter((item) => {
    const matchesCategory = acronymCategory === 'all' || item.category === acronymCategory;
    const query = searchTerm.toLowerCase().trim();
    const matchesSearch = !query || 
      item.acronym.toLowerCase().includes(query) ||
      item.fullName.toLowerCase().includes(query) ||
      item.definition.toLowerCase().includes(query) ||
      item.floorContext.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-hidden no-print">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity" 
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-200">
          {/* Header */}
          <div className="p-4 sm:p-5 bg-white border-b-2 border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-xs shrink-0">
                <BookMarked className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-slate-900">GDP Quick Reference &amp; Glossary</h3>
                <span className="text-[10px] text-blue-600 font-mono font-bold uppercase tracking-wider">
                  GxP Standard Operating Procedures
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Sub-tabs */}
          <div className="flex border-b border-slate-200 bg-slate-50 text-xs font-bold p-1 overflow-x-auto scrollbar-none">
            <button
              onClick={() => setActiveTab('acronyms')}
              className={`py-2 px-2.5 rounded-md text-center uppercase tracking-wider text-[11px] whitespace-nowrap transition-all ${
                activeTab === 'acronyms' ? 'bg-white text-blue-700 border-l-2 border-blue-600 shadow-xs' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Acronyms ({ACRONYMS.length})
            </button>
            <button
              onClick={() => setActiveTab('reason_codes')}
              className={`py-2 px-2.5 rounded-md text-center uppercase tracking-wider text-[11px] whitespace-nowrap transition-all ${
                activeTab === 'reason_codes' ? 'bg-white text-blue-700 border-l-2 border-blue-600 shadow-xs' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Reason Codes
            </button>
            <button
              onClick={() => setActiveTab('alcoa_summary')}
              className={`py-2 px-2.5 rounded-md text-center uppercase tracking-wider text-[11px] whitespace-nowrap transition-all ${
                activeTab === 'alcoa_summary' ? 'bg-white text-blue-700 border-l-2 border-blue-600 shadow-xs' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              ALCOA+
            </button>
            <button
              onClick={() => setActiveTab('red_flags')}
              className={`py-2 px-2.5 rounded-md text-center uppercase tracking-wider text-[11px] whitespace-nowrap transition-all ${
                activeTab === 'red_flags' ? 'bg-white text-blue-700 border-l-2 border-blue-600 shadow-xs' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Red Flags
            </button>
            <button
              onClick={() => setActiveTab('citations')}
              className={`py-2 px-2.5 rounded-md text-center uppercase tracking-wider text-[11px] whitespace-nowrap transition-all ${
                activeTab === 'citations' ? 'bg-white text-blue-700 border-l-2 border-blue-600 shadow-xs' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Citations
            </button>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Acronyms & Glossary Tab */}
            {activeTab === 'acronyms' && (
              <div className="space-y-3">
                <div className="text-xs text-slate-500 leading-relaxed">
                  Plain-English definitions and production-floor context for all regulated pharmaceutical abbreviations:
                </div>

                {/* Search Bar */}
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search acronym (e.g. BMR, SOP, FDA, OOS, EE)..."
                    className="w-full pl-8 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                    >
                      ×
                    </button>
                  )}
                </div>

                {/* Category Pills */}
                <div className="flex flex-wrap gap-1 text-[10px] font-bold">
                  {[
                    { id: 'all', label: 'All' },
                    { id: 'shopfloor', label: 'Shopfloor' },
                    { id: 'regulatory', label: 'Regulatory' },
                    { id: 'quality', label: 'Quality' },
                    { id: 'correction_codes', label: 'Reason Codes' },
                    { id: 'systems', label: 'Systems' }
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setAcronymCategory(cat.id as any)}
                      className={`px-2 py-1 rounded transition-colors ${
                        acronymCategory === cat.id
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                {/* Acronym Cards */}
                <div className="space-y-2.5">
                  {filteredAcronyms.length === 0 ? (
                    <div className="p-6 text-center text-xs text-slate-500 bg-slate-50 rounded-xl border border-slate-200">
                      No acronyms found matching &ldquo;{searchTerm}&rdquo;. Try another term.
                    </div>
                  ) : (
                    filteredAcronyms.map((item) => (
                      <div
                        key={item.id}
                        className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs space-y-1.5 hover:border-blue-300 transition-colors"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-mono font-black text-sm bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-200">
                            {item.acronym}
                          </span>
                          <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 font-mono">
                            {item.category.replace('_', ' ')}
                          </span>
                        </div>

                        <h4 className="font-bold text-xs text-slate-900 leading-tight">
                          {item.fullName}
                        </h4>

                        <p className="text-[11px] text-slate-600 leading-relaxed">
                          {item.definition}
                        </p>

                        <div className="p-2 rounded bg-amber-50/70 border border-amber-200/80 text-[11px] text-amber-950 space-y-0.5">
                          <span className="font-bold block text-[10px] uppercase tracking-wider text-amber-900 flex items-center gap-1">
                            <Info className="w-3 h-3 text-amber-700" />
                            What it means on shift:
                          </span>
                          <p className="leading-normal text-slate-700 font-medium">
                            {item.floorContext}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* Reason Codes Tab */}
            {activeTab === 'reason_codes' && (
              <div className="space-y-3">
                <div className="text-xs text-slate-500">
                  Standardized reason codes authorized for GxP document error corrections:
                </div>
                {REASON_CODES.map((rc) => (
                  <div
                    key={rc.code}
                    className={`p-3 rounded-lg border text-xs space-y-1.5 ${
                      rc.code === 'OR'
                        ? 'bg-rose-50/70 border-rose-200'
                        : 'bg-white border-slate-200 shadow-xs'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-sm bg-blue-100 text-blue-900 px-2 py-0.5 rounded">
                        {rc.code}
                      </span>
                      <span className="font-bold text-slate-800">{rc.meaning}</span>
                    </div>
                    <p className="text-slate-600">{rc.description}</p>
                    <div className="pt-1 text-[11px] font-mono text-slate-700 bg-slate-50 p-2 rounded border border-slate-200">
                      <strong>When to use: </strong>{rc.whenToUse}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'alcoa_summary' && (
              <div className="space-y-2">
                <div className="text-xs text-slate-500">
                  Quick summary of all 9 ALCOA+ principles:
                </div>
                {ALCOA_PRINCIPLES.map((p) => (
                  <div key={p.id} className="p-2.5 bg-white rounded-lg border border-slate-200 text-xs">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-6 h-6 rounded bg-blue-100 text-blue-900 font-mono font-bold flex items-center justify-center text-xs">
                        {p.letter}
                      </span>
                      <strong className="text-slate-900">{p.name}</strong>
                    </div>
                    <p className="text-slate-600 text-[11px] leading-relaxed">
                      {p.definition}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'red_flags' && (
              <div className="space-y-3">
                <div className="text-xs text-slate-500">
                  Practices that immediately trigger regulatory 483 audit observations:
                </div>
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs space-y-2 text-rose-950">
                  <div className="flex items-center gap-1.5 font-bold text-rose-900">
                    <AlertTriangle className="w-4 h-4 text-rose-700" />
                    <span>Top 6 Audit Red Flags</span>
                  </div>
                  <ul className="list-disc pl-4 space-y-1 text-slate-700 text-[11px]">
                    <li><strong>Correction fluid / tape:</strong> Suggests intentional data concealment.</li>
                    <li><strong>Backdated signatures:</strong> Falsification of execution records.</li>
                    <li><strong>Pencil or erasable pens:</strong> Fails the indelible and enduring standards.</li>
                    <li><strong>Scrap paper in trash:</strong> Discarded raw data violates 21 CFR § 211.180.</li>
                    <li><strong>Unaccounted blank lines:</strong> Invites unauthorized subsequent tampering.</li>
                    <li><strong>Overwritten numbers:</strong> Obscures original recorded values.</li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'citations' && (
              <div className="space-y-3 text-xs">
                <div className="text-xs text-slate-500">
                  Key legal and regulatory authorities governing GDP:
                </div>
                <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-1">
                  <span className="font-bold text-blue-900 font-mono block">FDA 21 CFR § 211.194</span>
                  <p className="text-slate-600 text-[11px]">
                    Laboratory records must contain complete records of all data secured, initialed and dated, with clear alteration rules.
                  </p>
                </div>

                <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-1">
                  <span className="font-bold text-blue-900 font-mono block">FDA 21 CFR § 211.188</span>
                  <p className="text-slate-600 text-[11px]">
                    Batch production and control records must be contemporaneously documented as each significant step is executed.
                  </p>
                </div>

                <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-1">
                  <span className="font-bold text-blue-900 font-mono block">EU GMP Volume 4 Chapter 4</span>
                  <p className="text-slate-600 text-[11px]">
                    Any alteration made to a record should be signed and dated; the alteration should permit the reading of the original information.
                  </p>
                </div>

                <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-1">
                  <span className="font-bold text-blue-900 font-mono block">WHO TRS 996 (Annex 5)</span>
                  <p className="text-slate-600 text-[11px]">
                    Guidance on good data and record management practices across pharmaceutical manufacturing.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t-2 border-slate-200 bg-slate-50 text-center">
            <button
              onClick={onClose}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-xs uppercase tracking-widest transition-colors shadow-sm shadow-blue-200"
            >
              Close Reference Guide
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
