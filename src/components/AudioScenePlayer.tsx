import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  Lock, 
  Clock, 
  Settings2, 
  X, 
  Volume1, 
  Mic, 
  Headphones, 
  Upload, 
  Sparkles, 
  Film, 
  Music,
  Check,
  AlertCircle,
  Minimize2,
  Maximize2,
  FileText
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { StoryboardScene, SCENE_SLIDES_CONFIG } from './StoryboardScene';
import { SceneImageManager } from './SceneImageManager';
import { 
  getAllSceneImages, 
  saveSceneImage, 
  clearAllSceneImages, 
  identifyImageSlot, 
  SceneImageKey, 
  StoredSceneImage, 
  ORDERED_IMAGE_KEYS 
} from '../utils/imageStorage';

interface Shot {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  imageUrl: string;
  imageAlt: string;
  overlayType: 'locker_arrival' | 'explaining' | 'tax_analogy' | 'form_correction' | 'locker_drop';
}

export interface DialogueLine {
  id: string;
  speaker: 'Grace' | 'Susan';
  text: string;
  spokenText?: string;
  shotIndex: number;
  audioKey: string;
  fallbackUrl: string;
}

const SHOTS: Shot[] = [
  {
    id: 'shot-1',
    title: 'Morning Arrival at AnyPharm Locker Room',
    subtitle: 'Susan arrives eager for Day 1 on the production floor, holding her cherished good luck pencil.',
    badge: 'Shot 1: The Lucky Pencil',
    imageUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Modern cleanroom gowning and locker facility',
    overlayType: 'locker_arrival'
  },
  {
    id: 'shot-2',
    title: 'Grace Explains Good Documentation Practices',
    subtitle: 'Why diabetes test strips require absolute accuracy in everything we record.',
    badge: 'Shot 2: What is GDP? High-Stakes Patient Safety',
    imageUrl: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Senior pharmaceutical specialist Grace speaking and explaining compliance standards',
    overlayType: 'explaining'
  },
  {
    id: 'shot-3',
    title: 'The Tax Return Analogy & Eraser Marks',
    subtitle: 'Pencils and erasers destroy credibility. Auditors inspect records with zero tolerance for erasures.',
    badge: 'Shot 3: Why Pencils Are Banned',
    imageUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Official paperwork inspection with magnifying glass showing erased pencil marks',
    overlayType: 'tax_analogy'
  },
  {
    id: 'shot-4',
    title: 'The 4 Golden Rules of GDP Error Correction',
    subtitle: '1) Single line strike, 2) Write correction above, 3) Initial and date, 4) State brief reason.',
    badge: 'Shot 4: GDP Batch Record Correction Demonstration',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Batch production record on clipboard showing clean blue ink single-strikethrough correction',
    overlayType: 'form_correction'
  },
  {
    id: 'shot-5',
    title: 'Locker Swap: Lucky Pencil Stored, Blue Pen In Pocket',
    subtitle: 'Susan safely puts her wooden pencil in her locker and takes her AnyPharm indelible blue ballpoint pen.',
    badge: 'Shot 5: Safe Storage & Floor Readiness',
    imageUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Employee locker room with personal locker and blue ballpoint pens on bench',
    overlayType: 'locker_drop'
  }
];

// Dialogue lines matched to the 11 audio clips
const DIALOGUE_LINES: DialogueLine[] = [
  {
    id: 'gdp-1',
    speaker: 'Grace',
    text: 'So, are you excited to work here?',
    spokenText: 'So, are you excited to work here?',
    shotIndex: 0,
    audioKey: 'GDP_1',
    fallbackUrl: '/audio/GDP 1.mp3'
  },
  {
    id: 'susan-1',
    speaker: 'Susan',
    text: 'Definitely! I even brought my lucky pencil.',
    spokenText: 'Definitely! I even brought my lucky pencil.',
    shotIndex: 0,
    audioKey: 'Susan_1',
    fallbackUrl: '/audio/Susan 1.mp3'
  },
  {
    id: 'gdp-2',
    speaker: 'Grace',
    text: 'Oh, I’m sorry, but pencils aren’t allowed on the production floor. You’ll have to leave it in your locker.',
    spokenText: "Oh, I'm sorry, but pencils aren't allowed on the production floor. You'll have to leave it in your locker.",
    shotIndex: 1,
    audioKey: 'GDP_2',
    fallbackUrl: '/audio/GDP 2.mp3'
  },
  {
    id: 'susan-2',
    speaker: 'Susan',
    text: 'Oh, okay. But why?',
    spokenText: 'Oh, okay. But why?',
    shotIndex: 1,
    audioKey: 'Susan_2',
    fallbackUrl: '/audio/Susan 2.mp3'
  },
  {
    id: 'gdp-3',
    speaker: 'Grace',
    text: 'GDP.',
    spokenText: 'G. D. P.',
    shotIndex: 1,
    audioKey: 'GDP_3',
    fallbackUrl: '/audio/GDP 3.mp3'
  },
  {
    id: 'susan-3',
    speaker: 'Susan',
    text: 'GDP? What is that?',
    spokenText: 'GDP? What is that?',
    shotIndex: 1,
    audioKey: 'Susan_3',
    fallbackUrl: '/audio/Susan 3.mp3'
  },
  {
    id: 'gdp-4',
    speaker: 'Grace',
    text: 'GDP stands for Good Documentation Practices. We follow GDP guidelines to make sure our documentation is as accurate as possible. Given the nature of what we make, it’s extremely important to be sure that everything we do, and everything we say about it is correct.',
    spokenText: 'GDP stands for Good Documentation Practices. We follow GDP guidelines to make sure our documentation is as accurate as possible. Given the nature of what we make, it’s extremely important to be sure that everything we do, and everything we say about it is correct.',
    shotIndex: 1,
    audioKey: 'GDP_4',
    fallbackUrl: '/audio/GDP 4.mp3'
  },
  {
    id: 'susan-4',
    speaker: 'Susan',
    text: 'Okay, that makes sense. But what does that have to do with my lucky pencil?',
    spokenText: 'Okay, that makes sense. But what does that have to do with my lucky pencil?',
    shotIndex: 2,
    audioKey: 'Susan_4',
    fallbackUrl: '/audio/Susan 4.mp3'
  },
  {
    id: 'gdp-5',
    speaker: 'Grace',
    text: 'Pencils can be erased, or easily changed. GDP requires that all records be clear and permanent, and pencil marks are temporary. Looking at a document with eraser marks brings into question how accurate it is. I mean, can you imagine getting back your tax return, with eraser marks all over it?',
    spokenText: 'Pencils can be erased, or easily changed. GDP requires that all records be clear and permanent, and pencil marks are temporary. Looking at a document with eraser marks brings into question how accurate it is. I mean, can you imagine getting back your tax return, with eraser marks all over it?',
    shotIndex: 2,
    audioKey: 'GDP_5',
    fallbackUrl: '/audio/GDP 5.mp3'
  },
  {
    id: 'susan-5',
    speaker: 'Susan',
    text: 'Okay, point taken, no pencils. But does that mean I can’t ever make a mistake? I’m not sure I can be perfect all the time.',
    spokenText: "Okay, point taken, no pencils. But does that mean I can't ever make a mistake? I'm not sure I can be perfect all the time.",
    shotIndex: 3,
    audioKey: 'Susan_5',
    fallbackUrl: '/audio/Susan 5.mp3'
  },
  {
    id: 'gdp-6',
    speaker: 'Grace',
    text: 'Not at all! People make mistakes, and GDP takes that into consideration. If you make a mistake, you just need to correct it using a few simple rules: 1) Draw a single line through the mistake so you can still see what the error was—never scratch it out or use whiteout. 2) Write the correction above it. 3) Initial and date the correction. And 4) Include a brief comment or reason code. That is it! Practice this a couple of times, you’ll see that it is pretty easy and makes a lot of sense.',
    spokenText: "Not at all. People make mistakes, and GDP takes that into consideration. If you make a mistake, you just need to correct it using a few simple rules: One. Draw a single line through the mistake so you can still see what the error was. Never scratch it out, or use white out. Two. Write the correction above it. Three. Initial and date the correction. And four. Include a brief comment or reason code. That's it. Practice this a couple of times, you'll see that it is pretty easy and makes a lot of sense.",
    shotIndex: 3,
    audioKey: 'GDP_6',
    fallbackUrl: '/audio/GDP 6.mp3'
  }
];

// Helper to map dialogue line index (0..10) to scene storyboard slide index (0..4: GDP1, GDP2, GDP3, GDP4, GDP5)
export function getSlideIndexForLine(lineIndex: number): number {
  if (lineIndex <= 0) return 0; // Line 1 (GDP_1): Morning arrival & welcome -> Slide 1 (Gdp1.jpg)
  if (lineIndex <= 2) return 1; // Lines 2..3 (Susan_1, GDP_2): Lucky pencil reveal & locker rule -> Slide 2 (Gdp2.jpg)
  if (lineIndex <= 8) return 2; // Lines 4..9 (Susan_2..GDP_5): "Oh, okay. But why?" & GDP explanation -> Slide 3 (Gdp3.jpg)
  if (lineIndex === 9) return 3; // Line 10 (Susan_5): 4 golden rules question -> Slide 4 (Gdp4.jpg)
  return 4;                     // Line 11 (GDP_6): 4 golden rules & locker deposit resolution -> Slide 5 (GDP5.jpeg)
}

// Helper to get the starting dialogue line index for a slide
export function getLineIndexForSlide(slideIndex: number): number {
  switch (slideIndex) {
    case 0: return 0; // Line 1: Grace welcome
    case 1: return 1; // Line 2: Susan lucky pencil
    case 2: return 3; // Line 4: Susan "Oh, okay. But why?" (Slide 3)
    case 3: return 9; // Line 10: Susan point taken / 4 golden rules
    case 4: return 10; // Line 11: Pencil stashed / resolution
    default: return 0;
  }
}

// Helper to determine female voice probability and quality rank
function scoreVoice(voice: SpeechSynthesisVoice): { isFemale: boolean; isNatural: boolean; score: number } {
  const name = voice.name.toLowerCase();
  const uri = (voice.voiceURI || '').toLowerCase();

  const malePatterns = [
    /\bmale\b/, /\bdavid\b/, /\bgeorge\b/, /\bmark\b/, /\bdaniel\b/, 
    /\brichard\b/, /\boliver\b/, /\bguy\b/, /\btom\b/, /\balex\b/, 
    /\bfred\b/, /\bbruce\b/, /\bralph\b/, /\balbert\b/, /\bryan\b/, 
    /\bjames\b/, /\bchristopher\b/, /\beric\b/, /\bgoogle us english\b/
  ];

  const hasMalePattern = malePatterns.some(p => p.test(name) || p.test(uri));

  const femalePatterns = [
    /\bfemale\b/, /\bwoman\b/, /\bjenny\b/, /\baria\b/, /\bsonia\b/, 
    /\bzira\b/, /\bsamantha\b/, /\bvictoria\b/, /\bkaren\b/, /\bava\b/, 
    /\ballison\b/, /\bsusan\b/, /\btessa\b/, /\bfiona\b/, /\bcynthia\b/, 
    /\bmoira\b/, /\bserena\b/, /\bstephanie\b/, /\bhazel\b/, /\bcatherine\b/, 
    /\bemma\b/, /\blibby\b/, /\bmia\b/, /\bclara\b/, /\blaura\b/, 
    /\blisa\b/, /\bsarah\b/, /\bamy\b/, /\bjulie\b/, /\bolivia\b/, 
    /\bnatasha\b/, /uk english female/, /us english female/, /australian female/,
    /en-us-x-sfg#female/, /en-us-x-tpf#female/, /en-gb-x-rjs#female/
  ];

  const hasFemalePattern = femalePatterns.some(p => p.test(name) || p.test(uri));

  const naturalPatterns = [
    /natural/i, /online/i, /neural/i, /enhanced/i, /premium/i, /google/i
  ];
  const isNatural = naturalPatterns.some(p => p.test(name));

  const isFemale = hasFemalePattern && !hasMalePattern;

  let score = 0;
  if (isFemale) score += 100;
  if (isNatural) score += 50;
  if (/jenny|aria|google uk english female/i.test(name)) score += 60;
  if (/samantha|victoria|zira/i.test(name)) score += 40;

  return { isFemale, isNatural, score };
}

interface Props {
  onPencilStashed?: () => void;
  isPencilAlreadyStashed?: boolean;
  initialAudioEngine?: 'studio' | 'synthesizer';
}

export const AudioScenePlayer: React.FC<Props> = ({
  onPencilStashed,
  isPencilAlreadyStashed = false,
  initialAudioEngine = 'studio'
}) => {
  // Engine and audio modes
  const [audioEngine, setAudioEngine] = useState<'studio' | 'synthesizer'>(initialAudioEngine);
  
  // Playback state
  const [currentLineIndex, setCurrentLineIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [hasStartedOnce, setHasStartedOnce] = useState(false);
  const [pencilInLocker, setPencilInLocker] = useState(isPencilAlreadyStashed);
  const [isCompact, setIsCompact] = useState<boolean>(true);

  // Scene Storyboard Images (GDP 1-5: Gdp1.jpg, Gdp2.jpg, Gdp3.jpg, Gdp4.jpg, GDP5.jpeg)
  const [storedSceneImages, setStoredSceneImages] = useState<Record<string, StoredSceneImage>>({});
  const [sceneImageUrls, setSceneImageUrls] = useState<Record<string, string>>({
    GDP1: '/images/Gdp1.jpg',
    GDP2: '/images/Gdp2.jpg',
    GDP3: '/images/Gdp3.jpg',
    GDP4: '/images/Gdp4.jpg',
    GDP5: '/images/GDP5.jpeg',
  });
  const [showImageManager, setShowImageManager] = useState<boolean>(false);
  const [showScriptDrawer, setShowScriptDrawer] = useState<boolean>(false);

  // Audio Playback state
  const [audioDuration, setAudioDuration] = useState<number>(0);
  const [audioCurrentTime, setAudioCurrentTime] = useState<number>(0);
  const [audioNotice, setAudioNotice] = useState<string | null>(null);

  // Web Speech Synth state (saved preset)
  const [allVoices, setAllVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [showVoiceSettings, setShowVoiceSettings] = useState(false);
  const [graceVoiceURI, setGraceVoiceURI] = useState<string>('');
  const [susanVoiceURI, setSusanVoiceURI] = useState<string>('');
  const [gracePitch, setGracePitch] = useState<number>(1.0);
  const [susanPitch, setSusanPitch] = useState<number>(1.06);
  const [testingSpeaker, setTestingSpeaker] = useState<'Grace' | 'Susan' | null>(null);

  // Playback control and race condition guards
  const htmlAudioRef = useRef<HTMLAudioElement | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const isPlayingRef = useRef(false);
  const currentLineRef = useRef(0);
  const audioEngineRef = useRef(audioEngine);
  const isMutedRef = useRef(isMuted);
  const playTokenRef = useRef(0);
  const advanceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  isPlayingRef.current = isPlaying;
  currentLineRef.current = currentLineIndex;
  audioEngineRef.current = audioEngine;
  isMutedRef.current = isMuted;

  // Load stored scene images (GDP 1-5) on mount & purge any legacy client-side audio database
  useEffect(() => {
    let isMounted = true;
    async function loadResources() {
      try {
        // Clear any lingering custom audio DB to ensure 100% training audio integrity
        try {
          if (typeof window !== 'undefined' && window.indexedDB) {
            window.indexedDB.deleteDatabase('gdp-training-audio');
          }
        } catch {
          // ignore
        }

        const imgs = await getAllSceneImages();
        if (!isMounted) return;
        setStoredSceneImages(imgs);

        const urls: Record<string, string> = {
          GDP1: '/images/Gdp1.jpg',
          GDP2: '/images/Gdp2.jpg',
          GDP3: '/images/Gdp3.jpg',
          GDP4: '/images/Gdp4.jpg',
          GDP5: '/images/GDP5.jpeg',
        };

        // If user uploaded custom files, create ObjectURLs to override the defaults
        for (const [k, img] of Object.entries(imgs)) {
          if (img && img.blob) {
            urls[k] = URL.createObjectURL(img.blob);
          }
        }

        // Fallback for GDP5 if not provided: mirror GDP4
        if (!urls.GDP5 && urls.GDP4) {
          urls.GDP5 = urls.GDP4;
        }

        if (isMounted) {
          setSceneImageUrls(urls);
        }
      } catch (err) {
        console.warn('Could not read stored scene resources:', err);
      }
    }
    loadResources();

    return () => {
      isMounted = false;
      if (advanceTimeoutRef.current) {
        clearTimeout(advanceTimeoutRef.current);
      }
      Object.values(sceneImageUrls).forEach((url: string) => {
        if (url && url.startsWith('blob:')) URL.revokeObjectURL(url);
      });
    };
  }, []);

  // Web Speech API Voice discovery
  const englishVoices = useMemo(() => {
    return allVoices
      .filter(v => v.lang.startsWith('en'))
      .sort((a, b) => scoreVoice(b).score - scoreVoice(a).score);
  }, [allVoices]);

  const femaleVoices = useMemo(() => {
    const list = englishVoices.filter(v => scoreVoice(v).isFemale);
    return list.length > 0 ? list : englishVoices;
  }, [englishVoices]);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
      const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        if (voices.length > 0) {
          setAllVoices(voices);
          const enVoices = voices.filter(v => v.lang.startsWith('en'));
          const scored = enVoices.map(v => ({ voice: v, meta: scoreVoice(v) }))
                                 .sort((a, b) => b.meta.score - a.meta.score);
          const females = scored.filter(s => s.meta.isFemale).map(s => s.voice);

          if (females.length >= 2) {
            setGraceVoiceURI(females[0].voiceURI || females[0].name);
            setSusanVoiceURI(females[1].voiceURI || females[1].name);
          } else if (females.length === 1) {
            setGraceVoiceURI(females[0].voiceURI || females[0].name);
            setSusanVoiceURI(females[0].voiceURI || females[0].name);
          }
        }
      };

      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    return () => {
      if (synthRef.current) synthRef.current.cancel();
      if (htmlAudioRef.current) {
        htmlAudioRef.current.pause();
        htmlAudioRef.current = null;
      }
    };
  }, []);

  // Sync prop changes
  useEffect(() => {
    if (isPencilAlreadyStashed) {
      setPencilInLocker(true);
    }
  }, [isPencilAlreadyStashed]);

  // Upload single scene image slot (GDP1..GDP5)
  const handleUploadSingleSceneImage = async (slot: SceneImageKey, file: File) => {
    await saveSceneImage(slot, file);
    const newImgs = await getAllSceneImages();
    setStoredSceneImages(newImgs);

    const newUrls = { ...sceneImageUrls };
    if (newUrls[slot] && newUrls[slot].startsWith('blob:')) {
      URL.revokeObjectURL(newUrls[slot]);
    }
    newUrls[slot] = URL.createObjectURL(file);
    if (slot === 'GDP4' && !newImgs.GDP5) {
      newUrls.GDP5 = newUrls.GDP4;
    }
    setSceneImageUrls(newUrls);

    setAudioNotice(`Imported "${file.name}" for Slide ${slot}!`);
    setTimeout(() => setAudioNotice(null), 4000);
  };

  // Upload batch scene images (GDP 1-5)
  const handleIncomingImageFiles = async (files: FileList | File[]) => {
    const fileArr = Array.from(files);
    let matchedCount = 0;

    // If 4 or 5 files and no explicit GDP pattern, match in alphabetical order
    if ((fileArr.length === 5 || fileArr.length === 4) && fileArr.every(f => !identifyImageSlot(f.name))) {
      fileArr.sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));
      for (let i = 0; i < Math.min(fileArr.length, ORDERED_IMAGE_KEYS.length); i++) {
        await saveSceneImage(ORDERED_IMAGE_KEYS[i], fileArr[i]);
        matchedCount++;
      }
    } else {
      for (const file of fileArr) {
        const slot = identifyImageSlot(file.name);
        if (slot) {
          await saveSceneImage(slot, file);
          matchedCount++;
        }
      }
    }

    const updatedImgs = await getAllSceneImages();
    setStoredSceneImages(updatedImgs);

    const newUrls = { ...sceneImageUrls };
    for (const [key, record] of Object.entries(updatedImgs)) {
      if (newUrls[key] && newUrls[key].startsWith('blob:')) {
        URL.revokeObjectURL(newUrls[key]);
      }
      newUrls[key] = URL.createObjectURL(record.blob);
    }
    if (newUrls.GDP4 && !updatedImgs.GDP5) {
      newUrls.GDP5 = newUrls.GDP4;
    }
    setSceneImageUrls(newUrls);

    if (matchedCount > 0) {
      setAudioNotice(`Imported ${matchedCount} scene slide images successfully!`);
    } else {
      setAudioNotice('Could not identify image slot names. Expected GDP1.jpg, GDP2.jpg, GDP3.jpg, GDP4.jpg / GSP4.jpg, GDP5.jpg.');
    }
    setTimeout(() => setAudioNotice(null), 5000);
  };

  // Clear all stored scene images
  const handleClearAllSceneImages = async () => {
    await clearAllSceneImages();
    Object.values(sceneImageUrls).forEach((url: string) => {
      if (url && url.startsWith('blob:')) URL.revokeObjectURL(url);
    });
    setStoredSceneImages({});
    setSceneImageUrls({
      GDP1: '/images/GDP1.jpg',
      GDP2: '/images/GDP2.jpg',
      GDP3: '/images/GDP3.jpg',
      GDP4: '/images/GDP4.jpg',
      GDP5: '/images/GDP5.jpg',
    });
    setAudioNotice('Reset scene images to default slide images.');
    setTimeout(() => setAudioNotice(null), 4000);
  };

  // Helper to get active voice for Speech Synth
  const getSpeakerVoice = (speaker: 'Grace' | 'Susan'): { voice: SpeechSynthesisVoice | null; pitch: number } => {
    const uri = speaker === 'Grace' ? graceVoiceURI : susanVoiceURI;
    const pitch = speaker === 'Grace' ? gracePitch : susanPitch;
    let voice = allVoices.find(v => (v.voiceURI && v.voiceURI === uri) || v.name === uri) || null;
    if (!voice) {
      voice = femaleVoices[speaker === 'Grace' ? 0 : 1] || englishVoices[0] || null;
    }
    return { voice, pitch };
  };

  // Preview test voice in synthesizer
  const handleTestVoice = (speaker: 'Grace' | 'Susan') => {
    if (!synthRef.current) return;
    synthRef.current.cancel();
    setTestingSpeaker(speaker);

    const { voice, pitch } = getSpeakerVoice(speaker);
    const sampleText = speaker === 'Grace' 
      ? "Hello Susan, welcome to AnyPharm. I'm Grace, and I will be guiding you through Good Documentation Practices today."
      : "Hi Grace! I'm Susan. I am really excited to start my first shift on the test strip line!";

    const testUtterance = new SpeechSynthesisUtterance(sampleText);
    testUtterance.rate = 0.96;
    testUtterance.pitch = pitch;
    if (voice) testUtterance.voice = voice;

    testUtterance.onend = () => setTestingSpeaker(null);
    testUtterance.onerror = () => setTestingSpeaker(null);

    synthRef.current.speak(testUtterance);
  };

  // Stop all playback
  const stopAllPlayback = () => {
    playTokenRef.current++;
    if (advanceTimeoutRef.current) {
      clearTimeout(advanceTimeoutRef.current);
      advanceTimeoutRef.current = null;
    }
    if (synthRef.current) {
      synthRef.current.cancel();
    }
    if (htmlAudioRef.current) {
      htmlAudioRef.current.onended = null;
      htmlAudioRef.current.onerror = null;
      htmlAudioRef.current.ontimeupdate = null;
      htmlAudioRef.current.onloadedmetadata = null;
      htmlAudioRef.current.pause();
      htmlAudioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    isPlayingRef.current = false;
  };

  // Advance to next line helper
  const advanceToNextLine = (currentIdx: number) => {
    const token = playTokenRef.current;
    if (!isPlayingRef.current) return;
    const nextIndex = currentIdx + 1;
    if (nextIndex < DIALOGUE_LINES.length) {
      setCurrentLineIndex(nextIndex);
      if (advanceTimeoutRef.current) clearTimeout(advanceTimeoutRef.current);
      advanceTimeoutRef.current = setTimeout(() => {
        if (token === playTokenRef.current && isPlayingRef.current) {
          playLine(nextIndex);
        }
      }, 350);
    } else {
      setIsPlaying(false);
      isPlayingRef.current = false;
      setPencilInLocker(true);
      if (onPencilStashed) onPencilStashed();
      confetti({ particleCount: 50, spread: 70, origin: { y: 0.7 } });
    }
  };

  // Play line using Studio Audio MP3 file
  const playStudioLine = (lineIdx: number) => {
    const token = playTokenRef.current;
    if (lineIdx >= DIALOGUE_LINES.length) {
      setIsPlaying(false);
      isPlayingRef.current = false;
      setPencilInLocker(true);
      if (onPencilStashed) onPencilStashed();
      confetti({ particleCount: 50, spread: 70, origin: { y: 0.7 } });
      return;
    }

    const currentLine = DIALOGUE_LINES[lineIdx];

    // Build comprehensive candidate audio URLs:
    // Supports: Susan-1.mp3, Susan 1.mp3, Susan1.mp3, susan-1.mp3, Susan_1.mp3, and wav/m4a/ogg formats
    const candidateUrls: string[] = [];
    if (currentLine.fallbackUrl) {
      const baseName = currentLine.fallbackUrl.replace(/\.[^.]+$/, '');
      const extensions = ['.mp3', '.wav', '.m4a', '.ogg'];
      const variations = [
        baseName,
        baseName.replace(/\s+/g, '-'),
        baseName.replace(/\s+/g, '_'),
        baseName.replace(/\s+/g, ''),
        baseName.toLowerCase(),
        baseName.toLowerCase().replace(/\s+/g, '-'),
        baseName.toLowerCase().replace(/\s+/g, '_'),
        baseName.toLowerCase().replace(/\s+/g, ''),
        encodeURI(baseName),
      ];

      const uniquePrefixes = Array.from(new Set(variations));
      for (const ext of extensions) {
        for (const prefix of uniquePrefixes) {
          candidateUrls.push(`${prefix}${ext}`);
        }
      }
    }

    if (candidateUrls.length === 0) {
      playSynthesizerLine(lineIdx);
      return;
    }

    if (!htmlAudioRef.current) {
      htmlAudioRef.current = new Audio();
    }

    const audio = htmlAudioRef.current;
    audio.pause();

    const tryPlayCandidate = (idx: number) => {
      if (token !== playTokenRef.current || !isPlayingRef.current) return;
      if (idx >= candidateUrls.length) {
        console.warn(`All audio sources unavailable for ${currentLine.audioKey}, falling back to voice synthesizer.`);
        playSynthesizerLine(lineIdx);
        return;
      }

      const trackUrl = candidateUrls[idx];
      audio.src = trackUrl;
      audio.playbackRate = playbackSpeed;
      audio.muted = isMuted;

      audio.onloadedmetadata = () => {
        if (token !== playTokenRef.current) return;
        setAudioDuration(audio.duration || 0);
      };

      audio.ontimeupdate = () => {
        if (token !== playTokenRef.current) return;
        setAudioCurrentTime(audio.currentTime || 0);
      };

      audio.onended = () => {
        if (token !== playTokenRef.current || !isPlayingRef.current) return;
        advanceToNextLine(lineIdx);
      };

      audio.onerror = () => {
        if (token !== playTokenRef.current || !isPlayingRef.current) return;
        tryPlayCandidate(idx + 1);
      };

      audio.play().catch(() => {
        if (token !== playTokenRef.current || !isPlayingRef.current) return;
        tryPlayCandidate(idx + 1);
      });
    };

    tryPlayCandidate(0);
  };

  // Play line using Web Speech Synthesis
  const playSynthesizerLine = (lineIdx: number) => {
    if (!synthRef.current) return;
    synthRef.current.cancel();
    const token = playTokenRef.current;

    if (lineIdx >= DIALOGUE_LINES.length) {
      setIsPlaying(false);
      isPlayingRef.current = false;
      setPencilInLocker(true);
      if (onPencilStashed) onPencilStashed();
      confetti({ particleCount: 50, spread: 70, origin: { y: 0.7 } });
      return;
    }

    const currentLine = DIALOGUE_LINES[lineIdx];
    const textToSpeak = currentLine.spokenText || currentLine.text;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = playbackSpeed * 0.95;

    const speakerKey = currentLine.speaker === 'Grace' ? 'Grace' : 'Susan';
    const { voice, pitch } = getSpeakerVoice(speakerKey);

    utterance.pitch = pitch;
    if (voice) utterance.voice = voice;

    utterance.onend = () => {
      if (token !== playTokenRef.current || !isPlayingRef.current) return;
      advanceToNextLine(lineIdx);
    };

    utterance.onerror = (e) => {
      // Chrome/Safari fires error event with 'interrupted' or 'canceled' when synth.cancel() is called.
      // Must ignore canceled events to prevent jumping lines!
      if (e.error === 'interrupted' || e.error === 'canceled') return;
      if (token !== playTokenRef.current || !isPlayingRef.current) return;
      console.error('Speech synthesis error:', e);
      advanceToNextLine(lineIdx);
    };

    synthRef.current.speak(utterance);
  };

  // Dispatch play action based on active engine
  const playLine = (lineIdx: number) => {
    if (audioEngine === 'studio') {
      const currentLine = DIALOGUE_LINES[lineIdx];
      if (currentLine && currentLine.fallbackUrl) {
        playStudioLine(lineIdx);
      } else {
        playSynthesizerLine(lineIdx);
      }
    } else {
      playSynthesizerLine(lineIdx);
    }
  };

  // Play / Pause Master Button
  const handleTogglePlay = () => {
    setHasStartedOnce(true);
    if (isPlaying) {
      stopAllPlayback();
    } else {
      setIsPlaying(true);
      isPlayingRef.current = true;
      playLine(currentLineIndex);
    }
  };

  // Jump directly to specific line: Pauses playback immediately so it doesn't jump around, waits for user to click Resume
  const handleJumpToLine = (idx: number) => {
    stopAllPlayback();
    const boundedIdx = Math.max(0, Math.min(idx, DIALOGUE_LINES.length - 1));
    setCurrentLineIndex(boundedIdx);
    setHasStartedOnce(true);
    // Explicit User Intent: Do NOT play! Stays paused on this line until user clicks Resume.
  };

  // Jump to specific slide: Pauses and navigates to the first line of that slide
  const handleJumpToSlide = (targetSlideIdx: number) => {
    if (targetSlideIdx === 4) {
      setPencilInLocker(true);
    }
    const lineIdx = getLineIndexForSlide(targetSlideIdx);
    handleJumpToLine(lineIdx);
  };

  // Next Line
  const handleNextLine = () => {
    if (currentLineIndex < DIALOGUE_LINES.length - 1) {
      const nextIdx = currentLineIndex + 1;
      const wasPlaying = isPlayingRef.current;
      stopAllPlayback();
      setCurrentLineIndex(nextIdx);
      setHasStartedOnce(true);
      if (wasPlaying) {
        setIsPlaying(true);
        isPlayingRef.current = true;
        playLine(nextIdx);
      }
    }
  };

  // Previous Line
  const handlePrevLine = () => {
    if (currentLineIndex > 0) {
      const prevIdx = currentLineIndex - 1;
      const wasPlaying = isPlayingRef.current;
      stopAllPlayback();
      setCurrentLineIndex(prevIdx);
      setHasStartedOnce(true);
      if (wasPlaying) {
        setIsPlaying(true);
        isPlayingRef.current = true;
        playLine(prevIdx);
      }
    }
  };

  // Restart Scene
  const handleRestart = () => {
    stopAllPlayback();
    setCurrentLineIndex(0);
    setHasStartedOnce(true);
  };

  // Locker Action: Stash pencil, immediately switch to GDP5 scene!
  const handleLockerInteraction = () => {
    setPencilInLocker(true);
    if (onPencilStashed) onPencilStashed();
    confetti({ particleCount: 40, spread: 60, origin: { y: 0.8 } });
  };

  const activeLine = DIALOGUE_LINES[currentLineIndex] || DIALOGUE_LINES[0];
  const activeShot = SHOTS[activeLine.shotIndex];
  const isGrace = activeLine.speaker === 'Grace';
  const totalLoadedSlides = Object.keys(sceneImageUrls).length;
  const activeSlideIndex = getSlideIndexForLine(currentLineIndex);
  const activeSlideConfig = SCENE_SLIDES_CONFIG[Math.min(activeSlideIndex, SCENE_SLIDES_CONFIG.length - 1)];
  
  // 6 official studio master recordings (Lines 1, 3, 5, 7, 9, 11)
  const officialStudioClipsCount = 6;

  // Slide URL calculation: direct mapping to slide 1..5
  const activeSlideUrl = sceneImageUrls[activeSlideConfig.id] || `/images/${activeSlideConfig.expectedFilename}`;

  return (
    <div 
      className={`bg-slate-950 rounded-2xl border-2 border-slate-800 shadow-xl overflow-hidden text-white flex flex-col relative transition-all duration-300 ${
        isCompact ? 'max-w-3xl mx-auto' : 'w-full'
      }`}
    >
      {/* Top Header Bar with Engine Switcher and View Settings */}
      <div className="bg-slate-900/95 px-3 sm:px-4 py-2 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
        
        {/* Left: Audio Engine Mode Tabs */}
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-400 text-[11px] hidden sm:inline">Audio:</span>
          <div className="inline-flex rounded-lg bg-slate-950 p-0.5 border border-slate-800 shadow-inner">
            <button
              type="button"
              onClick={() => {
                stopAllPlayback();
                setAudioEngine('studio');
              }}
              className={`px-2.5 py-1 text-[11px] font-bold rounded-md transition-all flex items-center gap-1 cursor-pointer ${
                audioEngine === 'studio'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Headphones className="w-3 h-3" />
              <span>🎙️ Studio Audio</span>
              <span className="bg-blue-900 text-blue-200 text-[9px] px-1 py-0.2 rounded-full font-mono">
                {officialStudioClipsCount}/11
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                stopAllPlayback();
                setAudioEngine('synthesizer');
              }}
              className={`px-2.5 py-1 text-[11px] font-bold rounded-md transition-all flex items-center gap-1 cursor-pointer ${
                audioEngine === 'synthesizer'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Mic className="w-3 h-3" />
              <span>🤖 AI Voice</span>
            </button>
          </div>
        </div>

        {/* Right: Audio Integrity Badge, Scene Slides Manager & View Settings */}
        <div className="flex items-center gap-1.5 flex-wrap sm:flex-nowrap">
          {/* Official Audio Integrity Badge */}
          <div 
            className="px-2.5 py-1 rounded-md font-mono text-[11px] font-semibold border flex items-center gap-1.5 bg-emerald-950/70 border-emerald-800 text-emerald-300"
            title="Training integrity protected: official studio audio tracks are verified and locked."
          >
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Official Audio (Locked)</span>
            <span className="sm:hidden">Audio Locked</span>
          </div>

          {/* Scene Storyboard Slides Manager Button */}
          <button
            type="button"
            onClick={() => setShowImageManager(!showImageManager)}
            className={`px-2.5 py-1 rounded-md font-mono text-[11px] font-bold border flex items-center gap-1.5 transition-all cursor-pointer ${
              showImageManager
                ? 'bg-blue-600 text-white border-blue-500 shadow-xs'
                : 'bg-slate-900 hover:bg-slate-800 text-blue-300 border-slate-800'
            }`}
            title="Manage Scene Storyboard JPG Slides (GDP 1–5)"
          >
            <Film className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden sm:inline">Scene Slides (JPG)</span>
            <span className="sm:hidden">Slides</span>
          </button>

          {/* Synthesizer Voice Settings Button */}
          {audioEngine === 'synthesizer' && (
            <button
              type="button"
              onClick={() => setShowVoiceSettings(!showVoiceSettings)}
              className={`px-2 py-0.5 rounded font-mono text-[10px] border flex items-center gap-1 transition-colors cursor-pointer ${
                showVoiceSettings 
                  ? 'bg-blue-600 text-white border-blue-500' 
                  : 'bg-slate-800 text-blue-300 border-blue-800 hover:bg-slate-700'
              }`}
            >
              <Settings2 className="w-3 h-3 text-blue-400" />
              <span>Voice</span>
            </button>
          )}

          {/* Size Mode: Fit to Screen vs Cinema */}
          <button
            type="button"
            onClick={() => setIsCompact(!isCompact)}
            className={`px-2 py-0.5 rounded text-[10px] font-mono border flex items-center gap-1 transition-colors cursor-pointer ${
              isCompact
                ? 'bg-blue-950 text-blue-300 border-blue-800 hover:bg-blue-900'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
            title={isCompact ? 'Expand to Cinema View' : 'Shrink to Fit Screen'}
          >
            {isCompact ? <Maximize2 className="w-3 h-3 text-blue-400" /> : <Minimize2 className="w-3 h-3 text-slate-400" />}
            <span className="hidden sm:inline">{isCompact ? 'Fit Screen' : 'Cinema'}</span>
          </button>
        </div>
      </div>

      {/* Notice Banner */}
      {audioNotice && (
        <div className="bg-blue-950/95 border-b border-blue-600/60 px-4 py-2 text-xs text-blue-200 flex items-center justify-between animate-in fade-in">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-400 shrink-0" />
            <span>{audioNotice}</span>
          </div>
          <button 
            type="button" 
            onClick={() => setAudioNotice(null)} 
            className="text-blue-400 hover:text-white cursor-pointer ml-2"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Voice Cast Studio Drawer (AI Synthesizer mode) */}
      {showVoiceSettings && audioEngine === 'synthesizer' && (
        <div className="bg-slate-900 border-b border-slate-800 p-4 sm:p-5 text-xs animate-in slide-in-from-top-2 duration-200 z-30">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
            <div className="flex items-center gap-2">
              <Mic className="w-4 h-4 text-blue-400" />
              <h5 className="font-bold text-sm text-white">AI Speech Synthesis Voice Cast</h5>
              <span className="bg-emerald-950 text-emerald-400 text-[10px] font-mono px-2 py-0.5 rounded border border-emerald-800">
                {femaleVoices.length} Female Voices Detected
              </span>
            </div>
            <button
              type="button"
              onClick={() => setShowVoiceSettings(false)}
              className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-slate-800 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Grace */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-blue-900/60 flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-xs">Grace D. Porter (Mentor)</span>
                <button
                  type="button"
                  onClick={() => handleTestVoice('Grace')}
                  disabled={testingSpeaker !== null}
                  className="px-2 py-1 rounded bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-[10px] font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Volume1 className="w-3 h-3" />
                  Preview Grace
                </button>
              </div>
              <select
                value={graceVoiceURI}
                onChange={(e) => setGraceVoiceURI(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-slate-200"
              >
                {englishVoices.map((v) => (
                  <option key={v.voiceURI || v.name} value={v.voiceURI || v.name}>
                    {scoreVoice(v).isFemale ? '👩' : '👨'} {v.name}
                  </option>
                ))}
              </select>
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>Vocal Pitch:</span>
                <input
                  type="range"
                  min="0.85"
                  max="1.25"
                  step="0.03"
                  value={gracePitch}
                  onChange={(e) => setGracePitch(parseFloat(e.target.value))}
                  className="w-24 accent-blue-500 cursor-pointer"
                />
              </div>
            </div>

            {/* Susan */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-emerald-900/60 flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-xs">Susan Pulido (New Hire)</span>
                <button
                  type="button"
                  onClick={() => handleTestVoice('Susan')}
                  disabled={testingSpeaker !== null}
                  className="px-2 py-1 rounded bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-[10px] font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Volume1 className="w-3 h-3" />
                  Preview Susan
                </button>
              </div>
              <select
                value={susanVoiceURI}
                onChange={(e) => setSusanVoiceURI(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-slate-200"
              >
                {englishVoices.map((v) => (
                  <option key={v.voiceURI || v.name} value={v.voiceURI || v.name}>
                    {scoreVoice(v).isFemale ? '👩' : '👨'} {v.name}
                  </option>
                ))}
              </select>
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>Vocal Pitch:</span>
                <input
                  type="range"
                  min="0.85"
                  max="1.25"
                  step="0.03"
                  value={susanPitch}
                  onChange={(e) => setSusanPitch(parseFloat(e.target.value))}
                  className="w-24 accent-emerald-500 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Scene Storyboard Slides Drawer */}
      <SceneImageManager
        isOpen={showImageManager}
        onClose={() => setShowImageManager(false)}
        storedImages={storedSceneImages}
        imageUrls={sceneImageUrls}
        onUploadSingle={handleUploadSingleSceneImage}
        onUploadBatch={handleIncomingImageFiles}
        onClearAll={handleClearAllSceneImages}
        onSelectSlide={handleJumpToSlide}
        currentSlideIndex={activeSlideIndex}
      />

      {/* Main Visual Stage & Subtitles (Unified Presentation Card) */}
      <div className="relative w-full bg-slate-950/80 flex flex-col items-center justify-center p-2 sm:p-3">
        <div className={`relative rounded-xl overflow-hidden shadow-2xl border border-slate-800 bg-slate-900 flex flex-col transition-all duration-300 ${
          isCompact ? 'w-full max-w-2xl' : 'w-full'
        }`}>
          {/* Visual Stage (Shrunk in Compact Mode) */}
          <div className={`relative bg-slate-900 overflow-hidden flex items-center justify-center select-none ${
            isCompact 
              ? 'h-[190px] sm:h-[230px] md:h-[260px] aspect-video w-full max-w-full mx-auto' 
              : 'aspect-video w-full'
          }`}>
            {/* User's Scene Storyboard Slides (GDP 1–5 JPG Images) */}
            <StoryboardScene
              slideIndex={activeSlideIndex}
              imageUrl={activeSlideUrl}
              speaker={activeLine.speaker}
              isPlaying={isPlaying}
              lineIndex={currentLineIndex}
              onUploadFile={handleUploadSingleSceneImage}
              onUploadBatch={handleIncomingImageFiles}
              onOpenManager={() => setShowImageManager(true)}
            />

            {/* Initial Start Overlay (Compact Proportion) */}
            {!hasStartedOnce && (
              <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-xs flex flex-col items-center justify-center p-3 sm:p-4 text-center z-20">
                <button
                  type="button"
                  onClick={handleTogglePlay}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center shadow-xl transition-transform hover:scale-105 mb-1.5 cursor-pointer"
                >
                  <Play className="w-6 h-6 ml-0.5" />
                </button>
                <h4 className="text-sm sm:text-base font-bold text-white mb-0.5">
                  Scene 1: The Lucky Pencil &amp; GDP
                </h4>
                <p className="text-[11px] text-slate-300 max-w-sm leading-tight mb-2 hidden sm:block">
                  Sequential scene storyboard slides (GDP1–GDP5) with live dialogue subtitles and narration.
                </p>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-mono text-blue-300 bg-blue-950/90 px-2 py-0.5 rounded-full border border-blue-800">
                    {audioEngine === 'studio' ? '🎙️ Studio MP3s' : '🤖 AI Voice'}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950/90 px-2 py-0.5 rounded-full border border-emerald-800">
                    🖼️ Scene JPG Slides
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Subtitles & Narration Line - Attached directly at the bottom of the image */}
          <div className="bg-slate-900/95 border-t border-slate-800/90 px-3 sm:px-4 py-2 sm:py-2.5 flex items-start gap-3">
            <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 text-white shadow-md transition-transform mt-0.5 ${
              isPlaying ? 'ring-2 scale-105' : ''
            } ${
              isGrace ? 'bg-blue-600 ring-blue-400' : 'bg-emerald-600 ring-emerald-400'
            }`}>
              {isGrace ? 'GDP' : 'SP'}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 mb-0.5">
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold ${isGrace ? 'text-blue-400' : 'text-emerald-400'}`}>
                    {activeLine.speaker} {isGrace ? '(Senior Operator)' : '(New Hire)'}
                  </span>
                  {isPlaying && (
                    <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-400">
                      <Volume2 className="w-3 h-3 animate-pulse" />
                      <span className="hidden sm:inline">Playing</span>
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-mono text-slate-400 shrink-0">
                  Line {currentLineIndex + 1}/{DIALOGUE_LINES.length} &bull; Slide {activeSlideIndex + 1}/5
                </span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-slate-100 leading-snug">
                "{activeLine.text}"
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scrubbable Timeline Track & Slide Jumpers */}
      <div className="bg-slate-950 px-3 sm:px-4 py-1.5 border-b border-slate-800/80">
        <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1">
          <div className="flex items-center gap-2">
            <span>Dialogue Timeline ({DIALOGUE_LINES.length} beats)</span>
            <button
              type="button"
              onClick={() => setShowScriptDrawer(!showScriptDrawer)}
              className={`px-1.5 py-0.5 rounded text-[9px] font-sans flex items-center gap-1 transition-colors cursor-pointer ${
                showScriptDrawer ? 'bg-blue-600 text-white font-bold' : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <FileText className="w-2.5 h-2.5" />
              <span>{showScriptDrawer ? 'Hide Script' : 'All 11 Lines'}</span>
            </button>
          </div>
          <span className="text-blue-400 font-bold">
            {activeLine.audioKey} ({activeLine.speaker})
          </span>
        </div>
        <div className="grid grid-cols-11 gap-1 py-0.5">
          {DIALOGUE_LINES.map((line, idx) => {
            const isCurrent = idx === currentLineIndex;
            const isPast = idx < currentLineIndex;
            const isGraceLine = line.speaker === 'Grace';
            return (
              <button
                key={line.id}
                type="button"
                onClick={() => handleJumpToLine(idx)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  isCurrent
                    ? 'ring-2 ring-white ' + (isGraceLine ? 'bg-blue-500 scale-110' : 'bg-emerald-500 scale-110')
                    : isPast
                    ? (isGraceLine ? 'bg-blue-800 opacity-90' : 'bg-emerald-800 opacity-90')
                    : 'bg-slate-800 hover:bg-slate-700'
                }`}
                title={`Line ${idx + 1}: ${line.speaker} (${line.audioKey}) - Click to jump and pause`}
              />
            );
          })}
        </div>

        {/* Script Drawer showing all 11 lines with direct click-to-pause */}
        {showScriptDrawer && (
          <div className="bg-slate-900/95 border border-slate-800 rounded-lg my-2 p-2 max-h-56 overflow-y-auto space-y-1 shadow-xl">
            <div className="flex items-center justify-between text-[10px] text-slate-400 pb-1 border-b border-slate-800">
              <span className="font-bold text-slate-300">Click any line to jump directly &amp; pause:</span>
              <span className="text-emerald-400 text-[9px] font-mono">Will not play until you click Resume</span>
            </div>
            {DIALOGUE_LINES.map((line, idx) => {
              const isCurrent = idx === currentLineIndex;
              const isGraceLine = line.speaker === 'Grace';
              return (
                <button
                  key={line.id}
                  type="button"
                  onClick={() => handleJumpToLine(idx)}
                  className={`w-full text-left p-1.5 rounded text-xs transition-all flex items-start gap-2 cursor-pointer ${
                    isCurrent
                      ? (isGraceLine ? 'bg-blue-950 border border-blue-600 text-blue-100 ring-1 ring-blue-500 font-semibold' : 'bg-emerald-950 border border-emerald-600 text-emerald-100 ring-1 ring-emerald-500 font-semibold')
                      : 'bg-slate-950/70 hover:bg-slate-800/80 border border-slate-800/70 text-slate-300'
                  }`}
                >
                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono shrink-0 ${
                    isGraceLine ? 'bg-blue-900/90 text-blue-300' : 'bg-emerald-900/90 text-emerald-300'
                  }`}>
                    L{idx + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <span className={`font-bold mr-1.5 ${isGraceLine ? 'text-blue-400' : 'text-emerald-400'}`}>
                      {line.speaker}:
                    </span>
                    <span className="text-slate-200">"{line.text}"</span>
                  </div>
                  {isCurrent && (
                    <span className="text-[9px] font-mono text-amber-300 bg-amber-950/80 px-1.5 py-0.5 rounded border border-amber-600 shrink-0">
                      Active
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* Scene Slide Segment Jumpers */}
        <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-900 mt-1">
          <span className="font-mono text-blue-300">
            Active: Slide {activeSlideIndex + 1}/5 ({activeSlideConfig.expectedFilename})
          </span>
          <div className="flex items-center gap-1">
            {SCENE_SLIDES_CONFIG.map((s, sIdx) => (
              <button
                key={s.id}
                type="button"
                onClick={() => handleJumpToSlide(sIdx)}
                className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors cursor-pointer ${
                  activeSlideIndex === sIdx
                    ? 'bg-blue-600 text-white font-bold shadow-xs'
                    : 'bg-slate-900 hover:bg-slate-800 text-slate-400'
                }`}
                title={s.title}
              >
                {s.id}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Transport Controls */}
      <div className="bg-slate-900 px-3 sm:px-4 py-2 flex flex-wrap items-center justify-between gap-2">
        
        {/* Left: Previous, Play/Pause, Next, Restart */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handlePrevLine}
            disabled={currentLineIndex === 0}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-slate-200 transition-colors cursor-pointer"
            title="Previous line"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={handleTogglePlay}
            className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" />
                <span>{hasStartedOnce ? 'Resume' : 'Play Scene'}</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleNextLine}
            disabled={currentLineIndex === DIALOGUE_LINES.length - 1}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-slate-200 transition-colors cursor-pointer"
            title="Next line"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={handleRestart}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer ml-0.5"
            title="Replay from start"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Center: Shot Indicator */}
        <div className="hidden md:flex items-center gap-1.5 font-mono text-[11px] text-slate-400">
          <span className="w-2 h-2 rounded-full bg-blue-500" />
          <span className="font-bold text-slate-200">{activeShot.badge}</span>
        </div>

        {/* Right: Audio options (Mute, Speed, Size mode) */}
        <div className="flex items-center gap-1.5">
          {/* Mute toggle */}
          <button
            type="button"
            onClick={() => {
              setIsMuted(!isMuted);
              if (htmlAudioRef.current) {
                htmlAudioRef.current.muted = !isMuted;
              }
            }}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-red-400" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>

          {/* Speed Selector */}
          <div className="flex items-center bg-slate-950 rounded-lg p-0.5 border border-slate-800 text-[10px] font-mono">
            {[0.8, 1.0, 1.25].map((speed) => (
              <button
                key={speed}
                type="button"
                onClick={() => {
                  setPlaybackSpeed(speed);
                  if (htmlAudioRef.current) {
                    htmlAudioRef.current.playbackRate = speed;
                  }
                }}
                className={`px-1.5 py-0.5 rounded transition-colors cursor-pointer ${
                  playbackSpeed === speed
                    ? 'bg-blue-600 text-white font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {speed}x
              </button>
            ))}
          </div>

          {/* Size Mode Toggle */}
          <button
            type="button"
            onClick={() => setIsCompact(!isCompact)}
            className={`px-2 py-1 rounded text-[10px] font-mono border flex items-center gap-1 transition-colors cursor-pointer ${
              isCompact
                ? 'bg-blue-950 text-blue-300 border-blue-800 hover:bg-blue-900'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
            title={isCompact ? 'Expand to Cinema View' : 'Fit to Screen View'}
          >
            {isCompact ? <Maximize2 className="w-3 h-3 text-blue-400" /> : <Minimize2 className="w-3 h-3 text-slate-400" />}
            <span className="hidden sm:inline">{isCompact ? 'Fit Screen' : 'Cinema'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
