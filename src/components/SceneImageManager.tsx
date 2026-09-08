import React, { useState, useEffect } from 'react';
import { X, Upload, CheckCircle2, AlertCircle, Trash2, ImagePlus, Eye } from 'lucide-react';
import { SceneImageKey, StoredSceneImage } from '../utils/imageStorage';
import { SCENE_SLIDES_CONFIG } from './StoryboardScene';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  storedImages: Record<string, StoredSceneImage>;
  imageUrls: Record<string, string>;
  onUploadSingle: (slot: SceneImageKey, file: File) => void;
  onUploadBatch: (files: FileList | File[]) => void;
  onClearAll: () => void;
  onSelectSlide: (slideIndex: number) => void;
  currentSlideIndex: number;
}

interface SlideCardProps {
  config: (typeof SCENE_SLIDES_CONFIG)[number];
  index: number;
  url?: string;
  isCurrent: boolean;
  onSelectSlide: (index: number) => void;
  onUploadSingle: (slot: SceneImageKey, file: File) => void;
}

const SlideCard: React.FC<SlideCardProps> = ({
  config,
  index,
  url,
  isCurrent,
  onSelectSlide,
  onUploadSingle,
}) => {
  const [loadFailed, setLoadFailed] = useState(false);

  useEffect(() => {
    setLoadFailed(false);
  }, [url]);

  const hasValidImage = Boolean(url) && !loadFailed;

  return (
    <div
      className={`rounded-xl border p-3 flex flex-col justify-between transition-all ${
        isCurrent
          ? 'border-blue-500 bg-slate-950/90 ring-1 ring-blue-500 shadow-md'
          : 'border-slate-800 bg-slate-950/50 hover:border-slate-700'
      }`}
    >
      {/* Top info */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <span className="font-bold text-xs text-white">
            Slide {config.slideNumber} ({config.expectedFilename})
          </span>
          {hasValidImage ? (
            <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              Ready
            </span>
          ) : (
            <span className="text-[10px] font-mono text-amber-400 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              Upload
            </span>
          )}
        </div>

        {/* Thumbnail container */}
        <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-slate-900 border border-slate-800 mb-2 flex items-center justify-center">
          {hasValidImage ? (
            <img
              src={url}
              alt={config.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              onError={() => setLoadFailed(true)}
            />
          ) : (
            <div className="text-center p-2 text-slate-500 text-[10px]">
              <ImagePlus className="w-6 h-6 mx-auto text-slate-600 mb-1" />
              <span>{config.expectedFilename}</span>
            </div>
          )}

          {isCurrent && (
            <div className="absolute top-1 right-1 bg-blue-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow">
              ACTIVE
            </div>
          )}
        </div>

        <h6 className="font-semibold text-slate-200 text-xs mb-0.5 line-clamp-1">
          {config.title}
        </h6>
        <p className="text-[10px] font-mono text-blue-400 mb-2">
          {config.lineRange}
        </p>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-1.5 pt-2 border-t border-slate-800/80">
        <button
          type="button"
          onClick={() => onSelectSlide(index)}
          className={`flex-1 py-1 px-2 rounded text-[10px] font-bold flex items-center justify-center gap-1 transition-colors cursor-pointer ${
            isCurrent
              ? 'bg-blue-900/60 text-blue-300 border border-blue-700'
              : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
          }`}
        >
          <Eye className="w-3 h-3" />
          <span>Jump</span>
        </button>

        <label className="flex-1 py-1 px-2 rounded text-[10px] font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center gap-1 cursor-pointer transition-colors border border-slate-700">
          <Upload className="w-3 h-3 text-emerald-400" />
          <span>{hasValidImage ? 'Replace' : 'Upload'}</span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                onUploadSingle(config.id, e.target.files[0]);
              }
            }}
          />
        </label>
      </div>
    </div>
  );
};

export const SceneImageManager: React.FC<Props> = ({
  isOpen,
  onClose,
  storedImages,
  imageUrls,
  onUploadSingle,
  onUploadBatch,
  onClearAll,
  onSelectSlide,
  currentSlideIndex,
}) => {
  if (!isOpen) return null;

  const totalLoaded = Object.keys(imageUrls).length;

  return (
    <div className="bg-slate-900 border-b border-slate-800 p-4 sm:p-5 text-xs animate-in slide-in-from-top-2 duration-200 z-30">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <ImagePlus className="w-4 h-4 text-blue-400" />
            <h5 className="font-bold text-sm text-white">Scene Storyboard Slides (GDP 1–5)</h5>
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
              totalLoaded >= 5
                ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                : 'bg-amber-950 text-amber-300 border-amber-800'
            }`}>
              {totalLoaded} of 5 Slides Loaded
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            Images change automatically as the conversation progresses between Grace and Susan.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Load Batch */}
          <label className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors shadow-sm">
            <Upload className="w-3.5 h-3.5" />
            <span>Upload 5 Images</span>
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => e.target.files && onUploadBatch(e.target.files)}
            />
          </label>

          {/* Reset cache */}
          {totalLoaded > 0 && (
            <button
              type="button"
              onClick={onClearAll}
              className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-rose-950/60 text-slate-300 hover:text-rose-300 border border-slate-700 hover:border-rose-800 text-[11px] font-medium flex items-center gap-1 transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Cache</span>
            </button>
          )}

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-slate-800 transition-colors cursor-pointer ml-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 5 Slides Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {SCENE_SLIDES_CONFIG.map((config, index) => (
          <SlideCard
            key={config.id}
            config={config}
            index={index}
            url={imageUrls[config.id]}
            isCurrent={currentSlideIndex === index}
            onSelectSlide={onSelectSlide}
            onUploadSingle={onUploadSingle}
          />
        ))}
      </div>
    </div>
  );
};
