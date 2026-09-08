import React, { useState, useRef } from 'react';
import { Lock, Sparkles, CheckCircle2, RotateCcw, AlertTriangle, ArrowRight, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Props {
  pencilStashed: boolean;
  onStashChange: (stashed: boolean) => void;
}

export const LockerPencilDragDrop: React.FC<Props> = ({
  pencilStashed,
  onStashChange,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [touchPos, setTouchPos] = useState<{ x: number; y: number } | null>(null);
  const lockerRef = useRef<HTMLDivElement>(null);

  const handleDropSuccess = () => {
    onStashChange(true);
    setIsDragOver(false);
    setIsDragging(false);
    setTouchPos(null);
    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.7 }
    });
  };

  // HTML5 Drag & Drop handlers
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', 'lucky-pencil');
    e.dataTransfer.effectAllowed = 'move';
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setIsDragOver(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (!isDragOver) setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    // Only clear if leaving the drop container
    if (e.currentTarget.contains(e.relatedTarget as Node)) return;
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    handleDropSuccess();
  };

  // Touch handlers for mobile & tablet support
  const handleTouchStart = (e: React.TouchEvent) => {
    if (pencilStashed) return;
    setIsDragging(true);
    const touch = e.touches[0];
    setTouchPos({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || pencilStashed) return;
    const touch = e.touches[0];
    setTouchPos({ x: touch.clientX, y: touch.clientY });

    // Check if touch is currently over the locker drop zone
    if (lockerRef.current) {
      const rect = lockerRef.current.getBoundingClientRect();
      const isInside =
        touch.clientX >= rect.left &&
        touch.clientX <= rect.right &&
        touch.clientY >= rect.top &&
        touch.clientY <= rect.bottom;
      setIsDragOver(isInside);
    }
  };

  const handleTouchEnd = () => {
    if (isDragOver && !pencilStashed) {
      handleDropSuccess();
    }
    setIsDragging(false);
    setIsDragOver(false);
    setTouchPos(null);
  };

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 text-white border-2 border-blue-800/80 shadow-2xl space-y-4">
      
      {/* Action Header & Context Instruction */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-400 flex items-center justify-center text-amber-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-1.5">
              <span>Interactive Locker Stash: Drag & Drop</span>
              {pencilStashed && (
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/60 px-2 py-0.5 rounded-full font-mono font-bold">
                  COMPLIANT
                </span>
              )}
            </h3>
            <p className="text-xs text-slate-400">
              {pencilStashed
                ? "Susan's lucky pencil is safely resting in her mug. She is cleanroom ready!"
                : "Drag Susan's Lucky Pencil over to the coffee mug in her locker to stash it."}
            </p>
          </div>
        </div>

        {/* Reset / Take Pencil Back Button */}
        {pencilStashed && (
          <button
            type="button"
            onClick={() => onStashChange(false)}
            className="self-start sm:self-auto text-xs px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Try dragging again"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
            <span>Reset / Try Drag Again</span>
          </button>
        )}
      </div>

      {/* Instruction Callout */}
      {!pencilStashed ? (
        <div className="bg-amber-950/40 border border-amber-500/40 rounded-xl p-3 flex items-start gap-2.5 text-xs text-amber-200 animate-pulse">
          <ArrowRight className="w-4 h-4 text-amber-400 shrink-0 mt-0.5 animate-bounce-x" />
          <div>
            <strong className="text-amber-300 font-bold">Instruction: </strong>
            <span>
              Grab the <strong>Lucky Yellow Pencil</strong> from Susan's hand on the left, and <strong>drag & drop it into the mug</strong> inside <strong>Susan's Locker</strong> on the right! (Or simply click the pencil).
            </span>
          </div>
        </div>
      ) : (
        <div className="bg-emerald-950/40 border border-emerald-500/50 rounded-xl p-3 flex items-start gap-2.5 text-xs text-emerald-200">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-emerald-300 font-bold">Locker Stashed: </strong>
            <span>
              The pencil is now sticking out of the mug in Susan's locker! In her hand, she now holds the AnyPharm-approved permanent blue ballpoint pen.
            </span>
          </div>
        </div>
      )}

      {/* Main Interactive Stage: Side by Side (Susan's Hand vs Susan's Locker) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch select-none">

        {/* ============================================================ */}
        {/* PANEL 1: SUSAN'S HAND / TOOL STATUS (SOURCE) */}
        {/* ============================================================ */}
        <div className={`p-4 rounded-xl border-2 flex flex-col justify-between transition-all duration-300 ${
          pencilStashed 
            ? 'bg-blue-950/40 border-blue-700/80 shadow-inner' 
            : 'bg-slate-800/80 border-slate-700 shadow-md'
        }`}>
          {/* Header */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span className="text-xs font-bold text-slate-200">Susan's Hand</span>
            </div>
            <span className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold ${
              pencilStashed 
                ? 'bg-blue-900 text-blue-200 border border-blue-700' 
                : 'bg-amber-900/60 text-amber-300 border border-amber-600'
            }`}>
              {pencilStashed ? 'CLEANROOM PEN' : 'PROHIBITED PENCIL'}
            </span>
          </div>

          {/* Visual Container of Susan's Hand holding the item */}
          <div className="my-2 p-3 bg-slate-950/60 rounded-xl border border-slate-800 flex flex-col items-center justify-center min-h-[160px] relative overflow-hidden">
            
            {!pencilStashed ? (
              /* State A: Susan holds the Lucky Yellow Pencil */
              <div className="flex flex-col items-center text-center">
                {/* Visual Arm & Hand Holding Pencil */}
                <div className="relative w-36 h-28 flex items-center justify-center">
                  <svg viewBox="0 0 160 110" className="w-full h-full">
                    {/* Cleanroom Teal Sleeve */}
                    <path d="M 0 55 C 20 50 40 48 70 50 L 70 75 C 40 75 20 72 0 68 Z" fill="#0d9488" stroke="#14b8a6" strokeWidth="1.5" />
                    {/* Sleeve White Elastic Cuff */}
                    <rect x="68" y="49" width="10" height="27" rx="3" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
                    {/* Susan's Hand */}
                    <ellipse cx="90" cy="62" rx="14" ry="12" fill="#fed7aa" />
                    {/* Hand Thumb wrapping around item */}
                    <ellipse cx="88" cy="54" rx="7" ry="5" fill="#fbcfe8" opacity="0.3" />
                  </svg>

                  {/* DRAGGABLE PENCIL OVERLAY */}
                  <div
                    draggable
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    onClick={handleDropSuccess}
                    className={`absolute inset-x-2 top-3 bottom-3 flex items-center justify-center cursor-grab active:cursor-grabbing transition-transform group ${
                      isDragging ? 'scale-105 opacity-80' : 'hover:scale-105'
                    }`}
                    title="Drag me to Susan's locker mug!"
                  >
                    {/* Animated Pulsing Halo */}
                    <div className="absolute inset-2 rounded-xl bg-amber-400/10 border-2 border-dashed border-amber-400 animate-pulse group-hover:border-amber-300" />
                    
                    {/* Realistic Lucky Yellow Pencil Graphic */}
                    <div className="relative flex items-center bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-slate-950 px-3 py-2 rounded-lg shadow-xl border border-amber-600 font-mono text-xs font-bold gap-2">
                      {/* Graphite Tip & Sharpened Wood */}
                      <div className="flex items-center -ml-1">
                        <div className="w-0 h-0 border-y-[6px] border-y-transparent border-r-[12px] border-r-slate-900" />
                        <div className="w-0 h-0 border-y-[6px] border-y-transparent border-r-[10px] border-r-[#fed7aa]" />
                      </div>

                      {/* Pencil Body with Brand */}
                      <span className="tracking-wide text-[11px] font-extrabold select-none">
                        ★ #2 HB LUCKY PENCIL ★
                      </span>

                      {/* Silver Ferrule & Pink Eraser */}
                      <div className="flex items-center -mr-1">
                        <div className="w-3 h-5 bg-gradient-to-b from-slate-300 via-slate-100 to-slate-400 border-x border-slate-500" />
                        <div className="w-4 h-5 rounded-r-md bg-rose-400 border border-rose-500" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Helpful drag prompt tag */}
                <div className="mt-2 text-center">
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-300 bg-amber-950/80 px-2.5 py-1 rounded-full border border-amber-500 shadow-sm cursor-grab">
                    <span>✏️ Drag or Click Pencil</span>
                  </span>
                  <p className="text-[10px] text-slate-400 mt-1">
                    Erasable graphite destroys contemporaneous audit credibility.
                  </p>
                </div>
              </div>
            ) : (
              /* State B: Susan holds the Approved AnyPharm Blue Pen! */
              <div className="flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-300">
                {/* Visual Arm & Hand Holding Blue Ballpoint Pen */}
                <div className="relative w-36 h-28 flex items-center justify-center">
                  <svg viewBox="0 0 160 110" className="w-full h-full">
                    {/* Cleanroom Teal Sleeve */}
                    <path d="M 0 55 C 20 50 40 48 70 50 L 70 75 C 40 75 20 72 0 68 Z" fill="#0d9488" stroke="#14b8a6" strokeWidth="1.5" />
                    {/* White Elastic Cuff */}
                    <rect x="68" y="49" width="10" height="27" rx="3" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
                    {/* Susan's Hand */}
                    <ellipse cx="90" cy="62" rx="14" ry="12" fill="#fed7aa" />
                    {/* Thumb holding pen */}
                    <ellipse cx="88" cy="54" rx="7" ry="5" fill="#fbcfe8" opacity="0.3" />
                    {/* Thumbs up finger */}
                    <path d="M 94 54 Q 102 44 104 40 Q 108 40 106 46 Q 104 52 98 56 Z" fill="#fed7aa" stroke="#ea580c" strokeWidth="0.8" />
                  </svg>

                  {/* Equipped Blue Pen Graphic */}
                  <div className="absolute inset-x-2 top-3 bottom-3 flex items-center justify-center">
                    <div className="flex items-center bg-gradient-to-r from-blue-700 via-blue-600 to-blue-800 text-white px-3 py-1.5 rounded-lg shadow-xl border border-blue-400 font-mono text-xs font-bold gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-sky-300 shadow-sm" />
                      <span className="tracking-wide text-[11px] font-extrabold">
                        AnyPharm QA Blue Pen
                      </span>
                      <div className="w-3 h-4 rounded-r-xs bg-slate-300 border-l border-slate-400" />
                    </div>
                  </div>
                </div>

                <div className="mt-2 text-center">
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-300 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-500 shadow-sm">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Cleanroom Compliant</span>
                  </span>
                  <p className="text-[10px] text-slate-400 mt-1">
                    Permanent blue indelible ink ready for batch records.
                  </p>
                </div>
              </div>
            )}

          </div>

          {/* Footer note */}
          <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1 border-t border-slate-800">
            <span>Status:</span>
            <span className={pencilStashed ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
              {pencilStashed ? 'Pencil Stored in Mug' : 'Holding Pencil'}
            </span>
          </div>
        </div>

        {/* ============================================================ */}
        {/* PANEL 2: SUSAN'S LOCKER & MUG (DROP TARGET) */}
        {/* ============================================================ */}
        <div
          ref={lockerRef}
          onDragOver={handleDragOver}
          onDragEnter={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`p-4 rounded-xl border-2 flex flex-col justify-between transition-all duration-300 relative ${
            isDragOver 
              ? 'bg-emerald-950/70 border-emerald-400 scale-[1.02] shadow-[0_0_25px_rgba(16,185,129,0.4)]' 
              : pencilStashed 
              ? 'bg-emerald-950/40 border-emerald-600/80 shadow-md' 
              : 'bg-slate-800/80 border-slate-700 shadow-md'
          }`}
        >
          {/* Locker Header with Susan's Nameplate (NO LOCKER NUMBER) */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Lock className={`w-3.5 h-3.5 ${pencilStashed ? 'text-emerald-400' : 'text-amber-400'}`} />
              <div className="flex items-center gap-1.5">
                <span className="bg-blue-600 text-white px-2 py-0.5 rounded text-[11px] font-bold tracking-wider uppercase font-mono shadow-xs">
                  SUSAN
                </span>
                <span className="text-xs font-bold text-slate-200">Susan's Locker</span>
              </div>
            </div>

            {pencilStashed && (
              <span className="text-[10px] bg-emerald-500 text-slate-950 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                SECURE
              </span>
            )}
          </div>

          {/* Locker Interior Shelf & Mug Graphic */}
          <div className={`my-2 p-3 rounded-xl border flex flex-col items-center justify-center min-h-[160px] relative transition-colors ${
            isDragOver 
              ? 'bg-emerald-950/80 border-dashed border-emerald-400' 
              : pencilStashed 
              ? 'bg-slate-950/80 border-emerald-800/80' 
              : 'bg-slate-950/60 border-dashed border-slate-700'
          }`}>
            
            {/* Locker Vent & Shelf Background Details */}
            <div className="absolute top-2 left-3 right-3 flex justify-between opacity-30 pointer-events-none">
              <div className="h-0.5 w-12 bg-slate-400 rounded" />
              <div className="h-0.5 w-12 bg-slate-400 rounded" />
            </div>

            {/* SVG Visual: Locker Shelf & Ceramic Mug */}
            <div className="relative w-36 h-28 flex items-center justify-center">
              <svg viewBox="0 0 160 120" className="w-full h-full">
                {/* Locker Back Wall */}
                <rect x="15" y="10" width="130" height="95" rx="4" fill="#0f172a" opacity="0.6" />
                
                {/* Locker Shelf Line */}
                <line x1="20" y1="95" x2="140" y2="95" stroke="#475569" strokeWidth="4" strokeLinecap="round" />

                {/* Ceramic Mug on the Shelf */}
                <g id="locker-mug-group">
                  {/* Mug Body */}
                  <rect x="55" y="55" width="46" height="40" rx="6" fill="#f8fafc" stroke="#64748b" strokeWidth="2" />
                  {/* Mug Cyan Accent Stripe */}
                  <rect x="55" y="65" width="46" height="6" fill="#0284c7" />
                  <text x="78" y="70" fill="#ffffff" fontSize="4.5" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">ANYPHARM</text>
                  
                  {/* Mug Handle */}
                  <path d="M 101 62 C 114 62 114 85 101 88" fill="none" stroke="#64748b" strokeWidth="3.5" strokeLinecap="round" />
                  <path d="M 101 65 C 110 65 110 82 101 85" fill="none" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />

                  {/* Mug Rim Opening */}
                  <ellipse cx="78" cy="55" rx="23" ry="5" fill="#e2e8f0" stroke="#64748b" strokeWidth="1.5" />
                  <ellipse cx="78" cy="55" rx="20" ry="3.5" fill="#334155" />

                  {/* WHEN STASHED: LUCKY YELLOW PENCIL STICKING OUT OF THE MUG */}
                  {pencilStashed && (
                    <g transform="translate(74, 52) rotate(18)" className="animate-in fade-in zoom-in-90 duration-300">
                      {/* Yellow pencil body sticking upwards out of mug */}
                      <polygon points="-3,-42 3,-42 2,15 -2,15" fill="#fbbf24" stroke="#d97706" strokeWidth="1" />
                      
                      {/* Graphite / Sharp tip down in mug (hidden inside) */}
                      {/* Brand name on pencil body */}
                      <line x1="0" y1="-30" x2="0" y2="0" stroke="#b45309" strokeWidth="0.8" strokeDasharray="2 1" />

                      {/* Silver ferrule holding eraser */}
                      <rect x="-3.5" y="-48" width="7" height="6" rx="0.5" fill="#cbd5e1" stroke="#64748b" strokeWidth="0.8" />
                      <line x1="-3.5" y1="-45" x2="3.5" y2="-45" stroke="#94a3b8" strokeWidth="0.5" />

                      {/* Pink Eraser top sticking out proudly */}
                      <rect x="-3" y="-55" width="6" height="7" rx="2" fill="#f43f5e" stroke="#e11d48" strokeWidth="0.8" />

                      {/* Sparkle star next to eraser */}
                      <circle cx="8" cy="-52" r="1.5" fill="#facc15" />
                      <circle cx="-9" cy="-48" r="1" fill="#facc15" />
                    </g>
                  )}
                </g>
              </svg>
            </div>

            {/* Status indicator below mug */}
            <div className="mt-1 text-center">
              {isDragOver ? (
                <div className="text-xs font-bold text-emerald-300 flex items-center gap-1 animate-bounce">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Release to Drop in Mug!</span>
                </div>
              ) : pencilStashed ? (
                <div className="text-xs font-bold text-emerald-300 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Pencil Sticking Out of Mug</span>
                </div>
              ) : (
                <div className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Lock className="w-3 h-3 text-slate-500" />
                  <span>Drop target: Susan's Mug</span>
                </div>
              )}
            </div>

          </div>

          {/* Locker Footer Button / Status */}
          {!pencilStashed ? (
            <button
              type="button"
              onClick={handleDropSuccess}
              className="w-full py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Or Click Here to Stash in Mug</span>
            </button>
          ) : (
            <div className="w-full py-2 bg-emerald-950/80 border border-emerald-500/60 rounded-lg text-emerald-300 font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Stashed in Susan's Mug &bull; Shift Ready!</span>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
