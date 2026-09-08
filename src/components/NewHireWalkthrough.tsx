import React, { useState, useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { NEW_HIRE_SHIFT_STEPS } from '../data/gdpData';
import { AudioScenePlayer } from './AudioScenePlayer';
import { 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  HelpCircle, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  ShieldCheck, 
  Lightbulb, 
  Award,
  BookOpen,
  Check,
  Lock,
  PenTool,
  RotateCcw,
  MessageSquare,
  Building2,
  FileCheck2,
  AlertOctagon,
  Scale,
  Sparkle,
  Headphones,
  Mic
} from 'lucide-react';

interface Props {
  onCompleteWalkthrough?: () => void;
  onProceedToAlcoa?: () => void;
}

export const NewHireWalkthrough: React.FC<Props> = ({ 
  onCompleteWalkthrough,
  onProceedToAlcoa 
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedStepIds, setCompletedStepIds] = useState<Set<string>>(new Set([NEW_HIRE_SHIFT_STEPS[0].id]));
  const [activeTab, setActiveTab] = useState<'dialogue' | 'rules'>('dialogue');
  const [quizAnswerSelected, setQuizAnswerSelected] = useState<number | null>(null);

  // Interactive challenge states per scene
  // Scene 1: Locker pencil swap & Audio Player mode
  const [pencilStashed, setPencilStashed] = useState(false);
  const [scene1AudioMode, setScene1AudioMode] = useState<'studio' | 'synthesizer' | 'transcript'>('studio');
  // Scene 2: Date format choice
  const [selectedDateFormat, setSelectedDateFormat] = useState<string | null>(null);
  // Scene 3: Scale direct entry
  const [enteredWeight, setEnteredWeight] = useState<string>('');
  const [weightSubmitted, setWeightSubmitted] = useState<boolean>(false);
  // Scene 4: 4-step correction mini tool
  const [step1Struck, setStep1Struck] = useState(false);
  const [step2Correction, setStep2Correction] = useState('');
  const [step3Signed, setStep3Signed] = useState(false);
  const [step4Reason, setStep4Reason] = useState<'TE' | 'EE' | ''>('');
  // Scene 5: Single diagonal line on unused rows
  const [zStripeApplied, setZStripeApplied] = useState(false);
  // Scene 6: Kevin's proxy favor response
  const [proxyChoice, setProxyChoice] = useState<'refuse' | 'agree' | null>(null);
  // Scene 7: Badge reveal
  const [badgeRevealed, setBadgeRevealed] = useState(false);

  // Refs for scrolling to scene list and measuring table bounds
  const sceneListRef = useRef<HTMLDivElement>(null);
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const unusedTbodyRef = useRef<HTMLTableSectionElement>(null);
  const [unusedRect, setUnusedRect] = useState<{ top: number; height: number; width: number } | null>(null);

  const scrollToSceneList = () => {
    if (sceneListRef.current) {
      sceneListRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const updateUnusedBounds = () => {
    if (unusedTbodyRef.current && tableContainerRef.current) {
      setUnusedRect({
        top: unusedTbodyRef.current.offsetTop,
        height: unusedTbodyRef.current.offsetHeight,
        width: unusedTbodyRef.current.offsetWidth,
      });
    }
  };

  const currentStep = NEW_HIRE_SHIFT_STEPS[currentStepIndex];
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === NEW_HIRE_SHIFT_STEPS.length - 1;

  useEffect(() => {
    if (currentStep.id === 'step-blanks-z-stripe') {
      updateUnusedBounds();
      const timer = setTimeout(updateUnusedBounds, 100);
      window.addEventListener('resize', updateUnusedBounds);
      return () => {
        clearTimeout(timer);
        window.removeEventListener('resize', updateUnusedBounds);
      };
    }
  }, [currentStep.id, activeTab, zStripeApplied]);

  // Scene-specific quizzes reinforcing Susan and Grace's lessons
  const stepQuizzes: Record<string, {
    question: string;
    options: { text: string; isCorrect: boolean; feedback: string }[];
  }> = {
    'step-lucky-pencil': {
      question: 'Why did Grace tell Susan that pencils aren’t allowed on the AnyPharm production floor?',
      options: [
        { 
          text: 'Because pencils break easily and graphite stains cleanroom suits.', 
          isCorrect: false, 
          feedback: 'While graphite is a particle concern, the primary regulatory reason is permanence and anti-tampering.' 
        },
        { 
          text: 'Because pencil marks are temporary, can be erased, and eraser marks cast doubt on document accuracy.', 
          isCorrect: true, 
          feedback: 'Spot on! As Grace explained with her tax return analogy, eraser marks destroy credibility and make auditors question accuracy.' 
        },
        { 
          text: 'Because only supervisors are allowed to hold pencils.', 
          isCorrect: false, 
          feedback: 'No one is allowed to use pencils on production records under GMP—not even plant directors.' 
        }
      ]
    },
    'step-pen-check': {
      question: 'Why does AnyPharm require blue ballpoint pen and the DD-MMM-YYYY date format?',
      options: [
        { 
          text: 'Blue ink immediately distinguishes original signatures from photocopies, and three-letter months prevent international confusion.', 
          isCorrect: true, 
          feedback: 'Exactly right! Blue ink separates original paper from black-and-white copies, and 02-SEP-2026 cannot be misread.' 
        },
        { 
          text: 'Blue ink is cheaper than black ink, and European auditors prefer numbers only.', 
          isCorrect: false, 
          feedback: 'Numeric dates like 03/04/2026 cause confusion between US and European inspectors.' 
        },
        { 
          text: 'Red ink is required for all operators on night shifts.', 
          isCorrect: false, 
          feedback: 'Red ink is strictly restricted to Quality Assurance quarantine and rejection stamps.' 
        }
      ]
    },
    'step-direct-entry': {
      question: 'Susan weighed 18.50 g of enzyme solution. Why couldn’t she write it on scrap cardboard and copy it neatly later?',
      options: [
        { 
          text: 'Scrap paper gets lost or thrown away, and secondary transcription frequently leads to accidental transposition errors.', 
          isCorrect: true, 
          feedback: 'Correct! GDP requires direct entry at the moment of observation. Discarded scrap notes in trash cans trigger severe audit findings.' 
        },
        { 
          text: 'Because cardboard emits lint that damages the floor scale.', 
          isCorrect: false, 
          feedback: 'The core issue is data integrity: raw data must be contemporaneously captured directly on official records.' 
        },
        { 
          text: 'Operators are only allowed to use digital memory without writing anything.', 
          isCorrect: false, 
          feedback: 'Never rely on memory in regulated manufacturing.' 
        }
      ]
    },
    'step-mistake-fix': {
      question: 'When Susan wrote "53.5 psi" instead of "35.5 psi", what were the 4 rules Grace guided her through?',
      options: [
        { 
          text: '1) Scribble out 53.5 completely 2) Write 35.5 beside it 3) Recheck that all signs of the incorrect number are hidden 4) Sign and date.', 
          isCorrect: false, 
          feedback: 'Never scribble out or obscure original data! Under GDP, original values must remain 100% legible so auditors can see what was originally recorded.' 
        },
        { 
          text: '1) Single line strike, 2) Write correction above, 3) Initial and date, 4) Add reason code (e.g., TE).', 
          isCorrect: true, 
          feedback: 'Perfect! The single strike keeps the original number legible, while initials, date, and reason code maintain complete transparency.' 
        },
        { 
          text: '1) Apply correction fluid; 2) wait 60 seconds 3) write 35.5 over the correction fluid 4) initial and date.', 
          isCorrect: false, 
          feedback: 'Correction fluid (whiteout) and tape are strictly forbidden in GMP/GDP facilities because they conceal original information.' 
        }
      ]
    },
    'step-blanks-z-stripe': {
      question: 'Why did Grace stop Susan from leaving rows 7 through 10 blank on the packaging check table?',
      options: [
        { 
          text: 'Because auditors won’t know if inspections were skipped, and open lines leave room for unauthorized entries later.', 
          isCorrect: true, 
          feedback: 'Outstanding! Closing unused space with a single diagonal line, "N/A", explanation, initials, and date prevents unauthorized additions.' 
        },
        { 
          text: 'Because AnyPharm might not give them new forms if they see blanks.', 
          isCorrect: false, 
          feedback: 'AnyPharm provides batch records as needed; GDP mandates closing blank lines to prevent audit ambiguity and unauthorized retrospective additions.' 
        },
        { 
          text: 'Susan should have filled rows 7-10 with ditto marks (").', 
          isCorrect: false, 
          feedback: 'Ditto marks and downward arrows are strictly forbidden under Good Documentation Practices.' 
        }
      ]
    },
    'step-proxy-signing': {
      question: 'Kevin asked Susan to sign his initials "KB" on step 14 because he was rushing for his bus. Why did Susan refuse?',
      options: [
        { 
          text: 'Because Susan was too busy with her own work.', 
          isCorrect: false, 
          feedback: 'It is a matter of strict regulatory compliance and federal law, not workload.' 
        },
        { 
          text: 'Signing someone else’s initials ("proxy signing") is criminal record falsification; you only sign for what you personally performed.', 
          isCorrect: true, 
          feedback: 'Absolute bullseye! Attributability is non-negotiable. Proxy signing can result in immediate termination, audit findings, and criminal penalties.' 
        },
        { 
          text: 'Susan should have signed Kevin’s full legal name instead of his initials.', 
          isCorrect: false, 
          feedback: 'Signing any mark for another person is forgery.' 
        }
      ]
    },
    'step-debrief-badge': {
      question: 'What is the true takeaway from Susan’s Day 1 shift at AnyPharm?',
      options: [
        { 
          text: 'GDP is a rigid set of arbitrary rules created just to slow down operators.', 
          isCorrect: false, 
          feedback: 'GDP is designed to protect operators and ensure diabetic patients receive safe, accurate medical supplies.' 
        },
        { 
          text: 'Mistakes are normal, but honesty, transparency, permanent ink, and the 4 correction rules protect patients and staff.', 
          isCorrect: true, 
          feedback: 'Exactly! Good Documentation Practices give everyone the tools to be proud of their work and safeguard patient health.' 
        },
        { 
          text: 'Susan should bring two lucky pencils tomorrow instead of one.', 
          isCorrect: false, 
          feedback: 'No pencils on the floor! Permanent blue ballpoint pens only!' 
        }
      ]
    }
  };

  const activeQuiz = stepQuizzes[currentStep.id];

  const handleNextStep = () => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < NEW_HIRE_SHIFT_STEPS.length) {
      setCurrentStepIndex(nextIndex);
      setCompletedStepIds((prev) => new Set([...prev, NEW_HIRE_SHIFT_STEPS[nextIndex].id]));
      setQuizAnswerSelected(null);
      // Take user to the list of scenes towards the top
      setTimeout(scrollToSceneList, 40);
      // Reset scene specific flags for next step
      if (nextIndex === 6) {
        // Trigger celebratory confetti on last step
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 }
        });
      }
    } else {
      onCompleteWalkthrough?.();
    }
  };

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
      setQuizAnswerSelected(null);
      // Take user to the list of scenes towards the top
      setTimeout(scrollToSceneList, 40);
    }
  };

  const handleSelectStep = (idx: number) => {
    setCurrentStepIndex(idx);
    setCompletedStepIds((prev) => new Set([...prev, NEW_HIRE_SHIFT_STEPS[idx].id]));
    setQuizAnswerSelected(null);
    // Take user to the list of scenes towards the top
    setTimeout(scrollToSceneList, 40);
  };

  return (
    <div className="bg-white rounded-2xl border-2 border-slate-200 shadow-sm overflow-hidden animate-in fade-in duration-300">
      {/* Narrative Top Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-950 text-white p-5 sm:p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-800/90 border border-blue-600 text-blue-200 text-[11px] font-bold uppercase tracking-wider">
                <Building2 className="w-3.5 h-3.5 text-blue-300" />
                AnyPharm Diabetes Care Corp.
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[11px] font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
                Susan Pulido’s Day 1 Shift
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white flex items-center gap-2">
              Good Documentation Practices in Action
            </h2>
            <p className="text-blue-200 text-xs sm:text-sm mt-1 max-w-3xl leading-relaxed">
              Join new operator <strong className="text-white font-semibold">Susan Pulido</strong> and 2-year veteran <strong className="text-white font-semibold">Grace D. Porter ("G.D.P.")</strong> through a realistic shift manufacturing diabetes supplies. Discover how GDP rules prevent real errors.
            </p>
          </div>

          {/* Cast Cards */}
          <div className="flex items-center gap-3 shrink-0 bg-blue-900/60 p-2.5 rounded-xl border border-blue-700/60 text-xs">
            <div className="flex items-center gap-2 pr-3 border-r border-blue-700/60">
              <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                SP
              </div>
              <div>
                <div className="font-bold text-white text-xs">Susan Pulido</div>
                <div className="text-[10px] text-emerald-300">New Hire • Line 2</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                GDP
              </div>
              <div>
                <div className="font-bold text-white text-xs">Grace D. Porter</div>
                <div className="text-[10px] text-blue-300">Senior Operator ("GDP")</div>
              </div>
            </div>
          </div>
        </div>

        {/* Shift Timeline Stepper (7 Scenes) */}
        <div ref={sceneListRef} id="scene-timeline-stepper" className="mt-6 pt-4 border-t border-blue-800/80 scroll-mt-28">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
            {NEW_HIRE_SHIFT_STEPS.map((step, idx) => {
              const isActive = idx === currentStepIndex;
              const isDone = completedStepIds.has(step.id);

              return (
                <button
                  key={step.id}
                  onClick={() => handleSelectStep(idx)}
                  className={`p-2 rounded-lg text-left transition-all relative ${
                    isActive
                      ? 'bg-white text-blue-950 shadow-md ring-2 ring-emerald-400'
                      : isDone
                      ? 'bg-blue-800/80 text-blue-100 hover:bg-blue-800'
                      : 'bg-blue-900/40 text-blue-300 hover:bg-blue-800/40'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className={`text-[10px] font-mono font-bold ${isActive ? 'text-blue-700' : 'text-blue-300'}`}>
                      {step.timeLabel.split('•')[0].trim()}
                    </span>
                    {isDone && (
                      <Check className={`w-3 h-3 ${isActive ? 'text-emerald-600' : 'text-emerald-400'}`} />
                    )}
                  </div>
                  <div className={`text-xs font-bold truncate ${isActive ? 'text-slate-900' : 'text-white'}`}>
                    Scene {step.stepNumber}
                  </div>
                  <div className={`text-[10px] truncate ${isActive ? 'text-slate-600' : 'text-blue-300'}`}>
                    {step.title.split(':')[0]}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Step Detail Container */}
      <div className="p-6 sm:p-8 space-y-6">
        {/* Step Header with Location & Badge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono font-bold text-blue-700 uppercase tracking-wider mb-1">
              <span className="flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-200">
                <Clock className="w-3 h-3" />
                {currentStep.timeLabel}
              </span>
              <span className="text-slate-300">&bull;</span>
              <span className="text-slate-600 font-semibold">{currentStep.location}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
              {currentStep.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              {currentStep.subtitle}
            </p>
          </div>

          {/* Mode Switcher inside Scene */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 shrink-0 text-xs">
            <button
              onClick={() => setActiveTab('dialogue')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'dialogue'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Story & Dialogue</span>
            </button>
            <button
              onClick={() => setActiveTab('rules')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'rules'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileCheck2 className="w-3.5 h-3.5" />
              <span>GDP Takeaways</span>
            </button>
          </div>
        </div>

        {/* Diabetes Product Context Pill */}
        {currentStep.diabetesContext && (
          <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-xl flex items-start gap-2.5 text-xs text-amber-900">
            <AlertOctagon className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold text-amber-950">Patient Impact (AnyPharm Diabetes Care): </strong>
              <span className="text-amber-900/90">{currentStep.diabetesContext}</span>
            </div>
          </div>
        )}

        {/* TAB 1: STORY & DIALOGUE VIEW */}
        {activeTab === 'dialogue' && (
          <div className="space-y-3 sm:space-y-4">
            {/* Setting the Scene description - compact banner */}
            <div className="py-2.5 px-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 leading-snug flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400 font-mono inline-block mr-2">
                  Situation:
                </span>
                <span className="font-medium">{currentStep.situation}</span>
              </div>
              {currentStep.id === 'step-lucky-pencil' && (
                <button
                  type="button"
                  onClick={() => setScene1AudioMode(scene1AudioMode === 'transcript' ? 'studio' : 'transcript')}
                  className="text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1 shrink-0 cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{scene1AudioMode === 'transcript' ? 'Show Scene Player' : 'View Text Transcript'}</span>
                </button>
              )}
            </div>

            {/* Note box for scenes starting with Scene 2 */}
            {currentStep.stepNumber >= 2 && (
              <div 
                id={`scene-${currentStep.stepNumber}-hiring-note`}
                className="py-2.5 px-3.5 bg-red-100 rounded-xl border border-red-200 text-xs text-red-900 font-semibold leading-snug"
              >
                NOTE: Further images and audio available by hiring James Ferrone!
              </div>
            )}

            {/* Scene 1 Exclusive: Audio Scene Player or Transcript View */}
            {currentStep.id === 'step-lucky-pencil' && (
              <div className="space-y-2">
                {/* Audio Scene Player Component */}
                {scene1AudioMode !== 'transcript' && (
                  <AudioScenePlayer
                    key={scene1AudioMode}
                    initialAudioEngine={scene1AudioMode === 'studio' ? 'studio' : 'synthesizer'}
                    isPencilAlreadyStashed={pencilStashed}
                    onPencilStashed={() => {
                      setPencilStashed(true);
                      confetti({ particleCount: 35, spread: 60, origin: { y: 0.8 } });
                    }}
                  />
                )}
              </div>
            )}

            {/* Conversation Script Flow (shown if not in Scene 1 player mode, or if user toggled to transcript) */}
            {(currentStep.id !== 'step-lucky-pencil' || scene1AudioMode === 'transcript') && (
              <div className="space-y-3 bg-slate-50/50 p-4 sm:p-5 rounded-2xl border border-slate-200 animate-in fade-in duration-200">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
                    <span>Floor Dialogue Transcript</span>
                  </div>
                  {currentStep.id === 'step-lucky-pencil' && (
                    <button
                      type="button"
                      onClick={() => setScene1AudioMode('studio')}
                      className="text-xs text-blue-600 hover:underline flex items-center gap-1 font-semibold"
                    >
                      <Headphones className="w-3 h-3" />
                      Switch back to Voiced Scene
                    </button>
                  )}
                </div>

                {currentStep.dialogue && currentStep.dialogue.map((line, lIdx) => {
                  const isSusan = line.speaker === 'Susan';
                  const isGrace = line.speaker === 'Grace';
                  const isKevin = line.speaker === 'Kevin';

                  return (
                    <div 
                      key={lIdx}
                      className={`flex items-start gap-3 ${
                        isSusan ? 'flex-row' : 'flex-row-reverse sm:flex-row'
                      }`}
                    >
                      {/* Character Avatar Tag */}
                      <div className="shrink-0 flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-xs text-white ${
                          isSusan 
                            ? 'bg-emerald-600' 
                            : isGrace 
                            ? 'bg-blue-600' 
                            : 'bg-amber-600'
                        }`}>
                          {isSusan ? 'SP' : isGrace ? 'GDP' : 'KB'}
                        </div>
                        <span className="text-[9px] font-bold text-slate-500 mt-0.5">
                          {line.speaker}
                        </span>
                      </div>

                      {/* Speech Bubble */}
                      <div className={`flex-1 p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed border ${
                        isSusan 
                          ? 'bg-emerald-50/90 border-emerald-200 text-emerald-950 rounded-tl-xs' 
                          : isGrace 
                          ? 'bg-blue-50/90 border-blue-200 text-blue-950 rounded-tr-xs' 
                          : 'bg-amber-50/90 border-amber-200 text-amber-950 rounded-tl-xs'
                      }`}>
                        <p className="font-medium text-slate-800">{line.text}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Interactive checks per step */}
            {/* Scene 2 Interactive: Unambiguous Date Format */}
            {currentStep.id === 'step-pen-check' && (
              <div className="p-5 rounded-2xl bg-slate-50 border-2 border-slate-200 space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-blue-800">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span>Interactive Check: Select the Unambiguous Regulatory Date</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700">
                  Grace reminds Susan that international auditors inspect AnyPharm. Which date format removes any doubt between day and month?
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { label: '09/02/2026', desc: 'Numeric (Month/Day)', correct: false, note: 'Could be read as Feb 9 in Europe or Sept 2 in the US!' },
                    { label: '02-SEP-2026', desc: 'DD-MMM-YYYY (Alpha Month)', correct: true, note: 'Approved! 3-letter month is universally unambiguous worldwide.' },
                    { label: 'Sept 2nd, 26', desc: 'Informal English', correct: false, note: 'Informal abbreviations and missing century digits violate GDP standards.' }
                  ].map((fmt, fIdx) => (
                    <button
                      key={fIdx}
                      onClick={() => setSelectedDateFormat(fmt.label)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        selectedDateFormat === fmt.label
                          ? fmt.correct 
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-2 ring-emerald-400' 
                            : 'bg-rose-50 border-rose-500 text-rose-950 ring-2 ring-rose-400'
                          : 'bg-white border-slate-200 hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      <div className="font-mono font-bold text-sm">{fmt.label}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{fmt.desc}</div>
                      {selectedDateFormat === fmt.label && (
                        <div className={`mt-2 text-[11px] font-medium ${fmt.correct ? 'text-emerald-700' : 'text-rose-700'}`}>
                          {fmt.note}
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Scene 3 Interactive: Direct Entry at the Scale */}
            {currentStep.id === 'step-direct-entry' && (
              <div className="p-5 rounded-2xl bg-slate-50 border-2 border-slate-200 space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-blue-800">
                  <Scale className="w-4 h-4 text-blue-600" />
                  <span>Hands-On Simulation: Direct Entry on Official Run Sheet</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Digital Scale Readout */}
                  <div className="p-4 bg-slate-900 rounded-xl text-center border-2 border-slate-700 shadow-inner">
                    <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider block mb-1">
                      Calibrated Balance • ID: BAL-902-A
                    </span>
                    <div className="text-3xl font-mono font-black text-emerald-400 tracking-widest my-2">
                      18.50 g
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">
                      Material: Glucose Dehydrogenase Enzyme Lot #GDH-401
                    </span>
                  </div>

                  {/* Official Logsheet Form */}
                  <div className="p-4 bg-white rounded-xl border border-slate-300 shadow-xs">
                    <span className="text-[10px] font-mono uppercase font-bold text-blue-800 block mb-2">
                      AnyPharm Run Sheet • Form PR-GLU-9024 (Step 8.2)
                    </span>
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center justify-between p-2 bg-slate-50 rounded border border-slate-200">
                        <span className="text-slate-600">Specified Target:</span>
                        <span className="font-mono font-bold text-slate-800">18.40 – 18.60 g</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          placeholder="Type weight (e.g. 18.50)"
                          value={enteredWeight}
                          onChange={(e) => setEnteredWeight(e.target.value)}
                          className="flex-1 px-3 py-2 border rounded-lg font-mono text-xs focus:ring-2 focus:ring-blue-500 outline-hidden"
                        />
                        <button
                          onClick={() => setWeightSubmitted(true)}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-xs"
                        >
                          Record Directly
                        </button>
                      </div>
                    </div>

                    {weightSubmitted && (
                      <div className={`mt-3 p-2.5 rounded-lg text-xs font-medium ${
                        enteredWeight.trim() === '18.50'
                          ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                          : 'bg-amber-50 text-amber-900 border border-amber-200'
                      }`}>
                        {enteredWeight.trim() === '18.50' ? (
                          <span>✓ 18.50 g recorded directly at scale by SP at 08:30. No scrap paper needed!</span>
                        ) : (
                          <span>Note: Make sure to record the exact scale reading (18.50 g).</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Scene 4 Interactive: 4-Step Correction Tool */}
            {currentStep.id === 'step-mistake-fix' && (
              <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-50 to-blue-50 border-2 border-blue-300 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-blue-900">
                    <FileCheck2 className="w-4 h-4 text-blue-700" />
                    <span>Practice the 4-Step Correction with Susan</span>
                  </div>
                  <span className="text-[11px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                    Error: Wrote "53.5 psi" instead of "35.5 psi"
                  </span>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-300 shadow-sm space-y-4">
                  {/* The Document Line Simulator */}
                  <div className="p-4 bg-slate-50 border-2 border-dashed border-slate-300 rounded-lg flex flex-col items-center justify-center min-h-24">
                    <span className="text-[10px] uppercase font-mono text-slate-400 mb-2">
                      Official Sealing Pressure Cell (Target: 34.0 - 37.0 psi)
                    </span>

                    <div className="relative inline-block text-center font-mono">
                      {/* Step 2: Correct value written above */}
                      {step2Correction && (
                        <div className="text-sm font-bold text-blue-700 font-mono animate-in fade-in">
                          {step2Correction}
                        </div>
                      )}

                      {/* Original Error with Step 1 strike */}
                      <div className="relative inline-block my-1">
                        <span className="text-2xl font-black text-slate-800 tracking-wider">
                          53.5 psi
                        </span>
                        {step1Struck && (
                          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-blue-700 -translate-y-1/2"></div>
                        )}
                      </div>

                      {/* Step 3 & 4: Initials, Date, Reason */}
                      {(step3Signed || step4Reason) && (
                        <div className="text-xs font-mono font-bold text-blue-900 flex items-center justify-center gap-2 mt-1">
                          {step4Reason && (
                            <span className="bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded text-[10px]">
                              {step4Reason}
                            </span>
                          )}
                          {step3Signed && <span>SP 02-SEP-2026</span>}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 4 Interactive Buttons corresponding to Grace's 4 Rules */}
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5">
                    {/* Rule 1 */}
                    <button
                      onClick={() => setStep1Struck(true)}
                      className={`p-3 rounded-lg border text-left text-xs transition-all ${
                        step1Struck 
                          ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold' 
                          : 'bg-white border-slate-300 hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      <div className="font-bold text-[11px] mb-1 text-slate-500">Rule 1</div>
                      <div>{step1Struck ? '✓ Single Line Struck' : '1. Single Line Strike'}</div>
                    </button>

                    {/* Rule 2 */}
                    <button
                      disabled={!step1Struck}
                      onClick={() => setStep2Correction('35.5 psi')}
                      className={`p-3 rounded-lg border text-left text-xs transition-all ${
                        !step1Struck 
                          ? 'opacity-40 cursor-not-allowed bg-slate-100' 
                          : step2Correction 
                          ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold' 
                          : 'bg-white border-slate-300 hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      <div className="font-bold text-[11px] mb-1 text-slate-500">Rule 2</div>
                      <div>{step2Correction ? '✓ Wrote "35.5 psi"' : '2. Write Correction'}</div>
                    </button>

                    {/* Rule 3 */}
                    <button
                      disabled={!step2Correction}
                      onClick={() => setStep3Signed(true)}
                      className={`p-3 rounded-lg border text-left text-xs transition-all ${
                        !step2Correction 
                          ? 'opacity-40 cursor-not-allowed bg-slate-100' 
                          : step3Signed 
                          ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold' 
                          : 'bg-white border-slate-300 hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      <div className="font-bold text-[11px] mb-1 text-slate-500">Rule 3</div>
                      <div>{step3Signed ? '✓ SP 02-SEP-2026' : '3. Initial & Date'}</div>
                    </button>

                    {/* Rule 4 */}
                    <button
                      disabled={!step3Signed}
                      onClick={() => {
                        setStep4Reason('TE');
                        confetti({ particleCount: 40, spread: 60, origin: { y: 0.8 } });
                      }}
                      className={`p-3 rounded-lg border text-left text-xs transition-all ${
                        !step3Signed 
                          ? 'opacity-40 cursor-not-allowed bg-slate-100' 
                          : step4Reason 
                          ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold' 
                          : 'bg-white border-slate-300 hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      <div className="font-bold text-[11px] mb-1 text-slate-500">Rule 4</div>
                      <div>{step4Reason ? '✓ Added "TE" Code' : '4. Reason Code (TE)'}</div>
                    </button>
                  </div>

                  {step1Struck && step2Correction && step3Signed && step4Reason && (
                    <div className="p-3 bg-emerald-100 border border-emerald-300 rounded-lg text-xs font-bold text-emerald-950 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>100% Compliant GDP Correction! Clean, legible, transparent, and fully traceable.</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Scene 5 Interactive: Single Diagonal Line on Unused Rows */}
            {currentStep.id === 'step-blanks-z-stripe' && (
              <div className="p-5 rounded-2xl bg-slate-50 border-2 border-slate-200 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-blue-800">
                      <FileCheck2 className="w-4 h-4 text-blue-600" />
                      <span>Hands-On: Close the Unused Rows on Lot #GLU-9024</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Order finished early at 13:00. Rows 7 through 10 are completely blank.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      const next = !zStripeApplied;
                      setZStripeApplied(next);
                      if (next) {
                        updateUnusedBounds();
                        confetti({ particleCount: 35, spread: 50, origin: { y: 0.8 } });
                      }
                    }}
                    className={`px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors shrink-0 shadow-xs ${
                      zStripeApplied 
                        ? 'bg-slate-200 text-slate-700 hover:bg-slate-300' 
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {zStripeApplied ? 'Reset Table' : 'Apply Single Diagonal Line'}
                  </button>
                </div>

                {/* Table Simulation with explicitly rendered blank rows */}
                <div 
                  ref={tableContainerRef} 
                  className="relative overflow-x-auto border border-slate-300 rounded-xl bg-white shadow-xs"
                >
                  <table className="w-full text-xs text-left border-collapse min-w-[580px]">
                    <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-300">
                      <tr>
                        <th className="p-2.5 border-r border-slate-200 w-20">Row #</th>
                        <th className="p-2.5 border-r border-slate-200 w-24">Hour</th>
                        <th className="p-2.5 border-r border-slate-200">Seal Integrity Check</th>
                        <th className="p-2.5 border-r border-slate-200 w-28">Defect Count</th>
                        <th className="p-2.5 w-36">Operator Initials</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 font-mono text-[11px]">
                      <tr>
                        <td className="p-2 border-r border-slate-200 text-slate-500 font-semibold">Row 1</td>
                        <td className="p-2 border-r border-slate-200">08:00</td>
                        <td className="p-2 border-r border-slate-200 text-emerald-700 font-bold">Pass (0 leaks)</td>
                        <td className="p-2 border-r border-slate-200">0</td>
                        <td className="p-2">SP 02-SEP-2026</td>
                      </tr>
                      <tr>
                        <td className="p-2 border-r border-slate-200 text-slate-500 font-semibold">Row 2</td>
                        <td className="p-2 border-r border-slate-200">09:00</td>
                        <td className="p-2 border-r border-slate-200 text-emerald-700 font-bold">Pass (0 leaks)</td>
                        <td className="p-2 border-r border-slate-200">0</td>
                        <td className="p-2">SP 02-SEP-2026</td>
                      </tr>
                      <tr>
                        <td className="p-2 border-r border-slate-200 text-slate-500 font-semibold">Row 3</td>
                        <td className="p-2 border-r border-slate-200">10:00</td>
                        <td className="p-2 border-r border-slate-200 text-emerald-700 font-bold">Pass (0 leaks)</td>
                        <td className="p-2 border-r border-slate-200">0</td>
                        <td className="p-2">GDP 02-SEP-2026</td>
                      </tr>
                      <tr>
                        <td className="p-2 border-r border-slate-200 text-slate-500 font-semibold">Row 4</td>
                        <td className="p-2 border-r border-slate-200">11:00</td>
                        <td className="p-2 border-r border-slate-200 text-emerald-700 font-bold">Pass (0 leaks)</td>
                        <td className="p-2 border-r border-slate-200">0</td>
                        <td className="p-2">SP 02-SEP-2026</td>
                      </tr>
                      <tr>
                        <td className="p-2 border-r border-slate-200 text-slate-500 font-semibold">Row 5</td>
                        <td className="p-2 border-r border-slate-200">12:00</td>
                        <td className="p-2 border-r border-slate-200 text-emerald-700 font-bold">Pass (0 leaks)</td>
                        <td className="p-2 border-r border-slate-200">0</td>
                        <td className="p-2">GDP 02-SEP-2026</td>
                      </tr>
                      <tr>
                        <td className="p-2 border-r border-slate-200 text-slate-500 font-semibold">Row 6</td>
                        <td className="p-2 border-r border-slate-200">13:00</td>
                        <td className="p-2 border-r border-slate-200 text-emerald-700 font-bold">Pass (0 leaks)</td>
                        <td className="p-2 border-r border-slate-200">0</td>
                        <td className="p-2">SP 02-SEP-2026</td>
                      </tr>
                    </tbody>

                    {/* Unused Rows 7 through 10 - Explicitly shown blank lines */}
                    <tbody 
                      ref={unusedTbodyRef} 
                      className="divide-y divide-slate-200 font-mono text-[11px] bg-slate-50/40"
                    >
                      <tr className="h-9">
                        <td className="p-2 border-r border-slate-200 text-slate-400 font-semibold">Row 7</td>
                        <td className="p-2 border-r border-slate-200 text-slate-400">14:00</td>
                        <td className="p-2 border-r border-slate-200 text-slate-300 italic"> </td>
                        <td className="p-2 border-r border-slate-200 text-slate-300"> </td>
                        <td className="p-2 text-slate-300"> </td>
                      </tr>
                      <tr className="h-9">
                        <td className="p-2 border-r border-slate-200 text-slate-400 font-semibold">Row 8</td>
                        <td className="p-2 border-r border-slate-200 text-slate-400">15:00</td>
                        <td className="p-2 border-r border-slate-200 text-slate-300 italic"> </td>
                        <td className="p-2 border-r border-slate-200 text-slate-300"> </td>
                        <td className="p-2 text-slate-300"> </td>
                      </tr>
                      <tr className="h-9">
                        <td className="p-2 border-r border-slate-200 text-slate-400 font-semibold">Row 9</td>
                        <td className="p-2 border-r border-slate-200 text-slate-400">16:00</td>
                        <td className="p-2 border-r border-slate-200 text-slate-300 italic"> </td>
                        <td className="p-2 border-r border-slate-200 text-slate-300"> </td>
                        <td className="p-2 text-slate-300"> </td>
                      </tr>
                      <tr className="h-9">
                        <td className="p-2 border-r border-slate-200 text-slate-400 font-semibold">Row 10</td>
                        <td className="p-2 border-r border-slate-200 text-slate-400">17:00</td>
                        <td className="p-2 border-r border-slate-200 text-slate-300 italic"> </td>
                        <td className="p-2 border-r border-slate-200 text-slate-300"> </td>
                        <td className="p-2 text-slate-300"> </td>
                      </tr>
                    </tbody>
                  </table>

                  {/* Single Diagonal Line Overlay across Rows 7 through 10 */}
                  {zStripeApplied && (
                    <div
                      className="absolute pointer-events-none z-10 animate-in fade-in duration-200"
                      style={{
                        top: unusedRect ? `${unusedRect.top}px` : 'auto',
                        bottom: unusedRect ? 'auto' : 0,
                        left: 0,
                        width: unusedRect?.width ? `${unusedRect.width}px` : '100%',
                        height: unusedRect ? `${unusedRect.height}px` : '144px',
                      }}
                    >
                      <svg className="w-full h-full" preserveAspectRatio="none">
                        <line
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="100%"
                          stroke="#2563eb"
                          strokeWidth="2.5"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center p-2">
                        <span className="bg-white/95 border-2 border-blue-600 text-blue-900 px-3 py-1.5 rounded-lg shadow-md font-mono text-xs font-bold text-center max-w-[90%]">
                          N/A — Order target reached (5,000 vials complete at 13:00). SP 02-SEP-2026
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Status Guidance */}
                {zStripeApplied ? (
                  <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-lg text-xs font-bold text-emerald-950 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>✓ Compliant Closure: Unused rows 7 through 10 are cleanly closed with a single diagonal line, "N/A", explanation, initials (SP), and date.</span>
                  </div>
                ) : (
                  <div className="p-3 bg-amber-50 border border-amber-300 rounded-lg text-xs text-amber-900 flex items-center gap-2 font-medium">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Warning: Rows 7 through 10 are open and blank. Under GDP, leaving blank lines invites unauthorized entries and triggers audit non-conformances.</span>
                  </div>
                )}
              </div>
            )}

            {/* Scene 6 Interactive: Kevin's Proxy Request */}
            {currentStep.id === 'step-proxy-signing' && (
              <div className="p-5 rounded-2xl bg-slate-50 border-2 border-slate-200 space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-blue-800">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  <span>Interactive Integrity Dilemma: How Should Susan Respond?</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700">
                  Kevin says: <em>"My bus is pulling up! Can you just sign my initials ‘KB’ on line 14? I did the wash!"</em>
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={() => setProxyChoice('agree')}
                    className={`p-3.5 rounded-xl border text-left text-xs transition-all ${
                      proxyChoice === 'agree' 
                        ? 'bg-rose-50 border-rose-500 text-rose-950 ring-2 ring-rose-400' 
                        : 'bg-white border-slate-300 hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <div className="font-bold text-rose-700 mb-1">Option A: Agree as a favor</div>
                    <p className="text-slate-600 text-[11px] leading-relaxed">
                      "Sure Kevin, I saw you holding the spray bottle, so I'll write 'KB' for you so you catch your bus."
                    </p>
                    {proxyChoice === 'agree' && (
                      <div className="mt-2 text-[11px] font-bold text-rose-800">
                        ✕ CRITICAL VIOLATION: Proxy signing is criminal falsification under 18 U.S.C. § 1001.
                      </div>
                    )}
                  </button>

                  <button
                    onClick={() => {
                      setProxyChoice('refuse');
                      confetti({ particleCount: 35, spread: 50, origin: { y: 0.8 } });
                    }}
                    className={`p-3.5 rounded-xl border text-left text-xs transition-all ${
                      proxyChoice === 'refuse' 
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-2 ring-emerald-400' 
                        : 'bg-white border-slate-300 hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <div className="font-bold text-emerald-700 mb-1">Option B: Politely decline & notify lead</div>
                    <p className="text-slate-600 text-[11px] leading-relaxed">
                      "I can't sign your initials, Kevin. I'll alert the shift supervisor right now so they can inspect and sign officially."
                    </p>
                    {proxyChoice === 'refuse' && (
                      <div className="mt-2 text-[11px] font-bold text-emerald-800">
                        ✓ COMPLIANT! Susan upholds ALCOA Attributability and protects both operators and AnyPharm.
                      </div>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Scene 7 Interactive: Badge Reveal */}
            {currentStep.id === 'step-debrief-badge' && (
              <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-900 to-indigo-900 text-white text-center space-y-4 shadow-md">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-700 text-blue-200 text-xs font-mono font-bold uppercase tracking-widest">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  The Shift Mystery Revealed
                </div>
                <h4 className="text-xl sm:text-2xl font-black text-white">
                  Why does everyone call her Grace?
                </h4>
                <p className="text-xs sm:text-sm text-blue-200 max-w-lg mx-auto leading-relaxed">
                  Susan looks closely at Grace’s AnyPharm employee photo identification card...
                </p>

                <div className="max-w-xs mx-auto">
                  <button
                    onClick={() => {
                      setBadgeRevealed(true);
                      confetti({ particleCount: 60, spread: 70, origin: { y: 0.7 } });
                    }}
                    className={`w-full p-4 rounded-xl border-2 transition-all cursor-pointer ${
                      badgeRevealed 
                        ? 'bg-white text-blue-950 border-amber-400 shadow-xl' 
                        : 'bg-blue-800/80 border-blue-500 hover:bg-blue-800 text-white'
                    }`}
                  >
                    {!badgeRevealed ? (
                      <div className="flex flex-col items-center gap-2">
                        <Sparkle className="w-6 h-6 text-amber-300 animate-bounce" />
                        <span className="font-bold text-xs uppercase tracking-wider">
                          Click to Inspect Grace’s ID Badge
                        </span>
                      </div>
                    ) : (
                      <div className="space-y-2 animate-in zoom-in-95 duration-200">
                        <div className="w-12 h-12 mx-auto rounded-full bg-blue-600 text-white font-black text-sm flex items-center justify-center border-2 border-amber-400">
                          G.D.P.
                        </div>
                        <div className="text-sm font-black text-slate-900">
                          Grace Danielle Porter
                        </div>
                        <div className="text-[11px] font-mono text-blue-700 font-bold">
                          Initials: G &bull; D &bull; P
                        </div>
                        <div className="text-[10px] text-slate-500">
                          Senior Lead • AnyPharm Diabetes Care
                        </div>
                        <div className="mt-2 text-xs font-bold text-emerald-700 bg-emerald-50 p-1.5 rounded">
                          "Good Documentation Practices" in human form!
                        </div>
                      </div>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: RULES & TAKEAWAYS VIEW */}
        {activeTab === 'rules' && (
          <div className="space-y-6">
            {/* The Golden Rule in Plain English */}
            <div className="p-4 bg-blue-50/80 rounded-xl border-l-4 border-blue-600 border border-blue-200">
              <div className="flex items-center gap-2 text-blue-900 font-bold text-xs uppercase tracking-wider mb-1">
                <Lightbulb className="w-4 h-4 text-blue-600" />
                <span>The Golden Rule in Plain English</span>
              </div>
              <p className="text-sm font-bold text-slate-800 leading-snug">
                {currentStep.ruleInPlainEnglish}
              </p>
            </div>

            {/* Do Column vs Never Do Column */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200">
                <div className="flex items-center gap-2 font-bold text-emerald-900 text-xs uppercase tracking-wider mb-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>What You Must Do (Compliant)</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-700">
                  {currentStep.whatYouMustDo.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-rose-50/70 border border-rose-200">
                <div className="flex items-center gap-2 font-bold text-rose-900 text-xs uppercase tracking-wider mb-3">
                  <XCircle className="w-4 h-4 text-rose-600" />
                  <span>What You Must NEVER Do (Violation)</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-700">
                  {currentStep.whatYouMustNeverDo.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-rose-600 font-bold mt-0.5">✕</span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Everyday Analogy & Common Trap */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-xs space-y-1">
                <span className="font-bold text-amber-900 uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-amber-700" />
                  Everyday Analogy:
                </span>
                <p className="text-slate-700 leading-relaxed font-medium">
                  {currentStep.floorAnalogy}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-purple-50/70 border border-purple-200 text-xs space-y-1">
                <span className="font-bold text-purple-900 uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-purple-700" />
                  The Common Beginner Trap:
                </span>
                <p className="text-slate-700 leading-relaxed font-medium">
                  {currentStep.commonTrap}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* SHIFT REALITY CHECK (PRACTICE QUIZ) */}
        {activeQuiz && (
          <div className="p-5 rounded-2xl bg-slate-50 border-2 border-slate-200 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider">
              <HelpCircle className="w-4 h-4 text-blue-600" />
              <span>Shift Reality Check (Practice Question for Scene {currentStep.stepNumber})</span>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed">
              {activeQuiz.question}
            </p>

            <div className="space-y-2">
              {activeQuiz.options.map((option, optIdx) => {
                const isSelected = quizAnswerSelected === optIdx;
                let btnStyle = 'bg-white border-slate-200 hover:bg-slate-100 text-slate-700';

                if (isSelected) {
                  btnStyle = option.isCorrect
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold ring-2 ring-emerald-400'
                    : 'bg-rose-50 border-rose-500 text-rose-950 font-bold ring-2 ring-rose-400';
                }

                return (
                  <button
                    key={optIdx}
                    onClick={() => {
                      setQuizAnswerSelected(optIdx);
                      if (option.isCorrect) {
                        confetti({ particleCount: 20, spread: 45, origin: { y: 0.85 } });
                      }
                    }}
                    className={`w-full text-left p-3 rounded-lg border text-xs transition-all flex items-start gap-2.5 ${btnStyle}`}
                  >
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center font-mono text-[10px] shrink-0 mt-0.5 ${
                      isSelected
                        ? option.isCorrect ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
                        : 'border border-slate-300 text-slate-500'
                    }`}>
                      {String.fromCharCode(65 + optIdx)}
                    </div>
                    <span className="leading-relaxed">{option.text}</span>
                  </button>
                );
              })}
            </div>

            {quizAnswerSelected !== null && (
              <div className={`p-3 rounded-lg text-xs font-medium border ${
                activeQuiz.options[quizAnswerSelected].isCorrect
                  ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                  : 'bg-rose-50 text-rose-900 border-rose-200'
              }`}>
                {activeQuiz.options[quizAnswerSelected].feedback}
              </div>
            )}
          </div>
        )}

        {/* Footer Navigation Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200">
          <button
            onClick={handlePrevStep}
            disabled={isFirstStep}
            className={`px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors ${
              isFirstStep
                ? 'text-slate-300 cursor-not-allowed'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            Previous Scene
          </button>

          <div className="flex items-center gap-3">
            {isLastStep ? (
              <button
                onClick={onProceedToAlcoa}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-widest rounded-lg shadow-md transition-all flex items-center gap-2"
              >
                <Award className="w-4 h-4" />
                Susan’s Shift Complete • Proceed to ALCOA+
              </button>
            ) : (
              <button
                onClick={handleNextStep}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-widest rounded-lg shadow-md transition-all flex items-center gap-2"
              >
                Continue to Scene {currentStepIndex + 2} of {NEW_HIRE_SHIFT_STEPS.length}
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
