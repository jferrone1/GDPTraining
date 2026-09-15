import React, { useState, useEffect } from 'react';
import { Upload, Sparkles, ImagePlus, RefreshCw, Images } from 'lucide-react';
import { SceneImageKey } from '../utils/imageStorage';

export interface SceneSlideConfig {
  id: SceneImageKey;
  slideNumber: number;
  title: string;
  subtitle: string;
  badge: string;
  lineRange: string;
  expectedFilename: string;
  sceneSummary: string;
}

export const SCENE_SLIDES_CONFIG: SceneSlideConfig[] = [
  {
    id: 'GDP1',
    slideNumber: 1,
    title: 'Morning Arrival & Welcome',
    subtitle: "Grace greets Susan on Day 1 at Susan's Locker",
    badge: 'Slide 1: Arrival & Welcome (GDP1.jpg)',
    lineRange: 'Line 1 (Intro Greeting)',
    expectedFilename: 'GDP1.jpg',
    sceneSummary: "Grace welcomes new trainee Susan into the AnyPharm gowning room at Susan's locker. Displays 'WELCOME, SUSAN! DAY 1'. Both put on lab coats with supervisor and trainee badges."
  },
  {
    id: 'GDP2',
    slideNumber: 2,
    title: 'The Lucky Pencil',
    subtitle: 'Susan proudly shows off her personal lucky pencil',
    badge: 'Slide 2: The Lucky Pencil (GDP2.jpg)',
    lineRange: 'Lines 2–3 (Lucky Pencil Revelation)',
    expectedFilename: 'GDP2.jpg',
    sceneSummary: 'Susan enthusiastically pulls out her yellow wooden pencil with pink eraser. Grace listens attentively as Susan shares her excitement.'
  },
  {
    id: 'GDP3',
    slideNumber: 3,
    title: 'GDP Rule Violation & Stop Gesture',
    subtitle: 'Grace explains why pencils are prohibited for GDP records',
    badge: 'Slide 3: GDP Rule Violation (GDP3.jpg)',
    lineRange: 'Lines 4–9 (GDP Mandate & Eraser Tax Analogy)',
    expectedFilename: 'GDP3.jpg',
    sceneSummary: 'Grace raises both hands in a polite but firm stop gesture, explaining that documentation guidelines ban erasable media. Susan listens with concern.'
  },
  {
    id: 'GDP4',
    slideNumber: 4,
    title: 'Safe Locker Storage & 4 Golden Rules',
    subtitle: "Susan stashes pencil into her locker mug; Grace gives approval",
    badge: 'Slide 4: Locker Stash & 4 Rules (GDP4.jpg)',
    lineRange: 'Lines 10–11 (4 Golden Rules & Resolution)',
    expectedFilename: 'GDP4.jpg',
    sceneSummary: "Susan turns to her locker to deposit the yellow pencil safely into her coffee mug as Grace shares the 4 error-correction rules."
  },
  {
    id: 'GDP5',
    slideNumber: 5,
    title: 'Pencil Stashed & Production Ready',
    subtitle: "Susan's lucky pencil safe in locker mug; ready with compliant blue pen",
    badge: 'Slide 5: Safe Storage & Floor Ready (GDP5.jpg)',
    lineRange: 'Line 11 (Safe Storage & Floor Readiness)',
    expectedFilename: 'GDP5.jpg',
    sceneSummary: "Susan's lucky pencil is safely deposited in her locker coffee mug. Equipped with compliant blue indelible pens, Grace and Susan are ready for the production floor."
  }
];

interface Props {
  slideIndex: number; // 0..4
  imageUrl: string | null;
  resolvedImageUrl?: string | null;
  speaker: 'Grace' | 'Susan';
  isPlaying: boolean;
  pencilInLocker?: boolean;
  lineIndex?: number; // 0..10
  onLockerClick?: () => void;
  onUploadFile: (slot: SceneImageKey, file: File) => void;
  onUploadBatch: (files: FileList | File[]) => void;
  onOpenManager: () => void;
}

export const StoryboardScene: React.FC<Props> = ({
  slideIndex,
  imageUrl,
  speaker,
  isPlaying,
  lineIndex = 0,
  onUploadFile,
  onUploadBatch,
  onOpenManager
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [hasImageError, setHasImageError] = useState(false);
  const slide = SCENE_SLIDES_CONFIG[Math.min(Math.max(slideIndex, 0), SCENE_SLIDES_CONFIG.length - 1)];
  const isGrace = speaker === 'Grace';

  // Effective image URL: Slide image directly from the active slide slot
  const effectiveImageUrl = imageUrl;

  // Reset error state if URL changes
  useEffect(() => {
    setHasImageError(false);
  }, [effectiveImageUrl]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      if (e.dataTransfer.files.length === 1) {
        onUploadFile(slide.id, e.dataTransfer.files[0]);
      } else {
        onUploadBatch(e.dataTransfer.files);
      }
    }
  };

  const handleSingleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onUploadFile(slide.id, e.target.files[0]);
    }
  };

  const handleBatchFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onUploadBatch(e.target.files);
    }
  };

  return (
    <div
      className={`relative w-full h-full overflow-hidden bg-slate-950 select-none ${
        isDragOver ? 'ring-4 ring-blue-500 ring-inset' : ''
      }`}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragOver(true);
      }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={handleDrop}
    >
      {/* 1. ACTUAL LOADED USER IMAGE */}
      {effectiveImageUrl && !hasImageError ? (
        <div className="relative w-full h-full flex items-center justify-center">
          <img
            src={effectiveImageUrl}
            alt={slide.title}
            referrerPolicy="no-referrer"
            onError={(e) => {
              const target = e.currentTarget;
              const url = new URL(target.src, window.location.href);
              if (url.pathname.endsWith('.jpg')) {
                url.pathname = url.pathname.replace(/\.jpg$/, '.jpeg');
                target.src = url.toString();
              } else if (url.pathname.endsWith('.jpeg')) {
                url.pathname = url.pathname.replace(/\.jpeg$/, '.jpg');
                if (!url.searchParams.has('tried_fallback')) {
                  url.searchParams.set('tried_fallback', '1');
                  target.src = url.toString();
                } else {
                  setHasImageError(true);
                }
              } else {
                setHasImageError(true);
              }
            }}
            className="w-full h-full object-cover transition-opacity duration-300"
          />

          {/* Cinematic lighting vignette */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-slate-950/80 via-transparent to-black/40" />

          {/* Top subtle bar for replace/slide info */}
          <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 z-10">
            <label className="bg-slate-900/85 hover:bg-slate-800 text-slate-300 hover:text-white text-[10px] px-2 py-1 rounded-md border border-slate-700/80 cursor-pointer backdrop-blur-xs flex items-center gap-1 transition-colors shadow-md">
              <RefreshCw className="w-3 h-3" />
              <span className="hidden sm:inline">Replace</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleSingleFileInput}
              />
            </label>
            <button
              type="button"
              onClick={onOpenManager}
              className="bg-slate-900/85 hover:bg-slate-800 text-slate-300 hover:text-white text-[10px] px-2 py-1 rounded-md border border-slate-700/80 cursor-pointer backdrop-blur-xs flex items-center gap-1 transition-colors shadow-md"
            >
              <ImagePlus className="w-3 h-3 text-blue-400" />
              <span>Slides</span>
            </button>
          </div>
        </div>
      ) : (
        /* 2. VECTOR ILLUSTRATION BACKDROP WHEN USER IMAGE IS NOT YET DROPPED */
        <div className="relative w-full h-full flex flex-col items-center justify-between p-4 sm:p-6 bg-radial from-slate-900 to-slate-950">
          {/* Illustrated SVG scene background representing the current beat */}
          <div className="absolute inset-0 opacity-40 pointer-events-none flex items-center justify-center">
            <svg viewBox="0 0 1000 562" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
              {/* Room architecture */}
              <rect width="1000" height="562" fill="#1e293b" />
              <rect x="0" y="420" width="1000" height="142" fill="#0f172a" />
              
              {/* Ceiling light strips */}
              <rect x="150" y="20" width="220" height="30" fill="#cbd5e1" opacity="0.3" rx="4" />
              <rect x="420" y="20" width="220" height="30" fill="#cbd5e1" opacity="0.3" rx="4" />
              <rect x="700" y="20" width="220" height="30" fill="#cbd5e1" opacity="0.3" rx="4" />

              {/* Lockers on Left */}
              <rect x="40" y="100" width="220" height="340" fill="#334155" stroke="#475569" strokeWidth="4" rx="6" />
              <line x1="150" y1="100" x2="150" y2="440" stroke="#475569" strokeWidth="3" />
              <rect x="55" y="115" width="80" height="25" fill="#1e293b" rx="3" />
              <text x="95" y="132" fill="#94a3b8" fontSize="11" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">GRACE</text>
              <rect x="160" y="115" width="85" height="25" fill="#0284c7" rx="3" />
              <text x="202" y="132" fill="#ffffff" fontSize="11" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">SUSAN</text>

              {/* Door to production floor */}
              <rect x="800" y="140" width="150" height="300" fill="#334155" stroke="#64748b" strokeWidth="4" rx="4" />
              <rect x="825" y="180" width="100" height="120" fill="#0284c7" opacity="0.25" stroke="#38bdf8" strokeWidth="2" rx="3" />
              <rect x="815" y="150" width="120" height="20" fill="#0f172a" rx="2" />
              <text x="825" y="164" fill="#38bdf8" fontSize="9" fontFamily="sans-serif" fontWeight="bold">TO PRODUCTION FLOOR</text>

              {/* Slide-specific graphical cue */}
              {slide.id === 'GDP1' && (
                <g transform="translate(160, 160)">
                  <rect width="70" height="85" fill="#fef08a" stroke="#eab308" strokeWidth="2" rx="4" />
                  <text x="10" y="25" fill="#854d0e" fontSize="9" fontWeight="bold">WELCOME,</text>
                  <text x="10" y="45" fill="#854d0e" fontSize="11" fontWeight="bold">SUSAN!</text>
                  <text x="10" y="65" fill="#a16207" fontSize="8">DAY 1</text>
                </g>
              )}

              {slide.id === 'GDP2' && (
                <g transform="translate(560, 240)">
                  {/* Lucky pencil highlighted */}
                  <rect x="-10" y="-10" width="140" height="40" fill="#eab308" opacity="0.2" rx="20" />
                  <polygon points="10,10 90,0 90,12" fill="#fbbf24" stroke="#d97706" strokeWidth="2" />
                  <rect x="90" y="0" width="18" height="12" fill="#f43f5e" rx="2" />
                  <text x="15" y="32" fill="#facc15" fontSize="11" fontWeight="bold">★ LUCKY PENCIL</text>
                </g>
              )}

              {slide.id === 'GDP3' && (
                <g transform="translate(420, 180)">
                  {/* Stop / Violation warning */}
                  <circle cx="60" cy="60" r="50" fill="#ef4444" opacity="0.2" stroke="#ef4444" strokeWidth="3" />
                  <line x1="30" y1="30" x2="90" y2="90" stroke="#ef4444" strokeWidth="5" />
                  <text x="35" y="66" fill="#f87171" fontSize="14" fontWeight="bold">NO PENCILS</text>
                  <text x="30" y="130" fill="#fca5a5" fontSize="11" fontWeight="bold">GDP MANDATE</text>
                </g>
              )}

              {(slide.id === 'GDP4' || slide.id === 'GDP5') && (
                <g transform="translate(155, 160)">
                  <rect width="90" height="100" fill="#10b981" opacity="0.2" stroke="#10b981" strokeWidth="2" rx="4" />
                  {/* Mug with pencil */}
                  <rect x="30" y="45" width="26" height="26" rx="3" fill="#ffffff" stroke="#94a3b8" strokeWidth="1.5" />
                  <path d="M 56 50 C 62 50 62 62 56 64" fill="none" stroke="#94a3b8" strokeWidth="2" />
                  {/* Yellow pencil sticking out */}
                  <polygon points="38,20 44,20 42,48 40,48" fill="#fbbf24" stroke="#d97706" strokeWidth="1" />
                  <rect x="38" y="15" width="6" height="5" fill="#f43f5e" />
                  <text x="45" y="85" fill="#34d399" fontSize="9" fontWeight="bold" textAnchor="middle">IN LOCKER MUG</text>
                  <circle cx="75" cy="22" r="7" fill="#10b981" />
                  <text x="72" y="26" fill="#ffffff" fontSize="9" fontWeight="bold">✓</text>
                </g>
              )}
            </svg>
          </div>

          {/* Central Callout Card for Image Loading */}
          <div className="relative z-10 max-w-lg w-full bg-slate-900/90 border border-blue-500/40 shadow-2xl rounded-2xl p-5 text-center backdrop-blur-md my-auto">
            <div className="inline-flex p-3 rounded-full bg-blue-950 border border-blue-700/80 mb-3 shadow-inner">
              <Sparkles className="w-6 h-6 text-blue-400" />
            </div>

            <div className="mb-2">
              <span className="text-[10px] uppercase tracking-wider font-mono px-2.5 py-0.5 rounded-full bg-blue-950 text-blue-300 border border-blue-800">
                {slide.badge}
              </span>
            </div>

            <h4 className="text-base sm:text-lg font-bold text-white mb-1">
              {slide.title}
            </h4>
            <p className="text-xs text-slate-300 mb-4 leading-relaxed line-clamp-2">
              {slide.sceneSummary}
            </p>

            {/* Drag and Drop Zone / Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5">
              <label className="w-full sm:w-auto px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-900/40 flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-105">
                <Upload className="w-4 h-4" />
                <span>Upload {slide.expectedFilename}</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleSingleFileInput}
                />
              </label>

              <label className="w-full sm:w-auto px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 flex items-center justify-center gap-2 cursor-pointer transition-colors">
                <ImagePlus className="w-4 h-4 text-emerald-400" />
                <span>Load All 5 Images</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleBatchFileInput}
                />
              </label>
            </div>

            <p className="text-[11px] text-slate-400 mt-3">
              Drop <span className="font-mono text-blue-300 font-semibold">{slide.expectedFilename}</span> (or all 5 files) anywhere onto the scene!
            </p>
          </div>
        </div>
      )}

      {/* Top Overlay Badge for Slide & Speaker */}
      <div className="absolute top-3 left-3 flex items-center gap-2 z-20 pointer-events-none">
        <span className="bg-slate-950/85 text-blue-400 font-mono text-[11px] font-bold px-3 py-1 rounded-full border border-slate-700/80 shadow-md backdrop-blur-xs">
          Slide {slide.slideNumber} of 5: {slide.title}
        </span>
        <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border shadow-xs backdrop-blur-xs ${
          isGrace
            ? 'bg-blue-950/90 text-blue-300 border-blue-800'
            : 'bg-emerald-950/90 text-emerald-300 border-emerald-800'
        }`}>
          {isGrace ? '🗣️ Grace Speaking' : '🗣️ Susan Speaking'}
        </span>
      </div>

      {/* Dragging visual cue */}
      {isDragOver && (
        <div className="absolute inset-0 bg-blue-950/85 backdrop-blur-xs flex flex-col items-center justify-center z-30 pointer-events-none">
          <Upload className="w-12 h-12 text-blue-400 animate-bounce mb-2" />
          <h4 className="text-lg font-bold text-white">Drop to Load Scene Images</h4>
          <p className="text-xs text-blue-200">Automatically maps GDP1..GDP5 files</p>
        </div>
      )}
    </div>
  );
};
