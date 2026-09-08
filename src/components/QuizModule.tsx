import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/gdpData';
import { QuizQuestion, QuizVisualOption } from '../types';
import { VisualSnippetRenderer } from './VisualSnippetRenderer';
import { 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  ArrowRight, 
  ArrowLeft, 
  RotateCcw, 
  Award, 
  ShieldCheck,
  Sparkles,
  BookOpen
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface Props {
  onQuizComplete: (score: number, passed: boolean) => void;
  onViewCertificate: () => void;
  traineeName: string;
  setTraineeName: (name: string) => void;
}

export const QuizModule: React.FC<Props> = ({
  onQuizComplete,
  onViewCertificate,
  traineeName,
  setTraineeName
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [revealedQuestions, setRevealedQuestions] = useState<Set<string>>(new Set());
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex];
  const totalQuestions = QUIZ_QUESTIONS.length;

  const handleSelectOption = (questionId: string, optionId: string) => {
    // If question is not yet locked/submitted, update selected answer
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionId
    }));
  };

  const handleConfirmAnswer = (questionId: string) => {
    if (!selectedAnswers[questionId]) return;
    setRevealedQuestions((prev) => new Set(prev).add(questionId));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      finishQuiz();
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const calculateScore = () => {
    let correctCount = 0;
    QUIZ_QUESTIONS.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctOptionId) {
        correctCount += 1;
      }
    });
    const percentage = Math.round((correctCount / totalQuestions) * 100);
    const passed = percentage >= 80;
    return { correctCount, percentage, passed };
  };

  const finishQuiz = () => {
    // Reveal all questions
    const allIds = new Set(QUIZ_QUESTIONS.map((q) => q.id));
    setRevealedQuestions(allIds);
    setQuizFinished(true);

    const { percentage, passed } = calculateScore();
    onQuizComplete(percentage, passed);

    if (passed) {
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Fallback gracefully
      }
    }
  };

  const handleRetakeQuiz = () => {
    setSelectedAnswers({});
    setRevealedQuestions(new Set());
    setQuizFinished(false);
    setCurrentQuestionIndex(0);
  };

  const isCurrentRevealed = revealedQuestions.has(currentQuestion.id);
  const currentSelectedOptionId = selectedAnswers[currentQuestion.id];
  const answeredCount = Object.keys(selectedAnswers).length;

  // Render Completion Summary Screen if finished
  if (quizFinished) {
    const { correctCount, percentage, passed } = calculateScore();

    return (
      <div className="space-y-6 animate-in fade-in duration-300">
        {/* Results Banner */}
        <div className={`p-8 rounded-2xl border-2 text-center relative overflow-hidden bg-white shadow-sm ${
          passed 
            ? 'border-emerald-500' 
            : 'border-red-400'
        }`}>
          <div className="max-w-xl mx-auto space-y-4 relative z-10">
            <div className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center ${
              passed ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600'
            }`}>
              {passed ? (
                <Award className="w-10 h-10" />
              ) : (
                <XCircle className="w-10 h-10" />
              )}
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
              {passed ? 'GDP Qualification Passed!' : 'Review & Retake Required'}
            </h2>

            <p className="text-xs sm:text-sm text-slate-600">
              {passed
                ? 'Congratulations! You have demonstrated thorough mastery of Good Documentation Practices, ALCOA+ principles, and compliant error correction procedures.'
                : 'The regulatory passing threshold is 80%. Review the questions and explanations below to strengthen your understanding before retaking.'}
            </p>

            <div className="flex items-center justify-center gap-6 py-4 border-y border-slate-100 font-mono">
              <div>
                <span className="text-xs text-slate-400 block uppercase tracking-wider">FINAL SCORE</span>
                <span className={`text-3xl font-black ${passed ? 'text-emerald-600' : 'text-red-600'}`}>
                  {percentage}%
                </span>
              </div>
              <div className="w-px h-10 bg-slate-200" />
              <div>
                <span className="text-xs text-slate-400 block uppercase tracking-wider">CORRECT ANSWERS</span>
                <span className="text-3xl font-black text-slate-800">
                  {correctCount} / {totalQuestions}
                </span>
              </div>
            </div>

            {/* Trainee Name for Certificate */}
            {passed && (
              <div className="bg-slate-50 p-4 rounded-xl text-left border border-slate-200">
                <label className="text-xs font-bold text-slate-700 block mb-1 uppercase tracking-wider">
                  Name for Official Certificate of Completion:
                </label>
                <input
                  type="text"
                  value={traineeName}
                  onChange={(e) => setTraineeName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              {passed && (
                <button
                  onClick={onViewCertificate}
                  className="px-8 py-3 bg-blue-600 text-white font-bold text-xs uppercase tracking-widest rounded-lg shadow-lg shadow-blue-200 hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <Award className="w-4 h-4" />
                  View &amp; Print Official Certificate
                </button>
              )}

              <button
                onClick={handleRetakeQuiz}
                className="px-6 py-2.5 bg-white border-2 border-blue-600 text-blue-600 font-bold text-xs uppercase tracking-widest rounded-lg hover:bg-blue-50 transition-colors flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Retake Assessment
              </button>
            </div>
          </div>
        </div>

        {/* Full Question Breakdown & Review List */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border-2 border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">
              Comprehensive Review: All Questions &amp; Rationale
            </h3>
            <span className="text-xs font-mono text-slate-500">
              FDA 21 CFR Part 211 Compliance Review
            </span>
          </div>

          <div className="space-y-8">
            {QUIZ_QUESTIONS.map((q, idx) => {
              const selectedId = selectedAnswers[q.id];
              const isUserCorrect = selectedId === q.correctOptionId;

              return (
                <div
                  key={q.id}
                  className={`p-5 rounded-xl border-2 ${
                    isUserCorrect
                      ? 'border-emerald-200 bg-emerald-50/20'
                      : 'border-red-200 bg-red-50/20'
                  } space-y-4`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-slate-500">
                      QUESTION {idx + 1} OF {totalQuestions} &bull; {q.category.toUpperCase()}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded ${
                        isUserCorrect
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {isUserCorrect ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" /> Correct
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3.5 h-3.5" /> Incorrect
                        </>
                      )}
                    </span>
                  </div>

                  <h4 className="font-bold text-slate-900 text-base">{q.title}</h4>
                  <p className="text-xs text-slate-600 italic bg-white p-3 rounded-lg border border-slate-200">
                    &ldquo;{q.scenarioText}&rdquo;
                  </p>

                  {/* Options display with correct vs incorrect callouts */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                    {q.options.map((opt) => {
                      const isChosen = opt.id === selectedId;
                      const isOptionCorrect = opt.isCorrect;

                      return (
                        <div
                          key={opt.id}
                          className={`p-3 rounded-xl border-2 ${
                            isOptionCorrect
                              ? 'border-emerald-500 bg-emerald-50/70 ring-1 ring-emerald-400'
                              : isChosen
                              ? 'border-red-500 bg-red-50/70 ring-1 ring-red-400'
                              : 'border-slate-200 bg-white opacity-80'
                          } space-y-2`}
                        >
                          <div className="flex items-center justify-between text-xs font-bold">
                            <span className={isOptionCorrect ? 'text-emerald-900' : 'text-slate-800'}>
                              {opt.label}
                            </span>
                            {isOptionCorrect && (
                              <span className="text-[10px] bg-emerald-200 text-emerald-900 px-1.5 py-0.2 rounded font-mono">
                                Compliant GDP
                              </span>
                            )}
                            {isChosen && !isOptionCorrect && (
                              <span className="text-[10px] bg-red-200 text-red-900 px-1.5 py-0.2 rounded font-mono">
                                Your Selection
                              </span>
                            )}
                          </div>

                          <VisualSnippetRenderer
                            snippet={opt.snippet}
                            showStatusBadge={false}
                          />

                          <p className="text-[11px] text-slate-700 leading-normal">
                            {opt.explanation}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  {/* Regulatory Rationale Box */}
                  <div className="p-3 bg-blue-50/70 rounded-lg border border-blue-200 text-xs text-blue-950 space-y-1">
                    <div className="font-bold flex items-center justify-between">
                      <span>Regulatory Requirement: {q.rationale.regulatoryRequirement}</span>
                      <span className="font-mono text-blue-800 font-bold">{q.rationale.cfrCitation}</span>
                    </div>
                    <p className="text-slate-700 leading-relaxed">
                      {q.rationale.whyCorrect}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Active Interactive Quiz Question View
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Quiz Header & Progress */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border-2 border-slate-200 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-600 uppercase tracking-widest">
              <ShieldCheck className="w-4 h-4" />
              <span>GDP Qualification Assessment &bull; Section 06</span>
            </div>
            <h2 className="text-2xl font-extrabold text-slate-800 mt-1">
              Knowledge &amp; Visual Document Recognition Quiz
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold text-slate-400">
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </span>
            <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-md bg-blue-50 text-blue-800 border border-blue-200">
              {answeredCount} / {totalQuestions} Answered
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mt-4">
          <div
            className="h-full bg-blue-600 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Current Question Card */}
      <div className="bg-white rounded-2xl border-2 border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        {/* Scenario Box */}
        <div className="space-y-2">
          <span className="text-xs font-mono font-bold text-blue-600 uppercase tracking-wider">
            Scenario {currentQuestionIndex + 1}
          </span>
          <h3 className="text-xl font-bold text-slate-900">{currentQuestion.title}</h3>
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
            {currentQuestion.scenarioText}
          </div>
          <p className="text-sm font-bold text-slate-900 pt-1">
            {currentQuestion.questionPrompt}
          </p>
        </div>

        {/* Visual Options Grid (Showing simulated document cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentQuestion.options.map((opt) => {
            const isSelected = currentSelectedOptionId === opt.id;
            const isRevealed = isCurrentRevealed;

            let borderClass = 'border-slate-200 hover:border-slate-300 bg-white';
            if (isRevealed) {
              if (opt.isCorrect) {
                borderClass = 'border-emerald-500 bg-emerald-50/40 ring-2 ring-emerald-300';
              } else if (isSelected) {
                borderClass = 'border-red-500 bg-red-50/40 ring-2 ring-red-300';
              } else {
                borderClass = 'border-slate-200 bg-slate-50/50 opacity-70';
              }
            } else if (isSelected) {
              borderClass = 'border-blue-600 bg-blue-50/30 ring-2 ring-blue-100';
            }

            return (
              <div
                key={opt.id}
                onClick={() => !isRevealed && handleSelectOption(currentQuestion.id, opt.id)}
                className={`p-4 rounded-xl border-2 transition-all flex flex-col justify-between cursor-pointer space-y-3 ${borderClass}`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center border text-[11px] font-bold shrink-0 ${
                          isSelected
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'border-slate-400 text-slate-600 bg-slate-100'
                        }`}
                      >
                        {isRevealed && opt.isCorrect ? '✓' : isRevealed && isSelected ? '✕' : ''}
                      </div>
                      <span className="text-xs font-bold text-slate-800 leading-tight">
                        {opt.label}
                      </span>
                    </div>
                  </div>

                  {/* Render Visual Document Specimen snippet */}
                  <VisualSnippetRenderer
                    snippet={opt.snippet}
                    showStatusBadge={isRevealed}
                    isCorrect={opt.isCorrect}
                    neutralizeSpoilers={!isRevealed}
                  />
                </div>

                {/* Feedback revealed on submission */}
                {isRevealed && (
                  <div
                    className={`p-3 rounded-lg text-xs leading-normal border ${
                      opt.isCorrect
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-medium'
                        : 'bg-red-50 border-red-300 text-red-950'
                    }`}
                  >
                    <div className="font-bold mb-0.5">
                      {opt.isCorrect ? '✓ GDP Compliant Option' : '✕ Regulatory Violation'}
                    </div>
                    {opt.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Detailed Regulatory Rationale Banner (Visible when answer confirmed) */}
        {isCurrentRevealed && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl space-y-2">
            <div className="flex items-center justify-between text-xs font-mono font-bold text-blue-900 border-b border-blue-200 pb-1.5">
              <span>Regulatory Standard: {currentQuestion.rationale.regulatoryRequirement}</span>
              <span className="bg-blue-200 px-2 py-0.5 rounded text-blue-950 font-bold">
                {currentQuestion.rationale.cfrCitation}
              </span>
            </div>
            <p className="text-xs text-slate-800 leading-relaxed font-medium">
              <strong>Key Compliance Mandate: </strong>
              {currentQuestion.rationale.whyCorrect}
            </p>
          </div>
        )}

        {/* Navigation & Confirmation Controls */}
        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={handlePrevQuestion}
            disabled={currentQuestionIndex === 0}
            className="px-6 py-2.5 bg-white border-2 border-slate-300 text-slate-700 font-bold text-xs uppercase tracking-widest rounded-lg hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </button>

          <div className="flex items-center gap-3">
            {!isCurrentRevealed ? (
              <button
                onClick={() => handleConfirmAnswer(currentQuestion.id)}
                disabled={!currentSelectedOptionId}
                className="px-8 py-3 bg-blue-600 text-white font-bold text-xs uppercase tracking-widest rounded-lg shadow-lg shadow-blue-200 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Verify &amp; Show GDP Analysis
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="px-8 py-3 bg-blue-600 text-white font-bold text-xs uppercase tracking-widest rounded-lg shadow-lg shadow-blue-200 hover:bg-blue-700 flex items-center gap-2 transition-colors"
              >
                <span>
                  {currentQuestionIndex === totalQuestions - 1 ? 'Finish Assessment' : 'Next Question'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
