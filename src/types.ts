export type SectionId = 
  | 'overview'
  | 'story'
  | 'alcoa'
  | 'rules'
  | 'corrections_lab'
  | 'audit_sim'
  | 'quiz'
  | 'certificate'
  | 'reference';

export interface AlcoaPrinciple {
  id: string;
  letter: string;
  name: string;
  isPlus?: boolean;
  definition: string;
  regulatoryRequirement: string;
  practicalDo: string;
  practicalDont: string;
  inspectionRisk: string;
  realWorldExample: string;
  citation: string;
}

export interface GdpRule {
  id: string;
  title: string;
  category: 'instruments' | 'dates' | 'signatures' | 'blank_fields' | 'raw_data' | 'late_entries';
  summary: string;
  detailedInstruction: string;
  regulatoryBasis: string;
  correctBehavior: string;
  incorrectBehavior: string;
  iconName: string;
  badge: string;
}

export type VisualStyleType = 
  | 'clean_single_strike'
  | 'scribble_blackout'
  | 'whiteout'
  | 'overwritten'
  | 'ditto_marks'
  | 'pencil_erased'
  | 'standard_date'
  | 'ambiguous_date'
  | 'ghost_signed'
  | 'proper_na_line'
  | 'empty_blank'
  | 'clean_entry'
  | 'late_entry_correct'
  | 'late_entry_backdated'
  | 'scrap_paper';

export interface VisualSnippetData {
  fieldLabel: string;
  originalText?: string;
  correctedText?: string;
  reasonCode?: string;
  reasonText?: string;
  initials?: string;
  dateText?: string;
  timeText?: string;
  styleType: VisualStyleType;
  notes?: string;
  inkColor?: 'blue' | 'black' | 'pencil' | 'red_flag';
}

export interface CorrectionExample {
  id: string;
  title: string;
  category: string;
  scenario: string;
  regulationCitation: string;
  correct: {
    snippet: VisualSnippetData;
    explanation: string;
    keyElements: string[];
  };
  incorrectVariations: Array<{
    id: string;
    label: string;
    snippet: VisualSnippetData;
    flawDescription: string;
    regulatoryViolation: string;
  }>;
}

export interface AuditOption {
  id: string;
  label: string;
  isCorrect: boolean;
}

export interface AuditHotspot {
  id: string;
  fieldCode: string;
  label: string;
  cellCoords: { row: number; col: number };
  status: 'compliant' | 'violation';
  snippet: VisualSnippetData;
  findingTitle: string;
  findingDescription: string;
  regulatoryViolation?: string;
  remediation?: string;
  /** Dropdown challenge: correct identification and selectable options */
  correctIssueId: string;
  issueOptions: AuditOption[];
}

export interface QuizVisualOption {
  id: string;
  label: string;
  snippet: VisualSnippetData;
  isCorrect: boolean;
  explanation: string;
  flawAnalysis?: string;
}

export interface QuizQuestion {
  id: string;
  questionNumber: number;
  category: 'corrections' | 'records' | 'dates' | 'alcoa' | 'signatures' | 'late_entries';
  title: string;
  scenarioText: string;
  questionPrompt: string;
  options: QuizVisualOption[];
  correctOptionId: string;
  rationale: {
    regulatoryRequirement: string;
    whyCorrect: string;
    whyOthersFail: string;
    cfrCitation: string;
  };
}

export interface ReasonCode {
  code: string;
  meaning: string;
  description: string;
  whenToUse: string;
  example: string;
}

export interface AcronymItem {
  id: string;
  acronym: string;
  fullName: string;
  category: 'regulatory' | 'shopfloor' | 'quality' | 'correction_codes' | 'systems';
  definition: string;
  floorContext: string;
}

export interface StoryDialogueLine {
  speaker: 'Grace' | 'Susan' | 'Kevin' | 'Narrator';
  text: string;
  thought?: string;
}

export interface NewHireShiftStep {
  id: string;
  stepNumber: number;
  timeLabel: string;
  location: string;
  title: string;
  subtitle: string;
  situation: string;
  dialogue: StoryDialogueLine[];
  ruleInPlainEnglish: string;
  whatYouMustDo: string[];
  whatYouMustNeverDo: string[];
  floorAnalogy: string;
  commonTrap: string;
  badge: string;
  diabetesContext?: string;
  interactiveChallenge?: {
    prompt: string;
    type: 'pencil_swap' | 'scale_entry' | 'four_step_fix' | 'z_stripe' | 'signature_choice';
  };
}
