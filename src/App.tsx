/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { SectionId } from './types';
import { Header } from './components/Header';
import { OverviewModule } from './components/OverviewModule';
import { AlcoaModule } from './components/AlcoaModule';
import { GdpRulesModule } from './components/GdpRulesModule';
import { CorrectionsLab } from './components/CorrectionsLab';
import { RecordAuditInteractive } from './components/RecordAuditInteractive';
import { QuizModule } from './components/QuizModule';
import { CertificateView } from './components/CertificateView';
import { ReferenceDrawer } from './components/ReferenceDrawer';
import { NewHireWalkthrough } from './components/NewHireWalkthrough';
import { ShieldCheck, BookMarked, HelpCircle, CheckCircle } from 'lucide-react';

export default function App() {
  const [currentSection, setCurrentSection] = useState<SectionId>('overview');
  const [completedSections, setCompletedSections] = useState<Set<SectionId>>(new Set(['overview']));
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [quizPassed, setQuizPassed] = useState<boolean>(false);
  const [traineeName, setTraineeName] = useState<string>('Susan Pulido');
  const [completionDate] = useState<string>('02-SEP-2026');
  const [certificateId] = useState<string>('GDP-2026-0902-8821');
  const [isReferenceOpen, setIsReferenceOpen] = useState<boolean>(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentSection]);

  const markSectionCompleted = (sectionId: SectionId) => {
    setCompletedSections((prev) => new Set(prev).add(sectionId));
  };

  const handleQuizComplete = (score: number, passed: boolean) => {
    setQuizScore(score);
    setQuizPassed(passed);
    if (passed) {
      markSectionCompleted('quiz');
      markSectionCompleted('certificate');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-blue-100 selection:text-blue-900">
      {/* Navigation & Header */}
      <Header
        currentSection={currentSection}
        onSelectSection={setCurrentSection}
        completedSections={completedSections}
        quizScore={quizScore}
        quizPassed={quizPassed}
        onOpenReference={() => setIsReferenceOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div key={currentSection} className="w-full animate-section-enter">
          {currentSection === 'overview' && (
            <OverviewModule
              onStartTraining={() => {
                markSectionCompleted('overview');
                setCurrentSection('story');
              }}
              onJumpToCorrections={() => {
                markSectionCompleted('overview');
                setCurrentSection('corrections_lab');
              }}
              onJumpToQuiz={() => {
                setCurrentSection('quiz');
              }}
            />
          )}

          {currentSection === 'story' && (
            <div className="space-y-6">
              <NewHireWalkthrough
                onProceedToAlcoa={() => {
                  markSectionCompleted('story');
                  setCurrentSection('alcoa');
                }}
                onCompleteWalkthrough={() => {
                  markSectionCompleted('story');
                }}
              />
            </div>
          )}

          {currentSection === 'alcoa' && (
            <AlcoaModule
              onComplete={() => markSectionCompleted('alcoa')}
              onNextSection={() => {
                markSectionCompleted('alcoa');
                setCurrentSection('rules');
              }}
            />
          )}

          {currentSection === 'rules' && (
            <GdpRulesModule
              onComplete={() => markSectionCompleted('rules')}
              onNextSection={() => {
                markSectionCompleted('rules');
                setCurrentSection('corrections_lab');
              }}
            />
          )}

          {currentSection === 'corrections_lab' && (
            <CorrectionsLab
              onComplete={() => markSectionCompleted('corrections_lab')}
              onNextSection={() => {
                markSectionCompleted('corrections_lab');
                setCurrentSection('audit_sim');
              }}
            />
          )}

          {currentSection === 'audit_sim' && (
            <RecordAuditInteractive
              onComplete={() => markSectionCompleted('audit_sim')}
              onNextSection={() => {
                markSectionCompleted('audit_sim');
                setCurrentSection('quiz');
              }}
            />
          )}

          {currentSection === 'quiz' && (
            <QuizModule
              onQuizComplete={handleQuizComplete}
              onViewCertificate={() => setCurrentSection('certificate')}
              traineeName={traineeName}
              setTraineeName={setTraineeName}
            />
          )}

          {currentSection === 'certificate' && (
            <CertificateView
              traineeName={traineeName}
              setTraineeName={setTraineeName}
              score={quizScore ?? 100}
              passed={quizPassed}
              completionDate={completionDate}
              certificateId={certificateId}
              onBackToCourse={() => setCurrentSection('overview')}
            />
          )}
        </div>
      </main>

      {/* Quick Reference Slide-Over Drawer */}
      <ReferenceDrawer
        isOpen={isReferenceOpen}
        onClose={() => setIsReferenceOpen(false)}
      />

      {/* Footer */}
      <footer className="no-print border-t-2 border-slate-200 bg-white py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 font-medium">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span className="font-semibold text-slate-700">Good Documentation Practices (GDP) Regulatory Compliance Training</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400 font-mono text-[11px]">
            <span>FDA 21 CFR § 211.194</span>
            <span>&bull;</span>
            <span>EU GMP Annex 11</span>
            <span>&bull;</span>
            <span>WHO TRS 996</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
