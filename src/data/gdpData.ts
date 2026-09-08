import { AlcoaPrinciple, GdpRule, CorrectionExample, QuizQuestion, ReasonCode, AuditHotspot, AcronymItem, NewHireShiftStep } from '../types';

export const ALCOA_PRINCIPLES: AlcoaPrinciple[] = [
  {
    id: 'attributable',
    letter: 'A',
    name: 'Attributable',
    definition: 'Every piece of data must trace directly to the individual who observed or executed the action, with a verifiable timestamp.',
    regulatoryRequirement: '21 CFR § 211.194(a)(7) requires initials or signatures of the person who performs each test, along with the date tests are performed.',
    practicalDo: 'Sign or initial in indelible ink immediately upon completing your task using your registered signature or authorized electronic credential.',
    practicalDont: 'Never share passwords, never initial or sign on behalf of a colleague (ghost/proxy signing), and never allow someone else to log in with your credentials.',
    inspectionRisk: 'Inspectors review audit trails and signature logs. Discrepancies between card access logs and document signatures trigger 483 warning letters.',
    realWorldExample: 'Technician A left for lunch while a 4-hour bioreactor sampling occurred. Technician B took the sample and signed Technician A’s initials. This is a severe data integrity citation.',
    citation: 'FDA 21 CFR Part 211 / MHRA GXP Data Integrity Guidance § 4.1'
  },
  {
    id: 'legible',
    letter: 'L',
    name: 'Legible',
    definition: 'All records, including numbers, units, words, and corrections, must remain clearly readable by anyone throughout their entire retention lifecycle.',
    regulatoryRequirement: 'EU GMP Chapter 4.8: "A record should be clear, legible and indelible."',
    practicalDo: 'Write clearly using indelible blue or black ballpoint pen. Ensure numbers like 0, 6, and 8 or 1 and 7 are unmistakable.',
    practicalDont: 'Never use pencil, erasable ink, water-soluble felt pens, or liquid paper (white-out). Never scribble out or obliterate mistake text.',
    inspectionRisk: 'Obscured data in batch records makes it impossible to determine original product parameters during investigations, leading to batch rejection.',
    realWorldExample: 'An analyst overwrote a "4" into an "8" directly on a tablet hardness record. An inspector identified the alteration under magnification, resulting in a data integrity breach notice.',
    citation: 'EU GMP Chapter 4.8 / WHO TRS 996 Annex 5'
  },
  {
    id: 'contemporaneous',
    letter: 'C',
    name: 'Contemporaneous',
    definition: 'Records must be documented in real-time, at the exact moment the activity, measurement, or inspection is performed.',
    regulatoryRequirement: '21 CFR § 211.188 requires batch production records to be documented at the time each operation is executed.',
    practicalDo: 'Record each parameter immediately after reading the instrument or executing the physical step, with the exact current date and time.',
    practicalDont: 'Never pre-document (signing before finishing) and never back-date (entering yesterday’s date). Never postpone documentation until end-of-shift from memory.',
    inspectionRisk: 'Discovered pre-completed signatures or timestamps that conflict with automated SCADA/historian logs demonstrate falsification of records.',
    realWorldExample: 'An operator filled out the next 3 hourly temperature checks in advance before going on a break. An unexpected facility audit took place 10 minutes later, resulting in an immediate FDA Form 483.',
    citation: '21 CFR § 211.188 / PIC/S PI 041-1 § 8.4'
  },
  {
    id: 'original',
    letter: 'O',
    name: 'Original',
    definition: 'The raw, primary record or certified true copy created at the point of origin, preserving original metadata and context.',
    regulatoryRequirement: '21 CFR § 211.180(d) & Part 11: Raw data must be retained as original records or certified true copies.',
    practicalDo: 'Record values directly into the official batch record, lab notebook, or validated electronic system as primary raw data.',
    practicalDont: 'Never jot down weights, tare values, or temperatures onto paper towels, scrap paper, sticky notes, or glove palms to transcribe later.',
    inspectionRisk: 'Finding unauthorized sticky notes, scrap paper, or hidden notebooks in QC laboratories is one of the most frequent regulatory audit findings.',
    realWorldExample: 'An analyst recorded analytical balance weights on a thermal balance strip taped to a sticky note, then entered an average into the worksheet and threw the strip away. The batch was put on hold for investigation.',
    citation: 'FDA 21 CFR § 211.180(d) / WHO TRS 996'
  },
  {
    id: 'accurate',
    letter: 'A',
    name: 'Accurate',
    definition: 'Data must be truthful, free from errors or biases, correctly measured, and all modifications must be transparently documented.',
    regulatoryRequirement: '21 CFR § 211.194: Complete records of all data secured in the course of each test, including graphs, charts, and spectra from lab instrumentation.',
    practicalDo: 'Report true observed values and instrument readings. When making a correction, use a single strikethrough, write the true value, state the reason, initial, and date.',
    practicalDont: 'Never "dry-lab" (invent data), test into compliance, discard outlier data without formal OOS investigation, or alter values to fit specification ranges.',
    inspectionRisk: 'Intentional data falsification or testing into compliance can trigger criminal prosecution by regulatory agencies and mandatory facility shutdowns.',
    realWorldExample: 'A pH reading measured 6.78 when the specification was 6.80 - 7.20. The operator re-measured 3 times until it read 6.81, only recording the passing result. The original failing reading was uncovered in the meter memory buffer.',
    citation: 'FDA Guidance for Industry: Data Integrity and Compliance With Drug CGMP'
  },
  {
    id: 'complete',
    letter: '+C',
    name: 'Complete',
    isPlus: true,
    definition: 'All generated data, including repeat runs, audit trails, and raw data files, must be retained without omissions or unreviewed blank fields.',
    regulatoryRequirement: '21 CFR § 211.192 / Annex 11: All testing data, including re-tests, must be documented and reviewed.',
    practicalDo: 'Fill in every required field. If a section or field is non-applicable, draw a single diagonal line through it, write "N/A", sign/initial, and date.',
    practicalDont: 'Never leave blank fields, never delete chromatograms or test injections, and never tear pages out of a bound laboratory notebook.',
    inspectionRisk: 'Blank spaces in records allow unauthorized post-execution entries and invite suspicion of skipped manufacturing steps.',
    realWorldExample: 'A sterile filling line record left the "Pre-use filter integrity test" row blank. Quality assurance released the batch without noticing. During an audit, the missing data voided the sterile claim for the lot.',
    citation: 'MHRA Data Integrity Guidance § 6.2'
  },
  {
    id: 'consistent',
    letter: '+C',
    name: 'Consistent',
    isPlus: true,
    definition: 'Data must adhere to chronological order and standard formats with no time conflicts or contradictory records across systems.',
    regulatoryRequirement: 'WHO TRS 996: Documentation systems must enforce chronological sequencing of activities.',
    practicalDo: 'Verify that time and date stamps follow a logical progression (Step 1 finishes before Step 2 begins) and align with facility building management clocks.',
    practicalDont: 'Do not record timestamps that conflict with automated supervisory logs, autoclave cycle logs, or entry badge scans.',
    inspectionRisk: 'Chronological anomalies (such as batch dissolution testing recorded as starting at 09:00 while the raw material was dispensed at 10:15) signal retrospective documentation.',
    realWorldExample: 'Autoclave cycle #402 record listed sterilization completion at 14:15, but the operator signed the sterile unloading step at 13:50. The time paradox triggered an audit of all batch records.',
    citation: 'PIC/S PI 041-1 § 9.2'
  },
  {
    id: 'enduring',
    letter: '+E',
    name: 'Enduring',
    isPlus: true,
    definition: 'Data must remain intact, stable, and readable on durable media for the full statutory archiving and retention period.',
    regulatoryRequirement: '21 CFR § 211.180: Records must be retained for at least 1 year after the expiration date of the batch.',
    practicalDo: 'Use archival-quality paper, permanent indelible ink, and photocopy or scan thermal printer balance slips onto durable paper (as thermal paper fades within months).',
    practicalDont: 'Never use heat-sensitive thermal paper as the sole raw data record without a certified photocopy. Avoid damp storage or light exposure.',
    inspectionRisk: 'Inspectors inspecting 2-year-old stability study records found blank white paper where thermal balance strips had faded to invisible, resulting in loss of stability validation.',
    realWorldExample: 'A company stored QC records in a non-climate-controlled warehouse. Humidity and thermal paper degradation erased 18 months of moisture analysis records.',
    citation: 'EU GMP Chapter 4.9'
  },
  {
    id: 'available',
    letter: '+A',
    name: 'Available',
    isPlus: true,
    definition: 'Records must be easily accessible, searchable, and retrievable for authorized personnel, QA review, and regulatory inspectors during audits.',
    regulatoryRequirement: '21 CFR § 211.180(c): Records must be readily available for authorized inspection during the retention period.',
    practicalDo: 'Store physical records in indexed, secure, fire-rated record archives; maintain robust backups and indexing for electronic document management systems.',
    practicalDont: 'Do not misfile, lock records in private unindexed drawers, or discard secondary review sheets.',
    inspectionRisk: 'Delays exceeding 2 hours during an FDA or EMA inspection in retrieving requested batch manufacturing or cleaning records lead to formal inspection delay citations.',
    realWorldExample: 'During a pre-approval inspection, the firm was unable to locate raw calibration logs for the pilot tablet press used in pivotal clinical trial batch 2024-C. Approval was delayed by 9 months.',
    citation: 'FDA 21 CFR § 211.180(c)'
  }
];

export const GDP_RULES: GdpRule[] = [
  {
    id: 'rule-instruments',
    title: 'Approved Writing Instruments',
    category: 'instruments',
    summary: 'Only indelible, permanent blue or black ballpoint pen is permitted.',
    detailedInstruction: 'All manual entries on GxP documents must be made with indelible ink that cannot be easily smudged, washed away, or erased. Blue or black ballpoint pens are standard; blue is often preferred by QA to easily distinguish original signatures from photocopies. Pencils, erasable pens (including thermo-sensitive gel pens), and felt markers are strictly prohibited.',
    regulatoryBasis: 'EU GMP Chapter 4.8 & FDA 21 CFR § 211.194',
    correctBehavior: 'Using a dedicated blue or black ballpoint pen supplied or approved by Quality Assurance.',
    incorrectBehavior: 'Using a mechanical pencil, erasable ink pen, highlighters over raw data, or liquid correction fluid.',
    iconName: 'PenTool',
    badge: 'Pen & Ink Standards'
  },
  {
    id: 'rule-dates-time',
    title: 'Unambiguous Date & Time Formats',
    category: 'dates',
    summary: 'Dates must follow an unambiguous format (e.g., DD-MMM-YYYY), and times should follow 24-hour military notation.',
    detailedInstruction: 'Numerical date formats like "03/04/26" are ambiguous: in the US it denotes March 4, 2026, whereas in Europe and Latin America it denotes April 3, 2026. GxP standards require alphanumeric month abbreviations (e.g., "04-MAR-2026") or ISO-8601 ("2026-03-04"). Times should use the 24-hour clock (e.g., "14:35") or explicitly include "AM/PM" and time zone if cross-facility.',
    regulatoryBasis: 'WHO Technical Report Series 996 / ICH Q7 § 6.1',
    correctBehavior: 'Writing "02-SEP-2026" or "2026-09-02" and "14:30" (or "02:30 PM EST").',
    incorrectBehavior: 'Writing "09/02/26" or "9/2" or omitting the year entirely.',
    iconName: 'CalendarClock',
    badge: 'Date & Time Protocol'
  },
  {
    id: 'rule-signatures',
    title: 'Signatures, Initials & Identity',
    category: 'signatures',
    summary: 'Every mark must trace to a qualified individual registered in the facility Signature Log.',
    detailedInstruction: 'Staff must register their legal signature, print name, initials, and employee ID in the site signature register before executing GxP tasks. Initials and signatures must be consistent. Signing for anyone else ("proxy signing" or "ghost signing") is considered criminal record falsification under federal and international statutes.',
    regulatoryBasis: 'FDA 21 CFR § 211.194(a)(7) & Part 11 § 11.50',
    correctBehavior: 'Providing your personal registered signature or initials on the designated line at the exact moment of execution.',
    incorrectBehavior: 'Signing for a teammate who stepped away, allowing an intern to sign using your pen/name, or sharing e-signature tokens.',
    iconName: 'UserCheck',
    badge: 'Signature Integrity'
  },
  {
    id: 'rule-blank-fields',
    title: 'Blank Fields & Unused Lines (Z-Striping)',
    category: 'blank_fields',
    summary: 'Never leave blank spaces. Draw a single diagonal line through unused areas, write "N/A", initial, and date.',
    detailedInstruction: 'Blank spaces in batch records or logbooks present a data vulnerability, allowing unmonitored back-filling or raising questions about whether steps were performed. If a field, table row, or page portion is not applicable to the run, draw a single diagonal or "Z" line through the entire unused section, write "N/A" (or "Not Applicable"), provide your initials, and current date.',
    regulatoryBasis: 'EU GMP Chapter 4.9 & PIC/S PI 041-1 § 8.5',
    correctBehavior: 'Diagonal line across empty table rows, labeled "N/A - Step not required for 50L scale", initialed "JD", dated "02-SEP-2026".',
    incorrectBehavior: 'Leaving rows blank, using ditto marks ("), drawing arrows downwards, or leaving open spaces at the bottom of forms.',
    iconName: 'FileX',
    badge: 'Blank Space Protocol'
  },
  {
    id: 'rule-late-entries',
    title: 'Late Entries & Omissions',
    category: 'late_entries',
    summary: 'Never backdate. Document as "Late Entry", cite the true execution time, and explain the reason.',
    detailedInstruction: 'If you forgot to document an observation or parameter at the exact moment it occurred, DO NOT write yesterday’s or an earlier timestamp. Instead, record the entry contemporaneously at the present moment, clearly annotate it with "Late Entry", specify the actual date/time the activity was executed, state the reason for the delayed documentation, and sign/date with the current timestamp.',
    regulatoryBasis: 'FDA 21 CFR § 211.188 & WHO TRS 996 § 5.3',
    correctBehavior: 'Entering value now: "Late Entry. Observed on 01-SEP-2026 at 16:45 during granulation discharge. Delayed due to emergency line shutoff. Signed: RK, 02-SEP-2026 08:30".',
    incorrectBehavior: 'Writing "01-SEP-2026 16:45" today and pretending it was documented in real-time (backdating).',
    iconName: 'ClockAlert',
    badge: 'Late Entry Standards'
  },
  {
    id: 'rule-raw-data',
    title: 'Raw Data & Direct Entry Prohibition',
    category: 'raw_data',
    summary: 'Direct entry into official records only. Scrap paper, sticky notes, and scrap towels are strictly forbidden.',
    detailedInstruction: 'Raw data is the original record of the primary observation. Recording values on secondary media (such as sticky notes, bench surfaces, lab coats, gloves, or scrap paper) with the intention of later "neatly transcribing" them into the official document is a direct violation of ALCOA principles. Transcriptions introduce transcription errors, and scrap paper is routinely destroyed, obliterating original metadata.',
    regulatoryBasis: 'FDA 21 CFR § 211.180(d) & WHO TRS 996 § 4.2',
    correctBehavior: 'Bringing the official batch record or lab tablet directly to the equipment and entering the tare/mass reading immediately.',
    incorrectBehavior: 'Jotting 5 balance readings on a yellow sticky note, copying them into the BMR later, and throwing away the sticky note.',
    iconName: 'Trash2',
    badge: 'Raw Data Integrity'
  }
];

export const REASON_CODES: ReasonCode[] = [
  {
    code: 'EE',
    meaning: 'Entry Error',
    description: 'Used when a value was miswritten or inadvertently entered into the wrong line or box.',
    whenToUse: 'Accidentally wrote the room temperature (21.4°C) into the humidity box (45%).',
    example: '21.4°C struck through with single line -> 45.2% EE JD 02-SEP-2026'
  },
  {
    code: 'TE',
    meaning: 'Typographical / Transposition Error',
    description: 'Used when numbers or letters were inverted, misspelled, or transposed.',
    whenToUse: 'Transposed digits: writing 14.52 kg instead of the verified 14.25 kg.',
    example: '14.52 kg struck through -> 14.25 kg TE JD 02-SEP-2026'
  },
  {
    code: 'CE',
    meaning: 'Calculation Error',
    description: 'Used when a manual arithmetic calculation (yield, assay average, dilution) was re-checked and corrected.',
    whenToUse: 'Recalculated percentage yield after realizing the denominator omitted tare weight.',
    example: '94.2% struck through -> 91.8% CE JD 02-SEP-2026'
  },
  {
    code: 'SE',
    meaning: 'Sampling Error',
    description: 'Used when an entry reflects an invalid sample collection or sample preparation step before official testing.',
    whenToUse: 'A sample volume was pipetted with an uncalibrated pipette and redone properly under protocol.',
    example: 'Sample Prep A struck through -> Sample Prep B (re-pipetted with Pipette #04) SE JD 02-SEP-2026'
  },
  {
    code: 'LE',
    meaning: 'Late Entry',
    description: 'Used when an entry is recorded after the immediate contemporaneous window.',
    whenToUse: 'Parameter verified at 09:00, documented at 11:30 with full explanation.',
    example: 'LE: Temp 22.1°C observed at 09:00. Delayed due to spill response. JD 02-SEP-2026 11:30'
  },
  {
    code: 'OR',
    meaning: 'Overwritten Correction',
    description: 'NEVER PERMITTED. Overwriting numbers is considered a data integrity violation.',
    whenToUse: 'NOT A VALID GDP CODE - Used only as an anti-pattern training warning.',
    example: 'Do not trace over a 3 to make an 8. Strike through once and write 8 clearly above.'
  }
];

export const CORRECTION_EXAMPLES: CorrectionExample[] = [
  {
    id: 'correction-ph-entry',
    title: 'Numerical Value Correction (Buffer pH)',
    category: 'Quality Control Laboratory',
    scenario: 'An analyst preparing pH 7.00 phosphate buffer accidentally writes "7.82" into the pH verification box on the Analytical Test Record. The actual measured pH on the calibrated meter was 7.02.',
    regulationCitation: 'FDA 21 CFR § 211.194 & EU GMP Chapter 4.8',
    correct: {
      snippet: {
        fieldLabel: 'Final Buffer Solution pH (Spec: 6.95 - 7.05):',
        originalText: '7.82',
        correctedText: '7.02',
        reasonCode: 'EE',
        reasonText: 'Entry Error',
        initials: 'MKL',
        dateText: '02-SEP-2026',
        timeText: '11:15',
        styleType: 'clean_single_strike',
        inkColor: 'blue',
        notes: 'Original text remains 100% legible under single clean line. Reason code, initials, and date are clearly documented adjacent.'
      },
      explanation: 'The original entry "7.82" is struck through with a single straight horizontal line, remaining completely readable. The correct value "7.02" is written directly above. The standardized reason code "EE" (Entry Error) or brief written explanation is present, accompanied by the analyst’s initials ("MKL") and full date ("02-SEP-2026").',
      keyElements: [
        'Single horizontal strike-through (original text remains legible)',
        'Correct value written clearly above or adjacent',
        'Standard reason code or clear justification (e.g., "EE" for Entry Error)',
        'Identity of corrector (initials or signature)',
        'Contemporaneous date of the correction'
      ]
    },
    incorrectVariations: [
      {
        id: 'inc-whiteout',
        label: 'White-Out / Correction Fluid',
        snippet: {
          fieldLabel: 'Final Buffer Solution pH (Spec: 6.95 - 7.05):',
          originalText: '7.82',
          correctedText: '7.02',
          styleType: 'whiteout',
          inkColor: 'blue',
          notes: 'Liquid white-out applied over original text, new number written on top. No initials, no date.'
        },
        flawDescription: 'Using liquid correction fluid or correction tape is strictly prohibited. It conceals the original observation, creating an audit vulnerability and suggesting an intentional cover-up.',
        regulatoryViolation: '21 CFR § 211.194: Altered records must not obscure previous entries.'
      },
      {
        id: 'inc-scribble',
        label: 'Scribble / Heavy Blackout',
        snippet: {
          fieldLabel: 'Final Buffer Solution pH (Spec: 6.95 - 7.05):',
          originalText: '7.82',
          correctedText: '7.02',
          styleType: 'scribble_blackout',
          initials: 'MK',
          inkColor: 'black',
          notes: 'Original entry heavily scratched out with repeated pen strokes until entirely unreadable.'
        },
        flawDescription: 'Heavily scribbling or blacking out text makes the original entry illegible. Regulatory inspectors cannot verify whether an out-of-specification (OOS) result was concealed.',
        regulatoryViolation: 'EU GMP Chapter 4.8: "Any alteration made to a record should be signed and dated; the alteration should permit the reading of the original information."'
      },
      {
        id: 'inc-overwrite',
        label: 'Overwriting / Digit Tracing',
        snippet: {
          fieldLabel: 'Final Buffer Solution pH (Spec: 6.95 - 7.05):',
          originalText: '7.82',
          correctedText: '7.02',
          styleType: 'overwritten',
          inkColor: 'blue',
          notes: 'The number 8 was forcefully traced over to look like a 0. No strike-through, no initials, no date.'
        },
        flawDescription: 'Tracing over or altering a character to look like another number (e.g. changing an 8 into a 0) makes it impossible to know which value was intended or when the change happened.',
        regulatoryViolation: 'MHRA Data Integrity Guidance: Overwritten numbers are unverified alterations and violate the Attributable and Legible principles.'
      }
    ]
  },
  {
    id: 'correction-date-entry',
    title: 'Date Recording & Ambiguity Prevention',
    category: 'Production Batch Record',
    scenario: 'An operator completing the blending verification step on September 2nd, 2026 needs to sign and date the equipment logbook.',
    regulationCitation: 'WHO Technical Report Series 996 & ICH Q7',
    correct: {
      snippet: {
        fieldLabel: 'Verification Date & Execution Time:',
        originalText: '',
        correctedText: '02-SEP-2026 14:45',
        initials: 'DRS',
        styleType: 'standard_date',
        inkColor: 'blue',
        notes: 'Month spelled as 3-letter abbreviation, 4-digit year, 24-hour military timestamp.'
      },
      explanation: 'Format "02-SEP-2026" is universally unambiguous across all international jurisdictions (US, EU, APAC). Combined with 24h clock "14:45" and registered initials "DRS".',
      keyElements: [
        'Alpha-numeric month abbreviation (SEP) prevents DD/MM vs MM/DD confusion',
        'Four-digit year (2026)',
        'Exact time in 24-hour format (14:45) eliminates AM/PM ambiguity',
        'Direct indelible ink entry'
      ]
    },
    incorrectVariations: [
      {
        id: 'inc-ambiguous-date',
        label: 'Ambiguous Numerical Format (09/02/26)',
        snippet: {
          fieldLabel: 'Verification Date & Execution Time:',
          originalText: '',
          correctedText: '09/02/26 2:45',
          initials: 'D',
          styleType: 'ambiguous_date',
          inkColor: 'blue',
          notes: 'Could be Feb 9 or Sep 2. Missing century (26). 2:45 lacks AM/PM or 24-hour indicator.'
        },
        flawDescription: 'An auditor from Europe would read 09/02/26 as February 9th, 2026, while a US auditor reads September 2nd, 2026. Two-digit years cause validation errors in archival records.',
        regulatoryViolation: 'WHO TRS 996: Dates must be written in a manner that avoids any misinterpretation.'
      },
      {
        id: 'inc-ditto',
        label: 'Ditto Marks / Carry-Down Arrows',
        snippet: {
          fieldLabel: 'Verification Date & Execution Time:',
          originalText: '',
          correctedText: '" " ↓',
          styleType: 'ditto_marks',
          inkColor: 'blue',
          notes: 'Operator used quotation marks (" ") to indicate "same as above row".'
        },
        flawDescription: 'Ditto marks (") or down arrows (↓) are strictly forbidden in GMP documentation. Every row must be explicitly and independently recorded.',
        regulatoryViolation: '21 CFR § 211.188: Each specific step must be uniquely attested and verified.'
      }
    ]
  },
  {
    id: 'correction-blank-line',
    title: 'Handling Unused Table Rows & Blank Fields',
    category: 'Packaging Logsheet',
    scenario: 'A packaging line ran 3 pallet sub-batches instead of the standard maximum capacity of 6 pallets. Rows 4, 5, and 6 on the official packaging yield table remain unused.',
    regulationCitation: 'EU GMP Chapter 4.9 & PIC/S PI 041-1',
    correct: {
      snippet: {
        fieldLabel: 'Pallet Sub-Batch 4 to 6 Logs:',
        originalText: '',
        correctedText: 'N/A - Run complete at Pallet 3',
        initials: 'TLH',
        dateText: '02-SEP-2026',
        styleType: 'proper_na_line',
        inkColor: 'blue',
        notes: 'Single diagonal "Z-line" through all unused rows, clearly labeled "N/A", signed, and dated.'
      },
      explanation: 'Unused spaces are crossed out with a single clean diagonal line across the unused section, labeled "N/A" (Not Applicable) with a brief note, initialed by the operator ("TLH") and dated ("02-SEP-2026").',
      keyElements: [
        'Single diagonal line ("Z-stripe") through all empty cells',
        'Explicit "N/A" notation',
        'Brief justification (e.g., "Run ended at pallet 3")',
        'Initials and contemporaneous date'
      ]
    },
    incorrectVariations: [
      {
        id: 'inc-blank-open',
        label: 'Left Completely Blank',
        snippet: {
          fieldLabel: 'Pallet Sub-Batch 4 to 6 Logs:',
          originalText: '',
          correctedText: '',
          styleType: 'empty_blank',
          notes: 'Rows 4, 5, and 6 are left completely white and empty. No line, no initials.'
        },
        flawDescription: 'Leaving lines blank leaves the document open for unauthorized or backdated entries later, and fails to document whether pallets 4-6 were packed without records.',
        regulatoryViolation: 'FDA 21 CFR § 211.188: Batch records must accurately and completely reflect all manufacturing operations.'
      }
    ]
  },
  {
    id: 'correction-late-entry',
    title: 'Documenting a Delayed Observation (Late Entry)',
    category: 'Bioreactor Fermentation Suite',
    scenario: 'At 10:00 AM, an engineer took a dissolved oxygen (DO) reading of 42.5%. Due to an immediate facility water leak alarm, the engineer evacuated and could only document the entry at 13:30 PM.',
    regulationCitation: 'FDA 21 CFR § 211.188 & Data Integrity Guidance',
    correct: {
      snippet: {
        fieldLabel: 'Bioreactor DO (%) at T+24hr:',
        originalText: '',
        correctedText: '42.5% [Late Entry: Observed at 10:00 on 02-SEP-2026. Delayed entry due to line alarm evacuation.]',
        initials: 'AWK',
        dateText: '02-SEP-2026',
        timeText: '13:30',
        styleType: 'late_entry_correct',
        inkColor: 'blue',
        notes: 'Clearly marked "Late Entry", cites original event time (10:00), signed with current time (13:30).'
      },
      explanation: 'The entry is recorded at 13:30 (contemporaneous with the act of writing). It explicitly flags "Late Entry", references the actual time of observation (10:00), states the valid operational reason for delay, and carries current initials and timestamp.',
      keyElements: [
        'Explicit "Late Entry" banner/notation',
        'Actual time/date the observation was made (10:00)',
        'Legitimate operational rationale for delayed documentation',
        'Signed and dated with current time (13:30) of writing'
      ]
    },
    incorrectVariations: [
      {
        id: 'inc-backdate',
        label: 'Backdating the Entry',
        snippet: {
          fieldLabel: 'Bioreactor DO (%) at T+24hr:',
          originalText: '',
          correctedText: '42.5% AWK 10:00',
          styleType: 'late_entry_backdated',
          inkColor: 'blue',
          notes: 'Written at 13:30, but operator wrote "10:00" to hide the delay.'
        },
        flawDescription: 'Backdating an entry—even by a few hours—is a falsification of records. Audit trails, badge logs, or facility SCADA data will expose the mismatch, resulting in serious compliance actions.',
        regulatoryViolation: '21 CFR § 211.188 / 18 U.S.C. § 1001: Willful falsification of pharmaceutical manufacturing records.'
      }
    ]
  }
];

export const AUDIT_HOTSPOTS: AuditHotspot[] = [
  {
    id: 'hs-1',
    fieldCode: 'TEMP-01',
    label: 'Granulator Inlet Air Temp (°C)',
    cellCoords: { row: 1, col: 1 },
    status: 'violation',
    snippet: {
      fieldLabel: 'Granulation Inlet Air Temp (65 - 75°C)',
      originalText: '62.1',
      correctedText: '68.4',
      styleType: 'scribble_blackout',
      notes: 'Original entry 62.1°C scribbled out/scratched out completely. Overwritten with 68.4°C with no initials and no date.'
    },
    findingTitle: 'Original Entry Scribbled Out (Obliterated) with No Initials or Date',
    findingDescription: 'The original temperature reading was completely scratched and scribbled out, obscuring the historical audit trail. Furthermore, the new value was entered with no operator initials, no date, and no reason code.',
    regulatoryViolation: 'FDA 21 CFR § 211.194 & EU GMP Chapter 4.8: Original entries must remain legible. Scribbling out or obliterating entries is strictly prohibited. All corrections must include initials, date, and justification.',
    remediation: 'Initiate documentation deviation, verify SCADA historian for true inlet temperature, quarantine lot pending investigation, and retrain personnel on GDP single-strikethrough rules.',
    correctIssueId: 'opt-scribble-nodate',
    issueOptions: [
      { id: 'opt-temp-wrong', label: 'Inlet air temperature was measured in Celsius instead of Fahrenheit', isCorrect: false },
      { id: 'opt-scribble-nodate', label: 'Original entry scribbled out / obliterated with no initials or date', isCorrect: true },
      { id: 'opt-compliant-temp', label: 'Compliant GDP correction: replacement value is within the 65-75°C target range', isCorrect: false },
      { id: 'opt-late-temp', label: 'Entry was submitted without an electronic badge scan', isCorrect: false }
    ]
  },
  {
    id: 'hs-2',
    fieldCode: 'SIGN-02',
    label: 'Granulation Operator Authorization',
    cellCoords: { row: 1, col: 2 },
    status: 'violation',
    snippet: {
      fieldLabel: 'Executed By Operator Signature & Date:',
      originalText: '',
      correctedText: 'Marcus Vance',
      styleType: 'clean_entry',
      inkColor: 'blue',
      notes: 'Marcus Vance signed his full legal name, but left the adjacent date/time box completely blank.'
    },
    findingTitle: 'Signature Present but Not Dated (Missing Contemporaneous Date)',
    findingDescription: 'The operator executed the signature step and wrote his name, but failed to record the date and time of execution. Without a date, the action cannot be proven to be contemporaneous.',
    regulatoryViolation: 'FDA 21 CFR § 211.188 & ALCOA "Contemporaneous": Signatures must always be accompanied by the contemporaneous date and time of signing.',
    remediation: 'Issue a documentation deviation. Have operator record a late entry with the current date, referencing when the task was originally executed.',
    correctIssueId: 'opt-signed-no-date',
    issueOptions: [
      { id: 'opt-no-signature', label: 'Missing operator signature entirely', isCorrect: false },
      { id: 'opt-wrong-title', label: 'Operator signed with title instead of legal full name', isCorrect: false },
      { id: 'opt-signed-no-date', label: 'Signed but not dated (Missing contemporaneous date of execution)', isCorrect: true },
      { id: 'opt-compliant-sig', label: 'Compliant signature: name is legible and verified against site roster', isCorrect: false }
    ]
  },
  {
    id: 'hs-3',
    fieldCode: 'DATE-03',
    label: 'Pre-Mix Line Clearance Check',
    cellCoords: { row: 2, col: 1 },
    status: 'violation',
    snippet: {
      fieldLabel: 'Line Clearance Complete & Area Cleaned:',
      originalText: '',
      correctedText: '02-SEP-2026 07:45',
      styleType: 'clean_entry',
      inkColor: 'blue',
      notes: 'Timestamp was recorded, but the required operator initials/signature line is completely missing.'
    },
    findingTitle: 'Dated but Missing Initials / Attributable Signature',
    findingDescription: 'The line clearance timestamp "02-SEP-2026 07:45" was recorded, but no operator initials or signature were provided. The action is anonymous and cannot be attributed to any individual.',
    regulatoryViolation: 'FDA 21 CFR § 211.188(b)(11) & ALCOA "Attributable": Every record, check, and clearance must clearly identify who performed the action.',
    remediation: 'Review cleanroom entry badge records to identify who executed the clearance, conduct supervisory investigation, and add an attributed late entry.',
    correctIssueId: 'opt-dated-no-initials',
    issueOptions: [
      { id: 'opt-bad-date-format', label: 'The date format uses letters instead of numbers', isCorrect: false },
      { id: 'opt-dated-no-initials', label: 'Dated but missing initials/signature (Not Attributable)', isCorrect: true },
      { id: 'opt-future-date', label: 'Line clearance was post-dated into the future', isCorrect: false },
      { id: 'opt-compliant-clearance', label: 'Compliant entry: timestamp verified by electronic system', isCorrect: false }
    ]
  },
  {
    id: 'hs-4',
    fieldCode: 'INK-04',
    label: 'Mixer Impeller Speed & Amp Draw',
    cellCoords: { row: 2, col: 2 },
    status: 'violation',
    snippet: {
      fieldLabel: 'Mixer Impeller Speed (340 - 360 RPM):',
      originalText: '',
      correctedText: '352 RPM / 14.2 A  -  R. Patel 02-SEP-2026',
      styleType: 'clean_entry',
      inkColor: 'red_flag',
      notes: 'Technician used a bright red ballpoint pen to document operating speed and current draw.'
    },
    findingTitle: 'Prohibited Ink Color Used (Red Ink Pen)',
    findingDescription: 'Data was entered using a red ballpoint pen. GxP regulations and site SOPs restrict record entries to indelible dark blue or black ink. Red ink is reserved for specific QA auditing or rejects and scans poorly in grayscale archives.',
    regulatoryViolation: 'EU GMP Chapter 4.8 & Site SOP: Handwritten entries must be made in indelible blue or black ink. Red, green, or bright colored inks are prohibited on primary GxP logs.',
    remediation: 'Document an entry note in approved blue/black ink explaining the SOP deviation. Review all documents for legibility during electronic scanning.',
    correctIssueId: 'opt-red-ink',
    issueOptions: [
      { id: 'opt-speed-oos', label: 'Mixer speed of 352 RPM is outside operational limits', isCorrect: false },
      { id: 'opt-missing-unit', label: 'Missing engineering units on the electric current measurement', isCorrect: false },
      { id: 'opt-compliant-ink', label: 'Compliant entry: red ink is required for high-risk equipment steps', isCorrect: false },
      { id: 'opt-red-ink', label: 'Prohibited ink color used (Red ink pen violates GDP SOPs)', isCorrect: true }
    ]
  },
  {
    id: 'hs-5',
    fieldCode: 'BLANK-05',
    label: 'Moisture Content Assay (Table Row 3)',
    cellCoords: { row: 3, col: 1 },
    status: 'violation',
    snippet: {
      fieldLabel: 'Replicate #3 Loss on Drying (LOD) %:',
      originalText: '',
      correctedText: '',
      styleType: 'empty_blank',
      notes: 'Test field row 3 was left entirely blank with no measurement recorded and no N/A line.'
    },
    findingTitle: 'Blank Field Left Open Without Voiding / "N/A" Annotation',
    findingDescription: 'Replicate test row #3 was left completely blank. Leaving blank fields in manufacturing or test records creates opportunities for subsequent fraudulent entries and leaves auditors unsure if the required test was skipped.',
    regulatoryViolation: 'FDA 21 CFR § 211.188 & ALCOA+ "Complete": All designated fields must be accounted for. Unused spaces must be crossed out with a single diagonal line, marked "N/A", initialed, and dated.',
    remediation: 'Technician must strike through the blank field with a single diagonal line, record "N/A - 2 replicates required per protocol", and initial and date contemporaneously.',
    correctIssueId: 'opt-blank-field',
    issueOptions: [
      { id: 'opt-math-error', label: 'Calculation error in moisture content percentage', isCorrect: false },
      { id: 'opt-blank-field', label: 'Blank field left open without strikeout, "N/A", or justification (Not Complete)', isCorrect: true },
      { id: 'opt-wrong-test', label: 'Loss on Drying test used instead of Karl Fischer titration', isCorrect: false },
      { id: 'opt-compliant-blank', label: 'Compliant entry: blank rows may be filled in anytime before batch release', isCorrect: false }
    ]
  },
  {
    id: 'hs-6',
    fieldCode: 'PENCIL-06',
    label: 'Granule Bulk Density Test',
    cellCoords: { row: 3, col: 2 },
    status: 'violation',
    snippet: {
      fieldLabel: 'Granule Bulk Density (g/mL):',
      originalText: '',
      correctedText: '0.64 g/mL   Initials: B.T.   Date: [Blank]',
      styleType: 'pencil_erased',
      inkColor: 'pencil',
      notes: 'Written in 0.5mm graphite pencil with visible rubber eraser smudge; initialed (B.T.) but date box was left completely unentered.'
    },
    findingTitle: 'Non-Permanent Pencil with Erasure Smudge & Not Dated',
    findingDescription: 'The test result was written using a non-permanent graphite pencil, and faint eraser marks are visible underneath where an earlier value was rubbed out. In addition, while the operator entered their initials "B.T.", they failed to date the entry, violating both the Indelible and Contemporaneous documentation requirements.',
    regulatoryViolation: 'EU GMP Chapter 4.8, WHO TRS 996, & FDA 21 CFR § 211.188: Records must be indelible (pencils and erasers are strictly prohibited) and must be contemporaneously dated by the person performing the test.',
    remediation: 'Quarantine the test run, confiscate pencils from the bench, re-execute density testing using an approved permanent indelible pen, add a documented late entry with the true execution date and explanation, and issue a documentation deviation.',
    correctIssueId: 'opt-pencil-nodate',
    issueOptions: [
      { id: 'opt-density-high', label: 'Bulk density exceeds solid dosage formulation limits', isCorrect: false },
      { id: 'opt-bad-math', label: 'Volume calculation omitted conversion factor', isCorrect: false },
      { id: 'opt-pencil-nodate', label: 'Non-permanent pencil used with erasure smudge AND entry was not dated', isCorrect: true },
      { id: 'opt-compliant-pencil', label: 'Compliant entry: pencil is permitted for preliminary test drafts', isCorrect: false }
    ]
  },
  {
    id: 'hs-7',
    fieldCode: 'SCRAP-07',
    label: 'Active Pharmaceutical Ingredient (API) Gross Mass',
    cellCoords: { row: 4, col: 1 },
    status: 'violation',
    snippet: {
      fieldLabel: 'API Gross Addition Mass (Target 12.50 kg):',
      originalText: '',
      correctedText: 'Gross: 12.48 kg (See sticky note) -> official box empty',
      styleType: 'scrap_paper',
      inkColor: 'blue',
      notes: 'Yellow post-it sticky note adhered over official box with rough balance scribbles.'
    },
    findingTitle: 'Raw Data Recorded on Unofficial Scrap Paper / Post-It Note',
    findingDescription: 'Technician scribbled the active ingredient dispensing weight onto a loose yellow sticky note attached to the batch record instead of recording directly onto the authorized log sheet.',
    regulatoryViolation: 'FDA 21 CFR § 211.180(d) & WHO Annex 5: Critical raw data must be contemporaneously recorded directly onto official, controlled documents. Scrap paper and adhesive sticky notes are unauthorized and easily lost.',
    remediation: 'Verify mass against calibrated scale printout, transcribe value into the official record with QA counter-signature, archive sticky note as an incident attachment, and issue CAPA.',
    correctIssueId: 'opt-scrap-note',
    issueOptions: [
      { id: 'opt-weight-oos', label: 'Dispensed mass is outside ±0.5 kg safety tolerance', isCorrect: false },
      { id: 'opt-balance-uncalibrated', label: 'The analytical balance sticker is past its annual calibration date', isCorrect: false },
      { id: 'opt-scrap-note', label: 'Raw data recorded on unofficial scrap paper / sticky note instead of official form', isCorrect: true },
      { id: 'opt-compliant-scrap', label: 'Compliant entry: temporary notes are standard practice in weighing rooms', isCorrect: false }
    ]
  },
  {
    id: 'hs-8',
    fieldCode: 'PROXY-08',
    label: 'Second-Person Verification Sign-Off',
    cellCoords: { row: 4, col: 2 },
    status: 'violation',
    snippet: {
      fieldLabel: 'Witness / Verification Signature:',
      originalText: '',
      correctedText: 'Signed for J. Davis by B. Taylor (02-SEP-2026)',
      styleType: 'ghost_signed',
      inkColor: 'blue',
      notes: 'Operator B. Taylor signed colleague J. Davis name while Davis was off-shift on a break.'
    },
    findingTitle: 'Ghost / Proxy Signing (Signing on Behalf of Another Individual)',
    findingDescription: 'Operator B. Taylor signed colleague J. Davis’s name because Davis was on break. Proxy signing or signing for someone else is document falsification, as the named witness did not personally witness the step.',
    regulatoryViolation: '21 CFR § 211.188(b)(11) & 18 U.S.C. § 1001: Signing for another person is falsification of GMP records and a critical regulatory offense.',
    remediation: 'Immediate notification to Quality Assurance and Plant Management, quarantine of affected batch, human resources review, and mandatory re-qualification on data integrity.',
    correctIssueId: 'opt-proxy-sign',
    issueOptions: [
      { id: 'opt-supervisor-needed', label: 'Verification requires a manager rather than a second operator', isCorrect: false },
      { id: 'opt-proxy-sign', label: 'Proxy / Ghost signing (Signing on behalf of another person is falsification)', isCorrect: true },
      { id: 'opt-no-date', label: 'Verification step is missing the time stamp', isCorrect: false },
      { id: 'opt-compliant-proxy', label: 'Compliant signature: coworker delegated signing authority during lunch break', isCorrect: false }
    ]
  },
  {
    id: 'hs-9',
    fieldCode: 'CORR-09',
    label: 'Blending Mix Time Error Correction',
    cellCoords: { row: 5, col: 1 },
    status: 'compliant',
    snippet: {
      fieldLabel: 'Total Blend Duration (Minutes):',
      originalText: '45 min',
      correctedText: '35 min',
      reasonCode: 'EE',
      reasonText: 'Entry Error',
      initials: 'BTR',
      dateText: '02-SEP-2026',
      timeText: '11:15',
      styleType: 'clean_single_strike',
      inkColor: 'blue',
      notes: 'Single horizontal strikethrough, corrected value above, EE code, initialed and dated.'
    },
    findingTitle: 'Fully Compliant GDP Error Correction',
    findingDescription: 'Single strikethrough preserves original text legibility. Corrected value is written adjacent with standard reason code "EE", operator initials "BTR", and contemporaneous date/time.',
    regulatoryViolation: 'None. This demonstrates proper error correction under FDA 21 CFR § 211.194 & EU GMP Chapter 4.8.',
    remediation: 'No remediation required. Compliant benchmark.',
    correctIssueId: 'opt-compliant-correction',
    issueOptions: [
      { id: 'opt-needs-supervisor', label: 'Correction is invalid because supervisor did not counter-initial', isCorrect: false },
      { id: 'opt-compliant-correction', label: 'Compliant GDP error correction: single strikethrough, legible original, reason code, initials & date', isCorrect: true },
      { id: 'opt-wrong-code', label: 'Reason code "EE" is not an internationally recognized GDP code', isCorrect: false },
      { id: 'opt-time-violation', label: 'Blend duration correction requires a full formal deviation report', isCorrect: false }
    ]
  },
  {
    id: 'hs-10',
    fieldCode: 'VOID-10',
    label: 'Unused In-Process Quality Check Rows',
    cellCoords: { row: 5, col: 2 },
    status: 'compliant',
    snippet: {
      fieldLabel: 'Optional Extended Run Rows 4-6:',
      originalText: '',
      correctedText: 'N/A - Standard batch volume run completed',
      initials: 'BTR',
      dateText: '02-SEP-2026',
      styleType: 'proper_na_line',
      inkColor: 'blue',
      notes: 'Diagonal line across cell, marked N/A with rationale, initialed and dated.'
    },
    findingTitle: 'Compliant Voiding of Unused Section (Diagonal Z-Line)',
    findingDescription: 'Technician correctly drew a clean diagonal line across unused optional rows, annotated "N/A" with the reason, and initialed and dated contemporaneously.',
    regulatoryViolation: 'None. Fully satisfies EU GMP Chapter 4 § 4.9 & PIC/S PI 041-1 requirements for voiding blank spaces.',
    remediation: 'No remediation required. Fully compliant.',
    correctIssueId: 'opt-compliant-void',
    issueOptions: [
      { id: 'opt-blank-allowed', label: 'Rows should have been left completely empty without any markings', isCorrect: false },
      { id: 'opt-scissors-needed', label: 'Unused section should have been cut off the form with scissors', isCorrect: false },
      { id: 'opt-whiteout-needed', label: 'Unused section should have been covered with opaque correction tape', isCorrect: false },
      { id: 'opt-compliant-void', label: 'Compliant voiding: single diagonal line, "N/A" annotation with reason, initialed and dated', isCorrect: true }
    ]
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q-correction-1',
    questionNumber: 1,
    category: 'corrections',
    title: 'Making a Compliant Error Correction',
    scenarioText: 'While documenting an analytical titration volume in a QC logbook, an analyst accidentally wrote "24.50 mL" instead of the true observed volume of "24.05 mL".',
    questionPrompt: 'Which of the following demonstrates the compliant GDP method to correct this entry under FDA and EU GMP regulations?',
    options: [
      {
        id: 'opt-1a',
        label: 'Option A: Single strikethrough, corrected value above, reason code, initials, date',
        snippet: {
          fieldLabel: 'Titration Volume (mL):',
          originalText: '24.50 mL',
          correctedText: '24.05 mL',
          reasonCode: 'TE',
          reasonText: 'Transposition Error',
          initials: 'ELR',
          dateText: '02-SEP-2026',
          styleType: 'clean_single_strike',
          inkColor: 'blue'
        },
        isCorrect: true,
        explanation: 'Correct! Complies with 21 CFR § 211.194 and EU GMP Ch 4.8. A single clean strikethrough leaves the original text completely legible, the correct value is adjacent, and the reason code (TE for Transposition Error), initials, and contemporaneous date are recorded.'
      },
      {
        id: 'opt-1b',
        label: 'Option B: White-out correction fluid over original value',
        snippet: {
          fieldLabel: 'Titration Volume (mL):',
          originalText: '24.50 mL',
          correctedText: '24.05 mL',
          styleType: 'whiteout',
          inkColor: 'blue'
        },
        isCorrect: false,
        explanation: 'Incorrect! Liquid paper / correction fluid or tape is strictly prohibited. It obscures the original observation and raises regulatory suspicion of deliberate tampering.',
        flawAnalysis: 'Violates Legible & Accurate principles. 21 CFR § 211.194 explicitly requires original entries to remain readable.'
      },
      {
        id: 'opt-1c',
        label: 'Option C: Heavy cross-hatch scribble blackout',
        snippet: {
          fieldLabel: 'Titration Volume (mL):',
          originalText: '24.50 mL',
          correctedText: '24.05 mL',
          styleType: 'scribble_blackout',
          initials: 'ELR',
          inkColor: 'black'
        },
        isCorrect: false,
        explanation: 'Incorrect! Heavily scribbling out a mistake destroys the legibility of the original entry. An auditor cannot verify what was originally recorded.',
        flawAnalysis: 'Violates EU GMP Chapter 4.8 ("the alteration should permit the reading of the original information").'
      },
      {
        id: 'opt-1d',
        label: 'Option D: Tracing and overwriting the "5" into a "0"',
        snippet: {
          fieldLabel: 'Titration Volume (mL):',
          originalText: '24.50 mL',
          correctedText: '24.05 mL',
          styleType: 'overwritten',
          inkColor: 'blue'
        },
        isCorrect: false,
        explanation: 'Incorrect! Overwriting or tracing numbers creates ambiguity and conceals when and why the value was changed.',
        flawAnalysis: 'Overwriting is classified as an unauthorized record alteration under MHRA / FDA data integrity guidelines.'
      }
    ],
    correctOptionId: 'opt-1a',
    rationale: {
      regulatoryRequirement: 'FDA 21 CFR § 211.194 & EU GMP Volume 4 Chapter 4.8',
      whyCorrect: 'A compliant correction must never obscure original data. A single line through the error, adjacent correct number, reason code, signature/initials, and date fulfill all ALCOA+ mandates.',
      whyOthersFail: 'White-out, scribbles, and overwriting all destroy the readability of the primary observation, preventing independent quality review.',
      cfrCitation: '21 CFR § 211.194'
    }
  },
  {
    id: 'q-date-format-2',
    questionNumber: 2,
    category: 'dates',
    title: 'International Date & Time Standards',
    scenarioText: 'You are working at a global pharmaceutical manufacturing site that exports sterile injectables to both the United States and the European Union. You must record the sterilization completion date and time.',
    questionPrompt: 'Which format is compliant and prevents dangerous international date confusion?',
    options: [
      {
        id: 'opt-2a',
        label: 'Option A: 09/02/26 at 3:15',
        snippet: {
          fieldLabel: 'Cycle Completion Timestamp:',
          originalText: '',
          correctedText: '09/02/26 3:15',
          initials: 'JK',
          styleType: 'ambiguous_date',
          inkColor: 'blue'
        },
        isCorrect: false,
        explanation: 'Incorrect! Highly ambiguous: In the US this means September 2, 2026, while in Europe it means February 9, 2026. Also lacks AM/PM or 24h clock specification.',
        flawAnalysis: 'Numerical slash format is flagged in FDA / EMA inspections due to risk of shelf-life / expiry calculation errors.'
      },
      {
        id: 'opt-2b',
        label: 'Option B: 02-SEP-2026 15:15',
        snippet: {
          fieldLabel: 'Cycle Completion Timestamp:',
          originalText: '',
          correctedText: '02-SEP-2026 15:15',
          initials: 'JKM',
          styleType: 'standard_date',
          inkColor: 'blue'
        },
        isCorrect: true,
        explanation: 'Correct! Alpha-numeric month (SEP) leaves no doubt about whether the day or month came first. 4-digit year (2026) and 24-hour military time (15:15) prevent AM/PM confusion.',
        flawAnalysis: 'Globally accepted gold-standard GDP date format per WHO Technical Report Series 996.'
      },
      {
        id: 'opt-2c',
        label: 'Option C: Sep 2nd at quarter past three',
        snippet: {
          fieldLabel: 'Cycle Completion Timestamp:',
          originalText: '',
          correctedText: 'Sep 2nd ~3:15 pm',
          initials: 'JKM',
          styleType: 'clean_entry',
          inkColor: 'blue'
        },
        isCorrect: false,
        explanation: 'Incorrect! Colloquial or conversational time expressions and approximate markers (~) are never acceptable in GxP records.',
        flawAnalysis: 'Fails ALCOA Accurate and Consistent principles.'
      },
      {
        id: 'opt-2d',
        label: 'Option D: Leaving the date blank because the page header already has today’s date',
        snippet: {
          fieldLabel: 'Cycle Completion Timestamp:',
          originalText: '',
          correctedText: '',
          styleType: 'empty_blank'
        },
        isCorrect: false,
        explanation: 'Incorrect! Each critical operational action must be contemporaneously dated by the executing operator on the specific execution row.',
        flawAnalysis: 'Violates Contemporaneous and Attributable requirements of 21 CFR § 211.188.'
      }
    ],
    correctOptionId: 'opt-2b',
    rationale: {
      regulatoryRequirement: 'WHO TRS 996 / ICH Q7 § 6.1',
      whyCorrect: 'Using a 3-letter month abbreviation (e.g. 02-SEP-2026) eliminates international date-order ambiguity, and 24-hour time prevents 12-hour AM/PM errors.',
      whyOthersFail: 'Numeric dates like 09/02/26 create multi-month discrepancy risks between US and EU regulatory reviewers.',
      cfrCitation: 'WHO TRS 996 Annex 5'
    }
  },
  {
    id: 'q-blank-fields-3',
    questionNumber: 3,
    category: 'records',
    title: 'Managing Unused Spaces & Blank Table Rows',
    scenarioText: 'A tablet compression logsheet provides 10 rows for hourly metal detector challenge tests. The production run was completed in 6 hours, leaving rows 7 through 10 unused.',
    questionPrompt: 'How should the technician manage rows 7 through 10 to maintain regulatory compliance?',
    options: [
      {
        id: 'opt-3a',
        label: 'Option A: Leave rows 7-10 empty and blank since the run ended early',
        snippet: {
          fieldLabel: 'Metal Detector Challenge Tests (Rows 7-10):',
          originalText: '',
          correctedText: '',
          styleType: 'empty_blank'
        },
        isCorrect: false,
        explanation: 'Incorrect! Blank rows create opportunity for unauthorized back-dated entries and cause auditors to question if testing was skipped.',
        flawAnalysis: 'Violates the Complete (+C) ALCOA+ requirement.'
      },
      {
        id: 'opt-3b',
        label: 'Option B: Draw a single diagonal line through rows 7-10, write "N/A - Run concluded", initial, and date',
        snippet: {
          fieldLabel: 'Metal Detector Challenge Tests (Rows 7-10):',
          originalText: '',
          correctedText: 'N/A - Run concluded at 6 hr mark',
          initials: 'CPG',
          dateText: '02-SEP-2026',
          styleType: 'proper_na_line',
          inkColor: 'blue'
        },
        isCorrect: true,
        explanation: 'Correct! Voiding unused space with a diagonal line ("Z-line"), marking "N/A" with brief justification, initials, and date securely closes the form.',
        flawAnalysis: 'Standard regulatory practice under EU GMP Chapter 4 and PIC/S PI 041-1.'
      },
      {
        id: 'opt-3c',
        label: 'Option C: Use ditto marks (") down the remaining rows to repeat the row 6 passing result',
        snippet: {
          fieldLabel: 'Metal Detector Challenge Tests (Rows 7-10):',
          originalText: '',
          correctedText: '" " " " (ditto)',
          styleType: 'ditto_marks',
          inkColor: 'blue'
        },
        isCorrect: false,
        explanation: 'Incorrect! Entering fake tests with ditto marks when tests were not performed constitutes intentional falsification of safety testing.',
        flawAnalysis: 'Gross violation of 21 CFR § 211.188 and criminal falsification of records.'
      },
      {
        id: 'opt-3d',
        label: 'Option D: Cut off the bottom half of the paper with scissors so empty rows do not show',
        snippet: {
          fieldLabel: 'Metal Detector Challenge Tests (Rows 7-10):',
          originalText: '',
          correctedText: '[Page physically altered]',
          styleType: 'empty_blank'
        },
        isCorrect: false,
        explanation: 'Incorrect! Physically trimming or tearing official records is an egregious compliance breach.',
        flawAnalysis: 'Direct violation of 21 CFR § 211.180 (record integrity).'
      }
    ],
    correctOptionId: 'opt-3b',
    rationale: {
      regulatoryRequirement: 'EU GMP Chapter 4.9 & PIC/S PI 041-1 § 8.5',
      whyCorrect: 'Crossing out unused spaces with a single diagonal line, initialing, dating, and annotating N/A prevents subsequent fraudulent entries while accounting for the empty space.',
      whyOthersFail: 'Leaving fields blank invites tampering; fake ditto marks represent falsification; mutilating pages is a severe non-compliance.',
      cfrCitation: 'EU GMP Chapter 4 § 4.9'
    }
  },
  {
    id: 'q-late-entry-4',
    questionNumber: 4,
    category: 'late_entries',
    title: 'Compliant Documentation of a Late Entry',
    scenarioText: 'At 08:30, a QA technician calibrated an analytical balance but had to immediately assist in a cleanroom containment emergency. At 14:00, the technician returns to record the balance calibration.',
    questionPrompt: 'What is the ONLY compliant way to document this calibration entry?',
    options: [
      {
        id: 'opt-4a',
        label: 'Option A: Write "08:30" as the time so it looks like it was done on schedule without questions',
        snippet: {
          fieldLabel: 'Daily Balance Calibration Check:',
          originalText: '',
          correctedText: 'Passed. Calibration verified. Tech: AL 08:30',
          styleType: 'late_entry_backdated',
          inkColor: 'blue'
        },
        isCorrect: false,
        explanation: 'Incorrect! This is backdating. Even if the work occurred at 08:30, writing that you documented it at 08:30 when it is currently 14:00 is falsification.',
        flawAnalysis: 'Violates Contemporaneous (ALCOA). If an automated system or building badge record shows you were in containment at 08:30, an investigator will issue a 483 warning.'
      },
      {
        id: 'opt-4b',
        label: 'Option B: Record it now at 14:00, explicitly label "Late Entry", state actual event time (08:30), provide reason, and sign with current timestamp',
        snippet: {
          fieldLabel: 'Daily Balance Calibration Check:',
          originalText: '',
          correctedText: 'Passed. Late Entry: Performed at 08:30 on 02-SEP-2026. Documentation delayed due to cleanroom emergency. AL 02-SEP-2026 14:00',
          styleType: 'late_entry_correct',
          inkColor: 'blue'
        },
        isCorrect: true,
        explanation: 'Correct! This preserves complete data integrity. It truthfully records when the pen met the paper (14:00), attributes the actual time of execution (08:30), and provides an auditable reason.',
        flawAnalysis: 'Fully compliant with FDA Data Integrity Guidance and WHO TRS 996.'
      },
      {
        id: 'opt-4c',
        label: 'Option C: Discard the morning run and perform an extra calibration at 14:00 without mentioning the 08:30 run',
        snippet: {
          fieldLabel: 'Daily Balance Calibration Check:',
          originalText: '',
          correctedText: 'Passed at 14:00. AL',
          styleType: 'clean_entry',
          inkColor: 'blue'
        },
        isCorrect: false,
        explanation: 'Incorrect! Morning production batches relied on the 08:30 calibration. Omitting the morning calibration leaves morning batches without documented verification.',
        flawAnalysis: 'Violates Complete and Original data integrity mandates.'
      },
      {
        id: 'opt-4d',
        label: 'Option D: Ask the supervisor to sign with the morning timestamp on your behalf',
        snippet: {
          fieldLabel: 'Daily Balance Calibration Check:',
          originalText: '',
          correctedText: 'Signed by Supv for AL at 08:30',
          styleType: 'ghost_signed',
          inkColor: 'blue'
        },
        isCorrect: false,
        explanation: 'Incorrect! A supervisor cannot sign for an activity they did not witness or execute, and backdating remains prohibited.',
        flawAnalysis: 'Violates Attributable and Contemporaneous principles.'
      }
    ],
    correctOptionId: 'opt-4b',
    rationale: {
      regulatoryRequirement: 'FDA 21 CFR § 211.188 & FDA Data Integrity Guidance Q&A #8',
      whyCorrect: 'A late entry must be transparently identified as a "Late Entry". It must document both the actual time of observation and the current time of writing, with the justification for delay.',
      whyOthersFail: 'Backdating or proxy signing is considered fraud under US Title 18 and international criminal codes.',
      cfrCitation: '21 CFR § 211.188'
    }
  },
  {
    id: 'q-instruments-5',
    questionNumber: 5,
    category: 'records',
    title: 'Writing Instruments and Media Standards',
    scenarioText: 'An environmental monitoring technician is entering microbial swab sample IDs onto an official environmental monitoring worksheet inside an aseptic core cleanroom.',
    questionPrompt: 'Which writing instrument is permitted for GxP documentation?',
    options: [
      {
        id: 'opt-5a',
        label: 'Option A: High-quality 0.5mm mechanical drafting pencil with polymer lead',
        snippet: {
          fieldLabel: 'Swab Location & Isolator ID:',
          originalText: '',
          correctedText: 'ISO-04 Left Glove Swab',
          styleType: 'pencil_erased',
          inkColor: 'pencil'
        },
        isCorrect: false,
        explanation: 'Incorrect! Pencils of any kind are strictly forbidden in GxP facilities because graphite is erasable, smudges, and sheds particulates in cleanrooms.',
        flawAnalysis: 'Violates the Enduring (+E) ALCOA+ requirement and Annex 1 cleanroom particulate standards.'
      },
      {
        id: 'opt-5b',
        label: 'Option B: Erasable thermo-sensitive gel pen (erasable by friction)',
        snippet: {
          fieldLabel: 'Swab Location & Isolator ID:',
          originalText: '',
          correctedText: 'ISO-04 Left Glove Swab',
          styleType: 'clean_entry',
          inkColor: 'blue'
        },
        isCorrect: false,
        explanation: 'Incorrect! Erasable gel pens (such as heat-erasing pens) become invisible when subjected to heat or friction, which can completely erase documents during archiving or transport.',
        flawAnalysis: 'Major citation in FDA 483 letters: erasable pens violate indelible record requirements.'
      },
      {
        id: 'opt-5c',
        label: 'Option C: Indelible permanent blue or black ballpoint pen',
        snippet: {
          fieldLabel: 'Swab Location & Isolator ID:',
          originalText: '',
          correctedText: 'ISO-04 Left Glove Swab',
          styleType: 'clean_entry',
          inkColor: 'blue'
        },
        isCorrect: true,
        explanation: 'Correct! Indelible blue or black ballpoint pen is the regulatory industry standard. It cannot be erased, does not wash out with mild moisture, and preserves wet ink evidence.',
        flawAnalysis: 'Complies with EU GMP Chapter 4.8 and US 21 CFR § 211.194.'
      },
      {
        id: 'opt-5d',
        label: 'Option D: Red fine-tip water-based felt marker',
        snippet: {
          fieldLabel: 'Swab Location & Isolator ID:',
          originalText: '',
          correctedText: 'ISO-04 Left Glove Swab',
          styleType: 'clean_entry',
          inkColor: 'red_flag'
        },
        isCorrect: false,
        explanation: 'Incorrect! Red ink is reserved for QA review/approval stamps or auditing notations, and water-based felt pens bleed through paper or wash away if water touches the record.',
        flawAnalysis: 'Red ink is restricted; water-soluble markers violate the Enduring requirement.'
      }
    ],
    correctOptionId: 'opt-5c',
    rationale: {
      regulatoryRequirement: 'EU GMP Chapter 4 § 4.8 & 21 CFR § 211.194',
      whyCorrect: 'Entries must be indelible. Permanent ballpoint pen ink binds to paper fibers and cannot be altered without leaving visible evidence.',
      whyOthersFail: 'Pencil is erasable; heat-sensitive pens disappear; felt markers bleed and wash away.',
      cfrCitation: 'EU GMP Chapter 4 § 4.8'
    }
  },
  {
    id: 'q-signatures-6',
    questionNumber: 6,
    category: 'signatures',
    title: 'Attributable Execution & Signature Protocol',
    scenarioText: 'Operator Maria is adding an excipient to a compounding vessel. Her coworker Carlos is standing 3 feet away monitoring the vessel pressure. Maria’s gloved hands are coated with sticky excipient powder.',
    questionPrompt: 'Maria asks Carlos: "Can you sign my initials in the batch record for me so I don’t get powder on the binder?" What is Carlos required by GDP to do?',
    options: [
      {
        id: 'opt-6a',
        label: 'Option A: Carlos signs Maria’s initials since he watched her perform the step directly',
        snippet: {
          fieldLabel: 'Excipient Addition Verified By:',
          originalText: '',
          correctedText: 'Signed "MV" by Carlos',
          styleType: 'ghost_signed',
          inkColor: 'blue'
        },
        isCorrect: false,
        explanation: 'Incorrect! Carlos must NEVER sign Maria’s initials or name under any circumstances. Signing for someone else is falsification.',
        flawAnalysis: 'Direct violation of Attributable (ALCOA) and 21 CFR § 211.188.'
      },
      {
        id: 'opt-6b',
        label: 'Option B: Carlos refuses to sign Maria’s initials, and instructs Maria to de-glove and personally sign her own initials, or Carlos signs HIS OWN registered signature as the performer if authorized',
        snippet: {
          fieldLabel: 'Excipient Addition Verified By:',
          originalText: '',
          correctedText: 'M. Vega (De-gloved, personal registered signature)',
          styleType: 'clean_entry',
          inkColor: 'blue'
        },
        isCorrect: true,
        explanation: 'Correct! No one may ever sign for another person. Maria must change gloves or wash hands and sign herself, ensuring complete personal attribution.',
        flawAnalysis: 'Upholds the fundamental Attributable principle of ALCOA+.'
      },
      {
        id: 'opt-6c',
        label: 'Option C: Carlos signs his own name and writes "Authorized Proxy for Maria"',
        snippet: {
          fieldLabel: 'Excipient Addition Verified By:',
          originalText: '',
          correctedText: 'C. Ramos (Proxy for M. Vega)',
          styleType: 'clean_entry',
          inkColor: 'blue'
        },
        isCorrect: false,
        explanation: 'Incorrect! Operational batch execution signatures cannot be delegated via ad-hoc verbal proxies.',
        flawAnalysis: 'Proxy signatures in manufacturing execution are non-compliant unless formally designated under emergency SOP procedures.'
      },
      {
        id: 'opt-6d',
        label: 'Option D: Leave it unsigned until the end of the shift and have Maria sign all steps at once',
        snippet: {
          fieldLabel: 'Excipient Addition Verified By:',
          originalText: '',
          correctedText: '',
          styleType: 'empty_blank'
        },
        isCorrect: false,
        explanation: 'Incorrect! Postponing documentation until end of shift violates the Contemporaneous principle.',
        flawAnalysis: 'Violates 21 CFR § 211.188 (real-time recording).'
      }
    ],
    correctOptionId: 'opt-6b',
    rationale: {
      regulatoryRequirement: 'FDA 21 CFR § 211.188(b)(11) & Part 11 § 11.50',
      whyCorrect: 'Signatures and initials uniquely attribute responsibility. Proxy or ghost signing is treated as willful record falsification.',
      whyOthersFail: 'Signing someone else’s initials—even with their explicit verbal permission—destroys legal chain-of-custody.',
      cfrCitation: '21 CFR Part 11 § 11.50'
    }
  },
  {
    id: 'q-raw-data-7',
    questionNumber: 7,
    category: 'records',
    title: 'Raw Data Handling & Unofficial Scrap Media',
    scenarioText: 'A QC analyst is weighing 5 reference standards on a micro-balance. The official lab worksheet is on a desk 10 feet away. The analyst jots down the 5 weights on a paper towel, takes it to the desk, enters the weights into the worksheet, and throws the paper towel into the biohazard bin.',
    questionPrompt: 'What major GDP compliance principle was violated, and what was the correct procedure?',
    options: [
      {
        id: 'opt-7a',
        label: 'Option A: No violation occurred because the values entered in the worksheet were 100% accurate',
        snippet: {
          fieldLabel: 'Reference Standard Weights (g):',
          originalText: '',
          correctedText: '0.1004 g, 0.1002 g, 0.0998 g...',
          styleType: 'clean_entry',
          inkColor: 'blue'
        },
        isCorrect: false,
        explanation: 'Incorrect! Writing on paper towels or scrap paper and destroying them is a critical violation of the "Original" principle.',
        flawAnalysis: 'Inspectors search trash cans and recycling bins for scrap paper. Finding discarded raw data results in immediate 483 warning letters.'
      },
      {
        id: 'opt-7b',
        label: 'Option B: The "Original" ALCOA principle was violated; the analyst must bring the official worksheet directly to the balance or attach the certified printout tape directly to the worksheet',
        snippet: {
          fieldLabel: 'Reference Standard Weights (g):',
          originalText: '',
          correctedText: 'Direct entry from balance display + attached certified thermal balance tape with initials/date',
          styleType: 'clean_entry',
          inkColor: 'blue'
        },
        isCorrect: true,
        explanation: 'Correct! Data must be recorded directly into the authorized record at the point of origin, or captured via automated instrument printout affixed and signed directly in the notebook.',
        flawAnalysis: 'Fully aligns with FDA 21 CFR § 211.180(d) and WHO TRS 996.'
      },
      {
        id: 'opt-7c',
        label: 'Option C: The analyst should have photographed the paper towel with a personal smartphone instead of throwing it away',
        snippet: {
          fieldLabel: 'Reference Standard Weights (g):',
          originalText: '',
          correctedText: 'See mobile photo',
          styleType: 'clean_entry',
          inkColor: 'blue'
        },
        isCorrect: false,
        explanation: 'Incorrect! Personal smartphones are unvalidated devices, not permitted in cleanrooms, and introduce security/privacy non-conformances.',
        flawAnalysis: 'Unvalidated personal media cannot serve as certified true copies.'
      },
      {
        id: 'opt-7d',
        label: 'Option D: The supervisor should sign the paper towel before it is discarded',
        snippet: {
          fieldLabel: 'Reference Standard Weights (g):',
          originalText: '',
          correctedText: '',
          styleType: 'scrap_paper'
        },
        isCorrect: false,
        explanation: 'Incorrect! Paper towels are not authorized GxP documentation media under any circumstances.',
        flawAnalysis: 'Non-controlled paper cannot be certified as an official record.'
      }
    ],
    correctOptionId: 'opt-7b',
    rationale: {
      regulatoryRequirement: 'FDA 21 CFR § 211.180(d) & WHO TRS 996 § 4.2',
      whyCorrect: 'Original raw data must be preserved. Transcribing from scrap paper risks transcription errors and conceals original measurements.',
      whyOthersFail: 'Discarding scrap paper containing primary observations destroys auditability.',
      cfrCitation: '21 CFR § 211.180(d)'
    }
  },
  {
    id: 'q-alcoa-plus-8',
    questionNumber: 8,
    category: 'alcoa',
    title: 'The ALCOA+ "Enduring" Principle and Thermal Balance Strips',
    scenarioText: 'A high-precision analytical balance outputs an adhesive thermal paper printout showing weights and timestamps. Over time, thermal paper is known to fade and turn completely blank within 12 to 24 months due to ambient light and heat.',
    questionPrompt: 'To satisfy the "+Enduring" requirement of ALCOA+, what must be done with this thermal printout?',
    options: [
      {
        id: 'opt-8a',
        label: 'Option A: Tape the thermal paper strip into the notebook and apply clear packaging tape over the entire surface to seal it',
        snippet: {
          fieldLabel: 'Thermal Balance Printout:',
          originalText: '',
          correctedText: '[Thermal tape covered in clear tape]',
          styleType: 'clean_entry'
        },
        isCorrect: false,
        explanation: 'Incorrect! The adhesive in clear tape chemically reacts with thermal paper coatings, accelerating ink disappearance to under 48 hours!',
        flawAnalysis: 'Well-known laboratory trap: clear adhesive tape causes immediate bleaching of thermal printouts.'
      },
      {
        id: 'opt-8b',
        label: 'Option B: Make a high-resolution photocopy of the thermal printout on archival bond paper, verify it, label it "Certified True Copy", sign/initial and date, and file it with the original',
        snippet: {
          fieldLabel: 'Thermal Balance Printout:',
          originalText: '',
          correctedText: 'Affixed certified photocopy: "Certified True Copy" signed J. Taylor, 02-SEP-2026',
          styleType: 'clean_entry',
          inkColor: 'blue'
        },
        isCorrect: true,
        explanation: 'Correct! Because thermal paper fades, a certified true photocopy on durable archival paper with initials and date ensures the record remains enduring throughout the required statutory retention period.',
        flawAnalysis: 'Conforms to 21 CFR § 211.180 and WHO TRS 996 requirements for certified copies.'
      },
      {
        id: 'opt-8c',
        label: 'Option C: Simply re-type the numbers into an Excel spreadsheet without keeping the printout',
        snippet: {
          fieldLabel: 'Thermal Balance Printout:',
          originalText: '',
          correctedText: 'Excel transcription',
          styleType: 'clean_entry'
        },
        isCorrect: false,
        explanation: 'Incorrect! Unvalidated Excel spreadsheets without 21 CFR Part 11 audit trails cannot replace primary instrument raw data.',
        flawAnalysis: 'Violates Part 11 and Original raw data requirements.'
      },
      {
        id: 'opt-8d',
        label: 'Option D: Store the notebook in a standard freezer to keep the thermal paper cold',
        snippet: {
          fieldLabel: 'Thermal Balance Printout:',
          originalText: '',
          correctedText: '',
          styleType: 'clean_entry'
        },
        isCorrect: false,
        explanation: 'Incorrect! Freezing paper causes condensation and water damage, ruining the paper fibers.',
        flawAnalysis: 'Unfeasible and damages physical record media.'
      }
    ],
    correctOptionId: 'opt-8b',
    rationale: {
      regulatoryRequirement: 'FDA 21 CFR § 211.180 & EU GMP Chapter 4.9',
      whyCorrect: 'Records must endure for the full product lifecycle plus statutory retention period. Thermal paper degrades quickly, so a signed and dated "Certified True Copy" guarantees preservation.',
      whyOthersFail: 'Clear tape destroys thermal printout chemistry; untracked spreadsheets lack raw data provenance.',
      cfrCitation: '21 CFR § 211.180'
    }
  }
];

export const ACRONYMS: AcronymItem[] = [
  // Regulatory Bodies & Legal Frameworks
  {
    id: 'acr-gdp',
    acronym: 'GDP',
    fullName: 'Good Documentation Practices',
    category: 'regulatory',
    definition: 'A set of standards and principles governing how pharmaceutical, biotech, and medical device records must be recorded, maintained, and modified.',
    floorContext: 'Every time you put pen to paper in a batch record, test sheet, or logbook, you must follow GDP rules.'
  },
  {
    id: 'acr-gmp',
    acronym: 'GMP / cGMP',
    fullName: 'Current Good Manufacturing Practices',
    category: 'regulatory',
    definition: 'Legally enforceable regulations enforced by health authorities requiring drug manufacturers to ensure products are safe, pure, and effective.',
    floorContext: 'The "c" stands for current, meaning our cleanroom procedures and equipment must follow modern, state-of-the-art standards.'
  },
  {
    id: 'acr-gxp',
    acronym: 'GxP',
    fullName: 'Good "x" Practice',
    category: 'regulatory',
    definition: 'An umbrella term covering all quality guidelines, where "x" stands for Manufacturing (GMP), Laboratory (GLP), Clinical (GCP), or Distribution (GDP).',
    floorContext: 'If someone says "this is a GxP record", it means it is legally audited and subject to government inspection.'
  },
  {
    id: 'acr-cfr',
    acronym: 'CFR',
    fullName: 'Code of Federal Regulations',
    category: 'regulatory',
    definition: 'The codification of general and permanent federal rules in the United States. Title 21 (21 CFR) governs food and drugs.',
    floorContext: 'Part 211 specifies drug manufacturing rules; Part 11 sets electronic signature and electronic record rules.'
  },
  {
    id: 'acr-fda',
    acronym: 'FDA',
    fullName: 'Food and Drug Administration (United States)',
    category: 'regulatory',
    definition: 'The federal regulatory agency of the US Department of Health and Human Services responsible for protecting and promoting public health.',
    floorContext: 'FDA inspectors can enter our manufacturing plant unannounced to review batch records, inspect cleanrooms, and interview operators.'
  },
  {
    id: 'acr-ema',
    acronym: 'EMA',
    fullName: 'European Medicines Agency',
    category: 'regulatory',
    definition: 'The decentralized agency of the European Union responsible for the scientific evaluation, supervision, and safety monitoring of medicines.',
    floorContext: 'Enforces EU GMP Annex 11 (computerized systems) and EU GMP Chapter 4 (documentation standards).'
  },
  {
    id: 'acr-mhra',
    acronym: 'MHRA',
    fullName: 'Medicines and Healthcare products Regulatory Agency (UK)',
    category: 'regulatory',
    definition: 'The UK executive agency that pioneered global Data Integrity Guidance and inspection standards.',
    floorContext: 'MHRA authored the definitive definitions for ALCOA+ data governance used worldwide.'
  },
  {
    id: 'acr-who',
    acronym: 'WHO',
    fullName: 'World Health Organization',
    category: 'regulatory',
    definition: 'A specialized United Nations agency that publishes international GMP standards such as WHO Technical Report Series (TRS) 996 on Data Integrity.',
    floorContext: 'Sets the worldwide benchmark for how raw data and certified true copies must be preserved.'
  },
  {
    id: 'acr-pics',
    acronym: 'PIC/S',
    fullName: 'Pharmaceutical Inspection Co-operation Scheme',
    category: 'regulatory',
    definition: 'An international cooperative between 50+ regulatory authorities that standardizes GMP inspection rules across countries.',
    floorContext: 'Ensures that an inspection conducted in Germany, Japan, or the US follows the same documentation checklist.'
  },
  {
    id: 'acr-ich',
    acronym: 'ICH',
    fullName: 'International Council for Harmonisation',
    category: 'regulatory',
    definition: 'Global council harmonizing technical drug development and manufacturing guidelines (e.g., ICH Q7 for active pharmaceutical ingredients).',
    floorContext: 'Ensures global batch records and validation protocols meet uniform international standards.'
  },

  // Shopfloor & Production Records
  {
    id: 'acr-bmr',
    acronym: 'BMR / PR',
    fullName: 'Batch Manufacturing Record / Production Record',
    category: 'shopfloor',
    definition: 'The official document or electronic run sheet printed for a specific lot, where operators record weights, temperatures, times, and signatures during production.',
    floorContext: 'This is the official record you document on during your shift. It provides the legal proof that the batch was made according to procedure.'
  },
  {
    id: 'acr-mbr',
    acronym: 'MBR',
    fullName: 'Master Batch Record',
    category: 'shopfloor',
    definition: 'The master, QA-approved template containing all instructions and acceptance limits before any production batch is run.',
    floorContext: 'Never copy a blank page from another batch. Every production record is formally issued directly from the approved MBR.'
  },
  {
    id: 'acr-sop',
    acronym: 'SOP',
    fullName: 'Standard Operating Procedure',
    category: 'shopfloor',
    definition: 'Controlled, written instructions describing step-by-step how an operational task, cleaning procedure, or test must be executed.',
    floorContext: 'You must read and be trained on the current effective version of an SOP before performing the work on the floor.'
  },
  {
    id: 'acr-ipc',
    acronym: 'IPC',
    fullName: 'In-Process Control',
    category: 'shopfloor',
    definition: 'Checks and tests performed during production (e.g., tablet hardness, pH, fill weight) to monitor and verify process consistency.',
    floorContext: 'When you take an IPC sample, enter the measurement immediately into the BMR alongside your initials and timestamp.'
  },
  {
    id: 'acr-wfi',
    acronym: 'WFI',
    fullName: 'Water for Injection',
    category: 'shopfloor',
    definition: 'Ultra-pure, sterile pharmaceutical water produced by distillation or reverse osmosis used for injectable liquid medicines.',
    floorContext: 'Flushing and sanitization lines with WFI requires recording exact flow rates and conductivity values.'
  },
  {
    id: 'acr-cip-sip',
    acronym: 'CIP / SIP',
    fullName: 'Clean-in-Place / Steam-in-Place',
    category: 'shopfloor',
    definition: 'Automated systems that circulate cleaning agents and high-pressure steam through processing tanks and pipes without disassembly.',
    floorContext: 'Operators must verify and attach chart recorder or digital cycle printouts to the BMR after every cycle.'
  },

  // Quality, Compliance & Inspection
  {
    id: 'acr-qa',
    acronym: 'QA',
    fullName: 'Quality Assurance',
    category: 'quality',
    definition: 'The department responsible for establishing the quality management system, approving procedures, and releasing product batches.',
    floorContext: 'QA are your compliance partners on the floor. If you ever have a doubt about an error correction, ask QA.'
  },
  {
    id: 'acr-qc',
    acronym: 'QC',
    fullName: 'Quality Control',
    category: 'quality',
    definition: 'The testing laboratory and sampling team that tests raw materials, in-process samples, and finished goods against specifications.',
    floorContext: 'QC analysts verify chemical purity, potency, and sterility before any batch can be shipped.'
  },
  {
    id: 'acr-capa',
    acronym: 'CAPA',
    fullName: 'Corrective and Preventive Action',
    category: 'quality',
    definition: 'A formal system to investigate the root cause of non-conformances, correct the problem, and prevent it from recurring.',
    floorContext: 'If an error or machine fault occurs, a CAPA is opened to fix the root cause (e.g. updating an SOP or retrained operators).'
  },
  {
    id: 'acr-oos',
    acronym: 'OOS',
    fullName: 'Out of Specification',
    category: 'quality',
    definition: 'A test result or critical process parameter that falls outside the pre-approved, validated acceptance criteria.',
    floorContext: 'If a weight reading is OOS, NEVER re-weigh silently until you get a passing number. Report it to your lead immediately.'
  },
  {
    id: 'acr-oot',
    acronym: 'OOT',
    fullName: 'Out of Trend',
    category: 'quality',
    definition: 'A result that is technically within specifications, but diverges significantly from historical manufacturing data.',
    floorContext: 'Warns engineers of early equipment drift before a true failure occurs.'
  },
  {
    id: 'acr-dev',
    acronym: 'DEV',
    fullName: 'Deviation',
    category: 'quality',
    definition: 'Any departure from an approved instruction, SOP, or specified standard operating condition during manufacturing.',
    floorContext: 'A spilled chemical, a power blink, or a missed step requires documenting a Deviation in real-time.'
  },
  {
    id: 'acr-form483',
    acronym: 'Form 483',
    fullName: 'FDA Inspectional Observations (Form FDA 483)',
    category: 'quality',
    definition: 'The official document presented to company management at the conclusion of an FDA inspection listing conditions that violate GMP.',
    floorContext: 'Common 483 findings include erasable pens, missing signatures, post-it notes, backdating, and white-out.'
  },
  {
    id: 'acr-wl',
    acronym: 'WL',
    fullName: 'Warning Letter',
    category: 'quality',
    definition: 'A formal public letter issued by the FDA for serious GMP violations that may lead to drug seizures, injunctions, or plant shutdowns.',
    floorContext: 'A Warning Letter is published online and damages the company reputation and customer trust.'
  },
  {
    id: 'acr-coa',
    acronym: 'CoA',
    fullName: 'Certificate of Analysis',
    category: 'quality',
    definition: 'An authenticated document reporting the results of analytical testing performed on a specific batch of raw material or drug.',
    floorContext: 'Warehouse operators verify the CoA lot numbers against supplier drums before releasing ingredients to production.'
  },

  // Systems & Electronic Records
  {
    id: 'acr-lims',
    acronym: 'LIMS',
    fullName: 'Laboratory Information Management System',
    category: 'systems',
    definition: 'Software that manages laboratory samples, instrument data interfaces, and analytical test results with audit trails.',
    floorContext: 'LIMS automatically logs who entered a test result and the exact millisecond it was saved.'
  },
  {
    id: 'acr-mes',
    acronym: 'MES',
    fullName: 'Manufacturing Execution System',
    category: 'systems',
    definition: 'A computerized system that tracks and documents the transformation of raw materials to finished goods on the production floor.',
    floorContext: 'Electronic batch records (eBR) within MES require individual operator electronic badge logins.'
  },
  {
    id: 'acr-alcoa',
    acronym: 'ALCOA / ALCOA+',
    fullName: 'Attributable, Legible, Contemporaneous, Original, Accurate + Complete, Consistent, Enduring, Available',
    category: 'systems',
    definition: 'The internationally recognized foundational framework of data integrity across all manual and digital records.',
    floorContext: 'The 9 golden rules that ensure our data can be trusted by doctors, patients, and global regulators.'
  },

  // GDP Reason & Correction Codes
  {
    id: 'acr-ee',
    acronym: 'EE',
    fullName: 'Entry Error (GDP Code)',
    category: 'correction_codes',
    definition: 'Standardized notation used when a value was miswritten or entered in the wrong line or box.',
    floorContext: 'Example: You accidentally wrote 22.4°C into the humidity box. Strike through once, write the true humidity, write "EE", initial, and date.'
  },
  {
    id: 'acr-te',
    acronym: 'TE',
    fullName: 'Typographical / Transposition Error (GDP Code)',
    category: 'correction_codes',
    definition: 'Standardized notation used when numbers or letters were inverted (e.g. 14.52 kg instead of 14.25 kg).',
    floorContext: 'Strike through the inverted digits with a single horizontal line, write the correct number, add "TE", initial, and date.'
  },
  {
    id: 'acr-le',
    acronym: 'LE',
    fullName: 'Late Entry (GDP Code)',
    category: 'correction_codes',
    definition: 'Standardized notation required when recording an observation or task after the immediate contemporaneous window.',
    floorContext: 'Must state when the event actually happened, why the documentation was delayed, and be signed with today’s timestamp.'
  },
  {
    id: 'acr-ce',
    acronym: 'CE',
    fullName: 'Calculation Error (GDP Code)',
    category: 'correction_codes',
    definition: 'Standardized notation used when a manual arithmetic calculation (yield, assay average, dilution) is corrected.',
    floorContext: 'Strike through the incorrect math result, write the verified recalculation, add "CE", initial, and date.'
  },
  {
    id: 'acr-na',
    acronym: 'N/A',
    fullName: 'Not Applicable',
    category: 'correction_codes',
    definition: 'Mandatory annotation written alongside a single diagonal or Z-strike through unused tables or blank lines.',
    floorContext: 'Never leave blank lines. Strike through the unused space, write "N/A - [Brief Reason]", initial, and date.'
  }
];

export const NEW_HIRE_SHIFT_STEPS: NewHireShiftStep[] = [
  {
    id: 'step-lucky-pencil',
    stepNumber: 1,
    timeLabel: '06:45 • Locker Room',
    location: 'AnyPharm Employee Locker Area & Breakroom',
    title: 'The Lucky Pencil & What is GDP?',
    subtitle: 'Susan arrives for her very first 7:00 AM shift and meets experienced coworker Grace D. Porter.',
    situation: 'Our hero, Susan Pulido, is starting her very first shift with AnyPharm, a company that manufactures supplies for managing diabetes. She gets in early for her 7am shift, and strikes up a conversation with a fellow employee Grace D. Porter. Grace has been working for AnyPharm for two years, and is very experienced with how things operate.',
    dialogue: [
      {
        speaker: 'Grace',
        text: '“So, are you excited to work here?”'
      },
      {
        speaker: 'Susan',
        text: '“Definitely! I even brought my lucky pencil!”'
      },
      {
        speaker: 'Grace',
        text: '“Oh, I’m sorry, but pencils aren’t allowed on the production floor. You’ll have to leave it in your locker.”'
      },
      {
        speaker: 'Susan',
        text: '“Oh, ok. But why?”'
      },
      {
        speaker: 'Grace',
        text: '“GDP.”'
      },
      {
        speaker: 'Susan',
        text: '“GDP? What is that?”'
      },
      {
        speaker: 'Grace',
        text: '“GDP stands for Good Documentation Practices. We follow GDP guidelines to make sure our documentation is as accurate as possible. Given the nature of what we make, it’s extremely important to be sure that everything we do, and everything we say about it is correct.”'
      },
      {
        speaker: 'Susan',
        text: '“Ok, that makes sense. But what does that have to do with my lucky pencil?”'
      },
      {
        speaker: 'Grace',
        text: '“Pencils can be erased, or easily changed. GDP requires that all records be clear and permanent, and pencil marks are temporary. Looking at a document with eraser marks brings into question how accurate it is. I mean, can you imagine getting back your tax return, with eraser marks all over it?”'
      },
      {
        speaker: 'Susan',
        text: '“Ok, point taken, no pencils. But does that mean I can’t ever make a mistake? I’m not sure I can be perfect all the time!”'
      },
      {
        speaker: 'Grace',
        text: '“Not at all, people make mistakes, and GDP takes that into consideration. If you make a mistake, you just need to correct it, using a few simple rules: 1) Draw a single line through the mistake. You should be able to see what the error was, so don’t scratch it out, overwrite it or use correctional fluid. 2) Write the correction above it. 3) Initial and date the correction, so that anyone reviewing it will know when it was made, and who to come to if they have a question. 4) If necessary, include a brief comment about the error. If there isn’t enough room, this can be a footnote. And that is it! Practice this a couple of times, you’ll see that it is pretty easy, and makes a lot of sense.”'
      }
    ],
    ruleInPlainEnglish: 'Pencils and erasers are never allowed on the production floor. Records must be permanent, indelible, and transparent. If you make a mistake, follow the 4 simple rules—never hide or erase it!',
    whatYouMustDo: [
      'Leave pencils, erasable pens, mechanical pencils, and correction tape in your locker.',
      'Use an approved permanent blue or black ballpoint pen provided by AnyPharm.',
      'Remember the 4 simple rules for any error: 1) Single line strike, 2) Write correction above, 3) Initial and date, 4) Brief comment/reason.'
    ],
    whatYouMustNeverDo: [
      'Never bring a wooden or mechanical pencil onto the production floor.',
      'Never use an eraser, whiteout, correction tape, or chemical ink remover on any record.',
      'Never panic when an error occurs—mistakes are normal and expected in manufacturing.'
    ],
    floorAnalogy: 'Grace’s Tax Return Analogy: Can you imagine getting back your tax return with eraser marks all over it? Erased marks destroy credibility and make auditors suspect fraud.',
    commonTrap: 'Thinking you must be 100% flawless and never make a mistake. Human errors happen to everyone—GDP is designed to manage mistakes openly and honestly with a clean audit trail.',
    badge: 'The Lucky Pencil Rule',
    diabetesContext: 'AnyPharm makes blood glucose test strips, insulin pens, and continuous glucose monitors. If our numbers cannot be trusted, a diabetic patient could receive an incorrect insulin dose.',
    interactiveChallenge: {
      prompt: 'Put Susan’s lucky pencil into her locker and equip the AnyPharm approved indelible blue pen.',
      type: 'pencil_swap'
    },
  },
  {
    id: 'step-pen-check',
    stepNumber: 2,
    timeLabel: '07:15 • Cleanroom Airlock',
    location: 'Cleanroom Gowning Airlock • Bay 2 (Diabetic Test Strip Prep)',
    title: 'Gowning Up & The Approved Pen',
    subtitle: 'Why blue ink is preferred, why red/gel pens are banned, and unambiguous date formats.',
    situation: 'Susan and Grace suit up in cleanroom lab coats, hair nets, and nitrile gloves. Grace pulls two blue ballpoint pens from the gowning supply rack and hands one to Susan.',
    dialogue: [
      {
        speaker: 'Grace',
        text: '“Here you go, Susan—an approved AnyPharm blue ballpoint pen. I always carry two in my pocket in case one runs dry during a production run.”'
      },
      {
        speaker: 'Susan',
        text: '“Thanks, Grace! Why blue instead of black or red? My favorite color is purple!”'
      },
      {
        speaker: 'Grace',
        text: '“Blue ink is great on the floor because when Quality photocopies a production sheet, the blue ink makes it instantly obvious which document is the original signature and which is a black-and-white copy! Red is reserved for QA reject stamps, and purple or green aren’t archival.”'
      },
      {
        speaker: 'Susan',
        text: '“And what about the date? How should I write today’s date?”'
      },
      {
        speaker: 'Grace',
        text: '“Always use DD-MMM-YYYY—like 02-SEP-2026. If you write 03/04/2026, an auditor from Europe thinks it is April 3rd, while an auditor in the US thinks it is March 4th. Writing the month as three letters removes any ambiguity!”'
      }
    ],
    ruleInPlainEnglish: 'Write all records using permanent, indelible blue or black ballpoint pen. Write dates with the month spelled out (DD-MMM-YYYY) so they can never be misinterpreted.',
    whatYouMustDo: [
      'Always carry an approved blue or black ballpoint pen on the production floor.',
      'Write dates in the DD-MMM-YYYY format (e.g., 02-SEP-2026).',
      'Record time in 24-hour military format (e.g., 07:15) to avoid AM/PM mix-ups.',
    ],
    whatYouMustNeverDo: [
      'Never use erasable gel pens (thermo-sensitive inks vanish if exposed to heat or friction).',
      'Never use red ink (reserved strictly for Quality Assurance quarantine tags).',
      'Never write ambiguous numeric dates like 04/05/2026.',
    ],
    floorAnalogy: 'Writing 04/05/2026 on a perishable glucose sensor enzyme batch is like buying milk with a blurry expiration date—nobody knows if it expires in April or May!',
    commonTrap: 'Using an erasable pen because it writes so smoothly. In an FDA audit, an inspector can rub the page or warm it under a lamp, and the ink disappears—resulting in an immediate Warning Letter.',
    badge: 'Pen & Date Standard',
    diabetesContext: 'Glucose oxidase enzyme solutions degrade rapidly with time and heat. Clear dates and times ensure reagents are strictly within their validated shelf-life.',
    interactiveChallenge: {
      prompt: 'Verify the cleanroom pen and select the unambiguous regulatory date format for today.',
      type: 'pencil_swap'
    }
  },
  {
    id: 'step-direct-entry',
    stepNumber: 3,
    timeLabel: '08:30 • Reagent Weighing',
    location: 'Formulation Suite • Glucose Sensor Enzyme Scale',
    title: 'Direct Entry: No Scrap Paper, Gloves, or Napkins',
    subtitle: 'Contemporaneous recording: as you observe the measurement, you write the data.',
    situation: 'Susan is weighing out 18.50 grams of glucose dehydrogenase reagent for Lot #GLU-9024 on a calibrated digital bench scale. With sanitizing alcohol on her gloves, she looks around for a scrap piece of packaging box or a paper towel to jot the number down.',
    dialogue: [
      {
        speaker: 'Susan',
        text: '“The scale reads 18.50 grams. My gloves are a little damp from the IPA sanitizer spray, so I was thinking of scribbling 18.50 on this scrap cardboard tag and copying it into the official log sheet after my gloves dry.”'
      },
      {
        speaker: 'Grace',
        text: '“Hold on right there, Susan! That’s one of the biggest and most common traps in production. We call that ‘secondary transcription’ or scrap paper recording.”'
      },
      {
        speaker: 'Susan',
        text: '“Why is that a problem if I copy it over neatly ten minutes from now?”'
      },
      {
        speaker: 'Grace',
        text: '“Two big reasons: First, scrap paper gets dropped, smudged, or thrown in the trash. If an FDA inspector looks in the plant trash can and finds discarded sticky notes with weights written on them, that is an automatic audit finding! Second, when copying from scrap paper, people transpose digits all the time—writing 15.80 instead of 18.50.”'
      },
      {
        speaker: 'Grace',
        text: '“Under GDP, all raw data must be entered DIRECTLY onto the official production record at the scale, at the exact moment the measurement happens. That’s what ‘contemporaneous’ and ‘original’ mean.”'
      },
      {
        speaker: 'Susan',
        text: '“I see! Let me dry my gloves with a lint-free cleanroom wipe and enter 18.50 g directly onto the official log sheet right now.”'
      }
    ],
    ruleInPlainEnglish: 'Never record data on scrap paper, cardboard, paper towels, or gloves. Write readings directly onto the official production record at the exact moment they occur.',
    whatYouMustDo: [
      'Bring the official production logsheet directly to the equipment or scale.',
      'Record the observed weight or gauge reading immediately, with your initials and timestamp.',
      'If the scale has an automated printer tape, tape the slip directly to the official run record.'
    ],
    whatYouMustNeverDo: [
      'Never write numbers on the palm or sleeve of your cleanroom glove.',
      'Never write data on sticky notes, masking tape, cardboard boxes, or napkins.',
      'Never wait until the end of your shift to fill in numbers from memory.'
    ],
    floorAnalogy: 'Writing raw weights on scrap paper is like a bank teller writing your cash deposit on a coffee cup sleeve instead of your receipt—it is untraceable and easily lost.',
    commonTrap: 'Thinking "I will keep this scrap note to keep the official sheet clean and pretty." Cleanliness does not trump data integrity. Direct entry on official paper is non-negotiable.',
    badge: 'Direct Entry Standard',
    diabetesContext: 'The ratio of enzyme reagent determines whether a glucose meter reads 90 mg/dL (normal blood sugar) or 190 mg/dL (hyperglycemia). An inaccurate enzyme weight puts patients at immediate risk.',
    interactiveChallenge: {
      prompt: 'Enter the balance reading directly onto the official AnyPharm formulation sheet.',
      type: 'scale_entry'
    }
  },
  {
    id: 'step-mistake-fix',
    stepNumber: 4,
    timeLabel: '10:45 • Sealing & Pressure Check',
    location: 'Packaging Bay • Test Strip Vial Capping & Sealing Station',
    title: 'Susan’s First Mistake: Don’t Panic, Follow the 4 Rules!',
    subtitle: 'Putting the 4-step error correction method into real-world practice.',
    situation: 'Susan checks the digital pressure gauge on the vial heat-sealing machine. The gauge reads 35.5 psi. In her nervousness, Susan writes "53.5 psi" on the official production sheet. Her stomach suddenly drops!',
    dialogue: [
      {
        speaker: 'Susan',
        text: '“Oh no! Grace, look what I just did! The gauge said 35.5 psi, but my hand transposed the numbers and I wrote 53.5 psi! 53.5 is way out of spec! Am I going to get fired on my first day?!”'
      },
      {
        speaker: 'Grace',
        text: '“Take a deep breath, Susan! Remember our locker room chat? People make mistakes every day. What matters is how we correct it.”'
      },
      {
        speaker: 'Susan',
        text: '“Okay... rule number one: draw a single line through the mistake, right?”'
      },
      {
        speaker: 'Grace',
        text: '“Exactly. One clean horizontal line right through 53.5. Don’t scratch it out, don’t black it out, and don’t write over the 5 to turn it into a 3. Anyone looking at this document must still be able to clearly read the 53.5 underneath.”'
      },
      {
        speaker: 'Susan',
        text: '“Done! A clean single line. Rule two: write the correction above it. So I write 35.5 psi right above the strike.”'
      },
      {
        speaker: 'Grace',
        text: '“Spot on. Rule three: initial and date it so everyone knows who made the change and when.”'
      },
      {
        speaker: 'Susan',
        text: '“SP 02-SEP-2026. And rule four: brief comment or reason code. Should I write ‘TE’ for transposition error?”'
      },
      {
        speaker: 'Grace',
        text: '“Perfect! ‘TE’ tells the Quality reviewer exactly what happened. Look at that—your first GDP correction is 100% compliant. How does it feel?”'
      },
      {
        speaker: 'Susan',
        text: '“Honestly? A huge relief! It really is easy and makes total sense.”'
      }
    ],
    ruleInPlainEnglish: 'Follow the 4 Golden Steps for every correction: 1) Single line strike, 2) Write true value above, 3) Initial and date, 4) Add brief reason code (like TE).',
    whatYouMustDo: [
      'Draw ONE single, clean horizontal line through the error.',
      'Ensure the original mistake remains completely legible underneath the line.',
      'Write the correct value clearly above or beside the struck entry.',
      'Sign your registered initials and today’s date (DD-MMM-YYYY) adjacent to the fix.',
      'Add a standardized reason code (e.g., TE for Transposition Error, EE for Entry Error).'
    ],
    whatYouMustNeverDo: [
      'NEVER scribble repeatedly over the number to black it out.',
      'NEVER trace heavily over a number to turn a 5 into a 3 (overwriting looks like record tampering).',
      'NEVER reach for whiteout, correction tape, or scrape the paper with a razor blade.'
    ],
    floorAnalogy: 'Think of court stenographers: when a statement is struck from the record, the text remains visible with a strike note—nothing is ever erased or destroyed.',
    commonTrap: 'Operators are embarrassed by mistakes, so they try to squeeze or overwrite digits to make the page look cleaner. In an audit, overwriting is treated as suspected fraudulent alteration.',
    badge: '4-Step Correction Method',
    diabetesContext: 'Vial sealing pressure ensures glucose test strips remain hermetically sealed against humidity. Proper documentation proves the vial seals protect the strips for 24 months of patient use.',
    interactiveChallenge: {
      prompt: 'Help Susan execute the 4-step correction on "53.5 psi" to make it 100% compliant.',
      type: 'four_step_fix'
    }
  },
  {
    id: 'step-blanks-z-stripe',
    stepNumber: 5,
    timeLabel: '01:15 • Packaging Changeover',
    location: 'Packaging Bay • Diabetic Sensor Test Strip Bottling Line 2',
    title: 'The Unused Rows: Diagonal Lines & Closing Blanks',
    subtitle: 'Never leave empty boxes unattended—close the door on unauthorized additions.',
    situation: 'Lot #GLU-9024 finishes earlier than scheduled because this custom hospital order was for 5,000 vials instead of the standard 10,000. The hourly visual inspection table on the run sheet has 10 rows, but only rows 1 through 6 were used. Rows 7 through 10 are completely empty.',
    dialogue: [
      {
        speaker: 'Susan',
        text: '“Run is completed, Grace! Rows 1 through 6 are signed off. Let’s head to the cafeteria for lunch!”'
      },
      {
        speaker: 'Grace',
        text: '“Hold on, Susan. Look at rows 7, 8, 9, and 10 at the bottom of the table. What do you see?”'
      },
      {
        speaker: 'Susan',
        text: '“They’re empty. We didn’t need them since the order was finished early.”'
      },
      {
        speaker: 'Grace',
        text: '“Right. But if an auditor looks at this sheet tomorrow, how do they know whether we finished early, or if we forgot to perform the hourly checks from 13:00 to 16:00? Worse, what if someone unauthorized fills those lines in later?”'
      },
      {
        speaker: 'Susan',
        text: '“Oh! Like leaving empty lines on a signed bank check! What do we do?”'
      },
      {
        speaker: 'Grace',
        text: '“We close the unused space. We draw a single diagonal line across the blank rows, write ‘N/A - Run completed at 13:00’, and sign our initials and today’s date.”'
      },
      {
        speaker: 'Susan',
        text: '“Let me draw the diagonal line! [draws clean diagonal line across rows 7-10] ‘N/A - 5,000 vial order complete. SP 02-SEP-2026’. Now nobody can add extra lines!”'
      }
    ],
    ruleInPlainEnglish: 'Never leave blank fields, unused rows, or empty pages open. Draw a diagonal line, write "N/A" with the reason, and initial and date.',
    whatYouMustDo: [
      'Draw a clean diagonal line across unused fields or blank rows.',
      'Write "N/A" (Not Applicable) along with a brief explanation (e.g., "N/A - 5,000 order complete").',
      'Sign your initials and write the current date immediately beside the strikethrough.'
    ],
    whatYouMustNeverDo: [
      'Never leave empty rows or blank cells unattended on an active production sheet.',
      'Never use ditto marks (") or downward arrows to indicate repeated values.',
      'Never assume Quality Assurance or an auditor will "just know" why a row was skipped.'
    ],
    floorAnalogy: 'Drawing a line through unused rows is like crossing out the empty space after writing the dollar amount on a paper check—it prevents anyone from writing extra numbers later.',
    commonTrap: 'Leaving empty lines at the bottom of the page thinking "the next shift might need them." In GMP, if the next shift performs additional work, an authorized supervisor must issue an official addendum.',
    badge: 'Diagonal Line Standard',
    diabetesContext: 'Empty rows in packaging records leave open questions about whether safety cap leak checks were skipped, risking compromised test strips reaching diabetic patients.',
    interactiveChallenge: {
      prompt: 'Apply a compliant diagonal line, "N/A", explanation, initials, and date to close the unused inspection rows.',
      type: 'z_stripe'
    }
  },
  {
    id: 'step-proxy-signing',
    stepNumber: 6,
    timeLabel: '02:30 • Lancet Assembly Station',
    location: 'Line 4 • Sterile Lancet Tip Mold & Packaging Station',
    title: 'The "Quick Favor" & Signature Integrity',
    subtitle: 'You can only sign what YOU personally performed or witnessed. Period.',
    situation: 'Susan is assisting at the sterile lancet packaging line during shift handover. Another operator, Kevin, rushes over with his backpack on his shoulder.',
    dialogue: [
      {
        speaker: 'Kevin',
        text: '“Hey Susan! Welcome to AnyPharm! Listen, my shift ends at 14:30 and my carpool is waiting outside right now. I just finished the 70% IPA sanitization wipe on the lancet hopper, but I forgot to sign step 14. Could you do me a quick favor and just sign my initials ‘KB’ on line 14? I swear I did it!”'
      },
      {
        speaker: 'Susan',
        text: '“Oh... well, I saw Kevin with the spray bottle earlier, Grace. Should I just help him out so he doesn’t miss his ride?”'
      },
      {
        speaker: 'Grace',
        text: '“Susan, this is one of the most critical tests of integrity you will ever face on a production floor. What is the very first letter in ALCOA?”'
      },
      {
        speaker: 'Susan',
        text: '“A for Attributable! Every single signature and mark must trace back to the person who actually performed and witnessed the action.”'
      },
      {
        speaker: 'Grace',
        text: '“Exactly right. Signing someone else’s initials—even to be friendly, even if you trust them completely—is called ‘proxy signing’ or ‘ghost signing’. Under federal regulations, it is considered willful record falsification.”'
      },
      {
        speaker: 'Susan',
        text: '“Sorry, Kevin. I can’t sign your initials or sign for work I didn’t personally perform and verify. But I can call the incoming shift lead right now so they can inspect the hopper and sign off officially.”'
      },
      {
        speaker: 'Kevin',
        text: '“You know what, Susan? You’re 100% right. I was just rushing. Thanks for keeping us both out of trouble.”'
      }
    ],
    ruleInPlainEnglish: 'Never sign, initial, or log in for anyone else—and never let anyone sign for you. You only sign for what you personally executed or observed.',
    whatYouMustDo: [
      'Politely decline any request to sign or initial for a coworker.',
      'Sign only for the steps you personally performed, at the exact time you performed them.',
      'Report any handover gaps to your shift supervisor to handle through official handover protocol.'
    ],
    whatYouMustNeverDo: [
      'Never initial for a colleague ("proxy signing" or "ghost signing")—it is a criminal offense under 18 U.S.C. § 1001.',
      'Never share your password, login credentials, or e-signature token with anyone.',
      'Never pre-sign steps before work is executed, even if you know you will do them in 5 minutes.'
    ],
    floorAnalogy: 'Signing someone else’s initials on a production record is legally identical to signing their name on a bank loan or police affidavit—it is forgery.',
    commonTrap: 'Believing "I am just helping out a teammate who has to catch their ride." In an FDA or ISO audit, proxy signing is a severe 483 finding that frequently leads to termination.',
    badge: 'Signature Integrity',
    diabetesContext: 'Sterile lancets puncture the skin of diabetics multiple times daily. If sanitization steps are falsely signed without verification, microbial contamination could cause serious infections.',
    interactiveChallenge: {
      prompt: 'Choose the compliant response when asked for a proxy signature favor.',
      type: 'signature_choice'
    }
  },
  {
    id: 'step-debrief-badge',
    stepNumber: 7,
    timeLabel: '03:15 • Shift Wrap-Up',
    location: 'Employee Locker Area & AnyPharm Timeclock',
    title: 'The Revelation: Grace D. Porter is "G.D.P.!"',
    subtitle: 'Susan finishes her first shift, equipped with confidence, respect, and permanent ink.',
    situation: 'Susan and Grace degown, wash their hands, and return to the locker area to clock out at the end of their 8-hour shift.',
    dialogue: [
      {
        speaker: 'Susan',
        text: '“Phew! What a day, Grace. I learned so much—no pencils, indelible blue ink, direct entry at the scale, how to fix mistakes without whiteout, closing blank rows with a diagonal line, and never proxy-signing.”'
      },
      {
        speaker: 'Susan',
        text: '“Wait a second... I just noticed your employee name badge! Grace Danielle Porter... your initials are G... D... P.!”'
      },
      {
        speaker: 'Grace',
        text: '“Haha! Busted! Yes, my initials are G.D.P.! That’s why everyone on the floor calls me ‘GDP Grace’. But honestly, Susan, today you proved that you’re a natural at Good Documentation Practices too.”'
      },
      {
        speaker: 'Susan',
        text: '“I opened my locker and saw my lucky pencil sitting right there. I think I’ll keep it at home on my nightstand for crossword puzzles. When I’m at AnyPharm, my blue pen is all the luck I need!”'
      },
      {
        speaker: 'Grace',
        text: '“That’s the AnyPharm spirit. Ready to review the ALCOA+ standards and take your certification quiz?”'
      },
      {
        speaker: 'Susan',
        text: '“Let’s do it!”'
      }
    ],
    ruleInPlainEnglish: 'Good Documentation Practices are not about red tape—they are about integrity, patient safety, and pride in manufacturing life-saving diabetic supplies.',
    whatYouMustDo: [
      'Carry the lessons of Day 1 into every shift.',
      'Take pride in every accurate mark, date, and initial you write.',
      'Remember: "If it is not documented properly, it never happened."'
    ],
    whatYouMustNeverDo: [
      'Never view documentation as an afterthought or secondary chore.',
      'Never hesitate to ask your lead, mentor, or QA when unsure about a correction.'
    ],
    floorAnalogy: 'Every production sheet you sign is an AnyPharm promise to the patient that their diabetic supplies are safe, pure, and accurate.',
    commonTrap: 'Thinking GDP is just a classroom training that doesn\'t matter on a busy shift. In reality, GDP is your personal shield and legal protection.',
    badge: 'Shift Complete • GDP Qualified',
    diabetesContext: 'Millions of people living with diabetes count on AnyPharm every day. Accurate documentation guarantees that every box of test strips and insulin devices works flawlessly.',
    interactiveChallenge: {
      prompt: 'Complete Susan\'s Day 1 shift and proceed to the ALCOA+ Framework and Certification Quiz!',
      type: 'pencil_swap'
    }
  },
];
