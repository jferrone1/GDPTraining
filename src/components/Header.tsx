import React from 'react';
import { SectionId } from '../types';
import { 
  ShieldCheck, 
  BookOpen, 
  FileCheck2, 
  Award, 
  Search, 
  BookMarked,
  Layers,
  HelpCircle,
  Sparkles
} from 'lucide-react';

interface HeaderProps {
  currentSection: SectionId;
  onSelectSection: (section: SectionId) => void;
  completedSections: Set<SectionId>;
  quizScore: number | null;
  quizPassed: boolean;
  onOpenReference: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentSection,
  onSelectSection,
  completedSections,
  quizScore,
  quizPassed,
  onOpenReference
}) => {
  const navItems: { id: SectionId; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'overview', label: 'Overview', icon: <BookOpen className="w-3.5 h-3.5" /> },
    { id: 'story', label: "Susan's Story", icon: <Sparkles className="w-3.5 h-3.5 text-amber-400" />, badge: 'Day 1 Shift' },
    { id: 'alcoa', label: 'ALCOA+ Framework', icon: <Layers className="w-3.5 h-3.5" /> },
    { id: 'rules', label: 'Core GDP Rules', icon: <ShieldCheck className="w-3.5 h-3.5" /> },
    { id: 'corrections_lab', label: 'Making Corrections', icon: <FileCheck2 className="w-3.5 h-3.5" />, badge: 'Visual Lab' },
    { id: 'audit_sim', label: 'You Are the Auditor', icon: <Search className="w-3.5 h-3.5" />, badge: 'Inspector' },
    { 
      id: 'quiz', 
      label: 'Knowledge Check', 
      icon: <HelpCircle className="w-3.5 h-3.5" />, 
      badge: quizScore !== null ? `${quizScore}%` : undefined 
    },
    { 
      id: 'certificate', 
      label: 'Certificate', 
      icon: <Award className="w-3.5 h-3.5" />,
      badge: quizPassed ? 'Earned' : undefined
    }
  ];

  // Calculate completion percentage
  const totalTrackable = 7;
  const progressPercent = Math.min(
    100,
    Math.round((completedSections.size / totalTrackable) * 100)
  );

  return (
    <header className="sticky top-0 z-40 shadow-md no-print">
      {/* Primary Top Bar with Geometric Balance aesthetic */}
      <div className="h-16 bg-blue-900 text-white flex items-center justify-between px-4 sm:px-8 border-b-4 border-blue-700">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-400 rounded-xs flex items-center justify-center font-bold text-blue-900 font-mono text-base shadow-xs shrink-0">
            AP
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base sm:text-lg font-bold tracking-tight uppercase text-white">
                AnyPharm GDP Training
              </span>
              <span className="hidden md:inline-block text-blue-300 font-mono text-xs">
                | Diabetes Care Manufacturing
              </span>
            </div>
            <p className="text-[10px] text-blue-200 uppercase tracking-widest font-mono hidden sm:block">
              FDA 21 CFR Part 211 &bull; EU GMP Ch. 4 &bull; ALCOA+ Data Integrity
            </p>
          </div>
        </div>

        {/* Geometric Progress & Reference button */}
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="flex flex-col items-end">
            <span className="text-[10px] uppercase tracking-widest text-blue-200 font-mono">
              Progress
            </span>
            <div className="w-32 sm:w-48 h-2 bg-blue-800 rounded-full mt-1 overflow-hidden">
              <div 
                className="h-full bg-emerald-400 transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
          <span className="text-sm font-medium text-white hidden xs:inline-block">
            {progressPercent}% Complete
          </span>

          <button
            onClick={onOpenReference}
            className="px-3 py-1.5 bg-blue-800 hover:bg-blue-700 border border-blue-600 rounded-lg text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 shadow-xs"
            title="Open Quick Reference & Acronym Glossary"
          >
            <BookMarked className="w-3.5 h-3.5 text-blue-300" />
            <span className="hidden sm:inline">Reference &amp; Acronyms</span>
          </button>
        </div>
      </div>

      {/* Structured Training Syllabus Sub-navigation */}
      <div className="bg-white border-b border-slate-200 px-4 sm:px-8 py-1.5">
        <div className="max-w-7xl mx-auto flex items-center gap-1 sm:gap-2 overflow-x-auto scrollbar-none">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pr-2 hidden lg:inline-block shrink-0">
            Syllabus:
          </span>
          {navItems.map((item, index) => {
            const isActive = currentSection === item.id;
            const isCompleted = completedSections.has(item.id);
            const stepNum = (index + 1).toString().padStart(2, '0');

            return (
              <button
                key={item.id}
                onClick={() => onSelectSection(item.id)}
                className={`p-2 sm:px-3 sm:py-1.5 rounded-md flex items-center gap-2.5 transition-all text-xs whitespace-nowrap ${
                  isActive
                    ? 'bg-slate-100 text-blue-900 border-l-4 border-blue-600 font-semibold shadow-xs'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full text-[10px] flex items-center justify-center font-mono font-bold shrink-0 ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : isCompleted
                      ? 'bg-emerald-500 text-white'
                      : 'border border-slate-300 text-slate-400'
                  }`}
                >
                  {isCompleted && !isActive ? '✓' : stepNum}
                </div>
                <span className="tracking-tight">{item.label}</span>
                {item.badge && (
                  <span
                    className={`text-[9px] px-1.5 py-0.5 rounded font-mono font-bold uppercase tracking-wider ${
                      isActive
                        ? 'bg-blue-200 text-blue-900'
                        : item.badge === 'Earned'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};

